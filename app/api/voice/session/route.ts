import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { isVoiceCvEnabled } from "@/lib/voice-feature";

export const runtime = "nodejs";

const requestSchema = z.object({
  cvId: z.string().uuid(),
  uiLanguage: z.enum(["nl", "en"]),
});

const SESSION_LIMIT = Number(process.env.VOICE_CV_SESSION_LIMIT_PER_HOUR || 10);
const DEFAULT_TRANSCRIPTION_MODEL = "gpt-live-transcribe";

function noStore(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isVoiceCvEnabled()) return noStore({ error: "Voice mode is unavailable.", code: "FEATURE_DISABLED" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return noStore({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return noStore({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  if (Number(request.headers.get("content-length") || 0) > 10_000) {
    return noStore({ error: "Invalid request.", code: "REQUEST_TOO_LARGE" }, 413);
  }

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "voice-realtime-session",
    maxRequests: Number.isFinite(SESSION_LIMIT) ? SESSION_LIMIT : 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return noStore({ error: "Voice session limit reached.", code: "RATE_LIMITED" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return noStore({ error: "Invalid request.", code: "INVALID_REQUEST" }, 400);
  }
  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) return noStore({ error: "Invalid request.", code: "INVALID_REQUEST" }, 400);

  const ownedCv = await prisma.cVDocument.findFirst({
    where: { id: parsed.data.cvId, userId: user.id, agencySubscriptionId: null },
    select: { id: true },
  });
  if (!ownedCv) return noStore({ error: "CV not found.", code: "CV_NOT_FOUND" }, 404);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return noStore({ error: "Voice service is not configured.", code: "NOT_CONFIGURED" }, 503);

  const model = process.env.OPENAI_VOICE_TRANSCRIBE_MODEL || DEFAULT_TRANSCRIPTION_MODEL;
  const language = parsed.data.uiLanguage;
  const safetyIdentifier = createHash("sha256").update(`werkcv:${user.id}`).digest("hex");

  try {
    const upstream = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "OpenAI-Safety-Identifier": safetyIdentifier,
      },
      body: JSON.stringify({
        session: {
          type: "transcription",
          audio: {
            input: {
              transcription: {
                model,
                language,
                prompt: language === "en"
                  ? "CV, resume, employer names, job titles, education, qualifications, dates, email addresses, phone numbers, Dutch place names and professional acronyms."
                  : "CV, werkervaring, werkgeversnamen, functietitels, opleidingen, diploma's, datums, e-mailadressen, telefoonnummers, Nederlandse plaatsnamen en vaktermen.",
              },
              turn_detection: null,
              noise_reduction: { type: "near_field" },
            },
          },
        },
      }),
      signal: AbortSignal.timeout(12_000),
    });

    if (!upstream.ok) {
      console.error("voice_session_create_failed", { status: upstream.status, userId: user.id });
      return noStore({ error: "Could not start voice transcription.", code: "UPSTREAM_FAILED" }, 502);
    }

    const data = await upstream.json() as { value?: string; expires_at?: number };
    if (!data.value) {
      console.error("voice_session_create_failed", { status: upstream.status, userId: user.id, code: "MISSING_SECRET" });
      return noStore({ error: "Could not start voice transcription.", code: "UPSTREAM_FAILED" }, 502);
    }

    return noStore({
      clientSecret: data.value,
      expiresAt: new Date((data.expires_at || Math.floor(Date.now() / 1000) + 60) * 1000).toISOString(),
      model,
    });
  } catch (error) {
    console.error("voice_session_create_failed", {
      userId: user.id,
      code: error instanceof Error && error.name === "TimeoutError" ? "TIMEOUT" : "NETWORK_ERROR",
    });
    return noStore({ error: "Could not start voice transcription.", code: "UPSTREAM_FAILED" }, 502);
  }
}
