import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { buildVoiceCvChanges, getVoiceFollowUpQuestions, getVoiceMissingCoreDetails, voiceProposalRequestSchema } from "@/lib/voice-cv";
import { extractVoiceCvCandidate } from "@/lib/voice-cv-ai";
import { isVoiceCvEnabled } from "@/lib/voice-feature";

export const runtime = "nodejs";

const PROPOSAL_LIMIT = Number(process.env.VOICE_CV_PROPOSAL_LIMIT_PER_HOUR || 10);
const PROPOSAL_TIMEOUT_MS = Number(process.env.VOICE_CV_PROPOSAL_TIMEOUT_MS || 60_000);

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
  if (Number(request.headers.get("content-length") || 0) > 1_000_000) {
    return noStore({ error: "Voice interview is too large.", code: "REQUEST_TOO_LARGE" }, 413);
  }

  const rateLimit = checkRateLimit(`${user.id}:${getClientIp(request).slice(0, 120)}`, {
    bucket: "voice-cv-proposal",
    maxRequests: Number.isFinite(PROPOSAL_LIMIT) ? PROPOSAL_LIMIT : 10,
    windowMs: 60 * 60 * 1000,
  });
  if (!rateLimit.allowed) return noStore({ error: "Voice proposal limit reached.", code: "RATE_LIMITED" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return noStore({ error: "Invalid request.", code: "INVALID_REQUEST" }, 400);
  }
  const parsed = voiceProposalRequestSchema.safeParse(body);
  if (!parsed.success) return noStore({ error: "Invalid voice interview.", code: "INVALID_REQUEST" }, 400);

  const ownedCv = await prisma.cVDocument.findFirst({
    where: { id: parsed.data.cvId, userId: user.id, agencySubscriptionId: null },
    select: { id: true },
  });
  if (!ownedCv) return noStore({ error: "CV not found.", code: "CV_NOT_FOUND" }, 404);

  const nonEmptyAnswers = parsed.data.answers.filter((answer) => answer.transcript.trim());
  if (nonEmptyAnswers.length === 0) return noStore({ error: "Add at least one answer.", code: "EMPTY_INTERVIEW" }, 400);

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    Number.isFinite(PROPOSAL_TIMEOUT_MS) ? PROPOSAL_TIMEOUT_MS : 60_000,
  );
  try {
    const candidate = await extractVoiceCvCandidate(
      nonEmptyAnswers,
      parsed.data.uiLanguage,
      parsed.data.currentCv,
      controller.signal,
    );
    const changes = buildVoiceCvChanges(parsed.data.currentCv, candidate, nonEmptyAnswers);
    return noStore({
      proposalId: randomUUID(),
      changes,
      warnings: candidate.warnings,
      followUpQuestions: getVoiceFollowUpQuestions(candidate, parsed.data.uiLanguage),
      missingCoreDetails: getVoiceMissingCoreDetails(candidate, parsed.data.uiLanguage),
    });
  } catch (error) {
    console.error("voice_proposal_failed", {
      userId: user.id,
      code: error instanceof Error && (error.name === "AbortError" || controller.signal.aborted) ? "TIMEOUT" : "PARSE_FAILED",
    });
    return noStore({ error: "Could not create a CV proposal.", code: controller.signal.aborted ? "TIMEOUT" : "PARSE_FAILED" }, 422);
  } finally {
    clearTimeout(timeout);
  }
}
