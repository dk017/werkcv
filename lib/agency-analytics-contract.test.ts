import assert from "node:assert/strict";
import test from "node:test";
import {
  agencyAnalyticsEventSchemas,
  agencyRoiCompletedPropertiesSchema,
} from "./agency-analytics-contract";

const realRoiPayload = {
  path: "/agency",
  submissions: 20,
  minutes: 30,
  hourlyCost: 50,
  reductionPercent: 30,
  potentialHoursSaved: 3,
  potentialCostSaved: 150,
};

test("the ROI calculator's real payload satisfies the shared server contract", () => {
  assert.deepEqual(agencyRoiCompletedPropertiesSchema.parse(realRoiPayload), realRoiPayload);
  assert.equal(agencyAnalyticsEventSchemas.agency_roi_completed.safeParse(realRoiPayload).success, true);
});

test("the obsolete ROI payload and unknown content fields are rejected", () => {
  assert.equal(agencyRoiCompletedPropertiesSchema.safeParse({
    recruiters: 2,
    proposalsPerRecruiter: 10,
    minutesSaved: 30,
  }).success, false);
  assert.equal(agencyRoiCompletedPropertiesSchema.safeParse({
    ...realRoiPayload,
    cvText: "must never enter analytics",
  }).success, false);
});

test("new acquisition interactions have strict content-free contracts", () => {
  assert.equal(agencyAnalyticsEventSchemas.proposal_claim_verifier_result_copied.safeParse({ locale: "en", claimCount: 6 }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.agency_pricing_viewed.safeParse({ locale: "en", path: "/en/agency" }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.agency_checkout_cta_clicked.safeParse({ locale: "en", location: "en_agency_pricing" }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.proposal_claim_verifier_result_copied.safeParse({ locale: "en", claimCount: 6, proposalText: "private" }).success, false);
});
