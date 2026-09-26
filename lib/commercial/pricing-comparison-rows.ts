import {
  consumerCvPricingFacts,
  formatPricingCheckedAtNl,
  toConsumerCvPricingView,
} from "@/lib/commercial/consumer-cv-pricing";
import { cvDownloadPrice, cvDownloadPriceCheckedAt } from "@/lib/site-content";

export type PricingComparisonRow = {
  label: string;
  primary: string;
  secondary: string;
};

/**
 * Rows for "tool | what you pay | renewal" tables. Competitor prices are only shown
 * while the verified fact is fresh; stale facts point readers to the official page.
 */
export function buildConsumerPricingComparisonRows(now = new Date()): PricingComparisonRow[] {
  const werkcvRow: PricingComparisonRow = {
    label: "WerkCV",
    primary: `Gratis bouwen en volledig bekijken; ${cvDownloadPrice.display} eenmalig per CV bij PDF-download`,
    secondary: `Geen abonnement, proefperiode of automatische verlenging. Hetzelfde CV later gratis aanpassen en opnieuw downloaden. Prijs gecontroleerd op ${cvDownloadPriceCheckedAt.display}.`,
  };

  const competitorRows = consumerCvPricingFacts.map((fact) => {
    const view = toConsumerCvPricingView(fact, now);
    const price = [view.displayedInitialPriceTextNl, view.displayedRecurringPriceTextNl]
      .filter(Boolean)
      .join("; ");
    return {
      label: fact.providerName,
      primary: price || `Actuele prijs: zie ${fact.officialUrl}`,
      secondary: view.fresh
        ? `${fact.renewalTextNl} Gecontroleerd op ${formatPricingCheckedAtNl(fact.checkedAt)} (${fact.officialUrl}).`
        : `Controleer de actuele voorwaarden op ${fact.officialUrl}.`,
    };
  });

  return [werkcvRow, ...competitorRows];
}
