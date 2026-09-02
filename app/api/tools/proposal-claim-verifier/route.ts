import { NextRequest, NextResponse } from "next/server";
import { proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";
import { createMatchPackSource } from "@/lib/agency-matchpack-source";
import { extractTextFromFileWithPages } from "@/lib/cv-parser";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { tryAcquireConcurrencyLease } from "@/lib/tools/concurrency-limit";
import {
  verifyProposalClaims,
  type ProposalClaimLocale,
} from "@/lib/tools/proposal-claim-verifier";

export const runtime = "nodejs";

const MAX_CV_TEXT = 18_000;
const MAX_PROPOSAL_TEXT = 8_000;
const MAX_VACANCY_TEXT = 18_000;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(["pdf", "doc", "docx"]);
const ALLOWED_FILE_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "",
]);

function localeFrom(value: unknown): ProposalClaimLocale {
  return value === "en" ? "en" : "nl";
}

function message(locale: ProposalClaimLocale, nl: string, en: string): string {
  return locale === "en" ? en : nl;
}

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      Pragma: "no-cache",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

export async function POST(request: NextRequest) {
  let locale = localeFrom(request.nextUrl.searchParams.get("locale"));
  if (!proposalClaimVerifierEnabled()) {
    return json({ error: message(locale, "Deze controle is nog niet ingeschakeld.", "This checker is not enabled yet."), code: "FEATURE_DISABLED" }, 404);
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(ip, { bucket: "proposal-claim-verifier", maxRequests: 8, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) {
    return json({
      error: message(locale, "Je hebt het maximum aantal gratis controles bereikt. Probeer het over een uur opnieuw.", "You have reached the free checker limit. Try again in about an hour."),
      code: "RATE_LIMITED",
    }, 429);
  }

  const concurrencyLease = tryAcquireConcurrencyLease(ip, { maxGlobal: 4, maxPerKey: 1 });
  if (!concurrencyLease) {
    return json({
      error: message(locale, "Er worden nu andere controles uitgevoerd. Probeer het over enkele ogenblikken opnieuw.", "Other checks are currently running. Try again in a moment."),
      code: "TOO_MANY_CONCURRENT_REQUESTS",
    }, 429);
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let cvText = "";
    let proposalText = "";
    let vacancyText = "";
    let sourceMap = null;
    let inputMode: "file" | "text" = "text";

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      locale = localeFrom(form.get("locale"));
      proposalText = typeof form.get("proposalText") === "string" ? String(form.get("proposalText")).trim().slice(0, MAX_PROPOSAL_TEXT) : "";
      vacancyText = typeof form.get("vacancyText") === "string" ? String(form.get("vacancyText")).trim().slice(0, MAX_VACANCY_TEXT) : "";
      const file = form.get("cvFile");
      inputMode = "file";

      if (!(file instanceof File)) return json({ error: message(locale, "Upload een PDF- of Word-CV.", "Upload a PDF or Word CV."), code: "FILE_REQUIRED" }, 400);
      const extension = file.name.toLocaleLowerCase().split(".").pop() || "";
      if (!ALLOWED_EXTENSIONS.has(extension) || !ALLOWED_FILE_TYPES.has(file.type)) {
        return json({ error: message(locale, "Gebruik een PDF-, DOC- of DOCX-bestand.", "Use a PDF, DOC or DOCX file."), code: "INVALID_FILE_TYPE" }, 400);
      }
      if (file.size > MAX_FILE_SIZE) return json({ error: message(locale, "Het bestand is groter dan 10 MB.", "The file is larger than 10 MB."), code: "FILE_TOO_LARGE" }, 400);

      const extracted = await extractTextFromFileWithPages(Buffer.from(await file.arrayBuffer()), `upload.${extension}`, { maxTextChars: MAX_CV_TEXT });
      const source = createMatchPackSource(extracted.fileType, extracted.text, extracted.pages);
      cvText = source.text;
      sourceMap = source.sourceMap;
    } else {
      const body = await request.json();
      locale = localeFrom(body?.locale);
      cvText = typeof body?.cvText === "string" ? body.cvText.trim().slice(0, MAX_CV_TEXT) : "";
      proposalText = typeof body?.proposalText === "string" ? body.proposalText.trim().slice(0, MAX_PROPOSAL_TEXT) : "";
      vacancyText = typeof body?.vacancyText === "string" ? body.vacancyText.trim().slice(0, MAX_VACANCY_TEXT) : "";
    }

    if (cvText.length < 120) return json({ error: message(locale, "Gebruik het volledige CV; de tekst is nu te kort.", "Use the complete CV; the current text is too short."), code: "CV_TOO_SHORT" }, 400);
    if (proposalText.length < 40) return json({ error: message(locale, "Plak de volledige klantintroductie of voorsteltekst.", "Paste the complete client introduction or proposal text."), code: "PROPOSAL_TOO_SHORT" }, 400);

    const startedAt = Date.now();
    const result = await verifyProposalClaims({ cvText, proposalText, vacancyText, locale, sourceMap });
    return json({
      result,
      meta: { inputMode, durationMs: Date.now() - startedAt, remaining: rate.remaining },
    });
  } catch (error) {
    console.error("proposal-claim-verifier_failed", {
      code: error instanceof Error && error.name === "TimeoutError" ? "TIMEOUT" : "ANALYSIS_FAILED",
    });
    return json({
      error: message(locale, "De voorstelcontrole kon niet worden voltooid. Probeer het opnieuw.", "The proposal check could not be completed. Please try again."),
      code: "ANALYSIS_FAILED",
    }, 500);
  } finally {
    concurrencyLease.release();
  }
}
