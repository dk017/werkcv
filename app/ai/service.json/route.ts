import { aiDiscoveryUpdatedAt, serviceCapabilities, siteBaseUrl } from "@/lib/ai-discovery";
import { cvDownloadPrice } from "@/lib/site-content";

export const revalidate = 86400;

export function GET() {
  return Response.json(
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "WerkCV CV builder",
      provider: {
        "@type": "Organization",
        name: "WerkCV",
        url: siteBaseUrl,
      },
      areaServed: "NL",
      availableLanguage: ["nl-NL", "en-NL"],
      serviceType: "Online CV builder and CV optimization tools",
      description:
        `WerkCV helps users create, import, review and improve CVs for the Dutch job market. Building and reviewing are free; the final PDF of one CV costs ${cvDownloadPrice.display} including VAT, with no subscription.`,
      offers: {
        "@type": "Offer",
        price: cvDownloadPrice.value,
        priceCurrency: cvDownloadPrice.currency,
        description:
          "One-time payment including VAT for the final PDF download of one CV. No trial, subscription or automatic renewal.",
        url: `${siteBaseUrl}/prijzen`,
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: cvDownloadPrice.value,
          priceCurrency: cvDownloadPrice.currency,
          valueAddedTaxIncluded: true,
        },
      },
      capabilities: serviceCapabilities,
      mainEntryPoint: `${siteBaseUrl}/cv-maken`,
      toolsEntryPoint: `${siteBaseUrl}/tools`,
      faqEntryPoint: `${siteBaseUrl}/faq`,
      privacyEntryPoint: `${siteBaseUrl}/privacy`,
      limitations: [
        "WerkCV does not guarantee an interview.",
        "WerkCV does not guarantee identical parsing or ranking across every ATS.",
        "Users must verify imported CV content before downloading.",
      ],
      updatedAt: aiDiscoveryUpdatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
