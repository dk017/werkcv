import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canApproveAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import { AgencyClaimGateError, assertClaimsReadyForApproval } from "@/lib/agency-claim-review";
import { candidateReviewOverrideSchema } from "@/lib/agency-candidate-review";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";
function json(body: Record<string, unknown>, status = 200) { return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } }); }

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!candidateAcknowledgementEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canApproveAgencyWork(access)) return json({ error: "Only an owner or reviewer can record an override.", code: "ROLE_FORBIDDEN" }, 403);
  const payload = candidateReviewOverrideSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Provide a reason of 20–500 characters.", code: "OVERRIDE_REASON_REQUIRED" }, 400);
  const { id } = await context.params;
  const pack = await prisma.agencyMatchPack.findFirst({ where: { id: id.trim().slice(0, 120), userId: access.ownerUserId || user.id }, select: { id: true, status: true, claimVerificationData: true, revisions: { select: { version: true }, orderBy: { version: "desc" }, take: 1 }, candidateReviews: { orderBy: { createdAt: "desc" }, take: 1, include: { suggestions: { where: { status: "pending" }, select: { id: true } } } } } });
  if (!pack || !pack.revisions[0] || !pack.candidateReviews[0]) return json({ error: "A candidate invitation is required before an override.", code: "CANDIDATE_REVIEW_REQUIRED" }, 409);
  const review = pack.candidateReviews[0];
  if (pack.status !== "analyzed" || review.revisionVersion !== pack.revisions[0].version) return json({ error: "The acknowledgement belongs to an older version.", code: "CANDIDATE_REVIEW_STALE" }, 409);
  if (review.candidateResponse === "declined") return json({ error: "A candidate decline cannot be overridden.", code: "CANDIDATE_DECLINED" }, 409);
  if (review.suggestions.length || review.candidateResponse === "corrections_requested") return json({ error: "Resolve candidate corrections before approval.", code: "CANDIDATE_CORRECTIONS_PENDING" }, 409);
  if (review.candidateResponse === "confirmed") return json({ error: "The candidate already confirmed this version.", code: "ALREADY_CONFIRMED" }, 409);
  try { assertClaimsReadyForApproval(pack.claimVerificationData, false); } catch (error) {
    if (error instanceof AgencyClaimGateError) return json({ error: error.message, code: error.code }, 409);
    throw error;
  }
  const now = new Date();
  const event = await prisma.$transaction(async (tx) => {
    const saved = await tx.agencyCandidateReviewEvent.create({ data: { reviewId: review.id, type: "override_recorded", actorType: "recruiter", actorUserId: user.id, metadata: { reason: payload.data.reason } } });
    await tx.agencyCandidateReview.update({ where: { id: review.id }, data: { status: "overridden", overrideReason: payload.data.reason, overriddenAt: now, overriddenById: user.id, tokenHash: null } });
    await tx.agencyCandidateReviewSession.updateMany({ where: { reviewId: review.id, revokedAt: null }, data: { revokedAt: now } });
    return saved;
  });
  return json({ success: true, reviewId: review.id, eventId: event.id });
}
