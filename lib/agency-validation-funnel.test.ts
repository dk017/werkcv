import assert from "node:assert/strict";
import test from "node:test";
import {
  buildAgencyValidationReport,
  isExcludedAgencyEmail,
  isMatchPackAcquisitionPath,
  type AgencyAnalyticsEventInput,
  type AgencyProductActorInput,
} from "./agency-validation-funnel";

const since = new Date("2026-08-01T00:00:00.000Z");
const until = new Date("2026-09-01T00:00:00.000Z");

function event(
  id: string,
  name: string,
  visitorId: string,
  path: string,
  extra: Record<string, unknown> = {},
): AgencyAnalyticsEventInput {
  return {
    id,
    event: name,
    path,
    createdAt: new Date("2026-08-15T10:00:00.000Z"),
    properties: {
      visitorId,
      sessionId: `session-${visitorId}`,
      locale: path.startsWith("/en") ? "en" : "nl",
      sourceType: "search",
      sourceLabel: "Google",
      deviceType: "mobile",
      visitNumber: 1,
      ...extra,
    },
  };
}

function stage(report: ReturnType<typeof buildAgencyValidationReport>, key: string) {
  const value = report.stages.find((row) => row.key === key);
  assert.ok(value, `Missing stage ${key}`);
  return value;
}

test("central email exclusions cover internal, configured, fixture and test actors", () => {
  assert.equal(isExcludedAgencyEmail("person@werkcv.nl"), true);
  assert.equal(isExcludedAgencyEmail("person+test@gmail.com"), true);
  assert.equal(isExcludedAgencyEmail("fixture-1@gmail.com"), true);
  assert.equal(isExcludedAgencyEmail("real@agency.co.uk", { configuredEmails: ["real@agency.co.uk"] }), true);
  assert.equal(isExcludedAgencyEmail("recruiter@agency.co.uk"), false);
});

test("MatchPack acquisition paths include canonical commercial, checker and methodology pages", () => {
  assert.equal(isMatchPackAcquisitionPath("https://werkcv.nl/en/agency?utm_source=google"), true);
  assert.equal(isMatchPackAcquisitionPath("/en/candidate-proposal-checker"), true);
  assert.equal(isMatchPackAcquisitionPath("/voor-bureaus/methodologie/claim-evidence-benchmark"), true);
  assert.equal(isMatchPackAcquisitionPath("/en/pricing"), false);
});

test("the certified fixture deduplicates interactions and derives product milestones from server records", () => {
  const events: AgencyAnalyticsEventInput[] = [
    event("1", "page_view", "visitor-a", "/en/agency"),
    event("2", "page_view", "visitor-a", "/en/agency"),
    event("2a", "agency_public_sector_guide_viewed", "visitor-a", "/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid", {
      route_id: "nl_public_sector_submission",
      device_category: "mobile",
      source_category: "search",
    }),
    event("2b", "agency_evidence_matrix_downloaded", "visitor-a", "/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid", { format: "docx", route_id: "nl_public_sector_submission", source_category: "search" }),
    event("3", "proposal_claim_verifier_viewed", "visitor-a", "/en/candidate-proposal-checker"),
    event("4", "proposal_claim_verifier_started", "visitor-a", "/en/candidate-proposal-checker"),
    event("5", "proposal_claim_verifier_completed", "visitor-a", "/en/candidate-proposal-checker"),
    event("6", "proposal_claim_methodology_clicked", "visitor-a", "/en/candidate-proposal-checker"),
    event("7", "proposal_claim_verifier_cta_clicked", "visitor-a", "/en/candidate-proposal-checker"),
    event("7b", "agency_content_cta_clicked", "visitor-a", "/en/agency", { destination: "/en/agency#pricing", location: "hero", intent: "product" }),
    event("8", "login_verified", "visitor-a", "/login", { nextPath: "/agency/account", isNewUser: true }),
    event("9", "page_view", "bot-crawler", "/en/agency", { deviceType: "bot" }),
    event("10", "page_view", "visitor-direct", "/en/agency", { sourceType: "direct", sourceLabel: "Direct" }),
    { ...event("11", "page_view", "visitor-outside", "/en/agency"), createdAt: until },
  ];

  const actors: AgencyProductActorInput[] = [
    {
      userId: "external-user",
      email: "recruiter@northstar.co.uk",
      excludeFromProductMetrics: false,
      subscriptionCreatedAt: new Date("2026-08-15T10:10:00.000Z"),
      checkoutSessionId: "checkout-1",
      status: "active",
      paidAt: new Date("2026-08-15T10:12:00.000Z"),
      matchPacks: [
        {
          id: "pack-1",
          createdAt: new Date("2026-08-15T11:00:00.000Z"),
          updatedAt: new Date("2026-08-15T12:00:00.000Z"),
          claimVerificationData: { version: "v1" },
          approvedAt: new Date("2026-08-15T12:00:00.000Z"),
          firstExportedAt: new Date("2026-08-15T12:30:00.000Z"),
          correctionsCount: 2,
          unsupportedClaimsCaught: 3,
          clientOutcome: "accepted",
          candidateReviews: [{
            invitedAt: new Date("2026-08-15T11:10:00.000Z"),
            respondedAt: new Date("2026-08-15T11:40:00.000Z"),
            status: "confirmed",
          }],
        },
        {
          id: "pack-2",
          createdAt: new Date("2026-08-20T09:00:00.000Z"),
          updatedAt: new Date("2026-08-20T09:30:00.000Z"),
          claimVerificationData: null,
          approvedAt: null,
          firstExportedAt: null,
          correctionsCount: 1,
          unsupportedClaimsCaught: 0,
          clientOutcome: "unknown",
          candidateReviews: [],
        },
      ],
    },
    {
      userId: "owner-user",
      email: "owner@gmail.com",
      excludeFromProductMetrics: false,
      subscriptionCreatedAt: new Date("2026-08-01T00:00:00.000Z"),
      checkoutSessionId: "checkout-owner",
      status: "active",
      paidAt: new Date("2026-08-01T00:01:00.000Z"),
      matchPacks: [],
    },
    {
      userId: "fixture-user",
      email: "fixture-matchpack@gmail.com",
      excludeFromProductMetrics: false,
      subscriptionCreatedAt: new Date("2026-08-01T00:00:00.000Z"),
      checkoutSessionId: "checkout-fixture",
      status: "active",
      paidAt: new Date("2026-08-01T00:01:00.000Z"),
      matchPacks: [],
    },
  ];

  const report = buildAgencyValidationReport({
    events,
    actors,
    since,
    until,
    configuredExcludedEmails: ["owner@gmail.com"],
  });

  assert.equal(stage(report, "qualified_organic_session").count, 1);
  assert.equal(stage(report, "guide_viewed").count, 1);
  assert.equal(stage(report, "verifier_completed").count, 1);
  assert.equal(stage(report, "agency_login_completed").count, 1);
  assert.equal(stage(report, "matchpack_cta_selected").count, 1);
  assert.equal(stage(report, "agency_checkout_created").count, 1);
  assert.equal(stage(report, "agency_paid").count, 1);
  assert.equal(stage(report, "first_export").count, 1);
  assert.equal(stage(report, "repeat_matchpack").count, 1);
  assert.equal(stage(report, "client_outcome_recorded").count, 1);
  assert.equal(stage(report, "agency_checkout_created").conversionRate, null, "visitor-to-user transition must not show a misleading rate");
  assert.equal(stage(report, "agency_paid").conversionRate, 1);

  assert.equal(report.outcomes.externalPaidSubscriptions, 1);
  assert.deepEqual(report.outcomes.matrixDownloads, { docx: 1, csv: 0 });
  assert.equal(report.outcomes.approvedOrExportedMatchPacks, 1);
  assert.equal(report.outcomes.unsupportedClaimsCaught, 3);
  assert.equal(report.outcomes.recruiterCorrections, 3);
  assert.equal(report.outcomes.clientOutcomesRecorded, 1);
  assert.equal(report.outcomes.medianUploadToExportMinutes, 90);
  assert.equal(report.outcomes.medianInvitationToResponseHours, 0.5);
  assert.equal(report.sampleSizes.qualifiedOrganicSessions, 1);
  assert.equal(report.sampleSizes.completedVerifierRuns, 1);
  assert.ok(report.breakdowns.some((row) => row.dimension === "locale" && row.segment === "en" && row.qualifiedSessions === 1));
  assert.ok(report.breakdowns.some((row) => row.dimension === "visitor_status" && row.segment === "new" && row.qualifiedSessions === 1));
  assert.equal(report.breakdowns.some((row) => row.segment === "visitor-outside"), false);

  const englishRoute = report.routeBreakdowns.find((row) => row.routeId === "en_product");
  assert.ok(englishRoute);
  assert.equal(englishRoute.qualifiedSessions, 1);
  assert.equal(englishRoute.checkerViews, 0, "checker events belong to the checker route, not the product route");
  assert.equal(englishRoute.paidUsers, 0, "product records without a matching user attribution stay out of a route row");

  const publicSectorRoute = report.routeBreakdowns.find((row) => row.routeId === "nl_public_sector_submission");
  assert.ok(publicSectorRoute);
  assert.equal(publicSectorRoute.guideViews, 1);
  assert.equal(publicSectorRoute.matrixDocxDownloads, 1);

  const aggregate = report.routeBreakdowns.find((row) => row.routeId === "aggregate");
  assert.ok(aggregate);
  assert.equal(aggregate.locale, "mixed");
  assert.equal(aggregate.checkerCompletions, 1);
  assert.equal(aggregate.paidUsers, 1);
  assert.equal(aggregate.sourceBreakdown.Google, 1);
});
