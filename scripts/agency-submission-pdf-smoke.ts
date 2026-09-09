import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { createCanvas } from "@napi-rs/canvas";
import { generateAgencySubmissionPDF } from "@/lib/agency-submission-pdf";
import { createDefaultMatchPackSubmission, createMatchPackAnalysis, anonymizeCvData, attachEvidenceReferences } from "@/lib/agency-matchpack";
import { applyEvidenceReviews } from "@/lib/agency-matchpack-review";
import { buildApprovedMatchPackOutput } from "@/lib/agency-output-projection";
import { createMatchPackSource } from "@/lib/agency-matchpack-source";
import { generateAgencySubmissionDOCX } from "@/lib/agency-docx";
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

const source = createMatchPackSource("docx", [
  "Bachelor HRM en zeven jaar HR-ervaring.",
  "Adviseerde 24 teamleiders over HR-vraagstukken.",
  "HR-systemen genoemd, maar AFAS niet expliciet.",
].join("\n"));
const vacancyText = [
  "Hbo werk- en denkniveau",
  "Adviseert het management",
  "Ervaring met AFAS is een pre",
  "Startdatum 1 oktober",
].join("\n");
const referencedResult = attachEvidenceReferences(result, source.text, "docx", vacancyText, source.sourceMap);
const anonymized = anonymizeCvData(candidateData, "nl");
const baseAnalysis = createMatchPackAnalysis(referencedResult, anonymized, { fileType: "docx", digest: source.digest });
const analysis = applyEvidenceReviews(baseAnalysis, referencedResult.requirements.map((requirement, requirementIndex) => ({
  requirementIndex,
  reviewerStatus: requirement.status === "missing" ? "rejected" as const : "confirmed" as const,
  reviewerNote: requirement.status === "missing" ? "Niet aanwezig in het CV." : "",
  reviewedEvidence: requirement.status === "missing" ? "" : requirement.cvEvidence,
  reviewedSource: null,
})), "test-reviewer", source.text, source.sourceMap);
const submission = createDefaultMatchPackSubmission(candidateData, result, "HR-adviseur", "nl");
submission.commercial.hoursPerWeek = "32-36 uur";
submission.commercial.workLocation = "Regio Utrecht / hybride";
submission.clientIntroduction = result.summary;

async function extractGeneratedPdfText(buffer: Buffer): Promise<string> {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useWorkerFetch: false,
    useSystemFonts: true,
  }).promise;
  let text = "";
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();
    // PDF.js already emits actual spaces as text items; inserting a space
    // between every glyph fragment corrupts hyphenated words and addresses.
    text += content.items.map((item) => ("str" in item ? item.str + (item.hasEOL ? " " : "") : "")).join("") + "\n";
  }
  return text;
}

async function renderGeneratedPdf(buffer: Buffer, outputDirectory: string, name: string) {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(buffer), useWorkerFetch: false, useSystemFonts: true }).promise;
  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1.35 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvas: canvas as never, canvasContext: canvas.getContext("2d") as never, viewport }).promise;
    await writeFile(path.join(outputDirectory, `${name}-page-${pageNumber}.png`), canvas.toBuffer("image/png"));
  }
}

async function main() {
  const outputDirectory = path.resolve("output/pdf");
  await mkdir(outputDirectory, { recursive: true });
  const directIdentifiers = [
    candidateData.personal.name,
    candidateData.personal.email,
    candidateData.personal.phone,
    candidateData.personal.address,
    candidateData.personal.postalCode,
  ];
  for (const variant of ["full", "anonymized"] as const) {
    const output = buildApprovedMatchPackOutput({
      candidateData,
      analysis,
      submission,
      vacancyTitle: "HR-adviseur",
      vacancyText,
      sourceText: source.text,
      sourceMap: source.sourceMap,
      locale: "nl",
      variant: variant === "full" ? "full" : "contact_free",
    });
    assert.equal(output.evidence.find((item) => item.requirement.includes("AFAS"))?.qualification, "partial", "partial evidence must remain visibly qualified");
    assert.ok(output.openItems.some((item) => item.requirement.includes("AFAS")), "partly supported requirements must remain visible as open items");
    const pdf = await generateAgencySubmissionPDF({
      output,
      templateId: "professional",
      colorThemeId: "classic-blue",
      companyName: "Voorbeeld Recruitment",
    });
    const outputPath = path.join(outputDirectory, `werkcv-kandidaatvoorstel-${variant}-smoke.pdf`);
    await writeFile(outputPath, pdf);
    await renderGeneratedPdf(pdf, outputDirectory, `werkcv-kandidaatvoorstel-${variant}-smoke`);
    const pdfText = await extractGeneratedPdfText(pdf);
    assert.ok(pdfText.length > 200, `${variant} PDF should contain extractable text`);
    assert.match(pdfText, /HR-adviseur/i, `${variant} PDF should contain the proposal title`);
    assert.match(pdfText, /Deels onderbouwd.*verifiëren/i, `${variant} PDF should label partial evidence without implying the requirement is met`);
    assert.match(pdfText, /Nog te verifiëren/i, `${variant} PDF should expose open items`);
    if (variant === "full") {
      assert.match(pdfText, /Nina de Vries/i, "full PDF should contain the fictional candidate name");
      assert.match(pdfText, /nina\.devries@example\.com/i, "full PDF should contain the fictional email");
    } else {
      for (const identifier of directIdentifiers) {
        assert.doesNotMatch(pdfText, new RegExp(identifier.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), `contact-free PDF must not contain ${identifier}`);
      }
      assert.match(pdfText, /Directe contactgegevens verwijderd/i, "contact-free PDF should retain its warning");
    }

    const docx = await generateAgencySubmissionDOCX({
      output,
      companyName: "Voorbeeld Recruitment",
    });
    const docxPath = path.join(outputDirectory, `werkcv-kandidaatvoorstel-${variant}-smoke.docx`);
    await writeFile(docxPath, docx);
    const zip = await JSZip.loadAsync(docx);
    for (const part of ["[Content_Types].xml", "word/document.xml", "word/styles.xml", "word/numbering.xml", "word/footer1.xml", "word/_rels/document.xml.rels"]) {
      assert.ok(zip.file(part), `${variant} DOCX should contain ${part}`);
    }
    const documentXml = await zip.file("word/document.xml")!.async("string");
    assert.match(documentXml, /HR-adviseur/i, `${variant} DOCX should contain the proposal title`);
    assert.match(documentXml, /Deels onderbouwd[^<]*verifiëren/i, `${variant} DOCX should qualify partial evidence`);
    assert.match(documentXml, /Openstaande punten/i, `${variant} DOCX should expose open items`);
    if (variant === "full") {
      assert.match(documentXml, /nina\.devries@example\.com/i, "full DOCX should contain the fictional email");
    } else {
      assert.doesNotMatch(documentXml, /nina\.devries@example\.com|06 1234 5678|3511 AA/i, "contact-free DOCX must not contain direct identifiers");
      const footerXml = await zip.file("word/footer1.xml")!.async("string");
      assert.match(footerXml, /Opgesteld met WerkCV MatchPack/i, "DOCX footer should be present");
    }
    console.log(`${outputPath}\n${pdf.length} bytes\n${docxPath}\n${docx.length} bytes`);
  }
  console.log("Agency PDF/DOCX output smoke checks passed.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Submission PDF smoke failed");
  process.exitCode = 1;
});
