import { mkdir, writeFile } from "node:fs/promises";
import { agencyDiscoveryPaths, agencyDiscoveryAuxiliary, agencyDiscoveryPeers } from "../lib/agency-discovery-targets";
import { auditFetch, inspectPublicHtml, parseAuditArgs, reciprocalLanguageErrors, sitemapUrls } from "../lib/agency-discovery-audit";

async function main() {
  const base = parseAuditArgs(process.argv.slice(2));
  const aux = new Map<string, Awaited<ReturnType<typeof auditFetch>>>();
  const errors: string[] = [];
  for (const path of agencyDiscoveryAuxiliary) {
    try {
      const result = await auditFetch(`${base}${path}`); aux.set(path, result);
      if (result.status !== 200) errors.push(`${path}: http_${result.status}`);
      if (path.endsWith(".json")) { JSON.parse(result.body); if (!result.contentType.includes("application/json")) errors.push(`${path}: invalid content type`); }
    } catch { errors.push(`${path}: transport_or_parse_failure`); }
  }
  const pages: ReturnType<typeof inspectPublicHtml>[] = [];
  let sitemap = new Set<string>();
  try { sitemap = sitemapUrls(aux.get("/sitemap.xml")?.body ?? ""); } catch { errors.push("sitemap_invalid"); }
  for (const path of agencyDiscoveryPaths) {
    try { pages.push(inspectPublicHtml(path, await auditFetch(`${base}${path}`), aux.get("/robots.txt")?.body ?? "", sitemap)); }
    catch { errors.push(`${path}: transport_failure`); }
  }
  errors.push(...reciprocalLanguageErrors(pages));
  for (const [path, peer] of Object.entries(agencyDiscoveryPeers)) if (!pages.find(x => x.path === path)?.languages.some(x => x.href === `https://werkcv.nl${peer}`)) errors.push(`${path}: missing required language peer`);
  try {
    const summary = JSON.parse(aux.get("/ai/summary.json")!.body);
    const service = JSON.parse(aux.get("/ai/service.json")!.body);
    if (summary.products?.length !== 2 || service["@graph"]?.length !== 2) errors.push("product_contract_not_released");
  } catch { errors.push("product_contract_unavailable"); }
  const report = { observedAt: new Date().toISOString(), base, buildIdentity: "unavailable", status: errors.length || pages.some(x => x.status !== "PASS") ? "FAIL" : "PASS", errors, pages,
    limits: "Technical audit only. Google/Bing require authenticated inspection. No verified-bot WAF or AI-citation certification. No notifications sent." };
  const directory = ".codex-tmp/agency-discovery"; await mkdir(directory, { recursive: true });
  const label = base.includes("werkcv.nl") ? "production" : "local";
  await writeFile(`${directory}/${label}.json`, JSON.stringify(report, null, 2));
  await writeFile(`${directory}/${label}.md`, `# ${label} technical audit\n\n${report.observedAt}\n\n${report.limits}\n\n| URL | Technical | Google | Bing |\n| --- | --- | --- | --- |\n${pages.map(p => `| ${p.path} | ${p.status}: ${p.errors.join(", ")} | ${p.google} | ${p.bing} |`).join("\n")}\n\n${errors.join("\n")}\n`);
  console.log(JSON.stringify({ status: report.status, pages: pages.length, errors, report: `${directory}/${label}.json` }));
  if (report.status !== "PASS") process.exitCode = 1;
}
main().catch(() => { console.error("audit_failed: invalid arguments or unavailable resources"); process.exitCode = 1; });
