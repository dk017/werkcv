import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

const actionSchema = z.object({ action: z.enum(["dismiss", "restore", "view_example"]) }).strict();

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }

  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription) {
    return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  }
  if (!canManageAgency(access)) {
    return json({ error: "Only the agency owner can change onboarding state.", code: "ROLE_FORBIDDEN" }, 403);
  }

  const payload = actionSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Invalid onboarding action.", code: "INVALID_ACTION" }, 400);

  const onboardingDismissedAt = payload.data.action === "dismiss" ? new Date() : payload.data.action === "restore" ? null : undefined;
  const subscription = await prisma.agencySubscription.update({
    where: { id: access.subscription.id, userId: user.id },
    data: {
      ...(onboardingDismissedAt !== undefined ? { onboardingDismissedAt } : {}),
      ...(payload.data.action === "view_example" ? { onboardingExampleViewedAt: new Date() } : {}),
    },
    select: { onboardingDismissedAt: true, onboardingExampleViewedAt: true },
  });

  return json({ success: true, onboardingDismissedAt: subscription.onboardingDismissedAt, onboardingExampleViewedAt: subscription.onboardingExampleViewedAt });
}
