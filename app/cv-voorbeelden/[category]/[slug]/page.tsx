import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllCategoryExamplePairs, getExampleBySlug, getRelatedExamples, getRelatedGuideLink } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { SampleCVPreview } from '@/components/seo/SampleCVPreview';
import { TableOfContents, TableOfContentsMobile } from '@/components/seo/TableOfContents';
import { ContentSection, ExampleBlock } from '@/components/seo/ContentSection';
import { UseExampleButton } from '@/components/cv-voorbeelden/UseExampleButton';
import { BlankTemplateButton } from '@/components/cv-voorbeelden/BlankTemplateButton';
import { RoleCvPrefillPanel } from '@/components/cv-voorbeelden/RoleCvPrefillPanel';
import { normalizeBrandCopy } from '@/lib/seo-branding';
import { getExamplePageRoleConversion } from '@/lib/role-cv-conversions';

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
        return { title: 'Pagina niet gevonden | WerkCV' };
    }
    const pageUrl = `https://werkcv.nl/cv-voorbeelden/${category}/${example.slug}`;
    const imageUrl = `${pageUrl}/opengraph-image`;
    const metaTitle = normalizeBrandCopy(example.metaTitle);
    const metaDesc = normalizeBrandCopy(example.metaDesc);

    return {
        title: metaTitle,
        description: metaDesc,
        keywords: example.keywords,
        alternates: {
            canonical: pageUrl,
            languages: {
                'nl-NL': pageUrl,
                'en-NL': 'https://werkcv.nl/en/dutch-cv-examples',
                'x-default': pageUrl,
            },
        },
        openGraph: {
            title: metaTitle,
            description: metaDesc,
            type: 'article',
            siteName: 'WerkCV',
            locale: 'nl_NL',
            url: pageUrl,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: example.name,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: '@werkcvnl',
            title: metaTitle,
            description: metaDesc,
            images: [imageUrl],
        },
    };
}

const baseTocItems = [
    { id: 'persoonlijke-gegevens', label: 'Persoonlijke gegevens' },
    { id: 'profieltekst', label: 'Profieltekst' },
    { id: 'werkervaring', label: 'Werkervaring' },
    { id: 'opleiding', label: 'Opleiding' },
    { id: 'vaardigheden', label: 'Vaardigheden' },
    { id: 'ats-trefwoorden', label: 'ATS trefwoorden' },
    { id: 'veelgemaakte-fouten', label: 'Veelgemaakte fouten' },
    { id: 'tips', label: 'Tips' },
    { id: 'downloadklaar', label: 'Downloadklaar maken' },
];

export default async function ExamplePage({ params }: PageProps) {
    const { category: categorySlug, slug } = await params;
    const example = getExampleBySlug(categorySlug, slug);

    if (!example) {
        notFound();
    }

    const relatedExamples = getRelatedExamples(example, 3);
    const relatedGuide = getRelatedGuideLink(example);
    const cvData = example.sampleCV;
    const metaDesc = normalizeBrandCopy(example.metaDesc);
    const roleName = example.name.toLowerCase();
    const primarySkills = cvData.skills.slice(0, 8).map((skill) => skill.name);
    const expertTocItems = example.expertContent ? [
        { id: 'recruiter-check', label: 'Recruiter check' },
        { id: 'voorbeeldzinnen', label: 'Voorbeeldzinnen' },
        { id: 'fout-naar-goed', label: 'Fout naar goed' },
        { id: 'vertrouwen', label: 'Vertrouwen' },
    ] : [];
    const tocItems = [
        ...baseTocItems.slice(0, 5),
        ...expertTocItems,
        ...baseTocItems.slice(5),
    ];
    const primaryKeywords = Array.from(
        new Set([
            ...primarySkills,
            ...example.keywords
                .map((keyword) => keyword.replace(/^cv voorbeeld\s+/i, '').replace(/^cv\s+/i, ''))
                .filter((keyword) => keyword.length > 2),
        ])
    ).slice(0, 10);
    const firstExperience = cvData.experience[0];
    const roleConversion = getExamplePageRoleConversion(categorySlug, example.slug);

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
        description: metaDesc,
        author: { "@id": "https://werkcv.nl/#organization" },
        publisher: { "@id": "https://werkcv.nl/#organization" },
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

            {roleConversion ? (
                <RoleCvPrefillPanel
                    roleLabel={roleConversion.roleLabel}
                    templateId={example.templateId}
                    colorThemeId={example.colorThemeId}
                    sampleCV={example.sampleCV}
                    proofItems={roleConversion.proofItems}
                    motivationHref={roleConversion.motivationHref}
                />
            ) : null}

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

                        {example.expertContent && (
                            <>
                                <ContentSection id="recruiter-check" title={`Waar recruiters op letten bij een ${example.name} CV`}>
                                    <p>
                                        Een sterke pagina met voorbeeldtekst is pas nuttig als je begrijpt waarom een recruiter
                                        bepaalde informatie snel wil zien. Gebruik deze punten als laatste inhoudelijke check
                                        voordat je je CV downloadt of meestuurt.
                                    </p>
                                    <div className="grid gap-3 mt-4">
                                        {example.expertContent.recruiterFocus.map((focus, index) => (
                                            <div
                                                key={focus}
                                                className="border-3 border-black bg-white p-4"
                                                style={{ borderWidth: '3px' }}
                                            >
                                                <p className="text-xs font-black uppercase tracking-[0.16em] text-gray-500">
                                                    Check {index + 1}
                                                </p>
                                                <p className="mt-1 text-gray-800">{focus}</p>
                                            </div>
                                        ))}
                                    </div>
                                </ContentSection>

                                <ContentSection id="voorbeeldzinnen" title={`Copy-ready zinnen voor je ${example.name} CV`}>
                                    <p>
                                        Deze zinnen kun je aanpassen aan je eigen situatie. Kies alleen zinnen die je eerlijk
                                        kunt uitleggen als een recruiter er later naar vraagt.
                                    </p>
                                    <ExampleBlock label="Sterke bullet points">
                                        <ul className="list-disc space-y-2 pl-5 text-sm">
                                            {example.expertContent.copyReadyBullets.map((bullet) => (
                                                <li key={bullet}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </ExampleBlock>
                                    {example.expertContent.noExperienceAdvice && (
                                        <div className="mt-5 border-4 border-black bg-[#E9FFFC] p-5">
                                            <h3 className="font-black text-gray-900">Als je nog weinig ervaring hebt</h3>
                                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-700">
                                                {example.expertContent.noExperienceAdvice.map((advice) => (
                                                    <li key={advice}>{advice}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </ContentSection>

                                <ContentSection id="fout-naar-goed" title={`Van zwakke naar sterke ${example.name} tekst`}>
                                    <p>
                                        Veel CV&apos;s blijven te vaag. Het verschil zit meestal niet in mooiere woorden, maar in
                                        concretere context: taak, situatie, systeem, tempo, resultaat of verantwoordelijkheid.
                                    </p>
                                    <div className="space-y-4">
                                        {example.expertContent.rewriteExamples.map((rewrite) => (
                                            <article
                                                key={rewrite.bad}
                                                className="border-4 border-black bg-white p-5"
                                            >
                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div className="border-2 border-red-200 bg-red-50 p-4">
                                                        <p className="text-xs font-black uppercase text-red-700">Te zwak</p>
                                                        <p className="mt-2 text-sm text-gray-800">&ldquo;{rewrite.bad}&rdquo;</p>
                                                    </div>
                                                    <div className="border-2 border-green-200 bg-green-50 p-4">
                                                        <p className="text-xs font-black uppercase text-green-700">Sterker</p>
                                                        <p className="mt-2 text-sm text-gray-800">&ldquo;{rewrite.good}&rdquo;</p>
                                                    </div>
                                                </div>
                                                <p className="mt-3 text-sm text-gray-600">{rewrite.reason}</p>
                                            </article>
                                        ))}
                                    </div>
                                </ContentSection>

                                <ContentSection id="vertrouwen" title={`Vertrouwen opbouwen met je ${example.name} CV`}>
                                    <p>
                                        Zeker bij praktische functies wil een werkgever snel risico verminderen: kom je op tijd,
                                        werk je netjes, begrijp je de werkvloer en kun je zonder veel uitleg meedraaien?
                                    </p>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {example.expertContent.trustSignals.map((signal) => (
                                            <div
                                                key={signal}
                                                className="border-3 border-black bg-yellow-50 p-4 text-sm text-gray-800"
                                                style={{ borderWidth: '3px' }}
                                            >
                                                {signal}
                                            </div>
                                        ))}
                                    </div>
                                </ContentSection>
                            </>
                        )}

                        <ContentSection id="ats-trefwoorden" title={`ATS trefwoorden voor een ${example.name} CV`}>
                            <p>
                                Veel werkgevers gebruiken software of vaste zoekfilters voordat een recruiter je CV leest.
                                Gebruik daarom dezelfde vaktermen als in de vacature, maar alleen als ze echt bij jouw ervaring passen.
                            </p>
                            <p>
                                Voor een {roleName} CV zijn dit logische trefwoorden om te controleren:
                            </p>
                            {primaryKeywords.length > 0 && (
                                <ExampleBlock label="Trefwoorden om te overwegen">
                                    <div className="flex flex-wrap gap-2">
                                        {primaryKeywords.map((keyword) => (
                                            <span
                                                key={keyword}
                                                className="border-2 border-black bg-yellow-100 px-3 py-1 text-sm font-bold text-black"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </ExampleBlock>
                            )}
                            <p>
                                Zet deze woorden niet los onder elkaar als vulling. Verwerk ze in je profieltekst,
                                werkervaring en vaardigheden zodat duidelijk wordt waar je ze hebt toegepast.
                            </p>
                        </ContentSection>

                        <ContentSection id="veelgemaakte-fouten" title={`Veelgemaakte fouten bij een ${example.name} CV`}>
                            <div className="grid gap-4 md:grid-cols-2">
                                {[
                                    {
                                        title: 'Te algemeen schrijven',
                                        body: `Een goed ${roleName} CV laat niet alleen zien wat je functie was, maar ook welke taken, systemen, doelgroepen of resultaten belangrijk waren.`,
                                    },
                                    {
                                        title: 'Geen vacaturetaal gebruiken',
                                        body: 'Recruiters zoeken vaak op dezelfde termen die in de vacature staan. Neem relevante termen over als ze kloppen met je ervaring.',
                                    },
                                    {
                                        title: 'Alleen verantwoordelijkheden noemen',
                                        body: 'Maak bullet points sterker door resultaat, omvang of context toe te voegen. Denk aan aantallen, processen, tools of verbeteringen.',
                                    },
                                    {
                                        title: 'Een te druk template kiezen',
                                        body: 'Kies een layout die snel scanbaar blijft. Voor veel Nederlandse sollicitaties werkt rustig en duidelijk beter dan veel decoratie.',
                                    },
                                ].map((item) => (
                                    <article
                                        key={item.title}
                                        className="border-3 border-black bg-white p-4"
                                        style={{ borderWidth: '3px' }}
                                    >
                                        <h3 className="font-black text-gray-900">{item.title}</h3>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
                                    </article>
                                ))}
                            </div>
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

                        <ContentSection id="downloadklaar" title="Van voorbeeld naar downloadklare PDF">
                            <p>
                                Gebruik dit voorbeeld als structuur, maar maak de inhoud eerst specifiek voor jouw vacature.
                                Controleer daarna of je profieltekst, laatste werkervaring en vaardigheden dezelfde richting op wijzen.
                            </p>
                            {firstExperience && (
                                <ExampleBlock label="Laatste controle voor dit voorbeeld">
                                    <ul className="list-disc space-y-2 pl-5 text-sm">
                                        <li>
                                            Past je profieltekst bij de functie <strong>{firstExperience.role}</strong> of bij de rol waarop je nu solliciteert?
                                        </li>
                                        <li>
                                            Staan je belangrijkste {roleName} vaardigheden zichtbaar in de eerste helft van je CV?
                                        </li>
                                        <li>
                                            Is je template rustig genoeg om snel te scannen en als PDF te versturen?
                                        </li>
                                    </ul>
                                </ExampleBlock>
                            )}
                            <div className="mt-5 flex flex-wrap gap-3">
                                <UseExampleButton
                                    templateId={example.templateId}
                                    colorThemeId={example.colorThemeId}
                                    sampleCV={example.sampleCV}
                                />
                                <Link
                                    href="/prijzen"
                                    className="inline-flex items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
                                >
                                    Bekijk downloadprijs
                                </Link>
                            </div>
                        </ContentSection>

                        {example.categorySlug === 'studenten-en-starters' && example.slug === 'student-cv' && (
                            <div className="p-6 bg-[#E9FFFC] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-600 mb-2">
                                    Student cv direct maken
                                </p>
                                <h3 className="font-black text-xl mb-2 text-gray-900">
                                    Zet dit voorbeeld om naar jouw eigen student cv
                                </h3>
                                <p className="text-gray-700 mb-4">
                                    Start met deze structuur, vul je opleiding, bijbaan, stage of projecten in en download pas
                                    als je tevreden bent met je PDF. Geen abonnement, éénmalig €4,99 bij download.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <UseExampleButton
                                        templateId={example.templateId}
                                        colorThemeId={example.colorThemeId}
                                        sampleCV={example.sampleCV}
                                    />
                                    <Link
                                        href="/cv-maken-student"
                                        className="inline-flex items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
                                    >
                                        Lees student cv gids
                                    </Link>
                                </div>
                            </div>
                        )}

                        {/* Inline CTA */}
                        <div className="p-6 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E8E]/10 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="font-black text-xl mb-2 text-gray-900">
                                Maak nu je eigen {example.name} CV
                            </h3>
                            <p className="text-gray-700 mb-4">
                                Gebruik het voorbeeld hierboven als startpunt of begin met een leeg template.
                                Werk eerst gratis aan je inhoud en betaal pas als je de definitieve PDF wilt downloaden.
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
                                    Gebruik dit voorbeeld in de editor
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

            <section className="border-t-4 border-black bg-[#FFFEF9]">
                <div className="max-w-6xl mx-auto px-6 py-12">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">Volgende slimme stap</h2>
                    <p className="text-gray-700 max-w-4xl leading-relaxed">
                        Gebruik niet alleen het voorbeeld. Open ook een relevante gids voor betere formuleringen en ga daarna direct door naar een template waarmee je je eigen versie snel kunt afmaken.
                    </p>
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        <Link
                            href={relatedGuide.href}
                            className="block bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <span className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
                                Relevante gids
                            </span>
                            <h3 className="mt-2 text-2xl font-black text-gray-900">{relatedGuide.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-700">{relatedGuide.description}</p>
                        </Link>

                        <Link
                            href="/templates"
                            className="block bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <span className="text-xs font-black uppercase tracking-[0.18em] text-gray-500">
                                Start direct
                            </span>
                            <h3 className="mt-2 text-2xl font-black text-gray-900">Maak dit CV direct in een template</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-700">
                                Neem de structuur van dit voorbeeld over, kies een rustige layout en werk daarna je eigen versie af in de editor.
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-12 text-center">
                    <h2 className="text-3xl font-black mb-4 text-gray-900">
                        Start nu met je CV
                    </h2>
                    <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-800">
                        Maak binnen 5 minuten een professioneel {example.name.toLowerCase()} CV
                        met onze templates en voorbeeldteksten. Gratis starten, betalen pas bij PDF-download.
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

