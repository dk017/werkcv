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
    const expatTools = [
        {
            href: '/en/english-speaking-companies-netherlands',
            title: 'English-Speaking Companies',
            description: 'Move from employer search to a CV and localization plan that fits the Dutch market.',
        },
        {
            href: '/tools/zoekjaar-checker',
            title: 'Zoekjaar Checker',
            description: 'Check whether the Dutch orientation year still fits your timeline.',
        },
        {
            href: '/tools/kennismigrant-salary-checker',
            title: 'Highly Skilled Migrant Salary Checker',
            description: 'Compare your offer against the current IND sponsor thresholds.',
        },
        {
            href: '/tools/eu-blue-card-checker',
            title: 'EU Blue Card Checker',
            description: 'See whether Blue Card or sponsor routes look more realistic for your move.',
        },
        {
            href: '/tools/job-title-translator',
            title: 'Job Title Translator',
            description: 'Localize job titles for Dutch vacancies, CV wording, and LinkedIn search.',
        },
    ];

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

                <div className="mt-12 border-t-4 border-black pt-10">
                    <div className="max-w-3xl mb-6">
                        <h2 className="text-3xl font-black text-gray-900 mb-3">
                            Practical visa and localization tools
                        </h2>
                        <p className="text-lg text-gray-700">
                            Many expat readers need more than CV advice. These routes help with salary
                            thresholds, visa-path comparison, and Dutch-market job-title wording.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
                        {expatTools.map((tool) => (
                            <Link
                                key={tool.href}
                                href={tool.href}
                                className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            >
                                <h3 className="font-black text-lg mb-2 group-hover:text-[#0ea5e9] transition-colors">
                                    {tool.title}
                                </h3>
                                <p className="text-sm text-gray-600">{tool.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
