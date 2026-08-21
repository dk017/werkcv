import { createHash } from "node:crypto";
import { z } from "zod";

export const approvalDataSchema = z.object({
  version: z.literal(1),
  selectedVariant: z.enum(["full", "contact_free"]),
  confirmations: z.object({
    evidenceReviewed: z.literal(true),
    candidateDataReviewed: z.literal(true),
    clientCopyReviewed: z.literal(true),
    sharingAuthorityConfirmed: z.literal(true),
  }),
  approvedAt: z.string().datetime({ offset: true }),
  approvedById: z.string().min(1).max(160),
  revisionVersion: z.number().int().positive(),
});

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
  const actual = createApprovedSnapshotDigest({
    candidateData: value.candidateData,
    submissionData: value.submissionData,
    analysis: value.analysis,
    selectedVariant: approval.data.selectedVariant,
    templateId: value.templateId,
    colorThemeId: value.colorThemeId,
    agencyTemplateId: value.agencyTemplateId,
    revisionVersion: value.approvedRevisionVersion,
  });
  if (actual !== value.approvedSnapshotDigest) throw new ApprovedSnapshotIntegrityError();
}
