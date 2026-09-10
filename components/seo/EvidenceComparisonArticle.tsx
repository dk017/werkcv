import Link from "next/link";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { EvidenceComparisonTable, type EvidenceComparisonRow } from "@/components/seo/EvidenceComparisonTable";

type ComparisonCard = { title: string; body: string };
type ComparisonSource = { label: string; href: string; note: string };
type ComparisonFaq = { question: string; answer: string };

export type EvidenceComparisonArticleProps = {
  locale: "nl" | "en";
  path: string;
  breadcrumbs: Array<{ label: string; href: string }>;
  eyebrow: string;
  title: string;
  description: string;
  reviewedLabel: string;
  modifiedDate: string;
  rows: EvidenceComparisonRow[];
  cardsTitle: string;
  cards: ComparisonCard[];
  methodTitle: string;
  method: string[];
  sources: ComparisonSource[];
  faqs: ComparisonFaq[];
  primaryCta: { href: string; label: string; trackingLocation: string };
  secondaryCta: { href: string; label: string };
  relatedLinks: Array<{ href: string; label: string; body: string }>;
  disclosure: string;
};

export default function EvidenceComparisonArticle({
  locale,
  path,
  breadcrumbs,
  eyebrow,
  title,
  description,
  reviewedLabel,
  modifiedDate,
  rows,
  cardsTitle,
  cards,
  methodTitle,
  method,
  sources,
  faqs,
  primaryCta,
  secondaryCta,
  relatedLinks,
  disclosure,
}: EvidenceComparisonArticleProps) {
  const pageUrl = `https://werkcv.nl${path}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: pageUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    dateModified: modifiedDate,
    inLanguage: locale === "en" ? "en-NL" : "nl-NL",
  };
  const labels = locale === "en"
    ? { source: "Sources and method", choice: "Choose by task", related: "Continue with the right guide", disclosure: "Editorial disclosure" }
    : { source: "Bronnen en methode", choice: "Kies op basis van je taak", related: "Ga verder met de juiste gids", disclosure: "Redactionele toelichting" };

  return (
    <main className="wk-editorial-page">
      <FAQJsonLd questions={faqs} />
      <JsonLd data={articleSchema} />
      <div className="wk-editorial-container px-4 py-6 sm:px-6 sm:py-10">
        <Breadcrumbs items={breadcrumbs} />
        <header className="wk-editorial-hero mt-6 grid min-w-0 gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,.85fr)] lg:items-end lg:p-10">
          <div className="min-w-0">
            <p className="wk-editorial-kicker">{eyebrow}</p>
            <h1 className="mt-4 break-words text-4xl font-extrabold leading-[1.05] tracking-[-0.05em] text-[var(--wk-ink)] sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[var(--wk-ink-muted)]">{description}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--wk-ink-muted)]">
              <span className="wk-trust-pill">{reviewedLabel}</span>
              <span className="wk-trust-pill">{locale === "en" ? "Evidence status shown" : "Bewijsstatus zichtbaar"}</span>
              <span className="wk-trust-pill">{locale === "en" ? "No universal winner" : "Geen universele winnaar"}</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLandingLink href={primaryCta.href} trackingLocation={primaryCta.trackingLocation} trackingLabel="start_editor" className="wk-button wk-button-primary">{primaryCta.label}</TrackedLandingLink>
              <Link href={secondaryCta.href} className="wk-button wk-button-secondary">{secondaryCta.label}</Link>
            </div>
          </div>
          <aside className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
            <p className="wk-eyebrow text-[var(--wk-highlight)]">{locale === "en" ? "Short answer" : "Kort antwoord"}</p>
            <p className="mt-4 text-2xl font-black leading-tight text-white">{locale === "en" ? "The right builder depends on your document, export and payment needs." : "De juiste maker hangt af van je document, uitvoer en betaalbehoefte."}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/75">{disclosure}</p>
          </aside>
        </header>

        <section className="wk-editorial-section px-0 py-10" aria-labelledby="comparison-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="wk-editorial-kicker">{locale === "en" ? "At a glance" : "In één oogopslag"}</p><h2 id="comparison-title" className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{locale === "en" ? "Compare the work each option is built for" : "Vergelijk het werk waarvoor elke optie bedoeld is"}</h2></div>
            <p className="max-w-sm text-sm leading-relaxed text-[var(--wk-ink-muted)]">{locale === "en" ? "A documented feature is not the same as a hands-on observation. The evidence column keeps that distinction visible." : "Een gedocumenteerde functie is niet hetzelfde als een eigen waarneming. De bewijs-kolom houdt dat verschil zichtbaar."}</p>
          </div>
          <EvidenceComparisonTable locale={locale} rows={rows} caption={locale === "en" ? "CV builder comparison" : "Vergelijking van CV-makers"} />
        </section>

        <section className="wk-editorial-section bg-[var(--wk-highlight-soft)] px-4 py-10 sm:px-8" aria-labelledby="choice-title">
          <p className="wk-editorial-kicker">{labels.choice}</p>
          <h2 id="choice-title" className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{cardsTitle}</h2>
          <div className="mt-7 grid min-w-0 gap-5 md:grid-cols-2 lg:grid-cols-3">{cards.map((card) => <article key={card.title} className="wk-editorial-card min-w-0 p-6"><h3 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--wk-ink)]">{card.title}</h3><p className="mt-3 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{card.body}</p></article>)}</div>
        </section>

        <section className="wk-editorial-section px-0 py-10" aria-labelledby="method-title">
          <p className="wk-editorial-kicker">{labels.source}</p>
          <h2 id="method-title" className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{methodTitle}</h2>
          <div className="mt-5 grid min-w-0 gap-5 lg:grid-cols-[1fr_1fr]"><div className="wk-editorial-card p-6"><ul className="space-y-3 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{method.map((item) => <li key={item} className="flex gap-3"><span className="font-black text-[var(--wk-success)]">✓</span><span>{item}</span></li>)}</ul></div><div className="grid min-w-0 gap-4">{sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="wk-editorial-card-link min-w-0 p-5"><h3 className="break-words font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4">{source.label}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{source.note}</p></a>)}</div></div>
        </section>

        <section className="wk-editorial-section bg-[var(--wk-surface-subtle)] px-4 py-10 sm:px-8" aria-labelledby="related-title">
          <p className="wk-editorial-kicker">{labels.related}</p><h2 id="related-title" className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{locale === "en" ? "Use the page that matches your question" : "Gebruik de pagina die bij je vraag past"}</h2>
          <div className="mt-7 grid min-w-0 gap-4 md:grid-cols-2">{relatedLinks.map((link) => <Link key={link.href} href={link.href} className="wk-editorial-card-link min-w-0 p-5"><h3 className="font-extrabold text-[var(--wk-ink)]">{link.label}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{link.body}</p></Link>)}</div>
        </section>

        <section className="wk-editorial-section px-0 py-10" aria-labelledby="faq-title"><p className="wk-editorial-kicker">FAQ</p><h2 id="faq-title" className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-[var(--wk-ink)]">{locale === "en" ? "Frequently asked questions" : "Veelgestelde vragen"}</h2><div className="mt-6 space-y-3">{faqs.map((faq) => <details key={faq.question} className="wk-editorial-card p-5"><summary className="cursor-pointer font-extrabold text-[var(--wk-ink)]">{faq.question}</summary><p className="mt-3 text-sm leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></section>

        <aside className="wk-card wk-card-dark mt-4 min-w-0 p-6 sm:p-8"><p className="wk-eyebrow text-[var(--wk-highlight)]">{labels.disclosure}</p><p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/75">{disclosure}</p></aside>
      </div>
    </main>
  );
}
