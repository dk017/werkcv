import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getCategoryBySlug, getExamplesByCategory } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';
import { normalizeBrandCopy } from '@/lib/seo-branding';

interface PageProps {
    params: Promise<{ category: string }>;
}

export function generateStaticParams() {
    return getAllCategories().map((cat) => ({
        category: cat.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        return { title: 'Pagina niet gevonden | WerkCV' };
    }
    const metaTitle = normalizeBrandCopy(category.metaTitle);
    const metaDesc = normalizeBrandCopy(category.metaDesc);

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: category.keywords,
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            type: 'website',
            siteName: 'WerkCV',
            locale: 'nl_NL',
        },
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category: categorySlug } = await params;
    const category = getCategoryBySlug(categorySlug);

    if (!category) {
        notFound();
    }
    const metaDesc = normalizeBrandCopy(category.metaDesc);

    const examples = getExamplesByCategory(categorySlug);

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'CV Voorbeelden', href: '/cv-voorbeelden' },
        { label: category.name, href: `/cv-voorbeelden/${category.slug}` },
    ];

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: category.heroTitle,
        description: metaDesc,
        publisher: { "@id": "https://werkcv.nl/#organization" },
    };

    return (
        <main className="wk-editorial-page">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <div className="wk-editorial-breadcrumbs">
                <div className="wk-editorial-container py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="wk-editorial-hero mx-auto mb-14 max-w-[1200px] p-6 sm:p-8 lg:p-10">
                <div>
                    <span className="wk-editorial-kicker mb-4">
                        {examples.length} VOORBEELDEN
                    </span>
                    <h1 className="max-w-4xl text-balance text-4xl font-extrabold leading-tight tracking-[-0.045em] text-[var(--wk-ink)] md:text-5xl">
                        {category.heroTitle}
                    </h1>
                    <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)] md:text-xl">
                        {category.heroText}
                    </p>
                </div>
            </section>

            {/* Examples Grid */}
            <section className="wk-editorial-container pb-14">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)]">Kies je CV voorbeeld</h2>
                        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                            Gebruik een voorbeeld niet als tekst om letterlijk te kopieren. Gebruik het als structuur:
                            profieltekst, werkervaring, vaardigheden en trefwoorden die passen bij jouw vacature.
                        </p>
                    </div>
                    <Link
                        href="/prijzen"
                        className="wk-button wk-button-secondary"
                    >
                        Hoe werkt downloaden?
                    </Link>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {examples.map((example) => (
                        <Link
                            key={example.slug}
                            href={`/cv-voorbeelden/${categorySlug}/${example.slug}`}
                            className="wk-editorial-card-link group overflow-hidden"
                        >
                            {/* CV Preview */}
                            <div className="h-[280px] overflow-hidden border-b border-[var(--wk-border)] bg-[var(--wk-surface-subtle)]">
                                <SampleCVPreview
                                    data={example.sampleCV}
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                    scale={0.35}
                                    maxHeight={280}
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-5">
                                <h3 className="mb-2 text-xl font-extrabold tracking-[-0.025em] text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                    {example.name}
                                </h3>
                                <p className="mb-3 line-clamp-2 text-sm text-[var(--wk-ink-muted)]">
                                    {example.description}
                                </p>
                                <span className="inline-flex items-center text-sm font-extrabold text-[var(--wk-primary)]">
                                    Bekijk voorbeeld
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Tips Section */}
            {category.tips.length > 0 && (
                <section className="wk-editorial-section bg-[var(--wk-surface)] py-14">
                    <div className="wk-editorial-container">
                        <h2 className="mb-6 text-3xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)]">
                            Tips voor je {category.name} CV
                        </h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            {category.tips.map((tip, index) => (
                                <div
                                    key={index}
                                    className="wk-editorial-card-muted flex gap-4 p-4"
                                >
                                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] font-extrabold text-[var(--wk-primary)]">
                                        {index + 1}
                                    </span>
                                    <p className="text-[var(--wk-ink-muted)]">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="wk-editorial-section bg-[var(--wk-highlight-soft)] py-14">
                <div className="wk-editorial-container">
                    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
                        <div>
                            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--wk-ink-muted)]">
                                Van voorbeeld naar sollicitatieversie
                            </p>
                            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)]">
                                Maak eerst de inhoud sterk, kies daarna pas je downloadmoment
                            </h2>
                            <p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">
                                WerkCV laat je gratis starten met een voorbeeld of leeg template. Je betaalt pas wanneer je
                                tevreden bent en de definitieve PDF wilt downloaden.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/templates"
                                className="wk-editorial-card-link p-4"
                            >
                                <p className="text-sm font-extrabold text-[var(--wk-ink)]">Templates vergelijken</p>
                                <p className="mt-1 text-sm font-medium text-[var(--wk-ink-muted)]">Kies de layout die past bij jouw rol.</p>
                            </Link>
                            <Link
                                href="/cv-maken-zonder-abonnement"
                                className="wk-editorial-card-link p-4"
                            >
                                <p className="text-sm font-extrabold text-[var(--wk-ink)]">Zonder abonnement</p>
                                <p className="mt-1 text-sm font-medium text-[var(--wk-ink-muted)]">Lees hoe eenmalig downloaden werkt.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="wk-editorial-card-dark mx-auto mb-14 max-w-[1200px] px-6 py-12 text-center sm:px-8">
                <div>
                    <h2 className="mb-4 text-3xl font-extrabold tracking-[-0.035em] text-white">
                        Klaar om je {category.name} CV te maken?
                    </h2>
                    <p className="mx-auto mb-6 max-w-2xl text-lg text-white/85">
                        Kies een voorbeeld hierboven of start direct met een leeg template.
                        Eenmalig €4,99, geen abonnement.
                    </p>
                    <Link
                        href="/templates"
                        className="wk-button wk-button-primary"
                    >
                        Start je CV nu
                    </Link>
                </div>
            </section>
        </main>
    );
}

