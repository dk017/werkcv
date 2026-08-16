import JSZip from "jszip";
import type { CVData } from "@/lib/cv";
import type { MatchPackAnalysis, MatchPackSubmission } from "@/lib/agency-matchpack";

type AgencyDocxInput = {
  candidateData: CVData;
  submission: MatchPackSubmission;
  analysis: MatchPackAnalysis;
  vacancyTitle: string;
  locale: "nl" | "en";
  variant: "full" | "anonymized";
  companyName?: string | null;
  website?: string | null;
  headerText?: string | null;
  footerText?: string | null;
};

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function paragraph(value: string, style?: string): string {
  if (!value.trim()) return "";
  const styleXml = style ? `<w:pPr><w:pStyle w:val="${escapeXml(style)}"/></w:pPr>` : "";
  return `<w:p>${styleXml}<w:r><w:t xml:space="preserve">${escapeXml(value)}</w:t></w:r></w:p>`;
}

function bullet(value: string): string {
  if (!value.trim()) return "";
  return `<w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t xml:space="preserve">${escapeXml(value)}</w:t></w:r></w:p>`;
}

function table(rows: Array<[string, string]>): string {
  const body = rows.map(([label, value]) => `<w:tr><w:tc><w:tcPr><w:shd w:fill="E8F8F3"/></w:tcPr>${paragraph(label, "Caption")}</w:tc><w:tc>${paragraph(value || "—")}</w:tc></w:tr>`).join("");
  return `<w:tbl><w:tblPr><w:tblBorders><w:top w:val="single" w:sz="4" w:color="D1D5DB"/><w:left w:val="single" w:sz="4" w:color="D1D5DB"/><w:bottom w:val="single" w:sz="4" w:color="D1D5DB"/><w:right w:val="single" w:sz="4" w:color="D1D5DB"/><w:insideH w:val="single" w:sz="4" w:color="D1D5DB"/><w:insideV w:val="single" w:sz="4" w:color="D1D5DB"/></w:tblBorders></w:tblPr>${body}</w:tbl>`;
}

function documentXml(input: AgencyDocxInput): string {
  const { candidateData, submission, vacancyTitle, variant, companyName, website, headerText, locale } = input;
  const fullName = text(candidateData.personal.name) || (locale === "en" ? "Candidate profile" : "Kandidaatprofiel");
  const role = text(vacancyTitle) || text(candidateData.personal.title) || (locale === "en" ? "Candidate proposal" : "Kandidaatvoorstel");
  const labels = locale === "en"
    ? { profile: "Candidate profile", experience: "Experience", education: "Education", skills: "Skills", contact: "Contact", review: "Review note" }
    : { profile: "Kandidaatprofiel", experience: "Werkervaring", education: "Opleiding", skills: "Vaardigheden", contact: "Contact", review: "Controlewaarschuwing" };
  const paragraphs: string[] = [];

  if (companyName || headerText) paragraphs.push(paragraph(headerText || companyName || "", "Subtitle"));
  paragraphs.push(paragraph(`${fullName} · ${role}`, "Title"));
  if (website) paragraphs.push(paragraph(website, "Subtitle"));
  paragraphs.push(paragraph(submission.clientIntroduction, "Heading1"));

  const commercialRows: Array<[string, string]> = [];
  const commercial = submission.commercial;
  const commercialLabels = locale === "en"
    ? { availability: "Availability", notice: "Notice period", salary: "Salary/rate", hours: "Hours", location: "Location" }
    : { availability: "Beschikbaarheid", notice: "Opzegtermijn", salary: "Salaris/tarief", hours: "Uren", location: "Locatie" };
  if (text(commercial.availability)) commercialRows.push([commercialLabels.availability, commercial.availability]);
  if (text(commercial.noticePeriod)) commercialRows.push([commercialLabels.notice, commercial.noticePeriod]);
  if (text(commercial.salaryIndication)) commercialRows.push([commercialLabels.salary, commercial.salaryIndication]);
  if (text(commercial.hoursPerWeek)) commercialRows.push([commercialLabels.hours, commercial.hoursPerWeek]);
  if (text(commercial.workLocation)) commercialRows.push([commercialLabels.location, commercial.workLocation]);
  if (commercialRows.length) paragraphs.push(table(commercialRows));

  if (text(candidateData.personal.summary)) {
    paragraphs.push(paragraph(labels.profile, "Heading1"));
    paragraphs.push(paragraph(candidateData.personal.summary));
  }

  if (candidateData.experience.length) {
    paragraphs.push(paragraph(labels.experience, "Heading1"));
    candidateData.experience.forEach((item) => {
      const dates = [text(item.start), text(item.end)].filter(Boolean).join(" – ");
      paragraphs.push(paragraph([text(item.role), text(item.company), dates].filter(Boolean).join(" · "), "Heading2"));
      if (text(item.description)) paragraphs.push(paragraph(item.description));
      item.highlights.forEach((highlight) => paragraphs.push(bullet(highlight)));
    });
  }

  if (candidateData.education.length) {
    paragraphs.push(paragraph(labels.education, "Heading1"));
    candidateData.education.forEach((item) => paragraphs.push(paragraph([text(item.degree), text(item.school), [text(item.start), text(item.end)].filter(Boolean).join(" – ")].filter(Boolean).join(" · "), "Heading2")));
  }

  if (candidateData.skills.length) {
    paragraphs.push(paragraph(labels.skills, "Heading1"));
    candidateData.skills.forEach((skill) => paragraphs.push(bullet(skill.name)));
  }

  if (variant === "anonymized") {
    const warning = locale === "en"
      ? "Direct contact details removed. Review company names, schools and project details before sharing."
      : "Directe contactgegevens verwijderd. Controleer bedrijfsnamen, scholen en projectdetails voordat je dit deelt.";
    paragraphs.push(paragraph(labels.review, "Heading1"));
    paragraphs.push(paragraph(warning));
  }

  const contact = [text(candidateData.personal.email), text(candidateData.personal.phone), text(candidateData.personal.location)].filter(Boolean).join(" · ");
  if (contact && variant === "full") paragraphs.push(paragraph(`${labels.contact}: ${contact}`, "Caption"));

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${paragraphs.join("")}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080"/><w:footerReference w:type="default" r:id="rId1"/></w:sectPr></w:body></w:document>`.replace("xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\"", "xmlns:w=\"http://schemas.openxmlformats.org/wordprocessingml/2006/main\" xmlns:r=\"http://schemas.openxmlformats.org/officeDocument/2006/relationships\"").replace("<w:footerReference w:type=\"default\" r:id=\"rId1\"/>", `<w:footerReference w:type="default" r:id="rId1"/>`);
}

function stylesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:sz w:val="22"/><w:szCs w:val="22"/><w:color w:val="0F172A"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="36"/><w:color w:val="0F172A"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="heading 1"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="28"/><w:color w:val="087F5B"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="heading 2"/><w:basedOn w:val="Normal"/><w:rPr><w:b/><w:sz w:val="24"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Subtitle"><w:name w:val="Subtitle"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="087F5B"/><w:sz w:val="20"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Caption"><w:name w:val="Caption"/><w:basedOn w:val="Normal"/><w:rPr><w:color w:val="64748B"/><w:sz w:val="18"/></w:rPr></w:style></w:styles>`;
}

function footerXml(input: AgencyDocxInput): string {
  const footer = input.footerText || (input.locale === "en" ? "Prepared with WerkCV MatchPack" : "Opgesteld met WerkCV MatchPack");
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:t>${escapeXml(footer)}</w:t></w:r></w:p></w:ftr>`;
}

export async function generateAgencySubmissionDOCX(input: AgencyDocxInput): Promise<Buffer> {
  const zip = new JSZip();
  zip.file("[Content_Types].xml", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/></Types>`);
  zip.file("_rels/.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`);
  zip.file("word/document.xml", documentXml(input));
  zip.file("word/styles.xml", stylesXml());
  zip.file("word/footer1.xml", footerXml(input));
  zip.file("word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`);
  return zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
}
