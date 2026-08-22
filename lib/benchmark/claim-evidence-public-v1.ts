import { createHash } from "node:crypto";
import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

export type ClaimEvidenceBenchmarkCaseV1 = {
  version: 1;
  caseId: string;
  locale: "nl" | "en";
  occupationalFamily: string;
  seniority: "junior" | "medior" | "senior";
  sourceFormat: "text" | "pdf" | "docx";
  sourceDocumentVersion: string;
  sourceChecksum: string;
  cvText: string;
  proposalText: string;
  claim: {
    text: string;
    start: number;
    end: number;
    expectedVerdict: ProposalClaimVerdict;
    acceptedSourceSpan: { start: number; end: number; text: string } | null;
    errorCategory: string;
    annotationRationale: string;
  };
};

const roles = {
  nl: [
    ["zorg", "Verpleegkundige", "medior"],
    ["technologie", "Softwareontwikkelaar", "senior"],
    ["logistiek", "Logistiek planner", "medior"],
    ["financiën", "Financial controller", "senior"],
    ["onderwijs", "Docent", "junior"],
  ],
  en: [
    ["human-resources", "HR adviser", "senior"],
    ["engineering", "Mechanical engineer", "medior"],
    ["sales", "Account executive", "senior"],
    ["public-sector", "Policy officer", "medior"],
    ["hospitality", "Hotel supervisor", "junior"],
  ],
} as const;

const patterns: Array<{ verdict: ProposalClaimVerdict; category: string }> = [
  { verdict: "supported", category: "supported_paraphrase" },
  { verdict: "partially_supported", category: "inflated_responsibility" },
  { verdict: "unsupported", category: "missing_information" },
  { verdict: "contradicted", category: "incorrect_duration" },
  { verdict: "confirmation_required", category: "current_commercial_fact" },
  { verdict: "not_checkable", category: "subjective_assessment" },
];

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function content(locale: "nl" | "en", role: string, verdict: ProposalClaimVerdict, index: number) {
  if (locale === "nl") {
    if (verdict === "supported") return { cv: `${role}\nWerkervaring\nVoerde maandelijks rapportages uit voor het management.`, proposal: `Deze ${role} maakte maandelijks managementrapportages.`, evidence: "Voerde maandelijks rapportages uit voor het management.", rationale: "De frequentie, activiteit en doelgroep staan letterlijk in het CV." };
    if (verdict === "partially_supported") return { cv: `${role}\nWerkervaring\nOndersteunde de projectleider bij een team van ${index + 4} collega's.`, proposal: `Deze kandidaat leidde zelfstandig een team van ${index + 4} collega's.`, evidence: `Ondersteunde de projectleider bij een team van ${index + 4} collega's.`, rationale: "Het CV ondersteunt betrokkenheid bij het team, maar niet zelfstandig leiderschap." };
    if (verdict === "unsupported") return { cv: `${role}\nWerkervaring\nVerantwoordelijk voor operationele planning en klantcontact.`, proposal: `De kandidaat heeft aantoonbare Power BI-ervaring.`, evidence: null, rationale: "Power BI of een gelijkwaardige activiteit ontbreekt in de bron." };
    if (verdict === "contradicted") return { cv: `${role}\nWerkervaring\nTwee jaar ervaring in deze functie.`, proposal: `De kandidaat heeft vijf jaar ervaring in deze functie.`, evidence: "Twee jaar ervaring in deze functie.", rationale: "De expliciete duur in het voorstel botst met de expliciete duur in het CV." };
    if (verdict === "confirmation_required") return { cv: `${role}\nWerkervaring\nBeschikbaarheids- en salarisgegevens zijn niet opgenomen.`, proposal: `De kandidaat is per direct beschikbaar voor €${70 + index} per uur.`, evidence: null, rationale: "Beschikbaarheid en tarief zijn veranderlijke gegevens die actuele kandidaatbevestiging vereisen." };
    return { cv: `${role}\nWerkervaring\nAdviseerde interne belanghebbenden over dagelijkse vraagstukken.`, proposal: `Deze kandidaat is een uitzonderlijk overtuigende adviseur.`, evidence: null, rationale: "De subjectieve kwaliteitsbeoordeling kan niet uit het CV worden vastgesteld." };
  }
  if (verdict === "supported") return { cv: `${role}\nExperience\nProduced monthly reports for senior management.`, proposal: `This ${role} produced monthly management reports.`, evidence: "Produced monthly reports for senior management.", rationale: "Frequency, activity and audience are explicitly supported by the CV." };
  if (verdict === "partially_supported") return { cv: `${role}\nExperience\nSupported the project lead working with a team of ${index + 4}.`, proposal: `The candidate independently led a team of ${index + 4}.`, evidence: `Supported the project lead working with a team of ${index + 4}.`, rationale: "The CV supports team involvement but not independent leadership." };
  if (verdict === "unsupported") return { cv: `${role}\nExperience\nResponsible for operational planning and client contact.`, proposal: `The candidate has demonstrable Power BI experience.`, evidence: null, rationale: "Power BI or an equivalent activity is absent from the source." };
  if (verdict === "contradicted") return { cv: `${role}\nExperience\nTwo years of experience in this role.`, proposal: `The candidate has five years of experience in this role.`, evidence: "Two years of experience in this role.", rationale: "The explicit proposal duration conflicts with the explicit CV duration." };
  if (verdict === "confirmation_required") return { cv: `${role}\nExperience\nAvailability and rate information are not included.`, proposal: `The candidate is immediately available at €${70 + index} per hour.`, evidence: null, rationale: "Availability and rate are changing facts requiring current candidate acknowledgement." };
  return { cv: `${role}\nExperience\nAdvised internal stakeholders on day-to-day matters.`, proposal: `This candidate is an exceptionally persuasive adviser.`, evidence: null, rationale: "The subjective quality assessment cannot be established from the CV." };
}

export function createPublicClaimEvidenceBenchmarkV1(): ClaimEvidenceBenchmarkCaseV1[] {
  const cases: ClaimEvidenceBenchmarkCaseV1[] = [];
  for (const locale of ["nl", "en"] as const) {
    patterns.forEach((pattern, patternIndex) => {
      roles[locale].forEach(([family, role, seniority], roleIndex) => {
        const generated = content(locale, role, pattern.verdict, roleIndex);
        const claimStart = generated.proposal.indexOf(generated.proposal);
        const evidenceStart = generated.evidence ? generated.cv.indexOf(generated.evidence) : -1;
        const caseIndex = patternIndex * roles[locale].length + roleIndex + 1;
        const cvText = generated.cv;
        cases.push({
          version: 1,
          caseId: `wcv-ceb-v1-${locale}-${String(caseIndex).padStart(2, "0")}`,
          locale,
          occupationalFamily: family,
          seniority,
          sourceFormat: (["text", "pdf", "docx"] as const)[caseIndex % 3],
          sourceDocumentVersion: "1.0.0",
          sourceChecksum: digest(cvText),
          cvText,
          proposalText: generated.proposal,
          claim: {
            text: generated.proposal,
            start: claimStart,
            end: generated.proposal.length,
            expectedVerdict: pattern.verdict,
            acceptedSourceSpan: generated.evidence ? { start: evidenceStart, end: evidenceStart + generated.evidence.length, text: generated.evidence } : null,
            errorCategory: pattern.category,
            annotationRationale: generated.rationale,
          },
        });
      });
    });
  }
  return cases;
}

export const publicClaimEvidenceBenchmarkV1 = createPublicClaimEvidenceBenchmarkV1();
export const publicClaimEvidenceBenchmarkV1Checksum = digest(JSON.stringify(publicClaimEvidenceBenchmarkV1));
