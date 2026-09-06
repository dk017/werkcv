import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  AGENCY_MONTHLY_CREDIT_LIMIT,
  AGENCY_PLAN_CODE,
  AGENCY_PLAN_VERSION,
  AGENCY_CURRENCY,
} from "@/lib/agency-plan";
import { enqueueAgencyWelcomeEmail } from "@/lib/agency-email-outbox";

export type AgencyBillingSyncInput = {
  eventType: string;
  email: string;
  subscriptionId?: string | null;
  customerId?: string | null;
  checkoutSessionId?: string | null;
  productId?: string | null;
  status?: string | null;
  companyName?: string | null;
  website?: string | null;
  currentPeriodStart?: Date | null;
  currentPeriodEnd?: Date | null;
  cancelAtPeriodEnd?: boolean;
  canceledAt?: Date | null;
  metadata?: Record<string, unknown> | null;
  payment?: {
    id: string;
    amountCents?: number | null;
    currency?: string | null;
    paidAt?: Date | null;
  } | null;
};

function addOneMonth(value: Date): Date {
  const next = new Date(value);
  next.setUTCMonth(next.getUTCMonth() + 1);
  return next;
}

function normalizeStatus(value: string | null | undefined, eventType: string): string {
  const normalized = value?.trim().toLowerCase();
  if (normalized) return normalized;
  if (eventType === "subscription.cancelled") return "cancelled";
  if (eventType === "subscription.expired") return "expired";
  if (eventType === "subscription.on_hold") return "on_hold";
  if (eventType === "subscription.failed") return "failed";
  return "active";
}

function normalizedEmail(value: string): string {
  return value.trim().toLowerCase();
}

function jsonValue(value: Record<string, unknown> | null | undefined): Prisma.InputJsonValue | undefined {
  if (!value) return undefined;
  return JSON.parse(JSON.stringify(value)) as Prisma.InputJsonValue;
}

function objectMetadata(value: Prisma.JsonValue | null | undefined): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

/**
 * Resolve the allowance used while synchronising a provider event.
 *
 * The database migration is responsible for upgrading legacy Agency
 * subscriptions to the new 300-credit contract. Once a value is stored, it
 * is authoritative: in particular, zero must remain zero rather than being
 * treated as a missing value. A custom allowance above the public contract is
 * also preserved.
 */
export function resolveAgencyMonthlyLimit(stored: number | null | undefined): number {
  return stored == null ? AGENCY_MONTHLY_CREDIT_LIMIT : Math.max(0, stored);
}

export async function syncAgencyBilling(input: AgencyBillingSyncInput) {
  const email = normalizedEmail(input.email);
  if (!email) throw new Error("Agency billing event is missing a customer email");

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  let subscription = input.subscriptionId
    ? await prisma.agencySubscription.findUnique({
        where: { externalSubscriptionId: input.subscriptionId },
      })
    : null;

  if (!subscription && input.checkoutSessionId) {
    subscription = await prisma.agencySubscription.findUnique({
      where: { checkoutSessionId: input.checkoutSessionId },
    });
  }

  if (!subscription) {
    subscription = await prisma.agencySubscription.findUnique({
      where: { userId: user.id },
    });
  }

  const now = new Date();
  const startsAt = input.currentPeriodStart || subscription?.currentPeriodStart || now;
  const endsAt = input.currentPeriodEnd || subscription?.currentPeriodEnd || addOneMonth(startsAt);
  const status = normalizeStatus(input.status, input.eventType);
  const metadata = jsonValue({
    ...objectMetadata(subscription?.metadata),
    ...(input.metadata ?? {}),
    // Keep the commercial contract authoritative even when an old provider
    // webhook sends stale or incomplete metadata.
    plan_version: AGENCY_PLAN_VERSION,
    credit_limit: AGENCY_MONTHLY_CREDIT_LIMIT,
  });

  // The additive migration upgrades legacy values below 300 before this
  // synchronisation path is enabled. Provider webhooks must not reduce an
  // existing allowance, and a stored zero is intentional rather than absent.
  const monthlyLimit = resolveAgencyMonthlyLimit(subscription?.monthlyLimit);
  const subscriptionData = {
    userId: user.id,
    planCode: AGENCY_PLAN_CODE,
    provider: "dodo",
    status,
    productId: input.productId || subscription?.productId || null,
    externalSubscriptionId: input.subscriptionId || subscription?.externalSubscriptionId || null,
    externalCustomerId: input.customerId || subscription?.externalCustomerId || null,
    checkoutSessionId: input.checkoutSessionId || subscription?.checkoutSessionId || null,
    companyName: input.companyName || subscription?.companyName || null,
    website: input.website || subscription?.website || null,
    monthlyLimit,
    retentionPolicySetAt: subscription
      ? subscription.retentionPolicySetAt
      : (status === "active" && endsAt > now ? now : null),
    retentionUpdatedAt: subscription
      ? subscription.retentionUpdatedAt
      : (status === "active" && endsAt > now ? now : null),
    currentPeriodStart: startsAt,
    currentPeriodEnd: endsAt,
    cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? subscription?.cancelAtPeriodEnd ?? false,
    canceledAt: input.canceledAt || subscription?.canceledAt || null,
    metadata,
  };

  const saved = subscription
    ? await prisma.agencySubscription.update({
        where: { id: subscription.id },
        data: subscriptionData,
      })
    : await prisma.agencySubscription.create({ data: subscriptionData });

  if (["active", "cancelled", "canceled"].includes(status) && endsAt > now) {
    await prisma.agencyUsagePeriod.upsert({
      where: {
        subscriptionId_startsAt: {
          subscriptionId: saved.id,
          startsAt,
        },
      },
      update: { endsAt },
      create: {
        subscriptionId: saved.id,
        startsAt,
        endsAt,
        allowance: monthlyLimit,
      },
    });
    // An upsert update must be non-decreasing for custom allowances. Raise
    // only periods below the current contract; never lower a larger value.
    await prisma.agencyUsagePeriod.updateMany({
      where: {
        subscriptionId: saved.id,
        startsAt,
        allowance: { lt: monthlyLimit },
      },
      data: { allowance: monthlyLimit },
    });
  }

  if (input.payment) {
    await prisma.agencyPayment.upsert({
      where: { externalPaymentId: input.payment.id },
      update: {
        subscriptionId: saved.id,
        checkoutSessionId: input.checkoutSessionId || null,
        amountCents: input.payment.amountCents ?? null,
        currency: (input.payment.currency || AGENCY_CURRENCY).toUpperCase(),
        status: "paid",
        paidAt: input.payment.paidAt || now,
      },
      create: {
        subscriptionId: saved.id,
        externalPaymentId: input.payment.id,
        checkoutSessionId: input.checkoutSessionId || null,
        amountCents: input.payment.amountCents ?? null,
        currency: (input.payment.currency || AGENCY_CURRENCY).toUpperCase(),
        status: "paid",
        paidAt: input.payment.paidAt || now,
      },
    });
  }

  if (["active", "cancelled", "canceled"].includes(status) && endsAt > now) {
    await enqueueAgencyWelcomeEmail({ subscriptionId: saved.id, recipientEmail: email, locale: "nl" });
  }

  return saved;
}
