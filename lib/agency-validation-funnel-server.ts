import { prisma } from "@/lib/prisma";
import {
  buildAgencyValidationReport,
  type AgencyProductActorInput,
  type AgencyValidationReport,
} from "@/lib/agency-validation-funnel";

const INTERACTION_EVENTS = [
  "page_view",
  "proposal_claim_verifier_viewed",
  "proposal_claim_verifier_started",
  "proposal_claim_verifier_completed",
  "proposal_claim_methodology_clicked",
  "proposal_claim_verifier_cta_clicked",
  "login_verified",
];

function configuredExcludedEmails(): string[] {
  return (process.env.PRODUCT_METRICS_EXCLUDED_EMAILS || "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function parseAgencyValidationDays(value: string | string[] | undefined): 28 | 90 {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "90" ? 90 : 28;
}

export async function getAgencyValidationReport({
  days = 28,
  until = new Date(),
}: {
  days?: 28 | 90;
  until?: Date;
} = {}): Promise<AgencyValidationReport> {
  const since = new Date(until.getTime() - days * 86_400_000);
  const historySince = new Date(since.getTime() - 30 * 86_400_000);

  const [events, subscriptions] = await Promise.all([
    prisma.analyticsEvent.findMany({
      where: {
        createdAt: { gte: since, lt: until },
        event: { in: INTERACTION_EVENTS },
      },
      select: { id: true, event: true, path: true, properties: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.agencySubscription.findMany({
      where: {
        OR: [
          { createdAt: { gte: since, lt: until } },
          { payments: { some: { paidAt: { gte: since, lt: until }, status: "paid" } } },
          {
            user: {
              agencyMatchPacks: {
                some: {
                  OR: [
                    { createdAt: { gte: historySince, lt: until } },
                    { updatedAt: { gte: since, lt: until } },
                    { approvedAt: { gte: since, lt: until } },
                    { firstExportedAt: { gte: since, lt: until } },
                    { clientOutcomeRecordedAt: { gte: since, lt: until } },
                  ],
                },
              },
            },
          },
        ],
      },
      select: {
        userId: true,
        status: true,
        checkoutSessionId: true,
        excludeFromProductMetrics: true,
        createdAt: true,
        payments: {
          where: { status: "paid", paidAt: { gte: since, lt: until } },
          select: { paidAt: true },
          orderBy: { paidAt: "asc" },
        },
        user: {
          select: {
            email: true,
            agencyMatchPacks: {
              where: {
                OR: [
                  { createdAt: { gte: historySince, lt: until } },
                  { updatedAt: { gte: since, lt: until } },
                  { approvedAt: { gte: since, lt: until } },
                  { firstExportedAt: { gte: since, lt: until } },
                  { clientOutcomeRecordedAt: { gte: since, lt: until } },
                ],
              },
              select: {
                id: true,
                createdAt: true,
                updatedAt: true,
                claimVerificationData: true,
                approvedAt: true,
                firstExportedAt: true,
                correctionsCount: true,
                unsupportedClaimsCaught: true,
                clientOutcome: true,
                clientOutcomeRecordedAt: true,
                candidateReviews: {
                  select: {
                    invitedAt: true,
                    respondedAt: true,
                    status: true,
                    overriddenAt: true,
                  },
                },
              },
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    }),
  ]);

  const actors: AgencyProductActorInput[] = subscriptions.map((subscription) => ({
    userId: subscription.userId,
    email: subscription.user.email,
    excludeFromProductMetrics: subscription.excludeFromProductMetrics,
    subscriptionCreatedAt: subscription.createdAt,
    checkoutSessionId: subscription.checkoutSessionId,
    status: subscription.status,
    paidAt: subscription.payments[0]?.paidAt || null,
    matchPacks: subscription.user.agencyMatchPacks,
  }));

  return buildAgencyValidationReport({
    events,
    actors,
    since,
    until,
    configuredExcludedEmails: configuredExcludedEmails(),
  });
}
