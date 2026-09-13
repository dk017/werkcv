import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { readAiJson } from "@/lib/ai-request-body";
import { applyToolHandoff, reviewToolHandoff, HandoffError } from "@/lib/tool-handoff-service";
import { checkRateLimit } from "@/lib/tools/rate-limit";
export const runtime = "nodejs";
const input = z.object({ token: z.string().regex(/^[A-Za-z0-9_-]{43}$/), action: z.enum(["review", "apply"]).default("review"), cvId: z.string().uuid().nullable().optional(), version: z.string().regex(/^[a-f0-9]{64}$/).nullable().optional() }).strict();
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", "Referrer-Policy": "no-referrer" } });
export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ code: "AUTH_REQUIRED" }, 401);
  if (!checkRateLimit(user.id, { bucket: "handoff-consume", maxRequests: 90, windowMs: 60_000 }).allowed) return json({ code: "RATE_LIMITED" }, 429);
  try {
    const parsed = input.safeParse(await readAiJson(request, 2048));
    if (!parsed.success) return json({ code: "INVALID_INPUT" }, 400);
    const { token, action, cvId, version } = parsed.data;
    return json(action === "apply" ? await applyToolHandoff(prisma, token, user.id, cvId ?? null, version ?? null) : await reviewToolHandoff(prisma, token, user.id, cvId ?? undefined));
  } catch (error) {
    if (error instanceof HandoffError) return json({ code: error.code }, error.status);
    return json({ code: "HANDOFF_FAILED" }, 503);
  }
}
