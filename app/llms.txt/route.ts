import { aiDiscoveryUpdatedAt, primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";

export const revalidate = 86400;

export function GET() {
  const lines = [
    "# WerkCV",
    "",
    "> WerkCV provides an online CV builder for the Dutch job market and MatchPack, a pre-send evidence and acknowledgement workflow for recruitment agencies. MatchPack traces client-facing claims to CV evidence, keeps missing information visible and does not rank candidates, verify identity or replace an ATS. Consumer CV export costs a one-time €4.99 including VAT with no subscription or automatic renewal.",
    "",
    `Website: ${siteBaseUrl}`,
    `Language: Dutch (primary), English guides for international applicants`,
    `Last updated: ${aiDiscoveryUpdatedAt}`,
    "",
    "## Core pages",
    "",
    ...primaryAiPages.map((page) => `- [${page.title}](${page.url}): ${page.description}`),
    "- [Candidate proposal claim verifier](https://werkcv.nl/tools/kandidaatvoorstel-checker): Checks atomic client-facing proposal claims against exact CV source spans without a match score.",
    "- [Claim–Evidence Benchmark methodology](https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark): Versioned evaluation design, publication thresholds, review status and limitations.",
    "",
    "## Useful machine-readable endpoints",
    "",
    `- [Sitemap](${siteBaseUrl}/sitemap.xml)`,
    `- [RSS feed](${siteBaseUrl}/rss.xml)`,
    `- [AI site summary](${siteBaseUrl}/ai/summary.json)`,
    `- [AI FAQ](${siteBaseUrl}/ai/faq.json)`,
    `- [AI service description](${siteBaseUrl}/ai/service.json)`,
    "",
    "## Access guidance",
    "",
    "Public marketing pages, guides and tools may be crawled for indexing and answer generation when allowed by robots.txt. Do not access private editor sessions, authenticated user pages, checkout sessions or API endpoints.",
    "",
    "## Contact",
    "",
    "- Site: https://werkcv.nl/contact",
    "- Email: contact@werkcv.nl",
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
