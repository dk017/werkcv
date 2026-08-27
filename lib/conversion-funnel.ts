export const CONSUMER_FUNNEL_DEFINITION_VERSION = "consumer-user-funnel-v1";

export const DEFAULT_ANALYTICS_EXCLUDED_EMAILS = [
  "dhinesh217@gmail.com",
  "dhineshkumar.stoic@gmail.com",
] as const;

/**
 * CTA events that represent an action rather than an impression or assignment.
 * Keep this explicit: `cta_viewed` and `cta_experiment_assigned` must never be
 * counted as clicks.
 */
export const CONVERSION_CTA_CLICK_EVENTS = [
  "landing_cta_click",
  "tool_to_cv_cta_click",
  "cta_clicked",
  "cta_experiment_clicked",
  "cta_no_subscription_hero",
  "cta_no_subscription_comparison",
  "cta_no_subscription_bottom",
  "cta_no_subscription_sticky",
  "cta_one_time_payment_hero",
  "cta_one_time_payment_mid",
  "cta_one_time_payment_bottom",
  "cta_one_time_payment_sticky",
  "cta_cvnl_cancel_hero",
  "cta_cvnl_cancel_after_steps",
  "cta_cvnl_cancel_bottom",
  "cta_cvnl_cancel_sticky",
  "cta_cvster_cancel_hero",
  "cta_cvster_cancel_after_steps",
  "cta_cvster_cancel_bottom",
  "cta_cvster_cancel_sticky",
  "cta_livecareer_cancel_header",
  "cta_livecareer_cancel_hero",
  "cta_livecareer_cancel_after_steps",
  "cta_livecareer_cancel_why",
  "cta_livecareer_cancel_footer",
  "cta_livecareer_cancel_sticky",
  "cta_cv_optimaliseren_hero",
  "cta_cv_verbeteren_hero",
  "cta_cv_checken_hero",
  "cta_cv_nakijken_hero",
  "cta_resume_optimizer_en_hero",
  "cta_ontslagbrief_generator_click",
  "cta_ontslagbrief_cv_click",
  "cta_motivatiebrief_generator_click",
  "cta_motivatiebrief_cv_click",
  "cta_baan_wisselen_cv_click",
  "cta_opzegtermijn_tool_click",
  "cta_opzegtermijn_cv_click",
  "cta_transitievergoeding_tool_click",
  "cta_transitievergoeding_cv_click",
] as const;

const conversionCtaClickEventSet = new Set<string>(CONVERSION_CTA_CLICK_EVENTS);

export function isConversionCtaClickEvent(event: string): boolean {
  return conversionCtaClickEventSet.has(event);
}

export function isInternalAnalyticsPath(path: string | null | undefined): boolean {
  if (!path) return false;
  return path === "/admin" || path.startsWith("/admin/");
}

export function isExcludedAnalyticsSource(sourceLabel: string | null | undefined): boolean {
  return sourceLabel?.trim().toLowerCase() === "codex_test";
}

export function analyticsExcludedEmails(envValue = process.env.ANALYTICS_EXCLUDED_EMAILS): string[] {
  const configured = (envValue || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  return [...new Set([...DEFAULT_ANALYTICS_EXCLUDED_EMAILS, ...configured])];
}

export type CertifiedConsumerFunnel = {
  signups: number;
  cvUsers: number;
  meaningfulCvUsers: number;
  readyUsers: number;
  previewUsers: number;
  downloadUsers: number;
  checkoutUsers: number;
  paidUsers: number;
  paidOrders: number;
  revenueCents: number;
};

export type FunnelCertificationCheck = {
  id: string;
  status: "pass" | "warning" | "fail";
  detail: string;
};

export type FunnelCertification = {
  definitionVersion: typeof CONSUMER_FUNNEL_DEFINITION_VERSION;
  status: "pass" | "warning" | "fail";
  checks: FunnelCertificationCheck[];
};

export function certifyConsumerFunnel(input: {
  funnel: CertifiedConsumerFunnel;
  meaningfulStateMismatches: number;
  paidOrdersMissingPaidEvent: number;
  paidOrdersMissingCheckoutCompletedEvent: number;
}): FunnelCertification {
  const { funnel } = input;
  const checks: FunnelCertificationCheck[] = [];

  const stageIdentityValid =
    funnel.cvUsers <= funnel.signups &&
    funnel.meaningfulCvUsers <= funnel.cvUsers &&
    funnel.readyUsers <= funnel.cvUsers &&
    funnel.previewUsers <= funnel.cvUsers &&
    funnel.downloadUsers <= funnel.cvUsers &&
    funnel.checkoutUsers <= funnel.cvUsers &&
    funnel.paidUsers <= funnel.signups &&
    funnel.paidUsers <= funnel.paidOrders;

  checks.push({
    id: "unique-user-stage-bounds",
    status: stageIdentityValid ? "pass" : "fail",
    detail: stageIdentityValid
      ? "Every user-level stage stays within its eligible signup/CV cohort."
      : "At least one stage exceeds its eligible signup/CV cohort.",
  });

  checks.push({
    id: "meaningful-state-consistency",
    status: input.meaningfulStateMismatches === 0 ? "pass" : "fail",
    detail: input.meaningfulStateMismatches === 0
      ? "Stored meaningful-content flags match the current classifier."
      : `${input.meaningfulStateMismatches} consumer CV records disagree with the current meaningful-content classifier.`,
  });

  checks.push({
    id: "paid-event-coverage",
    status: input.paidOrdersMissingPaidEvent === 0 ? "pass" : "warning",
    detail: input.paidOrdersMissingPaidEvent === 0
      ? "Every paid order in the selected range has a corresponding paid analytics event."
      : `${input.paidOrdersMissingPaidEvent} paid orders lack a paid analytics event; revenue still comes from the Order table.`,
  });

  checks.push({
    id: "checkout-completed-event-coverage",
    status: input.paidOrdersMissingCheckoutCompletedEvent === 0 ? "pass" : "warning",
    detail: input.paidOrdersMissingCheckoutCompletedEvent === 0
      ? "Every paid order in the selected range has a checkout-completed analytics event."
      : `${input.paidOrdersMissingCheckoutCompletedEvent} paid orders lack a checkout-completed analytics event.`,
  });

  const status = checks.some((check) => check.status === "fail")
    ? "fail"
    : checks.some((check) => check.status === "warning")
      ? "warning"
      : "pass";

  return {
    definitionVersion: CONSUMER_FUNNEL_DEFINITION_VERSION,
    status,
    checks,
  };
}
