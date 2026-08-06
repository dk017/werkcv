import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { cvSchema, type CVData } from "@/lib/cv";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { createCvDocumentForUser, getAgencyAccessForUser, isAgencyAccessError } from "@/lib/agency-access";
import { getDefaultThemeId, getTemplateConfig } from "@/lib/templates/registry";
import { normalizeStartSource } from "@/lib/start-source";
import { getClientIp, checkRateLimit } from "@/lib/tools/rate-limit";
import { prisma } from "@/lib/prisma";
import { isPublicDraftId } from "@/lib/public-cv-draft";

export const runtime = "nodejs";

const MAX_REQUEST_CHARS = 1_200_000;

type PublicClaimFlow = "consumer" | "agency";

function responseBody(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isSameOriginWhenProvided(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) return false;

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      if (new URL(referer).origin !== request.nextUrl.origin) return false;
    } catch {
      return false;
    }
  }

  return true;
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
  if (!isSameOriginWhenProvided(request)) {
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

    const source = typeof body.source === "string" ? body.source.slice(0, 160) : "public_editor";
    const startSource = normalizeStartSource(`public:${flow}:${draftId}`);
    const existing = await prisma.cVDocument.findFirst({
      where: {
        userId: user.id,
        startSource,
      },
      select: { id: true },
    });

    if (existing) {
      return responseBody({ success: true, cvId: existing.id, reused: true });
    }

    if (flow === "agency") {
      const access = await getAgencyAccessForUser(user.id);
      if (access.state !== "active") {
        return responseBody({
          error: "An active Agency Plan is required before creating a client CV.",
          code: access.state === "pending" || access.state === "needs_sync" ? "AGENCY_PLAN_PENDING" : "AGENCY_PLAN_REQUIRED",
        }, 409);
      }
      if (!access.canCreate) {
        return responseBody({
          error: "The Agency Plan has reached its monthly CV limit.",
          code: "AGENCY_QUOTA_REACHED",
        }, 409);
      }
    }

    const { templateId, colorThemeId } = getSafeTemplateAndTheme(body.templateId, body.colorThemeId);
    const data = parsedData.data as CVData;
    const title = data.personal.name.trim()
      ? `${data.personal.name.trim()} CV`
      : uiLanguage === "en" ? "My CV" : "Mijn CV";

    const cv = await createCvDocumentForUser({
      title,
      data,
      templateId,
      colorThemeId,
      userId: user.id,
      attribution: (user.attribution || undefined) as Prisma.InputJsonValue | undefined,
      sourceCluster: "public-editor",
      sourceLocale: uiLanguage,
      startSource,
    });

    return responseBody({ success: true, cvId: cv.id, reused: false, source });
  } catch (error) {
    if (isAgencyAccessError(error)) {
      return responseBody({ error: "The Agency Plan could not create this CV.", code: error.code }, 409);
    }

    console.error("public_cv_claim_failed", {
      userId: user.id,
      code: error instanceof Error ? error.name : "unknown",
    });
    return responseBody({ error: "We could not save this draft. Please try again.", code: "CLAIM_FAILED" }, 500);
  }
}
