import { load } from "cheerio";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import robotsParser from "robots-parser";
import { createHash } from "node:crypto";
import { AGENCY_MONTHLY_PRICE_CENTS, AGENCY_MONTHLY_CREDIT_LIMIT } from "./agency-plan";
import { agencyDiscoveryPaths, agencyDiscoveryAuxiliary } from "./agency-discovery-targets";

export function validateAuditBase(value: string): string {
  const url = new URL(value);
  if (!["localhost", "127.0.0.1", "[::1]", "werkcv.nl"].includes(url.hostname) || !["http:", "https:"].includes(url.protocol) || url.username || url.password || url.search || url.hash || url.pathname !== "/") throw new Error("Invalid audit origin");
  if (url.hostname === "werkcv.nl" && (url.protocol !== "https:" || url.port)) throw new Error("Production must use canonical HTTPS origin");
  return url.origin;
}
export function parseAuditArgs(args: string[]) {
  let baseUrl = "http://localhost:3000";
  for (const arg of args) {
    if (!arg.startsWith("--base-url=")) throw new Error("Unknown argument");
    baseUrl = arg.slice("--base-url=".length);
  }
  return validateAuditBase(baseUrl);
}
export type AuditFetch = { status: number; contentType: string; body: string; finalUrl: string; redirects: string[]; robotsHeader: string };
export async function auditFetch(url: string, fetcher: typeof fetch = fetch): Promise<AuditFetch> {
  const origin = new URL(url).origin;
  validateAuditBase(origin);
  for (let attempt = 0; attempt < 2; attempt++) {
    let current = url;
    const redirects: string[] = [];
    try {
      for (let hop = 0; hop < 5; hop++) {
        const response = await fetcher(current, { redirect: "manual", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "WerkCV-Public-Audit/1.0", Accept: "text/html,application/json,application/xml,text/plain" } });
        if ([301, 302, 303, 307, 308].includes(response.status)) {
          const location = response.headers.get("location");
          await response.body?.cancel();
          if (!location) throw new Error("Redirect missing location");
          const next = new URL(location, current);
          const allowedPaths: readonly string[] = [...agencyDiscoveryPaths, ...agencyDiscoveryAuxiliary];
          if (next.origin !== origin || next.username || next.password || next.search || !allowedPaths.includes(next.pathname)) throw new Error("Unsafe redirect");
          redirects.push(next.href); current = next.href; continue;
        }
        if (response.status >= 500 && attempt === 0) { await response.body?.cancel(); break; }
        const reader = response.body?.getReader();
        const chunks: Uint8Array[] = []; let size = 0;
        if (reader) for (;;) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > 5_000_000) { await reader.cancel(); throw new Error("Response exceeds audit size limit"); } chunks.push(part.value); }
        return { status: response.status, contentType: response.headers.get("content-type") ?? "", robotsHeader: response.headers.get("x-robots-tag") ?? "", finalUrl: current, redirects, body: Buffer.concat(chunks).toString("utf8") };
      }
    } catch (error) {
      if (attempt || !(error instanceof Error) || !["TimeoutError", "TypeError", "AbortError"].includes(error.name)) throw error;
    }
  }
  throw new Error("Fetch or redirect limit exceeded");
}
export function sitemapUrls(xml: string): Set<string> {
  if (XMLValidator.validate(xml) !== true) throw new Error("Malformed sitemap XML");
  const parsed = new XMLParser().parse(xml);
  if (!parsed.urlset) throw new Error("Expected sitemap urlset");
  const entries = parsed.urlset.url ?? [];
  return new Set((Array.isArray(entries) ? entries : [entries]).map((x: { loc: string }) => x.loc));
}
export function inspectPublicHtml(path: string, result: AuditFetch, robots: string, sitemap: Set<string>) {
  const errors: string[] = [];
  const expected = `https://werkcv.nl${path}`;
  const $ = load(result.body);
  const canonical = $('link[rel="canonical"]').attr("href") ?? null;
  const title = $("title").text().trim(); const h1 = $("h1").text().trim();
  const directives = $("meta").toArray().filter(x => /^(robots|googlebot|bingbot)$/i.test($(x).attr("name") ?? "")).map(x => $(x).attr("content") ?? "");
  if (result.status !== 200) errors.push(`http_${result.status}`);
  if (new URL(result.finalUrl).pathname !== path || result.redirects.length) errors.push("unexpected_redirect");
  if (!result.contentType.includes("text/html")) errors.push("not_html");
  if (canonical !== expected || $('link[rel="canonical"]').length !== 1) errors.push("canonical_mismatch");
  if (!title || !h1 || $("h1").length !== 1) errors.push("missing_or_duplicate_heading");
  if ([...directives, result.robotsHeader].some(x => /\b(noindex|none|nosnippet)\b/i.test(x))) errors.push("index_or_snippet_blocked");
  const parser = robotsParser("https://werkcv.nl/robots.txt", robots);
  const robotsAllowed = Object.fromEntries(["Googlebot", "bingbot", "OAI-SearchBot"].map(bot => [bot, parser.isAllowed(expected, bot)]));
  if (Object.values(robotsAllowed).some(x => x !== true)) errors.push("robots_blocked_or_unknown");
  if (!sitemap.has(expected)) errors.push("not_in_sitemap");
  const schema: unknown[] = [];
  $('script[type="application/ld+json"]').each((_, node) => { try { schema.push(JSON.parse($(node).text())); } catch { errors.push("invalid_jsonld"); } });
  if (!schema.length) errors.push("missing_jsonld");
  const languages = $('link[rel="alternate"][hreflang]').toArray().map(x => ({ language: $(x).attr("hreflang")!, href: $(x).attr("href") ?? "" }));
  $("script,style,noscript").remove();
  const text = $("main").text().replace(/\s+/g, " ").trim();
  if (text.length < 200 || !$("main a[href]").length) errors.push("missing_initial_content_or_links");
  if (path === "/agency" || path === "/en/agency") {
    if (!text.includes(String(AGENCY_MONTHLY_PRICE_CENTS / 100)) || !text.includes(String(AGENCY_MONTHLY_CREDIT_LIMIT))) errors.push("stale_offer");
    if (/vraag pilot aan|request a pilot/i.test($("button,a,form").text())) errors.push("active_pilot_cta");
  }
  return { path, status: errors.length ? "FAIL" : "PASS", errors, httpStatus: result.status, finalUrl: result.finalUrl, redirects: result.redirects, contentType: result.contentType, canonical, title, h1, directives, robotsHeader: result.robotsHeader, robotsAllowed, inSitemap: sitemap.has(expected), languages, structuredDataBlocks: schema.length,
    contentHash: createHash("sha256").update(text).digest("hex"), google: "BLOCKED_EXTERNAL", bing: "BLOCKED_EXTERNAL", latestIndexedVersion: "unknown", notification: "NOT_RUN" };
}
export function reciprocalLanguageErrors(pages: ReturnType<typeof inspectPublicHtml>[]) {
  const errors: string[] = [];
  for (const page of pages) for (const link of page.languages) {
    if (!link.href.startsWith("https://werkcv.nl/")) { errors.push(`${page.path}: invalid language URL`); continue; }
    const peer = pages.find(x => `https://werkcv.nl${x.path}` === link.href);
    if (!peer || !peer.languages.some(x => x.href === `https://werkcv.nl${page.path}`)) errors.push(`${page.path}: unverified reciprocal peer ${link.href}`);
  }
  return errors;
}
