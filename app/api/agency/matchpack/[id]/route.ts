import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import {
  canEditAgencyDraft,
  canDeleteAgencyDraft,
  canDeleteApprovedAgencyWork,
  getAgencyAccessForUser,
} from "@/lib/agency-access";
import {
  anonymizeCvData,
  createDefaultMatchPackSubmission,
  matchPackDraftUpdateSchema,
  parseStoredMatchPackAnalysis,
  parseStoredMatchPackData,
  parseStoredMatchPackSubmission,
} from "@/lib/agency-matchpack";
import { applyEvidenceReviews, MatchPackReviewError } from "@/lib/agency-matchpack-review";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { calculateNewPackRetentionExpiry, deleteAgencyMatchPackContent } from "@/lib/agency-retention";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
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
    where: { id, userId: result.access.ownerUserId || result.user.id },
    select: {
      id: true,
      title: true,
      vacancyTitle: true,
      vacancyText: true,
      locale: true,
      sourceFileType: true,
      sourceTextDigest: true,
      originalCandidateData: true,
      candidateData: true,
      anonymizedData: true,
      analysis: true,
      claimVerificationData: true,
      submissionData: true,
      clientOutcome: true,
      productFeedbackData: true,
      templateId: true,
      colorThemeId: true,
      status: true,
      cvDocumentId: true,
      approvedAt: true,
      retentionExpiresAt: true,
      createdAt: true,
      updatedAt: true,
      revisions: {
        select: {
          id: true,
          version: true,
          reason: true,
          changedFields: true,
          createdById: true,
          createdAt: true,
        },
        orderBy: { version: "desc" },
      },
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
    return json({
      success: true,
      pack: {
        ...pack,
        originalCandidateData: pack.originalCandidateData || pack.candidateData,
        submissionData,
        outcomeData: {
          status: pack.clientOutcome,
          note: pack.productFeedbackData && typeof pack.productFeedbackData === "object" && !Array.isArray(pack.productFeedbackData)
            ? String((pack.productFeedbackData as Record<string, unknown>).note || "")
            : "",
          issueCategory: pack.productFeedbackData && typeof pack.productFeedbackData === "object" && !Array.isArray(pack.productFeedbackData)
            ? String(((pack.productFeedbackData as Record<string, unknown>).issueCategories as string[] | undefined)?.[0] || "other")
            : "other",
          sendability: pack.productFeedbackData && typeof pack.productFeedbackData === "object" && !Array.isArray(pack.productFeedbackData)
            ? String((pack.productFeedbackData as Record<string, unknown>).sendability || "sent")
            : "sent",
        },
      },
    });
  } catch {
    return json({ error: "This MatchPack is invalid and cannot be opened.", code: "INVALID_PACK" }, 500);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const result = await getAgencyUser(request);
  if ("response" in result) return result.response;
  if (!canEditAgencyDraft(result.access)) return json({ error: "Your agency role is read-only.", code: "ROLE_READ_ONLY" }, 403);
  if (!result.access.subscription?.retentionPolicySetAt) {
    return json({ error: "Choose and confirm the Agency retention period before saving.", code: "RETENTION_POLICY_REQUIRED" }, 409);
  }

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
    where: { id, userId: result.access.ownerUserId || result.user.id },
    select: {
      id: true,
      status: true,
      locale: true,
      candidateData: true,
      submissionData: true,
      analysis: true,
      claimVerificationData: true,
      sourceText: true,
      sourceMap: true,
    },
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

  const existingCandidate = parseStoredMatchPackData(pack.candidateData);
  const existingSubmission = pack.submissionData
    ? parseStoredMatchPackSubmission(pack.submissionData)
    : createDefaultMatchPackSubmission(
      existingCandidate,
      parseStoredMatchPackAnalysis(pack.analysis).result,
      "",
      pack.locale === "en" ? "en" : "nl",
    );
  const existingAnalysis = parseStoredMatchPackAnalysis(pack.analysis);
  if (!pack.sourceText || !pack.sourceMap) {
    return json({
      error: "This older MatchPack has no verifiable source record. Create a new MatchPack from the original CV.",
      code: "EVIDENCE_UNRESOLVED",
    }, 409);
  }
  let updatedAnalysis;
  try {
    updatedAnalysis = applyEvidenceReviews(
      existingAnalysis,
      payload.data.evidenceReviews,
      result.user.id,
      pack.sourceText,
      pack.sourceMap,
    );
  } catch (error) {
    if (error instanceof MatchPackReviewError) {
      return json({ error: error.message, code: error.code }, 409);
    }
    throw error;
  }
  const anonymized = anonymizeCvData(payload.data.candidateData, pack.locale === "en" ? "en" : "nl");
  const changedFields = [
    JSON.stringify(existingCandidate) !== JSON.stringify(payload.data.candidateData) ? "candidateData" : null,
    JSON.stringify(existingSubmission) !== JSON.stringify(payload.data.submissionData) ? "submissionData" : null,
    JSON.stringify(existingAnalysis) !== JSON.stringify(updatedAnalysis) ? "analysis" : null,
  ].filter((field): field is string => Boolean(field));
  const clientVisibleChanged = changedFields.includes("candidateData") || changedFields.includes("submissionData");

  const updated = await prisma.$transaction(async (tx) => {
    const savedAt = new Date();
    const updateResult = await tx.agencyMatchPack.updateMany({
      where: { id: pack.id, userId: result.access.ownerUserId || result.user.id, status: "analyzed" },
      data: {
        candidateData: payload.data.candidateData as unknown as Prisma.InputJsonValue,
        anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue,
        submissionData: payload.data.submissionData as unknown as Prisma.InputJsonValue,
        analysis: updatedAnalysis as unknown as Prisma.InputJsonValue,
        ...(clientVisibleChanged ? { claimVerificationData: Prisma.DbNull } : {}),
        updatedAt: savedAt,
        retentionExpiresAt: calculateNewPackRetentionExpiry(result.access.subscription!.retentionDays, savedAt),
      },
    });
    if (updateResult.count !== 1) {
      throw new Error("PACK_LOCKED");
    }

    const latestRevision = await tx.agencyMatchPackRevision.findFirst({
      where: { matchPackId: pack.id },
      orderBy: { version: "desc" },
      select: { version: true },
    });
    await tx.agencyMatchPackRevision.create({
      data: {
        matchPackId: pack.id,
        version: (latestRevision?.version || 0) + 1,
        reason: "draft_saved",
        candidateData: payload.data.candidateData as unknown as Prisma.InputJsonValue,
        submissionData: payload.data.submissionData as unknown as Prisma.InputJsonValue,
        analysis: updatedAnalysis as unknown as Prisma.InputJsonValue,
        claimVerificationData: clientVisibleChanged
          ? Prisma.DbNull
          : pack.claimVerificationData as Prisma.InputJsonValue,
        changedFields: changedFields.length ? changedFields : ["review"],
        createdById: result.user.id,
      },
    });

    if (clientVisibleChanged) {
      await tx.agencyCandidateReview.updateMany({
        where: { matchPackId: pack.id, status: { notIn: ["revoked", "stale"] } },
        data: { status: "stale", revokedAt: savedAt, tokenHash: null },
      });
    }

    return tx.agencyMatchPack.findUniqueOrThrow({
      where: { id: pack.id },
      select: {
        id: true,
        candidateData: true,
        anonymizedData: true,
        analysis: true,
        claimVerificationData: true,
        submissionData: true,
        updatedAt: true,
        revisions: {
          select: {
            id: true,
            version: true,
            reason: true,
            changedFields: true,
            createdById: true,
            createdAt: true,
          },
          orderBy: { version: "desc" },
        },
      },
    });
  }).catch((error) => {
    if (error instanceof Error && error.message === "PACK_LOCKED") return null;
    throw error;
  });

  if (!updated) {
    return json({ error: "This submission was approved while you were editing it. Reload the page.", code: "PACK_LOCKED" }, 409);
  }

  return json({ success: true, pack: updated });
}

export async function DELETE(
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
  if (!access.subscription || !access.ownerUserId) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-delete",
    maxRequests: 20,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return json({ error: "Too many requests.", code: "RATE_LIMITED" }, 429);

  const id = await getId(context.params);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: access.ownerUserId || user.id },
    select: { id: true, status: true, updatedAt: true, retentionExpiresAt: true },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);

  const isApproved = pack.status === "approved";
  if (isApproved && !canDeleteApprovedAgencyWork(access)) {
    return json({ error: "Only the agency owner can delete an approved MatchPack.", code: "ROLE_FORBIDDEN" }, 403);
  }
  if (!isApproved && !canDeleteAgencyDraft(access)) {
    return json({ error: "Your agency role cannot delete this draft.", code: "ROLE_FORBIDDEN" }, 403);
  }

  const body = await request.json().catch(() => null) as { confirmation?: string } | null;
  if (isApproved && body?.confirmation !== "DELETE MATCHPACK") {
    return json({ error: "Type DELETE MATCHPACK to confirm deleting the approved proposal and linked CV.", code: "CONFIRMATION_REQUIRED" }, 400);
  }

  const result = await deleteAgencyMatchPackContent({
    matchPackId: pack.id,
    ownerUserId: access.ownerUserId,
    subscriptionId: access.subscription.id,
    actorUserId: user.id,
    reason: isApproved ? "approved_matchpack_deletion" : "draft_matchpack_deletion",
    expectedUpdatedAt: pack.updatedAt,
    expectedRetentionExpiresAt: pack.retentionExpiresAt,
  });
  if (!result) return json({ error: "This MatchPack changed while it was being deleted. Reload and try again.", code: "PACK_LOCKED" }, 409);
  return json({ success: true, receipt: result });
}
