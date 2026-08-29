import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { isAnalyticsAdminEmail } from "@/lib/admin-auth";
import {
  getEnglishRoleExampleFunnelReport,
  type EnglishRoleExampleFunnelRange,
} from "@/lib/english-role-example-funnel-server";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function parseRange(value: string | string[] | undefined): EnglishRoleExampleFunnelRange {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate === "7d" || candidate === "90d" ? candidate : "30d";
}

function formatDate(value: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Amsterdam",
  }).format(value);
}

function formatRate(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}

function formatMoney(amountCents: number): string {
  return new Intl.NumberFormat("en-NL", { style: "currency", currency: "EUR" }).format(amountCents / 100);
}

export default async function EnglishRoleExampleFunnelPage({ searchParams }: PageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin/analytics/english-role-examples");
  if (!isAnalyticsAdminEmail(user.email)) notFound();

  const params = await searchParams;
  const range = parseRange(params?.range);
  const report = await getEnglishRoleExampleFunnelReport(range);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-emerald-700">Private acquisition report</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-950">English role-example funnel</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Certified unique-user counts from role-example CV records. No names, emails, proposal text, or raw event payloads are shown.
            </p>
          </div>
          <Link href="/admin/analytics" className="text-sm font-semibold text-emerald-700 underline">
            Back to analytics
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {(["7d", "30d", "90d"] as const).map((option) => (
            <Link
              key={option}
              href={`/admin/analytics/english-role-examples?range=${option}`}
              className={`rounded-md border px-3 py-2 text-sm font-semibold ${
                option === range
                  ? "border-slate-950 bg-slate-950 text-white"
                  : "border-slate-200 bg-white text-slate-700"
              }`}
            >
              Last {option.replace("d", " days")}
            </Link>
          ))}
        </div>

        <section className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Landing page</th>
                  <th className="px-4 py-3">Visitors</th>
                  <th className="px-4 py-3">Sessions</th>
                  <th className="px-4 py-3">Example starts</th>
                  <th className="px-4 py-3">Upload starts</th>
                  <th className="px-4 py-3">Signups</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Meaningful</th>
                  <th className="px-4 py-3">Ready</th>
                  <th className="px-4 py-3">Preview</th>
                  <th className="px-4 py-3">Checkout</th>
                  <th className="px-4 py-3">Paid</th>
                  <th className="px-4 py-3">Paid orders</th>
                  <th className="px-4 py-3">Revenue</th>
                  <th className="px-4 py-3">Paid / created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {report.rows.length === 0 ? (
                  <tr>
                    <td colSpan={16} className="px-4 py-10 text-center text-slate-500">No attributed role-example activity in this range.</td>
                  </tr>
                ) : report.rows.map((row) => (
                  <tr key={row.roleSlug}>
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-slate-950">{row.roleSlug}</td>
                    <td className="max-w-xs px-4 py-3 font-mono text-xs text-slate-500">{row.landingPagePath}</td>
                    <td className="px-4 py-3">{row.visitors}</td>
                    <td className="px-4 py-3">{row.rolePageSessions}</td>
                    <td className="px-4 py-3">{row.exampleStarts}</td>
                    <td className="px-4 py-3">{row.uploadStarts}</td>
                    <td className="px-4 py-3">{row.signups}</td>
                    <td className="px-4 py-3">{row.created}</td>
                    <td className="px-4 py-3">{row.meaningful} <span className="text-slate-400">({formatRate(row.meaningfulRate)})</span></td>
                    <td className="px-4 py-3">{row.ready} <span className="text-slate-400">({formatRate(row.readyRate)})</span></td>
                    <td className="px-4 py-3">{row.preview} <span className="text-slate-400">({formatRate(row.previewRate)})</span></td>
                    <td className="px-4 py-3">{row.checkout} <span className="text-slate-400">({formatRate(row.checkoutRate)})</span></td>
                    <td className="px-4 py-3 font-semibold">{row.paid}</td>
                    <td className="px-4 py-3">{row.paidOrders}</td>
                    <td className="px-4 py-3">{formatMoney(row.revenueCents)}</td>
                    <td className="px-4 py-3 font-semibold">{formatRate(row.paidRate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Mobile and desktop diagnostics</h2>
          <p className="mt-1 text-sm text-slate-600">These are visitor/session/start diagnostics by device, not additional unique-user conversion denominators.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {report.rows.map((row) => (
              <div key={row.roleSlug} className="rounded-md border border-slate-200 p-4">
                <h3 className="font-semibold text-slate-950">{row.roleSlug}</h3>
                {row.deviceBreakdown.length === 0 ? (
                  <p className="mt-2 text-sm text-slate-500">No device identifiers recorded.</p>
                ) : (
                  <div className="mt-3 overflow-x-auto">
                    <table className="min-w-full text-left text-xs">
                      <thead className="text-slate-500"><tr><th className="py-1 pr-3">Device</th><th className="py-1 pr-3">Visitors</th><th className="py-1 pr-3">Sessions</th><th className="py-1 pr-3">Example</th><th className="py-1">Upload</th></tr></thead>
                      <tbody className="divide-y divide-slate-100">
                        {row.deviceBreakdown.map((device) => <tr key={device.deviceType}><td className="py-1 pr-3 font-medium">{device.deviceType}</td><td className="py-1 pr-3">{device.visitors}</td><td className="py-1 pr-3">{device.rolePageSessions}</td><td className="py-1 pr-3">{device.exampleStarts}</td><td className="py-1">{device.uploadStarts}</td></tr>)}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <h2 className="font-semibold">Data quality</h2>
          <p className="mt-1">Legacy documents: {report.dataQuality.legacySourceDocuments}; malformed role sources: {report.dataQuality.invalidRoleSourceDocuments}; legacy/unattributed starts: {report.dataQuality.legacyOrUnattributedStarts}; unattributed signups: {report.dataQuality.unattributedSignups}; paid orders without a valid role source: {report.dataQuality.paidOrdersWithoutRoleSource}.</p>
          <p className="mt-1">Missing visitor IDs: {report.dataQuality.pageEventsMissingVisitorId}; missing session IDs: {report.dataQuality.pageEventsMissingSessionId}; conflicting role events: {report.dataQuality.conflictingRoleEvents}.</p>
          {report.dataQuality.warnings.length > 0 ? <ul className="mt-2 list-disc space-y-1 pl-5">{report.dataQuality.warnings.map((warning) => <li key={warning}>{warning}</li>)}</ul> : <p className="mt-2">No data-quality warnings for this range.</p>}
        </section>

        <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <p><strong>Definition:</strong> {report.definitionVersion}. Range starts {formatDate(report.since)}; generated {formatDate(report.generatedAt)}.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {report.limitations.map((limitation) => <li key={limitation}>{limitation}</li>)}
          </ul>
        </section>
      </div>
    </main>
  );
}
