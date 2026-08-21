import assert from "node:assert/strict";
import {
  anonymizeCvData,
  attachEvidenceReferences,
  createDefaultMatchPackSubmission,
  createMatchPackAnalysis,
  matchPackDraftUpdateSchema,
  matchPackInputSchema,
  matchPackSubmissionSchema,
  scrubAnonymizedText,
  scrubKnownCandidateName,
} from "@/lib/agency-matchpack";
import { cvSchema, sampleCV } from "@/lib/cv";
import { cvDataFromCsvRow, parseCsv } from "@/lib/agency-csv";

function fixtureResult() {
  return {
    score: 72,
    scoreBand: "good" as const,
    scoreLabel: "Goede match",
    summary: "Het profiel sluit aan op de kern van de functie en bevat relevante voorbeelden.",
    perceivedRole: "Software engineer",
    perceivedSeniority: "Senior",
    dimensions: [
      { id: "relevance" as const, label: "Aansluiting", score: 26, maxScore: 35, explanation: "Eisen uit de vacature." },
    ],
    strengths: [{ title: "Relevante ervaring", evidence: "Bouwde en verbeterde systemen." }],
    requirements: [{
      requirement: "Java",
      vacancyEvidence: "Ervaring met Java vereist.",
      importance: "essential" as const,
      status: "strong" as const,
      cvEvidence: "Java in skills en ervaring.",
      honestAction: "Maak het concrete resultaat zichtbaar.",
    }],
    missingKeywords: ["Docker"],
    topFixes: [{
      category: "evidence" as const,
      title: "Maak resultaten concreter",
      evidence: "De vacature vraagt om aantoonbare resultaten.",
      action: "Voeg alleen echte resultaten toe.",
    }],
    limitations: ["Geen ATS-garantie."],
  };
}

const source = structuredClone(sampleCV);
source.personal.email = "candidate@example.com";
source.personal.phone = "+31 6 1234 5678";
source.personal.location = "Utrecht";
source.personal.address = "Voorbeeldstraat 12";
source.personal.postalCode = "1234 AB Utrecht";
source.personal.linkedIn = "https://linkedin.com/in/candidate";
source.personal.summary = "Mail candidate@example.com of bel +31 6 1234 5678. Werk aan https://example.com.";
source.experience[0] = {
  ...source.experience[0],
  highlights: ["Behaalde 20% groei; mail candidate@example.com voor details."],
};

const anonymized = anonymizeCvData(source, "nl");
assert.equal(source.personal.email, "candidate@example.com", "the source object must not be mutated");
assert.equal(anonymized.data.personal.name, "Kandidaatprofiel");
assert.equal(anonymized.data.personal.email, "");
assert.equal(anonymized.data.personal.phone, "");
assert.equal(anonymized.data.personal.location, "");
assert.equal(anonymized.data.personal.address, "");
assert.equal(anonymized.data.personal.postalCode, "");
assert.equal(anonymized.data.personal.linkedIn, "");
assert.equal(anonymized.data.references?.length, 0);
assert.match(anonymized.data.personal.summary, /contact verwijderd/);
assert.match(anonymized.data.personal.summary, /telefoon verwijderd/);
assert.match(anonymized.data.personal.summary, /link verwijderd/);
assert.match(anonymized.data.experience[0]?.highlights[0] || "", /contact verwijderd/);
assert.equal(anonymized.data.experience[0]?.company, source.experience[0]?.company, "v1 keeps employer names for recruiter review");
assert.equal(cvSchema.safeParse(anonymized.data).success, true, "anonymized output must remain editor/PDF compatible");
const englishAnonymized = anonymizeCvData(source, "en");
assert.equal(englishAnonymized.data.personal.name, "Candidate profile");
assert.match(englishAnonymized.data.personal.summary, /contact removed/);

const longVacancy = "Java developer vacature met verantwoordelijkheden en eisen. ".repeat(4);
assert.equal(matchPackInputSchema.safeParse({ vacancyText: longVacancy, locale: "nl" }).success, true);
assert.equal(matchPackInputSchema.safeParse({ vacancyText: "te kort", locale: "nl" }).success, false);
assert.equal(matchPackInputSchema.safeParse({ vacancyText: "x".repeat(18_001), locale: "nl" }).success, false);

const analysis = createMatchPackAnalysis(fixtureResult(), anonymized);
assert.equal(analysis.version, 1);
assert.equal(analysis.result.requirements[0]?.status, "strong");
assert.ok(analysis.anonymization.removedFields.length > 0);
const traceFixture = fixtureResult();
traceFixture.requirements[0].cvEvidence = "Java";
const traced = attachEvidenceReferences(traceFixture, "Skills\nJava\nDocker\n", "docx", "Ervaring met Java vereist.\nErvaring met Docker.");
assert.equal(traced.requirements[0]?.evidenceReference?.sourceLine, 2, "evidence references keep a source line");
assert.equal(traced.requirements[0]?.evidenceReference?.snippet, "Java");
assert.equal(traced.requirements[0]?.evidenceReference?.reviewerStatus, "unreviewed");
assert.equal(traced.requirements[0]?.vacancyReference?.sourceLine, 1, "vacancy evidence references keep a source line");
assert.equal(traced.requirements[0]?.vacancyReference?.snippet, "Ervaring met Java vereist.");
const unsupported = attachEvidenceReferences(traceFixture, "Skills\nPython\n", "docx", "Ervaring met Java vereist.");
assert.equal(unsupported.requirements[0]?.status, "missing", "unresolved generated evidence must not remain strong");
const csvRows = parseCsv('title,name,professionalTitle,skills\r\nSample CV,Alex Example,HR adviseur,"AFAS|Power BI"\r\n');
assert.equal(csvRows[0]?.skills, "AFAS|Power BI");
assert.equal(cvDataFromCsvRow(csvRows[0] || {}).skills.length, 2, "CSV skills are imported as separate skills");
assert.match(scrubAnonymizedText("candidate@example.com +31 6 1234 5678 https://example.com"), /contact verwijderd/);
assert.match(scrubAnonymizedText("candidate@example.com +31 6 1234 5678 https://example.com", "en"), /contact removed/);
const scrubbedName = scrubKnownCandidateName("Nina de Vries heeft ervaring. Nina is beschikbaar.", "Nina de Vries", "nl");
assert.doesNotMatch(scrubbedName, /Nina|Vries/i);
assert.doesNotMatch(scrubbedName, /kandidaat kandidaat/i);

const submission = createDefaultMatchPackSubmission(source, fixtureResult(), "Senior software engineer", "nl");
assert.equal(submission.version, 1);
assert.match(submission.clientEmailSubject, /Senior software engineer/);
assert.equal(submission.commercial.availability, "", "commercial facts must stay empty until a recruiter confirms them");
assert.equal(matchPackSubmissionSchema.safeParse(submission).success, true);
assert.equal(matchPackDraftUpdateSchema.safeParse({ candidateData: source, submissionData: submission }).success, true);
assert.equal(matchPackSubmissionSchema.safeParse({ ...submission, clientIntroduction: "te kort" }).success, false);

console.log("MatchPack submission smoke checks passed.");
