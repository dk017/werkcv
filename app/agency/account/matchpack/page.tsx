import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canCreateAgencyWork, canEditAgency, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyMatchPackWorkspace from "@/components/agency/AgencyMatchPackWorkspace";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgencyMatchPackPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/matchpack")}`);

  const access = await getAgencyAccessForUser(user.id);
  const allowance = access.period?.allowance || access.subscription?.monthlyLimit || 50;

  const packs = access.state === "active"
    ? await prisma.agencyMatchPack.findMany({
      where: { userId: access.ownerUserId || user.id },
      orderBy: { updatedAt: "desc" },
      take: 25,
      select: {
        id: true,
        title: true,
        vacancyTitle: true,
        locale: true,
        sourceFileType: true,
        status: true,
        cvDocumentId: true,
        approvedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    })
    : [];

  return (
    <main className="min-h-screen bg-[#FFFEF9] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <Link href="/agency/account" className="text-xl font-black tracking-tight">
            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold">
            <Link href="/agency/account" className="text-emerald-700 underline underline-offset-4">← Agency account</Link>
            <span className="text-slate-500">{user.email}</span>
          </div>
        </header>

        <section className="mt-8 max-w-4xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">WerkCV MatchPack</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Van CV en vacature naar een compleet kandidaatvoorstel.</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">Controleer bewijs per functie-eis, corrigeer de brondata en maak één consistente klantintroductie. Kies daarna bewust tussen een volledig voorstel of een versie zonder directe contactgegevens. Pas bij jouw definitieve goedkeuring wordt een voorstel-slot gebruikt.</p>
        </section>

        {access.state === "active" ? (
          <AgencyMatchPackWorkspace
            initialPacks={packs.map((pack) => ({
              ...pack,
              approvedAt: pack.approvedAt?.toISOString() || null,
              createdAt: pack.createdAt.toISOString(),
              updatedAt: pack.updatedAt.toISOString(),
            }))}
            initialUsed={access.used}
            allowance={allowance}
            canCreate={access.canCreate}
            canCreateWork={canCreateAgencyWork(access)}
            canApprove={canEditAgency(access)}
            canOpenCv={access.isOwner}
          />
        ) : (
          <section className="mt-8 max-w-2xl border-4 border-slate-900 bg-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]">
            <h2 className="text-2xl font-black">Een actieve Agency-billing tier is nodig</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
              MatchPack verwerkt kandidaatdata en gebruikt de bestaande agency-quota pas bij definitieve goedkeuring. Activeer eerst het plan om de private workspace te openen.
            </p>
            {access.state === "none" ? (
              <AgencyCheckoutButton
                label="Start MatchPack · Agency €149/maand"
                location="agency_matchpack_locked"
                className="mt-5 border-2 border-slate-900 bg-emerald-400 px-4 py-3 text-sm font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]"
              />
            ) : (
              <p className="mt-5 text-sm font-black">Je betaling wordt nog verwerkt. Vernieuw deze pagina zodra de bevestiging binnen is.</p>
            )}
          </section>
        )}

        <section className="mt-10 grid gap-4 border-t-2 border-slate-900 pt-6 text-sm text-slate-600 md:grid-cols-3">
          <div><p className="font-black text-slate-900">1. Onderbouw</p><p className="mt-1 leading-relaxed">Vacature-eisen worden gekoppeld aan concreet CV-bewijs en openstaande punten.</p></div>
          <div><p className="font-black text-slate-900">2. Corrigeer</p><p className="mt-1 leading-relaxed">Eén gecontroleerde bron voedt het voorblad, volledige CV en optionele versie zonder directe contactgegevens.</p></div>
          <div><p className="font-black text-slate-900">3. Keur goed</p><p className="mt-1 leading-relaxed">Na jouw checklist wordt één voorstel-slot gebruikt en kun je de gekozen klantversie downloaden.</p></div>
        </section>
      </div>
    </main>
  );
}
