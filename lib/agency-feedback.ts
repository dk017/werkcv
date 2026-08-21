import { z } from "zod";
import type { CVData } from "@/lib/cv";

export const productFeedbackSchema = z.object({
  version: z.literal(1),
  sendability: z.enum(["sent", "corrected", "not_usable", "not_sent"]),
  issueCategories: z.array(z.enum(["evidence", "parsing", "editing", "pdf", "docx", "privacy", "other"])).min(1).max(7),
  note: z.string().trim().max(500),
}).strict();

export type ProductFeedbackInput = z.infer<typeof productFeedbackSchema>;

const CONTACT_PATTERN = /[\w.%+-]+@[\w.-]+\.[A-Z]{2,}|https?:\/\/|(?<!\w)\+?\d[\d\s().-]{7,}\d(?!\w)|\b\d{4}\s?[A-Z]{2}\b/iu;

function normalize(value: string): string {
  return value.toLocaleLowerCase("nl-NL").replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim();
}

function phrases(value: string): string[] {
  const words = normalize(value).split(" ").filter(Boolean);
  const result: string[] = [];
  for (let index = 0; index + 8 <= words.length; index += 1) result.push(words.slice(index, index + 8).join(" "));
  return result;
}

export function feedbackContainsCandidateContent(input: {
  note: string;
  candidateData: CVData;
  sourceText: string;
  vacancyText: string;
  clientIntroduction: string;
  clientEmailBody: string;
}): boolean {
  if (CONTACT_PATTERN.test(input.note)) return true;
  const normalizedNote = normalize(input.note);
  if (!normalizedNote) return false;
  const nameTokens = input.candidateData.personal.name.split(/\s+/u).map(normalize).filter((part) => part.length >= 3);
  if (nameTokens.some((token) => new RegExp(`(?:^| )${token}(?: |$)`, "u").test(normalizedNote))) return true;
  const protectedPhrases = [input.sourceText, input.vacancyText, input.clientIntroduction, input.clientEmailBody].flatMap(phrases);
  return protectedPhrases.some((phrase) => normalizedNote.includes(phrase));
}
