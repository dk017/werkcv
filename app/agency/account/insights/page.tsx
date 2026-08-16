import Link from "next/link";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { getCurrentUser } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function number(value: number | null, suffix = "") {
  return value == null || !Number.isFinite(value) ? "—" : `${new Intl.NumberFormat("nl-NL", { maximumFractionDigits: 1 }).format(value)}${suffix}`;
}

export default async function AgencyInsightsPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/insights")}`);
  const access = await getAgencyAccessForUser(user.id);
  if (access.state !== "active" || !access.ownerUserId) {
    return <main className="min-h-screen bg-[#FFFEF9] px-4 py-12 text-slate-900"><div className="mx-auto max-w-3xl"><Link href="/agency/account" className="font-bold text-emerald-700 underline">← Agency account</Link><h1 className="mt-8 text-4xl font-black">Inzichten verschijnen na activatie.</h1></div></main>;
  }

  const packs = await prisma.agencyMatchPack.findMany({
    where: { userId: access.ownerUserId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, status: true, createdAt: true, approvedAt: true, outcomeData: true },
  });
  const approved = packs.filter((pack) => pack.status === "approved");
  const metricRows = approved.map((pack) => {
    const outcome = pack.outcomeData && typeof pack.outcomeData === "object" && !Array.isArray(pack.outcomeData)
      ? pack.outcomeData as Prisma.JsonObject
      : {};
    return {
      duration: typeof outcome.uploadToApprovalSeconds === "number"
        ? outcome.uploadToApprovalSeconds
        : typeof outcome.reviewDurationSeconds === "number" ? outcome.reviewDurationSeconds : null,
      exportDuration: typeof outcome.approvedToExportSeconds === "number" ? outcome.approvedToExportSeconds : null,
      corrections: typeof outcome.correctionsCount === "number" ? outcome.correctionsCount : 0,
      unsupported: typeof outcome.unsupportedClaimsCaught === "number" ? outcome.unsupportedClaimsCaught : 0,
      clientOutcome: typeof outcome.status === "string" ? outcome.status : "unknown",
    };
  });
  const durations = metricRows.map((row) => row.duration).filter((value): value is number => value != null && value >= 0);
  const exportDurations = metricRows.map((row) => row.exportDuration).filter((value): value is number => value != null && value >= 0);
  const knownOutcomes = metricRows.filter((row) => row.clientOutcome === "accepted" || row.clientOutcome === "rejected");
  const accepted = knownOutcomes.filter((row) => row.clientOutcome === "accepted").length;
  const repeatUsage = approved.length > 1 ? `${approved.length - 1} herhaal${approved.length - 1 === 1 ? "gebruik" : "gebruiken"} na het eerste goedgekeurde voorstel` : "Nog geen herhaalgebruik gemeten";
  const averageDuration = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length / 60 : null;
  const averageExportDuration = exportDurations.length ? exportDurations.reduce((sum, value) => sum + value, 0) / exportDurations.length / 60 : null;
  const totalCorrections = metricRows.reduce((sum, row) => sum + row.corrections, 0);
  const totalUnsupported = metricRows.reduce((sum, row) => sum + row.unsupported, 0);

  return (
    <main className="min-h-screen bg-[#FFFEF9] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5"><Link href="/agency/account" className="text-xl font-black tracking-tight">Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl</Link><div className="flex flex-wrap items-center gap-4 text-sm font-semibold"><Link href="/agency/account/settings" className="text-emerald-700 underline underline-offset-4">Instellingen</Link><Link href="/agency/account" className="text-emerald-700 underline underline-offset-4">← Agency account</Link><span className="text-slate-500">{user.email}</span></div></header>
        <section className="mt-8"><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">MatchPack-inzichten</p><h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Meet of het werk echt beter wordt.</h1><p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">Deze cijfers komen uit je eigen goedgekeurde MatchPacks. Reviewduur, correcties en unsupported claims worden bij goedkeuring vastgelegd; klantacceptatie voeg je zelf toe zodra de opdrachtgever reageert.</p></section>
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {[["Goedgekeurd", String(approved.length), "voorstellen"], ["Upload → goedkeuring", number(averageDuration, " min"), "gemiddeld"], ["Goedkeuring → export", number(averageExportDuration, " min"), "gemiddeld"], ["Correcties", String(totalCorrections), "vastgelegd"], ["Unsupported claims", String(totalUnsupported), "onderschept"], ["Klantacceptatie", knownOutcomes.length ? `${Math.round((accepted / knownOutcomes.length) * 100)}%` : "—", `${accepted}/${knownOutcomes.length} bekend`]].map(([label, value, hint]) => <div key={label} className="border-2 border-slate-900 bg-white p-4 shadow-[3px_3px_0px_0px_rgba(78,205,196,1)]"><p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-semibold text-slate-500">{hint}</p></div>)}
        </section>
        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]"><div className="border-2 border-slate-900 bg-white p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Herhaalgebruik</p><h2 className="mt-1 text-2xl font-black">{repeatUsage}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">Herhaalgebruik is hier bewust simpel gemeten: er is meer dan één goedgekeurd MatchPack in dit agency-account. Met meerdere betalende bureaus kunnen we dit later cohortmatig uitbreiden.</p></div><div className="border-2 border-amber-400 bg-amber-50 p-6"><p className="text-xs font-black uppercase tracking-[0.16em] text-amber-800">Interpretatie</p><p className="mt-2 text-sm font-semibold leading-relaxed text-amber-950">Een hoge score is geen bewijs van kwaliteit. Kijk vooral naar correcties, unsupported claims en echte klantacceptatie. Een lege waarde betekent dat de workflow nog niet genoeg data heeft.</p></div></section>
        <section className="mt-8 border-2 border-slate-900 bg-white p-6"><h2 className="text-2xl font-black">Laatste goedgekeurde MatchPacks</h2><div className="mt-4 divide-y-2 divide-slate-100">{approved.slice(0, 20).map((pack) => <div key={pack.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"><span className="font-bold">{pack.title}</span><span className="text-xs font-semibold text-slate-500">{pack.approvedAt?.toLocaleDateString("nl-NL") || pack.createdAt.toLocaleDateString("nl-NL")}</span></div>)}{approved.length === 0 ? <p className="py-3 text-sm font-semibold text-slate-500">Nog geen goedgekeurde MatchPacks.</p> : null}</div></section>
      </div>
    </main>
  );
}
