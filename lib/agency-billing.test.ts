import assert from "node:assert/strict";
import test from "node:test";
import { getAgencyStatusLabel, isAgencySubscriptionInPaidPeriod } from "./agency-plan";
import { resolveAgencyMonthlyLimit } from "./agency-billing";
import { getAgencyUsagePeriodUpsertData } from "./agency-access";

const now = new Date("2026-09-03T00:00:00.000Z");

test("paid Agency access respects status, expiry and paid-through cancellation", () => {
  assert.equal(isAgencySubscriptionInPaidPeriod({ status: "active", currentPeriodEnd: new Date("2026-10-01T00:00:00.000Z") }, now), true);
  assert.equal(isAgencySubscriptionInPaidPeriod({ status: "cancelled", currentPeriodEnd: new Date("2026-10-01T00:00:00.000Z") }, now), true);
  assert.equal(isAgencySubscriptionInPaidPeriod({ status: "pending", currentPeriodEnd: new Date("2026-10-01T00:00:00.000Z") }, now), false);
  assert.equal(isAgencySubscriptionInPaidPeriod({ status: "active", currentPeriodEnd: new Date("2026-09-02T00:00:00.000Z") }, now), false);
  assert.match(getAgencyStatusLabel({ status: "cancelled", cancelAtPeriodEnd: false, currentPeriodEnd: new Date("2026-10-01T00:00:00.000Z") }), /betaalde periode/u);
});

test("provider sync treats stored allowance as authoritative", () => {
  assert.equal(resolveAgencyMonthlyLimit(undefined), 300);
  assert.equal(resolveAgencyMonthlyLimit(null), 300);
  assert.equal(resolveAgencyMonthlyLimit(0), 0);
  assert.equal(resolveAgencyMonthlyLimit(50), 50);
  assert.equal(resolveAgencyMonthlyLimit(750), 750);
});

test("operational access never overwrites an existing period allowance", () => {
  const startsAt = new Date("2026-09-01T00:00:00.000Z");
  const endsAt = new Date("2026-10-01T00:00:00.000Z");
  const custom = getAgencyUsagePeriodUpsertData({ id: "sub-custom", monthlyLimit: 750 }, { startsAt, endsAt });
  assert.deepEqual(custom.update, { endsAt });
  assert.equal("allowance" in custom.update, false);
  assert.equal(custom.create.allowance, 750);

  const disabled = getAgencyUsagePeriodUpsertData({ id: "sub-zero", monthlyLimit: 0 }, { startsAt, endsAt });
  assert.equal(disabled.create.allowance, 0);
  assert.equal("allowance" in disabled.update, false);
});
