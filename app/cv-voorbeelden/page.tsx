import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getAllExamples, getExamplesByCategory } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildDutchMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = buildDutchMetadata({
    title: 'CV Voorbeelden per Beroep | Professionele Voorbeelden + Templates',
    description: 'Bekijk uitgebreide CV voorbeelden per beroep en sector. Inclusief structuur, checklist, veelgemaakte fouten en directe links naar templates, editor en voorbeeldteksten.',
    path: '/cv-voorbeelden',
    keywords: [
        'cv voorbeelden',
        'voorbeeld cv',
        'cv voorbeeld per beroep',
        'goed cv voorbeeld',
        'professioneel cv voorbeeld',
        'cv maken',
        'curriculum vitae voorbeeld',
        'cv voorbeeld nederland',
        'perfect voorbeeld van een cv',
        'cv template',
    ],
    languages: {
        'nl-NL': 'https://werkcv.nl/cv-voorbeelden',
        'en-NL': 'https://werkcv.nl/en/dutch-cv-examples',
        'x-default': 'https://werkcv.nl/cv-voorbeelden',
    },
});

const categoryAccents: Record<string, string> = {
    'studenten-en-starters': '#FFD700',
    'zorg-en-welzijn': '#FF6B6B',
    'technologie-en-ict': '#60A5FA',
    'vakmanschap-en-logistiek': '#4ADE80',
    onderwijs: '#F472B6',
    'horeca-en-detailhandel': '#4ECDC4',
    'zakelijk-en-financieel': '#F59E0B',
    'marketing-en-communicatie': '#8B5CF6',
    'juridisch-en-overheid': '#6366F1',
    'bouw-en-techniek': '#EF4444',
};

const workflowSteps = [
    {
        title: '1) Kies een voorbeeld dat echt past bij je doelrol',
        text: 'Gebruik geen willekeurig CV als startpunt. Kies een voorbeeld binnen jouw sector en ervaringsniveau, zodat de opbouw en taal direct aansluiten bij de verwachtingen van recruiters in die markt.',
    },
    {
        title: '2) Pas profieltekst en werkervaring vacaturegericht aan',
        text: 'Succesvolle CVs zijn niet generiek. Neem relevante termen uit de vacature over, koppel ze aan jouw ervaring en maak impact zichtbaar met cijfers, resultaten of scope. Daarmee laat je direct zien dat je begrijpt wat de werkgever zoekt.',
    },
    {
        title: '3) Houd structuur strak en scanbaar',
        text: 'Recruiters scannen meestal eerst functietitels, recente werkervaring, vaardigheden en opleiding. Gebruik daarom korte bullets, duidelijke koppen en logische volgorde. Zo wordt je CV snel beoordeeld als professioneel en relevant.',
    },
    {
        title: '4) Zet je definitieve versie direct in de editor',
        text: 'Gebruik het voorbeeld als inhoudelijke basis en finaliseer in de editor met een rustige template. Dit voorkomt opmaakfouten en versnelt je workflow van concept naar een sollicitatieklaar PDF-CV.',
    },
];

const quickUseCards = [
    {
        title: 'Gebruik een voorbeeld als structuur, niet als kopie',
        text: 'Een goed voorbeeld CV helpt je vooral met volgorde, toon en bewijsvoering. Recruiters prikken snel door gekopieerde teksten heen.',
    },
    {
        title: 'Kies eerst de juiste categorie of situatie',
        text: 'Zoek niet blind op losse voorbeelden. Start bij de rol of situatie die het dichtst bij je vacature ligt en pas daarna de details aan op jouw ervaring.',
    },
    {
        title: 'Finaliseer daarna in een template of editor',
        text: 'Voorbeelden geven richting, maar je definitieve versie moet nog steeds scanbaar, rustig en ATS-vriendelijk worden opgebouwd.',
    },
];

const routeChoiceCards = [
    {
        href: '/cv-gids/cv-voorbeelden-per-situatie',
        title: 'CV voorbeelden per situatie',
        body: 'Sterk als je niet op beroep zoekt maar op context, zoals zonder ervaring, carrièreswitch of parttime werk.',
    },
    {
        href: '/cv-voorbeeld-student',
        title: 'CV voorbeeld student',
        body: 'Beste route als je vooral een starter-, stage- of studentgericht voorbeeld nodig hebt.',
    },
    {
        href: '/templates',
        title: 'Templates vergelijken',
        body: 'Handig als je de inhoud al scherp hebt en nu vooral een recruiter-safe layout wilt kiezen.',
    },
    {
        href: '/cv-maken',
        title: 'CV maken stappenplan',
        body: 'Kies deze route als je liever het volledige proces volgt van eerste opzet tot definitieve PDF.',
    },
];

const recruiterSignals = [
    'Heldere functietitel en profieltekst die overeenkomen met de vacature.',
    'Werkervaring met resultaten in plaats van alleen taken.',
    'Vaardigheden die bewijsbaar terugkomen in projecten en prestaties.',
    'Relevante opleiding, certificaten en actuele tools/technieken.',
    "Consistente opmaak met maximaal 1 tot 2 pagina's en goede leesbaarheid.",
];

const clusterSummaries: Record<string, string> = {
    'studenten-en-starters': 'Voor stages, bijbanen en eerste banen. Focus op potentie, stage-impact, projecten en leercurve.',
    'zorg-en-welzijn': 'Voor zorgfuncties waar kwaliteit, patientgerichtheid en teamafstemming centraal staan.',
    'technologie-en-ict': 'Voor IT-rollen met nadruk op stack, productimpact, schaalbaarheid en samenwerking.',
    'vakmanschap-en-logistiek': 'Voor uitvoerende en logistieke functies met duidelijke output, veiligheid en efficiency.',
    onderwijs: 'Voor leerkrachten en onderwijsprofessionals met didactiek, bevoegdheden en leerlingbegeleiding.',
    'horeca-en-detailhandel': 'Voor service- en winkelrollen met klanttevredenheid, omzetbijdrage en tempo.',
    'zakelijk-en-financieel': 'Voor zakelijke rollen waar betrouwbaarheid, analyse en procesverbetering tellen.',
    'marketing-en-communicatie': 'Voor growth- en communicatiefuncties met zichtbare campagne- en contentresultaten.',
    'juridisch-en-overheid': 'Voor publieke en juridische rollen met nauwkeurigheid, dossierkwaliteit en regelgeving.',
    'bouw-en-techniek': 'Voor technische en bouwfuncties met planning, veiligheid, oplevering en vakkennis.',
};

const popularRoleLinks = [
    { label: 'CV voorbeeld student', href: '/cv-voorbeeld-student' },
    { label: 'CV middelbare school student', href: '/cv-middelbare-school-student' },
    { label: 'CV voorbeeld starter', href: '/cv-voorbeeld-starter' },
    { label: 'CV voorbeeld zonder ervaring', href: '/cv-gids/cv-voorbeeld-zonder-ervaring' },
    { label: 'CV voorbeeld student bijbaan', href: '/cv-gids/cv-voorbeeld-student-bijbaan' },
    { label: 'CV horeca voorbeeld', href: '/cv-gids/cv-voorbeeld-horeca-medewerker' },
    { label: 'CV voorbeeld stage', href: '/cv-voorbeelden/studenten-en-starters/stage-cv' },
    { label: 'CV voorbeeld verpleegkundige', href: '/cv-voorbeelden/zorg-en-welzijn/verpleegkundige' },
    { label: 'CV voorbeeld software ontwikkelaar', href: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar' },
    { label: 'CV voorbeeld projectmanager', href: '/cv-gids/cv-voorbeeld-projectmanager' },
    { label: 'CV voorbeeld systeembeheerder', href: '/cv-voorbeelden/technologie-en-ict/systeembeheerder' },
    { label: 'CV voorbeeld onderwijsassistent', href: '/cv-voorbeelden/onderwijs/onderwijsassistent' },
    { label: 'CV voorbeeld accountant', href: '/cv-voorbeelden/zakelijk-en-financieel/accountant' },
    { label: 'CV voorbeeld HR medewerker', href: '/cv-voorbeelden/zakelijk-en-financieel/hr-medewerker' },
    { label: 'CV voorbeeld marketing manager', href: '/cv-voorbeelden/marketing-en-communicatie/marketing-manager' },
    { label: 'CV voorbeeld juridisch medewerker', href: '/cv-voorbeelden/juridisch-en-overheid/juridisch-medewerker' },
    { label: 'CV voorbeeld magazijnmedewerker', href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker' },
    { label: 'CV magazijnmedewerker zonder ervaring', href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-zonder-ervaring' },
    { label: 'CV magazijnmedewerker parttime', href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-parttime' },
    { label: 'CV voorbeeld orderpicker', href: '/cv-gids/cv-voorbeeld-orderpicker' },
    { label: 'CV voorbeeld timmerman', href: '/cv-voorbeelden/bouw-en-techniek/timmerman' },
];

const faqs = [
    {
        question: 'Wat is een goed CV voorbeeld?',
        answer: 'Een goed CV voorbeeld laat duidelijke structuur, relevante inhoud en concrete resultaten zien. Gebruik een voorbeeld dat past bij je functie en ervaringsniveau, en pas vervolgens tekst en vaardigheden aan op de vacature waarop je solliciteert.',
    },
    {
        question: 'Wat is het verschil tussen een CV voorbeeld en een template?',
        answer: 'Een CV voorbeeld helpt je vooral met inhoud, formuleringen en opbouw per functie. Een template helpt je met layout en presentatie. Het beste resultaat krijg je door eerst een relevant voorbeeld te kiezen en daarna te finaliseren in een rustige template.',
    },
    {
        question: 'Kan ik een CV voorbeeld letterlijk overnemen?',
        answer: 'Gebruik voorbeelden als basis, niet als eindversie. Recruiters herkennen gekopieerde teksten snel. De sterkste aanpak is: structuur overnemen, taal aanpassen aan de vacature en eigen resultaten toevoegen met concrete cijfers.',
    },
    {
        question: 'Hoe lang moet mijn CV zijn?',
        answer: "Voor de meeste kandidaten werkt 1 tot 2 pagina's het best. Starters kunnen vaak op 1 pagina blijven; ervaren professionals mogen naar 2 pagina's als de inhoud relevant en goed scanbaar blijft.",
    },
    {
        question: 'Wat zet ik in de werkervaring op mijn CV?',
        answer: 'Plaats per functie 3 tot 6 bullets met actie en resultaat. Benoem wat je hebt verbeterd, hoeveel impact je had en in welke context je werkte. Dat overtuigt veel sterker dan een lijst met algemene verantwoordelijkheden.',
    },
    {
        question: 'Welke template moet ik kiezen voor Nederlandse sollicitaties?',
        answer: 'Kies een rustige, professionele template die ATS-vriendelijk en goed leesbaar is. In Nederland werkt een duidelijke, zakelijke opmaak meestal beter dan een zeer creatieve layout, tenzij de functie dat expliciet vraagt.',
    },
    {
        question: 'Waar begin ik als ik snel een goed CV nodig heb?',
        answer: 'Start met een relevant voorbeeld op deze pagina, verbeter je profieltekst en werkervaring, en zet alles direct in de editor. Zo kun je snel van inspiratie naar een sollicitatieklaar CV gaan zonder opmaakstress.',
    },
    {
        question: 'Welke pagina gebruik ik als ik geen beroep maar een situatie zoek?',
        answer: 'Gebruik dan eerder de situatiehub of gerichte routes zoals student, starter, zonder ervaring of carrièreswitch. Die intenties zijn smaller dan deze brede voorbeeldenhub en geven sneller de juiste opbouw.',
    },
];

export default function CVVoorbeeldenOverview() {
    const categories = getAllCategories();
    const totalExamples = getAllExamples().length;

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };

    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'CV Voorbeelden per Beroep',
        description: metadata.description,
        url: 'https://werkcv.nl/cv-voorbeelden',
        about: categories.map((category) => category.name),
        hasPart: categories.map((category) => ({
            '@type': 'CollectionPage',
            name: category.name,
            url: `https://werkcv.nl/cv-voorbeelden/${category.slug}`,
        })),
    };

    return (
        <main className="min-h-screen bg-[#FFFEF9]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />

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

            <section className="border-b-4 border-black bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <span className="inline-block bg-[#4ECDC4] text-black text-sm font-bold px-3 py-1 mb-4 border-2 border-black">
                        {totalExamples}+ CV VOORBEELDEN
                    </span>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">
                        CV Voorbeelden per beroep
                    </h1>
                    <p className="text-xl md:text-2xl max-w-4xl text-gray-700 leading-relaxed">
                        Op deze pagina vind je uitgebreide CV voorbeelden voor starters, medior en senior kandidaten in verschillende sectoren. Je krijgt niet alleen inspiratie voor opmaak, maar vooral voor inhoud die recruiters vertrouwen geeft:
                        een scherpe profieltekst, resultaatgerichte werkervaring en een duidelijke structuur die in seconden scanbaar is.
                    </p>
                    <p className="mt-5 max-w-4xl text-base text-gray-700 leading-relaxed">
                        Gebruik elk voorbeeld als startpunt, niet als kopie. Koppel de structuur aan jouw prestaties en vacaturetaal, zodat je CV zowel menselijk overtuigt als ATS-systemen goed kunnen lezen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link
                            href="/editor"
                            className="inline-block border-4 border-black bg-yellow-300 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
                        >
                            Start direct in editor
                        </Link>
                        <Link
                            href="/templates"
                            className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
                        >
                            Vergelijk templates
                        </Link>
                        <Link
                            href="/prijzen"
                            className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
                        >
                            Bekijk prijzen
                        </Link>
                    </div>
                    <p className="mt-5 text-sm font-semibold text-gray-600">
                        Laatste inhoudelijke update: maart 2026
                    </p>
                </div>
            </section>

            <section className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                        Kort antwoord
                    </p>
                    <h2 className="mt-2 text-3xl font-black text-black">Wat is een goed CV voorbeeld?</h2>
                    <p className="mt-3 max-w-5xl text-sm font-medium leading-relaxed text-slate-700">
                        Een goed CV voorbeeld laat niet alleen zien hoe een CV eruitziet, maar vooral hoe het leest: duidelijke functietitel, relevante profieltekst, werkervaring met bewijs en een structuur die je snel kunt aanpassen op jouw vacature. Veel mensen zoeken op &ldquo;voorbeeld cv&rdquo;, maar bedoelen eigenlijk: welke opbouw en toon geven mij de snelste route naar een geloofwaardige sollicitatieversie?
                    </p>
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {quickUseCards.map((card) => (
                            <article
                                key={card.title}
                                className="border-2 border-black bg-[#FFFEF0] p-5"
                            >
                                <h3 className="text-lg font-black text-gray-900">{card.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">{card.text}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {routeChoiceCards.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="border-2 border-black bg-white p-4 transition-colors hover:bg-yellow-100"
                            >
                                <p className="text-sm font-black text-gray-900">{item.title}</p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <h2 className="text-3xl font-black mb-6">Hoe gebruik je deze CV voorbeelden slim?</h2>
                    <p className="text-gray-700 leading-relaxed max-w-5xl">
                        Deze hub is opgebouwd als complete workflow: eerst een passend voorbeeld kiezen, daarna profieltekst en werkervaring aanscherpen, en vervolgens direct finaliseren in de editor.
                    </p>
                    <div className="mt-8 grid md:grid-cols-2 gap-6">
                        {workflowSteps.map((step) => (
                            <article
                                key={step.title}
                                className="border-3 border-black bg-[#F8F8F8] p-5"
                                style={{ borderWidth: '3px' }}
                            >
                                <h3 className="text-xl font-black text-gray-900">{step.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-gray-700">{step.text}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link href="/cv-samenvatting-voorbeelden" className="border-2 border-black bg-yellow-50 p-4 hover:bg-yellow-100 transition-colors">
                            <p className="font-black text-sm">CV samenvatting voorbeelden</p>
                            <p className="text-xs mt-1 text-gray-700">Schrijf een openingsalinea met echte impact.</p>
                        </Link>
                        <Link href="/profieltekst-cv-voorbeelden" className="border-2 border-black bg-amber-50 p-4 hover:bg-amber-100 transition-colors">
                            <p className="font-black text-sm">Voorbeeld profiel CV</p>
                            <p className="text-xs mt-1 text-gray-700">Gebruik profieltekst voorbeelden die direct onder je naam en functietitel passen.</p>
                        </Link>
                        <Link href="/cv-maken" className="border-2 border-black bg-orange-50 p-4 hover:bg-orange-100 transition-colors">
                            <p className="font-black text-sm">CV maken stappenplan</p>
                            <p className="text-xs mt-1 text-gray-700">Volg een complete workflow van voorbeeld naar eindversie.</p>
                        </Link>
                        <Link href="/werkervaring-cv-voorbeelden" className="border-2 border-black bg-green-50 p-4 hover:bg-green-100 transition-colors">
                            <p className="font-black text-sm">Werkervaring voorbeelden</p>
                            <p className="text-xs mt-1 text-gray-700">Zet taken om in resultaatgerichte bullets.</p>
                        </Link>
                        <Link href="/tools/profieltekst-generator" className="border-2 border-black bg-blue-50 p-4 hover:bg-blue-100 transition-colors">
                            <p className="font-black text-sm">Profieltekst generator</p>
                            <p className="text-xs mt-1 text-gray-700">Maak in minuten een vacaturegerichte intro.</p>
                        </Link>
                        <Link href="/tools/werkervaring-bullets" className="border-2 border-black bg-purple-50 p-4 hover:bg-purple-100 transition-colors">
                            <p className="font-black text-sm">Werkervaring bullets tool</p>
                            <p className="text-xs mt-1 text-gray-700">Genereer sterke bullets per functie.</p>
                        </Link>
                        <Link href="/vaardigheden-cv-voorbeelden" className="border-2 border-black bg-emerald-50 p-4 hover:bg-emerald-100 transition-colors">
                            <p className="font-black text-sm">Vaardigheden CV voorbeelden</p>
                            <p className="text-xs mt-1 text-gray-700">Bouw een sterke skillssectie met vacaturematch.</p>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-black mb-3">Kies je vakgebied</h2>
                <p className="text-gray-700 mb-8 max-w-4xl leading-relaxed">
                    Elke sector heeft eigen verwachtingen in toon, vaardigheden en bewijsvoering. In zorg en onderwijs draait het bijvoorbeeld vaak om samenwerking en kwaliteit van uitvoering, terwijl in ICT en marketing resultaatmetrics en projecten zwaarder wegen. Kies daarom de categorie die het dichtst bij je doelrol ligt.
                </p>

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
                                <p className="text-gray-700 mb-4 line-clamp-4">
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

            <section className="border-t-4 border-black border-b-4 bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-black mb-4">Rolclusters met hoge sollicitatie-intentie</h2>
                    <p className="text-gray-700 max-w-5xl leading-relaxed">
                        Veel bezoekers zoeken niet op algemene termen, maar op concrete functies zoals &ldquo;CV voorbeeld verpleegkundige&rdquo; of &ldquo;CV voorbeeld software ontwikkelaar&rdquo;. Daarom vind je hieronder per cluster directe links naar relevante beroepen, zodat je snel de juiste voorbeeldtekst en opbouw kunt kiezen.
                    </p>
                    <div className="mt-8 grid lg:grid-cols-2 gap-6">
                        {categories.map((category) => {
                            const examples = getExamplesByCategory(category.slug).slice(0, 4);
                            const summary = clusterSummaries[category.slug] || category.description;

                            return (
                                <article key={category.slug} className="border-4 border-black bg-[#FFFEF9] p-6">
                                    <h3 className="text-2xl font-black text-gray-900">{category.name}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-gray-700">{summary}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {examples.map((example) => (
                                            <Link
                                                key={example.slug}
                                                href={`/cv-voorbeelden/${category.slug}/${example.slug}`}
                                                className="border-2 border-black bg-white px-3 py-1.5 text-sm font-bold hover:bg-yellow-100 transition-colors"
                                            >
                                                {example.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/cv-voorbeelden/${category.slug}`}
                                        className="mt-4 inline-block text-sm font-black underline decoration-2 underline-offset-4"
                                    >
                                        Bekijk alle {category.name.toLowerCase()} voorbeelden
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-[#FDFDFD]">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <h2 className="text-3xl font-black mb-6">Populaire zoekopdrachten</h2>
                    <p className="text-gray-700 mb-6 max-w-5xl leading-relaxed">
                        Deze veelgezochte rollen zijn een goede start als je snel wilt vergelijken hoe functies profieltekst, werkervaring en vaardigheden presenteren. Open 2 of 3 voorbeelden, combineer de beste onderdelen en bouw daarna je eigen versie in de editor.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {popularRoleLinks.map((role) => (
                            <Link
                                key={role.href}
                                href={role.href}
                                className="bg-[#E8E8E8] px-4 py-2 border-2 border-black font-semibold hover:bg-yellow-100 transition-colors"
                            >
                                {role.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-[#FFFEF9]">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <h2 className="text-3xl font-black mb-4">Van voorbeelden naar de juiste CV-route</h2>
                    <p className="text-gray-700 max-w-5xl leading-relaxed">
                        Niet iedere bezoeker heeft alleen een voorbeeld nodig. Soms zoek je eigenlijk naar een{" "}
                        <Link href="/professioneel-cv-voorbeeld" className="font-bold underline decoration-2 underline-offset-2">
                            professioneel CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/cv-voorbeeld-student" className="font-bold underline decoration-2 underline-offset-2">
                            student CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/cv-voorbeeld-starter" className="font-bold underline decoration-2 underline-offset-2">
                            starter CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/modern-cv-voorbeeld" className="font-bold underline decoration-2 underline-offset-2">
                            modern CV voorbeeld
                        </Link>
                        , een aparte pagina voor{" "}
                        <Link href="/cv-maken-student" className="font-bold underline decoration-2 underline-offset-2">
                            CV maken als student
                        </Link>
                        {" "}of juist hulp bij{" "}
                        <Link href="/cv-opmaken" className="font-bold underline decoration-2 underline-offset-2">
                            CV opmaken
                        </Link>
                        . Gebruik deze routes als je intentie specifieker is dan alleen inspiratie opdoen.
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {[
                            {
                                href: "/cv-voorbeeld-student",
                                title: "CV voorbeeld student",
                                body: "Gebruik deze route als je zoekt naar een duidelijke student-opbouw voor stage, bijbaan of eerste stap.",
                            },
                            {
                                href: "/cv-middelbare-school-student",
                                title: "CV middelbare school student",
                                body: "Speciaal voor scholieren die een eerste CV nodig hebben voor stage, bijbaan of vakantiewerk.",
                            },
                            {
                                href: "/cv-voorbeeld-starter",
                                title: "CV voorbeeld starter",
                                body: "Sterk voor junior rollen, traineeships en eerste banen waar potentie duidelijk moet landen.",
                            },
                            {
                                href: "/professioneel-cv-voorbeeld",
                                title: "Professioneel CV voorbeeld",
                                body: "Voor rustige, zakelijke sollicitaties waar betrouwbaarheid en scanbaarheid prioriteit hebben.",
                            },
                            {
                                href: "/modern-cv-voorbeeld",
                                title: "Modern CV voorbeeld",
                                body: "Voor marketing, sales en andere rollen waar een frissere uitstraling logisch is.",
                            },
                            {
                                href: "/cv-opmaken",
                                title: "CV opmaken",
                                body: "Ga van inhoudelijke inspiratie naar betere layout, hiërarchie en leesbaarheid.",
                            },
                            {
                                href: "/cv-maken-student",
                                title: "CV maken student",
                                body: "Speciaal voor studenten, starters en profielen met weinig formele werkervaring.",
                            },
                            {
                                href: "/cv-maken-in-engels",
                                title: "CV maken in Engels",
                                body: "Handig als je internationaal solliciteert maar wel de Nederlandse structuur wilt aanhouden.",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5"
                            >
                                <p className="text-sm font-black text-gray-900">{item.title}</p>
                                <p className="mt-2 text-sm leading-relaxed text-gray-700">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-black mb-6">Wat recruiters in 2026 in een CV scannen</h2>
                    <p className="text-gray-700 max-w-5xl leading-relaxed">
                        Op basis van huidige Nederlandse vacaturepatronen zie je steeds dezelfde beoordelingspunten terug. Een CV dat goed converteert naar gesprekken is meestal helder, bewijsbaar en direct gekoppeld aan de rol. Gebruik deze checklist wanneer je je voorbeeld-CV omzet naar je eigen versie.
                    </p>
                    <ul className="mt-6 grid md:grid-cols-2 gap-4">
                        {recruiterSignals.map((signal) => (
                            <li key={signal} className="border-2 border-black bg-[#FFFEF0] p-4 text-sm font-medium text-gray-700 leading-relaxed">
                                {signal}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm leading-relaxed text-gray-700">
                        Wil je deze checklist direct toepassen? Bekijk onze gidsen over{' '}
                        <Link href="/cv-tips/cv-schrijven-tips" className="font-bold underline decoration-2 underline-offset-2">
                            CV schrijven
                        </Link>
                        ,{' '}
                        <Link href="/cv-tips/profieltekst-schrijven" className="font-bold underline decoration-2 underline-offset-2">
                            profieltekst verbeteren
                        </Link>
                        {' '}en kies daarna een template via{' '}
                        <Link href="/templates" className="font-bold underline decoration-2 underline-offset-2">
                            templates
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <section className="border-b-4 border-black bg-[#FFFEF9]">
                <div className="max-w-5xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-black mb-8 text-center">Veelgestelde vragen over CV voorbeelden</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="group border-4 border-black bg-white">
                                <summary className="cursor-pointer p-5 text-left flex items-center justify-between">
                                    <span className="font-black text-base text-gray-900">{faq.question}</span>
                                    <span className="text-xl font-black transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="border-t-2 border-black px-5 py-4 text-sm leading-relaxed text-gray-700">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="border-t-4 border-black bg-[#4ECDC4]">
                <div className="max-w-6xl mx-auto px-6 py-16 text-center">
                    <h2 className="text-4xl font-black mb-4 text-gray-900">
                        Klaar om je eigen CV te bouwen?
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-900">
                        Start met een voorbeeld dat bij je functie past, maak je inhoud vacaturegericht en finaliseer in de editor. Je begint gratis en betaalt alleen bij download.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link
                            href="/editor"
                            className="inline-block bg-black text-white font-bold px-10 py-5 text-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Start je CV in editor
                        </Link>
                        <Link
                            href="/templates"
                            className="inline-block bg-white text-black font-bold px-10 py-5 text-xl border-4 border-black"
                        >
                            Bekijk templates
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
