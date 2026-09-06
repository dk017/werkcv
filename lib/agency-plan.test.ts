import assert from "node:assert/strict";
import test from "node:test";
import {
  AGENCY_CURRENCY,
  AGENCY_MONTHLY_CREDIT_LIMIT,
  AGENCY_MONTHLY_PRICE_CENTS,
  AGENCY_PLAN_CODE,
  AGENCY_PLAN_VERSION,
  getAgencyCreditExplanation,
  getAgencyFullUseUnitPrice,
  getAgencyFullUseUnitPriceDisplay,
  getAgencyMonthlyPriceDisplay,
  getAgencyRemainingCredits,
} from "./agency-plan";

test("Agency commercial contract has one authoritative plan and credit limit", () => {
  assert.equal(AGENCY_PLAN_CODE, "agency");
  assert.equal(AGENCY_PLAN_VERSION, "agency_99_300_2026_09");
  assert.equal(AGENCY_CURRENCY, "EUR");
  assert.equal(AGENCY_MONTHLY_PRICE_CENTS, 9_900);
  assert.equal(AGENCY_MONTHLY_CREDIT_LIMIT, 300);
  assert.equal(getAgencyMonthlyPriceDisplay("nl"), "€ 99 per maand");
  assert.equal(getAgencyMonthlyPriceDisplay("en"), "€99/month");
  assert.match(getAgencyCreditExplanation("nl"), /geen extra credit/u);
  assert.match(getAgencyCreditExplanation("en"), /do not use another credit/u);
});

test("full-use unit economics are contextual and remaining credits clamp safely", () => {
  assert.equal(getAgencyFullUseUnitPrice(), 0.33);
  assert.match(getAgencyFullUseUnitPriceDisplay("en"), /At full use.*€0\.33/u);
  assert.match(getAgencyFullUseUnitPriceDisplay("nl"), /Bij volledig gebruik.*€\s?0,33/u);
  assert.equal(getAgencyRemainingCredits(300, 0), 300);
  assert.equal(getAgencyRemainingCredits(300, 299), 1);
  assert.equal(getAgencyRemainingCredits(300, 301), 0);
  assert.equal(getAgencyRemainingCredits(0, 0), 0);
});
