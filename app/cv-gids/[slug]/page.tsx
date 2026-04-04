import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDutchWavePage, getDutchWavePages } from '@/lib/seo-wave/data';
import CtaExperiment from '@/components/seo/CtaExperiment';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import SectionIntentLinks from '@/components/seo/SectionIntentLinks';
import { normalizeBrandCopy } from '@/lib/seo-branding';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return getDutchWavePages().map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const page = getDutchWavePage(slug);
    if (!page) return { title: 'Pagina niet gevonden | WerkCV' };
    const path = `/cv-gids/${page.slug}`;
    const imageUrl = `https://werkcv.nl${path}/opengraph-image`;
    const metaTitle = normalizeBrandCopy(page.metaTitle);
    const metaDesc = normalizeBrandCopy(page.metaDesc);

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: page.keywords,
        alternates: {
            canonical: `https://werkcv.nl${path}`,
            languages: {
                'nl-NL': `https://werkcv.nl${path}`,
                'en-NL': 'https://werkcv.nl/en/guides',
                'x-default': `https://werkcv.nl${path}`,
            },
        },
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            type: 'article',
            siteName: 'WerkCV',
            locale: 'nl_NL',
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

export default async function DutchWavePage({ params }: PageProps) {
    const { slug } = await params;
    const page = getDutchWavePage(slug);
    if (!page) notFound();
    const metaDesc = normalizeBrandCopy(page.metaDesc);
    const heroProofPoints = [
        'Maak dit CV in 5 minuten',
        'ATS-vriendelijke templates',
        'Eenmalig betalen, geen abonnement',
    ];
    const heroWorkflow = [
        'Kies een rustige template die past bij jouw rol.',
        'Neem de beste zinnen uit dit voorbeeld direct over in de editor.',
        'Pas je CV per vacature aan en exporteer daarna als PDF.',
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: page.title,
        description: metaDesc,
        inLanguage: 'nl-NL',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://werkcv.nl/cv-gids/${page.slug}`,
        },
        author: { '@type': 'Organization', name: 'WerkCV', url: 'https://werkcv.nl' },
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV',
            logo: {
                '@type': 'ImageObject',
                url: 'https://werkcv.nl/logo.png',
            },
        },
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
        { label: 'CV Gidsen', href: '/cv-gids' },
        { label: page.title, href: `/cv-gids/${page.slug}` },
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

            <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                        <div>
                            <span className="inline-block bg-white text-sm font-black uppercase tracking-[0.18em] text-gray-700 px-3 py-1 mb-4 border-2 border-black">
                                CV Gids
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">{page.title}</h1>
                            <p className="text-lg text-gray-700 max-w-3xl">{page.intro}</p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    href={`${page.ctaHref}#quick-start`}
                                    className="inline-block border-4 border-black bg-yellow-300 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                                >
                                    Maak dit CV in 5 minuten
                                </Link>
                                <Link
                                    href="/cv-tips/cv-template-kiezen"
                                    className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
                                >
                                    Kies de juiste template
                                </Link>
                            </div>

                            <div className="mt-8 grid gap-3 sm:grid-cols-3">
                                {heroProofPoints.map((item) => (
                                    <div
                                        key={item}
                                        className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-gray-900"
                                        style={{ borderWidth: '3px' }}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                            <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
                                Direct toepassen
                            </p>
                            <h2 className="mt-2 text-2xl font-black text-gray-900">{page.ctaTitle}</h2>
                            <p className="mt-3 text-sm leading-relaxed text-gray-700">{page.ctaText}</p>

                            <div className="mt-5 space-y-3">
                                {heroWorkflow.map((item, index) => (
                                    <div key={item} className="flex gap-3">
                                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border-2 border-black bg-[#FFFEF9] text-sm font-black text-gray-900">
                                            {index + 1}
                                        </span>
                                        <p className="text-sm leading-relaxed text-gray-700">{item}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <Link
                                    href={`${page.ctaHref}#quick-start`}
                                    className="inline-block border-3 border-black bg-black px-5 py-3 text-sm font-black text-white"
                                    style={{ borderWidth: '3px' }}
                                >
                                    Start met je CV
                                </Link>
                                <Link
                                    href="/cv-maken"
                                    className="inline-block border-3 border-black bg-white px-5 py-3 text-sm font-black text-black"
                                    style={{ borderWidth: '3px' }}
                                >
                                    Hoe maak je een CV?
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

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
                                {section.comparisonTable && (
                                    <div className="overflow-hidden rounded-sm border-3 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                        <div className="grid grid-cols-[1.15fr_1fr_1fr] border-b-3 border-black bg-[#FFF4D6] text-sm font-black text-gray-900">
                                            {section.comparisonTable.columns.map((column) => (
                                                <div key={column} className="border-r-3 border-black px-4 py-3 last:border-r-0">
                                                    {column}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="divide-y-2 divide-black">
                                            {section.comparisonTable.rows.map((row) => (
                                                <div
                                                    key={row.label}
                                                    className="grid grid-cols-[1.15fr_1fr_1fr] text-sm leading-relaxed text-gray-700"
                                                >
                                                    <div className="border-r-2 border-black bg-[#FFFEF9] px-4 py-3 font-black text-gray-900">
                                                        {row.label}
                                                    </div>
                                                    <div className="border-r-2 border-black px-4 py-3">{row.primary}</div>
                                                    <div className="px-4 py-3">{row.secondary}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
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
                                <SectionIntentLinks links={section.intentLinks} locale="nl" />
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-12">
                    <h2 className="text-2xl font-black mb-4 text-gray-900">Snelle checklist</h2>
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
                    <h2 className="text-2xl font-black mb-4 text-gray-900">Veelgestelde vragen</h2>
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
                    <h2 className="text-2xl font-black mb-4 text-gray-900">Gerelateerde bronnen</h2>
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
                        <h2 className="text-2xl font-black mb-4 text-gray-900">Bronnen</h2>
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
                    locale="nl"
                    slug={page.slug}
                    href={page.ctaHref}
                    defaultTitle={page.ctaTitle}
                    defaultText={page.ctaText}
                    defaultButtonLabel="Start met je CV"
                />
            </article>
        </main>
    );
}
