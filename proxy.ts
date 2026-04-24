import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const PRIMARY_HOST = "werkcv.nl";

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const rawHost = forwardedHost ?? request.headers.get("host") ?? "";
  const hostname = rawHost.toLowerCase().split(":")[0];

  if (hostname !== "www.werkcv.nl") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.hostname = PRIMARY_HOST;

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: "/:path*",
};
