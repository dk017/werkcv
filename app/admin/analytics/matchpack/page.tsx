import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { isAnalyticsAdminEmail } from "@/lib/admin-auth";
import { getCurrentUser } from "@/lib/auth";
import { getAgencyValidationReport, parseAgencyValidationDays } from "@/lib/agency-validation-funnel-server";
import ViewerTimezone from "@/components/admin/ViewerTimezone";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "MatchPack validation analytics | WerkCV",
  robots: { index: false, follow: false },
};

function number(value: number): string {
  return new Intl.NumberFormat("en-GB").format(value);
}

function rate(value: number | null): string {
  return value === null ? "Not comparable" : `${(value * 100).toFixed(value < 0.1 ? 1 : 0)}%`;
}

function duration(minutes: number | null): string {
  if (minutes === null) return "—";
  if (minutes < 60) return `${Math.round(minutes)} min`;
  return `${(minutes / 60).toFixed(1)} h`;
}

export default async function MatchPackAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/admin/analytics/matchpack");
  if (!isAnalyticsAdminEmail(user.email)) notFound();

  const params = await searchParams;
  const days = parseAgencyValidationDays(params.days);
  const report = await getAgencyValidationReport({ days });
  const enoughTraffic = report.sampleSizes.qualifiedOrganicSessions >= 100
    && report.sampleSizes.completedVerifierRuns >= 30;

  const outcomeCards: Array<[string, string, string]> = [
    ["External paid subscriptions", number(report.outcomes.externalPaidSubscriptions), "Target: 5 distinct agencies"],
    ["Approved/exported packs", number(report.outcomes.approvedOrExportedMatchPacks), "Timing target: 20 packs"],
    ["Repeat users ≤30 days", number(report.outcomes.repeatUsersWithin30Days), "Target: 3 of first 5"],
    ["Client outcomes", number(report.outcomes.clientOutcomesRecorded), "Recorded, not inferred"],
    ["Unsupported claims caught", number(report.outcomes.unsupportedClaimsCaught), "Server product records"],
    ["Recruiter corrections", number(report.outcomes.recruiterCorrections), "Server product records"],
    ["Median upload → export", duration(report.outcomes.medianUploadToExportMinutes), `${report.sampleSizes.timingMatchPacks} timed packs`],
    ["Median invite → response", report.outcomes.medianInvitationToResponseHours === null ? "—" : `${report.outcomes.medianInvitationToResponseHours.toFixed(1)} h`, `${report.sampleSizes.respondedCandidateReviews} responses`],
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Link href="/admin/analytics" className="text-sm font-semibold text-emerald-700 underline">← All analytics</Link>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">Private · external actors only</p>
            <h1 className="mt-2 text-3xl font-semibold">MatchPack validation funnel</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">Interaction stages use distinct visitors. Payment and product stages use authoritative external user records. Rates are omitted where the identity namespace changes.</p>
          </div>
          <div className="flex gap-2">{([28, 90] as const).map((value) => <Link key={value} href={`/admin/analytics/matchpack?days=${value}`} className={`rounded-lg border px-4 py-2 text-sm font-semibold ${days === value ? "border-slate-950 bg-slate-950 text-white" : "border-slate-200 bg-white"}`}>{value} days</Link>)}</div>
        </header>

        <section className={`rounded-xl border p-5 ${enoughTraffic ? "border-emerald-200 bg-emerald-50" : "border-amber-200 bg-amber-50"}`}>
          <p className="font-semibold">{enoughTraffic ? "Minimum interpretation sample reached" : "Do not interpret conversion rates yet"}</p>
          <p className="mt-1 text-sm text-slate-600">{number(report.sampleSizes.qualifiedOrganicSessions)} / 100 qualified organic sessions · {number(report.sampleSizes.completedVerifierRuns)} / 30 completed verifier runs. These are denominators, not success criteria.</p>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {outcomeCards.map(([label, value, detail]) => <article key={label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></article>)}
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4"><h2 className="text-lg font-semibold">Stage counts</h2><p className="mt-1 text-sm text-slate-500">UTC: {report.since.toISOString()} to {report.until.toISOString()}</p></div>
          <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="px-5 py-3">Stage</th><th className="px-5 py-3">Identity</th><th className="px-5 py-3 text-right">Count</th><th className="px-5 py-3 text-right">Comparable previous</th><th className="px-5 py-3 text-right">Rate</th></tr></thead><tbody>{report.stages.map((row) => <tr key={row.key} className="border-t border-slate-100"><td className="px-5 py-3 font-medium">{row.label}</td><td className="px-5 py-3 text-slate-500">Distinct {row.namespace}</td><td className="px-5 py-3 text-right font-semibold">{number(row.count)}</td><td className="px-5 py-3 text-right text-slate-500">{row.previousComparableCount === null ? "—" : number(row.previousComparableCount)}</td><td className="px-5 py-3 text-right font-semibold">{rate(row.conversionRate)}</td></tr>)}</tbody></table></div>
        </section>

        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-5 py-4"><h2 className="text-lg font-semibold">Acquisition breakdowns</h2><p className="mt-1 text-sm text-slate-500">Content-free segmentation by locale, source, landing page, device and new/returning visitor status.</p></div>
          <div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="px-5 py-3">Dimension</th><th className="px-5 py-3">Segment</th><th className="px-5 py-3 text-right">Qualified sessions</th><th className="px-5 py-3 text-right">Verifier completions</th></tr></thead><tbody>{report.breakdowns.length ? report.breakdowns.map((row) => <tr key={`${row.dimension}:${row.segment}`} className="border-t border-slate-100"><td className="px-5 py-3 font-medium">{row.dimension}</td><td className="px-5 py-3 text-slate-600">{row.segment}</td><td className="px-5 py-3 text-right">{number(row.qualifiedSessions)}</td><td className="px-5 py-3 text-right">{number(row.verifierCompletions)}</td></tr>) : <tr><td colSpan={4} className="px-5 py-10 text-center text-slate-500">No external MatchPack acquisition data in this range.</td></tr>}</tbody></table></div>
        </section>

        <p className="text-xs text-slate-500">Generated {report.generatedAt.toISOString()} · Reporting boundaries are UTC · viewer timezone: <ViewerTimezone /> · owner, internal, fixture, synthetic and bot activity is excluded centrally.</p>
      </div>
    </main>
  );
}
