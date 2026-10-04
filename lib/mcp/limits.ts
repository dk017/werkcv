import { checkRateLimit } from "@/lib/tools/rate-limit";

export type McpLimitedTool = "check_cv" | "match_vacancy" | "open_in_editor";

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/**
 * Per-IP limits. match_vacancy mirrors /api/cv-check (8 per hour, 20 per day): it is the tool that
 * calls the AI. The in-memory limiter resets on restart, so AI calls also have a daily cap below.
 */
export function takeToolSlot(tool: McpLimitedTool, ip: string): boolean {
  switch (tool) {
    case "check_cv":
      return checkRateLimit(ip, { bucket: "mcp-check-cv", maxRequests: 30, windowMs: HOUR }).allowed;
    case "match_vacancy":
      return (
        checkRateLimit(ip, { bucket: "mcp-match-hour", maxRequests: 8, windowMs: HOUR }).allowed &&
        checkRateLimit(ip, { bucket: "mcp-match-day", maxRequests: 20, windowMs: DAY }).allowed
      );
    case "open_in_editor":
      return checkRateLimit(ip, { bucket: "mcp-open-editor", maxRequests: 5, windowMs: HOUR }).allowed;
  }
}

/** The CV text of a handoff is parsed with AI when the editor opens, so that exchange is limited too. */
export function takeExchangeSlot(ip: string): boolean {
  return checkRateLimit(ip, { bucket: "mcp-handoff-exchange", maxRequests: 10, windowMs: HOUR }).allowed;
}

const DEFAULT_AI_DAILY_CAP = 300;
let aiDay = "";
let aiCalls = 0;

export function aiDailyCap(env: Record<string, string | undefined> = process.env): number {
  const parsed = Number.parseInt(env.MCP_AI_DAILY_CAP ?? "", 10);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : DEFAULT_AI_DAILY_CAP;
}

/** One unit of the daily budget for AI-backed calls (UTC day); false once the cap is reached. */
export function takeAiBudget(now = new Date(), cap = aiDailyCap()): boolean {
  const day = now.toISOString().slice(0, 10);
  if (day !== aiDay) {
    aiDay = day;
    aiCalls = 0;
  }
  if (aiCalls >= cap) return false;
  aiCalls += 1;
  return true;
}

export function resetAiBudgetForTests(): void {
  aiDay = "";
  aiCalls = 0;
}
