import JSZip from "jszip";
import { getPdfjs } from "@/lib/pdfjs";

/**
 * Layout signals that plain text extraction hides: scanned pages, multi-column reading order,
 * and DOCX content that text extractors (and many ATS parsers) skip. Positions are PDF units.
 */
export type LayoutSignals = {
  fileType: "pdf" | "docx" | "text";
  pageCount: number | null;
  /** Pages with (almost) no extractable text: scanned or image-only. */
  imageOnlyPages: number[];
  /** Share of text rows (0–1) that contain two separated text blocks side by side. */
  twoColumnRowShare: number | null;
  /** DOCX: contact details found only in the page header/footer. */
  contactOnlyInHeaderFooter: boolean;
  /** DOCX: text found in text boxes (w:txbxContent), which many parsers read out of order or skip. */
  textBoxCount: number;
  /** DOCX: number of tables in the body. */
  tableCount: number;
  fileSizeBytes: number | null;
  fileName: string | null;
};

type TextItem = { str?: string; transform?: number[]; width?: number };

const EMAIL = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE = /(?:\+31|0)[\s-]?(?:6|[1-9]\d)[\s-]?\d{2,3}[\s-]?\d{2}[\s-]?\d{2,3}/;

export function emptyLayoutSignals(fileType: LayoutSignals["fileType"]): LayoutSignals {
  return {
    fileType,
    pageCount: null,
    imageOnlyPages: [],
    twoColumnRowShare: null,
    contactOnlyInHeaderFooter: false,
    textBoxCount: 0,
    tableCount: 0,
    fileSizeBytes: null,
    fileName: null,
  };
}

/**
 * Rows are items sharing a baseline (y within 2 units). A row counts as two-column when its
 * items form two blocks separated by a horizontal gap of more than 8% of the page width,
 * with text on both sides of the page middle.
 */
export function twoColumnShareFromItems(items: TextItem[], pageWidth: number): { rows: number; twoColumnRows: number } {
  const rows = new Map<number, Array<{ x0: number; x1: number }>>();
  for (const item of items) {
    if (!item.str?.trim() || !item.transform) continue;
    const x0 = item.transform[4];
    const y = Math.round(item.transform[5] / 2) * 2;
    const x1 = x0 + (item.width ?? 0);
    const row = rows.get(y) ?? [];
    row.push({ x0, x1 });
    rows.set(y, row);
  }

  let twoColumnRows = 0;
  for (const row of rows.values()) {
    if (row.length < 2) continue;
    row.sort((a, b) => a.x0 - b.x0);
    const middle = pageWidth / 2;
    const hasLeft = row.some((segment) => segment.x0 < middle * 0.8);
    const hasRight = row.some((segment) => segment.x0 > middle);
    let widestGap = 0;
    for (let index = 1; index < row.length; index++) {
      widestGap = Math.max(widestGap, row[index].x0 - row[index - 1].x1);
    }
    if (hasLeft && hasRight && widestGap > pageWidth * 0.08) twoColumnRows++;
  }
  return { rows: rows.size, twoColumnRows };
}

export async function pdfLayoutSignals(buffer: Buffer, fileName: string): Promise<LayoutSignals> {
  const pdfjsLib = await getPdfjs();
  const pdf = await pdfjsLib.getDocument({
    data: new Uint8Array(buffer),
    useWorkerFetch: false,
    isEvalSupported: false,
    useSystemFonts: true,
  }).promise;

  const signals = emptyLayoutSignals("pdf");
  signals.pageCount = pdf.numPages;
  signals.fileSizeBytes = buffer.length;
  signals.fileName = fileName;

  let rows = 0;
  let twoColumnRows = 0;
  const pagesToInspect = Math.min(pdf.numPages, 6);
  for (let pageNumber = 1; pageNumber <= pagesToInspect; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 1 });
    const content = await page.getTextContent();
    const items = content.items as TextItem[];
    const characters = items.reduce((total, item) => total + (item.str?.trim().length ?? 0), 0);
    if (characters < 40) signals.imageOnlyPages.push(pageNumber);

    const pageRows = twoColumnShareFromItems(items, viewport.width);
    rows += pageRows.rows;
    twoColumnRows += pageRows.twoColumnRows;
  }
  signals.twoColumnRowShare = rows > 0 ? twoColumnRows / rows : null;
  return signals;
}

function xmlText(xml: string): string {
  return xml
    .replace(/<w:tab\/>/g, " ")
    .replace(/<\/w:p>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export async function docxLayoutSignals(buffer: Buffer, fileName: string, bodyText: string): Promise<LayoutSignals> {
  const signals = emptyLayoutSignals("docx");
  signals.fileSizeBytes = buffer.length;
  signals.fileName = fileName;

  const zip = await JSZip.loadAsync(buffer);
  const documentXml = (await zip.file("word/document.xml")?.async("string")) ?? "";
  signals.textBoxCount = (documentXml.match(/<w:txbxContent\b/g) ?? []).length;
  signals.tableCount = (documentXml.match(/<w:tbl>/g) ?? []).length;

  const headerFooterFiles = Object.keys(zip.files).filter((name) => /^word\/(header|footer)\d*\.xml$/.test(name));
  const headerFooterText = (
    await Promise.all(headerFooterFiles.map((name) => zip.file(name)!.async("string")))
  )
    .map(xmlText)
    .join("\n");

  const contactInHeaderFooter = EMAIL.test(headerFooterText) || PHONE.test(headerFooterText);
  const contactInBody = EMAIL.test(bodyText) || PHONE.test(bodyText);
  signals.contactOnlyInHeaderFooter = contactInHeaderFooter && !contactInBody;
  return signals;
}

/** Never throws: layout signals are advisory, so a failure yields empty signals. */
export async function layoutSignalsForFile(buffer: Buffer, fileName: string, bodyText: string): Promise<LayoutSignals> {
  const extension = fileName.toLowerCase().split(".").pop();
  try {
    if (extension === "pdf") return await pdfLayoutSignals(buffer, fileName);
    if (extension === "docx") return await docxLayoutSignals(buffer, fileName, bodyText);
  } catch (error) {
    console.error("cv-check layout signals failed", { error: error instanceof Error ? error.name : "unknown" });
  }
  const fallback = emptyLayoutSignals(extension === "pdf" ? "pdf" : extension === "docx" ? "docx" : "text");
  fallback.fileSizeBytes = buffer.length;
  fallback.fileName = fileName;
  return fallback;
}
