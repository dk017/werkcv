import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/cv-parser";
import {
  matchCvVacature,
  type CvMatchInputMode,
  type CvMatchLocale,
} from "@/lib/tools/cv-vacature-match";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

const MAX_TEXT_LENGTH = 18_000;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  "",
]);
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);

function parseLocale(value: unknown): CvMatchLocale {
  return value === "en" ? "en" : "nl";
}

function errorMessage(locale: CvMatchLocale, nl: string, en: string): string {
  return locale === "en" ? en : nl;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip, {
    bucket: "cv-vacancy-match",
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  });

  if (!allowed) {
    const locale = parseLocale(request.nextUrl.searchParams.get("locale"));
    return NextResponse.json(
      {
        error: errorMessage(
          locale,
          "Je hebt het maximale aantal gratis analyses bereikt. Probeer het over een uur opnieuw.",
          "You have reached the free analysis limit. Please try again in about an hour.",
        ),
        code: "RATE_LIMITED",
      },
      { status: 429 },
    );
  }

  let locale = parseLocale(request.nextUrl.searchParams.get("locale"));

  try {
    const contentType = request.headers.get("content-type") || "";
    let cvText = "";
    let vacancyText = "";
    let inputMode: CvMatchInputMode = "text";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const cvFile = formData.get("cvFile");
      const localeValue = formData.get("locale");
      locale = parseLocale(typeof localeValue === "string" ? localeValue : locale);
      vacancyText =
        typeof formData.get("vacancyText") === "string"
          ? String(formData.get("vacancyText")).trim().slice(0, MAX_TEXT_LENGTH)
          : "";
      inputMode = "file";

      if (!(cvFile instanceof File)) {
        return NextResponse.json(
          {
            error: errorMessage(
              locale,
              "Upload een PDF- of Word-bestand van je CV.",
              "Upload your CV as a PDF or Word document.",
            ),
            code: "FILE_REQUIRED",
          },
          { status: 400 },
        );
      }

      const extension = cvFile.name.toLowerCase().split(".").pop() ?? "";
      if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_FILE_TYPES.has(cvFile.type)) {
        return NextResponse.json(
          {
            error: errorMessage(
              locale,
              "Ongeldig bestandstype. Upload een PDF- of Word-bestand.",
              "Unsupported file type. Upload a PDF or Word document.",
            ),
            code: "INVALID_FILE_TYPE",
          },
          { status: 400 },
        );
      }

      if (cvFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: errorMessage(
              locale,
              "Het bestand is te groot. De maximale grootte is 10 MB.",
              "The file is too large. The maximum size is 10 MB.",
            ),
            code: "FILE_TOO_LARGE",
          },
          { status: 400 },
        );
      }

      const bytes = await cvFile.arrayBuffer();
      cvText = (await extractTextFromFile(Buffer.from(bytes), cvFile.name))
        .trim()
        .slice(0, MAX_TEXT_LENGTH);
    } else {
      const body = await request.json();
      locale = parseLocale(body?.locale);
      cvText =
        typeof body?.cvText === "string"
          ? body.cvText.trim().slice(0, MAX_TEXT_LENGTH)
          : "";
      vacancyText =
        typeof body?.vacancyText === "string"
          ? body.vacancyText.trim().slice(0, MAX_TEXT_LENGTH)
          : "";
    }

    if (cvText.length < 120) {
      return NextResponse.json(
        {
          error: errorMessage(
            locale,
            "De CV-tekst is te kort. Gebruik het volledige CV voor een betrouwbare analyse.",
            "The CV text is too short. Use the complete CV for a reliable assessment.",
          ),
          code: "CV_TOO_SHORT",
        },
        { status: 400 },
      );
    }

    if (vacancyText.length < 120) {
      return NextResponse.json(
        {
          error: errorMessage(
            locale,
            "De vacaturetekst is te kort. Plak de volledige functie-eisen en verantwoordelijkheden.",
            "The vacancy text is too short. Paste the full requirements and responsibilities.",
          ),
          code: "VACANCY_TOO_SHORT",
        },
        { status: 400 },
      );
    }

    const result = await matchCvVacature(cvText, vacancyText, locale);
    return NextResponse.json({
      result,
      sourceText: cvText,
      inputMode,
    });
  } catch (error) {
    console.error("cv-vacancy-match error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        error: errorMessage(
          locale,
          "De analyse kon niet worden voltooid. Probeer het opnieuw.",
          "The assessment could not be completed. Please try again.",
        ),
        code: "ANALYSIS_FAILED",
      },
      { status: 500 },
    );
  }
}
