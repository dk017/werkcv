import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { createToolHandoffToken, toolHandoffHash, toolHandoffInput } from "@/lib/tool-cv-handoff";
import { readAiJson } from "@/lib/ai-request-body";

export const runtime = "nodejs";
const json = (body: object, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin." }, 403);
  if (!checkRateLimit(getClientIp(request), { bucket: "tool-cv-handoff", maxRequests: 12, windowMs: 60 * 60 * 1000 }).allowed) return json({ error: "Too many requests." }, 429);
  if (Number(request.headers.get("content-length") || 0) > 20_000) return json({ error: "Request too large." }, 413);
  const parsed = toolHandoffInput.safeParse(await readAiJson(request, 20_000).catch(() => null));
  if (!parsed.success) return json({ error: "Invalid handoff." }, 400);
  await prisma.toolCvHandoff.deleteMany({ where: { OR: [{ expiresAt: { lt: new Date() } }, { consumedAt: { lt: new Date(Date.now() - 60 * 60 * 1000) } }] } });
  const token = createToolHandoffToken();
  await prisma.toolCvHandoff.create({ data: { tokenHash: toolHandoffHash(token), kind: parsed.data.kind, locale: parsed.data.locale, payload: parsed.data.payload, expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
  return json({ token, expiresInSeconds: 1800 });
}
