import { z } from "zod";
import { cvSchema, type CVData } from "@/lib/cv";
import {
  cvVacatureMatchResultSchema,
  evidenceReferenceSchema,
  sourceReferenceSchema,
  type EvidenceReference,
  type CvVacatureMatchResult,
} from "@/lib/tools/cv-vacature-match-schema";
import {
  resolveMatchPackSourceReference,
  type MatchPackSourceMapV1,
} from "@/lib/agency-matchpack-source";

export type MatchPackLocale = "nl" | "en";

export const MATCH_PACK_STATUS = {
  ANALYZED: "analyzed",
  APPROVED: "approved",
} as const;

export const MATCH_PACK_MAX_VACANCY_CHARS = 18_000;
export const MATCH_PACK_MAX_CV_TEXT_CHARS = 40_000;
export const MATCH_PACK_MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MATCH_PACK_MAX_PDF_PAGES = 5;

export const matchPackInputSchema = z.object({
  vacancyTitle: z.string().trim().max(160).default(""),
  vacancyText: z.string().trim().min(120).max(MATCH_PACK_MAX_VACANCY_CHARS),
  locale: z.enum(["nl", "en"]).default("nl"),
});

export type MatchPackInput = z.infer<typeof matchPackInputSchema>;

const optionalSubmissionField = z.string().trim().max(240).default("");

export const matchPackSubmissionSchema = z.object({
  version: z.literal(1),
  clientIntroduction: z.string().trim().min(20).max(2_800),
  clientEmailSubject: z.string().trim().min(3).max(180),
  clientEmailBody: z.string().trim().min(20).max(4_000),
  recruiterNotes: z.string().trim().max(4_000).default(""),
  selectedVariant: z.enum(["full", "anonymized"]).default("full"),
  commercial: z.object({
    availability: optionalSubmissionField,
    noticePeriod: optionalSubmissionField,
    salaryIndication: optionalSubmissionField,
    hoursPerWeek: optionalSubmissionField,
    workLocation: optionalSubmissionField,
    candidatePreferences: z.string().trim().max(800).default(""),
  }),
});

export const matchPackDraftUpdateSchema = z.object({
  candidateData: cvSchema,
  submissionData: matchPackSubmissionSchema,
  evidenceReviews: z.array(z.object({
    requirementIndex: z.number().int().min(0).max(32),
    reviewerStatus: z.enum(["unreviewed", "confirmed", "corrected", "rejected"]),
    reviewerNote: z.string().trim().max(400).default(""),
    reviewedEvidence: z.string().trim().max(600).default(""),
    reviewedSource: sourceReferenceSchema.nullable().default(null),
  })).max(32).default([]),
});

export type MatchPackSubmission = z.infer<typeof matchPackSubmissionSchema>;
export type MatchPackEvidenceReview = z.infer<typeof matchPackDraftUpdateSchema>["evidenceReviews"][number];

export const matchPackAnalysisSchema = z.object({
  version: z.literal(1),
  result: cvVacatureMatchResultSchema,
  source: z.object({
    fileType: z.enum(["pdf", "docx", "unknown"]),
    digest: z.string().max(128),
  }).optional(),
  anonymization: z.object({
    mode: z.literal("direct-identifiers"),
    removedFields: z.array(z.string()).min(1),
    reviewWarning: z.string().min(1),
  }),
});

export type MatchPackAnalysis = z.infer<typeof matchPackAnalysisSchema>;

export const matchPackOutcomeSchema = z.object({
  status: z.enum(["unknown", "pending", "accepted", "rejected", "withdrawn"]),
  note: z.string().trim().max(1_000).refine((value) => !(/[\w.%+-]+@[\w.-]+\.[A-Z]{2,}/iu.test(value) || /https?:\/\//iu.test(value) || /(?<!\w)\+?\d[\d\s().-]{7,}\d(?!\w)/u.test(value)), "Do not include candidate contact details or links in product feedback.").default(""),
  issueCategory: z.enum(["evidence", "parsing", "editing", "pdf", "docx", "privacy", "other"]).default("other"),
  reviewDurationSeconds: z.number().int().nonnegative().nullable().optional(),
  uploadToApprovalSeconds: z.number().int().nonnegative().nullable().optional(),
  correctionsCount: z.number().int().nonnegative().optional(),
  unsupportedClaimsCaught: z.number().int().nonnegative().optional(),
  firstExportedAt: z.string().nullable().optional(),
  approvedToExportSeconds: z.number().int().nonnegative().nullable().optional(),
});

export type MatchPackOutcome = z.infer<typeof matchPackOutcomeSchema>;

function getCandidateReference(candidateData: CVData, locale: MatchPackLocale): string {
  const role = candidateData.personal.title.trim();
  if (role) return role;
  return locale === "en" ? "candidate" : "kandidaat";
}

export function createDefaultMatchPackSubmission(
  candidateData: CVData,
  result: CvVacatureMatchResult,
  vacancyTitle: string,
  locale: MatchPackLocale,
): MatchPackSubmission {
  const role = vacancyTitle.trim() || result.perceivedRole.trim() || getCandidateReference(candidateData, locale);
  const introduction = result.summary.trim() || (locale === "en"
    ? `The candidate profile contains relevant experience for the ${role} role. Review the evidence and missing information before sharing.`
    : `Het kandidaatprofiel bevat relevante ervaring voor de rol ${role}. Controleer het bewijs en de ontbrekende informatie voordat je het deelt.`);
  const subject = locale === "en" ? `Candidate submission: ${role}` : `Kandidaatvoorstel: ${role}`;
  const body = locale === "en"
    ? `Dear hiring manager,\n\nI would like to introduce a candidate for the ${role} role.\n\n${introduction}\n\nThe reviewed candidate profile is attached. I would be happy to discuss the evidence and any remaining questions.\n\nKind regards,`
    : `Beste opdrachtgever,\n\nGraag stel ik een kandidaat voor voor de rol ${role}.\n\n${introduction}\n\nHet gecontroleerde kandidaatprofiel vind je in de bijlage. Ik licht het bewijs en eventuele openstaande punten graag verder toe.\n\nMet vriendelijke groet,`;

  return matchPackSubmissionSchema.parse({
    version: 1,
    clientIntroduction: introduction,
    clientEmailSubject: subject,
    clientEmailBody: body,
    recruiterNotes: "",
    selectedVariant: "full",
    commercial: {
      availability: "",
      noticePeriod: "",
      salaryIndication: "",
      hoursPerWeek: "",
      workLocation: "",
      candidatePreferences: "",
    },
  });
}

export type AnonymizedCvData = {
  data: CVData;
  removedFields: string[];
  reviewWarning: string;
};

const EMAIL_PATTERN = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/giu;
const URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>()]+/giu;
const SOCIAL_URL_PATTERN = /\b(?:linkedin|github)\.com\/[^\s<>()]+/giu;
const POSTAL_CODE_PATTERN = /\b[1-9]\d{3}\s?[A-Z]{2}\b/giu;

function getRedactionCopy(locale: MatchPackLocale) {
  return locale === "en"
    ? {
      contact: "[contact removed]",
      link: "[link removed]",
      postalCode: "[postal code removed]",
      phone: "[phone removed]",
    }
    : {
      contact: "[contact verwijderd]",
      link: "[link verwijderd]",
      postalCode: "[postcode verwijderd]",
      phone: "[telefoon verwijderd]",
    };
}

function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return false;
  if (/^\d{4}\s*[-–]\s*\d{4}$/.test(value.trim())) return false;
  if (/^20\d{2}\s*[-–/]\s*20\d{2}$/.test(value.trim())) return false;
  return /[+().\s-]/.test(value) || digits.length >= 9;
}

const PHONE_CANDIDATE_PATTERN = /(?<!\w)(?:\+?\d[\d\s().-]{7,}\d)(?!\w)/gu;

/**
 * Removes direct contact-like strings from free text after the structured
 * fields have been cleared. It is intentionally conservative: it does not
 * attempt to guess names, employers, schools or project identities.
 */
export function scrubAnonymizedText(value: string, locale: MatchPackLocale = "nl"): string {
  const copy = getRedactionCopy(locale);
  return value
    .replace(EMAIL_PATTERN, copy.contact)
    .replace(URL_PATTERN, copy.link)
    .replace(SOCIAL_URL_PATTERN, copy.link)
    .replace(POSTAL_CODE_PATTERN, copy.postalCode)
    .replace(PHONE_CANDIDATE_PATTERN, (candidate) => (
      looksLikePhone(candidate) ? copy.phone : candidate
    ))
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function scrubKnownCandidateName(
  value: string,
  candidateName: string,
  locale: MatchPackLocale = "nl",
): string {
  const replacement = locale === "en" ? "the candidate" : "de kandidaat";
  const nameParticles = new Set(["de", "den", "der", "het", "ten", "ter", "van", "von"]);
  const parts = candidateName
    .trim()
    .split(/\s+/u)
    .filter((part) => part.length >= 2 && !nameParticles.has(part.toLocaleLowerCase("nl-NL")));
  const candidates = [...new Set([candidateName.trim(), ...parts].filter(Boolean))]
    .sort((left, right) => right.length - left.length);
  if (!candidates.length) return value;
  const pattern = candidates.map(escapeRegex).join("|");

  return value
    .replace(new RegExp(`(?<![\\p{L}\\p{N}])(?:${pattern})(?![\\p{L}\\p{N}])`, "giu"), replacement)
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/**
 * Creates the v1 client-share draft from structured CV data. The returned
 * object always passes the existing CV schema, so the normal PDF renderer can
 * be reused without a second rendering path.
 */
export function anonymizeCvData(input: CVData, locale: MatchPackLocale = "nl"): AnonymizedCvData {
  const source = cvSchema.parse(input);
  const candidateLabel = locale === "en" ? "Candidate profile" : "Kandidaatprofiel";
  const scrub = (value: string): string => scrubKnownCandidateName(
    scrubAnonymizedText(value, locale),
    source.personal.name,
    locale,
  );

  const data: CVData = {
    ...source,
    personal: {
      ...source.personal,
      name: candidateLabel,
      email: "",
      phone: "",
      location: "",
      address: "",
      postalCode: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      gender: "",
      maritalStatus: "",
      linkedIn: "",
      github: "",
      website: "",
      photo: "",
      summary: scrub(source.personal.summary),
    },
    experience: source.experience.map((item) => ({
      ...item,
      location: "",
      description: scrub(item.description),
      highlights: item.highlights.map(scrub).filter(Boolean),
    })),
    education: source.education.map((item) => ({
      ...item,
      location: "",
      description: scrub(item.description),
    })),
    internships: source.internships.map((item) => ({
      ...item,
      location: "",
      description: scrub(item.description),
      highlights: item.highlights.map(scrub).filter(Boolean),
    })),
    interests: source.interests.map(scrub).filter(Boolean),
    properties: (source.properties || []).map(scrub).filter(Boolean),
    skills: source.skills.map((item) => ({ ...item, name: scrub(item.name) })),
    languages: source.languages.map((item) => ({ ...item, name: scrub(item.name) })),
    courses: source.courses.map((item) => ({
      ...item,
      name: scrub(item.name),
      institution: scrub(item.institution),
    })),
    awards: source.awards.map(scrub).filter(Boolean),
    references: [],
    sideActivities: (source.sideActivities || []).map((item) => ({
      ...item,
      title: scrub(item.title),
      organization: scrub(item.organization),
      description: scrub(item.description),
    })),
    customSections: (source.customSections || []).map((section) => ({
      title: scrub(section.title),
      items: section.items.map(scrub).filter(Boolean),
    })),
  };

  const normalized = cvSchema.parse(data);
  const removedFields = [
    locale === "en" ? "Name replaced" : "Naam vervangen",
    locale === "en" ? "Email and phone removed" : "E-mail en telefoon verwijderd",
    locale === "en" ? "Address, postal code and location removed" : "Adres, postcode en locatie verwijderd",
    locale === "en" ? "Birth and personal-status fields removed" : "Geboorte- en persoonlijke statusvelden verwijderd",
    locale === "en" ? "Personal links and photo removed" : "Persoonlijke links en foto verwijderd",
    locale === "en" ? "References removed" : "Referenties verwijderd",
  ];

  return {
    data: normalized,
    removedFields,
    reviewWarning: locale === "en"
      ? "Direct contact details removed. Review company names, schools and project details before sharing with a client."
      : "Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en projectdetails voordat je dit met een klant deelt.",
  };
}

function locateEvidenceReference(
  cvText: string,
  evidence: string,
  sourceMap?: MatchPackSourceMapV1 | null,
): EvidenceReference {
  const reference = resolveMatchPackSourceReference(cvText, evidence, sourceMap);
  return evidenceReferenceSchema.parse({
    ...reference,
    reviewerStatus: "unreviewed",
    reviewerNote: reference.match === "approximate"
      ? "Controleer de bronzin handmatig; de AI-tekst was geen exacte tekstmatch."
      : "",
    reviewedAt: null,
    reviewerId: null,
  });
}

export function attachEvidenceReferences(
  result: CvVacatureMatchResult,
  cvText: string,
  sourceFileType: "pdf" | "docx" | "unknown",
  vacancyText = "",
  sourceMap?: MatchPackSourceMapV1 | null,
): CvVacatureMatchResult {
  const usableSourceMap = sourceFileType === "pdf" || sourceFileType === "docx" ? sourceMap : null;
  return cvVacatureMatchResultSchema.parse({
    ...result,
    requirements: result.requirements.map((requirement) => {
      const evidenceReference = locateEvidenceReference(cvText, requirement.cvEvidence, usableSourceMap);
      const rawVacancyReference = vacancyText.trim()
        ? locateEvidenceReference(vacancyText, requirement.vacancyEvidence)
        : null;
      const vacancyReference = rawVacancyReference
        ? sourceReferenceSchema.parse({
          sourcePage: rawVacancyReference.sourcePage,
          sourceLine: rawVacancyReference.sourceLine,
          sourceSection: rawVacancyReference.sourceSection,
          snippet: rawVacancyReference.snippet,
          match: rawVacancyReference.match,
        })
        : undefined;
      const status = requirement.status === "missing"
        || evidenceReference.match === "not_found"
        || vacancyReference?.match === "not_found"
        ? "missing"
        : requirement.status === "strong"
          && (evidenceReference.match === "approximate" || vacancyReference?.match === "approximate")
          ? "partial"
          : requirement.status;
      return {
        ...requirement,
        status,
        ...(vacancyReference ? { vacancyReference } : {}),
        evidenceReference,
      };
    }),
  });
}

export function createMatchPackAnalysis(
  result: CvVacatureMatchResult,
  anonymization: AnonymizedCvData,
  source?: { fileType: "pdf" | "docx" | "unknown"; digest: string },
): MatchPackAnalysis {
  return matchPackAnalysisSchema.parse({
    version: 1,
    result,
    source,
    anonymization: {
      mode: "direct-identifiers",
      removedFields: anonymization.removedFields,
      reviewWarning: anonymization.reviewWarning,
    },
  });
}

export function parseStoredMatchPackData(value: unknown): CVData {
  return cvSchema.parse(value);
}

export function parseStoredMatchPackAnalysis(value: unknown): MatchPackAnalysis {
  return matchPackAnalysisSchema.parse(value);
}

export function parseStoredMatchPackSubmission(value: unknown): MatchPackSubmission {
  return matchPackSubmissionSchema.parse(value);
}
