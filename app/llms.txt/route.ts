import { aiDiscoveryUpdatedAt, primaryAiPages, siteBaseUrl } from "@/lib/ai-discovery";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";
import { COMPANY_PRODUCT_DESCRIPTION, getProductDescriptions } from "@/lib/product-discovery";

const agencyCapabilities = getAgencyPublicCapabilities();
const agencyMessagingEn = getAgencyPublicMessaging({ locale: "en", capabilities: agencyCapabilities });
const agencyPrice = getAgencyMonthlyPriceDisplay("en");
const acknowledgementNote = agencyCapabilities.candidateAcknowledgement
  ? " Candidate acknowledgement is available for a named recipient and exact snapshot."
  : " Candidate acknowledgement remains unavailable until its separate production-certification gate passes.";
const benchmarkNote = agencyCapabilities.benchmarkPublished
  ? " The Claim–Evidence Benchmark methodology and reviewed results are published."
  : " The Claim–Evidence Benchmark methodology is documented, but reviewed performance results are not published yet.";

export const revalidate = 86400;

export function GET() {
  const lines = [
    "# WerkCV",
    "",
    `> ${COMPANY_PRODUCT_DESCRIPTION} MatchPack does not rank candidates, verify identity or replace an ATS.${acknowledgementNote}`,
    "",
    "## Separate products and billing",
    ...getProductDescriptions().flatMap((product) => [
      `- [${product.name}](${product.url}): ${product.description} ${product.pricing.description}`,
      `  Audience: ${product.audience}. Workspace languages: ${product.languages.workspace.join(", ")}; document languages: ${product.languages.documents.join(", ")}.`,
      `  Limitations: ${product.limitations.join(" ")}`,
    ]),
    "",
    `Website: ${siteBaseUrl}`,
    `Language: Dutch (primary), English guides for international applicants`,
    `Last updated: ${aiDiscoveryUpdatedAt}`,
    "",
    "## Core pages",
    "",
    ...primaryAiPages.map((page) => `- [${page.title}](${page.url}): ${page.description}`),
    "- [Candidate proposal evidence checker](https://werkcv.nl/tools/kandidaatvoorstel-checker): Compares vacancy requirements with candidate-CV source text, shows evidence and open points, and does not make a hiring decision.",
    `- [MatchPack for recruitment agencies](https://werkcv.nl/en/agency): ${agencyMessagingEn.description} Billing is ${agencyPrice} in EUR for ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits.${acknowledgementNote}`,
    "- [Kandidaat aanbieden bij de overheid](https://werkcv.nl/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid): Dutch guide to requirement-by-requirement CV evidence, knock-out criteria, current facts and recruiter review with a fictional matrix.",
    `- [Claim–Evidence Benchmark methodology](https://werkcv.nl/voor-bureaus/methodologie/claim-evidence-benchmark): Versioned evaluation design, publication thresholds, review status and limitations.${benchmarkNote}`,
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
