import { access, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";
import { getExampleBySlug } from "@/lib/cv-voorbeelden/registry";
import { buildHTML } from "@/lib/pdf";

const previewExamples = [
  ["studenten-en-starters", "student-cv"],
  ["zorg-en-welzijn", "verpleegkundige"],
  ["technologie-en-ict", "software-ontwikkelaar"],
  ["vakmanschap-en-logistiek", "magazijnmedewerker"],
  ["onderwijs", "onderwijsassistent"],
  ["horeca-en-detailhandel", "winkelmedewerker"],
  ["zakelijk-en-financieel", "administratief-medewerker"],
  ["marketing-en-communicatie", "marketing-manager"],
] as const;

async function main() {
  const outputDirectory = path.join(process.cwd(), "public", "cv-example-previews");
  await mkdir(outputDirectory, { recursive: true });
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  try {
    for (const [categorySlug, exampleSlug] of previewExamples) {
      const outputPath = path.join(outputDirectory, `${exampleSlug}.png`);
      try {
        await access(outputPath);
        console.log(`Keeping existing ${exampleSlug}.png`);
        continue;
      } catch {
        // Generate missing previews below.
      }

      const example = getExampleBySlug(categorySlug, exampleSlug);
      if (!example) {
        throw new Error(`Missing CV example: ${categorySlug}/${exampleSlug}`);
      }

      const page = await browser.newPage();
      await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
      await page.setRequestInterception(true);
      page.on("request", (request) => {
        if (request.url().startsWith("http")) request.abort();
        else request.continue();
      });
      await page.setContent(
        buildHTML(example.sampleCV, example.templateId, example.colorThemeId),
        { waitUntil: "domcontentloaded" },
      );
      const png = await page.screenshot({
        type: "png",
        clip: { x: 0, y: 0, width: 794, height: 1123 },
      });
      await page.close();
      await writeFile(outputPath, png);
      console.log(`Generated ${exampleSlug}.png`);
    }
  } finally {
    const browserProcess = browser.process();
    await Promise.race([
      browser.close(),
      new Promise((resolve) => setTimeout(resolve, 5_000)),
    ]);
    if (browserProcess && !browserProcess.killed) browserProcess.kill();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
