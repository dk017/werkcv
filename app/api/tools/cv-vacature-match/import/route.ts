import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { parseCVText } from "@/lib/cv-parser";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";

const MAX_TEXT_LENGTH = 18_000;

function parseLocale(value: unknown): CvMatchLocale {
  return value === "en" ? "en" : "nl";
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) {
    return NextResponse.json(
      { error: "Authentication required", code: "AUTH_REQUIRED" },
      { status: 401 },
    );
  }

  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(`${user.id}:${ip}`, {
    bucket: "cv-vacancy-match-import",
    maxRequests: 5,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many import attempts", code: "RATE_LIMITED" },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();
    const locale = parseLocale(body?.locale);
    const cvText =
      typeof body?.cvText === "string"
        ? body.cvText.trim().slice(0, MAX_TEXT_LENGTH)
        : "";

    if (cvText.length < 120) {
      return NextResponse.json(
        {
          error:
            locale === "en"
              ? "The saved CV text is incomplete. Run the check again."
              : "De opgeslagen CV-tekst is onvolledig. Voer de controle opnieuw uit.",
          code: "CV_TOO_SHORT",
        },
        { status: 400 },
      );
    }

    const data = await parseCVText(cvText, locale);
    return NextResponse.json({ data });
  } catch (error) {
    console.error("cv-vacancy-match import error", {
      userId: user.id,
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      { error: "CV import failed", code: "IMPORT_FAILED" },
      { status: 500 },
    );
  }
}
