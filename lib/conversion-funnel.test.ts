import assert from "node:assert/strict";
import test from "node:test";
import {
  analyticsExcludedEmails,
  certifyConsumerFunnel,
  isConversionCtaClickEvent,
  isExcludedAnalyticsSource,
  isInternalAnalyticsPath,
} from "./conversion-funnel";

test("CTA measurement counts actions but not impressions or assignments", () => {
  assert.equal(isConversionCtaClickEvent("landing_cta_click"), true);
  assert.equal(isConversionCtaClickEvent("cta_no_subscription_hero"), true);
  assert.equal(isConversionCtaClickEvent("cta_experiment_clicked"), true);
  assert.equal(isConversionCtaClickEvent("cta_viewed"), false);
  assert.equal(isConversionCtaClickEvent("cta_experiment_assigned"), false);
});

test("internal and test analytics traffic is classified deterministically", () => {
  assert.equal(isInternalAnalyticsPath("/admin/analytics"), true);
  assert.equal(isInternalAnalyticsPath("/en"), false);
  assert.equal(isExcludedAnalyticsSource("codex_test"), true);
  assert.equal(isExcludedAnalyticsSource("Google"), false);
  assert.ok(analyticsExcludedEmails("owner@example.test").includes("owner@example.test"));
});

test("certification fails stale meaningful flags and warns on event coverage only", () => {
  const funnel = {
    signups: 10,
    cvUsers: 9,
    meaningfulCvUsers: 7,
    readyUsers: 6,
    previewUsers: 5,
    downloadUsers: 4,
    checkoutUsers: 3,
    paidUsers: 2,
    paidOrders: 2,
    revenueCents: 998,
  };
  const failed = certifyConsumerFunnel({
    funnel,
    meaningfulStateMismatches: 1,
    paidOrdersMissingPaidEvent: 0,
    paidOrdersMissingCheckoutCompletedEvent: 0,
  });
  assert.equal(failed.status, "fail");

  const warning = certifyConsumerFunnel({
    funnel,
    meaningfulStateMismatches: 0,
    paidOrdersMissingPaidEvent: 1,
    paidOrdersMissingCheckoutCompletedEvent: 0,
  });
  assert.equal(warning.status, "warning");
});
