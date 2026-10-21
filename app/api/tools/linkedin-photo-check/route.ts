import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { imageSize, judgePhotoWithAi, resolutionCheck, scorePhoto, takePhotoCheckBudget, type Locale } from "@/lib/tools/linkedin-photo-check";

/**
 * Free LinkedIn photo check. The photo is read in memory, sent to OpenAI for the judgement and never stored.
 * 10 checks per IP per hour, plus a shared daily cap (lib/tools/linkedin-photo-check.ts).
 */
const MAX_BYTES = 8 * 1024 * 1024;
const TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  let locale: Locale = "nl";
  const json = (status: number, body: Record<string, unknown>) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
  try {
    const form = await request.formData();
    locale = form.get("locale") === "en" ? "en" : "nl";
    const nl = locale === "nl";
    const file = form.get("photo");
    if (!(file instanceof File)) return json(400, { error: "NO_PHOTO", message: nl ? "Kies eerst een foto." : "Choose a photo first." });
    if (!TYPES.has(file.type)) return json(400, { error: "BAD_TYPE", message: nl ? "Gebruik een JPG, PNG of WebP-foto." : "Use a JPG, PNG or WebP photo." });
    if (file.size > MAX_BYTES) return json(413, { error: "TOO_LARGE", message: nl ? "Je foto is groter dan 8 MB." : "Your photo is larger than 8 MB." });

    const ip = getClientIp(request);
    if (!checkRateLimit(ip, { bucket: "linkedin_photo_check", maxRequests: 10, windowMs: 60 * 60 * 1000 }).allowed) {
      return json(429, { error: "RATE_LIMITED", message: nl ? "Je hebt het maximum van 10 checks per uur bereikt. Probeer het later opnieuw." : "You reached the limit of 10 checks per hour. Please try again later." });
    }
    if (!takePhotoCheckBudget()) {
      return json(503, { error: "BUSY", message: nl ? "De check is vandaag erg druk. Probeer het morgen opnieuw." : "The check is very busy today. Please try again tomorrow." });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const size = imageSize(bytes);
    const dataUrl = `data:${file.type};base64,${Buffer.from(bytes).toString("base64")}`;
    const judgement = await judgePhotoWithAi(dataUrl, locale);
    const result = scorePhoto(judgement, resolutionCheck(size, locale));
    return json(200, { ...result, width: size?.width ?? null, height: size?.height ?? null });
  } catch (error) {
    // Never log the photo; only that the check failed.
    console.error("linkedin_photo_check_failed", { name: error instanceof Error ? error.name : "unknown" });
    return json(500, { error: "FAILED", message: locale === "nl" ? "De check is mislukt. Probeer het opnieuw." : "The check failed. Please try again." });
  }
}
