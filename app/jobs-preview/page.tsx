import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { descriptionExcerpt, loadJobsPreview } from "@/lib/jobs/preview";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jobs Preview - WerkCV.nl",
  description: "Interne preview van NL-relevante jobs uit de ingestion pipeline.",
  robots: { index: false, follow: false },
};

export default async function JobsPreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; company?: string }>;
}) {
  const { q = "", company = "" } = await searchParams;
  const preview = await loadJobsPreview();
  const query = q.trim().toLowerCase();

  const filteredPages = preview.pages.filter((page) => {
    if (company && page.normalizedJob.companyName !== company) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = [
      page.normalizedJob.companyName,
      page.normalizedJob.title,
      page.normalizedJob.locationRaw,
      page.normalizedJob.roleFamily || "",
      page.normalizedJob.seniority || "",
      page.normalizedJob.descriptionText,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Internal Jobs Preview
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
                /jobs-preview
              </h1>
              <p className="text-sm leading-7 text-slate-600 sm:text-base">
                This page reads the locally generated jobs JSON. It is a review surface, not a live public jobs product.
                Descriptions are stored in the raw and normalized pipeline for classification, but this preview only shows short excerpts.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Preview pages</div>
                <div className="mt-1 text-2xl font-semibold text-slate-950">{preview.pageCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">English / NL jobs</div>
                <div className="mt-1 text-2xl font-semibold text-slate-950">{preview.englishJobCount}</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-500">Generated</div>
                <div className="mt-1 text-sm font-medium text-slate-950">
                  {preview.generatedAt ? new Date(preview.generatedAt).toLocaleString("nl-NL") : "No data yet"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <form className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px_auto_auto] lg:items-end">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Search</span>
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Company, title, location"
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Company</span>
              <select
                name="company"
                defaultValue={company}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900"
              >
                <option value="">All companies</option>
                {preview.companies.map((companyName) => (
                  <option key={companyName} value={companyName}>
                    {companyName}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Filter
            </button>

            <Link
              href="/jobs-preview"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
            >
              Reset
            </Link>
          </form>
        </div>

        {!preview.generatedAt ? (
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900 shadow-sm">
            No derived jobs data found yet. Run the jobs pipeline first: fetch, normalize, classify, export.
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between text-sm text-slate-600">
              <span>{filteredPages.length} jobs shown</span>
              <span>{preview.companies.length} companies in current preview set</span>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              {filteredPages.map((page) => {
                const job = page.normalizedJob;
                return (
                  <article
                    key={`${job.companyName}-${job.externalId}`}
                    className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
                        {job.companyName}
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                        {job.locationRaw || "Location unknown"}
                      </span>
                      <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800">
                        {job.languageHint || "unknown"}
                      </span>
                      {job.roleFamily && job.roleFamily !== "unknown" && (
                        <span className="rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-800">
                          {job.roleFamily}
                        </span>
                      )}
                      {job.seniority && job.seniority !== "unknown" && (
                        <span className="rounded-full bg-rose-100 px-3 py-1 text-xs text-rose-800">
                          {job.seniority}
                        </span>
                      )}
                      {job.remoteMode && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">
                          {job.remoteMode}
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-slate-950">{job.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {descriptionExcerpt(job.descriptionText)}
                    </p>

                    <div className="mt-4 space-y-2 text-xs text-slate-500">
                      <div>Planned route: <code className="rounded bg-slate-100 px-2 py-1 text-slate-700">{page.jobPath}</code></div>
                      <div>CTA: <code className="rounded bg-slate-100 px-2 py-1 text-slate-700">{page.primaryCtaHref}</code></div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={job.applyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                      >
                        Open original job
                      </a>
                      <Link
                        href={page.primaryCtaHref}
                        className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                      >
                        {page.primaryCtaLabel}
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
