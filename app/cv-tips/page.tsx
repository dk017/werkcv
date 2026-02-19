import { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/cv-tips/registry';
import { articleCategoryLabels, articleCategoryColors } from '@/lib/cv-tips/types';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
    title: 'CV Tips & Advies | Alles over CV Schrijven | WerkCV.nl',
    description: 'Ontdek de beste tips voor het schrijven van een professioneel CV. Van profieltekst tot vaardigheden, van opmaak tot sollicitatieadvies.',
    keywords: ['cv tips', 'cv schrijven', 'cv advies', 'cv maken tips', 'sollicitatietips', 'cv hulp'],
    alternates: {
        canonical: 'https://werkcv.nl/cv-tips',
        languages: {
            'nl-NL': 'https://werkcv.nl/cv-tips',
            'en-NL': 'https://werkcv.nl/en/guides',
            'x-default': 'https://werkcv.nl/cv-tips',
        },
    },
    openGraph: {
        title: 'CV Tips & Advies | WerkCV.nl',
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
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'CV Tips', href: '/cv-tips' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <span className="inline-block bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        CV TIPS & ADVIES
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                        CV Tips & Advies
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl text-gray-700">
                        Alles wat je moet weten om een professioneel CV te schrijven dat opvalt.
                        Van structuur en inhoud tot opmaak en sollicitatietips.
                    </p>
                </div>
            </section>

            {/* Featured Articles */}
            {featured.length > 0 && (
                <section className="border-b-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-16">
                        <h2 className="text-3xl font-black mb-8">Uitgelichte artikelen</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featured.map((article) => (
                                <Link
                                    key={article.slug}
                                    href={`/cv-tips/${article.slug}`}
                                    className="group block bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <span
                                            className="text-xs font-bold px-2 py-0.5 border-2 border-black"
                                            style={{ backgroundColor: articleCategoryColors[article.category] }}
                                        >
                                            {articleCategoryLabels[article.category]}
                                        </span>
                                        <span className="text-xs text-gray-400 font-medium">
                                            {article.readingTime} min lezen
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black mb-3 group-hover:text-[#FF6B6B] transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-600 line-clamp-3 text-sm">
                                        {article.description}
                                    </p>
                                    <div className="mt-4 flex items-center font-bold text-[#FF6B6B] text-sm">
                                        Lees meer
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-black mb-8">Alle artikelen</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {regular.map((article) => (
                        <Link
                            key={article.slug}
                            href={`/cv-tips/${article.slug}`}
                            className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span
                                    className="text-xs font-bold px-2 py-0.5 border-2 border-black"
                                    style={{ backgroundColor: articleCategoryColors[article.category] }}
                                >
                                    {articleCategoryLabels[article.category]}
                                </span>
                                <span className="text-xs text-gray-400 font-medium">
                                    {article.readingTime} min
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-2 group-hover:text-[#FF6B6B] transition-colors leading-tight">
                                {article.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2">
                                {article.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h2 className="text-4xl font-black mb-6">
                        Klaar om je CV te maken?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Pas deze tips direct toe. Maak binnen 5 minuten een professioneel CV
                        met onze templates. Eenmalig €5, geen abonnement.
                    </p>
                    <Link
                        href="/templates"
                        className="inline-block bg-black text-white font-bold px-10 py-5 text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Start je CV nu
                    </Link>
                </div>
            </section>
        </main>
    );
}
