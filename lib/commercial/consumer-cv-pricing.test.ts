import assert from "node:assert/strict";
import test from "node:test";
import {
  consumerCvPricingFactSchema,
  consumerCvPricingFacts,
  formatPricingCheckedAtNl,
  isPricingFactFresh,
  toConsumerCvPricingView,
} from "./consumer-cv-pricing";

const verifiedFact = consumerCvPricingFacts.find((fact) => fact.id === "cvmaker");

test("consumer pricing facts satisfy the shared contract", () => {
  assert.equal(consumerCvPricingFacts.length, 5);
  assert.ok(consumerCvPricingFacts.every((fact) => fact.officialUrl.startsWith("https://")));
  assert.equal(verifiedFact?.initialPriceTextNl, "14 dagen voor €2,99");
});

test("invalid calendar dates are rejected", () => {
  const invalid = {
    ...consumerCvPricingFacts[0],
    checkedAt: "2026-02-31",
  };
  assert.equal(consumerCvPricingFactSchema.safeParse(invalid).success, false);
});

test("unverifiable facts cannot retain old price text", () => {
  const invalid = {
    ...consumerCvPricingFacts[0],
    status: "temporarily_unverifiable" as const,
  };
  assert.equal(consumerCvPricingFactSchema.safeParse(invalid).success, false);
});

test("freshness rejects future and older-than-45-day facts", () => {
  assert.ok(verifiedFact);
  assert.equal(isPricingFactFresh(verifiedFact, new Date("2026-09-15T00:00:00.000Z")), true);
  assert.equal(isPricingFactFresh(verifiedFact, new Date("2026-10-15T00:00:00.000Z")), false);
  assert.equal(isPricingFactFresh(verifiedFact, new Date("2026-08-29T00:00:00.000Z")), false);
});

test("stale views suppress exact numeric price text", () => {
  assert.ok(verifiedFact);
  const view = toConsumerCvPricingView(verifiedFact, new Date("2026-10-15T00:00:00.000Z"));
  assert.equal(view.fresh, false);
  assert.equal(view.displayedInitialPriceTextNl, null);
  assert.equal(view.displayedRecurringPriceTextNl, null);
});

test("checked dates are localized consistently", () => {
  assert.equal(formatPricingCheckedAtNl("2026-08-30"), "30 augustus 2026");
});
