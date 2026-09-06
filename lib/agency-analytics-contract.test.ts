import assert from "node:assert/strict";
import test from "node:test";
import {
  agencyAnalyticsEventSchemas,
  agencyRoiCompletedPropertiesSchema,
} from "./agency-analytics-contract";
import { sanitizeAttribution } from "./attribution";

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
  assert.equal(agencyAnalyticsEventSchemas.agency_evidence_matrix_downloaded.safeParse({
    format: "docx",
    route_id: "nl_public_sector_submission",
    source_category: "search",
  }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.agency_public_sector_guide_viewed.safeParse({
    route_id: "nl_public_sector_submission",
    locale: "nl",
    device_category: "mobile",
    source_category: "search",
  }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.agency_public_sector_guide_viewed.safeParse({
    route_id: "nl_public_sector_submission",
    locale: "nl",
    device_category: "desktop",
    source_category: "search",
    proposalText: "private",
  }).success, false);
  assert.equal(agencyAnalyticsEventSchemas.agency_evidence_matrix_downloaded.safeParse({
    format: "docx",
    route_id: "nl_public_sector_submission",
    source_category: "search",
    candidateName: "private",
  }).success, false);
});

test("MatchPack analysis telemetry has no score field", () => {
  assert.equal(agencyAnalyticsEventSchemas.matchpack_analysis_completed.safeParse({
    locale: "nl",
    requirementCount: 4,
  }).success, true);
  assert.equal(agencyAnalyticsEventSchemas.matchpack_analysis_completed.safeParse({
    locale: "nl",
    requirementCount: 4,
    scoreBand: "good",
  }).success, false);
});

test("Agency navigation analytics reject query strings and external destinations", () => {
  const valid = { path: "/voor-bureaus", location: "hub_hero", destination: "/agency#plan", intent: "product" as const };
  assert.equal(agencyAnalyticsEventSchemas.agency_content_cta_clicked.safeParse(valid).success, true);
  assert.equal(agencyAnalyticsEventSchemas.agency_content_cta_clicked.safeParse({ ...valid, destination: "/agency?email=private@example.com" }).success, false);
  assert.equal(agencyAnalyticsEventSchemas.agency_content_cta_clicked.safeParse({ ...valid, destination: "https://example.com/agency" }).success, false);
  assert.equal(agencyAnalyticsEventSchemas.agency_content_cta_clicked.safeParse({ ...valid, path: "/voor-bureaus?candidate=private" }).success, false);
});

test("attribution paths are normalised before storage", () => {
  const attribution = sanitizeAttribution({
    firstTouchAt: "2026-09-02T00:00:00.000Z",
    firstTouchPath: "/voor-bureaus?email=private@example.com#hero",
    firstTouchCluster: "agency",
    firstTouchReferrer: "https://google.com/search?q=private",
    lastTouchAt: "2026-09-02T00:01:00.000Z",
    lastTouchPath: "/agency?cv=private",
    lastTouchCluster: "agency",
    locale: "nl",
  });
  assert.equal(attribution?.firstTouchPath, "/voor-bureaus");
  assert.equal(attribution?.lastTouchPath, "/agency");
  assert.equal(attribution?.firstTouchReferrer, "https://google.com/search");
  assert.equal(sanitizeAttribution({ firstTouchAt: "2026-09-02T00:00:00.000Z", firstTouchPath: "" }), null);
});
