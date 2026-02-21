import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategoryExamplePairs, getExampleBySlug, getRelatedExamples } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';
import { TableOfContents, TableOfContentsMobile } from '@/components/seo/TableOfContents';
import { ContentSection, ExampleBlock } from '@/components/seo/ContentSection';
import { UseExampleButton } from '@/components/cv-voorbeelden/UseExampleButton';
import { BlankTemplateButton } from '@/components/cv-voorbeelden/BlankTemplateButton';

interface PageProps {
    params: Promise<{ category: string; slug: string }>;
}

export function generateStaticParams() {
    return getAllCategoryExamplePairs();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { category, slug } = await params;
    const example = getExampleBySlug(category, slug);

    if (!example) {
        return { title: 'Pagina niet gevonden | WerkCV.nl' };
    }

    return {
        title: example.metaTitle,
        description: example.metaDesc,
        keywords: example.keywords,
        alternates: {
            canonical: `https://werkcv.nl/cv-voorbeelden/${category}/${example.slug}`,
            languages: {
                'nl-NL': `https://werkcv.nl/cv-voorbeelden/${category}/${example.slug}`,
                'en-NL': 'https://werkcv.nl/en/dutch-cv-examples',
                'x-default': `https://werkcv.nl/cv-voorbeelden/${category}/${example.slug}`,
            },
        },
        openGraph: {
            title: example.metaTitle,
            description: example.metaDesc,
            type: 'article',
            locale: 'nl_NL',
            url: `https://werkcv.nl/cv-voorbeelden/${category}/${example.slug}`,
        },
    };
}

const tocItems = [
    { id: 'persoonlijke-gegevens', label: 'Persoonlijke gegevens' },
    { id: 'profieltekst', label: 'Profieltekst' },
    { id: 'werkervaring', label: 'Werkervaring' },
    { id: 'opleiding', label: 'Opleiding' },
    { id: 'vaardigheden', label: 'Vaardigheden' },
    { id: 'tips', label: 'Tips' },
];

export default async function ExamplePage({ params }: PageProps) {
    const { category: categorySlug, slug } = await params;
    const example = getExampleBySlug(categorySlug, slug);

    if (!example) {
        notFound();
    }

    const relatedExamples = getRelatedExamples(example, 3);
    const cvData = example.sampleCV;

    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'CV Voorbeelden', href: '/cv-voorbeelden' },
        { label: example.category.name, href: `/cv-voorbeelden/${example.categorySlug}` },
        { label: example.name, href: `/cv-voorbeelden/${example.categorySlug}/${example.slug}` },
    ];

    // JSON-LD structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: example.heroTitle,
        description: example.metaDesc,
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
                                {example.heroTitle}
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700">
                                {example.heroText}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8">
                                <UseExampleButton
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                    sampleCV={example.sampleCV}
                                />
                                <BlankTemplateButton
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                />
                            </div>
                        </div>

                        {/* CV Preview */}
                        <div className="w-full lg:w-[350px] flex-shrink-0">
                            <SampleCVPreview
                                data={cvData}
                                templateId={example.templateId}
                                colorThemeId={example.colorThemeId}
                                scale={0.4}
                                maxHeight={450}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Table of Contents - Mobile */}
            <section className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <h2 className="text-lg font-black mb-4 text-gray-900">Op deze pagina</h2>
                    <TableOfContentsMobile items={tocItems} />
                </div>
            </section>

            {/* Rich Content Sections */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-[1fr_280px] gap-8">
                    {/* Main Content */}
                    <div className="space-y-12">
                        {/* Section: Persoonlijke gegevens */}
                        <ContentSection id="persoonlijke-gegevens" title="Persoonlijke gegevens">
                            <p>
                                Begin je {example.name.toLowerCase()} CV met je persoonlijke gegevens.
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
                                        <p className="text-gray-500">{cvData.personal.title}</p>
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
                                Beschrijf wie je bent, wat je kunt en wat je zoekt. Maak het specifiek voor {example.name.toLowerCase()} functies.
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
                                                {cvData.experience[0].highlights.slice(0, 3).map((highlight, i) => (
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
                                Benoem vaardigheden die relevant zijn voor {example.name.toLowerCase()} functies.
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
                                                    {cvData.skills.slice(0, 5).map((skill, i) => (
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
                        {example.tips.length > 0 && (
                            <ContentSection id="tips" title={`Tips voor je ${example.name} CV`}>
                                <p>
                                    Volg deze tips om je {example.name.toLowerCase()} CV extra sterk te maken:
                                </p>
                                <div className="grid gap-3 mt-4">
                                    {example.tips.map((tip, index) => (
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

                        {/* Inline CTA */}
                        <div className="p-6 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="font-black text-xl mb-2 text-gray-900">
                                Maak nu je eigen {example.name} CV
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Gebruik het voorbeeld hierboven als startpunt of begin met een leeg template.
                                Binnen 5 minuten klaar, eenmalig $5.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <UseExampleButton
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                    sampleCV={example.sampleCV}
                                />
                                <BlankTemplateButton
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                />
                            </div>
                        </div>
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

            {/* Related Examples */}
            {relatedExamples.length > 0 && (
                <section className="border-t-4 border-black bg-white">
                    <div className="max-w-6xl mx-auto px-6 py-12">
                        <h2 className="text-3xl font-black mb-6">Vergelijkbare CV voorbeelden</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedExamples.map((related) => (
                                <Link
                                    key={related.slug}
                                    href={`/cv-voorbeelden/${related.categorySlug}/${related.slug}`}
                                    className="group block bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                >
                                    <span className="text-xs font-bold text-gray-400 uppercase">
                                        {related.category.name}
                                    </span>
                                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#FF6B6B] transition-colors">
                                        {related.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {related.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Final CTA */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Start nu met je CV
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Maak binnen 5 minuten een professioneel {example.name.toLowerCase()} CV
                        met onze templates en voorbeeldteksten. Eenmalig $5, geen abonnement.
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
