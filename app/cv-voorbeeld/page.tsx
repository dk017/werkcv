import { Metadata } from 'next';
import Link from 'next/link';
import { getPillarCategories } from '@/lib/categories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
    title: 'CV Voorbeelden per Beroep | WerkCV.nl',
    description: 'Bekijk professionele CV voorbeelden voor jouw beroep. Van ICT tot Zorg, van Logistiek tot Administratie. Start direct met een perfect CV template.',
    keywords: ['cv voorbeeld', 'cv template', 'cv maken', 'curriculum vitae', 'sollicitatie'],
};

export default async function CVVoorbeeldOverview() {
    const pillars = await getPillarCategories();

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            {/* Breadcrumbs */}
            <div className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-3">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'CV Voorbeelden', href: '/cv-voorbeeld' },
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
                        Vind het perfecte CV voorbeeld voor jouw beroep. Kies een categorie
                        en ontdek professionele templates met voorbeeldteksten die je direct kunt gebruiken.
                    </p>
                </div>
            </section>

            {/* Category Grid */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-black mb-8">Kies je vakgebied</h2>

                {pillars.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pillars.map((pillar) => (
                            <Link
                                key={pillar.id}
                                href={`/cv-voorbeeld/${pillar.slug}`}
                                className="group block bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all"
                            >
                                <h3 className="text-2xl font-black mb-3 group-hover:text-[#FF6B6B] transition-colors">
                                    {pillar.nameDutch}
                                </h3>
                                <p className="text-gray-700 mb-4 line-clamp-3">
                                    {pillar.description}
                                </p>
                                <span className="inline-flex items-center font-bold text-[#FF6B6B]">
                                    Bekijk voorbeelden
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xl text-gray-600">
                            CV voorbeelden worden binnenkort toegevoegd. Begin alvast met je eigen CV!
                        </p>
                        <Link
                            href="/templates"
                            className="inline-block mt-6 bg-[#FF6B6B] text-white font-bold px-8 py-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Start met je CV
                        </Link>
                    </div>
                )}
            </section>

            {/* Popular Searches Section */}
            <section className="border-t-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-black mb-8">Populaire zoekopdrachten</h2>
                    <div className="flex flex-wrap gap-3">
                        {[
                            'CV voorbeeld zonder ervaring',
                            'CV voorbeeld carrièreswitch',
                            'CV voorbeeld administratief medewerker',
                            'CV voorbeeld verpleegkundige',
                            'CV voorbeeld magazijnmedewerker',
                            'CV voorbeeld developer',
                            'CV voorbeeld met gat in CV',
                            'CV voorbeeld starter',
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
                        Maak binnen 5 minuten een professioneel CV met onze gebruiksvriendelijke editor.
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
