import test from "node:test";
import assert from "node:assert/strict";
import {
  canApproveAgencyWork,
  canCreateAgencyWork,
  canDeleteAgencyDraft,
  canDeleteApprovedAgencyWork,
  canEditAgencyDraft,
  canExportAgencyWork,
  canManageAgency,
  canReviewAgencyEvidence,
  canViewAgencyWork,
} from "../lib/agency-access";

const roles = ["owner", "editor", "reviewer", "viewer"] as const;

test("Agency permission matrix is explicit and action-specific", () => {
  const access = (role: typeof roles[number]) => ({ role });
  assert.deepEqual(roles.map((role) => canViewAgencyWork(access(role))), [true, true, true, true]);
  assert.deepEqual(roles.map((role) => canCreateAgencyWork(access(role))), [true, true, false, false]);
  assert.deepEqual(roles.map((role) => canEditAgencyDraft(access(role))), [true, true, true, false]);
  assert.deepEqual(roles.map((role) => canReviewAgencyEvidence(access(role))), [true, true, true, false]);
  assert.deepEqual(roles.map((role) => canApproveAgencyWork(access(role))), [true, false, true, false]);
  assert.deepEqual(roles.map((role) => canExportAgencyWork(access(role))), [true, true, true, false]);
  assert.deepEqual(roles.map((role) => canDeleteAgencyDraft(access(role))), [true, true, false, false]);
  assert.deepEqual(roles.map((role) => canDeleteApprovedAgencyWork(access(role))), [true, false, false, false]);
  assert.deepEqual(roles.map((role) => canManageAgency(access(role))), [true, false, false, false]);
});
