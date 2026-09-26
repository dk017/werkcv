import Link from "next/link";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { CV_CHECK_PAGE_UPDATED, type CvCheckLandingContent } from "@/lib/cv-check/landing-content";

export default function CvCheckLanding({ content }: { content: CvCheckLandingContent }) {
  const isEnglish = content.locale === "en";
  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: isEnglish ? "WerkCV CV check" : "WerkCV CV-check",
    url: `https://werkcv.nl${content.path}`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    inLanguage: isEnglish ? "en" : "nl-NL",
    dateModified: CV_CHECK_PAGE_UPDATED.iso,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    description: content.intro,
  };

  return (
    <main>
      <FAQJsonLd questions={content.faq} />
      <JsonLd data={webApplicationJsonLd} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <Breadcrumbs items={content.breadcrumbs} />
          <p className="wk-eyebrow mt-4">{content.eyebrow}</p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl md:text-5xl">{content.h1}</h1>
          <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)] sm:text-lg sm:leading-8">{content.intro}</p>
          <p className="mt-2 text-sm text-[var(--wk-ink-muted)]">
            <time dateTime={CV_CHECK_PAGE_UPDATED.iso}>{content.updatedLabel}</time>
          </p>
          {/* Above the tool on larger screens; below it on phones so the upload box is in view sooner. */}
          <TrustPills pills={content.pills} className="mt-5 hidden flex-wrap gap-2 sm:flex" />
          <div className="mt-6 sm:mt-8">
            <CvCheckTool
              locale={content.locale}
              initialShowVacancy={content.variant === "vacancy"}
              entry={content.variant === "vacancy" ? "vacancy_mode" : "direct"}
              methodologyHref={content.methodologyHref}
              editorHref={content.editorHref}
            />
          </div>
          <TrustPills pills={content.pills} className="mt-4 flex flex-wrap gap-2 sm:hidden" />
          <p className="mt-4 text-sm">
            <Link href={content.switchLink.href} className="font-semibold underline underline-offset-4">
              {content.switchLink.label}
            </Link>
          </p>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.whatWeCheckTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.whatWeCheck.map((item) => (
              <div key={item.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--wk-ink-muted)]">{content.whatWeCheckNote}</p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.differenceTitle}</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 leading-7 text-[var(--wk-ink-muted)]">
            {content.difference.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <p className="mt-4 text-sm">
            <Link href={content.methodologyHref} className="font-semibold underline underline-offset-4">
              {isEnglish ? "Read how the grade is calculated" : "Lees hoe het cijfer wordt berekend"}
            </Link>
          </p>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.atsTitle}</h2>
          <div className="mt-4 space-y-4 leading-7 text-[var(--wk-ink-muted)]">
            {content.ats.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <h2 className="mt-10 text-2xl font-semibold text-[var(--wk-ink)]">{content.limitsTitle}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">{content.limits.doesLabel}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{content.limits.does}</p>
            </div>
            <div className="wk-card p-5">
              <h3 className="font-semibold text-[var(--wk-ink)]">{content.limits.doesNotLabel}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{content.limits.doesNot}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.faqTitle}</h2>
          <div className="mt-6 space-y-3">
            {content.faq.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">{content.relatedTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {content.related.map((item) => (
              <Link key={item.href} href={item.href} className="wk-card block p-5 transition hover:border-[var(--wk-ink)]">
                <span className="font-semibold text-[var(--wk-ink)]">{item.label}</span>
                <span className="mt-2 block text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustPills({ pills, className }: { pills: string[]; className: string }) {
  return (
    <div className={className}>
      {pills.map((pill) => (
        <span key={pill} className="wk-trust-pill">
          {pill}
        </span>
      ))}
    </div>
  );
}
