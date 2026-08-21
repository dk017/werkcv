import { createHash } from "node:crypto";
import { z } from "zod";
import {
  sourceReferenceSchema,
  type SourceReference,
} from "@/lib/tools/cv-vacature-match-schema";

export const matchPackSourceMapSchema = z.object({
  version: z.literal(1),
  fileType: z.enum(["pdf", "docx"]),
  lineCount: z.number().int().nonnegative(),
  pages: z.array(z.object({
    pageNumber: z.number().int().positive(),
    startLine: z.number().int().positive(),
    endLine: z.number().int().positive(),
  })),
}).superRefine((value, ctx) => {
  if (value.fileType === "docx" && value.pages.length) {
    ctx.addIssue({ code: "custom", message: "DOCX source maps cannot claim rendered pages.", path: ["pages"] });
  }
  let previousEnd = 0;
  for (const [index, page] of value.pages.entries()) {
    if (page.startLine > page.endLine || page.startLine !== previousEnd + 1) {
      ctx.addIssue({ code: "custom", message: "Page line ranges must be contiguous.", path: ["pages", index] });
    }
    previousEnd = page.endLine;
  }
  if (value.pages.length && previousEnd !== value.lineCount) {
    ctx.addIssue({ code: "custom", message: "Page ranges must cover every source line.", path: ["lineCount"] });
  }
});

export type MatchPackSourceMapV1 = z.infer<typeof matchPackSourceMapSchema>;

export type MatchPackExtractedSource = {
  text: string;
  digest: string;
  sourceMap: MatchPackSourceMapV1;
};

export function normalizeMatchPackSourceText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

export function createMatchPackSource(
  fileType: "pdf" | "docx",
  text: string,
  pages: Array<{ pageNumber: number; text: string }> = [],
): MatchPackExtractedSource {
  const normalizedText = normalizeMatchPackSourceText(text);
  const lines = normalizedText ? normalizedText.split("\n") : [];
  const pageRanges: MatchPackSourceMapV1["pages"] = [];

  if (fileType === "pdf") {
    let nextLine = 1;
    for (const page of pages) {
      const pageText = normalizeMatchPackSourceText(page.text);
      const pageLineCount = pageText ? pageText.split("\n").length : 0;
      if (!pageLineCount) continue;
      pageRanges.push({
        pageNumber: page.pageNumber,
        startLine: nextLine,
        endLine: nextLine + pageLineCount - 1,
      });
      nextLine += pageLineCount;
    }
  }

  const sourceMap = matchPackSourceMapSchema.parse({
    version: 1,
    fileType,
    lineCount: lines.length,
    pages: pageRanges,
  });
  return {
    text: normalizedText,
    digest: createHash("sha256").update(normalizedText).digest("hex"),
    sourceMap,
  };
}

export function sourcePageForLine(sourceMap: MatchPackSourceMapV1, sourceLine: number): number | null {
  return sourceMap.pages.find((page) => sourceLine >= page.startLine && sourceLine <= page.endLine)?.pageNumber ?? null;
}

function normalizeForMatch(value: string): string {
  return value
    .toLocaleLowerCase("nl-NL")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^\p{L}\p{N}%+.#/-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sourceSection(lines: string[], index: number): string {
  for (let cursor = index; cursor >= 0; cursor -= 1) {
    const candidate = lines[cursor]?.trim() || "";
    if (!candidate || candidate.length > 72 || /[.!?]$/.test(candidate)) continue;
    if (candidate.split(/\s+/).length <= 8) return candidate;
  }
  return "CV-bron";
}

export function resolveMatchPackSourceReference(
  sourceText: string,
  evidence: string,
  sourceMap?: MatchPackSourceMapV1 | null,
): SourceReference {
  const normalizedSource = normalizeMatchPackSourceText(sourceText);
  const lines = normalizedSource ? normalizedSource.split("\n") : [];
  const normalizedEvidence = normalizeForMatch(evidence);
  const notFound = sourceReferenceSchema.parse({
    sourcePage: null,
    sourceLine: 1,
    sourceSection: "Niet gevonden in bron",
    snippet: "",
    match: "not_found",
  });
  if (!lines.length || !normalizedEvidence) return notFound;

  const exactIndex = lines.findIndex((line) => normalizeForMatch(line).includes(normalizedEvidence));
  if (exactIndex >= 0) {
    const sourceLine = exactIndex + 1;
    return sourceReferenceSchema.parse({
      sourcePage: sourceMap ? sourcePageForLine(sourceMap, sourceLine) : null,
      sourceLine,
      sourceSection: sourceSection(lines, exactIndex),
      snippet: lines[exactIndex].slice(0, 500),
      match: "exact",
    });
  }

  const evidenceTokens = new Set(normalizedEvidence.split(" ").filter((token) => token.length >= 3));
  let bestIndex = -1;
  let bestScore = 0;
  lines.forEach((line, index) => {
    const lineTokens = new Set(normalizeForMatch(line).split(" ").filter((token) => token.length >= 3));
    if (!lineTokens.size || !evidenceTokens.size) return;
    const overlap = [...evidenceTokens].filter((token) => lineTokens.has(token)).length / evidenceTokens.size;
    if (overlap > bestScore) {
      bestIndex = index;
      bestScore = overlap;
    }
  });
  if (bestIndex < 0 || bestScore < 0.35) return notFound;
  const sourceLine = bestIndex + 1;
  return sourceReferenceSchema.parse({
    sourcePage: sourceMap ? sourcePageForLine(sourceMap, sourceLine) : null,
    sourceLine,
    sourceSection: sourceSection(lines, bestIndex),
    snippet: lines[bestIndex].slice(0, 500),
    match: "approximate",
  });
}

export function referenceResolves(
  reference: SourceReference,
  sourceText: string,
  sourceMap?: MatchPackSourceMapV1 | null,
): boolean {
  if (reference.match === "not_found" || !reference.snippet.trim()) return false;
  const resolved = resolveMatchPackSourceReference(sourceText, reference.snippet, sourceMap);
  return resolved.match !== "not_found"
    && resolved.sourceLine === reference.sourceLine
    && resolved.sourcePage === reference.sourcePage;
}
