import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canEditAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { feedbackContainsCandidateContent, productFeedbackSchema } from "@/lib/agency-feedback";
import { parseStoredMatchPackData, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";
const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active") return json({ error: "An active Agency Plan is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canEditAgency(access)) return json({ error: "Your agency role is read-only.", code: "ROLE_READ_ONLY" }, 403);
  const payload = productFeedbackSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Check the product feedback fields.", code: "INVALID_FEEDBACK" }, 400);
  const { id: rawId } = await context.params;
  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id: rawId.trim().slice(0, 120), userId: access.ownerUserId || user.id },
    select: { id: true, status: true, candidateData: true, sourceText: true, vacancyText: true, submissionData: true },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "approved" || !pack.sourceText || !pack.submissionData) return json({ error: "Approve the MatchPack before recording feedback.", code: "APPROVAL_REQUIRED" }, 409);
  const candidateData = parseStoredMatchPackData(pack.candidateData);
  const submission = parseStoredMatchPackSubmission(pack.submissionData);
  if (feedbackContainsCandidateContent({
    note: payload.data.note,
    candidateData,
    sourceText: pack.sourceText,
    vacancyText: pack.vacancyText,
    clientIntroduction: submission.clientIntroduction,
    clientEmailBody: submission.clientEmailBody,
  })) return json({ error: "Remove candidate details or copied CV/vacancy text from product feedback.", code: "FEEDBACK_CONTENT_NOT_ALLOWED" }, 400);

  const feedback = {
    ...payload.data,
    recordedAt: new Date().toISOString(),
    recordedById: user.id,
  };
  await prisma.agencyMatchPack.update({ where: { id: pack.id }, data: { productFeedbackData: feedback as unknown as Prisma.InputJsonValue } });
  return json({ success: true, feedback: { version: 1, sendability: feedback.sendability, issueCategories: feedback.issueCategories, recordedAt: feedback.recordedAt } });
}
