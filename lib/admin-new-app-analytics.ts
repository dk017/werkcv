import { prisma } from "@/lib/prisma";

// Admin dashboard, "New app" tab: adoption and conversion of the redesigned app (document mode,
// job search, new PDF generator). Counts only; no CV or vacancy text is stored in these events.

export type NewAppRange = "24h" | "7d" | "30d";
const RANGE_HOURS: Record<NewAppRange, number> = { "24h": 24, "7d": 24 * 7, "30d": 24 * 30 };

export type ModeRow = { mode: string; sessions: number; downloads: number; paywall: number; checkouts: number; paid: number };
export type CountRow = { label: string; count: number };

export type NewAppAnalytics = {
  modes: ModeRow[];
  document: CountRow[];
  jobs: {
    searches: number;
    searchesWithResults: number;
    searchErrors: number;
    cachedSearches: number;
    savedFromSearch: number;
    savedManual: number;
    statusChanges: CountRow[];
    tailoredCvs: number;
    tailoredDownloads: number;
  };
  pdf: { downloadsByRenderer: CountRow[]; downloadFallbacks: number; previewFallbacks: number };
  starts: CountRow[];
};

type Num = { n: number };

export async function getNewAppAnalytics(range: NewAppRange): Promise<NewAppAnalytics> {
  const since = new Date(Date.now() - RANGE_HOURS[range] * 60 * 60 * 1000);

  const [modeRows, paidRows, documentRows, jobRows, statusRows, tailoredDownloads, pdfRows, previewFallbacks, startRows] = await Promise.all([
    // Sessions and conversion steps by the way of working at the time of the event.
    prisma.$queryRaw<Array<{ mode: string; sessions: number; downloads: number; paywall: number; checkouts: number }>>`
      SELECT properties->>'editorMode' AS mode,
        COUNT(DISTINCT NULLIF(properties->>'sessionId', ''))::int AS sessions,
        COUNT(*) FILTER (WHERE event = 'pdf_download_started')::int AS downloads,
        COUNT(*) FILTER (WHERE event = 'checkout_paywall_reached')::int AS paywall,
        COUNT(*) FILTER (WHERE event = 'checkout_started')::int AS checkouts
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND properties->>'editorMode' IS NOT NULL
      GROUP BY 1`,
    // Paid orders attributed to the mode of the last download/checkout step on that CV.
    prisma.$queryRaw<Array<{ mode: string; paid: number }>>`
      SELECT COALESCE(m.mode, 'unknown') AS mode, COUNT(*)::int AS paid
      FROM "Order" o
      LEFT JOIN LATERAL (
        SELECT e.properties->>'editorMode' AS mode FROM "AnalyticsEvent" e
        WHERE e."cvId" = o."cvId" AND e.event IN ('pdf_download_started', 'checkout_paywall_reached', 'checkout_started')
          AND e."createdAt" <= o."paidAt" AND e.properties->>'editorMode' IS NOT NULL
        ORDER BY e."createdAt" DESC LIMIT 1
      ) m ON true
      WHERE o."paidAt" >= ${since}
      GROUP BY 1`,
    prisma.$queryRaw<Array<{ location: string; label: string; count: number }>>`
      SELECT properties->>'location' AS location, properties->>'label' AS label, COUNT(*)::int AS count
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND event = 'cta_clicked'
        AND properties->>'location' IN ('editor_mode', 'editor_inline_edit', 'editor_document_layout', 'editor_document_reorder', 'editor_document_add')
      GROUP BY 1, 2 ORDER BY 3 DESC`,
    prisma.$queryRaw<Array<{ searches: number; with_results: number; errors: number; cached: number; saved_search: number; saved_manual: number; tailored: number }>>`
      SELECT
        COUNT(*) FILTER (WHERE event = 'job_search_submitted')::int AS searches,
        COUNT(*) FILTER (WHERE event = 'job_search_submitted' AND (properties->>'results')::int > 0)::int AS with_results,
        COUNT(*) FILTER (WHERE event = 'job_search_submitted' AND properties->>'outcome' = 'error')::int AS errors,
        COUNT(*) FILTER (WHERE event = 'job_search_submitted' AND properties->>'cached' = 'true')::int AS cached,
        COUNT(*) FILTER (WHERE event = 'job_saved' AND properties->>'source' = 'search')::int AS saved_search,
        COUNT(*) FILTER (WHERE event = 'job_saved' AND properties->>'source' = 'manual')::int AS saved_manual,
        COUNT(*) FILTER (WHERE event = 'job_tailored_cv_created')::int AS tailored
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND event IN ('job_search_submitted', 'job_saved', 'job_tailored_cv_created')`,
    prisma.$queryRaw<Array<{ label: string; count: number }>>`
      SELECT properties->>'status' AS label, COUNT(*)::int AS count
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND event = 'job_status_changed'
      GROUP BY 1 ORDER BY 2 DESC`,
    // Downloads started on CVs created from a saved vacancy.
    prisma.$queryRaw<Num[]>`
      SELECT COUNT(*)::int AS n FROM "AnalyticsEvent" e
      JOIN "CVDocument" d ON d.id = e."cvId"
      WHERE e."createdAt" >= ${since} AND e.event = 'pdf_download_started' AND d."startSource" = 'app_job_tailor'`,
    prisma.$queryRaw<Array<{ renderer: string; fallback: boolean; count: number }>>`
      SELECT properties->>'renderer' AS renderer, (properties->>'fallback')::boolean AS fallback, COUNT(*)::int AS count
      FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND event = 'pdf_generated'
      GROUP BY 1, 2`,
    prisma.$queryRaw<Num[]>`
      SELECT COUNT(*)::int AS n FROM "AnalyticsEvent"
      WHERE "createdAt" >= ${since} AND event = 'pdf_render_fallback'`,
    // New CVs by how they were started in the app.
    prisma.$queryRaw<Array<{ label: string; count: number }>>`
      SELECT CASE
          WHEN "startSource" LIKE 'dashboard_%' THEN "startSource"
          WHEN "startSource" IN ('app_examples', 'app_job_tailor') THEN "startSource"
          WHEN "startSource" LIKE 'cv_check%' THEN 'cv_check'
          ELSE 'other (public pages, older flows)'
        END AS label, COUNT(*)::int AS count
      FROM "CVDocument"
      WHERE "createdAt" >= ${since}
      GROUP BY 1 ORDER BY 2 DESC`,
  ]);

  const paidByMode = new Map(paidRows.map((row) => [row.mode, row.paid]));
  const modes: ModeRow[] = ["document", "form", "classic"].map((mode) => {
    const row = modeRows.find((entry) => entry.mode === mode);
    return { mode, sessions: row?.sessions ?? 0, downloads: row?.downloads ?? 0, paywall: row?.paywall ?? 0, checkouts: row?.checkouts ?? 0, paid: paidByMode.get(mode) ?? 0 };
  });
  const unknownPaid = paidByMode.get("unknown") ?? 0;
  if (unknownPaid) modes.push({ mode: "unknown (before tracking)", sessions: 0, downloads: 0, paywall: 0, checkouts: 0, paid: unknownPaid });

  const jobs = jobRows[0];
  return {
    modes,
    document: documentRows.map((row) => ({ label: `${row.location} · ${row.label}`, count: row.count })),
    jobs: {
      searches: jobs?.searches ?? 0,
      searchesWithResults: jobs?.with_results ?? 0,
      searchErrors: jobs?.errors ?? 0,
      cachedSearches: jobs?.cached ?? 0,
      savedFromSearch: jobs?.saved_search ?? 0,
      savedManual: jobs?.saved_manual ?? 0,
      statusChanges: statusRows,
      tailoredCvs: jobs?.tailored ?? 0,
      tailoredDownloads: tailoredDownloads[0]?.n ?? 0,
    },
    pdf: {
      downloadsByRenderer: pdfRows.map((row) => ({ label: `${row.renderer}${row.fallback ? " (fallback)" : ""}`, count: row.count })),
      downloadFallbacks: pdfRows.filter((row) => row.fallback).reduce((sum, row) => sum + row.count, 0),
      previewFallbacks: previewFallbacks[0]?.n ?? 0,
    },
    starts: startRows,
  };
}
