import { AsyncLocalStorage } from "node:async_hooks";

export type McpClient = "claude" | "chatgpt" | "cursor" | "unknown";

export type McpRequestContext = { ip: string; client: McpClient };

/** Set by the route around each request, so tool callbacks can rate-limit and attribute without a session. */
export const mcpRequestContext = new AsyncLocalStorage<McpRequestContext>();

export function currentMcpContext(): McpRequestContext {
  return mcpRequestContext.getStore() ?? { ip: "unknown", client: "unknown" };
}

/** Best-effort client name from the User-Agent; only used to label links and counts. */
export function classifyMcpClient(userAgent: string | null): McpClient {
  const ua = (userAgent ?? "").toLowerCase();
  if (ua.includes("claude") || ua.includes("anthropic")) return "claude";
  if (ua.includes("chatgpt") || ua.includes("openai")) return "chatgpt";
  if (ua.includes("cursor")) return "cursor";
  return "unknown";
}
