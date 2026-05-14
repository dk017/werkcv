import Link from "next/link";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAnalyticsDashboardData, parseAnalyticsRange } from "@/lib/admin-analytics";
import { isAnalyticsAdminEmail } from "@/lib/admin-auth";
import { getCurrentUser } from "@/lib/auth";

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

function number(value: number): string {
  return new Intl.NumberFormat("nl-NL").format(value || 0);
}

function money(cents: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format((cents || 0) / 100);
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
  const data = await getAnalyticsDashboardData(range);
  const ctaToEditorRate =
    data.summary.ctaClicks > 0 ? Math.round((data.summary.editorStarts / data.summary.ctaClicks) * 100) : 0;
  const checkoutToPaidRate =
    data.summary.checkoutClicks > 0 ? Math.round((data.summary.paidOrders / data.summary.checkoutClicks) * 100) : 0;

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
                href={`/admin/analytics?range=${value}`}
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

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Visitors" value={number(data.summary.visitors)} detail={`${number(data.summary.sessions)} sessions`} />
          <StatCard label="Page views" value={number(data.summary.pageViews)} detail={`${number(data.summary.events)} total events`} />
          <StatCard label="CTA clicks" value={number(data.summary.ctaClicks)} detail={`${ctaToEditorRate}% CTA to editor/start`} />
          <StatCard label="Checkout clicks" value={number(data.summary.checkoutClicks)} detail={`${checkoutToPaidRate}% checkout click to paid`} />
          <StatCard label="Editor starts" value={number(data.summary.editorStarts)} detail={`${number(data.summary.checkoutStarts)} checkout starts`} />
          <StatCard label="Paid orders" value={number(data.summary.paidOrders)} detail={money(data.summary.revenueCents)} />
          <StatCard label="Signups" value={number(data.summary.signups)} detail="New accounts in range" />
          <StatCard label="Live now" value={number(data.liveVisitors.length)} detail="Sessions active in last 5 min" />
        </section>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-1 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-950">Live Visitors</h2>
              <p className="text-sm text-slate-500">Current page, source, and device for sessions active in the last 5 minutes.</p>
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
                  <th className="px-4 py-3 text-right">Events</th>
                  <th className="px-4 py-3">Last seen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.liveVisitors.length === 0 ? (
                  <EmptyRow colSpan={6} />
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
                      <td className="px-4 py-3 text-right tabular-nums">{number(visitor.eventCount)}</td>
                      <td className="px-4 py-3 text-slate-600">{dateTime(visitor.lastSeen)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
            headers={["Page", "Views", "Sessions", "CTA", "Editor", "Checkout", "Checkout clicks"]}
            rows={data.funnelPages.map((row) => [
              row.page,
              number(row.pageViews),
              number(row.sessions),
              number(row.ctaClicks),
              number(row.editorStarts),
              number(row.checkoutStarts),
              number(row.checkoutClicks),
            ])}
            alignRight={[1, 2, 3, 4, 5, 6]}
          />
        </section>

        <p className="text-xs text-slate-500">
          Range starts {dateTime(data.since)}. Visitor and session IDs are anonymous browser IDs stored in local/session storage.
        </p>
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
