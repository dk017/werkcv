import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildAgencyDodoCheckoutURL, isAgencyDodoConfigured } from "@/lib/dodo";
import { sanitizeAttribution } from "@/lib/attribution";

export const runtime = "nodejs";

function normalizeOptionalEmail(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const email = value.trim().toLowerCase();
  if (!email) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return undefined;
  return email;
}

export async function POST(request: NextRequest) {
  if (!isAgencyDodoConfigured()) {
    return NextResponse.json(
      { error: "Agency checkout is not configured yet.", code: "AGENCY_PRODUCT_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  let email: string | undefined;
  let locale: "nl" | "en" = "nl";
  let attribution: ReturnType<typeof sanitizeAttribution> = null;
  try {
    const body = await request.json();
    email = normalizeOptionalEmail(body?.email);
    locale = body?.locale === "en" ? "en" : "nl";
    attribution = sanitizeAttribution(body?.attribution);
  } catch {
    // Dodo can collect the email address on its hosted checkout page.
  }

  try {
    const checkout = await buildAgencyDodoCheckoutURL(email, locale, attribution);
    if (checkout.sessionId) {
      await prisma.paymentCheckout.create({
        data: {
          provider: "dodo",
          externalCheckoutId: checkout.sessionId,
          email: email || null,
          siteHost: checkout.siteHost,
          product: "agency",
        },
      });
    }

    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl });
  } catch (error) {
    console.error("agency_checkout_create_failed", error);
    return NextResponse.json(
      { error: "Could not start agency checkout.", code: "AGENCY_CHECKOUT_FAILED" },
      { status: 502 },
    );
  }
}
