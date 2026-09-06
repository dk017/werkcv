import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import AgencyGuideSpecialLink from "@/components/agency/AgencyGuideSpecialLink";

export type AgencyGuideTable = {
  columns: [string, string, string];
  rows: Array<[string, string, string]>;
};

export type AgencyGuideSection = {
  eyebrow?: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  table?: AgencyGuideTable;
  examples?: Array<{ label: string; before?: string; after?: string; body?: string }>;
};

export type AgencyGuideSource = {
  label: string;
  href: string;
  note: string;
};

export type AgencyGuideArticleProps = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  readingTime: string;
  sections: AgencyGuideSection[];
  faqs: Array<{ question: string; answer: string }>;
  sources: AgencyGuideSource[];
  ctaTitle: string;
  ctaText: string;
};

export default function AgencyGuideArticle({
  slug,
  title,
  description,
  intro,
  readingTime,
  sections,
  faqs,
  sources,
  ctaTitle,
  ctaText,
}: AgencyGuideArticleProps) {
  const path = `/voor-bureaus/kennisbank/${slug}`;
  const route = getAgencyAcquisitionRoute(path);
  const heading = route?.h1 ?? title;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Voor bureaus", href: "/voor-bureaus" },
    { label: "Kennisbank", href: "/voor-bureaus/kennisbank" },
    { label: heading, href: path },
  ];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `https://werkcv.nl${path}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://werkcv.nl${path}` },
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    datePublished: AGENCY_CONTENT_PUBLISHED,
    dateModified: AGENCY_CONTENT_MODIFIED,
    inLanguage: "nl-NL",
  };
  const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");
  const publishedDate = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${AGENCY_CONTENT_PUBLISHED}T00:00:00.000Z`));
  const modifiedDate = new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${AGENCY_CONTENT_MODIFIED}T00:00:00.000Z`));

  return (
    <div className="wk-agency-marketing">
      <main className="wk-container py-8">
        <AgencyContentView kind="guide" path={path} slug={slug} />
        <Breadcrumbs items={breadcrumbItems} />
        <article>
          <header className="grid min-w-0 gap-8 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
            <div className="min-w-0">
              <p className="wk-eyebrow">Kennisbank voor bureaus · praktische gids</p>
              <h1 className="mt-5 break-words text-4xl font-black leading-[1.06] tracking-[-0.05em] sm:text-6xl">{heading}</h1>
              <p className="mt-6 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">{intro}</p>
              <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-[var(--wk-ink-muted)]">
                <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Gepubliceerd {publishedDate}</span>
                <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Bijgewerkt {modifiedDate}</span>
                <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">{readingTime} leestijd</span>
                <span className="rounded-full border border-[var(--wk-border)] bg-[var(--wk-surface)] px-3 py-2">Operationele uitleg, geen juridisch advies</span>
              </div>
            </div>
            <aside className="wk-card wk-card-dark min-w-0 p-6 sm:p-8">
              <p className="wk-eyebrow text-[var(--wk-highlight)]">Werkregel</p>
              <p className="mt-4 text-2xl font-black leading-tight text-white">Maak bron, bewerking en controleerbare uitkomst zichtbaar.</p>
              <p className="mt-4 text-sm font-medium leading-relaxed text-white/75">Een snellere workflow is pas bruikbaar wanneer een recruiter kan uitleggen wat er is veranderd en waarom.</p>
            </aside>
          </header>

          {sections.map((section, index) => (
            <section key={section.title} className={`wk-section ${index % 2 === 0 ? "border-y border-[var(--wk-border)]" : ""}`}>
              {section.eyebrow ? <p className="wk-eyebrow">{section.eyebrow}</p> : null}
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{paragraph}</p>)}
              {section.bullets?.length ? <ul className="mt-7 grid min-w-0 gap-3 md:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="wk-card min-w-0 p-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]"><span className="mr-2 font-black text-[var(--wk-success)]">✓</span>{bullet}</li>)}</ul> : null}
              {section.table ? (
                <div className="mt-8 overflow-x-auto rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface)]">
                  <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                    <thead className="bg-[var(--wk-surface-subtle)]"><tr>{section.table.columns.map((column) => <th key={column} className="p-4 text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--wk-ink-muted)]">{column}</th>)}</tr></thead>
                    <tbody>{section.table.rows.map((row) => <tr key={row[0]} className="border-t border-[var(--wk-border)] align-top"><th className="p-4 font-extrabold">{row[0]}</th><td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row[1]}</td><td className="p-4 font-medium leading-relaxed text-[var(--wk-ink-muted)]">{row[2]}</td></tr>)}</tbody>
                  </table>
                </div>
              ) : null}
              {section.examples?.length ? (
                <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2">
                  {section.examples.map((example) => (
                    <article key={example.label} className="wk-card min-w-0 p-5">
                      <p className="wk-eyebrow">{example.label}</p>
                      {example.before ? <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-danger)]"><span className="font-extrabold">Voor:</span> {example.before}</p> : null}
                      {example.after ? <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-success)]"><span className="font-extrabold">Na:</span> {example.after}</p> : null}
                      {example.body ? <p className="mt-4 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{example.body}</p> : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          ))}

          <section className="wk-section border-y border-[var(--wk-border)]">
            <p className="wk-eyebrow">FAQ</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Veelgestelde vragen</h2>
            <div className="mt-7 space-y-3">{faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div>
          </section>

          <section className="wk-section">
            <p className="wk-eyebrow">Bronnen en afbakening</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">Wat deze gids ondersteunt</h2>
            <p className="mt-4 max-w-4xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">De bronnen hieronder ondersteunen de operationele uitleg. Ze vormen geen individueel juridisch advies en schrijven niet één verplicht bureauproces voor.</p>
            <div className="mt-8 grid min-w-0 gap-4 md:grid-cols-2">{sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="wk-card min-w-0 p-5 transition-colors hover:bg-[var(--wk-accent-soft)]"><h3 className="font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4">{source.label}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{source.note}</p></a>)}</div>
          </section>

          <section className="wk-card wk-card-dark flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="min-w-0"><p className="wk-eyebrow text-[var(--wk-highlight)]">Van checklist naar workflow</p><h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">{ctaTitle}</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/75">{ctaText}</p></div>
            <div className="flex shrink-0 flex-col gap-3">
              <AgencyContentLink href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" path={path} location="guide_bottom_sample" intent="sample" className="wk-button wk-button-secondary">Bekijk het fictieve voorbeeld</AgencyContentLink>
              {slug === "cv-in-huisstijl-recruitmentbureau" ? <AgencyGuideSpecialLink href="/cv-maken-in-word" path={path} location="agency_guide_word_context" event="agency_docx_cta_clicked">Lees over Word-bestanden</AgencyGuideSpecialLink> : null}
              {slug === "cv-anonimiseren-recruitment" ? <AgencyGuideSpecialLink href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" path={path} location="agency_guide_redaction_context" event="agency_redaction_cta_clicked">Bekijk de contact-reduced versie</AgencyGuideSpecialLink> : null}
              <AgencyContentLink href="/agency#plan" path={path} location="guide_bottom_product" intent="product" className="wk-button wk-button-primary">Start MatchPack · {monthlyPrice}</AgencyContentLink>
            </div>
          </section>

          <nav aria-label="Verder lezen" className="mt-10 flex flex-wrap gap-4 text-sm font-extrabold"><Link href="/voor-bureaus/kennisbank" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">← Terug naar de kennisbank</Link><Link href="/voor-bureaus" className="text-[var(--wk-primary)] underline decoration-2 underline-offset-4">Bekijk WerkCV voor bureaus</Link></nav>
        </article>
        <FAQJsonLd questions={faqs} />
        <JsonLd data={articleSchema} />
      </main>
    </div>
  );
}
