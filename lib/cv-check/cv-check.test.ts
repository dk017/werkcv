import assert from "node:assert/strict";
process.env.OPENAI_API_KEY ||= "test-key-not-used";
import test from "node:test";
import JSZip from "jszip";
import { dutchConventionChecks } from "./dutch";
import { docxLayoutSignals, emptyLayoutSignals, twoColumnShareFromItems } from "./layout";
import { categoryScore, computeScores, gradeBand, rankFailedChecks, toGrade } from "./score";
import type { CvCheckItem } from "./types";

// All CV text below is fictional.
const baseCv = [
  "Sanne de Vries",
  "Utrecht | sanne.voorbeeld@example.com | 06-12345678",
  "Opleiding",
  "MBO 4 Commercieel medewerker, ROC Midden Nederland (2021)",
  "Talen",
  "Nederlands (moedertaal), Engels (C1)",
].join("\n");

function check(overrides: Partial<CvCheckItem>): CvCheckItem {
  return {
    id: "x",
    category: "content",
    severity: "important",
    status: "pass",
    weight: 1,
    label: "x",
    evidence: null,
    fix: null,
    ...overrides,
  };
}

function find(checks: CvCheckItem[], id: string): CvCheckItem {
  const found = checks.find((item) => item.id === id);
  assert.ok(found, `missing check ${id}`);
  return found;
}

test("grade maps 0–100 to a Dutch 1–10 grade with bands", () => {
  assert.equal(toGrade(0), 1);
  assert.equal(toGrade(100), 10);
  assert.equal(toGrade(50), 5.5);
  assert.equal(gradeBand(5.4), "onvoldoende");
  assert.equal(gradeBand(6.9), "voldoende");
  assert.equal(gradeBand(8.4), "goed");
  assert.equal(gradeBand(8.5), "uitstekend");
});

test("category score uses weights and partial credit, ignoring info and n/a checks", () => {
  const checks = [
    check({ weight: 3, status: "pass" }),
    check({ weight: 1, status: "fail", credit: 0.5 }),
    check({ weight: 5, status: "info" }),
    check({ weight: 5, status: "not_applicable" }),
  ];
  assert.equal(categoryScore(checks, "content"), Math.round((3.5 / 4) * 100));
  assert.equal(categoryScore([], "dutch"), 100);
});

test("a failed critical check caps the grade below a pass", () => {
  const checks = [
    check({ category: "parsing", weight: 1, status: "pass" }),
    check({ category: "dutch", severity: "critical", weight: 1, status: "fail" }),
  ];
  const scores = computeScores({ checks, vacancyScore: null, locale: "nl" });
  assert.ok(scores.grade <= 5.4, `grade ${scores.grade}`);
});

test("vacancy mode weights the match at 50%", () => {
  const checks = [check({ category: "parsing", status: "pass" }), check({ category: "content", status: "pass" }), check({ category: "dutch", status: "pass" })];
  const scores = computeScores({ checks, vacancyScore: 0, locale: "nl" });
  assert.equal(scores.generalScore, 100);
  assert.equal(scores.score, 50);
});

test("failed checks rank critical first, then by points lost", () => {
  const ranked = rankFailedChecks([
    check({ id: "tip", severity: "tip", status: "fail", weight: 10, fix: "a" }),
    check({ id: "important-small", severity: "important", status: "fail", weight: 1, fix: "b" }),
    check({ id: "important-big", severity: "important", status: "fail", weight: 5, fix: "c" }),
    check({ id: "critical", severity: "critical", status: "fail", weight: 1, fix: "d" }),
    check({ id: "no-fix", severity: "critical", status: "fail", weight: 9, fix: null }),
  ]);
  assert.deepEqual(ranked.map((item) => item.id), ["critical", "important-big", "important-small", "tip"]);
});

test("Dutch checks: languages with levels pass; missing levels get half credit", () => {
  const layout = emptyLayoutSignals("text");
  const good = dutchConventionChecks({ cvText: baseCv, vacancyText: null, layout, wordCount: 400, locale: "nl" });
  assert.equal(find(good, "nl_language_levels").status, "pass");

  const noLevels = dutchConventionChecks({
    cvText: baseCv.replace("Nederlands (moedertaal), Engels (C1)", "Nederlands, Engels"),
    vacancyText: null,
    layout,
    wordCount: 400,
    locale: "nl",
  });
  const languageCheck = find(noLevels, "nl_language_levels");
  assert.equal(languageCheck.status, "fail");
  assert.equal(languageCheck.credit, 0.5);
});

test("Dutch checks: BSN or IBAN on a CV is critical; optional details are neutral info", () => {
  const cv = `${baseCv}\nBSN: 123456782\nGeboortedatum: 1 januari 2000\nNationaliteit: Nederlandse`;
  const checks = dutchConventionChecks({ cvText: cv, vacancyText: null, layout: emptyLayoutSignals("text"), wordCount: 400, locale: "nl" });
  const sensitive = find(checks, "nl_no_sensitive_ids");
  assert.equal(sensitive.status, "fail");
  assert.equal(sensitive.severity, "critical");
  const optional = find(checks, "nl_optional_personal_details");
  assert.equal(optional.status, "info");
  assert.equal(optional.weight, 0);
});

test("Dutch checks: VOG/BIG/licence only apply when the role signals them", () => {
  const layout = emptyLayoutSignals("text");
  const office = dutchConventionChecks({ cvText: baseCv, vacancyText: null, layout, wordCount: 400, locale: "nl" });
  assert.equal(find(office, "nl_vog").status, "not_applicable");
  assert.equal(find(office, "nl_big").status, "not_applicable");
  assert.equal(find(office, "nl_driving_licence").status, "not_applicable");

  const vacancy = "Pedagogisch medewerker kinderopvang. Je bent in het bezit van rijbewijs B en een geldige VOG. ".repeat(3);
  const care = dutchConventionChecks({ cvText: baseCv, vacancyText: vacancy, layout, wordCount: 400, locale: "nl" });
  assert.equal(find(care, "nl_vog").status, "fail");
  const licence = find(care, "nl_driving_licence");
  assert.equal(licence.status, "fail");
  assert.equal(licence.severity, "important");
});

test("Dutch checks: 'zorgvuldig' and 'verzorgd' do not trigger the VOG tip", () => {
  const cv = `${baseCv}\nRegistreerde zorgvuldig alle klantcontacten en leverde verzorgde rapportages.`;
  const checks = dutchConventionChecks({ cvText: cv, vacancyText: null, layout: emptyLayoutSignals("text"), wordCount: 400, locale: "nl" });
  assert.equal(find(checks, "nl_vog").status, "not_applicable");
});

test("Dutch checks: 'big data' is not a BIG registration", () => {
  const cv = `${baseCv}\nVerpleegkundige met interesse in big data`;
  const checks = dutchConventionChecks({ cvText: cv, vacancyText: null, layout: emptyLayoutSignals("text"), wordCount: 400, locale: "nl" });
  assert.equal(find(checks, "nl_big").status, "fail");
});

test("two-column detection counts rows with separated left and right blocks", () => {
  const width = 600;
  const item = (str: string, x: number, y: number, w = 150) => ({ str, transform: [1, 0, 0, 1, x, y], width: w });
  const twoColumn = twoColumnShareFromItems(
    [item("Werkervaring", 40, 700), item("Vaardigheden", 380, 700), item("Functie", 40, 680), item("Excel", 380, 680)],
    width,
  );
  assert.equal(twoColumn.twoColumnRows, 2);

  const singleColumn = twoColumnShareFromItems(
    [item("Werkervaring", 40, 700, 400), item("Medewerker klantenservice", 40, 680, 400)],
    width,
  );
  assert.equal(singleColumn.twoColumnRows, 0);
});

async function docx(body: string, header = ""): Promise<Buffer> {
  const zip = new JSZip();
  zip.file("word/document.xml", `<w:document><w:body>${body}</w:body></w:document>`);
  if (header) zip.file("word/header1.xml", `<w:hdr><w:p><w:r><w:t>${header}</w:t></w:r></w:p></w:hdr>`);
  return Buffer.from(await zip.generateAsync({ type: "nodebuffer" }));
}

test("DOCX probe flags contact details only in the header, text boxes and tables", async () => {
  const bodyText = "Sanne de Vries\nWerkervaring";
  const buffer = await docx(
    '<w:p><w:r><w:t>Sanne de Vries</w:t></w:r></w:p><w:txbxContent><w:p/></w:txbxContent><w:tbl></w:tbl>',
    "sanne.voorbeeld@example.com 06-12345678",
  );
  const signals = await docxLayoutSignals(buffer, "CV_Sanne_de_Vries.docx", bodyText);
  assert.equal(signals.contactOnlyInHeaderFooter, true);
  assert.equal(signals.textBoxCount, 1);
  assert.equal(signals.tableCount, 1);

  const inBody = await docxLayoutSignals(buffer, "CV_Sanne_de_Vries.docx", `${bodyText}\nsanne.voorbeeld@example.com`);
  assert.equal(inBody.contactOnlyInHeaderFooter, false);
});

test("parse preview finds contact details, standard headings and dated periods", async () => {
  const { buildParsePreview } = await import("./parse-preview");
  const preview = buildParsePreview(
    [
      "Sanne de Vries",
      "Utrecht | sanne.voorbeeld@example.com | 06-12345678 | linkedin.com/in/sanne-voorbeeld",
      "Profiel",
      "Klantgerichte medewerker.",
      "Werkervaring",
      "Medewerker klantenservice, Voorbeeld BV (januari 2023 - heden)",
      "Kassamedewerker, Voorbeeld Supermarkt (2021 – 2022)",
      "Opleiding",
      "MBO 4, ROC (09/2018 - 06/2021)",
      "Talen:",
      "Nederlands (moedertaal)",
    ].join("\n"),
  );
  assert.equal(preview.email, "sanne.voorbeeld@example.com");
  assert.equal(preview.phone, "06-12345678");
  assert.equal(preview.linkedin, true);
  assert.deepEqual(preview.sections, ["profile", "experience", "education", "languages"]);
  assert.equal(preview.datedPeriods, 3);
  assert.equal(preview.firstLine, "Sanne de Vries");
});

test("layout signals on real fixture files: one column, two columns, contact only in a DOCX header", async () => {
  const { readFileSync } = await import("node:fs");
  const path = await import("node:path");
  const { layoutSignalsForFile } = await import("./layout");
  const { extractTextFromFile } = await import("../cv-parser");
  const fixture = (name: string) => readFileSync(path.join(process.cwd(), "lib/cv-check/golden/fixtures", name));

  const single = await layoutSignalsForFile(fixture("single-column.pdf"), "single-column.pdf", "");
  assert.equal(single.pageCount, 1);
  assert.deepEqual(single.imageOnlyPages, []);
  assert.ok((single.twoColumnRowShare ?? 1) < 0.25, `single column share ${single.twoColumnRowShare}`);

  const twoColumn = await layoutSignalsForFile(fixture("two-column.pdf"), "two-column.pdf", "");
  assert.ok((twoColumn.twoColumnRowShare ?? 0) >= 0.5, `two column share ${twoColumn.twoColumnRowShare}`);

  const docxBuffer = fixture("contact-in-header.docx");
  const docxText = await extractTextFromFile(docxBuffer, "contact-in-header.docx");
  const docx = await layoutSignalsForFile(docxBuffer, "contact-in-header.docx", docxText);
  assert.equal(docx.contactOnlyInHeaderFooter, true);
});

test("every reused cv-score check has English copy", async () => {
  const { readFileSync } = await import("node:fs");
  const path = await import("node:path");
  const { SCORE_CHECK_COPY_EN } = await import("./score-check-copy-en");
  const source = readFileSync(path.join(process.cwd(), "lib/tools/cv-score.ts"), "utf8");
  const ids = [...source.matchAll(/buildCheck\(\{\s*id: "([a-z_]+)"/g)].map((match) => match[1]);
  assert.ok(ids.length >= 20, `found only ${ids.length} checks`);
  for (const id of ids) assert.ok(SCORE_CHECK_COPY_EN[id], `missing English copy for ${id}`);
});

test("readability problems rank before content problems of the same severity", () => {
  const ranked = rankFailedChecks([
    check({ id: "content-big", category: "content", severity: "important", status: "fail", weight: 8, fix: "a" }),
    check({ id: "reading-order", category: "parsing", severity: "important", status: "fail", weight: 4, credit: 0.5, fix: "b" }),
  ]);
  assert.deepEqual(ranked.map((item) => item.id), ["reading-order", "content-big"]);
});
