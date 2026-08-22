import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { candidateReviewCorrectionTargets, candidateReviewResponseSchema, hashCandidateReviewSecret, pseudonymousNetworkKey, type CandidateReviewSnapshotV1 } from "@/lib/agency-candidate-review";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";
function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" } });
}

export async function POST(request: NextRequest) {
  if (!candidateAcknowledgementEnabled()) return response({ error: "This review is unavailable.", code: "REVIEW_UNAVAILABLE" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return response({ error: "This review is unavailable.", code: "REVIEW_UNAVAILABLE" }, 404);
  const rate = checkRateLimit(pseudonymousNetworkKey(getClientIp(request)), { bucket: "candidate-review-response", maxRequests: 12, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return response({ error: "Try again later.", code: "RATE_LIMITED" }, 429);
  const secret = request.cookies.get("wk_candidate_review")?.value;
  const payload = candidateReviewResponseSchema.safeParse(await request.json().catch(() => null));
  if (!secret || !payload.success) return response({ error: "Check your response.", code: "INVALID_RESPONSE" }, 400);
  const sessionHash = hashCandidateReviewSecret(secret);
  const now = new Date();
  const result = await prisma.$transaction(async (tx) => {
    const session = await tx.agencyCandidateReviewSession.findUnique({ where: { secretHash: sessionHash }, include: { review: true } });
    if (!session || session.revokedAt || session.expiresAt <= now || session.review.respondedAt || session.review.revokedAt || session.review.status === "stale") return null;
    const targets = candidateReviewCorrectionTargets(session.review.snapshotData as CandidateReviewSnapshotV1);
    for (const suggestion of payload.data.suggestions) {
      const target = targets.get(suggestion.targetPath);
      if (!target || target.targetType !== suggestion.targetType || target.originalValue !== suggestion.originalValue) return null;
    }
    await tx.agencyCandidateReview.update({ where: { id: session.review.id }, data: { status: payload.data.response, candidateResponse: payload.data.response, respondedAt: now } });
    if (payload.data.suggestions.length) {
      await tx.agencyCandidateReviewSuggestion.createMany({ data: payload.data.suggestions.map((suggestion) => ({ reviewId: session.review.id, ...suggestion })) });
    }
    await tx.agencyCandidateReviewEvent.create({ data: { reviewId: session.review.id, type: payload.data.response, actorType: "candidate", metadata: { suggestionCount: payload.data.suggestions.length } as Prisma.InputJsonValue } });
    await tx.agencyCandidateReviewSession.update({ where: { id: session.id }, data: { revokedAt: now } });
    return { response: payload.data.response };
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  if (!result) return response({ error: "This review is unavailable or already completed.", code: "REVIEW_UNAVAILABLE" }, 409);
  const res = response({ success: true, ...result });
  res.cookies.set("wk_candidate_review", "", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
