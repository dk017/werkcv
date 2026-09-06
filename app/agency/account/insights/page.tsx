import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canEditAgencyDraft, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import { clientAcceptanceSummary, deriveMatchPackDurations, type ClientOutcome } from "@/lib/agency-metrics";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function number(value: number | null, suffix = "") {
  return value == null || !Number.isFinite(value) ? "—" : `${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 }).format(value)}${suffix}`;
}

export default async function AgencyInsightsPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/insights")}`);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.ownerUserId || !canEditAgencyDraft(access)) {
    return <AgencyAccountShell currentPath="/agency/account/insights" email={user.email} role={access.role}><main className="wk-agency-main"><div className="wk-container wk-agency-container-narrow"><section className="wk-agency-empty-state"><p className="wk-eyebrow">MatchPack-inzichten</p><h1 className="mt-3 text-4xl font-black">Inzichten verschijnen na activatie.</h1><p className="mt-3 max-w-2xl text-slate-600">Zodra je workspace actief is en voorstellen zijn goedgekeurd, verschijnen hier doorlooptijd, correcties en klantuitkomsten.</p><Link href="/agency/account" className="wk-button wk-button-secondary mt-6">Terug naar overzicht</Link></section></div></main></AgencyAccountShell>;
  }

  const packs = await prisma.agencyMatchPack.findMany({
    where: { userId: access.ownerUserId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, status: true, createdAt: true, approvedAt: true, firstExportedAt: true, correctionsCount: true, unsupportedClaimsCaught: true, clientOutcome: true },
  });
  const approved = packs.filter((pack) => pack.status === "approved");
  const metricRows = approved.map((pack) => {
    const durations = deriveMatchPackDurations(pack);
    return {
      duration: durations.uploadToApprovalSeconds,
      exportDuration: durations.approvalToFirstExportSeconds,
      corrections: pack.correctionsCount,
      unsupported: pack.unsupportedClaimsCaught,
      clientOutcome: pack.clientOutcome as ClientOutcome,
    };
  });
  const durations = metricRows.map((row) => row.duration).filter((value): value is number => value != null && value >= 0);
  const exportDurations = metricRows.map((row) => row.exportDuration).filter((value): value is number => value != null && value >= 0);
  const acceptance = clientAcceptanceSummary(metricRows.map((row) => row.clientOutcome));
  const repeatUsage = approved.length > 1 ? `${approved.length - 1} herhaal${approved.length - 1 === 1 ? "gebruik" : "gebruiken"} na het eerste goedgekeurde voorstel` : "Nog geen herhaalgebruik gemeten";
  const averageDuration = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length / 60 : null;
  const averageExportDuration = exportDurations.length ? exportDurations.reduce((sum, value) => sum + value, 0) / exportDurations.length / 60 : null;
  const totalCorrections = metricRows.reduce((sum, row) => sum + row.corrections, 0);
  const totalUnsupported = metricRows.reduce((sum, row) => sum + row.unsupported, 0);

  return (
    <AgencyAccountShell currentPath="/agency/account/insights" email={user.email} role={access.role}>
    <main className="wk-agency-main">
      <div className="wk-container">
        <section className="wk-agency-page-hero"><p className="wk-eyebrow">MatchPack-inzichten</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Meet of het werk echt beter wordt.</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">Deze cijfers komen uit je eigen goedgekeurde MatchPacks. Reviewduur, correcties en unsupported claims worden bij goedkeuring vastgelegd; klantacceptatie voeg je zelf toe zodra de opdrachtgever reageert.</p></section>
        <section className="wk-agency-metrics-grid">
          {[["Goedgekeurd", String(approved.length), "voorstellen"], ["Upload → goedkeuring", number(averageDuration, " min"), "gemiddeld"], ["Goedkeuring → export", number(averageExportDuration, " min"), "gemiddeld"], ["Correcties", String(totalCorrections), "vastgelegd"], ["Unsupported claims", String(totalUnsupported), "onderschept"], ["Klantacceptatie", acceptance.rate == null ? "—" : `${Math.round(acceptance.rate * 100)}%`, `${acceptance.accepted}/${acceptance.denominator} bekend`]].map(([label, value, hint]) => <div key={label} className="wk-agency-metric"><p className="wk-agency-metric-label">{label}</p><p className="wk-agency-metric-value">{value}</p><p className="wk-agency-metric-hint">{hint}</p></div>)}
        </section>
        <section className="wk-agency-insight-context"><div className="wk-agency-panel"><p className="wk-eyebrow">Herhaalgebruik</p><h2 className="mt-2 text-2xl font-black">{repeatUsage}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Herhaalgebruik is hier bewust simpel gemeten: er is meer dan één goedgekeurd MatchPack in dit agency-account. Met meerdere betalende bureaus kunnen we dit later cohortmatig uitbreiden.</p></div><div className="wk-agency-panel wk-agency-panel-warning"><p className="wk-eyebrow">Interpretatie</p><p className="mt-3 text-sm font-semibold leading-relaxed text-slate-700">Een hogere waarde in deze meetkaart is geen bewijs van kwaliteit. Kijk vooral naar correcties, unsupported claims en echte klantacceptatie. Een lege waarde betekent dat de workflow nog niet genoeg data heeft.</p></div></section>
        <section className="wk-agency-panel"><h2 className="text-2xl font-black">Laatste goedgekeurde MatchPacks</h2><div className="mt-4 divide-y divide-slate-100">{approved.slice(0, 20).map((pack) => <div key={pack.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><span className="font-bold">{pack.title}</span><span className="text-xs font-semibold text-slate-500">{pack.approvedAt?.toLocaleDateString("nl-NL") || pack.createdAt.toLocaleDateString("nl-NL")}</span></div>)}{approved.length === 0 ? <p className="py-3 text-sm font-semibold text-slate-500">Nog geen goedgekeurde MatchPacks.</p> : null}</div></section>
      </div>
    </main>
    </AgencyAccountShell>
  );
}
