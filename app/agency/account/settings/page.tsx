import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canCreateAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import AgencySettingsPanel from "@/components/agency/AgencySettingsPanel";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgencySettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/settings")}`);
  const access = await getAgencyAccessForUser(user.id);

  return (
    <AgencyAccountShell currentPath="/agency/account/settings" email={user.email} role={access.role}>
    <main className="wk-agency-main">
      <div className="wk-container wk-agency-container-narrow">
        <section className="wk-agency-page-hero">
          <p className="wk-eyebrow">Workspace-instellingen</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Team, templates en gegevensbeheer.</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">Maak de MatchPack-route herkenbaar voor je bureau, geef collega&apos;s precies de toegang die ze nodig hebben en houd zelf controle over opgeslagen agency-data.</p>
          <div className="mt-5 flex flex-wrap gap-3"><Link href="/agency/account/insights" className="wk-button wk-button-primary">Inzichten bekijken</Link><Link href="/agency/privacy" className="wk-button wk-button-secondary">Privacy, retentie en DPA</Link></div>
        </section>
        {access.state === "active" ? <AgencySettingsPanel owner={access.isOwner} canImport={canCreateAgencyWork(access) && access.remaining > 0} role={access.role} /> : <section className="wk-agency-panel wk-agency-panel-warning"><h2 className="text-2xl font-black">Een actief Agency-abonnement is nodig</h2><p className="mt-2 text-sm font-semibold">Activeer eerst Agency om team- en template-instellingen te beheren.</p></section>}
      </div>
    </main>
    </AgencyAccountShell>
  );
}
