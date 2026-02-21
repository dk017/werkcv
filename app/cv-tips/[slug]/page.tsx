import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/cv-tips/registry';
import { getExampleBySlug } from '@/lib/cv-voorbeelden/registry';
import { articleCategoryLabels, articleCategoryColors } from '@/lib/cv-tips/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return getAllArticleSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return { title: 'Pagina niet gevonden | WerkCV.nl' };
    }

    return {
        title: article.metaTitle,
        description: article.metaDesc,
        keywords: article.keywords,
        alternates: {
            canonical: `https://werkcv.nl/cv-tips/${article.slug}`,
            languages: {
                'nl-NL': `https://werkcv.nl/cv-tips/${article.slug}`,
                'en-NL': 'https://werkcv.nl/en/guides',
                'x-default': `https://werkcv.nl/cv-tips/${article.slug}`,
            },
        },
        openGraph: {
            title: article.metaTitle,
            description: article.metaDesc,
            type: 'article',
            locale: 'nl_NL',
            url: `https://werkcv.nl/cv-tips/${article.slug}`,
            publishedTime: article.publishedAt,
            ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
        },
    };
}

export default async function ArticlePage({ params }: PageProps) {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        notFound();
    }

    const relatedArticles = getRelatedArticles(article, 3);

    // Resolve related CV examples
    const relatedExamples = article.relatedExampleSlugs
        .map(slug => {
            const [catSlug, exSlug] = slug.split('/');
            return getExampleBySlug(catSlug, exSlug);
        })
        .filter(Boolean);

    // JSON-LD Article schema
    const articleJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.metaDesc,
        datePublished: article.publishedAt,
        ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
        author: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
        },
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
            logo: {
                '@type': 'ImageObject',
                url: 'https://werkcv.nl/logo.png',
            },
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://werkcv.nl/cv-tips/${article.slug}`,
        },
    };

    // JSON-LD FAQPage schema (if FAQ exists)
    const faqJsonLd = article.faq.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: article.faq.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    } : null;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'CV Tips', href: '/cv-tips' },
        { label: article.title, href: `/cv-tips/${article.slug}` },
    ];

    // JSON-LD BreadcrumbList schema
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://werkcv.nl' },
            { '@type': 'ListItem', position: 2, name: 'CV Tips', item: 'https://werkcv.nl/cv-tips' },
            { '@type': 'ListItem', position: 3, name: article.title, item: `https://werkcv.nl/cv-tips/${article.slug}` },
        ],
    };

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Breadcrumbs */}
            <div className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <span
                            className="text-xs font-bold px-2 py-0.5 border-2 border-black"
                            style={{ backgroundColor: articleCategoryColors[article.category] }}
                        >
                            {articleCategoryLabels[article.category]}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">
                            {article.readingTime} min lezen
                        </span>
                        {article.updatedAt && (
                            <span className="text-sm text-gray-500 font-medium">
                                Bijgewerkt: {new Date(article.updatedAt).toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        )}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 leading-tight">
                        {article.title}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700">
                        {article.description}
                    </p>
                </div>
            </section>

            {/* Key Takeaways */}
            {article.keyTakeaways.length > 0 && (
                <section className="border-b-4 border-black bg-white">
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <div className="bg-[#4ECDC4]/10 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-[#4ECDC4] border-2 border-black flex items-center justify-center text-sm">
                                    &#x2713;
                                </span>
                                Kernpunten
                            </h2>
                            <ul className="space-y-2">
                                {article.keyTakeaways.map((takeaway, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <span className="text-[#4ECDC4] font-black mt-0.5">&#x2022;</span>
                                        {takeaway}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            )}

            {/* Table of Contents */}
            <div className="max-w-4xl mx-auto px-6 pt-8">
                <div className="bg-gray-50 border-3 border-black p-5 mb-8">
                    <h2 className="text-sm font-black uppercase tracking-wider text-gray-500 mb-3">
                        Inhoudsopgave
                    </h2>
                    <nav>
                        <ol className="space-y-1">
                            {article.sections.map((section, i) => (
                                <li key={section.id}>
                                    <a
                                        href={`#${section.id}`}
                                        className="text-sm text-gray-700 hover:text-[#FF6B6B] transition-colors flex items-center gap-2"
                                    >
                                        <span className="text-gray-400 font-mono text-xs w-5">{i + 1}.</span>
                                        {section.title}
                                    </a>
                                </li>
                            ))}
                            {article.faq.length > 0 && (
                                <li>
                                    <a
                                        href="#veelgestelde-vragen"
                                        className="text-sm text-gray-700 hover:text-[#FF6B6B] transition-colors flex items-center gap-2"
                                    >
                                        <span className="text-gray-400 font-mono text-xs w-5">&bull;</span>
                                        Veelgestelde vragen
                                    </a>
                                </li>
                            )}
                        </ol>
                    </nav>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-6 pb-12">
                <div className="space-y-10">
                    {article.sections.map((section) => (
                        <section key={section.id} id={section.id} className="scroll-mt-24">
                            <h2 className="text-2xl md:text-3xl font-black mb-4 text-gray-900">
                                {section.title}
                            </h2>
                            <div className="space-y-4">
                                {section.answerCapsule && (
                                    <div className="border-l-4 border-[#4ECDC4] bg-[#4ECDC4]/10 px-4 py-3">
                                        <p className="text-gray-900 font-semibold leading-snug">
                                            {section.answerCapsule}
                                        </p>
                                    </div>
                                )}
                                {section.content.map((paragraph, i) => (
                                    <p key={i} className="text-gray-700 leading-relaxed text-lg">
                                        {paragraph}
                                    </p>
                                ))}
                                {section.bullets && section.bullets.length > 0 && (
                                    <ul className="space-y-2 pl-1">
                                        {section.bullets.map((bullet, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-700">
                                                <span className="mt-2 h-2 w-2 bg-[#4ECDC4] border border-black rounded-full flex-shrink-0" />
                                                <span className="leading-relaxed">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </section>
                    ))}
                </div>

                {/* FAQ Section */}
                {article.faq.length > 0 && (
                    <section id="veelgestelde-vragen" className="mt-16 scroll-mt-24">
                        <h2 className="text-3xl font-black mb-8 text-gray-900">
                            Veelgestelde vragen
                        </h2>
                        <div className="space-y-4">
                            {article.faq.map((item, i) => (
                                <details
                                    key={i}
                                    className="group bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    <summary className="cursor-pointer p-5 font-bold text-lg flex items-center justify-between hover:bg-gray-50 transition-colors">
                                        {item.question}
                                        <svg className="w-5 h-5 flex-shrink-0 ml-4 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-5 pb-5 text-gray-700 leading-relaxed border-t-2 border-gray-100 pt-4">
                                        {item.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </section>
                )}

                {/* Inline CTA */}
                <div className="mt-12 p-6 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black text-xl mb-2 text-gray-900">
                        Direct aan de slag met je CV?
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Pas deze tips toe en maak binnen 5 minuten een professioneel CV.
                        Kies uit 13+ templates, vul je gegevens in en download als PDF.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link
                            href="/templates"
                            className="inline-block bg-black text-white font-bold px-6 py-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Maak je CV
                        </Link>
                        <Link
                            href="/cv-voorbeelden"
                            className="inline-block bg-white text-black font-bold px-6 py-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Bekijk CV voorbeelden
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related CV Examples */}
            {relatedExamples.length > 0 && (
                <section className="border-t-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">Gerelateerde CV voorbeelden</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedExamples.map((example) => example && (
                                <Link
                                    key={example.slug}
                                    href={`/cv-voorbeelden/${example.categorySlug}/${example.slug}`}
                                    className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    <span className="text-xs font-bold text-gray-400 uppercase">
                                        CV Voorbeeld
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B6B] transition-colors">
                                        {example.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {example.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Related Articles */}
            {relatedArticles.length > 0 && (
                <section className="border-t-4 border-black bg-gray-50">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">Meer artikelen</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/cv-tips/${related.slug}`}
                                    className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    <span
                                        className="text-xs font-bold px-2 py-0.5 border-2 border-black inline-block mb-2"
                                        style={{ backgroundColor: articleCategoryColors[related.category] }}
                                    >
                                        {articleCategoryLabels[related.category]}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B6B] transition-colors leading-tight">
                                        {related.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {related.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Begin vandaag met je CV
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Maak binnen 5 minuten een professioneel CV met onze templates en voorbeeldteksten.
                        Eenmalig $5, geen abonnement.
                    </p>
                    <Link
                        href="/templates"
                        className="inline-block bg-black text-white font-bold px-8 py-4 text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Maak je CV nu
                    </Link>
                </div>
            </section>
        </main>
    );
}
