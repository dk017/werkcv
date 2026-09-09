import assert from "node:assert/strict";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sampleCV } from "@/lib/cv";
import { anonymizeCvData, attachEvidenceReferences, createDefaultMatchPackSubmission, createMatchPackAnalysis } from "@/lib/agency-matchpack";
import { createMatchPackSource } from "@/lib/agency-matchpack-source";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";
import { AGENCY_MONTHLY_CREDIT_LIMIT } from "@/lib/agency-plan";

const { runId } = requireAgencyTestDatabase();
const email = `browser-${runId}@example.test`;
const secret = process.env.AGENCY_E2E_SESSION_SECRET || `agency-e2e-${runId}`;
const token = crypto.randomBytes(32).toString("hex");
const tokenHash = crypto.createHash("sha256").update(`${secret}:${token}`).digest("hex");
const port = 3127;
const externalOrigin = process.env.AGENCY_E2E_ORIGIN;
if (externalOrigin && !/^http:\/\/(localhost|127\.0\.0\.1):\d+$/u.test(externalOrigin)) throw new Error("LOCAL_E2E_ORIGIN_REQUIRED");
if (externalOrigin && !process.env.AGENCY_E2E_SESSION_SECRET) throw new Error("E2E_SESSION_SECRET_REQUIRED");
const baseUrl = externalOrigin || `http://127.0.0.1:${port}`;
let stage = "seed";

async function seed() {
  const now = new Date();
  const user = await prisma.user.create({ data: { email } });
  const subscription = await prisma.agencySubscription.create({ data: { userId: user.id, status: "active", currentPeriodStart: new Date(now.getTime() - 60_000), currentPeriodEnd: new Date(now.getTime() + 30 * 86400000), retentionPolicySetAt: now, retentionUpdatedAt: now, retentionDays: 90, monthlyLimit: AGENCY_MONTHLY_CREDIT_LIMIT, excludeFromProductMetrics: true } });
  await prisma.session.create({ data: { tokenHash, userId: user.id, expiresAt: new Date(now.getTime() + 86400000) } });
  const candidate = structuredClone(sampleCV);
  candidate.personal.name = "Mila Vermeer";
  candidate.personal.title = "HR-adviseur";
  candidate.personal.email = "mila.vermeer@example.test";
  candidate.personal.phone = "+31 20 555 0142";
  const source = createMatchPackSource("docx", "Adviseerde 24 teamleiders over complexe verzuimdossiers.");
  const vacancyText = "Adviseer minimaal twintig teamleiders.\nAFAS-ervaring is vereist.";
  const result = attachEvidenceReferences({
    score: 70, scoreBand: "good", scoreLabel: "Goed", summary: "Relevant profiel met een zichtbaar open punt.", perceivedRole: "HR-adviseur", perceivedSeniority: "senior",
    dimensions: [{ id: "evidence", label: "Bewijs", score: 20, maxScore: 30, explanation: "Eén eis ondersteund." }], strengths: [{ title: "Advies", evidence: "24 teamleiders" }],
    requirements: [
      { requirement: "Advies aan twintig teamleiders", vacancyEvidence: "Adviseer minimaal twintig teamleiders.", importance: "essential", status: "strong", cvEvidence: "Adviseerde 24 teamleiders over complexe verzuimdossiers.", honestAction: "Geen aanvullende actie." },
      { requirement: "AFAS", vacancyEvidence: "AFAS-ervaring is vereist.", importance: "essential", status: "missing", cvEvidence: "", honestAction: "Vraag AFAS-ervaring na." },
    ], missingKeywords: ["AFAS"], topFixes: [], limitations: ["Fictional browser fixture"],
  }, source.text, "docx", vacancyText, source.sourceMap);
  const anonymized = anonymizeCvData(candidate, "nl");
  const analysis = createMatchPackAnalysis(result, anonymized, { fileType: "docx", digest: source.digest });
  const submission = createDefaultMatchPackSubmission(candidate, result, "HR-adviseur", "nl");
  const pack = await prisma.agencyMatchPack.create({ data: {
    userId: user.id, title: `Browser ${runId}`, vacancyTitle: "HR-adviseur", vacancyText, locale: "nl", sourceFileType: "docx", sourceText: source.text,
    sourceMap: source.sourceMap as unknown as Prisma.InputJsonValue, sourceTextDigest: source.digest, originalCandidateData: candidate as unknown as Prisma.InputJsonValue,
    candidateData: candidate as unknown as Prisma.InputJsonValue, anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue, analysis: analysis as unknown as Prisma.InputJsonValue,
    submissionData: submission as unknown as Prisma.InputJsonValue, retentionExpiresAt: new Date(now.getTime() + 90 * 86400000), revisions: { create: { version: 1, reason: "analysis_created", candidateData: candidate as unknown as Prisma.InputJsonValue, submissionData: submission as unknown as Prisma.InputJsonValue, analysis: analysis as unknown as Prisma.InputJsonValue, changedFields: ["analysis"], createdById: user.id } },
  } });
  return { user, subscription, pack };
}

async function clickButton(page: import("puppeteer").Page, text: string) {
  const clicked = await page.evaluate((label) => {
    const button = [...document.querySelectorAll("button")].find((item) => item.offsetParent !== null && item.textContent?.includes(label)) as HTMLButtonElement | undefined;
    if (!button) return false;
    button.click();
    return true;
  }, text);
  assert.equal(clicked, true, `button ${text} should be visible`);
}

async function waitForText(page: import("puppeteer").Page, text: string) {
  await page.waitForFunction((value) => document.body.innerText.includes(value), { timeout: 30000 }, text);
}

async function waitForTextOrError(page: import("puppeteer").Page, text: string) {
  await page.waitForFunction((value) => document.body.innerText.includes(value) || Boolean(document.querySelector('[role="alert"]')), { timeout: 30000 }, text);
  const result = await page.evaluate((value) => ({
    found: document.body.innerText.includes(value),
    error: document.querySelector('[role="alert"]')?.textContent?.trim() || "",
  }), text);
  assert.equal(result.found, true, result.error || `Expected text not found: ${text}`);
}

async function setLabeledControl(page: import("puppeteer").Page, labelText: string, value: string) {
  await page.waitForFunction((text) => [...document.querySelectorAll("label")].some((label) => label.textContent?.includes(text) && label.querySelector("input,textarea,select")), { timeout: 10000 }, labelText);
  const changed = await page.evaluate(({ labelText, value }) => {
    const label = [...document.querySelectorAll("label")].find((item) => item.textContent?.includes(labelText));
    const control = label?.querySelector("input,textarea,select") as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (!control || control.disabled) return false;
    const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(control), "value")?.set;
    if (setter) setter.call(control, value);
    else control.value = value;
    control.dispatchEvent(new Event("input", { bubbles: true }));
    control.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }, { labelText, value });
  assert.equal(changed, true, `control ${labelText} should be editable`);
}

async function openHrPack(page: import("puppeteer").Page) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    await clickButton(page, "HR-adviseur");
    try {
      await page.waitForFunction(() => document.body.innerText.includes("Eisen, bewijs en eerlijk vervolgpunt") || Boolean(document.querySelector('[role="alert"]')), { timeout: 10000 });
      const error = await page.$eval('[role="alert"]', (item) => item.textContent?.trim() || "").catch(() => "");
      assert.equal(error, "", error);
      return;
    } catch (error) {
      if (attempt === 2) throw error;
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
}

async function moveToApprovalStep(page: import("puppeteer").Page) {
  await openStage(page, "approval");
}

async function openStage(page: import("puppeteer").Page, id: string) {
  const selector = `nav[aria-label="MatchPack-stappen"] button[aria-describedby="matchpack-stage-${id}-status"]`;
  await page.click(selector);
  await page.waitForSelector(`${selector}[aria-current="step"]`);
}

async function main() {
  const seeded = await seed();
  stage = "start_server";
  const server = externalOrigin ? null : spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: process.cwd(),
    env: {
      ...process.env,
      DATABASE_URL: process.env.AGENCY_TEST_DATABASE_URL!,
      AUTH_SESSION_SECRET: secret,
      OPENAI_API_KEY: "sk-test",
      NEXT_PUBLIC_APP_URL: baseUrl,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let serverDiagnostic = "";
  server?.stdout?.on("data", (chunk) => { serverDiagnostic = `${serverDiagnostic}${String(chunk)}`.slice(-1000); });
  server?.stderr?.on("data", (chunk) => { serverDiagnostic = `${serverDiagnostic}${String(chunk)}`.slice(-1000); });
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (server && server.exitCode !== null) throw new Error(`E2E_SERVER_EXITED_${server.exitCode}:${serverDiagnostic.replace(/\s+/gu, " ").slice(-300)}`);
      try {
        await fetch(`${baseUrl}/api/build-version`, { signal: AbortSignal.timeout(2000) });
        break;
      } catch { /* server still starting */ }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (attempt === 59) throw new Error(`E2E_SERVER_NOT_READY:${serverDiagnostic.replace(/\s+/gu, " ").slice(-300)}`);
    }
    browser = await puppeteer.launch({ headless: true });
    stage = "open_workspace";
    await browser.defaultBrowserContext().overridePermissions(baseUrl, ["clipboard-read", "clipboard-write"]);
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 1000 });
    await browser.defaultBrowserContext().setCookie({ name: "werkcv_session", value: token, url: baseUrl, httpOnly: true, sameSite: "Lax" });
    await page.goto(`${baseUrl}/agency/account/matchpack`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForText(page, "Kandidaatvoorstellen");
    stage = "open_pack";
    await openHrPack(page);
    assert.equal(await prisma.agencyCvUsage.count({ where: { period: { subscriptionId: seeded.subscription.id } } }), 0, "analysis must not use a credit");
    const reviewCount = await page.evaluate(() => {
      const selects = [...document.querySelectorAll("select")].filter((select) => select.offsetParent !== null && [...select.options].some((option) => option.value === "confirmed")) as HTMLSelectElement[];
      selects.forEach((select, index) => {
        select.value = index === 0 ? "confirmed" : "rejected";
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
      return selects.length;
    });
    assert.equal(reviewCount, 2);
    stage = "open_source_step";
    await openStage(page, "source");
    await setLabeledControl(page, "Professionele titel", "Senior HR-adviseur");
    stage = "open_message_step";
    await openStage(page, "client_copy");
    await setLabeledControl(page, "Introductie op het voorblad", "Deze kandidaat adviseerde aantoonbaar 24 teamleiders. AFAS blijft een open punt.");
    await setLabeledControl(page, "Begeleidende e-mail", "Bijgaand ontvangt u het gecontroleerde kandidaatvoorstel. AFAS-ervaring moet nog worden bevestigd.");
    stage = "save_review";
    await clickButton(page, "Sla gecontroleerd concept op");
    await waitForTextOrError(page, "Concept opgeslagen");
    const savedDraft = await prisma.agencyMatchPack.findUniqueOrThrow({ where: { id: seeded.pack.id }, select: { retentionExpiresAt: true, revisions: { select: { id: true } } } });
    assert.ok(savedDraft.revisions.length >= 2, "saving reviewed changes must create a revision");
    assert.ok(savedDraft.retentionExpiresAt && seeded.pack.retentionExpiresAt && savedDraft.retentionExpiresAt.getTime() >= seeded.pack.retentionExpiresAt.getTime(), "meaningful save must refresh retention from the exact saved state");
    stage = "open_output_step";
    await openStage(page, "output");
    stage = "choose_output";
    await clickButton(page, "Zonder directe contactgegevens");
    await clickButton(page, "Sla gekozen uitvoer op");
    await waitForTextOrError(page, "Concept opgeslagen");
    stage = "open_approval_step";
    await openStage(page, "approval");
    stage = "approve";
    const checked = await page.evaluate(() => {
      const boxes = [...document.querySelectorAll('input[type="checkbox"]')].filter((box) => (box as HTMLElement).offsetParent !== null) as HTMLInputElement[];
      boxes.forEach((box) => box.click());
      return boxes.length;
    });
    assert.equal(checked, 4);
    await clickButton(page, "Goedkeuren en 1 CV-credit gebruiken");
    await waitForTextOrError(page, "Gekozen PDF downloaden");
    stage = "export";
    const exportResults = await page.evaluate(async (id) => {
      const paths = [
        `/api/agency/matchpack/${encodeURIComponent(id)}/pdf?variant=full`,
        `/api/agency/matchpack/${encodeURIComponent(id)}/pdf?variant=anonymized`,
        `/api/agency/matchpack/${encodeURIComponent(id)}/docx?variant=full`,
        `/api/agency/matchpack/${encodeURIComponent(id)}/docx?variant=anonymized`,
      ];
      return Promise.all(paths.map(async (path) => {
        const response = await fetch(path);
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = "";
        for (const byte of bytes) binary += String.fromCharCode(byte);
        return { path, ok: response.ok, type: response.headers.get("content-type"), size: bytes.byteLength, base64: btoa(binary) };
      }));
    }, seeded.pack.id);
    assert.equal(exportResults.every((result) => result.ok && result.size > 1000), true);
    assert.equal(exportResults.filter((result) => result.type?.includes("application/pdf")).length, 2);
    assert.equal(exportResults.filter((result) => result.type?.includes("wordprocessingml")).length, 2);
    await mkdir(".codex-tmp/container-security", { recursive: true });
    for (const result of exportResults) {
      const extension = result.path.includes("/docx?") ? "docx" : "pdf";
      const variant = result.path.endsWith("=full") ? "full" : "reduced";
      await writeFile(`.codex-tmp/container-security/agency-${variant}.${extension}`, Buffer.from(result.base64, "base64"));
    }
    stage = "open_client_message";
    await clickButton(page, "Vorige stap");
    await clickButton(page, "Vorige stap");
    stage = "copy_client_message";
    const clientCopy = await page.evaluate(async (id) => {
      const copyButtonVisible = [...document.querySelectorAll("button")].some((item) => (item as HTMLElement).offsetParent !== null && item.textContent?.includes("Kopieer e-mail"));
      const response = await fetch(`/api/agency/matchpack/${encodeURIComponent(id)}/client-copy`);
      return { copyButtonVisible, ok: response.ok, body: await response.json() as { copy?: { emailSubject?: string; emailBody?: string } } };
    }, seeded.pack.id);
    assert.equal(clientCopy.copyButtonVisible, true);
    assert.equal(clientCopy.ok, true);
    const copyText = `${clientCopy.body.copy?.emailSubject || ""}\n${clientCopy.body.copy?.emailBody || ""}`;
    assert.ok(copyText.trim().length > 20);
    assert.doesNotMatch(copyText, /Mila Vermeer|mila\.vermeer@example\.test|\+31 20 555 0142/ui);
    stage = "record_outcome";
    await page.evaluate(() => {
      const select = [...document.querySelectorAll("select")].find((item) => [...item.options].some((option) => option.value === "accepted")) as HTMLSelectElement;
      select.value = "accepted";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await setLabeledControl(page, "Productfeedback", "De bewijscontrole was duidelijk en de uitvoer was bruikbaar.");
    await clickButton(page, "Klantstatus opslaan");
    await waitForTextOrError(page, "Klantstatus opgeslagen");
    const recorded = await prisma.agencyMatchPack.findUniqueOrThrow({ where: { id: seeded.pack.id }, select: { clientOutcome: true, productFeedbackData: true } });
    assert.equal(recorded.clientOutcome, "accepted");
    assert.ok(recorded.productFeedbackData);

    stage = "reopen_approved";
    await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForText(page, "Kandidaatvoorstellen");
    await openHrPack(page);
    await moveToApprovalStep(page);
    await waitForText(page, "Gekozen PDF downloaden");
    assert.equal(await page.evaluate(() => [...document.querySelectorAll("input,textarea")].filter((item) => (item as HTMLElement).offsetParent !== null).some((item) => !(item as HTMLInputElement).disabled && (item as HTMLInputElement).type !== "checkbox")), true, "outcome controls remain editable after approval");

    stage = "mobile";
    await page.setViewport({ width: 390, height: 844 });
    await page.reload({ waitUntil: "domcontentloaded", timeout: 30000 });
    await waitForText(page, "Kandidaatvoorstellen");
    await openHrPack(page);
    await moveToApprovalStep(page);
    await waitForText(page, "Gekozen PDF downloaden");
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    assert.ok(overflow <= 1, `mobile viewport has ${overflow}px horizontal overflow`);
    const usageBefore = await prisma.agencyCvUsage.count({ where: { period: { subscriptionId: seeded.subscription.id } } });
    const response = await page.evaluate(async (id) => {
      const result = await fetch(`/api/agency/matchpack/${encodeURIComponent(id)}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmation: "DELETE MATCHPACK" }) });
      return { ok: result.ok, status: result.status };
    }, seeded.pack.id);
    assert.equal(response.ok, true);
    assert.equal(await prisma.agencyCvUsage.count({ where: { period: { subscriptionId: seeded.subscription.id } } }), usageBefore);
    stage = "done";
    await writeFile(".codex-tmp/container-security/agency-flow.json", JSON.stringify({ at: new Date().toISOString(), origin: baseUrl, desktop: true, mobile: true, approval: true, pdfVariants: 2, docxVariants: 2, retentionDeletion: true }, null, 2));
    console.log(JSON.stringify({ e2e: "passed", desktop: true, mobile: true, approval: true, outputs: true }));
  } finally {
    if (browser && stage !== "done") {
      await mkdir(".codex-tmp/container-security", { recursive: true });
      const page = (await browser.pages()).at(-1);
      if (page) {
        await page.screenshot({ path: ".codex-tmp/container-security/agency-last-state.png", fullPage: true }).catch(() => {});
        await writeFile(".codex-tmp/container-security/agency-last-state.txt", await page.evaluate(() => document.body.innerText).catch(() => "unavailable"));
      }
    }
    if (browser) await browser.close();
    server?.kill();
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ e2e: "failed", stage, code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (user) {
    const subscription = await prisma.agencySubscription.findUnique({ where: { userId: user.id }, select: { id: true } });
    await prisma.agencyMatchPack.deleteMany({ where: { userId: user.id } });
    await prisma.cVDocument.deleteMany({ where: { userId: user.id } });
    if (subscription) await prisma.agencySubscription.delete({ where: { id: subscription.id } });
    await prisma.session.deleteMany({ where: { userId: user.id } });
    await prisma.user.delete({ where: { id: user.id } });
  }
  await prisma.$disconnect();
});
