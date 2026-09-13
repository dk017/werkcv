import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import type { StudentCvGuideConfig } from "@/lib/student-cv-guides";
import { cvDownloadPrice } from "@/lib/site-content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function GuideCta({
  config,
  location,
  children,
  className = "wk-button wk-button-primary",
}: {
  config: StudentCvGuideConfig;
  location: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <TrackedLandingLink
      href={config.ctaHref}
      className={className}
      trackingLocation={location}
      trackingLabel={config.ctaLabel}
      startCvContext={{
        entryPoint: config.startSource,
        templateId: "professional",
        pagePath: config.path,
        uiLanguage: "nl",
      }}
    >
      {children}
    </TrackedLandingLink>
  );
}

export default function StudentCvGuidePage({ config }: { config: StudentCvGuideConfig }) {
  const canonicalUrl = `https://werkcv.nl${config.path}`;
  const articleJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.metaDescription,
    url: canonicalUrl,
    inLanguage: "nl-NL",
    dateModified: config.dateModified,
    ...(config.datePublished ? { datePublished: config.datePublished } : {}),
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
  };
  const faqJsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <main className="wk-editorial-page">
      <JsonLd data={articleJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="wk-editorial-breadcrumbs">
        <div className="wk-editorial-container px-6 py-3 sm:px-8 lg:px-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV gids", href: "/cv-gids" },
              { label: config.title, href: config.path },
            ]}
          />
        </div>
      </div>

      <section className="wk-editorial-hero mx-auto max-w-[1200px] p-6 sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(300px,0.92fr)] lg:items-start">
          <div className="min-w-0">
            <span className="wk-editorial-kicker mb-4">{config.eyebrow}</span>
            <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--wk-ink)] md:text-5xl">
              {config.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {config.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <GuideCta config={config} location="student_guide_hero">
                {config.ctaLabel}
              </GuideCta>
              <Link href="#voorbeeld" className="wk-button wk-button-secondary">
                Bekijk het voorbeeld
              </Link>
            </div>
            <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              Je start gratis en bekijkt eerst je volledige cv. Je betaalt eenmalig {cvDownloadPrice.display} inclusief btw voor de definitieve PDF-download. Geen abonnement. Hetzelfde gekochte cv kun je later opnieuw openen, aanpassen en downloaden zonder opnieuw te betalen.
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--wk-ink-muted)]">
              {config.audienceLabel} · {config.updatedLabel}
            </p>
          </div>

          <aside className="wk-editorial-card h-fit min-w-0 p-6 sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--wk-ink-muted)]">
              Wat je hier krijgt
            </p>
            <h2 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">
              Een voorbeeld dat je kunt controleren en aanpassen
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {["Een compleet fictief cv in gewone HTML-tekst", "Profielteksten voor verschillende startsituaties", "Praktische aanwijzingen zonder ervaring te verzinnen", "Een checklist voor verzending"].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--wk-success-soft)] font-black text-[var(--wk-success)]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section id="voorbeeld" className="wk-section scroll-mt-24 border-y border-[var(--wk-border)] bg-[var(--wk-surface)]">
        <div className="wk-container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="wk-eyebrow">Volledig fictief voorbeeld</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)] sm:text-4xl">
                Zo kan de inhoud eruitzien
              </h2>
            </div>
            <p className="max-w-md text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
              {config.example.note}
            </p>
          </div>

          <article className="wk-editorial-card mt-8 overflow-hidden">
            <header className="border-b border-[var(--wk-border)] bg-[var(--wk-highlight-soft)] p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">Kandidaatprofiel</p>
              <h3 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{config.example.name}</h3>
              <p className="mt-2 text-base font-semibold text-[var(--wk-ink-muted)]">{config.example.target}</p>
              <address className="mt-4 not-italic text-sm font-medium leading-7 text-[var(--wk-ink-muted)]">
                {config.example.contact.map((line) => <span key={line} className="mr-4 inline-block">{line}</span>)}
              </address>
            </header>
            <div className="grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
              <section className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">Profiel</p>
                <p className="mt-3 text-base font-medium leading-8 text-[var(--wk-ink-muted)]">{config.example.profile}</p>
              </section>
              <section className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">Opleiding, ervaring en vaardigheden</p>
                <div className="mt-4 space-y-5">
                  {config.example.entries.map((entry) => (
                    <div key={`${entry.label}-${entry.value}`} className="border-l-2 border-[var(--wk-accent)] pl-4">
                      <h4 className="text-base font-extrabold text-[var(--wk-ink)]">{entry.label}</h4>
                      <p className="mt-1 text-sm font-semibold leading-6 text-[var(--wk-ink)]">{entry.value}</p>
                      {entry.bullets?.length ? (
                        <ul className="mt-2 space-y-1 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">
                          {entry.bullets.map((bullet) => <li key={bullet} className="flex gap-2"><span className="font-black text-[var(--wk-success)]">•</span><span>{bullet}</span></li>)}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </article>
          <aside className="wk-editorial-card-muted mt-5 p-5 sm:p-6" aria-label="Waarom dit voorbeeld werkt">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">Waarom dit voorbeeld werkt</p>
            <ul className="mt-3 grid gap-2 md:grid-cols-3">
              {config.example.annotations.map((annotation) => <li key={annotation} className="text-sm font-semibold leading-6 text-[var(--wk-ink-muted)]"><span className="mr-2 font-black text-[var(--wk-success)]">✓</span>{annotation}</li>)}
            </ul>
          </aside>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container">
          <div className="max-w-3xl">
            <p className="wk-eyebrow">Profielteksten</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)] sm:text-4xl">Drie startpunten die je kunt aanpassen</h2>
            <p className="mt-4 text-base font-medium leading-relaxed text-[var(--wk-ink-muted)]">Kies de variant die het dichtst bij jouw situatie komt en vervang de details door je eigen, controleerbare voorbeelden.</p>
          </div>
          <div className="mt-8 grid min-w-0 gap-5 lg:grid-cols-3">
            {config.profileExamples.map((example, index) => (
              <article key={example.label} className="wk-editorial-card min-w-0 p-6">
                <p className="font-mono text-sm font-black text-[var(--wk-primary)]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-extrabold tracking-[-0.025em] text-[var(--wk-ink)]">{example.label}</h3>
                <p className="mt-4 text-sm font-medium leading-7 text-[var(--wk-ink-muted)]">{example.text}</p>
                <p className="mt-4 border-t border-[var(--wk-border)] pt-4 text-xs font-semibold leading-6 text-[var(--wk-ink-muted)]"><strong className="text-[var(--wk-ink)]">Waarom dit werkt:</strong> {example.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {config.weakImproved ? (
        <section className="wk-section border-y border-[var(--wk-border)] bg-[var(--wk-highlight-soft)]">
          <div className="wk-container">
            <p className="wk-eyebrow">Van vaag naar bewijsbaar</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">Maak motivatie bespreekbaar</h2>
            <div className="mt-7 grid min-w-0 gap-5 lg:grid-cols-2">
              <article className="wk-editorial-card-muted min-w-0 p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-ink-muted)]">Te algemeen</p>
                <p className="mt-3 text-lg font-semibold leading-8 text-[var(--wk-ink-muted)]">“{config.weakImproved.weak}”</p>
              </article>
              <article className="wk-editorial-card min-w-0 border-l-4 border-l-[var(--wk-success)] p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-success)]">Sterker en controleerbaar</p>
                <p className="mt-3 text-lg font-semibold leading-8 text-[var(--wk-ink)]">“{config.weakImproved.improved}”</p>
                <p className="mt-4 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">{config.weakImproved.explanation}</p>
              </article>
            </div>
          </div>
        </section>
      ) : null}

      <section className="wk-section">
        <div className="wk-container">
          <div className="max-w-3xl">
            <p className="wk-eyebrow">Praktische aanpak</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)] sm:text-4xl">Werk van bewijs naar een rustige cv-pagina</h2>
          </div>
          <div className="mt-8 space-y-5">
            {config.guidance.map((section, index) => (
              <article key={section.title} className="wk-editorial-card grid min-w-0 gap-5 p-6 sm:p-7 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)]">
                <div>
                  <p className="font-mono text-sm font-black text-[var(--wk-primary)]">0{index + 1}</p>
                  <h3 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">{section.title}</h3>
                </div>
                <div className="min-w-0">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm font-medium leading-7 text-[var(--wk-ink-muted)]">{paragraph}</p>)}
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {section.bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm font-semibold leading-6 text-[var(--wk-ink-muted)]"><span className="font-black text-[var(--wk-success)]">✓</span><span>{bullet}</span></li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wk-section border-y border-[var(--wk-border)] bg-[var(--wk-surface)]">
        <div className="wk-container grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <p className="wk-eyebrow">Laatste controle</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">Checklist vóór je cv verstuurt</h2>
          </div>
          <ul className="grid min-w-0 gap-3 sm:grid-cols-2">
            {config.checklist.map((item) => <li key={item} className="wk-card min-w-0 p-4 text-sm font-semibold leading-6 text-[var(--wk-ink-muted)]"><span className="mr-2 font-black text-[var(--wk-success)]">✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container">
          <p className="wk-eyebrow">Volgende stap</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">Meer hulp voor jouw situatie</h2>
          <div className="mt-7 grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {config.relatedLinks.map((link) => <Link key={link.href} href={link.href} className="wk-editorial-card-link min-w-0 p-5"><h3 className="text-base font-extrabold text-[var(--wk-ink)]">{link.label}</h3><p className="mt-2 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">{link.description}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="wk-section border-y border-[var(--wk-border)] bg-[var(--wk-surface)]">
        <div className="wk-container">
          <p className="wk-eyebrow">FAQ</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">Veelgestelde vragen</h2>
          <div className="mt-7 space-y-3">
            {config.faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-extrabold text-[var(--wk-ink)]">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm font-medium leading-7 text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      {config.sources?.length ? (
        <section className="wk-section">
          <div className="wk-container">
            <p className="wk-eyebrow">Officiële bronnen</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">Lees de actuele uitleg</h2>
            <div className="mt-7 grid min-w-0 gap-4 md:grid-cols-3">
              {config.sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="wk-editorial-card-link min-w-0 p-5"><h3 className="text-base font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4">{source.label}</h3><p className="mt-3 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">{source.note}</p></a>)}
            </div>
          </div>
        </section>
      ) : null}

      <section className="wk-section">
        <div className="wk-container">
          <div className="wk-editorial-card-dark flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="min-w-0">
              <p className="wk-eyebrow text-[var(--wk-highlight)]">Van voorbeeld naar eigen cv</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-[-0.04em] text-white">{config.ctaLabel}</h2>
              <p className="mt-3 max-w-2xl text-sm font-medium leading-7 text-white/75">Begin gratis, pas de inhoud aan op jouw situatie en download pas wanneer de gegevens kloppen.</p>
            </div>
            <GuideCta config={config} location="student_guide_bottom" className="wk-button wk-button-secondary shrink-0">{config.ctaLabel}</GuideCta>
          </div>
        </div>
      </section>
    </main>
  );
}
