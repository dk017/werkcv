import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import {
  AGENCY_RETENTION_OPTIONS,
  applyRetentionPolicyChange,
  previewRetentionPolicyChange,
  retentionPreviewRequiresConfirmation,
} from "@/lib/agency-retention";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";

const retentionInput = z.object({
  retentionDays: z.number().int(),
  preview: z.boolean().optional().default(false),
  confirmation: z.string().optional(),
  previewAt: z.string().datetime({ offset: true }).optional(),
  previewToken: z.string().regex(/^[a-f0-9]{64}$/u).optional(),
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
  return { user, access, subscriptionId: access.subscription.id };
}

export async function GET(request: NextRequest) {
  const context = await getContext(request);
  if ("response" in context) return context.response;
  const subscription = context.access.subscription;
  if (!subscription) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  const preview = await previewRetentionPolicyChange(
    context.subscriptionId,
    subscription.retentionDays,
  );
  return json({
    success: true,
    options: AGENCY_RETENTION_OPTIONS,
    retentionDays: subscription.retentionDays,
    policySetAt: subscription.retentionPolicySetAt,
    needsAcknowledgement: !subscription.retentionPolicySetAt,
    preview,
  });
}

export async function POST(request: NextRequest) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) {
    return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  }
  const context = await getContext(request);
  if ("response" in context) return context.response;
  if (!canManageAgency(context.access)) return json({ error: "Only the agency owner can manage retention.", code: "ROLE_FORBIDDEN" }, 403);

  const payload = retentionInput.safeParse(await request.json().catch(() => null));
  if (!payload.success || !AGENCY_RETENTION_OPTIONS.includes(payload.data.retentionDays as typeof AGENCY_RETENTION_OPTIONS[number])) {
    return json({ error: "Choose 30, 90, 180 or 365 days.", code: "INVALID_RETENTION_DAYS" }, 400);
  }

  if (payload.data.preview) {
    const preview = await previewRetentionPolicyChange(context.subscriptionId, payload.data.retentionDays, new Date());
    const requiresConfirmation = retentionPreviewRequiresConfirmation(preview);
    return json({
      success: true,
      preview,
      requiresConfirmation,
    });
  }
  if (!payload.data.previewAt || !payload.data.previewToken) {
    return json({ error: "Preview the retention change before applying it.", code: "RETENTION_PREVIEW_REQUIRED" }, 409);
  }
  try {
    const result = await applyRetentionPolicyChange(context.subscriptionId, payload.data.retentionDays, {
      previewAt: payload.data.previewAt,
      previewToken: payload.data.previewToken,
      confirmation: payload.data.confirmation,
    });
    return json({ success: true, result, policySetAt: new Date().toISOString() });
  } catch (error) {
    const code = error instanceof Error ? error.message : "RETENTION_APPLY_FAILED";
    if (code === "RETENTION_PREVIEW_STALE") return json({ error: "The retention preview is stale. Review the affected content again.", code }, 409);
    if (code === "RETENTION_CONFIRMATION_REQUIRED") return json({ error: "Type APPLY RETENTION POLICY to confirm this shorter retention period.", code }, 409);
    if (code === "RETENTION_PREVIEW_INVALID") return json({ error: "The retention preview is invalid. Create a new preview.", code }, 400);
    throw error;
  }
}
