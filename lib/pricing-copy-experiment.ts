import { consumerCvPricingFactsById, toConsumerCvPricingView } from "@/lib/commercial/consumer-cv-pricing";
import { cvDownloadPrice } from "@/lib/site-content";

/**
 * Price copy at the moment people decide to pay (editor download button, full preview) and on
 * /prijzen. Research: docs/product/2026-09-28-plans-and-pricing-copy.md, plan:
 * docs/product/2026-09-28-price-copy-exit-plan.md.
 *
 * The price is on the download button for everyone (unexpected cost is the #1 checkout
 * abandonment reason; 28 of 98 abandoners returned from the payment page within 30 s).
 * The arms only differ in the anchor next to it:
 * - plain: no anchor.
 * - pizza: everyday-expense anchor (Gourville 1998, "pennies-a-day"). Domino's NL lists a
 *   Margherita from €10,99 (2026), so €7,95 is "less than a pizza".
 * - competitor: the anchor our buyers already use: a month of CV.nl. Uses the verified,
 *   dated price and falls back to a generic line once that check is older than 45 days.
 *
 * The primary metric is revenue per checkout start per variant (join checkout_started.cvId
 * to Order.cvId), not clicks.
 */
export const PRICE_COPY_EXPERIMENT = "price_copy_v2";
export const PRICE_COPY_VARIANTS = ["plain", "pizza", "competitor"] as const;
export type PriceCopyVariant = (typeof PRICE_COPY_VARIANTS)[number];

const STORAGE_KEY = "werkcv_price_copy_v2";

export function isPriceCopyVariant(value: unknown): value is PriceCopyVariant {
  return typeof value === "string" && (PRICE_COPY_VARIANTS as readonly string[]).includes(value);
}

/** The stored variant without assigning one (e.g. after login, before checkout). */
export function readStoredPriceCopyVariant(): PriceCopyVariant | undefined {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isPriceCopyVariant(stored) ? stored : undefined;
  } catch {
    return undefined;
  }
}

/** Sticky per browser; falls back to a fresh random variant when storage is unavailable. */
export function getOrAssignPriceCopyVariant(random: () => number = Math.random): { variant: PriceCopyVariant; isNew: boolean } {
  const stored = readStoredPriceCopyVariant();
  if (stored) return { variant: stored, isNew: false };
  const variant = PRICE_COPY_VARIANTS[Math.floor(random() * PRICE_COPY_VARIANTS.length)] ?? "plain";
  try {
    window.localStorage.setItem(STORAGE_KEY, variant);
  } catch {
    // Storage blocked (private mode): assign for this page view only.
  }
  return { variant, isNew: true };
}

export type PriceCopy = {
  /** Download button label with the price; the same in every arm. */
  downloadLabel: string;
  /** Short anchor line under the editor's download button; null = none (plain). */
  toolbarCaption: string | null;
  /** Line next to the download button in the full-screen preview. */
  previewLine: string;
  /** Lead sentence on /prijzen under the main heading; null = keep the page's own copy. */
  pricingLead: string | null;
};

function cvNlMonthlyPrice(now: Date): string | null {
  const fact = consumerCvPricingFactsById.cv_nl;
  if (!fact) return null;
  const view = toConsumerCvPricingView(fact, now);
  // "Daarna €19,99 per maand" → "€19,99"
  const match = view.displayedRecurringPriceTextNl?.match(/€\s?\d+,\d{2}/);
  return match ? match[0] : null;
}

export function getPriceCopy(variant: PriceCopyVariant, locale: "nl" | "en", now: Date = new Date()): PriceCopy {
  const en = locale === "en";
  const price = en ? cvDownloadPrice.displayEn : cvDownloadPrice.display;
  const downloadLabel = en ? `Download PDF · ${price}` : `PDF downloaden · ${price}`;

  if (variant === "pizza") {
    return en
      ? {
          downloadLabel,
          toolbarCaption: "Once · less than a pizza",
          previewLine: `${price} once, less than a pizza. Then edit and download this CV as often as you like. No subscription.`,
          pricingLead: "Less than a pizza, once, for this CV.",
        }
      : {
          downloadLabel,
          toolbarCaption: "Eenmalig · minder dan een pizza",
          previewLine: `${price} één keer, minder dan een pizza. Daarna pas je dit cv onbeperkt aan en download je het opnieuw. Geen abonnement.`,
          pricingLead: "Minder dan een pizza, één keer, voor dit cv.",
        };
  }

  if (variant === "competitor") {
    const cvNl = cvNlMonthlyPrice(now);
    if (en) {
      const cvNlEn = cvNl?.replace(",", ".");
      return cvNlEn
        ? {
            downloadLabel,
            toolbarCaption: `Once · CV.nl charges ${cvNlEn} a month`,
            previewLine: `One month of CV.nl costs ${cvNlEn} after the trial. At WerkCV you pay ${price} once and keep editing this CV. No subscription.`,
            pricingLead: `One month of CV.nl costs ${cvNlEn} after the trial. At WerkCV you pay ${price}, once.`,
          }
        : {
            downloadLabel,
            toolbarCaption: "Once · no monthly subscription",
            previewLine: `${price} once, not every month like subscription CV builders. Then edit this CV as often as you like.`,
            pricingLead: `${price} once per CV, not every month.`,
          };
    }
    return cvNl
      ? {
          downloadLabel,
          toolbarCaption: `Eenmalig · CV.nl kost ${cvNl} per maand`,
          previewLine: `Eén maand CV.nl kost ${cvNl} na de proefperiode. Bij WerkCV betaal je ${price} één keer en pas je dit cv daarna onbeperkt aan. Geen abonnement.`,
          pricingLead: `Eén maand CV.nl kost ${cvNl} na de proefperiode. Bij WerkCV betaal je ${price}, één keer.`,
        }
      : {
          downloadLabel,
          toolbarCaption: "Eenmalig · geen maandabonnement",
          previewLine: `${price} één keer, niet elke maand zoals bij cv-makers met een abonnement. Daarna pas je dit cv onbeperkt aan.`,
          pricingLead: `${price} één keer per cv, niet elke maand.`,
        };
  }

  // plain: the price only.
  return en
    ? { downloadLabel, toolbarCaption: null, previewLine: `${price} once · No subscription · Immediate PDF`, pricingLead: null }
    : { downloadLabel, toolbarCaption: null, previewLine: `${price} eenmalig · Geen abonnement · Direct je PDF`, pricingLead: null };
}
