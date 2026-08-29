import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { EnglishRoleExampleButton } from "./EnglishRoleExampleButton";
import { EnglishRoleUploadLink } from "./EnglishRoleUploadLink";
import { buildEnglishRoleExampleStartSource } from "@/lib/english-role-examples";
import type { CVData } from "@/lib/cv";
import { cvDownloadPrice } from "@/lib/site-content";

type SourceLink = {
  label: string;
  href: string;
  note: string;
  reviewedOn?: string;
};

type FAQ = {
  question: string;
  answer: string;
};

export type EnglishRoleCvExamplePageProps = {
  roleSlug: string;
  pagePath: `/en${string}`;
  eyebrow: string;
  h1: string;
  intro: string;
  themeColor: "emerald" | "teal" | "blue" | "amber";
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
  scanTitle: string;
  scanBody: string;
  scanChecks: string[];
  summaryLabel: string;
  experienceTitle: string;
  mistakesTitle: string;
  mistakes: string[];
  bottomTitle: string;
  bottomBody: string;
  sources: SourceLink[];
  faqs: FAQ[];
  relatedLinks?: { href: string; label: string }[];
  audience?: string;
  previewAlt?: string;
  fictionalLabel?: string;
  evidenceExamples?: Array<{
    claim: string;
    evidence: string;
    source: string;
    status?: "supported" | "partial" | "not shown";
  }>;
  noNumbersExample?: string;
  vocabulary?: Array<{ term: string; meaning: string; note?: string }>;
  localContext?: string;
  datePublished?: string;
  lastReviewed?: string;
};

const colorClasses = {
  emerald: {
    text: "text-emerald-700",
    heading: "text-emerald-800",
    border: "border-emerald-700",
    dot: "bg-emerald-600",
    button: "bg-emerald-500 hover:bg-emerald-400",
    hover: "hover:border-emerald-300",
  },
  teal: {
    text: "text-teal-700",
    heading: "text-teal-800",
    border: "border-teal-700",
    dot: "bg-teal-600",
    button: "bg-teal-500 hover:bg-teal-400",
    hover: "hover:border-teal-300",
  },
  blue: {
    text: "text-blue-700",
    heading: "text-blue-800",
    border: "border-blue-700",
    dot: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-500",
    hover: "hover:border-blue-300",
  },
  amber: {
    text: "text-amber-700",
    heading: "text-amber-800",
    border: "border-amber-700",
    dot: "bg-amber-600",
    button: "bg-amber-500 hover:bg-amber-400",
    hover: "hover:border-amber-300",
  },
};

export function EnglishRoleCvExamplePage({
  roleSlug,
  pagePath,
  eyebrow,
  h1,
  intro,
  themeColor,
  templateId,
  colorThemeId,
  sampleCV,
  scanTitle,
  scanBody,
  scanChecks,
  summaryLabel,
  experienceTitle,
  mistakesTitle,
  mistakes,
  bottomTitle,
  bottomBody,
  sources,
  faqs,
  relatedLinks = [],
  audience,
  previewAlt = "Fictional CV structure preview",
  fictionalLabel = "Fictional example — replace every detail before sending a CV",
  evidenceExamples = [],
  noNumbersExample,
  vocabulary = [],
  localContext,
  lastReviewed = "29 August 2026",
}: EnglishRoleCvExamplePageProps) {
  const classes = colorClasses[themeColor];
  const primaryExperience = sampleCV.experience[0];
  const experienceBullets = primaryExperience?.highlights ?? [];
  // Template comparison is a separate, blank-CV journey. It must not use the
  // filled-example source or it would inflate example starts and creations.
  const templateComparisonStartSource = "english_role_template_comparison";
  const uploadStartSource = buildEnglishRoleExampleStartSource(roleSlug, "upload") || "english_example_page";
  const uploadHref = `/en/editor?template=${encodeURIComponent(templateId)}&startSource=${encodeURIComponent(uploadStartSource)}&upload=1`;

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/en" },
              { label: "CV examples", href: "/en/dutch-cv-examples" },
              { label: sampleCV.personal.title || "CV example", href: pagePath },
            ]}
          />
        </div>
      </div>

      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className={`mb-3 text-xs font-bold uppercase tracking-[0.18em] ${classes.text}`}>{eyebrow}</p>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]">
              <span className={`rounded-full border px-3 py-1 ${classes.border} ${classes.text}`}>Fictional example</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-slate-600">Full structure preview</span>
            </div>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">{h1}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">{intro}</p>
            {audience ? <p className="mt-3 max-w-3xl text-sm font-semibold text-slate-600">For: {audience}</p> : null}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <EnglishRoleExampleButton
                templateId={templateId}
                colorThemeId={colorThemeId}
                sampleCV={sampleCV}
                roleSlug={roleSlug}
              />
              <TrackedLandingLink
                href={`/en/templates?startSource=${encodeURIComponent(templateComparisonStartSource)}`}
                trackingLocation={`${roleSlug}_example_hero`}
                trackingLabel="templates"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Choose another template
              </TrackedLandingLink>
              <EnglishRoleUploadLink
                href={uploadHref}
                roleSlug={roleSlug}
                templateId={templateId}
                className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Start with my own CV
              </EnglishRoleUploadLink>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-600">
              Edit free · preview before paying · one-time PDF price {cvDownloadPrice.displayEn} including VAT · no subscription.
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Reopen and edit the same CV later. After you pay for its PDF, you can download that same CV again without paying again; a separate new CV is separate. Payment methods can vary by country and payment provider.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 shadow-sm" role="img" aria-label={previewAlt}>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-500">{fictionalLabel}</p>
            <div className="rounded-md bg-white p-6 shadow-sm">
              <div className={`border-b-2 pb-3 ${classes.border}`}>
                <h2 className={`text-2xl font-bold ${classes.heading}`}>{sampleCV.personal.name}</h2>
                <p className="text-sm font-medium text-slate-600">{sampleCV.personal.title}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">{sampleCV.personal.summary}</p>
              {primaryExperience && (
                <div className="mt-5">
                  <h3 className={`text-xs font-bold uppercase tracking-[0.14em] ${classes.heading}`}>Experience</h3>
                  <p className="mt-2 text-sm font-bold text-slate-900">
                    {primaryExperience.role} - {primaryExperience.company}
                  </p>
                  <ul className="mt-2 space-y-2 text-xs leading-5 text-slate-700">
                    {experienceBullets.slice(0, 3).map((bullet) => (
                      <li key={bullet}>- {bullet}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-10">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${classes.text}`}>Use the structure, not the identity</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <div className="rounded-md bg-emerald-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">What to copy</h2>
              <p className="mt-3 leading-7 text-slate-700">Copy the order of sections, the action-led bullet pattern, and the way tools, context, quality, and outcomes are made easy to scan.</p>
            </div>
            <div className="rounded-md bg-amber-50 p-5">
              <h2 className="text-xl font-bold text-slate-950">What not to copy</h2>
              <p className="mt-3 leading-7 text-slate-700">Do not copy this name, employers, dates, certificates, language levels, responsibilities, or fictional metrics. Replace every claim with evidence from your own work.</p>
            </div>
          </div>
          <p className="mt-5 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">Bullet formula: action + system/equipment + scale or quality + result. If a part is not supported, leave it out or label it for confirmation.</p>
        </div>
      </section>

      <article className="mx-auto max-w-6xl px-5 py-12">
        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">{scanTitle}</h2>
            <p className="mt-4 leading-7 text-slate-700">{scanBody}</p>
          </div>
          <div className="grid gap-3">
            {scanChecks.map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                {item}
              </div>
            ))}
          </div>
        </section>

        {evidenceExamples.length > 0 ? (
          <section className="mt-14 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <p className={`text-xs font-bold uppercase tracking-[0.16em] ${classes.text}`}>Evidence map</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">How to make each bullet credible</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              Use this as a checking method: every client-facing claim should be traceable to a real CV detail. This fictional example is not proof about a real candidate.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {evidenceExamples.map((item) => (
                <div key={item.claim} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-slate-950">{item.claim}</p>
                    {item.status ? (
                      <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-600">{item.status}</span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-700"><strong>Evidence:</strong> {item.evidence}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Source: {item.source}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className={`text-xs font-bold uppercase tracking-[0.16em] ${classes.text}`}>Copy the structure, not the wording</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Example profile summary</h2>
            </div>
            <span className="text-sm font-semibold text-slate-500">{summaryLabel}</span>
          </div>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-700">{sampleCV.personal.summary}</p>
        </section>

        {primaryExperience && (
          <section className="mt-14">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">{experienceTitle}</h2>
            <div className="mt-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">{primaryExperience.role}</h3>
                  <p className="font-medium text-slate-600">
                    {primaryExperience.company}, {primaryExperience.location}
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-500">
                  {primaryExperience.start} - {primaryExperience.end}
                </p>
              </div>
              <ul className="mt-5 space-y-3">
                {experienceBullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <span className={`mt-2 h-2 w-2 flex-shrink-0 rounded-full ${classes.dot}`} />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Skills example</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {sampleCV.skills.map((skill) => (
                <span key={skill.name} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm font-semibold text-slate-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">Language and local fit</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Use English when the vacancy or employer works internationally, but keep Dutch-market details clear: location, language level, certificates, systems, and work-route details where relevant.
            </p>
          </div>
        </section>

        {(noNumbersExample || vocabulary.length > 0 || localContext) ? (
          <section className="mt-14 grid gap-5 lg:grid-cols-2">
            {noNumbersExample ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-800">No defensible number? Keep the claim useful.</p>
                <p className="mt-3 leading-7 text-slate-800">{noNumbersExample}</p>
              </div>
            ) : null}
            {localContext ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <p className={`text-xs font-bold uppercase tracking-[0.16em] ${classes.text}`}>Netherlands context</p>
                <p className="mt-3 leading-7 text-slate-700">{localContext}</p>
              </div>
            ) : null}
            {vocabulary.length > 0 ? (
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
                <p className={`text-xs font-bold uppercase tracking-[0.16em] ${classes.text}`}>English / Dutch vocabulary</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {vocabulary.map((item) => (
                    <div key={item.term} className="rounded-md bg-slate-50 p-3">
                      <p className="font-bold text-slate-950">{item.term} <span className="font-normal text-slate-500">· {item.meaning}</span></p>
                      {item.note ? <p className="mt-1 text-sm leading-5 text-slate-600">{item.note}</p> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </section>
        ) : null}

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">{mistakesTitle}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {mistakes.map((mistake) => (
              <div key={mistake} className="rounded-md border border-slate-200 bg-white p-4 text-sm font-medium leading-6 text-slate-700 shadow-sm">
                {mistake}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-xl bg-slate-950 p-7 text-white">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{bottomTitle}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">{bottomBody}</p>
            </div>
            <EnglishRoleExampleButton
              templateId={templateId}
              colorThemeId={colorThemeId}
              sampleCV={sampleCV}
              roleSlug={roleSlug}
              className={`inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${classes.button}`}
            />
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">FAQ</h2>
          <div className="mt-5 space-y-3">
            {faqs.map((item) => (
              <details key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <summary className="cursor-pointer font-bold text-slate-950">{item.question}</summary>
                <p className="mt-3 leading-7 text-slate-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">Sources checked</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700">
            Last reviewed on {lastReviewed}. These sources support the page guidance; the CV itself is fictional and should be adapted before use.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-colors ${classes.hover}`}
              >
                <span className="font-bold text-slate-950">{source.label}</span>
                <span className="mt-2 block text-sm leading-6 text-slate-600">{source.note}</span>
                {source.reviewedOn ? <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">Reviewed {source.reviewedOn}</span> : null}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm font-bold">
            {relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`${classes.text} underline`}>
                {link.label}
              </Link>
            ))}
            <Link href="/en/dutch-cv-examples" className={`${classes.text} underline`}>
              More Netherlands CV examples
            </Link>
            <Link href="/en/templates" className={`${classes.text} underline`}>
              English CV templates
            </Link>
            <Link href="/en/guides/cv-format-netherlands-english" className={`${classes.text} underline`}>
              English CV format guide
            </Link>
            <EnglishRoleUploadLink
              href={uploadHref}
              roleSlug={roleSlug}
              templateId={templateId}
              className={`${classes.text} underline`}
            >
              Start with my own CV
            </EnglishRoleUploadLink>
          </div>
        </section>
      </article>
    </main>
  );
}
