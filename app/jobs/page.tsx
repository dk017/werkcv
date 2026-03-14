import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getIndexableJobListingPages } from "@/lib/jobs/data";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Jobs in the Netherlands | WerkCV",
  description: "Curated English-friendly jobs in the Netherlands, paired with CV tools and Dutch-job-market guidance.",
};

export default async function JobsHubPage() {
  const pages = await getIndexableJobListingPages();
  const englishPages = pages.filter((page) => page.page.path.startsWith("/jobs/"));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-50 p-7 shadow-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Jobs MVP</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Jobs in the Netherlands
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">
            This is the first public jobs layer for WerkCV. We only surface routes that have enough live density across multiple employers, and every job route stays tied to CV help instead of acting like a generic board.
          </p>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {englishPages.map((item) => (
            <Link
              key={item.page.id}
              href={item.page.path}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300"
            >
              <div className="text-sm font-medium text-slate-500">{item.companyCount} companies</div>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{item.page.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.page.metaDesc}</p>
              <div className="mt-4 text-sm font-medium text-slate-950">{item.jobCount} active jobs</div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}

