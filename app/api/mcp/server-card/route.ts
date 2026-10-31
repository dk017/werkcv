import { discoveryPreflight, discoveryResponse, SERVER_CARD, SERVER_CARD_MEDIA_TYPE } from "@/lib/mcp/server-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Server Card at the spec's default location (<streamable-http-url>/server-card).
export function GET(request: Request) {
  return discoveryResponse(request, SERVER_CARD, SERVER_CARD_MEDIA_TYPE);
}

export { discoveryPreflight as OPTIONS };
