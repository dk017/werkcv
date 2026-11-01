import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { buildExtensionData } from "@/lib/sponsor/extension-data";
import { getSponsorRegister } from "@/lib/sponsor/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// The Chrome extension fetches this once a day per install, with If-None-Match, so no rate limit is needed. The ETag
// follows the register date and the data contents, not the request time, so an unchanged register answers 304.

let cached: { key: string; body: string; etag: string } | null = null;

export async function GET(request: NextRequest) {
  try {
    const register = await getSponsorRegister();
    const key = `${register.registerDate}:${register.entries.length}`;
    if (!cached || cached.key !== key) {
      const data = buildExtensionData(register);
      const etag = `"${createHash("sha256").update(JSON.stringify({ ...data, generatedAt: null })).digest("hex").slice(0, 32)}"`;
      cached = { key, body: JSON.stringify(data), etag };
    }

    const headers = {
      "Cache-Control": "public, max-age=86400",
      ETag: cached.etag,
      "Access-Control-Allow-Origin": "*",
    };
    if (request.headers.get("if-none-match") === cached.etag) return new NextResponse(null, { status: 304, headers });
    return new NextResponse(cached.body, { headers: { ...headers, "Content-Type": "application/json; charset=utf-8" } });
  } catch {
    return NextResponse.json({ error: "The register is temporarily unavailable." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
