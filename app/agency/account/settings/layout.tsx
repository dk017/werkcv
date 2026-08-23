import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import AgencyAccountShell from "@/components/agency/AgencyAccountShell";
import AgencySettingsNav from "@/components/agency/AgencySettingsNav";
import { getAgencySettingsContext } from "@/lib/agency-settings-context";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgencySettingsLayout({ children }: { children: ReactNode }) {
  const context = await getAgencySettingsContext();
  if (!context) {
    redirect(`/login?next=${encodeURIComponent("/agency/account/settings/organisation")}`);
  }
  const { user, access } = context;

  return (
    <AgencyAccountShell currentPath="/agency/account/settings" email={user.email} role={access.role}>
      <main className="wk-agency-main">
        <div className="wk-container wk-agency-container-narrow">
          <header className="wk-agency-page-hero">
            <p className="wk-eyebrow">Workspace-instellingen</p>
            <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Instellingen</h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">
              Beheer je organisatie, MatchPack-templates, teamtoegang, privacybeleid en gegevens op één voorspelbare plek.
            </p>
            {access.state === "active" ? <AgencySettingsNav /> : null}
          </header>

          {access.state === "active" ? children : (
            <section className="wk-agency-panel wk-agency-panel-warning">
              <h2 className="text-2xl font-black">Een actief Agency-abonnement is nodig</h2>
              <p className="mt-2 text-sm font-semibold">Activeer eerst Agency om de workspace-instellingen te beheren.</p>
            </section>
          )}
        </div>
      </main>
    </AgencyAccountShell>
  );
}
