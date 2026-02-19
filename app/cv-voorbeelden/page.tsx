import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getExamplesByCategory } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
    title: 'CV Voorbeelden per Beroep | Gratis Templates | WerkCV.nl',
    description: 'Bekijk 100+ professionele CV voorbeelden per beroep. Van ICT tot Zorg, van Student tot Ervaren Professional. Kies je template en maak direct je eigen CV.',
    keywords: ['cv voorbeeld', 'cv template', 'cv voorbeelden per beroep', 'cv maken', 'curriculum vitae voorbeeld'],
    alternates: {
        canonical: 'https://werkcv.nl/cv-voorbeelden',
        languages: {
            'nl-NL': 'https://werkcv.nl/cv-voorbeelden',
            'en-NL': 'https://werkcv.nl/en/dutch-cv-examples',
            'x-default': 'https://werkcv.nl/cv-voorbeelden',
        },
    },
};

// Category color accents for visual variety
const categoryAccents: Record<string, string> = {
    'studenten-en-starters': '#FFD700',
    'zorg-en-welzijn': '#FF6B6B',
    'technologie-en-ict': '#60A5FA',
    'vakmanschap-en-logistiek': '#4ADE80',
    'onderwijs': '#F472B6',
    'horeca-en-detailhandel': '#4ECDC4',
    'zakelijk-en-financieel': '#F59E0B',
    'marketing-en-communicatie': '#8B5CF6',
    'juridisch-en-overheid': '#6366F1',
    'bouw-en-techniek': '#EF4444',
};

export default function CVVoorbeeldenOverview() {
    const categories = getAllCategories();

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            {/* Breadcrumbs */}
            <div className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'CV Voorbeelden', href: '/cv-voorbeelden' },
                        ]}
                    />
                </div>
            </div>

            {/* Hero Section */}
            <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        100+ VOORBEELDEN
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                        CV Voorbeelden
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl text-gray-700">
                        Vind het perfecte CV voorbeeld voor jouw beroep. Kies een categorie,
                        bekijk een voorbeeld en begin direct met je eigen professionele CV.
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-black mb-8">Kies je vakgebied</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => {
                        const examples = getExamplesByCategory(category.slug);
                        const accent = categoryAccents[category.slug] || '#FFD700';

                        return (
                            <Link
                                key={category.slug}
                                href={`/cv-voorbeelden/${category.slug}`}
                                className="group block bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                            >
                                <div
                                    className="w-12 h-1.5 mb-4"
                                    style={{ backgroundColor: accent }}
                                />
                                <h3 className="text-2xl font-black mb-3 group-hover:text-[#FF6B6B] transition-colors">
                                    {category.name}
                                </h3>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {category.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-gray-500">
                                        {examples.length} voorbeelden
                                    </span>
                                    <span className="inline-flex items-center font-bold text-[#FF6B6B]">
                                        Bekijk
                                        <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Popular Searches Section */}
            <section className="border-t-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-black mb-8">Populaire zoekopdrachten</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            'CV voorbeeld student',
                            'CV voorbeeld zonder ervaring',
                            'CV voorbeeld verpleegkundige',
                            'CV voorbeeld software developer',
                            'CV voorbeeld stage',
                            'CV voorbeeld bijbaan',
                            'CV voorbeeld systeembeheerder',
                            'CV voorbeeld zorgmedewerker',
                            'CV voorbeeld starter',
                            'CV voorbeeld afgestudeerde',
                        ].map((term) => (
                            <span
                                key={term}
                                className="bg-[#E8E8E8] px-4 py-2 border-2 border-black font-medium"
                            >
                                {term}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h2 className="text-4xl font-black mb-6">
                        Klaar om te beginnen?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Maak binnen 5 minuten een professioneel CV. Eenmalig €5, geen abonnement.
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
