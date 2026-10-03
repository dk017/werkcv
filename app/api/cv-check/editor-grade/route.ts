import { NextRequest, NextResponse } from "next/server";
import { cvSchema } from "@/lib/cv";
import { cvDataToCheckText } from "@/lib/cv-check/cv-data-text";
import { CvCheckInputError, runCvCheck } from "@/lib/cv-check/engine";
import { emptyLayoutSignals } from "@/lib/cv-check/layout";
import { rankFailedChecks } from "@/lib/cv-check/score";
import type { CvCheckLocale } from "@/lib/cv-check/types";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 1_000_000;

/**
 * The CV-check grade for the CV open in the editor (with or without an account). Runs the same checks
 * as /cv-check on the text of the WerkCV PDF, without the AI step: free, so the editor can re-grade
 * after edits. Nothing is stored or logged.
 */
export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const rateLimit = checkRateLimit(getClientIp(request), { bucket: "cv-check-editor-grade", maxRequests: 120, windowMs: 10 * 60 * 1000 });
  if (!rateLimit.allowed) {
    return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429, headers: { "Retry-After": "600" } });
  }
  if (Number(request.headers.get("content-length") || 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ code: "TOO_LARGE" }, { status: 413 });
  }

  let body: { data?: unknown; locale?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ code: "INVALID_JSON" }, { status: 400 });
  }
  const locale: CvCheckLocale = body.locale === "en" ? "en" : "nl";
  const parsed = cvSchema.safeParse(body.data);
  if (!parsed.success) return NextResponse.json({ code: "INVALID_CV" }, { status: 400 });

  try {
    const result = await runCvCheck({ cvText: cvDataToCheckText(parsed.data), locale, layout: emptyLayoutSignals("text"), ai: false });
    return NextResponse.json(
      {
        status: "ok",
        scoreVersion: result.scoreVersion,
        grade: result.grade,
        gradeBand: result.gradeBand,
        categories: result.categories,
        failed: rankFailedChecks(result.checks).map(({ id, category, severity, label, fix }) => ({ id, category, severity, label, fix })),
        passedCount: result.checks.filter((check) => check.status === "pass").length,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (error instanceof CvCheckInputError && error.code === "TEXT_TOO_SHORT") {
      return NextResponse.json({ status: "too_short" }, { headers: { "Cache-Control": "no-store" } });
    }
    console.error("cv_check_editor_grade_failed", { error: error instanceof Error ? error.name : "unknown" });
    return NextResponse.json({ code: "GRADE_FAILED" }, { status: 500 });
  }
}
