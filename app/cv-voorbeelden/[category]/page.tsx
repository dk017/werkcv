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
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV',
        },
    };

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Breadcrumbs */}
            <div className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        {examples.length} VOORBEELDEN
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                        {category.heroTitle}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl">
                        {category.heroText}
                    </p>
                </div>
            </section>

            {/* Examples Grid */}
            <section className="max-w-6xl mx-auto px-6 py-12">
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h2 className="text-3xl font-black">Kies je CV voorbeeld</h2>
                        <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-gray-700">
                            Gebruik een voorbeeld niet als tekst om letterlijk te kopieren. Gebruik het als structuur:
                            profieltekst, werkervaring, vaardigheden en trefwoorden die passen bij jouw vacature.
                        </p>
                    </div>
                    <Link
                        href="/prijzen"
                        className="inline-flex w-fit items-center justify-center border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                    >
                        Hoe werkt downloaden?
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examples.map((example) => (
                        <Link
                            key={example.slug}
                            href={`/cv-voorbeelden/${categorySlug}/${example.slug}`}
                            className="group block bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all overflow-hidden"
                        >
                            {/* CV Preview */}
                            <div className="h-[280px] overflow-hidden border-b-4 border-black">
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
                                <h3 className="text-xl font-black mb-2 group-hover:text-[#FF6B6B] transition-colors">
                                    {example.name}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                                    {example.description}
                                </p>
                                <span className="inline-flex items-center font-bold text-sm text-[#FF6B6B]">
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
                <section className="border-t-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">
                            Tips voor je {category.name} CV
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {category.tips.map((tip, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-4 bg-[#F8F8F8] border-2 border-black"
                                >
                                    <span className="flex-shrink-0 w-8 h-8 bg-[#4ECDC4] border-2 border-black flex items-center justify-center font-black">
                                        {index + 1}
                                    </span>
                                    <p className="text-gray-700">{tip}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="border-t-4 border-black bg-[#FFF7E8]">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid gap-6 md:grid-cols-[1fr_1fr]">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                                Van voorbeeld naar sollicitatieversie
                            </p>
                            <h2 className="mt-2 text-3xl font-black text-gray-900">
                                Maak eerst de inhoud sterk, kies daarna pas je downloadmoment
                            </h2>
                            <p className="mt-3 text-sm font-medium leading-relaxed text-gray-700">
                                WerkCV laat je gratis starten met een voorbeeld of leeg template. Je betaalt pas wanneer je
                                tevreden bent en de definitieve PDF wilt downloaden.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/templates"
                                className="border-2 border-black bg-white p-4 hover:bg-yellow-100"
                            >
                                <p className="text-sm font-black text-black">Templates vergelijken</p>
                                <p className="mt-1 text-sm font-medium text-gray-700">Kies de layout die past bij jouw rol.</p>
                            </Link>
                            <Link
                                href="/cv-maken-zonder-abonnement"
                                className="border-2 border-black bg-white p-4 hover:bg-yellow-100"
                            >
                                <p className="text-sm font-black text-black">Zonder abonnement</p>
                                <p className="mt-1 text-sm font-medium text-gray-700">Lees hoe eenmalig downloaden werkt.</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Klaar om je {category.name} CV te maken?
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Kies een voorbeeld hierboven of start direct met een leeg template.
                        Eenmalig €7,99, geen abonnement.
                    </p>
                    <Link
                        href="/templates"
                        className="inline-block bg-black text-white font-bold px-8 py-4 text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Start je CV nu
                    </Link>
                </div>
            </section>
        </main>
    );
}

