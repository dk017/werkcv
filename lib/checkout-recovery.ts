import { createHash } from "node:crypto";
import { cvDownloadPrice } from "@/lib/site-content";
import { isConsumerExcludedEmail, normalizeConsumerEmail } from "@/lib/consumer-analytics-exclusions";

export const ENGLISH_CHECKOUT_RECOVERY_TYPE = "checkout_recovery_en_v1";
export const ENGLISH_CHECKOUT_RECOVERY_VERSION = "checkout-recovery-en-v1";
export const ENGLISH_CHECKOUT_RECOVERY_MIN_AGE_MS = 4 * 60 * 60 * 1000;
export const ENGLISH_CHECKOUT_RECOVERY_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

export type CheckoutRecoveryAssignment = "treatment" | "holdout";

export type CheckoutRecoveryEligibilityInput = {
  now: Date;
  checkoutAt: Date;
  cvId: string | null | undefined;
  email: string | null | undefined;
  sourceLocale?: string | null;
  startSource?: string | null;
  landingPath?: string | null;
  hasExactCvPaidOrder: boolean;
  isAgencyCv: boolean;
  cvBelongsToUser: boolean;
  contactStatus?: string | null;
  hasSuppressingInboundReply: boolean;
  hasPreviousRecovery: boolean;
};

export type CheckoutRecoveryEligibility =
  | { eligible: true }
  | { eligible: false; reason: string };

export function isEnglishCheckoutContext(input: {
  sourceLocale?: string | null;
  startSource?: string | null;
  landingPath?: string | null;
}): boolean {
  const locale = input.sourceLocale?.trim().toLowerCase();
  const source = input.startSource?.trim().toLowerCase();
  const path = input.landingPath?.trim().toLowerCase();
  return locale === "en" || Boolean(source?.startsWith("en_")) || Boolean(path?.startsWith("/en"));
}

export function evaluateCheckoutRecoveryEligibility(
  input: CheckoutRecoveryEligibilityInput,
): CheckoutRecoveryEligibility {
  if (!input.cvId) return { eligible: false, reason: "missing_cv" };
  if (isConsumerExcludedEmail(input.email)) return { eligible: false, reason: "excluded_email" };
  if (!isEnglishCheckoutContext(input)) return { eligible: false, reason: "not_english" };
  if (input.isAgencyCv) return { eligible: false, reason: "agency_cv" };
  if (!input.cvBelongsToUser) return { eligible: false, reason: "ownership_mismatch" };
  if (input.hasExactCvPaidOrder) return { eligible: false, reason: "exact_cv_paid" };
  if (input.contactStatus && input.contactStatus !== "active") {
    return { eligible: false, reason: "contact_inactive" };
  }
  if (input.hasSuppressingInboundReply) return { eligible: false, reason: "inbound_reply" };
  if (input.hasPreviousRecovery) return { eligible: false, reason: "already_assigned" };

  const ageMs = input.now.getTime() - input.checkoutAt.getTime();
  if (ageMs < ENGLISH_CHECKOUT_RECOVERY_MIN_AGE_MS) return { eligible: false, reason: "too_recent" };
  if (ageMs > ENGLISH_CHECKOUT_RECOVERY_MAX_AGE_MS) return { eligible: false, reason: "too_old" };
  return { eligible: true };
}

export function assignCheckoutRecovery(cvId: string): CheckoutRecoveryAssignment {
  const digest = createHash("sha256")
    .update(`${ENGLISH_CHECKOUT_RECOVERY_VERSION}:${cvId}`)
    .digest();
  return digest.readUInt32BE(0) % 4 === 0 ? "holdout" : "treatment";
}

export function buildEnglishCheckoutRecoveryUrl(cvId: string, configuredOrigin: string): string {
  const origin = new URL(configuredOrigin);
  if (origin.protocol !== "https:") throw new Error("CHECKOUT_RECOVERY_HTTPS_ORIGIN_REQUIRED");
  origin.pathname = "/en/editor";
  origin.search = "";
  origin.hash = "";
  origin.searchParams.set("id", cvId);
  origin.searchParams.set("downloadIntent", "1");
  return origin.toString();
}

export function buildEnglishCheckoutRecoveryEmail(input: {
  cvId: string;
  configuredOrigin: string;
}): { subject: string; body: string } {
  const returnUrl = buildEnglishCheckoutRecoveryUrl(input.cvId, input.configuredOrigin);
  return {
    subject: "Your WerkCV is still available",
    body: `Hi,

You reached checkout for your CV, but the PDF was not purchased. Your CV is still available.

Review the same CV: ${returnUrl}

If you choose, you can download the final PDF for ${cvDownloadPrice.displayEn} including VAT. This is a one-time payment, not a subscription.

If checkout did not work, reply and tell us what happened. If you do not want a reminder like this, reply “stop”.

Thanks,
WerkCV`,
  };
}

export function checkoutRecoveryFeatureEnabled(envValue = process.env.ENGLISH_CHECKOUT_RECOVERY_ENABLED): boolean {
  return envValue?.trim().toLowerCase() === "true";
}

export function checkoutRecoveryGenerationEnabled(input = {
  feature: process.env.ENGLISH_CHECKOUT_RECOVERY_ENABLED,
  certified: process.env.ENGLISH_CHECKOUT_CERTIFIED,
}): boolean {
  return input.feature?.trim().toLowerCase() === "true"
    && input.certified?.trim().toLowerCase() === "true";
}

export function checkoutRecoverySendingApproved(input = {
  feature: process.env.ENGLISH_CHECKOUT_RECOVERY_ENABLED,
  certified: process.env.ENGLISH_CHECKOUT_CERTIFIED,
  owner: process.env.ENGLISH_CHECKOUT_RECOVERY_OWNER_APPROVED,
  privacy: process.env.ENGLISH_CHECKOUT_RECOVERY_PRIVACY_BASIS_CONFIRMED,
}): boolean {
  return [input.feature, input.certified, input.owner, input.privacy].every(
    (value) => value?.trim().toLowerCase() === "true",
  );
}

export function normalizedRecoveryEmail(email: string | null | undefined): string {
  return normalizeConsumerEmail(email);
}
