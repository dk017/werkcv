import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

async function main() {
  const outputDirectory = path.resolve("output/agency-qa");
  await mkdir(outputDirectory, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();
    for (const viewport of [
      { name: "desktop", width: 1440, height: 1000 },
      { name: "mobile", width: 390, height: 844 },
    ]) {
      await page.setViewport({ width: viewport.width, height: viewport.height, deviceScaleFactor: 1 });
      await page.goto("http://127.0.0.1:3010/agency", { waitUntil: "networkidle0", timeout: 120_000 });
      const audit = await page.evaluate(() => ({
        title: document.title,
        h1Count: document.querySelectorAll("h1").length,
        bodyScrollWidth: document.body.scrollWidth,
        viewportWidth: window.innerWidth,
        tabCount: document.querySelectorAll('[role="tab"]').length,
        formCount: document.querySelectorAll("form").length,
        overflow: Array.from(document.querySelectorAll("body *"))
          .map((element) => {
            const rect = element.getBoundingClientRect();
            return { tag: element.tagName, className: element.className, left: rect.left, right: rect.right, width: rect.width };
          })
          .filter((item) => item.right > window.innerWidth + 1 || item.left < -1)
          .sort((left, right) => right.right - left.right)
          .slice(0, 8),
      }));
      await page.screenshot({
        path: path.join(outputDirectory, `agency-${viewport.name}.png`) as `${string}.png`,
        fullPage: true,
      });
      console.log(JSON.stringify({ viewport: viewport.name, ...audit }));
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Agency visual smoke failed");
  process.exitCode = 1;
});
