import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  applicationHelpCategoryColors,
  applicationHelpCategoryLabels,
  ApplicationHelpExampleTone,
} from "@/lib/sollicitatiehulp/types";
import {
  getApplicationHelpArticle,
  getApplicationHelpArticleParams,
} from "@/lib/sollicitatiehulp/registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const exampleStyles: Record<ApplicationHelpExampleTone, string> = {
  recommended: "border-emerald-700 bg-emerald-50",
  alternative: "border-sky-700 bg-sky-50",
  avoid: "border-red-700 bg-red-50",
};

const exampleLabels: Record<ApplicationHelpExampleTone, string> = {
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
  return getApplicationHelpArticleParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getApplicationHelpArticle(slug);

  if (!article) {
    return { title: "Pagina niet gevonden | WerkCV" };
  }

  const url = `https://werkcv.nl/sollicitatiehulp/${article.slug}`;
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
    twitter: {
      card: "summary_large_image",
      title: article.metaTitle,
      description: article.metaDescription,
    },
  };
}

export default async function ApplicationHelpArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getApplicationHelpArticle(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://werkcv.nl/sollicitatiehulp/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: articleUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
    datePublished: toSchemaDate(article.publishedAt),
    dateModified: toSchemaDate(article.updatedAt),
    inLanguage: "nl-NL",
    isAccessibleForFree: true,
    articleSection: applicationHelpCategoryLabels[article.category],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
          </Link>
          <Link
            href="/sollicitatiehulp"
            className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black hover:bg-yellow-100"
          >
            Alle sollicitatiehulp
          </Link>
        </div>
      </header>

      <main>
        <div className="border-b-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-3">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Sollicitatiehulp", href: "/sollicitatiehulp" },
                { label: article.title, href: `/sollicitatiehulp/${article.slug}` },
              ]}
            />
          </div>
        </div>

        <section className="border-b-4 border-black bg-gradient-to-br from-white via-yellow-50 to-teal-50">
          <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="border-2 border-black px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black"
                style={{ backgroundColor: applicationHelpCategoryColors[article.category] }}
              >
                {applicationHelpCategoryLabels[article.category]}
              </span>
              <span className="text-sm font-bold text-slate-600">{article.readingTime} min lezen</span>
              <span className="text-sm font-bold text-slate-600">Bijgewerkt {formatDisplayDate(article.updatedAt)}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-5 max-w-4xl text-lg font-medium leading-relaxed text-slate-700 md:text-xl">
              {article.description}
            </p>

            <div className="mt-8 border-4 border-black bg-[#4ECDC4] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">Kort antwoord</p>
              <p className="mt-3 text-lg font-bold leading-relaxed text-black">{article.quickAnswer}</p>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <article className="min-w-0">
            <section className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black text-black">Dit moet je onthouden</h2>
              <ul className="mt-5 space-y-3">
                {article.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 font-medium leading-relaxed text-slate-700">
                    <span aria-hidden="true" className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-400 text-xs font-black">
                      ✓
                    </span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 space-y-14">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-8">
                  <h2 className="text-3xl font-black leading-tight text-black">{section.title}</h2>
                  {section.answer ? (
                    <p className="mt-4 border-l-4 border-[#4ECDC4] bg-white px-4 py-3 text-base font-bold leading-relaxed text-slate-900">
                      {section.answer}
                    </p>
                  ) : null}
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-lg font-medium leading-relaxed text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {section.bullets?.length ? (
                    <ul className="mt-6 space-y-3 border-4 border-black bg-white p-5">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 font-medium leading-relaxed text-slate-700">
                          <span aria-hidden="true" className="mt-2 h-2 w-2 flex-shrink-0 border border-black bg-[#4ECDC4]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {section.table ? (
                    <div className="mt-7 overflow-x-auto border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <table className="w-full min-w-[680px] border-collapse text-left">
                        <thead className="bg-black text-white">
                          <tr>
                            {section.table.headers.map((header) => (
                              <th key={header} scope="col" className="px-4 py-3 text-sm font-black">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, rowIndex) => (
                            <tr key={`${section.id}-${rowIndex}`} className="border-t-2 border-black even:bg-yellow-50">
                              {row.map((cell, cellIndex) => (
                                <td key={`${cell}-${cellIndex}`} className="px-4 py-4 align-top text-sm font-medium leading-relaxed text-slate-700">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {section.examples?.length ? (
                    <div className="mt-7 grid gap-4">
                      {section.examples.map((example) => (
                        <div key={`${example.label}-${example.text}`} className={`border-4 p-5 ${exampleStyles[example.tone]}`}>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="border-2 border-current bg-white px-2 py-0.5 text-xs font-black uppercase tracking-[0.14em]">
                              {exampleLabels[example.tone]}
                            </span>
                            <span className="text-sm font-black">{example.label}</span>
                          </div>
                          <p className="mt-3 text-lg font-black leading-relaxed text-black">“{example.text}”</p>
                          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{example.explanation}</p>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </section>
              ))}
            </div>

            <section id="bronnen" className="mt-16 scroll-mt-8 border-t-4 border-black pt-9">
              <h2 className="text-3xl font-black text-black">Bronnen en controle</h2>
              <p className="mt-3 max-w-3xl font-medium leading-relaxed text-slate-700">
                De feitelijke richtlijnen op deze pagina zijn gecontroleerd aan de onderstaande
                bronnen. De voorbeelden en keuzehulpen zijn door WerkCV vertaald naar concrete
                sollicitatiesituaties.
              </p>
              <ul className="mt-6 space-y-4">
                {article.sources.map((source) => (
                  <li key={source.url} className="border-2 border-black bg-white p-4">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-black text-black underline decoration-2 underline-offset-4"
                    >
                      {source.publisher}: {source.title}
                    </a>
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
                    <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-black text-black">
                      {faq.question}
                      <span aria-hidden="true" className="text-2xl transition-transform group-open:rotate-45">+</span>
                    </summary>
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
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="flex gap-2 text-sm font-bold leading-snug text-slate-700 hover:text-black hover:underline">
                      <span className="text-slate-400">{index + 1}.</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
                <li><a href="#bronnen" className="text-sm font-bold text-slate-700 hover:underline">Bronnen</a></li>
                <li><a href="#veelgestelde-vragen" className="text-sm font-bold text-slate-700 hover:underline">Veelgestelde vragen</a></li>
              </ol>
            </nav>

            <div className="mt-6 border-4 border-black bg-yellow-400 p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-xl font-black text-black">{article.primaryCta.label}</h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black/80">{article.primaryCta.description}</p>
              <Link href={article.primaryCta.href} className="mt-4 block border-3 border-black bg-black px-4 py-3 text-center text-sm font-black text-white">
                Start nu
              </Link>
            </div>
          </aside>
        </div>

        <section className="border-y-4 border-black bg-white">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Logisch vervolg</p>
            <h2 className="mt-2 text-3xl font-black text-black">Pas dit toe op je sollicitatie</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {article.related.map((related) => (
                <Link key={related.href} href={related.href} className="group border-4 border-black bg-[#FFFEF0] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span aria-hidden="true" className="text-xl font-black transition-transform group-hover:translate-x-1">→</span>
                  <h3 className="mt-2 text-lg font-black leading-tight text-black">{related.label}</h3>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{related.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#4ECDC4]">
          <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-black">{article.primaryCta.label}</h2>
              <p className="mt-3 font-medium leading-relaxed text-black/80">{article.primaryCta.description}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href={article.primaryCta.href} className="border-4 border-black bg-black px-6 py-3 font-black text-white">
                Begin direct
              </Link>
              {article.secondaryCta ? (
                <Link href={article.secondaryCta.href} className="border-4 border-black bg-white px-6 py-3 font-black text-black">
                  {article.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
