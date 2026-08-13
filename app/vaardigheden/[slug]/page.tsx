import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  getSkillGuideArticle,
  getSkillGuideParams,
} from "@/lib/vaardigheden-gids/registry";
import {
  skillGuideCategoryColors,
  skillGuideCategoryLabels,
} from "@/lib/vaardigheden-gids/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const exampleStyles = {
  recommended: "border-emerald-700 bg-emerald-50",
  alternative: "border-sky-700 bg-sky-50",
  avoid: "border-red-700 bg-red-50",
};

const exampleLabels = {
  recommended: "Aanbevolen",
  alternative: "Alternatief",
  avoid: "Vermijden",
};

function toSchemaDate(date: string): string {
  return new Date(`${date}T00:00:00.000Z`).toISOString();
}

function formatDisplayDate(date: string): string {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00.000Z`));
}

export function generateStaticParams() {
  return getSkillGuideParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getSkillGuideArticle(slug);
  if (!article) return { title: "Pagina niet gevonden | WerkCV" };

  const url = `https://werkcv.nl/vaardigheden/${article.slug}`;
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      locale: "nl_NL",
      siteName: "WerkCV",
      url,
      publishedTime: toSchemaDate(article.publishedAt),
      modifiedTime: toSchemaDate(article.updatedAt),
    },
  };
}

export default async function SkillGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getSkillGuideArticle(slug);
  if (!article) notFound();

  const url = `https://werkcv.nl/vaardigheden/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: toSchemaDate(article.publishedAt),
    dateModified: toSchemaDate(article.updatedAt),
    inLanguage: "nl-NL",
    isAccessibleForFree: true,
    articleSection: skillGuideCategoryLabels[article.category],
    keywords: article.keywords.join(", "),
    author: { "@id": "https://werkcv.nl/#organization" },
    publisher: { "@id": "https://werkcv.nl/#organization" },
    citation: article.sources.map((source) => source.url),
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
          </Link>
          <Link href="/vaardigheden" className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black hover:bg-yellow-50">
            Alle vaardigheden
          </Link>
        </div>
      </header>

      <main>
        <div className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <Breadcrumbs items={[
              { label: "Home", href: "/" },
              { label: "Vaardigheden", href: "/vaardigheden" },
              { label: article.title, href: `/vaardigheden/${article.slug}` },
            ]} />
          </div>
        </div>

        <section className="border-b-4 border-black bg-gradient-to-br from-white via-emerald-50 to-blue-50">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-[0.16em]"
                style={{ backgroundColor: skillGuideCategoryColors[article.category] }}
              >
                {skillGuideCategoryLabels[article.category]}
              </span>
              <span className="text-sm font-bold text-slate-600">{article.readingTime} min lezen</span>
              <span className="text-sm font-bold text-slate-600">Gecontroleerd {formatDisplayDate(article.updatedAt)}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">{article.title}</h1>
            <p className="mt-5 max-w-4xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl">{article.description}</p>
            <div className="mt-8 border-4 border-black bg-[#A7F3D0] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em]">Kort antwoord</p>
              <p className="mt-3 text-lg font-bold leading-relaxed text-black">{article.quickAnswer}</p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            <section className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black text-black">Kernpunten</h2>
              <ul className="mt-5 space-y-3">
                {article.keyTakeaways.map((item) => (
                  <li key={item} className="flex gap-3 font-medium leading-relaxed text-slate-700">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-xs font-black">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 space-y-14">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <h2 className="text-3xl font-black leading-tight text-black">{section.title}</h2>
                  {section.answer ? <p className="mt-4 border-l-4 border-[#4ECDC4] bg-white px-4 py-3 font-bold leading-relaxed text-slate-900">{section.answer}</p> : null}
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-lg font-medium leading-relaxed text-slate-700">{paragraph}</p>)}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-6 space-y-3 border-4 border-black bg-white p-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 font-medium leading-relaxed text-slate-700">
                          <span className="mt-2 h-2 w-2 flex-shrink-0 border border-black bg-[#4ECDC4]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {section.table ? (
                    <div className="mt-7 overflow-x-auto border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead className="bg-black text-white"><tr>{section.table.headers.map((header) => <th key={header} className="px-4 py-3 text-sm font-black">{header}</th>)}</tr></thead>
                        <tbody>{section.table.rows.map((row, rowIndex) => (
                          <tr key={`${section.id}-${rowIndex}`} className="border-t-2 border-black even:bg-emerald-50">
                            {row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className="px-4 py-4 align-top text-sm font-medium leading-relaxed text-slate-700">{cell}</td>)}
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  ) : null}
                  {section.examples?.length ? (
                    <div className="mt-7 grid gap-4">
                      {section.examples.map((example) => (
                        <div key={`${example.label}-${example.text}`} className={`border-4 p-5 ${exampleStyles[example.tone]}`}>
                          <span className="border-2 border-current bg-white px-2 py-0.5 text-xs font-black uppercase tracking-[0.14em]">{exampleLabels[example.tone]}</span>
                          <h3 className="mt-3 text-sm font-black text-black">{example.label}</h3>
                          <p className="mt-2 text-lg font-black leading-relaxed text-black">“{example.text}”</p>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{example.explanation}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <section id="bronnen" className="mt-16 scroll-mt-8 border-t-4 border-black pt-9">
              <h2 className="text-3xl font-black text-black">Bronnen en afbakening</h2>
              <p className="mt-3 font-medium leading-relaxed text-slate-700">
                Definities en vakinhoud zijn gecontroleerd aan de onderstaande bronnen. De werkvoorbeelden en cv-formuleringen zijn door WerkCV ontwikkeld voor concrete sollicitatiesituaties.
              </p>
              <ul className="mt-6 space-y-4">
                {article.sources.map((source) => (
                  <li key={source.url} className="border-2 border-black bg-white p-4">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-black text-black underline decoration-2 underline-offset-4">{source.publisher}: {source.title}</a>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{source.note}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section id="veelgestelde-vragen" className="mt-16 scroll-mt-8">
              <h2 className="text-3xl font-black text-black">Veelgestelde vragen</h2>
              <div className="mt-7 space-y-4">
                {article.faqs.map((faq) => (
                  <details key={faq.question} className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-black text-black">{faq.question}<span className="text-2xl transition-transform group-open:rotate-45">+</span></summary>
                    <p className="border-t-2 border-black px-5 py-4 font-medium leading-relaxed text-slate-700">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          <aside className="h-fit lg:sticky lg:top-6">
            <nav aria-label="Inhoudsopgave" className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Op deze pagina</p>
              <ol className="mt-4 space-y-3">
                {article.sections.map((section, index) => (
                  <li key={section.id}><a href={`#${section.id}`} className="flex gap-2 text-sm font-bold leading-snug text-slate-700 hover:underline"><span className="text-slate-400">{index + 1}.</span>{section.title}</a></li>
                ))}
                <li><a href="#bronnen" className="text-sm font-bold text-slate-700 hover:underline">Bronnen</a></li>
                <li><a href="#veelgestelde-vragen" className="text-sm font-bold text-slate-700 hover:underline">Veelgestelde vragen</a></li>
              </ol>
            </nav>
            <div className="mt-6 border-4 border-black bg-yellow-400 p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black text-black">{article.primaryCta.label}</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{article.primaryCta.description}</p>
              <Link href={article.primaryCta.href} className="mt-4 block border-3 border-black bg-black px-4 py-3 text-center text-sm font-black text-white">Start nu</Link>
            </div>
          </aside>
        </div>

        <section className="border-y-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <h2 className="text-3xl font-black text-black">Maak de volgende stap concreet</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {article.related.map((item) => (
                <Link key={item.href} href={item.href} className="border-4 border-black bg-[#FFFEF0] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h3 className="text-lg font-black text-black">{item.label}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
