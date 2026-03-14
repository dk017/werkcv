import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { EvaluatedJobListingPage } from "@/lib/jobs/data";
import PublicJobCard from "@/components/jobs/PublicJobCard";

type PublicJobListingPageProps = {
  result: EvaluatedJobListingPage;
};

export default function PublicJobListingPage({ result }: PublicJobListingPageProps) {
  const { page, jobs, jobCount, companyCount } = result;
  const locale = page.locale === "nl" ? "nl" : "en";
  const sectionLabel = locale === "nl" ? "Vacatures" : "Jobs";
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: page.title,
    description: page.metaDesc,
    inLanguage: locale === "nl" ? "nl-NL" : "en-NL",
    url: `https://werkcv.nl${page.path}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: jobs.length,
      itemListElement: jobs.slice(0, 25).map((job, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://werkcv.nl${job.routePath}`,
        name: `${job.title} at ${job.companyName}`,
      })),
    },
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: sectionLabel, href: page.locale === "nl" ? "/vacatures" : "/jobs" },
    { label: page.heroTitle || page.title, href: page.path },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-sky-50 to-cyan-50 p-7 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
            <div className="max-w-4xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Jobs MVP
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {page.heroTitle || page.title}
              </h1>
              <p className="text-base leading-8 text-slate-700 sm:text-lg">{page.description}</p>
              {page.introText && <p className="text-sm leading-7 text-slate-600 sm:text-base">{page.introText}</p>}
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {locale === "nl" ? "Vacatures" : "Jobs"}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">{jobCount}</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-wide text-slate-500">
                    {locale === "nl" ? "Bedrijven" : "Companies"}
                  </div>
                  <div className="mt-1 text-2xl font-semibold text-slate-950">{companyCount}</div>
                </div>
              </div>

              {page.primaryCtaHref && page.primaryCtaLabel && (
                <Link
                  href={page.primaryCtaHref}
                  className="mt-4 block rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {page.primaryCtaLabel}
                </Link>
              )}

              {page.relatedGuideHref && (
                <Link
                  href={page.relatedGuideHref}
                  className="mt-3 block rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
                >
                  {locale === "nl" ? "Bekijk gerelateerde gids" : "Open related guide"}
                </Link>
              )}
            </aside>
          </div>
        </section>

        <section className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
            <span>
              {locale === "nl"
                ? `${jobCount} actieve vacatures uit ${companyCount} bedrijven`
                : `${jobCount} active jobs across ${companyCount} companies`}
            </span>
            <span>
              {locale === "nl"
                ? "Selectie op NL-relevantie en internationale fit"
                : "Filtered for Netherlands relevance and international fit"}
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {jobs.map((job) => (
              <PublicJobCard
                key={job.id}
                job={job}
                locale={locale}
                primaryCtaHref={page.primaryCtaHref || "/en/dutch-cv-template"}
                primaryCtaLabel={page.primaryCtaLabel || "Build a Dutch CV in English"}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
