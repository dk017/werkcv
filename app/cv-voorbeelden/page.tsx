import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCategories, getAllExamples, getExamplesByCategory } from '@/lib/cv-voorbeelden/registry';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { buildDutchMetadata } from '@/lib/page-metadata';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const metadata: Metadata = buildDutchMetadata({
    title: '80+ CV Voorbeelden per Beroep 2026 - Maak je CV | WerkCV',
    description: 'Bekijk 80+ Nederlandse CV voorbeelden per beroep. Kies een voorbeeld, pas profiel en werkervaring aan en maak direct een ATS-vriendelijk PDF-CV.',
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

const visualExamples = [
    {
        name: 'Student',
        href: '/cv-voorbeelden/studenten-en-starters/student-cv',
        src: '/cv-example-previews/student-cv.png',
        alt: 'CV voorbeeld student — ATS-vriendelijk WerkCV template',
    },
    {
        name: 'Verpleegkundige',
        href: '/cv-voorbeelden/zorg-en-welzijn/verpleegkundige',
        src: '/cv-example-previews/verpleegkundige.png',
        alt: 'CV voorbeeld verpleegkundige — ATS-vriendelijk WerkCV template',
    },
    {
        name: 'Softwareontwikkelaar',
        href: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
        src: '/cv-example-previews/software-ontwikkelaar.png',
        alt: 'CV voorbeeld softwareontwikkelaar — professioneel WerkCV template',
    },
    {
        name: 'Magazijnmedewerker',
        href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
        src: '/cv-example-previews/magazijnmedewerker.png',
        alt: 'CV voorbeeld magazijnmedewerker — scanbaar WerkCV template',
    },
    {
        name: 'Onderwijsassistent',
        href: '/cv-voorbeelden/onderwijs/onderwijsassistent',
        src: '/cv-example-previews/onderwijsassistent.png',
        alt: 'CV voorbeeld onderwijsassistent — rustig WerkCV template',
    },
    {
        name: 'Winkelmedewerker',
        href: '/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker',
        src: '/cv-example-previews/winkelmedewerker.png',
        alt: 'CV voorbeeld winkelmedewerker — professioneel WerkCV template',
    },
    {
        name: 'Administratief medewerker',
        href: '/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker',
        src: '/cv-example-previews/administratief-medewerker.png',
        alt: 'CV voorbeeld administratief medewerker — ATS-vriendelijk WerkCV template',
    },
    {
        name: 'Marketing manager',
        href: '/cv-voorbeelden/marketing-en-communicatie/marketing-manager',
        src: '/cv-example-previews/marketing-manager.png',
        alt: 'CV voorbeeld marketing manager — modern WerkCV template',
    },
] as const;

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
    { label: 'CV serveerster', href: '/cv-voorbeelden/horeca-en-detailhandel/ober-serveerster' },
    { label: 'CV voorbeeld stage', href: '/cv-voorbeelden/studenten-en-starters/stage-cv' },
    { label: 'CV voorbeeld verpleegkundige', href: '/cv-voorbeelden/zorg-en-welzijn/verpleegkundige' },
    { label: 'Softwareontwikkelaar CV', href: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar' },
    { label: 'CV ICT medewerker', href: '/cv-voorbeelden/technologie-en-ict/ict-medewerker' },
    { label: 'CV cyber security specialist', href: '/cv-voorbeelden/technologie-en-ict/cybersecurity-specialist' },
    { label: 'CV voorbeeld projectmanager', href: '/cv-gids/cv-voorbeeld-projectmanager' },
    { label: 'CV voorbeeld systeembeheerder', href: '/cv-voorbeelden/technologie-en-ict/systeembeheerder' },
    { label: 'CV voor onderwijsassistent', href: '/cv-voorbeelden/onderwijs/onderwijsassistent' },
    { label: 'CV voorbeeld accountant', href: '/cv-voorbeelden/zakelijk-en-financieel/accountant' },
    { label: 'CV voorbeeld HR medewerker', href: '/cv-voorbeelden/zakelijk-en-financieel/hr-medewerker' },
    { label: 'CV voorbeeld marketing manager', href: '/cv-voorbeelden/marketing-en-communicatie/marketing-manager' },
    { label: 'CV voorbeeld juridisch medewerker', href: '/cv-voorbeelden/juridisch-en-overheid/juridisch-medewerker' },
    { label: 'CV voorbeeld magazijnmedewerker', href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker' },
    { label: 'CV magazijnmedewerker zonder ervaring', href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-zonder-ervaring' },
    { label: 'CV magazijnmedewerker parttime', href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-parttime' },
    { label: 'CV voorbeeld orderpicker', href: '/cv-gids/cv-voorbeeld-orderpicker' },
    { label: 'CV vrachtwagenchauffeur voorbeeld', href: '/cv-voorbeelden/vakmanschap-en-logistiek/chauffeur' },
    { label: 'CV voorbeeld timmerman', href: '/cv-voorbeelden/bouw-en-techniek/timmerman' },
];

const priorityRoleCards = [
    {
        title: 'CV voorbeeld student',
        href: '/cv-voorbeeld-student',
        intent: 'Voor stage, bijbaan of eerste baan',
        body: 'Start hier als opleiding, projecten, bijbaan en beschikbaarheid belangrijker zijn dan jaren werkervaring.',
    },
    {
        title: 'CV voorbeeld zonder ervaring',
        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
        intent: 'Voor starters en zij-instromers',
        body: 'Gebruik deze route als je bewijs moet halen uit studie, vrijwilligerswerk, projecten of overdraagbare vaardigheden.',
    },
    {
        title: 'CV voorbeeld verpleegkundige',
        href: '/cv-voorbeelden/zorg-en-welzijn/verpleegkundige',
        intent: 'Voor zorgrollen met verantwoordelijkheid',
        body: 'Sterk wanneer patiëntgerichtheid, BIG/context, rapportage, samenwerking en kwaliteit snel zichtbaar moeten zijn.',
    },
    {
        title: 'Softwareontwikkelaar CV',
        href: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
        intent: 'Voor developer- en ICT-sollicitaties',
        body: 'Richt je CV op stack, projecten, productimpact, GitHub/portfolio en ATS-herkenbare technische termen.',
    },
    {
        title: 'CV administratief medewerker',
        href: '/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker',
        intent: 'Voor kantoor, backoffice en support',
        body: 'Laat nauwkeurigheid, systemen, documentstromen, planning en procesverbetering concreet terugkomen.',
    },
    {
        title: 'CV voorbeeld magazijnmedewerker',
        href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
        intent: 'Voor logistiek en uitvoerend werk',
        body: 'Maak inzetbaarheid, veiligheid, tempo, WMS/scannerervaring en ploegendienst direct scanbaar.',
    },
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

const contentRouteCards = [
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

    const priorityExamplesSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Meest gezochte CV voorbeelden',
        itemListElement: priorityRoleCards.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.title,
            url: `https://werkcv.nl${item.href}`,
        })),
    };

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(priorityExamplesSchema) }}
            />

            <div className="border-b border-[var(--wk-border)] bg-[var(--wk-surface)]">
                <div className="wk-container py-3">
                    <Breadcrumbs
                        items={[
                            { label: 'Home', href: '/' },
                            { label: 'CV Voorbeelden', href: '/cv-voorbeelden' },
                        ]}
                    />
                </div>
            </div>

            <section className="wk-section">
                <div className="wk-container">
                    <div className="mb-6 flex justify-end">
                        <LanguageSwitcher tone="brand" />
                    </div>
                    <span className="wk-badge wk-badge-accent mb-4">{totalExamples}+ CV VOORBEELDEN</span>
                    <h1 className="mb-6 text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
                        <span className="wk-hero-highlight">80+ CV voorbeelden</span> per beroep
                    </h1>
                    <p className="max-w-4xl text-xl leading-9 text-[var(--wk-ink-muted)]">
                        Op deze pagina vind je uitgebreide CV voorbeelden voor starters, medior en senior kandidaten in verschillende sectoren. Je krijgt niet alleen inspiratie voor opmaak, maar vooral voor inhoud die recruiters vertrouwen geeft:
                        een scherpe profieltekst, resultaatgerichte werkervaring en een duidelijke structuur die in seconden scanbaar is.
                    </p>
                    <p className="mt-5 max-w-4xl leading-7 text-[var(--wk-ink-muted)]">
                        Gebruik elk voorbeeld als startpunt, niet als kopie. Koppel de structuur aan jouw prestaties en vacaturetaal, zodat je CV zowel menselijk overtuigt als ATS-systemen goed kunnen lezen.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Link href="/editor" className="wk-button wk-button-primary">
                            Start direct in editor
                        </Link>
                        <Link href="/templates" className="wk-button wk-button-secondary">
                            Vergelijk templates
                        </Link>
                        <Link href="/prijzen" className="wk-button wk-button-quiet">
                            Bekijk prijzen
                        </Link>
                    </div>
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
                            Bekijk echte CV voorbeelden
                        </h2>
                        <p className="mt-2 text-sm font-medium text-[var(--wk-ink-muted)]">
                            Elke preview is gerenderd met echte voorbeeldinhoud uit de WerkCV-editor.
                        </p>
                        <div className="mt-5 grid auto-cols-[44%] grid-flow-col gap-4 overflow-x-auto pb-4 sm:auto-cols-[30%] lg:grid-flow-row lg:grid-cols-8 lg:overflow-visible">
                            {visualExamples.map((example, index) => (
                                <Link
                                    key={example.href}
                                    href={example.href}
                                    className="wk-card group block min-w-0 p-2 transition-transform hover:-translate-y-1"
                                >
                                    <div className="aspect-[210/297] overflow-hidden rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)]">
                                        <Image
                                            src={example.src}
                                            alt={example.alt}
                                            width={794}
                                            height={1123}
                                            priority={index === 0}
                                            sizes="(max-width: 639px) 44vw, (max-width: 1023px) 30vw, 128px"
                                            className="h-full w-full object-cover object-top"
                                        />
                                    </div>
                                    <p className="mt-2 truncate text-xs font-semibold text-[var(--wk-ink)] group-hover:text-[var(--wk-primary)]">
                                        {example.name}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <p className="mt-5 text-sm font-medium text-[var(--wk-ink-muted)]">
                        Laatste inhoudelijke update: maart 2026
                    </p>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <div className="wk-eyebrow mb-3">
                        <span>Kort antwoord</span>
                    </div>
                    <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">Wat is een goed CV voorbeeld?</h2>
                    <p className="mt-3 max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Een goed CV voorbeeld laat niet alleen zien hoe een CV eruitziet, maar vooral hoe het leest: duidelijke functietitel, relevante profieltekst, werkervaring met bewijs en een structuur die je snel kunt aanpassen op jouw vacature. Veel mensen zoeken op &ldquo;voorbeeld cv&rdquo;, maar bedoelen eigenlijk: welke opbouw en toon geven mij de snelste route naar een geloofwaardige sollicitatieversie?
                    </p>
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {quickUseCards.map((card) => (
                            <article key={card.title} className="wk-card p-5">
                                <h3 className="text-lg font-semibold text-[var(--wk-ink)]">{card.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{card.text}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {routeChoiceCards.map((item) => (
                            <Link key={item.href} href={item.href} className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <div className="max-w-4xl">
                        <div className="wk-eyebrow mb-3">
                            <span>Meest gekozen startpunten</span>
                        </div>
                        <h2 className="text-3xl font-semibold text-[var(--wk-ink)]">
                            Begin bij het voorbeeld dat het dichtst bij je sollicitatie ligt
                        </h2>
                        <p className="mt-3 leading-7 text-[var(--wk-ink-muted)]">
                            De snelste route is niet alle voorbeelden bekijken, maar één sterk uitgangspunt kiezen en dat meteen aanpassen op je vacature. Deze routes krijgen daarom meer gewicht in de interne structuur van de hub.
                        </p>
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {priorityRoleCards.map((role) => (
                            <article key={role.href} className="wk-card flex h-full flex-col p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--wk-ink-muted)]">
                                    {role.intent}
                                </p>
                                <h3 className="mt-2 text-xl font-semibold text-[var(--wk-ink)]">
                                    {role.title}
                                </h3>
                                <p className="mt-3 flex-1 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    {role.body}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2">
                                    <Link href={role.href} className="wk-button wk-button-secondary wk-button-small">
                                        Bekijk voorbeeld
                                    </Link>
                                    <Link href="/editor" className="wk-button wk-button-quiet wk-button-small">
                                        Maak eigen CV
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-6 md:p-8">
                        <h3 className="text-2xl font-semibold text-[var(--wk-primary-contrast)]">
                            Van voorbeeld naar sollicitatieklare PDF
                        </h3>
                        <p className="mt-2 max-w-4xl text-sm leading-7 text-[var(--wk-primary-contrast)]/80">
                            Gebruik een voorbeeld voor inhoud en volgorde, kies daarna een rustige template en bouw de definitieve versie in de editor. Zo voorkom je dat inspiratie verandert in knip-en-plakwerk.
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link href="/templates" className="wk-button wk-button-secondary wk-button-small">
                                Bekijk templates
                            </Link>
                            <Link href="/editor" className="wk-button wk-button-accent wk-button-small">
                                Start in editor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-6 text-3xl font-semibold text-[var(--wk-ink)]">Hoe gebruik je deze CV voorbeelden slim?</h2>
                    <p className="max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Deze hub is opgebouwd als complete workflow: eerst een passend voorbeeld kiezen, daarna profieltekst en werkervaring aanscherpen, en vervolgens direct finaliseren in de editor.
                    </p>
                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                        {workflowSteps.map((step) => (
                            <article key={step.title} className="wk-card p-5">
                                <h3 className="text-xl font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                                <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.text}</p>
                            </article>
                        ))}
                    </div>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Link href="/cv-samenvatting-voorbeelden" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">CV samenvatting voorbeelden</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Schrijf een openingsalinea met echte impact.</p>
                        </Link>
                        <Link href="/profieltekst-cv-voorbeelden" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">Voorbeeld profiel CV</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Gebruik profieltekst voorbeelden die direct onder je naam en functietitel passen.</p>
                        </Link>
                        <Link href="/cv-maken" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">CV maken stappenplan</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Volg een complete workflow van voorbeeld naar eindversie.</p>
                        </Link>
                        <Link href="/werkervaring-cv-voorbeelden" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">Werkervaring voorbeelden</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Zet taken om in resultaatgerichte bullets.</p>
                        </Link>
                        <Link href="/tools/profieltekst-generator" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">Profieltekst generator</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Maak in minuten een vacaturegerichte intro.</p>
                        </Link>
                        <Link href="/tools/werkervaring-bullets" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">Werkervaring bullets tool</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Genereer sterke bullets per functie.</p>
                        </Link>
                        <Link href="/vaardigheden-cv-voorbeelden" className="wk-card p-4 transition-colors hover:bg-[var(--wk-surface-subtle)]">
                            <p className="text-sm font-semibold text-[var(--wk-ink)]">Vaardigheden CV voorbeelden</p>
                            <p className="mt-1 text-xs leading-5 text-[var(--wk-ink-muted)]">Bouw een sterke skillssectie met vacaturematch.</p>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-3 text-3xl font-semibold text-[var(--wk-ink)]">Kies je vakgebied</h2>
                    <p className="mb-8 max-w-4xl leading-7 text-[var(--wk-ink-muted)]">
                        Elke sector heeft eigen verwachtingen in toon, vaardigheden en bewijsvoering. In zorg en onderwijs draait het bijvoorbeeld vaak om samenwerking en kwaliteit van uitvoering, terwijl in ICT en marketing resultaatmetrics en projecten zwaarder wegen. Kies daarom de categorie die het dichtst bij je doelrol ligt.
                    </p>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {categories.map((category) => {
                            const examples = getExamplesByCategory(category.slug);
                            const accent = categoryAccents[category.slug] || '#FFD700';

                            return (
                                <Link
                                    key={category.slug}
                                    href={`/cv-voorbeelden/${category.slug}`}
                                    className="wk-card group block p-6 transition-transform hover:-translate-y-0.5"
                                >
                                    <div
                                        className="mb-4 h-1.5 w-12 rounded-full"
                                        style={{ backgroundColor: accent }}
                                    />
                                    <h3 className="mb-3 text-2xl font-semibold text-[var(--wk-ink)] transition-colors group-hover:text-[var(--wk-primary)]">
                                        {category.name}
                                    </h3>
                                    <p className="mb-4 leading-7 text-[var(--wk-ink-muted)] line-clamp-4">
                                        {category.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-[var(--wk-ink-muted)]">
                                            {examples.length} voorbeelden
                                        </span>
                                        <span className="inline-flex items-center font-semibold text-[var(--wk-primary)]">
                                            Bekijk
                                            <svg className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-4 text-3xl font-semibold text-[var(--wk-ink)]">Rolclusters met hoge sollicitatie-intentie</h2>
                    <p className="max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Veel bezoekers zoeken niet op algemene termen, maar op concrete functies zoals &ldquo;CV voorbeeld verpleegkundige&rdquo; of &ldquo;CV voorbeeld software ontwikkelaar&rdquo;. Daarom vind je hieronder per cluster directe links naar relevante beroepen, zodat je snel de juiste voorbeeldtekst en opbouw kunt kiezen.
                    </p>
                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        {categories.map((category) => {
                            const examples = getExamplesByCategory(category.slug).slice(0, 4);
                            const summary = clusterSummaries[category.slug] || category.description;

                            return (
                                <article key={category.slug} className="wk-card p-6">
                                    <h3 className="text-2xl font-semibold text-[var(--wk-ink)]">{category.name}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{summary}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {examples.map((example) => (
                                            <Link
                                                key={example.slug}
                                                href={`/cv-voorbeelden/${category.slug}/${example.slug}`}
                                                className="wk-button wk-button-secondary wk-button-small"
                                            >
                                                {example.name}
                                            </Link>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/cv-voorbeelden/${category.slug}`}
                                        className="mt-4 inline-block text-sm font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4"
                                    >
                                        Bekijk alle {category.name.toLowerCase()} voorbeelden
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-6 text-3xl font-semibold text-[var(--wk-ink)]">Meer populaire CV voorbeeld-routes</h2>
                    <p className="mb-6 max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Staat je exacte rol hierboven niet tussen de startpunten? Gebruik dan deze extra routes. Open maximaal twee of drie voorbeelden, vergelijk profieltekst en werkervaring, en bouw daarna je eigen versie in de editor.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {popularRoleLinks.map((role) => (
                            <Link
                                key={role.href}
                                href={role.href}
                                className="wk-button wk-button-secondary wk-button-small"
                            >
                                {role.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-4 text-3xl font-semibold text-[var(--wk-ink)]">Van voorbeelden naar de juiste CV-route</h2>
                    <p className="max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Niet iedere bezoeker heeft alleen een voorbeeld nodig. Soms zoek je eigenlijk naar een{" "}
                        <Link href="/professioneel-cv-voorbeeld" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            professioneel CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/cv-voorbeeld-student" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            student CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/cv-voorbeeld-starter" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            starter CV voorbeeld
                        </Link>
                        , een{" "}
                        <Link href="/modern-cv-voorbeeld" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            modern CV voorbeeld
                        </Link>
                        , een aparte pagina voor{" "}
                        <Link href="/cv-maken-student" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            CV maken als student
                        </Link>
                        {" "}of juist hulp bij{" "}
                        <Link href="/cv-opmaken" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            CV opmaken
                        </Link>
                        . Gebruik deze routes als je intentie specifieker is dan alleen inspiratie opdoen.
                    </p>
                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {contentRouteCards.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="wk-card p-5 transition-transform hover:-translate-y-0.5"
                            >
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container">
                    <h2 className="mb-6 text-3xl font-semibold text-[var(--wk-ink)]">Wat recruiters in 2026 in een CV scannen</h2>
                    <p className="max-w-5xl leading-7 text-[var(--wk-ink-muted)]">
                        Op basis van huidige Nederlandse vacaturepatronen zie je steeds dezelfde beoordelingspunten terug. Een CV dat goed converteert naar gesprekken is meestal helder, bewijsbaar en direct gekoppeld aan de rol. Gebruik deze checklist wanneer je je voorbeeld-CV omzet naar je eigen versie.
                    </p>
                    <ul className="mt-6 grid gap-4 md:grid-cols-2">
                        {recruiterSignals.map((signal) => (
                            <li key={signal} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 text-sm font-medium leading-6 text-[var(--wk-ink-muted)]">
                                {signal}
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-sm leading-7 text-[var(--wk-ink-muted)]">
                        Wil je deze checklist direct toepassen? Bekijk onze gidsen over{' '}
                        <Link href="/cv-tips/cv-schrijven-tips" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            CV schrijven
                        </Link>
                        ,{' '}
                        <Link href="/cv-tips/profieltekst-schrijven" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            profieltekst verbeteren
                        </Link>
                        {' '}en kies daarna een template via{' '}
                        <Link href="/templates" className="font-semibold text-[var(--wk-primary)] underline decoration-[var(--wk-accent)] underline-offset-4">
                            templates
                        </Link>
                        .
                    </p>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container max-w-5xl">
                    <h2 className="mb-8 text-center text-3xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over CV voorbeelden</h2>
                    <div className="space-y-4">
                        {faqs.map((faq) => (
                            <details key={faq.question} className="wk-card group">
                                <summary className="flex cursor-pointer items-center justify-between p-5 text-left">
                                    <span className="text-base font-semibold text-[var(--wk-ink)]">{faq.question}</span>
                                    <span className="text-xl font-semibold text-[var(--wk-ink-muted)] transition-transform group-open:rotate-45">+</span>
                                </summary>
                                <div className="border-t border-[var(--wk-border)] px-5 py-4 text-sm leading-7 text-[var(--wk-ink-muted)]">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <section className="wk-section pt-0">
                <div className="wk-container text-center">
                    <div className="rounded-[var(--wk-radius-lg)] bg-[var(--wk-accent-soft)] p-8 md:p-14">
                        <h2 className="mb-4 text-3xl font-semibold text-[var(--wk-ink)] md:text-4xl">
                            Klaar om je eigen CV te bouwen?
                        </h2>
                        <p className="mx-auto mb-8 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
                            Start met een voorbeeld dat bij je functie past, maak je inhoud vacaturegericht en finaliseer in de editor. Je begint gratis en betaalt alleen bij download.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link href="/editor" className="wk-button wk-button-primary px-10 py-5 text-xl">
                                Start je CV in editor
                            </Link>
                            <Link href="/templates" className="wk-button wk-button-secondary px-10 py-5 text-xl">
                                Bekijk templates
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
