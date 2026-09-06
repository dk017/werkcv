import fs from "node:fs";
import path from "node:path";
import JSZip from "jszip";
import {
  agencyPublicSectorExample,
  agencyPublicSectorMatrixColumns,
} from "@/lib/agency-public-sector-example";

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/'/g, "&apos;");
}

function paragraph(value: string, style = "Normal"): string {
  return `<w:p><w:pPr><w:pStyle w:val="${style}"/></w:pPr><w:r><w:t xml:space="preserve">${escapeXml(value)}</w:t></w:r></w:p>`;
}

function cell(value: string, header = false): string {
  const fill = header ? "0F3D36" : "F7FAF8";
  const colour = header ? "FFFFFF" : "17211F";
  return `<w:tc><w:tcPr><w:shd w:fill="${fill}"/><w:tcMar><w:top w:w="60" w:type="dxa"/><w:start w:w="60" w:type="dxa"/><w:bottom w:w="60" w:type="dxa"/><w:end w:w="60" w:type="dxa"/></w:tcMar></w:tcPr><w:p><w:r><w:rPr><w:sz w:val="${header ? "13" : "12"}"/><w:color w:val="${colour}"/>${header ? "<w:b/>" : ""}</w:rPr><w:t xml:space="preserve">${escapeXml(value || "—")}</w:t></w:r></w:p></w:tc>`;
}

function table(rows: string[][]): string {
  return `<w:tbl><w:tblPr><w:tblLayout w:type="fixed"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="CBD5D1"/><w:left w:val="single" w:sz="4" w:color="CBD5D1"/><w:bottom w:val="single" w:sz="4" w:color="CBD5D1"/><w:right w:val="single" w:sz="4" w:color="CBD5D1"/><w:insideH w:val="single" w:sz="4" w:color="CBD5D1"/><w:insideV w:val="single" w:sz="4" w:color="CBD5D1"/></w:tblBorders></w:tblPr>${rows.map((row, index) => `<w:tr>${row.map((value) => cell(value, index === 0)).join("")}</w:tr>`).join("")}</w:tbl>`;
}

function documentXml(): string {
  const blankRow = agencyPublicSectorMatrixColumns.map(() => "");
  const body = [
    paragraph("WerkCV · Eisenmatrix kandidaat aanbieden bij de overheid", "Title"),
    paragraph(agencyPublicSectorExample.notice, "Subtitle"),
    paragraph("Gebruik deze matrix om iedere eis aan een exact CV-fragment, een expliciet open punt of afzonderlijke kandidaatbevestiging te koppelen. Een status beschrijft alleen de bronrelatie; het is geen oordeel over waarheid, identiteit, geschiktheid of acceptatie."),
    paragraph("Eisenmatrix", "Heading1"),
    table([Array.from(agencyPublicSectorMatrixColumns), blankRow]),
    paragraph("Pre-send controle", "Heading1"),
    paragraph("Controleer werkgevers, projecten, perioden, getallen, actuele beschikbaarheid, tarief, outputvariant, ontvanger en de actuele instructies van het gebruikte overheidsportaal. De recruiter blijft verantwoordelijk voor de uiteindelijke inhoud en beslissing om te delen."),
    `<w:sectPr><w:pgSz w:w="16838" w:h="11906" w:orient="landscape"/><w:pgMar w:top="720" w:right="540" w:bottom="720" w:left="540"/></w:sectPr>`,
  ].join("");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`;
}

function stylesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:sz w:val="20"/><w:szCs w:val="20"/><w:color w:val="17211F"/><w:rFonts w:ascii="Arial" w:hAnsi="Arial"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="34"/><w:color w:val="0F3D36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="B45309"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="26"/><w:color w:val="0F3D36"/></w:rPr></w:style></w:styles>`;
}

async function main() {
  const zip = new JSZip();
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`);
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.file("word/document.xml", documentXml());
  zip.file("word/styles.xml", stylesXml());
  const destination = path.join(process.cwd(), "public", "downloads", "werkcv-eisenmatrix-kandidaat-aanbieden-overheid.docx");
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" }));
  console.log(`Generated ${destination}`);
}

void main();
