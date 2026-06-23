import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ANALYTICS_PRODUCT_PROGRESS_PATHS } from "@/lib/analytics-paths";

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
  segmentedFunnels: SegmentedFunnelRow[];
  moneyFunnels: MoneyFunnelRow[];
  checkoutExperiments: CheckoutExperimentRow[];
  ctaCopyExperiments: CtaCopyExperimentRow[];
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
  productProgress: number;
  checkoutModalViews: number;
  checkoutStarts: number;
  checkoutClicks: number;
};

export type SegmentedFunnelRow = {
  dimension: "locale" | "landing_page" | "source_cluster" | "device";
  segment: string;
  sessions: number;
  ctaSessions: number;
  loginViews: number;
  codeRequests: number;
  verifiedLogins: number;
  editorStarts: number;
  readyCvs: number;
  pdfStarts: number;
  checkoutStarts: number;
  paidSessions: number;
};

export type MoneyFunnelRow = {
  dimension: "landing_page" | "locale" | "device" | "source_cluster" | "start_source" | "template" | "entry_method";
  segment: string;
  sessions: number;
  editorStarts: number;
  readyCvs: number;
  pdfStarts: number;
  checkoutOpened: number;
  checkoutStarts: number;
  paidOrders: number;
  revenueCents: number;
};

export type CheckoutExperimentRow = {
  variant: "modal" | "direct";
  locale: "all" | "nl" | "en";
  assignedCvs: number;
  readyCvs: number;
  paywallCvs: number;
  checkoutCvs: number;
  failedCvs: number;
  paidCvs: number;
  revenueCents: number;
};

export type CtaCopyExperimentRow = {
  variant: "trust" | "speed";
  locale: "all" | "nl" | "en";
  assignedVisitors: number;
  clickedVisitors: number;
  editorVisitors: number;
  createdCvs: number;
  paidVisitors: number;
  revenueCents: number;
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
    segmentedFunnels,
    moneyFunnels,
    checkoutExperiments,
    ctaCopyExperiments,
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
      WITH events AS (
        SELECT
          "createdAt",
          event,
          ${pageSql} AS page,
          NULLIF(properties->>'sessionId', '') AS session_id,
          NULLIF(properties->>'toPath', '') AS to_path
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${since}
      ),
      page_base AS (
        SELECT
          page,
          COUNT(*) FILTER (WHERE event = 'page_view')::int AS "pageViews",
          COUNT(DISTINCT session_id)::int AS sessions,
          COUNT(*) FILTER (
            WHERE event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
              OR event LIKE 'cta_%'
          )::int AS "ctaClicks",
          COUNT(*) FILTER (WHERE event IN ('start_cv', 'editor_started', 'landing_to_editor'))::int AS "editorStarts",
          COUNT(*) FILTER (WHERE event = 'checkout_modal_viewed')::int AS "checkoutModalViews",
          COUNT(*) FILTER (WHERE event IN ('checkout_start', 'checkout_started'))::int AS "checkoutStarts",
          COUNT(*) FILTER (WHERE event = 'checkout_option_clicked')::int AS "checkoutClicks"
        FROM events
        GROUP BY page
      ),
      cta_events AS (
        SELECT page, session_id, "createdAt", to_path
        FROM events
        WHERE session_id IS NOT NULL
          AND (
            event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
            OR event LIKE 'cta_%'
          )
      ),
      downstream_progress AS (
        SELECT
          cta.page,
          COUNT(*)::int AS "productProgress"
        FROM cta_events cta
        WHERE cta.to_path IN (${Prisma.join(ANALYTICS_PRODUCT_PROGRESS_PATHS)})
          OR EXISTS (
            SELECT 1
            FROM events later
            WHERE later.session_id = cta.session_id
              AND later."createdAt" >= cta."createdAt"
              AND (
                later.event IN ('landing_to_editor', 'start_cv', 'editor_started', 'signup_completed')
                OR later.page IN (${Prisma.join(ANALYTICS_PRODUCT_PROGRESS_PATHS)})
              )
          )
        GROUP BY cta.page
      )
      SELECT
        page_base.page,
        page_base."pageViews",
        page_base.sessions,
        page_base."ctaClicks",
        page_base."editorStarts",
        COALESCE(downstream_progress."productProgress", 0)::int AS "productProgress",
        page_base."checkoutModalViews",
        page_base."checkoutStarts",
        page_base."checkoutClicks"
      FROM page_base
      LEFT JOIN downstream_progress ON downstream_progress.page = page_base.page
      WHERE page_base."pageViews" > 0 OR page_base."ctaClicks" > 0
      ORDER BY page_base."pageViews" DESC, page_base."ctaClicks" DESC
      LIMIT 25
    `,
    prisma.$queryRaw<SegmentedFunnelRow[]>`
      WITH event_base AS (
        SELECT
          "createdAt",
          event,
          "cvId" AS cv_id,
          properties->>'sessionId' AS session_id,
          COALESCE(
            NULLIF(attribution->>'locale', ''),
            CASE WHEN ${pageSql} = '/en' OR ${pageSql} LIKE '/en/%' THEN 'en' ELSE 'nl' END
          ) AS locale,
          COALESCE(
            NULLIF(attribution->>'firstTouchPath', ''),
            ${pageSql}
          ) AS landing_page,
          COALESCE(
            NULLIF(cluster, ''),
            NULLIF(attribution->>'firstTouchCluster', ''),
            'unknown'
          ) AS source_cluster,
          COALESCE(NULLIF(properties->>'deviceType', ''), 'unknown') AS device
        FROM "AnalyticsEvent"
        WHERE "createdAt" >= ${since}
          AND NULLIF(properties->>'sessionId', '') IS NOT NULL
      ),
      session_base AS (
        SELECT
          session_id,
          (ARRAY_AGG(locale ORDER BY "createdAt"))[1] AS locale,
          (ARRAY_AGG(landing_page ORDER BY "createdAt"))[1] AS landing_page,
          (ARRAY_AGG(source_cluster ORDER BY "createdAt"))[1] AS source_cluster,
          (ARRAY_AGG(device ORDER BY "createdAt"))[1] AS device,
          BOOL_OR(
            event IN ('landing_cta_click', 'tool_to_cv_cta_click', 'cta_clicked')
            OR event LIKE 'cta_%'
          ) AS cta,
          BOOL_OR(event = 'login_view') AS login_view,
          BOOL_OR(event = 'login_code_requested') AS code_requested,
          BOOL_OR(event = 'login_verified') AS login_verified,
          BOOL_OR(event IN ('start_cv', 'editor_started', 'landing_to_editor')) AS editor_started,
          BOOL_OR(event = 'ready_to_download_viewed') AS ready_cv,
          BOOL_OR(event IN ('pdf_download_started', 'pdf_download_completed')) AS pdf_started,
          BOOL_OR(event IN ('checkout_start', 'checkout_started')) AS checkout_started
        FROM event_base
        GROUP BY session_id
      ),
      order_session_touches AS (
        SELECT
          orders.id AS order_id,
          events.session_id,
          MAX(events."createdAt") AS last_touch
        FROM "Order" orders
        JOIN event_base events
          ON events.cv_id = orders."cvId"
          AND events."createdAt" <= orders."paidAt"
        WHERE orders."paidAt" IS NOT NULL
          AND orders."paidAt" >= ${since}
          AND orders.product = 'cv-download'
        GROUP BY orders.id, events.session_id
      ),
      order_sessions AS (
        SELECT DISTINCT session_id
        FROM (
          SELECT
            order_id,
            session_id,
            ROW_NUMBER() OVER (
              PARTITION BY order_id
              ORDER BY last_touch DESC, session_id ASC
            ) AS row_number
          FROM order_session_touches
        ) ranked
        WHERE row_number = 1
      ),
      segmented AS (
        SELECT
          session_base.*,
          order_sessions.session_id IS NOT NULL AS paid,
          dimensions.dimension,
          dimensions.segment
        FROM session_base
        LEFT JOIN order_sessions USING (session_id)
        CROSS JOIN LATERAL (
          VALUES
            ('locale', session_base.locale),
            ('landing_page', session_base.landing_page),
            ('source_cluster', session_base.source_cluster),
            ('device', session_base.device)
        ) AS dimensions(dimension, segment)
      ),
      rollup AS (
        SELECT
          dimension,
          COALESCE(NULLIF(segment, ''), 'unknown') AS segment,
          COUNT(*)::int AS sessions,
          COUNT(*) FILTER (WHERE cta)::int AS "ctaSessions",
          COUNT(*) FILTER (WHERE login_view)::int AS "loginViews",
          COUNT(*) FILTER (WHERE code_requested)::int AS "codeRequests",
          COUNT(*) FILTER (WHERE login_verified)::int AS "verifiedLogins",
          COUNT(*) FILTER (WHERE editor_started)::int AS "editorStarts",
          COUNT(*) FILTER (WHERE ready_cv)::int AS "readyCvs",
          COUNT(*) FILTER (WHERE pdf_started)::int AS "pdfStarts",
          COUNT(*) FILTER (WHERE checkout_started)::int AS "checkoutStarts",
          COUNT(*) FILTER (WHERE paid)::int AS "paidSessions"
        FROM segmented
        GROUP BY dimension, segment
      ),
      ranked_rollup AS (
        SELECT
          rollup.*,
          ROW_NUMBER() OVER (PARTITION BY dimension ORDER BY sessions DESC, segment ASC) AS row_number
        FROM rollup
      )
      SELECT
        dimension,
        segment,
        sessions,
        "ctaSessions",
        "loginViews",
        "codeRequests",
        "verifiedLogins",
        "editorStarts",
        "readyCvs",
        "pdfStarts",
        "checkoutStarts",
        "paidSessions"
      FROM ranked_rollup
      WHERE dimension <> 'landing_page' OR row_number <= 12
      ORDER BY
        CASE dimension
          WHEN 'locale' THEN 1
          WHEN 'landing_page' THEN 2
          WHEN 'source_cluster' THEN 3
          ELSE 4
        END,
        sessions DESC,
        segment ASC
    `,
    prisma.$queryRaw<MoneyFunnelRow[]>`
      WITH event_base AS (
        SELECT
          e."createdAt",
          e.event,
          e."cvId" AS cv_id,
          e.properties,
          e.attribution,
          NULLIF(e.properties->>'sessionId', '') AS session_id,
          COALESCE(
            NULLIF(e.attribution->>'locale', ''),
            CASE WHEN ${pageSql} = '/en' OR ${pageSql} LIKE '/en/%' THEN 'en' ELSE 'nl' END
          ) AS locale,
          COALESCE(NULLIF(e.attribution->>'firstTouchPath', ''), ${pageSql}) AS landing_page,
          COALESCE(NULLIF(e.cluster, ''), NULLIF(e.attribution->>'firstTouchCluster', ''), 'unknown') AS source_cluster,
          COALESCE(NULLIF(e.properties->>'deviceType', ''), 'unknown') AS device,
          cv."startSource" AS cv_start_source,
          cv."templateId" AS cv_template_id
        FROM "AnalyticsEvent" e
        LEFT JOIN "CVDocument" cv ON cv.id = e."cvId"
        WHERE e."createdAt" >= ${since}
          AND NULLIF(e.properties->>'sessionId', '') IS NOT NULL
      ),
      session_base AS (
        SELECT
          session_id,
          (ARRAY_AGG(locale ORDER BY "createdAt"))[1] AS locale,
          (ARRAY_AGG(landing_page ORDER BY "createdAt"))[1] AS landing_page,
          (ARRAY_AGG(source_cluster ORDER BY "createdAt"))[1] AS source_cluster,
          (ARRAY_AGG(device ORDER BY "createdAt"))[1] AS device,
          COALESCE(
            (ARRAY_AGG(NULLIF(properties->>'startSource', '') ORDER BY "createdAt") FILTER (WHERE NULLIF(properties->>'startSource', '') IS NOT NULL))[1],
            (ARRAY_AGG(NULLIF(cv_start_source, '') ORDER BY "createdAt") FILTER (WHERE NULLIF(cv_start_source, '') IS NOT NULL))[1],
            (ARRAY_AGG(NULLIF(properties->>'entryPoint', '') ORDER BY "createdAt") FILTER (WHERE NULLIF(properties->>'entryPoint', '') IS NOT NULL))[1],
            'unknown'
          ) AS start_source,
          COALESCE(
            (ARRAY_AGG(NULLIF(properties->>'templateId', '') ORDER BY "createdAt") FILTER (WHERE NULLIF(properties->>'templateId', '') IS NOT NULL))[1],
            (ARRAY_AGG(NULLIF(cv_template_id, '') ORDER BY "createdAt") FILTER (WHERE NULLIF(cv_template_id, '') IS NOT NULL))[1],
            'unknown'
          ) AS template,
          BOOL_OR(event = 'cv_uploaded') AS uploaded_cv,
          BOOL_OR(event = 'example_cv_applied_after_login' OR COALESCE(properties->>'entryPoint', '') LIKE '%example%') AS used_example,
          BOOL_OR(event IN ('start_cv', 'editor_started', 'landing_to_editor')) AS editor_started,
          BOOL_OR(event = 'ready_to_download_viewed') AS ready_cv,
          BOOL_OR(event IN ('pdf_download_started', 'pdf_download_completed')) AS pdf_started,
          BOOL_OR(event IN ('checkout_paywall_reached', 'checkout_modal_viewed')) AS checkout_opened,
          BOOL_OR(event IN ('checkout_start', 'checkout_started')) AS checkout_started
        FROM event_base
        GROUP BY session_id
      ),
      session_enriched AS (
        SELECT
          *,
          CASE
            WHEN uploaded_cv OR start_source LIKE '%upload%' OR start_source LIKE '%linkedin%' OR start_source LIKE '%translate%' THEN 'upload'
            WHEN used_example OR start_source LIKE '%example%' THEN 'example'
            WHEN start_source LIKE '%template%' THEN 'template'
            WHEN start_source IN ('editor_direct', 'unknown') THEN 'manual/direct'
            ELSE start_source
          END AS entry_method
        FROM session_base
      ),
      order_session_touches AS (
        SELECT
          orders.id AS order_id,
          events.session_id,
          MAX(events."createdAt") AS last_touch
        FROM "Order" orders
        JOIN event_base events
          ON events.cv_id = orders."cvId"
          AND events."createdAt" <= orders."paidAt"
        WHERE orders."paidAt" IS NOT NULL
          AND orders."paidAt" >= ${since}
          AND orders."cvId" IS NOT NULL
        GROUP BY orders.id, events.session_id
      ),
      order_sessions AS (
        SELECT
          ranked.order_id,
          ranked.session_id,
          orders."amountCents" AS amount_cents
        FROM (
          SELECT
            order_id,
            session_id,
            ROW_NUMBER() OVER (
              PARTITION BY order_id
              ORDER BY last_touch DESC, session_id ASC
            ) AS row_number
          FROM order_session_touches
        ) ranked
        JOIN "Order" orders ON orders.id = ranked.order_id
        WHERE ranked.row_number = 1
      ),
      segmented AS (
        SELECT
          session_enriched.*,
          dimensions.dimension,
          dimensions.segment,
          order_sessions.order_id,
          order_sessions.amount_cents
        FROM session_enriched
        LEFT JOIN order_sessions USING (session_id)
        CROSS JOIN LATERAL (
          VALUES
            ('landing_page', session_enriched.landing_page),
            ('locale', session_enriched.locale),
            ('device', session_enriched.device),
            ('source_cluster', session_enriched.source_cluster),
            ('start_source', session_enriched.start_source),
            ('template', session_enriched.template),
            ('entry_method', session_enriched.entry_method)
        ) AS dimensions(dimension, segment)
      ),
      rollup AS (
        SELECT
          dimension,
          COALESCE(NULLIF(segment, ''), 'unknown') AS segment,
          COUNT(DISTINCT session_id)::int AS sessions,
          COUNT(DISTINCT session_id) FILTER (WHERE editor_started)::int AS "editorStarts",
          COUNT(DISTINCT session_id) FILTER (WHERE ready_cv)::int AS "readyCvs",
          COUNT(DISTINCT session_id) FILTER (WHERE pdf_started)::int AS "pdfStarts",
          COUNT(DISTINCT session_id) FILTER (WHERE checkout_opened)::int AS "checkoutOpened",
          COUNT(DISTINCT session_id) FILTER (WHERE checkout_started)::int AS "checkoutStarts",
          COUNT(DISTINCT order_id)::int AS "paidOrders",
          COALESCE(SUM(amount_cents), 0)::int AS "revenueCents"
        FROM segmented
        GROUP BY dimension, segment
      ),
      ranked_rollup AS (
        SELECT
          rollup.*,
          ROW_NUMBER() OVER (
            PARTITION BY dimension
            ORDER BY "revenueCents" DESC, sessions DESC, segment ASC
          ) AS row_number
        FROM rollup
      )
      SELECT
        dimension,
        segment,
        sessions,
        "editorStarts",
        "readyCvs",
        "pdfStarts",
        "checkoutOpened",
        "checkoutStarts",
        "paidOrders",
        "revenueCents"
      FROM ranked_rollup
      WHERE dimension <> 'landing_page' OR row_number <= 15
      ORDER BY
        CASE dimension
          WHEN 'landing_page' THEN 1
          WHEN 'locale' THEN 2
          WHEN 'device' THEN 3
          WHEN 'source_cluster' THEN 4
          WHEN 'start_source' THEN 5
          WHEN 'entry_method' THEN 6
          ELSE 7
        END,
        "revenueCents" DESC,
        sessions DESC,
        segment ASC
    `,
    prisma.$queryRaw<CheckoutExperimentRow[]>`
      WITH ranked_assignments AS (
        SELECT
          "cvId" AS cv_id,
          properties->>'variant' AS variant,
          CASE WHEN properties->>'uiLanguage' = 'en' THEN 'en' ELSE 'nl' END AS locale,
          "createdAt" AS assigned_at,
          ROW_NUMBER() OVER (PARTITION BY "cvId" ORDER BY "createdAt" ASC) AS row_number
        FROM "AnalyticsEvent"
        WHERE event = 'checkout_experiment_assigned'
          AND "createdAt" >= ${since}
          AND "cvId" IS NOT NULL
          AND properties->>'variant' IN ('modal', 'direct')
      ),
      cohort AS (
        SELECT cv_id, variant, locale, assigned_at
        FROM ranked_assignments
        WHERE row_number = 1
      ),
      event_outcomes AS (
        SELECT
          cohort.cv_id,
          BOOL_OR(events.event = 'ready_to_download_viewed') AS ready,
          BOOL_OR(events.event = 'checkout_paywall_reached') AS paywall,
          BOOL_OR(events.event IN ('checkout_start', 'checkout_started')) AS checkout_started,
          BOOL_OR(events.event = 'checkout_failed') AS checkout_failed
        FROM cohort
        LEFT JOIN "AnalyticsEvent" events
          ON events."cvId" = cohort.cv_id
          AND events."createdAt" >= cohort.assigned_at
          AND events.event IN (
            'ready_to_download_viewed',
            'checkout_paywall_reached',
            'checkout_start',
            'checkout_started',
            'checkout_failed'
          )
        GROUP BY cohort.cv_id
      ),
      order_outcomes AS (
        SELECT
          cohort.cv_id,
          COUNT(orders.id) FILTER (WHERE orders."paidAt" IS NOT NULL)::int AS paid_orders,
          COALESCE(SUM(orders."amountCents") FILTER (WHERE orders."paidAt" IS NOT NULL), 0)::int AS revenue_cents
        FROM cohort
        LEFT JOIN "Order" orders
          ON orders."cvId" = cohort.cv_id
          AND orders."paidAt" >= cohort.assigned_at
          AND orders.product IN ('cv-download', 'cv-profile-photo-bundle')
        GROUP BY cohort.cv_id
      )
      SELECT
        cohort.variant,
        CASE WHEN GROUPING(cohort.locale) = 1 THEN 'all' ELSE cohort.locale END AS locale,
        COUNT(*)::int AS "assignedCvs",
        COUNT(*) FILTER (WHERE event_outcomes.ready)::int AS "readyCvs",
        COUNT(*) FILTER (WHERE event_outcomes.paywall)::int AS "paywallCvs",
        COUNT(*) FILTER (WHERE event_outcomes.checkout_started)::int AS "checkoutCvs",
        COUNT(*) FILTER (WHERE event_outcomes.checkout_failed)::int AS "failedCvs",
        COUNT(*) FILTER (WHERE order_outcomes.paid_orders > 0)::int AS "paidCvs",
        COALESCE(SUM(order_outcomes.revenue_cents), 0)::int AS "revenueCents"
      FROM cohort
      JOIN event_outcomes USING (cv_id)
      JOIN order_outcomes USING (cv_id)
      GROUP BY GROUPING SETS ((cohort.variant), (cohort.variant, cohort.locale))
      ORDER BY
        CASE cohort.variant WHEN 'direct' THEN 1 ELSE 2 END,
        CASE WHEN GROUPING(cohort.locale) = 1 THEN 1 ELSE 2 END,
        locale ASC
    `,
    prisma.$queryRaw<CtaCopyExperimentRow[]>`
      WITH ranked_assignments AS (
        SELECT
          properties->>'visitorId' AS visitor_id,
          properties->>'variant' AS variant,
          CASE WHEN properties->>'locale' = 'en' THEN 'en' ELSE 'nl' END AS locale,
          "createdAt" AS assigned_at,
          ROW_NUMBER() OVER (
            PARTITION BY properties->>'visitorId'
            ORDER BY "createdAt" ASC
          ) AS row_number
        FROM "AnalyticsEvent"
        WHERE event = 'cta_experiment_assigned'
          AND "createdAt" >= ${since}
          AND properties->>'experiment' = 'guide_cta_copy_v1'
          AND properties->>'variant' IN ('trust', 'speed')
          AND NULLIF(properties->>'visitorId', '') IS NOT NULL
      ),
      cohort AS (
        SELECT visitor_id, variant, locale, assigned_at
        FROM ranked_assignments
        WHERE row_number = 1
      ),
      visitor_outcomes AS (
        SELECT
          cohort.visitor_id,
          BOOL_OR(events.event = 'cta_experiment_clicked') AS clicked,
          BOOL_OR(events.event IN ('landing_to_editor', 'start_cv', 'editor_started')) AS editor_started,
          COUNT(DISTINCT events."cvId") FILTER (WHERE events."cvId" IS NOT NULL)::int AS created_cvs
        FROM cohort
        LEFT JOIN "AnalyticsEvent" events
          ON events.properties->>'visitorId' = cohort.visitor_id
          AND events."createdAt" >= cohort.assigned_at
          AND (
            (
              events.event = 'cta_experiment_clicked'
              AND events.properties->>'experiment' = 'guide_cta_copy_v1'
              AND events.properties->>'variant' = cohort.variant
            )
            OR events.event IN ('landing_to_editor', 'start_cv', 'editor_started', 'cv_created')
          )
        GROUP BY cohort.visitor_id
      ),
      visitor_cvs AS (
        SELECT DISTINCT cohort.visitor_id, events."cvId" AS cv_id
        FROM cohort
        JOIN "AnalyticsEvent" events
          ON events.properties->>'visitorId' = cohort.visitor_id
          AND events."createdAt" >= cohort.assigned_at
          AND events."cvId" IS NOT NULL
      ),
      order_outcomes AS (
        SELECT
          visitor_cvs.visitor_id,
          COUNT(orders.id) FILTER (WHERE orders."paidAt" IS NOT NULL)::int AS paid_orders,
          COALESCE(SUM(orders."amountCents") FILTER (WHERE orders."paidAt" IS NOT NULL), 0)::int AS revenue_cents
        FROM visitor_cvs
        JOIN cohort ON cohort.visitor_id = visitor_cvs.visitor_id
        LEFT JOIN "Order" orders
          ON orders."cvId" = visitor_cvs.cv_id
          AND orders."paidAt" >= cohort.assigned_at
        GROUP BY visitor_cvs.visitor_id
      )
      SELECT
        cohort.variant,
        CASE WHEN GROUPING(cohort.locale) = 1 THEN 'all' ELSE cohort.locale END AS locale,
        COUNT(*)::int AS "assignedVisitors",
        COUNT(*) FILTER (WHERE visitor_outcomes.clicked)::int AS "clickedVisitors",
        COUNT(*) FILTER (WHERE visitor_outcomes.editor_started)::int AS "editorVisitors",
        COALESCE(SUM(visitor_outcomes.created_cvs), 0)::int AS "createdCvs",
        COUNT(*) FILTER (WHERE COALESCE(order_outcomes.paid_orders, 0) > 0)::int AS "paidVisitors",
        COALESCE(SUM(order_outcomes.revenue_cents), 0)::int AS "revenueCents"
      FROM cohort
      JOIN visitor_outcomes USING (visitor_id)
      LEFT JOIN order_outcomes USING (visitor_id)
      GROUP BY GROUPING SETS ((cohort.variant), (cohort.variant, cohort.locale))
      ORDER BY
        CASE cohort.variant WHEN 'trust' THEN 1 ELSE 2 END,
        CASE WHEN GROUPING(cohort.locale) = 1 THEN 1 ELSE 2 END,
        locale ASC
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
    segmentedFunnels,
    moneyFunnels,
    checkoutExperiments,
    ctaCopyExperiments,
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
    .filter((row) => row.sessions >= 25 && row.productProgress + row.editorStarts + row.checkoutModalViews + row.checkoutClicks === 0)
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
    .filter((row) => row.ctaClicks >= 2 && row.productProgress + row.editorStarts + row.checkoutModalViews + row.checkoutClicks === 0)
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
