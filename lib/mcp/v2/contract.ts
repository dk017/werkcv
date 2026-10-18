/**
 * WerkCV MCP response contract (v2)
 *
 * Drop-in schemas for the three WerkCV MCP tools: check_cv, match_vacancy, open_in_editor.
 * Built for the MCP TypeScript SDK (`server.registerTool(name, { inputSchema, outputSchema }, handler)`)
 * with Zod v3.
 *
 * What changed vs v1 (from the agent test on 17 Oct 2026):
 *  1. Every tool returns `canOpenInEditor` consistently and a `nextStep` the agent should offer.
 *  2. One score scale for both tools: 0-100 `score`, plus `grade10` (score / 10). The website's CV check keeps
 *     its own weights and 1-10 scale (owner decision, 17 Oct 2026), so its grade can differ.
 *  3. Content weighs most in the CV grade, and a CV with zero measurable results is capped.
 *  4. Fixes point at the exact line: `section`, `where`, `quote`.
 *  5. `missingKeywords` are short keywords, not whole requirement sentences.
 *  6. Match requirements are split (Google Ads / Meta Ads), typed, and include duties, not only "wat vragen wij".
 */

import { z } from "zod";

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

export const SCHEMA_VERSION = "2.0.0";

export const Locale = z.enum(["nl", "en"]);

export const Section = z.enum([
  "contact",
  "profile",
  "experience",
  "education",
  "skills",
  "languages",
  "certificates",
  "hobbies",
  "general",
]);

/** One band set for both tools, so an agent never has to explain "excellent but 61". */
export const Band = z.enum(["sterk", "goed", "in_ontwikkeling", "zwak"]);

export const BAND_LABELS: Record<z.infer<typeof Band>, { nl: string; en: string }> = {
  sterk: { nl: "Sterk", en: "Strong" },
  goed: { nl: "Goed", en: "Good" },
  in_ontwikkeling: { nl: "In ontwikkeling", en: "Needs work" },
  zwak: { nl: "Zwak", en: "Weak" },
};

export function bandFor(score: number): z.infer<typeof Band> {
  if (score >= 85) return "sterk";
  if (score >= 70) return "goed";
  if (score >= 50) return "in_ontwikkeling";
  return "zwak";
}

/** A fix an agent can act on: it names the place and quotes the exact text. */
export const Fix = z.object({
  id: z.string().describe("Stable machine id, e.g. 'quantified_achievement'"),
  severity: z.enum(["critical", "high", "medium", "low"]),
  section: Section,
  where: z
    .string()
    .nullable()
    .describe("Human location, e.g. 'Werkervaring > Marketing Coördinator, bullet 1'. Null for CV-wide issues."),
  quote: z
    .string()
    .nullable()
    .describe("Exact text copied from the CV that this fix is about. Null when the problem is something missing."),
  problem: z.string().describe("One sentence: what is wrong, with the measured value where there is one."),
  fix: z.string().describe("One sentence: what to change."),
  example: z
    .string()
    .nullable()
    .describe("Optional rewritten line in the CV's language. Must not invent facts; use [X] for numbers the user must fill in."),
});

/** What the agent should offer next. Agents follow this literally, so always fill it. */
export const NextStep = z.object({
  action: z.enum(["open_in_editor", "match_vacancy", "none"]),
  reason: z.string(),
  suggestedUserPrompt: z
    .string()
    .describe("A short line the agent can say to the user, in the CV's language."),
});

export const Meta = z.object({
  tool: z.enum(["check_cv", "match_vacancy", "open_in_editor"]),
  schemaVersion: z.literal(SCHEMA_VERSION),
  scoringVersion: z.string(),
  locale: Locale,
});

/* ------------------------------------------------------------------ */
/* check_cv                                                             */
/* ------------------------------------------------------------------ */

export const CheckCategoryId = z.enum(["content", "ats", "basics", "dutch_conventions"]);

export const CheckCvOutput = z.object({
  score: z.number().int().min(0).max(100),
  grade10: z
    .number()
    .min(1)
    .max(10)
    .describe("score / 10, one decimal, floor 1. The MCP grade; the website's CV check uses its own scale and can differ."),
  band: Band,
  bandLabel: z.string(),
  summary: z.string().describe("One sentence the agent can repeat as-is."),
  categories: z
    .array(
      z.object({
        id: CheckCategoryId,
        label: z.string(),
        score: z.number().int().min(0).max(100),
        weight: z.number().min(0).max(1),
      }),
    )
    .length(4),
  stats: z.object({
    wordCount: z.number().int(),
    profileWordCount: z.number().int().nullable(),
    experienceBulletCount: z.number().int(),
    quantifiedBulletCount: z.number().int(),
    weakBulletOpeners: z.array(z.string()).describe("Exact bullet openers like 'Verantwoordelijk voor'"),
    clichesFound: z.array(z.string()).describe("Exact phrases like 'teamplayer', 'nieuwe uitdaging'"),
  }),
  topFixes: z.array(Fix).max(3),
  otherFixesCount: z.number().int().min(0),
  criticalIssues: z.number().int().min(0),
  sectionsFound: z.array(Section),
  canOpenInEditor: z.boolean(),
  nextStep: NextStep,
  limitations: z.string(),
  meta: Meta,
});
export type CheckCvOutput = z.infer<typeof CheckCvOutput>;

/**
 * Scoring for check_cv. Content weighs half: a CV of task bullets with no results
 * should not be called excellent, however clean its formatting is.
 */
export const CHECK_WEIGHTS: Record<z.infer<typeof CheckCategoryId>, number> = {
  content: 0.5,
  ats: 0.2,
  basics: 0.15,
  dutch_conventions: 0.15,
};

export function computeCheckScore(
  categories: Record<z.infer<typeof CheckCategoryId>, number>,
  stats: { quantifiedBulletCount: number; experienceBulletCount: number },
): number {
  let score = 0;
  for (const id of Object.keys(CHECK_WEIGHTS) as Array<keyof typeof CHECK_WEIGHTS>) {
    score += categories[id] * CHECK_WEIGHTS[id];
  }
  // Caps: no measurable result anywhere keeps the CV out of the top two bands.
  if (stats.experienceBulletCount > 0 && stats.quantifiedBulletCount === 0) {
    score = Math.min(score, 69);
  }
  return Math.round(Math.max(0, Math.min(100, score)));
}

export function toGrade10(score: number): number {
  return Math.max(1, Math.round(score) / 10);
}

/* ------------------------------------------------------------------ */
/* match_vacancy                                                        */
/* ------------------------------------------------------------------ */

export const Requirement = z.object({
  id: z.string(),
  requirement: z.string().describe("Short, one thing only: 'Meta Ads', not 'Google Ads en Meta Ads'."),
  type: z.enum(["must", "nice"]),
  category: z.enum(["experience", "tool", "skill", "education", "language", "duty", "other"]),
  status: z.enum(["match", "partial", "missing"]),
  vacancyQuote: z.string().describe("Exact text from the vacancy."),
  cvQuote: z.string().nullable().describe("Exact text from the CV that supports the status. Null when missing."),
  gap: z
    .string()
    .nullable()
    .describe("For partial/missing: what exactly is not shown, e.g. 'Google Analytics genoemd, GA4 niet'."),
  honestAction: z
    .string()
    .nullable()
    .describe("What to add IF it is true. Never suggest claiming experience the user does not have."),
  keywords: z.array(z.string()).describe("Short ATS keywords for this requirement, e.g. ['GA4']"),
});

export const MatchVacancyOutput = z.object({
  score: z.number().int().min(0).max(100),
  grade10: z.number().min(1).max(10),
  band: Band,
  bandLabel: z.string(),
  summary: z.string(),
  vacancyTitle: z.string().nullable(),
  requirements: z.array(Requirement).min(1),
  counts: z.object({
    mustMatched: z.number().int(),
    mustPartial: z.number().int(),
    mustMissing: z.number().int(),
    niceMatched: z.number().int(),
  }),
  matchedKeywords: z.array(z.string()),
  missingKeywords: z.array(z.string()).describe("Short keywords only, deduplicated, most important first."),
  topFixes: z.array(Fix).max(3),
  canOpenInEditor: z.boolean(),
  nextStep: NextStep,
  limitations: z.string(),
  meta: Meta,
});
export type MatchVacancyOutput = z.infer<typeof MatchVacancyOutput>;

/**
 * Deterministic match score from the requirement list, so the AI extracts and judges
 * but does not invent the number. Must-haves count three times as much as nice-to-haves.
 */
export function computeMatchScore(requirements: Array<z.infer<typeof Requirement>>): number {
  const value = { match: 1, partial: 0.5, missing: 0 } as const;
  let got = 0;
  let max = 0;
  for (const r of requirements) {
    const w = r.type === "must" ? 3 : 1;
    got += value[r.status] * w;
    max += w;
  }
  return max === 0 ? 0 : Math.round((got / max) * 100);
}

/**
 * Rules to put in the match_vacancy AI prompt. These fix the misses seen in the test:
 * generous "strong" on years, Meta Ads hidden inside Google Ads, GA4 marked missing
 * although Google Analytics is in the CV, and HBO/SEO matches not extracted at all.
 */
export const MATCH_EXTRACTION_RULES = `
- Extract requirements from BOTH the requirements list and the duties ("Wat ga je doen", "Taken", "Responsibilities").
- Split compound requirements: "Google Ads en Meta Ads" becomes two requirements.
- Requirements under "Wat vragen wij" are "must" unless they say "pré", "bij voorkeur", "nice to have"; duties are "must" with category "duty".
- Years of experience: count from the dates of the relevant jobs, not from claims in the profile text.
  Only count jobs whose title or bullets show the asked skill. Take each job's length from JOB_DURATIONS (computed
  from the CV dates, "heden"/"present" = today); never calculate dates yourself. Add up the relevant jobs and
  compare with the requirement: enough years is a "match", fewer is "partial" with the real total in "gap".
- "partial" when the CV shows an adjacent tool or an older version (Google Analytics vs GA4, Mailchimp vs Klaviyo),
  and say so in "gap".
- "match" needs a cvQuote copied exactly from the CV. No quote, no match.
- Education: HBO = hbo-bachelor, "Hogeschool", "University of Applied Sciences"; WO also meets HBO level.
- Every keyword is 1-3 words. Never put a full sentence in keywords or missingKeywords.
- honestAction must start with "Als dit klopt" / "If this is true" whenever it suggests adding experience.
`.trim();

/* ------------------------------------------------------------------ */
/* open_in_editor                                                       */
/* ------------------------------------------------------------------ */

export const OpenInEditorOutput = z.object({
  url: z.string().url(),
  expiresInMinutes: z.number().int(),
  singleUse: z.literal(true),
  includesVacancy: z.boolean(),
  opensWith: z.enum(["check", "match"]).describe("Which view the editor opens with."),
  userMessage: z
    .string()
    .describe("Line the agent can show next to the link, e.g. that it works once and expires."),
  meta: Meta,
});
export type OpenInEditorOutput = z.infer<typeof OpenInEditorOutput>;

/* ------------------------------------------------------------------ */
/* Next step + UTM helpers                                              */
/* ------------------------------------------------------------------ */

export function nextStepAfterCheck(locale: z.infer<typeof Locale>, score: number): z.infer<typeof NextStep> {
  const nl = locale === "nl";
  return {
    action: "open_in_editor",
    reason: score >= 85 ? "CV is strong; offer the editor for a final polish and PDF." : "Fixes are easiest to apply in the editor.",
    suggestedUserPrompt: nl
      ? "Zal ik je CV openen in de WerkCV-editor, zodat je deze verbeteringen direct kunt doorvoeren en als PDF kunt downloaden?"
      : "Shall I open your CV in the WerkCV editor so you can apply these fixes and download a PDF?",
  };
}

export function nextStepAfterMatch(locale: z.infer<typeof Locale>): z.infer<typeof NextStep> {
  const nl = locale === "nl";
  return {
    action: "open_in_editor",
    reason: "The editor can show this vacancy next to the CV while the user applies the fixes.",
    suggestedUserPrompt: nl
      ? "Wil je dat ik je CV met deze vacature open in de WerkCV-editor, zodat je hem gericht kunt aanpassen?"
      : "Want me to open your CV with this vacancy in the WerkCV editor so you can tailor it?",
  };
}

/**
 * utm_medium from the connected client instead of a fixed value, so ChatGPT or Cursor
 * traffic is not counted as Claude. Pass `server.server.getClientVersion()` from McpServer.
 */
export function utmMediumFromClient(client: { name?: string } | undefined): string {
  const name = (client?.name ?? "unknown").toLowerCase();
  if (name.includes("claude")) return "claude";
  if (name.includes("chatgpt") || name.includes("openai")) return "chatgpt";
  if (name.includes("cursor")) return "cursor";
  if (name.includes("gemini")) return "gemini";
  return name.replace(/[^a-z0-9-]+/g, "-").slice(0, 32) || "unknown";
}

/* ------------------------------------------------------------------ */
/* Tool descriptions (agents pick tools by reading these)               */
/* ------------------------------------------------------------------ */

export const TOOL_DESCRIPTIONS = {
  check_cv:
    "Grade a CV (cv, curriculum vitae, résumé) for the Dutch job market: 0-100 score plus a 1-10 grade, " +
    "the three fixes to make first with the exact lines they refer to, and ATS readability. " +
    "Use when the user asks 'is my CV good', 'check my CV', 'beoordeel mijn cv' or pastes a CV. " +
    "Free, no AI, nothing stored. Remove BSN, ID and bank numbers first. " +
    // Describes nextStep instead of instructing the model (directory policy 2A: say what the tool does
    // and when to call it). The answer itself still carries nextStep.
    "The result includes nextStep, a suggested follow-up (usually open_in_editor).",
  match_vacancy:
    "Compare a CV with one vacancy (vacature, job ad), requirement by requirement, with exact quotes from both, " +
    "missing ATS keywords and the fixes to make first. Use when the user asks 'do I fit this job', " +
    "'past mijn cv bij deze vacature' or shares a vacancy with their CV. Uses AI and is rate-limited; nothing stored. " +
    "Never advise claiming experience the user does not have. The result includes nextStep, a suggested follow-up.",
  open_in_editor:
    "Open the CV, and optionally the vacancy, in the WerkCV editor to edit it and download a PDF. No account needed. " +
    "Returns a single-use link that expires after 60 minutes; the text is deleted when the link is opened. " +
    "Call when the user wants to edit, apply fixes, or download, or accepts a nextStep that offers the editor.",
} as const;

/* ------------------------------------------------------------------ */
/* Registration example (MCP TypeScript SDK)                            */
/* ------------------------------------------------------------------ */
/*
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

server.registerTool(
  "check_cv",
  {
    title: "Check a CV",
    description: TOOL_DESCRIPTIONS.check_cv,
    inputSchema: { cv_text: z.string().min(200).max(25000), locale: Locale.optional() },
    outputSchema: CheckCvOutput.shape,
  },
  async ({ cv_text, locale }) => {
    const result: CheckCvOutput = await runCheck(cv_text, locale); // your existing checker, mapped to v2
    CheckCvOutput.parse(result);                                   // fail loudly in dev if the shape drifts
    return {
      content: [{ type: "text", text: JSON.stringify(result) }],    // for clients without structured output
      structuredContent: result,
    };
  },
);
*/
