import { createHash } from "node:crypto";
import { z } from "zod";

const approvalConfirmationsSchema = z.object({
  evidenceReviewed: z.literal(true),
  candidateDataReviewed: z.literal(true),
  clientCopyReviewed: z.literal(true),
  sharingAuthorityConfirmed: z.literal(true),
});

export const approvalDataV1Schema = z.object({
  version: z.literal(1),
  selectedVariant: z.enum(["full", "contact_free"]),
  confirmations: approvalConfirmationsSchema,
  approvedAt: z.string().datetime({ offset: true }),
  approvedById: z.string().min(1).max(160),
  revisionVersion: z.number().int().positive(),
});

export const approvalDataV2Schema = z.object({
  version: z.literal(2),
  selectedVariant: z.enum(["full", "contact_free"]),
  confirmations: approvalConfirmationsSchema,
  approvedAt: z.string().datetime({ offset: true }),
  approvedById: z.string().min(1).max(160),
  revisionVersion: z.number().int().positive(),
  candidateReviewAssurance: z.discriminatedUnion("kind", [
    z.object({
      kind: z.literal("candidate_acknowledgement"),
      reviewId: z.string().min(1).max(160),
      snapshotDigest: z.string().regex(/^[a-f0-9]{64}$/),
      respondedAt: z.string().datetime({ offset: true }),
    }),
    z.object({
      kind: z.literal("reviewer_override"),
      reviewId: z.string().min(1).max(160),
      eventId: z.string().min(1).max(160),
      reason: z.string().trim().min(20).max(500),
      overriddenAt: z.string().datetime({ offset: true }),
      overriddenById: z.string().min(1).max(160),
    }),
  ]).nullable(),
});

export const approvalDataSchema = z.discriminatedUnion("version", [approvalDataV1Schema, approvalDataV2Schema]);

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }
  return value;
}

export function createApprovedSnapshotDigest(value: {
  candidateData: unknown;
  submissionData: unknown;
  analysis: unknown;
  selectedVariant: "full" | "contact_free";
  templateId: string;
  colorThemeId: string;
  agencyTemplateId?: string | null;
  revisionVersion: number;
}): string {
  return createHash("sha256").update(JSON.stringify(canonicalize(value))).digest("hex");
}

export function createApprovedSnapshotDigestV2(value: {
  candidateData: unknown;
  submissionData: unknown;
  analysis: unknown;
  claimVerificationData: unknown;
  candidateReviewAssurance: unknown;
  selectedVariant: "full" | "contact_free";
  templateId: string;
  colorThemeId: string;
  agencyTemplateId?: string | null;
  revisionVersion: number;
}): string {
  return createHash("sha256").update(JSON.stringify(canonicalize(value))).digest("hex");
}

export class ApprovedSnapshotIntegrityError extends Error {
  readonly code = "APPROVED_SNAPSHOT_INVALID";

  constructor() {
    super("The approved MatchPack snapshot no longer matches its approval record.");
    this.name = "ApprovedSnapshotIntegrityError";
  }
}

export function assertApprovedSnapshotIntegrity(value: {
  candidateData: unknown;
  submissionData: unknown;
  analysis: unknown;
  claimVerificationData?: unknown;
  templateId: string;
  colorThemeId: string;
  agencyTemplateId?: string | null;
  approvalData: unknown;
  approvedRevisionVersion: number | null;
  approvedSnapshotDigest: string | null;
}): void {
  const approval = approvalDataSchema.safeParse(value.approvalData);
  if (!approval.success
    || !value.approvedSnapshotDigest
    || !value.approvedRevisionVersion
    || approval.data.revisionVersion !== value.approvedRevisionVersion) {
    throw new ApprovedSnapshotIntegrityError();
  }
  const actual = approval.data.version === 1
    ? createApprovedSnapshotDigest({
      candidateData: value.candidateData,
      submissionData: value.submissionData,
      analysis: value.analysis,
      selectedVariant: approval.data.selectedVariant,
      templateId: value.templateId,
      colorThemeId: value.colorThemeId,
      agencyTemplateId: value.agencyTemplateId,
      revisionVersion: value.approvedRevisionVersion,
    })
    : createApprovedSnapshotDigestV2({
      candidateData: value.candidateData,
      submissionData: value.submissionData,
      analysis: value.analysis,
      claimVerificationData: value.claimVerificationData,
      candidateReviewAssurance: approval.data.candidateReviewAssurance,
      selectedVariant: approval.data.selectedVariant,
      templateId: value.templateId,
      colorThemeId: value.colorThemeId,
      agencyTemplateId: value.agencyTemplateId,
      revisionVersion: value.approvedRevisionVersion,
    });
  if (actual !== value.approvedSnapshotDigest) throw new ApprovedSnapshotIntegrityError();
}
