import assert from "node:assert/strict";
import test from "node:test";
import {
  assignCheckoutRecovery,
  buildEnglishCheckoutRecoveryEmail,
  buildEnglishCheckoutRecoveryUrl,
  checkoutRecoveryFeatureEnabled,
  checkoutRecoveryGenerationEnabled,
  checkoutRecoverySendingApproved,
  evaluateCheckoutRecoveryEligibility,
} from "@/lib/checkout-recovery";
import { isConsumerExcludedEmail } from "@/lib/consumer-analytics-exclusions";

const now = new Date("2026-08-30T12:00:00.000Z");

function eligibleFixture() {
  return {
    now,
    checkoutAt: new Date("2026-08-30T07:00:00.000Z"),
    cvId: "cv-eligible",
    email: "candidate@domain.test",
    sourceLocale: "en",
    startSource: "en_home_hero",
    landingPath: "/en",
    hasExactCvPaidOrder: false,
    isAgencyCv: false,
    cvBelongsToUser: true,
    contactStatus: "active",
    hasSuppressingInboundReply: false,
    hasPreviousRecovery: false,
  };
}

test("consumer exclusions cover both owner accounts and synthetic addresses", () => {
  assert.equal(isConsumerExcludedEmail("dhinesh217@gmail.com"), true);
  assert.equal(isConsumerExcludedEmail("dhineshkumar.stoic@gmail.com"), true);
  assert.equal(isConsumerExcludedEmail("person@example.com"), true);
  assert.equal(isConsumerExcludedEmail("person+anything@gmail.com"), true);
  assert.equal(isConsumerExcludedEmail("candidate@domain.test"), false);
});

test("English checkout recovery eligibility accepts only the exact safe case", () => {
  assert.deepEqual(evaluateCheckoutRecoveryEligibility(eligibleFixture()), { eligible: true });
  const exclusions = [
    ["hasExactCvPaidOrder", true, "exact_cv_paid"],
    ["isAgencyCv", true, "agency_cv"],
    ["cvBelongsToUser", false, "ownership_mismatch"],
    ["contactStatus", "do_not_contact", "contact_inactive"],
    ["hasSuppressingInboundReply", true, "inbound_reply"],
    ["hasPreviousRecovery", true, "already_assigned"],
  ] as const;
  for (const [key, value, reason] of exclusions) {
    assert.deepEqual(evaluateCheckoutRecoveryEligibility({ ...eligibleFixture(), [key]: value }), {
      eligible: false,
      reason,
    });
  }
  assert.deepEqual(
    evaluateCheckoutRecoveryEligibility({
      ...eligibleFixture(),
      sourceLocale: "nl",
      startSource: "home_hero",
      landingPath: "/",
    }),
    { eligible: false, reason: "not_english" },
  );
});

test("assignment is deterministic with a stable 25 percent holdout", () => {
  assert.equal(assignCheckoutRecovery("cv-fixed"), assignCheckoutRecovery("cv-fixed"));
  const assignments = Array.from({ length: 400 }, (_, index) =>
    assignCheckoutRecovery(`cv-${index}`),
  );
  const holdouts = assignments.filter((assignment) => assignment === "holdout").length;
  assert.ok(holdouts >= 75 && holdouts <= 125, `unexpected holdout count: ${holdouts}`);
});

test("recovery URL is canonical, content-free and HTTPS-only", () => {
  const url = buildEnglishCheckoutRecoveryUrl("cv-123", "https://werkcv.nl");
  assert.equal(url, "https://werkcv.nl/en/editor?id=cv-123&downloadIntent=1");
  assert.throws(
    () => buildEnglishCheckoutRecoveryUrl("cv-123", "http://werkcv.nl"),
    /HTTPS_ORIGIN_REQUIRED/,
  );
  const email = buildEnglishCheckoutRecoveryEmail({
    cvId: "cv-123",
    configuredOrigin: "https://werkcv.nl",
  });
  assert.match(email.body, /€4\.99 including VAT/);
  assert.match(email.body, /one-time payment, not a subscription/);
  assert.doesNotMatch(email.body, /discount|hurry|expires soon/i);
});

test("feature and sending approvals default to off", () => {
  assert.equal(checkoutRecoveryFeatureEnabled(undefined), false);
  assert.equal(checkoutRecoveryFeatureEnabled("true"), true);
  assert.equal(checkoutRecoveryGenerationEnabled({ feature: "true", certified: "false" }), false);
  assert.equal(checkoutRecoveryGenerationEnabled({ feature: "true", certified: "true" }), true);
  assert.equal(
    checkoutRecoverySendingApproved({ feature: "true", certified: "true", owner: "true", privacy: "true" }),
    true,
  );
  assert.equal(
    checkoutRecoverySendingApproved({ feature: "true", certified: "true", owner: "false", privacy: "true" }),
    false,
  );
});
