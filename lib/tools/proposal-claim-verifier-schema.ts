import { z } from "zod";

export const proposalClaimCategorySchema = z.enum([
  "experience",
  "duration",
  "responsibility",
  "skill",
  "education",
  "result",
  "numerical_scope",
  "current_fact",
  "other",
]);

export const proposalClaimVerdictSchema = z.enum([
  "supported",
  "partially_supported",
  "unsupported",
  "contradicted",
  "confirmation_required",
  "not_checkable",
]);

export const proposalClaimEvidenceSourceSchema = z.enum([
  "cv",
  "candidate_acknowledgement",
  "recruiter_assessment",
  "none",
]);

export const proposalClaimReviewerStatusSchema = z.enum([
  "unreviewed",
  "accepted",
  "corrected",
  "removed",
  "candidate_confirmed",
]);

export const proposalClaimSourceReferenceSchema = z.object({
  sourceKind: proposalClaimEvidenceSourceSchema,
  sourceDigest: z.string().regex(/^[a-f0-9]{64}$/),
  sourcePage: z.number().int().positive().nullable(),
  sourceLine: z.number().int().positive(),
  sourceSection: z.string().trim().min(1).max(120),
  start: z.number().int().nonnegative(),
  end: z.number().int().positive(),
  snippet: z.string().trim().min(1).max(500),
  match: z.enum(["exact", "approximate"]),
});

export const proposalClaimSchema = z.object({
  id: z.string().min(1).max(80),
  claim: z.string().trim().min(1).max(800),
  proposalStart: z.number().int().nonnegative(),
  proposalEnd: z.number().int().positive(),
  category: proposalClaimCategorySchema,
  verdict: proposalClaimVerdictSchema,
  evidenceSource: proposalClaimEvidenceSourceSchema,
  evidence: z.array(proposalClaimSourceReferenceSchema).max(3),
  explanation: z.string().trim().min(1).max(600),
  action: z.string().trim().min(1).max(400),
  reviewer: z.object({
    status: proposalClaimReviewerStatusSchema,
    reviewerId: z.string().max(160).nullable(),
    reviewedAt: z.string().datetime({ offset: true }).nullable(),
    note: z.string().max(500),
  }),
});

export const proposalClaimVerificationV1Schema = z.object({
  version: z.literal(1),
  verifierVersion: z.string().min(1).max(80),
  promptVersion: z.string().min(1).max(80),
  model: z.string().min(1).max(120),
  generatedAt: z.string().datetime({ offset: true }),
  locale: z.enum(["nl", "en"]),
  sourceDigest: z.string().regex(/^[a-f0-9]{64}$/),
  proposalDigest: z.string().regex(/^[a-f0-9]{64}$/),
  claims: z.array(proposalClaimSchema).max(20),
  summary: z.object({
    total: z.number().int().nonnegative(),
    supported: z.number().int().nonnegative(),
    partiallySupported: z.number().int().nonnegative(),
    unsupported: z.number().int().nonnegative(),
    contradicted: z.number().int().nonnegative(),
    confirmationRequired: z.number().int().nonnegative(),
    notCheckable: z.number().int().nonnegative(),
  }),
  limitations: z.array(z.string().trim().min(1).max(500)).min(2).max(6),
});

export type ProposalClaimVerificationV1 = z.infer<typeof proposalClaimVerificationV1Schema>;
export type ProposalClaim = z.infer<typeof proposalClaimSchema>;
export type ProposalClaimVerdict = z.infer<typeof proposalClaimVerdictSchema>;

export const proposalClaimAiResponseSchema = z.object({
  claims: z.array(z.object({
    claim: z.string().trim().min(1).max(800),
    category: proposalClaimCategorySchema,
    verdict: proposalClaimVerdictSchema,
    evidenceSnippet: z.string().trim().max(500),
    explanation: z.string().trim().min(1).max(600),
    action: z.string().trim().min(1).max(400),
  })).max(20),
});
