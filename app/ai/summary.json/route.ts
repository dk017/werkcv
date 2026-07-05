import { aiDiscoveryUpdatedAt, primaryAiPages, serviceCapabilities, siteBaseUrl } from "@/lib/ai-discovery";
import { cvDownloadPrice } from "@/lib/site-content";

export const revalidate = 86400;

export function GET() {
  return Response.json(
    {
      name: "WerkCV",
      alternateName: "WerkCV.nl",
      url: siteBaseUrl,
      description:
        "WerkCV is an online CV builder for the Dutch job market with a Dutch and English editor, CV import, paginated review, restrained templates, CV checking tools and one-time PDF payment.",
      primaryLanguage: "nl-NL",
      secondaryLanguages: ["en"],
      market: "Netherlands",
      audience: [
        "Dutch job seekers",
        "International applicants applying in the Netherlands",
        "Students and starters",
        "Career switchers",
        "Coaches and agencies supporting CV creation",
      ],
      pricingSummary:
        `Free to build, edit and review. The final PDF of one separate CV costs ${cvDownloadPrice.display} including VAT. No trial subscription, monthly fee or automatic renewal.`,
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
