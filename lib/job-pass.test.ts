import test from "node:test";
import assert from "node:assert/strict";
import { isCoveredByJobPass, jobPassExpiry, jobPassStatusFrom } from "./job-pass";

const paidAt = new Date("2026-10-01T12:00:00Z");
const day = 86_400_000;

test("the pass window is 90 days from payment", () => {
  assert.equal(jobPassExpiry(paidAt).toISOString(), "2026-12-30T12:00:00.000Z");
});

test("CVs created before the window ends are covered, including ones made before buying", () => {
  assert.equal(isCoveredByJobPass(new Date(paidAt.getTime() - 30 * day), [paidAt]), true);
  assert.equal(isCoveredByJobPass(new Date(paidAt.getTime() + 89 * day), [paidAt]), true);
  assert.equal(isCoveredByJobPass(new Date(paidAt.getTime() + 90 * day), [paidAt]), false);
  assert.equal(isCoveredByJobPass(new Date(paidAt.getTime() + 10 * day), []), false);
});

test("any of several passes can cover a CV", () => {
  const second = new Date(paidAt.getTime() + 120 * day);
  assert.equal(isCoveredByJobPass(new Date(paidAt.getTime() + 100 * day), [paidAt, second]), true);
});

test("status reports days left and turns inactive at expiry", () => {
  const status = jobPassStatusFrom([paidAt], new Date(paidAt.getTime() + 80.5 * day));
  assert.equal(status.active, true);
  assert.equal(status.daysLeft, 10);
  assert.deepEqual(jobPassStatusFrom([paidAt], new Date(paidAt.getTime() + 90 * day)), {
    active: false,
    expiresAt: "2026-12-30T12:00:00.000Z",
    daysLeft: 0,
  });
  assert.deepEqual(jobPassStatusFrom([]), { active: false, expiresAt: null, daysLeft: 0 });
});
