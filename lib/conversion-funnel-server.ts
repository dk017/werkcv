import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getMeaningfulCvState } from "@/lib/cv-meaningful";
import {
  analyticsExcludedEmails,
  certifyConsumerFunnel,
  type CertifiedConsumerFunnel,
  type FunnelCertification,
} from "@/lib/conversion-funnel";

type FunnelRow = CertifiedConsumerFunnel & {
  paidOrdersMissingPaidEvent: number;
  paidOrdersMissingCheckoutCompletedEvent: number;
};

export type CertifiedConsumerFunnelResult = {
  since: Date;
  generatedAt: Date;
  funnel: CertifiedConsumerFunnel;
  meaningfulStateMismatches: number;
  certification: FunnelCertification;
};

const zeroFunnel: FunnelRow = {
  signups: 0,
  cvUsers: 0,
  meaningfulCvUsers: 0,
  readyUsers: 0,
  previewUsers: 0,
  downloadUsers: 0,
  checkoutUsers: 0,
  paidUsers: 0,
  paidOrders: 0,
  revenueCents: 0,
  paidOrdersMissingPaidEvent: 0,
  paidOrdersMissingCheckoutCompletedEvent: 0,
};

/**
 * User-cohort conversion funnel backed by durable database facts.
 *
 * Users enter the cohort when they sign up. All behavioural stages are unique
 * users with a personal CV and a matching CV-scoped event after signup. Paid
 * orders and revenue always come from the Order table, never browser analytics.
 */
export async function getCertifiedConsumerFunnel(
  since: Date,
): Promise<CertifiedConsumerFunnelResult> {
  const excludedEmails = analyticsExcludedEmails();
  const rows = await prisma.$queryRaw<FunnelRow[]>`
    WITH cohort AS (
      SELECT id, LOWER(email) AS email, "createdAt" AS signup_at
      FROM "User"
      WHERE "createdAt" >= ${since}
        AND LOWER(email) NOT IN (${Prisma.join(excludedEmails)})
    ),
    personal_documents AS (
      SELECT d.id, d."userId" AS user_id, d."hasMeaningfulContent" AS meaningful
      FROM "CVDocument" d
      JOIN cohort c ON c.id = d."userId"
      WHERE d."agencySubscriptionId" IS NULL
    ),
    user_stages AS (
      SELECT
        c.id,
        EXISTS (SELECT 1 FROM personal_documents d WHERE d.user_id = c.id) AS has_cv,
        EXISTS (SELECT 1 FROM personal_documents d WHERE d.user_id = c.id AND d.meaningful) AS meaningful,
        EXISTS (
          SELECT 1 FROM personal_documents d
          JOIN "AnalyticsEvent" e ON e."cvId" = d.id
          WHERE d.user_id = c.id AND e."createdAt" >= c.signup_at
            AND e.event = 'ready_to_download_viewed'
        ) AS ready,
        EXISTS (
          SELECT 1 FROM personal_documents d
          JOIN "AnalyticsEvent" e ON e."cvId" = d.id
          WHERE d.user_id = c.id AND e."createdAt" >= c.signup_at
            AND e.event = 'full_preview_opened'
        ) AS previewed,
        EXISTS (
          SELECT 1 FROM personal_documents d
          JOIN "AnalyticsEvent" e ON e."cvId" = d.id
          WHERE d.user_id = c.id AND e."createdAt" >= c.signup_at
            AND e.event IN ('pdf_download_started', 'pdf_download_completed', 'full_preview_download_clicked')
        ) AS downloaded,
        EXISTS (
          SELECT 1 FROM personal_documents d
          JOIN "AnalyticsEvent" e ON e."cvId" = d.id
          WHERE d.user_id = c.id AND e."createdAt" >= c.signup_at
            AND e.event IN ('checkout_start', 'checkout_started', 'checkout_option_clicked')
        ) AS checkout_started,
        EXISTS (
          SELECT 1 FROM "Order" o
          WHERE LOWER(o.email) = c.email
            AND o.product = 'cv-download'
            AND o."paidAt" IS NOT NULL
            AND o."paidAt" >= c.signup_at
        ) AS paid
      FROM cohort c
    ),
    paid_orders AS (
      SELECT o.*
      FROM "Order" o
      WHERE o.product = 'cv-download'
        AND o."paidAt" IS NOT NULL
        AND o."paidAt" >= ${since}
        AND LOWER(o.email) NOT IN (${Prisma.join(excludedEmails)})
    )
    SELECT
      COUNT(*)::int AS signups,
      COUNT(*) FILTER (WHERE has_cv)::int AS "cvUsers",
      COUNT(*) FILTER (WHERE meaningful)::int AS "meaningfulCvUsers",
      COUNT(*) FILTER (WHERE ready)::int AS "readyUsers",
      COUNT(*) FILTER (WHERE previewed)::int AS "previewUsers",
      COUNT(*) FILTER (WHERE downloaded)::int AS "downloadUsers",
      COUNT(*) FILTER (WHERE checkout_started)::int AS "checkoutUsers",
      COUNT(*) FILTER (WHERE paid)::int AS "paidUsers",
      (SELECT COUNT(*)::int FROM paid_orders) AS "paidOrders",
      (SELECT COALESCE(SUM("amountCents"), 0)::int FROM paid_orders) AS "revenueCents",
      (
        SELECT COUNT(*)::int FROM paid_orders o
        WHERE NOT EXISTS (
          SELECT 1 FROM "AnalyticsEvent" e
          WHERE e.event = 'checkout_completed'
            AND (e."orderId" = o.id OR (e."orderId" IS NULL AND e."cvId" = o."cvId"))
        )
      ) AS "paidOrdersMissingPaidEvent",
      (
        SELECT COUNT(*)::int FROM paid_orders o
        WHERE NOT EXISTS (
          SELECT 1 FROM "AnalyticsEvent" e
          WHERE e.event = 'checkout_completed'
            AND (e."orderId" = o.id OR (e."orderId" IS NULL AND e."cvId" = o."cvId"))
        )
      ) AS "paidOrdersMissingCheckoutCompletedEvent"
    FROM user_stages
  `;

  const row = rows[0] ?? zeroFunnel;
  const cohortDocuments = await prisma.cVDocument.findMany({
    where: {
      agencySubscriptionId: null,
      user: {
        createdAt: { gte: since },
        email: { notIn: excludedEmails, mode: "insensitive" },
      },
    },
    select: { data: true, hasMeaningfulContent: true },
  });
  const meaningfulStateMismatches = cohortDocuments.filter(
    (document) => getMeaningfulCvState(document.data).isMeaningful !== document.hasMeaningfulContent,
  ).length;
  const funnel: CertifiedConsumerFunnel = {
    signups: row.signups,
    cvUsers: row.cvUsers,
    meaningfulCvUsers: row.meaningfulCvUsers,
    readyUsers: row.readyUsers,
    previewUsers: row.previewUsers,
    downloadUsers: row.downloadUsers,
    checkoutUsers: row.checkoutUsers,
    paidUsers: row.paidUsers,
    paidOrders: row.paidOrders,
    revenueCents: row.revenueCents,
  };
  const certification = certifyConsumerFunnel({
    funnel,
    meaningfulStateMismatches,
    paidOrdersMissingPaidEvent: row.paidOrdersMissingPaidEvent,
    paidOrdersMissingCheckoutCompletedEvent: row.paidOrdersMissingCheckoutCompletedEvent,
  });

  return {
    since,
    generatedAt: new Date(),
    funnel,
    meaningfulStateMismatches,
    certification,
  };
}
