import type { McpServer } from "@modelcontextprotocol/server";
import { z } from "zod";
import { currentMcpContext } from "./context";
import { recordMcpEvent } from "./events";
import { CV_TEXT_MAX, CV_TEXT_MIN, VACANCY_TEXT_MAX, VACANCY_TEXT_MIN, type HandoffLocale } from "./handoff";
import { takeToolSlot, type McpLimitedTool } from "./limits";
import { checkCv, failure, gradeBucket, matchVacancy, openInEditor, resolveLocale, type McpToolResult } from "./tools";
import { CheckCvOutput, MatchVacancyOutput, OpenInEditorOutput, TOOL_DESCRIPTIONS } from "./v2/contract";
import { resolveUtmMedium } from "./v2/open";

export const MCP_SERVER_INFO = { name: "werkcv-cv-check", version: "0.1.0" } as const;

export const MCP_INSTRUCTIONS = [
  "WerkCV checks a CV against Dutch hiring conventions and, with a vacancy, against its requirements.",
  "Send the CV text only when the user has asked for a check, and never send BSN, ID or bank numbers: remove them first.",
  "check_cv grades a CV (1-10) without AI. match_vacancy compares a CV with one vacancy, requirement by requirement.",
  "open_in_editor opens the CV in the WerkCV editor and returns a one-time link; the text is stored for at most 60 minutes and deleted when the link is first opened. Call it when the user asks to edit the CV in that editor or to download it as a PDF.",
  "Report the grade and fixes as given; do not invent facts about the person's experience.",
].join(" ");

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

/**
 * v2 answers: the same object as structuredContent and as a JSON text block (for clients without
 * structured output). Outside production every answer is checked against its contract schema, so a
 * drifting shape fails loudly in development and tests.
 */
async function respond<T>(
  tool: string,
  result: McpToolResult<T> & { locale: HandoffLocale },
  startedAt: number,
  schema: { parse: (value: unknown) => unknown },
  grade?: (data: T) => number | null,
): Promise<ToolContent> {
  const { client } = currentMcpContext();
  const properties = { tool, locale: result.locale, client, ok: result.ok, duration_ms: Date.now() - startedAt };
  if (!result.ok) {
    void recordMcpEvent("mcp_tool_called", { ...properties, error: result.code });
    return asError(result);
  }
  const content = successContent(result.data, schema);
  const value = grade?.(result.data);
  void recordMcpEvent("mcp_tool_called", { ...properties, error: null, grade_bucket: value == null ? null : gradeBucket(value) });
  return content;
}

/** A successful v2 answer: validated outside production, returned as structuredContent and as JSON text. */
export function successContent<T>(data: T, schema: { parse: (value: unknown) => unknown }): ToolContent {
  if (process.env.NODE_ENV !== "production") schema.parse(data);
  return { content: [{ type: "text", text: JSON.stringify(data) }], structuredContent: data as Record<string, unknown> };
}

export function registerWerkcvTools(server: McpServer): void {
  server.registerTool(
    "check_cv",
    {
      title: "Check a CV (Dutch conventions)",
      description: TOOL_DESCRIPTIONS.check_cv,
      inputSchema: z.object({ cv_text: cvText, locale }),
      outputSchema: CheckCvOutput,
      annotations: { title: "Check a CV", readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ cv_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("check_cv", loc);
      if (blocked) return blocked;
      const result = await checkCv({ cvText: cv_text, locale: requested });
      return respond("check_cv", result, startedAt, CheckCvOutput, (data) => data.grade10);
    },
  );

  server.registerTool(
    "match_vacancy",
    {
      title: "Compare a CV with a vacancy",
      description: TOOL_DESCRIPTIONS.match_vacancy,
      inputSchema: z.object({ cv_text: cvText, vacancy_text: vacancyText, locale }),
      outputSchema: MatchVacancyOutput,
      annotations: { title: "Compare a CV with a vacancy", readOnlyHint: true, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ cv_text, vacancy_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("match_vacancy", loc);
      if (blocked) return blocked;
      const result = await matchVacancy({ cvText: cv_text, vacancyText: vacancy_text, locale: requested });
      return respond("match_vacancy", result, startedAt, MatchVacancyOutput, (data) => data.grade10);
    },
  );

  server.registerTool(
    "open_in_editor",
    {
      title: "Open the CV in the WerkCV editor",
      description: TOOL_DESCRIPTIONS.open_in_editor,
      inputSchema: z.object({ cv_text: cvText, vacancy_text: vacancyText.optional(), locale }),
      outputSchema: OpenInEditorOutput,
      annotations: { title: "Open in the editor", readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ cv_text, vacancy_text, locale: requested }) => {
      const startedAt = Date.now();
      const loc = resolveLocale(requested, cv_text);
      const blocked = overLimit("open_in_editor", loc);
      if (blocked) return blocked;
      const { client } = currentMcpContext();
      // The client's own name when the server has it (initialize), else the User-Agent label (stateless route).
      const utmMedium = resolveUtmMedium(server.server.getClientVersion(), client);
      const result = await openInEditor({ cvText: cv_text, vacancyText: vacancy_text ?? null, locale: requested }, utmMedium);
      if (result.ok) void recordMcpEvent("mcp_link_created", { locale: result.locale, client, with_vacancy: Boolean(vacancy_text) });
      return respond("open_in_editor", result, startedAt, OpenInEditorOutput);
    },
  );
}
