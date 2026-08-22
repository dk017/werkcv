import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { parseStoredMatchPackData, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { proposalClaimVerificationV1Schema } from "@/lib/tools/proposal-claim-verifier-schema";

export const CANDIDATE_REVIEW_STATEMENT_VERSION = "candidate_acknowledgement_v1";
export const CANDIDATE_REVIEW_TOKEN_TTL_MS = 72 * 60 * 60 * 1000;
export const CANDIDATE_REVIEW_SESSION_TTL_MS = 60 * 60 * 1000;

export const candidateReviewInvitationSchema = z.object({
  candidateEmail: z.string().trim().email().max(320),
  recipientOrganization: z.string().trim().min(2).max(180),
  vacancyTitle: z.string().trim().min(2).max(180),
  selectedVariant: z.enum(["full", "contact_free"]),
});

export const candidateReviewResponseSchema = z.object({
  response: z.enum(["confirmed", "declined", "corrections_requested"]),
  suggestions: z.array(z.object({
    targetType: z.enum(["candidate_cv", "client_introduction", "client_email", "commercial_fact"]),
    targetPath: z.string().trim().min(1).max(240),
    originalValue: z.string().max(4_000),
    proposedValue: z.string().trim().min(1).max(4_000),
    candidateNote: z.string().trim().max(2_000).default(""),
  })).max(20).default([]),
}).superRefine((value, context) => {
  if (value.response === "corrections_requested" && value.suggestions.length === 0) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["suggestions"], message: "At least one correction is required." });
  }
  if (value.response !== "corrections_requested" && value.suggestions.length > 0) {
    context.addIssue({ code: z.ZodIssueCode.custom, path: ["suggestions"], message: "Suggestions are only allowed with corrections_requested." });
  }
});

export const candidateReviewOverrideSchema = z.object({
  reason: z.string().trim().min(20).max(500),
});

export type CandidateReviewSnapshotV1 = {
  version: 1;
  statementVersion: typeof CANDIDATE_REVIEW_STATEMENT_VERSION;
  recipientOrganization: string;
  vacancyTitle: string;
  selectedVariant: "full" | "contact_free";
  locale: "nl" | "en";
  agency: {
    legalName: string;
    privacyPolicyUrl: string;
    privacyContactEmail: string;
  };
  candidateData: unknown;
  submissionData: unknown;
  claimVerificationData: unknown;
  retentionExpiresAt: string;
};

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonicalize(child)]));
  }
  return value;
}

export function createCandidateReviewSnapshot(input: {
  recipientOrganization: string;
  vacancyTitle: string;
  selectedVariant: "full" | "contact_free";
  locale: string;
  legalName: string;
  privacyPolicyUrl: string;
  privacyContactEmail: string;
  candidateData: unknown;
  anonymizedData: unknown;
  submissionData: unknown;
  claimVerificationData: unknown;
  retentionExpiresAt: Date;
}): CandidateReviewSnapshotV1 {
  const candidateData = parseStoredMatchPackData(input.selectedVariant === "contact_free" ? input.anonymizedData : input.candidateData);
  const submissionData = parseStoredMatchPackSubmission(input.submissionData);
  const claimVerificationData = proposalClaimVerificationV1Schema.parse(input.claimVerificationData);
  return {
    version: 1,
    statementVersion: CANDIDATE_REVIEW_STATEMENT_VERSION,
    recipientOrganization: input.recipientOrganization,
    vacancyTitle: input.vacancyTitle,
    selectedVariant: input.selectedVariant,
    locale: input.locale === "en" ? "en" : "nl",
    agency: {
      legalName: input.legalName,
      privacyPolicyUrl: input.privacyPolicyUrl,
      privacyContactEmail: input.privacyContactEmail,
    },
    candidateData,
    submissionData,
    claimVerificationData,
    retentionExpiresAt: input.retentionExpiresAt.toISOString(),
  };
}

export function digestCandidateReviewSnapshot(snapshot: CandidateReviewSnapshotV1): string {
  return createHash("sha256").update(JSON.stringify(canonicalize(snapshot))).digest("hex");
}

export function candidateReviewCorrectionTargets(snapshot: CandidateReviewSnapshotV1): Map<string, { targetType: string; originalValue: string }> {
  const candidate = parseStoredMatchPackData(snapshot.candidateData);
  const submission = parseStoredMatchPackSubmission(snapshot.submissionData);
  const targets = new Map<string, { targetType: string; originalValue: string }>();
  if (candidate.personal.summary) targets.set("personal.summary", { targetType: "candidate_cv", originalValue: candidate.personal.summary });
  candidate.experience.forEach((item, index) => {
    if (item.description) targets.set(`experience.${index}.description`, { targetType: "candidate_cv", originalValue: item.description });
  });
  targets.set("clientIntroduction", { targetType: "client_introduction", originalValue: submission.clientIntroduction });
  targets.set("clientEmailBody", { targetType: "client_email", originalValue: submission.clientEmailBody });
  Object.entries(submission.commercial).forEach(([key, value]) => {
    if (value) targets.set(`commercial.${key}`, { targetType: "commercial_fact", originalValue: value });
  });
  return targets;
}

export function generateCandidateReviewSecret(): string {
  return randomBytes(32).toString("base64url");
}

export function hashCandidateReviewSecret(secret: string): string {
  return createHash("sha256").update(secret).digest("hex");
}

export function candidateReviewSecretMatches(secret: string, expectedHash: string): boolean {
  const actual = Buffer.from(hashCandidateReviewSecret(secret), "hex");
  const expected = Buffer.from(expectedHash, "hex");
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function candidateReviewCanonicalOrigin(): string {
  const configured = process.env.NEXT_PUBLIC_APP_URL || "https://werkcv.nl";
  const url = new URL(configured);
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") throw new Error("CANONICAL_HTTPS_ORIGIN_REQUIRED");
  return url.origin;
}

export function pseudonymousNetworkKey(ip: string): string {
  const secret = process.env.AUTH_SESSION_SECRET || "development-only-network-key";
  return createHash("sha256").update(`candidate-review:${secret}:${ip}`).digest("hex").slice(0, 32);
}
