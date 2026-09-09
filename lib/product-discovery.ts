import { cvDownloadPrice, siteUrl } from "@/lib/site-content";
import { AGENCY_CURRENCY, AGENCY_MONTHLY_CREDIT_LIMIT, AGENCY_MONTHLY_PRICE_CENTS, getAgencyCreditExplanation, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import { getAgencyPublicCapabilities, type AgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";
import { AGENCY_WORKSPACE_LANGUAGE_NOTICE, getAgencyReviewScopeNotice } from "@/lib/agency-review-scope";

export const PRODUCT_DISCOVERY_VERSION = 2;
export const PRODUCT_DISCOVERY_MODIFIED = "2026-09-07";
export const COMPANY_PRODUCT_DESCRIPTION = "WerkCV provides WerkCV CV Builder for individuals applying in the Netherlands, and WerkCV MatchPack for recruitment agencies preparing and reviewing candidate proposals.";

export function getProductDescriptions(capabilities = getAgencyPublicCapabilities()) {
  const messaging = getAgencyPublicMessaging({ locale: "en", capabilities });
  return [
    {
      id: `${siteUrl}/#cv-builder`, name: "WerkCV CV Builder",
      audience: "Individuals applying for jobs in the Netherlands",
      url: `${siteUrl}/cv-maken`, englishUrl: `${siteUrl}/en`, privacyUrl: `${siteUrl}/privacy`,
      description: "Create or import a CV, edit it and preview all pages before downloading the final PDF.",
      pricing: { kind: "one_time_per_document", amount: cvDownloadPrice.value, currency: cvDownloadPrice.currency,
        description: `Consumer CV Builder: ${cvDownloadPrice.displayEn} including VAT once for the final PDF of one CV. No subscription. Editing and repeat downloads of that paid CV do not require another payment.` },
      languages: { publicPages: ["nl", "en"], workspace: ["nl", "en"], documents: ["nl", "en"] },
      capabilities: ["CV creation and import", "Full paginated preview", "Template and colour selection", "PDF download", "Editing and repeat downloads of the same paid CV"],
      limitations: ["Imported content requires user review.", "No guarantee of interviews or identical parsing across every ATS."],
    },
    {
      id: `${siteUrl}/agency#software`, name: "WerkCV MatchPack",
      audience: "Recruitment agencies and staffing firms preparing vacancy-specific candidate proposals",
      url: `${siteUrl}/agency`, englishUrl: `${siteUrl}/en/agency`, privacyUrl: `${siteUrl}/agency/privacy`,
      description: messaging.description,
      pricing: { kind: "monthly_subscription", amount: (AGENCY_MONTHLY_PRICE_CENTS / 100).toFixed(2), currency: AGENCY_CURRENCY,
        description: `MatchPack: ${getAgencyMonthlyPriceDisplay("en")} for ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits per paid period. ${getAgencyCreditExplanation("en")}` },
      languages: { publicPages: ["nl", "en"], workspace: ["nl"], documents: ["nl", "en"] },
      workspaceNotice: AGENCY_WORKSPACE_LANGUAGE_NOTICE,
      capabilities: [...messaging.featureList, "Reusable agency templates", "Team roles", "Retention and deletion controls",
        ...(capabilities.candidateAcknowledgement ? ["Candidate acknowledgement for a named recipient and exact version"] : []),
        ...(capabilities.benchmarkPublished ? ["Published reviewed Claim–Evidence Benchmark results"] : [])],
      limitations: [messaging.limitation, "Not an ATS integration, ranking engine, client portal or automatic client-sending service.",
        "Source support does not establish truth, legal identity or legal compliance.",
        "The original upload file is not retained; extracted source text and structured records are retained under the Agency retention policy. Review current privacy, DPA and subprocessor disclosures before use.",
        ...(!capabilities.candidateAcknowledgement ? ["Candidate acknowledgement is not currently available."] : []),
        ...(!capabilities.benchmarkPublished ? ["Reviewed benchmark performance results are not currently published."] : [])],
    },
  ];
}

export function getCompanyPricingSummary(capabilities = getAgencyPublicCapabilities()) {
  return getProductDescriptions(capabilities).map((product) => product.pricing.description).join(" ");
}

export function getProductSoftwareJsonLd(product: ReturnType<typeof getProductDescriptions>[number]) {
  return {
    "@type": "SoftwareApplication", "@id": product.id, name: product.name, url: product.url,
    applicationCategory: product.pricing.kind === "monthly_subscription" ? "BusinessApplication" : "ProductivityApplication",
    operatingSystem: "Web", description: product.description,
    audience: { "@type": "Audience", audienceType: product.audience },
    inLanguage: product.languages.workspace, featureList: product.capabilities,
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: { "@type": "Offer", price: product.pricing.amount, priceCurrency: product.pricing.currency,
      description: product.pricing.description,
      url: product.pricing.kind === "monthly_subscription" ? `${siteUrl}/agency#plan` : `${siteUrl}/prijzen`,
      ...(product.pricing.kind === "one_time_per_document" ? { priceSpecification: { "@type": "UnitPriceSpecification", price: product.pricing.amount, priceCurrency: product.pricing.currency, valueAddedTaxIncluded: true } } : {}),
    },
  };
}

export function getAgencySoftwareJsonLd(locale: "nl" | "en", capabilities: AgencyPublicCapabilities = getAgencyPublicCapabilities()) {
  const product = getProductDescriptions(capabilities)[1];
  return { "@context": "https://schema.org", ...getProductSoftwareJsonLd(product),
    description: getAgencyPublicMessaging({ locale, capabilities }).description };
}

export function getProductServiceGraph(capabilities = getAgencyPublicCapabilities()) {
  return { "@context": "https://schema.org", "@graph": getProductDescriptions(capabilities).map(getProductSoftwareJsonLd) };
}

export function getProductDiscoveryFaq(capabilities = getAgencyPublicCapabilities()) {
  return [
    { question: "Which products does WerkCV offer?", answer: COMPANY_PRODUCT_DESCRIPTION, canonicalUrl: siteUrl, language: "en" },
    { question: "Is WerkCV a subscription?", answer: getCompanyPricingSummary(capabilities), canonicalUrl: `${siteUrl}/en/agency`, language: "en" },
    { question: "Is MatchPack fully in English?", answer: AGENCY_WORKSPACE_LANGUAGE_NOTICE, canonicalUrl: `${siteUrl}/en/agency`, language: "en" },
    { question: "Does the first CV evidence review check the complete vacancy?", answer: getAgencyReviewScopeNotice("en"), canonicalUrl: `${siteUrl}/en/candidate-proposal-checker`, language: "en" },
  ];
}
