import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest, isValidEmail } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

const memberSchema = z.object({
  email: z.string().trim().toLowerCase().max(240),
  role: z.enum(["editor", "reviewer", "viewer"]),
});

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function getContext(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription || !access.ownerUserId) {
    return { response: json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409) };
  }
  return { user, access, subscriptionId: access.subscription.id, ownerUserId: access.ownerUserId };
}

export async function GET(request: NextRequest) {
  const context = await getContext(request);
  if ("response" in context) return context.response;
  const members = await prisma.agencyTeamMember.findMany({
    where: { subscriptionId: context.subscriptionId },
    orderBy: [{ status: "asc" }, { createdAt: "asc" }],
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      invitedAt: true,
      acceptedAt: true,
      createdAt: true,
    },
  });
  return json({ success: true, members });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const context = await getContext(request);
  if ("response" in context) return context.response;
  if (!canManageAgency(context.access)) return json({ error: "Only the agency owner can manage team access.", code: "ROLE_FORBIDDEN" }, 403);

  const payload = memberSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success || !isValidEmail(payload.data.email)) {
    return json({ error: "Enter a valid email address and role.", code: "INVALID_MEMBER" }, 400);
  }
  if (payload.data.email === context.user.email.toLowerCase()) {
    return json({ error: "The subscription owner already has access.", code: "OWNER_MEMBER" }, 400);
  }

  const invitedUser = await prisma.user.findUnique({ where: { email: payload.data.email }, select: { id: true } });
  const member = await prisma.agencyTeamMember.upsert({
    where: { subscriptionId_email: { subscriptionId: context.subscriptionId, email: payload.data.email } },
    update: {
      role: payload.data.role,
      status: "invited",
      userId: invitedUser?.id || null,
      acceptedAt: invitedUser ? new Date() : null,
    },
    create: {
      subscriptionId: context.subscriptionId,
      email: payload.data.email,
      role: payload.data.role,
      status: invitedUser ? "active" : "invited",
      userId: invitedUser?.id || null,
      acceptedAt: invitedUser ? new Date() : null,
    },
    select: { id: true, email: true, role: true, status: true, invitedAt: true, acceptedAt: true, createdAt: true },
  });
  return json({ success: true, member });
}

export async function DELETE(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const context = await getContext(request);
  if ("response" in context) return context.response;
  if (!canManageAgency(context.access)) return json({ error: "Only the agency owner can manage team access.", code: "ROLE_FORBIDDEN" }, 403);
  const body = await request.json().catch(() => null) as { id?: string } | null;
  const id = typeof body?.id === "string" ? body.id.trim().slice(0, 120) : "";
  if (!id) return json({ error: "Member id is required.", code: "MEMBER_ID_REQUIRED" }, 400);
  await prisma.agencyTeamMember.deleteMany({ where: { id, subscriptionId: context.subscriptionId } });
  return json({ success: true });
}
