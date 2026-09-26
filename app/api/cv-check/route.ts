import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/cv-parser";
import { CvCheckInputError, runCvCheck } from "@/lib/cv-check/engine";
import { layoutSignalsForFile } from "@/lib/cv-check/layout";
import type { CvCheckLocale } from "@/lib/cv-check/types";
import { reportOpsIncident } from "@/lib/ops-alerts";
import { classifyAiToolError, shouldAlertAiToolError, toSafeAiToolError } from "@/lib/tools/ai-tool-errors";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

const MAX_TEXT_LENGTH = 25_000;
const MAX_VACANCY_LENGTH = 18_000;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "docx", "doc"]);
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "",
]);

function parseLocale(value: unknown): CvCheckLocale {
  return value === "en" ? "en" : "nl";
}

function failure(locale: CvCheckLocale, status: number, code: string, nl: string, en: string) {
  return NextResponse.json({ error: locale === "en" ? en : nl, code }, { status });
}

export async function POST(request: NextRequest) {
  let locale = parseLocale(request.nextUrl.searchParams.get("locale"));
  const ip = getClientIp(request);
  // Free without an account (spec §11): 8 per hour and 20 per day per IP.
  const hourly = checkRateLimit(ip, { bucket: "cv-check-hour", maxRequests: 8, windowMs: 60 * 60 * 1000 });
  const daily = hourly.allowed
    ? checkRateLimit(ip, { bucket: "cv-check-day", maxRequests: 20, windowMs: 24 * 60 * 60 * 1000 })
    : hourly;
  if (!hourly.allowed || !daily.allowed) {
    return failure(
      locale,
      429,
      "RATE_LIMITED",
      "Je hebt het maximale aantal gratis checks bereikt. Probeer het later opnieuw.",
      "You have reached the free check limit. Please try again later.",
    );
  }

  let cvText = "";
  let vacancyText: string | null = null;
  let fileName: string | null = null;
  let layout;

  try {
    const contentType = request.headers.get("content-type") || "";
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      locale = parseLocale(formData.get("locale") ?? locale);
      const vacancy = formData.get("vacancyText");
      vacancyText = typeof vacancy === "string" && vacancy.trim() ? vacancy.trim().slice(0, MAX_VACANCY_LENGTH) : null;
      const file = formData.get("cvFile");
      if (!(file instanceof File)) {
        return failure(locale, 400, "FILE_REQUIRED", "Upload een PDF- of Word-bestand van je cv.", "Upload your CV as a PDF or Word file.");
      }
      const extension = file.name.toLowerCase().split(".").pop() ?? "";
      if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_FILE_TYPES.has(file.type)) {
        return failure(locale, 400, "INVALID_FILE_TYPE", "Upload een PDF- of Word-bestand.", "Upload a PDF or Word file.");
      }
      if (file.size > MAX_FILE_SIZE) {
        return failure(locale, 400, "FILE_TOO_LARGE", "Het bestand is groter dan 10 MB.", "The file is larger than 10 MB.");
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      fileName = file.name;
      try {
        cvText = (await extractTextFromFile(buffer, file.name)).trim().slice(0, MAX_TEXT_LENGTH);
      } catch {
        return failure(
          locale,
          400,
          "PARSE_FAILED",
          "We konden de tekst uit dit bestand niet lezen. Plak de tekst van je cv of probeer een andere PDF.",
          "We could not read text from this file. Paste your CV text or try another PDF.",
        );
      }
      layout = await layoutSignalsForFile(buffer, file.name, cvText);
    } else {
      const body = await request.json();
      locale = parseLocale(body?.locale ?? locale);
      cvText = typeof body?.cvText === "string" ? body.cvText.trim().slice(0, MAX_TEXT_LENGTH) : "";
      vacancyText =
        typeof body?.vacancyText === "string" && body.vacancyText.trim()
          ? body.vacancyText.trim().slice(0, MAX_VACANCY_LENGTH)
          : null;
    }

    const result = await runCvCheck({ cvText, vacancyText, locale, layout, fileName });
    const { aiErrorCode, ...report } = result;
    if (aiErrorCode && shouldAlertAiToolError(aiErrorCode)) {
      await reportOpsIncident({
        event: "ops_ai_tool_failed",
        route: "/api/cv-check",
        stage: aiErrorCode,
        error: new Error(`vacancy analysis unavailable: ${aiErrorCode}`),
        locale,
        context: { tool: "cv-check" },
      }).catch(() => undefined);
    }
    return NextResponse.json({ result: report, aiErrorCode });
  } catch (error) {
    if (error instanceof CvCheckInputError) {
      return NextResponse.json({ error: error.message, code: error.code }, { status: 400 });
    }
    const code = classifyAiToolError(error);
    console.error("cv-check error", { code, error: toSafeAiToolError(error).message });
    if (shouldAlertAiToolError(code)) {
      await reportOpsIncident({
        event: "ops_ai_tool_failed",
        route: "/api/cv-check",
        stage: code,
        error: toSafeAiToolError(error),
        locale,
        context: { tool: "cv-check" },
      }).catch(() => undefined);
    }
    return failure(
      locale,
      500,
      code,
      "De check kon niet worden voltooid. Probeer het opnieuw.",
      "The check could not be completed. Please try again.",
    );
  }
}
