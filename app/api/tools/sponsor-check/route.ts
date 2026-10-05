import { NextRequest, NextResponse } from "next/server";
import { kvkFromQuery, searchSponsors } from "@/lib/sponsor/register";
import { getSponsorRegister } from "@/lib/sponsor/store";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MESSAGES = {
  tooShort: {
    nl: "Vul minstens twee tekens van de naam van de werkgever in, of een KvK-nummer van acht cijfers.",
    en: "Enter at least two characters of the employer's name, or an eight-digit KvK number.",
  },
  limited: {
    nl: "Te veel zoekopdrachten. Wacht een paar minuten en probeer het opnieuw.",
    en: "Too many searches. Please wait a few minutes and try again.",
  },
  unavailable: {
    nl: "Het register is tijdelijk niet beschikbaar. Probeer het zo opnieuw, of zoek in het openbaar register van de IND.",
    en: "The register is temporarily unavailable. Please try again shortly, or search the IND's public register.",
  },
} as const;

/**
 * One call answers the question: is this employer on the IND public register of recognised sponsors? Public
 * register data, no account. Answers: listed (the distinctive part of the name matches), possible (close names)
 * or not_found, with the matching register entries (name and KvK number).
 */
export async function GET(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get("locale") === "nl" ? "nl" : "en";
  const query = (request.nextUrl.searchParams.get("q") || "").trim().slice(0, 160);
  if (query.length < 2) {
    return NextResponse.json({ error: MESSAGES.tooShort[locale] }, { status: 400, headers: { "Cache-Control": "no-store" } });
  }

  const limit = checkRateLimit(getClientIp(request), { bucket: "sponsor-check", maxRequests: 60, windowMs: 10 * 60 * 1000 });
  if (!limit.allowed) {
    return NextResponse.json({ error: MESSAGES.limited[locale] }, { status: 429, headers: { "Retry-After": "600", "Cache-Control": "no-store" } });
  }

  try {
    const register = await getSponsorRegister();
    const result = searchSponsors(register, query, 10);
    return NextResponse.json(
      { query, queryKind: kvkFromQuery(query) ? "kvk" : "name", registerDate: register.registerDate, ...result },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  } catch {
    return NextResponse.json({ error: MESSAGES.unavailable[locale] }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
