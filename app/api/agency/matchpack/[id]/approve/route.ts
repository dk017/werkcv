import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import {
  AgencyAccessError,
  approveAgencyMatchPackForUser,
  canApproveAgencyWork,
  getAgencyAccessForUser,
  isAgencyAccessError,
} from "@/lib/agency-access";
import { matchPackApprovalRequestSchema, MatchPackReviewError } from "@/lib/agency-matchpack-review";
import { MatchPackOutputError } from "@/lib/agency-output-projection";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function accessErrorResponse(error: AgencyAccessError) {
  const messages: Record<string, string> = {
    AGENCY_QUOTA_REACHED: "The shared 50-slot allowance has been reached.",
    AGENCY_PERIOD_UNAVAILABLE: "The current billing period is not ready yet.",
    AGENCY_SUBSCRIPTION_INACTIVE: "An active Agency Plan is required to approve this MatchPack.",
    RETENTION_POLICY_REQUIRED: "Choose and confirm the Agency retention period before approving this MatchPack.",
  };
  return json({ error: messages[error.code] || "The agency plan could not approve this MatchPack.", code: error.code }, 409);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return json({ error: "An active Agency Plan is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canApproveAgencyWork(access)) return json({ error: "Your agency role cannot approve proposals.", code: "ROLE_FORBIDDEN" }, 403);

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-approve",
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return json({ error: "Too many requests.", code: "RATE_LIMITED" }, 429);

  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const payload = matchPackApprovalRequestSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return json({
      error: "Complete all approval confirmations and reload if this draft has changed.",
      code: "APPROVAL_CONFIRMATION_REQUIRED",
    }, 400);
  }

  try {
    const result = await approveAgencyMatchPackForUser({
      userId: access.ownerUserId || user.id,
      matchPackId: id,
      approvedById: user.id,
      expectedUpdatedAt: new Date(payload.data.expectedUpdatedAt),
      expectedRevisionVersion: payload.data.expectedRevisionVersion,
      selectedVariant: payload.data.selectedVariant,
      confirmations: payload.data.confirmations,
    });
    const updatedAccess = await getAgencyAccessForUser(user.id);

    return json({
      success: true,
      cvId: result.cv.id,
      reused: result.reused,
      retentionExpiresAt: result.retentionExpiresAt,
      quota: {
        used: updatedAccess.used,
        allowance: updatedAccess.period?.allowance || 50,
        remaining: updatedAccess.remaining,
      },
    });
  } catch (error) {
    if (isAgencyAccessError(error)) return accessErrorResponse(error);
    if (error instanceof MatchPackReviewError) return json({ error: error.message, code: error.code }, 409);
    if (error instanceof MatchPackOutputError) return json({ error: error.message, code: error.code }, 409);
    if (error instanceof Error && error.message === "MATCH_PACK_NOT_FOUND") {
      return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
    }
    if (error instanceof Error && error.message === "MATCH_PACK_ALREADY_APPROVED") {
      return json({ error: "This MatchPack was already approved.", code: "PACK_LOCKED" }, 409);
    }
    if (error instanceof Error && error.message === "PACK_STALE") {
      return json({ error: "This MatchPack changed. Reload it before approving.", code: "PACK_STALE" }, 409);
    }
    if (error instanceof Error && error.message === "EVIDENCE_UNRESOLVED") {
      return json({ error: "The saved source cannot be verified. Review the source evidence again.", code: "EVIDENCE_UNRESOLVED" }, 409);
    }
    console.error("agency_matchpack_approval_failed", {
      userId: user.id,
      packId: id,
      code: error instanceof Error ? error.name : "unknown",
    });
    return json({ error: "The MatchPack could not be approved.", code: "APPROVAL_FAILED" }, 500);
  }
}
