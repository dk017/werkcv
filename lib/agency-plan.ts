export const AGENCY_PLAN_CODE = "agency" as const;
export const AGENCY_PLAN_NAME = "WerkCV MatchPack · Agency" as const;
export const AGENCY_MONTHLY_CV_LIMIT = 50;
export const AGENCY_MONTHLY_PRICE_CENTS = 14900;
export const AGENCY_CURRENCY = "EUR" as const;

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
