import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getCurrentUserFromRequest } from "@/lib/auth";
import { canEditAgencyDraft, getAgencyAccessForUser } from "@/lib/agency-access";
import { assertClaimsReadyForCandidateReview, AgencyClaimGateError } from "@/lib/agency-claim-review";
import {
  CANDIDATE_REVIEW_STATEMENT_VERSION,
  CANDIDATE_REVIEW_TOKEN_TTL_MS,
  candidateReviewCanonicalOrigin,
  candidateReviewInvitationSchema,
  createCandidateReviewSnapshot,
  digestCandidateReviewSnapshot,
  generateCandidateReviewSecret,
  hashCandidateReviewSecret,
  pseudonymousNetworkKey,
} from "@/lib/agency-candidate-review";
import { candidateAcknowledgementEnabled } from "@/lib/agency-feature-flags";
import { sendAgencyTransactionalEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";
import { isAllowedSameOriginRequest } from "@/lib/request-origin";
import { checkRateLimit, getClientIp } from "@/lib/tools/rate-limit";

export const runtime = "nodejs";

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

async function recruiterContext(request: NextRequest) {
  const user = await getCurrentUserFromRequest(request);
  if (!user) return { response: json({ error: "Authentication required.", code: "AUTH_REQUIRED" }, 401) };
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.subscription) return { response: json({ error: "An active Agency subscription is required.", code: "AGENCY_PLAN_REQUIRED" }, 409) };
  if (!canEditAgencyDraft(access)) return { response: json({ error: "Your agency role cannot invite candidates.", code: "ROLE_FORBIDDEN" }, 403) };
  return { user, access };
}

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!candidateAcknowledgementEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  const current = await recruiterContext(request);
  if ("response" in current) return current.response;
  const subscription = current.access.subscription!;
  const { id } = await context.params;
  const reviews = await prisma.agencyCandidateReview.findMany({
    where: { matchPackId: id.trim().slice(0, 120), subscriptionId: subscription.id },
    select: {
      id: true, revisionVersion: true, snapshotDigest: true, candidateEmail: true, recipientOrganization: true,
      vacancyTitle: true, selectedVariant: true, status: true, tokenExpiresAt: true, invitedAt: true, sentAt: true,
      openedAt: true, respondedAt: true, candidateResponse: true, revokedAt: true, retentionExpiresAt: true,
      suggestions: { select: { id: true, targetType: true, targetPath: true, originalValue: true, proposedValue: true, candidateNote: true, status: true, reviewerNote: true, resolvedAt: true }, orderBy: { createdAt: "asc" } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
  return json({ success: true, reviews });
}

export async function POST(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!candidateAcknowledgementEnabled()) return json({ error: "Not found.", code: "NOT_FOUND" }, 404);
  if (!isAllowedSameOriginRequest(request, { checkReferer: true })) return json({ error: "Invalid request origin.", code: "INVALID_ORIGIN" }, 403);
  const current = await recruiterContext(request);
  if ("response" in current) return current.response;
  const networkKey = pseudonymousNetworkKey(getClientIp(request));
  const rate = checkRateLimit(`${current.user.id}:${networkKey}`, { bucket: "candidate-review-invite", maxRequests: 20, windowMs: 60 * 60 * 1000 });
  if (!rate.allowed) return json({ error: "Too many invitations.", code: "RATE_LIMITED" }, 429);
  const payload = candidateReviewInvitationSchema.safeParse(await request.json().catch(() => null));
  if (!payload.success) return json({ error: "Complete the candidate, client and output details.", code: "INVALID_INVITATION", fieldErrors: payload.error.flatten().fieldErrors }, 400);
  const { id } = await context.params;
  const ownerId = current.access.ownerUserId || current.user.id;
  const subscription = current.access.subscription!;
  const legalName = subscription.legalName?.trim() || subscription.companyName?.trim() || "";
  const privacyPolicyUrl = subscription.privacyPolicyUrl?.trim() || "";
  const privacyContactEmail = subscription.privacyContactEmail?.trim() || "";
  if (!legalName || !privacyPolicyUrl || !privacyContactEmail) return json({ error: "Set the agency legal name, privacy-policy URL and privacy contact before inviting a candidate.", code: "AGENCY_PRIVACY_DETAILS_REQUIRED" }, 409);
  try { new URL(privacyPolicyUrl); } catch { return json({ error: "The agency privacy-policy URL is invalid.", code: "AGENCY_PRIVACY_DETAILS_REQUIRED" }, 409); }

  const pack = await prisma.agencyMatchPack.findFirst({
    where: { id: id.trim().slice(0, 120), userId: ownerId },
    select: {
      id: true, status: true, locale: true, candidateData: true, anonymizedData: true, submissionData: true,
      claimVerificationData: true, retentionExpiresAt: true,
      revisions: { select: { version: true }, orderBy: { version: "desc" }, take: 1 },
    },
  });
  if (!pack) return json({ error: "MatchPack not found.", code: "NOT_FOUND" }, 404);
  if (pack.status !== "analyzed") return json({ error: "Approved MatchPacks are locked.", code: "PACK_LOCKED" }, 409);
  if (!pack.submissionData || !pack.retentionExpiresAt || !pack.revisions[0]) return json({ error: "Save the current MatchPack and retention period first.", code: "MATCHPACK_NOT_READY" }, 409);
  try { assertClaimsReadyForCandidateReview(pack.claimVerificationData); } catch (error) {
    if (error instanceof AgencyClaimGateError) return json({ error: error.message, code: error.code }, 409);
    throw error;
  }

  const snapshot = createCandidateReviewSnapshot({
    recipientOrganization: payload.data.recipientOrganization,
    vacancyTitle: payload.data.vacancyTitle,
    selectedVariant: payload.data.selectedVariant,
    locale: pack.locale,
    legalName,
    privacyPolicyUrl,
    privacyContactEmail,
    candidateData: pack.candidateData,
    anonymizedData: pack.anonymizedData,
    submissionData: pack.submissionData,
    claimVerificationData: pack.claimVerificationData,
    retentionExpiresAt: pack.retentionExpiresAt,
  });
  const snapshotDigest = digestCandidateReviewSnapshot(snapshot);
  const token = generateCandidateReviewSecret();
  const tokenHash = hashCandidateReviewSecret(token);
  const now = new Date();
  const expiresAt = new Date(now.getTime() + CANDIDATE_REVIEW_TOKEN_TTL_MS);
  const review = await prisma.$transaction(async (tx) => {
    await tx.agencyCandidateReview.updateMany({
      where: { matchPackId: pack.id, status: { notIn: ["revoked", "stale", "declined"] } },
      data: { status: "revoked", revokedAt: now, tokenHash: null },
    });
    const saved = await tx.agencyCandidateReview.upsert({
      where: { matchPackId_revisionVersion_snapshotDigest: { matchPackId: pack.id, revisionVersion: pack.revisions[0].version, snapshotDigest } },
      update: {
        candidateEmail: payload.data.candidateEmail.toLowerCase(), tokenHash, tokenExpiresAt: expiresAt,
        tokenConsumedAt: null, status: "invited", invitedAt: now, sentAt: null, openedAt: null,
        respondedAt: null, candidateResponse: null, revokedAt: null,
      },
      create: {
        subscriptionId: subscription.id, matchPackId: pack.id, revisionVersion: pack.revisions[0].version,
        snapshotDigest, snapshotData: snapshot as unknown as Prisma.InputJsonValue,
        candidateEmail: payload.data.candidateEmail.toLowerCase(), recipientOrganization: payload.data.recipientOrganization,
        vacancyTitle: payload.data.vacancyTitle, selectedVariant: payload.data.selectedVariant,
        locale: pack.locale === "en" ? "en" : "nl", statementVersion: CANDIDATE_REVIEW_STATEMENT_VERSION,
        status: "invited", tokenHash, tokenExpiresAt: expiresAt, invitedAt: now,
        createdById: current.user.id, retentionExpiresAt: pack.retentionExpiresAt,
      },
    });
    await tx.agencyCandidateReviewSession.updateMany({ where: { reviewId: saved.id, revokedAt: null }, data: { revokedAt: now } });
    await tx.agencyCandidateReviewEvent.create({ data: { reviewId: saved.id, type: "invitation_created", actorType: "recruiter", actorUserId: current.user.id, metadata: { revisionVersion: saved.revisionVersion, statementVersion: saved.statementVersion } } });
    return saved;
  });

  const invitationUrl = `${candidateReviewCanonicalOrigin()}/kandidaat/bevestigen?lang=${review.locale === "en" ? "en" : "nl"}#token=${encodeURIComponent(token)}`;
  const dedupeKey = `candidate-review:${review.id}:${tokenHash.slice(0, 24)}`;
  try {
    await sendAgencyTransactionalEmail({
      kind: "candidate_acknowledgement_invite_v1",
      recipientEmail: review.candidateEmail,
      locale: review.locale,
      payload: { invitationUrl, agencyName: legalName, recipientOrganization: review.recipientOrganization, vacancyTitle: review.vacancyTitle, expiresAt: expiresAt.toISOString() },
    });
    await prisma.$transaction([
      prisma.agencyTransactionalEmail.create({ data: { subscriptionId: subscription.id, kind: "candidate_acknowledgement_invite_v1", dedupeKey, entityType: "candidate_review", entityId: review.id, recipientEmail: review.candidateEmail, locale: review.locale, status: "sent", attemptCount: 1, sentAt: new Date() } }),
      prisma.agencyCandidateReview.update({ where: { id: review.id }, data: { status: "sent", sentAt: new Date() } }),
      prisma.agencyCandidateReviewEvent.create({ data: { reviewId: review.id, type: "email_sent", actorType: "system", metadata: { dedupeKey } } }),
    ]);
  } catch (error) {
    await prisma.$transaction([
      prisma.agencyTransactionalEmail.upsert({ where: { dedupeKey }, update: { status: "failed", attemptCount: { increment: 1 }, lastErrorCode: "SMTP_RESULT_UNKNOWN" }, create: { subscriptionId: subscription.id, kind: "candidate_acknowledgement_invite_v1", dedupeKey, entityType: "candidate_review", entityId: review.id, recipientEmail: review.candidateEmail, locale: review.locale, status: "failed", attemptCount: 1, lastErrorCode: "SMTP_RESULT_UNKNOWN" } }),
      prisma.agencyCandidateReview.update({ where: { id: review.id }, data: { status: "delivery_failed", tokenHash: null } }),
      prisma.agencyCandidateReviewEvent.create({ data: { reviewId: review.id, type: "email_failed", actorType: "system" } }),
    ]);
    console.error("candidate_review_email_failed", { reviewId: review.id, code: error instanceof Error ? error.name : "unknown" });
    return json({ error: "The invitation could not be delivered. No usable invitation token was retained; resend to create a new one.", code: "EMAIL_DELIVERY_FAILED", reviewId: review.id }, 502);
  }
  return json({ success: true, reviewId: review.id, expiresAt: expiresAt.toISOString() });
}
