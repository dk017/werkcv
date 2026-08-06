import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getAgencyAccessForUser } from "@/lib/agency-access";
import { getAgencyStatusLabel } from "@/lib/agency-plan";
import { prisma } from "@/lib/prisma";
import AgencyDraftResume from "@/components/agency/AgencyDraftResume";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(value: Date | null | undefined): string {
  if (!value) return "—";
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(value);
}

export default async function AgencyAccountPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; error?: string }>;
}) {
  const { status: checkoutStatus, error: errorCode } = await searchParams;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent("/agency/account")}`);
  }

  const access = await getAgencyAccessForUser(user.id);
  const documents = await prisma.cVDocument.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, updatedAt: true },
  });
  const statusLabel = access.subscription ? getAgencyStatusLabel(access.subscription) : "Nog geen plan";
  const quotaError = errorCode === "AGENCY_QUOTA_REACHED";
  const activationPending = checkoutStatus === "success" && access.state !== "active";

  return (
    <main className="min-h-screen bg-[#FFFEF9] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <Link href="/agency" className="text-xl font-black tracking-tight">
            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
          </Link>
          <span className="text-sm font-semibold text-slate-600">{user.email}</span>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Agency account</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Jouw WerkCV Agency Plan</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Maak en bewerk kandidaat-CV&apos;s via jouw vaste WerkCV-route. Eén nieuw CV telt als één van de 50 CV&apos;s in de huidige maandperiode.
            </p>
          </div>

          <div className="border-4 border-slate-900 bg-yellow-300 p-5 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <p className="text-xs font-black uppercase tracking-[0.16em]">WerkCV Agency Plan</p>
            <p className="mt-2 text-4xl font-black">€149 <span className="text-base">/ maand</span></p>
            <p className="mt-2 text-sm font-bold">{statusLabel}</p>
            {access.subscription?.currentPeriodEnd ? (
              <p className="mt-1 text-xs font-semibold text-slate-700">
                Toegang tot {formatDate(access.subscription.currentPeriodEnd)}
              </p>
            ) : null}
          </div>
        </section>

        {activationPending ? (
          <div className="mt-8 border-2 border-amber-500 bg-amber-50 p-4 text-sm font-semibold text-amber-950">
            We verwerken je betaling. Vernieuw deze pagina over een moment; je krijgt toegang zodra de abonnementsbevestiging binnen is.
          </div>
        ) : null}

        {quotaError ? (
          <div className="mt-8 border-2 border-rose-500 bg-rose-50 p-4 text-sm font-semibold text-rose-950">
            De maandlimiet van 50 CV&apos;s is bereikt. Je kunt bestaande CV&apos;s blijven openen; nieuwe CV&apos;s zijn beschikbaar in de volgende periode.
          </div>
        ) : null}

        <AgencyDraftResume canCreate={access.state === "active" && access.canCreate} />

        {access.state === "active" && access.period ? (
          <section className="mt-8 border-2 border-slate-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Gebruik deze periode</p>
                <p className="mt-1 text-3xl font-black">{access.used} / {access.period.allowance} CV&apos;s</p>
              </div>
              <p className="text-sm font-semibold text-slate-600">
                Nieuwe periode vanaf {formatDate(access.period.endsAt)}
              </p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-emerald-500 transition-all"
                style={{ width: `${Math.min(100, (access.used / Math.max(1, access.period.allowance)) * 100)}%` }}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              {access.canCreate ? (
                <Link
                  href="/editor?template=professional&startSource=agency_plan"
                  className="inline-flex border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  Nieuw CV maken
                </Link>
              ) : null}
              <Link href="/templates" className="inline-flex border-2 border-slate-300 bg-white px-4 py-3 text-sm font-black text-slate-700">
                Templates bekijken
              </Link>
            </div>
          </section>
        ) : access.state === "none" ? (
          <section className="mt-8 border-2 border-slate-900 bg-white p-6">
            <h2 className="text-2xl font-black">Nog geen Agency Plan gekoppeld</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Start via de agency-pagina of gebruik hetzelfde e-mailadres als tijdens checkout.</p>
            <Link href="/agency" className="mt-5 inline-flex border-2 border-slate-900 bg-yellow-300 px-4 py-3 text-sm font-black">
              Bekijk het Agency Plan
            </Link>
          </section>
        ) : (
          <section className="mt-8 border-2 border-slate-900 bg-white p-6">
            <h2 className="text-2xl font-black">Toegang wordt gecontroleerd</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              De agency-account is nog niet actief. Gebruik hetzelfde e-mailadres als bij checkout en vernieuw deze pagina zodra de betaling is verwerkt.
            </p>
          </section>
        )}

        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Laatste documenten</p>
              <h2 className="mt-1 text-2xl font-black">Jouw CV&apos;s</h2>
            </div>
            <Link href="/agency" className="text-sm font-bold text-emerald-700 underline underline-offset-4">Agency-plan bekijken</Link>
          </div>
          <div className="mt-4 divide-y-2 divide-slate-100 border-2 border-slate-200 bg-white">
            {documents.length ? documents.map((document) => (
              <Link key={document.id} href={`/editor?id=${encodeURIComponent(document.id)}`} className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-50">
                <span className="min-w-0 truncate text-sm font-bold">{document.title || "Mijn CV"}</span>
                <span className="shrink-0 text-xs font-semibold text-slate-500">{formatDate(document.updatedAt)}</span>
              </Link>
            )) : (
              <p className="px-4 py-5 text-sm font-semibold text-slate-500">Nog geen CV&apos;s aangemaakt.</p>
            )}
          </div>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-slate-500">
          Wil je opzeggen? Mail contact@werkcv.nl. Je houdt toegang tot het einde van de betaalde periode.
        </p>
      </div>
    </main>
  );
}
