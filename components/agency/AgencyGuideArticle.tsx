import Link from "next/link";
import { AgencyContentLink, AgencyContentView } from "@/components/agency/AgencyContentAnalytics";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { AGENCY_CONTENT_MODIFIED, AGENCY_CONTENT_PUBLISHED } from "@/lib/agency-content";
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
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Voor bureaus", href: "/voor-bureaus" },
    { label: "Kennisbank", href: "/voor-bureaus/kennisbank" },
    { label: title, href: path },
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
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <AgencyContentView kind="guide" path={path} slug={slug} />
      <Breadcrumbs items={breadcrumbItems} />
      <article>
        <header className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Kennisbank voor bureaus · praktische gids</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700">{intro}</p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-600">
              <span className="border border-slate-300 bg-white px-3 py-2">Gepubliceerd 16 augustus 2026</span>
              <span className="border border-slate-300 bg-white px-3 py-2">{readingTime} leestijd</span>
              <span className="border border-slate-300 bg-white px-3 py-2">Operationele uitleg, geen juridisch advies</span>
            </div>
          </div>
          <aside className="border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Werkregel</p>
            <p className="mt-3 text-2xl font-black leading-tight">Maak de bron, de bewerking en de controleerbare uitkomst zichtbaar.</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">Een snellere workflow is pas bruikbaar wanneer een recruiter kan uitleggen wat er is veranderd en waarom.</p>
          </aside>
        </header>

        {sections.map((section, index) => (
          <section key={section.title} className={`${index % 2 === 0 ? "border-y-2 border-slate-950" : ""} py-12 sm:py-16`}>
            {section.eyebrow ? <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">{section.eyebrow}</p> : null}
            <h2 className="mt-3 text-3xl font-black tracking-tight">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">{paragraph}</p>)}
            {section.bullets?.length ? <ul className="mt-6 grid gap-3 md:grid-cols-2">{section.bullets.map((bullet) => <li key={bullet} className="border-2 border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-700"><span className="mr-2 font-black text-emerald-700">✓</span>{bullet}</li>)}</ul> : null}
            {section.table ? (
              <div className="mt-7 overflow-x-auto border-2 border-slate-950 bg-white">
                <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                  <thead className="bg-slate-950 text-white"><tr>{section.table.columns.map((column) => <th key={column} className="p-4">{column}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map((row) => <tr key={row[0]} className="border-t border-slate-200 align-top"><th className="p-4 font-black">{row[0]}</th><td className="p-4 leading-relaxed text-slate-600">{row[1]}</td><td className="p-4 leading-relaxed text-slate-600">{row[2]}</td></tr>)}</tbody>
                </table>
              </div>
            ) : null}
            {section.examples?.length ? (
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {section.examples.map((example) => (
                  <article key={example.label} className="border-2 border-slate-950 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-emerald-700">{example.label}</p>
                    {example.before ? <p className="mt-4 text-sm leading-relaxed text-rose-900"><span className="font-black">Voor:</span> {example.before}</p> : null}
                    {example.after ? <p className="mt-3 text-sm leading-relaxed text-emerald-900"><span className="font-black">Na:</span> {example.after}</p> : null}
                    {example.body ? <p className="mt-4 text-sm leading-relaxed text-slate-700">{example.body}</p> : null}
                  </article>
                ))}
              </div>
            ) : null}
          </section>
        ))}

        <section className="border-y-2 border-slate-950 py-12 sm:py-16">
          <h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-3">{faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4 open:border-slate-950"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}</div>
        </section>

        <section className="py-12 sm:py-16">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">Bronnen en afbakening</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Wat deze gids ondersteunt</h2>
          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-600">De bronnen hieronder ondersteunen de operationele uitleg. Ze vormen geen individueel juridisch advies en schrijven niet één verplicht bureauproces voor.</p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">{sources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="border-2 border-slate-950 bg-white p-5 transition-colors hover:bg-emerald-50"><h3 className="font-black text-emerald-800 underline decoration-2 underline-offset-4">{source.label}</h3><p className="mt-3 text-sm leading-relaxed text-slate-600">{source.note}</p></a>)}</div>
        </section>

        <section className="border-2 border-slate-950 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,205,21,1)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div><p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Van checklist naar workflow</p><h2 className="mt-2 max-w-2xl text-3xl font-black">{ctaTitle}</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">{ctaText}</p></div>
            <div className="flex shrink-0 flex-col gap-3">
              <AgencyContentLink href="/agency#voorbeeld" path={path} location="guide_bottom_sample" intent="sample" className="border-2 border-white bg-white px-5 py-3 text-center text-sm font-black text-slate-950">Bekijk het fictieve voorbeeld</AgencyContentLink>
              {slug === "cv-in-huisstijl-recruitmentbureau" ? <AgencyGuideSpecialLink href="/cv-maken-in-word" path={path} location="agency_guide_word_context" event="agency_docx_cta_clicked">Lees over Word-bestanden</AgencyGuideSpecialLink> : null}
              {slug === "cv-anonimiseren-recruitment" ? <AgencyGuideSpecialLink href="/agency#voorbeeld" path={path} location="agency_guide_redaction_context" event="agency_redaction_cta_clicked">Bekijk de versie zonder directe contactgegevens</AgencyGuideSpecialLink> : null}
              <AgencyContentLink href="/agency#plan" path={path} location="guide_bottom_product" intent="product" className="border-2 border-white bg-yellow-300 px-5 py-3 text-center text-sm font-black text-slate-950">Start Agency · €149/maand</AgencyContentLink>
            </div>
          </div>
        </section>

        <nav aria-label="Verder lezen" className="mt-10 flex flex-wrap gap-4 text-sm font-black"><Link href="/voor-bureaus/kennisbank" className="text-emerald-800 underline decoration-2 underline-offset-4">← Terug naar de kennisbank</Link><Link href="/voor-bureaus" className="text-emerald-800 underline decoration-2 underline-offset-4">Bekijk WerkCV voor bureaus</Link></nav>
      </article>
      <FAQJsonLd questions={faqs} />
      <JsonLd data={articleSchema} />
    </main>
  );
}
