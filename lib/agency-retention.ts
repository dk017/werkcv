import { Prisma } from "@prisma/client";
import { createHash } from "node:crypto";
import { prisma } from "@/lib/prisma";

export const AGENCY_RETENTION_OPTIONS = [30, 90, 180, 365] as const;
export const AGENCY_DEFAULT_RETENTION_DAYS = 90;
export const AGENCY_RETENTION_ACTIVATION_GRACE_DAYS = 7;

export type AgencyRetentionDays = (typeof AGENCY_RETENTION_OPTIONS)[number];

type RetentionPreviewPack = RetentionPackDates & {
  id: string;
  retentionExpiresAt: Date | null;
};

type RetentionPreviewSubscription = {
  userId: string;
  retentionDays: number;
  retentionPolicySetAt: Date | null;
};

export type AgencyDeletionSummary = {
  receiptId: string;
  matchPacksDeleted: number;
  revisionsDeleted: number;
  cvDocumentsDeleted: number;
  templatesDeleted: number;
  teamMembersDeleted: number;
};

export function isAgencyRetentionDays(value: unknown): value is AgencyRetentionDays {
  return typeof value === "number"
    && AGENCY_RETENTION_OPTIONS.includes(value as AgencyRetentionDays);
}

function assertRetentionDays(value: number): asserts value is AgencyRetentionDays {
  if (!isAgencyRetentionDays(value)) {
    throw new Error("INVALID_RETENTION_DAYS");
  }
}

type RetentionPackDates = {
  status: string;
  approvedAt: Date | null;
  updatedAt: Date;
};

export function getRetentionBaseDate(pack: RetentionPackDates): Date {
  return pack.status === "approved" && pack.approvedAt
    ? pack.approvedAt
    : pack.updatedAt;
}

export function calculateRetentionExpiry(
  pack: RetentionPackDates,
  retentionDays: number,
  now = new Date(),
  applyHistoricalGrace = false,
): Date {
  assertRetentionDays(retentionDays);
  const base = getRetentionBaseDate(pack);
  const expiry = new Date(base.getTime() + retentionDays * 24 * 60 * 60 * 1000);
  if (!applyHistoricalGrace) return expiry;
  const grace = new Date(now.getTime() + AGENCY_RETENTION_ACTIVATION_GRACE_DAYS * 24 * 60 * 60 * 1000);
  return expiry > grace ? expiry : grace;
}

export function calculateNewPackRetentionExpiry(
  retentionDays: number,
  now = new Date(),
): Date | null {
  if (!isAgencyRetentionDays(retentionDays)) return null;
  return calculateRetentionExpiry({ status: "analyzed", approvedAt: null, updatedAt: now }, retentionDays, now);
}

function createRetentionPreview(input: {
  subscription: RetentionPreviewSubscription;
  packs: RetentionPreviewPack[];
  retentionDays: number;
  now: Date;
}) {
  const applyHistoricalGrace = !input.subscription.retentionPolicySetAt;
  const expiries = input.packs.map((pack) => calculateRetentionExpiry(pack, input.retentionDays, input.now, applyHistoricalGrace));
  const earliestExpiry = expiries.length ? new Date(Math.min(...expiries.map((date) => date.getTime()))) : null;
  const packsShortened = input.packs.filter((pack, index) => {
    const current = pack.retentionExpiresAt?.getTime();
    return current !== undefined && expiries[index].getTime() < current;
  }).length;
  const previewAt = input.now.toISOString();
  const previewToken = createHash("sha256").update(JSON.stringify({
    previewAt,
    retentionDays: input.retentionDays,
    currentRetentionDays: input.subscription.retentionDays,
    retentionPolicySetAt: input.subscription.retentionPolicySetAt?.toISOString() || null,
    packs: input.packs.map((pack) => ({
      id: pack.id,
      status: pack.status,
      approvedAt: pack.approvedAt?.toISOString() || null,
      updatedAt: pack.updatedAt.toISOString(),
      retentionExpiresAt: pack.retentionExpiresAt?.toISOString() || null,
    })),
  })).digest("hex");
  return {
    retentionDays: input.retentionDays,
    currentRetentionDays: input.subscription.retentionDays,
    isShorter: input.retentionDays < input.subscription.retentionDays,
    packsAffected: input.packs.length,
    packsShortened,
    earliestExpiry,
    policyAcknowledged: Boolean(input.subscription.retentionPolicySetAt),
    previewAt,
    previewToken,
  };
}

export function retentionPreviewRequiresConfirmation(preview: {
  isShorter: boolean;
  policyAcknowledged: boolean;
  packsAffected: number;
  earliestExpiry: Date | string | null;
  previewAt: string;
}): boolean {
  const earliest = preview.earliestExpiry ? new Date(preview.earliestExpiry) : null;
  const previewAt = new Date(preview.previewAt);
  const withinThirtyDays = Boolean(earliest && earliest.getTime() <= previewAt.getTime() + 30 * 24 * 60 * 60 * 1000);
  return preview.isShorter || (!preview.policyAcknowledged && preview.packsAffected > 0 && withinThirtyDays);
}

type PackDeleteInput = {
  matchPackId: string;
  ownerUserId: string;
  subscriptionId: string;
  actorUserId?: string;
  reason: string;
  expectedUpdatedAt?: Date;
  expectedRetentionExpiresAt?: Date | null;
};

type PackDeleteCounts = Omit<AgencyDeletionSummary, "receiptId">;

async function deletePackContent(
  tx: Prisma.TransactionClient,
  input: PackDeleteInput,
): Promise<PackDeleteCounts | null> {
  const pack = await tx.agencyMatchPack.findFirst({
    where: { id: input.matchPackId, userId: input.ownerUserId },
    select: {
      id: true,
      userId: true,
      status: true,
      updatedAt: true,
      retentionExpiresAt: true,
      cvDocumentId: true,
      candidateReviews: { select: { id: true } },
    },
  });
  if (!pack) return null;

  if (input.expectedUpdatedAt && pack.updatedAt.getTime() !== input.expectedUpdatedAt.getTime()) return null;
  if (input.expectedRetentionExpiresAt !== undefined) {
    const expected = input.expectedRetentionExpiresAt?.getTime() ?? null;
    const actual = pack.retentionExpiresAt?.getTime() ?? null;
    if (expected !== actual) return null;
  }

  const revisionsDeleted = await tx.agencyMatchPackRevision.count({ where: { matchPackId: pack.id } });
  if (pack.candidateReviews.length) {
    await tx.agencyTransactionalEmail.deleteMany({
      where: { entityType: "candidate_review", entityId: { in: pack.candidateReviews.map((review) => review.id) } },
    });
  }
  let cvDocumentsDeleted = 0;

  if (pack.cvDocumentId) {
    const derivedCv = await tx.cVDocument.findFirst({
      where: {
        id: pack.cvDocumentId,
        userId: input.ownerUserId,
        OR: [
          { startSource: { in: ["agency_matchpack", "agency_plan"] } },
          { sourceCluster: "agency-matchpack" },
        ],
      },
      select: { id: true },
    });
    if (derivedCv) {
      await tx.cVDocument.delete({ where: { id: derivedCv.id } });
      cvDocumentsDeleted = 1;
    }
  }

  await tx.agencyMatchPack.delete({ where: { id: pack.id } });
  return {
    matchPacksDeleted: 1,
    revisionsDeleted,
    cvDocumentsDeleted,
    templatesDeleted: 0,
    teamMembersDeleted: 0,
  };
}

async function createReceipt(
  tx: Prisma.TransactionClient,
  input: PackDeleteInput,
  counts: PackDeleteCounts,
): Promise<AgencyDeletionSummary> {
  const subscription = await tx.agencySubscription.findUnique({
    where: { id: input.subscriptionId },
    select: { retentionDays: true },
  });
  const receipt = await tx.agencyDeletionReceipt.create({
    data: {
      subscriptionId: input.subscriptionId,
      actorUserId: input.actorUserId || null,
      reason: input.reason.slice(0, 80),
      matchPacksDeleted: counts.matchPacksDeleted,
      revisionsDeleted: counts.revisionsDeleted,
      cvDocumentsDeleted: counts.cvDocumentsDeleted,
      templatesDeleted: counts.templatesDeleted,
      teamMembersDeleted: counts.teamMembersDeleted,
      retentionDays: subscription?.retentionDays ?? null,
    },
    select: { id: true },
  });
  return { ...counts, receiptId: receipt.id };
}

export async function deleteAgencyMatchPackContent(input: PackDeleteInput): Promise<AgencyDeletionSummary | null> {
  return prisma.$transaction(async (tx) => {
    const counts = await deletePackContent(tx, input);
    if (!counts) return null;
    return createReceipt(tx, input, counts);
  });
}

export async function deleteAllAgencyContent(input: {
  subscriptionId: string;
  ownerUserId: string;
  actorUserId?: string;
  reason: string;
}): Promise<AgencyDeletionSummary> {
  return prisma.$transaction(async (tx) => {
    const packs = await tx.agencyMatchPack.findMany({
      where: { userId: input.ownerUserId },
      select: { id: true, updatedAt: true, retentionExpiresAt: true },
    });
    const totals: PackDeleteCounts = {
      matchPacksDeleted: 0,
      revisionsDeleted: 0,
      cvDocumentsDeleted: 0,
      templatesDeleted: 0,
      teamMembersDeleted: 0,
    };

    for (const pack of packs) {
      const counts = await deletePackContent(tx, {
        matchPackId: pack.id,
        ownerUserId: input.ownerUserId,
        subscriptionId: input.subscriptionId,
        actorUserId: input.actorUserId,
        reason: input.reason,
        expectedUpdatedAt: pack.updatedAt,
        expectedRetentionExpiresAt: pack.retentionExpiresAt,
      });
      if (!counts) continue;
      totals.matchPacksDeleted += counts.matchPacksDeleted;
      totals.revisionsDeleted += counts.revisionsDeleted;
      totals.cvDocumentsDeleted += counts.cvDocumentsDeleted;
    }

    // Remove standalone CVs created through the Agency CV route or CSV import.
    // Usage rows intentionally remain so deletion never refunds quota.
    const standaloneAgencyCvs = await tx.cVDocument.findMany({
      where: {
        userId: input.ownerUserId,
        OR: [
          { startSource: "agency_plan" },
          { sourceCluster: "agency-csv-import" },
        ],
      },
      select: { id: true },
    });
    if (standaloneAgencyCvs.length) {
      const deletedStandalone = await tx.cVDocument.deleteMany({
        where: { id: { in: standaloneAgencyCvs.map((cv) => cv.id) }, userId: input.ownerUserId },
      });
      totals.cvDocumentsDeleted += deletedStandalone.count;
    }

    const templates = await tx.agencyTemplate.deleteMany({ where: { ownerId: input.ownerUserId } });
    const members = await tx.agencyTeamMember.deleteMany({ where: { subscriptionId: input.subscriptionId } });
    totals.templatesDeleted = templates.count;
    totals.teamMembersDeleted = members.count;

    return createReceipt(tx, {
      matchPackId: "agency-wide",
      ownerUserId: input.ownerUserId,
      subscriptionId: input.subscriptionId,
      actorUserId: input.actorUserId,
      reason: input.reason,
    }, totals);
  });
}

export async function previewRetentionPolicyChange(
  subscriptionId: string,
  retentionDays: number,
  now = new Date(),
) {
  assertRetentionDays(retentionDays);
  const subscription = await prisma.agencySubscription.findUnique({
    where: { id: subscriptionId },
    select: { userId: true, retentionDays: true, retentionPolicySetAt: true },
  });
  if (!subscription) throw new Error("AGENCY_SUBSCRIPTION_NOT_FOUND");

  const packs = await prisma.agencyMatchPack.findMany({
    where: { userId: subscription.userId },
    orderBy: { id: "asc" },
    select: { id: true, status: true, approvedAt: true, updatedAt: true, retentionExpiresAt: true },
  });
  return createRetentionPreview({ subscription, packs, retentionDays, now });
}

export async function applyRetentionPolicyChange(
  subscriptionId: string,
  retentionDays: number,
  input: { previewAt: string; previewToken: string; confirmation?: string },
) {
  assertRetentionDays(retentionDays);
  return prisma.$transaction(async (tx) => {
    const now = new Date(input.previewAt);
    if (Number.isNaN(now.getTime())) throw new Error("RETENTION_PREVIEW_INVALID");
    const previewAgeMs = Date.now() - now.getTime();
    if (previewAgeMs < -60_000 || previewAgeMs > 15 * 60 * 1000) throw new Error("RETENTION_PREVIEW_STALE");
    const subscription = await tx.agencySubscription.findUnique({
      where: { id: subscriptionId },
      select: { userId: true, retentionDays: true, retentionPolicySetAt: true },
    });
    if (!subscription) throw new Error("AGENCY_SUBSCRIPTION_NOT_FOUND");

    const packs = await tx.agencyMatchPack.findMany({
      where: { userId: subscription.userId },
      orderBy: { id: "asc" },
      select: { id: true, status: true, approvedAt: true, updatedAt: true, retentionExpiresAt: true },
    });
    const preview = createRetentionPreview({ subscription, packs, retentionDays, now });
    if (preview.previewToken !== input.previewToken) throw new Error("RETENTION_PREVIEW_STALE");
    if (retentionPreviewRequiresConfirmation(preview) && input.confirmation !== "APPLY RETENTION POLICY") {
      throw new Error("RETENTION_CONFIRMATION_REQUIRED");
    }
    for (const pack of packs) {
      await tx.agencyMatchPack.update({
        where: { id: pack.id },
        data: { retentionExpiresAt: calculateRetentionExpiry(pack, retentionDays, now, !subscription.retentionPolicySetAt) },
      });
    }
    await tx.agencySubscription.update({
      where: { id: subscriptionId },
      data: {
        retentionDays,
        retentionPolicySetAt: subscription.retentionPolicySetAt || now,
        retentionUpdatedAt: now,
      },
    });
    return { retentionDays, packsUpdated: packs.length, previewAt: preview.previewAt };
  });
}

export async function sweepExpiredAgencyContent(options: {
  now?: Date;
  execute?: boolean;
  batchSize?: number;
} = {}) {
  const now = options.now || new Date();
  const execute = options.execute === true;
  const batchSize = Math.min(100, Math.max(1, options.batchSize || 100));
  const packs = await prisma.agencyMatchPack.findMany({
    where: {
      retentionExpiresAt: { lte: now },
      user: { agencySubscription: { retentionPolicySetAt: { not: null } } },
    },
    orderBy: { retentionExpiresAt: "asc" },
    take: batchSize,
    select: {
      id: true,
      userId: true,
      updatedAt: true,
      retentionExpiresAt: true,
      user: { select: { agencySubscription: { select: { id: true } } } },
    },
  });
  if (!execute) {
    return { dryRun: true, selected: packs.length, deleted: 0, revisionsDeleted: 0, cvDocumentsDeleted: 0 };
  }

  let deleted = 0;
  let revisionsDeleted = 0;
  let cvDocumentsDeleted = 0;
  for (const pack of packs) {
    const subscriptionId = pack.user.agencySubscription?.id;
    if (!subscriptionId || !pack.retentionExpiresAt) continue;
    const summary = await deleteAgencyMatchPackContent({
      matchPackId: pack.id,
      ownerUserId: pack.userId,
      subscriptionId,
      reason: "retention_expired",
      expectedUpdatedAt: pack.updatedAt,
      expectedRetentionExpiresAt: pack.retentionExpiresAt,
    });
    if (!summary) continue;
    deleted += summary.matchPacksDeleted;
    revisionsDeleted += summary.revisionsDeleted;
    cvDocumentsDeleted += summary.cvDocumentsDeleted;
  }
  return { dryRun: false, selected: packs.length, deleted, revisionsDeleted, cvDocumentsDeleted };
}
