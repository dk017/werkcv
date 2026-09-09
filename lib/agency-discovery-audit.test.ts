import assert from "node:assert/strict";
import test from "node:test";
import { auditFetch, inspectPublicHtml, parseAuditArgs, reciprocalLanguageErrors, sitemapUrls, type AuditFetch } from "./agency-discovery-audit";
const url = "https://werkcv.nl/agency";
const html = `<html><head><title>MatchPack</title><link rel="canonical" href="${url}"><script type="application/ld+json">{"@type":"SoftwareApplication"}</script></head><body><main><h1>MatchPack</h1><p>99 per month, 300 shared credits. ${"Public source evidence review. ".repeat(12)}</p><a href="/agency#plan">Plan</a></main></body></html>`;
const response: AuditFetch = { body: html, contentType: "text/html", status: 200, finalUrl: url, redirects: [], robotsHeader: "" };
const robots = "User-agent: *\nAllow: /\nDisallow: /agency/account\n";
function inspect(patch: Partial<AuditFetch> = {}, rules = robots) { return inspectPublicHtml("/agency", { ...response, ...patch }, rules, new Set([url])); }
test("public HTML audit passes only eligible initial content", () => { assert.equal(inspect().status, "PASS"); });
for (const [name, patch] of Object.entries({
  noindex: { body: html.replace("</head>", '<meta name="robots" content="noindex"></head>') },
  header: { robotsHeader: "noindex" }, canonical: { body: html.replace(url, "https://werkcv.nl/") },
  redirect: { redirects: [url] }, notFound: { status: 404 }, json: { body: html.replace('{"@type":"SoftwareApplication"}', '{broken') },
  empty: { body: "<html><title>App</title><body></body></html>" }, stale: { body: html.replace("99 per month, 300", "149 per month, 50") },
})) test(`reject ${name}`, () => { assert.equal(inspect(patch).status, "FAIL"); });
test("robots specificity is honored", () => {
  assert.equal(inspect({}, "User-agent: *\nAllow: /\nUser-agent: Googlebot\nDisallow: /agency\n").status, "FAIL");
  assert.equal(inspect({}, "User-agent: *\nDisallow: /\nUser-agent: Googlebot\nAllow: /\nUser-agent: bingbot\nAllow: /\nUser-agent: OAI-SearchBot\nAllow: /\n").status, "PASS");
});
test("indexing unavailable is never reported as indexed", () => { assert.equal(inspect().google, "BLOCKED_EXTERNAL"); });
test("XML and hreflang failures are explicit", () => {
  assert.throws(() => sitemapUrls("<urlset><url></urlset>"));
  assert.deepEqual([...sitemapUrls(`<urlset><url><loc>${url}</loc></url></urlset>`)], [url]);
  const page = inspect({ body: html.replace("</head>", '<link rel="alternate" hreflang="en" href="https://werkcv.nl/en/missing"></head>') });
  assert.equal(reciprocalLanguageErrors([page]).length, 1);
});
test("audit origins and CLI reject unsafe input", () => {
  for (const value of ["--bad=1", "--base-url=https://other.example", "--base-url=http://werkcv.nl", "--base-url=https://user:pass@werkcv.nl"]) assert.throws(() => parseAuditArgs([value]));
  assert.equal(parseAuditArgs(["--base-url=http://localhost:3010"]), "http://localhost:3010");
});
test("bounded fetch fails safely on timeout and cross-host redirect", async () => {
  let calls = 0;
  await assert.rejects(auditFetch(url, (async () => { calls++; throw new DOMException("timeout", "TimeoutError"); }) as typeof fetch));
  assert.equal(calls, 2);
  await assert.rejects(auditFetch(url, (async () => new Response(null, { status: 302, headers: { location: "https://evil.example" } })) as typeof fetch), /Unsafe redirect/);
});
