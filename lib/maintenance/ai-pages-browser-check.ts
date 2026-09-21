import assert from "node:assert/strict";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer";

async function main() {
  const origin = process.env.AI_PAGES_TEST_ORIGIN || "http://localhost:3026";
  if (!/^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) throw new Error("LOCAL_TEST_ORIGIN_REQUIRED");
  const enabled = process.env.AI_PAGES_EXPECT_ENABLED === "true";
  const directory = `output/ai-pages-${enabled ? "on" : "off"}`;
  mkdirSync(directory, { recursive: true });
  const executablePath = ["C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
  const browser = await puppeteer.launch({ headless: true, pipe: true, ...(executablePath ? { executablePath } : {}) });
  const results: unknown[] = [];
  try {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on("request", request => {
      const url = request.url();
      if (url.startsWith(origin + "/api/")) void request.respond({ status: 200, contentType: "application/json", body: "null" }); // Public rendering only; no analytics/database writes.
      else if (url.startsWith(origin) || url.startsWith("data:") || url.startsWith("blob:")) void request.continue();
      else void request.abort(); // No third-party telemetry from certification.
    });
    for (const route of ["/cv-maken-met-ai", "/en/ai-cv-builder", "/cv-gids/cv-maken-met-chatgpt", "/en/guides/create-cv-with-chatgpt"]) {
      for (const width of [320, 375, 768, 1440]) {
        await page.setViewport({ width, height: 1000 });
        const response = await page.goto(origin + route, { waitUntil: "networkidle0" });
        assert.equal(response?.status(), 200);
        await page.waitForSelector("#example-text-student");
        const state = await page.evaluate(() => ({
          h1s: document.querySelectorAll("h1").length,
          canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href"),
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          content: document.body.textContent || "",
          schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent || "{}")),
        }));
        assert.equal(state.h1s, 1, route);
        assert.equal(state.canonical, "https://werkcv.nl" + route);
        assert.equal(state.overflow, false, `${route} width ${width}`);
        const unavailable = state.content.includes("not yet available to customers") || state.content.includes("nog niet beschikbaar voor klanten");
        assert.equal(unavailable, !enabled, route);
        const ownApp = state.schemas.some(s => s["@type"] === "SoftwareApplication" && s.url === "https://werkcv.nl" + route);
        assert.equal(ownApp, enabled && ["/cv-maken-met-ai", "/en/ai-cv-builder"].includes(route));
        const screenshot = directory + "/" + route.slice(1).replaceAll("/", "-") + "-" + width + ".png";
        if (width === 375 || width === 1440) await page.screenshot({ path: screenshot, fullPage: true });
        results.push({ route, width, h1s: state.h1s, canonical: state.canonical, enabled, overflow: state.overflow });
      }
      const before = await page.$eval("#example-text-retail", el => el.textContent);
      await page.select("main select", "classical");
      assert.equal(await page.$eval("#example-text-retail", el => el.textContent), before);
    }
    writeFileSync(directory + "/checks.json", JSON.stringify(results, null, 2));
    console.log(JSON.stringify({ passed: results.length, enabled, directory, scope: "Public page runtime flags, metadata, layout and template source stability; not authenticated certification." }));
  } finally { await browser.close(); }
}
void main().catch(error => { console.error(error); process.exitCode = 1; });
