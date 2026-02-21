import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategories, getCategoryBySlug, getExamplesByCategory } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';

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
        return { title: 'Pagina niet gevonden | WerkCV.nl' };
    }

    return {
        title: category.metaTitle,
        description: category.metaDesc,
        keywords: category.keywords,
        openGraph: {
            title: category.metaTitle,
            description: category.metaDesc,
            type: 'website',
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
        description: category.metaDesc,
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
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
                <h2 className="text-3xl font-black mb-8">Kies je CV voorbeeld</h2>

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

            {/* CTA Section */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Klaar om je {category.name} CV te maken?
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Kies een voorbeeld hierboven of start direct met een leeg template.
                        Eenmalig $5, geen abonnement.
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
