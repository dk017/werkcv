import { NextRequest, NextResponse } from "next/server";
import { APP_V2_COOKIE, safeAppV2Next } from "@/lib/app-v2";

// /app-v2?aan=1 turns the new app on for this browser, /app-v2?aan=0 turns it off.
export async function GET(request: NextRequest) {
  const on = request.nextUrl.searchParams.get("aan") !== "0";
  const next = safeAppV2Next(request.nextUrl.searchParams.get("next"));
  const response = NextResponse.redirect(new URL(next, request.url));
  response.cookies.set(APP_V2_COOKIE, on ? "1" : "0", {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  return response;
}
