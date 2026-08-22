import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { CANDIDATE_REVIEW_SESSION_TTL_MS, candidateReviewSecretMatches, generateCandidateReviewSecret, hashCandidateReviewSecret, pseudonymousNetworkKey } from "@/lib/agency-candidate-review";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";
const bodySchema = z.object({ token: z.string().min(40).max(160) });

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" } });
}

export async function POST(request: NextRequest) {
  if (!candidateAcknowledgementEnabled()) return response({ error: "This invitation is unavailable.", code: "INVITATION_UNAVAILABLE" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return response({ error: "This invitation is unavailable.", code: "INVITATION_UNAVAILABLE" }, 404);
  const networkKey = pseudonymousNetworkKey(getClientIp(request));
  const rate = checkRateLimit(networkKey, { bucket: "candidate-review-exchange", maxRequests: 12, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return response({ error: "Try again later.", code: "INVITATION_UNAVAILABLE" }, 429);
  const payload = bodySchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return response({ error: "This invitation is unavailable.", code: "INVITATION_UNAVAILABLE" }, 404);
  const tokenHash = hashCandidateReviewSecret(payload.data.token);
  const sessionSecret = generateCandidateReviewSecret();
  const sessionHash = hashCandidateReviewSecret(sessionSecret);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CANDIDATE_REVIEW_SESSION_TTL_MS);

  const exchanged = await prisma.$transaction(async (tx) => {
    const review = await tx.agencyCandidateReview.findUnique({ where: { tokenHash } });
    if (!review || !review.tokenHash || !candidateReviewSecretMatches(payload.data.token, review.tokenHash)
      || review.tokenConsumedAt || review.revokedAt || !review.tokenExpiresAt || review.tokenExpiresAt <= now
      || !["invited", "sent"].includes(review.status)) return null;
    const consumed = await tx.agencyCandidateReview.updateMany({
      where: { id: review.id, tokenHash, tokenConsumedAt: null, revokedAt: null, tokenExpiresAt: { gt: now } },
      data: { tokenHash: null, tokenConsumedAt: now, openedAt: now, status: "opened" },
    });
    if (consumed.count !== 1) return null;
    await tx.agencyCandidateReviewSession.create({ data: { reviewId: review.id, secretHash: sessionHash, expiresAt } });
    await tx.agencyCandidateReviewEvent.create({ data: { reviewId: review.id, type: "token_exchanged", actorType: "candidate" } });
    return review.id;
  }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
  if (!exchanged) return response({ error: "This invitation is unavailable or has expired.", code: "INVITATION_UNAVAILABLE" }, 404);
  const result = response({ success: true });
  result.cookies.set("wk_candidate_review", sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.floor(CANDIDATE_REVIEW_SESSION_TTL_MS / 1000),
  });
  return result;
}
