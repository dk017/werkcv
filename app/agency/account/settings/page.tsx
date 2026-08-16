import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { canCreateAgencyWork, getAgencyAccessForUser } from "@/lib/agency-access";
import AgencySettingsPanel from "@/components/agency/AgencySettingsPanel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AgencySettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect(`/login?next=${encodeURIComponent("/agency/account/settings")}`);
  const access = await getAgencyAccessForUser(user.id);

  return (
    <main className="min-h-screen bg-[#FFFEF9] px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-900 pb-5">
          <Link href="/agency/account" className="text-xl font-black tracking-tight">Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl</Link>
          <div className="flex flex-wrap items-center gap-4 text-sm font-semibold"><Link href="/agency/account" className="text-emerald-700 underline underline-offset-4">← Agency account</Link><span className="text-slate-500">{user.email}</span></div>
        </header>
        <section className="mt-8">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Workspace-instellingen</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">Team, templates en gegevensbeheer.</h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600">Maak de MatchPack-route herkenbaar voor je bureau, geef collega&apos;s precies de toegang die ze nodig hebben en houd zelf controle over opgeslagen agency-data.</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold"><Link href="/agency/account/insights" className="border-2 border-slate-900 bg-yellow-300 px-4 py-3">Inzichten bekijken</Link><Link href="/agency/privacy" className="border-2 border-slate-300 bg-white px-4 py-3 text-slate-700">Privacy, retentie en DPA</Link></div>
        </section>
        {access.state === "active" ? <AgencySettingsPanel owner={access.isOwner} canImport={canCreateAgencyWork(access) && access.remaining > 0} role={access.role} /> : <section className="mt-8 border-2 border-slate-900 bg-yellow-300 p-6"><h2 className="text-2xl font-black">Een actief Agency-abonnement is nodig</h2><p className="mt-2 text-sm font-semibold">Activeer eerst Agency om team- en template-instellingen te beheren.</p></section>}
      </div>
    </main>
  );
}
