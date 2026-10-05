import { reportOpsIncident } from "@/lib/ops-alerts";
import { aiDailyCap, takeAiBudget } from "./limits";

export type AiBudgetSource = "match_vacancy" | "handoff_exchange";

type Reporter = typeof reportOpsIncident;

let alertedDay = "";

/** Tells us once per UTC day that the daily AI budget is used up, so users are not silently refused. */
export function alertAiCapReached(
  source: AiBudgetSource,
  now = new Date(),
  report: Reporter = reportOpsIncident,
  cap = aiDailyCap(),
): boolean {
  const day = now.toISOString().slice(0, 10);
  if (alertedDay === day) return false;
  alertedDay = day;
  void report({
    event: "ops_ai_tool_failed",
    route: "/api/mcp",
    stage: "daily_cap_reached",
    error: new Error(`MCP daily AI cap reached (${source})`),
    context: { tool: "mcp", cap, source },
  }).catch(() => undefined);
  return true;
}

/** One unit of the daily AI budget shared by match_vacancy and opening a handoff link; alerts when it runs out. */
export function takeAiBudgetOrAlert(source: AiBudgetSource): boolean {
  if (takeAiBudget()) return true;
  alertAiCapReached(source);
  return false;
}

export function resetAlertForTests(): void {
  alertedDay = "";
}
