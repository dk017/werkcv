import assert from "node:assert/strict";
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sampleCV } from "@/lib/cv";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";

const { runId } = requireAgencyTestDatabase();
const email = `workspace-browser-${runId}@example.test`;
const secret = `workspace-e2e-${runId}`;
const token = crypto.randomBytes(32).toString("hex");
const tokenHash = crypto.createHash("sha256").update(`${secret}:${token}`).digest("hex");
const port = 3131;
const baseUrl = `http://127.0.0.1:${port}`;

async function main() {
  const now = new Date();
  const user = await prisma.user.create({ data: { email } });
  const subscription = await prisma.agencySubscription.create({ data: {
    userId: user.id, status: "active", companyName: "Workspace Test Agency",
    currentPeriodStart: new Date(now.getTime() - 60_000), currentPeriodEnd: new Date(now.getTime() + 30 * 86400000),
    retentionPolicySetAt: now, retentionUpdatedAt: now, monthlyLimit: 50, excludeFromProductMetrics: true,
  } });
  await prisma.session.create({ data: { tokenHash, userId: user.id, expiresAt: new Date(now.getTime() + 86400000) } });
  const personal = await prisma.cVDocument.create({ data: {
    userId: user.id, agencySubscriptionId: null, title: `Personal ${runId}`,
    data: structuredClone(sampleCV) as unknown as Prisma.InputJsonValue, templateId: "professional", colorThemeId: "classic-blue",
  } });
  const agency = await prisma.cVDocument.create({ data: {
    userId: user.id, agencySubscriptionId: subscription.id, title: `Agency ${runId}`,
    data: structuredClone(sampleCV) as unknown as Prisma.InputJsonValue, templateId: "professional", colorThemeId: "classic-blue", startSource: "agency_plan",
  } });

  const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(port), "-H", "127.0.0.1"], {
    cwd: process.cwd(), env: { ...process.env, DATABASE_URL: process.env.AGENCY_TEST_DATABASE_URL!, AUTH_SESSION_SECRET: secret,
      NEXT_PUBLIC_APP_URL: baseUrl, WORKSPACE_SWITCHER_ENABLED: "true", OPENAI_API_KEY: "sk-test" }, stdio: ["ignore", "pipe", "pipe"],
  });
  let diagnostic = "";
  server.stdout?.on("data", (chunk) => { diagnostic = `${diagnostic}${String(chunk)}`.slice(-1000); });
  server.stderr?.on("data", (chunk) => { diagnostic = `${diagnostic}${String(chunk)}`.slice(-1000); });
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;
  try {
    for (let attempt = 0; attempt < 60; attempt += 1) {
      if (server.exitCode !== null) throw new Error(`WORKSPACE_E2E_SERVER_EXITED:${diagnostic}`);
      try { await fetch(`${baseUrl}/api/build-version`, { signal: AbortSignal.timeout(2000) }); break; } catch { /* starting */ }
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (attempt === 59) throw new Error(`WORKSPACE_E2E_SERVER_NOT_READY:${diagnostic}`);
    }
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setCookie({ name: "werkcv_session", value: token, url: baseUrl, httpOnly: true, sameSite: "Lax" });

    await page.goto(`${baseUrl}/mijn-cvs`, { waitUntil: "domcontentloaded" });
    const personalBody = await page.evaluate(() => document.body.innerText);
    assert.match(personalBody, new RegExp(`Personal ${runId}`));
    assert.doesNotMatch(personalBody, new RegExp(`Agency ${runId}`));

    await page.goto(`${baseUrl}/agency/account`, { waitUntil: "domcontentloaded" });
    const agencyBody = await page.evaluate(() => document.body.innerText);
    assert.match(agencyBody, new RegExp(`Agency ${runId}`));
    assert.doesNotMatch(agencyBody, new RegExp(`Personal ${runId}`));

    await page.goto(`${baseUrl}/editor?id=${agency.id}&workspace=consumer`, { waitUntil: "domcontentloaded" });
    assert.equal(await page.$eval('a[href="/agency/account"]', () => true).catch(() => false), true, "Agency CV remains MatchPack");
    await page.goto(`${baseUrl}/editor?id=${personal.id}&workspace=agency`, { waitUntil: "domcontentloaded" });
    assert.equal(await page.$eval('a[href="/mijn-cvs"]', () => true).catch(() => false), true, "Personal CV remains Personal");

    const navigation = await page.evaluate(async () => (await fetch("/api/auth/me")).json());
    assert.equal(navigation.workspaceSwitcherEnabled, true);
    console.log(JSON.stringify({ workspaceE2e: "passed", listsExclusive: true, queryCannotReclassify: true }));
  } finally {
    if (browser) await browser.close();
    server.kill();
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ workspaceE2e: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (user) {
    const subscription = await prisma.agencySubscription.findUnique({ where: { userId: user.id }, select: { id: true } });
    await prisma.cVDocument.deleteMany({ where: { userId: user.id } });
    await prisma.session.deleteMany({ where: { userId: user.id } });
    if (subscription) await prisma.agencySubscription.delete({ where: { id: subscription.id } });
    await prisma.user.delete({ where: { id: user.id } });
  }
  await prisma.$disconnect();
});
