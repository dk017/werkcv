import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCategoryByPath, getCategoryBreadcrumbs, getRelatedCategories, getCategoryChildren } from '@/lib/categories';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { RelatedCVs } from '@/components/seo/RelatedCVs';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';
import { TableOfContents, TableOfContentsMobile } from '@/components/seo/TableOfContents';
import { ContentSection, ExampleBlock } from '@/components/seo/ContentSection';
import { sampleCV, CVData } from '@/lib/cv';

interface PageProps {
    params: Promise<{ slug: string[] }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryByPath(slug);

    if (!category) {
        return {
            title: 'Pagina niet gevonden | WerkCV.nl',
        };
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

// Table of contents items for spoke pages (specific CV examples)
const tocItems = [
    { id: 'persoonlijke-gegevens', label: 'Persoonlijke gegevens' },
    { id: 'profieltekst', label: 'Profieltekst' },
    { id: 'werkervaring', label: 'Werkervaring' },
    { id: 'opleiding', label: 'Opleiding' },
    { id: 'vaardigheden', label: 'Vaardigheden' },
    { id: 'tips', label: 'Tips' },
];

export default async function CVVoorbeeldPage({ params }: PageProps) {
    const { slug } = await params;
    const category = await getCategoryByPath(slug);

    if (!category) {
        notFound();
    }

    // Get breadcrumbs for navigation
    const breadcrumbCategories = await getCategoryBreadcrumbs(category);
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'CV Voorbeelden', href: '/cv-voorbeeld' },
        ...breadcrumbCategories.map((cat) => ({
            label: cat.nameDutch,
            href: `/cv-voorbeeld/${breadcrumbCategories.slice(0, breadcrumbCategories.indexOf(cat) + 1).map(c => c.slug).join('/')}`,
        })),
    ];

    // Get related categories for internal linking
    const relatedCategories = await getRelatedCategories(category, 3);

    // Get children if this is a pillar or subhub
    const children = category.type !== 'spoke' ? await getCategoryChildren(category.id) : [];

    // Build base path for child links
    const basePath = `/cv-voorbeeld/${slug.join('/')}`;

    // Use sample CV data from category or fallback to default
    const cvData = (category.sampleCV as CVData) || sampleCV;

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: category.heroTitle || `CV Voorbeeld ${category.nameDutch}`,
        description: category.metaDesc,
        author: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
        },
        publisher: {
            '@type': 'Organization',
            name: 'WerkCV.nl',
            logo: {
                '@type': 'ImageObject',
                url: 'https://werkcv.nl/logo.png',
            },
        },
    };

    // Check if this is a spoke page (specific CV example) vs pillar/subhub
    const isSpokePage = category.type === 'spoke';

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
                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                                CV VOORBEELD
                            </span>
                            <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900">
                                {category.heroTitle || `CV Voorbeeld ${category.nameDutch}`}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700">
                                {category.heroText || category.description}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <Link
                                    href="/templates"
                                    className="inline-block bg-[#FF6B6B] text-white font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    Gebruik dit template
                                </Link>
                                <Link
                                    href="/cv-voorbeeld"
                                    className="inline-block bg-white text-black font-bold px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    Meer voorbeelden
                                </Link>
                            </div>
                        </div>

                        {/* CV Preview */}
                        <div className="w-full lg:w-[350px] flex-shrink-0">
                            <SampleCVPreview data={cvData} scale={0.4} maxHeight={450} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Table of Contents - Only on spoke pages */}
            {isSpokePage && (
                <section className="border-b-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-6">
                        <h2 className="text-lg font-black mb-4 text-gray-900">Op deze pagina</h2>
                        <TableOfContentsMobile items={tocItems} />
                    </div>
                </section>
            )}

            {/* Children Categories (for pillars/subhubs) */}
            {children.length > 0 && (
                <section className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-black mb-6">
                        {category.type === 'pillar' ? 'Specialisaties' : 'Specifieke voorbeelden'}
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {children.map((child) => (
                            <Link
                                key={child.id}
                                href={`${basePath}/${child.slug}`}
                                className="group bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            >
                                <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B6B] transition-colors">
                                    {child.nameDutch}
                                </h3>
                                <p className="text-sm text-gray-600 line-clamp-2">
                                    {child.description}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Rich Content Sections - Only on spoke pages */}
            {isSpokePage && (
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <div className="grid lg:grid-cols-[1fr_280px] gap-8">
                        {/* Main Content */}
                        <div className="space-y-12">
                            {/* Section: Persoonlijke gegevens */}
                            <ContentSection id="persoonlijke-gegevens" title="Persoonlijke gegevens">
                                <p>
                                    Begin je {category.nameDutch.toLowerCase()} CV met je persoonlijke gegevens.
                                    Deze staan bovenaan zodat recruiters direct weten wie je bent en hoe ze je kunnen bereiken.
                                </p>
                                <p>
                                    <strong>Wat vermeld je?</strong> Je naam, telefoonnummer, e-mailadres en woonplaats.
                                    Optioneel: je LinkedIn profiel, geboortedatum en rijbewijs als dit relevant is voor de functie.
                                </p>
                                {cvData.personal.name && (
                                    <ExampleBlock label="Voorbeeld">
                                        <div className="space-y-1 text-sm">
                                            <p><strong>{cvData.personal.name}</strong></p>
                                            {cvData.personal.email && <p>{cvData.personal.email}</p>}
                                            {cvData.personal.phone && <p>{cvData.personal.phone}</p>}
                                            {cvData.personal.location && <p>{cvData.personal.location}</p>}
                                        </div>
                                    </ExampleBlock>
                                )}
                            </ContentSection>

                            {/* Section: Profieltekst */}
                            <ContentSection id="profieltekst" title="Profieltekst">
                                <p>
                                    De profieltekst is je kans om jezelf te presenteren in 3-5 zinnen.
                                    Beschrijf wie je bent, wat je kunt en wat je zoekt. Maak het specifiek voor {category.nameDutch.toLowerCase()} functies.
                                </p>
                                <p>
                                    <strong>Tip:</strong> Gebruik actieve taal en benoem concrete resultaten of specialisaties
                                    die relevant zijn voor de functie.
                                </p>
                                {cvData.personal.summary && (
                                    <ExampleBlock label="Voorbeeld profieltekst">
                                        <p className="italic">&ldquo;{cvData.personal.summary}&rdquo;</p>
                                    </ExampleBlock>
                                )}
                            </ContentSection>

                            {/* Section: Werkervaring */}
                            <ContentSection id="werkervaring" title="Werkervaring">
                                <p>
                                    Je werkervaring is vaak het belangrijkste onderdeel van je CV.
                                    Beschrijf je relevante ervaring in omgekeerd chronologische volgorde (meest recente eerst).
                                </p>
                                <p>
                                    <strong>Per functie vermeld je:</strong> Functietitel, bedrijfsnaam, periode en
                                    2-4 bullet points met je belangrijkste verantwoordelijkheden en resultaten.
                                </p>
                                {cvData.experience.length > 0 && (
                                    <ExampleBlock label="Voorbeeld werkervaring">
                                        <div className="space-y-1 text-sm">
                                            <p><strong>{cvData.experience[0].role}</strong></p>
                                            <p className="text-gray-600">
                                                {cvData.experience[0].company} | {cvData.experience[0].start} - {cvData.experience[0].end}
                                            </p>
                                            {cvData.experience[0].highlights && cvData.experience[0].highlights.length > 0 && (
                                                <ul className="list-disc list-inside mt-2 space-y-1">
                                                    {cvData.experience[0].highlights.slice(0, 2).map((highlight, i) => (
                                                        <li key={i}>{highlight}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </ExampleBlock>
                                )}
                            </ContentSection>

                            {/* Section: Opleiding */}
                            <ContentSection id="opleiding" title="Opleiding">
                                <p>
                                    Vermeld je relevante opleidingen, beginnend met de hoogst afgeronde.
                                    Voor starters is deze sectie extra belangrijk; voor ervaren professionals mag het korter.
                                </p>
                                <p>
                                    <strong>Vermeld:</strong> Opleidingsnaam, instelling, plaats en periode.
                                    Voeg eventueel relevante vakken of specialisaties toe.
                                </p>
                                {cvData.education.length > 0 && (
                                    <ExampleBlock label="Voorbeeld opleiding">
                                        <div className="space-y-1 text-sm">
                                            <p><strong>{cvData.education[0].degree}</strong></p>
                                            <p className="text-gray-600">
                                                {cvData.education[0].school} | {cvData.education[0].start} - {cvData.education[0].end}
                                            </p>
                                            {cvData.education[0].description && (
                                                <p className="mt-2">{cvData.education[0].description}</p>
                                            )}
                                        </div>
                                    </ExampleBlock>
                                )}
                            </ContentSection>

                            {/* Section: Vaardigheden */}
                            <ContentSection id="vaardigheden" title="Vaardigheden">
                                <p>
                                    Benoem vaardigheden die relevant zijn voor {category.nameDutch.toLowerCase()} functies.
                                    Denk aan technische skills, soft skills en taalvaardigheden.
                                </p>
                                <p>
                                    <strong>Tip:</strong> Kijk naar de vacaturetekst en neem relevante trefwoorden over.
                                    Wees eerlijk over je niveau.
                                </p>
                                {(cvData.skills.length > 0 || cvData.languages.length > 0) && (
                                    <ExampleBlock label="Voorbeeld vaardigheden">
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            {cvData.skills.length > 0 && (
                                                <div>
                                                    <p className="font-semibold mb-1">Vaardigheden:</p>
                                                    <ul className="list-disc list-inside space-y-0.5">
                                                        {cvData.skills.slice(0, 4).map((skill, i) => (
                                                            <li key={i}>{skill.name}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            {cvData.languages.length > 0 && (
                                                <div>
                                                    <p className="font-semibold mb-1">Talen:</p>
                                                    <ul className="list-disc list-inside space-y-0.5">
                                                        {cvData.languages.map((lang, i) => (
                                                            <li key={i}>{lang.name} ({lang.level})</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </ExampleBlock>
                                )}
                            </ContentSection>

                            {/* Section: Tips */}
                            {category.tips && category.tips.length > 0 && (
                                <ContentSection id="tips" title={`Tips voor je ${category.nameDutch} CV`}>
                                    <p>
                                        Volg deze tips om je {category.nameDutch.toLowerCase()} CV extra sterk te maken:
                                    </p>
                                    <div className="grid gap-3 mt-4">
                                        {category.tips.map((tip, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg"
                                            >
                                                <span className="flex-shrink-0 w-8 h-8 bg-[#4ECDC4] border-2 border-black flex items-center justify-center font-black text-sm">
                                                    {index + 1}
                                                </span>
                                                <p className="text-gray-700">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ContentSection>
                            )}
                        </div>

                        {/* Sidebar with sticky ToC */}
                        <div className="hidden lg:block">
                            <div className="sticky top-24">
                                <TableOfContents items={tocItems} />

                                {/* Sidebar CTA */}
                                <div className="mt-6 p-5 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E8E] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <h3 className="font-black text-white mb-2">Klaar om te beginnen?</h3>
                                    <p className="text-white/90 text-sm mb-4">
                                        Maak nu je eigen professionele CV
                                    </p>
                                    <Link
                                        href="/templates"
                                        className="block w-full text-center bg-black text-white font-bold py-2.5 border-2 border-black hover:bg-gray-900 transition-colors"
                                    >
                                        Start je CV
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Tips Section (for non-spoke pages) */}
            {!isSpokePage && category.tips && category.tips.length > 0 && (
                <section className="border-t-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">
                            Tips voor je {category.nameDutch} CV
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

            {/* Content Section for non-spoke pages */}
            {!isSpokePage && (
                <section className="border-t-4 border-black">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl font-black mb-6">
                                Over het {category.nameDutch} CV
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {category.description}
                            </p>

                            {/* Anchor text internal links */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-100 border-4 border-black">
                                <h3 className="font-black text-xl mb-3 text-gray-900">Aan de slag</h3>
                                <p className="text-gray-700">
                                    Klaar om je eigen {category.nameDutch.toLowerCase()} CV te maken?{' '}
                                    <Link href="/templates" className="font-bold text-[#FF6B6B] hover:underline">
                                        Kies een professioneel template
                                    </Link>{' '}
                                    en begin direct met onze gebruiksvriendelijke editor.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Related CVs - Internal Linking */}
            <RelatedCVs
                categories={relatedCategories}
                currentSlug={category.slug}
                basePath={category.parentId ? `/cv-voorbeeld/${slug.slice(0, -1).join('/')}` : '/cv-voorbeeld'}
            />

            {/* Final CTA */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Start nu met je CV
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Maak binnen 5 minuten een professioneel {category.nameDutch.toLowerCase()} CV
                        met onze templates en voorbeeldteksten.
                    </p>
                    <Link
                        href="/templates"
                        className="inline-block bg-black text-white font-bold px-8 py-4 text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                    >
                        Maak je CV nu
                    </Link>
                </div>
            </section>
        </main>
    );
}
