import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import {
  createDefaultMatchPackSubmission,
  parseStoredMatchPackAnalysis,
  parseStoredMatchPackData,
  parseStoredMatchPackSubmission,
} from "@/lib/agency-matchpack";
import { generateAgencySubmissionDOCX } from "@/lib/agency-docx";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);

  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return json({ error: "An active Agency Plan is required for MatchPack exports.", code: "AGENCY_PLAN_REQUIRED" }, 409);

  const variant = request.nextUrl.searchParams.get("variant") || "full";
  if (variant !== "full" && variant !== "anonymized") return json({ error: "Invalid export variant.", code: "INVALID_VARIANT" }, 400);

  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: access.ownerUserId || user.id },
    select: {
      id: true,
      candidateData: true,
      anonymizedData: true,
      analysis: true,
      submissionData: true,
      vacancyTitle: true,
      locale: true,
      templateId: true,
      colorThemeId: true,
      status: true,
      cvDocumentId: true,
      approvedAt: true,
      outcomeData: true,
      agencyTemplate: {
        select: { companyName: true, website: true, headerText: true, footerText: true },
      },
    },
  });

  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved" || !pack.cvDocumentId) return json({ error: "Approve the MatchPack before exporting it.", code: "APPROVAL_REQUIRED" }, 409);

  try {
    const fullData = parseStoredMatchPackData(pack.candidateData);
    const data = variant === "anonymized" ? parseStoredMatchPackData(pack.anonymizedData) : fullData;
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    const submission = pack.submissionData
      ? parseStoredMatchPackSubmission(pack.submissionData)
      : createDefaultMatchPackSubmission(fullData, analysis.result, pack.vacancyTitle || "", pack.locale === "en" ? "en" : "nl");
    const docxBuffer = await generateAgencySubmissionDOCX({
      candidateData: data,
      analysis,
      submission,
      vacancyTitle: pack.vacancyTitle || "",
      locale: pack.locale === "en" ? "en" : "nl",
      variant,
      companyName: pack.agencyTemplate?.companyName || access.subscription?.companyName,
      website: pack.agencyTemplate?.website || access.subscription?.website,
      headerText: pack.agencyTemplate?.headerText,
      footerText: pack.agencyTemplate?.footerText,
    });
    const exportedAt = new Date();
    const existingOutcome = pack.outcomeData && typeof pack.outcomeData === "object" && !Array.isArray(pack.outcomeData)
      ? pack.outcomeData as Record<string, unknown>
      : {};
    if (!existingOutcome.firstExportedAt) {
      await prisma.agencyMatchPack.update({
        where: { id: pack.id },
        data: {
          outcomeData: {
            ...existingOutcome,
            firstExportedAt: exportedAt.toISOString(),
            approvedToExportSeconds: pack.approvedAt ? Math.max(0, Math.round((exportedAt.getTime() - pack.approvedAt.getTime()) / 1000)) : null,
          } as unknown as Prisma.InputJsonValue,
        },
      }).catch(() => undefined);
    }
    const filename = variant === "anonymized"
      ? "werkcv-kandidaatvoorstel-zonder-directe-contactgegevens.docx"
      : "werkcv-kandidaatvoorstel-volledig.docx";

    return new NextResponse(new Uint8Array(docxBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("agency_matchpack_docx_failed", { userId: user.id, packId: id, code: error instanceof Error ? error.name : "unknown" });
    return json({ error: "The MatchPack DOCX could not be generated.", code: "DOCX_ERROR" }, 500);
  }
}
