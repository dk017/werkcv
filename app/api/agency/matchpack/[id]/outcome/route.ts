import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canEditAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { clientOutcomeSchema } from "@/lib/agency-metrics";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return json({ error: "An active Agency billing tier is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canEditAgency(access)) return json({ error: "Your agency role is read-only.", code: "ROLE_READ_ONLY" }, 403);

  const payload = clientOutcomeSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Choose a valid client outcome.", code: "INVALID_OUTCOME" }, 400);
  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const pack = await prisma.agencyMatchPack.findFirst({ where: { id, userId: access.ownerUserId || user.id }, select: { id: true, status: true } });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved") return json({ error: "Approve the MatchPack before recording an outcome.", code: "APPROVAL_REQUIRED" }, 409);

  const recordedAt = new Date();
  await prisma.agencyMatchPack.update({ where: { id: pack.id }, data: {
    clientOutcome: payload.data.status,
    clientOutcomeRecordedAt: recordedAt,
    clientOutcomeRecordedById: user.id,
  } });
  await prisma.analyticsEvent.create({
    data: {
      event: "matchpack_client_outcome_saved",
      path: "/agency/account/matchpack",
      properties: { status: payload.data.status },
    },
  }).catch(() => undefined);
  return json({ success: true, outcome: { status: payload.data.status, recordedAt: recordedAt.toISOString() } });
}
