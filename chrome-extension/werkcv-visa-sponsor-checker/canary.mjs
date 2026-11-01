// Daily check that LinkedIn's public job search still yields employers with the extension's selectors.
//
//   node chrome-extension/werkcv-visa-sponsor-checker/canary.mjs
//
// Exits 1 when fewer than 5 employers are found, which means the layout changed: update
// lib/sponsor/extension-selectors.ts, rebuild with build.mjs, and deploy, so installed extensions pick up the new
// selectors with their next daily data refresh. Indeed blocks scripted requests, and logged-in LinkedIn differs from
// the public page, so both still need a manual look after each release.

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as cheerio from "cheerio";

const root = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(await readFile(path.join(root, "data/register.json"), "utf8"));
const { cards, cardEmployer } = data.selectors.linkedin;
const MIN_EMPLOYERS = 5;

const url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=engineer&location=Netherlands&start=0";
const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36" } });
if (!response.ok) {
  console.error(`LinkedIn answered ${response.status}; try again later or check by hand.`);
  process.exit(2);
}

const $ = cheerio.load(await response.text());
const employers = new Set();
$(cards.join(",")).each((_, card) => {
  for (const selector of cardEmployer) {
    const name = $(card).find(selector).first().text().replace(/\s+/g, " ").trim();
    if (name) {
      employers.add(name);
      break;
    }
  }
});

console.log(`LinkedIn public search: ${employers.size} employers found (${[...employers].slice(0, 5).join(", ")}…)`);
if (employers.size < MIN_EMPLOYERS) {
  console.error("Layout change suspected: the extension's selectors find too few employers.");
  process.exit(1);
}
