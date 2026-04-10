import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getEnglishWavePage, getEnglishWavePages } from '@/lib/seo-wave/data';
import CtaExperiment from '@/components/seo/CtaExperiment';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import ResumeTranslator from '@/components/translate/ResumeTranslator';
import SectionIntentLinks from '@/components/seo/SectionIntentLinks';
import { normalizeBrandCopy } from '@/lib/seo-branding';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getEnglishWavePages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getEnglishWavePage(slug);
    if (!page) return { title: 'Page not found | WerkCV' };

    const path = `/en/guides/${page.slug}`;
    const imageUrl = `https://werkcv.nl${path}/opengraph-image`;
    const metaTitle = normalizeBrandCopy(page.metaTitle);
    const metaDesc = normalizeBrandCopy(page.metaDesc);

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: page.keywords,
        alternates: {
            canonical: `https://werkcv.nl${path}`,
        },
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            type: 'article',
            siteName: 'WerkCV',
            locale: 'en_NL',
            url: `https://werkcv.nl${path}`,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: page.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@werkcvnl',
            title: metaTitle,
            description: metaDesc,
            images: [imageUrl],
        },
    };
}

export default async function EnglishWavePage({ params }: PageProps) {
    const { slug } = await params;
    const page = getEnglishWavePage(slug);
    if (!page) notFound();
    const metaDesc = normalizeBrandCopy(page.metaDesc);
    const primaryGuideHref = page.ctaHref || '/en/templates';
    const primaryGuideLabel = primaryGuideHref === '/en/editor' ? 'Open English editor' : 'Open English templates';

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title,
        description: metaDesc,
        inLanguage: 'en-NL',
        mainEntityOfPage: `https://werkcv.nl/en/guides/${page.slug}`,
        author: { '@type': 'Organization', name: 'WerkCV' },
    };
    const faqJsonLd = page.faq.length
        ? {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: page.faq.map((item) => ({
                  '@type': 'Question',
                  name: item.question,
                  acceptedAnswer: {
                      '@type': 'Answer',
                      text: item.answer,
                  },
              })),
          }
        : null;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'English Hub', href: '/en' },
        { label: 'Expat CV Guides', href: '/en/guides' },
        { label: page.title, href: `/en/guides/${page.slug}` },
    ];

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}

            {/* Breadcrumbs */}
            <div className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            <section className="border-b-4 border-black bg-gradient-to-br from-slate-50 via-sky-50 to-blue-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{page.title}</h1>
                    <p className="text-lg text-gray-700">{page.intro}</p>
                    {page.sources && page.sources.length > 0 && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-white border-3 border-black px-3 py-2 text-sm font-bold text-gray-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <span className="h-2.5 w-2.5 rounded-full bg-[#4ECDC4] border border-black" />
                            Based on Dutch hiring guidance and official sources
                        </div>
                    )}
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href={primaryGuideHref}
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-black text-white font-black text-sm border-3 border-black hover:bg-slate-900 transition-colors"
                        >
                            {primaryGuideLabel}
                        </Link>
                        <Link
                            href="/en/editor"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black font-black text-sm border-3 border-black hover:bg-slate-100 transition-colors"
                        >
                            Open English editor
                        </Link>
                        <Link
                            href="/en/guides"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-black font-black text-sm border-3 border-black hover:bg-slate-100 transition-colors"
                        >
                            Browse all expat guides
                        </Link>
                    </div>
                </div>
            </section>

            {page.slug === 'translate-resume-to-dutch-format' && (
                <div className="max-w-4xl mx-auto px-6 py-10">
                    <ResumeTranslator />
                </div>
            )}

            <article className="max-w-4xl mx-auto px-6 py-10">
                <div className="space-y-10">
                    {page.sections.map((section) => (
                        <section key={section.id} id={section.id}>
                            <h2 className="text-2xl md:text-3xl font-black mb-4 text-gray-900">
                                {section.title}
                            </h2>
                            <div className="space-y-4">
                                {section.paragraphs.map((paragraph, idx) => (
                                    <p key={idx} className="text-lg leading-relaxed text-gray-700">
                                        {paragraph}
                                    </p>
                                ))}
                                {section.bullets && section.bullets.length > 0 && (
                                    <ul className="space-y-2 pl-1">
                                        {section.bullets.map((bullet, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                                <span className="mt-2 h-2 w-2 bg-[#4ECDC4] border border-black rounded-full flex-shrink-0" />
                                                <span className="leading-relaxed">{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {section.exampleTitle && section.exampleItems && section.exampleItems.length > 0 && (
                                    <div className="mt-4 bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        <h3 className="text-base font-black mb-2 text-gray-900">{section.exampleTitle}</h3>
                                        <ul className="space-y-2">
                                            {section.exampleItems.map((item, idx) => (
                                                <li key={idx} className="text-gray-700 leading-relaxed">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <SectionIntentLinks links={section.intentLinks} locale="en" />
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-black mb-4 text-gray-900">Quick checklist</h2>
                    <ul className="space-y-3">
                        {page.checklist.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-gray-700">
                                <span className="w-6 h-6 bg-[#4ECDC4] border-2 border-black flex items-center justify-center text-sm font-black">
                                    ✓
                                </span>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl font-black mb-4 text-gray-900">FAQ</h2>
                    <div className="space-y-4">
                        {page.faq.map((item, idx) => (
                            <details key={idx} className="group bg-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <summary className="cursor-pointer p-4 font-bold flex items-center justify-between">
                                    {item.question}
                                    <span className="group-open:rotate-45 transition-transform text-xl">+</span>
                                </summary>
                                <p className="px-4 pb-4 text-gray-700">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="mt-12">
                    <h2 className="text-2xl font-black mb-4 text-gray-900">Related Resources</h2>
                    <div className="grid gap-4 md:grid-cols-3">
                        {page.relatedLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="block bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                            >
                                <h3 className="font-black text-sm text-gray-900 mb-1">{link.title}</h3>
                                <p className="text-sm text-gray-700">{link.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {page.sources && page.sources.length > 0 && (
                    <section className="mt-12">
                        <h2 className="text-2xl font-black mb-4 text-gray-900">Sources</h2>
                        <div className="space-y-4">
                            {page.sources.map((source) => (
                                <a
                                    key={source.href}
                                    href={source.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-white border-3 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform"
                                >
                                    <h3 className="font-black text-sm text-gray-900 mb-1">{source.label}</h3>
                                    {source.note && (
                                        <p className="text-sm text-gray-700">{source.note}</p>
                                    )}
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                <CtaExperiment
                    locale="en"
                    slug={page.slug}
                    href={page.ctaHref}
                    defaultTitle={page.ctaTitle}
                    defaultText={page.ctaText}
                    defaultButtonLabel="Open English templates"
                />
            </article>
        </main>
    );
}
