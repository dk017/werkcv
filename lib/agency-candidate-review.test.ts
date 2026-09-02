import assert from "node:assert/strict";
import test from "node:test";
import {
  CANDIDATE_REVIEW_SESSION_TTL_MS,
  CANDIDATE_REVIEW_TOKEN_TTL_MS,
  candidateReviewInvitationSchema,
  candidateReviewOverrideSchema,
  candidateReviewResponseSchema,
  candidateReviewSecretMatches,
  digestCandidateReviewSnapshot,
  generateCandidateReviewSecret,
  hashCandidateReviewSecret,
  type CandidateReviewSnapshotV1,
} from "./agency-candidate-review";

const snapshot: CandidateReviewSnapshotV1 = {
  version: 1,
  statementVersion: "candidate_acknowledgement_v1",
  recipientOrganization: "Fictional Harbour Care",
  vacancyTitle: "HR adviser",
  selectedVariant: "contact_free",
  locale: "en",
  agency: {
    legalName: "Fictional Recruitment Agency",
    privacyPolicyUrl: "https://example.test/privacy",
    privacyContactEmail: "privacy@example.test",
  },
  candidateData: { personal: { name: "Fictional Candidate" }, experience: [] },
  submissionData: { clientIntroduction: "Fictional introduction" },
  claimVerificationData: { version: 1 },
  retentionExpiresAt: "2026-12-01T00:00:00.000Z",
};

test("candidate invitation secrets are 256-bit, hashed and timing-safe comparable", () => {
  const secret = generateCandidateReviewSecret();
  const other = generateCandidateReviewSecret();
  assert.match(secret, /^[A-Za-z0-9_-]{43}$/);
  assert.notEqual(secret, other);
  assert.match(hashCandidateReviewSecret(secret), /^[a-f0-9]{64}$/);
  assert.equal(candidateReviewSecretMatches(secret, hashCandidateReviewSecret(secret)), true);
  assert.equal(candidateReviewSecretMatches(other, hashCandidateReviewSecret(secret)), false);
  assert.equal(CANDIDATE_REVIEW_TOKEN_TTL_MS, 72 * 60 * 60 * 1000);
  assert.equal(CANDIDATE_REVIEW_SESSION_TTL_MS, 60 * 60 * 1000);
});

test("the immutable candidate-review digest is canonical and covers recipient-visible facts", () => {
  const reordered = { ...snapshot, agency: { privacyContactEmail: "privacy@example.test", legalName: "Fictional Recruitment Agency", privacyPolicyUrl: "https://example.test/privacy" } };
  assert.equal(digestCandidateReviewSnapshot(snapshot), digestCandidateReviewSnapshot(reordered));
  assert.notEqual(digestCandidateReviewSnapshot(snapshot), digestCandidateReviewSnapshot({ ...snapshot, recipientOrganization: "Different Named Client" }));
  assert.notEqual(digestCandidateReviewSnapshot(snapshot), digestCandidateReviewSnapshot({ ...snapshot, submissionData: { clientIntroduction: "Changed text" } }));
});

test("candidate correction and override boundary schemas fail closed", () => {
  assert.equal(candidateReviewInvitationSchema.safeParse({ candidateEmail: "candidate@example.test", recipientOrganization: "Named Client", vacancyTitle: "Role", selectedVariant: "full" }).success, true);
  assert.equal(candidateReviewInvitationSchema.safeParse({ candidateEmail: "candidate@example.test", recipientOrganization: "", vacancyTitle: "Role", selectedVariant: "full" }).success, false);
  assert.equal(candidateReviewResponseSchema.safeParse({ response: "corrections_requested", suggestions: [] }).success, false);
  assert.equal(candidateReviewResponseSchema.safeParse({ response: "confirmed", suggestions: [{ targetType: "client_email", targetPath: "clientEmailBody", originalValue: "A", proposedValue: "B", candidateNote: "" }] }).success, false);
  assert.equal(candidateReviewOverrideSchema.safeParse({ reason: "Too short" }).success, false);
  assert.equal(candidateReviewOverrideSchema.safeParse({ reason: "Candidate did not respond after the documented reminder." }).success, true);
});
