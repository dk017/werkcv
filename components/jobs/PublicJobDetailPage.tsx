import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import type { Job } from "@prisma/client";
import type { JobPageResult } from "@/lib/jobs/data";
import {
  buildInternationalSignals,
  buildJobCvTips,
  cleanJobText,
  descriptionParagraphs,
  formatLanguageHint,
  formatLocationLabel,
  formatPostedDate,
  formatRemoteMode,
  formatRoleFamily,
  formatSeniority,
  pickPrimaryJobCta,
} from "@/lib/jobs/format";

type PublicJobDetailPageProps = {
  result: JobPageResult;
};

function jobPostingJsonLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: cleanJobText(job.descriptionText),
    datePosted: job.postedAt?.toISOString(),
    employmentType: job.employmentType || undefined,
    directApply: false,
    identifier: {
      "@type": "PropertyValue",
      name: job.provider,
      value: job.externalId,
    },
    hiringOrganization: {
      "@type": "Organization",
      name: job.companyName,
    },
    jobLocationType: job.remoteMode === "remote" ? "TELECOMMUTE" : undefined,
    jobLocation:
      job.city || job.countryCode
        ? {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.city || undefined,
              addressCountry: job.countryCode || undefined,
            },
          }
        : undefined,
    applicantLocationRequirements: job.countryCode
      ? {
          "@type": "Country",
          name: job.countryCode,
        }
      : undefined,
    validThrough: job.expiresAt?.toISOString(),
    url: `https://werkcv.nl${job.routePath}`,
  };
}

export default function PublicJobDetailPage({ result }: PublicJobDetailPageProps) {
  const { job, relatedJobs, relatedListings } = result;
  const primaryCta = pickPrimaryJobCta(job);
  const description = descriptionParagraphs(job.descriptionText, 3);
  const cvTips = buildJobCvTips(job);
  const internationalSignals = buildInternationalSignals(job);
  const postedLabel = formatPostedDate(job.postedAt);
  const roleLabel = formatRoleFamily(job.roleFamily);
  const seniorityLabel = formatSeniority(job.seniority);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Jobs", href: "/jobs" },
        { label: job.title, href: job.routePath },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
      />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-sky-50 p-7 shadow-sm sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
            <div className="max-w-4xl space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                {job.companyName}
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                {job.title}
              </h1>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
                  {formatLocationLabel(job)}
                </span>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-sky-800">
                  {formatLanguageHint(job.languageHint)}
                </span>
                {roleLabel && (
                  <span className="rounded-full bg-violet-100 px-3 py-1 text-violet-800">
                    {roleLabel}
                  </span>
                )}
                {seniorityLabel && (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-rose-800">
                    {seniorityLabel}
                  </span>
                )}
                {job.remoteMode && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-800">
                    {formatRemoteMode(job.remoteMode)}
                  </span>
                )}
                {postedLabel && (
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">
                    Posted {postedLabel}
                  </span>
                )}
              </div>
              <p className="text-base leading-8 text-slate-700 sm:text-lg">
                {job.excerpt || cleanJobText(job.descriptionText)}
              </p>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-2xl bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Open original job
              </a>
              <Link
                href={primaryCta.href}
                className="mt-3 block rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                {primaryCta.label}
              </Link>
              <Link
                href="/tools/ats-cv-checker"
                className="mt-3 block rounded-2xl border border-slate-300 px-4 py-3 text-center text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
              >
                Check your CV for ATS issues
              </Link>
            </aside>
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">Role summary</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
                {description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                CV moves that matter for this vacancy
              </h2>
              <ul className="mt-4 space-y-3">
                {cvTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-slate-900" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                International fit signals
              </h2>
              <ul className="mt-4 space-y-3">
                {internationalSignals.map((signal) => (
                  <li key={signal} className="flex items-start gap-3 text-sm leading-7 text-slate-700">
                    <span className="mt-2 h-2 w-2 rounded-full bg-sky-600" />
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className="space-y-4">
            {relatedListings.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">Related job routes</h2>
                <div className="mt-4 grid gap-3">
                  {relatedListings.map((listing) => (
                    <Link
                      key={listing.id}
                      href={listing.path}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
                    >
                      <div className="font-medium text-slate-950">{listing.title}</div>
                      <div className="mt-1 text-xs text-slate-500">{listing.metaDesc}</div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {relatedJobs.length > 0 && (
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-950">More relevant jobs</h2>
                <div className="mt-4 grid gap-3">
                  {relatedJobs.map((relatedJob) => (
                    <Link
                      key={relatedJob.id}
                      href={relatedJob.routePath}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-slate-300"
                    >
                      <div className="text-sm font-medium text-slate-950">{relatedJob.title}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {relatedJob.companyName} • {formatLocationLabel(relatedJob)}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}

