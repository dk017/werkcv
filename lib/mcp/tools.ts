import { prisma } from "@/lib/prisma";
import { detectResumeLanguage } from "@/lib/cv-language";
import { CvCheckInputError, runCvCheck } from "@/lib/cv-check/engine";
import { emptyLayoutSignals } from "@/lib/cv-check/layout";
import { classifyAiToolError } from "@/lib/tools/ai-tool-errors";
import { takeAiBudgetOrAlert } from "./alerts";
import { createCheckedCvHandoff, HandoffCapacityError, type HandoffLocale } from "./handoff";
import { redactGovernmentIds } from "./v2/redact";
import type { z } from "zod";
import { toCheckCvV2 } from "./v2/check";
import type { CheckCvOutput, MatchVacancyOutput, OpenInEditorOutput, Requirement } from "./v2/contract";
import { buildMatchV2, extractRequirementsWithAi } from "./v2/match";
import { buildOpenInEditorV2 } from "./v2/open";

export type McpToolFailureCode = "RATE_LIMITED" | "TEXT_TOO_SHORT" | "VACANCY_TOO_SHORT" | "AI_UNAVAILABLE" | "FAILED";
export type McpToolResult<T> = { ok: true; data: T } | { ok: false; code: McpToolFailureCode; message: string };

const MESSAGES: Record<McpToolFailureCode, { nl: string; en: string }> = {
  RATE_LIMITED: {
    nl: "Je hebt het maximale aantal gratis aanvragen bereikt. Probeer het later opnieuw.",
    en: "You have reached the free request limit. Please try again later.",
  },
  TEXT_TOO_SHORT: {
    nl: "De cv-tekst is te kort of onvolledig om te beoordelen. Stuur de volledige tekst van het cv.",
    en: "The CV text is too short or incomplete to assess. Send the full text of the CV.",
  },
  VACANCY_TOO_SHORT: {
    nl: "De vacaturetekst is te kort. Stuur de volledige functie-eisen en taken.",
    en: "The vacancy text is too short. Send the full requirements and responsibilities.",
  },
  AI_UNAVAILABLE: {
    nl: "De vacature-vergelijking is nu niet beschikbaar. Probeer het later opnieuw.",
    en: "The vacancy comparison is not available right now. Please try again later.",
  },
  FAILED: {
    nl: "Dit kon niet worden voltooid. Probeer het opnieuw.",
    en: "This could not be completed. Please try again.",
  },
};

export function failure(code: McpToolFailureCode, locale: HandoffLocale): { ok: false; code: McpToolFailureCode; message: string } {
  return { ok: false, code, message: MESSAGES[code][locale] };
}

export function resolveLocale(locale: HandoffLocale | undefined, cvText: string): HandoffLocale {
  return locale ?? detectResumeLanguage(cvText, "nl");
}

type CheckDeps = { runCheck: typeof runCvCheck };

export async function checkCv(
  input: { cvText: string; locale?: HandoffLocale },
  deps: CheckDeps = { runCheck: runCvCheck },
): Promise<McpToolResult<CheckCvOutput> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  try {
    // No AI: the general checks run on rules, so this tool is free and fast. A pasted text has no PDF
    // layout, so layout checks (columns, scans) are not part of this grade.
    const result = await deps.runCheck({ cvText: input.cvText, locale, layout: emptyLayoutSignals("text"), ai: false });
    return { locale, ok: true, data: toCheckCvV2(result, input.cvText, locale) };
  } catch (error) {
    if (error instanceof CvCheckInputError) return { locale, ...failure("TEXT_TOO_SHORT", locale) };
    return { locale, ...failure("FAILED", locale) };
  }
}

type MatchDeps = {
  extractRequirements: (cvText: string, vacancyText: string, locale: HandoffLocale) => Promise<Array<z.infer<typeof Requirement>>>;
  takeBudget: () => boolean;
};

export async function matchVacancy(
  input: { cvText: string; vacancyText: string; locale?: HandoffLocale },
  deps: MatchDeps = { extractRequirements: extractRequirementsWithAi, takeBudget: () => takeAiBudgetOrAlert("match_vacancy") },
): Promise<McpToolResult<MatchVacancyOutput> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  if (!deps.takeBudget()) return { locale, ...failure("RATE_LIMITED", locale) };
  // ID and bank numbers are not sent to OpenAI (lib/mcp/v2/redact.ts).
  const cvText = redactGovernmentIds(input.cvText, locale);
  let requirements: Array<z.infer<typeof Requirement>>;
  try {
    // The AI only extracts and judges the requirements; score, counts and keywords are computed in code.
    requirements = await deps.extractRequirements(cvText, input.vacancyText, locale);
  } catch (error) {
    // The AI step failing is reported as unavailable; the cause (quota, timeout) is logged as a code only.
    console.error("mcp_match_vacancy_failed", { code: classifyAiToolError(error) });
    return { locale, ...failure("AI_UNAVAILABLE", locale) };
  }
  if (!requirements.length) return { locale, ...failure("FAILED", locale) };
  return { locale, ok: true, data: buildMatchV2({ requirements, cvText, vacancyText: input.vacancyText, locale }) };
}

type OpenDeps = { createHandoff: (input: { cvText: string; vacancyText: string | null; locale: HandoffLocale }) => Promise<{ token: string }> };

export async function openInEditor(
  input: { cvText: string; vacancyText?: string | null; locale?: HandoffLocale },
  utmMedium: string,
  deps: OpenDeps = { createHandoff: (handoff) => createCheckedCvHandoff(prisma, handoff) },
): Promise<McpToolResult<OpenInEditorOutput> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  try {
    // ID and bank numbers in the CV are not stored for the link (lib/mcp/v2/redact.ts).
    const vacancyText = input.vacancyText ?? null;
    const { token } = await deps.createHandoff({ cvText: redactGovernmentIds(input.cvText, locale), vacancyText, locale });
    return { locale, ok: true, data: buildOpenInEditorV2({ token, locale, utmMedium, includesVacancy: Boolean(vacancyText) }) };
  } catch (error) {
    // All links in use: the same plain "limit reached" answer as a rate limit.
    if (error instanceof HandoffCapacityError) return { locale, ...failure("RATE_LIMITED", locale) };
    return { locale, ...failure("FAILED", locale) };
  }
}

/** Grade bucket for counts only (the whole-number 1-10 grade, never the text). */
export function gradeBucket(grade: number): string {
  return String(Math.floor(grade));
}
