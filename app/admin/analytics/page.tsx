import Link from "next/link";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getAnalyticsDashboardData,
  parseAnalyticsRange,
  type InsightRow,
  type MoneyFunnelRow,
  type SegmentedFunnelRow,
} from "@/lib/admin-analytics";
import { isAnalyticsAdminEmail } from "@/lib/admin-auth";
import { getCurrentUser } from "@/lib/auth";
import { AnalyticsGlobe } from "./AnalyticsGlobe";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "WerkCV Analytics",
  robots: {
    index: false,
    follow: false,
  },
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const rangeLabels = {
  "24h": "Last 24h",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
};

type AnalyticsView = "overview" | "live" | "conversion" | "acquisition" | "checkout" | "raw";

const viewLabels: Array<{ value: AnalyticsView; label: string; description: string }> = [
  { value: "overview", label: "Overview", description: "Action queue, core metrics, and trends" },
  { value: "live", label: "Live", description: "Live map, active sessions, and journeys" },
  { value: "conversion", label: "Conversion", description: "Signup cohorts and user-level drop-off" },
  { value: "acquisition", label: "Acquisition", description: "Sources, landing pages, and revenue" },
  { value: "checkout", label: "Checkout", description: "Payment intent and checkout leaks" },
  { value: "raw", label: "Raw tables", description: "Detailed event and funnel tables" },
];

function parseAnalyticsView(value: string | string[] | undefined): AnalyticsView {
  const view = Array.isArray(value) ? value[0] : value;
  return viewLabels.some((item) => item.value === view) ? (view as AnalyticsView) : "live";
}

function dashboardHref(view: AnalyticsView, range: string): string {
  return `/admin/analytics?view=${view}&range=${range}`;
}

function number(value: number): string {
  return new Intl.NumberFormat("nl-NL").format(value || 0);
}

function money(cents: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format((cents || 0) / 100);
}

function percentage(numerator: number, denominator: number): string {
  if (denominator <= 0) return "-";
  return `${Math.round((numerator / denominator) * 100)}%`;
}

function dateTime(value: Date): string {
  return new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(value);
}

function shortId(value: string): string {
  if (!value || value === "unknown") return "unknown";
  return value.length > 14 ? `${value.slice(0, 8)}...${value.slice(-4)}` : value;
}

function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-950">{value}</div>
      {detail ? <div className="mt-1 text-sm text-slate-500">{detail}</div> : null}
    </div>
  );
}

function EmptyRow({ colSpan }: { colSpan: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-8 text-center text-sm text-slate-500">
        No data for this range yet.
      </td>
    </tr>
  );
}

export default async function AdminAnalyticsPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin/analytics");
  if (!isAnalyticsAdminEmail(user.email)) notFound();

  const resolvedSearchParams = await searchParams;
  const range = parseAnalyticsRange(resolvedSearchParams?.range);
  const view = parseAnalyticsView(resolvedSearchParams?.view);
  const data = await getAnalyticsDashboardData(range);
  const ctaToEditorRate =
    data.summary.ctaClicks > 0 ? Math.round((data.summary.editorStarts / data.summary.ctaClicks) * 100) : 0;
  const checkoutToPaidRate =
    data.summary.checkoutClicks > 0 ? Math.round((data.summary.paidOrders / data.summary.checkoutClicks) * 100) : 0;
  const checkoutChoiceRate =
    data.summary.checkoutModalViews > 0
      ? Math.round((data.summary.checkoutClicks / data.summary.checkoutModalViews) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-emerald-700">Private dashboard</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">WerkCV Analytics</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Native event, CTA, source, and checkout visibility from the WerkCV Postgres analytics table.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(rangeLabels).map(([value, label]) => (
              <Link
                key={value}
                href={dashboardHref(view, value)}
                className={`rounded-md border px-3 py-2 text-sm font-medium ${
                  range === value
                    ? "border-slate-950 bg-slate-950 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-6 lg:self-start">
            <nav className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
              {viewLabels.map((item) => (
                <Link
                  key={item.value}
                  href={dashboardHref(item.value, range)}
                  className={`block rounded-md px-3 py-3 text-sm transition ${
                    view === item.value
                      ? "bg-slate-950 text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <span className="font-semibold">{item.label}</span>
                  <span className={`mt-0.5 block text-xs ${view === item.value ? "text-slate-300" : "text-slate-500"}`}>
                    {item.description}
                  </span>
                </Link>
              ))}
            </nav>
          </aside>

          <div className="min-w-0 space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current view</p>
              <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    {viewLabels.find((item) => item.value === view)?.label}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {viewLabels.find((item) => item.value === view)?.description}
                  </p>
                </div>
                <p className="text-xs text-slate-500">Updated {dateTime(data.generatedAt)}</p>
              </div>
            </div>

            {view === "overview" ? (
              <>
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Visitors" value={number(data.summary.visitors)} detail={`${number(data.summary.sessions)} sessions`} />
          <StatCard label="Page views" value={number(data.summary.pageViews)} detail={`${number(data.summary.events)} total events`} />
          <StatCard label="CTA clicks" value={number(data.summary.ctaClicks)} detail={`${ctaToEditorRate}% CTA to editor/start`} />
          <StatCard label="Checkout clicks" value={number(data.summary.checkoutClicks)} detail={`${checkoutToPaidRate}% checkout click to paid`} />
          <StatCard
            label="Checkout modal"
            value={number(data.summary.checkoutModalViews)}
            detail={`${checkoutChoiceRate}% chose a payment option`}
          />
          <StatCard label="Editor starts" value={number(data.summary.editorStarts)} detail={`${number(data.summary.checkoutStarts)} provider starts`} />
          <StatCard label="Paid orders" value={number(data.summary.paidOrders)} detail={money(data.summary.revenueCents)} />
          <StatCard label="Signups" value={number(data.summary.signups)} detail="New accounts in range" />
          <StatCard label="Live now" value={number(data.liveVisitors.length)} detail="Sessions active in last 15 min" />
        </section>

        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-950">Action Queue</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Funnel signals converted into the next thing worth checking.
                </p>
              </div>
              <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                {rangeLabels[range]}
              </span>
            </div>
            <div className="mt-4 grid gap-3">
              {data.insights.map((insight) => (
                <InsightCard key={insight.id} insight={insight} />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">Funnel Snapshot</h2>
            <p className="mt-1 text-sm text-slate-500">Where the selected range loses momentum.</p>
            <FunnelBars
              rows={[
                ["Views", data.summary.pageViews],
                ["CTA", data.summary.ctaClicks],
                ["Editor", data.summary.editorStarts],
                ["Checkout modal", data.summary.checkoutModalViews],
                ["Checkout click", data.summary.checkoutClicks],
                ["Paid", data.summary.paidOrders],
              ]}
            />
          </div>
        </section>
              </>
            ) : null}

            {view === "live" ? (
              <>
        <AnalyticsGlobe points={data.liveGlobePoints} visitors={data.visitorJourneys} generatedAt={dateTime(data.generatedAt)} />

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Live Visitors</h2>
              <p className="text-sm text-slate-500">Current page, source, and device for sessions active in the last 15 minutes.</p>
            </div>
            <p className="text-xs text-slate-500">Updated {dateTime(data.generatedAt)}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Session</th>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Device</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3 text-right">Events</th>
                  <th className="px-4 py-3">Last seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.liveVisitors.length === 0 ? (
                  <EmptyRow colSpan={7} />
                ) : (
                  data.liveVisitors.map((visitor) => (
                    <tr key={visitor.sessionId}>
                      <td className="px-4 py-3 font-mono text-xs text-slate-600">{shortId(visitor.sessionId)}</td>
                      <td className="max-w-sm truncate px-4 py-3 font-medium text-slate-900">{visitor.page}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                          {visitor.sourceType}
                        </span>{" "}
                        {visitor.sourceLabel}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {visitor.deviceType} / {visitor.browserName} / {visitor.osName}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {[visitor.city, visitor.country].filter(Boolean).join(", ") || "-"}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums">{number(visitor.eventCount)}</td>
                      <td className="px-4 py-3 text-slate-600">{dateTime(visitor.lastSeen)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
              </>
            ) : null}

            {view === "overview" ? (
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ChartHeader title="Visitor Trend" subtitle="Visitors, sessions, and page views over the selected range." />
            <SparklineChart
              rows={data.trends.map((row) => ({
                label: dateTime(row.bucket),
                primary: row.visitors,
                secondary: row.pageViews,
              }))}
              primaryLabel="Visitors"
              secondaryLabel="Page views"
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ChartHeader title="CTA and Checkout Trend" subtitle="CTA clicks compared with checkout intent." />
            <SparklineChart
              rows={data.trends.map((row) => ({
                label: dateTime(row.bucket),
                primary: row.ctaClicks,
                secondary: row.checkoutModalViews + row.checkoutClicks,
              }))}
              primaryLabel="CTA clicks"
              secondaryLabel="Checkout events"
            />
          </div>
        </section>
            ) : null}

            {view === "conversion" ? (
              <>
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Segmented Conversion Funnel"
            subtitle="Unique sessions at each measured stage, grouped by first-touch acquisition context and device. Landing pages show the 12 highest-volume segments."
          />
          <SegmentedFunnelTable
            title="Locale"
            rows={data.segmentedFunnels.filter((row) => row.dimension === "locale")}
          />
          <SegmentedFunnelTable
            title="Landing page"
            rows={data.segmentedFunnels.filter((row) => row.dimension === "landing_page")}
          />
          <SegmentedFunnelTable
            title="Source cluster"
            rows={data.segmentedFunnels.filter((row) => row.dimension === "source_cluster")}
          />
          <SegmentedFunnelTable
            title="Device"
            rows={data.segmentedFunnels.filter((row) => row.dimension === "device")}
          />
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            Paid counts include CV-download orders assigned to the last measured session that touched that CV before payment.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Money Funnel"
            subtitle="Revenue-attributed funnel by landing page, locale, device, source cluster, editor start source, template, and upload/manual entry."
          />
          <MoneyFunnelTable
            title="Landing page"
            rows={data.moneyFunnels.filter((row) => row.dimension === "landing_page")}
          />
          <MoneyFunnelTable
            title="Locale"
            rows={data.moneyFunnels.filter((row) => row.dimension === "locale")}
          />
          <MoneyFunnelTable
            title="Device"
            rows={data.moneyFunnels.filter((row) => row.dimension === "device")}
          />
          <MoneyFunnelTable
            title="Source cluster"
            rows={data.moneyFunnels.filter((row) => row.dimension === "source_cluster")}
          />
          <MoneyFunnelTable
            title="Editor start source"
            rows={data.moneyFunnels.filter((row) => row.dimension === "start_source")}
          />
          <MoneyFunnelTable
            title="Upload / example / manual"
            rows={data.moneyFunnels.filter((row) => row.dimension === "entry_method")}
          />
          <MoneyFunnelTable
            title="Template"
            rows={data.moneyFunnels.filter((row) => row.dimension === "template")}
          />
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            Revenue is assigned to the last measured session that touched the paid CV before payment. Older rows may show unknown start source/template when the original event did not carry that detail.
          </p>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(320px,0.8fr)_minmax(0,1.2fr)]">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ChartHeader title="Signup Drop-off Cohorts" subtitle="Where new accounts stop after signup." />
            <FunnelBars rows={data.signupCohorts.map((row) => [row.stage, row.users])} />
            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4">
              {data.signupCohorts.map((row) => (
                <p key={row.stage} className="text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{row.stage}:</span> {row.description}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Recent Signup States"
            subtitle="Every new signup in this range, with the exact stage where they stopped."
          />
          <SimpleTable
            headers={["Email", "Signup", "Source", "Landing page", "Locale", "CVs", "Modal", "Checkout", "Paid", "Stopped at"]}
            rows={data.recentSignups.map((row) => [
              row.email,
              dateTime(row.signupAt),
              row.source,
              row.landingPage,
              row.locale,
              number(row.cvCount),
              number(row.checkoutModalViews),
              number(row.checkoutClicks),
              number(row.paidOrders),
              row.stoppedAt,
            ])}
            alignRight={[5, 6, 7, 8]}
          />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Guide CTA Copy Experiment"
            subtitle="Visitor-level trust versus speed copy, from first assignment through editor use and paid orders."
          />
          <SimpleTable
            headers={["Variant / locale", "Assigned", "Clicked", "Editor", "CVs", "Paid", "Revenue", "Assigned → click", "Assigned → editor", "Assigned → paid"]}
            rows={data.ctaCopyExperiments.map((row) => [
              `${row.variant} / ${row.locale}`,
              number(row.assignedVisitors),
              number(row.clickedVisitors),
              number(row.editorVisitors),
              number(row.createdCvs),
              number(row.paidVisitors),
              money(row.revenueCents),
              percentage(row.clickedVisitors, row.assignedVisitors),
              percentage(row.editorVisitors, row.assignedVisitors),
              percentage(row.paidVisitors, row.assignedVisitors),
            ])}
            alignRight={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            Do not select a winner before each overall variant has at least 100 assigned visitors and enough time for recent visitors to purchase.
          </p>
        </section>
              </>
            ) : null}

            {view === "acquisition" ? (
              <>
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Source to Revenue"
            subtitle="Signup sources connected to CV creation, checkout intent, and paid orders."
          />
          <SimpleTable
            headers={["Source / landing page", "Signups", "CVs", "Modal", "Checkout", "Paid", "Revenue"]}
            rows={data.sourceRevenue.map((row) => [
              `${row.source} -> ${row.landingPage}`,
              number(row.signups),
              number(row.cvsCreated),
              number(row.checkoutModalViews),
              number(row.checkoutClicks),
              number(row.paidOrders),
              money(row.revenueCents),
            ])}
            alignRight={[1, 2, 3, 4, 5, 6]}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <TableHeader title="Top Pages" subtitle="Organic/search/AI landing pages with actual page views." />
            <SimpleTable
              headers={["Page", "Views", "Sessions"]}
              rows={data.topPages.map((row) => [row.page, number(row.pageViews), number(row.sessions)])}
              alignRight={[1, 2]}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <TableHeader title="Sources" subtitle="Direct, search, referral, social, and AI traffic grouped by detected source." />
            <SimpleTable
              headers={["Source", "Visitors", "Sessions", "Views"]}
              rows={data.sources.map((row) => [
                `${row.sourceType}: ${row.sourceLabel}`,
                number(row.visitors),
                number(row.sessions),
                number(row.pageViews),
              ])}
              alignRight={[1, 2, 3]}
            />
          </div>
        </section>
              </>
            ) : null}

            {view === "checkout" ? (
              <>
        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Checkout Experiment Results"
            subtitle="CV-level modal versus direct-checkout cohorts assigned in the selected range. Bundle purchases count as paid because they include the CV PDF."
          />
          <SimpleTable
            headers={["Variant / locale", "Assigned", "Ready", "Paywall", "Checkout", "Failed", "Paid", "Revenue", "Ready → paid", "Assigned → paid"]}
            rows={data.checkoutExperiments.map((row) => [
              `${row.variant} / ${row.locale}`,
              number(row.assignedCvs),
              number(row.readyCvs),
              number(row.paywallCvs),
              number(row.checkoutCvs),
              number(row.failedCvs),
              number(row.paidCvs),
              money(row.revenueCents),
              percentage(row.paidCvs, row.readyCvs),
              percentage(row.paidCvs, row.assignedCvs),
            ])}
            alignRight={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
          <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500">
            Treat results as directional until each overall variant has at least 50 assigned CVs. Recent cohorts may still convert later.
          </p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader
            title="Checkout Diagnostics"
            subtitle="Checkout modal visibility, payment-option clicks, and paid revenue by page/provider signal."
          />
          <SimpleTable
            headers={["Page", "Provider / option", "Modal", "Checkout clicks", "Paid", "Revenue"]}
            rows={data.checkoutDiagnostics.map((row) => [
              row.page,
              row.provider,
              number(row.modalViews),
              number(row.checkoutClicks),
              number(row.paidOrders),
              money(row.revenueCents),
            ])}
            alignRight={[2, 3, 4, 5]}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ChartHeader title="CTA and Checkout Trend" subtitle="CTA clicks compared with checkout intent." />
            <SparklineChart
              rows={data.trends.map((row) => ({
                label: dateTime(row.bucket),
                primary: row.ctaClicks,
                secondary: row.checkoutModalViews + row.checkoutClicks,
              }))}
              primaryLabel="CTA clicks"
              secondaryLabel="Checkout events"
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-base font-semibold text-slate-950">Funnel Snapshot</h2>
            <p className="mt-1 text-sm text-slate-500">Payment path in the selected range.</p>
            <FunnelBars
              rows={[
                ["Editor", data.summary.editorStarts],
                ["Checkout modal", data.summary.checkoutModalViews],
                ["Checkout click", data.summary.checkoutClicks],
                ["Paid", data.summary.paidOrders],
              ]}
            />
          </div>
        </section>
              </>
            ) : null}

            {view === "raw" ? (
              <>
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <TableHeader title="CTA Performance" subtitle="Page-specific CTA clicks so weak conversion pages are visible." />
            <SimpleTable
              headers={["Page", "CTA", "Destination", "Clicks"]}
              rows={data.ctas.map((row) => [row.page, row.label, row.destination, number(row.clicks)])}
              alignRight={[3]}
            />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <TableHeader title="Devices" subtitle="Sessions grouped by browser and device type." />
            <SimpleTable
              headers={["Device", "Browser", "Sessions"]}
              rows={data.devices.map((row) => [row.deviceType, row.browserName, number(row.sessions)])}
              alignRight={[2]}
            />
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <TableHeader title="Page Funnel" subtitle="Where visitors move from page view into CTA, editor, and checkout actions." />
          <SimpleTable
            headers={["Page", "Views", "Sessions", "CTA", "Editor", "Modal", "Provider", "Checkout clicks"]}
            rows={data.funnelPages.map((row) => [
              row.page,
              number(row.pageViews),
              number(row.sessions),
              number(row.ctaClicks),
              number(row.editorStarts),
              number(row.checkoutModalViews),
              number(row.checkoutStarts),
              number(row.checkoutClicks),
            ])}
            alignRight={[1, 2, 3, 4, 5, 6, 7]}
          />
        </section>
              </>
            ) : null}

        <p className="text-xs text-slate-500">
          Range starts {dateTime(data.since)}. Visitor and session IDs are anonymous browser IDs stored in local/session storage.
        </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function TableHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="border-b border-slate-200 px-4 py-3">
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function SegmentedFunnelTable({ title, rows }: { title: string; rows: SegmentedFunnelRow[] }) {
  return (
    <div className="border-t border-slate-100 first:border-t-0">
      <h3 className="px-4 pt-4 text-sm font-semibold text-slate-900">{title}</h3>
      <SimpleTable
        headers={[
          "Segment",
          "Sessions",
          "CTA",
          "Login",
          "Code",
          "Verified",
          "Editor",
          "Ready",
          "PDF",
          "Checkout",
          "Paid",
          "Ready / editor",
        ]}
        rows={rows.map((row) => [
          row.segment,
          number(row.sessions),
          number(row.ctaSessions),
          number(row.loginViews),
          number(row.codeRequests),
          number(row.verifiedLogins),
          number(row.editorStarts),
          number(row.readyCvs),
          number(row.pdfStarts),
          number(row.checkoutStarts),
          number(row.paidSessions),
          percentage(row.readyCvs, row.editorStarts),
        ])}
        alignRight={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
      />
    </div>
  );
}

function MoneyFunnelTable({ title, rows }: { title: string; rows: MoneyFunnelRow[] }) {
  return (
    <div className="border-t border-slate-100 first:border-t-0">
      <h3 className="px-4 pt-4 text-sm font-semibold text-slate-900">{title}</h3>
      <SimpleTable
        headers={[
          "Segment",
          "Sessions",
          "Editor",
          "Ready",
          "PDF",
          "Checkout open",
          "Payment",
          "Paid",
          "Revenue",
          "Ready / editor",
          "Paid / ready",
        ]}
        rows={rows.map((row) => [
          row.segment,
          number(row.sessions),
          number(row.editorStarts),
          number(row.readyCvs),
          number(row.pdfStarts),
          number(row.checkoutOpened),
          number(row.checkoutStarts),
          number(row.paidOrders),
          money(row.revenueCents),
          percentage(row.readyCvs, row.editorStarts),
          percentage(row.paidOrders, row.readyCvs),
        ])}
        alignRight={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
      />
    </div>
  );
}

function InsightCard({ insight }: { insight: InsightRow }) {
  const colors = {
    high: "border-red-200 bg-red-50 text-red-800",
    medium: "border-amber-200 bg-amber-50 text-amber-800",
    low: "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <div className="rounded-lg border border-slate-200 p-3">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="max-w-2xl text-sm font-semibold text-slate-950">{insight.title}</h3>
        <span className={`rounded border px-2 py-1 text-xs font-semibold ${colors[insight.severity]}`}>
          {insight.severity}
        </span>
      </div>
      {insight.page ? (
        <p className="mt-2 font-mono text-xs text-slate-500" title={insight.page}>
          {insight.page}
        </p>
      ) : null}
      <p className="mt-2 text-sm text-slate-600">{insight.evidence}</p>
      <p className="mt-2 text-sm font-medium text-slate-900">{insight.action}</p>
    </div>
  );
}

function FunnelBars({ rows }: { rows: Array<[string, number]> }) {
  const max = Math.max(...rows.map(([, value]) => value), 1);

  return (
    <div className="mt-5 space-y-3">
      {rows.map(([label, value]) => (
        <div key={label}>
          <div className="mb-1 flex items-center justify-between gap-3 text-sm">
            <span className="font-medium text-slate-700">{label}</span>
            <span className="tabular-nums text-slate-500">{number(value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-950"
              style={{ width: value === 0 ? "0%" : `${Math.max(3, Math.round((value / max) * 100))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChartHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

function SparklineChart({
  rows,
  primaryLabel,
  secondaryLabel,
}: {
  rows: Array<{ label: string; primary: number; secondary: number }>;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  const width = 620;
  const height = 210;
  const padding = 22;
  const max = Math.max(...rows.flatMap((row) => [row.primary, row.secondary]), 1);
  const points = rows.length > 1 ? rows : [...rows, ...(rows.length === 0 ? [{ label: "", primary: 0, secondary: 0 }] : [])];

  const pathFor = (key: "primary" | "secondary") =>
    points
      .map((row, index) => {
        const x = padding + (index / Math.max(points.length - 1, 1)) * (width - padding * 2);
        const y = height - padding - (row[key] / max) * (height - padding * 2);
        return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-500">
        <span className="inline-flex items-center gap-1">
          <i className="h-2 w-2 rounded-full bg-emerald-500" />
          {primaryLabel}
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="h-2 w-2 rounded-full bg-sky-500" />
          {secondaryLabel}
        </span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-56 w-full" role="img" aria-label={`${primaryLabel} and ${secondaryLabel}`}>
        <rect x="0" y="0" width={width} height={height} rx="8" fill="#f8fafc" />
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#cbd5e1" />
        <path d={pathFor("secondary")} fill="none" stroke="#0ea5e9" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={pathFor("primary")} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{points[0]?.label || "-"}</span>
        <span>{points[points.length - 1]?.label || "-"}</span>
      </div>
    </div>
  );
}

function SimpleTable({
  headers,
  rows,
  alignRight = [],
}: {
  headers: string[];
  rows: string[][];
  alignRight?: number[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
          <tr>
            {headers.map((header, index) => (
              <th key={header} className={`px-4 py-3 ${alignRight.includes(index) ? "text-right" : ""}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.length === 0 ? (
            <EmptyRow colSpan={headers.length} />
          ) : (
            rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${cell}-${cellIndex}`}
                    className={`max-w-sm truncate px-4 py-3 ${
                      cellIndex === 0 ? "font-medium text-slate-900" : "text-slate-600"
                    } ${alignRight.includes(cellIndex) ? "text-right tabular-nums" : ""}`}
                    title={cell}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
