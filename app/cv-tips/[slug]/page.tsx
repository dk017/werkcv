import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticleSlugs, getArticleBySlug, getRelatedArticles } from '@/lib/cv-tips/registry';
import { getExampleBySlug } from '@/lib/cv-voorbeelden/registry';
import { articleCategoryLabels } from '@/lib/cv-tips/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import LinkedInToCvImporter from '@/components/translate/LinkedInToCvImporter';
import SectionIntentLinks from '@/components/seo/SectionIntentLinks';
import TrackedLandingLink from '@/components/analytics/TrackedLandingLink';
import { Fragment } from 'react';
import CitedAuthorityConversionBridge from '@/components/conversion/CitedAuthorityConversionBridge';
import { getCitedAuthorityRouteConfig } from '@/lib/cited-authority-conversion';
import { cvDownloadPrice } from '@/lib/site-content';
import { normalizeBrandCopy } from '@/lib/seo-branding';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getLanguageAlternates } from '@/lib/i18n/route-pairs';

interface PageProps {
    params: Promise<{ slug: string }>;
}

function toSchemaDate(date: string) {
    const parsed = new Date(`${date}T00:00:00.000Z`);
    return Number.isNaN(parsed.getTime()) ? date : parsed.toISOString();
}

export function generateStaticParams() {
    return getAllArticleSlugs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getArticleBySlug(slug);

    if (!article) {
        return { title: 'Pagina niet gevonden | WerkCV' };
    }

    const articleUrl = `https://werkcv.nl/cv-tips/${article.slug}`;
    const languageAlternates = getLanguageAlternates(`/cv-tips/${article.slug}`);
    const articleImageUrl = `${articleUrl}/opengraph-image`;
    const publishedTime = toSchemaDate(article.publishedAt);
    const modifiedTime = article.updatedAt ? toSchemaDate(article.updatedAt) : undefined;
    const metaTitle = normalizeBrandCopy(article.metaTitle);
    const metaDesc = normalizeBrandCopy(article.metaDesc);

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: article.keywords,
        alternates: {
            canonical: articleUrl,
            ...(languageAlternates ? { languages: languageAlternates } : {}),
        },
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            type: 'article',
            siteName: 'WerkCV',
            locale: 'nl_NL',
            url: articleUrl,
            publishedTime,
            ...(modifiedTime ? { modifiedTime } : {}),
            images: [
                {
                    url: articleImageUrl,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@werkcvnl',
            title: metaTitle,
            description: metaDesc,
            images: [articleImageUrl],
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
    const articleUrl = `https://werkcv.nl/cv-tips/${article.slug}`;
    const articleImageUrl = `${articleUrl}/opengraph-image`;
    const publishedTime = toSchemaDate(article.publishedAt);
    const modifiedTime = article.updatedAt ? toSchemaDate(article.updatedAt) : undefined;
    const englishCvCitedAuthorityConfig = article.slug === 'cv-maken-in-het-engels'
        ? getCitedAuthorityRouteConfig('/cv-tips/cv-maken-in-het-engels')
        : null;
    if (article.slug === 'cv-maken-in-het-engels' && !englishCvCitedAuthorityConfig) {
        throw new Error('Missing cited-authority English-CV route config');
    }
    const metaDesc = normalizeBrandCopy(article.metaDesc);
    const articleEditorCta = article.slug === 'cv-opleiding-vermelden'
        ? {
            href: '/editor?template=professional&startSource=nl_guide_cv_opleiding_vermelden',
            label: 'Maak je CV met een duidelijke opleidingssectie',
        }
        : article.slug === 'sollicitatie-bedankbrief'
            ? {
                href: '/editor?template=professional&startSource=nl_guide_sollicitatie_bedankbrief',
                label: 'Maak je CV voor je volgende sollicitatie',
            }
            : null;

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
        description: metaDesc,
        url: articleUrl,
        datePublished: publishedTime,
        dateModified: modifiedTime ?? publishedTime,
        image: [articleImageUrl],
        inLanguage: 'nl-NL',
        isAccessibleForFree: true,
        articleSection: articleCategoryLabels[article.category],
        keywords: article.keywords.join(', '),
        author: { "@id": "https://werkcv.nl/#organization" },
        publisher: { "@id": "https://werkcv.nl/#organization" },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
        },
        ...(article.sources?.length ? { citation: article.sources.map(source => source.url) } : {}),
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

    return (
        <main className="wk-editorial-article">
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
            {/* Breadcrumbs */}
            <div className="wk-editorial-breadcrumb border-b-4 border-black bg-white">
                <div className="wk-editorial-container max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="wk-editorial-article-hero border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
                <div className="wk-editorial-container max-w-4xl mx-auto px-6 py-12">
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <LanguageSwitcher tone="solid" />
                        <span
                            className="wk-editorial-kicker text-xs font-bold px-2 py-0.5"
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
                    {articleEditorCta ? (
                        <TrackedLandingLink
                            href={articleEditorCta.href}
                            trackingLocation={`cv-tip:${article.slug}:hero_primary`}
                            trackingLabel={articleEditorCta.label}
                            className="wk-button wk-button-primary mt-6"
                        >
                            {articleEditorCta.label}
                        </TrackedLandingLink>
                    ) : null}
                </div>
            </section>

            {/* Key Takeaways */}
            {article.keyTakeaways.length > 0 && (
                <section className="border-b-4 border-black bg-white">
                    <div className="wk-editorial-container max-w-4xl mx-auto px-6 py-8">
                        <div className="wk-editorial-card wk-editorial-card-muted p-6">
                            <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                                <span
                                    aria-hidden="true"
                                    className="wk-editorial-section-icon w-8 h-8 flex items-center justify-center"
                                >
                                    <span className="h-3 w-3 rounded-full bg-black" />
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

            {(article.slug === 'freelance-cv-maken' || article.slug === 'linkedin-samenvatting-schrijven') && (
                <section className="border-b-4 border-black bg-[#FFF7E8]">
                    <div className="wk-editorial-container max-w-4xl mx-auto px-6 py-8">
                        <div className="wk-editorial-card flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
                            <div className="max-w-2xl">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                                    Direct toepassen
                                </p>
                                <h2 className="mt-2 text-2xl font-black text-gray-900">
                                    {article.slug === 'freelance-cv-maken'
                                        ? 'Start met een vooraf ingevuld ZZP-CV'
                                        : 'Zet je LinkedIn-samenvatting om naar een ingevuld CV'}
                                </h2>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                                    {article.slug === 'freelance-cv-maken'
                                        ? 'Bekijk een opdrachtgerichte structuur met profieltekst, drie projecten, NDA-formulering en resultaatbullets. Vervang daarna de voorbeeldgegevens door je eigen bewijs.'
                                        : 'Plak je profieltekst, kies je doelrol en controleer de gegenereerde CV-structuur voordat je deze in de editor opent.'}
                                </p>
                            </div>
                            <Link
                                href={article.slug === 'freelance-cv-maken'
                                    ? '/cv-gids/cv-voorbeeld-zzper'
                                    : '/tools/linkedin-naar-cv#linkedin-tool'}
                                className="wk-button wk-button-primary flex-shrink-0"
                            >
                                {article.slug === 'freelance-cv-maken'
                                    ? 'Open het ZZP-voorbeeld'
                                    : 'Open LinkedIn naar CV'}
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {article.slug === 'linkedin-naar-cv' && (
                <section className="border-b-4 border-black bg-white">
                    <div className="wk-editorial-container max-w-4xl mx-auto px-6 py-10">
                        <LinkedInToCvImporter
                            uiLanguage="nl"
                            sourcePath="/cv-tips/linkedin-naar-cv"
                        />
                    </div>
                </section>
            )}

            {/* Table of Contents */}
            <div className="wk-editorial-container max-w-4xl mx-auto px-6 pt-8">
                <div className="wk-editorial-card wk-editorial-card-muted p-5 mb-8">
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
            <article className="wk-editorial-container max-w-4xl mx-auto px-6 pb-12">
                <div className="space-y-10">
                    {article.sections.map((section) => (
                        <Fragment key={section.id}>
                        <section id={section.id} className="scroll-mt-24">
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
                                <SectionIntentLinks links={section.intentLinks} locale="nl" />
                                {article.slug === 'foto-op-je-cv' && section.id === 'juiste-foto-kiezen' && (
                                    <div className="wk-editorial-card-muted mt-6 p-5">
                                        <h3 className="text-xl font-black text-gray-900">
                                            Geen professionele foto?
                                        </h3>
                                        <p className="mt-2 text-gray-800 font-semibold leading-relaxed">
                                            Maak online in 2 minuten een nette profielfoto voor je CV en LinkedIn.
                                            Je ziet eerst previewvarianten en betaalt pas bij downloaden.
                                        </p>
                                        <Link
                                            href="/profielfoto-cv-maken"
                                            className="wk-button wk-button-primary mt-4"
                                        >
                                            Maak profielfoto voor €9,99
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>
                        {englishCvCitedAuthorityConfig && section.id === 'structuur' ? (
                            <CitedAuthorityConversionBridge
                                config={englishCvCitedAuthorityConfig}
                                copy={{
                                    eyebrow: 'Maak de Engelse versie direct',
                                    heading: 'Open een Engelstalig CV met de juiste sectievolgorde',
                                    body: 'Je opent een Engelse editor met een Engelstalig CV. Bouw en bekijk de volledige versie gratis; controleer daarna elke vertaling en pas de inhoud aan op de vacature.',
                                    primaryLabel: 'Open Engelse CV-editor',
                                    pricingLabel: 'Bekijk prijs en betaalwijze',
                                }}
                            />
                        ) : null}
                        </Fragment>
                    ))}
                </div>

                {article.sources?.length ? (
                    <section id="bronnen" className="wk-editorial-section mt-16 scroll-mt-24 border-t-4 border-black pt-9">
                        <h2 className="text-3xl font-black mb-3 text-gray-900">Bronnen en controle</h2>
                        <p className="max-w-3xl text-gray-700 leading-relaxed">
                            Richtlijnen en productfuncties kunnen veranderen. Voor deze gids zijn de onderstaande
                            bronnen gecontroleerd. Controleer bij een concrete sollicitatie ook altijd de vacature,
                            de instructies van de werkgever en de officiële informatie van je onderwijsinstelling.
                        </p>
                        <ul className="mt-6 space-y-4">
                            {article.sources.map(source => (
                                <li key={source.url} className="wk-editorial-card p-4">
                                    <a
                                        href={source.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    className="font-extrabold text-[var(--wk-primary)] underline decoration-2 underline-offset-4"
                                    >
                                        {source.publisher}: {source.title}
                                    </a>
                                    <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">{source.note}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                ) : null}

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
                                    className="wk-editorial-card group"
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
                {!englishCvCitedAuthorityConfig ? <div className="wk-editorial-card-muted mt-12 p-6">
                    <h3 className="font-black text-xl mb-2 text-gray-900">
                        Direct aan de slag met je CV?
                    </h3>
                    <p className="text-gray-700 mb-4">
                        Pas deze tips toe en maak binnen 5 minuten een professioneel CV.
                        Kies uit 13+ templates, vul je gegevens in en download als PDF.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {articleEditorCta ? (
                            <TrackedLandingLink
                                href={articleEditorCta.href}
                                trackingLocation={`cv-tip:${article.slug}:inline_primary`}
                                trackingLabel={articleEditorCta.label}
                                className="wk-button wk-button-primary"
                            >
                                {articleEditorCta.label}
                            </TrackedLandingLink>
                        ) : (
                            <Link
                                href="/templates"
                                className="wk-button wk-button-primary"
                            >
                                Maak je CV
                            </Link>
                        )}
                        <Link
                            href="/cv-voorbeelden"
                            className="wk-button wk-button-secondary"
                        >
                            Bekijk CV voorbeelden
                        </Link>
                    </div>
                </div> : (
                    <div className="mt-12">
                        <CitedAuthorityConversionBridge
                            config={englishCvCitedAuthorityConfig}
                            copy={{
                                eyebrow: 'Klaar om je Engelse versie te schrijven?',
                                heading: 'Werk de Engelse inhoud direct uit in je volledige CV',
                                body: 'Open de Engelstalige editor bij je profiel en controleer daarna de volledige versie vóór je betaalt.',
                                primaryLabel: 'Open Engelse CV-editor',
                                pricingLabel: 'Bekijk prijs en betaalwijze',
                            }}
                            compact
                            instance="repeat"
                        />
                    </div>
                )}
            </article>

            {/* Related CV Examples */}
            {relatedExamples.length > 0 && (
                <section className="border-t-4 border-black bg-white">
                    <div className="wk-editorial-container max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">Gerelateerde CV voorbeelden</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedExamples.map((example) => example && (
                                <Link
                                    key={example.slug}
                                    href={`/cv-voorbeelden/${example.categorySlug}/${example.slug}`}
                                    className="wk-editorial-card-link group p-5"
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
                    <div className="wk-editorial-container max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">Meer artikelen</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedArticles.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/cv-tips/${related.slug}`}
                                    className="wk-editorial-card-link group p-5"
                                >
                                    <span
                                        className="wk-editorial-kicker mb-2 text-xs font-bold"
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
            {!englishCvCitedAuthorityConfig ? <section className="border-t-4 border-black bg-[var(--wk-accent-soft)]">
                <div className="wk-editorial-container max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Begin vandaag met je CV
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Maak binnen 5 minuten een professioneel CV met onze templates en voorbeeldteksten.
                        Eenmalig {cvDownloadPrice.display}, geen abonnement.
                    </p>
                    {articleEditorCta ? (
                        <TrackedLandingLink
                            href={articleEditorCta.href}
                            trackingLocation={`cv-tip:${article.slug}:bottom_primary`}
                            trackingLabel={articleEditorCta.label}
                            className="wk-button wk-button-primary text-lg"
                        >
                            {articleEditorCta.label}
                        </TrackedLandingLink>
                    ) : (
                        <Link
                            href="/templates"
                            className="wk-button wk-button-primary text-lg"
                        >
                            Maak je CV nu
                        </Link>
                    )}
                </div>
            </section> : null}
        </main>
    );
}

