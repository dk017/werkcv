import Link from "next/link";
import type { Job } from "@prisma/client";
import { descriptionExcerpt, formatLanguageHint, formatLocationLabel, formatPostedDate, formatRemoteMode } from "@/lib/jobs/format";

type PublicJobCardProps = {
  job: Job;
  locale: "nl" | "en";
  primaryCtaHref: string;
  primaryCtaLabel: string;
  showDetailLink?: boolean;
};

export default function PublicJobCard({
  job,
  locale,
  primaryCtaHref,
  primaryCtaLabel,
  showDetailLink = true,
}: PublicJobCardProps) {
  const detailLabel = locale === "nl" ? "Bekijk vacaturepagina" : "View job page";
  const applyLabel = locale === "nl" ? "Originele vacature" : "Open original job";
  const postedLabel = formatPostedDate(job.postedAt);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
          {job.companyName}
        </span>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
          {formatLocationLabel(job)}
        </span>
        <span className="rounded-full bg-sky-100 px-3 py-1 text-xs text-sky-800">
          {formatLanguageHint(job.languageHint)}
        </span>
        {job.remoteMode && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-800">
            {formatRemoteMode(job.remoteMode)}
          </span>
        )}
        {postedLabel && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs text-amber-800">
            {locale === "nl" ? `Geplaatst ${postedLabel}` : `Posted ${postedLabel}`}
          </span>
        )}
      </div>

      <h2 className="text-xl font-semibold tracking-tight text-slate-950">
        {showDetailLink ? (
          <Link href={job.routePath} className="hover:underline">
            {job.title}
          </Link>
        ) : (
          job.title
        )}
      </h2>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {descriptionExcerpt(job.excerpt || job.descriptionText, 240)}
      </p>

      {job.keywords.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {job.keywords.slice(0, 6).map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs text-slate-600"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        {showDetailLink && (
          <Link
            href={job.routePath}
            className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {detailLabel}
          </Link>
        )}
        <a
          href={job.applyUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
        >
          {applyLabel}
        </a>
        <Link
          href={primaryCtaHref}
          className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
        >
          {primaryCtaLabel}
        </Link>
      </div>
    </article>
  );
}
