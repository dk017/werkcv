import { z } from "zod";

export const evidenceReferenceSchema = z.object({
  sourcePage: z.number().int().positive().nullable(),
  sourceLine: z.number().int().positive(),
  sourceSection: z.string(),
  snippet: z.string(),
  match: z.enum(["exact", "approximate", "not_found"]),
  reviewerStatus: z.enum(["unreviewed", "confirmed", "corrected", "rejected"]),
  reviewerNote: z.string(),
  reviewedAt: z.string().nullable(),
  reviewerId: z.string().nullable(),
});

export type EvidenceReference = z.infer<typeof evidenceReferenceSchema>;

export const requirementSchema = z.object({
  requirement: z.string(),
  vacancyEvidence: z.string(),
  importance: z.enum(["essential", "preferred"]),
  status: z.enum(["strong", "partial", "missing"]),
  cvEvidence: z.string(),
  honestAction: z.string(),
  evidenceReference: evidenceReferenceSchema.optional(),
});

export const aiAnalysisSchema = z.object({
  perceivedRole: z.string(),
  perceivedSeniority: z.enum(["entry", "mid", "senior", "lead", "unclear"]),
  roleClarity: z.enum(["clear", "partial", "unclear"]),
  evidenceStrength: z.enum(["strong", "mixed", "weak"]),
  summary: z.string(),
  strengths: z.array(
    z.object({
      title: z.string(),
      evidence: z.string(),
    }),
  ),
  requirements: z.array(requirementSchema),
  topFixes: z.array(
    z.object({
      category: z.enum(["relevance", "evidence", "clarity", "structure", "completeness"]),
      title: z.string(),
      evidence: z.string(),
      action: z.string(),
    }),
  ),
});

export const dimensionSchema = z.object({
  id: z.enum(["relevance", "evidence", "clarity", "structure", "completeness"]),
  label: z.string(),
  score: z.number().int().nonnegative(),
  maxScore: z.number().int().positive(),
  explanation: z.string(),
});

export const cvVacatureMatchResultSchema = z.object({
  score: z.number().int().min(0).max(100),
  scoreBand: z.enum(["weak", "fair", "good", "strong"]),
  scoreLabel: z.string(),
  summary: z.string(),
  perceivedRole: z.string(),
  perceivedSeniority: z.string(),
  dimensions: z.array(dimensionSchema),
  strengths: z.array(
    z.object({
      title: z.string(),
      evidence: z.string(),
    }),
  ),
  requirements: z.array(requirementSchema),
  missingKeywords: z.array(z.string()),
  topFixes: z.array(
    z.object({
      category: z.enum(["relevance", "evidence", "clarity", "structure", "completeness"]),
      title: z.string(),
      evidence: z.string(),
      action: z.string(),
    }),
  ),
  limitations: z.array(z.string()),
});

export type CvVacatureMatchResult = z.infer<typeof cvVacatureMatchResultSchema>;
