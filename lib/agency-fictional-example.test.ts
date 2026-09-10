import assert from "node:assert/strict";
import { proposalMistakes } from "./agency-proposal-mistakes";
import test from "node:test";
import { createHash } from "node:crypto";
import JSZip from "jszip";
import { getFictionalOutput } from "./agency-fictional-output";
import { generateAgencySubmissionDOCX } from "./agency-docx";
import { agencyFictionalExample as fixture, agencyFictionalCandidateData as cv, fictionalDraftReview, fictionalFullCvText, fictionalExampleSourceCanonical, fictionalExampleSourceDigest, fictionalVacancyText } from "./agency-fictional-example";

test("every fictional source quote resolves exactly, with a stable passage digest", () => {
  assert.equal(new Set(fixture.sourceSections.map((source) => source.id)).size, fixture.sourceSections.length);
  for (const source of fixture.sourceSections) assert.ok(fictionalFullCvText.includes(source.snippet));
  for (const evidence of fixture.evidence) if (typeof evidence.sourceSnippet === "string") assert.ok(fictionalFullCvText.includes(evidence.sourceSnippet));
  assert.equal(`sha256:${createHash("sha256").update(JSON.stringify(fictionalExampleSourceCanonical)).digest("hex")}`, fictionalExampleSourceDigest);
});
test("seniority and current facts remain limited, with no dialable contact", () => {
  assert.equal(fixture.evidence.find((item) => item.id === "seniority")?.status, "partially_supported");
  assert.equal(fixture.candidate.hours, "Nog te bevestigen");
  assert.match(fictionalVacancyText, /32–36 uur/);
  assert.equal(cv.personal.phone, "");
  assert.match(cv.personal.email, /@example\.com$/);
  assert.equal(cv.experience[0].start, "januari 2023");
  assert.equal(cv.experience[1].start, "september 2019");
});
test("authored sequence corrects five distinct mistakes without inventing evidence", () => {
  assert.equal(fictionalDraftReview.length, 5);
  const numerical = fictionalDraftReview.find((row) => row.id === "numerical")!;
  assert.match(numerical.draft, /40/); assert.match(numerical.final, /24/);
  assert.doesNotMatch(fixture.recruiterIntroduction + fixture.clientEmail.body, /40 teamleiders|zeven jaar zelfstandig|configureert zelfstandig AFAS/);
  assert.equal(fictionalDraftReview.find((row) => row.id === "current")?.sourceId, null);
});

test("all seven public examples use the same source; employer correction follows the full CV", () => {
  assert.equal(proposalMistakes.length, 7);
  const employer = proposalMistakes[1];
  const achievement = fixture.sourceSections.find((source) => source.id === "experience")!.snippet;
  const actualEmployer = cv.experience.find((entry) => entry.highlights.includes(achievement))!;
  assert.equal(actualEmployer.company, "Fictieve Zorgdiensten");
  assert.ok(employer.correction.includes(actualEmployer.company));
  assert.ok(!employer.claim.includes(actualEmployer.company));
  for (const example of proposalMistakes) {
    for (const match of example.source.matchAll(/‘([^’]+)’/g)) {
      assert.ok(fictionalFullCvText.includes(match[1].replace(/\s*…$/, "")), match[1]);
    }
  }
});

test("both DOCX variants retain source sections and unknown facts without internal notes", async () => {
  for (const variant of ["full", "contact_free"] as const) {
    const output = getFictionalOutput(variant);
    assert.equal(output.submission.commercial.hoursPerWeek, "Nog te bevestigen");
    assert.equal(output.submission.recruiterNotes, "");
    assert.equal(output.evidence.length, 2);
    for (const evidence of output.evidence) assert.equal(fictionalFullCvText.split("\n")[evidence.source.line - 1], evidence.source.snippet);
    const zip = await JSZip.loadAsync(await generateAgencySubmissionDOCX({ output, headerText: fixture.notice }));
    const xml = await zip.file("word/document.xml")!.async("string");
    for (const expected of ["Werkervaring", "Opleiding", "Vaardigheden", "Talen", "Cursussen", "Eigenschappen", "Regie op verzuim", "24 teamleiders", "Nog te bevestigen"]) assert.ok(xml.includes(expected), expected);
    assert.doesNotMatch(xml, /40 teamleiders|configureert zelfstandig AFAS|zeven jaar zelfstandig/);
    if (variant === "contact_free") assert.doesNotMatch(xml, /nina\.devries@example\.com|Nina de Vries/);
  }
});

test("DOCX retains every populated optional CV section used by the PDF export", async () => {
  const output = getFictionalOutput("full");
  output.candidateData.internships = [{
    role: "HR-stagiair", company: "Fictieve Zorggroep", location: "Utrecht", start: "2021", end: "2022",
    description: "Ondersteunde het HR-team bij een fictief project.", highlights: ["Maakte een fictieve rapportage."],
  }];
  output.candidateData.education[0].description = "Specialisatie in arbeidsrecht en organisatieontwikkeling.";
  output.candidateData.interests = ["Lezen", "Wandelen"];
  output.candidateData.awards = ["Fictieve kwaliteitsprijs 2024"];
  output.candidateData.sideActivities = [{ title: "Vrijwilliger", organization: "Fictieve stichting", start: "2020", end: "heden", description: "Begeleidt een fictief initiatief." }];
  output.candidateData.customSections = [{ title: "Beschikbaarheid", items: ["Start in oktober"] }];

  const zip = await JSZip.loadAsync(await generateAgencySubmissionDOCX({ output }));
  const xml = await zip.file("word/document.xml")!.async("string");
  for (const expected of [
    "Stages", "HR-stagiair", "Fictieve Zorggroep", "Ondersteunde het HR-team bij een fictief project.",
    "Specialisatie in arbeidsrecht en organisatieontwikkeling.", "Interesses", "Lezen", "Wandelen",
    "Prestaties", "Fictieve kwaliteitsprijs 2024", "Nevenactiviteiten", "Vrijwilliger", "Beschikbaarheid", "Start in oktober",
  ]) assert.ok(xml.includes(expected), expected);
});
