import { agencyFictionalExample } from "@/lib/agency-fictional-example";
import { buildCandidateProposalEvidenceReport, type CandidateProposalEvidenceReport } from "@/lib/tools/candidate-proposal-evidence";
import type { CvVacatureEvidenceResult } from "@/lib/tools/cv-vacature-match-schema";
import { getAgencyReviewScopeNotice } from "@/lib/agency-review-scope";
type CvMatchLocale = "nl" | "en";

const sourceSnippet = (id: (typeof agencyFictionalExample.sourceSections)[number]["id"]): string =>
  agencyFictionalExample.sourceSections.find((source) => source.id === id)?.snippet ?? "";

const SAMPLE_VACANCY = [
  `VACATURE — ${agencyFictionalExample.vacancy.title}`,
  `${agencyFictionalExample.vacancy.organisation} zoekt een ${agencyFictionalExample.vacancy.title} voor ${agencyFictionalExample.vacancy.hours} in Utrecht.`,
  "",
  "Functie-eisen",
  ...agencyFictionalExample.evidence.map((claim, index) => `${index + 1}. ${claim.requirement}.`),
].join("\n");

const SAMPLE_CV = [
  agencyFictionalExample.candidate.name,
  `${agencyFictionalExample.candidate.role} | Utrecht`,
  "",
  "PROFIEL",
  sourceSnippet("profile"),
  "",
  "WERKERVARING",
  sourceSnippet("experience"),
  "",
  "OPLEIDING",
  sourceSnippet("education"),
  "",
  "VAARDIGHEDEN",
  sourceSnippet("systems"),
].join("\n");

const sampleStatus: Record<(typeof agencyFictionalExample.evidence)[number]["status"], CvVacatureEvidenceResult["requirements"][number]["status"]> = {
  supported: "strong",
  partially_supported: "partial",
  unsupported: "missing",
  confirmation_required: "missing",
};

const SAMPLE_RESULT: CvVacatureEvidenceResult = {
  summary: agencyFictionalExample.recruiterIntroduction,
  perceivedRole: agencyFictionalExample.candidate.role,
  perceivedSeniority: "senior",
  strengths: [{ title: "Advieservaring", evidence: sourceSnippet("experience") }],
  requirements: agencyFictionalExample.evidence.map((claim) => ({
    requirement: claim.requirement,
    vacancyEvidence: claim.requirement,
    importance: "essential" as const,
    status: sampleStatus[claim.status],
    cvEvidence: claim.sourceSnippet ?? "",
    honestAction: claim.nextAction,
  })),
  missingKeywords: ["AFAS", "Power BI"],
  topFixes: [{ category: "completeness", title: "Bevestig ontbrekende punten", evidence: "Niet ieder punt staat concreet in het CV.", action: "Vraag dit na bij de kandidaat." }],
  limitations: ["De analyse gebruikt alleen de aangeleverde vacature- en CV-tekst."],
};


const EN_PROFILE = "Senior HR adviser with seven years of experience in absence management, organisational change and HR advice.";
const EN_EXPERIENCE = "Advised 24 team leaders on absence, development and employment conditions.";
const EN_SYSTEMS = "HR systems: personnel administration, absence recording and reporting.";
const EN_EDUCATION = "Bachelor of Human Resource Management, Middenland University of Applied Sciences.";
const EN_CV = ["Nina de Vries", "Senior HR adviser | Utrecht", "", "PROFILE", EN_PROFILE, "", "EXPERIENCE", EN_EXPERIENCE, "", "EDUCATION", EN_EDUCATION, "", "SKILLS", EN_SYSTEMS].join("\n");
const EN_REQUIREMENTS: CvVacatureEvidenceResult["requirements"] = [
  { requirement: "Completed bachelor's degree in HRM", vacancyEvidence: "Completed bachelor's degree in HRM", importance: "essential", status: "strong", cvEvidence: EN_EDUCATION, honestAction: "Retain; check the original qualification." },
  { requirement: "At least five years as an independent HR adviser", vacancyEvidence: "At least five years as an independent HR adviser", importance: "essential", status: "partial", cvEvidence: EN_PROFILE, honestAction: "The CV states seven years but does not establish independent responsibility. Check employment periods and scope." },
  { requirement: "Advising at least twenty team leaders", vacancyEvidence: "Advising at least twenty team leaders", importance: "essential", status: "strong", cvEvidence: EN_EXPERIENCE, honestAction: "Retain after checking the original CV." },
  { requirement: "Experience with complex absence cases", vacancyEvidence: "Experience with complex absence cases", importance: "essential", status: "partial", cvEvidence: EN_PROFILE, honestAction: "Absence management is stated, but case complexity is not. Ask for specific examples." },
  { requirement: "Independently configuring AFAS workflows", vacancyEvidence: "Independently configuring AFAS workflows", importance: "essential", status: "missing", cvEvidence: EN_SYSTEMS, honestAction: "The CV names general HR systems, not AFAS configuration. Do not present this as demonstrated experience." },
  { requirement: "Available from 1 October", vacancyEvidence: "Available from 1 October", importance: "essential", status: "missing", cvEvidence: "", honestAction: "Ask the candidate. Availability changes and is absent from this CV." },
  { requirement: "Building HR dashboards in Power BI", vacancyEvidence: "Building HR dashboards in Power BI", importance: "essential", status: "missing", cvEvidence: EN_SYSTEMS, honestAction: "General reporting is not evidence of building Power BI dashboards. Ask for specific experience." },
];
const EN_VACANCY = ["VACANCY — Senior HR adviser", "Stadshaven Care Group (fictional) seeks an adviser for 32–36 hours per week in Utrecht.", "", "Requirements", ...EN_REQUIREMENTS.map((row, i) => `${i + 1}. ${row.requirement}.`)].join("\n");
const EN_RESULT: CvVacatureEvidenceResult = {
  summary: "Nina's CV states seven years of HR experience and advice to 24 team leaders. AFAS, Power BI and current availability still need checking.",
  perceivedRole: "Senior HR adviser",
  perceivedSeniority: "senior",
  strengths: [{ title: "Advisory experience", evidence: EN_EXPERIENCE }],
  requirements: EN_REQUIREMENTS,
  missingKeywords: ["AFAS", "Power BI"],
  topFixes: [{ category: "completeness", title: "Check open points", evidence: "Specific systems and availability are not established.", action: "Ask the candidate; do not add unsupported experience." }],
  limitations: ["Fictional illustration, not a live model evaluation."],
};

export function getAgencyEvidenceSample(locale: CvMatchLocale) {
  return locale === "en"
    ? { title: "Senior HR adviser", cvText: EN_CV, vacancyText: EN_VACANCY, result: EN_RESULT }
    : { title: "Senior HR-adviseur", cvText: SAMPLE_CV, vacancyText: SAMPLE_VACANCY, result: SAMPLE_RESULT };
}

export function getSampleReport(locale: CvMatchLocale): CandidateProposalEvidenceReport {
  const sample = getAgencyEvidenceSample(locale);
  const report = buildCandidateProposalEvidenceReport(sample.result, sample.cvText, sample.vacancyText, locale);
  return { ...report, limitations: [getAgencyReviewScopeNotice(locale), ...report.limitations] };
}
