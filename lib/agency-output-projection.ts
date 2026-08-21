import { z } from "zod";
import { cvSchema, type CVData } from "@/lib/cv";
import {
  anonymizeCvData,
  matchPackSubmissionSchema,
  scrubAnonymizedText,
  scrubKnownCandidateName,
  type MatchPackAnalysis,
  type MatchPackLocale,
  type MatchPackSubmission,
} from "@/lib/agency-matchpack";
import { validateMatchPackReviewForApproval } from "@/lib/agency-matchpack-review";
import { type MatchPackSourceMapV1 } from "@/lib/agency-matchpack-source";
import type { SourceReference } from "@/lib/tools/cv-vacature-match-schema";

const reviewedEvidenceOutputSchema = z.object({
  requirement: z.string().min(1).max(1_000),
  evidence: z.string().min(1).max(600),
  qualification: z.enum(["strong", "partial"]),
  source: z.object({
    page: z.number().int().positive().nullable(),
    line: z.number().int().positive(),
    section: z.string().max(300),
    snippet: z.string().max(500),
    match: z.enum(["exact", "approximate"]),
  }),
});

const openItemOutputSchema = z.object({
  requirement: z.string().min(1).max(1_000),
  action: z.string().min(1).max(1_000),
});

export const approvedMatchPackOutputSchema = z.object({
  version: z.literal(1),
  variant: z.enum(["full", "contact_free"]),
  locale: z.enum(["nl", "en"]),
  vacancyTitle: z.string().max(160),
  candidateData: cvSchema,
  submission: matchPackSubmissionSchema,
  evidence: z.array(reviewedEvidenceOutputSchema),
  openItems: z.array(openItemOutputSchema),
  contactFreeWarning: z.string(),
});

export type ApprovedMatchPackOutput = z.infer<typeof approvedMatchPackOutputSchema>;

export class MatchPackOutputError extends Error {
  constructor(public readonly code: "CONTACT_FREE_VALIDATION_FAILED" | "OUTPUT_INVALID", message: string) {
    super(message);
    this.name = "MatchPackOutputError";
  }
}

function replaceToken(value: string, token: string, replacement: string): string {
  const trimmed = token.trim();
  if (trimmed.length < 2) return value;
  const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return value.replace(new RegExp(escaped, "giu"), replacement);
}

function directTokens(candidate: CVData): string[] {
  const personal = candidate.personal;
  const nameParticles = new Set(["de", "den", "der", "het", "ten", "ter", "van", "von"]);
  const nameParts = personal.name.split(/\s+/u).filter((part) => part.length >= 3 && !nameParticles.has(part.toLocaleLowerCase("nl-NL")));
  return [...new Set([
    personal.name,
    ...nameParts,
    personal.email,
    personal.phone,
    personal.location,
    personal.address,
    personal.postalCode,
    personal.birthDate,
    personal.birthPlace,
    personal.linkedIn,
    personal.github,
    personal.website,
  ].map((value) => value.trim()).filter((value) => value.length >= 2))].sort((a, b) => b.length - a.length);
}

function scrubStructuredStrings<T>(value: T, scrub: (text: string) => string): T {
  if (typeof value === "string") return scrub(value) as T;
  if (Array.isArray(value)) return value.map((item) => scrubStructuredStrings(item, scrub)) as T;
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value as Record<string, unknown>).map(([key, child]) => [
      key,
      scrubStructuredStrings(child, scrub),
    ])) as T;
  }
  return value;
}

function createScrubber(candidate: CVData, locale: MatchPackLocale): (value: string) => string {
  const replacement = locale === "en" ? "the candidate" : "de kandidaat";
  const tokens = directTokens(candidate);
  return (value: string) => {
    let result = scrubKnownCandidateName(scrubAnonymizedText(value, locale), candidate.personal.name, locale);
    for (const token of tokens) result = replaceToken(result, token, replacement);
    return result.replace(/[ \t]{2,}/g, " ").trim();
  };
}

function scrubSubmission(submission: MatchPackSubmission, scrub: (value: string) => string): MatchPackSubmission {
  return matchPackSubmissionSchema.parse({
    ...submission,
    selectedVariant: "anonymized",
    clientIntroduction: scrub(submission.clientIntroduction),
    clientEmailSubject: scrub(submission.clientEmailSubject),
    clientEmailBody: scrub(submission.clientEmailBody),
    recruiterNotes: submission.recruiterNotes,
    commercial: {
      availability: scrub(submission.commercial.availability),
      noticePeriod: scrub(submission.commercial.noticePeriod),
      salaryIndication: scrub(submission.commercial.salaryIndication),
      hoursPerWeek: scrub(submission.commercial.hoursPerWeek),
      workLocation: scrub(submission.commercial.workLocation),
      candidatePreferences: scrub(submission.commercial.candidatePreferences),
    },
  });
}

function assertNoDirectTokens(output: ApprovedMatchPackOutput, candidate: CVData): void {
  const haystack = JSON.stringify(output).toLocaleLowerCase("nl-NL");
  const leaked = directTokens(candidate).find((token) => haystack.includes(token.toLocaleLowerCase("nl-NL")));
  if (leaked) {
    throw new MatchPackOutputError("CONTACT_FREE_VALIDATION_FAILED", "A known direct candidate identifier remains in the contact-free output.");
  }
}

export function scrubContactFreeClientText(value: string, candidateData: CVData, locale: MatchPackLocale): string {
  return createScrubber(cvSchema.parse(candidateData), locale)(value);
}

export function assertContactFreeArtifactText(value: string, candidateData: CVData): void {
  const normalized = value.toLocaleLowerCase("nl-NL");
  if (directTokens(cvSchema.parse(candidateData)).some((token) => normalized.includes(token.toLocaleLowerCase("nl-NL")))) {
    throw new MatchPackOutputError("CONTACT_FREE_VALIDATION_FAILED", "A known direct candidate identifier remains in the contact-free artifact.");
  }
}

export function buildApprovedMatchPackOutput(input: {
  candidateData: CVData;
  analysis: MatchPackAnalysis;
  submission: MatchPackSubmission;
  vacancyTitle: string;
  vacancyText: string;
  sourceText: string;
  sourceMap: MatchPackSourceMapV1;
  locale: MatchPackLocale;
  variant: "full" | "contact_free";
}): ApprovedMatchPackOutput {
  validateMatchPackReviewForApproval({
    analysis: input.analysis,
    sourceText: input.sourceText,
    sourceMap: input.sourceMap,
    vacancyText: input.vacancyText,
  });

  const candidate = cvSchema.parse(input.candidateData);
  const scrub = createScrubber(candidate, input.locale);
  const contactFree = input.variant === "contact_free";
  const sourceShape = (source: SourceReference) => ({
    page: source.sourcePage,
    line: source.sourceLine,
    section: source.sourceSection,
    snippet: source.snippet,
    match: source.match === "exact" ? "exact" as const : "approximate" as const,
  });
  const evidence = input.analysis.result.requirements.flatMap((requirement) => {
    const review = requirement.evidenceReference;
    if (requirement.status === "missing"
      || !review
      || !(["confirmed", "corrected"] as const).includes(review.reviewerStatus as "confirmed" | "corrected")
      || !review.reviewedSource
      || !review.reviewedEvidence.trim()) return [];
    return [{
      requirement: contactFree ? scrub(requirement.requirement) : requirement.requirement,
      evidence: contactFree ? scrub(review.reviewedEvidence) : review.reviewedEvidence,
      qualification: requirement.status === "strong" ? "strong" as const : "partial" as const,
      source: {
        ...sourceShape(review.reviewedSource),
        snippet: contactFree ? scrub(review.reviewedSource.snippet) : review.reviewedSource.snippet,
        section: contactFree ? scrub(review.reviewedSource.sourceSection) : review.reviewedSource.sourceSection,
      },
    }];
  });
  const openItems = input.analysis.result.requirements
    .filter((requirement) => requirement.status !== "strong" || requirement.evidenceReference?.reviewerStatus === "rejected")
    .map((requirement) => ({
      requirement: contactFree ? scrub(requirement.requirement) : requirement.requirement,
      action: contactFree ? scrub(requirement.honestAction) : requirement.honestAction,
    }));

  const output = approvedMatchPackOutputSchema.parse({
    version: 1,
    variant: input.variant,
    locale: input.locale,
    vacancyTitle: contactFree ? scrub(input.vacancyTitle) : input.vacancyTitle,
    candidateData: contactFree
      ? cvSchema.parse(scrubStructuredStrings(anonymizeCvData(candidate, input.locale).data, scrub))
      : candidate,
    submission: contactFree ? scrubSubmission(input.submission, scrub) : input.submission,
    evidence,
    openItems,
    contactFreeWarning: contactFree
      ? (input.locale === "en"
        ? "Direct contact details removed. Review company names, schools and project details before sharing with a client."
        : "Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en projectdetails voordat je dit met een klant deelt.")
      : "",
  });
  if (contactFree) assertNoDirectTokens(output, candidate);
  return output;
}
