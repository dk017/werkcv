import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { generateAgencySubmissionPDF } from "@/lib/agency-submission-pdf";
import { createDefaultMatchPackSubmission, createMatchPackAnalysis, anonymizeCvData } from "@/lib/agency-matchpack";
import { sampleCV } from "@/lib/cv";

const candidateData = structuredClone(sampleCV);
candidateData.personal.name = "Nina de Vries";
candidateData.personal.title = "HR-adviseur";
candidateData.personal.email = "nina.devries@example.com";
candidateData.personal.phone = "06 1234 5678";
candidateData.personal.location = "Utrecht";
candidateData.personal.address = "Voorbeeldstraat 12";
candidateData.personal.postalCode = "3511 AA";
candidateData.personal.birthDate = "";
candidateData.personal.birthPlace = "";
candidateData.personal.nationality = "";
candidateData.personal.gender = "";
candidateData.personal.maritalStatus = "";
candidateData.personal.linkedIn = "";
candidateData.personal.summary = "HR-adviseur met zeven jaar ervaring in verzuim, medewerkerontwikkeling en praktisch advies aan leidinggevenden.";
candidateData.experience = [
  {
    role: "HR-adviseur",
    company: "Voorbeeldgroep Nederland",
    location: "Utrecht",
    start: "januari 2021",
    end: "heden",
    description: "Adviseert leidinggevenden over verzuim, ontwikkeling en arbeidsvoorwaarden.",
    highlights: [
      "Adviseerde 24 teamleiders over complexe HR-vraagstukken.",
      "Vernieuwde de verzuimwerkwijze en begeleidde de implementatie.",
    ],
  },
  {
    role: "HR-officer",
    company: "Fictiva Services",
    location: "Nieuwegein",
    start: "september 2017",
    end: "december 2020",
    description: "Ondersteunde medewerkers en managers bij instroom, ontwikkeling en HR-administratie.",
    highlights: ["Coördineerde onboarding en verbeterde de kwaliteit van personeelsdossiers."],
  },
];
candidateData.education = [{ degree: "Bachelor Human Resource Management", school: "Hogeschool Utrecht", location: "Utrecht", start: "september 2013", end: "juni 2017", description: "" }];
candidateData.skills = [
  { name: "HR-advies", level: 5 },
  { name: "Verzuimbegeleiding", level: 4 },
  { name: "Arbeidsvoorwaarden", level: 4 },
  { name: "Medewerkerontwikkeling", level: 4 },
];
candidateData.languages = [{ name: "Nederlands", level: "Moedertaal" }, { name: "Engels", level: "Goed" }];
candidateData.internships = [];
candidateData.courses = [{ name: "Regie op verzuim", institution: "Voorbeeld Academie", year: "2024" }];
candidateData.interests = [];
candidateData.properties = ["Analytisch", "Toegankelijk", "Zorgvuldig"];

const result = {
  score: 78,
  scoreBand: "good" as const,
  scoreLabel: "Goede aansluiting",
  summary: "Nina combineert zeven jaar brede HR-ervaring met aantoonbaar advies aan leidinggevenden. Ervaring met AFAS en haar exacte startdatum moeten nog worden bevestigd.",
  perceivedRole: "HR-adviseur",
  perceivedSeniority: "Senior",
  dimensions: [{ id: "relevance" as const, label: "Aansluiting", score: 28, maxScore: 35, explanation: "Meerdere kerneisen zijn aantoonbaar." }],
  strengths: [{ title: "Advieservaring", evidence: "Adviseerde 24 teamleiders." }],
  requirements: [
    { requirement: "Hbo werk- en denkniveau", vacancyEvidence: "Hbo werk- en denkniveau", importance: "essential" as const, status: "strong" as const, cvEvidence: "Bachelor HRM en zeven jaar HR-ervaring.", honestAction: "Geen aanvullende actie nodig." },
    { requirement: "Advies aan leidinggevenden", vacancyEvidence: "Adviseert het management", importance: "essential" as const, status: "strong" as const, cvEvidence: "Adviseerde 24 teamleiders over HR-vraagstukken.", honestAction: "Bespreek een relevant praktijkvoorbeeld." },
    { requirement: "Ervaring met AFAS", vacancyEvidence: "Ervaring met AFAS is een pre", importance: "preferred" as const, status: "partial" as const, cvEvidence: "HR-systemen genoemd, maar AFAS niet expliciet.", honestAction: "Bevestig welke HR-systemen zijn gebruikt." },
    { requirement: "Beschikbaar per 1 oktober", vacancyEvidence: "Startdatum 1 oktober", importance: "essential" as const, status: "missing" as const, cvEvidence: "", honestAction: "Vraag de exacte beschikbaarheid na." },
  ],
  missingKeywords: ["AFAS"],
  topFixes: [{ category: "completeness" as const, title: "Bevestig beschikbaarheid", evidence: "Niet in het CV genoemd.", action: "Vraag dit aan de kandidaat." }],
  limitations: ["De analyse gebruikt alleen de aangeleverde vacature- en CV-tekst."],
};

const anonymized = anonymizeCvData(candidateData, "nl");
const analysis = createMatchPackAnalysis(result, anonymized);
const submission = createDefaultMatchPackSubmission(candidateData, result, "HR-adviseur", "nl");
submission.commercial.hoursPerWeek = "32-36 uur";
submission.commercial.workLocation = "Regio Utrecht / hybride";
submission.clientIntroduction = result.summary;

async function main() {
  const outputDirectory = path.resolve("output/pdf");
  await mkdir(outputDirectory, { recursive: true });
  for (const variant of ["full", "anonymized"] as const) {
    const pdf = await generateAgencySubmissionPDF({
      candidateData: variant === "full" ? candidateData : anonymized.data,
      analysis,
      submission,
      vacancyTitle: "HR-adviseur",
      locale: "nl",
      variant,
      templateId: "professional",
      colorThemeId: "classic-blue",
      companyName: "Voorbeeld Recruitment",
      sourceCandidateName: candidateData.personal.name,
    });
    const outputPath = path.join(outputDirectory, `werkcv-kandidaatvoorstel-${variant}-smoke.pdf`);
    await writeFile(outputPath, pdf);
    console.log(`${outputPath}\n${pdf.length} bytes`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Submission PDF smoke failed");
  process.exitCode = 1;
});
