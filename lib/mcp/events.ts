import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type McpEventName = "mcp_tool_called" | "mcp_link_created" | "mcp_handoff_opened";

/**
 * Counts only: tool name, locale, client, outcome, grade bucket, duration. Never CV or vacancy text,
 * never an IP address. Best effort: a failed write must not fail the tool call.
 */
export async function recordMcpEvent(event: McpEventName, properties: Record<string, string | number | boolean | null>): Promise<void> {
  try {
    await prisma.analyticsEvent.create({
      data: { event, path: "/api/mcp", properties: properties as Prisma.InputJsonValue },
    });
  } catch (error) {
    console.error("mcp_event_failed", { event, error: error instanceof Error ? error.name : "unknown" });
  }
}
