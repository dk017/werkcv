import test from "node:test";
import assert from "node:assert/strict";
import {
  AGENCY_RETENTION_ACTIVATION_GRACE_DAYS,
  calculateRetentionExpiry,
  getRetentionBaseDate,
  isAgencyRetentionDays,
  retentionPreviewRequiresConfirmation,
} from "../lib/agency-retention";

const now = new Date("2026-08-20T00:00:00.000Z");

test("retention accepts only the published product options", () => {
  assert.equal(isAgencyRetentionDays(30), true);
  assert.equal(isAgencyRetentionDays(90), true);
  assert.equal(isAgencyRetentionDays(180), true);
  assert.equal(isAgencyRetentionDays(365), true);
  assert.equal(isAgencyRetentionDays(31), false);
  assert.equal(isAgencyRetentionDays("90"), false);
});

test("approved content uses approval time as retention base", () => {
  const approvedAt = new Date("2026-08-01T00:00:00.000Z");
  const updatedAt = new Date("2026-08-19T00:00:00.000Z");
  assert.equal(getRetentionBaseDate({ status: "approved", approvedAt, updatedAt }), approvedAt);
  assert.equal(getRetentionBaseDate({ status: "analyzed", approvedAt: null, updatedAt }), updatedAt);
});

test("short historical content still receives activation grace", () => {
  const expiry = calculateRetentionExpiry({
    status: "analyzed",
    approvedAt: null,
    updatedAt: new Date("2026-01-01T00:00:00.000Z"),
  }, 30, now, true);
  const grace = new Date(now.getTime() + AGENCY_RETENTION_ACTIVATION_GRACE_DAYS * 24 * 60 * 60 * 1000);
  assert.equal(expiry.toISOString(), grace.toISOString());
});

test("normal saves and policy updates do not repeatedly add activation grace", () => {
  const updatedAt = new Date("2026-08-19T00:00:00.000Z");
  const expiry = calculateRetentionExpiry({ status: "analyzed", approvedAt: null, updatedAt }, 30, now);
  assert.equal(expiry.toISOString(), "2026-09-18T00:00:00.000Z");
});

test("retention changes require typed confirmation only for shortening or imminent first activation", () => {
  const base = { policyAcknowledged: true, packsAffected: 2, previewAt: now.toISOString() };
  assert.equal(retentionPreviewRequiresConfirmation({ ...base, isShorter: true, earliestExpiry: "2027-01-01T00:00:00.000Z" }), true);
  assert.equal(retentionPreviewRequiresConfirmation({ ...base, isShorter: false, earliestExpiry: "2026-08-25T00:00:00.000Z" }), false);
  assert.equal(retentionPreviewRequiresConfirmation({ ...base, policyAcknowledged: false, isShorter: false, earliestExpiry: "2026-08-25T00:00:00.000Z" }), true);
});
