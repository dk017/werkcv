import { CvScoreInputError, scoreCv, type CvScoreDimension } from "@/lib/tools/cv-score";
import { matchCvVacature } from "@/lib/tools/cv-vacature-match";
import { classifyAiToolError, type AiToolErrorCode } from "@/lib/tools/ai-tool-errors";
import { dutchConventionChecks } from "./dutch";
import { emptyLayoutSignals, type LayoutSignals } from "./layout";
import { buildParsePreview } from "./parse-preview";
import { SCORE_CHECK_COPY_EN } from "./score-check-copy-en";
import { computeScores, rankFailedChecks } from "./score";
import {
  CV_CHECK_SCORE_VERSION,
  type CvCheckCategory,
  type CvCheckItem,
  type CvCheckLocale,
  type CvCheckResult,
} from "./types";

export class CvCheckInputError extends Error {
  constructor(
    public readonly code: "TEXT_TOO_SHORT" | "SCANNED_PDF" | "VACANCY_TOO_SHORT",
    message: string,
  ) {
    super(message);
    this.name = "CvCheckInputError";
  }
}

export type RunCvCheckInput = {
  cvText: string;
  vacancyText?: string | null;
  locale: CvCheckLocale;
  layout?: LayoutSignals;
  fileName?: string | null;
};

type Copy = { nl: string; en: string };
const t = (locale: CvCheckLocale, copy: Copy) => (locale === "en" ? copy.en : copy.nl);

// Existing CV score dimensions mapped onto the CV-check categories.
const DIMENSION_CATEGORY: Record<string, CvCheckCategory> = {
  structuur: "parsing",
  personalia: "basics",
  volledigheid: "basics",
  profieltekst: "content",
  werkervaring: "content",
  taalgebruik: "content",
};
// Covered better elsewhere: length by nl_length, languages by nl_language_levels,
// text-based column detection by the PDF layout signal when available.
const SKIPPED_SCORE_CHECKS = new Set(["cv_length", "languages_present"]);
// Fairer wording when cv-score gives partial credit (e.g. one or two generic phrases, not an empty profile).
const PARTIAL_LABELS: Record<string, Copy> = {
  profile_buzzwords: { nl: "Profieltekst kan concreter", en: "Profile could be more concrete" },
};

// Checks that can only be judged when their section exists; otherwise the "exists" check alone counts.
const DEPENDENT_CHECKS: Record<string, string[]> = {
  profile_exists: ["profile_length", "profile_years_experience", "profile_buzzwords"],
  experience_exists: ["quantified_achievement", "active_verbs", "experience_dates"],
};

function scoreChecksToItems(dimensions: CvScoreDimension[], layout: LayoutSignals, locale: CvCheckLocale): CvCheckItem[] {
  const missingSections = new Set(
    dimensions.flatMap((dimension) => dimension.checks).filter((check) => DEPENDENT_CHECKS[check.id] && !check.passed).map((check) => check.id),
  );
  const notApplicable = new Set([...missingSections].flatMap((id) => DEPENDENT_CHECKS[id]));

  return dimensions.flatMap((dimension) =>
    dimension.checks
      .filter((check) => !SKIPPED_SCORE_CHECKS.has(check.id))
      .filter((check) => !(check.id === "no_columns" && layout.twoColumnRowShare !== null))
      .map<CvCheckItem>((check) => {
        // cv-score only has Dutch copy; English reports use translated labels and drop the Dutch explanation.
        const english = locale === "en" ? SCORE_CHECK_COPY_EN[check.id] : undefined;
        const credit = check.points_max > 0 ? check.points_earned / check.points_max : check.passed ? 1 : 0;
        // Half credit or more is a minor point: report it as a tip, not an important issue.
        const partial = !check.passed && credit >= 0.5;
        const softLabel = partial ? PARTIAL_LABELS[check.id] : undefined;
        return {
          id: `score_${check.id}`,
          category: DIMENSION_CATEGORY[dimension.id] ?? "content",
          severity: partial || check.points_max < 5 ? "tip" : "important",
          status: notApplicable.has(check.id) ? "not_applicable" : check.passed ? "pass" : "fail",
          weight: check.points_max,
          credit,
          label: softLabel
            ? t(locale, softLabel)
            : english
              ? (check.passed ? english.pass : english.fail)
              : check.label,
          evidence: check.passed || english ? null : check.feedback,
          fix: check.passed ? null : english ? english.fix : check.fix ?? check.feedback,
        };
      }),
  );
}

function parsingChecks(layout: LayoutSignals, locale: CvCheckLocale): CvCheckItem[] {
  const checks: CvCheckItem[] = [];

  if (layout.fileType === "pdf") {
    checks.push({
      id: "parse_text_extractable",
      category: "parsing",
      severity: "critical",
      status: layout.imageOnlyPages.length ? "fail" : "pass",
      weight: 5,
      label: t(locale, { nl: "Tekst is leesbaar (geen scan)", en: "Text is readable (not a scan)" }),
      evidence: layout.imageOnlyPages.length
        ? t(locale, { nl: `Pagina ${layout.imageOnlyPages.join(", ")} bevat geen leesbare tekst`, en: `Page ${layout.imageOnlyPages.join(", ")} has no readable text` })
        : null,
      fix: layout.imageOnlyPages.length
        ? t(locale, {
            nl: "Exporteer je cv opnieuw als tekst-PDF vanuit Word, Google Docs of een cv-builder. Een scan of foto kunnen systemen niet lezen.",
            en: "Export your CV again as a text PDF from Word, Google Docs or a CV builder. Systems cannot read a scan or photo.",
          })
        : null,
    });
  }

  if (layout.twoColumnRowShare !== null) {
    const share = layout.twoColumnRowShare;
    checks.push({
      id: "parse_reading_order",
      category: "parsing",
      severity: "important",
      status: share < 0.25 ? "pass" : "fail",
      credit: share < 0.25 ? 1 : share < 0.5 ? 0.5 : 0,
      weight: 4,
      label: t(locale, { nl: "Eén kolom: logische leesvolgorde", en: "Single column: logical reading order" }),
      evidence: t(locale, {
        nl: `${Math.round(share * 100)}% van de regels heeft twee kolommen naast elkaar`,
        en: `${Math.round(share * 100)}% of lines have two columns side by side`,
      }),
      fix:
        share >= 0.25
          ? t(locale, {
              nl: "Kies een opmaak met één kolom. Bij twee kolommen lezen veel systemen links en rechts door elkaar, waardoor functies en data verkeerd terechtkomen.",
              en: "Use a single-column layout. With two columns many systems mix the left and right text, so titles and dates end up in the wrong fields.",
            })
          : null,
    });
  }

  if (layout.fileType === "docx") {
    checks.push({
      id: "parse_contact_in_body",
      category: "parsing",
      severity: "important",
      status: layout.contactOnlyInHeaderFooter ? "fail" : "pass",
      weight: 3,
      label: t(locale, { nl: "Contactgegevens in de hoofdtekst", en: "Contact details in the main text" }),
      evidence: layout.contactOnlyInHeaderFooter
        ? t(locale, { nl: "E-mail of telefoon staat alleen in de koptekst/voettekst", en: "Email or phone only appears in the header/footer" })
        : null,
      fix: layout.contactOnlyInHeaderFooter
        ? t(locale, {
            nl: "Zet je naam, e-mail en telefoonnummer bovenaan in de gewone tekst. Veel systemen slaan kop- en voetteksten over.",
            en: "Put your name, email and phone at the top of the main text. Many systems skip headers and footers.",
          })
        : null,
    });
    checks.push({
      id: "parse_no_text_boxes",
      category: "parsing",
      severity: "important",
      status: layout.textBoxCount > 0 ? "fail" : "pass",
      weight: 3,
      label: t(locale, { nl: "Geen tekstvakken", en: "No text boxes" }),
      evidence: layout.textBoxCount > 0 ? `${layout.textBoxCount}` : null,
      fix:
        layout.textBoxCount > 0
          ? t(locale, {
              nl: "Haal tekst uit tekstvakken en zet die in de gewone tekst. Tekstvakken worden vaak overgeslagen of in de verkeerde volgorde gelezen.",
              en: "Move text out of text boxes into the normal text flow. Text boxes are often skipped or read out of order.",
            })
          : null,
    });
  }

  if (layout.fileSizeBytes !== null) {
    const megabytes = layout.fileSizeBytes / (1024 * 1024);
    checks.push({
      id: "parse_file_size",
      category: "parsing",
      severity: "tip",
      status: megabytes <= 2 ? "pass" : "fail",
      weight: 1,
      label: t(locale, { nl: "Bestand kleiner dan 2 MB", en: "File smaller than 2 MB" }),
      evidence: `${megabytes.toFixed(1)} MB`,
      fix:
        megabytes > 2
          ? t(locale, {
              nl: "Verklein je bestand (bijv. een kleinere foto). Sommige sollicitatiesystemen weigeren grote bestanden.",
              en: "Reduce the file size (e.g. a smaller photo). Some application systems reject large files.",
            })
          : null,
    });
  }

  if (layout.fileName) {
    const generic = /^(document|scan|untitled|naamloos|img|image|cv|resume|curriculum)[\s_-]*\d*\.(pdf|docx?)$/i.test(layout.fileName);
    checks.push({
      id: "parse_file_name",
      category: "parsing",
      severity: "tip",
      status: generic ? "fail" : "pass",
      weight: 1,
      label: t(locale, { nl: "Bestandsnaam met je naam", en: "File name includes your name" }),
      evidence: layout.fileName,
      fix: generic
        ? t(locale, { nl: "Noem je bestand bijvoorbeeld CV_Voornaam_Achternaam.pdf.", en: "Name your file, for example, CV_Firstname_Lastname.pdf." })
        : null,
    });
  }

  return checks;
}

function buildTopFixes(checks: CvCheckItem[], vacancy: CvCheckResult["vacancy"]): CvCheckResult["topFixes"] {
  const ranked = rankFailedChecks(checks);
  const fromCheck = (check: CvCheckItem) => ({
    checkId: check.id,
    category: check.category,
    title: check.label,
    fix: check.fix ?? "",
    evidence: check.evidence,
  });
  const critical = ranked.filter((check) => check.severity === "critical").map(fromCheck);
  const vacancyFixes = (vacancy?.topFixes ?? []).map((fix, index) => ({
    checkId: `vacancy_fix_${index + 1}`,
    category: "vacancy" as const,
    title: fix.title,
    fix: fix.action,
    evidence: fix.evidence,
  }));
  const rest = ranked.filter((check) => check.severity !== "critical").map(fromCheck);
  return [...critical, ...vacancyFixes, ...rest].slice(0, 3);
}

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

export async function runCvCheck(input: RunCvCheckInput): Promise<CvCheckResult & { aiErrorCode: AiToolErrorCode | null }> {
  const { locale } = input;
  const cvText = input.cvText.trim();
  const vacancyText = input.vacancyText?.trim() || null;
  const layout = input.layout ?? emptyLayoutSignals("text");
  const wordCount = countWords(cvText);

  if (layout.fileType === "pdf" && layout.pageCount && layout.imageOnlyPages.length === layout.pageCount) {
    throw new CvCheckInputError(
      "SCANNED_PDF",
      t(locale, {
        nl: "Je cv is een scan of afbeelding zonder leesbare tekst. Systemen kunnen dit niet lezen; exporteer je cv als tekst-PDF of plak de tekst.",
        en: "Your CV is a scan or image without readable text. Systems cannot read it; export it as a text PDF or paste the text.",
      }),
    );
  }
  if (vacancyText !== null && vacancyText.length < 120) {
    throw new CvCheckInputError(
      "VACANCY_TOO_SHORT",
      t(locale, {
        nl: "De vacaturetekst is te kort. Plak de volledige functie-eisen en taken.",
        en: "The vacancy text is too short. Paste the full requirements and responsibilities.",
      }),
    );
  }

  const [scoreOutcome, vacancyOutcome] = await Promise.allSettled([
    scoreCv(cvText, { mode: input.fileName ? "file" : "text", fileName: input.fileName ?? undefined }),
    vacancyText ? matchCvVacature(cvText, vacancyText, locale) : Promise.resolve(null),
  ]);

  if (scoreOutcome.status === "rejected") {
    if (scoreOutcome.reason instanceof CvScoreInputError) {
      throw new CvCheckInputError(
        "TEXT_TOO_SHORT",
        locale === "en"
          ? "Your CV text is too short or incomplete to check. Upload the full CV or paste all of its text."
          : scoreOutcome.reason.message,
      );
    }
    throw scoreOutcome.reason;
  }

  const vacancy = vacancyOutcome.status === "fulfilled" ? vacancyOutcome.value : null;
  const aiErrorCode = vacancyOutcome.status === "rejected" ? classifyAiToolError(vacancyOutcome.reason) : null;

  const checks: CvCheckItem[] = [
    ...parsingChecks(layout, locale),
    ...scoreChecksToItems(scoreOutcome.value.dimensions, layout, locale),
    ...dutchConventionChecks({ cvText, vacancyText, layout, wordCount, locale }),
  ];

  const scores = computeScores({ checks, vacancyScore: vacancy?.score ?? null, locale });

  return {
    scoreVersion: CV_CHECK_SCORE_VERSION,
    locale,
    ...scores,
    checks,
    topFixes: buildTopFixes(checks, vacancy),
    vacancy,
    layout,
    parsePreview: buildParsePreview(cvText),
    // The general report never depends on the AI step; only the vacancy section does.
    aiStatus: vacancyText && !vacancy ? "unavailable" : "ok",
    wordCount,
    aiErrorCode,
  };
}
