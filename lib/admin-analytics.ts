import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type AnalyticsRange = "24h" | "7d" | "30d";

export type AnalyticsDashboardData = {
  range: AnalyticsRange;
  since: Date;
  generatedAt: Date;
  summary: {
    visitors: number;
    sessions: number;
    pageViews: number;
    events: number;
    ctaClicks: number;
    editorStarts: number;
    checkoutStarts: number;
    checkoutClicks: number;
    paidOrders: number;
    revenueCents: number;
    signups: number;
  };
  liveVisitors: LiveVisitorRow[];
  globePoints: GlobePointRow[];
  topPages: PageRow[];
  sources: SourceRow[];
  devices: DeviceRow[];
  ctas: CtaRow[];
  funnelPages: FunnelPageRow[];
};

type SummaryRow = {
  visitors: number;
  sessions: number;
  pageViews: number;
  events: number;
  ctaClicks: number;
  editorStarts: number;
  checkoutStarts: number;
  checkoutClicks: number;
  paidOrders: number;
  revenueCents: number;
  signups: number;
};

export type LiveVisitorRow = {
  sessionId: string;
  visitorId: string;
  page: string;
  sourceType: string;
  sourceLabel: string;
  deviceType: string;
  browserName: string;
  osName: string;
  city: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  lastSeen: Date;
  eventCount: number;
};

export type GlobePointRow = {
  id: string;
  sessionId: string;
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  page: string;
  sourceType: string;
  sourceLabel: string;
  lastSeen: Date;
  isLive: boolean;
  eventCount: number;
};

export type PageRow = {
  page: string;
  pageViews: number;
  sessions: number;
};

export type SourceRow = {
  sourceType: string;
  sourceLabel: string;
  visitors: number;
  sessions: number;
  pageViews: number;
};

export type DeviceRow = {
  deviceType: string;
  browserName: string;
  sessions: number;
};

export type CtaRow = {
  page: string;
  label: string;
  destination: string;
  clicks: number;
};

export type FunnelPageRow = {
  page: string;
  pageViews: number;
  sessions: number;
  ctaClicks: number;
  editorStarts: number;
  checkoutStarts: number;
  checkoutClicks: number;
};

const rangeHours: Record<AnalyticsRange, number> = {
  "24h": 24,
  "7d": 24 * 7,
  "30d": 24 * 30,
};

export function parseAnalyticsRange(value: string | string[] | undefined): AnalyticsRange {
  const range = Array.isArray(value) ? value[0] : value;
  return range === "7d" || range === "30d" ? range : "24h";
}

function eventPageSql() {
  return Prisma.sql`COALESCE(
    NULLIF(properties->>'path', ''),
    NULLIF(properties->>'page_path', ''),
    NULLIF(properties->>'fromPath', ''),
    NULLIF(path, ''),
    '(unknown)'
  )`;
}

export async function getAnalyticsDashboardData(range: AnalyticsRange): Promise<AnalyticsDashboardData> {
  const generatedAt = new Date();
  const since = new Date(generatedAt.getTime() - rangeHours[range] * 60 * 60 * 1000);
  const pageSql = eventPageSql();

  const [summaryRows, liveVisitors, globePoints, topPages, sources, devices, ctas, funnelPages] = await Promise.all([
    prisma.$queryRaw<SummaryRow[]>`
      WITH events AS (
        SELECT *
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${since}
      ),
      order_summary AS (
        SELECT
          COUNT(*)::int AS "paidOrders",
          COALESCE(SUM("amountCents"), 0)::int AS "revenueCents"
        FROM "Order"
        WHERE "paidAt" IS NOT NULL
          AND "paidAt" >= ${since}
      ),
      signup_summary AS (
        SELECT COUNT(*)::int AS "signups"
        FROM "User"
        WHERE "createdAt" >= ${since}
      )
      SELECT
        COUNT(DISTINCT NULLIF(properties->>'visitorId', ''))::int AS visitors,
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions,
        COUNT(*) FILTER (WHERE event = 'page_view')::int AS "pageViews",
        COUNT(*)::int AS events,
        COUNT(*) FILTER (
          WHERE event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
            OR event LIKE 'cta_%'
        )::int AS "ctaClicks",
        COUNT(*) FILTER (WHERE event IN ('start_cv', 'editor_started', 'landing_to_editor'))::int AS "editorStarts",
        COUNT(*) FILTER (WHERE event IN ('checkout_start', 'checkout_started', 'checkout_modal_viewed'))::int AS "checkoutStarts",
        COUNT(*) FILTER (WHERE event = 'checkout_option_clicked')::int AS "checkoutClicks",
        (SELECT "paidOrders" FROM order_summary) AS "paidOrders",
        (SELECT "revenueCents" FROM order_summary) AS "revenueCents",
        (SELECT "signups" FROM signup_summary) AS "signups"
      FROM events
    `,
    prisma.$queryRaw<LiveVisitorRow[]>`
      WITH recent AS (
        SELECT *
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${new Date(generatedAt.getTime() - 5 * 60 * 1000)}
          AND NULLIF(properties->>'sessionId', '') IS NOT NULL
      ),
      ranked AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          COALESCE(NULLIF(properties->>'visitorId', ''), 'unknown') AS "visitorId",
          ${pageSql} AS page,
          COALESCE(NULLIF(properties->>'sourceType', ''), 'unknown') AS "sourceType",
          COALESCE(NULLIF(properties->>'sourceLabel', ''), 'Unknown') AS "sourceLabel",
          COALESCE(NULLIF(properties->>'deviceType', ''), 'unknown') AS "deviceType",
          COALESCE(NULLIF(properties->>'browserName', ''), 'Unknown') AS "browserName",
          COALESCE(NULLIF(properties->>'osName', ''), 'Unknown') AS "osName",
          COALESCE(NULLIF(properties->>'city', ''), '') AS city,
          COALESCE(NULLIF(properties->>'country', ''), '') AS country,
          CASE WHEN properties->>'latitude' IS NULL THEN NULL ELSE (properties->>'latitude')::float END AS latitude,
          CASE WHEN properties->>'longitude' IS NULL THEN NULL ELSE (properties->>'longitude')::float END AS longitude,
          "createdAt" AS "lastSeen",
          COUNT(*) OVER (PARTITION BY properties->>'sessionId')::int AS "eventCount",
          ROW_NUMBER() OVER (PARTITION BY properties->>'sessionId' ORDER BY "createdAt" DESC) AS row_number
        FROM recent
      )
      SELECT
        "sessionId",
        "visitorId",
        page,
        "sourceType",
        "sourceLabel",
        "deviceType",
        "browserName",
        "osName",
        city,
        country,
        latitude,
        longitude,
        "lastSeen",
        "eventCount"
      FROM ranked
      WHERE row_number = 1
      ORDER BY "lastSeen" DESC
      LIMIT 30
    `,
    prisma.$queryRaw<GlobePointRow[]>`
      WITH latest_sessions AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          COALESCE(NULLIF(properties->>'visitorId', ''), properties->>'sessionId') AS "visitorId",
          ${pageSql} AS page,
          COALESCE(NULLIF(properties->>'sourceType', ''), 'unknown') AS "sourceType",
          COALESCE(NULLIF(properties->>'sourceLabel', ''), 'Unknown') AS "sourceLabel",
          COALESCE(NULLIF(properties->>'city', ''), '') AS city,
          COALESCE(NULLIF(properties->>'country', ''), '') AS country,
          (properties->>'latitude')::float AS latitude,
          (properties->>'longitude')::float AS longitude,
          "createdAt" AS "lastSeen",
          COUNT(*) OVER (PARTITION BY properties->>'sessionId')::int AS "eventCount",
          ROW_NUMBER() OVER (PARTITION BY properties->>'sessionId' ORDER BY "createdAt" DESC) AS row_number
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${since}
          AND NULLIF(properties->>'sessionId', '') IS NOT NULL
          AND properties->>'latitude' IS NOT NULL
          AND properties->>'longitude' IS NOT NULL
      )
      SELECT
        "visitorId" || '-' || "sessionId" AS id,
        "sessionId",
        latitude,
        longitude,
        city,
        country,
        page,
        "sourceType",
        "sourceLabel",
        "lastSeen",
        "lastSeen" >= ${new Date(generatedAt.getTime() - 5 * 60 * 1000)} AS "isLive",
        "eventCount"
      FROM latest_sessions
      WHERE row_number = 1
      ORDER BY "isLive" DESC, "lastSeen" DESC
      LIMIT 90
    `,
    prisma.$queryRaw<PageRow[]>`
      SELECT
        ${pageSql} AS page,
        COUNT(*)::int AS "pageViews",
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
        AND event = 'page_view'
      GROUP BY page
      ORDER BY "pageViews" DESC
      LIMIT 20
    `,
    prisma.$queryRaw<SourceRow[]>`
      SELECT
        COALESCE(NULLIF(properties->>'sourceType', ''), 'unknown') AS "sourceType",
        COALESCE(NULLIF(properties->>'sourceLabel', ''), 'Unknown') AS "sourceLabel",
        COUNT(DISTINCT NULLIF(properties->>'visitorId', ''))::int AS visitors,
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions,
        COUNT(*) FILTER (WHERE event = 'page_view')::int AS "pageViews"
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
      GROUP BY "sourceType", "sourceLabel"
      ORDER BY visitors DESC, sessions DESC
      LIMIT 20
    `,
    prisma.$queryRaw<DeviceRow[]>`
      SELECT
        COALESCE(NULLIF(properties->>'deviceType', ''), 'unknown') AS "deviceType",
        COALESCE(NULLIF(properties->>'browserName', ''), 'Unknown') AS "browserName",
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
      GROUP BY "deviceType", "browserName"
      ORDER BY sessions DESC
      LIMIT 12
    `,
    prisma.$queryRaw<CtaRow[]>`
      SELECT
        ${pageSql} AS page,
        COALESCE(
          NULLIF(properties->>'label', ''),
          NULLIF(properties->>'cta_text', ''),
          NULLIF(properties->>'ctaText', ''),
          event
        ) AS label,
        COALESCE(
          NULLIF(properties->>'toPath', ''),
          NULLIF(properties->>'cta_destination', ''),
          '(not tracked)'
        ) AS destination,
        COUNT(*)::int AS clicks
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
        AND (
          event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
          OR event LIKE 'cta_%'
        )
      GROUP BY page, label, destination
      ORDER BY clicks DESC
      LIMIT 20
    `,
    prisma.$queryRaw<FunnelPageRow[]>`
      SELECT
        ${pageSql} AS page,
        COUNT(*) FILTER (WHERE event = 'page_view')::int AS "pageViews",
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions,
        COUNT(*) FILTER (
          WHERE event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
            OR event LIKE 'cta_%'
        )::int AS "ctaClicks",
        COUNT(*) FILTER (WHERE event IN ('start_cv', 'editor_started', 'landing_to_editor'))::int AS "editorStarts",
        COUNT(*) FILTER (WHERE event IN ('checkout_start', 'checkout_started', 'checkout_modal_viewed'))::int AS "checkoutStarts",
        COUNT(*) FILTER (WHERE event = 'checkout_option_clicked')::int AS "checkoutClicks"
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
      GROUP BY page
      HAVING COUNT(*) FILTER (WHERE event = 'page_view') > 0
          OR COUNT(*) FILTER (
            WHERE event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
              OR event LIKE 'cta_%'
          ) > 0
      ORDER BY "pageViews" DESC, "ctaClicks" DESC
      LIMIT 25
    `,
  ]);

  return {
    range,
    since,
    generatedAt,
    summary: summaryRows[0] || {
      visitors: 0,
      sessions: 0,
      pageViews: 0,
      events: 0,
      ctaClicks: 0,
      editorStarts: 0,
      checkoutStarts: 0,
      checkoutClicks: 0,
      paidOrders: 0,
      revenueCents: 0,
      signups: 0,
    },
    liveVisitors,
    globePoints,
    topPages,
    sources,
    devices,
    ctas,
    funnelPages,
  };
}
