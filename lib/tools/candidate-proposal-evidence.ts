import type { CvMatchLocale } from "@/lib/tools/cv-vacature-match";
import type { CvVacatureEvidenceResult } from "@/lib/tools/cv-vacature-match-schema";

export type EvidenceMatch = "exact" | "approximate" | "not_found";

export type SourceReference = {
  line: number | null;
  section: string;
  snippet: string;
  match: EvidenceMatch;
};

export type ProposalEvidenceStatus = "supported" | "review" | "missing";

export type CandidateProposalEvidenceRow = {
  requirement: string;
  importance: "essential" | "preferred";
  status: ProposalEvidenceStatus;
  statusLabel: string;
  vacancy: SourceReference;
  cv: SourceReference;
  sourceClaim: string;
  action: string;
};

export type CandidateProposalEvidenceReport = {
  requirements: CandidateProposalEvidenceRow[];
  summary: {
    total: number;
    supported: number;
    review: number;
    missing: number;
    exactCvReferences: number;
    sourceChecks: number;
  };
  limitations: string[];
};

function normalize(value: string): string {
  return value
    .toLocaleLowerCase("nl-NL")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’‘]/g, "'")
    .replace(/[^\p{L}\p{N}%+.#/\-\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function significantTokens(value: string): string[] {
  const stopWords = new Set([
    "een", "het", "de", "van", "voor", "met", "aan", "als", "bij", "en", "of", "op", "in",
    "the", "a", "an", "of", "for", "with", "and", "or", "to", "in", "from",
  ]);
  return [...new Set(normalize(value).split(" ").filter((token) => token.length >= 3 && !stopWords.has(token)))];
}

function guessSection(lines: string[], index: number, locale: CvMatchLocale): string {
  const sectionLabels = locale === "en"
    ? ["profile", "summary", "experience", "employment", "education", "skills", "languages", "certifications", "projects"]
    : ["profiel", "samenvatting", "werkervaring", "ervaring", "opleiding", "vaardigheden", "competenties", "talen", "certificaten", "projecten"];

  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const candidate = lines[cursor]?.trim() || "";
    const normalized = normalize(candidate);
    if (!candidate || candidate.length > 72 || /[.!?]$/.test(candidate)) continue;
    if (sectionLabels.some((label) => normalized === label || normalized.startsWith(`${label} `))) return candidate;
    if (candidate.split(/\s+/u).length <= 5 && /^[A-ZÀ-ÖØ-Þ0-9][^.!?]{1,70}$/u.test(candidate)) return candidate;
  }
  return locale === "en" ? "CV source" : "CV-bron";
}

function emptyReference(locale: CvMatchLocale): SourceReference {
  return {
    line: null,
    section: locale === "en" ? "Not found in source" : "Niet gevonden in bron",
    snippet: "",
    match: "not_found",
  };
}

/**
 * Locate the model's proposed quote in the actual source text. We only display
 * a source snippet from this resolver, never the model's quote by itself.
 * That keeps the free checker honest when an analysis paraphrases or invents a
 * quote: it becomes an explicit review or missing-evidence state.
 */
export function locateSourceReference(
  sourceText: string,
  proposedQuote: string,
  locale: CvMatchLocale,
): SourceReference {
  const lines = sourceText
    .split(/\r?\n/)
    .map((line, index) => ({ text: line.trim(), line: index + 1 }))
    .filter((entry) => Boolean(entry.text));
  const lineTexts = lines.map((entry) => entry.text);
  const normalizedQuote = normalize(proposedQuote);
  if (!normalizedQuote || !lines.length) return emptyReference(locale);

  const exactIndex = lineTexts.findIndex((line) => normalize(line).includes(normalizedQuote));
  if (exactIndex >= 0) {
    return {
      line: lines[exactIndex].line,
      section: guessSection(lineTexts, exactIndex, locale),
      snippet: lineTexts[exactIndex].slice(0, 500),
      match: "exact",
    };
  }

  const quoteTokens = new Set(significantTokens(proposedQuote));
  if (!quoteTokens.size) return emptyReference(locale);

  let bestIndex = -1;
  let bestScore = 0;
  lineTexts.forEach((line, index) => {
    const lineTokens = new Set(significantTokens(line));
    const overlap = [...quoteTokens].filter((token) => lineTokens.has(token)).length / quoteTokens.size;
    if (overlap > bestScore) {
      bestScore = overlap;
      bestIndex = index;
    }
  });

  if (bestIndex < 0 || bestScore < 0.45) return emptyReference(locale);
  return {
    line: lines[bestIndex].line,
    section: guessSection(lineTexts, bestIndex, locale),
    snippet: lineTexts[bestIndex].slice(0, 500),
    match: "approximate",
  };
}

function getStatusLabel(status: ProposalEvidenceStatus, locale: CvMatchLocale): string {
  if (locale === "en") {
    return status === "supported" ? "Strong · review" : status === "review" ? "Partial · review" : "Not demonstrated";
  }
  return status === "supported" ? "Sterk · review" : status === "review" ? "Gedeeltelijk · review" : "Niet aangetoond";
}

function getAction(status: ProposalEvidenceStatus, locale: CvMatchLocale): string {
  if (locale === "en") {
    if (status === "missing") return "Ask the candidate directly or keep this as an open point. Do not add the claim without a source.";
    if (status === "review") return "Open the source line and check scope, level, date and context before sharing.";
    return "Confirm that the source covers the exact requirement and mark it reviewed before sending.";
  }
  if (status === "missing") return "Vraag dit expliciet na of laat het als open punt staan. Voeg de claim niet toe zonder bron.";
  if (status === "review") return "Open de bronregel en controleer scope, niveau, actualiteit en context vóór verzending.";
  return "Controleer of de bron de exacte eis en relevante context dekt en markeer deze daarna als beoordeeld.";
}

function getStatus(
  requirement: CvVacatureEvidenceResult["requirements"][number],
  vacancyReference: SourceReference,
  cvReference: SourceReference,
): ProposalEvidenceStatus {
  if (requirement.status === "missing" || cvReference.match === "not_found") return "missing";
  if (vacancyReference.match === "not_found") return "review";
  if (requirement.status === "strong" && cvReference.match === "exact") return "supported";
  return "review";
}

export function buildCandidateProposalEvidenceReport(
  result: CvVacatureEvidenceResult,
  cvText: string,
  vacancyText: string,
  locale: CvMatchLocale,
): CandidateProposalEvidenceReport {
  const requirements = result.requirements.slice(0, 10).map((requirement) => {
    const vacancyReference = locateSourceReference(vacancyText, requirement.vacancyEvidence, locale);
    const cvReference = locateSourceReference(cvText, requirement.cvEvidence, locale);
    const status = getStatus(requirement, vacancyReference, cvReference);
    return {
      requirement: requirement.requirement,
      importance: requirement.importance,
      status,
      statusLabel: getStatusLabel(status, locale),
      vacancy: vacancyReference,
      cv: cvReference,
      sourceClaim: requirement.cvEvidence.trim(),
      action: getAction(status, locale),
    } satisfies CandidateProposalEvidenceRow;
  });

  return {
    requirements,
    summary: {
      total: requirements.length,
      supported: requirements.filter((item) => item.status === "supported").length,
      review: requirements.filter((item) => item.status === "review").length,
      missing: requirements.filter((item) => item.status === "missing").length,
      exactCvReferences: requirements.filter((item) => item.cv.match === "exact").length,
      sourceChecks: requirements.filter((item) => item.vacancy.match !== "not_found" && item.cv.match !== "not_found").length,
    },
    limitations: locale === "en"
      ? [
        "This is a first-pass text analysis, not proof that a candidate has the claimed experience.",
        "Line references are based on extracted text. Always verify the original CV and the candidate's current information.",
        "A missing quote can mean the source is incomplete, not that the candidate lacks the experience.",
        "The result must not be used as an automated hiring or rejection decision.",
      ]
      : [
        "Dit is een eerste tekstcontrole, geen bewijs dat een kandidaat de geclaimde ervaring daadwerkelijk heeft.",
        "Regelverwijzingen zijn gebaseerd op uitgelezen tekst. Controleer altijd het originele CV en actuele kandidaatdata.",
        "Een ontbrekende quote kan betekenen dat de bron onvolledig is, niet dat de kandidaat de ervaring mist.",
        "Gebruik de uitslag niet als automatische aanname- of afwijzingsbeslissing.",
      ],
  };
}
