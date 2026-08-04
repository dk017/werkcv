import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AGENCY_MONTHLY_CV_LIMIT, AGENCY_PLAN_CODE, AGENCY_CURRENCY } from "@/lib/agency-plan";

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
  const metadata = jsonValue(input.metadata);

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
    monthlyLimit: AGENCY_MONTHLY_CV_LIMIT,
    currentPeriodStart: startsAt,
    currentPeriodEnd: endsAt,
    cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? subscription?.cancelAtPeriodEnd ?? false,
    canceledAt: input.canceledAt || subscription?.canceledAt || null,
    metadata: metadata || subscription?.metadata || undefined,
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
      update: {
        endsAt,
        allowance: AGENCY_MONTHLY_CV_LIMIT,
      },
      create: {
        subscriptionId: saved.id,
        startsAt,
        endsAt,
        allowance: AGENCY_MONTHLY_CV_LIMIT,
      },
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

  return saved;
}
