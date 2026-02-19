import { BlogArticle } from '../types';

export const cvVoorTechsector: BlogArticle = {
    slug: 'cv-voor-techsector',
    title: 'CV voor de Techsector: Zo Solliciteer je als Developer, Data- of IT-Professional',
    description: 'Een tech-cv werkt anders dan een standaard cv. Lees hoe je als developer, data-engineer of IT-professional je GitHub, skills-stack, projecten en resultaten overtuigend presenteert voor Nederlandse tech-recruiters.',
    metaTitle: 'CV voor de Techsector: Tips voor Developers en IT-Professionals 2026 | WerkCV.nl',
    metaDesc: 'CV tips voor developers, data-engineers en IT-professionals in Nederland. Stack presenteren, GitHub koppelen, ATS-proof schrijven en opvallen bij tech-recruiters — complete gids 2026.',
    category: 'schrijven',
    keywords: [
        'cv it sector',
        'tech cv nederland',
        'cv software developer',
        'cv developer tips',
        'it cv schrijven',
        'cv data engineer',
        'developer cv nederland',
        'technologie cv tips',
    ],
    publishedAt: '2026-02-19',
    updatedAt: '2026-02-19',
    readingTime: 10,
    featured: false,
    order: 22,
    keyTakeaways: [
        '137.000 openstaande IT-vacatures in Nederland (CBS/UWV 2025) — tech-recruiters hebben weinig tijd per cv.',
        '89% van tech-recruiters bekijkt een GitHub-profiel of portfolio vóór of tijdens het gesprek (LinkedIn Talent Solutions 2024).',
        'Noem je stack concreet en herleidbaar: niet "backend-ervaring", maar "Python/Django, PostgreSQL, AWS EC2".',
        'Beschrijf werkervaring als systeem-eigenaar, niet als takenlijst — resultaten en schaal tellen mee.',
        'ATS in tech scant op exacte tool-namen; gebruik de termen zoals ze in de vacature staan.',
        'Soft skills voor remote en distributed werken zijn in 2026 net zo belangrijk als technische skills.',
        'Een tech-cv mag 2 pagina\'s zijn bij 5+ jaar relevante ervaring; één pagina is de standaard voor starters.',
    ],
    sections: [
        {
            id: 'tech-cv-anders',
            title: 'Waarom een tech-cv anders werkt dan een standaard cv',
            answerCapsule: 'Tech-recruiters scannen op concrete tools, schaal en GitHub — generieke omschrijvingen werken averechts; specificiteit wint.',
            content: [
                'In de techsector zijn 137.000 vacatures onvervuld (CBS/UWV 2025) en zijn IT-professionals gemiddeld zeven keer per jaar actief benaderd door recruiters (Stack Overflow Developer Survey 2024). Toch worden cv\'s afgewezen — bijna altijd omdat ze te vaag zijn. "Ervaring met backend-ontwikkeling" zegt niets. "Python 3.11, FastAPI, PostgreSQL, Celery, gedeployed op AWS ECS" zegt alles.',
                'Een tech-cv wordt anders gelezen dan een generiek cv. Recruiters en hiring managers kijken eerst naar de technische vaardigheidssectie en het meest recente project of werkgever. Daarna volgt GitHub of een portfoliolink. De profieltekst lezen ze als bevestiging, niet als introductie. Dit vereist een andere opbouw: technisch bewijs vooraan, narratief ter ondersteuning.',
                'Nederland heeft een tekort van 44.000 IT-professionals (UWV 2025). Toch slaagt niet iedereen erin snel een nieuwe functie te vinden. Het verschil zit bijna altijd in de presentatie: kandidaten die hun ervaring kwantificeren en hun stack concreet benoemen, krijgen 40% meer terugkoppeling dan kandidaten die algemene omschrijvingen gebruiken (HackerRank Developer Skills Report 2024).',
            ],
        },
        {
            id: 'technische-vaardigheden',
            title: 'Technische vaardigheidssectie: structuur en diepgang',
            answerCapsule: 'Groepeer je stack in logische categorieën (talen, frameworks, cloud, databases, tooling) en vermeld alleen wat je daadwerkelijk productioneel hebt ingezet.',
            content: [
                'De vaardigheidssectie is in een tech-cv de meest gelezen sectie na je naam. Structureer het in duidelijke subcategorieën zodat recruiters en hiring managers snel kunnen scoren: beheers jij de technologieën die zij nodig hebben?',
                'Vermeld alleen wat je daadwerkelijk productioneel hebt ingezet. Een taal die je ooit in een tutorial hebt gezien, doet je cv goed maar je technisch interview slecht. Eerlijkheid over diepgang is voor tech-recruiters een kwaliteitssignaal: iemand die zegt "Java (basiskennisniveau)" is betrouwbaarder dan iemand die Java op gelijke voet met Python noemt na twee workshops.',
                'Geef per categorie concreet aan. Gebruik een beknopte lijst of twee kolommen — vermijd proza in deze sectie. JetBrains Developer Ecosystem Survey (2025) bevestigt dat hiring managers gemiddeld 11 seconden besteden aan de technische vaardigheidssectie van een cv. Maak die 11 seconden zo productief mogelijk.',
            ],
            bullets: [
                'Programmeertalen: Python 3.x, TypeScript, Go (productioneel); Java (basis)',
                'Frameworks: FastAPI, Next.js, React, gRPC',
                'Databases: PostgreSQL, Redis, Elasticsearch',
                'Cloud & infra: AWS (EC2, S3, Lambda, ECS), Docker, Kubernetes, Terraform',
                'CI/CD & tooling: GitHub Actions, ArgoCD, Datadog, Sentry',
                'Methoden: Scrum, Domain-Driven Design, Event-driven architecture',
            ],
        },
        {
            id: 'github-portfolio',
            title: 'GitHub, portfolio en projecten: hoe koppel je ze slim',
            answerCapsule: 'Een actief GitHub-profiel verhoogt de kans op een uitnodiging met 40%; link direct naar relevante repos, niet naar je profielpagina.',
            content: [
                'Volgens LinkedIn Talent Solutions (2024) bekijkt 89% van tech-recruiters een GitHub-profiel of portfoliolink vóór of tijdens het eerste gesprek. Een GitHub-link op je cv zonder actieve, relevante repo\'s werkt averechts — het roept vragen op die je nog moet beantwoorden. Zorg dat je profiel actueel is: README\'s aanwezig, commits recente datums, beschrijvingen in het Engels of Nederlands.',
                'Link niet naar je algemene GitHub-profielpagina als startpunt, maar direct naar je meest relevante repository of project. Geef in je cv een kortere toelichting naast de link: "GitHub: github.com/jouwnaam — open source bijdrage aan [project], 230 commits, 47 stars." Dat is een statement, geen hyperlink.',
                'Heb je geen openbare code? Dat is begrijpelijk bij NDA-werk. Maak dan een of twee demoprojecten publiek die je technisch denkvermogen laten zien. Een clean architecture demo, een technische blog of een open source library — zelfs klein — geeft recruiters een kapstok. HackerRank (2024) laat zien dat kandidaten met een zichtbare codeerbijdrage 40% vaker een eerste gesprek krijgen.',
            ],
        },
        {
            id: 'werkervaring-als-developer',
            title: 'Werkervaring beschrijven als tech-professional',
            answerCapsule: 'Beschrijf werkervaring als systeem-eigenaar: welk systeem, welke schaal, welk probleem opgelost en welk meetbaar resultaat — niet een lijst van taken.',
            content: [
                'De meest voorkomende fout in tech-cv\'s is werkervaring beschrijven als takenlijst. "Ontwikkelde nieuwe features voor e-commerceplatform." Zegt niets. "Bouwde product aanbevelingsmodule (Python/Kafka) die verwerkingstijd verlaagde van 4 seconden naar 280 ms, wat directe invloed had op conversie in checkout." Zegt alles.',
                'Beschrijf iedere werkervaring vanuit drie elementen: het systeem waaraan je werkte (schaal, complexiteit), het probleem dat je oploste of de functionaliteit die je toevoegde, en het meetbare resultaat — in tijd, geld, uptime, performance of gebruikerservaring. Als je de schaal kent (dagelijks X verzoeken, Y terabytes data, Z gelijktijdige gebruikers), benoem die dan. Schaal is in tech een kwaliteitsmarker.',
                'Probeer ook de rolbenamingen eerlijk te gebruiken. "Senior software engineer" bij een scale-up van 30 personen is anders dan bij een bedrijf van 2.000. Als je twijfelt, voeg dan context toe: "senior engineer in team van 6, verantwoordelijk voor platformbetrouwbaarheid bij 50.000 dagelijkse gebruikers." Dat is informatiever dan een generieke titel.',
            ],
        },
        {
            id: 'ats-tech',
            title: 'ATS in de techsector: andere regels dan je denkt',
            answerCapsule: 'Tech-ATS scant op exacte tool-namen en functietnamen uit de vacature — schrijf "Kubernetes" niet "container orchestratie" als de vacature Kubernetes vraagt.',
            content: [
                'In de techsector gebruiken 72% van de bedrijven met meer dan 50 medewerkers een ATS (Techniek Nederland 2024). Het verschil met ATS in andere sectoren: tech-ATS systemen zijn geoptimaliseerd op exacte productnamen, versies en methodieken. "Container orchestratie" is voor een mens begrijpelijk als Kubernetes-equivalent — voor een ATS-systeem is het een miss.',
                'Lees elke vacature aandachtig en neem de exacte naamgeving over. Als de vacature vraagt om "AWS certified experience", schrijf je niet "cloud-ervaring (Amazon)". Gebruik de exacte term en voeg dan de context toe. Vermeld certificeringen bij naam: "AWS Solutions Architect Associate (2024)", "Kubernetes CKAD (2023)".',
                'Opmaak in tech-cv\'s is een extra ATS-risico: veel developers gebruiken mooie twee-koloms templates, tabelopmaak of grafische skill-bars. Alle drie zijn problematisch voor ATS-parsing. Houd je cv tekstueel clean: eén kolom, duidelijke headers, PDF van een tekstgenerator (niet van Canva of Figma), bestandsnaam "Voornaam-Achternaam-CV.pdf".',
            ],
        },
        {
            id: 'soft-skills-tech',
            title: 'Soft skills voor tech: hoe bewijs je ze zonder clichés',
            answerCapsule: 'Schrijf nooit "teamplayer" of "communicatief sterk" zonder bewijs. Koppel elke soft skill aan een concreet resultaat of besluitmoment.',
            content: [
                'In de techsector zijn soft skills als asynchrone communicatie, proactief eigenaarschap en stakeholder-alignment steeds vaker gevraagd — zeker in remote of hybride teams. Maar "sterke communicatievaardigheden" is de meest genegeerde zin op een tech-cv. Recruiters lezen het al 50 keer per dag.',
                'Bewijs soft skills via gedragsbewijzen in je werkervaring-bullets. "Schreef technische documentatie voor migratie die 4 product teams zelfstandig konden volgen zonder extra uitleg." Dat is communicatief sterk. "Leidde wekelijkse alignment-call tussen engineering, product en operations; besluitlooptijd verlaagd van 2 weken naar 3 werkdagen." Dat is stakeholder-management.',
                'In distributed teams — en 52% van Nederlandse kenniswerkers werkt hybride (TNO NEA 2024) — zijn async-schrijfvaardigheden, pull-request cultuur en documentatiegewoonten concrete competenties. Vermeld Confluence- of Notion-documentatie, RFC-processen of async decision logs als je die hebt bijgehouden. Dat is voor remote-first bedrijven een sterk signaal.',
            ],
        },
        {
            id: 'certificeringen-bootcamps',
            title: 'Certificeringen en bootcamps: hoe vermeld je ze geloofwaardig',
            answerCapsule: 'Vermeld alleen certificeringen die je actief hebt gebruikt in een project; voeg het jaar toe en zet ze in een aparte sectie boven opleiding als ze recenter zijn.',
            content: [
                'Cloud-certificeringen (AWS, Azure, GCP) en DevOps-certificeringen (CKA, CKAD, Terraform Associate) zijn in Nederland erkende kwaliteitsmarkers. Vermeld ze met volledige naam, uitgevende instantie en jaar: "Google Professional Data Engineer, Google Cloud, 2025." Verlopen certificeringen laat je weg of noem je "verlopen" als de werkervaring ermee relevant is.',
                'Bootcamp-diploma\'s — van Le Wagon, Codaisseur, Rockstart of internationale platforms als Flatiron — zijn breed geaccepteerd in de Nederlandse tech-sector. Combineer ze altijd met concreet projectbewijs: wat heb je ermee gebouwd, in welk team, met welke technologie? De combinatie van bootcamp-diploma + GitHub-project + eerste werkervaring is een sterk startersprofiel.',
                'Certificeringen van platforms als Coursera, Udemy of Pluralsight zijn minder zwaarwegend tenzij ze van gerenommeerde partijen komen (Google, AWS, Microsoft, Databricks). Zet ze niet op gelijk niveau met erkende branchecertificaten. Maak een duidelijk onderscheid: "Professionele certificeringen" vs. "Bijscholing en online cursussen".',
            ],
        },
        {
            id: 'scaleup-vs-corporate',
            title: 'CV voor scale-up vs. corporate IT: wat wil welke werkgever zien?',
            answerCapsule: 'Scale-ups zoeken breedte, eigenaarschap en bewijs van impact; corporate IT zoekt specialisatie, compliance-bewustzijn en teamproces.',
            content: [
                'De Nederlandse tech-arbeidsmarkt bestaat voor een groot deel uit scale-ups en middelgrote productbedrijven naast de bekende corporate IT-afdelingen van banken, verzekeraars en overheid. Beide werkgeverstypen lezen hetzelfde cv, maar zoeken andere signalen.',
                'Scale-ups (Adyen, Booking.com, NEAR, Mollie, Picnic en vergelijkbaar) zoeken op eigenaarschap, snelheid en impact per individu. Bewijs dat je zelfstandig systemen hebt ontworpen, beslissingen hebt genomen met beperkte sturing, en bereid bent buiten je jobtitel te opereren. Resultaten in productvoltooiing, performanceverbeteringen en teamefficiëntie trekken de aandacht.',
                'Corporate IT (ABN AMRO, Rabobank, ING, Belastingdienst, gemeente Amsterdam) zoekt op procesbeheersing, compliance-bewustzijn (ISO 27001, NEN 7510, BIO-kader), documentatie en samenwerking in grotere teams. Benoem projectmethodieken (SAFe, PRINCE2, Scrum binnen governance-kader) en vermeld specifieke ervaringen met audit-trails, security-reviews of change management als je die hebt.',
            ],
        },
        {
            id: 'open-source-bijdragen',
            title: 'Open source bijdragen op je cv: wanneer en hoe',
            answerCapsule: 'Een open source bijdrage van meer dan 5 commits aan een actief project is cv-waardig; vermeld het project, het aantal bijdragen en het concrete effect.',
            content: [
                'Open source bijdragen zijn in de internationale tech-wereld een erkend kwaliteitssignaal. In Nederland is dit minder vanzelfsprekend — veel developers hebben NDA-gerelateerd werk — maar bij product- en platformbedrijven wordt een zichtbare bijdrage sterk gewaardeerd.',
                'Vermeld open source bijdragen als ze substantieel zijn: meer dan vijf commits aan een actief project, een merged pull request met reviewproces, of onderhoud van een eigen tool met gebruikers. Beschrijf wat je bijdroeg en het effect: "Bijgedragen aan [project] (Python/async): bugfix in event-loop handling, geaccepteerd door core-team, 3.200 afhankelijke packages."',
                'Kleinere bijdragen — typo-fixes, documentatiewijzigingen — noem je niet individueel. Bundel ze in een GitHub-sectie of laat ze alleen zichtbaar zijn via je profiel. Kwaliteit boven kwantiteit geldt hier dubbel: één substantiële bijdrage zegt meer dan vijftig kleinigheden.',
            ],
        },
        {
            id: 'profieltekst-tech',
            title: 'Profieltekst voor een tech-cv: specifiek, kort, vol bewijs',
            answerCapsule: 'Een tech-profieltekst is maximaal 4 regels: rol + hoofdstack + schaal van ervaring + wat je zoekt. Geen vaag verhaal, geen zelfpromotie zonder bewijs.',
            content: [
                'De profieltekst van een tech-cv is het minst gelezen onderdeel — tenzij het vertrouwen wekt. Recruiters springen er snel doorheen om hun eerste indruk te toetsen aan de vaardigheidssectie en recente werkervaring. Maak de profieltekst dus kort, specifiek en herleidbaar.',
                'Vier regels zijn genoeg: (1) je rol en hoofdstack, (2) het type systemen of producten waarmee je hebt gewerkt en op welke schaal, (3) wat je onderscheidt of waar je het best in bent, (4) wat je zoekt. Vermijd "passionaat", "gedreven" en "resultaatgericht" tenzij direct gevolgd door een concreet bewijs. Die woorden zijn voor recruiters in de techsector een kwaliteitsfilter in omgekeerde richting.',
                'Voorbeeld voor een backend developer: "Backend engineer met 6 jaar ervaring in Python/Go systemen voor high-traffic productieomgevingen (50k–500k verzoeken/dag). Specialisatie in event-driven architectuur en observability. Eerder werkzaam bij [bedrijfsnaam] en [bedrijfsnaam]. Op zoek naar een senior of lead-rol bij een productteam met eigenaarschap over de volledige stack." Concreet. Geen holle woorden.',
            ],
        },
    ],
    faq: [
        {
            question: 'Hoe lang mag een tech-cv zijn?',
            answer: 'Eén pagina voor starters en juniors met minder dan 3 jaar ervaring. Twee pagina\'s voor seniors met 5+ jaar relevante ervaring. Bij meer dan 15 jaar: wees selectief en toon alleen de afgelopen 10 jaar werkervaring.',
        },
        {
            question: 'Moet ik mijn stack vermelden als een bedrijf NDA-gerelateerd was?',
            answer: 'Ja, je mag de stack vermelden ook als het project zelf vertrouwelijk was. Technologie is geen bedrijfsgeheim. Beschrijf het systeem-type en de schaal zonder bedrijfsnaam: "Event-streaming platform (Kafka, Python) voor financiële transactieverwerking bij een Tier-1 bank."',
        },
        {
            question: 'Is een GitHub-link verplicht op een tech-cv?',
            answer: 'Niet verplicht, maar sterk aanbevolen als je openbare, relevante code hebt. Link alleen als je profiel actief en representatief is. Een leeg of verouderd profiel werkt averechts.',
        },
        {
            question: 'Hoe vermeldt een junior developer werkervaring als ze vooral studies en projecten heeft?',
            answer: 'Zet studieprojecten in een sectie "Projecten" direct na opleiding. Beschrijf het project, de stack en het resultaat. Voeg GitHub-links toe per project. Stages gelden als werkervaring — beschrijf ze als zodanig.',
        },
        {
            question: 'Moet ik mijn salarisverwachting in een tech-cv zetten?',
            answer: 'Nee. Salarisverwachting hoort in de sollicitatiebrief als de vacature er expliciet om vraagt, niet in je cv. In de tech-sector zijn transparante salarisranges steeds gebruikelijker door de EU loontransparantierichtlijn (implementatie NL 2026).',
        },
        {
            question: 'Hoe ga ik om met verouderde technologie die ik heb gebruikt maar niet meer gebruik?',
            answer: 'Vermeld het in een subsectie "Eerdere ervaring" of simpelweg "ook gewerkt met" met een neutrale toon. Of laat het weg als het irrelevant is voor je doelrollen. Focus op je huidige, meest relevante stack.',
        },
        {
            question: 'Welke softskills zijn het meest gevraagd in Nederlandse tech-vacatures?',
            answer: 'Asynchrone communicatie, pull-request-eigenaarschap, documentatiediscipline en stakeholder-alignment zijn de vier meest genoemde soft skills in 2025-2026 tech-vacatures in Nederland, met name bij remote en hybride teams.',
        },
    ],
    relatedArticleSlugs: [
        'ats-vriendelijk-cv',
        'cv-vaardigheden-kiezen',
        'remote-werk-cv',
        'cv-werkervaring-beschrijven',
    ],
    relatedExampleSlugs: [
        'technologie-en-ict/software-ontwikkelaar',
        'technologie-en-ict/data-engineer',
        'technologie-en-ict/ict-projectleider',
    ],
};
