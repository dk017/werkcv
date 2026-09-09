import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import JSZip from "jszip";
import { agencyFictionalExample } from "@/lib/agency-fictional-example";

async function main() {
  const root = process.argv.includes("--public") ? "public/downloads" : ".codex-tmp/agency-discovery/artifacts";
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const normalize = (value: string) => value.replace(/\s+/gu, " ").trim();
  async function pdfText(file: string) {
    const doc = await pdfjs.getDocument({ data: new Uint8Array(await readFile(`${root}/${file}`)), useWorkerFetch: false, isEvalSupported: false, useSystemFonts: true }).promise;
    let text = "";
    for (let number = 1; number <= doc.numPages; number++) {
      const content = await (await doc.getPage(number)).getTextContent();
      text += content.items.map((item) => "str" in item ? item.str + (item.hasEOL ? " " : "") : "").join("") + " ";
    }
    return normalize(text);
  }
  const source = await pdfText("agency-sample-bron-cv-hr-adviseur.pdf");
  for (const quote of agencyFictionalExample.sourceSections) assert.ok(source.includes(normalize(quote.snippet)), quote.id);
  for (const suffix of ["", "-geanonimiseerd"]) {
    const stem = `werkcv-voorbeeld-kandidaatvoorstel-hr-adviseur${suffix}`;
    const pdf = await pdfText(`${stem}.pdf`);
    const zip = await JSZip.loadAsync(await readFile(`${root}/${stem}.docx`));
    const xml = await zip.file("word/document.xml")!.async("string");
    for (const text of [pdf, xml]) {
      for (const phrase of ["24 teamleiders", "Bachelor Human Resource Management", "Regie op verzuim", "Nog te bevestigen", "Fictieve Zorgdiensten"]) assert.ok(text.includes(phrase), `${stem}: ${phrase}`);
      assert.doesNotMatch(text, /40 teamleiders|configureert zelfstandig AFAS|zeven jaar zelfstandig|Recruiteractie:/);
      if (suffix) assert.doesNotMatch(text, /nina\.devries@example\.com|Nina de Vries/);
    }
  }
  console.log("PASS: source quotes and both PDF/DOCX semantic outputs. This is not Word layout certification.");
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
