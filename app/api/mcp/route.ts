import { createMcpHandler } from "mcp-handler";
import { classifyMcpClient, mcpRequestContext } from "@/lib/mcp/context";
import { MCP_INSTRUCTIONS, MCP_SERVER_INFO, registerWerkcvTools } from "@/lib/mcp/server";
import { getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Remote MCP server (stateless Streamable HTTP, no sign-in): CV check, vacancy match, link to the editor.
// Spec: docs/product/2026-10-04-werkcv-cv-mcp-spec.md. Off unless MCP_ENABLED=true.
const handler = createMcpHandler(registerWerkcvTools, {
  serverInfo: MCP_SERVER_INFO,
  instructions: MCP_INSTRUCTIONS,
});

async function serve(request: Request): Promise<Response> {
  if (process.env.MCP_ENABLED !== "true") return new Response("Not found", { status: 404 });
  return mcpRequestContext.run(
    { ip: getClientIp(request), client: classifyMcpClient(request.headers.get("user-agent")) },
    () => handler(request),
  );
}

export { serve as GET, serve as POST };
