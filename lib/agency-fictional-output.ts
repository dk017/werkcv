import { agencyFictionalCandidateData, agencyFictionalExample, fictionalFullCvText } from "./agency-fictional-example";
import { approvedMatchPackOutputSchema } from "./agency-output-projection";
import { anonymizeCvData, scrubKnownCandidateName } from "./agency-matchpack";

/** Offline authored demonstration; never an actual approval or live AI run. */
export function getFictionalOutput(variant: "full" | "contact_free") {
  const scrub = (text: string) => variant === "full" ? text : scrubKnownCandidateName(text, agencyFictionalExample.candidate.name, "nl").replace(/^de kandidaat/, "De kandidaat");
  return approvedMatchPackOutputSchema.parse({
    version: 1, variant, locale: "nl", vacancyTitle: agencyFictionalExample.vacancy.title,
    candidateData: variant === "full" ? agencyFictionalCandidateData : anonymizeCvData(agencyFictionalCandidateData, "nl").data,
    submission: {
      version: 1, selectedVariant: variant === "full" ? "full" : "anonymized", recruiterNotes: "",
      clientIntroduction: scrub(agencyFictionalExample.recruiterIntroduction),
      clientEmailSubject: scrub(agencyFictionalExample.clientEmail.subject), clientEmailBody: scrub(agencyFictionalExample.clientEmail.body),
      commercial: { availability: "Nog te bevestigen", hoursPerWeek: "Nog te bevestigen", workLocation: "Nog te bevestigen", noticePeriod: "", salaryIndication: "", candidatePreferences: "" },
    },
    evidence: agencyFictionalExample.evidence.filter((item) => item.status === "supported").map((item) => ({
      requirement: item.requirement, evidence: item.sourceSnippet, qualification: "strong",
      source: { page: null, line: fictionalFullCvText.split("\n").findIndex((line) => line === item.sourceSnippet) + 1, section: item.sourceSection, snippet: item.sourceSnippet, match: "exact" },
    })),
    openItems: [
      { requirement: "Zelfstandige advieservaring en complexe verzuimdossiers", action: "Duur en specifieke verantwoordelijkheid nog te bevestigen." },
      { requirement: "AFAS en Power BI", action: "Niet aangetoond in het CV." },
      { requirement: "Startdatum en uren", action: "Nog te bevestigen bij de kandidaat." },
    ],
    contactFreeWarning: "Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en projectdetails. Geen garantie op anonimiteit. Volledig fictief voorbeeld.",
  });
}
