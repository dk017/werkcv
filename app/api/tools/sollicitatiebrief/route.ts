import { createHmac } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { generateSollicitatiebrief } from "@/lib/tools/sollicitatiebrief";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

type LetterLocale = "nl" | "en";

const MAX_REQUEST_BYTES = 30_000;
const LIMITS = {
  naam: 100,
  doelrol: 160,
  bedrijfsnaam: 160,
  vacaturetekst: 6_000,
  motivatie: 4_000,
  bedrijfsmotivatie: 1_500,
} as const;

function toLocale(value: unknown): LetterLocale {
  return value === "en" ? "en" : "nl";
}

function message(locale: LetterLocale, nl: string, en: string): string {
  return locale === "en" ? en : nl;
}

function textField(body: Record<string, unknown>, key: keyof typeof LIMITS): string {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
}

function safetyIdentifier(ip: string): string | undefined {
  const secret = process.env.OPENAI_API_KEY;
  if (!secret || ip === "unknown") return undefined;
  return createHmac("sha256", secret).update(`sollicitatiebrief:${ip}`).digest("hex");
}

export async function POST(request: NextRequest) {
  let locale = toLocale(request.nextUrl.searchParams.get("locale"));
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_REQUEST_BYTES) {
    return NextResponse.json(
      { error: message(locale, "De invoer is te lang.", "The input is too long.") },
      { status: 413 },
    );
  }

  const ip = getClientIp(request);
  const { allowed } = checkRateLimit(ip, {
    bucket: "sollicitatiebrief",
    maxRequests: 8,
    windowMs: 60 * 60 * 1000,
  });

  if (!allowed) {
    return NextResponse.json(
      {
        error: message(
          locale,
          "Je hebt het maximale aantal gratis brieven bereikt. Probeer het over een uur opnieuw.",
          "You have reached the free letter limit. Please try again in about an hour.",
        ),
      },
      { status: 429 },
    );
  }

  try {
    const rawBody: unknown = await request.json();
    const body = rawBody && typeof rawBody === "object"
      ? rawBody as Record<string, unknown>
      : {};
    locale = toLocale(body.locale);

    const naam = textField(body, "naam");
    const doelrol = textField(body, "doelrol");
    const bedrijfsnaam = textField(body, "bedrijfsnaam");
    const vacaturetekst = textField(body, "vacaturetekst");
    const motivatie = textField(body, "motivatie");
    const bedrijfsmotivatie = textField(body, "bedrijfsmotivatie");
    const toon = body.toon === "enthousiast" || body.toon === "beknopt"
      ? body.toon
      : "professioneel";

    const fields = { naam, doelrol, bedrijfsnaam, vacaturetekst, motivatie, bedrijfsmotivatie };
    const oversizedField = (Object.keys(LIMITS) as Array<keyof typeof LIMITS>)
      .find((key) => fields[key].length > LIMITS[key]);

    if (oversizedField) {
      return NextResponse.json(
        {
          error: message(
            locale,
            `Het veld '${oversizedField}' is te lang.`,
            `The '${oversizedField}' field is too long.`,
          ),
        },
        { status: 400 },
      );
    }

    if (doelrol.length < 2 || motivatie.length < 20) {
      return NextResponse.json(
        {
          error: message(
            locale,
            "Vul je doelrol en minimaal 20 tekens controleerbare achtergrond in.",
            "Enter your target role and at least 20 characters of verifiable background.",
          ),
        },
        { status: 400 },
      );
    }

    if (vacaturetekst && vacaturetekst.length < 20) {
      return NextResponse.json(
        {
          error: message(
            locale,
            "Plak minimaal 20 tekens van de vacature of laat het veld leeg.",
            "Paste at least 20 characters from the vacancy or leave the field empty.",
          ),
        },
        { status: 400 },
      );
    }

    const brief = await generateSollicitatiebrief({
      naam,
      doelrol,
      bedrijfsnaam,
      vacaturetekst,
      motivatie,
      bedrijfsmotivatie,
      toon,
      locale,
      safetyIdentifier: safetyIdentifier(ip),
    });

    if (!brief) {
      throw new Error("OpenAI returned an empty letter");
    }

    return NextResponse.json({ brief });
  } catch (error) {
    console.error("sollicitatiebrief error", {
      error: error instanceof Error ? error.message : "unknown",
    });
    return NextResponse.json(
      {
        error: message(
          locale,
          "Genereren mislukt. Probeer het opnieuw.",
          "Generation failed. Please try again.",
        ),
      },
      { status: 500 },
    );
  }
}
