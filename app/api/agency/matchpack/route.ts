import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { extractTextFromFile, parseCVText } from "@/lib/cv-parser";
import {
  anonymizeCvData,
  createDefaultMatchPackSubmission,
  createMatchPackAnalysis,
  MATCH_PACK_MAX_CV_TEXT_CHARS,
  MATCH_PACK_MAX_FILE_SIZE,
  MATCH_PACK_MAX_PDF_PAGES,
  matchPackInputSchema,
} from "@/lib/agency-matchpack";
import { matchCvVacature } from "@/lib/tools/cv-vacature-match";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

const MAX_REQUEST_BYTES = 12 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "docx"]);

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

function getExtension(name: string): string {
  return name.toLowerCase().split(".").pop() || "";
}

function hasExpectedSignature(buffer: Buffer, extension: string): boolean {
  if (extension === "pdf") {
    return buffer.subarray(0, 4).toString("ascii") === "%PDF";
  }

  // DOCX is a ZIP container. Accept the normal local-file and empty/archive
  // signatures used by valid Office documents.
  return buffer.length >= 4
    && buffer[0] === 0x50
    && buffer[1] === 0x4b
    && ((buffer[2] === 0x03 && buffer[3] === 0x04)
      || (buffer[2] === 0x05 && buffer[3] === 0x06)
      || (buffer[2] === 0x07 && buffer[3] === 0x08));
}

function errorCode(error: unknown): string {
  if (error instanceof Error && error.message.includes("too many pages")) return "PDF_TOO_MANY_PAGES";
  if (error instanceof Error && error.message.includes("too long")) return "TEXT_TOO_LONG";
  if (error instanceof Error && error.message.includes("Could not extract text")) return "TEXT_NOT_FOUND";
  return "ANALYSIS_FAILED";
}

export async function POST(request: NextRequest) {
  if (!isSameOriginWhenProvided(request)) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "agency-matchpack-analysis",
    maxRequests: 6,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) {
    return json({ error: "Too many analyses. Please try again later.", code: "RATE_LIMITED" }, 429);
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return json({ error: "The upload is too large.", code: "REQUEST_TOO_LARGE" }, 413);
  }

  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") {
    return json({
      error: "An active Agency Plan is required for MatchPack.",
      code: access.state === "pending" || access.state === "needs_sync"
        ? "AGENCY_PLAN_PENDING"
        : "AGENCY_PLAN_REQUIRED",
    }, 409);
  }

  let stage = "read_form_data";
  try {
    const formData = await request.formData();
    const file = formData.get("cvFile");
    if (!(file instanceof File)) {
      return json({ error: "Upload a PDF or DOCX CV.", code: "FILE_REQUIRED" }, 400);
    }

    const input = matchPackInputSchema.safeParse({
      vacancyTitle: typeof formData.get("vacancyTitle") === "string" ? formData.get("vacancyTitle") : "",
      vacancyText: typeof formData.get("vacancyText") === "string" ? formData.get("vacancyText") : "",
      locale: formData.get("locale") === "en" ? "en" : "nl",
    });
    if (!input.success) {
      return json({
        error: "Paste the full vacancy text so the requirements can be checked.",
        code: "VACANCY_INVALID",
      }, 400);
    }

    const extension = getExtension(file.name);
    if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_MIME_TYPES.has(file.type)) {
      return json({ error: "Only PDF and DOCX files are supported.", code: "INVALID_FILE_TYPE" }, 400);
    }
    if (file.size <= 0 || file.size > MATCH_PACK_MAX_FILE_SIZE) {
      return json({ error: "The CV must be smaller than 10 MB.", code: "FILE_TOO_LARGE" }, 400);
    }

    stage = "read_file";
    const buffer = Buffer.from(await file.arrayBuffer());
    if (!hasExpectedSignature(buffer, extension)) {
      return json({ error: "The file content does not match its file type.", code: "INVALID_FILE_SIGNATURE" }, 400);
    }

    stage = "extract_text";
    const cvText = (await extractTextFromFile(buffer, `upload.${extension}`, {
      maxPdfPages: MATCH_PACK_MAX_PDF_PAGES,
      maxTextChars: MATCH_PACK_MAX_CV_TEXT_CHARS,
    })).trim();
    if (cvText.length < 120) {
      return json({
        error: "We could not find enough readable text in this CV. Use a text-based PDF or DOCX.",
        code: "CV_TOO_SHORT",
      }, 422);
    }

    stage = "parse_cv";
    const candidateData = await parseCVText(cvText, input.data.locale);

    stage = "analyse_match";
    const result = await matchCvVacature(cvText, input.data.vacancyText, input.data.locale);
    const anonymized = anonymizeCvData(candidateData, input.data.locale);
    const analysis = createMatchPackAnalysis(result, anonymized);
    const submissionData = createDefaultMatchPackSubmission(
      candidateData,
      result,
      input.data.vacancyTitle,
      input.data.locale,
    );
    const title = (input.data.vacancyTitle || result.perceivedRole || candidateData.personal.title || "MatchPack")
      .trim()
      .slice(0, 160);

    stage = "save_pack";
    const pack = await prisma.agencyMatchPack.create({
      data: {
        userId: user.id,
        title: title || "MatchPack",
        vacancyTitle: input.data.vacancyTitle || null,
        vacancyText: input.data.vacancyText,
        locale: input.data.locale,
        sourceFileType: extension,
        candidateData: candidateData as unknown as Prisma.InputJsonValue,
        anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue,
        analysis: analysis as unknown as Prisma.InputJsonValue,
        submissionData: submissionData as unknown as Prisma.InputJsonValue,
        templateId: access.subscription?.templateId || "professional",
        colorThemeId: access.subscription?.colorThemeId || "classic-blue",
        status: "analyzed",
      },
      select: {
        id: true,
        title: true,
        vacancyTitle: true,
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

    return json({
      success: true,
      pack,
      quota: {
        used: access.used,
        allowance: access.period?.allowance || 50,
        consumesOnApproval: true,
      },
    });
  } catch (error) {
    console.error("agency_matchpack_failed", {
      stage,
      userId: user.id,
      code: errorCode(error),
    });
    return json({
      error: "The MatchPack could not be created. Check the file and vacancy text, then try again.",
      code: errorCode(error),
    }, 500);
  }
}
