import { consumerCvPricingFactsById, toConsumerCvPricingView } from "@/lib/commercial/consumer-cv-pricing";
import { agencyComparisonProfiles } from "./agency-profiles";
export type ComparisonEvidenceStatus = "vendor_documented" | "hands_on_observed" | "not_verified";

export type ComparisonEvidence = {
  id: string;
  product: string;
  claim: string;
  status: ComparisonEvidenceStatus;
  sourceUrl?: string;
  sourceTitle?: string;
  checkedAt: string;
  reviewBy: string;
  fixtureId?: string;
  observation?: string;
  limitation: string;
  publicSafe: boolean;
};

/**
 * Editorial evidence is deliberately explicit. A missing source is represented
 * as not_verified rather than inferred from a competitor's marketing copy.
 */
export const comparisonEvidence: readonly ComparisonEvidence[] = [
  ...agencyComparisonProfiles.map((profile): ComparisonEvidence => ({ id: profile.product.toLowerCase().replaceAll(" ", "-"), product: profile.product, claim: profile.workflow, status: "vendor_documented", sourceUrl: profile.sources[0].href, sourceTitle: profile.product, checkedAt: "2026-09-10", reviewBy: "2026-10-10", limitation: profile.check, publicSafe: true })),
  {
    id: "werkcv-consumer-price-2026-09",
    product: "WerkCV",
    claim: "Build and preview are free; the final CV PDF uses the current one-time price.",
    status: "vendor_documented",
    sourceUrl: "https://werkcv.nl/prijzen",
    sourceTitle: "WerkCV pricing",
    checkedAt: "2026-09-10",
    reviewBy: "2026-10-10",
    limitation: "The current consumer price source is authoritative for WerkCV; payment availability can vary by checkout configuration.",
    publicSafe: true,
  },
  {
    id: "flowcv-free-offer-2026-09",
    product: "FlowCV",
    claim: "FlowCV advertises a free resume-builder offering.",
    status: "vendor_documented",
    sourceUrl: "https://flowcv.com/",
    sourceTitle: "FlowCV free online resume builder",
    checkedAt: "2026-09-10",
    reviewBy: "2026-12-09",
    limitation: "This does not independently verify every export, template or account limitation.",
    publicSafe: true,
  },
  {
    id: "europass-create-cv-2026-09",
    product: "Europass",
    claim: "Europass provides an official route to create a European CV.",
    status: "vendor_documented",
    sourceUrl: "https://europass.europa.eu/en/create-europass-cv",
    sourceTitle: "Europass: Create your CV",
    checkedAt: "2026-09-10",
    reviewBy: "2026-12-09",
    limitation: "This guide does not claim that Europass is the best format for every Dutch role.",
    publicSafe: true,
  },
];

export function getComparisonEvidence(id: string): ComparisonEvidence {
  const consumerId = consumerEvidenceIds[id];
  if (consumerId) {
    const view = toConsumerCvPricingView(consumerCvPricingFactsById[consumerId], new Date());
    return {
      id, product: view.providerName, claim: view.factualNoteNl,
      status: view.fresh ? "vendor_documented" : "not_verified",
      sourceUrl: view.officialUrl, sourceTitle: view.providerName,
      checkedAt: view.checkedAt,
      reviewBy: new Date(new Date(view.checkedAt).getTime() + 45 * 86400000).toISOString().slice(0, 10),
      limitation: "Provider documentation; no hands-on test.", publicSafe: true,
    };
  }
  const item = comparisonEvidence.find((entry) => entry.id === id);
  if (!item) throw new Error(`Unknown comparison evidence: ${id}`);
  return item;
}

export function comparisonEvidenceLabel(status: ComparisonEvidenceStatus, locale: "nl" | "en"): string {
  if (locale === "en") {
    return status === "hands_on_observed" ? "Observed in our test" : status === "vendor_documented" ? "Documented by the provider" : "Not verified";
  }
  return status === "hands_on_observed" ? "Waargenomen in onze test" : status === "vendor_documented" ? "Gedocumenteerd door de aanbieder" : "Niet geverifieerd";
}
const consumerEvidenceIds: Record<string, string> = {
  "youngcapital-free-route-2026-09": "youngcapital",
  "canva-free-route-2026-09": "canva",
  "cvmaker-terms-2026-09": "cvmaker",
};

export function consumerComparisonPrice(id: string, locale: "nl" | "en", now = new Date()): string {
  const view = toConsumerCvPricingView(consumerCvPricingFactsById[id], now);
  if (!view.fresh) return locale === "nl" ? "Prijscontrole verlopen; bekijk de officiële bron." : "Price check expired; see the official source.";
  const text = [view.displayedInitialPriceTextNl, view.displayedRecurringPriceTextNl].filter(Boolean).join("; ");
  if (locale === "nl") return text;
  return text.replace("14 dagen voor", "14 days for").replace("Daarna", "Then")
    .replace("per maand", "per month").replace("Geen", "No recurring charge")
    .replace("voor gratis templates en PDF-download", "for free templates and PDF download")
    .replace("Betaalde functies zijn optioneel", "Paid features are optional");
}
