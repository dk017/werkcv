export const AGENCY_PLAN_CODE = "agency" as const;
export const AGENCY_PLAN_NAME = "WerkCV MatchPack · Agency" as const;
/**
 * Version the commercial contract so a provider/webhook mismatch can be
 * diagnosed without relying on mutable page copy.
 */
export const AGENCY_PLAN_VERSION = "agency_99_300_2026_09" as const;
export const AGENCY_MONTHLY_CREDIT_LIMIT = 300;
export const AGENCY_MONTHLY_PRICE_CENTS = 9900;
export const AGENCY_CURRENCY = "EUR" as const;

/** @deprecated Use AGENCY_MONTHLY_CREDIT_LIMIT. Kept for migration-safe callers. */
export const AGENCY_MONTHLY_CV_LIMIT = AGENCY_MONTHLY_CREDIT_LIMIT;

export const AGENCY_MONTHLY_PRICE_EUR = AGENCY_MONTHLY_PRICE_CENTS / 100;

export function getAgencyCreditExplanation(locale: "nl" | "en" = "nl"): string {
  return locale === "nl"
    ? "Eén credit geldt voor één nieuw zelfstandig kandidaat-CV of de eerste definitieve goedkeuring van één MatchPack. Bewerken en opnieuw downloaden gebruiken geen extra credit."
    : "One credit covers either one new standalone candidate CV or the first definitive approval of one MatchPack. Editing and repeat downloads do not use another credit.";
}

export function getAgencyFullUseUnitPrice(): number {
  return AGENCY_MONTHLY_PRICE_EUR / AGENCY_MONTHLY_CREDIT_LIMIT;
}

/**
 * A contextual reference for the plan page. It is intentionally labelled as
 * a full-use reference rather than presented as a per-CV billing rate.
 */
export function getAgencyFullUseUnitPriceDisplay(locale: "nl" | "en" = "nl"): string {
  const amount = new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    style: "currency",
    currency: AGENCY_CURRENCY,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(getAgencyFullUseUnitPrice()).replace(/\u00a0/gu, " ");
  return locale === "nl"
    ? `Bij volledig gebruik is dat ongeveer ${amount} per nieuw CV of eerste goedgekeurde MatchPack.`
    : `At full use, that is about ${amount} per new Agency CV or first approved MatchPack.`;
}

export function getAgencyPlanMetadata(): {
  planCode: typeof AGENCY_PLAN_CODE;
  planVersion: typeof AGENCY_PLAN_VERSION;
  creditLimit: number;
  priceCents: number;
  currency: typeof AGENCY_CURRENCY;
} {
  return {
    planCode: AGENCY_PLAN_CODE,
    planVersion: AGENCY_PLAN_VERSION,
    creditLimit: AGENCY_MONTHLY_CREDIT_LIMIT,
    priceCents: AGENCY_MONTHLY_PRICE_CENTS,
    currency: AGENCY_CURRENCY,
  };
}

export function getAgencyMonthlyPriceDisplay(locale: "nl" | "en" = "nl"): string {
  const amount = new Intl.NumberFormat(locale === "nl" ? "nl-NL" : "en-GB", {
    style: "currency",
    currency: AGENCY_CURRENCY,
    maximumFractionDigits: 0,
  }).format(AGENCY_MONTHLY_PRICE_CENTS / 100).replace(/\u00a0/gu, " ");
  return locale === "nl" ? `${amount} per maand` : `${amount}/month`;
}

export function getAgencyRemainingCredits(allowance: number, used: number): number {
  return Math.max(0, allowance - used);
}

export const AGENCY_ACTIVE_SUBSCRIPTION_STATUSES = new Set(["active", "cancelled", "canceled"]);

export function isAgencySubscriptionInPaidPeriod(
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
  },
  now = new Date(),
): boolean {
  const status = subscription.status.trim().toLowerCase();
  if (!AGENCY_ACTIVE_SUBSCRIPTION_STATUSES.has(status)) return false;
  return !subscription.currentPeriodEnd || subscription.currentPeriodEnd > now;
}

export function isAgencySubscriptionCreatingAccess(
  subscription: {
    status: string;
    currentPeriodEnd: Date | null;
  },
  now = new Date(),
): boolean {
  return isAgencySubscriptionInPaidPeriod(subscription, now);
}

export function getAgencyStatusLabel(subscription: {
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
}): string {
  const status = subscription.status.trim().toLowerCase();
  if (subscription.cancelAtPeriodEnd && subscription.currentPeriodEnd) {
    return "Opgezegd per einde van de huidige periode";
  }
  if ((status === "cancelled" || status === "canceled") && subscription.currentPeriodEnd && subscription.currentPeriodEnd > new Date()) {
    return "Actief tot einde van de betaalde periode";
  }
  if (status === "active") return "Actief";
  if (status === "pending") return "Wacht op activatie";
  if (status === "on_hold" || status === "past_due" || status === "failed") return "Betaling controleren";
  if (status === "expired" || status === "cancelled" || status === "canceled") return "Beëindigd";
  return "Status controleren";
}
