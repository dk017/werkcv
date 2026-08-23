import test from "node:test";
// Workspace boundary regression suite.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  isEnglishReturnPath,
  isMatchPackReturnPath,
  sanitizeInternalReturnPath,
} from "@/lib/auth/safe-return-path";
import { getRouteWorkspaceContext } from "@/lib/workspace/route-context";
import { deriveMatchPackStagePresentation } from "@/lib/agency-matchpack-stage-presentation";
import { buildPersonalCvPreview, personalCvLibraryQuerySchema } from "@/lib/cv-library";

test("return paths stay same-origin and inside supported application routes", () => {
  assert.equal(sanitizeInternalReturnPath("/agency/account/matchpack?tab=review"), "/agency/account/matchpack?tab=review");
  assert.equal(sanitizeInternalReturnPath("/editor?id=cv-1"), "/editor?id=cv-1");
  assert.equal(sanitizeInternalReturnPath("https://evil.example/login"), "/templates");
  assert.equal(sanitizeInternalReturnPath("//evil.example/login"), "/templates");
  assert.equal(sanitizeInternalReturnPath("/agency/account\\evil"), "/templates");
  assert.equal(sanitizeInternalReturnPath("/admin/users"), "/templates");
  assert.equal(sanitizeInternalReturnPath("/agency/account\u0000"), "/templates");
});

test("return-path helpers identify the intended workspace", () => {
  assert.equal(isMatchPackReturnPath("/agency/account/settings"), true);
  assert.equal(isMatchPackReturnPath("/mijn-cvs"), false);
  assert.equal(isEnglishReturnPath("/en/editor?template=professional"), true);
  assert.equal(isEnglishReturnPath("/editor"), false);
});

test("route context separates Personal, MatchPack and private surfaces", () => {
  assert.equal(getRouteWorkspaceContext("/mijn-cvs"), "personal_app");
  assert.equal(getRouteWorkspaceContext("/editor?id=abc"), "document_derived");
  assert.equal(getRouteWorkspaceContext("/agency/account/matchpack"), "matchpack_app");
  assert.equal(getRouteWorkspaceContext("/voor-bureaus/kennisbank"), "matchpack_marketing");
  assert.equal(getRouteWorkspaceContext("/en/agency/methodology/claim-evidence-benchmark"), "matchpack_marketing");
  assert.equal(getRouteWorkspaceContext("/kandidaat/bevestigen/token"), "private_external");
  assert.equal(getRouteWorkspaceContext("/api/pdf"), "none");
});

test("English MatchPack navigation uses the existing pricing route", () => {
  const root = process.cwd();
  const navigationSources = [
    readFileSync(join(root, "components/brand/BrandRouteBoundary.tsx"), "utf8"),
    readFileSync(join(root, "components/Footer.tsx"), "utf8"),
  ];
  for (const source of navigationSources) {
    assert.match(source, /href: "\/en\/pricing", label: "Pricing"/u);
    assert.doesNotMatch(source, /\/en\/agency#plan/u);
  }
});

test("Agency settings use real nested routes instead of scroll targets", () => {
  const root = process.cwd();
  const indexSource = readFileSync(join(root, "app/agency/account/settings/page.tsx"), "utf8");
  assert.match(indexSource, /redirect\("\/agency\/account\/settings\/organisation"\)/u);
  const sections = ["organisation", "templates", "team", "privacy", "data"] as const;
  for (const section of sections) {
    const source = readFileSync(join(root, `app/agency/account/settings/${section}/page.tsx`), "utf8");
    assert.match(source, new RegExp(`section=["']${section}["']`, "u"));
    assert.doesNotMatch(source, /focusSection|scrollIntoView/u);
  }
});

const stageInput = {
  isApproved: false,
  unsavedStageIds: [],
  canApprove: true,
  hasQuota: true,
  hasSavedSource: true,
  currentRevisionVersion: 2,
  evidenceReviewerStatuses: ["confirmed"],
  claimVerification: null,
  clientCopy: { introduction: "Intro", emailSubject: "Subject", emailBody: "Body" },
  selectedVariant: "full",
  approvalChecklistCompleted: 4,
  approvalChecklistTotal: 4,
  latestCandidateReview: null,
  claimVerifierEnabled: false,
  candidateAcknowledgementEnabled: false,
};

test("MatchPack stages follow feature flags and domain gates", () => {
  const withoutClaims = deriveMatchPackStagePresentation(stageInput);
  assert.deepEqual(withoutClaims.map((item) => item.id), ["source", "candidate_facts", "client_copy", "output", "approval"]);
  assert.equal(withoutClaims.find((item) => item.id === "approval")?.status, "action_required");
  assert.ok(withoutClaims.filter((item) => item.id !== "approval").every((item) => item.status === "complete"));

  const withClaims = deriveMatchPackStagePresentation({ ...stageInput, claimVerifierEnabled: true });
  assert.deepEqual(withClaims.map((item) => item.id), ["source", "claims", "candidate_facts", "client_copy", "output", "approval"]);
  assert.equal(withClaims.find((item) => item.id === "claims")?.status, "action_required");
  assert.equal(withClaims.find((item) => item.id === "approval")?.status, "locked");
});

test("MatchPack stages reject stale acknowledgement and lock approved snapshots", () => {
  const stale = deriveMatchPackStagePresentation({
    ...stageInput,
    candidateAcknowledgementEnabled: true,
    latestCandidateReview: { revisionVersion: 1, status: "responded", candidateResponse: "confirmed", pendingSuggestionCount: 0 },
  });
  assert.deepEqual(
    stale.find((item) => item.id === "candidate_facts")?.blockingReasonCodes,
    ["CANDIDATE_REVIEW_STALE"],
  );

  const approved = deriveMatchPackStagePresentation({ ...stageInput, isApproved: true });
  assert.equal(approved.find((item) => item.id === "approval")?.status, "complete");
  assert.equal(approved.find((item) => item.id === "source")?.status, "locked");
  assert.equal(approved.find((item) => item.id === "source")?.canOpen, true);
});

test("MatchPack stages propagate unsaved changes only to affected domains", () => {
  const changedClientCopy = deriveMatchPackStagePresentation({
    ...stageInput,
    claimVerifierEnabled: true,
    unsavedStageIds: ["client_copy"],
  });
  assert.equal(changedClientCopy.find((item) => item.id === "source")?.status, "complete");
  assert.equal(changedClientCopy.find((item) => item.id === "candidate_facts")?.status, "complete");
  assert.equal(changedClientCopy.find((item) => item.id === "claims")?.status, "action_required");
  assert.equal(changedClientCopy.find((item) => item.id === "client_copy")?.status, "action_required");
  assert.equal(changedClientCopy.find((item) => item.id === "output")?.status, "action_required");

  const acknowledgementInvalidated = deriveMatchPackStagePresentation({
    ...stageInput,
    candidateAcknowledgementEnabled: true,
    unsavedStageIds: ["client_copy"],
    latestCandidateReview: { revisionVersion: 2, status: "responded", candidateResponse: "confirmed", pendingSuggestionCount: 0 },
  });
  assert.deepEqual(
    acknowledgementInvalidated.find((item) => item.id === "candidate_facts")?.blockingReasonCodes,
    ["UNSAVED_CHANGES_INVALIDATE_ACKNOWLEDGEMENT"],
  );
});

test("Personal CV library validates its bounded query contract", () => {
  assert.deepEqual(personalCvLibraryQuerySchema.parse({}), {
    query: "",
    sort: "updated_desc",
  });
  assert.equal(personalCvLibraryQuerySchema.safeParse({ query: "x".repeat(101) }).success, false);
  assert.equal(personalCvLibraryQuerySchema.safeParse({ sort: "arbitrary" }).success, false);
  assert.equal(personalCvLibraryQuerySchema.safeParse({ ownerId: "other-user" }).success, false);
});

test("Personal CV cards receive a bounded preview instead of complete CV JSON", () => {
  const preview = buildPersonalCvPreview({
    personal: { name: "Candidate", title: "Engineer", email: "private@example.com", phone: "0612345678", photo: "x".repeat(10_000) },
    experience: Array.from({ length: 5 }, (_, index) => ({ role: `Role ${index}`, company: "Company", description: "x".repeat(1_000), highlights: ["one", "two", "three", "four"] })),
    skills: Array.from({ length: 20 }, (_, index) => ({ name: `Skill ${index}`, level: 3 })),
  });
  assert.equal(preview.personal.email, "");
  assert.equal(preview.personal.phone, "");
  assert.equal(preview.personal.photo, "");
  assert.equal(preview.experience.length, 2);
  assert.equal(preview.experience[0].description.length, 280);
  assert.equal(preview.skills.length, 8);
});
