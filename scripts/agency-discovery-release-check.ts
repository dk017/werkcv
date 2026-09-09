import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import puppeteer from "puppeteer";
import { agencyExampleDownloads } from "@/lib/agency-example-downloads";

const origin = process.env.AGENCY_RELEASE_CHECK_ORIGIN || "http://localhost:3010";
assert.ok(/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin), "Only a local test server is permitted");
const route = "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld";
const output = ".codex-tmp/agency-discovery/release-check";

async function main() {
  await mkdir(output, { recursive: true });
  const downloads = [];
  for (const item of agencyExampleDownloads) {
    const response = await fetch(`${origin}/downloads/${item.file}`, { redirect: "manual" });
    assert.equal(response.status, 200, item.file);
    assert.ok(response.headers.get("content-type")?.startsWith(item.mime), item.file);
    const bytes = Buffer.from(await response.arrayBuffer());
    const expected = await readFile(`public/downloads/${item.file}`);
    assert.deepEqual(bytes, expected, `Served bytes differ: ${item.file}`);
    downloads.push({ file: item.file, status: response.status, contentType: response.headers.get("content-type"), sha256: createHash("sha256").update(bytes).digest("hex") });
  }
  // The real server must reject denied or missing consent before any database/enrichment call.
  for (const cookie of ["", "werkcv_agency_analytics_v1=denied", "werkcv_agency_analytics_v1=invalid"]) {
    const response = await fetch(`${origin}/api/analytics`, { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify({ event: "agency_content_cta_clicked", url: route, properties: {} }) });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get("cache-control"), "no-store");
  }
  const referrerResponse = await fetch(`${origin}/api/analytics`, { method: "POST", headers: { "Content-Type": "application/json", Referer: `${origin}${route}` }, body: JSON.stringify({ event: "page_view", url: "/", properties: {} }) });
  assert.equal(referrerResponse.status, 204);

  const browser = await puppeteer.launch({ headless: true });
  console.log("Downloads and server consent checks passed; browser launched.");
  try {
    const page = await browser.newPage();
    const events: Array<{ event: string; properties: Record<string, unknown> }> = [];
    const thirdParty: string[] = [];
    await page.setRequestInterception(true);
    page.on("request", (request) => {
      if (!request.url().startsWith(origin) && /^https?:/.test(request.url())) { thirdParty.push(new URL(request.url()).hostname); void request.abort(); return; }
      // Never persist test events or contact a real analytics provider.
      if (new URL(request.url()).pathname === "/api/analytics") {
        events.push(JSON.parse(request.postData() || "{}"));
        void request.respond({ status: 204 }); return;
      }
      void request.continue();
    });
    await page.setViewport({ width: 375, height: 900 });
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('aside[aria-label="Voorkeur voor gebruiksmeting"] summary');
    console.log("Example loaded.");
    assert.equal(events.length, 0, "No events before consent");
    assert.equal(await page.evaluate(() => localStorage.getItem("werkcv_visitor_id_v1")), null);
    assert.equal(await page.$$('main a[download]').then((links) => links.length), 6);
    assert.deepEqual(thirdParty, [], "Agency pages must not load third-party analytics");
    const session = await page.createCDPSession();
    await session.send("Browser.setDownloadBehavior", { behavior: "deny" });
    await page.click('main a[download]');
    assert.equal(events.length, 0, "Download works without emitting a denied click");
    await page.click('aside[aria-label="Voorkeur voor gebruiksmeting"] summary');
    await page.evaluate(() => Array.from(document.querySelectorAll('aside button')).find((button) => button.textContent === "Meting toestaan")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    await page.waitForFunction(() => document.cookie.includes("werkcv_agency_analytics_v1=granted"));
    console.log("Consent granted.");
    assert.equal(events.length, 0, "Consent must not replay earlier events");
    await page.click('main a[download]');
    await page.waitForFunction(() => !!localStorage.getItem("werkcv_visitor_id_v1"));
    assert.equal(events.length, 1, "One intentional download click, no duplicate generic CTA event");
    assert.equal(events[0].event, "agency_content_cta_clicked");
    assert.deepEqual(Object.keys(events[0].properties).sort(), ["destination", "intent", "location", "path"]);
    await page.evaluate(() => Array.from(document.querySelectorAll('aside button')).find((button) => button.textContent === "Geen meting")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    await page.click('main a[download]');
    await page.waitForFunction(() => document.cookie.includes("werkcv_agency_analytics_v1=denied"));
    assert.equal(events.length, 1, "Withdrawal stops future events immediately");
    await page.reload({ waitUntil: "domcontentloaded" });
    assert.equal(events.length, 1, "Denied preference survives reload");
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewport({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({ width: innerWidth, scroll: document.documentElement.scrollWidth }));
      assert.equal(dimensions.width, dimensions.scroll, `Overflow at ${width}`);
      await page.$eval('#voorbeeld-downloads', (element) => element.scrollIntoView());
      await page.screenshot({ path: `${output}/downloads-${width}.png` });
    }
    await page.setViewport({ width: 375, height: 900 });
    await page.click('aside[aria-label="Voorkeur voor gebruiksmeting"] summary');
    await page.$eval('aside[aria-label="Voorkeur voor gebruiksmeting"]', (element) => element.scrollIntoView());
    await page.screenshot({ path: `${output}/preferences-375.png` });
    await page.goto(`${origin}/en/agency`, { waitUntil: "domcontentloaded" });
    await page.waitForSelector('aside[aria-label="Analytics preferences"]');
    assert.ok(await page.$('aside[aria-label="Analytics preferences"]'));
    assert.equal(events.length, 1, "English Agency route respects the same declined choice");
    assert.deepEqual(thirdParty, []);
    await page.setJavaScriptEnabled(false);
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    assert.equal((await page.$$('main a[download]')).length, 6, "Downloads must exist without JavaScript");
    await writeFile(`${output}/results.json`, JSON.stringify({ observedAt: new Date().toISOString(), browser: await browser.version(), downloads, consent: "PASS unknown/granted/denied/withdrawal/reload/server-drop", cta: "one event after grant, none before or after withdrawal", thirdParty, widths: [320, 375, 768, 1440], noJsDownloads: 6 }, null, 2));
    console.log("PASS: six exact downloads, default-denied consent, one click event, withdrawal, server rejection, responsive layout and no-JS links.");
  } finally { await browser.close(); }
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
