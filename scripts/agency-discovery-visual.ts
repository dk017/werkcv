import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

async function main() {
  const directory = path.resolve(".codex-tmp/agency-discovery/screens");
  await mkdir(directory, { recursive: true });
  const browser = await puppeteer.launch({ headless: true });
  const results = [];
  try {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setJavaScriptEnabled(false);
    for (const route of ["/agency", "/en/agency", "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau", "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld"]) {
      for (const width of [320, 375, 768, 1440]) {
        await page.setViewport({ width, height: 900 });
        const response = await page.goto(`http://localhost:3010${route}`, { waitUntil: "networkidle0", timeout: 60000 });
        const measured = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth, h1: document.querySelector("h1")?.textContent, content: document.querySelector("main")?.textContent?.length ?? 0 }));
        const filename = `${route.replaceAll("/", "_")}-${width}.png`;
        await page.screenshot({ path: path.join(directory, filename.replace(".png", "-top.png")), fullPage: false });
        await page.screenshot({ path: path.join(directory, filename), fullPage: true });
        results.push({ route, width, httpStatus: response?.status(), ...measured, screenshot: filename });
        assert.equal(response?.status(), 200);
        assert.ok(measured.scroll <= measured.width + 1, `${route} at ${width}: horizontal overflow ${measured.scroll}`);
        assert.ok(measured.content > 500, "Core content must be readable without JavaScript");
      }
    }
    const keyboard = [];
    await page.setViewport({ width: 375, height: 900 });
    for (const route of [...new Set(results.map((result) => result.route))]) {
      await page.goto(`http://localhost:3010${route}`, { waitUntil: "networkidle0" });
      await page.focus("main a[href]");
      assert.equal(await page.evaluate(() => document.activeElement?.tagName), "A");
      if (await page.$("main details summary")) {
        await page.focus("main details summary");
        await page.keyboard.press("Enter");
        assert.equal(await page.$eval("main details", (node) => node.hasAttribute("open")), true);
      }
      if (await page.$('main [role="region"][tabindex="0"]')) {
        await page.focus('main [role="region"][tabindex="0"]');
        await page.keyboard.press("ArrowRight");
        await page.waitForFunction(() => (document.querySelector('main [role="region"][tabindex="0"]')?.scrollLeft ?? 0) > 0);
      }
      keyboard.push({ route, focusableMainLink: true, disclosuresAndScrollRegions: "PASS where present" });
    }
    const publicNavigation = [];
    for (const route of ["/", "/prijzen", "/en/pricing", "/templates", "/en/templates"]) {
      const response = await page.goto(`http://localhost:3010${route}`, { waitUntil: "networkidle0" });
      assert.equal(response?.status(), 200, route);
      assert.ok(new URL(page.url()).pathname === route, `${route}: unexpected navigation`);
      publicNavigation.push({ route, status: response?.status(), actualPath: new URL(page.url()).pathname });
    }
    await writeFile(path.join(directory, "results.json"), JSON.stringify({ observedAt: new Date().toISOString(), browser: await browser.version(), javascript: false, results, keyboard, publicNavigation }, null, 2));
    console.log(`PASS: ${results.length} no-JavaScript layout measurements. Screenshots require human visual inspection.`);
  } finally { await browser.close(); }
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
