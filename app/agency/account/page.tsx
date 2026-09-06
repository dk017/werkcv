import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canCreateAgencyWork, canManageAgency, canViewAgencyWork, getAgencyAccessForUser, needsAgencyRetentionAcknowledgement } from "@/lib/agency-access";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay, getAgencyStatusLabel } from "@/lib/agency-plan";
import { prisma } from "@/lib/prisma";
import AgencyDraftResume from "@/components/agency/AgencyDraftResume";
import AgencyPrimaryActions from "@/components/agency/AgencyPrimaryActions";
import AgencyOnboardingChecklist, { type AgencyOnboardingItem } from "@/components/agency/AgencyOnboardingChecklist";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";
import { getAgencyAccountLoginHref } from "@/lib/agency-account-entry";
import { AGENCY_WORKSPACE_LANGUAGE_NOTICE } from "@/lib/agency-review-scope";

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
  searchParams: Promise<{ status?: string; error?: string; locale?: string }>;
}) {
  const entry = await searchParams;
  const { status: checkoutStatus, error: errorCode, locale: entryLocale } = entry;
  const user = await getCurrentUser();
  if (!user) {
    redirect(getAgencyAccountLoginHref(entry));
  }

  const access = await getAgencyAccessForUser(user.id);
  const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");
  const documents = await prisma.cVDocument.findMany({
    where: access.subscription ? { agencySubscriptionId: access.subscription.id } : { id: "__no_agency_subscription__" },
    orderBy: { updatedAt: "desc" },
    take: 5,
    select: { id: true, title: true, updatedAt: true },
  });
  const statusLabel = access.subscription ? getAgencyStatusLabel(access.subscription) : "Nog geen plan";
  const quotaError = errorCode === "AGENCY_QUOTA_REACHED";
  const activationPending = checkoutStatus === "success" && access.state !== "active";
  let onboardingItems: AgencyOnboardingItem[] = [];

  if (access.state === "active" && access.subscription && access.ownerUserId && canManageAgency(access)) {
    const [defaultTemplate, packs] = await Promise.all([
      prisma.agencyTemplate.findFirst({ where: { ownerId: access.ownerUserId, isDefault: true }, select: { id: true } }),
      prisma.agencyMatchPack.findMany({
        where: { userId: access.ownerUserId },
        orderBy: { updatedAt: "desc" },
        take: 100,
        select: { status: true, firstExportedAt: true, clientOutcome: true },
      }),
    ]);
    const approved = packs.some((pack) => pack.status === "approved");
    const exported = packs.some((pack) => Boolean(pack.firstExportedAt));
    const outcomeRecorded = packs.some((pack) => ["pending", "accepted", "rejected", "withdrawn"].includes(pack.clientOutcome));
    onboardingItems = [
      { id: "example", label: "Bekijk het fictieve MatchPack-voorbeeld", href: "/agency#voorbeeld", done: Boolean(access.subscription.onboardingExampleViewedAt), detail: "Zie welke bewijsregels intern blijven en wat een klant ontvangt." },
      { id: "retention", label: "Kies je bewaartermijn", href: "/agency/account/settings/privacy", done: Boolean(access.subscription.retentionPolicySetAt), detail: "Nieuwe accounts starten met 90 dagen; je kunt 30, 90, 180 of 365 dagen kiezen." },
      { id: "template", label: "Stel je bureautemplate in", href: "/agency/account/settings/templates", done: Boolean(defaultTemplate), detail: "Gebruik je logo-/huisstijlgegevens en herbruikbare exportinstellingen." },
      { id: "matchpack", label: "Maak je eerste MatchPack", href: "/agency/account/matchpack", done: packs.length > 0, detail: "Analyse en conceptreview gebruiken nog geen credit." },
      { id: "approval", label: "Controleer en keur het voorstel goed", href: "/agency/account/matchpack", done: approved, detail: "Bevestig bronbewijs, kandidaatdata, commerciële feiten en e-mail vóór goedkeuring." },
      { id: "export", label: "Download PDF of DOCX", href: "/agency/account/matchpack", done: exported, detail: "Full en contactvrije output komen uit dezelfde goedgekeurde snapshot." },
      { id: "outcome", label: "Leg de klantuitkomst vast", href: "/agency/account/matchpack", done: outcomeRecorded, detail: "Sla alleen een status en korte productfeedback op; geen kandidaattekst." },
    ];
  }

  return (
    <AgencyAccountShell currentPath="/agency/account" email={user.email} role={access.role}>
    <main className="wk-agency-main">
      <div className="wk-container wk-agency-container-narrow">
        {entryLocale === "en" ? <section className="wk-agency-alert wk-agency-alert-warning" lang="en" aria-label="Workspace language">
          <p className="font-bold">{AGENCY_WORKSPACE_LANGUAGE_NOTICE}</p>
          <p className="mt-2 text-sm">Choose “MatchPacks” to create a proposal, then select “English” under “Outputtaal” for English documents. Need help? Email <a href="mailto:contact@werkcv.nl" className="underline">contact@werkcv.nl</a>.</p>
          {activationPending ? <p className="mt-2 text-sm" role="status">Your payment confirmation is being processed. Refresh shortly; access will activate after confirmation.</p> : null}
        </section> : null}
        <section className="wk-agency-page-hero grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="wk-eyebrow">Agency account</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Jouw WerkCV MatchPack-workspace</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
              Maak complete kandidaatvoorstellen en losse kandidaat-CV&apos;s via jouw vaste WerkCV-route. Een nieuw document of definitief goedgekeurd voorstel gebruikt één van de {AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits.
            </p>
          </div>

          <div className="wk-agency-plan-summary">
            <p className="text-xs font-black uppercase tracking-[0.16em]">Agency billing tier</p>
            <p className="mt-2 text-4xl font-black">{monthlyPrice}</p>
            <p className="mt-2 text-sm font-bold">{statusLabel}</p>
            {access.subscription?.currentPeriodEnd ? (
              <p className="mt-1 text-xs font-semibold text-slate-700">
                Toegang tot {formatDate(access.subscription.currentPeriodEnd)}
              </p>
            ) : null}
          </div>
        </section>

        {activationPending ? (
          <div className="wk-agency-alert wk-agency-alert-warning" role="status">
            We verwerken je betaling. Vernieuw deze pagina over een moment; je krijgt toegang zodra de abonnementsbevestiging binnen is.
          </div>
        ) : null}

        {quotaError ? (
          <div className="wk-agency-alert wk-agency-alert-danger" role="alert">
            De maandlimiet van {AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits is bereikt. Bestaande documenten en voorstellen blijven beschikbaar.
          </div>
        ) : null}

        {needsAgencyRetentionAcknowledgement(access) ? (
          <div className="wk-agency-alert wk-agency-alert-warning">
            <p className="font-black">Kies eerst je bewaartermijn</p>
            <p className="mt-1">Je bestaande MatchPack-inhoud wordt niet stilzwijgend verwijderd. Kies in Instellingen een retentiebeleid voordat automatische verwijdering actief wordt.</p>
            <Link href="/agency/account/settings/privacy" className="wk-button wk-button-secondary mt-3">Retentiebeleid instellen</Link>
          </div>
        ) : null}

        {access.state === "active" ? (
          <AgencyPrimaryActions
            canCreate={access.canCreate && access.isOwner && canCreateAgencyWork(access)}
            hasSavedDocuments={documents.length > 0}
          />
        ) : null}

        {onboardingItems.length && !access.subscription?.onboardingDismissedAt ? (
          <AgencyOnboardingChecklist items={onboardingItems} compact />
        ) : null}

        <AgencyDraftResume canCreate={access.state === "active" && access.canCreate && access.isOwner && canCreateAgencyWork(access)} />

        {access.state === "active" && access.period ? (
          <section className="wk-agency-panel wk-agency-usage-card">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Gebruik deze periode</p>
                <p className="mt-1 text-3xl font-black">{access.used} / {access.period.allowance} CV-credits</p>
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
          </section>
        ) : access.state === "none" ? (
          <section className="wk-agency-panel">
            <h2 className="text-2xl font-black">Nog geen Agency billing tier gekoppeld</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Start via de agency-pagina of gebruik hetzelfde e-mailadres als tijdens checkout.</p>
            <Link href="/agency" className="wk-button wk-button-primary mt-5">
              Bekijk MatchPack voor bureaus
            </Link>
          </section>
        ) : (
          <section className="wk-agency-panel">
            <h2 className="text-2xl font-black">Toegang wordt gecontroleerd</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              De agency-account is nog niet actief. Gebruik hetzelfde e-mailadres als bij checkout en vernieuw deze pagina zodra de betaling is verwerkt.
            </p>
          </section>
        )}

        <section className="wk-agency-documents">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500">Laatste documenten</p>
              <h2 className="mt-1 text-2xl font-black">Recente bureau-CV-documenten</h2>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-bold"><Link href="/agency/account/matchpack" className="text-emerald-700 underline underline-offset-4">MatchPacks bekijken</Link><Link href="/agency" className="text-emerald-700 underline underline-offset-4">Productinformatie</Link></div>
          </div>
          <div className="wk-agency-list mt-4 divide-y divide-slate-100">
            {documents.length ? documents.map((document) => canViewAgencyWork(access) ? (
              <Link key={document.id} href={`/editor?id=${encodeURIComponent(document.id)}`} className="flex items-center justify-between gap-4 px-4 py-4 hover:bg-slate-50">
                <span className="min-w-0 truncate text-sm font-bold">{document.title || "Mijn CV"}</span>
                <span className="shrink-0 text-xs font-semibold text-slate-500">{formatDate(document.updatedAt)}</span>
              </Link>
            ) : (
              <div key={document.id} className="flex items-center justify-between gap-4 px-4 py-4"><span className="min-w-0 truncate text-sm font-bold">{document.title || "Mijn CV"}</span><span className="shrink-0 text-xs font-semibold text-slate-500">{formatDate(document.updatedAt)}</span></div>
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
    </AgencyAccountShell>
  );
}
