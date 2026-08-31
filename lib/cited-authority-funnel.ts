import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { citedAuthorityRouteConfigs } from "@/lib/cited-authority-conversion";
import { analyticsExcludedEmails } from "@/lib/conversion-funnel";

export type CitedAuthorityFunnelRow = {
  sourceId: string;
  canonicalPath: string;
  intentId: string;
  bridgeViews: number;
  bridgeClicks: number;
  cvDocuments: number;
  cvUsers: number;
  meaningfulUsers: number;
  previewUsers: number;
  checkoutUsers: number;
  paidUsers: number;
  paidOrders: number;
  revenueCents: number;
  medianHoursToPaid: number | null;
};

export type CitedAuthorityDiagnosticRow = {
  sourceId: string;
  dimension: "locale" | "device";
  segment: string;
  cvUsers: number;
  paidUsers: number;
};

export type CitedAuthorityFunnelResult = {
  rows: CitedAuthorityFunnelRow[];
  diagnostics: CitedAuthorityDiagnosticRow[];
};

export function formatCitedAuthorityRate(numerator: number, denominator: number): string {
  if (denominator <= 0) return "—";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

export type CitedAuthorityFunnelFixture = {
  bridgeEvents: Array<{
    sourceId: string;
    visitorId: string;
    kind: "view" | "click";
    excluded?: boolean;
    sourceLabel?: string;
  }>;
  documents: Array<{
    sourceId: string;
    cvId: string;
    userId: string;
    meaningful?: boolean;
    previewed?: boolean;
    checkoutStarted?: boolean;
    excluded?: boolean;
    agency?: boolean;
  }>;
  orders: Array<{
    orderId: string;
    cvId: string;
    product: string;
    amountCents: number;
    paid: boolean;
    hoursToPaid?: number;
  }>;
};

/**
 * Deterministic mirror of the report's identity/revenue rules for fixture
 * certification. Production reporting remains SQL-backed; this keeps edge
 * cases executable without a database or any candidate content.
 */
export function rollupCitedAuthorityFunnelFixture(
  fixture: CitedAuthorityFunnelFixture,
): CitedAuthorityFunnelRow[] {
  const allowedSources = new Set(citedAuthorityRouteConfigs.map((config) => config.startSource));
  const bridgeEvents = fixture.bridgeEvents.filter(
    (event) =>
      allowedSources.has(event.sourceId as (typeof citedAuthorityRouteConfigs)[number]["startSource"]) &&
      !event.excluded &&
      event.sourceLabel?.trim().toLowerCase() !== "codex_test",
  );
  const documents = fixture.documents.filter(
    (document) =>
      allowedSources.has(document.sourceId as (typeof citedAuthorityRouteConfigs)[number]["startSource"]) &&
      !document.excluded &&
      !document.agency,
  );
  const documentById = new Map(documents.map((document) => [document.cvId, document]));
  const allowedOrderProducts = new Set(["cv-download", "cv-profile-photo-bundle"]);
  const uniqueOrders = new Map(
    fixture.orders
      .filter(
        (order) =>
          order.paid &&
          allowedOrderProducts.has(order.product) &&
          documentById.has(order.cvId),
      )
      .map((order) => [order.orderId, order]),
  );

  const definitions = [
    ...citedAuthorityRouteConfigs.map((config) => ({
      sourceId: config.startSource,
      canonicalPath: config.canonicalPath,
      intentId: config.intentId,
    })),
    { sourceId: "__all__", canonicalPath: "All six routes", intentId: "all" },
  ];

  return definitions.map((definition) => {
    const sourceMatches = (sourceId: string) =>
      definition.sourceId === "__all__" || definition.sourceId === sourceId;
    const matchingBridge = bridgeEvents.filter((event) => sourceMatches(event.sourceId));
    const matchingDocuments = documents.filter((document) => sourceMatches(document.sourceId));
    const matchingDocumentIds = new Set(matchingDocuments.map((document) => document.cvId));
    const matchingOrders = [...uniqueOrders.values()].filter((order) =>
      matchingDocumentIds.has(order.cvId),
    );
    const paidUsers = new Set(
      matchingOrders
        .map((order) => documentById.get(order.cvId)?.userId)
        .filter((userId): userId is string => Boolean(userId)),
    );
    const paidDurations = matchingOrders
      .map((order) => order.hoursToPaid)
      .filter((hours): hours is number => typeof hours === "number" && Number.isFinite(hours) && hours >= 0)
      .sort((left, right) => left - right);
    const midpoint = Math.floor(paidDurations.length / 2);
    const medianHoursToPaid = paidDurations.length === 0
      ? null
      : paidDurations.length % 2 === 1
        ? paidDurations[midpoint]
        : (paidDurations[midpoint - 1] + paidDurations[midpoint]) / 2;

    return {
      sourceId: definition.sourceId,
      canonicalPath: definition.canonicalPath,
      intentId: definition.intentId,
      bridgeViews: new Set(
        matchingBridge.filter((event) => event.kind === "view").map((event) => event.visitorId),
      ).size,
      bridgeClicks: new Set(
        matchingBridge.filter((event) => event.kind === "click").map((event) => event.visitorId),
      ).size,
      cvDocuments: new Set(matchingDocuments.map((document) => document.cvId)).size,
      cvUsers: new Set(matchingDocuments.map((document) => document.userId)).size,
      meaningfulUsers: new Set(
        matchingDocuments.filter((document) => document.meaningful).map((document) => document.userId),
      ).size,
      previewUsers: new Set(
        matchingDocuments.filter((document) => document.previewed).map((document) => document.userId),
      ).size,
      checkoutUsers: new Set(
        matchingDocuments.filter((document) => document.checkoutStarted).map((document) => document.userId),
      ).size,
      paidUsers: paidUsers.size,
      paidOrders: matchingOrders.length,
      revenueCents: matchingOrders.reduce((sum, order) => sum + order.amountCents, 0),
      medianHoursToPaid,
    };
  });
}

const sourceValues = Prisma.join(
  citedAuthorityRouteConfigs.map((config, index) => Prisma.sql`(
    ${config.startSource}::text,
    ${config.canonicalPath}::text,
    ${config.intentId}::text,
    ${`cited_authority:${config.intentId}:main`}::text,
    ${`cited_authority:${config.intentId}:primary`}::text,
    ${index + 1}::int
  )`),
);

function validConsumerEmailSql(excludedEmails: string[]) {
  return Prisma.sql`
    LOWER(u.email) NOT IN (${Prisma.join(excludedEmails)})
    AND POSITION('@' IN LOWER(u.email)) > 1
    AND SPLIT_PART(LOWER(u.email), '@', 2) NOT IN ('werkcv.nl', 'example.com')
    AND SPLIT_PART(LOWER(u.email), '@', 2) NOT LIKE '%.example.com'
    AND SPLIT_PART(LOWER(u.email), '@', 1) NOT LIKE '%+%'
    AND SPLIT_PART(LOWER(u.email), '@', 1) !~ '(^|[._-])(test|e2e|synthetic|fixture)([._-]|$)'
  `;
}

export async function getCitedAuthorityFunnel(since: Date): Promise<CitedAuthorityFunnelResult> {
  const excludedEmails = analyticsExcludedEmails();
  const validUser = validConsumerEmailSql(excludedEmails);

  const rows = await prisma.$queryRaw<CitedAuthorityFunnelRow[]>`
    WITH source_map(source_id, canonical_path, intent_id, view_location, click_location, sort_order) AS (
      VALUES ${sourceValues}
    ),
    excluded_visitors AS (
      SELECT DISTINCT NULLIF(e.properties->>'visitorId', '') AS visitor_id
      FROM "AnalyticsEvent" e
      JOIN "CVDocument" d ON d.id = e."cvId"
      JOIN "User" u ON u.id = d."userId"
      WHERE NULLIF(e.properties->>'visitorId', '') IS NOT NULL
        AND NOT (${validUser})
    ),
    bridge_visitors AS (
      SELECT
        sm.source_id,
        NULLIF(e.properties->>'visitorId', '') AS visitor_id,
        BOOL_OR(e.event = 'cta_viewed' AND e.properties->>'location' = sm.view_location) AS viewed,
        BOOL_OR(e.event = 'cta_clicked' AND e.properties->>'location' = sm.click_location) AS clicked
      FROM source_map sm
      JOIN "AnalyticsEvent" e ON (
        (e.event = 'cta_viewed'
          AND e.properties->>'location' = sm.view_location
          AND e.properties->>'slug' = LTRIM(sm.canonical_path, '/'))
        OR (e.event = 'cta_clicked' AND e.properties->>'location' = sm.click_location
          AND e.properties->>'label' = sm.source_id || ':open_editor')
      )
      WHERE e."createdAt" >= ${since}
        AND NULLIF(e.properties->>'visitorId', '') IS NOT NULL
        AND LOWER(COALESCE(e.properties->>'sourceLabel', '')) <> 'codex_test'
        AND NOT EXISTS (
          SELECT 1 FROM excluded_visitors x
          WHERE x.visitor_id = NULLIF(e.properties->>'visitorId', '')
        )
      GROUP BY sm.source_id, NULLIF(e.properties->>'visitorId', '')
    ),
    documents AS (
      SELECT
        d.id AS cv_id,
        d."userId" AS user_id,
        d."startSource" AS source_id,
        d."createdAt" AS created_at,
        d."hasMeaningfulContent" AS meaningful
      FROM "CVDocument" d
      JOIN source_map sm ON sm.source_id = d."startSource"
      JOIN "User" u ON u.id = d."userId"
      WHERE d."createdAt" >= ${since}
        AND d."agencySubscriptionId" IS NULL
        AND ${validUser}
    ),
    document_users AS (
      SELECT
        d.source_id,
        d.user_id,
        BOOL_OR(d.meaningful) AS meaningful,
        BOOL_OR(EXISTS (
          SELECT 1 FROM "AnalyticsEvent" e
          WHERE e."cvId" = d.cv_id
            AND e."createdAt" >= d.created_at
            AND e.event = 'full_preview_opened'
        )) AS previewed,
        BOOL_OR(EXISTS (
          SELECT 1 FROM "AnalyticsEvent" e
          WHERE e."cvId" = d.cv_id
            AND e."createdAt" >= d.created_at
            AND e.event IN ('checkout_start', 'checkout_started', 'checkout_option_clicked')
        )) AS checkout_started
      FROM documents d
      GROUP BY d.source_id, d.user_id
    ),
    paid_orders AS (
      SELECT
        d.source_id,
        d.user_id,
        o.id AS order_id,
        COALESCE(o."amountCents", 0) AS amount_cents,
        EXTRACT(EPOCH FROM (o."paidAt" - d.created_at)) / 3600.0 AS hours_to_paid
      FROM documents d
      JOIN "Order" o ON o."cvId" = d.cv_id
      WHERE o.product IN ('cv-download', 'cv-profile-photo-bundle')
        AND o."paidAt" IS NOT NULL
        AND o."paidAt" >= d.created_at
    ),
    report_sources(source_id, canonical_path, intent_id, is_aggregate, sort_order) AS (
      SELECT source_id, canonical_path, intent_id, false, sort_order
      FROM source_map
      UNION ALL
      SELECT '__all__', 'All six routes', 'all', true, 99
    )
    SELECT
      rs.source_id AS "sourceId",
      rs.canonical_path AS "canonicalPath",
      rs.intent_id AS "intentId",
      (SELECT COUNT(DISTINCT b.visitor_id)::int FROM bridge_visitors b WHERE (rs.is_aggregate OR b.source_id = rs.source_id) AND b.viewed) AS "bridgeViews",
      (SELECT COUNT(DISTINCT b.visitor_id)::int FROM bridge_visitors b WHERE (rs.is_aggregate OR b.source_id = rs.source_id) AND b.clicked) AS "bridgeClicks",
      (SELECT COUNT(DISTINCT d.cv_id)::int FROM documents d WHERE rs.is_aggregate OR d.source_id = rs.source_id) AS "cvDocuments",
      (SELECT COUNT(DISTINCT d.user_id)::int FROM documents d WHERE rs.is_aggregate OR d.source_id = rs.source_id) AS "cvUsers",
      (SELECT COUNT(DISTINCT du.user_id)::int FROM document_users du WHERE (rs.is_aggregate OR du.source_id = rs.source_id) AND du.meaningful) AS "meaningfulUsers",
      (SELECT COUNT(DISTINCT du.user_id)::int FROM document_users du WHERE (rs.is_aggregate OR du.source_id = rs.source_id) AND du.previewed) AS "previewUsers",
      (SELECT COUNT(DISTINCT du.user_id)::int FROM document_users du WHERE (rs.is_aggregate OR du.source_id = rs.source_id) AND du.checkout_started) AS "checkoutUsers",
      (SELECT COUNT(DISTINCT po.user_id)::int FROM paid_orders po WHERE rs.is_aggregate OR po.source_id = rs.source_id) AS "paidUsers",
      (SELECT COUNT(DISTINCT po.order_id)::int FROM paid_orders po WHERE rs.is_aggregate OR po.source_id = rs.source_id) AS "paidOrders",
      (SELECT COALESCE(SUM(po.amount_cents), 0)::int FROM paid_orders po WHERE rs.is_aggregate OR po.source_id = rs.source_id) AS "revenueCents",
      (SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY po.hours_to_paid)::double precision FROM paid_orders po WHERE rs.is_aggregate OR po.source_id = rs.source_id) AS "medianHoursToPaid"
    FROM report_sources rs
    ORDER BY rs.sort_order
  `;

  const diagnostics = await prisma.$queryRaw<CitedAuthorityDiagnosticRow[]>`
    WITH source_map(source_id, editor_locale) AS (VALUES ${Prisma.join(
      citedAuthorityRouteConfigs.map(
        (config) => Prisma.sql`(${config.startSource}::text, ${config.editorUiLanguage}::text)`,
      ),
    )}),
    documents AS (
      SELECT
        d.id AS cv_id,
        d."userId" AS user_id,
        d."startSource" AS source_id,
        COALESCE(NULLIF(sm.editor_locale, ''), NULLIF(d."sourceLocale", ''), 'unknown') AS locale,
        COALESCE((
          SELECT NULLIF(e.properties->>'deviceType', '')
          FROM "AnalyticsEvent" e
          WHERE e."cvId" = d.id AND NULLIF(e.properties->>'deviceType', '') IS NOT NULL
          ORDER BY e."createdAt" ASC
          LIMIT 1
        ), 'unknown') AS device,
        EXISTS (
          SELECT 1 FROM "Order" o
          WHERE o."cvId" = d.id
            AND o.product IN ('cv-download', 'cv-profile-photo-bundle')
            AND o."paidAt" IS NOT NULL
        ) AS paid
      FROM "CVDocument" d
      JOIN source_map sm ON sm.source_id = d."startSource"
      JOIN "User" u ON u.id = d."userId"
      WHERE d."createdAt" >= ${since}
        AND d."agencySubscriptionId" IS NULL
        AND ${validUser}
    ),
    dimensions AS (
      SELECT source_id, user_id, 'locale'::text AS dimension, locale AS segment, BOOL_OR(paid) AS paid FROM documents GROUP BY source_id, user_id, locale
      UNION ALL
      SELECT source_id, user_id, 'device'::text AS dimension, device AS segment, BOOL_OR(paid) AS paid FROM documents GROUP BY source_id, user_id, device
    )
    SELECT
      source_id AS "sourceId",
      dimension,
      segment,
      COUNT(DISTINCT user_id)::int AS "cvUsers",
      COUNT(DISTINCT user_id) FILTER (WHERE paid)::int AS "paidUsers"
    FROM dimensions
    GROUP BY source_id, dimension, segment
    ORDER BY source_id, dimension, "cvUsers" DESC, segment
  `;

  return { rows, diagnostics };
}
