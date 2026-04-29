import { aiDiscoveryUpdatedAt, primaryAiPages, serviceCapabilities, siteBaseUrl } from "@/lib/ai-discovery";

export const revalidate = 86400;

export function GET() {
  return Response.json(
    {
      name: "WerkCV",
      alternateName: "WerkCV.nl",
      url: siteBaseUrl,
      description:
        "WerkCV is an online CV builder for the Dutch job market with ATS-friendly templates, CV checking tools and a one-time PDF download payment model for individual job seekers.",
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
        "Free to start. Individual users pay once when downloading the final CV as a PDF. No subscription for individual job seekers.",
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
