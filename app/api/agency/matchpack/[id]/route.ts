import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import {
  anonymizeCvData,
  createDefaultMatchPackSubmission,
  matchPackDraftUpdateSchema,
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

async function getAgencyUser(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };

  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") {
    return {
      response: json({
        error: "An active Agency Plan is required for MatchPack.",
        code: access.state === "pending" || access.state === "needs_sync"
          ? "AGENCY_PLAN_PENDING"
          : "AGENCY_PLAN_REQUIRED",
      }, 409),
    };
  }

  return { user, access };
}

function getId(params: Promise<{ id: string }>): Promise<string> {
  return params.then(({ id }) => id.trim().slice(0, 120));
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const result = await getAgencyUser(request);
  if ("response" in result) return result.response;

  const id = await getId(context.params);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: result.user.id },
    select: {
      id: true,
      title: true,
      vacancyTitle: true,
      vacancyText: true,
      locale: true,
      sourceFileType: true,
      candidateData: true,
      anonymizedData: true,
      analysis: true,
      submissionData: true,
      templateId: true,
      colorThemeId: true,
      status: true,
      cvDocumentId: true,
      approvedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);

  try {
    parseStoredMatchPackData(pack.candidateData);
    parseStoredMatchPackData(pack.anonymizedData);
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    const candidateData = parseStoredMatchPackData(pack.candidateData);
    const submissionData = pack.submissionData
      ? parseStoredMatchPackSubmission(pack.submissionData)
      : createDefaultMatchPackSubmission(
        candidateData,
        analysis.result,
        pack.vacancyTitle || "",
        pack.locale === "en" ? "en" : "nl",
      );
    return json({ success: true, pack: { ...pack, submissionData } });
  } catch {
    return json({ error: "This MatchPack is invalid and cannot be opened.", code: "INVALID_PACK" }, 500);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOriginWhenProvided(request)) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const result = await getAgencyUser(request);
  if ("response" in result) return result.response;

  const rateLimit = checkRateLimit(`${result.user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-update",
    maxRequests: 40,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return json({ error: "Too many updates.", code: "RATE_LIMITED" }, 429);

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > 2 * 1024 * 1024) {
    return json({ error: "The draft is too large.", code: "REQUEST_TOO_LARGE" }, 413);
  }

  const id = await getId(context.params);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: result.user.id },
    select: { id: true, status: true, locale: true },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "analyzed") {
    return json({ error: "Approved submissions are locked.", code: "PACK_LOCKED" }, 409);
  }

  const payload = matchPackDraftUpdateSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) {
    return json({
      error: "Check the candidate introduction, email and CV corrections.",
      code: "INVALID_DRAFT",
      fieldErrors: payload.error.flatten().fieldErrors,
    }, 400);
  }

  const anonymized = anonymizeCvData(payload.data.candidateData, pack.locale === "en" ? "en" : "nl");
  const updateResult = await prisma.agencyMatchPack.updateMany({
    where: { id: pack.id, userId: result.user.id, status: "analyzed" },
    data: {
      candidateData: payload.data.candidateData as unknown as Prisma.InputJsonValue,
      anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue,
      submissionData: payload.data.submissionData as unknown as Prisma.InputJsonValue,
    },
  });
  if (updateResult.count !== 1) {
    return json({ error: "This submission was approved while you were editing it. Reload the page.", code: "PACK_LOCKED" }, 409);
  }
  const updated = await prisma.agencyMatchPack.findUniqueOrThrow({
    where: { id: pack.id },
    select: {
      id: true,
      candidateData: true,
      anonymizedData: true,
      submissionData: true,
      updatedAt: true,
    },
  });

  return json({ success: true, pack: updated });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isSameOriginWhenProvided(request)) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-delete",
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return json({ error: "Too many requests.", code: "RATE_LIMITED" }, 429);

  const id = await getId(context.params);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: user.id },
    select: { id: true, cvDocumentId: true },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.cvDocumentId) {
    return json({
      error: "Approved MatchPacks are locked because their CV is part of the agency record.",
      code: "APPROVED_PACK_LOCKED",
    }, 409);
  }

  await prisma.agencyMatchPack.delete({ where: { id: pack.id } });
  return json({ success: true });
}
