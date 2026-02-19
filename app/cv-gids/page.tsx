import type { Metadata } from 'next';
import Link from 'next/link';
import { getDutchWavePages } from '@/lib/seo-wave/data';

export const metadata: Metadata = {
    title: 'CV Gidsen per zoekopdracht | WerkCV.nl',
    description:
        'Praktische CV gidsen voor veelgezochte termen: van cv voorbeeld per functie tot cv zonder ervaring en Engels CV in Nederland.',
    keywords: ['cv gids', 'cv voorbeeld', 'cv zonder ervaring', 'cv maken nederland'],
    alternates: {
        canonical: 'https://werkcv.nl/cv-gids',
        languages: {
            'nl-NL': 'https://werkcv.nl/cv-gids',
            'en-NL': 'https://werkcv.nl/en/guides',
            'x-default': 'https://werkcv.nl/cv-gids',
        },
    },
    openGraph: {
        title: 'CV Gidsen per zoekopdracht | WerkCV.nl',
        description:
            'Praktische CV gidsen voor veelgezochte termen in Nederland.',
        type: 'website',
        locale: 'nl_NL',
    },
};

export default function CvgidsHubPage() {
    const pages = getDutchWavePages();

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            <section className="border-b-4 border-black bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <span className="inline-block bg-[#FF6B6B] text-white text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        NIEUWE SEO GIDSEN
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        CV Gidsen voor veelgezochte termen
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl">
                        Gebruik deze korte, praktische gidsen om sneller te bouwen aan een CV
                        dat past bij Nederlandse vacatures en ATS-systemen.
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/cv-gids/${page.slug}`}
                            className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <h2 className="font-black text-xl mb-2 group-hover:text-[#FF6B6B] transition-colors">
                                {page.title}
                            </h2>
                            <p className="text-sm text-gray-600 line-clamp-3">{page.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
