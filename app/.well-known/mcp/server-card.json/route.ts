import { discoveryPreflight, discoveryResponse, SERVER_CARD, SERVER_CARD_MEDIA_TYPE } from "@/lib/mcp/server-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Same card as /api/mcp/server-card, at the well-known path that SEP-1649 used and agent-readiness scanners still check.
export function GET(request: Request) {
  return discoveryResponse(request, SERVER_CARD, SERVER_CARD_MEDIA_TYPE);
}

export { discoveryPreflight as OPTIONS };
