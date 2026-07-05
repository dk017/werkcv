import { aiDiscoveryUpdatedAt, primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";

export const revalidate = 86400;

export function GET() {
  const lines = [
    "# WerkCV",
    "",
    "> WerkCV is an online CV builder for the Dutch job market. Users can build, import, edit and fully review a Dutch or English CV for free, then pay a one-time €4.99 including VAT for the final PDF of one CV. There is no trial, subscription or automatic renewal. WerkCV provides an ATS-oriented layout but does not guarantee ranking or selection by every ATS.",
    "",
    `Website: ${siteBaseUrl}`,
    `Language: Dutch (primary), English guides for international applicants`,
    `Last updated: ${aiDiscoveryUpdatedAt}`,
    "",
    "## Core pages",
    "",
    ...primaryAiPages.map((page) => `- [${page.title}](${page.url}): ${page.description}`),
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
