import { prisma } from "@/lib/prisma";
import { detectResumeLanguage } from "@/lib/cv-language";
import { CvCheckInputError, runCvCheck } from "@/lib/cv-check/engine";
import { emptyLayoutSignals } from "@/lib/cv-check/layout";
import type { CvCheckResult } from "@/lib/cv-check/types";
import { classifyAiToolError } from "@/lib/tools/ai-tool-errors";
import { matchCvVacature, type CvVacatureMatchResult } from "@/lib/tools/cv-vacature-match";
import { takeAiBudgetOrAlert } from "./alerts";
import { createCheckedCvHandoff, HandoffCapacityError, type HandoffLocale } from "./handoff";
import type { McpClient } from "./context";

export type McpToolFailureCode = "RATE_LIMITED" | "TEXT_TOO_SHORT" | "VACANCY_TOO_SHORT" | "AI_UNAVAILABLE" | "FAILED";
export type McpToolResult<T> = { ok: true; data: T } | { ok: false; code: McpToolFailureCode; message: string };

/** Below this grade the report offers to open the CV in the editor. */
export const EDITOR_OFFER_BELOW_GRADE = 8;

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

export type CheckCvData = {
  grade: number;
  band: CvCheckResult["gradeBand"];
  categories: Array<{ label: string; score: number }>;
  topFixes: Array<{ id: string; title: string; fix: string; evidence: string | null }>;
  criticalIssues: number;
  sectionsFound: string[];
  canOpenInEditor: boolean;
  limitations: string;
};

type CheckDeps = { runCheck: typeof runCvCheck };

export async function checkCv(
  input: { cvText: string; locale?: HandoffLocale },
  deps: CheckDeps = { runCheck: runCvCheck },
): Promise<McpToolResult<CheckCvData> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  try {
    // No AI: the general checks run on rules, so this tool is free and fast. A pasted text has no PDF
    // layout, so layout checks (columns, scans) are not part of this grade.
    const result = await deps.runCheck({ cvText: input.cvText, locale, layout: emptyLayoutSignals("text"), ai: false });
    return {
      locale,
      ok: true,
      data: {
        grade: result.grade,
        band: result.gradeBand,
        categories: result.categories.map(({ label, score }) => ({ label, score })),
        topFixes: result.topFixes.map(({ checkId, title, fix, evidence }) => ({ id: checkId, title, fix, evidence })),
        criticalIssues: result.checks.filter((check) => check.severity === "critical" && check.status === "fail").length,
        sectionsFound: result.parsePreview.sections,
        canOpenInEditor: result.grade < EDITOR_OFFER_BELOW_GRADE,
        limitations:
          locale === "en"
            ? "Based on the pasted text only: file layout (columns, scanned pages) is not assessed, and the AI-based style checks of the website are not included, so the grade can differ slightly from the website."
            : "Alleen gebaseerd op de geplakte tekst: bestandsopmaak (kolommen, scans) is niet beoordeeld en de AI-stijlchecks van de website zijn niet meegenomen, dus het cijfer kan iets afwijken van de website.",
      },
    };
  } catch (error) {
    if (error instanceof CvCheckInputError) return { locale, ...failure("TEXT_TOO_SHORT", locale) };
    return { locale, ...failure("FAILED", locale) };
  }
}

export type MatchVacancyData = {
  score: number;
  scoreLabel: string;
  summary: string;
  requirements: Array<{
    requirement: string;
    importance: "essential" | "preferred";
    status: "strong" | "partial" | "missing";
    cvEvidence: string;
    vacancyEvidence: string;
    honestAction: string;
  }>;
  topFixes: Array<{ title: string; action: string; evidence: string }>;
  missingKeywords: string[];
  canOpenInEditor: boolean;
};

type MatchDeps = { runMatch: typeof matchCvVacature; takeBudget: () => boolean };

export async function matchVacancy(
  input: { cvText: string; vacancyText: string; locale?: HandoffLocale },
  deps: MatchDeps = { runMatch: matchCvVacature, takeBudget: () => takeAiBudgetOrAlert("match_vacancy") },
): Promise<McpToolResult<MatchVacancyData> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  if (!deps.takeBudget()) return { locale, ...failure("RATE_LIMITED", locale) };
  try {
    const result: CvVacatureMatchResult = await deps.runMatch(input.cvText, input.vacancyText, locale);
    return {
      locale,
      ok: true,
      data: {
        score: result.score,
        scoreLabel: result.scoreLabel,
        summary: result.summary,
        requirements: result.requirements.map(({ requirement, importance, status, cvEvidence, vacancyEvidence, honestAction }) => ({
          requirement,
          importance,
          status,
          cvEvidence,
          vacancyEvidence,
          honestAction,
        })),
        topFixes: result.topFixes.map(({ title, action, evidence }) => ({ title, action, evidence })),
        missingKeywords: result.missingKeywords,
        canOpenInEditor: result.requirements.some((requirement) => requirement.status !== "strong"),
      },
    };
  } catch (error) {
    // The AI step failing is reported as unavailable; the cause (quota, timeout) is logged as a code only.
    console.error("mcp_match_vacancy_failed", { code: classifyAiToolError(error) });
    return { locale, ...failure("AI_UNAVAILABLE", locale) };
  }
}

export function editorLink(token: string, locale: HandoffLocale, client: McpClient): string {
  const path = locale === "en" ? "/en/cv-check/improve" : "/cv-check/verbeteren";
  const params = new URLSearchParams({ handoff: token, utm_source: "mcp", utm_medium: client, utm_campaign: "cv-check" });
  return `https://werkcv.nl${path}?${params.toString()}`;
}

export type OpenInEditorData = { url: string; expiresInMinutes: number };

type OpenDeps = { createHandoff: (input: { cvText: string; vacancyText: string | null; locale: HandoffLocale }) => Promise<{ token: string }> };

export async function openInEditor(
  input: { cvText: string; vacancyText?: string | null; locale?: HandoffLocale },
  client: McpClient,
  deps: OpenDeps = { createHandoff: (handoff) => createCheckedCvHandoff(prisma, handoff) },
): Promise<McpToolResult<OpenInEditorData> & { locale: HandoffLocale }> {
  const locale = resolveLocale(input.locale, input.cvText);
  try {
    const { token } = await deps.createHandoff({ cvText: input.cvText, vacancyText: input.vacancyText ?? null, locale });
    return { locale, ok: true, data: { url: editorLink(token, locale, client), expiresInMinutes: 60 } };
  } catch (error) {
    // All links in use: the same plain "limit reached" answer as a rate limit.
    if (error instanceof HandoffCapacityError) return { locale, ...failure("RATE_LIMITED", locale) };
    return { locale, ...failure("FAILED", locale) };
  }
}

/** Grade bucket for counts only (the whole-number grade, never the text). */
export function gradeBucket(grade: number): string {
  return String(Math.floor(grade));
}
