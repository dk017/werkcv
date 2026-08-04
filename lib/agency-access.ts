import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  AGENCY_MONTHLY_CV_LIMIT,
  isAgencySubscriptionInPaidPeriod,
} from "@/lib/agency-plan";

export type AgencyAccessErrorCode =
  | "AGENCY_QUOTA_REACHED"
  | "AGENCY_PERIOD_UNAVAILABLE"
  | "AGENCY_SUBSCRIPTION_INACTIVE";

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
};

export type AgencyAccessSnapshot = {
  subscription: AgencySubscriptionLike | null;
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
  const subscription = await findAgencySubscription(userId);
  if (!subscription) {
    return {
      subscription: null,
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
    period,
    used,
    remaining,
    canCreate: remaining > 0,
    state: "active",
  };
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
        "The agency plan has reached its monthly CV limit.",
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

export function isAgencyAccessError(error: unknown): error is AgencyAccessError {
  return error instanceof AgencyAccessError;
}
