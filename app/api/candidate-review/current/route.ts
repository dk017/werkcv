import { NextRequest, NextResponse } from "next/server";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { hashCandidateReviewSecret } from "@/lib/agency-candidate-review";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function response(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Content-Type-Options": "nosniff" } });
}

export async function GET(request: NextRequest) {
  if (!candidateAcknowledgementEnabled()) return response({ error: "This review is unavailable.", code: "REVIEW_UNAVAILABLE" }, 404);
  const secret = request.cookies.get("wk_candidate_review")?.value;
  if (!secret) return response({ error: "This review is unavailable.", code: "REVIEW_UNAVAILABLE" }, 401);
  const now = new Date();
  const session = await prisma.agencyCandidateReviewSession.findUnique({
    where: { secretHash: hashCandidateReviewSecret(secret) },
    include: { review: { select: { id: true, snapshotData: true, snapshotDigest: true, status: true, candidateResponse: true, respondedAt: true, retentionExpiresAt: true } } },
  });
  if (!session || session.revokedAt || session.expiresAt <= now || session.review.status === "revoked" || session.review.status === "stale") {
    return response({ error: "This review is unavailable.", code: "REVIEW_UNAVAILABLE" }, 401);
  }
  return response({ success: true, review: session.review });
}
