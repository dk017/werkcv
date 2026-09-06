import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canApproveAgencyWork, canCreateAgencyWork, canDeleteAgencyDraft, canDeleteApprovedAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import { prisma } from "@/lib/prisma";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";
import AgencyMatchPackWorkspace from "@/components/agency/AgencyMatchPackWorkspace";
import { candidateAcknowledgementEnabled, proposalClaimVerifierEnabled } from "@/lib/agency-feature-flags";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgencyMatchPackPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/matchpack")}`);

  const access = await getAgencyAccessForUser(user.id);
  const allowance = access.period?.allowance ?? access.subscription?.monthlyLimit ?? AGENCY_MONTHLY_CREDIT_LIMIT;
  const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");

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
        retentionExpiresAt: true,
        createdAt: true,
        updatedAt: true,
        clientOutcome: true,
      },
    })
    : [];

  return (
    <AgencyAccountShell currentPath="/agency/account/matchpack" email={user.email} role={access.role}>
    <main className="wk-agency-main">
      <div className="wk-container wk-agency-container-wide">
        <section className="wk-agency-page-hero max-w-4xl">
          <p className="wk-eyebrow">WerkCV MatchPack</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Van CV en vacature naar een compleet kandidaatvoorstel.</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-600">Controleer bewijs per functie-eis, corrigeer de brondata en maak één consistente klantintroductie. Kies daarna bewust tussen een volledig voorstel of een versie zonder directe contactgegevens. Pas bij jouw definitieve goedkeuring wordt één CV-credit gebruikt.</p>
        </section>

        {access.state === "active" ? (
          <AgencyMatchPackWorkspace
            initialPacks={packs.map((pack) => ({
              ...pack,
              approvedAt: pack.approvedAt?.toISOString() || null,
              retentionExpiresAt: pack.retentionExpiresAt?.toISOString() || null,
              createdAt: pack.createdAt.toISOString(),
              updatedAt: pack.updatedAt.toISOString(),
              outcomeStatus: pack.clientOutcome as "unknown" | "pending" | "accepted" | "rejected" | "withdrawn",
            }))}
            initialUsed={access.used}
            allowance={allowance}
            canCreate={access.canCreate}
            canCreateWork={canCreateAgencyWork(access)}
            canApprove={canApproveAgencyWork(access)}
            canDeleteDraft={canDeleteAgencyDraft(access)}
            canDeleteApproved={canDeleteApprovedAgencyWork(access)}
            canOpenCv={access.isOwner}
            claimVerifierEnabled={proposalClaimVerifierEnabled()}
            candidateAcknowledgementEnabled={candidateAcknowledgementEnabled()}
          />
        ) : (
          <section className="wk-agency-panel wk-agency-locked-state max-w-2xl">
            <h2 className="text-2xl font-black">Een actieve Agency-billing tier is nodig</h2>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-800">
              MatchPack verwerkt kandidaatdata en gebruikt de bestaande agency-quota pas bij definitieve goedkeuring. Activeer eerst het plan om de private workspace te openen.
            </p>
            {access.state === "none" ? (
              <AgencyCheckoutButton
                label={`Start MatchPack · Agency ${monthlyPrice}`}
                location="agency_matchpack_locked"
                className="wk-button wk-button-primary mt-5"
              />
            ) : (
              <p className="mt-5 text-sm font-black">Je betaling wordt nog verwerkt. Vernieuw deze pagina zodra de bevestiging binnen is.</p>
            )}
          </section>
        )}

        <section className="wk-agency-workflow-summary">
          <div><p className="font-black text-slate-900">1. Onderbouw</p><p className="mt-1 leading-relaxed">Vacature-eisen worden gekoppeld aan concreet CV-bewijs en openstaande punten.</p></div>
          <div><p className="font-black text-slate-900">2. Corrigeer</p><p className="mt-1 leading-relaxed">Eén gecontroleerde bron voedt het voorblad, volledige CV en optionele versie zonder directe contactgegevens.</p></div>
          <div><p className="font-black text-slate-900">3. Keur goed</p><p className="mt-1 leading-relaxed">Na jouw checklist wordt één CV-credit gebruikt en kun je de gekozen klantversie downloaden.</p></div>
        </section>
      </div>
    </main>
    </AgencyAccountShell>
  );
}
