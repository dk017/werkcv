export type AgencyCreditLocale = "nl" | "en";

export type AgencyCreditLimitContext = {
  locale?: AgencyCreditLocale;
  used: number;
  limit: number;
  requested: number;
};

export type AgencyCreditLimitDetails = AgencyCreditLimitContext & {
  remaining: number;
  shortfall: number;
  error: string;
};

function safeCount(value: number): number {
  return Number.isFinite(value) ? Math.max(0, Math.floor(value)) : 0;
}

export function getAgencyCreditLimitDetails(
  context: AgencyCreditLimitContext,
  locale: AgencyCreditLocale = "en",
): AgencyCreditLimitDetails {
  const used = safeCount(context.used);
  const limit = safeCount(context.limit);
  const requested = Math.max(1, safeCount(context.requested));
  const remaining = Math.max(limit - used, 0);
  const shortfall = Math.max(requested - remaining, 0);
  const resolvedLocale = context.locale || locale;
  const error = resolvedLocale === "nl"
    ? requested === 1
      ? `${used} van de ${limit} gedeelde CV-credits zijn deze betaalperiode gebruikt.`
      : `${used} van de ${limit} gedeelde CV-credits zijn deze betaalperiode gebruikt. Deze aanvraag gebruikt ${requested} credits; er zijn nog ${remaining} beschikbaar.`
    : requested === 1
      ? `${used} of ${limit} shared CV credits have been used in this billing period.`
      : `${used} of ${limit} shared CV credits have been used in this billing period. This request uses ${requested} credits; ${remaining} remain.`;

  return { used, limit, requested, remaining, shortfall, error };
}

export function getAgencyCreditErrorPayload(
  context: AgencyCreditLimitContext | undefined,
  locale: AgencyCreditLocale = "en",
): Pick<AgencyCreditLimitDetails, "error" | "used" | "limit" | "remaining" | "requested"> | null {
  if (!context) return null;
  const details = getAgencyCreditLimitDetails(context, locale);
  return {
    error: details.error,
    used: details.used,
    limit: details.limit,
    remaining: details.remaining,
    requested: details.requested,
  };
}
