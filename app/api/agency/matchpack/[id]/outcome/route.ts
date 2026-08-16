import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canEditAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { matchPackOutcomeSchema } from "@/lib/agency-matchpack";
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
  if (access.state !== "active") return json({ error: "An active Agency Plan is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canEditAgency(access)) return json({ error: "Your agency role is read-only.", code: "ROLE_READ_ONLY" }, 403);

  const payload = matchPackOutcomeSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Choose a valid client outcome.", code: "INVALID_OUTCOME" }, 400);
  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const pack = await prisma.agencyMatchPack.findFirst({ where: { id, userId: access.ownerUserId || user.id }, select: { id: true, status: true, outcomeData: true } });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved") return json({ error: "Approve the MatchPack before recording an outcome.", code: "APPROVAL_REQUIRED" }, 409);

  const existingOutcome = pack.outcomeData && typeof pack.outcomeData === "object" && !Array.isArray(pack.outcomeData)
    ? pack.outcomeData as Record<string, unknown>
    : {};
  const outcomeData = { ...existingOutcome, ...payload.data, recordedAt: new Date().toISOString(), recordedById: user.id };
  await prisma.agencyMatchPack.update({ where: { id: pack.id }, data: { outcomeData: outcomeData as unknown as Prisma.InputJsonValue } });
  await prisma.analyticsEvent.create({
    data: {
      event: "matchpack_client_outcome_saved",
      path: "/agency/account/matchpack",
      properties: { packId: pack.id, status: payload.data.status } as Prisma.InputJsonValue,
    },
  }).catch(() => undefined);
  return json({ success: true, outcomeData: payload.data });
}
