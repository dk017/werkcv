import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canEditAgencyDraft, getAgencyAccessForUser } from "@/lib/agency-access";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { anonymizeCvData, parseStoredMatchPackData, parseStoredMatchPackSubmission } from "@/lib/agency-matchpack";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";

export const runtime = "nodejs";
const bodySchema = z.object({ status: z.enum(["accepted", "rejected"]), reviewerNote: z.string().trim().max(2_000).default("") });

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function applySuggestion(candidateInput: unknown, submissionInput: unknown, targetPath: string, value: string) {
  const candidate = structuredClone(parseStoredMatchPackData(candidateInput));
  const submission = structuredClone(parseStoredMatchPackSubmission(submissionInput));
  if (targetPath === "personal.summary") candidate.personal.summary = value;
  else if (/^experience\.\d+\.description$/.test(targetPath)) {
    const index = Number(targetPath.split(".")[1]);
    if (!candidate.experience[index]) throw new Error("SUGGESTION_TARGET_STALE");
    candidate.experience[index].description = value;
  } else if (targetPath === "clientIntroduction") submission.clientIntroduction = value;
  else if (targetPath === "clientEmailBody") submission.clientEmailBody = value;
  else if (/^commercial\.(availability|noticePeriod|salaryIndication|hoursPerWeek|workLocation|candidatePreferences)$/.test(targetPath)) {
    const key = targetPath.split(".")[1] as keyof typeof submission.commercial;
    submission.commercial[key] = value;
  } else throw new Error("SUGGESTION_TARGET_UNSUPPORTED");
  return { candidate: parseStoredMatchPackData(candidate), submission: parseStoredMatchPackSubmission(submission) };
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string; suggestionId: string }> }) {
  if (!candidateAcknowledgementEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const user = await getCurrentUserFromRequest(request);
  if (!user) return json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription) return json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409);
  if (!canEditAgencyDraft(access)) return json({ error: "Your agency role cannot resolve corrections.", code: "ROLE_FORBIDDEN" }, 403);
  const payload = bodySchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Invalid correction decision.", code: "INVALID_DECISION" }, 400);
  const { id, suggestionId } = await context.params;
  const suggestion = await prisma.agencyCandidateReviewSuggestion.findFirst({
    where: { id: suggestionId.trim().slice(0, 120), review: { matchPackId: id.trim().slice(0, 120), subscriptionId: access.subscription.id } },
    include: { review: true },
  });
  if (!suggestion) return json({ error: "Correction not found.", code: "NOT_FOUND" }, 404);
  if (suggestion.status !== "pending") return json({ error: "This correction was already resolved.", code: "ALREADY_RESOLVED" }, 409);
  const now = new Date();

  try {
    const result = await prisma.$transaction(async (tx) => {
      const pack = await tx.agencyMatchPack.findFirst({ where: { id: suggestion.review.matchPackId, userId: access.ownerUserId || user.id }, select: { id: true, status: true, locale: true, candidateData: true, submissionData: true, analysis: true } });
      if (!pack || pack.status !== "analyzed" || !pack.submissionData) throw new Error("PACK_LOCKED");
      if (payload.data.status === "accepted") {
        const updated = applySuggestion(pack.candidateData, pack.submissionData, suggestion.targetPath, suggestion.proposedValue);
        const anonymized = anonymizeCvData(updated.candidate, pack.locale === "en" ? "en" : "nl");
        const latest = await tx.agencyMatchPackRevision.findFirst({ where: { matchPackId: pack.id }, orderBy: { version: "desc" }, select: { version: true } });
        const version = (latest?.version || 0) + 1;
        await tx.agencyMatchPack.update({ where: { id: pack.id }, data: { candidateData: updated.candidate as unknown as Prisma.InputJsonValue, anonymizedData: anonymized.data as unknown as Prisma.InputJsonValue, submissionData: updated.submission as unknown as Prisma.InputJsonValue, claimVerificationData: Prisma.DbNull, updatedAt: now } });
        await tx.agencyMatchPackRevision.create({ data: { matchPackId: pack.id, version, reason: "candidate_suggestion_accepted", candidateData: updated.candidate as unknown as Prisma.InputJsonValue, submissionData: updated.submission as unknown as Prisma.InputJsonValue, analysis: pack.analysis as Prisma.InputJsonValue, claimVerificationData: Prisma.DbNull, changedFields: [suggestion.targetPath, "claimVerificationData"], createdById: user.id } });
      }
      await tx.agencyCandidateReviewSuggestion.update({ where: { id: suggestion.id }, data: { status: payload.data.status, resolvedById: user.id, resolvedAt: now, reviewerNote: payload.data.reviewerNote } });
      await tx.agencyCandidateReview.update({ where: { id: suggestion.reviewId }, data: { status: "stale", revokedAt: now, tokenHash: null } });
      await tx.agencyCandidateReviewSession.updateMany({ where: { reviewId: suggestion.reviewId, revokedAt: null }, data: { revokedAt: now } });
      await tx.agencyCandidateReviewEvent.create({ data: { reviewId: suggestion.reviewId, type: `suggestion_${payload.data.status}`, actorType: "recruiter", actorUserId: user.id, metadata: { suggestionId: suggestion.id, targetPath: suggestion.targetPath } } });
      return { status: payload.data.status };
    }, { isolationLevel: Prisma.TransactionIsolationLevel.Serializable });
    return json({ success: true, ...result });
  } catch (error) {
    const code = error instanceof Error ? error.message : "CORRECTION_FAILED";
    if (["PACK_LOCKED", "SUGGESTION_TARGET_STALE", "SUGGESTION_TARGET_UNSUPPORTED"].includes(code)) return json({ error: "The MatchPack or correction target changed. Reload before continuing.", code }, 409);
    throw error;
  }
}
