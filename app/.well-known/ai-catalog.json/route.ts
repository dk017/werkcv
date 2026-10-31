import { AI_CATALOG, AI_CATALOG_MEDIA_TYPE, discoveryPreflight, discoveryResponse } from "@/lib/mcp/server-card";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Domain-level AI Catalog: how the Server Card spec expects clients to find /api/mcp/server-card.
export function GET(request: Request) {
  return discoveryResponse(request, AI_CATALOG, AI_CATALOG_MEDIA_TYPE);
}

export { discoveryPreflight as OPTIONS };
