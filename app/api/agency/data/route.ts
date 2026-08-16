import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canManageAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
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

  const ownerUserId = access.ownerUserId;
  const result = await prisma.$transaction(async (tx) => {
    const packs = await tx.agencyMatchPack.findMany({
      where: { userId: ownerUserId },
      select: { id: true, cvDocumentId: true },
    });
    const packCvIds = packs.flatMap((pack) => pack.cvDocumentId ? [pack.cvDocumentId] : []);
    const agencyCvs = await tx.cVDocument.findMany({
      where: {
        userId: ownerUserId,
        OR: [
          { id: { in: packCvIds } },
          { startSource: { in: ["agency_matchpack", "agency_plan"] } },
          { sourceCluster: "agency-matchpack" },
        ],
      },
      select: { id: true },
    });
    const cvIds = Array.from(new Set([...packCvIds, ...agencyCvs.map((cv) => cv.id)]));
    const usage = cvIds.length
      ? await tx.agencyCvUsage.deleteMany({ where: { cvId: { in: cvIds } } })
      : { count: 0 };
    const deletedPacks = await tx.agencyMatchPack.deleteMany({ where: { userId: ownerUserId } });
    const deletedDocuments = cvIds.length
      ? await tx.cVDocument.deleteMany({ where: { id: { in: cvIds }, userId: ownerUserId } })
      : { count: 0 };
    const deletedTemplates = await tx.agencyTemplate.deleteMany({ where: { ownerId: ownerUserId } });
    const deletedMembers = await tx.agencyTeamMember.deleteMany({ where: { subscriptionId: access.subscription?.id } });
    return {
      matchPacks: deletedPacks.count,
      cvDocuments: deletedDocuments.count,
      usageRows: usage.count,
      templates: deletedTemplates.count,
      teamMembers: deletedMembers.count,
    };
  });

  return json({ success: true, deleted: result });
}
