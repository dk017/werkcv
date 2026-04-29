import { aiDiscoveryUpdatedAt, serviceCapabilities, siteBaseUrl } from "@/lib/ai-discovery";

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
      availableLanguage: ["nl-NL", "en"],
      serviceType: "Online CV builder and CV optimization tools",
      description:
        "WerkCV helps users create, check and improve CVs for the Dutch job market. The individual job seeker model is free to start and uses a one-time payment at PDF download.",
      offers: {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "EUR",
        description: "One-time payment for individual CV PDF download. No individual job seeker subscription.",
        url: `${siteBaseUrl}/prijzen`,
      },
      capabilities: serviceCapabilities,
      mainEntryPoint: `${siteBaseUrl}/cv-maken`,
      toolsEntryPoint: `${siteBaseUrl}/tools`,
      updatedAt: aiDiscoveryUpdatedAt,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    },
  );
}
