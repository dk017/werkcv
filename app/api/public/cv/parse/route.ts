import { NextRequest, NextResponse } from "next/server";
import { cvSchema } from "@/lib/cv";
import { parseCV } from "@/lib/cv-parser";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

const MAX_PUBLIC_UPLOAD_BYTES = 5 * 1024 * 1024;
const MAX_PUBLIC_BODY_BYTES = 6 * 1024 * 1024;
const MAX_PUBLIC_PDF_PAGES = 5;
const MAX_PUBLIC_TEXT_CHARS = 40_000;
const PUBLIC_PARSE_TIMEOUT_MS = 30_000;

function getExtension(filename: string): string {
  return filename.toLowerCase().split(".").pop() || "";
}

function hasPdfSignature(buffer: Buffer): boolean {
  return buffer.subarray(0, 5).toString("ascii") === "%PDF-";
}

function hasDocxSignature(buffer: Buffer): boolean {
  return buffer.subarray(0, 2).toString("ascii") === "PK" && buffer.includes(Buffer.from("[Content_Types].xml"));
}

function sameOriginWhenProvided(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  return !origin || origin === request.nextUrl.origin;
}

function isEnglishRequest(request: NextRequest): boolean {
  return request.headers.get("x-werkcv-language") !== "nl";
}

export async function POST(request: NextRequest) {
  const isEnglish = isEnglishRequest(request);
  const rateLimit = checkRateLimit(getClientIp(request), {
    bucket: "public-cv-parse",
    maxRequests: 2,
    windowMs: 10 * 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: isEnglish ? "Upload limit reached. Please try again later." : "Uploadlimiet bereikt. Probeer het later opnieuw.", code: "RATE_LIMITED" },
      { status: 429, headers: { "Retry-After": "600" } },
    );
  }

  if (!sameOriginWhenProvided(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_PUBLIC_BODY_BYTES) {
    return NextResponse.json({ error: isEnglish ? "File is too large." : "Bestand is te groot.", code: "FILE_TOO_LARGE" }, { status: 413 });
  }

  let stage = "read_form_data";
  let fileKind = "unknown";

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: isEnglish ? "No file was uploaded." : "Geen bestand geüpload.", code: "FILE_REQUIRED" }, { status: 400 });
    }

    const extension = getExtension(file.name);
    if (extension !== "pdf" && extension !== "docx") {
      return NextResponse.json(
        { error: isEnglish ? "Upload a PDF or DOCX file." : "Upload een PDF- of DOCX-bestand.", code: "UNSUPPORTED_FILE_TYPE" },
        { status: 400 },
      );
    }
    fileKind = extension;

    if (file.size <= 0 || file.size > MAX_PUBLIC_UPLOAD_BYTES) {
      return NextResponse.json({ error: isEnglish ? "File is too large. Maximum size is 5MB." : "Bestand is te groot. Maximale grootte is 5MB.", code: "FILE_TOO_LARGE" }, { status: 413 });
    }

    stage = "validate_signature";
    const buffer = Buffer.from(await file.arrayBuffer());
    const validSignature = extension === "pdf" ? hasPdfSignature(buffer) : hasDocxSignature(buffer);
    if (!validSignature) {
      return NextResponse.json(
        { error: isEnglish ? "The file content does not match its file type." : "De bestandsinhoud komt niet overeen met het bestandstype.", code: "INVALID_FILE_CONTENT" },
        { status: 400 },
      );
    }

    stage = "parse_cv";
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), PUBLIC_PARSE_TIMEOUT_MS);
    let cvData;
    try {
      cvData = await parseCV(buffer, file.name, {
        maxPdfPages: MAX_PUBLIC_PDF_PAGES,
        maxTextChars: MAX_PUBLIC_TEXT_CHARS,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const parsed = cvSchema.safeParse(cvData);
    if (!parsed.success) {
      throw new Error("Parsed CV failed schema validation");
    }

    return NextResponse.json(
      { success: true, data: parsed.data },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    if (stage === "read_form_data") {
      return NextResponse.json(
        { error: isEnglish ? "Upload a PDF or DOCX file." : "Upload een PDF- of DOCX-bestand.", code: "INVALID_FORM_DATA" },
        { status: 400, headers: { "Cache-Control": "no-store" } },
      );
    }

    // Do not log filenames, extracted CV text, email addresses, or parser output
    // for anonymous uploads. Public uploads contain personal data by design.
    console.error("public_cv_parse_failed", {
      stage,
      fileKind,
      code: error instanceof Error && error.name === "AbortError" ? "TIMEOUT" : "PARSE_FAILED",
    });

    return NextResponse.json(
      { error: isEnglish ? "We could not read that CV. Try a text-based PDF or DOCX file." : "We konden dat CV niet lezen. Probeer een tekstgebaseerd PDF- of DOCX-bestand.", code: "PARSE_FAILED" },
      { status: 422 },
    );
  }
}
