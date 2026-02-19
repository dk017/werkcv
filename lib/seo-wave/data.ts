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
    intro?: string;
    checklist?: string[];
    faq?: SeoGuidePage['faq'];
    relatedLinks?: SeoGuidePage['relatedLinks'];
    ctaText?: string;
    sectionOverrides?: Record<string, SectionOverride>;
};

const dutchSeeds: DutchSeed[] = [
    { slug: 'cv-voorbeeld-administratief-medewerker', keyword: 'cv voorbeeld administratief medewerker', role: 'administratief medewerker', painPoint: 'je taken concreet en meetbaar te maken' },
    { slug: 'cv-voorbeeld-klantenservice-medewerker', keyword: 'cv voorbeeld klantenservice medewerker', role: 'klantenservice medewerker', painPoint: 'zowel soft skills als KPI-resultaten te laten zien' },
    { slug: 'cv-voorbeeld-verkoopmedewerker', keyword: 'cv voorbeeld verkoopmedewerker', role: 'verkoopmedewerker', painPoint: 'commerciele resultaten kort en overtuigend te benoemen' },
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
            },
            ats: {
                bullets: [
                    'Combineer Engelse kerntermen met Nederlandse vacaturewoorden: bijvoorbeeld "customer success / klanttevredenheid".',
                    'Gebruik functietitels uit de vacature en voeg zo nodig een alternatieve titel tussen haakjes toe.',
                    'Noem taalniveau expliciet (Nederlands A2/B1/B2, English C1/C2) zodat recruiters risico beter inschatten.',
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
    'cv-zonder-ervaring-mbo': {
        intro: 'Zonder formele werkervaring kun je nog steeds een sterk CV maken. MBO-starters winnen juist op houding, leervermogen en aantoonbare praktijkervaring uit stage, school en bijbaan.',
        sectionOverrides: {
            profieltekst: {
                exampleItems: [
                    'MBO-starter met recente stage- en bijbaanervaring, gewend om verantwoordelijkheid te nemen en afspraken na te komen.',
                    'Leergierig en praktisch ingesteld, met focus op snel inwerken en zorgvuldig uitvoeren van werkzaamheden.',
                ],
            },
            werkervaring: {
                exampleItems: [
                    'Tijdens stage zelfstandig dagtaken uitgevoerd en positief beoordeeld op inzet en nauwkeurigheid.',
                    'Schoolproject opgeleverd binnen deadline met duidelijke taakverdeling en teamwork.',
                    'Bijbaanervaring gebruikt om klantcontact, tempo en werkdiscipline aantoonbaar te ontwikkelen.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel: stage, praktijkervaring, leervermogen, teamwork, betrouwbaarheid.',
                    'Zet stage en bijbaan boven opleiding als die sterker aansluit op de vacature.',
                    'Noem relevante certificaten (VCA, BHV, heftruck, etc.) zodra je die hebt.',
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
            },
            werkervaring: {
                exampleItems: [
                    'Afstudeeronderzoek vertaald naar implementatieadvies dat door opdrachtgever is doorgevoerd.',
                    'Projectrol als coordinator ingevuld met oplevering binnen scope, planning en kwaliteitscriteria.',
                    'Stageopdracht uitgevoerd met stakeholderinterviews en datagedreven aanbevelingen.',
                ],
            },
            ats: {
                bullets: [
                    'Belangrijke termen voor dit type profiel: afstudeerproject, analyse, stakeholder, implementatie, resultaat.',
                    'Noem tools en methodes uit je studie alleen als je ze echt hebt toegepast.',
                    'Leg nadruk op transfer: hoe je studie-output direct waarde levert in de praktijk.',
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
    'cv-format-netherlands-english': {
        intro: 'Use this as an execution blueprint for English CVs in the Netherlands: exact section order, concise writing style, and ATS-safe formatting that still reads naturally to humans.',
        sectionOverrides: {
            layout: {
                bullets: [
                    'Header: name, city, contact info, LinkedIn, optional work permit line.',
                    'Summary: 3-4 lines with role focus, years of experience, and strongest value.',
                    'Experience: reverse-chronological, 3-5 impact bullets per recent role.',
                ],
            },
            'ats-keywords': {
                bullets: [
                    'Use role terms from the vacancy in summary, recent role bullets, and skills.',
                    'Avoid decorative CV elements that break text extraction in ATS parsing.',
                    'Keep file naming clear: Firstname-Lastname-CV.pdf',
                ],
            },
        },
    },
    'translate-resume-to-dutch-format': {
        intro: 'Converting a US/UK resume to Dutch format is mostly about structure and emphasis. Keep your facts, but reshape presentation for faster recruiter scanning in the Netherlands.',
        sectionOverrides: {
            wording: {
                paragraphs: [
                    'US/UK resumes often over-index on long narrative and under-index on role-specific summary. Dutch screening prefers concise relevance and practical proof.',
                    'When translating format, preserve your achievements but trim non-essential context. Move strongest evidence to page one.',
                ],
                bullets: [
                    'Replace long paragraph summaries with 3-4 focused lines.',
                    'Convert responsibility-heavy bullets into action + outcome statements.',
                    'Rename sections to Dutch-market familiar structure and order.',
                ],
            },
            'special-case': {
                paragraphs: [
                    'Before final export, compare your CV against the vacancy sentence-by-sentence and close wording gaps in title, skills, and outcomes.',
                    'The best conversion keeps your original credibility while matching Dutch recruiter scan behavior.',
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
            },
            'special-case': {
                bullets: [
                    'Run a final vacancy-to-CV comparison and close wording gaps before each application.',
                    'Keep one base CV, but always create a role-specific variant for high-value applications.',
                    'If interview rate is low, audit title wording and top-five keywords first.',
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
        intro: 'A LinkedIn profile and a Dutch CV are not the same format. This page shows how to convert profile content into a concise, ATS-friendly CV that recruiters can scan fast.',
        sectionOverrides: {
            wording: {
                paragraphs: [
                    'LinkedIn often contains broad career narrative. A strong Dutch CV needs tighter selection and clearer prioritization.',
                    'Start by extracting only role-relevant achievements, then rewrite each into action + impact bullets.',
                ],
                bullets: [
                    'Convert long LinkedIn role descriptions into 3-5 concise outcome bullets.',
                    'Move endorsements and recommendations into proof points, not separate sections.',
                    'Prioritize most relevant roles for the target vacancy, even if older roles were more senior.',
                ],
            },
            layout: {
                bullets: [
                    'Use a compact summary instead of a long "About" paragraph.',
                    'Keep skills section focused on vacancy-relevant terms only.',
                    'Retain LinkedIn URL in contact block, but keep CV self-sufficient without external clicks.',
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
                question: 'Can I just export LinkedIn as PDF and apply?',
                answer: 'You can, but conversion usually improves when you rewrite for Dutch CV structure and vacancy-specific priorities.',
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
            },
            'special-case': {
                bullets: [
                    'Add graduation date and availability clearly in the header section.',
                    'Keep one strong page; avoid overloading with unrelated academic detail.',
                    'Use vacancy-specific terminology in top skills and recent project bullets.',
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
        intro: override.intro ?? page.intro,
        checklist: override.checklist ?? page.checklist,
        faq: override.faq ?? page.faq,
        relatedLinks: override.relatedLinks ?? page.relatedLinks,
        ctaText: override.ctaText ?? page.ctaText,
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
    const base = [
        {
            href: '/en/guides/dutch-cv-for-expats',
            title: 'Dutch CV for expats',
            description: 'Core structure and positioning principles for international candidates.',
        },
        {
            href: '/en/guides/netherlands-cv-keywords-ats',
            title: 'ATS keyword guide',
            description: 'How to align vacancy language with your CV without keyword stuffing.',
        },
        {
            href: '/en/guides/translate-resume-to-dutch-format',
            title: 'Translate resume to Dutch format',
            description: 'Convert US/UK resume style into Dutch recruiter-friendly presentation.',
        },
    ];

    const extra = [
        {
            href: '/en/guides/cv-format-netherlands-english',
            title: 'CV format Netherlands (English)',
            description: 'Section order and writing style that matches Dutch recruiter scanning behavior.',
        },
        {
            href: '/en/guides/netherlands-cover-letter-basics',
            title: 'Netherlands cover letter basics',
            description: 'Keep your cover letter concise, relevant, and aligned with your CV evidence.',
        },
        {
            href: '/en/guides/one-page-cv-netherlands',
            title: 'One-page CV in the Netherlands',
            description: 'Decide what to keep, cut, and emphasize for faster recruiter review.',
        },
    ];

    const filtered = [...base, ...extra].filter((link) => !link.href.endsWith(`/${seed.slug}`));
    const deduped = filtered.filter(
        (link, idx, arr) => arr.findIndex((item) => item.href === link.href) === idx
    );
    if (seed.slug === 'netherlands-cover-letter-basics') {
        return [
            ...deduped.slice(0, 2),
            {
                href: '/en/guides/cv-format-netherlands-english',
                title: 'English CV format in NL',
                description: 'Keep cover letter language and CV structure aligned for better interview conversion.',
            },
        ];
    }

    return deduped.slice(0, 3);
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
        ctaText: 'Apply this framework directly in our editor and export a clean, ATS-friendly PDF.',
        ctaHref: '/templates',
    };

    return applyGuideOverride(page, englishBespokeOverrides[seed.slug]);
}

const dutchWavePages = dutchSeeds.map(toDutchGuide);
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
