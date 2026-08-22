import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/cv-tips/registry';
import { articleCategoryLabels, articleCategoryColors } from '@/lib/cv-tips/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
    title: 'CV Tips & Advies | Alles over CV Schrijven | WerkCV',
    description: 'Ontdek de beste tips voor het schrijven van een professioneel CV. Van profieltekst tot vaardigheden, van opmaak tot sollicitatietips.',
    keywords: ['cv tips', 'cv schrijven', 'cv advies', 'cv maken tips', 'sollicitatietips', 'cv hulp'],
    alternates: {
        canonical: 'https://werkcv.nl/cv-tips',
    },
    openGraph: {
        title: 'CV Tips & Advies | WerkCV',
        description: 'Ontdek de beste tips voor het schrijven van een professioneel CV.',
        type: 'website',
        locale: 'nl_NL',
    },
};

export default function CVTipsHub() {
    const allArticles = getAllArticles();
    const featured = getFeaturedArticles();
    const regular = allArticles.filter(a => !a.featured);

    // JSON-LD CollectionPage
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CV Tips & Advies',
        description: metadata.description,
        url: 'https://werkcv.nl/cv-tips',
        publisher: { "@id": "https://werkcv.nl/#organization" },
    };

    return (
        <main>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <div className="border-b border-[var(--wk-border)] bg-[var(--wk-surface)]">
                <div className="wk-container py-3">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'CV Tips', href: '/cv-tips' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <section className="wk-section">
                <div className="wk-container">
                    <span className="wk-badge wk-badge-accent mb-4">CV TIPS & ADVIES</span>
                    <h1 className="mb-6 text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                        <span className="wk-hero-highlight">CV Tips</span> &amp; Advies
                    </h1>
                    <p className="max-w-3xl text-xl leading-9 text-[var(--wk-ink-muted)]">
                        Alles wat je moet weten om een professioneel CV te schrijven dat opvalt.
                        Van structuur en inhoud tot opmaak en sollicitatietips.
                    </p>
                    <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--wk-ink-muted)]">
                        Heb je je basis al op LinkedIn staan? Gebruik dan ook{" "}
                        <Link href="/tools/linkedin-naar-cv" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            LinkedIn naar cv omzetten
                        </Link>
                        {" "}om sneller van profiel naar sollicitatieversie te gaan.
                    </p>
                </div>
            </section>

            {/* Featured Articles */}
            {featured.length > 0 && (
                <section className="wk-section pt-0">
                    <div className="wk-container">
                        <h2 className="mb-8 text-3xl font-semibold text-[var(--wk-ink)]">Uitgelichte artikelen</h2>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {featured.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/cv-tips/${article.slug}`}
                                    className="wk-card group block p-6 transition-transform hover:-translate-y-0.5"
                                >
                                    <div className="mb-3 flex items-center gap-2">
                                        <span
                                            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--wk-surface-subtle)] px-2 py-0.5 text-xs font-semibold text-[var(--wk-ink)]"
                                        >
                                            <span
                                                className="h-2 w-2 rounded-full"
                                                style={{ backgroundColor: articleCategoryColors[article.category] }}
                                            />
                                            {articleCategoryLabels[article.category]}
                                        </span>
                                        <span className="text-xs font-medium text-[var(--wk-ink-muted)]">
                                            {article.readingTime} min lezen
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold leading-tight text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm leading-6 text-[var(--wk-ink-muted)] line-clamp-3">
                                        {article.description}
                                    </p>
                                    <div className="mt-4 flex items-center text-sm font-semibold text-[var(--wk-primary)]">
                                        Lees meer
                                        <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Articles Grid */}
            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-8 text-3xl font-semibold text-[var(--wk-ink)]">Alle artikelen</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {regular.map((article) => (
                            <Link
                                key={article.slug}
                                href={`/cv-tips/${article.slug}`}
                                className="wk-card group block p-5 transition-transform hover:-translate-y-0.5"
                            >
                                <div className="mb-2 flex items-center gap-2">
                                    <span
                                        className="inline-flex items-center gap-1.5 rounded-full bg-[var(--wk-surface-subtle)] px-2 py-0.5 text-xs font-semibold text-[var(--wk-ink)]"
                                    >
                                        <span
                                            className="h-2 w-2 rounded-full"
                                            style={{ backgroundColor: articleCategoryColors[article.category] }}
                                        />
                                        {articleCategoryLabels[article.category]}
                                    </span>
                                    <span className="text-xs font-medium text-[var(--wk-ink-muted)]">
                                        {article.readingTime} min
                                    </span>
                                </div>
                                <h3 className="mb-2 text-lg font-semibold leading-tight text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                    {article.title}
                                </h3>
                                <p className="text-sm leading-6 text-[var(--wk-ink-muted)] line-clamp-2">
                                    {article.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="wk-section pt-0">
                <div className="wk-container text-center">
                    <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-accent-soft)] p-8 md:p-14">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--wk-primary)]">
                            Van tip naar overstap
                        </p>
                        <p className="mx-auto mb-6 max-w-3xl text-base leading-7 text-[var(--wk-ink-muted)]">
                            Ga je niet alleen je cv verbeteren, maar ook echt van baan wisselen? Gebruik dan ook de{" "}
                            <Link href="/baan-wisselen" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                                baan-wisselen checklist
                            </Link>
                            {" "}voor ontslagbrief, opzegtermijn en sollicitatiestappen.
                        </p>
                        <h2 className="mb-6 text-3xl font-semibold text-[var(--wk-ink)] md:text-4xl">
                            Klaar om je CV te maken?
                        </h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                            Pas deze tips direct toe. Maak binnen 5 minuten een professioneel CV
                            met onze templates. Eenmalig €4,99, geen abonnement.
                        </p>
                        <Link href="/templates" className="wk-button wk-button-primary px-10 py-5 text-xl">
                            Start je CV nu
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
