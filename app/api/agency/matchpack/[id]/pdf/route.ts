import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import {
  createDefaultMatchPackSubmission,
  parseStoredMatchPackAnalysis,
  parseStoredMatchPackData,
  parseStoredMatchPackSubmission,
} from "@/lib/agency-matchpack";
import { generateAgencySubmissionPDF } from "@/lib/agency-submission-pdf";
import { prisma } from "@/lib/prisma";
import { getDefaultThemeId } from "@/lib/templates/registry";

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
  if (access.state !== "active") {
    return json({ error: "An active Agency Plan is required for MatchPack exports.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  }

  const variant = request.nextUrl.searchParams.get("variant") || "full";
  if (variant !== "full" && variant !== "anonymized") {
    return json({ error: "Invalid export variant.", code: "INVALID_VARIANT" }, 400);
  }

  const { id: rawId } = await context.params;
  const id = rawId.trim().slice(0, 120);
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id, userId: user.id },
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
    },
  });

  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved" || !pack.cvDocumentId) {
    return json({ error: "Approve the MatchPack before exporting it.", code: "APPROVAL_REQUIRED" }, 409);
  }

  try {
    const fullData = parseStoredMatchPackData(pack.candidateData);
    const data = variant === "anonymized" ? parseStoredMatchPackData(pack.anonymizedData) : fullData;
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    const submission = pack.submissionData
      ? parseStoredMatchPackSubmission(pack.submissionData)
      : createDefaultMatchPackSubmission(
        fullData,
        analysis.result,
        pack.vacancyTitle || "",
        pack.locale === "en" ? "en" : "nl",
      );
    const pdfBuffer = await generateAgencySubmissionPDF({
      candidateData: data,
      analysis,
      submission,
      vacancyTitle: pack.vacancyTitle || "",
      locale: pack.locale === "en" ? "en" : "nl",
      variant,
      templateId: pack.templateId,
      colorThemeId: pack.colorThemeId || getDefaultThemeId(pack.templateId),
      companyName: access.subscription?.companyName,
      sourceCandidateName: fullData.personal.name,
    });
    const filename = variant === "anonymized"
      ? "werkcv-kandidaatvoorstel-geanonimiseerd.pdf"
      : "werkcv-kandidaatvoorstel-volledig.pdf";

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("agency_matchpack_pdf_failed", {
      userId: user.id,
      packId: pack.id,
      variant,
      code: error instanceof Error ? error.name : "unknown",
    });
    return json({ error: "The MatchPack PDF could not be generated.", code: "PDF_ERROR" }, 500);
  }
}
