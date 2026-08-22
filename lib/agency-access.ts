import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  AGENCY_MONTHLY_CV_LIMIT,
  isAgencySubscriptionInPaidPeriod,
} from "@/lib/agency-plan";
import { calculateRetentionExpiry } from "@/lib/agency-retention";
import {
  parseStoredMatchPackAnalysis,
  parseStoredMatchPackData,
  parseStoredMatchPackSubmission,
} from "@/lib/agency-matchpack";
import { createApprovedSnapshotDigest, createApprovedSnapshotDigestV2, approvalDataSchema } from "@/lib/agency-matchpack-approval";
import { assertClaimsReadyForApproval } from "@/lib/agency-claim-review";
import { candidateAcknowledgementEnabled, proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";
import { buildApprovedMatchPackOutput } from "@/lib/agency-output-projection";
import { validateMatchPackReviewForApproval } from "@/lib/agency-matchpack-review";
import { matchPackSourceMapSchema } from "@/lib/agency-matchpack-source";

export type AgencyAccessErrorCode =
  | "AGENCY_QUOTA_REACHED"
  | "AGENCY_PERIOD_UNAVAILABLE"
  | "AGENCY_SUBSCRIPTION_INACTIVE"
  | "RETENTION_POLICY_REQUIRED";

export class AgencyAccessError extends Error {
  readonly code: AgencyAccessErrorCode;

  constructor(code: AgencyAccessErrorCode, message: string) {
    super(message);
    this.name = "AgencyAccessError";
    this.code = code;
  }
}

type AgencySubscriptionLike = {
  id: string;
  userId: string;
  status: string;
  monthlyLimit: number;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  externalSubscriptionId: string | null;
  companyName: string | null;
  website: string | null;
  templateId: string;
  colorThemeId: string;
  retentionDays: number;
  retentionPolicySetAt: Date | null;
  retentionUpdatedAt: Date | null;
  onboardingDismissedAt: Date | null;
  onboardingExampleViewedAt: Date | null;
  excludeFromProductMetrics: boolean;
  legalName: string | null;
  privacyPolicyUrl: string | null;
  privacyContactEmail: string | null;
};

export type AgencyAccessSnapshot = {
  subscription: AgencySubscriptionLike | null;
  ownerUserId: string | null;
  role: "owner" | "editor" | "reviewer" | "viewer";
  isOwner: boolean;
  period: {
    id: string;
    startsAt: Date;
    endsAt: Date;
    allowance: number;
  } | null;
  used: number;
  remaining: number;
  canCreate: boolean;
  state: "none" | "pending" | "active" | "paused" | "expired" | "needs_sync";
};

type CvCreateData = Prisma.CVDocumentUncheckedCreateInput;

function periodBoundsForSubscription(
  subscription: Pick<AgencySubscriptionLike, "status" | "currentPeriodStart" | "currentPeriodEnd">,
  now: Date,
): { startsAt: Date; endsAt: Date } | null {
  if (!isAgencySubscriptionInPaidPeriod(subscription, now)) return null;

  if (subscription.currentPeriodStart && subscription.currentPeriodEnd) {
    if (subscription.currentPeriodStart <= now && subscription.currentPeriodEnd > now) {
      return {
        startsAt: subscription.currentPeriodStart,
        endsAt: subscription.currentPeriodEnd,
      };
    }
    return null;
  }

  // Until the provider sends the first period boundaries, use a UTC calendar
  // month. Live Dodo subscriptions will normally have exact boundaries.
  const startsAt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const endsAt = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  return { startsAt, endsAt };
}

async function ensureCurrentUsagePeriod(
  tx: Prisma.TransactionClient,
  subscription: AgencySubscriptionLike,
  now: Date,
) {
  const bounds = periodBoundsForSubscription(subscription, now);
  if (!bounds) return null;

  return tx.agencyUsagePeriod.upsert({
    where: {
      subscriptionId_startsAt: {
        subscriptionId: subscription.id,
        startsAt: bounds.startsAt,
      },
    },
    update: {
      endsAt: bounds.endsAt,
      allowance: Math.max(0, subscription.monthlyLimit || AGENCY_MONTHLY_CV_LIMIT),
    },
    create: {
      subscriptionId: subscription.id,
      startsAt: bounds.startsAt,
      endsAt: bounds.endsAt,
      allowance: Math.max(0, subscription.monthlyLimit || AGENCY_MONTHLY_CV_LIMIT),
    },
  });
}

function isSerializationConflict(error: unknown): boolean {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2034";
}

async function withSerializableRetry<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await prisma.$transaction(callback, {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 5000,
        timeout: 10000,
      });
    } catch (error) {
      lastError = error;
      if (!isSerializationConflict(error) || attempt === 2) throw error;
    }
  }
  throw lastError;
}

async function findAgencySubscription(userId: string) {
  return prisma.agencySubscription.findUnique({
    where: { userId },
  });
}

export async function getAgencyAccessForUser(userId: string): Promise<AgencyAccessSnapshot> {
  const directSubscription = await findAgencySubscription(userId);
  let subscription = directSubscription;
  let role: AgencyAccessSnapshot["role"] = directSubscription ? "owner" : "viewer";
  let ownerUserId: string | null = directSubscription?.userId || null;

  if (!subscription) {
    const memberUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
    if (memberUser) {
      const membership = await prisma.agencyTeamMember.findFirst({
        where: {
          OR: [{ userId }, { email: memberUser.email }],
          status: { in: ["invited", "active"] },
        },
        include: { subscription: true },
        orderBy: { createdAt: "desc" },
      });
      if (membership) {
        subscription = membership.subscription;
        role = membership.role === "editor" || membership.role === "reviewer" || membership.role === "viewer"
          ? membership.role
          : "editor";
        ownerUserId = subscription.userId;
        if (!membership.userId) {
          await prisma.agencyTeamMember.update({ where: { id: membership.id }, data: { userId, status: "active", acceptedAt: new Date() } }).catch(() => undefined);
        }
      }
    }
  }

  if (!subscription) {
    return {
      subscription: null,
      ownerUserId: null,
      role: "viewer",
      isOwner: false,
      period: null,
      used: 0,
      remaining: 0,
      canCreate: false,
      state: "none",
    };
  }

  const now = new Date();
  const status = subscription.status.trim().toLowerCase();
  if (status === "pending") {
    return {
      subscription,
      ownerUserId,
      role,
      isOwner: role === "owner",
      period: null,
      used: 0,
      remaining: 0,
      canCreate: false,
      state: "pending",
    };
  }

  if (!isAgencySubscriptionInPaidPeriod(subscription, now)) {
    return {
      subscription,
      ownerUserId,
      role,
      isOwner: role === "owner",
      period: null,
      used: 0,
      remaining: 0,
      canCreate: false,
      state: status === "expired" || status === "cancelled" || status === "canceled" ? "expired" : "paused",
    };
  }

  const period = await prisma.$transaction((tx) => ensureCurrentUsagePeriod(tx, subscription, now));
  if (!period) {
    return {
      subscription,
      ownerUserId,
      role,
      isOwner: role === "owner",
      period: null,
      used: 0,
      remaining: 0,
      canCreate: false,
      state: "needs_sync",
    };
  }

  const used = await prisma.agencyCvUsage.count({ where: { periodId: period.id } });
  const remaining = Math.max(0, period.allowance - used);
  return {
    subscription,
    ownerUserId,
    role,
    isOwner: role === "owner",
    period,
    used,
    remaining,
    canCreate: remaining > 0,
    state: "active",
  };
}

export function canEditAgency(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return canEditAgencyDraft(access);
}

export function canCreateAgencyWork(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "editor";
}

export function canViewAgencyWork(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "editor" || access.role === "reviewer" || access.role === "viewer";
}

export function canEditAgencyDraft(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "editor" || access.role === "reviewer";
}

export function canReviewAgencyEvidence(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return canEditAgencyDraft(access);
}

export function canApproveAgencyWork(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "reviewer";
}

export function canExportAgencyWork(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "editor" || access.role === "reviewer";
}

export function canDeleteAgencyDraft(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner" || access.role === "editor";
}

export function canDeleteApprovedAgencyWork(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner";
}

export function canManageAgency(access: Pick<AgencyAccessSnapshot, "role">): boolean {
  return access.role === "owner";
}

export function needsAgencyRetentionAcknowledgement(
  access: Pick<AgencyAccessSnapshot, "subscription" | "state">,
): boolean {
  return access.state === "active" && Boolean(access.subscription) && !access.subscription?.retentionPolicySetAt;
}

/**
 * Creates a CV and reserves one agency slot in the same serializable
 * transaction. Consumer accounts continue through the original path.
 */
export async function createCvDocumentForUser(data: CvCreateData) {
  if (!data.userId) return prisma.cVDocument.create({ data });

  const subscription = await findAgencySubscription(data.userId);
  if (!subscription || !isAgencySubscriptionInPaidPeriod(subscription)) {
    return prisma.cVDocument.create({ data });
  }

  return withSerializableRetry(async (tx) => {
    const currentSubscription = await tx.agencySubscription.findUnique({
      where: { userId: data.userId as string },
    });
    if (!currentSubscription || !isAgencySubscriptionInPaidPeriod(currentSubscription)) {
      throw new AgencyAccessError(
        "AGENCY_SUBSCRIPTION_INACTIVE",
        "The agency subscription is no longer active.",
      );
    }
    if (!currentSubscription.retentionPolicySetAt) {
      throw new AgencyAccessError("RETENTION_POLICY_REQUIRED", "Choose the Agency retention period before creating a CV.");
    }

    const period = await ensureCurrentUsagePeriod(tx, currentSubscription, new Date());
    if (!period) {
      throw new AgencyAccessError(
        "AGENCY_PERIOD_UNAVAILABLE",
        "The agency billing period is not available yet.",
      );
    }

    const used = await tx.agencyCvUsage.count({ where: { periodId: period.id } });
    if (used >= period.allowance) {
      throw new AgencyAccessError(
        "AGENCY_QUOTA_REACHED",
        "The shared 50-slot allowance has been reached.",
      );
    }

    const cv = await tx.cVDocument.create({
      data: {
        ...data,
        templateId: currentSubscription.templateId || data.templateId,
        colorThemeId: currentSubscription.colorThemeId || data.colorThemeId,
      },
    });
    await tx.agencyCvUsage.create({
      data: {
        periodId: period.id,
        cvId: cv.id,
      },
    });
    return cv;
  });
}

export async function createAgencyCvDocumentsAtomically(userId: string, rows: CvCreateData[]) {
  if (!rows.length || rows.length > 100) throw new Error("INVALID_IMPORT_SIZE");
  return withSerializableRetry(async (tx) => {
    const currentSubscription = await tx.agencySubscription.findUnique({ where: { userId } });
    if (!currentSubscription || !isAgencySubscriptionInPaidPeriod(currentSubscription)) {
      throw new AgencyAccessError("AGENCY_SUBSCRIPTION_INACTIVE", "The agency subscription is no longer active.");
    }
    if (!currentSubscription.retentionPolicySetAt) {
      throw new AgencyAccessError("RETENTION_POLICY_REQUIRED", "Choose the Agency retention period before importing CVs.");
    }
    const period = await ensureCurrentUsagePeriod(tx, currentSubscription, new Date());
    if (!period) throw new AgencyAccessError("AGENCY_PERIOD_UNAVAILABLE", "The agency billing period is not available yet.");
    const used = await tx.agencyCvUsage.count({ where: { periodId: period.id } });
    if (used + rows.length > period.allowance) {
      throw new AgencyAccessError("AGENCY_QUOTA_REACHED", "The shared 50-slot allowance has insufficient remaining slots.");
    }

    const created = [];
    for (const row of rows) {
      const cv = await tx.cVDocument.create({
        data: {
          ...row,
          userId,
          templateId: currentSubscription.templateId || row.templateId,
          colorThemeId: currentSubscription.colorThemeId || row.colorThemeId,
        },
      });
      await tx.agencyCvUsage.create({ data: { periodId: period.id, cvId: cv.id } });
      created.push(cv);
    }
    return created;
  });
}

type MatchPackApprovalData = {
  userId: string;
  matchPackId: string;
  approvedById: string;
  expectedUpdatedAt: Date;
  expectedRevisionVersion: number;
  selectedVariant: "full" | "contact_free";
  confirmations: {
    evidenceReviewed: true;
    candidateDataReviewed: true;
    clientCopyReviewed: true;
    sharingAuthorityConfirmed: true;
  };
};

/**
 * Approves a MatchPack and creates its linked CV in the same serializable
 * transaction that reserves the agency slot. The pack id makes this operation
 * idempotent, including when two browser requests arrive together.
 */
export async function approveAgencyMatchPackForUser(data: MatchPackApprovalData) {
  return withSerializableRetry(async (tx) => {
    const pack = await tx.agencyMatchPack.findFirst({
      where: { id: data.matchPackId, userId: data.userId },
      select: {
        id: true,
        title: true,
        candidateData: true,
        submissionData: true,
        analysis: true,
        claimVerificationData: true,
        vacancyTitle: true,
        vacancyText: true,
        locale: true,
        sourceText: true,
        sourceMap: true,
        templateId: true,
        colorThemeId: true,
        agencyTemplateId: true,
        cvDocumentId: true,
        status: true,
        retentionExpiresAt: true,
        updatedAt: true,
        revisions: {
          select: { version: true },
          orderBy: { version: "desc" },
          take: 1,
        },
        candidateReviews: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: {
            suggestions: { where: { status: "pending" }, select: { id: true } },
            events: { where: { type: "override_recorded" }, orderBy: { createdAt: "desc" }, take: 1 },
          },
        },
      },
    });

    if (!pack) {
      throw new Error("MATCH_PACK_NOT_FOUND");
    }

    if (pack.cvDocumentId) {
      const cv = await tx.cVDocument.findFirst({
        where: { id: pack.cvDocumentId, userId: data.userId },
      });
      if (cv) return { cv, reused: true, retentionExpiresAt: pack.retentionExpiresAt };
    }

    if (pack.status === "approved") {
      throw new Error("MATCH_PACK_ALREADY_APPROVED");
    }

    const currentSubscription = await tx.agencySubscription.findUnique({
      where: { userId: data.userId },
    });
    if (!currentSubscription || !isAgencySubscriptionInPaidPeriod(currentSubscription)) {
      throw new AgencyAccessError(
        "AGENCY_SUBSCRIPTION_INACTIVE",
        "The agency subscription is no longer active.",
      );
    }
    if (!currentSubscription.retentionPolicySetAt) {
      throw new AgencyAccessError(
        "RETENTION_POLICY_REQUIRED",
        "Choose the Agency retention period before approving a MatchPack.",
      );
    }
    if (pack.updatedAt.getTime() !== data.expectedUpdatedAt.getTime()
      || pack.revisions[0]?.version !== data.expectedRevisionVersion) {
      throw new Error("PACK_STALE");
    }
    if (!pack.sourceText || !pack.sourceMap || !pack.submissionData) {
      throw new Error("EVIDENCE_UNRESOLVED");
    }

    const claimGateEnabled = proposalClaimVerifierEnabled();
    const acknowledgementGateEnabled = candidateAcknowledgementEnabled();
    const latestCandidateReview = pack.candidateReviews[0] || null;
    let candidateReviewAssurance: {
      kind: "candidate_acknowledgement";
      reviewId: string;
      snapshotDigest: string;
      respondedAt: string;
    } | {
      kind: "reviewer_override";
      reviewId: string;
      eventId: string;
      reason: string;
      overriddenAt: string;
      overriddenById: string;
    } | null = null;

    if (acknowledgementGateEnabled) {
      if (!latestCandidateReview || latestCandidateReview.revisionVersion !== data.expectedRevisionVersion) {
        throw new Error("CANDIDATE_REVIEW_REQUIRED");
      }
      if (latestCandidateReview.candidateResponse === "declined") throw new Error("CANDIDATE_DECLINED");
      if (latestCandidateReview.suggestions.length || latestCandidateReview.candidateResponse === "corrections_requested") {
        throw new Error("CANDIDATE_CORRECTIONS_PENDING");
      }
      if (latestCandidateReview.candidateResponse === "confirmed" && latestCandidateReview.respondedAt) {
        candidateReviewAssurance = {
          kind: "candidate_acknowledgement",
          reviewId: latestCandidateReview.id,
          snapshotDigest: latestCandidateReview.snapshotDigest,
          respondedAt: latestCandidateReview.respondedAt.toISOString(),
        };
      } else if (latestCandidateReview.status === "overridden" && latestCandidateReview.overrideReason
        && latestCandidateReview.overriddenAt && latestCandidateReview.overriddenById && latestCandidateReview.events[0]) {
        candidateReviewAssurance = {
          kind: "reviewer_override",
          reviewId: latestCandidateReview.id,
          eventId: latestCandidateReview.events[0].id,
          reason: latestCandidateReview.overrideReason,
          overriddenAt: latestCandidateReview.overriddenAt.toISOString(),
          overriddenById: latestCandidateReview.overriddenById,
        };
      } else {
        throw new Error("CANDIDATE_REVIEW_REQUIRED");
      }
    }
    if (claimGateEnabled) {
      assertClaimsReadyForApproval(pack.claimVerificationData, candidateReviewAssurance?.kind === "candidate_acknowledgement");
    }

    const approvedData = parseStoredMatchPackData(pack.candidateData);
    const analysis = parseStoredMatchPackAnalysis(pack.analysis);
    const sourceMap = matchPackSourceMapSchema.parse(pack.sourceMap);
    const storedSubmission = parseStoredMatchPackSubmission(pack.submissionData);
    const submissionData = {
      ...storedSubmission,
      selectedVariant: data.selectedVariant === "contact_free" ? "anonymized" as const : "full" as const,
    };
    const serverMetrics = validateMatchPackReviewForApproval({
      analysis,
      sourceText: pack.sourceText,
      sourceMap,
      vacancyText: pack.vacancyText,
    });
    buildApprovedMatchPackOutput({
      candidateData: approvedData,
      analysis,
      submission: submissionData,
      vacancyTitle: pack.vacancyTitle || "",
      vacancyText: pack.vacancyText,
      sourceText: pack.sourceText,
      sourceMap,
      locale: pack.locale === "en" ? "en" : "nl",
      variant: data.selectedVariant,
    });

    const period = await ensureCurrentUsagePeriod(tx, currentSubscription, new Date());
    if (!period) {
      throw new AgencyAccessError(
        "AGENCY_PERIOD_UNAVAILABLE",
        "The agency billing period is not available yet.",
      );
    }

    const used = await tx.agencyCvUsage.count({ where: { periodId: period.id } });
    if (used >= period.allowance) {
      throw new AgencyAccessError(
        "AGENCY_QUOTA_REACHED",
        "The shared 50-slot allowance has been reached.",
      );
    }

    const cv = await tx.cVDocument.create({
      data: {
        title: pack.title,
        data: approvedData as unknown as Prisma.InputJsonValue,
        templateId: currentSubscription.templateId || pack.templateId,
        colorThemeId: currentSubscription.colorThemeId || pack.colorThemeId,
        startSource: "agency_matchpack",
        sourceCluster: "agency-matchpack",
        sourceLocale: approvedData.personal.resumeLanguage || "nl",
        userId: data.userId,
      },
    });

    await tx.agencyCvUsage.create({
      data: {
        periodId: period.id,
        cvId: cv.id,
      },
    });

    const approvedAt = new Date();
    const retentionExpiresAt = currentSubscription.retentionPolicySetAt
      ? calculateRetentionExpiry(
        { status: "approved", approvedAt, updatedAt: approvedAt },
        currentSubscription.retentionDays,
        approvedAt,
      )
      : null;
    const approvalData = approvalDataSchema.parse({
      version: claimGateEnabled || acknowledgementGateEnabled ? 2 : 1,
      selectedVariant: data.selectedVariant,
      confirmations: data.confirmations,
      approvedAt: approvedAt.toISOString(),
      approvedById: data.approvedById,
      revisionVersion: data.expectedRevisionVersion,
      ...(claimGateEnabled || acknowledgementGateEnabled ? { candidateReviewAssurance } : {}),
    });
    const approvedSnapshotDigest = approvalData.version === 1
      ? createApprovedSnapshotDigest({
        candidateData: approvedData,
        submissionData,
        analysis,
        selectedVariant: data.selectedVariant,
        templateId: pack.templateId,
        colorThemeId: pack.colorThemeId,
        agencyTemplateId: pack.agencyTemplateId,
        revisionVersion: data.expectedRevisionVersion,
      })
      : createApprovedSnapshotDigestV2({
        candidateData: approvedData,
        submissionData,
        analysis,
        claimVerificationData: pack.claimVerificationData,
        candidateReviewAssurance,
        selectedVariant: data.selectedVariant,
        templateId: pack.templateId,
        colorThemeId: pack.colorThemeId,
        agencyTemplateId: pack.agencyTemplateId,
        revisionVersion: data.expectedRevisionVersion,
      });
    const updateResult = await tx.agencyMatchPack.updateMany({
      where: {
        id: data.matchPackId,
        userId: data.userId,
        status: "analyzed",
        updatedAt: data.expectedUpdatedAt,
      },
      data: {
        cvDocumentId: cv.id,
        status: "approved",
        approvedAt,
        approvedById: data.approvedById,
        approvalData: approvalData as unknown as Prisma.InputJsonValue,
        approvedRevisionVersion: data.expectedRevisionVersion,
        approvedSnapshotDigest,
        submissionData: submissionData as unknown as Prisma.InputJsonValue,
        correctionsCount: serverMetrics.correctionsCount,
        unsupportedClaimsCaught: serverMetrics.unsupportedClaimsCaught,
        retentionExpiresAt,
      },
    });
    if (updateResult.count !== 1) throw new Error("PACK_STALE");

    return { cv, reused: false, retentionExpiresAt };
  });
}

export function isAgencyAccessError(error: unknown): error is AgencyAccessError {
  return error instanceof AgencyAccessError;
}
