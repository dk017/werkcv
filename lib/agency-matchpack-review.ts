import { z } from "zod";
import {
  matchPackAnalysisSchema,
  type MatchPackAnalysis,
  type MatchPackEvidenceReview,
} from "@/lib/agency-matchpack";
import {
  matchPackSourceMapSchema,
  referenceResolves,
  resolveMatchPackSourceReference,
  type MatchPackSourceMapV1,
} from "@/lib/agency-matchpack-source";
import {
  evidenceReferenceSchema,
  type EvidenceReference,
  type SourceReference,
} from "@/lib/tools/cv-vacature-match-schema";

export class MatchPackReviewError extends Error {
  constructor(public readonly code: "REVIEW_INCOMPLETE" | "EVIDENCE_UNRESOLVED" | "CORRECTION_INVALID", message: string) {
    super(message);
    this.name = "MatchPackReviewError";
  }
}

function baseEvidenceReference(reference?: EvidenceReference): EvidenceReference {
  return evidenceReferenceSchema.parse(reference || {
    sourcePage: null,
    sourceLine: 1,
    sourceSection: "Niet gevonden in bron",
    snippet: "",
    match: "not_found",
    reviewerStatus: "unreviewed",
    reviewerNote: "",
    reviewedEvidence: "",
    reviewedSource: null,
    reviewedAt: null,
    reviewerId: null,
  });
}

function resolveReviewSource(
  requested: SourceReference | null,
  fallback: EvidenceReference,
  sourceText: string,
  sourceMap: MatchPackSourceMapV1,
): SourceReference | null {
  if (requested?.snippet.trim()) {
    const resolvedRequested = resolveMatchPackSourceReference(sourceText, requested.snippet, sourceMap);
    return resolvedRequested.match === "not_found" ? null : resolvedRequested;
  }
  const source = requested || (fallback.match !== "not_found" ? {
    sourcePage: fallback.sourcePage,
    sourceLine: fallback.sourceLine,
    sourceSection: fallback.sourceSection,
    snippet: fallback.snippet,
    match: fallback.match,
  } : null);
  if (!source || !referenceResolves(source, sourceText, sourceMap)) return null;
  return resolveMatchPackSourceReference(sourceText, source.snippet, sourceMap);
}

export function applyEvidenceReviews(
  analysis: MatchPackAnalysis,
  reviews: MatchPackEvidenceReview[],
  reviewerId: string,
  sourceText: string,
  sourceMapValue: unknown,
  reviewedAt = new Date().toISOString(),
): MatchPackAnalysis {
  const sourceMap = matchPackSourceMapSchema.parse(sourceMapValue);
  const reviewMap = new Map(reviews.map((review) => [review.requirementIndex, review]));

  return matchPackAnalysisSchema.parse({
    ...analysis,
    result: {
      ...analysis.result,
      requirements: analysis.result.requirements.map((requirement, index) => {
        const review = reviewMap.get(index);
        if (!review) return requirement;
        const fallback = baseEvidenceReference(requirement.evidenceReference);

        if (review.reviewerStatus === "unreviewed") {
          return {
            ...requirement,
            evidenceReference: evidenceReferenceSchema.parse({
              ...fallback,
              reviewerStatus: "unreviewed",
              reviewerNote: "",
              reviewedEvidence: "",
              reviewedSource: null,
              reviewedAt: null,
              reviewerId: null,
            }),
          };
        }

        if (review.reviewerStatus === "rejected") {
          return {
            ...requirement,
            evidenceReference: evidenceReferenceSchema.parse({
              ...fallback,
              reviewerStatus: "rejected",
              reviewerNote: review.reviewerNote,
              reviewedEvidence: "",
              reviewedSource: null,
              reviewedAt,
              reviewerId,
            }),
          };
        }

        const reviewedSource = resolveReviewSource(review.reviewedSource, fallback, sourceText, sourceMap);
        if (!reviewedSource || reviewedSource.match === "not_found") {
          throw new MatchPackReviewError("EVIDENCE_UNRESOLVED", `Requirement ${index + 1} has no resolvable CV source.`);
        }
        const reviewedEvidence = (review.reviewedEvidence || requirement.cvEvidence).trim();
        if (!reviewedEvidence) {
          throw new MatchPackReviewError("EVIDENCE_UNRESOLVED", `Requirement ${index + 1} has no reviewed evidence.`);
        }
        if (review.reviewerStatus === "corrected" && !review.reviewerNote.trim()) {
          throw new MatchPackReviewError("CORRECTION_INVALID", `Requirement ${index + 1} needs a correction note.`);
        }

        return {
          ...requirement,
          evidenceReference: evidenceReferenceSchema.parse({
            ...fallback,
            reviewerStatus: review.reviewerStatus,
            reviewerNote: review.reviewerNote,
            reviewedEvidence,
            reviewedSource,
            reviewedAt,
            reviewerId,
          }),
        };
      }),
    },
  });
}

export function validateMatchPackReviewForApproval(input: {
  analysis: MatchPackAnalysis;
  sourceText: string;
  sourceMap: unknown;
  vacancyText: string;
}): { correctionsCount: number; unsupportedClaimsCaught: number } {
  const sourceMap = matchPackSourceMapSchema.parse(input.sourceMap);
  let correctionsCount = 0;
  let unsupportedClaimsCaught = 0;

  input.analysis.result.requirements.forEach((requirement, index) => {
    if (requirement.vacancyReference && !referenceResolves(requirement.vacancyReference, input.vacancyText)) {
      throw new MatchPackReviewError("EVIDENCE_UNRESOLVED", `Requirement ${index + 1} no longer resolves to the vacancy.`);
    }
    const review = baseEvidenceReference(requirement.evidenceReference);
    if (review.reviewerStatus === "unreviewed") {
      throw new MatchPackReviewError("REVIEW_INCOMPLETE", `Requirement ${index + 1} is not reviewed.`);
    }
    if (review.reviewerStatus === "rejected") {
      if (review.reviewedEvidence) throw new MatchPackReviewError("CORRECTION_INVALID", "Rejected evidence must be empty.");
      unsupportedClaimsCaught += 1;
      return;
    }
    if (review.reviewerStatus === "corrected") {
      correctionsCount += 1;
      if (!review.reviewerNote.trim()) throw new MatchPackReviewError("CORRECTION_INVALID", "Corrected evidence needs an internal note.");
    }
    if (!review.reviewedEvidence.trim() || !review.reviewedSource || !referenceResolves(review.reviewedSource, input.sourceText, sourceMap)) {
      throw new MatchPackReviewError("EVIDENCE_UNRESOLVED", `Requirement ${index + 1} has unresolved reviewed evidence.`);
    }
    if (!(["exact", "approximate"] as const).includes(review.reviewedSource.match as "exact" | "approximate")) {
      throw new MatchPackReviewError("EVIDENCE_UNRESOLVED", `Requirement ${index + 1} has an invalid reviewed source.`);
    }
  });

  return { correctionsCount, unsupportedClaimsCaught };
}

export function parseStoredSourceMap(value: unknown): MatchPackSourceMapV1 {
  return matchPackSourceMapSchema.parse(value);
}

export const matchPackApprovalRequestSchema = z.object({
  version: z.literal(1),
  expectedUpdatedAt: z.string().datetime({ offset: true }),
  expectedRevisionVersion: z.number().int().positive(),
  selectedVariant: z.enum(["full", "contact_free"]),
  confirmations: z.object({
    evidenceReviewed: z.literal(true),
    candidateDataReviewed: z.literal(true),
    clientCopyReviewed: z.literal(true),
    sharingAuthorityConfirmed: z.literal(true),
  }).strict(),
}).strict();

export type MatchPackApprovalRequestV1 = z.infer<typeof matchPackApprovalRequestSchema>;
