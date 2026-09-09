import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { sampleCV } from "@/lib/cv";
import { prisma } from "@/lib/prisma";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";

requireAgencyTestDatabase();
const origin = "http://localhost:3011";
const sink = "http://localhost:58025/messages";
const output = ".codex-tmp/container-security";
async function post(path: string, body: unknown, cookie = "") {
  return fetch(origin + path, {
    method: "POST", headers: { "Content-Type": "application/json", Origin: origin, Cookie: cookie },
    body: JSON.stringify(body), signal: AbortSignal.timeout(90000),
  });
}
async function main() {
  await mkdir(output, { recursive: true });
  const results = [];
  for (const locale of ["nl", "en"] as const) {
    const email = `container-${locale}-${Date.now()}@example.test`;
    const requested = await post("/api/auth/request-code", { email, locale });
    assert.equal(requested.status, 200, "login code email must send to local sink");
    const mails = await (await fetch(sink)).json() as string[];
    const mail = mails.findLast((text) => text.includes(email));
    assert.ok(mail);
    assert.ok(mail.includes(locale === "en" ? "Your WerkCV login code" : "Je WerkCV login code"));
    const code = mail.match(/(?:code is |code is=20)(\d{6})/)?.[1];
    assert.ok(code, "local email must contain a six-digit code");
    const verified = await post("/api/auth/verify-code", { email, code, next: locale === "en" ? "/en/templates" : "/templates" });
    assert.equal(verified.status, 200);
    const cookie = verified.headers.getSetCookie().find((value) => value.startsWith("werkcv_session="))?.split(";")[0];
    assert.ok(cookie);
    assert.equal((await post("/api/auth/verify-code", { email, code })).status, 401, "login code cannot be replayed");
    const data = structuredClone(sampleCV);
    data.personal.name = "Fictional Container Candidate";
    data.personal.email = email;
    data.personal.resumeLanguage = locale;
    const created = await post("/api/create-cv", { workspace: "consumer", initialData: data, templateId: "professional", uiLanguage: locale }, cookie);
    assert.equal(created.status, 200);
    const { cvId } = await created.json();
    assert.ok(cvId);
    const cv = await prisma.cVDocument.findUniqueOrThrow({ where: { id: cvId } });
    assert.equal(cv.agencySubscriptionId, null);
    const preview = await post("/api/pdf-preview", { cvId, data, templateId: "professional", colorThemeId: "classic-blue" }, cookie);
    assert.equal(preview.status, 200, "real container PDF image preview");
    const { pages } = await preview.json();
    assert.ok(pages.length > 0 && pages.every((page: string) => page.startsWith("data:image/png;base64,")));
    for (const [index, page] of (pages as string[]).entries()) {
      await writeFile(`${output}/preview-${locale}-${index + 1}.png`, Buffer.from(page.split(",")[1], "base64"));
    }
    const response = await fetch(`${origin}/api/pdf?cvId=${cvId}`, { headers: { Cookie: cookie }, signal: AbortSignal.timeout(90000) });
    assert.equal(response.status, 200);
    assert.ok(response.headers.get("content-type")?.includes("application/pdf"));
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-");
    await writeFile(`${output}/consumer-${locale}.pdf`, bytes);
    assert.equal((await fetch(`${origin}/api/pdf?cvId=${cvId}`)).status, 401);
    results.push({ locale, login: true, emailCapturedLocally: true, replayRejected: true, personalWorkspace: true, previewPages: pages.length, pdf: true, unauthenticatedBlocked: true });
  }
  await writeFile(`${output}/consumer-flow.json`, JSON.stringify({ at: new Date().toISOString(), origin, results, paymentProvider: "NOT_TESTED; local PAYMENT_ENABLED is off" }, null, 2));
  // Regression: a production configuration error must never expose an OTP in logs.
  process.env.NODE_ENV = "production";
  process.env.SMTP_HOST = "";
  process.env.SMTP_USER = "";
  process.env.SMTP_PASS = "";
  const { requestEmailLoginCode } = await import("@/lib/auth");
  const previousLog = console.log;
  const logged: unknown[][] = [];
  console.log = (...values: unknown[]) => { logged.push(values); };
  try {
    await assert.rejects(() => requestEmailLoginCode("container-no-mail@example.test", "en"), /SMTP_NOT_CONFIGURED/);
    assert.equal(logged.length, 0, "no login code may be logged in production");
  } finally { console.log = previousLog; }
  console.log("PASS: NL/EN local SMTP login, single-use codes, personal CV creation, image previews and PDF downloads.");
}
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
