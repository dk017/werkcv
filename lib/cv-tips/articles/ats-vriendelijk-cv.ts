import { BlogArticle } from '../types';

export const atsVriendelijkCv: BlogArticle = {
    slug: 'ats-vriendelijk-cv',
    title: 'ATS-vriendelijk CV Maken: Zo Kom je Door de Automatische Filter (2026)',
    description: 'Tot 75% van de cv\'s wordt door ATS-software afgewezen vóór een recruiter ze ziet. Leer hoe je opmaak, zoekwoorden en bestandsformaat kiest zodat jouw cv de automatische screening overleeft.',
    publishedAt: '2025-06-10',
    updatedAt: '2026-02-19',

    metaTitle: 'ATS-vriendelijk CV Maken: Door de Filter Komen in 2026 | WerkCV.nl',
    metaDesc: 'ATS filtert 70–75% van alle cv\'s weg vóór menselijke beoordeling. Leer welke opmaak, zoekwoorden en bestandsformaten werken voor Nederlandse ATS-systemen zoals OTYS, Connexys en Workday.',
    keywords: ['ats-vriendelijk cv', 'applicant tracking system', 'cv ats', 'cv door ats krijgen', 'ats cv tips', 'cv scanbaar maken', 'ats cv nederland', 'cv automatische screening'],

    readingTime: 10,
    category: 'opmaak',
    featured: false,
    order: 10,

    keyTakeaways: [
        '70–75% van alle ingezonden cv\'s wordt door ATS gefilterd vóór een recruiter ze ziet (Jobscan 2024).',
        'Een eenkoloms cv heeft 97% parse-nauwkeurigheid in ATS; een tweekoloms cv slechts 68% (Jobscan).',
        'Gebruik exacte vacaturetermen — ATS matcht op letterlijke tekst, niet op synoniemen.',
        'Contactgegevens in kop- of voetteksten worden door veel ATS-systemen overgeslagen.',
        'PDF is veilig voor moderne ATS; .docx werkt beter bij oudere systemen — check de vacature.',
        'Test je cv: kopieer de tekst naar Kladblok — als alles klopt lees je, is de opmaak ATS-veilig.',
        'Nederlandse ATS-systemen: OTYS, Connexys, Recruitee; internationaal: Workday, Greenhouse, Taleo.',
    ],

    sections: [
        {
            id: 'wat-is-ats',
            title: 'Wat is ATS en waarom filtert het jouw cv weg?',
            answerCapsule: 'ATS (Applicant Tracking System) scant cv\'s automatisch op keywords, opmaak en structuur — 70–75% van alle cv\'s wordt weggefiltered vóór een recruiter ze ziet.',
            content: [
                'Een Applicant Tracking System (ATS) is software die bedrijven gebruiken om sollicitaties automatisch te beheren, te filteren en te rangschikken. Het systeem scant je cv op zoekwoorden, werkervaring, opleidingsniveau en opmaak — en berekent een match-score met de vacature-eisen. Alleen cv\'s boven een bepaalde drempelwaarde bereiken de inbox van een recruiter.',
                'In Nederland gebruiken naar schatting 75% van de bedrijven met meer dan 50 medewerkers een vorm van ATS-software (Jobscan 2024). Bekende Nederlandse systemen zijn OTYS Recruiting Technology en Connexys (Randstad-platform). Internationaal domineren Workday, Greenhouse, Lever en Oracle Taleo. Elk systeem heeft zijn eigen parsing-logica, maar de basisregels zijn universeel.',
                'De gevolgen zijn concreet: uit onderzoek van Jobscan (2024) blijkt dat gemiddeld 70 tot 75% van alle ingezonden cv\'s door ATS wordt afgewezen vóór menselijke beoordeling. Een perfect geschreven cv dat niet ATS-compatibel is opgemaakt, bereikt de recruiter nooit. Dit artikel behandelt elke variabele die dat percentage bepaalt — zodat jij bij de 25–30% hoort die wél doorgaat.',
            ],
        },
        {
            id: 'opmaak-voor-ats',
            title: 'Opmaak: de meest onderschatte ATS-fout',
            answerCapsule: 'Twee kolommen, tabellen, tekstvakken en grafische elementen zijn de meest voorkomende ATS-breakers — een eenkoloms layout scoort 97% parse-nauwkeurigheid vs 68% bij tweekoloms.',
            content: [
                'ATS-software leest cv\'s als platte tekst, van boven naar beneden. Een tweekoloms layout — populair bij veel cv-templates — wordt door ATS gelezen als één lange tekstkolom waarbij kolom 1 en kolom 2 worden samengevoegd. Het resultaat: "Python | 5 jaar" wordt "Python 5 jaar" of erger, de tekst loopt door elkaar en sectienamen worden niet herkend. Jobscan-tests tonen dat eenkoloms cv\'s 97% parse-nauwkeurigheid scoren; tweekoloms slechts 68%.',
                'Vermijd tabellen voor het indelen van vaardigheden of werkervaring. Wat er visueel als een nette tabel uitziet, wordt door ATS geëxtraheerd als een aaneengesloten tekstreeks zonder structuur. Datzelfde geldt voor tekstvakken (text boxes), kaders, grafische skill-bars en iconen voor sectiescheiders. Al deze elementen worden door de meeste ATS-parsers genegeerd of verkeerd geïnterpreteerd.',
                'De veiligste opmaak: eenkoloms layout, standaard lettertype (Arial, Calibri of Lato, minimaal 10pt), bullet points als gewone tekstronde punten (•) of streepjes (-), en sectiescheiders als een eenvoudige horizontale lijn of wit ruimte. Kleuraccenten op kopjes zijn prima — zolang de tekst zelf zwart op wit is. Minimale marges van 2 cm rondom. Geen kop- of voetteksten voor cv-inhoud.',
            ],
        },
        {
            id: 'standaard-kopjes',
            title: 'Sectienamen: gebruik wat ATS herkent',
            answerCapsule: 'ATS herkent standaard sectienamen als "Werkervaring", "Opleiding" en "Vaardigheden" — creatieve koppen als "Mijn verhaal" of "Toolbox" worden genegeerd en de inhoud verdwijnt.',
            content: [
                'ATS-software koppelt de tekst onder een sectiekoppen aan de juiste categorieën in het systeem: werkervaring gaat naar de ervarings-database, opleiding naar het opleidingsveld, vaardigheden naar de skills-index. Dit werkt alleen als het systeem de kop herkent. Creatieve koppen als "Mijn reis", "Waar ik uitblink" of "Toolbox" worden door de meeste systemen niet gematcht — de bijbehorende inhoud wordt genegeerd of in een onbekende categorie opgeslagen.',
                'Gebruik in een Nederlands cv de volgende standaard sectienamen: Profiel of Profieltekst, Werkervaring, Opleiding, Vaardigheden, Talen, en optioneel Certificeringen of Vrijwilligerswerk. In een Engelstalig cv voor internationale werkgevers gebruik je: Profile of Summary, Work Experience, Education, Skills, Languages. Wijk hier alleen af als je zeker weet dat de werkgever een eigen ATS-systeem heeft met aangepaste parsing.',
                'Een subtiel maar belangrijk punt: zet je contactgegevens (naam, telefoonnummer, e-mail, LinkedIn, woonplaats) altijd in de hoofdtekst van je cv — nooit in de kop- of voettekst van het document. Kop- en voetteksten worden door minimaal 30% van de ATS-systemen volledig overgeslagen (Jobscan 2024). Als je naam in de voettekst staat, bestaat de kans dat het systeem jouw sollicitatie registreert als "onbekende kandidaat".',
            ],
            bullets: [
                'Profiel / Profieltekst (niet: "Over mij", "Mijn verhaal", "In het kort")',
                'Werkervaring (niet: "Loopbaan", "Professionele reis", "Wat ik heb gedaan")',
                'Opleiding (niet: "Academische achtergrond", "Leerpad", "Mijn studies")',
                'Vaardigheden (niet: "Toolbox", "Mijn krachten", "Expertise")',
                'Talen (apart vermelden, niet samenvoegen met vaardigheden)',
                'Certificeringen (optioneel, apart van opleiding als er meer dan 2 zijn)',
            ],
        },
        {
            id: 'zoekwoorden-strategie',
            title: 'Zoekwoorden: de kern van ATS-matching',
            answerCapsule: 'ATS matcht op exacte tekst — gebruik de woordkeuze van de vacature letterlijk in je profieltekst, werkervaring en vaardigheidssectie voor een hogere match-score.',
            content: [
                'De match-score die ATS berekent, is grotendeels gebaseerd op keyword-overlap tussen jouw cv en de vacaturetekst. Jobscan-onderzoek (2024) laat zien dat kandidaten met een keyword-match boven de 70% 2,5 keer vaker worden uitgenodigd voor een gesprek dan kandidaten met een match onder de 50%. Dit is geen magie — het is tekst-matching.',
                'Lees de vacature aandachtig en identificeer drie soorten zoekwoorden: (1) functietitels en rolnamen ("projectmanager", "scrum master", "financieel analist"), (2) vereiste vaardigheden en tools ("Salesforce", "Python", "IFRS", "lean manufacturing"), en (3) branchespecifieke termen en certificeringen ("PRINCE2", "CPA", "BIG-geregistreerd"). Neem al drie categorieën letterlijk over in je cv — niet als synoniem, maar als exact dezelfde term.',
                'Gebruik zowel de volledige term als gangbare afkortingen wanneer die in de vacature worden gebruikt: "Search Engine Optimization (SEO)", "Agile/Scrum", "Applicant Tracking System (ATS)". Dit dekt beide varianten af. Verwerk zoekwoorden organisch: in je profieltekst, in werkervaring-bullets en in de vaardigheidssectie. Keyword-stuffing — het onnatuurlijk herhalen van termen — wordt herkend door moderne ATS en kan je score verlagen.',
            ],
        },
        {
            id: 'bestandsformaat',
            title: 'Bestandsformaat: PDF vs .docx vs de rest',
            answerCapsule: 'PDF is de standaard voor moderne ATS-systemen; .docx werkt beter bij oudere systemen — controleer altijd de vacature en lever nooit een gescand document of afbeelding in.',
            content: [
                'Het bestandsformaat is de meest basale ATS-vereiste en tegelijk de meest onderschatte. Moderne ATS-systemen (Workday, Greenhouse, Recruitee, OTYS) verwerken PDF correct — mits de PDF is gegenereerd vanuit een tekstverwerker, niet gescand. Oudere ATS-systemen (sommige Taleo-versies, lokale HR-software) geven nog steeds de voorkeur aan .docx. Controleer daarom altijd de vacaturetekst of het sollicitatieformulier op instructies over bestandsformaat.',
                'De gevaarlijkste varianten: een gescand cv (.jpg of .pdf van scan) wordt door ATS niet als tekst gelezen tenzij het systeem OCR-technologie heeft — wat lang niet altijd het geval is. Een Canva-export als PDF ziet er mooi uit maar bevat vaak ontoegankelijke vectortekst die parsers niet kunnen lezen. Een .pages-bestand (Apple Pages) is voor de meeste Windows-gebaseerde ATS-systemen onleesbaar.',
                'De veiligste workflow: maak je cv in Microsoft Word of Google Docs, gebruik geen templates met tekstvakken of afbeeldingen, en exporteer naar PDF via Bestand → Opslaan als → PDF. Geef het bestand een professionele naam: "CV-Voornaam-Achternaam.pdf". Vermijd spaties in de bestandsnaam — sommige upload-systemen interpreteren spaties verkeerd.',
            ],
        },
        {
            id: 'werkervaring-voor-ats',
            title: 'Werkervaring ATS-proof beschrijven',
            answerCapsule: 'Vermeld per functie: exacte functietitel, bedrijfsnaam, maand + jaar begin en einde, locatie, en 3–5 keyword-rijke bullets — in die volgorde.',
            content: [
                'ATS-systemen gebruiken de structuur van je werkervaring-sectie om automatisch te berekenen hoeveel relevante ervaring je hebt. Dit werkt alleen als elke functie-entry compleet en consistent is opgebouwd. Een ontbrekende einddatum, een afgekorte bedrijfsnaam of een onduidelijke functietitel kan ertoe leiden dat ATS de ervaring niet correct meetelt.',
                'Vermeld bij elke functie de exacte functietitel (gebruik de gangbare brancheterm als je interne titel afwijkend is), de volledige bedrijfsnaam, de locatie (stad is voldoende), en een exacte periode in het formaat maand-jaar tot maand-jaar. Schrijf "jan. 2022 – mrt. 2024" niet "2022–2024" — maanden geven ATS de informatie om je ervaringslengte exact te berekenen.',
                'Gebruik per functie 3 tot 5 bullet points die beginnen met een actief werkwoord en relevante zoekwoorden bevatten. Vermijd speciale Unicode-bullets (✓, ★, ▸) — gebruik standaard ronde punten (•) of streepjes (-). Beschrijf resultaten en prestaties, niet alleen taken. Een ATS-systeem rankt cv\'s hoger als de werkervaring-bullets trefwoorden bevatten die overeenkomen met de "must-have" eisen in de vacature.',
            ],
        },
        {
            id: 'vaardigheden-sectie',
            title: 'Vaardigheidssectie optimaliseren voor ATS',
            answerCapsule: 'Een aparte vaardigheidssectie met exacte tool- en competentienamen verhoogt je ATS-match-score direct — groepeer in subcategorieën voor zowel ATS als menselijke leesbaarheid.',
            content: [
                'De vaardigheidssectie is de meest directe ATS-keyword-bron. ATS-systemen indexeren vaardigheden apart van werkervaring en vergelijken ze rechtstreeks met de gevraagde competenties in de vacature. Een vaardigheidssectie die ontbreekt of vage omschrijvingen bevat, verlaagt je match-score ook als je de vaardigheden wel hebt — maar alleen beschrijft in je werkervaring-bullets.',
                'Gebruik exacte, korte termen: "Python", "Projectmanagement", "SAP S/4HANA", "IFRS-rapportage", "Lean Six Sigma (Green Belt)". Vermijd vaagheid: "technisch onderlegd", "analytisch ingesteld" of "affiniteit met data" zijn voor ATS onherkenbare termen. Groepeer vaardigheden in subcategorieën om ook voor menselijke lezers overzichtelijk te zijn: Technische vaardigheden, Software & tools, Talen, Certificeringen.',
                'Stem je vaardigheidssectie af op elke vacature. Zet de meest relevante vaardigheden bovenaan — ATS-systemen die op positie rangschikken, geven meer gewicht aan eerder genoemde termen. Verwijder vaardigheden die niet relevant zijn voor de specifieke rol. Een gerichte lijst van 8 vaardigheden scoort beter dan een generieke lijst van 20.',
            ],
        },
        {
            id: 'veelgemaakte-fouten',
            title: 'De 7 meest voorkomende ATS-fouten',
            answerCapsule: 'De zeven ATS-breakers: tweekoloms layout, contactgegevens in voettekst, creatieve sectienamen, afbeeldingen in cv, gescand bestand, ontbrekende data bij functies, en geen zoekwoord-aanpassing per vacature.',
            content: [
                'De meest voorkomende ATS-fout is het gebruik van creatieve, multi-koloms cv-templates. Ze zien er professioneel uit voor menselijke ogen maar veroorzaken structurele parsing-fouten in ATS. Gevolgd door contactgegevens in de kop- of voettekst — die worden door een significant deel van de systemen genegeerd.',
                'Andere directe ATS-breakers zijn: grafische skill-bars (ATS leest "Python" met een visuele balk van 80% als "Python", niet als "Python: gevorderd"), profielfoto\'s als afbeeldingsbestand in de cv-tekst (ATS slaat afbeeldingen over), Unicode-decoratie als sectiescheider, en het gebruik van hetzelfde cv voor elke vacature zonder keyword-aanpassing.',
                'Een minder bekende maar schadelijke fout: functietitels die sterk afwijken van de gangbare brancheterm. Als je intern "Customer Success Advocate" heette maar de vacature zoekt op "accountmanager" of "klantenbeheerder", noem dan de gangbare term naast je interne titel. ATS matcht op de ingevoerde zoekterm van de recruiter — niet op wat jij begrijpt als equivalent.',
            ],
            bullets: [
                'Tweekoloms of meerkoloms layout → altijd eenkoloms',
                'Contactgegevens in kop- of voettekst → in de hoofdtekst plaatsen',
                'Creatieve sectienamen ("Toolbox", "Mijn reis") → standaard kopjes gebruiken',
                'Grafische skill-bars of iconen → tekstlijst van vaardigheden',
                'Gescand cv of Canva-export → PDF vanuit Word of Google Docs',
                'Ontbrekende maand+jaar bij functies → altijd volledige periode vermelden',
                'Zelfde cv voor alle vacatures → minimaal profieltekst + vaardigheden aanpassen',
            ],
        },
        {
            id: 'ats-en-recruiter',
            title: 'ATS-vriendelijk én aantrekkelijk voor de mens die daarna leest',
            answerCapsule: 'Een ATS-veilig cv hoeft niet saai te zijn: kleuraccenten in kopjes, witruimte en duidelijke bullets zorgen voor een cv dat zowel software als recruiter overtuigt.',
            content: [
                'Een veelgehoord misverstand: een ATS-vriendelijk cv is per definitie kaal en saai. Dat klopt niet. De ATS-regels gaan over structuur en tekstverwerking — niet over kleur, typografie of professionaliteit. Je kunt prima een visueel sterk cv maken dat ook door ATS correct wordt gelezen: gebruik kleuraccenten voor kopjes, zorg voor ruime marges, en structureer informatie met duidelijke bullet points.',
                'Het verschil tussen een goed en een excellent cv is dat het na de ATS-filter ook de recruiter overtuigt. ATS beslist of je cv gezien wordt; de recruiter beslist of je uitgenodigd wordt. Voor de recruiter zijn resultaatgerichte bullets, een scherpe profieltekst en een logische opbouw doorslaggevend. Schrijf in eerste instantie voor de mens — en zorg dat de technische opmaak ATS-proof is.',
                'Een praktische vuistregel: als je cv er goed uitziet in Google Docs of Word zonder enige speciale opmaakextensie, is het waarschijnlijk ATS-veilig. Als je cv alleen goed uitpakt in Canva, Figma of een fancy template-tool, test dan expliciet of de gegenereerde PDF tekstueel leesbaar is voordat je hem instuurt.',
            ],
        },
        {
            id: 'ats-cv-testen',
            title: 'Je cv testen op ATS-vriendelijkheid: drie manieren',
            answerCapsule: 'Test je cv: kopieer de tekst naar Kladblok — als alles klopt lees je, volgorde en sectienamen correct staan, is je cv ATS-veilig. Online ATS-checkers geven extra keyword-feedback.',
            content: [
                'De eenvoudigste ATS-test: open je cv-PDF, selecteer alle tekst (Ctrl+A), kopieer het (Ctrl+C) en plak het in een leeg Kladblok- of Notepad-document. Controleer: staat alle tekst er? Is de volgorde logisch (niet door elkaar gegooid door kolommen)? Zijn sectienamen herkenbaar? Ontbreekt er iets of staat er tekst in de verkeerde volgorde, dan heeft je cv een opmaakprobleem dat ATS eveneens zal veroorzaken.',
                'Online ATS-checkers zoals Jobscan, Resume Worded of Enhancv vergelijken je cv met een specifieke vacaturetekst en geven een keyword-match-score plus concrete verbeterpunten. Jobscan (gratis basisversie) is de meest uitgebreide optie en ondersteunt ook Nederlandse cv\'s. Let op: gebruik deze tools als richtlijn, niet als absolute autoriteit — elk ATS-systeem werkt anders.',
                'De derde test is praktisch maar effectief: vraag iemand die jouw vakgebied niet kent om je cv te scannen in 10 seconden en te vertellen wat jij doet en wat je sterkste kwalificatie is. Als ze dat niet kunnen beantwoorden, is je cv ook voor een recruiter te onduidelijk — ATS of niet. Een cv dat de menselijke scan niet overleeft, bereikt de hiring manager nooit ook al haalt het de ATS-filter.',
            ],
        },
        {
            id: 'ats-per-sector',
            title: 'ATS-gebruik per sector: waar moet je extra scherp zijn?',
            answerCapsule: 'Finance, consultancy, tech en zorg zijn de sectoren met de meest strikte ATS-filtering in Nederland — corporate werkgevers en uitzendbureaus screenen het zwaarst automatisch.',
            content: [
                'Niet alle werkgevers screenen even streng. Kleine bedrijven (onder de 10 medewerkers) gebruiken zelden ATS — hun sollicitatieproces is handmatig. Middelgrote bedrijven gebruiken vaak een eenvoudiger systeem zoals Recruitee of Homerun, dat minder strak filtert. Grote corporates, uitzendbureaus (Randstad, Adecco, Manpower) en internationale bedrijven (Shell, ASML, Philips, ING, ABN AMRO) hebben de meest geavanceerde ATS-configuraties.',
                'Sectoren met de strengste ATS-filtering in Nederland: financiële dienstverlening (certificeringen als CFA, CPA, RA worden exact gematcht), consultancy (methodieken als Agile, PRINCE2, LEAN worden als harde vereisten gefilterd), technologie (programmeertalen en tools als exacte termen), en gezondheidszorg (BIG-registratie, specialismen als exacte codes).',
                'Uitzendbureaus gebruiken ATS ook om hun eigen kandidatenpool te doorzoeken. Als je je cv uploadt op de website van een uitzendbureau, wordt het opgeslagen in hun ATS-database. Recruiters van het bureau zoeken daarna op zoekwoorden. Hoe beter je cv geoptimaliseerd is op de termen die in jouw vakgebied gangbaar zijn, hoe vaker je gevonden wordt bij toekomstige zoekopdrachten — ook voor vacatures die nog niet bestaan.',
            ],
        },
    ],

    faq: [
        {
            question: 'Wat is een ATS-vriendelijk cv?',
            answer: 'Een ATS-vriendelijk cv is opgemaakt zodat Applicant Tracking Systems het correct kunnen lezen en verwerken. Dit betekent: eenkoloms layout, standaard sectienamen, exacte vacature-zoekwoorden, geen tabellen of afbeeldingen, en contactgegevens in de hoofdtekst — niet in kop- of voettekst.',
        },
        {
            question: 'Welk bestandsformaat is het beste voor ATS?',
            answer: 'PDF gegenereerd vanuit Word of Google Docs is de veiligste keuze voor moderne ATS-systemen (Workday, Greenhouse, Recruitee). Oudere systemen geven soms de voorkeur aan .docx. Controleer altijd de vacature op instructies. Vermijd gescande bestanden, Canva-exports en .pages-bestanden.',
        },
        {
            question: 'Mag ik een cv met twee kolommen gebruiken?',
            answer: 'Beter niet. Eenkoloms cv\'s scoren 97% parse-nauwkeurigheid in ATS-tests; tweekoloms slechts 68% (Jobscan). ATS leest kolommen samen als één doorlopende tekstkolom, wat de volgorde en structuur verstoort. Gebruik één kolom voor maximale compatibiliteit.',
        },
        {
            question: 'Hoe weet ik welke zoekwoorden ik moet gebruiken?',
            answer: 'Lees de vacaturetekst en noteer: functietitels, vereiste vaardigheden, tools, certificeringen en branchetermen. Neem de exacte bewoording over — niet alleen synoniemen. Gebruik zowel voluit geschreven termen als gangbare afkortingen: "Projectmanagement (PRINCE2)" dekt beide varianten.',
        },
        {
            question: 'Gebruiken alle bedrijven in Nederland een ATS?',
            answer: 'Niet alle, maar de meeste bedrijven met meer dan 50 medewerkers wel. Schatting: 75% van die groep gebruikt ATS (Jobscan 2024). Uitzendbureaus, grote corporates en internationale bedrijven hebben de meest strikte ATS-configuraties. Kleine bedrijven screenen vaker handmatig.',
        },
        {
            question: 'Hoe test ik of mijn cv ATS-vriendelijk is?',
            answer: 'Kopieer alle tekst uit je cv-PDF en plak het in Kladblok. Is de volgorde logisch en ontbreekt er niets? Dan is je cv tekstueel leesbaar. Gebruik aanvullend een online ATS-checker zoals Jobscan om je keyword-match met een specifieke vacature te meten.',
        },
        {
            question: 'Is een creatief cv-template altijd slecht voor ATS?',
            answer: 'Niet altijd, maar het risico is groot. Test elk creatief template met de plak-in-Kladblok-methode. Als de tekst correct uitkomt, is het template waarschijnlijk ATS-veilig. Templates van Canva of Figma zijn vrijwel altijd problematisch voor ATS-parsing.',
        },
        {
            question: 'Wat is een goede ATS-match-score?',
            answer: 'Jobscan adviseert een keyword-match van minimaal 70% voor een goede kans op doorgang. Boven de 80% scoren geeft 3x meer kans op een uitnodiging (Jobscan 2024). Gebruik het als richtlijn, niet als garantie — elk ATS-systeem weegt factoren anders.',
        },
    ],

    relatedArticleSlugs: ['cv-schrijven-tips', 'cv-vaardigheden-kiezen', 'cv-template-kiezen', 'cv-voor-techsector'],
    relatedExampleSlugs: ['technologie-en-ict/software-ontwikkelaar', 'zakelijk-en-financieel/accountant', 'juridisch-en-overheid/juridisch-medewerker'],
};
