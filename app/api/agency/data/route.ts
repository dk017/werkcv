import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { deleteAllAgencyContent } from "@/lib/agency-retention";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription || !access.ownerUserId) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canManageAgency(access)) return json({ error: "Only the agency owner can delete agency data.", code: "ROLE_FORBIDDEN" }, 403);

  const body = await request.json().catch(() => null) as { confirmation?: string } | null;
  if (body?.confirmation !== "DELETE AGENCY DATA") {
    return json({ error: "Type DELETE AGENCY DATA to confirm.", code: "CONFIRMATION_REQUIRED" }, 400);
  }

  const result = await deleteAllAgencyContent({
    subscriptionId: access.subscription.id,
    ownerUserId: access.ownerUserId,
    actorUserId: user.id,
    reason: "agency_data_deletion",
  });

  return json({ success: true, deleted: result });
}
