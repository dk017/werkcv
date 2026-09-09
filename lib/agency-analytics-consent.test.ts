import assert from "node:assert/strict";
import test from "node:test";
import { agencyAnalyticsAllowed, readAgencyAnalyticsConsent, isAgencyAnalyticsPath } from "./agency-analytics-consent";

test("Agency measurement fails closed without a valid explicit choice", () => {
  for (const cookie of ["", "werkcv_agency_analytics_v1=denied", "werkcv_agency_analytics_v1=true", "werkcv_agency_analytics_v1=granted-extra"]) {
    assert.equal(agencyAnalyticsAllowed("agency_content_cta_clicked", "/", cookie), false);
    assert.equal(agencyAnalyticsAllowed("page_view", "/en/agency", cookie), false);
  }
  assert.equal(readAgencyAnalyticsConsent("x=1; werkcv_agency_analytics_v1=granted; y=2"), "granted");
  assert.equal(agencyAnalyticsAllowed("agency_content_cta_clicked", "/agency", "werkcv_agency_analytics_v1=granted"), true);
});

test("All Agency route families are protected without capturing similarly named consumer pages", () => {
  for (const path of ["/agency", "/agency/account", "/en/agency/", "/voor-bureaus/kennisbank/a", "/tools/kandidaatvoorstel-checker", "/en/candidate-proposal-checker", "/kandidaat/bevestigen"]) assert.equal(isAgencyAnalyticsPath(path), true, path);
  for (const path of ["/", "/prijzen", "/en/pricing", "/agency-example", "/templates"]) assert.equal(isAgencyAnalyticsPath(path), false, path);
  assert.equal(agencyAnalyticsAllowed("page_view", "/prijzen", ""), true);
  assert.equal(agencyAnalyticsAllowed("matchpack_approved", "/editor", ""), false);
});
