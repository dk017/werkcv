import { BlogArticle } from '../types';

export const atsVriendelijkCv: BlogArticle = {
    slug: 'ats-vriendelijk-cv',
    title: 'ATS-vriendelijke CV maken: opmaak, keywords en PDF (2026)',
    description: 'Wil je een ATS-vriendelijke cv maken? Leer hoe je opmaak, secties, keywords en PDF-keuzes goed zet, zodat recruiters en sollicitatiesoftware je cv beter lezen.',
    publishedAt: '2025-06-10',
    updatedAt: '2026-07-05',

    metaTitle: 'ATS-vriendelijke CV maken in 2026 | WerkCV.nl',
    metaDesc: 'Wil je een ATS-vriendelijke cv maken? Leer welke opmaak, secties, keywords en PDF-keuzes werken voor Nederlandse ATS-systemen en recruiters.',
    keywords: ['ats-vriendelijke cv', 'ats vriendelijk cv', 'ats vriendelijke cv maken', 'ats cv maken', 'cv door ats krijgen', 'ats cv tips', 'cv scanbaar maken', 'ats cv nederland'],

    readingTime: 10,
    category: 'opmaak',
    featured: false,
    order: 10,

    keyTakeaways: [
        'Een ATS beheert sollicitaties; parsing, zoekfilters en automatische rangschikking verschillen per werkgever en systeem.',
        'Een eenvoudige eenkoloms opmaak verkleint het risico op een verkeerde leesvolgorde.',
        'Gebruik relevante termen uit de vacature alleen wanneer ze jouw echte ervaring beschrijven.',
        'Zet belangrijke contact- en ervaringsgegevens in gewone, selecteerbare tekst.',
        'Volg altijd het bestandsformaat dat in de vacature of het sollicitatieformulier wordt gevraagd.',
        'Test de PDF door alle tekst te kopiëren: ontbrekende of verkeerd geordende tekst wijst op een parsingrisico.',
        'Een ATS-vriendelijk CV vergroot de technische leesbaarheid, maar garandeert geen score, selectie of gesprek.',
    ],

    sections: [
        {
            id: 'wat-is-ats',
            title: 'Wat is ATS en wat gebeurt er met je CV?',
            answerCapsule: 'Een Applicant Tracking System beheert sollicitaties en kan CV-tekst uitlezen, doorzoekbaar maken of tegen vacaturecriteria laten beoordelen. De inrichting verschilt per werkgever.',
            content: [
                'Een Applicant Tracking System (ATS) is software waarmee werkgevers vacatures, kandidaten en communicatie beheren. Veel systemen lezen gegevens uit een CV zodat recruiters kunnen zoeken of sorteren. Sommige werkgevers voegen screeningsvragen, filters of matching toe; andere gebruiken het systeem vooral als kandidatenadministratie.',
                'Er bestaat daarom geen universele ATS-score of vaste regel waarmee ieder bedrijf kandidaten afwijst. De gebruikte leverancier, configuratie, vacature en werkwijze van de recruiter bepalen wat er gebeurt. Grote werkgevers en bureaus gebruiken vaak een sollicitatieplatform, maar ook daar kan een recruiter ieder CV handmatig bekijken.',
                'Het praktische doel is niet om software te "verslaan". Zorg dat je naam, ervaring, opleiding en vaardigheden als selecteerbare tekst in een logische volgorde beschikbaar zijn, en dat de inhoud eerlijk aansluit op de vacature. Dat helpt zowel de parser als de recruiter die daarna leest.',
            ],
            intentLinks: [
                {
                    href: '/ats-cv-template',
                    label: 'Gebruik daarna een ATS CV template',
                    description: 'Deze route is voor je templatekeuze zodra je begrijpt welke ATS-regels je CV moet volgen.',
                },
                {
                    href: '/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures',
                    label: 'Vergelijk ATS-vriendelijke CV builders',
                    description: 'Gebruik deze keuzehulp als je nog twijfelt tussen tools en builders in plaats van alleen de CV-regels.',
                },
            ],
        },
        {
            id: 'opmaak-voor-ats',
            title: 'Opmaak: de meest onderschatte ATS-fout',
            answerCapsule: 'Een eenvoudige eenkoloms indeling met gewone tekst en herkenbare koppen geeft de kleinste kans op een verkeerde leesvolgorde.',
            content: [
                'Parsers zetten een document vaak om naar tekstvelden. Bij meerdere kolommen, tekstvakken of tabellen kan de volgorde anders uitpakken dan op het scherm. Moderne systemen kunnen complexe layouts soms prima verwerken, maar vooraf weet je zelden welk systeem en welke configuratie de werkgever gebruikt.',
                'Voor een sollicitatieportaal is een eenvoudige eenkoloms indeling daarom de voorzichtigste keuze. Gebruik herkenbare sectiekoppen, gewone tekst voor vaardigheden en standaard bullets. Laat belangrijke informatie niet uitsluitend via iconen, grafische balkjes of afbeeldingen zien.',
                'Kleuraccenten en een verzorgd lettertype zijn mogelijk zolang het contrast goed blijft en tekst selecteerbaar is. Controleer de uiteindelijke PDF, niet alleen het bewerkbare document: selecteer en kopieer de inhoud en kijk of namen, datums en secties in een begrijpelijke volgorde verschijnen.',
            ],
            intentLinks: [
                {
                    href: '/ats-cv-template',
                    label: 'ATS-vriendelijk CV template gebruiken',
                    description: 'Kies een layout die al is gebouwd voor eenkoloms scanbaarheid en standaardsecties.',
                },
                {
                    href: '/cv-maken-template',
                    label: 'CV maken met een template die ATS-risico beperkt',
                    description: 'Start vanuit een templateflow die minder kans geeft op kolommen en verborgen objecten.',
                },
            ],
        },
        {
            id: 'standaard-kopjes',
            title: 'Sectienamen: gebruik wat ATS herkent',
            answerCapsule: 'ATS herkent standaard sectienamen als "Werkervaring", "Opleiding" en "Vaardigheden" — creatieve koppen als "Mijn verhaal" of "Toolbox" worden genegeerd en de inhoud verdwijnt.',
            content: [
                'ATS-software koppelt de tekst onder een sectiekoppen aan de juiste categorieën in het systeem: werkervaring gaat naar de ervarings-database, opleiding naar het opleidingsveld, vaardigheden naar de skills-index. Dit werkt alleen als het systeem de kop herkent. Creatieve koppen als "Mijn reis", "Waar ik uitblink" of "Toolbox" worden door de meeste systemen niet gematcht — de bijbehorende inhoud wordt genegeerd of in een onbekende categorie opgeslagen.',
                'Gebruik in een Nederlands cv de volgende standaard sectienamen: Profiel of Profieltekst, Werkervaring, Opleiding, Vaardigheden, Talen, en optioneel Certificeringen of Vrijwilligerswerk. In een Engelstalig cv voor internationale werkgevers gebruik je: Profile of Summary, Work Experience, Education, Skills, Languages. Wijk hier alleen af als je zeker weet dat de werkgever een eigen ATS-systeem heeft met aangepaste parsing.',
                'Zet je contactgegevens bij voorkeur in de gewone documenttekst en niet uitsluitend in een kop- of voettekst. Niet iedere parser behandelt headers, footers en tekstvakken hetzelfde. Door naam, telefoonnummer, e-mail en woonplaats als gewone tekst bovenaan te plaatsen, verminder je dit risico.',
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
            answerCapsule: 'Gebruik relevante functietitels, vaardigheden, tools en certificeringen uit de vacature op natuurlijke plekken, maar alleen wanneer ze aantoonbaar bij jou passen.',
            content: [
                'Recruiters en zoekfuncties kunnen zoeken op functietitels, vaardigheden, tools en certificeringen. Lees de vacature daarom zorgvuldig en markeer welke harde eisen, werkzaamheden en termen werkelijk overeenkomen met jouw achtergrond.',
                'Gebruik waar passend dezelfde herkenbare benaming als de vacature. Schrijf bijvoorbeeld de officiële toolnaam of certificering voluit en voeg een gangbare afkorting toe. Behoud je echte functietitel; je kunt een begrijpelijke marktterm ernaast zetten wanneer een interne titel onduidelijk is.',
                'Plaats termen in context, bijvoorbeeld in een resultaatgerichte bullet. Een losse lijst vol herhaalde woorden bewijst geen ervaring en maakt het CV minder geloofwaardig. De uiteindelijke selectie blijft bovendien afhankelijk van inhoud, eisen, concurrentie en menselijke beoordeling.',
            ],
        },
        {
            id: 'bestandsformaat',
            title: 'Bestandsformaat: PDF vs .docx vs de rest',
            answerCapsule: 'Volg het formaat dat de werkgever vraagt. Is er geen instructie, gebruik dan een tekstgebaseerde PDF en controleer of je de tekst kunt selecteren en kopiëren.',
            content: [
                'De instructie in de vacature of het uploadformulier gaat voor. Wordt alleen DOCX gevraagd, lever DOCX aan. Wordt PDF geaccepteerd, gebruik dan een PDF die rechtstreeks uit een editor is geëxporteerd en waarin de tekst selecteerbaar blijft.',
                'Een scan of afbeelding van een CV is riskanter, omdat tekstherkenning dan afhankelijk is van OCR. Ook bij een ontworpen PDF kunnen tekstvakken of een onlogische exportvolgorde problemen geven. Test daarom het werkelijke bestand dat je gaat uploaden.',
                'Gebruik een duidelijke bestandsnaam, bijvoorbeeld "CV-Voornaam-Achternaam.pdf". Open het bestand na export, controleer alle pagina\'s en kopieer de tekst naar een leeg document. Als informatie ontbreekt of door elkaar staat, kies dan een eenvoudiger layout of exportmethode.',
            ],
            intentLinks: [
                {
                    href: '/cv-maken-pdf',
                    label: 'CV maken in een PDF-veilige flow',
                    description: 'Werk direct naar een verzendklare PDF toe zonder scan- of Canva-problemen.',
                },
                {
                    href: '/cv-maken-in-word',
                    label: 'CV maken in Word met minder ATS-risico',
                    description: 'Gebruik Word alleen met een veilige opmaak als een formulier echt om DOCX vraagt.',
                },
            ],
        },
        {
            id: 'werkervaring-voor-ats',
            title: 'Werkervaring ATS-proof beschrijven',
            answerCapsule: 'Vermeld per functie: exacte functietitel, bedrijfsnaam, maand + jaar begin en einde, locatie, en 3–5 keyword-rijke bullets — in die volgorde.',
            content: [
                'ATS-systemen gebruiken de structuur van je werkervaring-sectie om automatisch te berekenen hoeveel relevante ervaring je hebt. Dit werkt alleen als elke functie-entry compleet en consistent is opgebouwd. Een ontbrekende einddatum, een afgekorte bedrijfsnaam of een onduidelijke functietitel kan ertoe leiden dat ATS de ervaring niet correct meetelt.',
                'Vermeld bij elke functie de exacte functietitel (gebruik de gangbare brancheterm als je interne titel afwijkend is), de volledige bedrijfsnaam, de locatie (stad is voldoende), en een exacte periode in het formaat maand-jaar tot maand-jaar. Schrijf "jan. 2022 – mrt. 2024" niet "2022–2024" — maanden geven ATS de informatie om je ervaringslengte exact te berekenen.',
                'Gebruik per functie 3 tot 5 korte bullets die beginnen met een actief werkwoord. Gebruik gewone ronde punten of streepjes en beschrijf resultaten en prestaties, niet alleen taken. Relevante termen helpen een recruiter of zoekfunctie begrijpen waar je ervaring op aansluit, maar gebruik ze alleen in concrete, waarheidsgetrouwe context.',
            ],
        },
        {
            id: 'vaardigheden-sectie',
            title: 'Vaardigheidssectie optimaliseren voor ATS',
            answerCapsule: 'Een aparte vaardigheidssectie met exacte tool- en competentienamen verhoogt je ATS-match-score direct — groepeer in subcategorieën voor zowel ATS als menselijke leesbaarheid.',
            content: [
                'Een aparte vaardigheidssectie maakt belangrijke tools en competenties sneller vindbaar voor recruiters en zoekfuncties. Onderbouw de belangrijkste vaardigheden daarnaast in je werkervaring, opleiding of projecten.',
                'Gebruik exacte, korte termen: "Python", "Projectmanagement", "SAP S/4HANA", "IFRS-rapportage", "Lean Six Sigma (Green Belt)". Vermijd vaagheid: "technisch onderlegd", "analytisch ingesteld" of "affiniteit met data" zijn voor ATS onherkenbare termen. Groepeer vaardigheden in subcategorieën om ook voor menselijke lezers overzichtelijk te zijn: Technische vaardigheden, Software & tools, Talen, Certificeringen.',
                'Stem je vaardigheidssectie af op elke vacature. Zet de meest relevante vaardigheden vooraan en verwijder afleidende termen die niets met de rol te maken hebben. Een gerichte lijst is voor een recruiter meestal nuttiger dan een lange verzameling zonder context.',
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
                'Gescand cv of onduidelijke export → tekstgebaseerde PDF of gevraagd DOCX-formaat',
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
            intentLinks: [
                {
                    href: '/tools/ats-cv-checker',
                    label: 'ATS CV checker gebruiken voor een snelle eerste test',
                    description: 'Controleer direct of je huidige CV op kernfouten en keyword-match hapert.',
                },
                {
                    href: '/ats-cv-template',
                    label: 'Daarna overstappen op een ATS-vriendelijk template',
                    description: 'Gebruik een schone template als je uit de test haalt dat opmaak de grootste zwakte is.',
                },
            ],
        },
        {
            id: 'ats-per-sector',
            title: 'Wanneer moet je extra voorzichtig zijn met de opmaak?',
            answerCapsule: 'Wees extra voorzichtig wanneer je via een groot sollicitatieportaal, uitzendbureau of internationale werkgever solliciteert en het gebruikte systeem onbekend is.',
            content: [
                'Je kunt aan een vacature meestal niet zien hoe de achterliggende selectie is geconfigureerd. Een groot portaal, verplichte vragenlijst of kandidaatprofiel is wel een reden om een eenvoudige en voorspelbare CV-versie te gebruiken.',
                'Bij gereguleerde of specialistische functies zijn officiële namen van registraties, certificaten, tools en methodieken extra belangrijk. Vermeld bijvoorbeeld een geldige BIG-registratie, taalniveau of certificering precies en alleen wanneer die werkelijk van toepassing is.',
                'Uitzendbureaus en werkgevers kunnen gegevens uit je CV later doorzoekbaar maken binnen hun kandidatenbestand. Een duidelijke functietitel, concrete vaardigheden en consistente periodes helpen dan, zonder dat je hoeft te gokken op een geheime score.',
            ],
        },
        {
            id: 'bronnen-en-beperkingen',
            title: 'Bronnen en beperkingen van ATS-advies',
            answerCapsule: 'ATS-leveranciers documenteren parsingproblemen, maar er bestaat geen openbare test die iedere leverancier, versie en werkgeversconfiguratie dekt.',
            content: [
                'De praktische opmaakadviezen op deze pagina zijn gebaseerd op gedocumenteerd parsergedrag en op het principe dat belangrijke informatie ook als gewone tekst beschikbaar moet zijn. Greenhouse noemt bijvoorbeeld bestandsomvang, opmaak en contactgegevens in headers, footers of tekstvakken als mogelijke oorzaken van een mislukte CV-import.',
                'Dat voorbeeld bewijst niet dat ieder ATS hetzelfde reageert. Werkgevers kunnen andere systemen, versies en instellingen gebruiken. Gebruik een externe ATS-score daarom als diagnosehulpmiddel, niet als voorspelling van een uitnodiging.',
                'De meest betrouwbare controle blijft de combinatie van drie stappen: volg de vacature-instructies, controleer de geëxporteerde tekstvolgorde en zorg dat je inhoud aantoonbaar aansluit op de functie.',
            ],
            intentLinks: [
                {
                    href: 'https://support.greenhouse.io/hc/en-us/articles/200989175-Unsuccessful-resume-parse',
                    label: 'Greenhouse Support: oorzaken van een mislukte CV-parse',
                    description: 'Een actueel leveranciersvoorbeeld van bestand- en opmaakproblemen; geraadpleegd op 5 juli 2026.',
                },
            ],
        },
    ],

    faq: [
        {
            question: 'Wat is een ATS-vriendelijk cv?',
            answer: 'Een ATS-vriendelijk CV gebruikt een voorspelbare leesvolgorde, herkenbare sectiekoppen en selecteerbare tekst. Belangrijke gegevens staan niet uitsluitend in afbeeldingen, grafische balkjes, kopteksten of tekstvakken. Dat verkleint parsingrisico, maar garandeert geen selectie.',
        },
        {
            question: 'Gebruiken alle werkgevers in Nederland een ATS?',
            answer: 'Nee. Veel grotere werkgevers en bureaus gebruiken sollicitatiesoftware, maar de functies en instellingen verschillen. Sommige systemen bewaren en doorzoeken kandidaten, andere voegen screening of matching toe. Een recruiter kan CV\'s daarnaast nog steeds handmatig beoordelen.',
        },
        {
            question: 'Kan een ATS mijn CV automatisch afwijzen?',
            answer: 'Dat kan wanneer een werkgever automatische knock-outvragen of filters heeft ingesteld, maar niet ieder systeem of iedere vacature werkt zo. Afwijzing kan ook het gevolg zijn van menselijke beoordeling, ontbrekende eisen of concurrentie. Van buitenaf kun je de precieze oorzaak meestal niet vaststellen.',
        },
        {
            question: 'Welk bestandsformaat is het beste voor een ATS?',
            answer: 'Volg altijd de instructie van de werkgever. Is er geen voorkeur, gebruik dan een tekstgebaseerde PDF en controleer of alle tekst selecteerbaar en logisch te kopiëren is. Lever DOCX aan wanneer het formulier dat expliciet vraagt; vermijd scans en afbeeldingsbestanden.',
        },
        {
            question: 'Welk CV-layout geeft het minste ATS-risico?',
            answer: 'Een eenvoudige eenkoloms layout met standaardkoppen als Werkervaring, Opleiding en Vaardigheden is de voorzichtigste keuze. Sommige systemen lezen twee kolommen goed, maar dat kun je vooraf niet garanderen. Laat essentiële informatie nooit alleen visueel zien.',
        },
        {
            question: 'Hoe gebruik ik zoekwoorden uit een vacature?',
            answer: 'Markeer relevante functietitels, taken, tools, certificaten en vaktermen. Gebruik herkenbare benamingen in je profiel, vaardigheden en werkervaring, maar alleen wanneer ze jouw echte ervaring beschrijven. Geef bewijs in context en vermijd herhaling zonder inhoud.',
        },
        {
            question: 'Hoe test ik of mijn CV tekstueel leesbaar is?',
            answer: 'Open de uiteindelijke PDF, selecteer alle tekst en plak die in Kladblok of een leeg document. Controleer of naam, secties, werkgevers en datums aanwezig zijn en in een logische volgorde staan. Dit is een nuttige technische controle, geen garantie voor ieder ATS.',
        },
        {
            question: 'Is ieder WerkCV-template even geschikt voor een ATS?',
            answer: 'Nee. Voor een onbekend sollicitatieportaal is de expliciete ATS- of eenvoudige eenkoloms template de voorzichtigste keuze. Visuelere layouts kunnen prima zijn voor directe verzending, maar controleer altijd de tekstvolgorde en volg de instructies van de werkgever.',
        },
    ],

    relatedArticleSlugs: ['cv-schrijven-tips', 'cv-vaardigheden-kiezen', 'cv-template-kiezen', 'cv-voor-techsector'],
    relatedExampleSlugs: ['technologie-en-ict/software-ontwikkelaar', 'zakelijk-en-financieel/accountant', 'juridisch-en-overheid/juridisch-medewerker'],
};
