import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import {
  AgencyAccessError,
  approveAgencyMatchPackForUser,
  getAgencyAccessForUser,
  isAgencyAccessError,
} from "@/lib/agency-access";
import {
  createDefaultMatchPackSubmission,
  parseStoredMatchPackAnalysis,
  parseStoredMatchPackData,
  parseStoredMatchPackSubmission,
} from "@/lib/agency-matchpack";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isSameOriginWhenProvided(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return false;
  const referer = request.headers.get("referer");
  if (!referer) return true;
  try {
    return new URL(referer).origin === request.nextUrl.origin;
  } catch {
    return false;
  }
}

function accessErrorResponse(error: AgencyAccessError) {
  const messages: Record<string, string> = {
    AGENCY_QUOTA_REACHED: "The 50-CV monthly limit has been reached.",
    AGENCY_PERIOD_UNAVAILABLE: "The current billing period is not ready yet.",
    AGENCY_SUBSCRIPTION_INACTIVE: "An active Agency Plan is required to approve this MatchPack.",
  };
  return json({ error: messages[error.code] || "The agency plan could not approve this MatchPack.", code: error.code }, 409);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOriginWhenProvided(request)) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-approve",
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return json({ error: "Too many requests.", code: "RATE_LIMITED" }, 429);

  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: user.id },
    select: {
      id: true,
      title: true,
      candidateData: true,
      submissionData: true,
      analysis: true,
      vacancyTitle: true,
      locale: true,
      templateId: true,
      colorThemeId: true,
      status: true,
      cvDocumentId: true,
    },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status === "approved" && pack.cvDocumentId) {
    return json({ success: true, cvId: pack.cvDocumentId, reused: true });
  }
  if (pack.status !== "analyzed") {
    return json({ error: "This MatchPack cannot be approved again.", code: "PACK_LOCKED" }, 409);
  }

  let data;
  try {
    data = parseStoredMatchPackData(pack.candidateData);
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    if (pack.submissionData) {
      parseStoredMatchPackSubmission(pack.submissionData);
    } else {
      createDefaultMatchPackSubmission(
        data,
        analysis.result,
        pack.vacancyTitle || "",
        pack.locale === "en" ? "en" : "nl",
      );
    }
  } catch {
    return json({ error: "This MatchPack has invalid submission data.", code: "INVALID_PACK" }, 500);
  }

  try {
    const result = await approveAgencyMatchPackForUser({
      userId: user.id,
      matchPackId: pack.id,
    });
    const access = await getAgencyAccessForUser(user.id);

    return json({
      success: true,
      cvId: result.cv.id,
      reused: result.reused,
      quota: {
        used: access.used,
        allowance: access.period?.allowance || 50,
        remaining: access.remaining,
      },
    });
  } catch (error) {
    if (isAgencyAccessError(error)) return accessErrorResponse(error);
    if (error instanceof Error && error.message === "MATCH_PACK_NOT_FOUND") {
      return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
    }
    if (error instanceof Error && error.message === "MATCH_PACK_ALREADY_APPROVED") {
      return json({ error: "This MatchPack was already approved.", code: "PACK_LOCKED" }, 409);
    }
    console.error("agency_matchpack_approval_failed", {
      userId: user.id,
      packId: pack.id,
      code: error instanceof Error ? error.name : "unknown",
    });
    return json({ error: "The MatchPack could not be approved.", code: "APPROVAL_FAILED" }, 500);
  }
}
