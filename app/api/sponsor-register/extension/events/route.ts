import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The only telemetry the Chrome extension sends: a count that a job site's layout no longer yields employers, at most
// once a day per site per install. No URL, page text or identifier; the line in the server log is the record.

const EVENTS = new Set(["layout_miss"]);
const SITES = new Set(["linkedin", "indeed"]);

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(getClientIp(request), { bucket: "sponsor-extension-events", maxRequests: 20, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) return new NextResponse(null, { status: 429 });

  let body: { event?: unknown; site?: unknown; version?: unknown } = {};
  try {
    body = JSON.parse((await request.text()).slice(0, 500));
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (typeof body.event !== "string" || !EVENTS.has(body.event) || typeof body.site !== "string" || !SITES.has(body.site)) {
    return new NextResponse(null, { status: 400 });
  }
  const version = typeof body.version === "string" && /^\d+(?:\.\d+){0,3}$/.test(body.version) ? body.version : "unknown";
  console.info(JSON.stringify({ type: "sponsor_extension_event", event: body.event, site: body.site, version }));
  return new NextResponse(null, { status: 204, headers: { "Access-Control-Allow-Origin": "*" } });
}
