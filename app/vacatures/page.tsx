import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getIndexableJobListingPages } from "@/lib/jobs/data";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Vacatures in Nederland voor Engelstaligen | WerkCV",
  description: "Geselecteerde vacatures in Nederland voor Engelstaligen en internationals, gekoppeld aan cv-hulp van WerkCV.",
};

export default async function VacaturesHubPage() {
  const pages = await getIndexableJobListingPages();
  const dutchPages = pages.filter((page) => page.page.path.startsWith("/vacatures/"));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-amber-50 to-orange-50 p-7 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Vacatures MVP</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Vacatures in Nederland voor Engelstaligen
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
            Deze eerste vacatureslaag is expres smal. We publiceren alleen routes met genoeg echte vacatures uit meerdere bedrijven, zodat de pagina&apos;s nuttig blijven voor zoekers en sterk blijven voor SEO.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {dutchPages.map((item) => (
            <Link
              key={item.page.id}
              href={item.page.path}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
            >
              <div className="text-sm font-medium text-slate-500">{item.companyCount} bedrijven</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{item.page.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.page.metaDesc}</p>
              <div className="mt-4 text-sm font-medium text-slate-950">{item.jobCount} actieve vacatures</div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}


