import { aiDiscoveryUpdatedAt, primaryAiPages, serviceCapabilities, siteBaseUrl } from "@/lib/ai-discovery";
import { cvDownloadPrice } from "@/lib/site-content";
import { COMPANY_PRODUCT_DESCRIPTION, getCompanyPricingSummary, getProductDescriptions, PRODUCT_DISCOVERY_VERSION } from "@/lib/product-discovery";

export const revalidate = 86400;

export function GET() {
  return Response.json(
    {
      name: "WerkCV",
      alternateName: "WerkCV.nl",
      url: siteBaseUrl,
      description: COMPANY_PRODUCT_DESCRIPTION,
      schemaVersion: PRODUCT_DISCOVERY_VERSION,
      products: getProductDescriptions(),
      primaryLanguage: "nl-NL",
      secondaryLanguages: ["en"],
      market: "Netherlands",
      audience: [
        "Dutch job seekers",
        "International applicants applying in the Netherlands",
        "Students and starters",
        "Career switchers",
        "Recruitment agencies and staffing firms preparing candidate proposals with MatchPack",
      ],
      pricingSummary: getCompanyPricingSummary(),
      consumerPricingSummary: `Consumer CV Builder: free to build, edit and review; ${cvDownloadPrice.display} including VAT once for the final PDF of one CV. No consumer subscription.`,
      productFactsScope: "WerkCV CV Builder only; see products for MatchPack facts",
      productFacts: {
        account:
          "Access uses a six-digit email code. A first successful verification creates the account; later codes provide access to existing CVs.",
        upload:
          "Existing CV import accepts PDF, DOC and DOCX up to 10 MB. Imported fields must be reviewed by the user.",
        saving:
          "The editor autosaves and shows a visible saved state.",
        paidDocument:
          "The same paid CV can be edited, restyled and downloaded again without a second payment for that document.",
        privacy:
          "CVs are not automatically published as public web pages. WerkCV does not sell CV content or personal data.",
      },
      limitations: [
        "No CV builder can guarantee an interview.",
        "No CV builder can guarantee parsing, ranking or selection across every ATS.",
        "WerkCV provides general CV guidance, not legal advice or individual career coaching.",
      ],
      capabilities: serviceCapabilities,
      importantPages: primaryAiPages,
      contact: {
        email: "contact@werkcv.nl",
        url: `${siteBaseUrl}/contact`,
      },
      updatedAt: aiDiscoveryUpdatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
