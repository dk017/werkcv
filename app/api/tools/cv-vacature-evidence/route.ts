import { NextRequest, NextResponse } from "next/server";
import { extractTextFromFile } from "@/lib/cv-parser";
import { matchCvVacature, type CvMatchInputMode, type CvMatchLocale } from "@/lib/tools/cv-vacature-match";
import { cvVacatureEvidenceResultSchema } from "@/lib/tools/cv-vacature-match-schema";
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
const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" } as const;

function parseLocale(value: unknown): CvMatchLocale {
  return value === "en" ? "en" : "nl";
}

function message(locale: CvMatchLocale, nl: string, en: string): string {
  return locale === "en" ? en : nl;
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request: NextRequest) {
  let locale = parseLocale(request.nextUrl.searchParams.get("locale"));
  const { allowed } = checkRateLimit(getClientIp(request), {
    bucket: "cv-vacancy-evidence",
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  });
  if (!allowed) {
    return json({
      error: message(locale, "Je hebt het maximale aantal gratis analyses bereikt. Probeer het over een uur opnieuw.", "You have reached the free analysis limit. Please try again in about an hour."),
      code: "RATE_LIMITED",
    }, 429);
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let cvText = "";
    let vacancyText = "";
    let inputMode: CvMatchInputMode = "text";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const cvFile = formData.get("cvFile");
      locale = parseLocale(formData.get("locale") ?? locale);
      vacancyText = typeof formData.get("vacancyText") === "string"
        ? String(formData.get("vacancyText")).trim().slice(0, MAX_TEXT_LENGTH)
        : "";
      inputMode = "file";
      if (!(cvFile instanceof File)) {
        return json({ error: message(locale, "Upload een PDF- of Word-bestand van je CV.", "Upload your CV as a PDF or Word document."), code: "FILE_REQUIRED" }, 400);
      }
      const extension = cvFile.name.toLowerCase().split(".").pop() ?? "";
      if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_FILE_TYPES.has(cvFile.type)) {
        return json({ error: message(locale, "Ongeldig bestandstype. Upload een PDF- of Word-bestand.", "Unsupported file type. Upload a PDF or Word document."), code: "INVALID_FILE_TYPE" }, 400);
      }
      if (cvFile.size > MAX_FILE_SIZE) {
        return json({ error: message(locale, "Het bestand is te groot. De maximale grootte is 10 MB.", "The file is too large. The maximum size is 10 MB."), code: "FILE_TOO_LARGE" }, 400);
      }
      cvText = (await extractTextFromFile(Buffer.from(await cvFile.arrayBuffer()), cvFile.name)).trim().slice(0, MAX_TEXT_LENGTH);
    } else {
      const body = await request.json();
      locale = parseLocale(body?.locale);
      cvText = typeof body?.cvText === "string" ? body.cvText.trim().slice(0, MAX_TEXT_LENGTH) : "";
      vacancyText = typeof body?.vacancyText === "string" ? body.vacancyText.trim().slice(0, MAX_TEXT_LENGTH) : "";
    }

    if (cvText.length < 120) {
      return json({ error: message(locale, "De CV-tekst is te kort. Gebruik het volledige CV voor een betrouwbare analyse.", "The CV text is too short. Use the complete CV for a reliable assessment."), code: "CV_TOO_SHORT" }, 400);
    }
    if (vacancyText.length < 120) {
      return json({ error: message(locale, "De vacaturetekst is te kort. Plak de volledige functie-eisen en verantwoordelijkheden.", "The vacancy text is too short. Paste the full requirements and responsibilities."), code: "VACANCY_TOO_SHORT" }, 400);
    }

    const result = cvVacatureEvidenceResultSchema.parse(await matchCvVacature(cvText, vacancyText, locale));
    return json({ result, sourceText: cvText, inputMode });
  } catch (error) {
    console.error("cv-vacancy-evidence error", { error: error instanceof Error ? error.message : "unknown" });
    return json({ error: message(locale, "De analyse kon niet worden voltooid. Probeer het opnieuw.", "The assessment could not be completed. Please try again."), code: "ANALYSIS_FAILED" }, 500);
  }
}
