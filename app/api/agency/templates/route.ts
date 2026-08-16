import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { templateRegistry } from "@/lib/templates/registry";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

const templateInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  templateId: z.string().trim().max(80).default("professional"),
  colorThemeId: z.string().trim().max(80).default("classic-blue"),
  companyName: z.string().trim().max(160).default(""),
  website: z.string().trim().max(240).default(""),
  headerText: z.string().trim().max(240).default(""),
  footerText: z.string().trim().max(240).default(""),
  isDefault: z.boolean().default(false),
});

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function getContext(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return { response: json({ error: "An active Agency Plan is required.", code: "AGENCY_PLAN_REQUIRED" }, 409) };
  return { user, access, ownerUserId: access.ownerUserId || user.id };
}

export async function GET(request: NextRequest) {
  const context = await getContext(request);
  if ("response" in context) return context.response;
  const templates = await prisma.agencyTemplate.findMany({ where: { ownerId: context.ownerUserId }, orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }] });
  return json({
    success: true,
    templates,
    default: context.access.subscription ? { templateId: context.access.subscription.templateId, colorThemeId: context.access.subscription.colorThemeId } : null,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const context = await getContext(request);
  if ("response" in context) return context.response;
  if (!canManageAgency(context.access)) return json({ error: "Only the agency owner can manage templates.", code: "ROLE_FORBIDDEN" }, 403);
  const payload = templateInputSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Check the template fields.", code: "INVALID_TEMPLATE", fieldErrors: payload.error.flatten().fieldErrors }, 400);
  const templateConfig = templateRegistry[payload.data.templateId];
  if (!templateConfig) return json({ error: "Choose a supported CV template.", code: "INVALID_TEMPLATE_ID" }, 400);
  if (!templateConfig.colorThemes.some((theme) => theme.id === payload.data.colorThemeId)) return json({ error: "Choose a color supported by this template.", code: "INVALID_COLOR_THEME" }, 400);

  const created = await prisma.$transaction(async (tx) => {
    if (payload.data.isDefault) await tx.agencyTemplate.updateMany({ where: { ownerId: context.ownerUserId }, data: { isDefault: false } });
    const template = await tx.agencyTemplate.create({ data: { ...payload.data, ownerId: context.ownerUserId, companyName: payload.data.companyName || null, website: payload.data.website || null, headerText: payload.data.headerText || null, footerText: payload.data.footerText || null } });
    if (payload.data.isDefault && context.access.subscription) {
      await tx.agencySubscription.update({ where: { id: context.access.subscription.id }, data: { templateId: payload.data.templateId, colorThemeId: payload.data.colorThemeId, companyName: payload.data.companyName || null, website: payload.data.website || null } });
    }
    return template;
  });
  return json({ success: true, template: created });
}

export async function DELETE(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const context = await getContext(request);
  if ("response" in context) return context.response;
  if (!canManageAgency(context.access)) return json({ error: "Only the agency owner can manage templates.", code: "ROLE_FORBIDDEN" }, 403);
  const body = await request.json().catch(() => null) as { id?: string } | null;
  const id = typeof body?.id === "string" ? body.id.trim().slice(0, 120) : "";
  if (!id) return json({ error: "Template id is required.", code: "TEMPLATE_ID_REQUIRED" }, 400);
  await prisma.agencyTemplate.deleteMany({ where: { id, ownerId: context.ownerUserId } });
  return json({ success: true });
}
