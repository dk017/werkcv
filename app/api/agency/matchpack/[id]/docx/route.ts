import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canExportAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import { parseStoredMatchPackAnalysis, parseStoredMatchPackData, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { generateAgencySubmissionDOCX } from "@/lib/agency-docx";
import { buildApprovedMatchPackOutput, MatchPackOutputError, scrubContactFreeClientText } from "@/lib/agency-output-projection";
import { matchPackSourceMapSchema } from "@/lib/agency-matchpack-source";
import { prisma } from "@/lib/prisma";
import { ApprovedSnapshotIntegrityError, assertApprovedSnapshotIntegrity } from "@/lib/agency-matchpack-approval";

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
  if (!canExportAgencyWork(access)) return json({ error: "Your agency role cannot export documents.", code: "ROLE_FORBIDDEN" }, 403);

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
      claimVerificationData: true,
      submissionData: true,
      vacancyTitle: true,
      vacancyText: true,
      sourceText: true,
      sourceMap: true,
      locale: true,
      templateId: true,
      colorThemeId: true,
      agencyTemplateId: true,
      approvalData: true,
      approvedRevisionVersion: true,
      approvedSnapshotDigest: true,
      status: true,
      cvDocumentId: true,
      approvedAt: true,
      firstExportedAt: true,
      agencyTemplate: {
        select: { companyName: true, website: true, headerText: true, footerText: true },
      },
    },
  });

  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved" || !pack.cvDocumentId) return json({ error: "Approve the MatchPack before exporting it.", code: "APPROVAL_REQUIRED" }, 409);

  try {
    const fullData = parseStoredMatchPackData(pack.candidateData);
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    if (!pack.submissionData || !pack.sourceText || !pack.sourceMap) return json({ error: "The approved source snapshot is incomplete.", code: "EVIDENCE_UNRESOLVED" }, 409);
    const submission = parseStoredMatchPackSubmission(pack.submissionData);
    assertApprovedSnapshotIntegrity({
      candidateData: fullData,
      submissionData: submission,
      analysis,
      claimVerificationData: pack.claimVerificationData,
      templateId: pack.templateId,
      colorThemeId: pack.colorThemeId,
      agencyTemplateId: pack.agencyTemplateId,
      approvalData: pack.approvalData,
      approvedRevisionVersion: pack.approvedRevisionVersion,
      approvedSnapshotDigest: pack.approvedSnapshotDigest,
    });
    const output = buildApprovedMatchPackOutput({
      candidateData: fullData,
      analysis,
      submission,
      vacancyTitle: pack.vacancyTitle || "",
      vacancyText: pack.vacancyText,
      sourceText: pack.sourceText,
      sourceMap: matchPackSourceMapSchema.parse(pack.sourceMap),
      locale: pack.locale === "en" ? "en" : "nl",
      variant: variant === "anonymized" ? "contact_free" : "full",
    });
    const templateText = (value?: string | null) => variant === "anonymized" && value
      ? scrubContactFreeClientText(value, fullData, pack.locale === "en" ? "en" : "nl")
      : value;
    const docxBuffer = await generateAgencySubmissionDOCX({
      output,
      companyName: templateText(pack.agencyTemplate?.companyName || access.subscription?.companyName),
      website: templateText(pack.agencyTemplate?.website || access.subscription?.website),
      headerText: templateText(pack.agencyTemplate?.headerText),
      footerText: templateText(pack.agencyTemplate?.footerText),
    });
    const exportedAt = new Date();
    if (!pack.firstExportedAt) await prisma.agencyMatchPack.updateMany({
      where: { id: pack.id, firstExportedAt: null },
      data: { firstExportedAt: exportedAt },
    }).catch(() => undefined);
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
    if (error instanceof MatchPackOutputError || error instanceof ApprovedSnapshotIntegrityError) return json({ error: error.message, code: error.code }, 409);
    console.error("agency_matchpack_docx_failed", { userId: user.id, packId: id, code: error instanceof Error ? error.name : "unknown" });
    return json({ error: "The MatchPack DOCX could not be generated.", code: "DOCX_ERROR" }, 500);
  }
}
