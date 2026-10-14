import { NextRequest, NextResponse } from "next/server";
import { APP_V2_COOKIE, safeAppV2Next } from "@/lib/app-v2";

// /app-v2?aan=1 turns the new app on for this browser, /app-v2?aan=0 turns it off.
export async function GET(request: NextRequest) {
  const on = request.nextUrl.searchParams.get("aan") !== "0";
  const next = safeAppV2Next(request.nextUrl.searchParams.get("next"));
  // Relative Location: behind the proxy request.url carries the container address
  // (http://0.0.0.0:3000), so an absolute redirect sent people there. `next` is a same-site path.
  const response = new NextResponse(null, { status: 307, headers: { Location: next } });
  response.cookies.set(APP_V2_COOKIE, on ? "1" : "0", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  return response;
}
