import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { assignBuildFirstArm, BUILD_FIRST_COOKIE, BUILD_FIRST_COOKIE_MAX_AGE, parseBuildFirstArm } from "@/lib/build-first";

const PRIMARY_HOST = "werkcv.nl";
const BUILD_ID =
  process.env.APP_BUILD_ID ||
  process.env.NEXT_PUBLIC_APP_BUILD_ID ||
  "local";

const NO_STORE_PATH_PREFIXES = [
  "/editor",
  "/en/editor",
  "/login",
  "/cover-letter",
  "/api/auth",
  "/api/checkout",
  "/api/pdf",
  "/api/pdf-preview",
  "/api/build-version",
];

function shouldDisableCache(pathname: string): boolean {
  return NO_STORE_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function withRuntimeHeaders(response: NextResponse, pathname: string) {
  response.headers.set("X-WerkCV-Build-ID", BUILD_ID);

  if (shouldDisableCache(pathname)) {
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const rawHost = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = rawHost.toLowerCase().split(":")[0];
  const pathname = request.nextUrl.pathname;

  if (hostname !== "www.werkcv.nl") {
    const response = NextResponse.next();
    // Build-first split (lib/build-first.ts): assign once per browser, on the first editor visit.
    if ((pathname === "/editor" || pathname === "/en/editor") && !parseBuildFirstArm(request.cookies.get(BUILD_FIRST_COOKIE)?.value)) {
      const arm = assignBuildFirstArm();
      // Make the arm visible to this same request's page render, then keep it for 90 days.
      request.cookies.set(BUILD_FIRST_COOKIE, arm);
      const forwarded = NextResponse.next({ request: { headers: request.headers } });
      forwarded.cookies.set(BUILD_FIRST_COOKIE, arm, { path: "/", maxAge: BUILD_FIRST_COOKIE_MAX_AGE, sameSite: "lax", secure: request.nextUrl.protocol === "https:" });
      return withRuntimeHeaders(forwarded, pathname);
    }
    return withRuntimeHeaders(response, pathname);
  }

  const url = request.nextUrl.clone();
  url.hostname = PRIMARY_HOST;
  url.port = "";

  return withRuntimeHeaders(NextResponse.redirect(url, 308), pathname);
}

export const config = {
  matcher: "/:path*",
};
