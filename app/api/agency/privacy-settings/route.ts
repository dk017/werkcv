import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";
const settingsSchema = z.object({
  legalName: z.string().trim().min(2).max(180),
  privacyPolicyUrl: z.string().trim().url().max(500),
  privacyContactEmail: z.string().trim().email().max(320),
}).superRefine((value, context) => {
  if (process.env.NODE_ENV === "production" && !value.privacyPolicyUrl.startsWith("https://")) context.addIssue({ code: z.ZodIssueCode.custom, path: ["privacyPolicyUrl"], message: "Use an HTTPS privacy-policy URL." });
});
function json(body: Record<string, unknown>, status = 200) { return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } }); }

async function owner(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription) return { response: json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409) };
  return { user, access };
}

export async function GET(request: NextRequest) {
  const current = await owner(request);
  if ("response" in current) return current.response;
  const subscription = current.access.subscription!;
  return json({ success: true, settings: { legalName: subscription.legalName || subscription.companyName || "", privacyPolicyUrl: subscription.privacyPolicyUrl || "", privacyContactEmail: subscription.privacyContactEmail || "" }, editable: canManageAgency(current.access) });
}

export async function PATCH(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const current = await owner(request);
  if ("response" in current) return current.response;
  if (!canManageAgency(current.access)) return json({ error: "Only the agency owner can change privacy details.", code: "ROLE_FORBIDDEN" }, 403);
  const payload = settingsSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Check the legal name, privacy URL and contact email.", code: "INVALID_PRIVACY_SETTINGS", fieldErrors: payload.error.flatten().fieldErrors }, 400);
  const settings = await prisma.agencySubscription.update({ where: { id: current.access.subscription!.id }, data: { ...payload.data, privacyContactEmail: payload.data.privacyContactEmail.toLowerCase() }, select: { legalName: true, privacyPolicyUrl: true, privacyContactEmail: true } });
  return json({ success: true, settings });
}
