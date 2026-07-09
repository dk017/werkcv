import { NextResponse } from "next/server";

const BUILD_ID =
  process.env.APP_BUILD_ID ||
  process.env.NEXT_PUBLIC_APP_BUILD_ID ||
  "local";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  return NextResponse.json(
    { buildId: BUILD_ID },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "X-WerkCV-Build-ID": BUILD_ID,
      },
    },
  );
}
