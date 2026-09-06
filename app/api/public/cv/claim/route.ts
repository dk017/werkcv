import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { cvSchema, type CVData } from "@/lib/cv";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canCreateAgencyWork, getAgencyAccessForUser, isAgencyAccessError } from "@/lib/agency-access";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";
import { normalizeStartSource } from "@/lib/start-source";
import { getClientIp, checkRateLimit } from "@/lib/tools/rate-limit";
import { prisma } from "@/lib/prisma";
import { isPublicDraftId } from "@/lib/public-cv-draft";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { getCompletionState } from "@/lib/cv-completion";
import { createMatchPackCvDocument, createPersonalCvDocument } from "@/lib/workspace/cv-document-service";
import { saveCvDocumentWithMeaningfulState } from "@/lib/cv-meaningful-persistence";
import { getMeaningfulCvState } from "@/lib/cv-meaningful";
import { getPublicCvClaimKey } from "@/lib/public-cv-claim";
import { AGENCY_MONTHLY_CREDIT_LIMIT } from "@/lib/agency-plan";
import { getAgencyCreditErrorPayload } from "@/lib/agency-credit-errors";

export const runtime = "nodejs";

const MAX_REQUEST_CHARS = 1_200_000;

type PublicClaimFlow = "consumer" | "agency";

function responseBody(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function parseFlow(value: unknown): PublicClaimFlow | null {
  return value === "agency" || value === "consumer" ? value : null;
}

function getSafeTemplateAndTheme(templateIdInput: unknown, colorThemeIdInput: unknown) {
  const requestedTemplateId = typeof templateIdInput === "string" ? templateIdInput : "professional";
  const template = getTemplateConfig(requestedTemplateId);
  const templateId = template.id;
  const requestedThemeId = typeof colorThemeIdInput === "string" ? colorThemeIdInput : "";
  const colorThemeId = template.colorThemes.some((theme) => theme.id === requestedThemeId)
    ? requestedThemeId
    : getDefaultThemeId(templateId);

  return { templateId, colorThemeId };
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return responseBody({ error: "Invalid request origin." }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return responseBody({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  }

  const clientIp = getClientIp(request).slice(0, 120);
  const rateLimit = checkRateLimit(`${user.id}:${clientIp}`, {
    bucket: "public-cv-claim",
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return responseBody({ error: "Too many attempts. Please try again later.", code: "RATE_LIMITED" }, 429);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_CHARS) {
    return responseBody({ error: "Draft is too large.", code: "DRAFT_TOO_LARGE" }, 413);
  }

  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_REQUEST_CHARS) {
      return responseBody({ error: "Draft is too large.", code: "DRAFT_TOO_LARGE" }, 413);
    }

    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody) as Record<string, unknown>;
    } catch {
      return responseBody({ error: "Invalid draft request.", code: "INVALID_DRAFT" }, 400);
    }
    const draftId = body.draftId;
    const flow = parseFlow(body.flow);
    const uiLanguage = body.uiLanguage === "en" ? "en" : body.uiLanguage === "nl" ? "nl" : null;

    if (!isPublicDraftId(draftId) || !flow || !uiLanguage) {
      return responseBody({ error: "Invalid draft request.", code: "INVALID_DRAFT" }, 400);
    }

    const parsedData = cvSchema.safeParse(body.data);
    if (!parsedData.success) {
      return responseBody({ error: "The draft data is invalid.", code: "INVALID_DRAFT" }, 400);
    }
    const completion = getCompletionState(parsedData.data as CVData, uiLanguage);

    const source = typeof body.source === "string" ? body.source.slice(0, 160) : "public_editor";
    const startSource = normalizeStartSource(`public:${flow}:${draftId}`);
    let agencySubscriptionId: string | null = null;
    let agencyOwnerUserId: string | null = null;
    let agencyAccess: Awaited<ReturnType<typeof getAgencyAccessForUser>> | null = null;
    if (flow === "agency") {
      const access = await getAgencyAccessForUser(user.id);
      agencyAccess = access;
      if (access.state !== "active") {
        return responseBody({
          error: "An active Agency billing tier is required before creating a client CV.",
          code: access.state === "pending" || access.state === "needs_sync" ? "AGENCY_PLAN_PENDING" : "AGENCY_PLAN_REQUIRED",
        }, 409);
      }
      if (!canCreateAgencyWork(access)) {
        return responseBody({ error: "Your agency role cannot create new CVs.", code: "ROLE_READ_ONLY" }, 403);
      }
      agencySubscriptionId = access.subscription?.id || null;
      agencyOwnerUserId = access.ownerUserId || user.id;
    }

    const ownerUserId = flow === "agency" ? agencyOwnerUserId || user.id : user.id;
    const claimKey = getPublicCvClaimKey(ownerUserId, flow === "agency" ? agencySubscriptionId : null, draftId);
    const existing = await prisma.cVDocument.findUnique({
      where: { publicClaimKey: claimKey },
      select: { id: true },
    });

    if (existing) {
      const repaired = await saveCvDocumentWithMeaningfulState({
        id: existing.id,
        where: flow === "agency"
          ? { id: existing.id, userId: ownerUserId, agencySubscriptionId }
          : { id: existing.id, userId: ownerUserId, agencySubscriptionId: null },
        data: parsedData.data as CVData,
        source: "public_claim",
        uiLanguage,
      });
      if (!repaired.success) {
        return responseBody({ error: "We could not save this draft. Please try again.", code: "CLAIM_FAILED" }, 500);
      }
      return responseBody({
        success: true,
        cvId: existing.id,
        reused: true,
        completionScore: completion.score,
        isReady: completion.isReady,
      });
    }

    if (flow === "agency" && agencyAccess && !agencyAccess.canCreate) {
      const credit = getAgencyCreditErrorPayload({
        used: agencyAccess.used,
        limit: agencyAccess.period?.allowance ?? AGENCY_MONTHLY_CREDIT_LIMIT,
        requested: 1,
      }, uiLanguage);
      return responseBody({
        ...(credit || { error: "The Agency credit allowance has been reached." }),
        code: "AGENCY_QUOTA_REACHED",
      }, 409);
    }

    const { templateId, colorThemeId } = getSafeTemplateAndTheme(body.templateId, body.colorThemeId);
    const data = parsedData.data as CVData;
    const meaningfulState = getMeaningfulCvState(data);
    const title = data.personal.name.trim()
      ? `${data.personal.name.trim()} CV`
      : uiLanguage === "en" ? "My CV" : "Mijn CV";

    const documentInput = {
      title,
      data,
      templateId,
      colorThemeId,
      attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
      sourceCluster: "public-editor",
      sourceLocale: uiLanguage,
      startSource,
      publicClaimKey: claimKey,
      hasMeaningfulContent: meaningfulState.isMeaningful,
      meaningfulContentAt: meaningfulState.isMeaningful ? new Date() : null,
      meaningfulContentSignals: meaningfulState.isMeaningful
        ? meaningfulState.signals as Prisma.InputJsonValue
        : undefined,
    } as Omit<Prisma.CVDocumentUncheckedCreateInput, "userId" | "agencySubscriptionId">;
    let cv: { id: string };
    let reused = false;
    try {
      cv = flow === "agency"
        ? await createMatchPackCvDocument(user.id, documentInput)
        : await createPersonalCvDocument(user.id, documentInput);
    } catch (error) {
      if (!(error instanceof Prisma.PrismaClientKnownRequestError) || error.code !== "P2002") throw error;
      const concurrent = await prisma.cVDocument.findUnique({
        where: { publicClaimKey: claimKey },
        select: { id: true },
      });
      if (!concurrent) throw error;
      cv = concurrent;
      reused = true;
    }

    // A claimed public draft is the one anonymous/public entry path that can
    // arrive with substantive data before the editor performs its first save.
    // Route it through the same durable first-transition service so the
    // server, rather than browser storage, owns meaningful-completion state.
    await saveCvDocumentWithMeaningfulState({
      id: cv.id,
      where: flow === "agency"
        ? {
          id: cv.id,
          userId: agencyOwnerUserId || user.id,
          agencySubscriptionId,
        }
        : { id: cv.id, userId: user.id, agencySubscriptionId: null },
      data,
      source: "public_claim",
      uiLanguage,
    });

    return responseBody({
      success: true,
      cvId: cv.id,
      reused,
      source,
      completionScore: completion.score,
      isReady: completion.isReady,
    });
  } catch (error) {
    if (isAgencyAccessError(error)) {
      return responseBody({ error: "The Agency billing tier could not create this CV.", code: error.code }, 409);
    }

    console.error("public_cv_claim_failed", {
      userId: user.id,
      code: error instanceof Error ? error.name : "unknown",
    });
    return responseBody({ error: "We could not save this draft. Please try again.", code: "CLAIM_FAILED" }, 500);
  }
}
