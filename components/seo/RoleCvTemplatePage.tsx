import Link from "next/link";
import { FAQJsonLd } from "@/components/seo/JsonLd";

type RoleFaq = {
  question: string;
  answer: string;
};

type RelatedLink = {
  href: string;
  label: string;
};

type RoleCvTemplatePageProps = {
  roleLabel: string;
  pageTitle: string;
  intro: string;
  profileText: string;
  recruiterSignals: string[];
  bulletExamples: string[];
  checklist: string[];
  faqs: RoleFaq[];
  relatedLinks: RelatedLink[];
};

export default function RoleCvTemplatePage({
  roleLabel,
  pageTitle,
  intro,
  profileText,
  recruiterSignals,
  bulletExamples,
  checklist,
  faqs,
  relatedLinks,
}: RoleCvTemplatePageProps) {
  return (
    <div className="wk-editorial-page">
      <FAQJsonLd questions={faqs} />

      <main className="wk-editorial-main">
        <section className="wk-editorial-hero mb-14 grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <p className="wk-editorial-kicker mb-3">
              CV-template intent: {roleLabel}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--wk-ink)] md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="wk-button wk-button-primary"
              >
                Start dit CV in de editor
              </Link>
              <Link
                href="/templates"
                className="wk-button wk-button-secondary"
              >
                Vergelijk templates
              </Link>
            </div>
          </div>

          <div className="wk-editorial-card h-fit p-6">
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">Wat recruiters in dit CV direct zoeken</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {recruiterSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <article className="wk-editorial-card p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--wk-ink-muted)]">
              Voorbeeld profieltekst
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">
              Copy-ready profieltekst voor {roleLabel}
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{profileText}</p>
          </article>

          <article className="wk-editorial-card-dark p-6">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-yellow-300">
              Checklist
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.03em] text-white">Wat in dit CV moet terugkomen</h2>
            <ul className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              {checklist.map((item, index) => (
                <li key={item} className="flex gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/10 text-xs font-extrabold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mb-14">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--wk-ink-muted)]">
            Werkervaring bullets
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)]">
            Voorbeeld bullets die je direct kunt aanpassen
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {bulletExamples.map((example) => (
              <article
                key={example}
                className="wk-editorial-card p-5"
              >
                <p className="text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{example}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="wk-editorial-card mb-14 p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--wk-ink-muted)]">
            Handige vervolgroutes
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="wk-editorial-card-link px-4 py-3 text-sm font-extrabold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)]">Veelgestelde vragen</h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="wk-editorial-card group"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-extrabold text-[var(--wk-ink)]">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t border-[var(--wk-border)] px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="wk-editorial-card-dark px-6 py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                Klaar om je versie te bouwen?
              </p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-white">
                Zet deze voorbeeldstructuur direct om naar je eigen CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-white/85 sm:text-base">
                Gebruik de editor om profieltekst, werkervaring en layout meteen netjes af te ronden.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="wk-button wk-button-secondary"
              >
                Open CV editor
              </Link>
              <Link
                href="/templates"
                className="wk-button wk-button-primary"
              >
                Bekijk templates
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
