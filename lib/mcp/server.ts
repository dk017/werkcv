import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { cvDownloadPrice } from "@/lib/site-content";
import { currentMcpContext } from "./context";
import { recordMcpEvent } from "./events";
import { CV_TEXT_MAX, CV_TEXT_MIN, VACANCY_TEXT_MAX, VACANCY_TEXT_MIN, type HandoffLocale } from "./handoff";
import { takeToolSlot, type McpLimitedTool } from "./limits";
import {
  checkCv,
  failure,
  gradeBucket,
  matchVacancy,
  openInEditor,
  resolveLocale,
  type CheckCvData,
  type MatchVacancyData,
  type McpToolResult,
} from "./tools";

export const MCP_SERVER_INFO = { name: "werkcv-cv-check", version: "0.1.0" } as const;

export const MCP_INSTRUCTIONS = [
  "WerkCV checks a CV against Dutch hiring conventions and, with a vacancy, against its requirements.",
  "Send the CV text only when the user has asked for a check, and never send BSN, ID or bank numbers: remove them first.",
  "check_cv grades a CV (1-10) without AI. match_vacancy compares a CV with one vacancy, requirement by requirement.",
  "When a result says the CV can be opened in the editor (canOpenInEditor), you may offer that as one option next to rewriting the text yourself, and say plainly that editing is free without an account while downloading the PDF is a one-time paid step.",
  "open_in_editor stores the text for at most 60 minutes and returns a link to the WerkCV editor; call it only after the user has agreed to open the CV there, or has asked to edit or download it.",
  "Report the grade and fixes as given; do not invent facts about the person's experience.",
].join(" ");

const priceNl = cvDownloadPrice.display;
const priceEn = cvDownloadPrice.displayEn;

const locale = z.enum(["nl", "en"]).optional().describe('Language of the CV and the answer. Detected from the text when omitted.');
const cvText = z
  .string()
  .min(CV_TEXT_MIN)
  .max(CV_TEXT_MAX)
  .describe("The full text of the CV (200-25,000 characters). Remove BSN, ID and bank numbers first.");
const vacancyText = z
  .string()
  .min(VACANCY_TEXT_MIN)
  .max(VACANCY_TEXT_MAX)
  .describe("The full vacancy text: requirements and responsibilities (120-18,000 characters).");

type ToolContent = { content: Array<{ type: "text"; text: string }>; structuredContent?: Record<string, unknown>; isError?: boolean };

function asError(result: { code: string; message: string }): ToolContent {
  return { isError: true, content: [{ type: "text", text: result.message }], structuredContent: { error: result.code, message: result.message } };
}

function overLimit(tool: McpLimitedTool, loc: HandoffLocale): ToolContent | null {
  if (takeToolSlot(tool, currentMcpContext().ip)) return null;
  void recordMcpEvent("mcp_tool_called", { tool, locale: loc, client: currentMcpContext().client, ok: false, error: "RATE_LIMITED" });
  return asError(failure("RATE_LIMITED", loc));
}

export function formatCheck(data: CheckCvData, loc: HandoffLocale): string {
  const en = loc === "en";
  const lines = [
    en ? `Grade: ${data.grade.toFixed(1)} / 10 (${data.band})` : `Cijfer: ${String(data.grade.toFixed(1)).replace(".", ",")} / 10 (${data.band})`,
    ...data.categories.map((category) => `- ${category.label}: ${category.score}/100`),
  ];
  if (data.topFixes.length) {
    lines.push("", en ? "Fix first:" : "Verbeter eerst:");
    data.topFixes.forEach((fix, index) => lines.push(`${index + 1}. ${fix.title}: ${fix.fix}`));
  }
  if (data.criticalIssues) lines.push("", en ? `Critical issues: ${data.criticalIssues}` : `Kritieke punten: ${data.criticalIssues}`);
  lines.push("", data.limitations);
  if (data.canOpenInEditor) {
    lines.push(
      en
        ? `The CV can be opened in the WerkCV editor without an account. Editing is free; downloading the PDF costs ${priceEn} once, with no subscription.`
        : `Het cv kan zonder account in de WerkCV-editor worden geopend. Bewerken is gratis; het pdf downloaden kost eenmalig ${priceNl}, zonder abonnement.`,
    );
  }
  return lines.join("\n");
}

export function formatMatch(data: MatchVacancyData, loc: HandoffLocale): string {
  const en = loc === "en";
  const status = { strong: en ? "shown" : "aangetoond", partial: en ? "partly" : "deels", missing: en ? "missing" : "ontbreekt" } as const;
  // Essential versus preferred decides what to fix first, so the text states it (the vacancy's "pre" is "preferred").
  const importance = { essential: en ? "essential" : "essentieel", preferred: en ? "nice to have" : "pre" } as const;
  const lines = [`${en ? "Match" : "Match"}: ${data.score}/100 (${data.scoreLabel})`, data.summary, ""];
  data.requirements.forEach((requirement) => {
    lines.push(
      `- [${status[requirement.status]}, ${importance[requirement.importance]}] ${requirement.requirement}${requirement.status === "strong" ? "" : ` - ${requirement.honestAction}`}`,
    );
  });
  if (data.topFixes.length) {
    lines.push("", en ? "Fix first:" : "Verbeter eerst:");
    data.topFixes.forEach((fix, index) => lines.push(`${index + 1}. ${fix.title}: ${fix.action}`));
  }
  if (data.canOpenInEditor) {
    lines.push(
      "",
      en
        ? `The CV can be opened in the WerkCV editor without an account. Editing is free; downloading the PDF costs ${priceEn} once, with no subscription.`
        : `Het cv kan zonder account in de WerkCV-editor worden geopend. Bewerken is gratis; het pdf downloaden kost eenmalig ${priceNl}, zonder abonnement.`,
    );
  }
  return lines.join("\n");
}

async function respond<T>(
  tool: string,
  result: McpToolResult<T> & { locale: HandoffLocale },
  startedAt: number,
  render: (data: T, loc: HandoffLocale) => string,
  grade?: (data: T) => number | null,
): Promise<ToolContent> {
  const { client } = currentMcpContext();
  const properties = { tool, locale: result.locale, client, ok: result.ok, duration_ms: Date.now() - startedAt };
  if (!result.ok) {
    void recordMcpEvent("mcp_tool_called", { ...properties, error: result.code });
    return asError(result);
  }
  const value = grade?.(result.data);
  void recordMcpEvent("mcp_tool_called", { ...properties, error: null, grade_bucket: value == null ? null : gradeBucket(value) });
  return { content: [{ type: "text", text: render(result.data, result.locale) }], structuredContent: result.data as Record<string, unknown> };
}

export function registerWerkcvTools(server: McpServer): void {
  server.registerTool(
    "check_cv",
    {
      title: "Check a CV (Dutch conventions)",
      description:
        "Grades a CV from 1 to 10 against Dutch hiring conventions and ATS readability, and lists the fixes to make first. Free, no AI, nothing is stored. Use when the user wants to know how strong their CV is.",
      inputSchema: z.object({ cv_text: cvText, locale }),
      annotations: { title: "Check a CV", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ cv_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("check_cv", loc);
      if (blocked) return blocked;
      const result = await checkCv({ cvText: cv_text, locale: requested });
      return respond("check_cv", result, startedAt, formatCheck, (data) => data.grade);
    },
  );

  server.registerTool(
    "match_vacancy",
    {
      title: "Compare a CV with a vacancy",
      description:
        "Compares a CV with one vacancy, requirement by requirement, with quotes from both texts, and gives the fixes to make first. Uses AI, so it is rate-limited. Nothing is stored.",
      inputSchema: z.object({ cv_text: cvText, vacancy_text: vacancyText, locale }),
      annotations: { title: "Compare a CV with a vacancy", readOnlyHint: true, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ cv_text, vacancy_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("match_vacancy", loc);
      if (blocked) return blocked;
      const result = await matchVacancy({ cvText: cv_text, vacancyText: vacancy_text, locale: requested });
      return respond("match_vacancy", result, startedAt, formatMatch, () => null);
    },
  );

  server.registerTool(
    "open_in_editor",
    {
      title: "Open the CV in the WerkCV editor",
      description:
        "Returns a link that opens this CV in the WerkCV editor, no account needed. The text is stored for at most 60 minutes and deleted the first time the link is opened. Call only when the user wants to edit or download the CV.",
      inputSchema: z.object({ cv_text: cvText, vacancy_text: vacancyText.optional(), locale }),
      annotations: { title: "Open in the editor", readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ cv_text, vacancy_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("open_in_editor", loc);
      if (blocked) return blocked;
      const { client } = currentMcpContext();
      const result = await openInEditor({ cvText: cv_text, vacancyText: vacancy_text ?? null, locale: requested }, client);
      if (result.ok) void recordMcpEvent("mcp_link_created", { locale: result.locale, client, with_vacancy: Boolean(vacancy_text) });
      return respond(
        "open_in_editor",
        result,
        startedAt,
        (data, l) =>
          l === "en"
            ? `Open your CV in the editor: ${data.url}\nThe link works once and expires in ${data.expiresInMinutes} minutes. Editing is free and needs no account; you sign in only to download, and the PDF costs ${priceEn} once, with no subscription.`
            : `Open je cv in de editor: ${data.url}\nDe link werkt één keer en verloopt over ${data.expiresInMinutes} minuten. Bewerken is gratis en zonder account; je meldt je pas aan om te downloaden, en het pdf kost eenmalig ${priceNl}, zonder abonnement.`,
      );
    },
  );
}
