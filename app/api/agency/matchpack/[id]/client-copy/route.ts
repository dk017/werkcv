import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canExportAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import { parseStoredMatchPackAnalysis, parseStoredMatchPackData, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { buildApprovedMatchPackOutput, MatchPackOutputError } from "@/lib/agency-output-projection";
import { matchPackSourceMapSchema } from "@/lib/agency-matchpack-source";
import { prisma } from "@/lib/prisma";
import { ApprovedSnapshotIntegrityError, assertApprovedSnapshotIntegrity } from "@/lib/agency-matchpack-approval";

export const runtime = "nodejs";
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return json({ error: "An active Agency billing tier is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canExportAgencyWork(access)) return json({ error: "Your agency role cannot prepare client copy.", code: "ROLE_FORBIDDEN" }, 403);
  const { id: rawId } = await context.params;
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id: rawId.trim().slice(0, 120), userId: access.ownerUserId || user.id },
    select: {
      candidateData: true, analysis: true, claimVerificationData: true, submissionData: true, vacancyTitle: true, vacancyText: true, sourceText: true, sourceMap: true, locale: true,
      status: true, templateId: true, colorThemeId: true, agencyTemplateId: true, approvalData: true, approvedRevisionVersion: true, approvedSnapshotDigest: true,
    },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (!pack.sourceText || !pack.sourceMap || !pack.submissionData) return json({ error: "The source snapshot is incomplete.", code: "EVIDENCE_UNRESOLVED" }, 409);
  try {
    const submission = parseStoredMatchPackSubmission(pack.submissionData);
    const candidateData = parseStoredMatchPackData(pack.candidateData);
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    if (pack.status === "approved") assertApprovedSnapshotIntegrity({
      candidateData,
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
      candidateData,
      analysis,
      submission,
      vacancyTitle: pack.vacancyTitle || "",
      vacancyText: pack.vacancyText,
      sourceText: pack.sourceText,
      sourceMap: matchPackSourceMapSchema.parse(pack.sourceMap),
      locale: pack.locale === "en" ? "en" : "nl",
      variant: submission.selectedVariant === "anonymized" ? "contact_free" : "full",
    });
    return json({ success: true, copy: { introduction: output.submission.clientIntroduction, emailSubject: output.submission.clientEmailSubject, emailBody: output.submission.clientEmailBody } });
  } catch (error) {
    if (error instanceof MatchPackOutputError || error instanceof ApprovedSnapshotIntegrityError) return json({ error: error.message, code: error.code }, 409);
    return json({ error: "Complete the evidence review before preparing client copy.", code: "REVIEW_INCOMPLETE" }, 409);
  }
}
