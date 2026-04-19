import { getPilotRoleGuidePages } from './programmatic-builders';
import { extraDutchEditorialPages } from './extra-dutch-pages';
import { SeoGuidePage } from './types';

type DutchSeed = {
    slug: string;
    keyword: string;
    role: string;
    painPoint: string;
};

type EnglishSeed = {
    slug: string;
    keyword: string;
    focus: string;
    audience: string;
};

type ContentPack = {
    recruiterSignals: string[];
    topSkills: string[];
    atsKeywords: string[];
    profileExamples: string[];
    bulletExamples: string[];
};

type SectionOverride = Partial<SeoGuidePage['sections'][number]>;

type GuideOverride = {
    title?: string;
    description?: string;
    metaTitle?: string;
    metaDesc?: string;
    keywords?: string[];
    intro?: string;
    checklist?: string[];
    faq?: SeoGuidePage['faq'];
    relatedLinks?: SeoGuidePage['relatedLinks'];
    sources?: SeoGuidePage['sources'];
    ctaTitle?: string;
    ctaText?: string;
    ctaHref?: string;
    sectionOverrides?: Record<string, SectionOverride>;
};

const dutchSeeds: DutchSeed[] = [
    { slug: 'cv-voorbeeld-administratief-medewerker', keyword: 'cv voorbeeld administratief medewerker', role: 'administratief medewerker', painPoint: 'je taken concreet en meetbaar te maken' },
    { slug: 'cv-voorbeeld-administratief-medewerker-parttime', keyword: 'cv administratief medewerker parttime', role: 'administratief medewerker parttime', painPoint: 'nauwkeurigheid en parttime inzet professioneel te combineren' },
    { slug: 'cv-voorbeeld-klantenservice-medewerker', keyword: 'cv voorbeeld klantenservice medewerker', role: 'klantenservice medewerker', painPoint: 'zowel soft skills als KPI-resultaten te laten zien' },
    { slug: 'cv-voorbeeld-verkoopmedewerker', keyword: 'cv voorbeeld verkoopmedewerker', role: 'verkoopmedewerker', painPoint: 'commerciele resultaten kort en overtuigend te benoemen' },
    { slug: 'cv-voorbeeld-horeca-medewerker', keyword: 'cv horeca voorbeeld', role: 'horeca medewerker', painPoint: 'gastvrijheid, tempo en betrouwbaarheid tegelijk overtuigend te laten zien' },
    { slug: 'cv-voorbeeld-callcenter-medewerker', keyword: 'cv voorbeeld callcenter medewerker', role: 'callcenter medewerker', painPoint: 'gesprekskwaliteit en targets goed te bewijzen' },
    { slug: 'cv-voorbeeld-receptionist', keyword: 'cv voorbeeld receptionist', role: 'receptionist', painPoint: 'servicegerichtheid en organisatiekracht in balans te tonen' },
    { slug: 'cv-voorbeeld-office-manager', keyword: 'cv voorbeeld office manager', role: 'office manager', painPoint: 'coordinatie, planning en eigenaarschap scherp neer te zetten' },
    { slug: 'cv-voorbeeld-projectmanager', keyword: 'cv voorbeeld projectmanager', role: 'projectmanager', painPoint: 'impact, budget en planning in een helder verhaal te zetten' },
    { slug: 'cv-voorbeeld-productmanager', keyword: 'cv voorbeeld productmanager', role: 'productmanager', painPoint: 'productresultaten en stakeholdermanagement concreet te maken' },
    { slug: 'cv-voorbeeld-devops-engineer', keyword: 'cv voorbeeld devops engineer', role: 'devops engineer', painPoint: 'tooling, ownership en schaalbaarheid compact te presenteren' },
    { slug: 'cv-voorbeeld-qa-tester', keyword: 'cv voorbeeld qa tester', role: 'qa tester', painPoint: 'kwaliteit, teststrategie en bevindingen meetbaar te tonen' },
    { slug: 'cv-voorbeeld-ux-designer', keyword: 'cv voorbeeld ux designer', role: 'ux designer', painPoint: 'portfolio-impact en researchresultaten op CV-niveau te vertalen' },
    { slug: 'cv-voorbeeld-data-analist', keyword: 'cv voorbeeld data analist', role: 'data-analist', painPoint: 'businessimpact van analyses duidelijk te maken' },
    { slug: 'cv-voorbeeld-machine-operator', keyword: 'cv voorbeeld machine operator', role: 'machine operator', painPoint: 'veiligheid, tempo en kwaliteitsnormen zichtbaar te maken' },
    { slug: 'cv-voorbeeld-productiemedewerker', keyword: 'cv voorbeeld productiemedewerker', role: 'productiemedewerker', painPoint: 'werktempo en betrouwbaarheid goed te onderbouwen' },
    { slug: 'cv-voorbeeld-schoonmaakmedewerker', keyword: 'cv voorbeeld schoonmaakmedewerker', role: 'schoonmaakmedewerker', painPoint: 'nauwkeurigheid en zelfstandigheid professioneel te verwoorden' },
    { slug: 'cv-voorbeeld-bezorger', keyword: 'cv voorbeeld bezorger', role: 'bezorger', painPoint: 'service, punctualiteit en route-efficientie te laten terugkomen' },
    { slug: 'cv-voorbeeld-zzper', keyword: 'cv voorbeeld zzp\'er', role: 'ZZP\'er / freelancer', painPoint: 'opdrachten, opdrachtgevers en resultaten overtuigend te structureren' },
    { slug: 'cv-voorbeeld-zonder-ervaring', keyword: 'cv zonder ervaring', role: 'starter', painPoint: 'relevantie te tonen zonder formele werkervaring' },
    { slug: 'cv-voorbeeld-magazijnmedewerker-zonder-ervaring', keyword: 'cv magazijnmedewerker zonder ervaring', role: 'magazijnmedewerker starter', painPoint: 'praktische inzet en leerbaarheid te bewijzen zonder direct magazijnverleden' },
    { slug: 'cv-voorbeeld-magazijnmedewerker-parttime', keyword: 'cv magazijnmedewerker parttime', role: 'magazijnmedewerker parttime', painPoint: 'beperkte uren, shiftbeschikbaarheid en betrouwbaarheid overtuigend te combineren' },
    { slug: 'cv-voorbeeld-orderpicker', keyword: 'cv orderpicker voorbeeld', role: 'orderpicker', painPoint: 'snelheid, nauwkeurigheid en scanner-ervaring recruiterproof te laten zien' },
    { slug: 'cv-voorbeeld-student-bijbaan', keyword: 'cv student voorbeeld', role: 'student bijbaan', painPoint: 'studie, beschikbaarheid en werkhouding in weinig regels overtuigend te tonen' },
    { slug: 'cv-zonder-ervaring-mbo', keyword: 'cv zonder ervaring mbo', role: 'MBO-starter', painPoint: 'relevantie te creeren zonder formele werkervaring' },
    { slug: 'cv-zonder-ervaring-hbo', keyword: 'cv zonder ervaring hbo', role: 'HBO-starter', painPoint: 'stage-, project- en studieresultaten slim te positioneren' },
    { slug: 'engels-cv-in-nederland', keyword: 'engels cv in nederland', role: 'internationale kandidaat', painPoint: 'Nederlandse verwachtingen met Engelse inhoud te combineren' },
    { slug: 'foto-op-cv-nederland', keyword: 'foto op cv nederland', role: 'sollicitant in Nederland', painPoint: 'de juiste keuze te maken tussen wel of geen foto' },
];

const englishSeeds: EnglishSeed[] = [
    { slug: 'dutch-cv-for-expats', keyword: 'dutch cv for expats', focus: 'Dutch-style structure', audience: 'expats applying in the Netherlands' },
    { slug: 'netherlands-cv-photo-rules', keyword: 'netherlands cv photo rules', focus: 'photo expectations', audience: 'international job seekers' },
    { slug: 'cv-format-netherlands-english', keyword: 'cv format netherlands english', focus: 'format and section order', audience: 'English-speaking applicants' },
    { slug: 'netherlands-cv-without-dutch-language', keyword: 'netherlands cv without dutch language', focus: 'language positioning', audience: 'non-Dutch speakers' },
    { slug: 'translate-resume-to-dutch-format', keyword: 'translate resume to dutch format', focus: 'converting US/UK resumes', audience: 'international professionals' },
    { slug: 'netherlands-cover-letter-basics', keyword: 'netherlands cover letter basics', focus: 'cover letter alignment', audience: 'first-time applicants in NL' },
    { slug: 'cv-for-international-students-netherlands', keyword: 'cv for international students netherlands', focus: 'student and starter profiles', audience: 'international students' },
    { slug: 'netherlands-cv-keywords-ats', keyword: 'netherlands cv keywords ats', focus: 'ATS keyword placement', audience: 'candidates in ATS-heavy sectors' },
    { slug: 'linkedin-to-cv-netherlands', keyword: 'linkedin to cv netherlands', focus: 'LinkedIn to CV conversion', audience: 'professionals updating quickly' },
    { slug: 'one-page-cv-netherlands', keyword: 'one page cv netherlands', focus: 'one-page decision criteria', audience: 'experienced and early-career applicants' },
];

const servicePack: ContentPack = {
    recruiterSignals: ['klantgerichtheid', 'duidelijke communicatie', 'betrouwbare uitvoering'],
    topSkills: ['CRM of administratieve systemen', 'prioriteiten stellen', 'samenwerken met meerdere teams'],
    atsKeywords: ['klantenservice', 'planning', 'service', 'kwaliteit', 'communicatie'],
    profileExamples: [
        'Servicegerichte professional met ervaring in klantcontact, procesdiscipline en het oplossen van dagelijkse operationele vragen.',
        'Werkt nauwkeurig onder tijdsdruk en combineert duidelijke communicatie met een hoge kwaliteitsstandaard.',
    ],
    bulletExamples: [
        'Doorlooptijd van terugkerende verzoeken verlaagd door heldere intake en betere opvolging.',
        'Klanttevredenheid verbeterd door consistenter communiceren over status en oplossingsstappen.',
        'Dagelijkse werkstroom gestroomlijnd waardoor piekmomenten beheersbaar bleven.',
    ],
};

const digitalPack: ContentPack = {
    recruiterSignals: ['eigenaarsschap', 'meetbare impact', 'samenwerking met stakeholders'],
    topSkills: ['data-gedreven besluitvorming', 'gestructureerde delivery', 'technische of productkennis'],
    atsKeywords: ['projectmanagement', 'KPI', 'optimalisatie', 'stakeholdermanagement', 'resultaat'],
    profileExamples: [
        'Resultaatgerichte professional die strategie vertaalt naar concrete uitvoering met meetbare uitkomsten.',
        'Combineert analytisch vermogen met sterke communicatie om teams sneller en consistenter te laten leveren.',
    ],
    bulletExamples: [
        'Proces of productflow verbeterd waardoor output en kwaliteit tegelijk stegen.',
        'Samenwerking tussen teams versneld met duidelijkere prioriteiten en vaste ritmes.',
        'Besluitvorming verbeterd door heldere KPI-rapportage en risico-overzicht.',
    ],
};

const operationsPack: ContentPack = {
    recruiterSignals: ['veilig werken', 'constante output', 'praktische probleemoplossing'],
    topSkills: ['kwaliteitscontrole', 'werktempo en discipline', 'teamwerk in operationele context'],
    atsKeywords: ['veiligheid', 'productie', 'kwaliteit', 'planning', 'uitvoering'],
    profileExamples: [
        'Praktisch ingestelde professional met focus op veilig werken, consistente kwaliteit en betrouwbare uitvoering.',
        'Gewend aan operationele omgevingen waar tempo, samenwerking en nauwkeurigheid tegelijk belangrijk zijn.',
    ],
    bulletExamples: [
        'Uitval en fouten teruggebracht door vaste controles op kritieke werkmomenten.',
        'Outputdoelen structureel gehaald tijdens piekperiodes met behoud van kwaliteit.',
        'Werkoverdracht verbeterd waardoor teams sneller konden opstarten en minder herstelwerk nodig was.',
    ],
};

const starterPack: ContentPack = {
    recruiterSignals: ['leerbaarheid', 'basisvaardigheden', 'betrouwbare inzet'],
    topSkills: ['stage en projectervaring', 'samenwerken', 'proactieve houding'],
    atsKeywords: ['starter', 'stage', 'project', 'praktijkervaring', 'vaardigheden'],
    profileExamples: [
        'Gemotiveerde starter met relevante stage- en projectervaring en een sterke leercurve.',
        'Neemt verantwoordelijkheid, werkt gestructureerd en vertaalt feedback snel naar betere resultaten.',
    ],
    bulletExamples: [
        'Stageopdrachten zelfstandig uitgevoerd en positief beoordeeld op nauwkeurigheid en communicatie.',
        'Projectwerk op tijd opgeleverd met duidelijke taakverdeling en concrete resultaten.',
        'Relevante bijbaanervaring slim gekoppeld aan vaardigheden voor de gewenste functie.',
    ],
};

const localizationPack: ContentPack = {
    recruiterSignals: ['lokale functie-fit', 'heldere taalkeuze', 'professionele presentatie'],
    topSkills: ['bilingual positioning', 'vacature-analyse', 'consistente structuur'],
    atsKeywords: ['english cv netherlands', 'dutch cv format', 'ats', 'vacaturekeywords', 'cv opmaak'],
    profileExamples: [
        'International candidate met duidelijke rolfocus en een CV-structuur die aansluit op Nederlandse verwachtingen.',
        'Combineert heldere Engelse inhoud met lokale relevantie in opbouw, terminologie en bewijs.',
    ],
    bulletExamples: [
        'CV-structuur aangepast aan Nederlandse scanlogica zonder inhoudelijke feiten te verliezen.',
        'Vacaturetaal verwerkt in profiel en ervaring voor betere ATS- en recruiter-match.',
        'Presentatiekeuzes afgestemd op functiecontext, inclusief bewuste keuze voor wel of geen foto.',
    ],
};

const dutchBespokeOverrides: Record<string, GuideOverride> = {
    'cv-voorbeeld-projectmanager': {
        intro: 'Een sterk projectmanager CV laat direct zien dat je grip hebt op scope, planning, budget en risico. Deze versie is geschreven voor recruiters die in 10 seconden willen zien of jij complexe trajecten echt kunt aansturen.',
        checklist: [
            'Projectomvang (budget, teamgrootte, looptijd) staat duidelijk benoemd.',
            'Per projectrol is impact zichtbaar op planning, kosten of kwaliteit.',
            'Stakeholdermanagement is concreet gemaakt met governance-voorbeelden.',
            'Methodiek (Agile, PRINCE2, hybride) sluit aan op de vacature.',
            'Risico- en afhankelijkheidsmanagement is aantoonbaar beschreven.',
            'Kernresultaten staan bovenaan in de recente werkervaring.',
            'Terminologie in CV matcht de taal van de vacature.',
        ],
        faq: [
            {
                question: 'Welke resultaten werken het best op een projectmanager CV?',
                answer: 'Resultaten op tijd, budgetafwijking, risicoreductie en voorspelbaarheid van delivery. Voeg waar mogelijk percentages of concrete projectomvang toe.',
            },
            {
                question: 'Moet ik Agile en PRINCE2 allebei noemen?',
                answer: 'Alleen als je er echt mee gewerkt hebt. Benoem liever kort hoe je de methode toepaste in besluitvorming, planning en rapportage.',
            },
            {
                question: 'Hoeveel projectvoorbeelden moet ik tonen?',
                answer: 'Kies 2-4 recente trajecten die het best aansluiten op de vacature, en maak die voorbeelden inhoudelijk sterk in plaats van breed.',
            },
            {
                question: 'Wat is de grootste fout bij projectmanager CV s?',
                answer: 'Te veel focus op taken zonder impact. Recruiters willen weten wat jij verbeterde: levertijd, kostenbeheersing, risico of stakeholderalignment.',
            },
        ],
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Projectmanager met 8+ jaar ervaring in transformatie- en implementatietrajecten binnen IT en operations.',
                    'Stuurt multidisciplinaire teams aan op voorspelbare oplevering, met focus op risicobeheersing en bestuurlijke besluitvorming.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Migratieprogramma van EUR 2,4M geleid met oplevering binnen scope en 5% onder budget.',
                    'Escalatie- en besluitritme ingericht waardoor blokkades gemiddeld 40% sneller werden opgelost.',
                    'Afhankelijkheden over 6 teams gecoordineerd en vertraging op kritieke pad met 3 weken teruggebracht.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: project governance, planning, budgetbewaking, risicoanalyse, stakeholdermanagement.',
                    'Koppel methodieken aan praktijk: niet alleen "Agile", maar ook welke ceremonies en sturingsmomenten je leidde.',
                    'Gebruik rolwoorden uit de vacature zoals projectleider, programma manager of delivery manager waar inhoudelijk passend.',
                ],
            },
        },
    },
    'cv-voorbeeld-productmanager': {
        intro: 'Een productmanager CV moet bewijzen dat je keuzes maakt met impact: wat je prioriteerde, waarom, en wat het resultaat was voor gebruikers en business. Deze pagina richt zich op die bewijsvoering.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Productmanager met ervaring in discovery, roadmapsturing en delivery in SaaS-omgevingen.',
                    'Verbindt klantinzichten, data en commerciële doelen tot prioriteiten die adoptie en retentie verhogen.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Onboarding-funnel herontworpen, wat activatie in 90 dagen met 23% verhoogde.',
                    'Roadmap herprioriteerd op impact/effort waardoor time-to-release met 28% daalde.',
                    'Samen met sales en customer success pricing-experiment uitgerold met 11% hogere upgrade-rate.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: roadmap, discovery, go-to-market, KPI, stakeholder alignment.',
                    'Noem expliciet productmetrics zoals activatie, retentie, churn, conversie en NPS als je die hebt gebruikt.',
                    'Zet tools alleen als ze relevant zijn: Jira, Amplitude, Mixpanel, Figma, SQL (indien toegepast).',
                ],
            },
        },
        faq: [
            {
                question: 'Moet een productmanager CV vooral op features focussen?',
                answer: 'Nee, focus op beslissingen en uitkomst. Recruiters willen zien hoe jouw keuzes leidden tot betere metrics of duidelijkere productrichting.',
            },
            {
                question: 'Welke metrics moet ik noemen?',
                answer: 'Gebruik metrics die passen bij de rol: activatie, retentie, churn, time-to-value, omzetimpact of efficiencywinst.',
            },
            {
                question: 'Hoe toon ik stakeholdermanagement?',
                answer: 'Beschrijf waar je alignment creëerde tussen engineering, design, sales en leadership, inclusief effect op delivery of besluitvorming.',
            },
            {
                question: 'Is 1 pagina genoeg voor productmanagement?',
                answer: 'Voor starters wel. Met meerdere relevante productrollen is 2 pagina s acceptabel, mits je scherp selecteert op impact.',
            },
        ],
    },
    'cv-voorbeeld-devops-engineer': {
        intro: 'Bij DevOps wordt je CV beoordeeld op betrouwbaarheid: uptime, deployment-snelheid, security en incidentafhandeling. Deze variant focust op die operationele bewijzen.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'DevOps engineer met sterke basis in cloud-infrastructuur, CI/CD-automatisering en production reliability.',
                    'Werkt ownership-gedreven aan stabiele releases, security hardening en snellere incidentresolutie.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'CI/CD-pipeline geautomatiseerd waardoor releasefrequentie van wekelijks naar dagelijks ging.',
                    'MTTR van 62 naar 21 minuten verlaagd via runbooks, alerts en verbeterde observability.',
                    'Cloudkosten met 18% gereduceerd door rightsizing, autoscaling tuning en lifecycle policies.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: kubernetes, terraform, ci/cd, monitoring, incident response.',
                    'Koppel tooling aan resultaat: noem niet alleen platformnamen, maar ook welk operationeel probleem je ermee oploste.',
                    'Beschrijf securitypraktijken (IAM, secret management, patching, compliance) wanneer de vacature dit vraagt.',
                ],
            },
        },
    },
    'cv-voorbeeld-data-analist': {
        intro: 'Een data-analist CV werkt pas echt als je impact op besluiten zichtbaar maakt. Niet "rapportages gemaakt", maar welke inzichten zijn gebruikt en wat veranderde daarna.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Data-analist met ervaring in SQL, dashboarding en het vertalen van complexe data naar uitvoerbare beslissingen.',
                    'Sterk in datakwaliteit, stakeholderafstemming en het bouwen van analyses die management en operatie echt gebruiken.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Operations-dashboard gebouwd dat weekrapportage verving en 10 uur handwerk per week elimineerde.',
                    'Forecastmodel verbeterd waardoor planningsafwijking van 14% naar 6% daalde.',
                    'Datakwaliteitsissues opgespoord en opgelost, met 35% minder foutieve records in kernrapportages.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: SQL, Power BI, dashboarding, datakwaliteit, stakeholder reporting.',
                    'Noem per analysetraject: databron, analysemethode, businessvraag en genomen beslissing.',
                    'Benoem BI-tools en queryvaardigheden alleen op niveau dat je in interview kunt demonstreren.',
                ],
            },
        },
    },
    'engels-cv-in-nederland': {
        intro: 'Voor internationale kandidaten in Nederland is de grootste uitdaging niet taal op zich, maar positionering. Dit CV moet tegelijk Engels leesbaar en Nederlands vacaturegericht zijn.',
        sectionOverrides: {
            'recruiter-scan': {
                paragraphs: [
                    'Recruiters in Nederland accepteren vaak Engels, maar verwachten wel lokale relevantie in functiebenaming, context en resultaatniveau.',
                    'Zet daarom direct je target role, werkvergunningstatus (indien relevant) en meest relevante NL-marktresultaten bovenaan.',
                    'Een goed Engels CV in Nederland voelt lokaal in structuur en bewijs, niet als een ongewijzigde US/UK resume.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-in-engels',
                        label: 'Engels CV maken met Nederlandse recruiter-logica',
                        description: 'Start vanuit een flow die Engelse copy combineert met de structuur die in Nederland verwacht wordt.',
                    },
                    {
                        href: '/engels-cv-template',
                        label: 'Kies een Engels CV template voor sollicitaties in Nederland',
                        description: 'Gebruik een template waarin je target role, taalniveau en relevante resultaten direct bovenaan staan.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Combineer Engelse kerntermen met Nederlandse vacaturewoorden: bijvoorbeeld "customer success / klanttevredenheid".',
                    'Gebruik functietitels uit de vacature en voeg zo nodig een alternatieve titel tussen haakjes toe.',
                    'Noem taalniveau expliciet (Nederlands A2/B1/B2, English C1/C2) zodat recruiters risico beter inschatten.',
                ],
                intentLinks: [
                    {
                        href: '/engels-cv-template',
                        label: 'Gebruik een Engels CV template met sterkere ATS-leesbaarheid',
                        description: 'Houd Engelse termen en Nederlandse vacaturekeywords samen in een layout die recruitersoftware goed begrijpt.',
                    },
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Open de Dutch CV template flow in het Engels',
                        description: 'Behoud je Engelse inhoud terwijl je CV de Nederlandse structuur en scanvolgorde volgt.',
                    },
                ],
            },
        },
        faq: [
            {
                question: 'Mag ik volledig in het Engels solliciteren in Nederland?',
                answer: 'Ja, vooral bij internationale werkgevers en veel techrollen. Controleer altijd de vacaturenaam en bedrijfstaal voordat je verstuurt.',
            },
            {
                question: 'Moet ik Nederlandse termen opnemen in een Engels CV?',
                answer: 'Ja, selectief. Gebruik cruciale vacaturetermen zodat ATS en recruiters je profiel sneller koppelen aan de functie.',
            },
            {
                question: 'Hoe vermeld ik taalniveau slim?',
                answer: 'Noem taalniveau concreet per taal (bijv. Dutch B1, English C1) en plaats dit in een aparte talen-sectie.',
            },
            {
                question: 'Wat is de meest gemaakte fout van expats op CV?',
                answer: 'Te generieke, lange summaries zonder lokale context. Korte, resultaatgerichte formulering werkt beter in de Nederlandse markt.',
            },
        ],
    },
    'cv-voorbeeld-administratief-medewerker': {
        intro: 'Een administratief medewerker wordt vaak op details geselecteerd: nauwkeurigheid, structuur en betrouwbaarheid. Dit CV-format laat zien hoe je dat direct overtuigend bewijst.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Administratief medewerker met 5+ jaar ervaring in facturatie, dossierbeheer en teamondersteuning binnen drukke omgevingen.',
                    'Sterk in foutarme verwerking, prioriteiten bewaken en het verbeteren van administratieve doorlooptijden.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Factuurcontrole gestandaardiseerd waardoor correcties met 32% afnamen.',
                    'Documentmanagement heringericht; terugvindtijd van dossiers ging van minuten naar seconden.',
                    'Maandafsluiting ondersteund met heldere controles waardoor rapportages op tijd en foutloos werden opgeleverd.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: facturatie, agendabeheer, dossierbeheer, Office 365, nauwkeurigheid.',
                    'Gebruik software-namen alleen als je die ook praktisch beheerst (bijv. Excel, AFAS, Exact, SAP).',
                    'Noem administratieve verbeteringen met concreet effect op snelheid of kwaliteit.',
                ],
            },
        },
        faq: [
            {
                question: 'Wat is het belangrijkste op een administratief CV?',
                answer: 'Nauwkeurigheid plus betrouwbaarheid onder tijdsdruk. Laat met voorbeelden zien dat je processen beheerst en fouten voorkomt.',
            },
            {
                question: 'Hoeveel software moet ik benoemen?',
                answer: 'Noem alleen systemen die relevant zijn voor de vacature en die je echt kunt gebruiken in de praktijk.',
            },
            {
                question: 'Moet ik cijfers opnemen als die beperkt zijn?',
                answer: 'Ja. Ook kleine, concrete effecten zoals minder correcties of snellere verwerking maken je CV sterker.',
            },
            {
                question: 'Wat is een veelgemaakte fout?',
                answer: 'Te algemene omschrijvingen zoals "administratieve taken uitgevoerd" zonder context, tools of resultaat.',
            },
        ],
    },
    'cv-voorbeeld-administratief-medewerker-parttime': {
        title: 'CV voorbeeld administratief medewerker parttime (2026)',
        description: 'Praktische gids voor een parttime administratief CV, met voorbeeldprofielen, werkervaring, softwaretermen en een check voor recruiters.',
        metaTitle: 'CV voorbeeld administratief medewerker parttime (2026) | WerkCV.nl',
        metaDesc: 'Gebruik dit parttime CV voorbeeld voor administratief medewerker. Met profieltekst, Excel- en dossierbeheer skills, werkervaring en beschikbaarheid.',
        keywords: [
            'cv administratief medewerker parttime',
            'parttime administratief medewerker cv',
            'administratief medewerker parttime voorbeeld',
            'administratie cv voorbeeld',
            'backoffice cv parttime',
        ],
        intro: 'Een parttime administratief CV moet twee dingen tegelijk bewijzen: dat je foutarm en gestructureerd werkt, en dat jouw beperkte uren geen risico vormen voor planning, overdracht en opvolging. UWV noteerde eind 2025 nog altijd ongeveer 70.000 open vacatures in administratieve beroepen, maar ziet tegelijk dat klassiek administratief en secretarieel werk al jaren onder druk staat. Juist daarom moet je CV concreet zijn over systemen, werktempo en betrouwbaarheid.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start met een ATS-proof CV template',
                description: 'Gebruik dit parttime voorbeeld direct in een rustige template en werk je eigen versie af in de editor.',
            },
            {
                href: '/cv-template-administratief-medewerker',
                title: 'Administratief medewerker template',
                description: 'Gebruik een template die ruimte geeft aan profieltekst, systemen en foutarme werkervaring.',
            },
            {
                href: '/cv-gids/cv-voorbeeld-administratief-medewerker',
                title: 'Algemeen CV voorbeeld administratief medewerker',
                description: 'Vergelijk je parttime versie met de bredere administratieve parent-pagina en pak de sterkste formuleringen mee.',
            },
        ],
        sources: [
            {
                label: 'UWV - Administratieve beroepen',
                href: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/sector/administratieve-beroepen',
                note: 'Actueel sectorbeeld met vacaturevolume, WW-ontwikkelingen en de waarschuwing dat klassiek administratief en secretarieel werk structureel afneemt.',
            },
            {
                label: 'CBS - Weer meer mensen met grote deeltijdbanen',
                href: 'https://www.cbs.nl/nl-nl/nieuws/2025/46/weer-meer-mensen-met-grote-deeltijdbanen',
                note: 'CBS meldde op 13 november 2025 dat bijna 1,9 miljoen mensen 28 tot 35 uur per week werkten in Q3 2025.',
            },
        ],
        ctaTitle: 'Maak je parttime administratieve CV direct af',
        ctaText: 'Gebruik dit voorbeeld in een ATS-proof template, zet je dagen en systemen helder neer, en exporteer daarna een nette PDF voor je sollicitatie.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een parttime administratief CV beoordelen',
                paragraphs: [
                    'Bij parttime administratieve functies zoeken recruiters niet alleen naar nauwkeurigheid, maar ook naar voorspelbaarheid. Ze willen zien dat jij in minder uren toch grip houdt op mailboxen, dossiers, facturen, planning en overdracht.',
                    'Algemene zinnen als "ik ben nauwkeurig" zijn hier niet genoeg. Laat liever zien welke systemen je gebruikte, welke foutmarge of doorlooptijd je verbeterde, en hoe je taken overdraagt wanneer je niet alle werkdagen aanwezig bent.',
                ],
                bullets: [
                    'Noem direct je meest relevante systemen, bijvoorbeeld Excel, AFAS, Exact, SAP of Office 365.',
                    'Maak je parttime inzet concreet: aantal uren, voorkeursdagen of vaste beschikbaarheid als dat voor de vacature relevant is.',
                    'Gebruik voorbeelden die rust, foutarme verwerking en betrouwbare opvolging zichtbaar maken.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Administratief medewerker met ervaring in factuurverwerking, dossierbeheer en agendacoordinatie. Werkt foutarm, houdt overzicht en zorgt ook in parttime inzet voor duidelijke overdracht en stabiele opvolging.',
                    'Parttime backoffice professional met sterke basis in Excel, mailboxbeheer en documentcontrole. Combineert nauwkeurigheid met heldere communicatie richting collega s, leveranciers en klanten.',
                    'Financieel-administratief medewerker met ervaring in orderadministratie, declaraties en rapportage. Zoekt een parttime rol waarin betrouwbaarheid, structuur en tempo zichtbaar gewaardeerd worden.',
                ],
                intentLinks: [
                    {
                        href: '/cv-template-administratief-medewerker',
                        label: 'Gebruik een administratieve template met rustige, scanbare opbouw',
                        description: 'Zet profiel, systemen en recente werkervaring in een layout die recruiters snel kunnen lezen.',
                    },
                    {
                        href: '/templates',
                        label: 'Start direct je eigen parttime administratieve CV',
                        description: 'Neem dit voorbeeld over in de editor en maak daarna per vacature kleine varianten.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Factuurcontrole en dossieropvolging gestandaardiseerd, waardoor correctierondes met 24% afnamen.',
                    'Gedeelde mailbox en actielijst beheerd voor meerdere teams, met snellere opvolging en minder openstaande verzoeken aan het einde van de week.',
                    'Excel-overzicht ingericht voor terugkerende betalingen en deadlines, waardoor achterstanden eerder zichtbaar werden en tijdig konden worden opgelost.',
                    'Heldere overdracht per werkdag ingevoerd, zodat collega s lopende dossiers zonder informatieverlies konden overnemen.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Maak van administratieve taken sterkere bullets',
                        description: 'Zie hoe je verwerking, controle en opvolging omzet in kortere resultaatgerichte zinnen.',
                    },
                    {
                        href: '/cv-tips/cv-werkervaring-beschrijven',
                        label: 'Verdiep je werkervaring met actie plus resultaat',
                        description: 'Handig als je wel taken hebt, maar nog niet duidelijk genoeg laat zien wat jouw impact was.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie zijn vaak: Excel, Office 365, facturatie, dossierbeheer, agendabeheer, mailboxbeheer en administratieve verwerking.',
                    'Zet alleen software op je CV die je in gesprek ook concreet kunt toelichten.',
                    'Noem parttime beschikbaarheid professioneel en feitelijk: bijvoorbeeld 24-28 uur, maandag tot en met donderdag of flexibel inzetbaar binnen kantooruren.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies de juiste administratieve vaardigheden voor je CV',
                        description: 'Gebruik alleen vaardigheden die logisch terugkomen in je recente werk en systemen.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je parttime CV direct uit in een ATS-proof template',
                        description: 'Gebruik standaardkopjes en een rustige opmaak zodat recruitersoftware alles goed uitleest.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor je parttime administratieve CV',
                bullets: [
                    'Je profieltekst noemt direct je administratieve focus en parttime inzet waar relevant.',
                    'Systemen en software zijn specifiek genoemd in plaats van vaag samengevat als "computerkennis".',
                    'Werkervaring laat foutarme verwerking, planning of overdracht zien.',
                    'Beschikbaarheid is duidelijk maar niet het enige verkoopargument van je CV.',
                    'Bestandsnaam, datumnotatie en contactgegevens zijn volledig consistent.',
                ],
            },
        },
        faq: [
            {
                question: 'Moet ik parttime in mijn profieltekst noemen?',
                answer: 'Alleen als het voor de vacature of je beschikbaarheid belangrijk is. Je profieltekst moet eerst je administratieve waarde tonen, daarna pas je urencontext.',
            },
            {
                question: 'Welke software moet op een administratief CV staan?',
                answer: 'Noem alleen systemen waarmee je echt hebt gewerkt, zoals Excel, AFAS, Exact, SAP of Office 365. Recruiters prikken snel door algemene softwarelijsten heen.',
            },
            {
                question: 'Is Excel nog belangrijk op een administratief CV?',
                answer: 'Ja. Excel blijft in veel administratieve vacatures een harde basisvaardigheid, vooral als je controles, overzichten of rapportage ondersteunt.',
            },
            {
                question: 'Hoe vermeld ik meerdere korte administratieve opdrachten?',
                answer: 'Groepeer soortgelijke opdrachten waar dat kan en benadruk terugkerende patronen: verwerking, controle, opvolging, planning en systeemgebruik.',
            },
        ],
    },
    'cv-voorbeeld-klantenservice-medewerker': {
        intro: 'Bij klantenservice draait selectie om twee dingen: klanttevredenheid en consistente performance. Dit CV helpt je precies die combinatie zichtbaar te maken.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Klantgerichte medewerker met ervaring in telefonie, e-mail en chat binnen KPI-gestuurde service teams.',
                    'Combineert empathie met duidelijke oplossingsstructuur om cases snel en duurzaam af te handelen.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'First contact resolution verhoogd van 68% naar 79% door verbeterde intakevragen en kennisbankgebruik.',
                    'NPS-score verhoogd met 12 punten door proactieve opvolging van complexe dossiers.',
                    'Escalatievolume verlaagd door terugkerende issues te signaleren en met operations op te lossen.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: NPS, SLA, CRM, first contact resolution, klantbehoud.',
                    'Laat per bullet zien hoe je snelheid en kwaliteit tegelijk borgde.',
                    'Noem kanaalervaring expliciet: telefoon, chat, e-mail en eventuele social care.',
                ],
            },
        },
        checklist: [
            'Klantimpact is zichtbaar met concrete KPI s of kwaliteitsresultaten.',
            'Case-afhandeling is beschreven als proces met begin en resultaat.',
            'CRM- en ticketingsysteem staan benoemd waar relevant.',
            'Je profieltekst is servicegericht maar niet algemeen.',
            'Escalatie- en probleemoplossend vermogen zijn aantoonbaar.',
            'Terminologie sluit aan op de vacature.',
            'CV is scanbaar en foutloos geformuleerd.',
        ],
    },
    'cv-voorbeeld-verkoopmedewerker': {
        intro: 'Een verkoopmedewerker CV moet laten zien dat je niet alleen vriendelijk bent, maar ook commercieel effectief. Recruiters zoeken bewijs van conversie, omzet en klantadvies.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Commercieel gedreven verkoopmedewerker met ervaring in retail, klantadvies en resultaatgericht werken op target.',
                    'Verbindt productkennis met sterke klantgesprekken om conversie en herhaalaankopen te verhogen.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Gemiddeld 13% boven maandtarget gepresteerd door actieve adviesverkoop en slimme productcombinaties.',
                    'Conversie in piekuren verbeterd via duidelijke klantrouting en teamafspraken op de vloer.',
                    'Retouren in nieuwe productlijn verlaagd door betere behoefteanalyse aan het begin van het gesprek.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: omzetdoelen, upsell, cross-sell, klantadvies, retail KPI.',
                    'Gebruik commerciële taal die past bij de vacature (B2C winkel, showroom, premium retail, etc.).',
                    'Toon zowel salesresultaat als servicekwaliteit voor een geloofwaardig totaalbeeld.',
                ],
            },
        },
        faq: [
            {
                question: 'Moet ik alleen omzetcijfers tonen?',
                answer: 'Nee. Combineer omzet met klantbeleving, bijvoorbeeld conversie, retourpercentage of herhaalaankopen.',
            },
            {
                question: 'Hoe beschrijf ik upsell zonder agressief te klinken?',
                answer: 'Koppel upsell aan passend advies en klantwaarde, niet alleen aan extra verkoop.',
            },
            {
                question: 'Is ervaring met targets belangrijk om te noemen?',
                answer: 'Ja, dit is vaak een harde selectievoorwaarde in retail- en salesvacatures.',
            },
            {
                question: 'Wat maakt een verkoop CV zwak?',
                answer: 'Algemene claims als "commercieel ingesteld" zonder bewijs in concrete verkoopresultaten.',
            },
        ],
    },
    'cv-voorbeeld-horeca-medewerker': {
        title: 'CV voorbeeld horeca medewerker (restaurant / cafe)',
        description: 'BOFU gids voor een horeca-CV met profieltekst, beschikbaarheid, werkervaring en recruiterproof voorbeeldzinnen voor restaurant, cafe en fastservice.',
        metaTitle: 'CV voorbeeld horeca medewerker (2026) | WerkCV.nl',
        metaDesc: 'Gebruik dit horeca CV voorbeeld voor restaurant, cafe of fastservice. Met profieltekst, werkervaring, skills en tips voor starters en bijbanen.',
        keywords: [
            'cv horeca voorbeeld',
            'cv voorbeeld horecamedewerker',
            'horeca cv',
            'restaurant cv voorbeeld',
            'cafe cv voorbeeld',
        ],
        intro: 'Een horeca-CV wordt vaak snel beoordeeld: ben je gastvrij, houd je tempo onder druk, en ben je inzetbaar op de momenten dat het echt druk is? UWV telde in het vierde kwartaal van 2025 nog altijd meer dan 22.000 open vacatures in de horeca. Tegelijk laat CBS zien dat 58% van de werkenden in de horeca 15 tot 25 jaar is. Dat betekent dat jouw CV niet lang hoeft te zijn, maar wel direct service, betrouwbaarheid en beschikbaarheid moet laten zien.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start direct met een horeca CV template',
                description: 'Gebruik dit voorbeeld in een rustige template en maak daarna per werkgever een snellere variant.',
            },
            {
                href: '/cv-voorbeelden/horeca-en-detailhandel/ober-serveerster',
                title: 'CV voorbeeld bediening',
                description: 'Bekijk een specifieker voorbeeld voor tafelservice, gastcontact en werken in piekuren.',
            },
            {
                href: '/cv-maken-student',
                title: 'Student-CV voor stage of bijbaan',
                description: 'Handig als jouw horeca-sollicitatie vooral draait om een bijbaan naast school of studie.',
            },
        ],
        sources: [
            {
                label: 'UWV - Horeca',
                href: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/sector/horeca',
                note: 'Actueel sectorbeeld met flexwerk, studentenaandeel en meer dan 22.000 open vacatures in Q4 2025.',
            },
            {
                label: 'UWV - Kansrijke beroepen 2025-2026',
                href: 'https://www.uwv.nl/assets-kai/files/bcd769b3-07a1-498c-b0f4-4bcc6b78f3c6/kansrijke-beroepen-2025-2026.pdf',
                note: 'UWV noemt onder meer cateringmedewerkers, medewerkers bediening horeca, barpersoneel en hotelreceptionisten kansrijk.',
            },
            {
                label: 'CBS - Het aanbod van arbeid 2024',
                href: 'https://longreads.cbs.nl/dearbeidsmarktincijfers-2024/het-aanbod-van-arbeid/',
                note: 'CBS laat zien dat in 2024 een groot deel van het horecapersoneel 15 tot 25 jaar was en vaak in deeltijd werkte.',
            },
        ],
        ctaTitle: 'Maak je horeca-CV direct af in de editor',
        ctaText: 'Gebruik dit voorbeeld in een ATS-proof template, zet je beschikbaarheid slim neer en exporteer daarna een professionele PDF voor je volgende sollicitatie.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een horeca-CV scannen',
                paragraphs: [
                    'In horeca draait de eerste selectie meestal om drie signalen: gastvrijheid, tempo en betrouwbaarheid. Werkgevers willen snel zien of jij gasten goed helpt, piekdrukte aankunt en inzetbaar bent op avonden, weekenden of feestdagen.',
                    'Vage claims als "hardwerkend" of "sociaal" overtuigen weinig. Benoem liever concrete werkzaamheden zoals bediening, kassa, bar, mise en place, reserveringen of het oplossen van gastvragen.',
                ],
                bullets: [
                    'Noem direct je type ervaring: bediening, fastservice, bar, keukenondersteuning of allround horeca.',
                    'Laat beschikbaarheid en flexibiliteit zien als dat relevant is voor de vacature.',
                    'Gebruik korte voorbeelden die service en tempo samen laten zien.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Gastvrije horeca medewerker met ervaring in bediening, kassa en werken tijdens piekuren. Combineert service, tempo en duidelijke communicatie voor een sterke gastbeleving.',
                    'Allround horeca kracht met ervaring in restaurant en cafe-omgeving. Snel inzetbaar op ontvangst, bestellingen, afrekenen en het ondersteunen van het team op drukke momenten.',
                    'Starter in de horeca met bijbaanervaring in klantcontact en retail. Leert snel, werkt netjes en is flexibel beschikbaar in avonden en weekenden.',
                ],
                intentLinks: [
                    {
                        href: '/cv-voorbeelden/horeca-en-detailhandel',
                        label: 'Bekijk meer horeca- en retailvoorbeelden',
                        description: 'Vergelijk bediening, catering, receptionist en winkelwerk om de beste formuleringen over te nemen.',
                    },
                    {
                        href: '/templates',
                        label: 'Start direct je eigen horeca-CV',
                        description: 'Neem deze voorbeeldstructuur over en maak daarna een vacaturegerichte versie in de editor.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Tijdens piekuren gemiddeld 35+ gasten per shift geholpen met snelle en correcte bestellingopname.',
                    'Kassa- en afrekenproces strak uitgevoerd waardoor verschillen in kassastand uitbleven.',
                    'Actief meegedraaid in opening, mise en place en afsluiting, waardoor het team sneller kon schakelen tussen rustige en drukke momenten.',
                    'Gastvragen en klachten direct opgepakt en netjes opgelost, met behoud van een positieve sfeer op de vloer.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Herschrijf horecataken naar sterkere bullets',
                        description: 'Maak van bediening, kassa en teamwork kortere zinnen met zichtbaar resultaat.',
                    },
                    {
                        href: '/cv-gids/cv-voorbeeld-student-bijbaan',
                        label: 'Gebruik de student-bijbaan variant als je vooral op oproepbasis werkt',
                        description: 'Handig wanneer school, beschikbaarheid en snelle inzetbaarheid belangrijker zijn dan jaren ervaring.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type CV zijn vaak: bediening, gastvrijheid, kassa, reserveringen, fastservice, teamwork en piekdrukte.',
                    'Noem HACCP, sociale hygiene of talen alleen als je ze echt hebt of gebruikt.',
                    'Zet beschikbaarheid feitelijk neer: bijvoorbeeld avonden, weekenden of flexibel inzetbaar tijdens drukte.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies horeca-skills die ook recruiterproof zijn',
                        description: 'Gebruik service, teamwork en tempo alleen als ze ook terugkomen in je werkvoorbeelden.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je horeca-CV uit in een ATS-proof template',
                        description: 'Gebruik een rustige opmaak zodat beschikbaarheid, service en recente ervaring direct zichtbaar zijn.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor je horeca-CV',
                bullets: [
                    'Je profieltekst noemt direct service, tempo en je type horeca-ervaring.',
                    'Beschikbaarheid is duidelijk als dat een selectievoorwaarde is.',
                    'Werkervaring laat piekdrukte, gastcontact of kassaverantwoordelijkheid zien.',
                    'Certificaten en talen staan alleen op je CV als ze echt relevant en waar zijn.',
                    'Je CV blijft compact en scanbaar, idealiter op 1 pagina voor starters en bijbanen.',
                ],
            },
        },
        faq: [
            {
                question: 'Wat zet je op een horeca-CV?',
                answer: 'Noem je type werk, je beschikbaarheid, gastcontact, tempo, kassawerk en voorbeelden van service of teamwork. Houd het praktisch en concreet.',
            },
            {
                question: 'Hoe maak je een horeca-CV zonder ervaring?',
                answer: 'Gebruik retail, vrijwilligerswerk, evenementen, schoolprojecten of bijbanen als bewijs van klantcontact, tempo en verantwoordelijkheid.',
            },
            {
                question: 'Moet ik weekendbeschikbaarheid noemen?',
                answer: 'Ja, als de vacature daarom vraagt of als jouw flexibiliteit een sterk verkoopargument is. In horeca is dat vaak relevant.',
            },
            {
                question: 'Welke vaardigheden horen op een horeca-CV?',
                answer: 'Gastvrijheid, teamwork, tempo, stressbestendigheid, kassa of POS-ervaring en duidelijke communicatie zijn vaak de sterkste basisvaardigheden.',
            },
        ],
    },
    'cv-voorbeeld-zonder-ervaring': {
        title: 'CV voorbeeld zonder ervaring (2026)',
        description: 'Startergids voor een CV zonder ervaring, met voorbeeldprofielen, stage- en bijbaanbullets en een recruiterproof eindcheck.',
        metaTitle: 'CV voorbeeld zonder ervaring (2026) | Starter CV | WerkCV.nl',
        metaDesc: 'CV zonder ervaring maken? Gebruik dit starter CV voorbeeld met profieltekst, opleiding, stage, bijbaan en slimme ATS-tips. Start direct in een template.',
        keywords: [
            'cv zonder ervaring',
            'starter cv voorbeeld',
            'cv voorbeeld zonder werkervaring',
            'eerste cv maken',
            'cv voor eerste baan',
        ],
        intro: 'Zoek je op "cv zonder ervaring", dan gaat het zelden om nul bewijs. Het gaat meestal om weinig formele werkervaring. In 2025 gaf 52% van de werkgevers met recente vacatures volgens UWV aan dat zij door de krappe arbeidsmarkt vaker mensen aannemen die nog opgeleid moeten worden. Dat betekent dat jouw CV vooral moet bewijzen dat je snel leert, afspraken nakomt en relevante signalen uit school, stage, bijbaan of vrijwilligerswerk slim kunt vertalen.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start met een starter-CV template',
                description: 'Gebruik dit voorbeeld direct in een rustige template en maak daarna een vacaturegerichte versie in de editor.',
            },
            {
                href: '/cv-tips/cv-zonder-werkervaring',
                title: 'Diepere gids: CV zonder werkervaring',
                description: 'Lees de uitgebreide uitleg als je meer wilt weten over opleiding, stages, projecten en valkuilen.',
            },
            {
                href: '/cv-maken-student',
                title: 'CV maken als student',
                description: 'Handig als je eerste sollicitaties vooral stage, bijbaan of een juniorfunctie betreffen.',
            },
        ],
        sources: [
            {
                label: 'UWV - Werkgevers leiden vaker nieuw personeel op',
                href: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/inzichten-werving-behoud/werkgevers-leiden-vaker-nieuw-personeel-op-vanwege-krappe-arbeidsmarkt',
                note: 'UWV meldde op basis van 2025-onderzoek dat 52% van werkgevers door krapte vaker mensen aanneemt die nog opgeleid moeten worden.',
            },
            {
                label: 'CBS - Het aanbod van arbeid 2024',
                href: 'https://longreads.cbs.nl/dearbeidsmarktincijfers-2024/het-aanbod-van-arbeid/',
                note: 'CBS laat zien dat in 2024 76% van de 15- tot 25-jarigen werkte en dat jongeren relatief vaak tijdelijke contracten hadden.',
            },
            {
                label: 'CBS - Stages en banen van studenten in mbo en ho, 2024-2025',
                href: 'https://www.cbs.nl/nl-nl/maatwerk/2025/51/stages-en-banen-van-studenten-in-het-mbo-en-ho-naar-cao-en-sbi-2024-2025',
                note: 'Recente CBS-tabellen over stages, banen, lonen en arbeidsduur van studenten in studiejaar 2024/25.',
            },
        ],
        ctaTitle: 'Maak je starter-CV direct af',
        ctaText: 'Gebruik dit voorbeeld in een ATS-proof template, zet stage, school en bijbaan slim neer en exporteer daarna een nette PDF voor je eerste sollicitaties.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een CV zonder ervaring beoordelen',
                paragraphs: [
                    'Recruiters verwachten bij starters geen lang werkverleden. Ze zoeken vooral naar potentieel, leerbaarheid, betrouwbaarheid en bewijs dat jij al verantwoordelijkheid hebt genomen in een andere context.',
                    'Dat bewijs kan uit stage, schoolprojecten, verenigingen, vrijwilligerswerk, sport, retail, horeca of korte bijbanen komen. Het verschil zit niet in hoeveel ervaring je hebt, maar in hoe goed je laat zien wat die ervaringen over jou zeggen.',
                ],
                bullets: [
                    'Zet profieltekst, opleiding en je sterkste eerste ervaring bovenaan in een logische volgorde.',
                    'Beschrijf kleine ervaringen professioneel: wat deed jij, in welke context, en wat ging daardoor beter?',
                    'Houd je CV compact: voor de meeste starters is 1 pagina het sterkste formaat.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Gemotiveerde starter met recente stage- en projectervaring. Leert snel, werkt gestructureerd en vertaalt feedback direct naar betere uitvoering.',
                    'Schoolverlater met bijbaanervaring in klantcontact en teamwork. Zoekt een eerste functie waarin betrouwbaarheid, werktempo en leergierigheid centraal staan.',
                    'Junior kandidaat met sterke basis in planning, samenwerking en duidelijke communicatie vanuit studie, projecten en nevenactiviteiten.',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/cv-zonder-ervaring-mbo',
                        label: 'Gebruik de MBO-variant als stage en praktijkuren je sterkste bewijs zijn',
                        description: 'Leg meer nadruk op praktijkervaring, werkhouding en snel inwerken.',
                    },
                    {
                        href: '/cv-gids/cv-zonder-ervaring-hbo',
                        label: 'Gebruik de HBO-variant als projecten en afstudeerwerk je kernbewijs vormen',
                        description: 'Zet analyse, projectwerk en studie-output zakelijker neer voor juniorvacatures.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Tijdens stage zelfstandig dagtaken uitgevoerd en positief beoordeeld op nauwkeurigheid, communicatie en opvolging.',
                    'Schoolproject met duidelijke taakverdeling en oplevering binnen deadline afgerond, inclusief presentatie van advies of resultaat.',
                    'Bijbaan gebruikt om klantcontact, tempo en verantwoordelijkheid aantoonbaar te ontwikkelen in een echte werkomgeving.',
                    'Vrijwilligers- of verenigingswerk vertaald naar organisatie, samenwerking of het regelen van activiteiten voor anderen.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Maak van kleine ervaringen sterkere werkervaring-bullets',
                        description: 'Handig als je wel voorbeelden hebt, maar ze nog te algemeen opschrijft.',
                    },
                    {
                        href: '/cv-voorbeelden/studenten-en-starters/eerste-baan-starter',
                        label: 'Bekijk een eerste-baan voorbeeld-CV',
                        description: 'Zie hoe een starterprofiel eruitziet wanneer opleiding, stage en eerste werkervaring samenkomen.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel zijn vaak: stage, project, praktijkervaring, teamwork, leervermogen en betrouwbaarheid.',
                    'Neem vacaturewoorden over die je echt kunt onderbouwen, bijvoorbeeld klantenservice, planning, administratie of logistiek.',
                    'Gebruik gewone kopjes zoals Opleiding, Werkervaring, Vaardigheden en Projecten zodat ATS-software alles goed herkent.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies vaardigheden die bij starters echt geloofwaardig zijn',
                        description: 'Gebruik alleen skills die je ook kunt terugzien in stage, project of bijbaan.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je starter-CV uit in een ATS-proof template',
                        description: 'Gebruik een eenvoudige layout waarin profiel, opleiding en eerste bewijs direct zichtbaar zijn.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor je starter-CV',
                bullets: [
                    'Je profieltekst noemt een rolrichting en niet alleen dat je gemotiveerd bent.',
                    'Opleiding, stage of project staan hoog genoeg als dat jouw sterkste bewijs is.',
                    'Bijbaan of vrijwilligerswerk is vertaald naar vaardigheden die ook voor werk tellen.',
                    'Je CV blijft eerlijk: je overdrijft geen niveau, taken of certificaten.',
                    'De hele pagina is in 10 seconden scanbaar voor een recruiter.',
                ],
            },
        },
        faq: [
            {
                question: 'Wat zet je op een CV zonder ervaring?',
                answer: 'Gebruik opleiding, stage, bijbaan, projecten, vrijwilligerswerk en nevenactiviteiten als bewijs van werkhouding, vaardigheden en richting.',
            },
            {
                question: 'Moet opleiding boven werkervaring staan?',
                answer: 'Vaak wel, tenzij je stage of bijbaan direct relevanter is voor de vacature dan je opleiding.',
            },
            {
                question: 'Mag ik een bijbaan meetellen als ervaring?',
                answer: 'Ja. Bijbanen tellen zeker mee, vooral als je er klantcontact, tempo, verantwoordelijkheid of teamwork mee kunt aantonen.',
            },
            {
                question: 'Hoe lang mag een starter-CV zijn?',
                answer: 'Voor de meeste starters is 1 pagina de beste keuze. Kort en concreet werkt beter dan een te brede opsomming.',
            },
        ],
    },
    'cv-voorbeeld-magazijnmedewerker-zonder-ervaring': {
        title: 'CV voorbeeld magazijnmedewerker zonder ervaring',
        description: 'Startergids voor logistieke sollicitaties zonder direct magazijnverleden, met voorbeeldprofielen, overdraagbare skills en orderpicker-termen.',
        metaTitle: 'CV voorbeeld magazijnmedewerker zonder ervaring (2026) | WerkCV.nl',
        metaDesc: 'Solliciteren als magazijnmedewerker zonder ervaring? Gebruik dit startervoorbeeld met profieltekst, logistieke skills, orderpicker bullets en ATS-termen.',
        keywords: [
            'cv magazijnmedewerker zonder ervaring',
            'magazijnmedewerker starter cv',
            'orderpicker cv zonder ervaring',
            'logistiek starter cv',
            'warehouse cv voorbeeld',
        ],
        intro: 'Zonder direct magazijnverleden kun je nog steeds een sterk logistiek CV neerzetten, zolang je laat zien dat je betrouwbaar, fysiek inzetbaar en leerbaar bent. Dat is extra relevant omdat UWV magazijn-, expeditiemedewerkers en orderpickers ook in 2025-2026 als kansrijk noemt. En in de huidige krapte nemen werkgevers vaker mensen aan die nog opgeleid moeten worden, mits hun CV tempo, discipline en beschikbaarheid geloofwaardig laat zien.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start direct met een logistiek CV template',
                description: 'Neem dit voorbeeld over in een rustige template en maak daarna een vacaturegerichte versie in de editor.',
            },
            {
                href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                title: 'Algemeen CV voorbeeld magazijnmedewerker',
                description: 'Vergelijk je startervariant met het bredere voorbeeld voor kandidaten met direct logistiek profiel.',
            },
            {
                href: '/cv-tips/cv-zonder-werkervaring',
                title: 'Tips voor een CV zonder werkervaring',
                description: 'Gebruik deze gids als je vooral uit retail, horeca, productie of schoolprojecten moet putten.',
            },
        ],
        sources: [
            {
                label: 'UWV - Kansrijke beroepen 2025-2026',
                href: 'https://www.uwv.nl/assets-kai/files/bcd769b3-07a1-498c-b0f4-4bcc6b78f3c6/kansrijke-beroepen-2025-2026.pdf',
                note: 'UWV noemt magazijn-, expeditiemedewerkers en orderpickers en ook heftruckchauffeurs kansrijk in 2025-2026.',
            },
            {
                label: 'UWV - Werkgevers leiden vaker nieuw personeel op',
                href: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/inzichten-werving-behoud/werkgevers-leiden-vaker-nieuw-personeel-op-vanwege-krappe-arbeidsmarkt',
                note: 'UWV meldde dat 52% van werkgevers door krapte vaker mensen aanneemt die nog opgeleid moeten worden.',
            },
        ],
        ctaTitle: 'Maak je logistiek-CV direct af',
        ctaText: 'Gebruik dit startervoorbeeld in een ATS-proof template, zet je overdraagbare skills scherp neer en exporteer daarna een professionele PDF.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een starter-CV voor magazijnwerk beoordelen',
                paragraphs: [
                    'Bij logistieke starters draait selectie meestal om betrouwbaarheid, tempo, nauwkeurigheid en inzetbaarheid in ploeg- of vroege diensten. Werkgevers willen snel zien of jij afspraken nakomt en of je gewend bent om gestructureerd en fysiek actief te werken.',
                    'Je hoeft daarvoor niet al in een warehouse gewerkt te hebben. Retail, horeca, productie, verhuizen, bezorgen of sportverenigingswerk kunnen allemaal bewijzen dat jij tempo houdt, samenwerkt en netjes met taken omgaat.',
                ],
                bullets: [
                    'Noem overdraagbare signalen zoals order, tempo, tillen, sorteren, voorraad of werken onder tijdsdruk.',
                    'Zet beschikbaarheid voor vroege diensten, avonden of ploegendiensten helder neer als dat relevant is.',
                    'Gebruik nuchtere taal: recruiters willen feiten, geen stoere maar lege claims.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Gemotiveerde starter met ervaring in fysiek en tempo-gericht werk vanuit retail en bijbanen. Werkt nauwkeurig, leert snel en is inzetbaar in logistieke teams.',
                    'Praktisch ingestelde kandidaat met sterke basis in voorraadwerk, laden en lossen en het volgen van werkafspraken. Zoekt een eerste logistieke rol als orderpicker of magazijnmedewerker.',
                    'Betrouwbare starter die gewend is om op tijd, netjes en gestructureerd te werken. Combineert fysieke inzetbaarheid met aandacht voor veiligheid en teamwerk.',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
                        label: 'Gebruik de brede no-experience parent als je nog heel weinig werkverleden hebt',
                        description: 'Handig als je eerst je stage, school of bijbaan goed wilt neerzetten voordat je specifieker wordt.',
                    },
                    {
                        href: '/templates',
                        label: 'Start je logistiek-CV direct in de editor',
                        description: 'Neem dit profiel over en pas het daarna per vacature aan op taken, shifts en omgeving.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Tijdens bijbaan dagelijks producten aangevuld en netjes gesorteerd, waardoor schappen of voorraadlocaties op orde bleven.',
                    'Pakketten, rolcontainers of leveringen verwerkt binnen afgesproken tempo zonder fouten in telling of plaatsing.',
                    'Onder tijdsdruk gewerkt met duidelijke taakverdeling, waardoor piekmomenten zonder achterstand konden worden afgerond.',
                    'Werkplek opgeruimd en veiligheidsafspraken gevolgd, zodat materialen en routes bruikbaar en overzichtelijk bleven.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Herschrijf ruwe logistieke taken naar sterkere bullets',
                        description: 'Maak van tillen, sorteren of voorraadwerk kortere zinnen met tempo en nauwkeurigheid.',
                    },
                    {
                        href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                        label: 'Vergelijk met het algemene magazijnmedewerker voorbeeld',
                        description: 'Neem termen over die ook in ervaren logistieke CV s vaak sterk werken.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel zijn vaak: orderpicken, voorraad, magazijn, logistiek, laden en lossen, scanner, WMS en ploegendienst.',
                    'Noem EPT, heftruck of reachtruck alleen als je daar echt mee hebt gewerkt of een certificaat voor hebt.',
                    'Gebruik woorden uit de vacature als ze kloppen met jouw praktijk, bijvoorbeeld inbound, outbound, picking of distributiecentrum.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies logistieke vaardigheden die geloofwaardig en vacaturegericht zijn',
                        description: 'Gebruik alleen skills die je in werk, stage of bijbaan ook echt kunt laten terugkomen.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je logistiek-CV uit in een ATS-proof template',
                        description: 'Houd kopjes, werkervaring en beschikbaarheid netjes in gewone tekst voor betere scanbaarheid.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor een magazijnstarter-CV',
                bullets: [
                    'Je CV bewijst tempo en betrouwbaarheid ook zonder direct magazijnverleden.',
                    'Beschikbaarheid en fysieke inzetbaarheid zijn concreet maar niet overdreven beschreven.',
                    'Je noemt alleen certificaten en machines die je echt beheerst.',
                    'Werkervaring laat orde, discipline en samenwerken zien.',
                    'Je layout blijft kort, rustig en recruiterproof.',
                ],
            },
        },
        faq: [
            {
                question: 'Kun je magazijnmedewerker worden zonder ervaring?',
                answer: 'Ja. Veel werkgevers staan open voor starters als je CV tempo, betrouwbaarheid, fysieke inzetbaarheid en leerbaarheid duidelijk laat zien.',
            },
            {
                question: 'Moet je een heftruckcertificaat al hebben?',
                answer: 'Niet altijd. Voor sommige functies wel, maar veel startfuncties draaien eerst om orderpicken, voorraadwerk en algemene logistieke discipline.',
            },
            {
                question: 'Welke skills zet je op een orderpicker-CV?',
                answer: 'Denk aan nauwkeurigheid, tempo, voorraadwerk, samenwerken, scannergebruik, veiligheidsbewustzijn en beschikbaarheid voor shifts.',
            },
            {
                question: 'Wat als ik uit horeca of retail kom?',
                answer: 'Dan kun je juist sterke overdraagbare skills meenemen: tempo, discipline, werken onder druk, tillen, aanvullen en klant- of teamgericht handelen.',
            },
        ],
    },
    'cv-voorbeeld-magazijnmedewerker-parttime': {
        title: 'CV voorbeeld magazijnmedewerker parttime',
        description: 'BOFU gids voor een parttime magazijn-CV met shifts, beschikbaarheid, werktempo en voorbeeldzinnen voor logistiek werk in minder uren.',
        metaTitle: 'CV voorbeeld magazijnmedewerker parttime (2026) | WerkCV.nl',
        metaDesc: 'Gebruik dit parttime CV voorbeeld voor magazijnmedewerker. Met profieltekst, orderpick-bullets, beschikbaarheid en ATS-termen voor logistiek werk.',
        keywords: [
            'cv magazijnmedewerker parttime',
            'parttime magazijnmedewerker cv',
            'magazijnmedewerker parttime voorbeeld',
            'logistiek parttime cv',
            'warehouse parttime cv',
        ],
        intro: 'Een parttime magazijn-CV moet vooral rust geven over inzetbaarheid. Werkgevers willen zien op welke dagen of shifts je beschikbaar bent, of je tempo ook in kortere diensten goed blijft en of overdracht, voorraadwerk en picktaken netjes worden uitgevoerd. Dat past bij de bredere deeltijdtrend: CBS meldde in november 2025 dat bijna 1,9 miljoen mensen 28 tot 35 uur per week werkten, terwijl UWV orderpickers en magazijnmedewerkers ook in 2025-2026 kansrijk blijft noemen.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start direct met een logistiek CV template',
                description: 'Neem dit parttime voorbeeld over in een rustige template en werk daarna per werkgever een variant uit.',
            },
            {
                href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                title: 'Algemeen CV voorbeeld magazijnmedewerker',
                description: 'Vergelijk je parttime versie met het bredere logistieke voorbeeld voor fulltime en allround magazijnwerk.',
            },
            {
                href: '/cv-gids/cv-voorbeeld-orderpicker',
                title: 'CV voorbeeld orderpicker',
                description: 'Handig als jouw parttime rol vooral draait om picking, scannergebruik en picksnelheid.',
            },
        ],
        sources: [
            {
                label: 'CBS - Weer meer mensen met grote deeltijdbanen',
                href: 'https://www.cbs.nl/nl-nl/nieuws/2025/46/weer-meer-mensen-met-grote-deeltijdbanen',
                note: 'CBS meldde op 13 november 2025 dat bijna 1,9 miljoen mensen 28 tot 35 uur per week werkten in Q3 2025.',
            },
            {
                label: 'UWV - Kansrijke beroepen 2025-2026',
                href: 'https://www.uwv.nl/assets-kai/files/bcd769b3-07a1-498c-b0f4-4bcc6b78f3c6/kansrijke-beroepen-2025-2026.pdf',
                note: 'UWV noemt magazijn-, expeditiemedewerkers en orderpickers en ook heftruckchauffeurs kansrijk in 2025-2026.',
            },
        ],
        ctaTitle: 'Maak je parttime logistieke CV direct af',
        ctaText: 'Gebruik dit voorbeeld in een ATS-proof template, zet je shifts en uren duidelijk neer en exporteer daarna een nette PDF voor je sollicitatie.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een parttime magazijn-CV beoordelen',
                paragraphs: [
                    'Bij parttime logistieke functies willen recruiters snel zien of jij betrouwbaar in te plannen bent. Het gaat dus niet alleen om magazijnervaring, maar ook om duidelijkheid over dagen, uren, ochtend- of avonddiensten en hoe je in korte diensten productief blijft.',
                    'Vage claims als "flexibel" zeggen weinig. Benoem liever of je inzetbaar bent op vaste dagen, of je ervaring hebt met piekmomenten, en welke pick- of voorraadtaken je foutarm uitvoerde.',
                ],
                bullets: [
                    'Noem beschikbaarheid concreet: bijvoorbeeld 24 uur, ochtenddiensten of vaste werkdagen.',
                    'Laat zien dat tempo en nauwkeurigheid ook in kortere shifts stabiel blijven.',
                    'Gebruik voorbeelden die overdracht, orderdiscipline en voorraadnetheid zichtbaar maken.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Parttime magazijnmedewerker met ervaring in orderpicken, voorraadcontrole en het verwerken van goederen in vaste ochtend- en avonddiensten. Werkt nauwkeurig, houdt tempo vast en is betrouwbaar inzetbaar in logistieke teams.',
                    'Logistiek medewerker met sterke basis in scannerwerk, orderdiscipline en nette werkplekopvolging. Zoekt een parttime magazijnrol waarin structuur, beschikbaarheid en foutarme uitvoering belangrijk zijn.',
                    'Praktisch ingestelde magazijnkracht met ervaring in distributie en retaillogistiek. Combineert duidelijke beschikbaarheid met tempo, teamwerk en aandacht voor veiligheid.',
                ],
                intentLinks: [
                    {
                        href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                        label: 'Vergelijk met het algemene magazijnmedewerker voorbeeld',
                        description: 'Handig als je zowel parttime inzetbaarheid als bredere warehouse-ervaring wilt laten zien.',
                    },
                    {
                        href: '/templates',
                        label: 'Start direct je parttime logistieke CV',
                        description: 'Neem dit profiel over in de editor en pas het daarna per werkgever aan op uren en shifts.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Gemiddeld 110+ orderregels per shift verwerkt met stabiele nauwkeurigheid en nette afronding van picklijsten.',
                    'Voorraadlocaties en pickroutes op orde gehouden, zodat opvolgende collega s zonder vertraging konden doorwerken.',
                    'Scanner- en controlewerk foutarm uitgevoerd, waardoor verschillen in voorraad of orderuitgifte beperkt bleven.',
                    'Beschikbaarheid op vaste piekmomenten ingezet, waardoor drukke dagen beter opgevangen konden worden zonder achterstand.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Herschrijf logistieke taken naar sterkere bullets',
                        description: 'Maak van orderwerk, voorraadcontrole en shifts kortere zinnen met meer bewijs en tempo.',
                    },
                    {
                        href: '/cv-gids/cv-voorbeeld-orderpicker',
                        label: 'Gebruik de orderpicker-variant als picking je hoofdtaak is',
                        description: 'Pak een specifieker logistiek profiel als scannerwerk, picksnelheid en orderfouten centraal staan.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel zijn vaak: magazijn, orderpicken, parttime, voorraad, scanner, WMS, ochtenddienst, avonddienst en logistiek.',
                    'Zet parttime beschikbaarheid feitelijk neer, niet te vaag. Recruiters willen uren en inzetmomenten snel zien.',
                    'Noem EPT, heftruck of reachtruck alleen als je daar echt mee hebt gewerkt of een certificaat voor hebt.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies logistieke vaardigheden die ook recruiterproof zijn',
                        description: 'Gebruik alleen skills die je in warehouse- of voorraadwerk echt kunt onderbouwen.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je parttime magazijn-CV uit in een ATS-proof template',
                        description: 'Houd uren, recente ervaring en logistieke termen netjes in gewone tekst voor betere scanbaarheid.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor een parttime magazijn-CV',
                bullets: [
                    'Je beschikbaarheid staat duidelijk en professioneel op het CV.',
                    'Werkervaring laat tempo, nauwkeurigheid en teamoverdracht zien.',
                    'Je noemt alleen logistieke tools of machines die je echt beheerst.',
                    'Parttime inzet klinkt als voorspelbaar en betrouwbaar, niet als beperkt of onzeker.',
                    'Je CV blijft kort, rustig en direct scanbaar.',
                ],
            },
        },
        faq: [
            {
                question: 'Moet ik parttime beschikbaarheid op mijn CV zetten?',
                answer: 'Ja, als uren of shifts belangrijk zijn voor de functie. In logistiek willen werkgevers snel zien wanneer je inzetbaar bent.',
            },
            {
                question: 'Hoe beschrijf ik een parttime magazijnbaan sterk?',
                answer: 'Focus op output per shift, nauwkeurigheid, beschikbaarheid en hoe je pick- of voorraadwerk betrouwbaar uitvoerde.',
            },
            {
                question: 'Kan ik parttime logistiek werk professioneel laten klinken?',
                answer: 'Ja. Benoem je uren feitelijk, laat resultaat per dienst zien en maak duidelijk dat je inzetbaarheid voorspelbaar is.',
            },
            {
                question: 'Welke termen helpen op een parttime logistiek CV?',
                answer: 'Denk aan magazijn, orderpicken, scanner, voorraad, WMS, ochtenddienst, avonddienst en logistieke verwerking.',
            },
        ],
    },
    'cv-voorbeeld-orderpicker': {
        title: 'CV voorbeeld orderpicker',
        description: 'Praktische BOFU gids voor een orderpicker-CV met picksnelheid, scannersystemen, logistieke skills en recruiterproof voorbeeldzinnen.',
        metaTitle: 'CV voorbeeld orderpicker (2026) | WerkCV.nl',
        metaDesc: 'Gebruik dit orderpicker CV voorbeeld met profieltekst, picksnelheid, scanner- en WMS-termen, werkervaring en logistieke ATS-tips.',
        keywords: [
            'cv orderpicker voorbeeld',
            'cv voorbeeld orderpicker',
            'orderpicker cv',
            'logistiek cv orderpicker',
            'warehouse orderpicker cv',
        ],
        intro: 'Een orderpicker-CV wordt meestal snel gescand op drie dingen: tempo, nauwkeurigheid en systeemgebruik. Werkgevers willen weten of jij orders foutarm verwerkt, of je met scanners of picklijsten kunt werken en of je betrouwbaar presteert tijdens drukke shifts. Dat sluit goed aan op UWV, dat orderpickers ook in 2025-2026 nog steeds noemt binnen de kansrijke logistieke beroepen.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start direct met een orderpicker template',
                description: 'Gebruik dit voorbeeld in een rustige template en zet daarna je eigen picksnelheid en logistieke ervaring netjes bovenaan.',
            },
            {
                href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                title: 'Algemeen CV voorbeeld magazijnmedewerker',
                description: 'Vergelijk orderpicker-termen met het bredere magazijnprofiel voor voorraad, laden en lossen en logistieke uitvoering.',
            },
            {
                href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-zonder-ervaring',
                title: 'CV voorbeeld magazijnmedewerker zonder ervaring',
                description: 'Handig als je orderpicker wilt worden maar nog weinig direct warehouseverleden hebt.',
            },
        ],
        sources: [
            {
                label: 'UWV - Kansrijke beroepen 2025-2026',
                href: 'https://www.uwv.nl/assets-kai/files/bcd769b3-07a1-498c-b0f4-4bcc6b78f3c6/kansrijke-beroepen-2025-2026.pdf',
                note: 'UWV noemt orderpickers, magazijn- en expeditiemedewerkers kansrijk in 2025-2026.',
            },
            {
                label: 'UWV - Werkgevers leiden vaker nieuw personeel op',
                href: 'https://www.uwv.nl/nl/arbeidsmarktinformatie/inzichten-werving-behoud/werkgevers-leiden-vaker-nieuw-personeel-op-vanwege-krappe-arbeidsmarkt',
                note: 'UWV meldde dat 52% van werkgevers door krapte vaker mensen aanneemt die nog opgeleid moeten worden.',
            },
        ],
        ctaTitle: 'Maak je orderpicker-CV direct af',
        ctaText: 'Gebruik dit voorbeeld in een ATS-proof template, zet picksnelheid en scannertermen goed neer en exporteer daarna een nette PDF voor je volgende sollicitatie.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe recruiters een orderpicker-CV beoordelen',
                paragraphs: [
                    'Bij orderpicker-functies is selectie vaak praktisch en hard op uitvoering. Werkgevers willen snel zien of jij foutarm kunt picken, of je instructies en locaties goed volgt en of je het tempo van het warehouse aankunt.',
                    'Daarom werken concrete termen beter dan vage claims. Benoem scannergebruik, picklijsten, voorraadlocaties, orderregels per uur of foutarme afhandeling als je die echt kunt onderbouwen.',
                ],
                bullets: [
                    'Gebruik termen als orderpicken, scanner, picklijst, WMS en voorraadlocaties als ze passen bij je werk.',
                    'Laat tempo en nauwkeurigheid samen zien, niet alleen snelheid.',
                    'Noem shifts, fysieke inzetbaarheid en teamwork als dat in jouw warehouseomgeving relevant was.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Orderpicker met ervaring in scannerwerk, picklijsten en het foutarm verwerken van orders in drukke logistieke omgevingen. Werkt snel, nauwkeurig en houdt overzicht tijdens piekmomenten.',
                    'Praktisch ingestelde logistiek medewerker met sterke basis in orderpicken, voorraadcontrole en nette werkdiscipline. Zoekt een orderpickerrol waarin tempo en betrouwbaarheid direct tellen.',
                    'Gemotiveerde warehousekracht met ervaring in picking, verpakken en routevolgorde. Combineert fysieke inzetbaarheid met aandacht voor veiligheid en foutarme uitvoering.',
                ],
                intentLinks: [
                    {
                        href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                        label: 'Vergelijk met het algemene magazijnmedewerker voorbeeld',
                        description: 'Handig als jouw rol deels picking is en deels voorraad, laden en lossen of allround logistiek werk.',
                    },
                    {
                        href: '/templates',
                        label: 'Start direct je orderpicker-CV in de editor',
                        description: 'Neem deze profielstructuur over en pas hem daarna per warehouse of werkgever aan.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Gemiddeld 120+ orderregels per uur verwerkt met stabiele nauwkeurigheid tijdens piekuren.',
                    'RF-scanner en picklijsten gebruikt om orders correct te verzamelen en tijdig af te ronden voor verzending.',
                    'Orderfouten beperkt gehouden door systematische controle van locatie, artikel en aantallen voor afronding.',
                    'Samengewerkt met inpak- en laadteams zodat picks zonder onnodige wachttijd doorgingen naar de volgende stap.',
                ],
                intentLinks: [
                    {
                        href: '/werkervaring-cv-voorbeelden',
                        label: 'Herschrijf picking- en scannerwerk naar sterkere bullets',
                        description: 'Maak van orderregels, locaties en controles kortere zinnen met meer bewijs en resultaat.',
                    },
                    {
                        href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-parttime',
                        label: 'Gebruik de parttime variant als je vooral in vaste korte shifts werkt',
                        description: 'Pak een specifieker profiel als uren, dagen en inzetmomenten een groot deel van je sollicitatie bepalen.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel zijn vaak: orderpicker, orderpicken, RF scanner, picklijst, WMS, voorraad, inbound, outbound en distributiecentrum.',
                    'Noem productiviteit alleen als je die geloofwaardig kunt uitleggen in een gesprek.',
                    'Zet EPT, heftruck of reachtruck alleen op je CV als je er echt mee hebt gewerkt of gecertificeerd bent.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies orderpicker-skills die logisch terugkomen in je ervaring',
                        description: 'Gebruik alleen logistieke vaardigheden die je ook echt op de vloer kunt toelichten.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je orderpicker-CV uit in een ATS-proof template',
                        description: 'Gebruik een rustige layout zodat picksnelheid, scannertermen en recente ervaring direct zichtbaar zijn.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor een orderpicker-CV',
                bullets: [
                    'Je CV noemt picking, scannerwerk of orderdiscipline concreet genoeg.',
                    'Tempo en nauwkeurigheid staan beide op je CV, niet slechts een van de twee.',
                    'Warehouse-termen sluiten aan op het type vacature waarop je reageert.',
                    'Je noemt alleen machines of systemen die je echt beheerst.',
                    'Je CV blijft compact, feitelijk en snel scanbaar.',
                ],
            },
        },
        faq: [
            {
                question: 'Wat moet er op een orderpicker-CV staan?',
                answer: 'Noem picksnelheid, nauwkeurigheid, scanner- of picklijstwerk, warehouse-termen, shifts en logistieke discipline.',
            },
            {
                question: 'Is orderpicker hetzelfde als magazijnmedewerker op je CV?',
                answer: 'Niet helemaal. Orderpicker is specifieker en draait vaker direct om picking, scanners en foutarme orderverwerking.',
            },
            {
                question: 'Moet ik picksnelheid noemen op mijn CV?',
                answer: 'Ja, als je die ongeveer kunt onderbouwen. Tempo is relevant, maar combineer het altijd met nauwkeurigheid.',
            },
            {
                question: 'Wat als ik nog geen scannerervaring heb?',
                answer: 'Gebruik dan de magazijn zonder ervaring-pagina en focus op overdraagbare logistieke signalen zoals tempo, voorraadwerk en nauwkeurigheid.',
            },
        ],
    },
    'cv-voorbeeld-student-bijbaan': {
        title: 'CV voorbeeld student bijbaan (simpel + snel)',
        description: 'Snel inzetbare BOFU pagina voor studenten die een kort, scanbaar en eerlijk CV nodig hebben voor hun volgende bijbaan.',
        metaTitle: 'CV voorbeeld student bijbaan (2026) | Simpel en Snel | WerkCV.nl',
        metaDesc: 'Snel een student-CV voor je bijbaan maken? Bekijk een simpel voorbeeld met profieltekst, beschikbaarheid, opleiding en bijbaan skills.',
        keywords: [
            'cv student voorbeeld',
            'cv student bijbaan',
            'student bijbaan cv',
            'cv voorbeeld student bijbaan',
            'simpel student cv',
        ],
        intro: 'Een student-CV voor een bijbaan hoeft niet vol te staan. Het moet snel duidelijk maken wat je zoekt, wanneer je beschikbaar bent en waarom jij betrouwbaar genoeg bent om in te plannen. CBS laat zien dat in 2024 76% van de 15- tot 25-jarigen werkte. Van die jongeren had 55% een tijdelijk contract. Werkgevers zijn dus gewend aan korte, flexibele studentprofielen, maar verwachten wel dat jouw CV meteen duidelijkheid geeft over richting, beschikbaarheid en werkhouding.',
        relatedLinks: [
            {
                href: '/templates',
                title: 'Start direct met een student-CV template',
                description: 'Gebruik dit voorbeeld in een simpele template en maak daarna snel je eigen bijbaanversie af.',
            },
            {
                href: '/cv-maken-student',
                title: 'CV maken als student',
                description: 'Gebruik de bredere studentenroute als je naast bijbanen ook stage of een startersfunctie overweegt.',
            },
            {
                href: '/cv-voorbeelden/studenten-en-starters/bijbaan-deeltijd-cv',
                title: 'Voorbeeld-CV bijbaan en deeltijd',
                description: 'Vergelijk dit gidsformat met een uitgewerkt voorbeeld voor scholieren en studenten.',
            },
        ],
        sources: [
            {
                label: 'CBS - Het aanbod van arbeid 2024',
                href: 'https://longreads.cbs.nl/dearbeidsmarktincijfers-2024/het-aanbod-van-arbeid/',
                note: 'CBS laat zien dat in 2024 76% van de 15- tot 25-jarigen werkte en dat 55% van die jongeren een tijdelijk contract had.',
            },
            {
                label: 'CBS - Weer meer mensen met grote deeltijdbanen',
                href: 'https://www.cbs.nl/nl-nl/nieuws/2025/46/weer-meer-mensen-met-grote-deeltijdbanen',
                note: 'CBS meldde eind 2025 dat jongeren vaak kleine deeltijdbanen combineren met school of studie.',
            },
            {
                label: 'CBS - Stages en banen van studenten in mbo en ho, 2024-2025',
                href: 'https://www.cbs.nl/nl-nl/maatwerk/2025/51/stages-en-banen-van-studenten-in-het-mbo-en-ho-naar-cao-en-sbi-2024-2025',
                note: 'Recente CBS-tabellen met arbeidsduur en loongegevens voor studenten in studiejaar 2024/25.',
            },
        ],
        ctaTitle: 'Maak je student-CV vandaag nog af',
        ctaText: 'Gebruik dit voorbeeld in een simpele, ATS-proof template en exporteer daarna een nette PDF voor je volgende bijbaan of studentenjob.',
        sectionOverrides: {
            'recruiter-scan': {
                title: 'Hoe werkgevers een student-CV voor een bijbaan scannen',
                paragraphs: [
                    'Bij bijbanen kijken werkgevers meestal niet eerst naar lange ervaring, maar naar duidelijkheid. Ze willen snel zien wat voor werk je zoekt, hoeveel uur je beschikbaar bent en of je betrouwbaar genoeg bent om op te nemen in het rooster.',
                    'Een student-CV wint daarom op eenvoud: 1 pagina, duidelijke kopjes, korte voorbeelden en een profieltekst die meteen richting geeft.',
                ],
                bullets: [
                    'Noem direct of je mikt op horeca, winkel, logistiek, klantenservice of een allround bijbaan.',
                    'Zet beschikbaarheid feitelijk neer: avonden, weekenden, vakanties of vaste dagen.',
                    'Gebruik korte voorbeelden van school, vrijwilligerswerk of eerdere bijbanen als bewijs van werkhouding.',
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Betrouwbare student met ervaring in klantcontact en teamwork. Beschikbaar in avonden en weekenden en gewend om snel te schakelen tijdens drukke momenten.',
                    'MBO-student op zoek naar een bijbaan in retail of horeca. Werkt netjes, leert snel en is gewend om afspraken na te komen.',
                    'HBO-student met sterke basis in communicatie, organiseren en service. Zoekt een bijbaan waarin klantgerichtheid en verantwoordelijkheid samenkomen.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-student',
                        label: 'Gebruik de studentenroute als je meer wilt dan alleen een bijbaan-CV',
                        description: 'Handig als je ook stage, traineeship of een eerste serieuze startersrol wilt voorbereiden.',
                    },
                    {
                        href: '/templates',
                        label: 'Start direct je eigen student-bijbaan CV',
                        description: 'Neem dit profiel over in de editor en pas het daarna aan op winkel, horeca of logistiek werk.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Naast studie gewerkt in klantgerichte omgeving, waarbij afspraken, tempo en nette afhandeling belangrijk waren.',
                    'Vrijwilligers- of verenigingswerk gebruikt om planning, samenwerken en verantwoordelijkheid aantoonbaar te maken.',
                    'Korte bijbaan professioneel beschreven met focus op wat die ervaring zegt over je betrouwbaarheid, service of tempo.',
                    'Schoolproject of commissiewerk vertaald naar organiseren, communiceren en op tijd opleveren.',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/cv-voorbeeld-horeca-medewerker',
                        label: 'Gebruik de horeca-variant als je vooral voor restaurant of cafe solliciteert',
                        description: 'Pak service, piekdrukte en beschikbaarheid specifieker aan voor horecaomgevingen.',
                    },
                    {
                        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
                        label: 'Gebruik de no-experience parent als je bijna geen werkverleden hebt',
                        description: 'Handig als school, stage en projecten nog zwaarder wegen dan je bijbanen.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel zijn vaak: beschikbaarheid, klantcontact, teamwork, bijbaan, student, flexibiliteit en tempo.',
                    'Noem software of kassa-ervaring alleen als je die echt hebt gebruikt.',
                    'Laat je CV niet verdrinken in hobby s: focus op werkhouding, richting en inzetbaarheid.',
                ],
                intentLinks: [
                    {
                        href: '/vaardigheden-cv-voorbeelden',
                        label: 'Kies geloofwaardige student-skills voor je CV',
                        description: 'Gebruik alleen vaardigheden die je in school, bijbaan of vrijwilligerswerk echt hebt laten zien.',
                    },
                    {
                        href: '/templates',
                        label: 'Werk je student-CV uit in een eenvoudige ATS-proof template',
                        description: 'Gebruik een korte layout waarin profiel, opleiding en beschikbaarheid direct boven water komen.',
                    },
                ],
            },
            'final-check': {
                title: 'Final check voor een student-bijbaan CV',
                bullets: [
                    'Je CV past op 1 pagina en is in seconden te scannen.',
                    'Beschikbaarheid staat helder maar professioneel geformuleerd.',
                    'Profieltekst laat richting en werkhouding zien, niet alleen dat je werk zoekt.',
                    'Kleine ervaringen zijn professioneel vertaald naar bewijs van betrouwbaarheid of service.',
                    'Je contactgegevens en woonplaats zijn actueel en foutloos.',
                ],
            },
        },
        faq: [
            {
                question: 'Hoe lang mag een student-CV zijn?',
                answer: 'Voor een bijbaan is 1 pagina bijna altijd genoeg. Werkgevers willen snel zien wat je zoekt, wat je kunt en wanneer je beschikbaar bent.',
            },
            {
                question: 'Moet ik mijn cijferlijst noemen?',
                answer: 'Meestal niet. Alleen als je opleiding of bepaalde resultaten direct relevant zijn voor de baan waarop je solliciteert.',
            },
            {
                question: 'Mag ik een korte of oude bijbaan noemen?',
                answer: 'Ja, zolang je duidelijk maakt wat die ervaring zegt over je werkhouding, service of verantwoordelijkheid.',
            },
            {
                question: 'Hoe noem ik mijn beschikbaarheid op mijn CV?',
                answer: 'Hou het feitelijk: bijvoorbeeld 12 tot 16 uur per week, beschikbaar op avonden en zaterdag, extra inzetbaar in vakanties.',
            },
        ],
    },
    'cv-zonder-ervaring-mbo': {
        intro: 'Zonder formele werkervaring kun je nog steeds een sterk CV maken. MBO-starters winnen juist op houding, leervermogen en aantoonbare praktijkervaring uit stage, school en bijbaan.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'MBO-starter met recente stage- en bijbaanervaring, gewend om verantwoordelijkheid te nemen en afspraken na te komen.',
                    'Leergierig en praktisch ingesteld, met focus op snel inwerken en zorgvuldig uitvoeren van werkzaamheden.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-student',
                        label: 'Studenten-CV maken als je nog vooral school en stage hebt',
                        description: 'Gebruik een starterflow waarin profieltekst, opleiding en eerste ervaring logisch zijn opgebouwd.',
                    },
                    {
                        href: '/cv-maken-16-jarige',
                        label: 'CV maken voor 16-jarigen met weinig formele werkervaring',
                        description: 'Krijg een eenvoudiger startpunt als je vooral bijbaan, stage of schoolprojecten kunt tonen.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Tijdens stage zelfstandig dagtaken uitgevoerd en positief beoordeeld op inzet en nauwkeurigheid.',
                    'Schoolproject opgeleverd binnen deadline met duidelijke taakverdeling en teamwork.',
                    'Bijbaanervaring gebruikt om klantcontact, tempo en werkdiscipline aantoonbaar te ontwikkelen.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-15-jarige',
                        label: 'CV maken voor 15-jarigen met school, bijbaan of eerste werkervaring',
                        description: 'Gebruik voorbeelden waarin kleine ervaringen toch professioneel worden gepresenteerd.',
                    },
                    {
                        href: '/cv-maken-16-jarige',
                        label: 'CV maken voor 16-jarigen met stage of eerste bijbaan',
                        description: 'Geef schoolprojecten, praktijkuren en werkhouding een sterkere plek op je cv.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel: stage, praktijkervaring, leervermogen, teamwork, betrouwbaarheid.',
                    'Zet stage en bijbaan boven opleiding als die sterker aansluit op de vacature.',
                    'Noem relevante certificaten (VCA, BHV, heftruck, etc.) zodra je die hebt.',
                ],
                intentLinks: [
                    {
                        href: '/gratis-cv-maken',
                        label: 'Gratis CV maken voor een eerste nette sollicitatieversie',
                        description: 'Start snel met een compact cv en voeg daarna vacaturewoorden en bewijs per rol toe.',
                    },
                    {
                        href: '/cv-maken-student',
                        label: 'Gebruik de studentenroute voor een ATS-veilige starteropbouw',
                        description: 'Houd stage, bijbaan en opleiding in gewone tekst zodat recruitersoftware alles goed leest.',
                    },
                ],
            },
        },
        faq: [
            {
                question: 'Wat zet ik op mijn CV als ik nog geen baan had?',
                answer: 'Gebruik stage, projecten, praktijkopdrachten, bijbaan en vrijwilligerswerk als bewijs van vaardigheden en werkhouding.',
            },
            {
                question: 'Moet opleiding bovenaan staan?',
                answer: 'Bij starters vaak wel, tenzij je stage of bijbaan direct relevanter is voor de functie.',
            },
            {
                question: 'Hoe toon ik motivatie zonder vaag te zijn?',
                answer: 'Koppel motivatie aan gedrag: op tijd, leren in tempo, verantwoordelijkheid nemen en feedback toepassen.',
            },
            {
                question: 'Is 1 pagina genoeg voor een starter-CV?',
                answer: 'Ja, een sterke en compacte pagina is meestal effectiever dan een lange, algemene versie.',
            },
        ],
    },
    'cv-zonder-ervaring-hbo': {
        intro: 'HBO-starters worden vaak beoordeeld op potentieel: analytisch vermogen, projectervaring en professionele communicatie. Deze pagina helpt je die signalen scherp op je CV te zetten.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'HBO-starter met stage- en afstudeerervaring in projectmatige omgevingen, sterk in analyse en communicatie.',
                    'Verbindt theoretische kennis aan praktische uitvoering en werkt gestructureerd naar concrete oplevering.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-student',
                        label: 'Studenten-CV maken met nadruk op potentieel en studie-output',
                        description: 'Gebruik een opbouw waarin profieltekst, opleiding en junior-positionering goed samenwerken.',
                    },
                    {
                        href: '/stage-cv-maken',
                        label: 'Stage-CV maken wanneer je stage en afstudeerproject je sterkste bewijs zijn',
                        description: 'Zet projecten, onderzoek en praktische oplevering centraal in je eerste professionele cv.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Afstudeeronderzoek vertaald naar implementatieadvies dat door opdrachtgever is doorgevoerd.',
                    'Projectrol als coordinator ingevuld met oplevering binnen scope, planning en kwaliteitscriteria.',
                    'Stageopdracht uitgevoerd met stakeholderinterviews en datagedreven aanbevelingen.',
                ],
                intentLinks: [
                    {
                        href: '/stage-cv-maken',
                        label: 'Stage-CV maken met ruimte voor project- en onderzoeksresultaten',
                        description: 'Gebruik een layout waarin stage, afstudeeronderzoek en concrete oplevering sterker zichtbaar worden.',
                    },
                    {
                        href: '/gratis-cv-maken',
                        label: 'Gratis CV maken en daarna je junior-verhaal per vacature aanscherpen',
                        description: 'Begin met een basisversie en benadruk vervolgens per functie de meest relevante studie-output.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel: afstudeerproject, analyse, stakeholder, implementatie, resultaat.',
                    'Noem tools en methodes uit je studie alleen als je ze echt hebt toegepast.',
                    'Leg nadruk op transfer: hoe je studie-output direct waarde levert in de praktijk.',
                ],
                intentLinks: [
                    {
                        href: '/gratis-cv-maken',
                        label: 'Gratis CV maken met een eenvoudige, ATS-veilige starterstructuur',
                        description: 'Voorkom ruis en laat projecttermen, tools en stagebewijs als gewone tekst uitlezen.',
                    },
                    {
                        href: '/cv-maken-student',
                        label: 'Gebruik de studentenroute voor een recruiter-scanbare juniorversie',
                        description: 'Houd opleiding, projecten en skills compact zodat je eerste selectie sterker wordt.',
                    },
                ],
            },
        },
        checklist: [
            'Afstudeer- en stageprojecten zijn vertaald naar zakelijke impact.',
            'Profieltekst toont potentieel en professionele houding, niet alleen ambitie.',
            'Kernvaardigheden zijn gekoppeld aan concrete voorbeelden.',
            'Relevante tools en methodes staan helder vermeld.',
            'CV is afgestemd op specifieke junior functie.',
            'Lengte blijft compact en recruiter-scanbaar.',
            'Taal en datumnotatie zijn consequent.',
        ],
    },
    'cv-voorbeeld-callcenter-medewerker': {
        intro: 'Callcenter recruiters selecteren op balans: snelheid, kwaliteit en klantbehoud. Dit CV-format laat zien hoe je prestaties per gesprekstype overtuigend onderbouwt.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Callcenter medewerker met ervaring in inbound en outbound trajecten binnen KPI-gedreven teams.',
                    'Sterk in bezwaarafhandeling, first-time-fix en duidelijke communicatie onder hoge gespreksdruk.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'AHT met 14% verlaagd door betere gespreksopening en snellere probleemdiagnose.',
                    'Retentiecampagne uitgevoerd met 76% klantbehoud door gerichte bezwaarbehandeling.',
                    'Kwaliteitsscore boven 92% gehouden tijdens piekperiodes met verhoogd belvolume.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: AHT, FCR, klantbehoud, SLA, callkwaliteit.',
                    'Beschrijf per kanaal je sterkte: inbound support, outbound sales, retentie of klachten.',
                    'Koppel communicatieskills aan concrete KPI-verbetering voor hogere geloofwaardigheid.',
                ],
            },
        },
        faq: [
            {
                question: 'Welke KPI s moet ik op een callcenter CV noemen?',
                answer: 'Noem KPI s die voor de rol relevant zijn: AHT, FCR, kwaliteitsscore, klantbehoud en eventueel conversie.',
            },
            {
                question: 'Moet ik scripts of systemen benoemen?',
                answer: 'Ja, als ze in de vacature staan. Benoem CRM/ticketingtools en hoe je die gebruikt voor snelle en correcte afhandeling.',
            },
            {
                question: 'Hoe toon ik sterke communicatie op CV?',
                answer: 'Niet met alleen woorden, maar met uitkomsten: minder escalaties, hogere kwaliteitsscore en betere klanttevredenheid.',
            },
            {
                question: 'Wat is de grootste valkuil?',
                answer: 'Alleen taken noemen ("gesprekken gevoerd") zonder cijfers of kwaliteitseffect op teamresultaat.',
            },
        ],
    },
    'cv-voorbeeld-receptionist': {
        intro: 'Een receptionist CV wint op eerste indruk, maar vooral op betrouwbaarheid erachter: planning, afhandeling en professionele communicatie. Deze pagina helpt je dat concreet te maken.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Representatieve receptionist met ervaring in front-office, agendabeheer en bezoekerscoordinatie.',
                    'Combineert gastvrijheid met strakke organisatie, waardoor receptieprocessen soepel en professioneel blijven.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Dagelijks 120+ bezoekers ontvangen en efficient doorgeleid zonder wachttijd-opbouw.',
                    'Vergaderruimteplanning geoptimaliseerd waardoor dubbele boekingen vrijwel volledig verdwenen.',
                    'Telefonische bereikbaarheid verhoogd door triage-afspraken en duidelijkere escalatieroutes.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: front office, agendabeheer, bezoekersregistratie, telefonie, gastvrijheid.',
                    'Noem talenkennis expliciet als de receptie internationale bezoekers ontvangt.',
                    'Laat zien hoe je multitasking beheerst zonder kwaliteitsverlies in ontvangst en planning.',
                ],
            },
        },
    },
    'cv-voorbeeld-office-manager': {
        intro: 'Office managers worden beoordeeld op rust in de operatie. Een sterk CV laat zien dat jij processen, planning en mensen tegelijk kunt organiseren zonder overzicht te verliezen.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'Office manager met brede verantwoordelijkheid voor planning, facilitaire processen en teamondersteuning.',
                    'Stuurt op structuur, voorspelbaarheid en samenwerking in omgevingen met veel parallelle prioriteiten.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Onboardingflow herontworpen waardoor nieuwe collega s binnen 48 uur operationeel waren.',
                    'Leveranciersafspraken geoptimaliseerd met 11% kostenbesparing op jaarlijkse office-uitgaven.',
                    'Interne serviceverzoeken gestroomlijnd met duidelijke prioritering en kortere doorlooptijd.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: office operations, leveranciersmanagement, procesoptimalisatie, planning, budgetbewaking.',
                    'Toon zowel operationele stabiliteit als verbetervermogen in je voorbeelden.',
                    'Gebruik taal die past bij de context: scale-up, corporate, non-profit of publieke sector.',
                ],
            },
        },
        checklist: [
            'Operationele impact is zichtbaar met concrete verbetervoorbeelden.',
            'Planning en coordinatie zijn onderbouwd met resultaat, niet alleen taakomschrijving.',
            'Leveranciers- en kostenbewaking zijn benoemd waar relevant.',
            'Interne stakeholdercommunicatie komt terug in recente rollen.',
            'CV-structuur is compact en recruiter-scanbaar.',
            'Functieterminologie sluit aan op de vacature.',
            'Bestandsnaam en afwerking zijn professioneel.',
        ],
    },
    'cv-voorbeeld-qa-tester': {
        intro: 'QA testers krijgen interviews op basis van risicodenken en meetbare kwaliteitsverbetering. Dit CV-format helpt je testimpact zichtbaar te maken in plaats van alleen testactiviteiten.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'QA tester met ervaring in handmatige en geautomatiseerde tests binnen Agile productteams.',
                    'Sterk in teststrategie, defectpreventie en het vertalen van risico naar uitvoerbare testscenario s.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Regressieset geautomatiseerd waardoor releasevalidatie van 2 dagen naar 6 uur ging.',
                    'Defect leakage met 29% verlaagd via scherpere acceptatiecriteria en testdekking.',
                    'Bugtriageproces verbeterd waardoor kritieke issues sneller prioriteit kregen in sprintplanning.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: testautomatisering, regressietest, defect management, quality gates, teststrategie.',
                    'Noem tooling alleen met context: wat heb je ermee verbeterd in releasekwaliteit of snelheid?',
                    'Toon samenwerking met developers/product om je impact op totale delivery te bewijzen.',
                ],
            },
        },
    },
    'cv-voorbeeld-ux-designer': {
        intro: 'UX recruiters zoeken geen mooie woorden, maar bewijs van betere gebruikservaring. Een sterk UX CV laat zien welke keuzes je maakte en welk gebruikers- of businessresultaat dat opleverde.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'UX designer met ervaring in onderzoek, prototyping en validatie binnen digitale productteams.',
                    'Verbindt gebruikersinzichten met concrete ontwerpbeslissingen die conversie en gebruiksgemak verbeteren.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Checkoutflow herontworpen op basis van usability tests, met 16% hogere completion rate.',
                    'Design system schaalbaar gemaakt waardoor ontwerphandoffs sneller en consistenter verliepen.',
                    'User research-ritme opgezet met productteam, resulterend in kortere feedbackloops per release.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type functie: user research, usability testing, interaction design, design system, Figma.',
                    'Koppel portfolioresultaten aan meetbare effecten op productdoelen.',
                    'Noem samenwerking met product/development om uitvoerbaarheid en impact te benadrukken.',
                ],
            },
        },
    },
    'cv-voorbeeld-zzper': {
        title: 'CV voorbeeld zzp\'er (2026)',
        description: 'Praktische gids voor een ZZP-CV met opdrachtstructuur, opdrachtgevercontext, profieltekst, NDA-aanpak en recruiterproof voorbeeldbullets.',
        metaTitle: 'CV voorbeeld zzp\'er (2026) | WerkCV',
        metaDesc: 'Gebruik dit CV voorbeeld voor zzp\'ers en freelancers. Met opdrachtstructuur, profieltekst, NDA-opdrachten, intermediairproof bullets en voorbeeldformuleringen.',
        keywords: [
            'cv voorbeeld zzp\'er',
            'zzp cv voorbeeld',
            'cv freelancer voorbeeld',
            'cv als zelfstandige voorbeeld',
            'freelance cv voorbeeld',
        ],
        intro: 'Een ZZP-CV werkt anders dan een standaard loondienst-CV. Opdrachtgevers en intermediairs willen in enkele seconden zien wat je specialisme is, voor wie je hebt gewerkt en welk resultaat je levert per opdracht. Deze pagina helpt je dat voorbeeldmatig neer te zetten.',
        checklist: [
            'Profieltekst noemt niche, type opdracht en beschikbaarheid.',
            'Opdrachten staan per opdrachtgever of sector, niet als vage freelance periode zonder structuur.',
            'Per opdracht zijn 2-3 resultaatgerichte bullets zichtbaar.',
            'Bekende opdrachtgevers of duidelijke sectorcontext versterken direct je geloofwaardigheid.',
            'NDA-opdrachten zijn professioneel verwerkt zonder te veel informatie weg te laten.',
            'Tarief staat niet in het CV zelf.',
            'Het document voelt als een gerichte opdrachtversie, niet als een rommige masterlijst.',
        ],
        relatedLinks: [
            {
                href: '/cv-tips/freelance-cv-maken',
                title: 'ZZP CV maken: complete gids',
                description: 'Gebruik de lange gids als je niet alleen een voorbeeld zoekt, maar ook strategie voor tarief, intermediairs en meerdere CV-versies.',
            },
            {
                href: '/tools/profieltekst-generator',
                title: 'Profieltekst generator',
                description: 'Maak sneller een eerste profieltekst voor je niche, doelgroep en type opdracht.',
            },
            {
                href: '/tools/werkervaring-bullets',
                title: 'Werkervaring bullets tool',
                description: 'Zet losse opdrachtinformatie om naar compactere, resultaatgerichte bullets.',
            },
        ],
        ctaTitle: 'Maak je ZZP-CV direct af',
        ctaText: 'Gebruik dit voorbeeld in een rustige template, zet je opdrachtstructuur strak neer en exporteer daarna een professionele PDF voor intermediairs en opdrachtgevers.',
        ctaHref: '/templates',
        sectionOverrides: {
            'recruiter-scan': {
                paragraphs: [
                    'Intermediairs en opdrachtgevers zoeken op een ZZP-CV niet eerst naar werkgeversnamen, maar naar specialisme, opdrachtcontext en snelheid van vertrouwen. Ze willen direct zien of jij qua niche, senioriteit en soort projecten aansluit op de opdracht.',
                    'De grootste fout is meestal dat zelfstandigen hun hele freelanceperiode als een blok beschrijven. Daardoor blijft onduidelijk voor wie je werkte, wat je rol was en welke resultaten jij per opdracht hebt geleverd.',
                    'Een sterk ZZP-CV leest daarom eerder als een compacte opdrachtportfolio dan als een klassiek dienstverbandsoverzicht.',
                ],
                intentLinks: [
                    {
                        href: '/cv-tips/freelance-cv-maken',
                        label: 'Lees eerst de complete gids voor een ZZP-CV',
                        description: 'Handig als je behalve een voorbeeld ook de bredere strategie wilt rond intermediairs, NDA-opdrachten en meerdere versies.',
                    },
                ],
            },
            profieltekst: {
                exampleItems: [
                    'Freelance projectmanager gespecialiseerd in ERP- en procesimplementaties bij middelgrote organisaties. Stuurt op scope, stakeholderafstemming en voorspelbare oplevering. Beschikbaar voor interimopdrachten vanaf 24 uur per week.',
                    'Zelfstandig content- en SEO-specialist voor B2B SaaS en zakelijke dienstverlening. Verbindt contentstrategie aan organische groei, leadkwaliteit en duidelijke rapportage voor marketingteams.',
                ],
                intentLinks: [
                    {
                        href: '/tools/profieltekst-generator',
                        label: 'Maak sneller een profieltekst voor je ZZP-specialisme',
                        description: 'Gebruik de generator als je niche, doelgroep of beschikbaarheidszin nog niet scherp is.',
                    },
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Opdracht bij logistieke scale-up: fulfilmentproces heringericht, waardoor foutieve zendingen met 18% daalden binnen 4 maanden.',
                    'Interim marketingopdracht voor SaaS-bedrijf: contentflow en SEO-structuur herbouwd, met 31% meer organische demo-aanvragen in 2 kwartalen.',
                    'Vertrouwelijke finance-opdracht: rapportage- en forecastritme gestandaardiseerd, wat directie sneller besluitbaar inzicht gaf per maandafsluiting.',
                ],
                intentLinks: [
                    {
                        href: '/tools/werkervaring-bullets',
                        label: 'Zet losse opdrachten om naar sterkere resultaatbullets',
                        description: 'Handig als je projectbeschrijvingen nu nog te taakgericht of te lang zijn.',
                    },
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type CV: interim, opdracht, opdrachtgever, implementatie, stakeholdermanagement, freelance, zelfstandige.',
                    'Gebruik herkenbare functietitels per opdracht, niet alleen "eigenaar" of "ondernemer".',
                    'Voeg sectorcontext toe bij minder bekende opdrachtgevers of NDA-projecten.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Kies een rustige template voor een opdrachtgever-proof ZZP-CV',
                        description: 'Gebruik een layout waarin profiel, recente opdrachten en kernskills direct bovenaan staan.',
                    },
                ],
            },
        },
        faq: [
            {
                question: 'Hoe verschilt een zzp CV voorbeeld van een gewoon CV voorbeeld?',
                answer: 'Een ZZP-CV laat opdrachten per opdrachtgever zien in plaats van functies per werkgever. Daardoor draait de structuur meer om projecten, duur, sectorcontext en concrete resultaten.',
            },
            {
                question: 'Moet ik mijn tarief of KvK-nummer in een zzp CV voorbeeld opnemen?',
                answer: 'Je tarief niet. Een KvK-nummer kan handig zijn voor intermediairs, maar is niet verplicht in elke versie van je CV. Focus in het document eerst op specialisme en resultaat.',
            },
            {
                question: 'Hoe ga ik om met vertrouwelijke opdrachten?',
                answer: 'Noem dan de sector, het type opdrachtgever en het resultaat, zonder de naam prijs te geven. Een duidelijke NDA-omschrijving is sterker dan een volledig onduidelijke regel.',
            },
            {
                question: 'Moet een zzp CV ook per opdracht worden aangepast?',
                answer: 'Ja. De sterkste freelancers werken met een master-CV en maken per type opdracht een compactere, gerichte versie met de meest relevante cases.',
            },
        ],
    },
};

const englishBespokeOverrides: Record<string, GuideOverride> = {
    'dutch-cv-for-expats': {
        intro: 'This page is built for expats who need Dutch-market fit quickly. The goal is not to rewrite your full history, but to make your strongest role evidence immediately relevant for Netherlands recruiters.',
        sectionOverrides: {
            wording: {
                bullets: [
                    'Led a cross-functional process update that reduced turnaround time by 24% across operations and support.',
                    'Owned enterprise client onboarding and improved first-90-day retention through clearer handover standards.',
                    'Built weekly KPI reporting used by management to reprioritize backlog and reduce escalations.',
                ],
                exampleItems: [
                    'Role fit: what function you target in the Netherlands market.',
                    'Local relevance: how your international experience maps to Dutch vacancy expectations.',
                    'Proof: measurable outcomes in your most recent roles.',
                ],
            },
        },
        faq: [
            {
                question: 'Do Dutch recruiters value international experience?',
                answer: 'Yes, if you translate it into local role context, clear responsibilities, and measurable outcomes instead of only company brand names.',
            },
            {
                question: 'Should I include visa or work permit information?',
                answer: 'If relevant, yes. Add a concise line to reduce recruiter uncertainty in the first scan.',
            },
            {
                question: 'How should I adapt my title for Netherlands jobs?',
                answer: 'Use the vacancy title where it matches your actual scope, and keep alternative titles in parentheses only when needed.',
            },
            {
                question: 'What improves callbacks fastest for expats?',
                answer: 'Short role-specific summary, localized terminology, and quantified impact bullets above the fold.',
            },
        ],
    },
    'netherlands-cv-photo-rules': {
        title: 'CV Photo Rules in the Netherlands: Should You Add a Photo?',
        description: 'Clear guidance for expats on when a CV photo helps, when to leave it out, and how Dutch recruiters usually interpret it.',
        metaTitle: 'CV Photo Rules in the Netherlands (2026) | WerkCV',
        metaDesc: 'Should you add a photo to a CV in the Netherlands? Learn when it helps, when to leave it out, and how Dutch hiring norms differ from US and UK resumes.',
        intro: 'In the Netherlands, a photo on your CV is usually optional, not mandatory. The right choice depends on the employer, the role, and whether the company follows Dutch or more international hiring norms. This guide translates those expectations into a practical decision so you can keep page one recruiter-focused instead of appearance-led.',
        sources: [
            {
                label: 'NVP Recruitment Code (Sollicitatiecode)',
                href: 'https://www.nvp-hrnetwerk.nl/nl/sollicitatiecode',
                note: 'Official NVP guidance describing the Dutch recruitment code as the standard for fair and transparent hiring. Checked April 2026.',
            },
            {
                label: 'Dutch Government: Equal treatment in hiring',
                href: 'https://www.rijksoverheid.nl/onderwerpen/gelijke-behandeling-op-het-werk/vraag-en-antwoord/mag-een-werkgever-onderscheid-maken-tussen-sollicitanten',
                note: 'Official government guidance on when employers may or may not make distinctions between applicants. Checked April 2026.',
            },
            {
                label: 'Netherlands Institute for Human Rights: Recruitment and selection',
                href: 'https://www.mensenrechten.nl/themas/digitalisering/werving-en-selectie',
                note: 'Official guidance on fair hiring and how applicants can question opaque or potentially discriminatory selection processes. Checked April 2026.',
            },
        ],
        sectionOverrides: {
            layout: {
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Build a Dutch-style CV without overthinking the photo layout',
                        description: 'Use the English template flow if you want Dutch structure with cleaner recruiter presentation.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Browse CV templates before deciding on photo placement',
                        description: 'Compare layouts that keep the focus on achievements first and visuals second.',
                    },
                ],
            },
            'special-case': {
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Create a content-first Dutch CV in English',
                        description: 'Start from a template where the top half page stays focused on role fit, not visuals.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Choose a cleaner template if your current CV feels too image-led',
                        description: 'Switch to layouts that leave more room for summary, experience, and keywords.',
                    },
                ],
            },
        },
    },
    'cv-format-netherlands-english': {
        intro: 'Use this as an execution blueprint for English CVs in the Netherlands: exact section order, concise writing style, and ATS-safe formatting that still reads naturally to humans.',
        sectionOverrides: {
            layout: {
                bullets: [
                    'Header: name, city, contact info, LinkedIn, optional work permit line.',
                    'Summary: 3-4 lines with role focus, years of experience, and strongest value.',
                    'Experience: reverse-chronological, 3-5 impact bullets per recent role.',
                ],
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Open a Dutch-style CV template in English',
                        description: 'Use the expat-facing template route if you want the right section order from the start.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Browse CV templates that fit Dutch recruiter expectations',
                        description: 'Compare layouts before you commit to the final structure and visual style.',
                    },
                ],
            },
            'ats-keywords': {
                bullets: [
                    'Use role terms from the vacancy in summary, recent role bullets, and skills.',
                    'Avoid decorative CV elements that break text extraction in ATS parsing.',
                    'Keep file naming clear: Firstname-Lastname-CV.pdf',
                ],
                intentLinks: [
                    {
                        href: '/en/templates',
                        label: 'Choose an English CV template with stronger ATS readability',
                        description: 'Start from a cleaner base before refining vacancy-specific wording.',
                    },
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Use a Dutch-market template flow for English applications',
                        description: 'Keep English copy while matching Netherlands recruiter structure and scan behavior.',
                    },
                ],
            },
        },
    },
    'translate-resume-to-dutch-format': {
        intro: 'Upload your PDF resume with the translator below and WerkCV will reshape its sections, keywords, and emphasis into the Dutch structure featured on this page.',
        sectionOverrides: {
            wording: {
                paragraphs: [
                    'US/UK resumes often over-index on long narrative and under-index on role-specific summary. Dutch screening prefers concise relevance and practical proof.',
                    'Start with the translator widget, then review the draft in the editor—it keeps your original language but reorders everything for Dutch recruiters.',
                    'When translating format, preserve your achievements but trim non-essential context. Move strongest evidence to page one.',
                ],
                bullets: [
                    'Replace long paragraph summaries with 3-4 focused lines.',
                    'Convert responsibility-heavy bullets into action + outcome statements.',
                    'Rename sections to Dutch-market familiar structure and order.',
                    'Upload your current PDF to the translator to get a Dutch-formatted draft instantly.',
                ],
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Open the translated draft in a Dutch-style CV template',
                        description: 'Use the English template flow once your sections and wording are reorganized.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Compare templates before finalizing your Dutch-format CV',
                        description: 'Pick the layout that best matches the role and the amount of experience you have.',
                    },
                ],
            },
            'special-case': {
                paragraphs: [
                    'Before final export, compare your CV against the vacancy sentence-by-sentence and close wording gaps in title, skills, and outcomes.',
                    'The best conversion keeps your original credibility while matching Dutch recruiter scan behavior.',
                ],
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Finish inside the Dutch CV template flow',
                        description: 'Move from translated structure into a polished export flow built for Netherlands applications.',
                    },
                ],
            },
        },
        checklist: [
            'Original achievements are preserved; only structure and emphasis changed.',
            'Summary is concise and role-specific for Dutch market expectations.',
            'Top bullets are rewritten for measurable outcomes.',
            'Section order follows Netherlands recruiter scanning patterns.',
            'Vacancy terminology appears naturally in key sections.',
            'Formatting remains ATS-safe and clean in PDF export.',
            'Final version is tailored to one specific role, not generic.',
        ],
    },
    'netherlands-cv-keywords-ats': {
        intro: 'This guide focuses on one thing: getting past ATS without sounding robotic. You need keyword relevance, but also clear, credible writing recruiters trust.',
        sectionOverrides: {
            wording: {
                bullets: [
                    'Mapped vacancy terms into summary and recent experience bullets without keyword stuffing.',
                    'Rewrote generic lines into outcome-driven statements using role-specific terminology.',
                    'Aligned title, skills, and achievements to ATS filter language used in the job post.',
                ],
            },
            'ats-keywords': {
                paragraphs: [
                    'ATS optimization is not about repeating the same words. It is about semantic match between vacancy requirements and your real experience.',
                    'Use exact terms for critical skills and role names, then support them with evidence in your bullets.',
                ],
                bullets: [
                    'Prioritize keywords from "must-have" requirements first, then "nice-to-have".',
                    'Repeat high-priority terms naturally across summary, skills, and top two recent roles.',
                    'Avoid tables, text-heavy graphics, and unusual symbols that can break ATS parsing.',
                ],
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Use an ATS-safer Dutch CV template in English',
                        description: 'Start from a layout that keeps keywords readable for both parsers and recruiters.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Choose a cleaner template before optimizing keywords',
                        description: 'Fix structure first, then layer vacancy language onto the strongest layout.',
                    },
                ],
            },
            'special-case': {
                bullets: [
                    'Run a final vacancy-to-CV comparison and close wording gaps before each application.',
                    'Keep one base CV, but always create a role-specific variant for high-value applications.',
                    'If interview rate is low, audit title wording and top-five keywords first.',
                ],
                intentLinks: [
                    {
                        href: '/en/templates',
                        label: 'Switch to an English CV template built for cleaner keyword placement',
                        description: 'Use a simpler structure if your current CV makes ATS optimization harder than it should be.',
                    },
                ],
            },
        },
        faq: [
            {
                question: 'How many keywords should I include?',
                answer: 'Focus on the 10-15 highest-intent terms from the vacancy and place them where they naturally fit your actual experience.',
            },
            {
                question: 'Can ATS reject a well-designed CV?',
                answer: 'Yes. If layout or wording is hard to parse, ATS match can drop even when your experience is relevant.',
            },
            {
                question: 'Should I use exact job title wording?',
                answer: 'Usually yes, as long as it truthfully reflects your role or scope. It improves matching in both ATS and recruiter scans.',
            },
            {
                question: 'What is the fastest ATS fix?',
                answer: 'Rewrite summary and top experience bullets with vacancy language and measurable outcomes.',
            },
        ],
    },
    'linkedin-to-cv-netherlands': {
        title: 'LinkedIn to CV converter: Netherlands guide',
        description: 'Need a LinkedIn to CV converter for jobs in the Netherlands? Learn how to turn a LinkedIn profile or PDF export into a concise Dutch-format CV.',
        metaTitle: 'LinkedIn to CV converter | Netherlands CV Guide | WerkCV.nl',
        metaDesc: 'Need a LinkedIn to CV converter? Learn how to turn a LinkedIn profile or LinkedIn PDF export into a Dutch-format CV for jobs in the Netherlands.',
        keywords: [
            'linkedin to cv converter',
            'linkedin to cv netherlands',
            'linkedin profile to cv',
            'linkedin pdf to cv',
            'convert linkedin to cv',
            'dutch cv template',
            'netherlands cv',
        ],
        intro: 'If you searched for a LinkedIn to CV converter, you usually need more than a raw profile export. This page shows how to convert LinkedIn profile content into a concise, ATS-friendly Dutch CV that recruiters can scan fast.',
        sectionOverrides: {
            wording: {
                paragraphs: [
                    'Most LinkedIn to CV converter tools still leave you with broad career narrative and too much text. A strong Dutch CV needs tighter selection and clearer prioritization.',
                    'Start by extracting only role-relevant achievements, then rewrite each into action + impact bullets.',
                ],
                bullets: [
                    'Convert long LinkedIn role descriptions into 3-5 concise outcome bullets.',
                    'Move endorsements and recommendations into proof points, not separate sections.',
                    'Prioritize most relevant roles for the target vacancy, even if older roles were more senior.',
                ],
                intentLinks: [
                    {
                        href: '/en/guides/translate-resume-to-dutch-format',
                        label: 'Translate your current resume into Dutch CV format',
                        description: 'Use the translator flow if you already have a resume and want a faster Dutch-market draft.',
                    },
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Move LinkedIn content into a Dutch-style CV template',
                        description: 'Open the English template route once you have trimmed your profile to role-relevant proof.',
                    },
                ],
            },
            layout: {
                bullets: [
                    'Use a compact summary instead of a long "About" paragraph.',
                    'Keep skills section focused on vacancy-relevant terms only.',
                    'Retain LinkedIn URL in contact block, but keep CV self-sufficient without external clicks.',
                ],
                intentLinks: [
                    {
                        href: '/en/templates',
                        label: 'Browse templates that suit a tighter LinkedIn-to-CV conversion',
                        description: 'Choose a layout that keeps summary, top bullets, and skills above the fold.',
                    },
                ],
            },
        },
        checklist: [
            'LinkedIn narrative is condensed into recruiter-friendly CV structure.',
            'Top achievements are rewritten into measurable bullets.',
            'CV title and summary match target vacancy.',
            'Skills list is trimmed to relevant ATS terms.',
            'Irrelevant sections from LinkedIn are removed.',
            'LinkedIn URL is included but not required to understand your fit.',
            'Final CV is tailored for one concrete role.',
        ],
        faq: [
            {
                question: 'Is this basically a LinkedIn to CV converter?',
                answer: 'Yes, but the useful version does more than dump LinkedIn text into a template. You still need shorter summary copy, sharper experience bullets, and a Dutch CV structure that recruiters can scan quickly.',
            },
            {
                question: 'Can I just export LinkedIn as PDF and apply?',
                answer: 'You can, but conversion usually improves when you rewrite for Dutch CV structure and vacancy-specific priorities.',
            },
            {
                question: 'Can a LinkedIn to CV converter use my LinkedIn PDF export?',
                answer: 'Yes. A LinkedIn PDF export can be a practical input source, but it still needs cleanup because the raw export is usually longer and less focused than a proper CV.',
            },
            {
                question: 'What should I remove from LinkedIn when converting?',
                answer: 'Remove low-relevance details, long narrative text, and non-essential sections that do not support the target role.',
            },
            {
                question: 'Should I keep all roles from LinkedIn?',
                answer: 'Not always. Keep roles that strengthen current fit and summarize older or less relevant roles compactly.',
            },
            {
                question: 'Does adding LinkedIn URL still help?',
                answer: 'Yes, as supporting context. But your CV should already prove fit without requiring profile clicks.',
            },
        ],
    },
    'one-page-cv-netherlands': {
        intro: 'One-page CVs work very well in the Netherlands when they are genuinely focused. This guide helps you decide what to keep, what to cut, and how to preserve impact.',
        sectionOverrides: {
            layout: {
                bullets: [
                    'Keep only role-relevant sections: summary, experience, education, skills, and optional certifications.',
                    'Use short bullet blocks and remove repetitive responsibilities.',
                    'Reserve top third of page one for role fit and strongest evidence.',
                ],
            },
            wording: {
                bullets: [
                    'Merge similar achievements into one stronger result statement.',
                    'Replace long context with precise scope and outcome in one line.',
                    'Prefer high-signal numbers over generic adjectives.',
                ],
            },
            'special-case': {
                paragraphs: [
                    'If cutting to one page removes essential relevance, use two pages. One-page is a strategy, not a rule.',
                    'For high-competition roles, a tight one-page CV can increase scan speed and interview conversion.',
                ],
                bullets: [
                    'Use one page for early-career or tightly focused role transitions.',
                    'Use two pages when you have multiple highly relevant, measurable achievements.',
                    'Never force one page at the cost of role-critical evidence.',
                ],
            },
        },
        faq: [
            {
                question: 'Is one page always better in the Netherlands?',
                answer: 'Not always. One page is strong when focused, but two pages are acceptable for substantial relevant experience.',
            },
            {
                question: 'What should I cut first to fit one page?',
                answer: 'Cut repetitive tasks, older low-relevance roles, and generic profile text before removing high-impact achievements.',
            },
            {
                question: 'Can I keep a projects section on one page?',
                answer: 'Yes, if projects are directly relevant and presented briefly with clear outcomes.',
            },
            {
                question: 'How do I keep ATS quality on one page?',
                answer: 'Preserve vacancy keywords in summary, skills, and top bullets while keeping formatting simple and parseable.',
            },
        ],
    },
    'netherlands-cv-without-dutch-language': {
        intro: 'You can still get interviews in the Netherlands without fluent Dutch, but your CV must reduce recruiter uncertainty fast. This page shows how to position language, role fit, and value clearly.',
        sectionOverrides: {
            'recruiter-scan': {
                paragraphs: [
                    'Recruiters mainly ask: can this candidate perform the role in our language environment? Your CV should answer that in the first screen.',
                    'Be explicit about English fluency, current Dutch level, and collaboration context in previous roles.',
                    'A clear language-positioning line often improves callbacks more than cosmetic CV changes.',
                ],
            },
            'ats-keywords': {
                bullets: [
                    'Use role terms from the vacancy plus clear language indicators (English C1/C2, Dutch A2/B1/B2).',
                    'Include collaboration and communication outcomes to prove real-world effectiveness.',
                    'Avoid vague statements like "basic Dutch"; use specific level and learning progress.',
                ],
            },
        },
        checklist: [
            'Language levels are explicit and credible.',
            'Target role fit is visible despite Dutch-language constraints.',
            'Top bullets demonstrate collaboration in multilingual contexts.',
            'Vacancy terminology is mirrored in summary and experience.',
            'CV remains concise, ATS-safe, and role-specific.',
            'Any visa/work permit context is stated clearly when relevant.',
            'Final version is tailored per vacancy, not generic.',
        ],
        faq: [
            {
                question: 'Can I get hired in the Netherlands with limited Dutch?',
                answer: 'Yes, especially in international teams. You need clear role fit, strong outcomes, and transparent language-level positioning.',
            },
            {
                question: 'Should I mention Dutch level if it is low?',
                answer: 'Yes. Honest, specific levels plus active improvement plans build more trust than vague claims.',
            },
            {
                question: 'Which roles are more open to English CVs?',
                answer: 'Many tech, data, product, and international customer-facing roles, depending on company setup and team language.',
            },
            {
                question: 'What is the biggest mistake?',
                answer: 'Hiding language context. Recruiters prefer a clear, realistic language profile with strong role evidence.',
            },
        ],
    },
    'cv-for-international-students-netherlands': {
        intro: 'International students in the Netherlands can compete well when CVs are focused on practical evidence: projects, internships, part-time work, and reliability. This guide is built for that transition.',
        sectionOverrides: {
            wording: {
                paragraphs: [
                    'Student CVs should prioritize execution proof over long academic descriptions. Recruiters want to see responsibility and learning speed.',
                    'Map university projects and internships to real business outcomes where possible.',
                ],
                bullets: [
                    'Translate coursework into practical skills only when directly relevant to the job.',
                    'Use part-time work to prove reliability, teamwork, and customer-facing discipline.',
                    'Highlight tools and methods you can demonstrate in interview tasks.',
                ],
                intentLinks: [
                    {
                        href: '/en/dutch-cv-template',
                        label: 'Build an English CV for Dutch recruiters as an international student',
                        description: 'Use the expat-facing template flow to keep projects, internships, and part-time work in the right order.',
                    },
                    {
                        href: '/en/templates',
                        label: 'Browse templates that fit early-career and student profiles',
                        description: 'Choose a layout that leaves enough room for education, projects, and practical evidence.',
                    },
                ],
            },
            'special-case': {
                bullets: [
                    'Add graduation date and availability clearly in the header section.',
                    'Keep one strong page; avoid overloading with unrelated academic detail.',
                    'Use vacancy-specific terminology in top skills and recent project bullets.',
                ],
                intentLinks: [
                    {
                        href: '/en/templates',
                        label: 'Start from an English CV template if you want a one-page student version',
                        description: 'Use a cleaner base before tailoring it to internships, part-time roles, or graduate jobs.',
                    },
                ],
            },
        },
        faq: [
            {
                question: 'What should international students prioritize on a CV?',
                answer: 'Role-relevant projects, internships, and part-time work with concrete outcomes and responsibility signals.',
            },
            {
                question: 'Do Dutch recruiters expect one page for student CVs?',
                answer: 'Usually yes. One focused page with clear fit often performs better than a longer, generic profile.',
            },
            {
                question: 'Should I include GPA?',
                answer: 'Include it only if it is strong and relevant for the role or industry; otherwise prioritize practical evidence.',
            },
            {
                question: 'How can I compensate for limited work experience?',
                answer: 'Use high-quality project bullets, internship impact, and clear skill-to-role mapping per vacancy.',
            },
        ],
    },
    'netherlands-cover-letter-basics': {
        intro: 'In the Netherlands, a cover letter should be short, specific, and aligned with your CV. This guide shows the practical baseline that increases interview probability.',
        sectionOverrides: {
            layout: {
                bullets: [
                    'Use 3-5 short paragraphs: opening fit, relevant evidence, motivation for this role, and clear close.',
                    'Keep the letter focused on this vacancy; generic motivation letters are easy to reject.',
                    'Mirror the same role language used in your CV summary and top achievements.',
                ],
            },
            wording: {
                bullets: [
                    'Lead with role fit and strongest evidence in the first paragraph.',
                    'Use one concrete example of impact instead of multiple generic claims.',
                    'Close with a confident, practical call to interview.',
                ],
            },
            'special-case': {
                paragraphs: [
                    'Your letter should add context to your CV, not repeat it line-by-line. Think of it as focused interpretation, not duplication.',
                    'When writing in English for Dutch roles, maintain concise style and avoid overly formal, long paragraphs.',
                ],
            },
        },
        checklist: [
            'Letter is tailored to one vacancy and one company.',
            'Opening paragraph states role fit directly.',
            'Body includes one or two evidence-based achievements.',
            'Tone matches Dutch preference: concise, concrete, professional.',
            'Language and keywords align with CV and job post.',
            'Length stays short and recruiter-friendly.',
            'Final close invites interview without generic filler.',
        ],
        faq: [
            {
                question: 'Is a cover letter still important in the Netherlands?',
                answer: 'Yes for many roles. A strong, tailored letter can differentiate candidates with similar CV profiles.',
            },
            {
                question: 'How long should it be?',
                answer: 'Typically 180-320 words, structured in short paragraphs with clear role relevance.',
            },
            {
                question: 'Should I repeat my CV in the letter?',
                answer: 'No. Add context and motivation around your strongest CV evidence instead of duplicating sections.',
            },
            {
                question: 'Can I use AI-generated letters?',
                answer: 'Yes, but always edit for role specificity, factual accuracy, and natural tone before sending.',
            },
        ],
    },
};

function applyGuideOverride(page: SeoGuidePage, override?: GuideOverride): SeoGuidePage {
    if (!override) return page;

    const next: SeoGuidePage = {
        ...page,
        title: override.title ?? page.title,
        description: override.description ?? page.description,
        metaTitle: override.metaTitle ?? page.metaTitle,
        metaDesc: override.metaDesc ?? page.metaDesc,
        keywords: override.keywords ?? page.keywords,
        intro: override.intro ?? page.intro,
        checklist: override.checklist ?? page.checklist,
        faq: override.faq ?? page.faq,
        relatedLinks: override.relatedLinks ?? page.relatedLinks,
        sources: override.sources ?? page.sources,
        ctaTitle: override.ctaTitle ?? page.ctaTitle,
        ctaText: override.ctaText ?? page.ctaText,
        ctaHref: override.ctaHref ?? page.ctaHref,
        sections: page.sections,
    };

    if (override.sectionOverrides) {
        next.sections = page.sections.map((section) => {
            const sectionOverride = override.sectionOverrides?.[section.id];
            return sectionOverride ? { ...section, ...sectionOverride } : section;
        });
    }

    return next;
}

function capitalizeRole(role: string): string {
    if (!role) return role;
    return `${role.charAt(0).toUpperCase()}${role.slice(1)}`;
}

function getDutchPack(seed: DutchSeed): ContentPack {
    if (seed.slug.includes('zonder-ervaring')) return starterPack;
    if (seed.slug.includes('engels-cv') || seed.slug.includes('foto-op-cv')) return localizationPack;
    if (seed.slug.includes('projectmanager') || seed.slug.includes('productmanager') || seed.slug.includes('devops') || seed.slug.includes('qa') || seed.slug.includes('ux') || seed.slug.includes('data-analist')) return digitalPack;
    if (seed.slug.includes('machine') || seed.slug.includes('productie') || seed.slug.includes('schoonmaak') || seed.slug.includes('bezorger')) return operationsPack;
    return servicePack;
}

function getDutchRelatedLinks(seed: DutchSeed): SeoGuidePage['relatedLinks'] {
    if (seed.slug.includes('zonder-ervaring')) {
        return [
            {
                href: '/cv-voorbeelden/studenten-en-starters/student-cv',
                title: 'Student CV voorbeeld',
                description: 'Bekijk hoe starters met beperkte ervaring hun CV sterk en concreet opbouwen.',
            },
            {
                href: '/cv-voorbeelden/studenten-en-starters/eerste-baan-starter',
                title: 'Eerste baan CV voorbeeld',
                description: 'Praktische opbouw voor je eerste fulltime sollicitatie met focus op potentieel.',
            },
            {
                href: '/cv-tips/cv-zonder-werkervaring',
                title: 'Tips: CV zonder werkervaring',
                description: 'Leer hoe je stage, projecten en bijbaan vertaalt naar relevante bewijsvoering.',
            },
        ];
    }

    if (seed.slug.includes('engels-cv') || seed.slug.includes('foto-op-cv')) {
        return [
            {
                href: '/cv-gids/engels-cv-in-nederland',
                title: 'Engels CV in Nederland',
                description: 'Zo positioneer je een Engelstalig CV voor Nederlandse recruiters en ATS-systemen.',
            },
            {
                href: '/cv-gids/foto-op-cv-nederland',
                title: 'Foto op CV: Nederlandse richtlijnen',
                description: 'Wanneer een foto helpt, wanneer niet, en hoe je professioneel presenteert.',
            },
            {
                href: '/cv-tips/ats-vriendelijk-cv',
                title: 'ATS-vriendelijk CV schrijven',
                description: 'Gebruik vacaturekeywords slim zonder onnatuurlijke keyword-stapeling.',
            },
        ];
    }

    if (
        seed.slug.includes('projectmanager') ||
        seed.slug.includes('productmanager') ||
        seed.slug.includes('devops') ||
        seed.slug.includes('qa') ||
        seed.slug.includes('ux') ||
        seed.slug.includes('data-analist')
    ) {
        return [
            {
                href: '/cv-voorbeelden/technologie-en-ict/software-ontwikkelaar',
                title: 'ICT CV voorbeeld',
                description: 'Zie hoe technische ervaring en projectimpact compact en overtuigend worden gepresenteerd.',
            },
            {
                href: '/cv-voorbeelden/technologie-en-ict/data-engineer',
                title: 'Data / Tech CV voorbeeld',
                description: 'Voorbeeldstructuur voor rollen met analytische en technische bewijsvoering.',
            },
            {
                href: '/cv-tips/ats-vriendelijk-cv',
                title: 'ATS-optimalisatie tips',
                description: 'Verhoog je match met vacaturetermen en recruiter-scan in de eerste selectie.',
            },
        ];
    }

    if (
        seed.slug.includes('machine') ||
        seed.slug.includes('productie') ||
        seed.slug.includes('schoonmaak') ||
        seed.slug.includes('bezorger')
    ) {
        return [
            {
                href: '/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker',
                title: 'Logistiek CV voorbeeld',
                description: 'Leer hoe je tempo, veiligheid en betrouwbaarheid zichtbaar maakt op je CV.',
            },
            {
                href: '/cv-voorbeelden/vakmanschap-en-logistiek/chauffeur',
                title: 'Chauffeur / bezorger CV voorbeeld',
                description: 'Gebruik concrete route-, service- en punctualiteitsvoorbeelden voor meer overtuiging.',
            },
            {
                href: '/cv-tips/cv-vaardigheden-kiezen',
                title: 'Welke vaardigheden op je CV?',
                description: 'Kies de vaardigheden die recruiters in operationele functies echt beoordelen.',
            },
        ];
    }

    return [
        {
            href: '/cv-voorbeelden/zakelijk-en-financieel/hr-medewerker',
            title: 'Zakelijk CV voorbeeld',
            description: 'Voorbeeld van heldere structuur, resultaatgerichte bullets en professionele opmaak.',
        },
        {
            href: '/cv-voorbeelden/horeca-en-detailhandel/winkelmedewerker',
            title: 'Servicegerichte CV voorbeelden',
            description: 'Bekijk praktijkvoorbeelden voor klantcontact, service en operationele betrouwbaarheid.',
        },
        {
            href: '/cv-tips/cv-werkervaring-beschrijven',
            title: 'Werkervaring sterker formuleren',
            description: 'Maak van taakomschrijvingen sterke bullets met zichtbaar resultaat en impact.',
        },
    ];
}

function getEnglishRelatedLinks(seed: EnglishSeed): SeoGuidePage['relatedLinks'] {
    const defaultLinks: SeoGuidePage['relatedLinks'] = [
        {
            href: '/en/guides/dutch-cv-for-expats',
            title: 'Dutch CV for expats',
            description: 'Core structure and positioning principles for international candidates.',
        },
        {
            href: '/en/guides/cv-format-netherlands-english',
            title: 'CV format Netherlands (English)',
            description: 'Use the Dutch recruiter-friendly section order and writing style in English.',
        },
        {
            href: '/en/guides/netherlands-cv-keywords-ats',
            title: 'ATS keyword guide',
            description: 'Align vacancy language with your CV without sounding robotic.',
        },
    ];

    const contextualLinks: Record<string, SeoGuidePage['relatedLinks']> = {
        'dutch-cv-for-expats': [
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Lock in the section order and writing style Dutch recruiters expect.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Add vacancy terms without making the CV feel stuffed or generic.',
            },
            {
                href: '/en/guides/netherlands-cover-letter-basics',
                title: 'Netherlands cover letter basics',
                description: 'Keep your letter short, specific, and aligned with your CV evidence.',
            },
        ],
        'netherlands-cv-photo-rules': [
            {
                href: '/en/guides/dutch-cv-for-expats',
                title: 'Dutch CV for expats',
                description: 'Use a content-first Dutch structure before worrying about optional photo choices.',
            },
            {
                href: '/en/guides/one-page-cv-netherlands',
                title: 'One-page CV in the Netherlands',
                description: 'Keep the top half of page one focused on role fit and measurable proof.',
            },
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Match photo decisions to the broader layout recruiters scan first.',
            },
        ],
        'cv-format-netherlands-english': [
            {
                href: '/en/guides/dutch-cv-for-expats',
                title: 'Dutch CV for expats',
                description: 'Start with the broader expat positioning logic behind the structure.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Once format is right, layer in vacancy language and ATS-safe wording.',
            },
            {
                href: '/en/guides/one-page-cv-netherlands',
                title: 'One-page CV in the Netherlands',
                description: 'Decide how much experience to keep once your structure is fixed.',
            },
        ],
        'netherlands-cv-without-dutch-language': [
            {
                href: '/en/guides/dutch-cv-for-expats',
                title: 'Dutch CV for expats',
                description: 'Use the broader expat playbook for positioning, structure, and local role fit.',
            },
            {
                href: '/en/guides/translate-resume-to-dutch-format',
                title: 'Translate resume to Dutch format',
                description: 'Reshape an existing English resume into Dutch recruiter logic before tailoring language lines.',
            },
            {
                href: '/en/english-speaking-companies-netherlands',
                title: 'English-speaking companies in the Netherlands',
                description: 'Find employer contexts where English-first applications are more realistic.',
            },
        ],
        'translate-resume-to-dutch-format': [
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Check your translated draft against the Dutch recruiter-preferred section order.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Tighten vacancy language after the core structure has been converted.',
            },
            {
                href: '/en/guides/linkedin-to-cv-netherlands',
                title: 'LinkedIn to CV Netherlands',
                description: 'Use this if your source material is a LinkedIn profile rather than a classic resume.',
            },
        ],
        'netherlands-cover-letter-basics': [
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Keep CV structure and letter tone aligned for better interview conversion.',
            },
            {
                href: '/en/guides/dutch-cv-for-expats',
                title: 'Dutch CV for expats',
                description: 'Match your letter to the wider Dutch-market positioning of your CV.',
            },
            {
                href: '/en/guides/one-page-cv-netherlands',
                title: 'One-page CV in the Netherlands',
                description: 'Use a tighter CV if you want your letter and resume package to scan faster together.',
            },
        ],
        'cv-for-international-students-netherlands': [
            {
                href: '/en/guides/dutch-cv-for-expats',
                title: 'Dutch CV for expats',
                description: 'Use the broader Dutch-market logic behind English CVs for internationals.',
            },
            {
                href: '/en/guides/one-page-cv-netherlands',
                title: 'One-page CV in the Netherlands',
                description: 'Keep student, internship, and part-time evidence tight and recruiter-friendly.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Translate coursework, tools, and project work into the vacancy language.',
            },
        ],
        'netherlands-cv-keywords-ats': [
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Fix the structure first so ATS and recruiters can actually parse your keywords.',
            },
            {
                href: '/en/guides/translate-resume-to-dutch-format',
                title: 'Translate resume to Dutch format',
                description: 'Reshape an old resume before you optimize wording for vacancy match.',
            },
            {
                href: '/en/guides/one-page-cv-netherlands',
                title: 'One-page CV in the Netherlands',
                description: 'Keep the final document tight once your highest-value keywords are in place.',
            },
        ],
        'linkedin-to-cv-netherlands': [
            {
                href: '/en/guides/translate-resume-to-dutch-format',
                title: 'Translate resume to Dutch format',
                description: 'Use this route if you also need to convert old resume structure into Dutch format.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Turn LinkedIn language into vacancy-specific CV keywords that still feel credible.',
            },
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Move your best LinkedIn proof into the order Dutch recruiters scan fastest.',
            },
        ],
        'one-page-cv-netherlands': [
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'CV format Netherlands (English)',
                description: 'Start from the right section order before cutting content down to one page.',
            },
            {
                href: '/en/guides/netherlands-cv-keywords-ats',
                title: 'ATS keyword guide',
                description: 'Preserve your highest-value vacancy terms while shrinking the CV.',
            },
            {
                href: '/en/guides/cv-for-international-students-netherlands',
                title: 'CV for international students',
                description: 'Useful if you need a tighter one-page version for student or early-career applications.',
            },
        ],
    };

    const selected = contextualLinks[seed.slug] ?? defaultLinks;
    return selected.filter((link) => !link.href.endsWith(`/${seed.slug}`)).slice(0, 3);
}

function toDutchGuide(seed: DutchSeed): SeoGuidePage {
    const pack = getDutchPack(seed);
    const roleTitle = capitalizeRole(seed.role);

    const page: SeoGuidePage = {
        slug: seed.slug,
        locale: 'nl',
        title: `${roleTitle} CV: compleet voorbeeld en sollicitatiecheck`,
        description: `Praktische gids voor ${seed.keyword}. Met recruiterinzichten, voorbeeldzinnen, ATS-keywords en een eindcheck voor hogere kans op gesprek.`,
        metaTitle: `${seed.keyword} | Compleet CV Gids | WerkCV.nl`,
        metaDesc: `Uitgebreide gids voor ${seed.keyword}: sterke profieltekst, resultaatgerichte werkervaring, ATS-keywords en veelgemaakte fouten in Nederland.`,
        keywords: [seed.keyword, `${seed.role} cv`, 'cv voorbeeld', 'cv maken', 'ats cv'],
        intro: `Zoek je op "${seed.keyword}"? Dan heb je geen standaardtekst nodig, maar een CV dat direct laat zien waarom jij geschikt bent. Deze gids geeft je een expert-opbouw met concrete formuleringen.`,
        sections: [
            {
                id: 'recruiter-scan',
                title: `Hoe recruiters jouw ${seed.role} CV beoordelen`,
                paragraphs: [
                    `Recruiters kijken in de eerste scan vooral naar ${pack.recruiterSignals.join(', ')}. Dat bepaalt of ze verder lezen of doorgaan naar de volgende kandidaat.`,
                    `De grootste fout is vaak ${seed.painPoint}. Maak daarom elk onderdeel direct functiegericht en bewijsbaar.`,
                    'Denk als een recruiter: elke regel moet iets toevoegen aan functie-fit, betrouwbaarheid of meetbare impact.',
                ],
            },
            {
                id: 'profieltekst',
                title: 'Profieltekst die direct vertrouwen geeft',
                paragraphs: [
                    'Je profieltekst is geen mini-sollicitatiebrief. Houd het kort: rol, ervaring, 2-3 kernskills en het type resultaat dat je levert.',
                    'Gebruik concrete taal en vermijd containerwoorden zonder context.',
                ],
                bullets: [
                    `Verwerk relevante kernvaardigheden: ${pack.topSkills.join(', ')}.`,
                    'Schrijf in actieve taal en benoem direct je toegevoegde waarde.',
                    'Sluit af met wat je zoekt en wat je levert in die rol.',
                ],
                exampleTitle: 'Voorbeeld profielregels',
                exampleItems: pack.profileExamples,
            },
            {
                id: 'werkervaring',
                title: 'Werkervaring schrijven met impact',
                paragraphs: [
                    'Gebruik per functie 3-5 bullets met actie en resultaat. Taken alleen zijn onvoldoende in een competitieve markt.',
                    'Noem waar mogelijk cijfers, volumes of kwaliteitsverbeteringen. Als cijfers ontbreken: benoem aantoonbare verandering.',
                ],
                bullets: [
                    'Structuur: context -> actie -> resultaat.',
                    'Plaats je sterkste voorbeelden in de meest recente functies.',
                    'Maak je bullets specifiek voor de vacature waarop je solliciteert.',
                ],
                exampleTitle: `Voorbeeld bullets voor ${seed.role}`,
                exampleItems: pack.bulletExamples,
            },
            {
                id: 'ats',
                title: 'ATS-keywords en vaardigheden slim inzetten',
                paragraphs: [
                    'Veel werkgevers filteren CV s automatisch op termen uit de vacature. Dat vraagt om duidelijke, natuurlijke keyword-verwerking.',
                    'Zet keywords niet alleen in je vaardighedenlijst, maar ook in profieltekst en werkervaring met inhoudelijke context.',
                ],
                bullets: [
                    `Belangrijke termen voor dit type functie: ${pack.atsKeywords.join(', ')}.`,
                    'Gebruik dezelfde terminologie als de vacature, zolang die klopt met je ervaring.',
                    'Vermijd keyword-stapeling: leesbaarheid blijft altijd belangrijker.',
                ],
            },
            {
                id: 'final-check',
                title: 'Final check voor verzenden',
                paragraphs: [
                    'Controleer je CV op scanbaarheid: ziet een recruiter in 10 seconden je rol, niveau en sterkste resultaten?',
                    'Doe daarna een vacature-check: sluit taal, prioriteit en terminologie aan op de functie waarop je reageert.',
                ],
                bullets: [
                    'Lengte: 1 pagina voor starters, max 2 pagina s voor ervaren kandidaten.',
                    'Spelling, datumnotatie en contactgegevens volledig consistent.',
                    'Bestandsnaam professioneel: CV-Voornaam-Achternaam.pdf',
                ],
            },
        ],
        checklist: [
            'Functietitel en profieltekst sluiten direct aan op de vacature.',
            'Werkervaring bevat resultaatgerichte bullets in plaats van alleen taken.',
            'ATS-keywords zijn logisch verwerkt in meerdere secties.',
            'Vaardigheden zijn relevant en onderbouwbaar in gesprek.',
            'CV-opmaak is rustig, scanbaar en ATS-vriendelijk.',
            'Contactgegevens en LinkedIn zijn actueel en foutloos.',
            'PDF-export en bestandsnaam zijn professioneel.',
        ],
        faq: [
            {
                question: `Hoe lang moet een ${seed.role} CV zijn?`,
                answer: 'Meestal 1 pagina voor starters en maximaal 2 pagina s voor ervaren kandidaten, zolang alles relevant blijft voor de functie.',
            },
            {
                question: 'Moet ik een foto toevoegen op mijn CV in Nederland?',
                answer: 'Niet verplicht. Voeg alleen een professionele foto toe als die past bij de functie en je presentatie versterkt.',
            },
            {
                question: 'Hoe maak ik mijn CV ATS-vriendelijk?',
                answer: 'Gebruik vacaturetermen in profiel, werkervaring en vaardigheden. Houd opmaak simpel en voorkom tekst in complexe grafische elementen.',
            },
            {
                question: 'Hoeveel bullets per functie zijn ideaal?',
                answer: 'Richt op 3-5 bullets per recente functie en benadruk impact, niet alleen verantwoordelijkheden.',
            },
        ],
        relatedLinks: getDutchRelatedLinks(seed),
        ctaTitle: 'Maak jouw vacaturegerichte CV nu',
        ctaText: 'Gebruik deze structuur direct in de editor en exporteer een strak, ATS-vriendelijk CV in PDF.',
        ctaHref: '/templates',
    };

    return applyGuideOverride(page, dutchBespokeOverrides[seed.slug]);
}

function toEnglishGuide(seed: EnglishSeed): SeoGuidePage {
    const isPhotoPage = seed.slug.includes('photo');
    const isAtsPage = seed.slug.includes('ats');
    const isStudentPage = seed.slug.includes('students');
    const isLanguagePage = seed.slug.includes('without-dutch-language') || seed.slug.includes('translate-resume');

    const keywordExamples = isAtsPage
        ? ['stakeholder management', 'process improvement', 'customer retention', 'delivery ownership', 'quality assurance']
        : ['role fit', 'measurable outcomes', 'ATS-friendly format', 'clear summary', 'vacancy alignment'];

    const page: SeoGuidePage = {
        slug: seed.slug,
        locale: 'en',
        title: `${seed.keyword}: complete Netherlands guide`,
        description: `Expert guidance on ${seed.focus} for ${seed.audience}. Includes structure, wording examples, ATS guidance, and a final submission checklist.`,
        metaTitle: `${seed.keyword} | Netherlands CV Guide | WerkCV.nl`,
        metaDesc: `Detailed guide on ${seed.focus} for the Dutch market. Learn recruiter expectations, ATS keyword strategy, and practical CV examples.`,
        keywords: [seed.keyword, 'netherlands cv', 'dutch cv template', 'expat cv', 'ats friendly cv'],
        intro: `If you searched "${seed.keyword}", you probably need practical execution, not generic advice. This guide shows how to structure and write a CV that fits Dutch recruiter expectations.`,
        sections: [
            {
                id: 'recruiter-scan',
                title: 'How recruiters in the Netherlands scan your CV',
                paragraphs: [
                    `For ${seed.audience}, recruiters prioritize clarity, relevance, and evidence. They want to see role fit quickly, not long personal storytelling.`,
                    'Your first half page should already show target role, strongest achievements, and relevant skills.',
                    'If your CV is too generic, callback rates usually drop even when your experience is solid.',
                ],
            },
            {
                id: 'layout',
                title: 'Recommended CV layout and section order',
                paragraphs: [
                    'Use this order: contact details, summary, work experience, education, skills, and optional certifications/languages.',
                    'One page is ideal for early-career candidates; two pages are acceptable for strong, role-relevant experience.',
                ],
                bullets: [
                    'Keep section headings clear and dates consistent.',
                    'Place highest-impact bullets in your most recent role.',
                    'Use clean typography and spacing for ATS and recruiter readability.',
                ],
            },
            {
                id: 'wording',
                title: 'Write stronger summary and achievement bullets',
                paragraphs: [
                    'Avoid generic claims like "hard-working team player." Replace them with action and outcome statements.',
                    isStudentPage
                        ? 'If you are a student or starter, use projects, internships, and part-time work as evidence of responsibility and execution.'
                        : 'For experienced candidates, focus on business outcomes, process improvements, and ownership scope.',
                ],
                exampleTitle: 'Example bullet structure',
                exampleItems: [
                    'Action: what you changed or built.',
                    'Scope: team, process, customers, or budget affected.',
                    'Outcome: measurable result or visible quality improvement.',
                ],
                bullets: [
                    'Reduced turnaround time by redesigning workflow and removing handoff delays.',
                    'Improved quality by introducing clear review checkpoints and escalation rules.',
                    'Increased delivery predictability through weekly planning and milestone tracking.',
                ],
            },
            {
                id: 'ats-keywords',
                title: 'Keyword and ATS strategy',
                paragraphs: [
                    'Mirror the vacancy language in your summary, experience, and skills. This improves ATS pass-through and human scan relevance.',
                    isLanguagePage
                        ? 'For English applications in the Netherlands, keep language clear and simple while still matching local role terminology.'
                        : 'Do not keyword-stuff. Use each keyword where it naturally describes your actual experience.',
                ],
                bullets: [
                    `Useful keyword examples: ${keywordExamples.join(', ')}.`,
                    'Use exact job-title wording when it matches your role.',
                    'Export as PDF and avoid complex design elements in core text sections.',
                ],
            },
            {
                id: 'special-case',
                title: isPhotoPage ? 'Photo decision in Dutch applications' : 'Final pre-apply quality check',
                paragraphs: isPhotoPage
                    ? [
                        'A photo is usually optional in the Netherlands. If you include one, keep it professional, neutral, and consistent with the role context.',
                        'A strong content-first CV outperforms a visual-first CV in most ATS-driven hiring flows.',
                    ]
                    : [
                        'Before submitting, verify that your CV is tailored to this specific vacancy, not a generic copy.',
                        'Small edits in title wording, top bullets, and keywords can materially improve interview conversion.',
                    ],
                bullets: isPhotoPage
                    ? [
                        'Use a clean headshot only, no filters or casual backgrounds.',
                        'Do not let image placement push core achievements below the fold.',
                        'Keep design consistent whether you use a photo or not.',
                    ]
                    : [
                        'Role fit is obvious in first two lines.',
                        'Each recent role includes outcome-focused bullets.',
                        'Language, terminology, and file naming are fully professional.',
                    ],
            },
        ],
        checklist: [
            'Summary is concise and role-specific.',
            'Experience bullets show actions and outcomes.',
            'Section order follows Dutch recruiter expectations.',
            'Keywords match the vacancy language.',
            'Formatting is ATS-safe and easy to scan.',
            'PDF export is clean and readable.',
            'CV is adapted for this exact application.',
        ],
        faq: [
            {
                question: 'Can I apply in English in the Netherlands?',
                answer: 'Yes, especially in international companies and many tech roles. Confirm language expectations in the vacancy.',
            },
            {
                question: 'Should I keep my CV to one page?',
                answer: 'One page is preferred for starters. Two pages are acceptable for experienced profiles with relevant impact.',
            },
            {
                question: 'Does ATS matter in Dutch hiring?',
                answer: 'Yes. Many employers use ATS filtering, so keyword alignment and clean structure are important.',
            },
            {
                question: 'Should I include a photo?',
                answer: 'Usually optional. Include one only when it is professional and role-appropriate.',
            },
        ],
        relatedLinks: getEnglishRelatedLinks(seed),
        ctaTitle: 'Build your Dutch-style CV now',
        ctaText: 'Apply this framework inside the English template flow and export a clean, ATS-friendly A4 PDF for jobs in the Netherlands.',
        ctaHref: '/en/templates',
    };

    return applyGuideOverride(page, englishBespokeOverrides[seed.slug]);
}

const dutchEditorialPages: SeoGuidePage[] = [
    {
        slug: 'werkcv-vs-cvmaker',
        locale: 'nl',
        title: 'WerkCV vs CVMaker: welke CV builder past beter bij jou?',
        description: 'Eerlijke vergelijking tussen WerkCV en CVMaker voor Nederlandse werkzoekenden. Vergelijk prijsmodel, abonnement, templates, motivatiebrief-flow en beste use case.',
        metaTitle: 'WerkCV vs CVMaker (2026) | Welke CV builder past beter? | WerkCV.nl',
        metaDesc: 'WerkCV of CVMaker? Vergelijk eenmalige prijs vs abonnement, templates, motivatiebrief-tools, ATS-focus en downloadregels voor Nederlandse sollicitanten.',
        keywords: [
            'werkcv vs cvmaker',
            'cvmaker alternatief',
            'cvmaker abonnement',
            'cv builder zonder abonnement',
            'werkcv of cvmaker',
        ],
        intro: 'Wil je vooral één sterk CV maken zonder vast te zitten aan maandkosten, dan past WerkCV meestal beter. Wil je een breder carrièreplatform met motivatiebriefsjablonen, vacaturetools en een doorlopend accountmodel, dan past CVMaker beter.',
        sections: [
            {
                id: 'vergelijking',
                title: 'WerkCV vs CVMaker in één oogopslag',
                paragraphs: [
                    'Het grootste verschil zit niet in het idee van een online CV builder, maar in het verdienmodel en in de breedte van het product. WerkCV is gebouwd voor een snelle, transparante Nederlandse CV-flow zonder abonnement. CVMaker positioneert zich als een uitgebreider carrièreplatform met meer sjablonen, motivatiebrieven en aanvullende jobtools.',
                    'Daardoor is de keuze meestal eenvoudig: betaal je liever eenmalig voor een concreet CV-document, of werk je liever in een abonnement zolang je actief solliciteert?',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'CVMaker'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per CV als je downloadt.',
                            secondary: 'Gratis basisaccount; Pro kost EUR1,99 voor 14 dagen en daarna EUR21,99 per maand met automatische verlenging.',
                        },
                        {
                            label: 'Waar je voor betaalt',
                            primary: 'Een concrete CV-download zonder maandabonnement.',
                            secondary: 'Volledige toegang tot een breder carrièreplatform zolang Pro actief is.',
                        },
                        {
                            label: 'Templates en brieven',
                            primary: '13+ CV-templates met editor-focus op snel kiezen en afronden.',
                            secondary: '20+ CV-sjablonen en 20+ bijpassende sollicitatiebriefsjablonen.',
                        },
                        {
                            label: 'Na betaling of upgrade',
                            primary: 'Hetzelfde betaalde CV later opnieuw openen, aanpassen en opnieuw downloaden zonder opnieuw te betalen.',
                            secondary: 'Downloads en extra functies vallen binnen het Pro-account zolang je toegang loopt.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Werkzoekenden die snel, duidelijk en zonder abonnementsfrictie willen afronden.',
                            secondary: 'Mensen die een breder platform willen voor CV, motivatiebrief, vacaturezoektocht en doorlopende begeleiding.',
                        },
                        {
                            label: 'Bedrijfspositionering',
                            primary: 'Nederlandse, no-subscription CV-flow.',
                            secondary: 'Internationaal carrièreplatform met 11 mln.+ gebruikers wereldwijd en 25 ondersteunde talen.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk exact hoe WerkCV-pricing werkt',
                        description: 'Controleer het eenmalige model, wat je krijgt en wanneer je opnieuw betaalt.',
                    },
                    {
                        href: '/templates',
                        label: 'Vergelijk eerst rustig de WerkCV templates',
                        description: 'Open de templates zonder direct te hoeven afrekenen.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je vooral snelheid en prijsrust zoekt',
                paragraphs: [
                    'WerkCV wint vooral wanneer je geen behoefte hebt aan een maandabonnement, maar gewoon een recruiter-veilige CV-versie wilt maken en afronden. Dat is extra relevant als je maar één of enkele sollicitatieversies nodig hebt, of als je slechte ervaringen hebt met proefperiodes en automatische verlengingen.',
                    'Voor veel Nederlandse sollicitanten is juist die rust belangrijk. Je kunt gratis starten, inhoud opbouwen, templates vergelijken en pas betalen wanneer je echt wilt downloaden. Daarna blijft datzelfde CV beschikbaar om later weer te openen, van template of kleur te wisselen en opnieuw te exporteren.',
                ],
                bullets: [
                    'Je wilt niet onthouden of een proefperiode straks doorloopt in een maandprijs.',
                    'Je wilt één duidelijke betaling per CV in plaats van een abonnement zolang je account actief is.',
                    'Je wilt later nog kunnen bijwerken en opnieuw downloaden zonder opnieuw voor datzelfde CV te betalen.',
                ],
                intentLinks: [
                    {
                        href: '/faq',
                        label: 'Lees hoe opnieuw bewerken en downloaden bij WerkCV werkt',
                        description: 'Handig als je zeker wilt weten wat er na betaling wel en niet kan.',
                    },
                    {
                        href: '/ats-cv-template',
                        label: 'Bekijk de ATS-vriendelijke template route',
                        description: 'Start met de meest veilige layout als scanbaarheid voorop staat.',
                    },
                ],
            },
            {
                id: 'kies-cvmaker',
                title: 'Kies CVMaker als je een breder carrièreplatform wilt',
                paragraphs: [
                    'CVMaker is een logischere keuze als je niet alleen een CV nodig hebt, maar ook motivatiebriefsjablonen, vacaturetools en een bredere account-gestuurde sollicitatieomgeving. Op de officiële prijzenpagina positioneert het product zich nadrukkelijk als een volledig carrièreplatform en niet alleen als CV-downloadtool.',
                    'Dat betekent niet dat CVMaker slechter is. Het betekent vooral dat de productvorm anders is. Als jij de extra breedte ook echt gebruikt, kan een abonnementsmodel rationeel zijn. Als je die extra laag niet nodig hebt, betaal je al snel voor meer product dan je gebruikt.',
                ],
                bullets: [
                    'Je wilt CV en motivatiebrief in één groter platform combineren.',
                    'Je verwacht meerdere weken of maanden actief in een sollicitatieflow te zitten.',
                    'Je vindt extra carrièrefuncties belangrijker dan een simpel, eenmalig prijsmodel.',
                ],
                intentLinks: [
                    {
                        href: '/sollicitatiebrief-voorbeeld',
                        label: 'Gebruik WerkCV als je vooral CV plus briefvoorbeelden nodig hebt',
                        description: 'Voor wie vooral inhoudelijke ondersteuning zoekt zonder direct in een platformabonnement te stappen.',
                    },
                    {
                        href: '/cv-maken',
                        label: 'Bekijk eerst de simpele WerkCV-flow van start tot PDF',
                        description: 'Handig als je twijfelt of je echt een breder platform nodig hebt.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'Een goede vergelijking hoort ook te zeggen wanneer je níet voor WerkCV moet kiezen. Als jij vooral zoekt naar een alles-in-één carrièreomgeving met meer sjablonen, ingebouwde motivatiebrief-focus en een doorlopende accountworkflow, dan is WerkCV bewust smaller.',
                    'WerkCV is dus niet de beste keuze als je behoefte hebt aan zoveel mogelijk extra modules. Het is de betere keuze als je waarde hecht aan een rustige CV-builder, duidelijke pricing en een snelle route van inhoud naar PDF.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je vooral een breed carrièreplatform zoekt in plaats van een directe CV-oplossing.',
                    'Niet kiezen voor WerkCV als je vooral waarde ziet in doorlopende platformtoegang met extra tools naast je CV.',
                    'Wel kiezen voor WerkCV als je het grootste probleem juist ziet in abonnementen, onduidelijke billing of onnodige productbreedte.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste Nederlandse sollicitanten',
                paragraphs: [
                    'Voor de meeste mensen die simpelweg een goed CV nodig hebben voor Nederlandse vacatures, is WerkCV de logischere start. Niet omdat elk ander product slecht is, maar omdat de meeste sollicitanten minder behoefte hebben aan een carrièreplatform dan aan een snelle, eerlijke en recruiter-veilige CV-route.',
                    'De praktische aanpak is daarom: begin gratis, vergelijk je template met echte inhoud, beslis pas daarna of je wilt downloaden, en houd de betaling beperkt tot het document dat je echt nodig hebt.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je zonder abonnement een sterk CV wilt maken en afronden.',
                    'Kies CVMaker als je bewust een breder platform zoekt voor CV, brief en extra sollicitatietools.',
                    'Twijfel je nog? Open eerst de WerkCV templates en kijk of die rustiger en voldoende zijn voor jouw functie.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om te zien of de flow en layout bij je passen.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer nog één keer het eenmalige model',
                        description: 'Handig als prijsstructuur het doorslaggevende verschil voor je is.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet of je liever een eenmalige betaling of een abonnement wilt.',
            'Je weet of je alleen een CV nodig hebt of een breder carrièreplatform.',
            'Je hebt gecontroleerd hoe opnieuw downloaden of platformtoegang werkt na betaling.',
            'Je hebt bepaald of 13+ templates voor jou genoeg zijn, of dat je expliciet meer productbreedte zoekt.',
            'Je kiest op basis van jouw sollicitatiegedrag, niet alleen op basis van marketingclaims.',
        ],
        faq: [
            {
                question: 'Is WerkCV goedkoper dan CVMaker?',
                answer: 'Voor iemand die vooral een CV wil afronden wel meestal. WerkCV werkt met een eenmalige betaling per CV, terwijl CVMaker Pro volgens de officiële prijzenpagina werkt met EUR1,99 voor 14 dagen en daarna EUR21,99 per maand zolang het abonnement doorloopt.',
            },
            {
                question: 'Is CVMaker een abonnement?',
                answer: 'Ja, het Pro-plan wordt volgens de officiële prijzenpagina na 14 dagen automatisch maandelijks verlengd, tenzij je opzegt.',
            },
            {
                question: 'Kan ik bij WerkCV later opnieuw downloaden zonder opnieuw te betalen?',
                answer: 'Ja, voor hetzelfde CV-document wel. Na betaling kun je datzelfde CV later opnieuw openen, aanpassen en opnieuw downloaden zonder opnieuw te betalen.',
            },
            {
                question: 'Wanneer is CVMaker een betere keuze dan WerkCV?',
                answer: 'Als je bewust een breder carrièreplatform zoekt met meer sjablonen, motivatiebriefsjablonen en extra sollicitatietools, en je een abonnement daarbij acceptabel vindt.',
            },
        ],
        relatedLinks: [
            {
                href: '/prijzen',
                title: 'WerkCV prijzen',
                description: 'Bekijk exact hoe het eenmalige WerkCV-model werkt en wat je na betaling nog kunt doen.',
            },
            {
                href: '/templates',
                title: 'WerkCV templates vergelijken',
                description: 'Open de templates eerst gratis en kijk of de flow past bij jouw sollicitaties.',
            },
            {
                href: '/faq',
                title: 'Veelgestelde vragen over downloaden en bewerken',
                description: 'Handig als je twijfelt over account, betaling of opnieuw downloaden.',
            },
        ],
        sources: [
            {
                label: 'CVMaker prijzen',
                href: 'https://www.cvmaker.nl/prijzen',
                note: 'Officiële prijzenpagina met EUR1,99 voor 14 dagen, daarna EUR21,99 per maand, plus 20+ CV- en 20+ motivatiebriefsjablonen. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVMaker over ons',
                href: 'https://www.cvmaker.nl/over-ons',
                note: 'Officiële bedrijfsinformatie met 11 mln.+ gebruikers wereldwijd, 22 mln.+ gemaakte documenten en 25 ondersteunde talen. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige prijs per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'WerkCV FAQ',
                href: 'https://werkcv.nl/faq',
                note: 'Openbare FAQ met uitleg over account, betaling, opnieuw downloaden en verschillen met abonnementssites.',
            },
        ],
        ctaTitle: 'Vergelijk niet langer op marketing, maar op het model dat bij je past',
        ctaText: 'Als je vooral snel een recruiter-veilige CV-versie wilt maken zonder abonnement, open dan eerst de templates en bouw je versie gratis op.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-cv-nl',
        locale: 'nl',
        title: 'WerkCV vs CV.nl: welke CV builder is slimmer voor jouw situatie?',
        description: 'Eerlijke vergelijking tussen WerkCV en CV.nl voor Nederlandse werkzoekenden. Vergelijk abonnement, productbreedte, app, jobs, sollicitatietracker en eenmalig CV-model.',
        metaTitle: 'WerkCV vs CV.nl (2026) | Welke CV builder past beter? | WerkCV.nl',
        metaDesc: 'WerkCV of CV.nl? Vergelijk eenmalige prijs vs abonnement, CV-only flow vs breder platform met jobs en tracker, en kies de beste CV builder voor jouw situatie.',
        keywords: [
            'werkcv vs cv.nl',
            'cv.nl alternatief',
            'cv nl abonnement',
            'beste cv builder zonder abonnement',
            'werkcv of cv nl',
        ],
        intro: 'Wil je vooral snel een sterk CV maken zonder abonnement, dan past WerkCV meestal beter. Wil je een groter Nederlands sollicitatieplatform met vacatures, sollicitatietracker, app en doorlopende toegang, dan past CV.nl meestal beter.',
        sections: [
            {
                id: 'vergelijking',
                title: 'WerkCV vs CV.nl in één oogopslag',
                paragraphs: [
                    'WerkCV en CV.nl lossen niet precies hetzelfde probleem op. WerkCV is bewust smal gehouden: snel van inhoud naar een sterk CV, met een transparant eenmalig prijsmodel per document. CV.nl positioneert zich juist als een bredere sollicitatieomgeving met CV, sollicitatiebrief, vacaturedatabase, sollicitatietracker en mobiele app.',
                    'Daardoor zit het echte verschil niet alleen in templates of looks, maar in de vraag hoeveel platform je nodig hebt. Veel werkzoekenden hebben vooral een goed CV nodig. Anderen willen een langer lopend account waarin meer van hun sollicitatieproces samenkomt.',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'CV.nl'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per CV als je wilt downloaden.',
                            secondary: 'Abonnementsmodel: volgens de officiële pricingpagina EUR0,99 voor 14 dagen, daarna EUR19,99 per maand met automatische verlenging.',
                        },
                        {
                            label: 'Productscope',
                            primary: 'Gericht op snel CV bouwen, vergelijken, afronden en opnieuw downloaden van hetzelfde document.',
                            secondary: 'Breder platform met CV, sollicitatiebrieven, vacatures bekijken en sollicitaties bijhouden.',
                        },
                        {
                            label: 'Na betaling of activatie',
                            primary: 'Hetzelfde betaalde CV later opnieuw openen, wijzigen, van template wisselen en opnieuw downloaden.',
                            secondary: 'Doorlopende toegang zolang je abonnement actief is; de officiële site benadrukt onbeperkt nieuwe CVs en extra tools.',
                        },
                        {
                            label: 'Lokale marktpositie',
                            primary: 'Nederlandse no-subscription route met nadruk op eenvoud en prijsrust.',
                            secondary: 'Opgericht in 2016, actief voor Nederland en België, 2 mln.+ CVs volgens de officiële over-ons pagina en 20k+ reviews op de site.',
                        },
                        {
                            label: 'Extra functies',
                            primary: 'Sterke editorflow, templates en directe PDF-focus.',
                            secondary: 'App, vacature-overzicht, sollicitatietracker en sollicitatiebrief-templates als onderdeel van het bredere platform.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die zonder abonnement snel een recruiter-veilige CV-versie willen afronden.',
                            secondary: 'Mensen die een groter Nederlands sollicitatieplatform zoeken en maandtoegang acceptabel vinden.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk hoe het WerkCV-prijsmodel precies werkt',
                        description: 'Handig als het prijsverschil tussen eenmalig en abonnement voor jou doorslaggevend is.',
                    },
                    {
                        href: '/templates',
                        label: 'Vergelijk eerst de WerkCV templates',
                        description: 'Open rustig de templates en kijk of de flow al genoeg is voor jouw sollicitaties.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je minder platform en meer duidelijkheid wilt',
                paragraphs: [
                    'WerkCV is de betere keuze als je geen volledig sollicitatieplatform zoekt, maar een directe route naar een sterk CV. Dat geldt vooral voor mensen die binnen een paar uur of dagen willen afronden, en geen zin hebben om bij te houden wanneer een proefperiode omslaat in een maandbedrag.',
                    'De kern van WerkCV is juist dat je gratis kunt starten, inhoud kunt aanscherpen, templates kunt vergelijken en pas betaalt als jouw document klopt. Daarna kun je datzelfde CV blijven bewerken en opnieuw downloaden zonder opnieuw voor datzelfde document te betalen.',
                ],
                bullets: [
                    'Je wilt geen maandelijks abonnement voor een taak die je maar af en toe doet.',
                    'Je hebt vooral behoefte aan een rustige CV-flow in plaats van vacatures, tracker en extra modules.',
                    'Je wilt de vrijheid om later opnieuw in te loggen en hetzelfde CV nog eens aan te passen zonder opnieuw af te rekenen.',
                ],
                intentLinks: [
                    {
                        href: '/faq',
                        label: 'Controleer hoe WerkCV omgaat met opnieuw bewerken en downloaden',
                        description: 'Relevant als je later nog een aangepaste versie per vacature wilt maken.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cvmaker',
                        label: 'Vergelijk ook WerkCV vs CVMaker',
                        description: 'Handig als je twijfelt tussen meerdere abonnementsplatformen.',
                    },
                ],
            },
            {
                id: 'kies-cvnl',
                title: 'Kies CV.nl als je een groter Nederlands sollicitatieplatform zoekt',
                paragraphs: [
                    'CV.nl is logischer als je meer wilt dan alleen een CV-builder. De officiële site benadrukt naast CV-opmaak ook sollicitatiebrieven, vacatures bekijken, sollicitaties bijhouden en een app. Voor sommige gebruikers is dat precies wat ze zoeken: één account voor een langer sollicitatieproces.',
                    'Ook op vertrouwen en lokale bekendheid staat CV.nl sterk. Volgens de officiële over-ons pagina bestaat het platform sinds 2016, is het actief voor Nederland en België en zijn er meer dan 2 miljoen CVs via het platform gemaakt. Dat soort schaal en reviewvolume is voor sommige kopers op zichzelf al een geruststellend signaal.',
                ],
                bullets: [
                    'Je wilt CV, sollicitatiebrief, vacatures en voortgang liever in één groter systeem combineren.',
                    'Je zoekt een gevestigde Nederlandse naam met veel reviews en een bredere marktpositie.',
                    'Je vindt maandtoegang acceptabel zolang je actief solliciteert en meerdere functies van het platform gebruikt.',
                ],
                intentLinks: [
                    {
                        href: '/sollicitatiebrief-voorbeeld',
                        label: 'Gebruik WerkCV als je vooral CV plus briefhulp zoekt',
                        description: 'Praktisch als je inhoudelijke steun wilt zonder direct een breder platformabonnement.',
                    },
                    {
                        href: '/cv-maken',
                        label: 'Bekijk hoe ver je met een simpelere WerkCV-flow al komt',
                        description: 'Voor veel sollicitanten blijkt dat ruimschoots genoeg.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als jouw belangrijkste behoefte juist buiten het CV zelf ligt. Als je vooral vacatures wilt volgen, sollicitaties wilt beheren in een tracker en langer in een platform wilt blijven werken, dan is CV.nl inhoudelijk breder ingericht dan WerkCV.',
                    'Die beperking is bewust. WerkCV probeert niet elk onderdeel van de sollicitatiestack te vervangen. Het probeert vooral de CV-beslissing simpeler, goedkoper en duidelijker te maken voor mensen die niet vast willen zitten aan doorlopende kosten.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je expliciet een sollicitatieplatform met tracker en vacatures zoekt.',
                    'Niet kiezen voor WerkCV als je liever in één accountomgeving ook je brief en sollicitatiebeheer centraal zet.',
                    'Wel kiezen voor WerkCV als je grootste pijn juist abonnementen, opzegfrictie en onnodige productbreedte zijn.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste mensen die “gewoon een goed CV” willen',
                paragraphs: [
                    'Voor de meeste Nederlandse werkzoekenden die vooral een goed CV willen maken en afronden, is WerkCV de praktischere start. Niet omdat CV.nl geen goed product zou hebben, maar omdat veel sollicitanten minder behoefte hebben aan een compleet sollicitatieplatform dan aan een duidelijke, betaalbare en rustige CV-route.',
                    'De slimste route is daarom vaak simpel: start met een template, maak je inhoud sterk, beslis dan pas of je wilt downloaden. Als je later merkt dat je echt een grotere toolstack nodig hebt voor vacatures en tracking, kun je altijd opnieuw beoordelen of een breder platform het waard is.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je zonder abonnement een sterk CV wilt bouwen en afronden.',
                    'Kies CV.nl als je naast je CV ook vacatures, sollicitaties en brieven in één groter platform wilt beheren.',
                    'Twijfel je nog? Open eerst de WerkCV templates en check of die focus al genoeg is voor jouw situatie.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start direct met een WerkCV template',
                        description: 'De snelste manier om de simpelere route zelf te ervaren.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer nog één keer het prijsverschil',
                        description: 'Voor veel kopers is het abonnement vs eenmalig model uiteindelijk de doorslaggever.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet of je alleen een sterk CV nodig hebt of een breder sollicitatieplatform.',
            'Je weet of een abonnement voor jouw sollicitatiestijl logisch of juist onnodig is.',
            'Je hebt gecontroleerd hoe opnieuw downloaden of doorlopende toegang werkt bij beide opties.',
            'Je kiest op basis van je echte gebruik, niet alleen op basis van reviewvolume of merkbekendheid.',
            'Je begrijpt dat een groter platform niet automatisch de beste keuze is voor een simpele CV-taak.',
        ],
        faq: [
            {
                question: 'Is CV.nl een abonnement?',
                answer: 'Ja. Volgens de officiële pricingpagina werkt CV.nl met een proefperiode van EUR0,99 voor 14 dagen en daarna EUR19,99 per maand met automatische verlenging, tenzij je opzegt.',
            },
            {
                question: 'Wanneer is CV.nl een betere keuze dan WerkCV?',
                answer: 'Als je bewust meer zoekt dan alleen een CV-builder, zoals sollicitatiebrieven, vacatures bekijken, een sollicitatietracker en een bredere accountomgeving voor je hele sollicitatieproces.',
            },
            {
                question: 'Wanneer is WerkCV slimmer dan CV.nl?',
                answer: 'Als je vooral zonder abonnement een goed CV wilt maken, met duidelijke pricing en zonder te betalen voor extra platformdelen die je waarschijnlijk niet gebruikt.',
            },
            {
                question: 'Is CV.nl bekender dan WerkCV?',
                answer: 'Ja, duidelijk. CV.nl noemt op zijn officiële over-ons pagina meer dan 2 miljoen gemaakte CVs en toont op zijn site 20k+ reviews. WerkCV positioneert zich juist als smallere, transparantere keuze voor mensen die geen abonnementsmodel willen.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-gids/werkcv-vs-cvmaker',
                title: 'WerkCV vs CVMaker',
                description: 'Vergelijk WerkCV ook met een ander groot abonnementsplatform om het prijsmodel scherper te beoordelen.',
            },
            {
                href: '/prijzen',
                title: 'WerkCV prijzen',
                description: 'Bekijk het eenmalige model, wat je krijgt en wanneer je opnieuw betaalt voor een nieuw document.',
            },
            {
                href: '/templates',
                title: 'WerkCV templates vergelijken',
                description: 'Open de templates eerst en beoordeel of de smallere, rustigere flow al genoeg is voor jouw sollicitaties.',
            },
        ],
        sources: [
            {
                label: 'CV.nl pricing',
                href: 'https://www.cv.nl/pricing',
                note: 'Officiële prijzenpagina met EUR0,99 voor 14 dagen en daarna EUR19,99 per maand, plus positionering als onbeperkt te gebruiken platform. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CV.nl over ons',
                href: 'https://www.cv.nl/over-ons',
                note: 'Officiële bedrijfsinformatie: opgericht in 2016, gericht op Nederland en België, met meer dan 2 miljoen gemaakte CVs. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CV.nl app / productpagina',
                href: 'https://www.cv.nl/app',
                note: 'Officiële productpagina die CVs, sollicitatiebrieven, vacatures bekijken, sollicitaties bijhouden en een reviewscore van 20k+ reviews benadrukt. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over latere bewerkingen en downloads.',
            },
        ],
        ctaTitle: 'Kies de route die past bij je echte sollicitatiegedrag',
        ctaText: 'Als je vooral zonder abonnement snel een sterk CV wilt afronden, open dan eerst de WerkCV templates en bouw gratis je versie op.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-cvster',
        locale: 'nl',
        title: 'WerkCV vs CVster: welke CV builder is slimmer voor jouw sollicitaties?',
        description: 'Eerlijke vergelijking tussen WerkCV en CVster. Vergelijk eenmalige prijs vs proefabonnement, ATS-checker, CV- en sollicitatiebrief-templates, downloads en beste use case.',
        metaTitle: 'WerkCV vs CVster (2026) | Welke CV builder past beter? | WerkCV.nl',
        metaDesc: 'WerkCV of CVster? Vergelijk prijsmodel, proefabonnement, ATS-checker, CV- en briefsuite, downloads en kies de beste CV builder voor jouw situatie.',
        keywords: [
            'werkcv vs cvster',
            'cvster alternatief',
            'cvster abonnement',
            'cv builder zonder abonnement',
            'werkcv of cvster',
        ],
        intro: 'Wil je vooral zonder abonnement snel één sterk CV afronden, dan past WerkCV meestal beter. Wil je een grotere CV- en sollicitatiebriefsuite met ATS-checker, meerdere betaalopties en veel extra formats, dan past CVster meestal beter.',
        sections: [
            {
                id: 'vergelijking',
                title: 'WerkCV vs CVster in één oogopslag',
                paragraphs: [
                    'WerkCV en CVster lijken op het eerste gezicht allebei een online CV builder, maar het productidee verschilt. WerkCV is een smallere Nederlandse CV-route met een duidelijke eenmalige betaling per document. CVster is onderdeel van de Resume.io-familie en positioneert zich als een veel bredere suite met CVs, sollicitatiebrieven, ATS-checking, meerdere betaalmodellen en meer bestandsopties.',
                    'Daardoor draait de keuze vooral om één vraag: heb je vooral een snelle en transparante CV-oplossing nodig, of wil je juist een uitgebreider platform voor meerdere sollicitatiedocumenten en extra tooling?',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'CVster'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per CV zodra je wilt downloaden.',
                            secondary: 'Gratis toegang met beperkingen, 7-daagse proef voor EUR2,95, daarna EUR14,95 per 4 weken; ook 6-maanden- en jaarpakketten als eenmalige betaling.',
                        },
                        {
                            label: 'Productscope',
                            primary: 'Gefocust op een rustige CV-flow: bouwen, vergelijken, downloaden en hetzelfde CV later opnieuw bijwerken.',
                            secondary: 'Grotere suite met CVs, sollicitatiebrieven, ATS-checker, job search, extra templatefamilies en meerdere downloadroutes.',
                        },
                        {
                            label: 'Gratis toegang',
                            primary: 'Gratis bouwen en vergelijken; betaling pas wanneer je jouw definitieve CV als PDF wilt downloaden.',
                            secondary: 'Gratis account met één CV en één sollicitatiebrief, TXT-download en een beperkt aantal gratis PDF-sjablonen.',
                        },
                        {
                            label: 'Na betaling of activatie',
                            primary: 'Hetzelfde betaalde CV blijft voor jou beschikbaar om later opnieuw te openen, aan te passen en opnieuw te downloaden.',
                            secondary: 'Doorlopende toegang zolang een premiumplan actief is; gratis account blijft beperkt bruikbaar met minder documenten en minder downloadopties.',
                        },
                        {
                            label: 'Bestanden en formats',
                            primary: 'PDF-download voor je definitieve CV-flow.',
                            secondary: 'Premium ondersteunt PDF en DOCX; gratis toegang geeft ook TXT en een beperkt aantal gratis PDF-sjablonen.',
                        },
                        {
                            label: 'Platformomvang',
                            primary: 'Bewust compact en Nederlands-georiënteerd.',
                            secondary: '61.945.889 CVs, 5.583.655 sollicitatiebrieven, 25.000+ aanmeldingen per dag en 20 talen volgens de officiële over-ons pagina.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die zonder abonnement snel en rustig willen afronden.',
                            secondary: 'Mensen die een grotere documentensuite met ATS-checking en meerdere outputopties willen.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk hoe WerkCV-pricing precies werkt',
                        description: 'Handig als je eenmalig betalen bewust wilt afzetten tegen proefabonnementen en maandtoegang.',
                    },
                    {
                        href: '/templates',
                        label: 'Vergelijk eerst de WerkCV templates',
                        description: 'Kijk of de smallere flow al genoeg is voor jouw sollicitatie.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je minder gereedschap en minder frictie wilt',
                paragraphs: [
                    'WerkCV is de logischere keuze als je niet eerst allerlei extra modules wilt beoordelen, maar gewoon een goed CV wilt maken en afronden. Voor veel sollicitanten is dat het echte doel: een recruiter-veilige PDF zonder abonnement, zonder trial-omslag en zonder bredere suite waar je misschien maar een klein deel van gebruikt.',
                    'Dat maakt WerkCV vooral sterk voor mensen die snel willen handelen. Je kunt gratis opbouwen, de template met echte inhoud vergelijken en alleen betalen wanneer jouw CV klaar is om verstuurd te worden. Voor hetzelfde document kun je later nog terugkomen om het te updaten en opnieuw te downloaden.',
                ],
                bullets: [
                    'Je wilt geen proefabonnement hoeven onthouden of actief annuleren.',
                    'Je wilt vooral een CV afronden, niet direct ook een complete documentensuite of ATS-tooling afnemen.',
                    'Je vindt eenvoud, prijsrust en later opnieuw downloaden van hetzelfde CV belangrijker dan extra featurebreedte.',
                ],
                intentLinks: [
                    {
                        href: '/faq',
                        label: 'Lees hoe WerkCV omgaat met opnieuw bewerken en downloaden',
                        description: 'Belangrijk als je later nog een vacaturegerichte update wilt doen.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cvmaker',
                        label: 'Vergelijk ook WerkCV vs CVMaker',
                        description: 'Handig als je meerdere abonnementsplatformen naast elkaar wilt leggen.',
                    },
                ],
            },
            {
                id: 'kies-cvster',
                title: 'Kies CVster als je een grotere sollicitatiesuite wilt',
                paragraphs: [
                    'CVster is de betere keuze als je waarde hecht aan een bredere combinatie van CV, sollicitatiebrief, ATS-checking en meerdere downloadopties. Op de officiële pricing- en help-pagina’s is duidelijk dat het platform meer wil zijn dan alleen een PDF-exporter. Het biedt premium toegang tot onbeperkt veel CVs en sollicitatiebrieven, extra formaten en extra tooling rondom het document zelf.',
                    'Voor sommige gebruikers is dat precies de juiste vorm. Als je veel varianten maakt, met een brief werkt, of graag documentfeedback en extra controlelagen gebruikt, dan kan CVster inhoudelijk beter passen dan een smallere builder.',
                ],
                bullets: [
                    'Je wilt CV en sollicitatiebrief in één grotere editor-suite houden.',
                    'Je wilt extra tooling zoals een ATS-checker of DOCX-export kunnen gebruiken.',
                    'Je bent bereid om een proefplan of periodiek prijsmodel te accepteren omdat je meerdere onderdelen van de suite gebruikt.',
                ],
                intentLinks: [
                    {
                        href: '/ats-cv-template',
                        label: 'Gebruik WerkCV als je vooral een eenvoudige ATS-veilige start zoekt',
                        description: 'Voor wie ATS-relevantie wil zonder meteen een bredere suite af te nemen.',
                    },
                    {
                        href: '/sollicitatiebrief-voorbeeld',
                        label: 'Werk eerst je briefinhoud uit zonder groter platform',
                        description: 'Handig als je vooral hulp zoekt bij de inhoud van een brief.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als je juist op zoek bent naar veel extra’s rond je sollicitatiedocumenten. Als jij meerdere outputformaten wilt, een ingebouwde ATS-checker wilt gebruiken, veel documenten tegelijk wilt beheren of een grotere suite met CV en sollicitatiebrief zoekt, dan biedt CVster op papier meer gereedschap.',
                    'Dat is geen fout in WerkCV, maar een keuze in positionering. WerkCV is bedoeld voor mensen die een kleiner, duidelijker product willen waarmee ze sneller beslissen en minder kans hebben om te betalen voor functies die ze nauwelijks gebruiken.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je nadrukkelijk ATS-checking, DOCX-download en bredere documentsuite-functionaliteit zoekt.',
                    'Niet kiezen voor WerkCV als je veel CV- en briefvarianten wilt maken in één grotere premiumomgeving.',
                    'Wel kiezen voor WerkCV als je grootste probleem juist billing-frictie en productoverload zijn.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste mensen die vooral resultaat willen',
                paragraphs: [
                    'Voor de meeste Nederlandse werkzoekenden die simpelweg een goed CV willen maken en versturen, blijft WerkCV de logischere start. Niet omdat CVster zwak zou zijn, maar omdat extra mogelijkheden zoals ATS-checking, extra formaten en een brede documentsuite pas waarde hebben als je die ook echt gaat gebruiken.',
                    'De praktische beslisregel is daarom simpel: begin bij de kleinste tool die jouw probleem volledig oplost. Als een rustige CV-builder zonder abonnement voldoende is, is WerkCV vaak de betere keuze. Als je meerdere documenten, checks en formats nodig hebt, dan kan CVster meer waarde leveren.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je zonder abonnement snel één sterk CV wilt maken en afronden.',
                    'Kies CVster als je bewust een grotere CV- en sollicitatiebriefsuite met extra tooling wilt.',
                    'Twijfel je nog? Open eerst de WerkCV templates en kijk of die eenvoudige route al genoeg is.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om te testen of je aan eenvoud genoeg hebt.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer nog één keer het prijsverschil',
                        description: 'Voor veel kopers is eenmalig vs proef- en premiummodel uiteindelijk het echte beslispunt.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet of je vooral één sterk CV nodig hebt of een bredere documenten- en ATS-suite.',
            'Je begrijpt het verschil tussen eenmalig betalen en een proef/premiummodel.',
            'Je hebt gecontroleerd welke downloadformaten je echt nodig hebt en welke vooral nice-to-have zijn.',
            'Je kiest op basis van jouw sollicitatieroutine, niet alleen op basis van features die je misschien nooit gebruikt.',
            'Je weet of eenvoud voor jou een voordeel is of juist een beperking.',
        ],
        faq: [
            {
                question: 'Is CVster een abonnement?',
                answer: 'CVster biedt meerdere betaalvormen. Volgens de officiële pricingpagina is er een 7-daagse proef voor EUR2,95 die daarna overgaat in een maandplan van EUR14,95 per 4 weken, naast 6-maanden- en jaaropties als eenmalige betaling.',
            },
            {
                question: 'Wanneer is CVster een betere keuze dan WerkCV?',
                answer: 'Als je bewust extra functies wilt zoals sollicitatiebrief-templates, ATS-checking, meer downloadopties en een bredere premiumsuite voor meerdere documenten.',
            },
            {
                question: 'Wanneer is WerkCV slimmer dan CVster?',
                answer: 'Als je vooral zonder abonnement snel een sterk CV wilt afronden en geen extra suite of trial-structuur nodig hebt om dat doel te halen.',
            },
            {
                question: 'Is CVster groter dan WerkCV?',
                answer: 'Ja, duidelijk. De officiële over-ons pagina van CVster noemt meer dan 55 miljoen gemaakte CVs, meer dan 5 miljoen sollicitatiebrieven, 25.000+ aanmeldingen per dag en 20 ondersteunde talen.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-gids/werkcv-vs-cvmaker',
                title: 'WerkCV vs CVMaker',
                description: 'Vergelijk WerkCV ook met een ander groot abonnementsgedreven CV-platform.',
            },
            {
                href: '/cv-gids/werkcv-vs-cv-nl',
                title: 'WerkCV vs CV.nl',
                description: 'Handig als je ook een Nederlandse platformspeler met breder sollicitatieaanbod wilt vergelijken.',
            },
            {
                href: '/ats-cv-template',
                title: 'ATS CV template',
                description: 'Start met een veilige ATS-vriendelijke route als je vooral scanbaarheid zoekt zonder extra suite.',
            },
        ],
        sources: [
            {
                label: 'CVster pricing',
                href: 'https://cvster.nl/pricing',
                note: 'Officiële prijzenpagina met EUR14,95 per 4 weken, 7-daagse proef voor EUR2,95, plus 6-maanden- en jaarplannen en gratis toegang met beperkingen. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVster over ons',
                href: 'https://cvster.nl/about',
                note: 'Officiële over-ons pagina met 61.945.889 CVs, 5.583.655 sollicitatiebrieven, 25.000+ aanmeldingen per dag, 20 talen en onderdeel van Resume.io / Career.io. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVster ATS-checker',
                href: 'https://cvster.nl/cv-checker',
                note: 'Officiële productpagina voor de AI ATS cv check, gebruikt om de bredere suite-positionering te onderbouwen.',
            },
            {
                label: 'CVster gratis gebruiken',
                href: 'https://help.cvster.nl/article/267-hoe-kan-ik-cvsternl-gratis-gebruiken',
                note: 'Officiële help-pagina met de gratis limieten: één CV, één sollicitatiebrief, TXT-download en een beperkt aantal gratis PDF-sjablonen.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
        ],
        ctaTitle: 'Kies de kleinste tool die jouw probleem echt oplost',
        ctaText: 'Als een rustige CV-builder zonder abonnement voor jou genoeg is, open dan eerst de WerkCV templates en bouw je versie gratis op.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-zety',
        locale: 'nl',
        title: 'WerkCV vs Zety: wat is het beste Zety alternatief voor Nederland?',
        description: 'Eerlijke vergelijking tussen WerkCV en Zety voor Nederlandse sollicitanten. Vergelijk prijsmodel, abonnement, templates, taal en welke route beter past bij Nederlandse vacatures.',
        metaTitle: 'Zety alternatief Nederland (2026) | WerkCV vs Zety | WerkCV.nl',
        metaDesc: 'Zoek je een Zety alternatief in Nederland? Vergelijk WerkCV en Zety op prijsmodel, templates, ATS-focus, taal en welke route beter past bij Nederlandse sollicitaties.',
        keywords: [
            'zety alternatief nederland',
            'werkcv vs zety',
            'zety alternatief',
            'zety nederland alternatief',
            'cv builder zonder abonnement',
            'werkcv of zety',
        ],
        intro: 'Zoek je een Zety alternatief voor Nederland, dan is de kernvraag meestal niet of Zety goed is, maar of het past bij jouw sollicitatiestijl. Wil je vooral snel een Nederlands cv afronden zonder abonnement, dan past WerkCV meestal beter. Wil je een grotere internationale cv- en cover-letter-suite met veel kant-en-klare content en bredere Engelstalige begeleiding, dan kan Zety beter passen.',
        sections: [
            {
                id: 'direct-antwoord',
                title: 'Direct antwoord: wanneer WerkCV beter past en wanneer Zety beter past',
                paragraphs: [
                    'WerkCV en Zety lossen niet exact hetzelfde probleem op. WerkCV is bewust smal gehouden: rustig cv bouwen voor de Nederlandse markt, met duidelijke eenmalige betaling per document. Zety is een grotere internationale builder-suite met cv, cover letter, resume check, job matches en veel voorgeschreven contentblokken.',
                    'Daardoor is de beste keuze minder afhankelijk van design dan van context. Solliciteer je vooral op Nederlandse vacatures en wil je prijsrust zonder trial of doorlopend abonnement, dan is WerkCV meestal logischer. Werk je vooral in het Engels, wil je een bredere set templates en schrijfondersteuning, en vind je een trial- of abonnementsmodel acceptabel, dan is Zety een serieuzere kandidaat.',
                ],
                comparisonTable: {
                    columns: ['Situatie', 'WerkCV', 'Zety'],
                    rows: [
                        {
                            label: 'Je wilt snel een Nederlands cv afronden zonder abonnement',
                            primary: 'Sterkste keuze, omdat je gratis kunt starten en pas eenmalig betaalt wanneer je jouw PDF wilt downloaden.',
                            secondary: 'Minder passend als je juist trial- of abonnementsfrictie wilt vermijden.',
                        },
                        {
                            label: 'Je zoekt een Engelstalige cv- en cover-letter-suite',
                            primary: 'Kan nog steeds werken, maar WerkCV is compacter en minder suite-gedreven.',
                            secondary: 'Sterk als je veel waarde ziet in ready-made content, cover-letter flow en bredere internationale begeleiding.',
                        },
                        {
                            label: 'Je wilt vooral prijsrust en geen opzegfrictie',
                            primary: 'Sterk, omdat hetzelfde betaalde cv later opnieuw te openen en opnieuw te downloaden blijft zonder abonnement.',
                            secondary: 'Minder sterk als je geen trial- of doorlopende premiumstructuur wilt beheren.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk eerst hoe WerkCV-pricing precies werkt',
                        description: 'Handig als prijsmodel en billingrust voor jou het belangrijkste verschil zijn.',
                    },
                    {
                        href: '/templates',
                        label: 'Vergelijk eerst rustig de WerkCV templates',
                        description: 'Zo zie je direct of de smallere Nederlandse route al genoeg is voor jouw sollicitaties.',
                    },
                ],
            },
            {
                id: 'vergelijking',
                title: 'WerkCV vs Zety in één oogopslag',
                paragraphs: [
                    'Op productniveau is het verschil helder. WerkCV is gebouwd rond een rustige cv-flow met nadruk op Nederlandse sollicitaties, transparante pricing en een beperkt aantal scherpe keuzes. Zety positioneert zich als een bredere builder met cv-maker, cover-letter-builder, resume check, job matches en veel voorgeschreven content.',
                    'Dat maakt Zety niet automatisch beter. Voor veel mensen is minder juist beter: een kleinere flow, minder billingcomplexiteit en een duidelijker Nederlands gebruiksscenario. Voor anderen is de extra breedte van Zety juist nuttig, vooral als zij Engelstalige documenten, cover letters en een grotere internationale contentlaag willen combineren.',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'Zety'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per cv als je wilt downloaden.',
                            secondary: 'Volgens de officiële Zety.com-pricingpagina: gratis starten, daarna trial vanaf USD1,95 voor 14 dagen; daarna automatische verlenging tegen een hoger premiumtarief. Prijzen kunnen per markt verschillen.',
                        },
                        {
                            label: 'Productscope',
                            primary: 'Gefocust op cv bouwen, vergelijken, afronden en hetzelfde document later opnieuw downloaden.',
                            secondary: 'Grotere suite met cv builder, cover letter builder, resume check, job matches en extra contentlagen.',
                        },
                        {
                            label: 'Templates',
                            primary: 'Selectie gericht op rustige, recruiter-veilige templates voor Nederlandse sollicitaties.',
                            secondary: 'Officiële Zety CV-maker en templates-pagina noemen 18+ cv-templates met bredere personalisatie-opties.',
                        },
                        {
                            label: 'Documentfocus',
                            primary: 'Nederlands cv eerst; Engels mogelijk via aparte Engelse routes.',
                            secondary: 'Internationale en Engelstalige focus met veel standaard content en matching cover-letter-flow.',
                        },
                        {
                            label: 'Na betaling',
                            primary: 'Hetzelfde betaalde cv kun je later opnieuw openen, wijzigen en opnieuw downloaden zonder opnieuw voor dat document te betalen.',
                            secondary: 'Toegang en downloadrechten hangen samen met het gekozen premiumplan en de verlenging daarvan.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die een directe Nederlandse cv-route zonder abonnement willen.',
                            secondary: 'Mensen die een bredere, meer internationale builder-suite willen en trial/abonnement acceptabel vinden.',
                        },
                    ],
                },
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je vooral Nederlandse sollicitaties en prijsrust belangrijk vindt',
                paragraphs: [
                    'WerkCV wint wanneer je vooral een cv nodig hebt en geen volledige sollicitatiesuite. Dat geldt extra voor mensen die meerdere Nederlandse vacatures willen bedienen vanuit één rustig basisdocument, maar niet willen vastzitten aan een maandmodel.',
                    'Ook de lokale focus helpt. WerkCV praat in de taal van Nederlandse sollicitanten: ATS-rust, eenmalig betalen, later opnieuw downloaden van hetzelfde document en templates die gericht zijn op een scanbare sollicitatie-PDF in plaats van een bredere internationale suite-ervaring.',
                ],
                bullets: [
                    'Je wilt zonder abonnement een cv maken en afronden.',
                    'Je solliciteert vooral op Nederlandse vacatures en wilt een rustige Nederlandse workflow.',
                    'Je hebt niet per se een aparte cover-letter-suite of job-matchlaag nodig.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-zonder-abonnement',
                        label: 'Bekijk de no-subscription route achter WerkCV',
                        description: 'Handig als juist het prijsmodel je reden is om naar een alternatief voor Zety te zoeken.',
                    },
                    {
                        href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                        label: 'Vergelijk WerkCV ook met andere no-subscription opties',
                        description: 'Zo zie je of je probleem echt Zety is, of vooral abonnementen in het algemeen.',
                    },
                ],
            },
            {
                id: 'kies-zety',
                title: 'Kies Zety als je de grotere internationale suite ook echt gebruikt',
                paragraphs: [
                    'Zety is logischer als je niet alleen een cv-builder zoekt, maar een bredere internationale sollicitatietool met cover-letter-ondersteuning, veel ready-made content, resume check en extra job-tooling. Zeker voor Engelstalige sollicitaties kan die bredere laag aantrekkelijk zijn.',
                    'De belangrijkste nuance is dat die extra breedte alleen waardevol is als je haar ook gebruikt. Als je uiteindelijk vooral één of twee sterke cv-versies nodig hebt, dan betaal je al snel voor meer product dan je werkelijk benut.',
                ],
                bullets: [
                    'Je werkt vooral in het Engels of zoekt een internationaal ogende builder-suite.',
                    'Je wilt veel kant-en-klare contentblokken en een geïntegreerde cover-letter-flow.',
                    'Je vindt een trial- of abonnementsmodel acceptabel zolang de suite breed genoeg is.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-in-het-engels',
                        label: 'Gebruik WerkCV als je vooral een Engels cv voor Nederland wilt maken',
                        description: 'Handig als je niet per se een internationale suite nodig hebt, maar wel een Engelstalig sollicitatiedocument.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als jouw echte behoefte juist buiten het cv zelf ligt. Als je vooral zoekt naar een grote internationale builder met veel voorgeschreven content, geïntegreerde cover letters en bredere job-tooling, dan is WerkCV bewust smaller.',
                    'Die smalle focus is een voordeel voor wie minder frictie wil. Maar als jij juist brede suite-functionaliteit wilt en prijsmodel minder zwaar weegt, dan kan Zety inhoudelijk beter aansluiten.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je vooral een grotere internationale suite zoekt in plaats van een directe cv-oplossing.',
                    'Niet kiezen voor WerkCV als een cover-letter-builder en extra job-tools voor jou essentieel zijn.',
                    'Wel kiezen voor WerkCV als je van Zety af wilt vanwege trial-, prijs- of abonnementfrictie.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste Nederlandse sollicitanten die op “Zety alternatief Nederland” zoeken',
                paragraphs: [
                    'Voor de meeste Nederlandse gebruikers die specifiek op “Zety alternatief Nederland” zoeken, is WerkCV de logischere uitkomst. Niet omdat Zety slecht is, maar omdat deze zoekterm meestal wordt ingegeven door een lokale behoefte: Nederlands solliciteren, minder billinggedoe en een directere cv-route.',
                    'De praktische aanpak is daarom simpel: begin met een WerkCV template, kijk of de Nederlandse flow en prijsrust al genoeg zijn, en stap pas naar een grotere suite over als je merkt dat je echt die extra breedte nodig hebt.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je vooral zonder abonnement een sterk Nederlands cv wilt maken.',
                    'Kies Zety als je bewust een bredere internationale cv- en cover-letter-suite zoekt.',
                    'Twijfel je nog? Open eerst de WerkCV templates en kijk of de smallere route je probleem al oplost.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start direct met een WerkCV template',
                        description: 'De snelste manier om te testen of het Zety-alternatief in de praktijk al genoeg is.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer nog één keer het eenmalige model',
                        description: 'Voor veel bezoekers is dit uiteindelijk de echte reden om een alternatief te zoeken.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet of je een Nederlandse cv-flow zoekt of een bredere internationale suite.',
            'Je weet of trial- of abonnementsbilling voor jou acceptabel is.',
            'Je begrijpt dat meer templates en extra tooling niet automatisch beter zijn voor een simpele cv-taak.',
            'Je kiest op basis van je sollicitatiegedrag, niet alleen op basis van merkbekendheid.',
            'Je hebt bepaald of cover-letter- en job-tools voor jou echt essentieel zijn.',
        ],
        faq: [
            {
                question: 'Wat is het beste Zety alternatief in Nederland?',
                answer: 'Voor veel Nederlandse sollicitanten is WerkCV het logischste alternatief, omdat het een rustige Nederlandse cv-flow biedt zonder trial- of maandabonnement. Zety blijft vooral sterk voor mensen die een grotere internationale suite met cover-letter-builder en meer ready-made content willen.',
            },
            {
                question: 'Is Zety een abonnement?',
                answer: 'Volgens de officiële Zety.com-pricingpagina werk je gratis aan je document, maar betaalde toegang loopt via een trial- of premiumstructuur met automatische verlenging. Exacte prijzen kunnen per markt verschillen.',
            },
            {
                question: 'Wanneer is Zety logischer dan WerkCV?',
                answer: 'Als je juist een grotere internationale builder-suite wilt met cover letters, resume check, job matches en veel voorgeschreven content, en je een trial- of abonnementsmodel acceptabel vindt.',
            },
            {
                question: 'Wanneer is WerkCV slimmer dan Zety?',
                answer: 'Als je vooral zonder abonnement een sterk cv voor Nederlandse vacatures wilt maken, met duidelijke pricing en minder productfrictie.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-maken-zonder-abonnement',
                title: 'CV maken zonder abonnement',
                description: 'Gebruik deze pagina als alternatief-intentie vooral door abonnementsfrictie wordt gedreven.',
            },
            {
                href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                title: 'Beste no-subscription builder',
                description: 'Vergelijk WerkCV ook met andere no-subscription routes en niet alleen met Zety.',
            },
            {
                href: '/cv-maken-in-het-engels',
                title: 'Engels cv maken',
                description: 'Handig als je Zety overwoog vanwege de Engelstalige builder-ervaring maar toch in Nederland solliciteert.',
            },
            {
                href: '/zety-opzeggen',
                title: 'Zety opzeggen',
                description: 'Gebruik deze pagina als je eerst de officiele cancel-routes en billinglogica van Zety wilt checken.',
            },
        ],
        sources: [
            {
                label: 'Zety pricing',
                href: 'https://zety.com/pricing/',
                note: 'Officiële Zety.com-pricingpagina met gratis start, trial vanaf USD1,95 voor 14 dagen en automatische verlenging; prijzen kunnen per markt verschillen. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'Zety CV maker',
                href: 'https://zety.com/cv-maker',
                note: 'Officiële productpagina met cv-builder, PDF/DOC-download, role-specific content en bredere job-tooling. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'Zety CV templates',
                href: 'https://zety.com/cv-templates',
                note: 'Officiële templates-pagina die 18+ cv-templates en bredere personalisatie benadrukt. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige prijs per cv en uitleg over later opnieuw bewerken en downloaden.',
            },
        ],
        ctaTitle: 'Zoek je vooral een alternatief voor trial- en abonnementsfrictie?',
        ctaText: 'Open dan eerst de WerkCV templates en kijk of de Nederlandse no-subscription route jouw probleem al volledig oplost.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-resume-io',
        locale: 'nl',
        title: 'WerkCV vs Resume.io: wat is het beste Resume.io alternatief voor Nederland?',
        description: 'Eerlijke vergelijking tussen WerkCV en Resume.io voor Nederlandse sollicitanten. Vergelijk prijsmodel, planvariatie per land, productbreedte en welke route beter past bij een Nederlands cv.',
        metaTitle: 'Resume.io alternatief Nederland (2026) | WerkCV vs Resume.io | WerkCV.nl',
        metaDesc: 'Zoek je een Resume.io alternatief in Nederland? Vergelijk WerkCV en Resume.io op prijsmodel, subscriptions vs one-time access, suitebreedte en welke route beter past bij Nederlandse sollicitaties.',
        keywords: [
            'resume.io alternatief',
            'resume io alternatief',
            'resume.io alternatief nederland',
            'werkcv vs resume.io',
            'werkcv of resume.io',
            'resume.io opzeggen',
            'cv builder zonder abonnement',
        ],
        intro: 'Zoek je een Resume.io alternatief voor Nederland, dan is de kernvraag meestal niet alleen welke builder mooier oogt, maar welk model rustiger en voorspelbaarder past bij jouw sollicitatiegedrag. WerkCV is een smalle Nederlandse cv-route met een vaste eenmalige betaling per document. Resume.io is een bredere carrière-suite waarbij de officiële help- en pricingpagina\'s zelf aangeven dat planstructuren per land kunnen verschillen.',
        sections: [
            {
                id: 'direct-antwoord',
                title: 'Direct antwoord: wanneer WerkCV beter past en wanneer Resume.io beter past',
                paragraphs: [
                    'WerkCV en Resume.io lossen niet exact hetzelfde probleem op. WerkCV is een compacte Nederlandse cv-route: templates kiezen, inhoud invullen, cv afronden en later hetzelfde document opnieuw openen en downloaden. Resume.io positioneert zich veel breder als carrièreplatform met resume builder, cover letters, job tracker, AI interview prep en extra carrièretools.',
                    'Voor veel Nederlandse sollicitanten is het echte verschil daarom niet design maar productomvang en billinglogica. Wil je vooral een rustig Nederlands cv afronden zonder wisselende plansoorten per land, dan past WerkCV meestal beter. Wil je juist een grotere internationale suite en vind je variabele planstructuren of accountlagen acceptabel, dan kan Resume.io beter aansluiten.',
                ],
                comparisonTable: {
                    columns: ['Situatie', 'WerkCV', 'Resume.io'],
                    rows: [
                        {
                            label: 'Je wilt snel een Nederlands cv afronden zonder planverwarring',
                            primary: 'Sterkste keuze, omdat het model simpel blijft: gratis starten en daarna eenmalig per document betalen als je wilt downloaden.',
                            secondary: 'Minder passend als je juist een vaste, altijd identieke planstructuur verwacht; Resume.io zegt zelf dat pricing en plans per locatie kunnen verschillen.',
                        },
                        {
                            label: 'Je zoekt een bredere carrière-suite rond je cv',
                            primary: 'Compacter en bewust smaller.',
                            secondary: 'Sterker als je waarde ziet in extra lagen zoals cover letters, job tracker, AI interview prep en andere carrièretools.',
                        },
                        {
                            label: 'Je wilt later hetzelfde document zonder abonnement blijven gebruiken',
                            primary: 'Sterk, omdat hetzelfde betaalde cv later opnieuw te openen en opnieuw te downloaden blijft.',
                            secondary: 'Hangt af van het plan dat je hebt gekozen; Resume.io noemt zelf verschillende modellen waaronder trial, meermaandsplannen en in sommige landen one-time payments.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk eerst hoe WerkCV-pricing werkt',
                        description: 'Handig als voorspelbaarheid van het prijsmodel voor jou het grootste verschil maakt.',
                    },
                    {
                        href: '/resume-io-opzeggen',
                        label: 'Lees ook de officiele cancel-samenvatting voor Resume.io',
                        description: 'Relevant als je huidige vraag eigenlijk eerst over downgraden of stoppen gaat.',
                    },
                ],
            },
            {
                id: 'vergelijking',
                title: 'WerkCV vs Resume.io in één oogopslag',
                paragraphs: [
                    'Op productniveau staat WerkCV voor focus en Resume.io voor breedte. WerkCV houdt de route klein: rustig document opbouwen, recruiter-veilige templates, duidelijke Nederlandse positionering en een eenmalige downloadunlock. Resume.io laat op de eigen homepage en help-pagina\'s juist een bredere suite zien met builder, cover letters, extra carrièretools en meer accountlagen.',
                    'Ook het prijsmodel verschilt fundamenteel. Resume.io zegt in het officiële helpcentrum expliciet dat plans kunnen variëren per locatie. Daar horen onder meer een 7-daagse trial, 6-maands- en jaarplannen en in sommige landen one-time payments bij. WerkCV gebruikt juist één eenvoudiger logica voor hetzelfde document: gratis opbouwen en eenmalig betalen zodra je wilt downloaden.',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'Resume.io'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per cv wanneer je wilt downloaden.',
                            secondary: 'Officiële help- en pricingpagina\'s zeggen dat plans per locatie kunnen verschillen en onder meer trial, 6 maanden, 1 jaar en in sommige landen one-time payments kunnen omvatten.',
                        },
                        {
                            label: 'Auto-renewal / cancel',
                            primary: 'Geen maandabonnement voor hetzelfde betaalde cv.',
                            secondary: 'Volgens het helpcentrum kan een 7-daagse trial automatisch verlengen; 6-maands- en jaarplannen verlengen niet automatisch; one-time payments in sommige landen verlengen ook niet automatisch.',
                        },
                        {
                            label: 'Productscope',
                            primary: 'Gefocust op cv bouwen, templates vergelijken, afronden en hetzelfde document later opnieuw gebruiken.',
                            secondary: 'Breder platform met resume builder, cover letters, Job Tracker, AI Interview Prep, First 90 Day Plan, Career Pathways en meer.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die vooral een rustige Nederlandse cv-route zonder billingfrictie willen.',
                            secondary: 'Mensen die een grotere internationale carrière-suite willen en een meer gelaagde planstructuur acceptabel vinden.',
                        },
                    ],
                },
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je rust, voorspelbaarheid en Nederlandse focus zoekt',
                paragraphs: [
                    'WerkCV wint vooral voor mensen die geen platformrelatie zoeken, maar gewoon een goed cv willen maken en afronden. Voor dat type gebruiker is minder product vaak beter: minder accountgedoe, minder twijfel over welk plan actief is en een duidelijker pad naar een nette PDF voor Nederlandse vacatures.',
                    'Die lokale focus helpt extra als je cv vooral recruiter-proof moet zijn in Nederland. WerkCV praat in de taal van Nederlandse sollicitanten: zonder abonnement, later opnieuw openen, rustige templates en weinig onnodige suite-lagen om het document heen.',
                ],
                bullets: [
                    'Je wilt geen trial- of planverwarring per land hoeven uitzoeken.',
                    'Je wilt hetzelfde cv later opnieuw kunnen openen en opnieuw downloaden.',
                    'Je zoekt vooral een Nederlandse cv-route en geen bredere carrière-suite.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-zonder-abonnement',
                        label: 'Bekijk de no-subscription route achter WerkCV',
                        description: 'Handig als jouw alternatief-intentie vooral door billingfrictie wordt gedreven.',
                    },
                    {
                        href: '/templates',
                        label: 'Open eerst de WerkCV templates',
                        description: 'Zo test je meteen of de smallere route jouw probleem al oplost.',
                    },
                ],
            },
            {
                id: 'kies-resumeio',
                title: 'Kies Resume.io als je de bredere suite ook echt gebruikt',
                paragraphs: [
                    'Resume.io is logischer als je bewust meer zoekt dan alleen een cv-builder. De eigen homepage en help-content laten een veel bredere productlaag zien: cover letters, job tracker, AI interview prep, coaching-achtige functies en andere tools die verder gaan dan een los cv-document.',
                    'Die breedte is alleen niet voor iedereen relevant. Als je uiteindelijk vooral één of twee sterke cv-versies wilt afronden, dan koop je al snel meer platform dan je daadwerkelijk gebruikt. Voor sommige mensen is dat prima; voor veel Nederlandse sollicitanten is het juist onnodige complexiteit.',
                ],
                bullets: [
                    'Je wilt een bredere carrière-suite en niet alleen een cv-builder.',
                    'Je gebruikt ook cover-letter- en extra job-tools actief.',
                    'Je vindt het acceptabel dat pricing en planvormen per markt kunnen verschillen.',
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als je echte behoefte buiten het cv zelf ligt. Als je een groot internationaal platform wilt gebruiken waarin meerdere carrièretools samenkomen, dan is WerkCV bewust smaller opgezet.',
                    'Die beperking is meestal juist een voordeel voor gebruikers die hun cv snel willen afronden. Maar als jij brede suitefunctionaliteit zoekt en dat zwaarder weegt dan eenvoudige billing, dan kan Resume.io inhoudelijk beter passen.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je vooral extra carrièretools wilt buiten het cv-document.',
                    'Niet kiezen voor WerkCV als een grotere internationale suite voor jou de hoofdreden is om te betalen.',
                    'Wel kiezen voor WerkCV als je van Resume.io af wilt vanwege planfrictie of omdat je een rustigere Nederlandse route zoekt.',
                ],
            },
        ],
        checklist: [
            'Je weet of je vooral een cv-builder zoekt of een bredere carrière-suite.',
            'Je begrijpt dat Resume.io volgens de officiële help-pagina plans per locatie kan variëren.',
            'Je weet welk model voor jou belangrijker is: vaste documentrust of bredere toolscope.',
            'Je hebt bepaald of je hetzelfde cv later zonder abonnement wilt blijven kunnen gebruiken.',
            'Je kiest op basis van je sollicitatiegedrag en niet alleen op merkbekendheid.',
        ],
        faq: [
            {
                question: 'Wat is het beste Resume.io alternatief in Nederland?',
                answer: 'Voor veel Nederlandse sollicitanten is WerkCV het logischste alternatief, omdat het een smallere Nederlandse cv-flow met eenmalige documentbetaling biedt. Resume.io blijft vooral sterk voor mensen die een bredere carrière-suite zoeken en variabele planstructuren acceptabel vinden.',
            },
            {
                question: 'Is Resume.io altijd een abonnement?',
                answer: 'Nee, niet volgens de officiële help- en pricingpagina\'s. Resume.io zegt zelf dat planvormen per locatie kunnen verschillen en noemt onder meer een trial, 6-maands- en jaarplannen en in sommige landen one-time payments.',
            },
            {
                question: 'Wanneer is Resume.io logischer dan WerkCV?',
                answer: 'Als je juist een grotere internationale suite wilt met extra carrièretools zoals cover letters, Job Tracker, AI Interview Prep en andere aanvullende productlagen.',
            },
            {
                question: 'Wanneer is WerkCV slimmer dan Resume.io?',
                answer: 'Als je vooral zonder planverwarring een sterk cv voor Nederlandse vacatures wilt maken, met duidelijke pricing en dezelfde documentunlock die later opnieuw bruikbaar blijft.',
            },
        ],
        relatedLinks: [
            {
                href: '/resume-io-opzeggen',
                title: 'Resume.io opzeggen',
                description: 'Gebruik deze pagina als je eerst de officiele cancel- en downgrade-informatie wilt checken.',
            },
            {
                href: '/cv-maken-zonder-abonnement',
                title: 'CV maken zonder abonnement',
                description: 'Relevant als jouw alternatief-intentie vooral door billing- en planfrictie wordt gedreven.',
            },
            {
                href: '/templates',
                title: 'WerkCV templates',
                description: 'De snelste manier om te testen of de smallere Nederlandse route in de praktijk al genoeg is.',
            },
        ],
        sources: [
            {
                label: 'Resume.io pricing',
                href: 'https://resume.io/pricing',
                note: 'Officiële pricingpagina met actuele publieke trial-, kwartaal- en free-planvermelding op de internationale site. Gecontroleerd op 19 april 2026.',
            },
            {
                label: 'Resume.io help - What can I do with a premium subscription?',
                href: 'https://help.resume.io/en/articles/3785856',
                note: 'Officiële help-pagina met 7-day trial, 6 months, 1 year, planvariatie per locatie en premium features zoals templates, Job Tracker en AI Interview Prep. Gecontroleerd op 19 april 2026.',
            },
            {
                label: 'Resume.io help - cancel, downgrade or delete your account',
                href: 'https://help.resume.io/en/articles/3784896',
                note: 'Officiële help-pagina met cancel-flow via contact, e-mailbevestiging en gedrag na opzeggen. Gecontroleerd op 19 april 2026.',
            },
            {
                label: 'Resume.io homepage',
                href: 'https://resume.io/',
                note: 'Officiële homepage gebruikt om de bredere suite-positionering te onderbouwen, waaronder job board, auto apply, interview prep en coaching-achtige functies. Gecontroleerd op 19 april 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige prijs per cv en uitleg over later opnieuw bewerken en downloaden.',
            },
        ],
        ctaTitle: 'Zoek je vooral een alternatief voor planverwarring en productbreedte?',
        ctaText: 'Open dan eerst de WerkCV templates en kijk of de rustigere Nederlandse route jouw cv-probleem al volledig oplost.',
        ctaHref: '/templates',
    },
    {
        slug: 'beste-cv-builder-zonder-abonnement',
        locale: 'nl',
        title: 'Beste CV builder zonder abonnement: welke opties zijn er echt?',
        description: 'Direct antwoord voor Nederlandse werkzoekenden die een CV builder zonder abonnement zoeken. Vergelijk WerkCV, Canva Free en Word-webapps, en zie welke grote spelers wél met abonnement werken.',
        metaTitle: 'Beste CV builder zonder abonnement (2026) | WerkCV.nl',
        metaDesc: 'Zoek je een CV builder zonder abonnement? Vergelijk WerkCV, Canva Free en Word-webapps, en zie welke bekende CV-platformen in Nederland wél met proef- of maandabonnementen werken.',
        keywords: [
            'beste cv builder zonder abonnement',
            'cv builder zonder abonnement',
            'cv maken zonder abonnement',
            'cv maker zonder abonnement',
            'cv tool zonder abonnement',
            'cv maker zonder proefperiode',
            'abonnement of eenmalig betalen cv',
        ],
        intro: 'Als je specifiek een CV builder zonder abonnement zoekt, is WerkCV op dit moment de duidelijkste Nederlandse keuze. De meeste grote CV-platformen in Nederland werken namelijk met een proefperiode of maandabonnement, terwijl volledig gratis alternatieven zoals Canva Free of Word-webapps meer handwerk vragen en minder zijn ingericht op een snelle sollicitatieflow.',
        sections: [
            {
                id: 'direct-antwoord',
                title: 'Direct antwoord: welke optie past het best bij jou?',
                paragraphs: [
                    'Niet elke “gratis” of “professionele” CV tool is ook echt zonder abonnement. In de praktijk vallen veel bekende spelers af zodra je specifiek zoekt naar een simpele Nederlandse route zonder proefomslag, maandkosten of opzegstress.',
                    'Voor de meeste werkzoekenden is de keuze daarom minder ingewikkeld dan het lijkt: wil je een echte CV-builder met duidelijke eenmalige betaling, of kies je liever voor een volledig gratis maar meer handmatige route?',
                ],
                comparisonTable: {
                    columns: ['Situatie', 'Beste keuze', 'Waarom'],
                    rows: [
                        {
                            label: 'Je wilt een echte Nederlandse CV-builder zonder abonnement',
                            primary: 'WerkCV',
                            secondary: 'Je start gratis, betaalt eenmalig per CV bij download, en kunt datzelfde document later opnieuw openen en opnieuw downloaden.',
                        },
                        {
                            label: 'Je wilt volledig gratis werken en handmatige opmaak accepteren',
                            primary: 'Word-webapps of vergelijkbare docs-tools',
                            secondary: 'Geen abonnement nodig voor de gratis webversies, maar je bouwt en onderhoudt je opmaak grotendeels zelf.',
                        },
                        {
                            label: 'Je wilt vooral designvrijheid en gratis sjablonen proberen',
                            primary: 'Canva Free',
                            secondary: 'Gratis voor individuen, maar minder gericht op de standaard CV-flow en ATS-rust die veel sollicitanten juist nodig hebben.',
                        },
                        {
                            label: 'Je wilt een breder sollicitatieplatform met extra tools',
                            primary: 'Geen echte no-subscription route',
                            secondary: 'Dan kom je meestal uit bij platformen met proef- of maandabonnementen zoals CVMaker, CV.nl, CVster of maakeencv Pro.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Open eerst de WerkCV templates',
                        description: 'Zo zie je direct of de no-subscription route voor jou al genoeg is.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Bekijk exact hoe WerkCV-pricing werkt',
                        description: 'Handig als je zeker wilt weten wanneer je wel en niet betaalt.',
                    },
                ],
            },
            {
                id: 'welke-vallen-af',
                title: 'Welke bekende CV-platformen vallen af als je echt “zonder abonnement” bedoelt?',
                paragraphs: [
                    'Dit is het onderdeel waar veel zoekresultaten onduidelijk over zijn. Veel platforms laten je gratis starten, maar dat is iets anders dan een blijvende no-subscription route. Zodra je premium templates, PDF-export of extra sollicitatietools wilt gebruiken, verschuift het model vaak naar een proefperiode of maandabonnement.',
                    'Voor iemand die nadrukkelijk zonder abonnement wil werken, zijn dat dus geen echte matches. Ze kunnen prima producten zijn, maar ze beantwoorden niet dezelfde koopvraag.',
                ],
                bullets: [
                    'CVMaker werkt volgens de officiële prijzenpagina met EUR1,99 voor 14 dagen en daarna EUR21,99 per maand.',
                    'CV.nl werkt volgens de officiële pricingpagina met EUR0,99 voor 14 dagen en daarna EUR19,99 per maand.',
                    'CVster werkt volgens de officiële pricingpagina met een 7-daagse proef voor EUR2,95 en daarna EUR14,95 per 4 weken, naast langere premiumopties.',
                    'maakeencv.nl toont op de homepage een gratis plan, maar ook een Pro-plan van EUR12 per maand voor onbeperkte PDF-exports en extra AI-functies.',
                ],
                exampleTitle: 'Praktische conclusie',
                exampleItems: [
                    'Zoek je expliciet zonder abonnement, dan vallen veel bekende CV-sites inhoudelijk al af.',
                    'Zoek je een breder platform en vind je maandtoegang prima, dan zijn die spelers weer wel relevant.',
                    'De vraag is dus niet alleen: welke tool is goed? De vraag is: welk prijsmodel past bij jouw sollicitatiegedrag?',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/werkcv-vs-cvmaker',
                        label: 'Bekijk WerkCV vs CVMaker',
                        description: 'Voor het sterkste voorbeeld van een eenmalig model versus proef- en maandabonnement.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cv-nl',
                        label: 'Bekijk WerkCV vs CV.nl',
                        description: 'Voor de vergelijking met een groter Nederlands sollicitatieplatform.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cvster',
                        label: 'Bekijk WerkCV vs CVster',
                        description: 'Voor de vergelijking met een grotere CV- en briefsuite inclusief ATS-checking.',
                    },
                ],
            },
            {
                id: 'abonnement-of-eenmalig',
                title: 'Abonnement of eenmalig betalen voor je CV: wat is meestal slimmer?',
                paragraphs: [
                    'Deze vergelijking zit vaak onder zoektermen als “cv maker zonder proefperiode” of “abonnement of eenmalig betalen cv”. De onderliggende vraag is meestal niet technisch, maar economisch: hoe wil je eigenlijk betalen voor een tool die je waarschijnlijk maar tijdelijk nodig hebt?',
                    'Voor de meeste werkzoekenden is een eenmalige betaling logischer zodra je maar een of enkele CV-versies wilt afronden. Een abonnement wordt pas rationeler als je langere tijd actief solliciteert en extra platformlagen ook echt gebruikt.',
                ],
                comparisonTable: {
                    columns: ['Situatie', 'Eenmalig betalen', 'Abonnement'],
                    rows: [
                        {
                            label: 'Je wilt vooral 1 of 2 goede CV-versies afronden',
                            primary: 'Meestal het logischste model, omdat je betaalt voor een concreet document en daarna klaar bent.',
                            secondary: 'Vaak meer doorlopende toegang dan je echt nodig hebt voor dezelfde taak.',
                        },
                        {
                            label: 'Je wilt geen proefperiode of verlengdatum hoeven bewaken',
                            primary: 'Past beter, omdat er geen trial-naar-maandstructuur boven je document hangt.',
                            secondary: 'Minder passend als je juist die proef- en maandstructuur wilt accepteren.',
                        },
                        {
                            label: 'Je wilt maandenlang CV, brief, tracker en extra tools gebruiken',
                            primary: 'Kan nog steeds prima zijn, maar de prijslogica is dan minder het hoofdargument.',
                            secondary: 'Kan rationeel zijn als je die extra functies echt intensief gebruikt.',
                        },
                    ],
                },
                bullets: [
                    'Een eenmalig model voelt meestal beter zodra jouw echte doel één nette sollicitatie-PDF is.',
                    'Een abonnementsmodel wordt pas sterker als je ook de bredere suite rond dat CV wilt gebruiken.',
                    'Wie vooral op “zonder proefperiode” zoekt, zoekt meestal rust in billing en niet per se de laagste startprijs.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-zonder-abonnement',
                        label: 'Bekijk de eenmalige route zonder abonnement',
                        description: 'Handig als je de transactionele pagina achter deze vergelijking wilt zien.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer wanneer je precies betaalt',
                        description: 'Gebruik dit als je vooral op betaalmoment en downloadlogica vergelijkt.',
                    },
                ],
            },
            {
                id: 'beste-keuze-per-type',
                title: 'Beste keuze per type gebruiker',
                paragraphs: [
                    'De beste no-subscription optie verschilt nog steeds per type gebruiker. Sommige mensen willen een echte CV-builder die het meeste werk uit handen neemt. Anderen willen juist niets betalen en accepteren dan extra handwerk in lay-out en export.',
                    'Daarom is het nuttiger om te kiezen op gebruikssituatie dan op marketingclaim.',
                ],
                exampleTitle: 'Kies zo',
                exampleItems: [
                    'Kies WerkCV als je een echte CV-builder wilt zonder abonnement, met Nederlandse focus en een duidelijke eenmalige downloadprijs.',
                    'Kies Canva Free als je gratis wilt ontwerpen en designvrijheid belangrijker vindt dan een snelle standaard sollicitatieflow.',
                    'Kies Word-webapps of vergelijkbare docs-tools als je volledig gratis wilt werken en bereid bent de opmaak zelf te bouwen en te onderhouden.',
                ],
                bullets: [
                    'WerkCV is het sterkst als je snel wilt schrijven, vergelijken en afronden zonder doorlopende kosten.',
                    'Canva Free is sterker als je vooral op design speelt en zelf goed kunt beoordelen of je CV nog rustig en scanbaar blijft.',
                    'Word-webapps zijn sterker als je maximale eenvoud en nul tool-lock-in wilt, maar je levert tijd in op opmaak en consistentie.',
                ],
                intentLinks: [
                    {
                        href: '/ats-cv-template',
                        label: 'Gebruik de ATS-veilige route als scanbaarheid voorop staat',
                        description: 'Handig als je bang bent dat design ten koste gaat van recruiter- of ATS-leesbaarheid.',
                    },
                    {
                        href: '/cv-maken-in-word',
                        label: 'Bekijk eerst de Word-route als je alles handmatig wilt doen',
                        description: 'Goed om de trade-off tussen gratis en tijdsinvestering scherp te zien.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'Een eerlijke no-subscription gids moet ook zeggen wanneer WerkCV níet wint. Als je absoluut niets wilt betalen, dan zijn Word-webapps of Canva Free logischer. Als je juist een breder platform met vacatures, tracker, sollicitatiebrieven, ATS-checking of grotere suitefuncties wilt, dan kijk je eerder naar tools die wel met premiumplannen werken.',
                    'WerkCV is dus niet “beste” in elke situatie. WerkCV is vooral de beste keuze als je een echte CV-builder wilt zonder abonnement, niet als je ofwel volledig gratis wilt blijven of juist een grote sollicitatiesuite wilt gebruiken.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je volledig gratis wilt blijven en geen bezwaar hebt tegen extra handwerk.',
                    'Niet kiezen voor WerkCV als je vooral een grotere suite met tracker, jobs of uitgebreide brief- en ATS-tools zoekt.',
                    'Wel kiezen voor WerkCV als je de combinatie zoekt van echte builder + geen abonnement + duidelijke Nederlandse sollicitatiefocus.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste Nederlandse sollicitanten',
                paragraphs: [
                    'Voor de meeste mensen die zoeken op “beste CV builder zonder abonnement” is WerkCV de meest logische uitkomst. Niet omdat gratis alternatieven nutteloos zijn, maar omdat die meestal meer handwerk vragen. En niet omdat andere CV-platformen slecht zijn, maar omdat die vaak juist niet zonder abonnement werken.',
                    'De praktische regel is simpel: begin met de kleinste tool die jouw probleem volledig oplost. Als je een echte builder wilt zonder maandkosten, is WerkCV de duidelijkste route. Als je gratis wilt blijven koste wat kost, kies dan bewust voor een handmatige tool en accepteer de extra tijd en opmaakverantwoordelijkheid.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start direct zonder abonnement met een template',
                        description: 'De snelste manier om te testen of WerkCV voor jouw sollicitaties al genoeg is.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Controleer nog één keer het eenmalige model',
                        description: 'Handig als je specifiek op prijsstructuur vergelijkt.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu het verschil tussen gratis starten en echt zonder abonnement werken.',
            'Je weet welke bekende CV-platformen in Nederland wél met proef- of maandabonnementen werken.',
            'Je weet of jij een echte builder zoekt of een gratis handmatige route.',
            'Je kiest op basis van jouw sollicitatiegedrag, niet alleen op basis van “gratis” of “premium” labels.',
            'Je begrijpt dat eenvoud voor veel werkzoekenden waardevoller is dan extra features die ze niet gebruiken.',
        ],
        faq: [
            {
                question: 'Wat is de beste CV builder zonder abonnement in Nederland?',
                answer: 'Voor mensen die een echte Nederlandse CV-builder zonder abonnement zoeken, is WerkCV de duidelijkste keuze. Je start gratis en betaalt alleen eenmalig per CV wanneer je wilt downloaden.',
            },
            {
                question: 'Bestaat er ook een cv maker zonder proefperiode?',
                answer: 'Ja. WerkCV laat je gratis starten zonder eerst een proefabonnement te activeren. De betaling volgt pas wanneer je jouw definitieve CV als PDF wilt downloaden.',
            },
            {
                question: 'Zijn CVMaker, CV.nl en CVster zonder abonnement?',
                answer: 'Nee, niet in de strikte zin. Volgens hun officiële pricingpagina’s werken deze platforms met een proefperiode en daarna een maand- of premiumplan.',
            },
            {
                question: 'Wat is meestal slimmer: abonnement of eenmalig betalen voor een CV?',
                answer: 'Voor iemand die vooral een of enkele CV-versies wil afronden is een eenmalige betaling meestal logischer. Een abonnement wordt vooral rationeel als je langere tijd actief solliciteert en extra functies zoals tracker, briefbuilder of grotere suite-toegang ook echt gebruikt.',
            },
            {
                question: 'Wat is beter: WerkCV of Canva Free?',
                answer: 'WerkCV is beter als je een echte sollicitatiegerichte CV-builder wilt. Canva Free is beter als je volledig gratis wilt ontwerpen en extra handmatige opmaak prima vindt.',
            },
            {
                question: 'Kan ik ook helemaal gratis een CV maken zonder abonnement?',
                answer: 'Ja, bijvoorbeeld met gratis web-apps of Canva Free. De trade-off is meestal dat je meer zelf moet doen in structuur, opmaak en consistentie dan in een echte CV-builder.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-maken-zonder-abonnement',
                title: 'CV maken zonder abonnement',
                description: 'Gebruik deze pagina als je direct door wilt naar de transactionele route rond eenmalig betalen.',
            },
            {
                href: '/templates',
                title: 'WerkCV templates',
                description: 'Open eerst de templates en kijk of de no-subscription route al genoeg is voor jouw sollicitaties.',
            },
            {
                href: '/prijzen',
                title: 'WerkCV prijzen',
                description: 'Bekijk precies hoe het eenmalige model werkt en wanneer je wel of niet betaalt.',
            },
            {
                href: '/cv-gids/werkcv-vs-cvmaker',
                title: 'WerkCV vs CVMaker',
                description: 'Sterke vervolgstap als je eenmalig betalen wilt vergelijken met een proef- en maandabonnement.',
            },
        ],
        sources: [
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'CVMaker prijzen',
                href: 'https://www.cvmaker.nl/prijzen',
                note: 'Officiële prijzenpagina met EUR1,99 voor 14 dagen en daarna EUR21,99 per maand. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CV.nl pricing',
                href: 'https://www.cv.nl/pricing',
                note: 'Officiële prijzenpagina met EUR0,99 voor 14 dagen en daarna EUR19,99 per maand. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVster pricing',
                href: 'https://cvster.nl/pricing',
                note: 'Officiële prijzenpagina met proef- en premiumstructuur: EUR2,95 voor 7 dagen en daarna EUR14,95 per 4 weken, plus langere premiumopties. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVster gratis gebruiken',
                href: 'https://help.cvster.nl/article/267-hoe-kan-ik-cvsternl-gratis-gebruiken',
                note: 'Officiële help-pagina met huidige gratis limieten: één CV, één sollicitatiebrief, TXT-download en beperkt aantal gratis PDF-sjablonen.',
            },
            {
                label: 'maakeencv.nl homepage',
                href: 'https://www.maakeencv.nl/',
                note: 'Homepage toont gratis plan en Pro-plan van EUR12 per maand. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Canva Pro / Canva Free',
                href: 'https://www.canva.com/pro/',
                note: 'Officiële productpagina bevestigt dat Canva Free altijd beschikbaar is voor individuen en Canva Pro de premiumlaag is.',
            },
            {
                label: 'Microsoft 365 gratis web-apps',
                href: 'https://support.microsoft.com/nl-nl/office/wat-is-het-verschil-tussen-een-betaald-microsoft-365-abonnement-en-de-gratis-web-apps-7c813f33-d3bf-4e5b-9b92-dcab8ae910d2',
                note: 'Officiële Microsoft supportpagina die bevestigt dat gratis webversies van Word, Excel en PowerPoint beschikbaar zijn zonder betaald Microsoft 365 Personal- of Family-abonnement.',
            },
        ],
        ctaTitle: 'Wil je een echte CV-builder zonder abonnement?',
        ctaText: 'Begin dan met een WerkCV template, bouw je versie gratis op en beslis pas op het einde of je jouw PDF wilt downloaden.',
        ctaHref: '/templates',
    },
    {
        slug: 'cv-na-vaststellingsovereenkomst',
        locale: 'nl',
        title: 'CV na vaststellingsovereenkomst: zo solliciteer je sterk verder',
        description: 'Praktische gids voor werknemers die na een vaststellingsovereenkomst opnieuw gaan solliciteren. Leer wat je wel en niet op je cv zet, hoe je een gap uitlegt en welke afspraken eerst aandacht vragen.',
        metaTitle: 'CV na vaststellingsovereenkomst (2026) | WW, referenties en sterke cv-opbouw | WerkCV.nl',
        metaDesc: 'CV na vaststellingsovereenkomst? Leer wat je wel en niet op je cv zet, hoe je een gap uitlegt, wat je eerst checkt rond WW en opzegtermijn, en hoe je sterk verder solliciteert.',
        keywords: [
            'cv na vaststellingsovereenkomst',
            'vaststellingsovereenkomst cv',
            'vso cv',
            'solliciteren na vaststellingsovereenkomst',
            'cv na beeindigingsovereenkomst',
            'cv na ontslag met wederzijds goedvinden',
            'vso solliciteren',
        ],
        intro: 'Een vaststellingsovereenkomst verandert niet automatisch hoe je cv eruit moet zien, maar wél waar je eerst scherp op moet zijn. Zolang je overeenkomst juridisch klopt, hoeft je cv meestal geen uitlegdocument te worden. Je laatste functie blijft gewoon op je cv staan; de echte vraag is hoe je de periode erna positioneert, welke afspraken je eerst moet controleren en hoe je rustig verder solliciteert zonder jezelf onnodig te verzwakken.',
        sections: [
            {
                id: 'direct-antwoord',
                title: 'Direct antwoord: wat verandert er op je cv na een vaststellingsovereenkomst?',
                paragraphs: [
                    'Op je cv verandert vooral de context, niet de basisstructuur. Je laatste functie blijft vermeld met functietitel, werkgever en einddatum. Je hoeft niet letterlijk op je cv te zetten dat je een vaststellingsovereenkomst hebt getekend. Voor recruiters is vooral belangrijk dat je tijdlijn klopt en dat je verhaal in een gesprek rustig en consistent is.',
                    'Het echte werk zit meestal vóórdat je je cv gaat herschrijven. Bij een vaststellingsovereenkomst moet je eerst zeker weten dat afspraken over WW, opzegtermijn, eventuele vergoeding, vrijstelling van werk en referenties logisch zijn vastgelegd. Pas daarna maak je je cv klaar voor de volgende stap.',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'Eerst checken in je vso', 'Voor je cv betekent dit'],
                    rows: [
                        {
                            label: 'Initiatief voor ontslag',
                            primary: 'Het moet duidelijk zijn dat het initiatief bij de werkgever ligt als je WW veilig wilt houden.',
                            secondary: 'Niet letterlijk op je cv vermelden; wel belangrijk voor je sollicitatieverhaal en uitkeringspositie.',
                        },
                        {
                            label: 'Opzegtermijn',
                            primary: 'Controleer of de juiste opzegtermijn is opgenomen, omdat WW pas na die termijn ingaat.',
                            secondary: 'Bepaalt of er een zichtbare periode tussen je einddatum en nieuwe sollicitaties kan ontstaan.',
                        },
                        {
                            label: 'Referenties en getuigschrift',
                            primary: 'Leg vast of je een neutrale referentie of getuigschrift krijgt.',
                            secondary: 'Helpt je gesprek en vervolgstappen, maar hoeft niet als uitleg op je cv zelf te staan.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/tools/ww-recht-checker',
                        label: 'Controleer eerst je WW-recht',
                        description: 'Handig als je wilt voorkomen dat een fout in de overeenkomst later je uitkering schaadt.',
                    },
                    {
                        href: '/tools/opzegtermijn-berekenen',
                        label: 'Check de juiste opzegtermijn',
                        description: 'Relevant omdat een verkeerde termijn je WW-timing en planning beïnvloedt.',
                    },
                ],
            },
            {
                id: 'wat-eerst-checken',
                title: 'Wat je eerst in je vaststellingsovereenkomst moet checken voordat je gaat solliciteren',
                paragraphs: [
                    'Een vso is geen puur hr-document maar een bindende afspraak. Daarom is het onverstandig om direct naar je cv te springen zonder eerst de basis te controleren. Officiële UWV-informatie en de checklist van het Juridisch Loket leggen steeds dezelfde nadruk: controleer of het initiatief bij de werkgever ligt, of de ontslagreden neutraal is, of er geen dringende reden wordt genoemd, en of de juiste opzegtermijn is afgesproken.',
                    'Extra opletpunt: als je ziek bent of in een re-integratietraject zit, is een vso veel risicovoller. UWV waarschuwt daar expliciet voor. In dat scenario hoort juridische controle vóór alles te gaan. Voor je cv betekent dit vooral dat je geen verhaal moet publiceren of herhalen zolang de juridische basis nog niet scherp is.',
                ],
                bullets: [
                    'Controleer of jouw werkgever het initiatief tot beëindiging neemt.',
                    'Controleer of de ontslagreden neutraal is en niet jouw schuld suggereert.',
                    'Controleer de opzegtermijn, omdat WW pas daarna start.',
                    'Controleer afspraken over vergoeding, vakantiedagen, bonus en vrijstelling van werk.',
                    'Regel liefst ook een referentieafspraak of getuigschrift zolang de verhoudingen nog werkbaar zijn.',
                ],
                intentLinks: [
                    {
                        href: '/tools/transitievergoeding-berekenen',
                        label: 'Gebruik ook de transitievergoeding-check als referentiepunt',
                        description: 'Handig om je onderhandelingspositie rond vergoeding beter te begrijpen.',
                    },
                ],
            },
            {
                id: 'laatste-functie-op-cv',
                title: 'Zo zet je je laatste functie op je cv na ontslag met wederzijds goedvinden',
                paragraphs: [
                    'Je laatste functie beschrijf je in principe hetzelfde als na elk ander einde van een dienstverband: rol, werkgever, periode en daarna je belangrijkste resultaten. De vaststellingsovereenkomst verandert niets aan wat je in die functie hebt gepresteerd. Vermijd daarom defensieve taal of indirecte uitleg in je werkervaring. Een recruiter wil eerst zien wat je hebt gedaan, niet onder welke juridische vorm je bent vertrokken.',
                    'Als je direct door kunt solliciteren zonder zichtbare gap, is je cv vaak verrassend eenvoudig: niets extra uitleggen, gewoon je normale professionele verhaal laten staan. Pas als er later een periode tussen zit, ga je nadenken over een korte neutrale toelichting op je tijdlijn.',
                ],
                bullets: [
                    'Laat je functietitel, bedrijfsnaam en periode normaal staan.',
                    'Focus in bullets op resultaten, projecten en verantwoordelijkheid.',
                    'Zet niet op je cv: "vertrokken via vso" of "ontslag met wederzijds goedvinden".',
                    'Bewaar uitleg over vertrek voor het gesprek, niet voor je werkervaring-sectie.',
                ],
                intentLinks: [
                    {
                        href: '/cv-tips/cv-na-ontslag',
                        label: 'Lees de bredere gids voor cv na ontslag',
                        description: 'Handig als je naast de vso-vorm ook de emotionele en praktische doorstart wilt aanpakken.',
                    },
                ],
            },
            {
                id: 'gap-en-profieltekst',
                title: 'Vrijstelling van werk, opzegtermijn en een eventuele gap op je cv',
                paragraphs: [
                    'Een vso leidt vaak tot vrijstelling van werk of tot een periode waarin je niet meer actief werkt maar formeel nog wel in dienst bent. Daardoor ontstaat verwarring: welke datum zet je op je cv, en wanneer wordt het een gap? Voor recruiters is meestal alleen relevant wanneer je functie feitelijk of formeel eindigde en of jouw tijdlijn logisch leest. Je hoeft vrijstelling van werk niet als aparte entry op te nemen.',
                    'Ontstaat er daarna een zichtbare zoekperiode, houd de uitleg kort. Bijvoorbeeld: gerichte oriëntatie, bijscholing of freelance opdrachten. Laat je profieltekst daarna vooral weer draaien om richting, specialisatie en inzetbaarheid. Je cv moet geen verlengstuk van de overeenkomst worden.',
                ],
                bullets: [
                    'Vrijstelling van werk hoef je niet als aparte cv-regel te benoemen.',
                    'Een korte zoekperiode hoeft vaak geen uitgebreide toelichting.',
                    'Bij een langere periode noem je kort wat je deed: oriëntatie, cursus of projectwerk.',
                    'Herschrijf je profieltekst naar je volgende stap, niet naar je vertrekregeling.',
                ],
                intentLinks: [
                    {
                        href: '/cv-tips/gat-in-cv-uitleggen',
                        label: 'Gebruik de gat-in-cv gids voor je formulering',
                        description: 'Nuttig als de periode na je vso zichtbaar wordt op je tijdlijn.',
                    },
                    {
                        href: '/cv-tips/profieltekst-schrijven',
                        label: 'Werk daarna je profieltekst weer scherp naar voren',
                        description: 'Zo blijft de bovenkant van je cv toekomstgericht in plaats van verdedigend.',
                    },
                ],
            },
            {
                id: 'gesprek-en-referenties',
                title: 'Hoe leg je een vaststellingsovereenkomst uit in een gesprek?',
                paragraphs: [
                    'In gesprekken geldt hetzelfde principe als op je cv: rustig, feitelijk en zonder overuitleg. Een vaststellingsovereenkomst is voor recruiters geen exotisch begrip. Wat telt is dat jij kalm kunt uitleggen dat het dienstverband in onderling overleg is beëindigd, dat de situatie correct is afgerond en dat jij nu gericht verder kijkt.',
                    'Sterker nog: de kwaliteit van je uitleg hangt vaak samen met de afspraken die je vooraf hebt vastgelegd. Als je al een neutrale referentie, een getuigschrift of een heldere einddatum hebt, wordt het sollicitatiegesprek automatisch simpeler. Daarom is de onderhandeling over je vertrekregeling direct verbonden aan je latere cv- en sollicitatiepositie.',
                ],
                bullets: [
                    'Houd je uitleg in het gesprek kort en zakelijk.',
                    'Leg de nadruk op afronding en je volgende stap, niet op conflict of details.',
                    'Gebruik een referentie of getuigschrift als extra rustsignaal als dat geregeld is.',
                ],
                intentLinks: [
                    {
                        href: '/cv-tips/sollicitatiegesprek-voorbereiden',
                        label: 'Bereid je gesprek daarna breder voor',
                        description: 'Handig als je je vertrek rustig wilt kunnen toelichten zonder het gesprek te laten kantelen.',
                    },
                ],
            },
            {
                id: 'extra-opletpunten',
                title: 'Extra opletten bij ziekte, burnout of re-integratie',
                paragraphs: [
                    'Dit is het punt waar een vso snel geen gewone sollicitatievraag meer is maar een risicovolle juridische situatie. UWV en het Juridisch Loket zijn daar duidelijk over: als je ziek bent of korter dan twee jaar ziek bent geweest, is het meestal onverstandig om zomaar te tekenen. Een fout hier raakt niet alleen je cv, maar juist je loon- en uitkeringspositie.',
                    'Voor de pagina-intentie betekent dit iets belangrijks: een sterk cv is niet de eerste stap als je nog in een ziekterisico of re-integratietraject zit. Dan moet eerst de overeenkomst juridisch kloppen. Pas daarna ga je verder met de normale sollicitatieroute.',
                ],
                bullets: [
                    'Teken niet lichtzinnig als je ziek bent of nog in re-integratie zit.',
                    'Laat juridische controle voorrang krijgen op cv-optimalisatie.',
                    'Gebruik daarna pas de reguliere cv-routes als de basis veilig is.',
                ],
                intentLinks: [
                    {
                        href: '/cv-tips/cv-na-loopbaanonderbreking',
                        label: 'Gebruik de terugkeergids als ziekte of herstel ook meespeelt',
                        description: 'Handig wanneer je overeenkomst en je terugkeer op de arbeidsmarkt door elkaar lopen.',
                    },
                ],
            },
        ],
        checklist: [
            'Je hebt gecontroleerd of het initiatief in de vso bij de werkgever ligt.',
            'Je hebt de opzegtermijn en WW-gevolgen gecontroleerd voordat je gaat tekenen.',
            'Je laatste functie staat gewoon normaal op je cv, zonder juridische uitleg in de werkervaring.',
            'Een eventuele zoekperiode is kort en neutraal geformuleerd.',
            'Je hebt bedacht hoe je de vso in één rustig gespreksscript uitlegt.',
        ],
        faq: [
            {
                question: 'Moet ik op mijn cv zetten dat ik een vaststellingsovereenkomst heb getekend?',
                answer: 'Nee. Op je cv vermeld je normaal gesproken alleen je functie, werkgever en einddatum. De vorm van het vertrek hoort meestal niet in je werkervaring-sectie thuis, maar komt hooguit later in een gesprek kort ter sprake.',
            },
            {
                question: 'Krijg ik WW na een vaststellingsovereenkomst?',
                answer: 'Dat kan, maar alleen als de overeenkomst correct is opgesteld. UWV benadrukt onder meer dat het initiatief bij de werkgever moet liggen, dat de ontslagreden neutraal moet zijn en dat de juiste opzegtermijn moet worden gerespecteerd.',
            },
            {
                question: 'Wat als ik ziek ben en een vso krijg aangeboden?',
                answer: 'Dan moet juridische controle voorrang krijgen. UWV en het Juridisch Loket waarschuwen dat tekenen tijdens ziekte of vóór afronding van een re-integratietraject je uitkerings- en loonpositie kan schaden.',
            },
            {
                question: 'Hoe leg ik een vaststellingsovereenkomst uit in een sollicitatiegesprek?',
                answer: 'Kort en zakelijk. Zeg bijvoorbeeld dat het dienstverband in onderling overleg is beëindigd, dat de situatie correct is afgerond en dat je nu gericht verder solliciteert. Vermijd lange uitleg of emotionele details.',
            },
        ],
        relatedLinks: [
            {
                href: '/tools/ww-recht-checker',
                title: 'WW-recht checker',
                description: 'Gebruik deze check eerst als je wilt weten hoe sterk je uitkeringspositie na de overeenkomst waarschijnlijk is.',
            },
            {
                href: '/tools/opzegtermijn-berekenen',
                title: 'Opzegtermijn berekenen',
                description: 'Controleer of de opgenomen termijn logisch is voordat je de overeenkomst tekent of je timing plant.',
            },
            {
                href: '/cv-tips/cv-na-ontslag',
                title: 'CV na ontslag',
                description: 'Gebruik daarna deze gids voor de bredere cv-doorstart na je vertrek.',
            },
        ],
        sources: [
            {
                label: 'UWV - Wanneer kan een werknemer worden ontslagen',
                href: 'https://www.uwv.nl/nl/ontslag/werknemer-ontslaan',
                note: 'Officiële UWV-pagina over ontslag, vaststellingsovereenkomst, WW-relevante afspraken en de rol van de opzegtermijn. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'UWV - Wanneer heeft u recht op WW?',
                href: 'https://www.uwv.nl/nl/ww/wanneer-recht-op-ww',
                note: 'Officiële UWV-pagina die bevestigt dat werknemers met een getekende vaststellingsovereenkomst mogelijk recht op WW hebben als aan de voorwaarden is voldaan. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'UWV - WW na ontslag',
                href: 'https://www.uwv.nl/nl/ww/ww-na-ontslag',
                note: 'Officiële UWV-pagina met uitleg over WW na ontslag door de werkgever en de rol van de vaststellingsovereenkomst. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'Juridisch Loket - Checklist VSO',
                href: 'https://media.juridischloket.nl/Checklist_vso_2025_bfcb492af0.pdf',
                note: 'Officiële checklist met aandachtspunten zoals initiatief werkgever, neutrale ontslagreden, geen dringende reden, opzegtermijn en ziekte. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'UWV - Ontslag tijdens ziekte',
                href: 'https://www.uwv.nl/particulieren/ontslag/ik-word-ontslagen/detail/ontslag-wegens-langdurige-arbeidsongeschiktheid/hoe-gaat-de-ontslagprocedure-via-uwv-als-ik-ziek-ben',
                note: 'Officiële UWV-pagina die expliciet waarschuwt voor het tekenen van een vaststellingsovereenkomst tijdens ziekte. Gecontroleerd op 18 april 2026.',
            },
            {
                label: 'Indeed - Solliciteren na vaststellingsovereenkomst',
                href: 'https://nl.indeed.com/carrieregids/ontwikkeling/solliciteren-na-vaststellingsovereenkomst',
                note: 'Nederlandstalige sollicitatiecontext gebruikt als aanvullende bron voor de vertaalslag van overeenkomst naar sollicitatie-aanpak. Gecontroleerd op 18 april 2026.',
            },
        ],
        ctaTitle: 'Is je overeenkomst inhoudelijk scherp genoeg? Ga daarna pas naar je cv',
        ctaText: 'Als je vso klopt, is de volgende stap simpel: bouw een rustig, recruiter-proof cv en stuur je verhaal weer naar voren in plaats van naar je vertrekregeling.',
        ctaHref: '/templates',
    },
    {
        slug: 'welke-cv-builder-past-bij-jou-in-nederland',
        locale: 'nl',
        title: 'Welke CV builder past bij jou in Nederland?',
        description: 'Praktische keuzehulp voor Nederlandse werkzoekenden. Zie wanneer WerkCV, CV.nl, CVMaker, CVster, Canva Free of gratis Word-webapps het best passen bij jouw sollicitatiestijl.',
        metaTitle: 'Welke CV builder past bij jou in Nederland? (2026) | WerkCV.nl',
        metaDesc: 'Twijfel je tussen WerkCV, CV.nl, CVMaker, CVster, Canva of Word? Gebruik deze Nederlandse keuzehulp per situatie: zonder abonnement, breder platform, gratis route of design-focus.',
        keywords: [
            'welke cv builder past bij jou',
            'beste cv builder nederland',
            'cv builder vergelijken nederland',
            'welke cv tool kiezen',
            'cv maken tool vergelijken',
        ],
        intro: 'Zoek je vooral zonder abonnement snel één sterk CV, kies dan meestal WerkCV. Zoek je een breder sollicitatieplatform met vacatures, tracker, sollicitatiebrieven of ATS-tooling, kijk dan eerder naar CV.nl, CVMaker of CVster. Wil je volledig gratis blijven, dan passen Canva Free of gratis Microsoft 365-webapps beter, maar met meer handwerk.',
        sections: [
            {
                id: 'directe-keuze',
                title: 'Directe keuzehulp: dit past meestal het best',
                paragraphs: [
                    'De meeste mensen vergelijken CV-builders op te veel losse features en te weinig op hun eigen sollicitatiegedrag. Daardoor kiezen ze vaak een te groot platform voor een klein probleem, of juist een gratis tool die later veel extra tijd kost.',
                    'De slimste keuze is meestal de kleinste tool die jouw probleem volledig oplost. Daarom werkt deze pagina niet met een algemene top-10, maar met concrete situaties die in Nederland echt voorkomen.',
                ],
                comparisonTable: {
                    columns: ['Situatie', 'Beste route', 'Waarom'],
                    rows: [
                        {
                            label: 'Je wilt snel één sterk CV zonder abonnement',
                            primary: 'WerkCV',
                            secondary: 'Nederlandse CV-flow, gratis starten, daarna eenmalig betalen per CV bij download en datzelfde document later opnieuw gebruiken.',
                        },
                        {
                            label: 'Je wilt een breder Nederlands sollicitatieplatform',
                            primary: 'CV.nl',
                            secondary: 'CV, sollicitatiebrief, vacatures, sollicitaties bijhouden en app in één bredere omgeving.',
                        },
                        {
                            label: 'Je wilt een groter carrièreplatform met veel sjablonen en begeleidende functies',
                            primary: 'CVMaker',
                            secondary: 'Brede suite met 20+ CV- en briefsjablonen, AI-hulp en vacature- / begeleidingselementen.',
                        },
                        {
                            label: 'Je wilt een uitgebreide CV- en briefsuite met ATS-checker',
                            primary: 'CVster',
                            secondary: 'Grotere internationale suite met ATS-checker, meerdere downloadroutes en meer documentopties.',
                        },
                        {
                            label: 'Je wilt vooral gratis ontwerpen en veel designvrijheid',
                            primary: 'Canva Free',
                            secondary: 'Altijd gratis voor individuen, maar minder gericht op de standaard Nederlandse sollicitatieflow.',
                        },
                        {
                            label: 'Je wilt volledig gratis en alles handmatig kunnen doen',
                            primary: 'Microsoft 365-webapps / Word voor het web',
                            secondary: 'Gratis webversies zonder betaald abonnement, maar je doet meer zelf in opmaak, structuur en consistentie.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om te testen of een kleine no-subscription route al genoeg is.',
                    },
                    {
                        href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                        label: 'Lees eerst de no-subscription keuzehulp',
                        description: 'Handig als prijsmodel voor jou het belangrijkste beslispunt is.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je vooral resultaat zonder abonnementsfrictie wilt',
                paragraphs: [
                    'WerkCV is het sterkst voor mensen die niet op zoek zijn naar een groot platform, maar naar een snelle route van inhoud naar een goed sollicitatieklaar CV. Dat is voor veel Nederlandse werkzoekenden precies het echte probleem: niet meer features, maar minder gedoe.',
                    'Als je gratis wilt starten, rustig templates wilt vergelijken, en pas wilt betalen wanneer jouw document klaar is, dan past WerkCV meestal beter dan de bredere abonnementsplatformen. Zeker als je weet dat je geen vacatures, tracker of uitgebreide suite nodig hebt om een goede sollicitatie te versturen.',
                ],
                bullets: [
                    'Je wilt geen proefperiode of maandbedrag hoeven onthouden.',
                    'Je wilt een rustige editorflow die je snel naar een recruiter-veilige PDF brengt.',
                    'Je wilt later kunnen terugkomen op hetzelfde CV om het bij te werken of opnieuw te downloaden.',
                ],
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk de WerkCV-pricing',
                        description: 'Controleer hoe eenmalig betalen per CV precies werkt.',
                    },
                    {
                        href: '/faq',
                        label: 'Lees hoe opnieuw bewerken en downloaden werkt',
                        description: 'Handig als je meerdere vacaturevarianten wilt maken vanuit hetzelfde document.',
                    },
                ],
            },
            {
                id: 'kies-platform',
                title: 'Kies een groter platform als jouw sollicitatieproces breder is dan alleen je CV',
                paragraphs: [
                    'Soms is een compacte builder gewoon niet genoeg. Als je ook sollicitatiebrieven wilt genereren, vacatures wilt bekijken, sollicitaties wilt volgen of extra checks wilt gebruiken, dan zijn grotere platformen inhoudelijk beter passend dan WerkCV.',
                    'Het verschil tussen die platformen zit vooral in focus. CV.nl voelt het meest als een Nederlands sollicitatieplatform. CVMaker positioneert zich als een breder carrièreplatform. CVster leunt meer op een grotere internationale suite met extra document- en ATS-functionaliteit.',
                ],
                exampleTitle: 'Praktische vuistregel',
                exampleItems: [
                    'Kies CV.nl als je vooral een Nederlandse all-in-one sollicitatieomgeving wilt met vacatures en tracker.',
                    'Kies CVMaker als je een groot carrièreplatform wilt met veel sjablonen en begeleidende functies.',
                    'Kies CVster als je extra waarde ziet in ATS-checking, meerdere documenttypes en bredere suitefuncties.',
                ],
                bullets: [
                    'Die platformen zijn vaak logischer als je langer en actiever in een sollicitatieproces zit.',
                    'Daar staat tegenover dat ze meestal met proef- of abonnementsmodellen werken in plaats van een eenmalige CV-prijs.',
                    'Dus de vraag is niet alleen welke tool het meeste kan, maar welke tool het beste past bij hoe lang en hoe breed jij wilt werken.',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/werkcv-vs-cv-nl',
                        label: 'Bekijk WerkCV vs CV.nl',
                        description: 'Voor de keuze tussen compacte CV-route en Nederlandse all-in-one sollicitatieomgeving.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cvmaker',
                        label: 'Bekijk WerkCV vs CVMaker',
                        description: 'Voor de keuze tussen eenmalig CV-model en breder carrièreplatform.',
                    },
                    {
                        href: '/cv-gids/werkcv-vs-cvster',
                        label: 'Bekijk WerkCV vs CVster',
                        description: 'Voor de keuze tussen rustige builder en bredere suite met ATS-checker.',
                    },
                ],
            },
            {
                id: 'kies-gratis',
                title: 'Kies gratis tools alleen als je bewust meer handwerk accepteert',
                paragraphs: [
                    'Volledig gratis tools kunnen absoluut voldoende zijn, maar ze lossen een ander probleem op. Ze verlagen je kosten, niet per se je inspanning. Canva Free en Microsoft 365-webapps zijn nuttig als je geen geld wilt uitgeven, maar ze geven je minder sollicitatiegerichte begeleiding en meer verantwoordelijkheid voor structuur en opmaak.',
                    'Dat is niet erg als je daar goed in bent of veel tijd hebt. Het is wel relevant als je eigenlijk vooral snelheid, rust en een recruiter-proof document wilt. Dan blijkt een kleine builder vaak meer waard dan “gratis” alleen.',
                ],
                bullets: [
                    'Canva Free is nuttig voor designvrijheid, maar je moet zelf bewaken dat het CV rustig en scanbaar blijft.',
                    'Gratis Word- of docs-webapps zijn nuttig als je volledige controle wilt, maar ze kosten vaak meer tijd in opmaak en consistentie.',
                    'Voor sollicitanten die snel willen afronden, is volledig gratis dus niet automatisch de slimste keuze.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken-in-word',
                        label: 'Bekijk eerst de Word-route',
                        description: 'Goed om het verschil tussen gratis handmatig werken en een builder scherp te zien.',
                    },
                    {
                        href: '/ats-cv-template',
                        label: 'Gebruik de ATS-veilige route als structuur belangrijker is dan design',
                        description: 'Handig als je bang bent dat gratis design-tools te veel ruis toevoegen.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de juiste keuze is',
                paragraphs: [
                    'WerkCV is niet de juiste keuze als je ofwel volledig gratis wilt blijven, of juist expliciet een brede sollicitatiesuite zoekt. In het eerste geval zijn handmatige gratis tools logischer. In het tweede geval passen CV.nl, CVMaker of CVster vaak beter, afhankelijk van het soort platformlaag dat je zoekt.',
                    'WerkCV wint dus niet omdat het “alles kan”, maar omdat het een heel specifiek probleem goed oplost: zonder abonnement snel een goed CV maken en afronden. Juist die scherpte maakt het voor veel gebruikers een betere keuze dan een bredere, duurdere of zwaardere tool.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je vooral vacatures, tracker, ATS-checkers of grote suites wilt gebruiken.',
                    'Niet kiezen voor WerkCV als je koste wat kost volledig gratis wilt blijven en extra handwerk prima vindt.',
                    'Wel kiezen voor WerkCV als je de snelste route zoekt naar een sterk CV zonder doorlopende kosten.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Hoe je in twee minuten de juiste keuze maakt',
                paragraphs: [
                    'Stel jezelf eerst maar één vraag: heb ik alleen een goed CV nodig, of wil ik een groter sollicitatiesysteem? Als je antwoord “alleen een goed CV” is, ga dan eerst naar WerkCV. Als je antwoord “meer dan dat” is, kijk dan naar welk type platform het best past: Nederlands all-in-one, breder carrièreplatform, of grotere suite met ATS-checking.',
                    'En als je antwoord eigenlijk “ik wil vooral niets betalen” is, kies dan bewust voor Canva Free of Microsoft 365-webapps en accepteer dat je meer zelf moet doen. Zo voorkom je dat je betaalt voor te veel product, of juist tijd verliest in een gratis tool die niet goed aansluit op hoe jij solliciteert.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'WerkCV: beste start als je snel zonder abonnement een sterk CV wilt.',
                    'CV.nl / CVMaker / CVster: logischer als je bewust een grotere sollicitatie- of documentsuite zoekt.',
                    'Canva Free / Word-webapps: logisch als gratis voor jou belangrijker is dan tijdswinst of sollicitatiegerichte flow.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start direct met WerkCV',
                        description: 'Test eerst de simpele route voordat je denkt dat je meer platform nodig hebt.',
                    },
                    {
                        href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                        label: 'Lees de no-subscription gids',
                        description: 'Handig als prijsmodel je keuze vrijwel helemaal bepaalt.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu of je een compacte builder, een groot platform of een gratis handmatige tool nodig hebt.',
            'Je weet welk prijsmodel past bij jouw sollicitatiegedrag.',
            'Je begrijpt dat meer features niet automatisch een betere keuze betekenen.',
            'Je hebt een duidelijke eerste route om mee te starten in plaats van zes tools tegelijk te vergelijken.',
            'Je kunt jouw keuze uitleggen in termen van gebruikssituatie, niet alleen merkbekendheid.',
        ],
        faq: [
            {
                question: 'Wat is de beste CV builder in Nederland?',
                answer: 'Dat hangt af van je situatie. Voor snel een sterk CV zonder abonnement is WerkCV meestal de beste keuze. Voor een breder sollicitatieplatform passen CV.nl, CVMaker of CVster beter. Voor volledig gratis werken passen Canva Free of Microsoft 365-webapps beter, maar met meer handwerk.',
            },
            {
                question: 'Welke CV builder is het beste zonder abonnement?',
                answer: 'WerkCV is de duidelijkste Nederlandse keuze als je specifiek zonder abonnement wilt werken. De meeste grote CV-platformen in Nederland gebruiken een proef- of premiummodel.',
            },
            {
                question: 'Welke CV builder is het beste als ik ook sollicitatiebrieven wil maken?',
                answer: 'Dan zijn grotere platforms zoals CV.nl, CVMaker of CVster vaak logischer, omdat zij breder zijn ingericht op meerdere documenttypes en extra sollicitatiefuncties.',
            },
            {
                question: 'Welke CV builder is het beste als ik gratis wil blijven?',
                answer: 'Dan zijn Canva Free of gratis Microsoft 365-webapps logischer. Houd er wel rekening mee dat je meer zelf moet doen in opmaak, structuur en consistentie.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                title: 'Beste CV builder zonder abonnement',
                description: 'Gebruik deze pagina als no-subscription keuzehulp als dat jouw hoofdcriterium is.',
            },
            {
                href: '/cv-gids/werkcv-vs-cv-nl',
                title: 'WerkCV vs CV.nl',
                description: 'Voor de keuze tussen compacte builder en Nederlands all-in-one platform.',
            },
            {
                href: '/cv-gids/werkcv-vs-cvster',
                title: 'WerkCV vs CVster',
                description: 'Voor de keuze tussen rustige builder en grotere suite met ATS-checking.',
            },
        ],
        sources: [
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'CV.nl pricing',
                href: 'https://www.cv.nl/pricing',
                note: 'Officiële prijzenpagina met maandabonnement en bredere platformpositionering. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVMaker prijzen',
                href: 'https://www.cvmaker.nl/prijzen',
                note: 'Officiële prijzenpagina met proefperiode en daarna maandabonnement, plus positionering als carrièreplatform. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'CVster pricing',
                href: 'https://cvster.nl/pricing',
                note: 'Officiële prijzenpagina met proef- en premiumstructuur en bredere suitefunctionaliteit. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'maakeencv.nl homepage',
                href: 'https://www.maakeencv.nl/',
                note: 'Homepage toont gratis plan, Pro-plan en productpositionering met AI-ondersteuning en tracker. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Canva Pro / Canva Free',
                href: 'https://www.canva.com/pro/',
                note: 'Officiële productpagina bevestigt dat Canva Free altijd beschikbaar is voor individuen en Canva Pro de premiumlaag vormt.',
            },
            {
                label: 'Microsoft 365 gratis web-apps',
                href: 'https://www.microsoft.com/nl-NL/microsoft-365/free-office-online-for-the-web',
                note: 'Officiële Microsoft-pagina over gratis toegang tot Word, Excel en PowerPoint voor het web.',
            },
        ],
        ctaTitle: 'Begin met de route die het best past bij jouw sollicitatiestijl',
        ctaText: 'Als je vooral zonder abonnement snel een sterk CV wilt maken, begin dan met WerkCV en test eerst de templates voordat je naar een groter platform grijpt.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-resumaker',
        locale: 'nl',
        title: 'WerkCV vs Resumaker: welke CV builder is slimmer voor Nederlandse sollicitanten?',
        description: 'Eerlijke vergelijking tussen WerkCV en Resumaker voor Nederlandse werkzoekenden. Vergelijk abonnement, proefperiode, bedrijfslocatie, productscope en wanneer elk platform beter past.',
        metaTitle: 'WerkCV vs Resumaker (2026) | Welke CV builder past beter? | WerkCV.nl',
        metaDesc: 'WerkCV of Resumaker? Vergelijk eenmalige prijs vs abonnement, proefperiode, cancellation flow, internationale platformfocus en kies de beste CV builder voor jouw situatie.',
        keywords: [
            'werkcv vs resumaker',
            'resumaker alternatief',
            'resumaker abonnement',
            'werkcv of resumaker',
            'cv builder zonder abonnement',
        ],
        intro: 'Wil je vooral zonder abonnement snel een sterk CV maken en afronden, dan past WerkCV meestal beter. Wil je liever werken in een groter internationaal platform met proefperiode, maandabonnement en veel extra voorbeeld- en contentpagina\'s, dan past Resumaker beter.',
        sections: [
            {
                id: 'vergelijking',
                title: 'WerkCV vs Resumaker in een minuut',
                paragraphs: [
                    'WerkCV en Resumaker zijn niet hetzelfde type product, ook al helpen ze allebei bij het maken van een CV. WerkCV is bewust klein gehouden: een Nederlandse CV-flow met gratis start, daarna een eenmalige betaling per CV zodra je wilt downloaden. Resumaker positioneert zich veel breder als een internationaal platform met sjablonen, CV-voorbeelden, schrijfcontent en een abonnementsmodel.',
                    'Voor de meeste gebruikers zit het echte verschil daarom in het model, niet in de marketing. Wil je een rustig document afronden zonder doorlopende kosten, of wil je een platform gebruiken dat volgens de officiële voorwaarden op een maandelijks abonnement draait en waarbij opzegregels belangrijk zijn?',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'Resumaker'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per CV als je downloadt.',
                            secondary: 'Volgens de officiële voorwaarden een maandelijks abonnement met een proefabonnement van 14 dagen; daarna automatisch terugkerende maandkosten van ongeveer USD 30 inclusief btw, afhankelijk van regio, tenzij je tijdig opzegt.',
                        },
                        {
                            label: 'Opzeggen / verlenging',
                            primary: 'Geen maandabonnement, dus geen verlenging om te onthouden voor hetzelfde CV.',
                            secondary: 'De voorwaarden noemen automatische maandverlenging en vragen annulering minstens zeven dagen voor het einde van de lopende maandperiode.',
                        },
                        {
                            label: 'Productscope',
                            primary: 'Compacte CV-builder met focus op template kiezen, invullen, aanpassen en opnieuw downloaden van hetzelfde document.',
                            secondary: 'Breder platform met sjablonen, CV-voorbeelden, uitlegcontent, sollicitatiebriefvoorbeelden en een grotere internationale contentlaag.',
                        },
                        {
                            label: 'Bedrijfspositionering',
                            primary: 'Nederlandse, no-subscription CV-flow.',
                            secondary: 'Internationaal meertalig platform; contactpagina noemt Resumaker S.L. in Barcelona, Spanje.',
                        },
                        {
                            label: 'Na betaling of gebruik',
                            primary: 'Voor hetzelfde betaalde CV later opnieuw openen, bewerken, van template wisselen en opnieuw downloaden zonder opnieuw te betalen.',
                            secondary: 'Gebruik en toegang volgen het account- en abonnementsmodel uit de voorwaarden, niet een eenmalige documentunlock.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die snel een recruiter-veilige CV-PDF willen zonder abonnementsfrictie.',
                            secondary: 'Mensen die een groter internationaal CV-platform willen en proefperiode plus abonnement acceptabel vinden.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk exact hoe WerkCV-pricing werkt',
                        description: 'Controleer het eenmalige model en wat je daarna nog kunt doen met hetzelfde CV.',
                    },
                    {
                        href: '/templates',
                        label: 'Open eerst de WerkCV templates',
                        description: 'Test of de compacte route al genoeg is voordat je een abonnement overweegt.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je vooral duidelijkheid en afronding zoekt',
                paragraphs: [
                    'WerkCV wint vooral voor sollicitanten die niet op zoek zijn naar een groot accountgedreven platform, maar gewoon een goed CV willen maken en afronden. Dat is in de praktijk een grote groep. Veel mensen willen geen trial, geen maandbedrag en geen opzegschema hoeven onthouden. Ze willen een rustige editor, een veilige template en een duidelijke route naar PDF.',
                    'Daar past WerkCV beter bij. Je begint gratis, vult je inhoud in, vergelijkt de templates en betaalt pas als je wilt downloaden. Daarna blijft datzelfde CV beschikbaar om opnieuw te bewerken, van template te wisselen en opnieuw te exporteren. Voor iemand die vooral resultaat zoekt in plaats van een platformrelatie, is dat meestal de simpelere keuze.',
                ],
                bullets: [
                    'Je wilt geen proefperiode of maandelijkse verlenging hoeven bewaken.',
                    'Je wilt hetzelfde CV later opnieuw openen en opnieuw downloaden zonder opnieuw te betalen.',
                    'Je zoekt een Nederlandse, recruiter-veilige CV-flow in plaats van een groter internationaal contentplatform.',
                ],
                intentLinks: [
                    {
                        href: '/faq',
                        label: 'Lees hoe opnieuw bewerken en downloaden werkt',
                        description: 'Handig als je later nog varianten per vacature wilt maken.',
                    },
                    {
                        href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                        label: 'Vergelijk eerst no-subscription opties',
                        description: 'Voor gebruikers bij wie het prijsmodel het belangrijkste verschil maakt.',
                    },
                ],
            },
            {
                id: 'kies-resumaker',
                title: 'Kies Resumaker als je bewust een groter platform wilt gebruiken',
                paragraphs: [
                    'Resumaker is logischer als je niet alleen naar de editor kijkt, maar waarde ziet in een grotere laag van voorbeelden, schrijfcontent en een internationaal productecosysteem. De site laat duidelijk een bredere setup zien met sjablonen, CV-voorbeelden, pagina\'s over hoe je een CV schrijft en voorbeeldsollicitatiebrieven. Dat is nuttig als je graag veel context en inspiratie om je document heen hebt.',
                    'Ook de over-ons-pagina laat zien dat het product voortkomt uit een recruitmentachtergrond. Daarin beschrijft Resumaker dat het team in 2012 met een wervingsbureau begon en daarna het product lanceerde vanuit ervaring met grote aantallen CV\'s. Als dat soort bredere productpositionering jou aanspreekt en een abonnementsmodel geen bezwaar is, dan kan Resumaker inhoudelijk prima passen.',
                ],
                bullets: [
                    'Je wilt een groter internationaal platform met meer contentlagen om het CV heen.',
                    'Je vindt een trial- en abonnementsmodel acceptabel als je daar meer platformbreedte voor terugkrijgt.',
                    'Je gebruikt graag voorbeeldpagina\'s, uitlegcontent en meerdere routes om tot je uiteindelijke CV te komen.',
                ],
                intentLinks: [
                    {
                        href: '/cv-maken',
                        label: 'Bekijk eerst de eenvoudige WerkCV-route',
                        description: 'Handig als je wilt toetsen of je echt een groter platform nodig hebt.',
                    },
                    {
                        href: '/sollicitatiebrief-voorbeeld',
                        label: 'Gebruik WerkCV-content als je vooral inhoudelijke voorbeelden zoekt',
                        description: 'Voor wie wel begeleiding wil, maar niet per se een abonnement.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'Een goede vergelijking zegt ook wanneer je niet voor WerkCV moet kiezen. Als jij expliciet een groter internationaal platform wilt met veel content om het CV heen, meerdere inspiratieroutes en een accountmodel dat langer mag doorlopen, dan is WerkCV bewust smaller.',
                    'WerkCV is dus niet de beste keuze als je het liefst in een grotere suite werkt en het abonnementsmodel niet erg vindt. Het is de betere keuze als je brede platformfeatures minder belangrijk vindt dan een snelle, transparante en rustige CV-flow.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je vooral een grotere internationale productomgeving zoekt.',
                    'Niet kiezen voor WerkCV als een trial plus maandabonnement voor jou geen probleem is en je graag veel extra content gebruikt.',
                    'Wel kiezen voor WerkCV als je minder frictie en minder billing-risico wilt rond een enkel CV-document.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste Nederlandse gebruikers',
                paragraphs: [
                    'Voor de meeste Nederlandse sollicitanten die gewoon snel een goed CV nodig hebben, is WerkCV de logischere start. Niet omdat Resumaker per definitie slechter is, maar omdat een groot deel van de markt vooral een duidelijk document wil afronden zonder trialvoorwaarden, maandverlenging of opzegmomenten.',
                    'De slimste route is daarom meestal: begin eerst met de compacte, no-subscription optie. Pas als je merkt dat je echt een breder internationaal platform wilt met meer contentlagen en een langer lopend accountmodel, heeft het zin om richting Resumaker te kijken.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je zonder abonnement een sterk CV wilt maken en afronden.',
                    'Kies Resumaker als je bewust een groter internationaal platform wilt gebruiken en de trial- plus abonnementsstructuur accepteert.',
                    'Twijfel je nog? Open eerst de WerkCV templates en kijk of de eenvoudige route al genoeg is voor jouw sollicitaties.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om te zien of je genoeg hebt aan een compacte builder.',
                    },
                    {
                        href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                        label: 'Gebruik de brede keuzehulp voor Nederland',
                        description: 'Handig als je Resumaker ook naast andere builders wilt afwegen.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu of je liever een eenmalige CV-betaling of een trial plus maandabonnement wilt.',
            'Je begrijpt dat Resumaker volgens de voorwaarden op een maandelijks abonnementsmodel draait.',
            'Je hebt bepaald of je alleen een CV-builder nodig hebt of een groter contentplatform eromheen.',
            'Je weet hoe opnieuw downloaden bij WerkCV werkt voor hetzelfde document.',
            'Je kiest nu op basis van jouw sollicitatiegedrag, niet alleen op basis van merkbekendheid.',
        ],
        faq: [
            {
                question: 'Is Resumaker een abonnement?',
                answer: 'Ja. De officiële gebruiksvoorwaarden beschrijven Resumaker als een maandelijks abonnementsproduct met een proefabonnement van 14 dagen en daarna automatisch terugkerende maandkosten, tenzij je op tijd opzegt.',
            },
            {
                question: 'Is WerkCV goedkoper dan Resumaker?',
                answer: 'Voor iemand die vooral een CV wil afronden meestal wel, omdat WerkCV met een eenmalige betaling per CV werkt. Resumaker gebruikt volgens de voorwaarden een proef- en maandabonnementsstructuur. Controleer wel altijd de actuele checkoutinformatie van beide aanbieders.',
            },
            {
                question: 'Kan ik bij WerkCV later opnieuw downloaden zonder opnieuw te betalen?',
                answer: 'Ja, voor hetzelfde CV-document wel. Na betaling kun je datzelfde CV later opnieuw openen, bewerken, van template wisselen en opnieuw downloaden zonder opnieuw te betalen.',
            },
            {
                question: 'Wanneer is Resumaker een betere keuze dan WerkCV?',
                answer: 'Vooral als je bewust een groter internationaal platform wilt met veel voorbeeld- en contentpagina\'s om je CV heen, en als een trial plus abonnement voor jou geen bezwaar is.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                title: 'Beste CV builder zonder abonnement',
                description: 'Gebruik deze gids als je vooral het prijsmodel en abonnementsverschil wilt vergelijken.',
            },
            {
                href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                title: 'Welke CV builder past bij jou in Nederland?',
                description: 'Voor de brede keuze tussen compacte builders, grotere platformen en gratis tools.',
            },
            {
                href: '/cv-gids/werkcv-vs-cvmaker',
                title: 'WerkCV vs CVMaker',
                description: 'Vergelijk WerkCV ook met een ander groter platform met trial- en abonnementsmodel.',
            },
        ],
        sources: [
            {
                label: 'Resumaker voorwaarden',
                href: 'https://resumaker.nl/tos/',
                note: 'Officiële voorwaarden met maandelijks abonnementsmodel, proefabonnement van 14 dagen, automatische verlenging, terugkerende maandkosten van ongeveer USD 30 inclusief btw afhankelijk van regio en annulering minstens zeven dagen voor het einde van de maandperiode. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Resumaker contact',
                href: 'https://resumaker.nl/contact/',
                note: 'Officiële contactpagina met onderwerp "Abonnement opzeggen" en bedrijfsgegevens van Resumaker S.L. in Barcelona, Spanje. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Resumaker over ons',
                href: 'https://resumaker.nl/over/',
                note: 'Officiële over-ons-pagina met uitleg over de recruitmentachtergrond, start van het wervingsbureau in 2012 en de bredere productpositionering. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Resumaker pricing',
                href: 'https://resumaker.nl/pricing/',
                note: 'Officiële pricingroute van Resumaker. Gebruik deze pagina altijd naast de voorwaarden om de actuele checkoutweergave en prijsdetails te controleren.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'WerkCV FAQ',
                href: 'https://werkcv.nl/faq',
                note: 'Openbare FAQ met uitleg over account, betaling, opnieuw downloaden en verschillen met abonnementssites.',
            },
        ],
        ctaTitle: 'Wil je zonder abonnement gewoon een sterk CV afronden?',
        ctaText: 'Begin dan met een WerkCV template, bouw je CV gratis op en beslis pas op het einde of je jouw PDF wilt downloaden.',
        ctaHref: '/templates',
    },
    {
        slug: 'werkcv-vs-maakeencv',
        locale: 'nl',
        title: 'WerkCV vs maakeencv.nl: welke CV builder is slimmer voor jouw situatie?',
        description: 'Eerlijke vergelijking tussen WerkCV en maakeencv.nl. Vergelijk eenmalige prijs, gratis plan, Pro-abonnement, tracker, AI-functies en wanneer elk platform beter past.',
        metaTitle: 'WerkCV vs maakeencv.nl (2026) | Welke CV builder past beter? | WerkCV.nl',
        metaDesc: 'WerkCV of maakeencv.nl? Vergelijk eenmalig betalen vs gratis plan en Pro, PDF-regels, tracker, AI-schrijfhulp en kies de beste CV builder voor jouw sollicitatiestijl.',
        keywords: [
            'werkcv vs maakeencv',
            'maakeencv alternatief',
            'maakeencv prijs',
            'maakeencv pro',
            'cv builder zonder abonnement',
        ],
        intro: 'Wil je vooral zonder abonnement een of enkele sterke CV\'s maken en afronden, dan past WerkCV meestal beter. Wil je juist gratis kunnen starten met een ruimer freemiummodel, plus tracker, AI-schrijfhulp en sollicitatiebriefgenerator, dan past maakeencv.nl vaak beter.',
        sections: [
            {
                id: 'vergelijking',
                title: 'WerkCV vs maakeencv.nl in een minuut',
                paragraphs: [
                    'Dit is een nuttige vergelijking omdat beide producten Nederlands ogen, maar een ander economisch model hebben. WerkCV is gebouwd rond een duidelijke eenmalige betaling per CV zodra je wilt downloaden. maakeencv.nl werkt met een ruim gratis plan, betaalde extra PDF-downloads op dat gratis plan en een Pro-abonnement voor mensen die actiever solliciteren of meer functies willen gebruiken.',
                    'Voor gebruikers is het echte beslispunt daarom heel praktisch: wil je pas betalen als je een concreet CV afrondt, of wil je een bredere sollicitatiesuite met tracker, AI-schrijfhulp en sollicitatiebriefgenerator waar een maandmodel logisch bij kan zijn?',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'WerkCV', 'maakeencv.nl'],
                    rows: [
                        {
                            label: 'Prijsmodel',
                            primary: 'Gratis starten, daarna eenmalig EUR4,99 per CV als je downloadt.',
                            secondary: 'Gratis plan met onbeperkt CV\'s bouwen, 1 gratis PDF per maand en extra PDF\'s voor EUR2 per download; Pro kost EUR12 per maand.',
                        },
                        {
                            label: 'Wat je krijgt voordat je betaalt',
                            primary: 'Je kunt gratis opbouwen en templates vergelijken; betalen gebeurt pas bij download van het CV dat je echt wilt gebruiken.',
                            secondary: 'Het gratis plan is ruimer: onbeperkt CV\'s bouwen, alle templates en een sollicitatietracker nog voordat je naar Pro gaat.',
                        },
                        {
                            label: 'Extra tools',
                            primary: 'Gericht op een rustige CV-builder en snelle route naar PDF.',
                            secondary: 'Breder pakket met AI Schrijfassistent, sollicitatiebriefgenerator, tracker, vertalen en masterprofiel-systeem.',
                        },
                        {
                            label: 'Na betaling of upgrade',
                            primary: 'Voor hetzelfde betaalde CV later opnieuw openen, bewerken, van template wisselen en opnieuw downloaden zonder opnieuw te betalen.',
                            secondary: 'Gratis plan rekent per extra PDF-download; Pro geeft onbeperkt PDF-exports zolang het abonnement actief is.',
                        },
                        {
                            label: 'Bedrijfspositionering',
                            primary: 'Nederlandse, no-subscription CV-flow.',
                            secondary: 'Nederlandse challenger, volgens disclaimer gevestigd in Amsterdam; over-ons-pagina benadrukt EU-opslag en geen watermerken.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Mensen die snel en zonder abonnement een sterk CV-document willen afronden.',
                            secondary: 'Actieve werkzoekenden die gratis willen starten en meer waarde zien in tracker, AI en bredere sollicitatiefuncties.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk exact hoe WerkCV-pricing werkt',
                        description: 'Controleer het eenmalige model en wanneer je voor hetzelfde CV niet opnieuw betaalt.',
                    },
                    {
                        href: '/templates',
                        label: 'Open eerst de WerkCV templates',
                        description: 'Test eerst of een compacte builder al genoeg is voor jouw sollicitaties.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je vooral een duidelijk document wilt afronden',
                paragraphs: [
                    'WerkCV is sterker voor mensen die niet op zoek zijn naar een hele sollicitatiesuite, maar gewoon een goed CV willen maken en afronden. Zeker als je maar een of enkele documenten nodig hebt, voelt een eenmalige betaling vaak logischer dan een maandmodel. Je wilt dan niet hoeven nadenken over extra functies die je misschien niet gebruikt.',
                    'Dat is precies waar WerkCV beter uitkomt. Je begint gratis, werkt je inhoud uit, kiest een template en betaalt pas wanneer jouw document echt klaar is voor download. Daarna blijft datzelfde CV beschikbaar om later te bewerken, van template te wisselen en opnieuw te downloaden. Voor iemand die snelheid en prijsrust belangrijker vindt dan extra tooling, is dat een sterke propositie.',
                ],
                bullets: [
                    'Je wilt geen abonnement hoeven nemen alleen omdat je een goed CV-PDF nodig hebt.',
                    'Je maakt liever een duidelijke keuze per document dan te betalen voor een bredere suite.',
                    'Je wilt later terug kunnen komen op hetzelfde CV zonder opnieuw te betalen voor datzelfde document.',
                ],
                intentLinks: [
                    {
                        href: '/faq',
                        label: 'Lees hoe opnieuw bewerken en downloaden werkt',
                        description: 'Handig als je meerdere sollicitatievarianten uit hetzelfde CV wilt halen.',
                    },
                    {
                        href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                        label: 'Vergelijk eerst no-subscription routes',
                        description: 'Voor gebruikers die vooral prijsmodel en billingrust willen vergelijken.',
                    },
                ],
            },
            {
                id: 'kies-maakeencv',
                title: 'Kies maakeencv.nl als je breder en actiever solliciteert',
                paragraphs: [
                    'maakeencv.nl is logischer als jij meer nodig hebt dan alleen een CV-download. De homepage positioneert het product als een gratis CV-bouwer met AI-ondersteuning, moderne templates en een ingebouwde sollicitatietracker. Daar bovenop noemt de over-ons-pagina expliciet ATS-proof templates, een slimme briefgenerator, EU-opslag en geen watermerken.',
                    'Dat maakt maakeencv.nl vooral interessant voor actieve werkzoekenden die vaker itereren, meerdere CV-versies willen bouwen, een tracker willen gebruiken en ook sollicitatiebrieven via hetzelfde platform willen laten genereren. Het gratis plan is bovendien opvallend ruim, wat de instap laag maakt als je eerst wilt experimenteren voordat je beslist of Pro de moeite waard is.',
                ],
                bullets: [
                    'Je wilt eerst echt gratis kunnen testen met onbeperkt CV\'s bouwen en 1 gratis PDF per maand.',
                    'Je vindt een tracker, AI-schrijfhulp en sollicitatiebriefgenerator inhoudelijk nuttig in jouw sollicitatieproces.',
                    'Je bent actiever aan het solliciteren en kunt daardoor meer waarde halen uit onbeperkte PDF-exports via Pro.',
                ],
                intentLinks: [
                    {
                        href: '/sollicitatiebrief-voorbeeld',
                        label: 'Gebruik WerkCV-content als je vooral briefrichting zoekt',
                        description: 'Voor wie inhoudelijke briefhulp wil zonder meteen in een bredere suite te stappen.',
                    },
                    {
                        href: '/ats-cv-template',
                        label: 'Bekijk de rustige ATS-veilige WerkCV-route',
                        description: 'Handig als je twijfelt of je extra tools nodig hebt of vooral een scanbaar CV wilt.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als jij expliciet een freemium- of suite-aanpak zoekt. Als je waarde hecht aan een sollicitatietracker, AI-schrijfsuggesties, sollicitatiebriefgeneratie en ruimer gratis gebruik voordat je gaat betalen, dan heeft maakeencv.nl daar vandaag gewoon een bredere propositie voor.',
                    'WerkCV wint niet omdat het de meeste features heeft. Het wint wanneer je juist minder frictie wilt: minder features, minder abonnementen en een duidelijkere route van inhoud naar PDF. Als jouw sollicitatieproces breder is dan alleen dat document, dan kan maakeencv.nl rationeel beter passen.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je een tracker en AI-schrijfhulp echt wilt gebruiken.',
                    'Niet kiezen voor WerkCV als je veel PDF-exports per maand verwacht en een Pro-model dan logischer vindt.',
                    'Wel kiezen voor WerkCV als je vooral een sterke CV-builder wilt zonder maandverplichting.',
                ],
            },
            {
                id: 'beste-route',
                title: 'Beste keuze voor de meeste gebruikers',
                paragraphs: [
                    'Voor de meeste mensen die gewoon snel een goed CV willen afronden, is WerkCV nog steeds de logischere start. Niet omdat maakeencv.nl zwak is, maar omdat veel sollicitanten minder behoefte hebben aan extra tools dan aan een snelle, overzichtelijke en betaalbare route naar een sterk document.',
                    'Maar deze vergelijking is eerlijker dan alleen "WerkCV is beter". Als je actief solliciteert, veel wilt testen en ook de tracker, AI-schrijfhulp en sollicitatiebriefgenerator serieus gaat gebruiken, dan kan maakeencv.nl zelfs de rationelere keuze zijn. De juiste keuze hangt hier dus sterk af van sollicitatie-intensiteit.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies WerkCV als je zonder abonnement snel een of enkele sterke CV\'s wilt afronden.',
                    'Kies maakeencv.nl als je veel wilt testen, gratis wilt starten en actief gebruik wilt maken van tracker, AI en extra sollicitatiefuncties.',
                    'Twijfel je nog? Start eerst met de WerkCV templates en check daarna pas of je echt een bredere suite nodig hebt.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om te zien of een compacte builder al voldoende is.',
                    },
                    {
                        href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                        label: 'Gebruik de brede keuzehulp voor Nederland',
                        description: 'Handig als je maakeencv.nl ook naast CV.nl, CVMaker en andere builders wilt afwegen.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu of je liever per document betaalt of liever met een gratis plan en optioneel Pro werkt.',
            'Je begrijpt dat maakeencv.nl inhoudelijk meer sollicitatiefuncties biedt dan alleen CV-opmaak.',
            'Je weet dat het gratis plan van maakeencv.nl 1 gratis PDF per maand bevat en extra PDF\'s voor EUR2 per download rekent.',
            'Je weet hoe WerkCV werkt als je hetzelfde CV later opnieuw wilt bewerken en downloaden.',
            'Je hebt jouw keuze gekoppeld aan sollicitatie-intensiteit, niet alleen aan marketingclaims.',
        ],
        faq: [
            {
                question: 'Is maakeencv.nl echt gratis?',
                answer: 'Gedeeltelijk. Volgens de homepage kun je gratis onbeperkt CV\'s bouwen, alle templates gebruiken, een tracker gebruiken en 1 gratis PDF per maand downloaden. Voor extra PDF-downloads rekent het gratis plan EUR2 per download, en Pro kost EUR12 per maand.',
            },
            {
                question: 'Is WerkCV goedkoper dan maakeencv.nl?',
                answer: 'Dat hangt af van hoe vaak je solliciteert. Voor iemand die vooral een of enkele CV\'s wil afronden is WerkCV vaak goedkoper en rustiger, omdat je eenmalig per CV betaalt. Als je heel veel exporteert en ook tracker, AI en briefgenerator gebruikt, kan maakeencv.nl Pro logischer zijn.',
            },
            {
                question: 'Kan ik bij WerkCV later opnieuw downloaden zonder opnieuw te betalen?',
                answer: 'Ja, voor hetzelfde CV-document wel. Na betaling kun je datzelfde CV later opnieuw openen, bewerken, van template wisselen en opnieuw downloaden zonder opnieuw te betalen.',
            },
            {
                question: 'Wanneer is maakeencv.nl een betere keuze dan WerkCV?',
                answer: 'Vooral als je actief solliciteert en veel waarde ziet in een ruimer gratis plan, een sollicitatietracker, AI-schrijfhulp, sollicitatiebriefgenerator en onbeperkte PDF-exports via Pro.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                title: 'Beste CV builder zonder abonnement',
                description: 'Gebruik deze gids als je vooral het prijsmodel en abonnementsverschil wilt vergelijken.',
            },
            {
                href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                title: 'Welke CV builder past bij jou in Nederland?',
                description: 'Voor de brede keuze tussen compacte builders, grotere platformen en gratis tools.',
            },
            {
                href: '/cv-gids/werkcv-vs-cv-nl',
                title: 'WerkCV vs CV.nl',
                description: 'Vergelijk WerkCV ook met een ander breder Nederlands sollicitatieplatform.',
            },
        ],
        sources: [
            {
                label: 'maakeencv.nl homepage',
                href: 'https://www.maakeencv.nl/',
                note: 'Officiële homepage met gratis plan, Pro-plan van EUR12 per maand, 1 gratis PDF per maand, extra PDF\'s voor EUR2 per download, tracker en AI-positionering. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'maakeencv.nl over ons',
                href: 'https://www.maakeencv.nl/over-ons',
                note: 'Officiële over-ons-pagina met ATS-proof templates, slimme briefgenerator, kanban-tracker, EU-opslag en geen watermerken. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'maakeencv.nl disclaimer',
                href: 'https://www.maakeencv.nl/disclaimer',
                note: 'Officiële disclaimer met KvK 84619740, vestiging in Amsterdam en uitleg dat AI taalsuggesties geeft maar de feitelijke juistheid van CV-inhoud niet controleert. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'maakeencv.nl sollicitatiebriefgenerator',
                href: 'https://www.maakeencv.nl/sollicitatiebriefgenerator',
                note: 'Officiële productpagina met ATS-proof briefstructuur, CV-koppeling en vacaturematch-positie. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'WerkCV FAQ',
                href: 'https://werkcv.nl/faq',
                note: 'Openbare FAQ met uitleg over account, betaling, opnieuw downloaden en verschillen met abonnementssites.',
            },
        ],
        ctaTitle: 'Wil je zonder abonnement gewoon een sterk CV afronden?',
        ctaText: 'Begin dan met een WerkCV template, bouw je CV gratis op en beslis pas op het einde of je jouw PDF wilt downloaden.',
        ctaHref: '/templates',
    },
    {
        slug: 'canva-vs-cv-builder-voor-sollicitaties',
        locale: 'nl',
        title: 'Canva vs CV builder voor sollicitaties: wat is slimmer voor je CV?',
        description: 'Eerlijke vergelijking tussen Canva en een dedicated CV builder voor sollicitaties. Vergelijk designvrijheid, ATS-risico, prijsmodel, premium-content regels en wanneer elk beter past.',
        metaTitle: 'Canva vs CV builder voor sollicitaties (2026) | Wat is slimmer? | WerkCV.nl',
        metaDesc: 'Canva of een dedicated CV builder? Vergelijk designvrijheid, ATS-veiligheid, gratis gebruik, Pro-content regels en kies de slimste route voor Nederlandse sollicitaties.',
        keywords: [
            'canva vs cv builder',
            'canva cv of cv builder',
            'canva cv ats',
            'beste cv builder vs canva',
            'cv maken canva of werkcv',
        ],
        intro: 'Wil je vooral een recruiter-veilige CV voor gewone Nederlandse vacatures, dan is een dedicated CV builder meestal slimmer dan Canva. Wil je maximale designvrijheid of een visueel opvallend CV voor creatieve rollen, dan kan Canva beter passen, zolang je zelf goed bewaakt dat de layout professioneel en leesbaar blijft.',
        sections: [
            {
                id: 'vergelijking',
                title: 'Canva vs een dedicated CV builder in één oogopslag',
                paragraphs: [
                    'Canva en een CV builder lossen niet precies hetzelfde probleem op. Canva is een algemene designtool waarmee je ook CV\'s kunt maken. Een dedicated CV builder zoals WerkCV is juist gebouwd rondom het sollicitatieproces zelf: standaardsecties, rustige templates, minder opmaakgedoe en een directere route naar een bruikbare PDF.',
                    'Daarom is deze keuze minder een merkvraag dan een workflowvraag. Wil je ontwerpen, schuiven en visueel finetunen, of wil je snel een goed CV maken met zo min mogelijk designbeslissingen en zo weinig mogelijk risico op een onrustige layout?',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'Canva', 'CV builder zoals WerkCV'],
                    rows: [
                        {
                            label: 'Producttype',
                            primary: 'Algemene designtool voor veel soorten documenten en visuals, waaronder CV\'s.',
                            secondary: 'Gerichte CV-tool voor sollicitaties, met templates en flow die al op een CV-situatie zijn ingericht.',
                        },
                        {
                            label: 'Prijsmodel',
                            primary: 'Canva Free is altijd gratis; Canva Pro is een abonnement met 30-daagse proefperiode. Free gebruikers kunnen ook eenmalig betalen voor Pro-content in een design.',
                            secondary: 'Gratis starten, daarna eenmalig EUR4,99 per CV als je downloadt.',
                        },
                        {
                            label: 'Designvrijheid',
                            primary: 'Zeer hoog: drag-and-drop, veel visuele elementen, kleuren, kolommen en creatieve layouts.',
                            secondary: 'Beperkter, maar juist daardoor sneller en rustiger voor standaard sollicitaties.',
                        },
                        {
                            label: 'ATS- en recruiter-veiligheid',
                            primary: 'Kan goed werken, maar je moet zelf bewaken dat je CV simpel, scanbaar en standaard genoeg blijft.',
                            secondary: 'Meestal makkelijker, omdat templates en secties al dichter op een klassieke sollicitatie-CV-flow zitten.',
                        },
                        {
                            label: 'Premium content en licenties',
                            primary: 'Free gebruikers betalen soms extra voor Pro-content of hebben een Pro-abonnement nodig om watermerken te vermijden.',
                            secondary: 'Geen aparte contentlicenties per element; je betaalt voor het CV-document dat je wilt downloaden.',
                        },
                        {
                            label: 'Beste voor',
                            primary: 'Creatieve rollen, visuele one-pagers en gebruikers die graag zelf ontwerpen.',
                            secondary: 'De meeste standaard Nederlandse vacatures waarbij snelheid, rust en duidelijkheid belangrijker zijn dan designvrijheid.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Open eerst de WerkCV templates',
                        description: 'Bekijk of een rustige CV-builder al voldoende is voor jouw sollicitaties.',
                    },
                    {
                        href: '/ats-cv-template',
                        label: 'Bekijk de ATS-veilige WerkCV-route',
                        description: 'Handig als scanbaarheid en standaardstructuur voor jou prioriteit hebben.',
                    },
                ],
            },
            {
                id: 'kies-canva',
                title: 'Kies Canva als designvrijheid echt onderdeel is van je sollicitatie',
                paragraphs: [
                    'Canva is vooral logisch als het uiterlijk van je document een belangrijk deel van je presentatie is. Dat geldt bijvoorbeeld vaker bij design, branding, content, social media of andere creatieve functies waarbij jouw gevoel voor visuele communicatie indirect mee wordt beoordeeld. De officiële Canva resume builder benadrukt precies die kracht: veel designer-made templates, drag-and-drop bewerking en veel vrijheid om je document visueel aan te passen.',
                    'Canva kan ook handig zijn als je al dagelijks in Canva werkt en je een CV wilt maken dat visueel aansluit op een portfolio, case study of persoonlijke merkstijl. Dan is de extra ontwerpvrijheid niet zomaar decoratie, maar echt onderdeel van je sollicitatiestrategie.',
                ],
                bullets: [
                    'Je solliciteert op creatieve of visueel georiënteerde rollen.',
                    'Je wilt meer controle over kleur, compositie, iconen en lay-out dan een CV builder normaal geeft.',
                    'Je gebruikt Canva al voor portfolio, slides of persoonlijke branding en wilt alles in één omgeving houden.',
                ],
                intentLinks: [
                    {
                        href: '/cv-opmaak-voorbeeld',
                        label: 'Bekijk eerst wat een goede CV-opmaak nodig heeft',
                        description: 'Handig als je wel visueel wilt werken, maar niet ten koste van leesbaarheid.',
                    },
                    {
                        href: '/cv-maken-in-word',
                        label: 'Vergelijk Canva ook met een handmatige Word-route',
                        description: 'Zo zie je beter of je echt een designtool nodig hebt of alleen meer controle zoekt.',
                    },
                ],
            },
            {
                id: 'kies-builder',
                title: 'Kies een CV builder zoals WerkCV als je vooral snel goed wilt solliciteren',
                paragraphs: [
                    'Voor de meeste sollicitanten is een dedicated CV builder de veiligere en snellere keuze. Dat geldt zeker voor functies in administratie, klantenservice, logistiek, zorg, retail, support en veel starterrollen. Daar wil je meestal geen visueel experiment, maar een helder document met standaardkoppen, logische volgorde en een PDF die rustig oogt.',
                    'Dat is precies waar een CV builder voordeel heeft. Minder ontwerpvrijheid betekent hier niet minder waarde, maar minder foutkans. Je hoeft minder zelf te beslissen over marges, grafieken, icoontjes of kolommen en kunt je meer richten op inhoud, relevantie en snelheid.',
                ],
                bullets: [
                    'Je wilt minder opmaakbeslissingen en sneller tot een sterke PDF komen.',
                    'Je solliciteert op standaard vacatures waar inhoud en scanbaarheid zwaarder wegen dan creatieve styling.',
                    'Je wilt een duidelijke betalingslogica zonder Canva Pro-content of abonnementsafwegingen rond design-assets.',
                ],
                intentLinks: [
                    {
                        href: '/prijzen',
                        label: 'Bekijk hoe WerkCV-pricing werkt',
                        description: 'Controleer het eenmalige model per CV als dat voor jou belangrijk is.',
                    },
                    {
                        href: '/faq',
                        label: 'Lees hoe WerkCV opnieuw bewerken en downloaden ondersteunt',
                        description: 'Handig als je meerdere vacaturevarianten uit hetzelfde CV wilt maken.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als jouw CV zelf een ontwerpstuk moet zijn. Wanneer je solliciteert op creatieve rollen en bewust een visueel onderscheidend document wilt laten zien, dan heeft Canva simpelweg meer vrijheid. In die situatie kan een vaste CV-builder juist te beperkt voelen.',
                    'Maar dat betekent niet automatisch dat Canva voor iedereen beter is. Voor veel mensen is een visueel CV vooral extra werk en extra risico. Het slimme verschil zit dus in de functie waarop je solliciteert, niet alleen in wat er mooier uitziet in de editor.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als designvrijheid een kernonderdeel is van hoe je jezelf presenteert.',
                    'Niet kiezen voor WerkCV als je bewust een visuele one-pager of portfolio-achtige CV-stijl wilt bouwen.',
                    'Wel kiezen voor WerkCV als je vooral een sterke sollicitatie-CV wilt zonder ontwerpgedoe.',
                ],
            },
            {
                id: 'beste-route',
                title: 'De slimste route voor de meeste Nederlandse sollicitanten',
                paragraphs: [
                    'Voor de meeste Nederlandse vacatures is een dedicated CV builder de slimste start. Niet omdat Canva zwak is, maar omdat het voor gewone sollicitaties meestal slimmer is om eerst een rustig, duidelijk en recruiter-proof CV te hebben dan een visueel opvallend document. De beste keuze is vaak de tool die de minste fouten toelaat.',
                    'Een praktische middenweg is zelfs nog beter: gebruik een CV builder zoals WerkCV voor je hoofd-CV en gebruik Canva alleen aanvullend als je ook een portfolio, one-pager of creatieve presentatie nodig hebt. Zo combineer je snelheid en standaardisatie met visuele vrijheid, zonder je hoofdsollicitatie afhankelijk te maken van designexperimenten.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies een dedicated CV builder voor de meeste standaard sollicitaties in Nederland.',
                    'Kies Canva als visuele presentatie echt onderdeel is van de functie waarop je solliciteert.',
                    'Bij twijfel: maak eerst je hoofd-CV in WerkCV en beslis daarna pas of je daarnaast nog een visuele Canva-versie nodig hebt.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met je hoofd-CV in WerkCV',
                        description: 'De snelste manier om eerst de veilige basisversie op orde te hebben.',
                    },
                    {
                        href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                        label: 'Gebruik de brede keuzehulp voor Nederland',
                        description: 'Handig als je Canva ook naast andere builders wilt afwegen.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu of je vooral designvrijheid of juist sollicitatiesnelheid nodig hebt.',
            'Je begrijpt dat Canva Free echt gratis kan zijn, maar dat Pro-content soms extra licentie- of abonnementskosten meebrengt.',
            'Je weet dat een dedicated CV builder meestal minder foutgevoelig is voor standaard Nederlandse vacatures.',
            'Je hebt bepaald of jouw functie een creatief CV vraagt of juist een rustige recruiter-versie.',
            'Je hebt nu een praktische route: hoofd-CV eerst, visuele versie alleen als dat echt nodig is.',
        ],
        faq: [
            {
                question: 'Is Canva goed voor een CV?',
                answer: 'Ja, vooral als je veel designvrijheid wilt of op creatieve functies solliciteert. Voor de meeste standaard sollicitaties is een dedicated CV builder vaak sneller en veiliger, omdat je minder kans hebt op een onrustige of te visuele layout.',
            },
            {
                question: 'Is de Canva resume builder echt gratis?',
                answer: 'De officiële Canva resume builder is gratis te gebruiken. Wel geldt dat Free gebruikers soms extra moeten betalen voor Pro-content in een design of een Canva Pro-abonnement nodig hebben om bepaalde premium-elementen zonder watermark te gebruiken.',
            },
            {
                question: 'Is een Canva-CV ATS-vriendelijk?',
                answer: 'Dat kan, maar je moet het zelf simpel houden. Gebruik liever een rustige layout, standaardkoppen en weinig visuele elementen. Een dedicated CV builder maakt die route meestal makkelijker, omdat de templates al minder ruimte laten voor ATS-onhandige keuzes.',
            },
            {
                question: 'Wanneer is WerkCV slimmer dan Canva?',
                answer: 'Voor de meeste gewone Nederlandse vacatures waarbij je vooral snel een sterk, rustig en duidelijk CV wilt maken zonder ontwerprisico of abonnementsfrictie rond designtools.',
            },
        ],
        relatedLinks: [
            {
                href: '/ats-cv-template',
                title: 'ATS-vriendelijke CV template',
                description: 'Gebruik deze route als je vooral een scanbaar, rustig en recruiter-proof CV wilt maken.',
            },
            {
                href: '/cv-gids/beste-cv-builder-zonder-abonnement',
                title: 'Beste CV builder zonder abonnement',
                description: 'Handig als je Canva ook afweegt tegen no-subscription builders.',
            },
            {
                href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                title: 'Welke CV builder past bij jou in Nederland?',
                description: 'Voor de brede keuze tussen Canva, WerkCV en andere builders in Nederland.',
            },
        ],
        sources: [
            {
                label: 'Canva resume builder',
                href: 'https://www.canva.com/create/resumes/',
                note: 'Officiële Canva-pagina met gratis resume builder, save-and-edit workflow en resume-templatepositionering. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Canva Pro',
                href: 'https://www.canva.com/pro/',
                note: 'Officiële Canva Pro-pagina met Canva Free, Pro-functies, 25+ AI-tools en algemene productpositionering. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Canva licensing explained',
                href: 'https://www.canva.com/licensing-explained/',
                note: 'Officiële licentie-uitleg met verschil tussen Free en Pro-content, watermarks en eenmalige licenties voor Pro-content bij Free gebruikers. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Canva Pro vs Business vs Enterprise',
                href: 'https://www.canva.com/learn/canva-pro-vs-canva-enterprise/',
                note: 'Officiële Canva-uitleg dat Canva Pro voor individuen is, een flat monthly fee gebruikt en een 30-daagse proefperiode heeft. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
            {
                label: 'WerkCV ATS CV template',
                href: 'https://werkcv.nl/ats-cv-template',
                note: 'Openbare WerkCV-pagina met uitleg over ATS-vriendelijke templates en rustige CV-opmaak voor sollicitaties.',
            },
        ],
        ctaTitle: 'Wil je eerst een recruiter-veilige hoofdversie van je CV?',
        ctaText: 'Begin dan met een WerkCV template, maak je hoofd-CV in een rustige layout en beslis daarna pas of je daarnaast nog een visuele Canva-versie nodig hebt.',
        ctaHref: '/templates',
    },
    {
        slug: 'ats-vriendelijke-cv-builder-voor-nederlandse-vacatures',
        locale: 'nl',
        title: 'ATS-vriendelijke CV builder voor Nederlandse vacatures vergelijken',
        description: 'Praktische keuzehulp voor het vergelijken van een ATS-vriendelijke CV builder in Nederland. Leer wat echt helpt: simpele layouts, duidelijke secties, rustige PDF\'s en minder parser-risico.',
        metaTitle: 'ATS-vriendelijke CV builder vergelijken (2026) | WerkCV.nl',
        metaDesc: 'Vergelijk ATS-vriendelijke CV builders voor Nederlandse vacatures. Zie waar simpele layouts, vaste secties en rustige PDF\'s belangrijker zijn dan marketingclaims.',
        keywords: [
            'ats vriendelijke cv builder',
            'ats cv builder nederland',
            'ats vriendelijke cv builder nederland',
            'cv builder voor ats',
            'ats builder vergelijken',
        ],
        intro: 'Deze pagina is voor toolkeuze. Voor de meeste Nederlandse vacatures is een ATS-vriendelijke CV builder vooral een rustige CV builder. Het gaat minder om een magisch “ATS-keurmerk” en meer om simpele layouts, duidelijke secties, gewone tekst en zo min mogelijk opmaak die parsing in de weg zit.',
        sections: [
            {
                id: 'wat-maakt-ats-vriendelijk',
                title: 'Wat maakt een CV builder echt ATS-vriendelijk?',
                paragraphs: [
                    'Het belangrijkste misverstand is dat ATS-vriendelijkheid vooral een score of badge zou zijn. In de praktijk gaat het veel vaker om basisdingen: of een parser je informatie kan lezen, of je contactgegevens logisch staan, en of je CV geen complexe layout gebruikt die voor mensen mooi lijkt maar voor software rommelig is.',
                    'Dat zie je ook terug in officiële ATS-documentatie. Greenhouse noemt bijvoorbeeld heel concreet welke formatting issues parsing laten mislukken: afbeeldingen, word art, image-bestanden in plaats van documenten, complexe tabellen, headers, footers, kolomlayouts en onduidelijke secties. De juiste CV builder beperkt juist dat soort risico\'s in plaats van je te verleiden tot te veel designvrijheid.',
                ],
                comparisonTable: {
                    columns: ['Onderdeel', 'ATS-vriendelijk signaal', 'Risico of waarschuwing'],
                    rows: [
                        {
                            label: 'Bestand en tekst',
                            primary: 'Normale documentoutput zoals PDF of DOCX met echte tekst die selecteerbaar en leesbaar blijft.',
                            secondary: 'CV\'s die als afbeelding worden opgeslagen of veel grafische elementen gebruiken in plaats van gewone tekst.',
                        },
                        {
                            label: 'Layout',
                            primary: 'Rustige, voorspelbare layout met duidelijke secties en zo min mogelijk ingewikkelde visuele constructies.',
                            secondary: 'Kolommen, decoratieve blokken, tabellen, tekstvakken, kop- en voetteksten met belangrijke info.',
                        },
                        {
                            label: 'Secties en koppen',
                            primary: 'Consistente secties zoals werkervaring, opleiding en vaardigheden met duidelijke titels.',
                            secondary: 'Ongewone labels, wisselende formats per sectie of een layout zonder heldere structuur.',
                        },
                        {
                            label: 'Contactgegevens',
                            primary: 'Naam en contactgegevens in de hoofdtekst op een duidelijke plek bovenaan.',
                            secondary: 'Naam, e-mail of telefoon in headers, footers of losse tekstvakken.',
                        },
                        {
                            label: 'Keywords',
                            primary: 'Makkelijk de functietitel, tools en vaardigheden uit de vacature verwerken in gewone taal.',
                            secondary: 'Te creatieve samenvattingen of designfocus waardoor relevante vacaturetaal ondergesneeuwd raakt.',
                        },
                        {
                            label: 'Editorflow',
                            primary: 'Een builder die je richting eenvoudige keuzes en sollicitatiegerichte structuur stuurt.',
                            secondary: 'Een vrije designtool waarin je zelf alle layoutbeslissingen moet nemen en sneller fouten maakt.',
                        },
                    ],
                },
                intentLinks: [
                    {
                        href: '/cv-tips/ats-vriendelijk-cv',
                        label: 'Leer eerst hoe je een cv ATS-vriendelijk maakt',
                        description: 'Gebruik deze gids als je niet builders maar de cv-regels zelf beter wilt begrijpen.',
                    },
                    {
                        href: '/ats-cv-template',
                        label: 'Bekijk de ATS-vriendelijke WerkCV template route',
                        description: 'Start met de veiligste layout als rust en scanbaarheid voorop staan.',
                    },
                    {
                        href: '/tools/ats-cv-checker',
                        label: 'Controleer je CV eerst met de ATS-checker',
                        description: 'Gebruik dit als extra controle, niet als vervanging van gezond CV-oordeel.',
                    },
                ],
            },
            {
                id: 'nederlandse-vacatures',
                title: 'Wat dit betekent voor Nederlandse vacatures',
                paragraphs: [
                    'Voor Nederlandse werkzoekenden is het nuttig om ATS-vriendelijkheid nuchter te bekijken. ATS-systemen zijn geen theorie; LinkedIn Help documenteert expliciet hoe LinkedIn Recruiter met ATS-integraties werkt en hoe data en resumes tussen ATS en LinkedIn worden gesynchroniseerd. Tegelijk laat Greenhouse zien dat Dutch gewoon tot de ondersteunde talen voor parsing hoort. De taal Nederlands is dus niet per se het probleem; de layout is dat veel vaker wel.',
                    'Daarom is voor Nederlandse vacatures meestal niet de slimste vraag “welke tool heeft de hoogste ATS-marketingclaim?”, maar “welke tool helpt mij een rustig, logisch en standaard CV te maken dat zowel door software als door recruiters goed te lezen is?”. Voor veel kantoor-, zorg-, logistieke, retail- en starterfuncties is dat belangrijker dan visuele originaliteit.',
                ],
                bullets: [
                    'Nederlandse parsing is bij grote systemen niet per definitie het probleem; rommelige opmaak vaak wel.',
                    'Een gewone, duidelijke CV-opbouw wint in veel Nederlandse sollicitaties van een creatief maar parser-onhandig document.',
                    'ATS-vriendelijk betekent meestal ook recruiter-vriendelijk: snel scanbaar, duidelijk en relevant.',
                ],
                intentLinks: [
                    {
                        href: '/cv-gids/canva-vs-cv-builder-voor-sollicitaties',
                        label: 'Vergelijk eerst Canva vs een dedicated CV builder',
                        description: 'Handig als je twijfelt tussen designvrijheid en een rustig sollicitatiedocument.',
                    },
                    {
                        href: '/cv-opmaak-voorbeeld',
                        label: 'Bekijk voorbeelden van goede CV-opmaak',
                        description: 'Zo zie je concreet wat een rustige layout in de praktijk betekent.',
                    },
                ],
            },
            {
                id: 'kies-werkcv',
                title: 'Kies WerkCV als je minder ATS-risico en minder designgedoe wilt',
                paragraphs: [
                    'WerkCV is het sterkst voor mensen die niet willen experimenteren met design, maar gewoon een sollicitatieklaar CV nodig hebben. Dat maakt het juist aantrekkelijk voor ATS-gevoelige situaties. Je werkt met templates die al dichter liggen bij een klassieke recruiterflow, hoeft minder layoutbeslissingen zelf te nemen en kunt je energie steken in inhoud, functierelevantie en keywordafstemming op de vacature.',
                    'Voor veel gebruikers is dat de echte winst. Een ATS-vriendelijke builder is niet per se de builder met de meeste AI of de luidste marketing, maar de builder die de kans kleiner maakt dat jij per ongeluk een parser-onvriendelijke layout bouwt. Juist daar helpt een rustige tool meer dan een vrije designtool.',
                ],
                bullets: [
                    'Je wilt een simpele, rustige layout met zo min mogelijk parser-risico.',
                    'Je wilt niet zelf hoeven beslissen over kolommen, tekstvakken of decoratieve elementen.',
                    'Je wilt later hetzelfde CV opnieuw kunnen aanpassen en downloaden zonder opnieuw te betalen voor datzelfde document.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Start met een WerkCV template',
                        description: 'De snelste manier om je hoofd-CV in een rustige ATS-veilige richting op te bouwen.',
                    },
                    {
                        href: '/prijzen',
                        label: 'Bekijk het eenmalige WerkCV-model',
                        description: 'Handig als je een ATS-veilige CV-builder zoekt zonder doorlopend abonnement.',
                    },
                ],
            },
            {
                id: 'wanneer-niet',
                title: 'Wanneer WerkCV niet de beste keuze is',
                paragraphs: [
                    'WerkCV is niet de beste keuze als je bewust een grotere sollicitatiesuite zoekt met tracker, brede AI-hulp of een veel vrijere designomgeving. In dat geval kunnen andere platforms beter passen, mits je goed oplet dat je CV inhoudelijk en qua layout simpel genoeg blijft voor parsing.',
                    'Het is ook niet de beste keuze als jouw CV zelf een creatief ontwerpstuk moet zijn. Dan kan een tool als Canva of een breder visueel platform beter passen, maar je moet dan accepteren dat je meer verantwoordelijkheid krijgt voor de leesbaarheid en ATS-veiligheid van het einddocument.',
                ],
                bullets: [
                    'Niet kiezen voor WerkCV als je primair designvrijheid of een brede suite zoekt.',
                    'Niet kiezen voor WerkCV als een visuele portfolio-achtige CV belangrijker is dan standaardisatie.',
                    'Wel kiezen voor WerkCV als je het hoofdprobleem ziet als: snel een rustig, sollicitatieklaar CV maken.',
                ],
            },
            {
                id: 'beste-route',
                title: 'De slimste ATS-route voor de meeste sollicitanten',
                paragraphs: [
                    'Voor de meeste Nederlandse sollicitanten is de slimste route verrassend simpel: kies een rustige builder, gebruik gewone sectietitels, zet je contactgegevens niet in rare plekken, neem relevante woorden uit de vacature over en exporteer een nette PDF. Meer ingewikkeld hoeft ATS-vriendelijkheid meestal niet te worden.',
                    'De beste aanpak is daarom eerst je hoofd-CV goed opbouwen in een rustige builder zoals WerkCV. Pas daarna kun je extra checks of optimalisaties toevoegen. Wie omgekeerd begint met design, scores en gimmicks, eindigt vaak met meer ruis dan resultaat.',
                ],
                exampleTitle: 'Snelle beslisregel',
                exampleItems: [
                    'Kies een rustige CV builder als jouw hoofd-CV door zoveel mogelijk standaard sollicitatieflows moet werken.',
                    'Gebruik ATS-checks als hulpmiddel, niet als waarheid op zichzelf.',
                    'Zoek niet naar “ATS-approved”, maar naar eenvoudige layouts, duidelijke secties en logische vacaturetaal.',
                ],
                intentLinks: [
                    {
                        href: '/templates',
                        label: 'Maak je hoofd-CV nu in WerkCV',
                        description: 'Begin met de veiligste basisversie voordat je andere tools toevoegt.',
                    },
                    {
                        href: '/cv-gids/welke-cv-builder-past-bij-jou-in-nederland',
                        label: 'Gebruik de brede keuzehulp voor Nederland',
                        description: 'Handig als je WerkCV ook naast andere builders wilt vergelijken.',
                    },
                ],
            },
        ],
        checklist: [
            'Je weet nu dat ATS-vriendelijkheid vooral over structuur en leesbaarheid gaat, niet over een badge.',
            'Je begrijpt welke layoutkeuzes parsers volgens officiële ATS-documentatie kunnen verstoren.',
            'Je weet dat Nederlands zelf geen hoofdprobleem hoeft te zijn, maar rommelige opmaak wel.',
            'Je hebt een concrete route om eerst een rustige hoofdversie van je CV te maken.',
            'Je kunt nu ATS-vriendelijke keuzes maken zonder in marketingtaal of scoringshypes te geloven.',
        ],
        faq: [
            {
                question: 'Wat is een ATS-vriendelijke CV builder?',
                answer: 'Dat is vooral een CV builder die je helpt een simpel, logisch en goed leesbaar document te maken. Denk aan duidelijke secties, weinig designruis, gewone tekst en een layout die minder kans geeft op parsingproblemen.',
            },
            {
                question: 'Bestaat er zoiets als ATS-approved?',
                answer: 'Gebruik die term liever niet als besliscriterium. Er is geen universeel publiek keurmerk dat alle ATS-systemen afdekt. Let liever op praktische signalen zoals simpele layouts, duidelijke secties, echte tekst en minder parser-risico.',
            },
            {
                question: 'Is een PDF goed voor ATS in Nederland?',
                answer: 'Vaak wel, zolang het een normale PDF met echte tekst is en geen beeldbestand of zwaar vormgegeven design. Officiële ATS-documentatie noemt vooral problemen bij image-bestanden, graphics, headers, footers, tabellen en kolomlayouts.',
            },
            {
                question: 'Waarom is een dedicated CV builder vaak slimmer dan Canva voor ATS?',
                answer: 'Omdat een dedicated CV builder je meestal automatisch dichter bij een rustige, standaard sollicitatie-layout houdt. Canva geeft meer vrijheid, maar daardoor ook meer kans op keuzes die parsing en leesbaarheid kunnen schaden.',
            },
        ],
        relatedLinks: [
            {
                href: '/cv-tips/ats-vriendelijk-cv',
                title: 'ATS-vriendelijke cv maken',
                description: 'Gebruik deze gids als je eerst de cv-opmaak, keywords en PDF-keuzes zelf wilt begrijpen.',
            },
            {
                href: '/ats-cv-template',
                title: 'ATS-vriendelijke CV template',
                description: 'Gebruik deze route als je direct met een rustige, scanbare template wilt starten.',
            },
            {
                href: '/tools/ats-cv-checker',
                title: 'ATS CV checker',
                description: 'Controleer je CV extra, maar gebruik het als hulpmiddel en niet als eindwaarheid.',
            },
            {
                href: '/cv-gids/canva-vs-cv-builder-voor-sollicitaties',
                title: 'Canva vs CV builder voor sollicitaties',
                description: 'Voor de keuze tussen designvrijheid en een rustiger sollicitatiedocument.',
            },
        ],
        sources: [
            {
                label: 'Greenhouse: Unsuccessful resume parse',
                href: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse',
                note: 'Officiële Greenhouse Support-pagina met concrete parsingproblemen zoals graphics, image-bestanden, complexe tabellen, headers, footers, kolommen en onduidelijke secties. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'Greenhouse: Resume parsing with non-English languages',
                href: 'https://support.greenhouse.io/hc/en-us/articles/205019689-Resume-parsing-with-non-English-languages',
                note: 'Officiële Greenhouse Support-pagina die bevestigt dat Dutch tot de ondersteunde parsingtalen hoort. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'LinkedIn Help: ATS integrations in Recruiter',
                href: 'https://www.linkedin.com/help/linkedin/answer/a496957',
                note: 'Officiële LinkedIn Help-pagina die uitlegt hoe ATS-integraties, resume-sync en ATS-rapportage in Recruiter werken. Gecontroleerd op 30 maart 2026.',
            },
            {
                label: 'WerkCV ATS CV template',
                href: 'https://werkcv.nl/ats-cv-template',
                note: 'Openbare WerkCV-pagina over rustige ATS-vriendelijke templates voor sollicitaties.',
            },
            {
                label: 'WerkCV prijzen',
                href: 'https://werkcv.nl/prijzen',
                note: 'Openbare WerkCV-prijzenpagina met eenmalige betaling per CV en uitleg over later opnieuw bewerken en downloaden.',
            },
        ],
        ctaTitle: 'Wil je eerst een rustige ATS-veilige basisversie van je CV?',
        ctaText: 'Begin dan met een WerkCV template, bouw je hoofd-CV in een simpele layout op en voeg pas daarna extra checks of optimalisaties toe.',
        ctaHref: '/templates',
    },
];

function mergeUniqueGuidePages(...groups: SeoGuidePage[][]): SeoGuidePage[] {
    const merged: SeoGuidePage[] = [];
    const seen = new Set<string>();

    for (const group of groups) {
        for (const page of group) {
            if (seen.has(page.slug)) continue;
            seen.add(page.slug);
            merged.push(page);
        }
    }

    return merged;
}

const dutchWavePages = mergeUniqueGuidePages(
    dutchSeeds.map(toDutchGuide),
    dutchEditorialPages,
    extraDutchEditorialPages,
    getPilotRoleGuidePages()
);
const englishWavePages = englishSeeds.map(toEnglishGuide);

const dutchMap = new Map(dutchWavePages.map((page) => [page.slug, page]));
const englishMap = new Map(englishWavePages.map((page) => [page.slug, page]));

export function getDutchWavePages(): SeoGuidePage[] {
    return dutchWavePages;
}

export function getEnglishWavePages(): SeoGuidePage[] {
    return englishWavePages;
}

export function getDutchWavePage(slug: string): SeoGuidePage | undefined {
    return dutchMap.get(slug);
}

export function getEnglishWavePage(slug: string): SeoGuidePage | undefined {
    return englishMap.get(slug);
}

export {
    buildRoleGuidePage,
    getPilotGuideFamilies,
    getPilotGuideFamily,
    getPilotRoleGuidePage,
    getPilotRoleGuidePages,
    getPilotRoleTaxonomy,
} from './programmatic-builders';
