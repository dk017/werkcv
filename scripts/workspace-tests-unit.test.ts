import assert from "node:assert/strict";
import test from "node:test";
import { selectMatchPackEntitlement } from "@/lib/workspace/entitlements";

const now = new Date("2026-08-23T00:00:00.000Z");
function subscription(id: string, userId: string) {
  return {
    id,
    userId,
    status: "active",
    companyName: `Company ${id}`,
    retentionPolicySetAt: now,
    currentPeriodStart: now,
    currentPeriodEnd: new Date("2026-09-23T00:00:00.000Z"),
    cancelAtPeriodEnd: false,
    canceledAt: null,
  };
}

test("one active membership is a switchable MatchPack entitlement", () => {
  const selected = selectMatchPackEntitlement(null, [{ role: "editor", subscription: subscription("a", "owner-a") }]);
  assert.equal(selected.subscription?.id, "a");
  assert.equal(selected.role, "editor");
  assert.equal(selected.switcherEligible, true);
});

test("multiple active memberships disable switching instead of choosing a default", () => {
  const selected = selectMatchPackEntitlement(null, [
    { role: "editor", subscription: subscription("a", "owner-a") },
    { role: "viewer", subscription: subscription("b", "owner-b") },
  ]);
  assert.equal(selected.subscription, null);
  assert.equal(selected.switcherEligible, false);
});

test("a direct subscription plus another active membership disables switching", () => {
  const direct = subscription("owned", "actor");
  const selected = selectMatchPackEntitlement(direct, [{ role: "editor", subscription: subscription("team", "owner-b") }]);
  assert.equal(selected.subscription?.id, "owned");
  assert.equal(selected.role, "owner");
  assert.equal(selected.switcherEligible, false);
});
