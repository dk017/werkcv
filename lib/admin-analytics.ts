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
    checkoutModalViews: number;
    checkoutStarts: number;
    checkoutClicks: number;
    paidOrders: number;
    revenueCents: number;
    signups: number;
  };
  liveVisitors: LiveVisitorRow[];
  liveGlobePoints: GlobePointRow[];
  visitorJourneys: VisitorJourneyRow[];
  trends: TrendRow[];
  insights: InsightRow[];
  signupCohorts: SignupCohortRow[];
  sourceRevenue: SourceRevenueRow[];
  recentSignups: RecentSignupRow[];
  checkoutDiagnostics: CheckoutDiagnosticRow[];
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
  checkoutModalViews: number;
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

export type VisitorJourneyEventRow = {
  id: string;
  event: string;
  page: string;
  createdAt: Date;
  detail: string;
};

export type VisitorJourneyRow = {
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
  firstSeen: Date;
  lastSeen: Date;
  eventCount: number;
  stage: string;
  journey: VisitorJourneyEventRow[];
};

export type TrendRow = {
  bucket: Date;
  visitors: number;
  sessions: number;
  pageViews: number;
  ctaClicks: number;
  editorStarts: number;
  checkoutModalViews: number;
  checkoutClicks: number;
};

export type InsightRow = {
  id: string;
  severity: "high" | "medium" | "low";
  title: string;
  evidence: string;
  action: string;
  page?: string;
};

export type SignupCohortRow = {
  stage: string;
  users: number;
  description: string;
};

export type SourceRevenueRow = {
  source: string;
  landingPage: string;
  signups: number;
  cvsCreated: number;
  checkoutModalViews: number;
  checkoutClicks: number;
  paidOrders: number;
  revenueCents: number;
};

export type RecentSignupRow = {
  email: string;
  signupAt: Date;
  source: string;
  landingPage: string;
  locale: string;
  cvCount: number;
  checkoutModalViews: number;
  checkoutClicks: number;
  paidOrders: number;
  stoppedAt: string;
};

export type CheckoutDiagnosticRow = {
  page: string;
  provider: string;
  modalViews: number;
  checkoutClicks: number;
  paidOrders: number;
  revenueCents: number;
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
  checkoutModalViews: number;
  checkoutStarts: number;
  checkoutClicks: number;
};

type JourneyEventQueryRow = {
  id: string;
  sessionId: string;
  visitorId: string;
  event: string;
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
  createdAt: Date;
  detail: string;
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
  const liveSince = new Date(generatedAt.getTime() - 15 * 60 * 1000);
  const journeySince = new Date(generatedAt.getTime() - 2 * 60 * 60 * 1000);
  const bucket = range === "24h" ? "hour" : "day";
  const pageSql = eventPageSql();

  const [
    summaryRows,
    liveVisitors,
    liveGlobePoints,
    journeyEvents,
    trends,
    signupCohorts,
    sourceRevenue,
    recentSignups,
    checkoutDiagnostics,
    topPages,
    sources,
    devices,
    ctas,
    funnelPages,
  ] = await Promise.all([
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
        COUNT(*) FILTER (WHERE event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
        COUNT(*) FILTER (WHERE event IN ('checkout_start', 'checkout_started'))::int AS "checkoutStarts",
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
        WHERE "createdAt" >= ${liveSince}
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
      WITH active_sessions AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          MAX("createdAt") AS "lastSeen"
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${liveSince}
          AND NULLIF(properties->>'sessionId', '') IS NOT NULL
        GROUP BY properties->>'sessionId'
      ),
      latest_events AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          COALESCE(NULLIF(properties->>'visitorId', ''), properties->>'sessionId') AS "visitorId",
          ${pageSql} AS page,
          COALESCE(NULLIF(properties->>'sourceType', ''), 'unknown') AS "sourceType",
          COALESCE(NULLIF(properties->>'sourceLabel', ''), 'Unknown') AS "sourceLabel",
          ROW_NUMBER() OVER (PARTITION BY properties->>'sessionId' ORDER BY "createdAt" DESC) AS row_number
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${journeySince}
          AND properties->>'sessionId' IN (SELECT "sessionId" FROM active_sessions)
      ),
      geocoded_events AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          COALESCE(NULLIF(properties->>'city', ''), '') AS city,
          COALESCE(NULLIF(properties->>'country', ''), '') AS country,
          (properties->>'latitude')::float AS latitude,
          (properties->>'longitude')::float AS longitude,
          ROW_NUMBER() OVER (PARTITION BY properties->>'sessionId' ORDER BY "createdAt" DESC) AS row_number
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${journeySince}
          AND properties->>'sessionId' IN (SELECT "sessionId" FROM active_sessions)
          AND properties->>'latitude' IS NOT NULL
          AND properties->>'longitude' IS NOT NULL
      ),
      event_counts AS (
        SELECT
          properties->>'sessionId' AS "sessionId",
          COUNT(*)::int AS "eventCount"
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${journeySince}
          AND properties->>'sessionId' IN (SELECT "sessionId" FROM active_sessions)
        GROUP BY properties->>'sessionId'
      )
      SELECT
        latest_events."visitorId" || '-' || active_sessions."sessionId" AS id,
        active_sessions."sessionId",
        geocoded_events.latitude,
        geocoded_events.longitude,
        geocoded_events.city,
        geocoded_events.country,
        latest_events.page,
        latest_events."sourceType",
        latest_events."sourceLabel",
        active_sessions."lastSeen",
        true AS "isLive",
        event_counts."eventCount"
      FROM active_sessions
      JOIN latest_events ON latest_events."sessionId" = active_sessions."sessionId" AND latest_events.row_number = 1
      JOIN geocoded_events ON geocoded_events."sessionId" = active_sessions."sessionId" AND geocoded_events.row_number = 1
      JOIN event_counts ON event_counts."sessionId" = active_sessions."sessionId"
      ORDER BY active_sessions."lastSeen" DESC
      LIMIT 60
    `,
    prisma.$queryRaw<JourneyEventQueryRow[]>`
      WITH active_sessions AS (
        SELECT properties->>'sessionId' AS "sessionId"
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${liveSince}
          AND NULLIF(properties->>'sessionId', '') IS NOT NULL
        GROUP BY properties->>'sessionId'
      )
      SELECT
        id,
        properties->>'sessionId' AS "sessionId",
        COALESCE(NULLIF(properties->>'visitorId', ''), 'unknown') AS "visitorId",
        event,
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
        "createdAt",
        COALESCE(
          NULLIF(properties->>'label', ''),
          NULLIF(properties->>'cta_text', ''),
          NULLIF(properties->>'ctaText', ''),
          NULLIF(properties->>'toPath', ''),
          NULLIF(properties->>'provider', ''),
          ''
        ) AS detail
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${journeySince}
        AND properties->>'sessionId' IN (SELECT "sessionId" FROM active_sessions)
      ORDER BY properties->>'sessionId', "createdAt" ASC
      LIMIT 600
    `,
    prisma.$queryRaw<TrendRow[]>`
      SELECT
        date_trunc(${bucket}, "createdAt") AS bucket,
        COUNT(DISTINCT NULLIF(properties->>'visitorId', ''))::int AS visitors,
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions,
        COUNT(*) FILTER (WHERE event = 'page_view')::int AS "pageViews",
        COUNT(*) FILTER (
          WHERE event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
            OR event LIKE 'cta_%'
        )::int AS "ctaClicks",
        COUNT(*) FILTER (WHERE event IN ('start_cv', 'editor_started', 'landing_to_editor'))::int AS "editorStarts",
        COUNT(*) FILTER (WHERE event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
        COUNT(*) FILTER (WHERE event = 'checkout_option_clicked')::int AS "checkoutClicks"
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since}
      GROUP BY bucket
      ORDER BY bucket ASC
    `,
    prisma.$queryRaw<SignupCohortRow[]>`
      WITH users_in_range AS (
        SELECT id, email
        FROM "User"
        WHERE "createdAt" >= ${since}
      ),
      user_cv AS (
        SELECT
          u.id AS "userId",
          COUNT(cv.id)::int AS "cvCount",
          COUNT(e.id) FILTER (WHERE e.event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
          COUNT(e.id) FILTER (WHERE e.event = 'checkout_option_clicked')::int AS "checkoutClicks",
          COUNT(o.id) FILTER (WHERE o."paidAt" IS NOT NULL)::int AS "paidOrders"
        FROM users_in_range u
        LEFT JOIN "CVDocument" cv ON cv."userId" = u.id
        LEFT JOIN "AnalyticsEvent" e ON e."cvId" = cv.id
          AND e."createdAt" >= ${since}
          AND e.event IN ('checkout_modal_viewed', 'checkout_option_clicked')
        LEFT JOIN "Order" o ON o."cvId" = cv.id
          AND o."paidAt" IS NOT NULL
          AND o."paidAt" >= ${since}
        GROUP BY u.id
      )
      SELECT 'Signup only' AS stage,
        COUNT(*) FILTER (WHERE "cvCount" = 0)::int AS users,
        'Signed up but did not create a CV' AS description
      FROM user_cv
      UNION ALL
      SELECT 'CV created, no checkout',
        COUNT(*) FILTER (WHERE "cvCount" > 0 AND "checkoutModalViews" = 0 AND "paidOrders" = 0)::int,
        'Created a CV but never opened the checkout modal'
      FROM user_cv
      UNION ALL
      SELECT 'Checkout modal, no option',
        COUNT(*) FILTER (WHERE "checkoutModalViews" > 0 AND "checkoutClicks" = 0 AND "paidOrders" = 0)::int,
        'Saw checkout but did not choose a payment option'
      FROM user_cv
      UNION ALL
      SELECT 'Checkout click, no paid',
        COUNT(*) FILTER (WHERE "checkoutClicks" > 0 AND "paidOrders" = 0)::int,
        'Clicked a checkout option but no paid order was recorded'
      FROM user_cv
      UNION ALL
      SELECT 'Paid',
        COUNT(*) FILTER (WHERE "paidOrders" > 0)::int,
        'Completed at least one payment'
      FROM user_cv
    `,
    prisma.$queryRaw<SourceRevenueRow[]>`
      WITH signup_base AS (
        SELECT
          u.id,
          u.email,
          COALESCE(
            NULLIF(u.attribution->>'utmSource', ''),
            NULLIF(u.attribution->>'firstTouchReferrer', ''),
            NULLIF(u."sourceCluster", ''),
            'direct'
          ) AS source,
          COALESCE(NULLIF(u.attribution->>'firstTouchPath', ''), NULLIF(u."sourcePath", ''), '(unknown)') AS "landingPage"
        FROM "User" u
        WHERE u."createdAt" >= ${since}
      ),
      cv_base AS (
        SELECT
          cv.id,
          cv."userId"
        FROM "CVDocument" cv
        WHERE cv."userId" IN (SELECT id FROM signup_base)
      ),
      event_base AS (
        SELECT
          cv."userId",
          COUNT(*) FILTER (WHERE e.event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
          COUNT(*) FILTER (WHERE e.event = 'checkout_option_clicked')::int AS "checkoutClicks"
        FROM cv_base cv
        JOIN "AnalyticsEvent" e ON e."cvId" = cv.id
        WHERE e."createdAt" >= ${since}
          AND e.event IN ('checkout_modal_viewed', 'checkout_option_clicked')
        GROUP BY cv."userId"
      ),
      order_base AS (
        SELECT
          sb.id AS "userId",
          COUNT(o.id) FILTER (WHERE o."paidAt" IS NOT NULL)::int AS "paidOrders",
          COALESCE(SUM(o."amountCents") FILTER (WHERE o."paidAt" IS NOT NULL), 0)::int AS "revenueCents"
        FROM signup_base sb
        LEFT JOIN "Order" o ON o.email = sb.email
          AND o."paidAt" IS NOT NULL
          AND o."paidAt" >= ${since}
        GROUP BY sb.id
      )
      SELECT
        sb.source,
        sb."landingPage",
        COUNT(DISTINCT sb.id)::int AS signups,
        COUNT(DISTINCT cv.id)::int AS "cvsCreated",
        COALESCE(SUM(eb."checkoutModalViews"), 0)::int AS "checkoutModalViews",
        COALESCE(SUM(eb."checkoutClicks"), 0)::int AS "checkoutClicks",
        COALESCE(SUM(ob."paidOrders"), 0)::int AS "paidOrders",
        COALESCE(SUM(ob."revenueCents"), 0)::int AS "revenueCents"
      FROM signup_base sb
      LEFT JOIN cv_base cv ON cv."userId" = sb.id
      LEFT JOIN event_base eb ON eb."userId" = sb.id
      LEFT JOIN order_base ob ON ob."userId" = sb.id
      GROUP BY sb.source, sb."landingPage"
      ORDER BY "revenueCents" DESC, signups DESC, "cvsCreated" DESC
      LIMIT 20
    `,
    prisma.$queryRaw<RecentSignupRow[]>`
      WITH recent_users AS (
        SELECT
          u.id,
          u.email,
          u."createdAt" AS "signupAt",
          COALESCE(
            NULLIF(u.attribution->>'utmSource', ''),
            NULLIF(u.attribution->>'firstTouchReferrer', ''),
            NULLIF(u."sourceCluster", ''),
            'direct'
          ) AS source,
          COALESCE(NULLIF(u.attribution->>'firstTouchPath', ''), NULLIF(u."sourcePath", ''), '(unknown)') AS "landingPage",
          COALESCE(NULLIF(u."sourceLocale", ''), NULLIF(u.attribution->>'locale', ''), 'unknown') AS locale
        FROM "User" u
        WHERE u."createdAt" >= ${since}
      ),
      cv_base AS (
        SELECT id, "userId"
        FROM "CVDocument"
        WHERE "userId" IN (SELECT id FROM recent_users)
      ),
      event_base AS (
        SELECT
          cv."userId",
          COUNT(*) FILTER (WHERE e.event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
          COUNT(*) FILTER (WHERE e.event = 'checkout_option_clicked')::int AS "checkoutClicks"
        FROM cv_base cv
        JOIN "AnalyticsEvent" e ON e."cvId" = cv.id
        WHERE e."createdAt" >= ${since}
          AND e.event IN ('checkout_modal_viewed', 'checkout_option_clicked')
        GROUP BY cv."userId"
      ),
      order_base AS (
        SELECT
          ru.id AS "userId",
          COUNT(o.id) FILTER (WHERE o."paidAt" IS NOT NULL)::int AS "paidOrders"
        FROM recent_users ru
        LEFT JOIN "Order" o ON o.email = ru.email
          AND o."paidAt" IS NOT NULL
          AND o."paidAt" >= ${since}
        GROUP BY ru.id
      )
      SELECT
        ru.email,
        ru."signupAt",
        ru.source,
        ru."landingPage",
        ru.locale,
        COUNT(cv.id)::int AS "cvCount",
        COALESCE(MAX(eb."checkoutModalViews"), 0)::int AS "checkoutModalViews",
        COALESCE(MAX(eb."checkoutClicks"), 0)::int AS "checkoutClicks",
        COALESCE(MAX(ob."paidOrders"), 0)::int AS "paidOrders",
        CASE
          WHEN COALESCE(MAX(ob."paidOrders"), 0) > 0 THEN 'Paid'
          WHEN COALESCE(MAX(eb."checkoutClicks"), 0) > 0 THEN 'Clicked checkout, no paid order'
          WHEN COALESCE(MAX(eb."checkoutModalViews"), 0) > 0 THEN 'Saw checkout, no payment option'
          WHEN COUNT(cv.id) > 0 THEN 'Created CV, no checkout'
          ELSE 'Signup only'
        END AS "stoppedAt"
      FROM recent_users ru
      LEFT JOIN cv_base cv ON cv."userId" = ru.id
      LEFT JOIN event_base eb ON eb."userId" = ru.id
      LEFT JOIN order_base ob ON ob."userId" = ru.id
      GROUP BY ru.id, ru.email, ru."signupAt", ru.source, ru."landingPage", ru.locale
      ORDER BY ru."signupAt" DESC
      LIMIT 30
    `,
    prisma.$queryRaw<CheckoutDiagnosticRow[]>`
      WITH checkout_events AS (
        SELECT
          COALESCE(NULLIF(properties->>'path', ''), NULLIF(properties->>'page_path', ''), NULLIF(path, ''), '(unknown)') AS page,
          COALESCE(NULLIF(properties->>'provider', ''), NULLIF(properties->>'label', ''), NULLIF(properties->>'ctaText', ''), 'unknown') AS provider,
          event
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${since}
          AND event IN ('checkout_modal_viewed', 'checkout_option_clicked')
      ),
      paid AS (
        SELECT
          COALESCE(NULLIF(attribution->>'lastTouchPath', ''), NULLIF(attribution->>'firstTouchPath', ''), '(unknown)') AS page,
          COALESCE(NULLIF(product, ''), 'cv-download') AS provider,
          COUNT(*)::int AS "paidOrders",
          COALESCE(SUM("amountCents"), 0)::int AS "revenueCents"
        FROM "Order"
        WHERE "paidAt" IS NOT NULL
          AND "paidAt" >= ${since}
        GROUP BY page, provider
      )
      SELECT
        COALESCE(e.page, p.page) AS page,
        COALESCE(e.provider, p.provider) AS provider,
        COUNT(*) FILTER (WHERE e.event = 'checkout_modal_viewed')::int AS "modalViews",
        COUNT(*) FILTER (WHERE e.event = 'checkout_option_clicked')::int AS "checkoutClicks",
        COALESCE(MAX(p."paidOrders"), 0)::int AS "paidOrders",
        COALESCE(MAX(p."revenueCents"), 0)::int AS "revenueCents"
      FROM checkout_events e
      FULL OUTER JOIN paid p ON p.page = e.page
      GROUP BY COALESCE(e.page, p.page), COALESCE(e.provider, p.provider)
      HAVING COUNT(*) FILTER (WHERE e.event = 'checkout_modal_viewed') > 0
          OR COUNT(*) FILTER (WHERE e.event = 'checkout_option_clicked') > 0
          OR COALESCE(MAX(p."paidOrders"), 0) > 0
      ORDER BY "checkoutClicks" DESC, "modalViews" DESC, "paidOrders" DESC
      LIMIT 20
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
        COUNT(*) FILTER (WHERE event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
        COUNT(*) FILTER (WHERE event IN ('checkout_start', 'checkout_started'))::int AS "checkoutStarts",
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

  const summary = summaryRows[0] || {
    visitors: 0,
    sessions: 0,
    pageViews: 0,
    events: 0,
    ctaClicks: 0,
    editorStarts: 0,
    checkoutModalViews: 0,
    checkoutStarts: 0,
    checkoutClicks: 0,
    paidOrders: 0,
    revenueCents: 0,
    signups: 0,
  };
  const visitorJourneys = buildVisitorJourneys(journeyEvents);
  const insights = buildInsights(summary, funnelPages, signupCohorts, sourceRevenue, recentSignups);

  return {
    range,
    since,
    generatedAt,
    summary,
    liveVisitors,
    liveGlobePoints,
    visitorJourneys,
    trends,
    insights,
    signupCohorts,
    sourceRevenue,
    recentSignups,
    checkoutDiagnostics,
    topPages,
    sources,
    devices,
    ctas,
    funnelPages,
  };
}

function buildVisitorJourneys(rows: JourneyEventQueryRow[]): VisitorJourneyRow[] {
  const grouped = new Map<string, JourneyEventQueryRow[]>();
  for (const row of rows) {
    if (!row.sessionId) continue;
    grouped.set(row.sessionId, [...(grouped.get(row.sessionId) || []), row]);
  }

  return Array.from(grouped.entries())
    .map(([sessionId, events]) => {
      const first = events[0];
      const latest = events[events.length - 1];
      const latestGeo = [...events]
        .reverse()
        .find((event) => event.latitude !== null && event.longitude !== null && (event.city || event.country));
      const sourceEvent =
        events.find((event) => event.sourceType !== "unknown" || event.sourceLabel !== "Unknown") || first;
      const deviceEvent = [...events]
        .reverse()
        .find((event) => event.deviceType !== "unknown" || event.browserName !== "Unknown" || event.osName !== "Unknown");

      return {
        sessionId,
        visitorId: latest.visitorId || first.visitorId || "unknown",
        page: latest.page,
        sourceType: sourceEvent.sourceType,
        sourceLabel: sourceEvent.sourceLabel,
        deviceType: deviceEvent?.deviceType || "unknown",
        browserName: deviceEvent?.browserName || "Unknown",
        osName: deviceEvent?.osName || "Unknown",
        city: latestGeo?.city || latest.city || "",
        country: latestGeo?.country || latest.country || "",
        latitude: latestGeo?.latitude ?? latest.latitude,
        longitude: latestGeo?.longitude ?? latest.longitude,
        firstSeen: first.createdAt,
        lastSeen: latest.createdAt,
        eventCount: events.length,
        stage: journeyStage(events.map((event) => event.event)),
        journey: events.map((event) => ({
          id: event.id,
          event: event.event,
          page: event.page,
          createdAt: event.createdAt,
          detail: event.detail,
        })),
      };
    })
    .sort((a, b) => b.lastSeen.getTime() - a.lastSeen.getTime())
    .slice(0, 30);
}

function journeyStage(events: string[]): string {
  if (events.some((event) => event === "payment_succeeded" || event === "order_paid")) return "Paid";
  if (events.some((event) => event === "checkout_option_clicked")) return "Clicked checkout";
  if (events.some((event) => event === "checkout_modal_viewed")) return "Saw checkout";
  if (events.some((event) => event === "start_cv" || event === "editor_started" || event === "landing_to_editor")) {
    return "Editor";
  }
  if (events.some((event) => event.includes("cta"))) return "Clicked CTA";
  return "Browsing";
}

function buildInsights(
  summary: SummaryRow,
  funnelPages: FunnelPageRow[],
  signupCohorts: SignupCohortRow[],
  sourceRevenue: SourceRevenueRow[],
  recentSignups: RecentSignupRow[]
): InsightRow[] {
  const insights: InsightRow[] = [];
  const pageMinimum = 8;
  const cohortMap = new Map(signupCohorts.map((row) => [row.stage, row.users]));

  if (summary.checkoutModalViews >= 3 && summary.checkoutClicks === 0) {
    insights.push({
      id: "checkout-modal-no-clicks",
      severity: "high",
      title: "Checkout modal is being seen, but people are not choosing a payment option",
      evidence: `${summary.checkoutModalViews} checkout modal views and 0 checkout option clicks in this range`,
      action: "Review the modal copy, payment-method visibility, and trust cues before the payment button",
    });
  } else if (summary.checkoutClicks >= 3 && summary.paidOrders === 0) {
    insights.push({
      id: "checkout-clicks-no-paid-orders",
      severity: "high",
      title: "People are entering checkout but not completing payment",
      evidence: `${summary.checkoutClicks} checkout option clicks and 0 paid orders in this range`,
      action: "Check payment provider logs, iDEAL/card availability, return URLs, and checkout error states",
    });
  }

  const signupOnly = cohortMap.get("Signup only") || 0;
  if (signupOnly >= 2 && signupOnly >= Math.max(2, summary.signups * 0.4)) {
    const examples = recentSignups
      .filter((row) => row.stoppedAt === "Signup only")
      .slice(0, 2)
      .map((row) => row.landingPage)
      .join(", ");
    insights.push({
      id: "signup-no-cv",
      severity: "high",
      title: "New signups are not creating CVs",
      evidence: `${signupOnly} of ${summary.signups} signups stopped before CV creation${examples ? `; examples: ${examples}` : ""}`,
      action: "Review the post-login handoff and make sure signup returns users directly to the intended editor/template flow",
    });
  }

  const bestUnpaidSource = sourceRevenue.find((row) => row.signups >= 2 && row.paidOrders === 0);
  if (bestUnpaidSource) {
    insights.push({
      id: `source-no-revenue-${bestUnpaidSource.source}-${bestUnpaidSource.landingPage}`,
      severity: "medium",
      title: "A source is producing signups but no revenue",
      evidence: `${bestUnpaidSource.source} on ${bestUnpaidSource.landingPage} produced ${bestUnpaidSource.signups} signups, ${bestUnpaidSource.cvsCreated} CVs, and 0 paid orders`,
      action: "Inspect this source/page pair: either the traffic intent is weak or the next step after signup is unclear",
      page: bestUnpaidSource.landingPage,
    });
  }

  const moneyPages = funnelPages
    .filter((row) => isMoneyPage(row.page))
    .filter((row) => row.sessions >= 25 && row.editorStarts + row.checkoutModalViews + row.checkoutClicks === 0)
    .slice(0, 3);

  for (const page of moneyPages) {
    insights.push({
      id: `money-drop-${page.page}`,
      severity: "medium",
      title: "Money page traffic is not moving into the product",
      evidence: `${page.page} had ${page.pageViews} views and ${page.sessions} sessions, but no editor or checkout movement`,
      action: "Tighten the above-the-fold promise, price reassurance, and primary CTA on this page",
      page: page.page,
    });
  }

  const weakToolPages = funnelPages
    .filter((row) => row.page.startsWith("/tools/") && row.pageViews >= pageMinimum)
    .map((row) => ({
      ...row,
      ctaRate: row.pageViews > 0 ? row.ctaClicks / row.pageViews : 0,
    }))
    .filter((row) => row.ctaRate < 0.015)
    .slice(0, 4);

  for (const page of weakToolPages) {
    insights.push({
      id: `tool-cta-${page.page}`,
      severity: page.pageViews >= 30 ? "high" : "medium",
      title: "Tool traffic is not being bridged to the CV funnel",
      evidence: `${page.page} had ${page.pageViews} views and ${page.ctaClicks} CTA clicks`,
      action: "Improve the tool-to-money CTA and route cold traffic through /cv-maken-zonder-abonnement",
      page: page.page,
    });
  }

  const highIntentNoCheckout = funnelPages
    .filter((row) => row.ctaClicks >= 2 && row.checkoutModalViews + row.checkoutClicks === 0)
    .slice(0, 3);

  for (const page of highIntentNoCheckout) {
    insights.push({
      id: `cta-no-checkout-${page.page}`,
      severity: "low",
      title: "CTA clicks are not reaching checkout",
      evidence: `${page.page} had ${page.ctaClicks} CTA clicks, but no checkout modal or checkout click`,
      action: "Check whether this CTA lands in the editor/login flow cleanly and whether the next step is obvious",
      page: page.page,
    });
  }

  if (insights.length === 0) {
    insights.push({
      id: "no-critical-insight",
      severity: "low",
      title: "No obvious funnel leak in this range",
      evidence: `${summary.sessions} sessions, ${summary.ctaClicks} CTA clicks, ${summary.checkoutClicks} checkout clicks`,
      action: "Use the visitor journey panel to inspect individual sessions and wait for a larger sample before changing pricing or checkout",
    });
  }

  return insights.slice(0, 8);
}

function isMoneyPage(page: string): boolean {
  return (
    page === "/" ||
    page === "/prijzen" ||
    page === "/cv-maken-zonder-abonnement" ||
    page === "/ats-cv-template" ||
    page === "/en/dutch-cv-template" ||
    page.endsWith("-opzeggen")
  );
}
