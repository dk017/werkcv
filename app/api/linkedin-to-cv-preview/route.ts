import { NextRequest, NextResponse } from "next/server";
import { repairLinkedInSummary, parseLinkedInProfileText } from "@/lib/linkedin-import";
import { extractTextFromPDF } from "@/lib/cv-parser";
import { localizeLinkedInCvForDutch } from "@/lib/linkedin-dutch-format";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import type { CVData } from "@/lib/cv";

const MAX_TEXT_LENGTH = 50000;
const MAX_PDF_BYTES = 10 * 1024 * 1024;
const MAX_PDF_PAGES = 10;
const PDF_UNREADABLE_ERROR =
  "We konden geen tekst uit deze PDF lezen. Gebruik de PDF die LinkedIn maakt via Bronnen (of Meer) → Opslaan als PDF, of plak je profieltekst.";

function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

// LinkedIn's "Save to PDF" export adds a "Page 1 of 3" footer to every page.
function stripPdfPageFooters(text: string): string {
  return text
    .split("\n")
    .filter((line) => !/^\s*(page|pagina)\s+\d+\s+(of|van)\s+\d+\s*$/i.test(line))
    .join("\n")
    .trim();
}

type PreviewInput =
  | { ok: true; profileText: string; targetRole: string; language: ToolLanguage; inputType: "text" | "pdf" }
  | { ok: false; error: string; status: number };

async function readInput(request: NextRequest): Promise<PreviewInput> {
  if (!(request.headers.get("content-type") || "").includes("multipart/form-data")) {
    const body = await request.json();
    return {
      ok: true,
      profileText: typeof body?.profileText === "string" ? body.profileText.trim() : "",
      targetRole: typeof body?.targetRole === "string" ? body.targetRole.trim().slice(0, 120) : "",
      language: body?.language === "en" ? "en" : "nl",
      inputType: "text",
    };
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const targetRole = formData.get("targetRole");
  const base = {
    targetRole: typeof targetRole === "string" ? targetRole.trim().slice(0, 120) : "",
    language: (formData.get("language") === "en" ? "en" : "nl") as ToolLanguage,
  };

  if (!(file instanceof File)) {
    return { ok: false, error: "Kies eerst de PDF van je LinkedIn-profiel.", status: 400 };
  }
  if (!isPdfFile(file)) {
    return { ok: false, error: "Upload een PDF-bestand. LinkedIn maakt die via Bronnen (of Meer) → Opslaan als PDF.", status: 400 };
  }
  if (file.size > MAX_PDF_BYTES) {
    return { ok: false, error: "Dit bestand is groter dan 10 MB. Upload de PDF uit LinkedIn.", status: 413 };
  }

  try {
    const text = await extractTextFromPDF(Buffer.from(await file.arrayBuffer()), {
      maxPdfPages: MAX_PDF_PAGES,
      maxTextChars: MAX_TEXT_LENGTH,
    });
    return { ok: true, ...base, profileText: stripPdfPageFooters(text), inputType: "pdf" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (/too long|too many pages/i.test(message)) {
      return { ok: false, error: "Deze PDF is te lang voor de tool. Upload de PDF van je LinkedIn-profiel (meestal 2 tot 4 pagina's).", status: 400 };
    }
    console.error("linkedin_to_cv_preview_pdf_unreadable", message);
    return { ok: false, error: PDF_UNREADABLE_ERROR, status: 400 };
  }
}

type ToolLanguage = "nl" | "en";

type PreviewSection = {
  key: string;
  title: string;
  lines: string[];
};

function joinParts(parts: Array<string | undefined | null>): string {
  return parts.map((part) => part?.trim()).filter(Boolean).join(" | ");
}

function compactText(value: string | undefined | null): string {
  return value?.replace(/\s+/g, " ").trim() || "";
}

function extractExperience(cvData: CVData): string[] {
  return cvData.experience
    .map((item) => {
      const header = joinParts([
        joinParts([item.role, item.company]),
        joinParts([item.start, item.end]),
        item.location,
      ]);
      const description = compactText(item.description);
      const highlights = item.highlights
        .map((highlight) => compactText(highlight))
        .filter(Boolean);

      return [header, description, ...highlights].filter(Boolean).join("\n");
    })
    .filter(Boolean);
}

function extractEducation(cvData: CVData): string[] {
  return cvData.education
    .map((item) => {
      const header = joinParts([
        joinParts([item.degree, item.school]),
        joinParts([item.start, item.end]),
        item.location,
      ]);
      const description = compactText(item.description);
      return [header, description].filter(Boolean).join("\n");
    })
    .filter(Boolean);
}

function extractSkills(cvData: CVData): string[] {
  return cvData.skills
    .map((skill) => compactText(skill.name))
    .filter(Boolean);
}

function extractLanguages(cvData: CVData): string[] {
  return cvData.languages
    .map((item) => joinParts([item.name, item.level]))
    .filter(Boolean);
}

function extractCertificates(cvData: CVData): string[] {
  return cvData.courses
    .map((item) => joinParts([item.name, item.institution, item.year]))
    .filter(Boolean);
}

function buildImprovementPoints(cvData: CVData, language: ToolLanguage): string[] {
  const improvements: string[] = [];
  const summaryWords = compactText(cvData.personal.summary).split(/\s+/).filter(Boolean).length;
  const experienceCount = cvData.experience.length;
  const skillCount = cvData.skills.length;

  if (summaryWords < 20) {
    improvements.push("Maak je profieltekst kort, concreet en duidelijk gericht op de functie waarop je solliciteert.");
  }

  if (experienceCount > 0 && cvData.experience.every((item) => item.highlights.length === 0)) {
    improvements.push("Zet werkervaring om naar concrete bullets met actie, context en resultaat in plaats van alleen taakomschrijvingen.");
  }

  if (skillCount < 6) {
    improvements.push("Voeg meer relevante vaardigheden toe die passen bij je doelrol en die je in je werkervaring kunt onderbouwen.");
  }

  improvements.push("Verwijder brede of informele LinkedIn-zinnen die niet direct helpen bij een sollicitatie.");
  improvements.push("Controleer of je cv keywords uit de vacature bevat in je profiel, werkervaring en vaardigheden.");

  if (language === "nl" && cvData.personal.resumeLanguage === "en") {
    improvements.push("Vertaal kernonderdelen naar Nederlands als je solliciteert op een Nederlandstalige vacature.");
  }

  return Array.from(new Set(improvements));
}

function buildSections(cvData: CVData, language: ToolLanguage): PreviewSection[] {
  const sections: PreviewSection[] = [];
  const summary = compactText(cvData.personal.summary);
  const experience = extractExperience(cvData);
  const education = extractEducation(cvData);
  const skills = extractSkills(cvData);
  const languages = extractLanguages(cvData);
  const certificates = extractCertificates(cvData);
  const improvements = buildImprovementPoints(cvData, language);

  sections.push({
    key: "profile",
    title: "Profieltekst",
    lines: summary ? [summary] : ["Nog geen duidelijke profieltekst gevonden. Gebruik de output als startpunt en maak deze functiegerichter."],
  });

  sections.push({
    key: "experience",
    title: "Werkervaring",
    lines: experience.length > 0 ? experience : ["Nog geen duidelijke werkervaring gevonden. Plak ook je LinkedIn-werkervaring mee voor een betere omzetting."],
  });

  sections.push({
    key: "education",
    title: "Opleiding",
    lines: education.length > 0 ? education : ["Nog geen opleiding gevonden in de geplakte tekst."],
  });

  sections.push({
    key: "skills",
    title: "Vaardigheden",
    lines: skills.length > 0 ? skills : ["Nog geen duidelijke vaardigheden gevonden. Voeg ook je skills-sectie uit LinkedIn toe."],
  });

  if (languages.length > 0) {
    sections.push({
      key: "languages",
      title: "Talen",
      lines: languages,
    });
  }

  if (certificates.length > 0) {
    sections.push({
      key: "certificates",
      title: "Certificaten",
      lines: certificates,
    });
  }

  sections.push({
    key: "improvements",
    title: "Verbeterpunten",
    lines: improvements,
  });

  return sections;
}

export async function POST(request: NextRequest) {
  try {
    // Each request costs two AI calls; this page is public.
    const rateLimit = checkRateLimit(getClientIp(request), {
      bucket: "linkedin-to-cv-preview",
      maxRequests: 10,
      windowMs: 10 * 60 * 1000,
    });
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Je hebt de tool een paar keer kort na elkaar gebruikt. Probeer het over 10 minuten opnieuw." },
        { status: 429, headers: { "Retry-After": "600" } },
      );
    }

    const input = await readInput(request);
    if (!input.ok) {
      return NextResponse.json({ error: input.error }, { status: input.status });
    }
    const { profileText, targetRole, language, inputType } = input;

    if (!profileText) {
      return NextResponse.json(
        { error: inputType === "pdf" ? PDF_UNREADABLE_ERROR : "Plak eerst de tekst van je LinkedIn-profiel." },
        { status: 400 },
      );
    }

    if (profileText.length < 180) {
      return NextResponse.json(
        {
          error: inputType === "pdf"
            ? PDF_UNREADABLE_ERROR
            : "De tekst lijkt te kort. Plak bijvoorbeeld ook je info-sectie, werkervaring en vaardigheden.",
        },
        { status: 400 },
      );
    }

    if (profileText.length > MAX_TEXT_LENGTH) {
      return NextResponse.json(
        { error: "De tekst is te lang. Plak alleen de relevante onderdelen van je LinkedIn-profiel." },
        { status: 400 },
      );
    }

    const parsedCv = await parseLinkedInProfileText(profileText, language);
    const summarizedCv = await repairLinkedInSummary(profileText, parsedCv);
    const repairedCv = language === "nl" ? localizeLinkedInCvForDutch(summarizedCv) : summarizedCv;
    const cvData: CVData = targetRole
      ? {
          ...repairedCv,
          personal: {
            ...repairedCv.personal,
            title: targetRole,
          },
        }
      : repairedCv;
    const sections = buildSections(cvData, language);

    return NextResponse.json({
      sections,
      detectedLanguage: cvData.personal.resumeLanguage === "en" ? "en" : "nl",
      suggestedTitle: compactText(cvData.personal.title),
      suggestedName: compactText(cvData.personal.name),
      cvData,
    });
  } catch (error) {
    console.error("linkedin_to_cv_preview_failed", error);
    return NextResponse.json(
      { error: "Omzetten mislukt. Probeer het opnieuw met meer LinkedIn-tekst." },
      { status: 500 },
    );
  }
}
