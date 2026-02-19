import Link from 'next/link';
import { buildEnglishMetadata } from '../metadata';
import { getEnglishWavePages } from '@/lib/seo-wave/data';

export const metadata = buildEnglishMetadata({
    title: 'Netherlands CV Guides for Expats',
    description:
        'Focused English guides for expats and international job seekers building Dutch-style CVs.',
    path: '/en/guides',
    nlPath: '/cv-gids',
    keywords: [
        'netherlands cv guide',
        'expat cv netherlands',
        'dutch cv in english',
        'english resume netherlands',
    ],
});

export default function EnglishGuidesHubPage() {
    const pages = getEnglishWavePages();

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            <section className="border-b-4 border-black bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        EXPAT SEO WAVE
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                        English CV Guides for the Netherlands
                    </h1>
                    <p className="text-lg text-gray-700 max-w-3xl">
                        Use these pages to match Dutch hiring expectations while applying in English.
                        Built for expats, internationals, and global professionals.
                    </p>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/en/guides/${page.slug}`}
                            className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <h2 className="font-black text-xl mb-2 group-hover:text-[#0ea5e9] transition-colors">
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
