import { load } from "cheerio";
import sitemap from "../app/sitemap";

// Run against a local Next server: npx tsx scripts/internal-link-audit.ts --origin=http://localhost:3000
// Use --paths=/path-one,/path-two for a focused smoke check. Non-sitemap targets can be intentional.

type PageResult = {
  path: string;
  status: number;
  canonical: string | null;
  links: string[];
  mainLinks: string[];
  error?: string;
};

const originArg = process.argv.find((arg) => arg.startsWith("--origin="))?.slice(9) ?? "http://localhost:3000";
const limit = Number(process.argv.find((arg) => arg.startsWith("--limit="))?.slice(8) ?? "0");
const concurrency = Number(process.argv.find((arg) => arg.startsWith("--concurrency="))?.slice(14) ?? "4");
const selectedPaths = process.argv.find((arg) => arg.startsWith("--paths="))?.slice(8).split(",");

function normalizeOrigin(value: string): string {
  let parsed: URL;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error(`Invalid --origin value: ${value}. Use --origin=http://localhost:3000 (without Markdown brackets).`);
  }
  if (!['http:', 'https:'].includes(parsed.protocol) || parsed.pathname !== '/' || parsed.search || parsed.hash) {
    throw new Error(`Invalid --origin value: ${value}. Pass only the site origin, for example --origin=http://localhost:3000.`);
  }
  return parsed.origin;
}

const origin = normalizeOrigin(originArg);

function pathFromHref(href: string, sourcePath = "/"): string | null {
  try {
    const url = new URL(href, `https://werkcv.nl${sourcePath}`);
    if (url.hostname !== "werkcv.nl" && url.hostname !== "www.werkcv.nl") return null;
    return url.pathname.replace(/\/$/, "") || "/";
  } catch {
    return null;
  }
}

async function inspect(path: string): Promise<PageResult> {
  try {
    const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(45000) });
    const $ = load(await response.text());
    const links = (selector: string, contextual = false) => [...new Set($(selector).toArray()
      .filter((element) => !contextual || $(element).closest("footer, header, nav").length === 0)
      .map((element) => $(element).attr("href"))
      .filter((href): href is string => Boolean(href))
      .map((href) => pathFromHref(href, path))
      .filter((href): href is string => Boolean(href)))];
    return {
      path,
      status: response.status,
      canonical: $("link[rel='canonical']").attr("href") ?? null,
      links: links("a[href]"),
      mainLinks: links("main a[href]", true),
    };
  } catch (error) {
    return { path, status: 0, canonical: null, links: [], mainLinks: [], error: String(error) };
  }
}

async function main() {
  const entries = await sitemap();
  const allPaths = [...new Set(entries.map((entry) => pathFromHref(entry.url)).filter((path): path is string => Boolean(path)))];
  const paths = selectedPaths ?? (limit > 0 ? allPaths.slice(0, limit) : allPaths);
  const complete = paths.length === allPaths.length;
  const results: PageResult[] = [];
  let index = 0;

  console.error(`Auditing ${paths.length} pages at ${origin} with concurrency ${Math.max(1, concurrency)}...`);

  await Promise.all(Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (index < paths.length) {
      const path = paths[index++];
      results.push(await inspect(path));
      if (results.length % 10 === 0 || results.length === paths.length) {
        console.error(`Checked ${results.length}/${paths.length} pages`);
      }
    }
  }));

  const listed = new Set(allPaths);
  const incoming = new Map(allPaths.map((path) => [path, 0]));
  const mainIncoming = new Map(allPaths.map((path) => [path, 0]));
  const missing = new Map<string, string[]>();
  for (const page of results) {
    if (page.status !== 200) continue;
    for (const target of page.links) {
      if (target === page.path) continue;
      if (listed.has(target)) incoming.set(target, (incoming.get(target) ?? 0) + 1);
      else if (!target.startsWith("/api/") && !target.startsWith("/_next/")) {
        missing.set(target, [...(missing.get(target) ?? []), page.path]);
      }
    }
    for (const target of page.mainLinks) {
      if (target !== page.path && listed.has(target)) mainIncoming.set(target, (mainIncoming.get(target) ?? 0) + 1);
    }
  }

  const failed = results.filter((page) => page.status !== 200);
  const noIncoming = allPaths.filter((path) => incoming.get(path) === 0);
  const noMainIncoming = allPaths.filter((path) => mainIncoming.get(path) === 0);
  const unexpectedCanonical = results.filter((page) => page.status === 200 && page.canonical && pathFromHref(page.canonical) !== page.path);
  console.log(JSON.stringify({
    origin, audited: results.length, sitemap: allPaths.length,
    failed: failed.map(({ path, status, error }) => ({ path, status, error })),
    noIncomingCount: complete ? noIncoming.length : null,
    noIncoming: complete ? noIncoming.slice(0, 150) : [],
    noMainIncomingCount: complete ? noMainIncoming.length : null,
    noMainIncoming: complete ? noMainIncoming.slice(0, 100) : [],
    unexpectedCanonical: unexpectedCanonical.map(({ path, canonical }) => ({ path, canonical })),
    unlistedTargets: [...missing].sort((a, b) => b[1].length - a[1].length).slice(0, 100)
      .map(([path, sources]) => ({ path, count: sources.length, sources: sources.slice(0, 8) })),
    sampleCounts: Object.fromEntries(["/cv-maken", "/cv-maken-zonder-abonnement", "/prijzen", "/templates", "/cv-voorbeelden", "/cv-tips", "/cv-gids"].map((path) => [path, { all: incoming.get(path), main: mainIncoming.get(path) }])),
  }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
