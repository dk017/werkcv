import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canReviewAgencyEvidence, getAgencyAccessForUser } from "@/lib/agency-access";
import { proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";
import { parseStoredMatchPackAnalysis, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { matchPackSourceMapSchema } from "@/lib/agency-matchpack-source";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { proposalClaimVerificationV1Schema } from "@/lib/tools/proposal-claim-verifier-schema";
import { verifyProposalClaims } from "@/lib/tools/proposal-claim-verifier";

export const runtime = "nodejs";

const reviewerUpdateSchema = z.object({
  reviews: z.array(z.object({
    claimId: z.string().min(1).max(80),
    status: z.enum(["accepted", "corrected", "removed"]),
    note: z.string().trim().max(500).default(""),
  })).min(1).max(20),
});

type ClaimPack = {
  id: string;
  status: string;
  locale: string;
  sourceText: string | null;
  sourceMap: Prisma.JsonValue;
  vacancyText: string;
  candidateData: Prisma.JsonValue;
  submissionData: Prisma.JsonValue;
  analysis: Prisma.JsonValue;
  claimVerificationData: Prisma.JsonValue;
};

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function contextFor(request: NextRequest, id: string) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return { response: json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409) };
  if (!canReviewAgencyEvidence(access)) return { response: json({ error: "Your agency role cannot review claims.", code: "ROLE_FORBIDDEN" }, 403) };
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: access.ownerUserId || user.id },
    select: {
      id: true, status: true, locale: true, sourceText: true, sourceMap: true, vacancyText: true,
      candidateData: true, submissionData: true, analysis: true, claimVerificationData: true,
    },
  });
  if (!pack) return { response: json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404) };
  if (pack.status !== "analyzed") return { response: json({ error: "Approved MatchPacks are locked.", code: "PACK_LOCKED" }, 409) };
  return { user, access, pack };
}

function proposalText(submission: ReturnType<typeof parseStoredMatchPackSubmission>): string {
  const commercial = Object.entries(submission.commercial)
    .filter(([, value]) => value.trim())
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  return [submission.clientIntroduction, commercial, submission.clientEmailSubject, submission.clientEmailBody]
    .filter(Boolean)
    .join("\n\n");
}

async function saveVerification(input: {
  pack: ClaimPack;
  userId: string;
  verification: z.infer<typeof proposalClaimVerificationV1Schema>;
}) {
  return prisma.$transaction(async (tx) => {
    const latest = await tx.agencyMatchPackRevision.findFirst({ where: { matchPackId: input.pack.id }, orderBy: { version: "desc" }, select: { version: true } });
    const version = (latest?.version || 0) + 1;
    const savedAt = new Date();
    await tx.agencyMatchPack.update({ where: { id: input.pack.id }, data: { claimVerificationData: input.verification as unknown as Prisma.InputJsonValue, updatedAt: savedAt } });
    await tx.agencyMatchPackRevision.create({ data: {
      matchPackId: input.pack.id,
      version,
      reason: "claim_review_saved",
      candidateData: input.pack.candidateData as Prisma.InputJsonValue,
      submissionData: input.pack.submissionData as Prisma.InputJsonValue,
      // Re-serialize through the agency schema so a legacy scored result
      // cannot be copied into a new MatchPack revision.
      analysis: parseStoredMatchPackAnalysis(input.pack.analysis) as unknown as Prisma.InputJsonValue,
      claimVerificationData: input.verification as unknown as Prisma.InputJsonValue,
      changedFields: ["claimVerificationData"],
      createdById: input.userId,
    } });
    await tx.agencyCandidateReview.updateMany({
      where: { matchPackId: input.pack.id, status: { notIn: ["revoked", "stale"] } },
      data: { status: "stale", revokedAt: savedAt, tokenHash: null },
    });
    return version;
  });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!proposalClaimVerifierEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const { id } = await context.params;
  const current = await contextFor(request, id.trim().slice(0, 120));
  if ("response" in current) return current.response;
  const rate = checkRateLimit(`${current.user.id}:${getClientIp(request).slice(0, 120)}`, { bucket: "agency-claim-verifier", maxRequests: 20, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return json({ error: "Too many claim checks.", code: "RATE_LIMITED" }, 429);
  if (!current.pack.sourceText || !current.pack.sourceMap || !current.pack.submissionData) return json({ error: "The original source is unavailable.", code: "EVIDENCE_UNRESOLVED" }, 409);

  try {
    const submission = parseStoredMatchPackSubmission(current.pack.submissionData);
    const verification = await verifyProposalClaims({
      cvText: current.pack.sourceText,
      proposalText: proposalText(submission),
      vacancyText: current.pack.vacancyText,
      locale: current.pack.locale === "en" ? "en" : "nl",
      sourceMap: matchPackSourceMapSchema.parse(current.pack.sourceMap),
    });
    const revisionVersion = await saveVerification({ pack: current.pack, userId: current.user.id, verification });
    return json({ success: true, verification, revisionVersion });
  } catch (error) {
    console.error("agency_claim_verification_failed", { packId: current.pack.id, code: error instanceof Error ? error.name : "unknown" });
    return json({ error: "The client-facing claims could not be checked.", code: "CLAIM_VERIFICATION_FAILED" }, 500);
  }
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!proposalClaimVerifierEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const { id } = await context.params;
  const current = await contextFor(request, id.trim().slice(0, 120));
  if ("response" in current) return current.response;
  const payload = reviewerUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Invalid claim review.", code: "INVALID_REVIEW" }, 400);
  const verification = proposalClaimVerificationV1Schema.safeParse(current.pack.claimVerificationData);
  if (!verification.success) return json({ error: "Run the claim verifier first.", code: "CLAIM_VERIFICATION_REQUIRED" }, 409);
  const updates = new Map(payload.data.reviews.map((review) => [review.claimId, review]));
  if ([...updates.keys()].some((claimId) => !verification.data.claims.some((claim) => claim.id === claimId))) return json({ error: "A claim changed. Run the verifier again.", code: "CLAIM_REVIEW_STALE" }, 409);
  const reviewedAt = new Date().toISOString();
  const next = proposalClaimVerificationV1Schema.parse({
    ...verification.data,
    claims: verification.data.claims.map((claim) => {
      const update = updates.get(claim.id);
      return update ? { ...claim, reviewer: { status: update.status, reviewerId: current.user.id, reviewedAt, note: update.note } } : claim;
    }),
  });
  const revisionVersion = await saveVerification({ pack: current.pack, userId: current.user.id, verification: next });
  return json({ success: true, verification: next, revisionVersion });
}
