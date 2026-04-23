import { BlogArticle } from '../types';

export const waaromCvAfgewezen: BlogArticle = {
    slug: 'waarom-cv-afgewezen',
    title: 'Waarom wordt mijn CV afgewezen? 9 oorzaken en hoe je het oplost',
    description: 'Wordt je CV snel afgewezen of hoor je steeds niets terug? Leer welke ATS-fouten, recruiter-signalen en inhoudelijke zwaktes het vaakst tot afwijzing leiden en wat je direct kunt verbeteren.',
    publishedAt: '2026-04-23',
    updatedAt: '2026-04-23',

    metaTitle: 'Waarom wordt mijn CV afgewezen? 9 oorzaken + oplossingen | WerkCV',
    metaDesc: 'Waarom wordt je CV afgewezen? Bekijk de 9 meest voorkomende oorzaken: ATS-fouten, generieke profieltekst, zwakke werkervaring, keyword mismatch en snelle fixes voor je volgende sollicitatie.',
    keywords: [
        'waarom wordt mijn cv afgewezen',
        'cv afgewezen door ats',
        'waarom cv afgewezen',
        'cv afgewezen',
        'waarom krijg ik geen reactie op mijn cv',
        'binnen 24 uur afgewezen cv',
        'cv afgewezen zonder feedback',
        'cv wordt niet gelezen',
        'cv check afwijzing',
    ],

    readingTime: 10,
    category: 'solliciteren',
    featured: true,
    order: 30,

    keyTakeaways: [
        'Een snelle afwijzing betekent niet automatisch dat je ongeschikt bent; vaak is de eerste mismatch technisch of positioneel.',
        'De twee grootste blokken zijn ATS-problemen en recruiter-twijfel over fit, niveau of duidelijkheid.',
        'Een generieke profieltekst en taakgerichte werkervaring zorgen vaak voor afwijzing nog vóór een gesprek.',
        'Als je binnen 24 uur wordt afgewezen, kijk dan eerst naar functiematch, keywords, taal en cv-structuur.',
        'Met een gerichte combinatie van CV score, ATS-check en vacaturegerichte trefwoorden kun je veel afwijzingsredenen snel isoleren.',
    ],

    sections: [
        {
            id: 'waarom-afgewezen',
            title: 'Waarom wordt je CV afgewezen?',
            answerCapsule: 'Meestal om drie redenen: software kan je CV niet goed lezen, een recruiter ziet te weinig fit met de vacature, of je document maakt te weinig snel duidelijk wat je toevoegt.',
            content: [
                'Als je CV vaak wordt afgewezen, ligt dat zelden aan één mysterieus detail. In de praktijk ontstaan afwijzingen meestal op drie niveaus. Niveau één is technisch: een ATS of sollicitatieportaal leest je document niet goed. Niveau twee is inhoudelijk: een recruiter ziet te weinig relevante ervaring, te weinig resultaat of te weinig richting. Niveau drie is contextueel: je CV is op zichzelf prima, maar sluit te weinig aan op deze specifieke vacature, branche of senioriteit.',
                'Dat onderscheid is belangrijk. Veel kandidaten reageren op afwijzing met nog meer tekst, nog meer design of nog meer algemene claims. Terwijl de echte vraag eerst moet zijn: waar in de keten gaat het mis? Word je niet goed uitgelezen, wek je geen vertrouwen in de eerste scan, of ben je simpelweg te generiek voor de rol waarop je solliciteert?',
                'Deze gids helpt je die diagnose scherper te maken. Niet met vage motivatie, maar met concrete signalen die recruiters en software gebruiken om in de eerste minuten of zelfs seconden te beslissen of je CV doorgaat.',
            ],
            intentLinks: [
                {
                    href: '/tools/cv-score',
                    label: 'Doe eerst een gratis CV check',
                    description: 'Handig als je snel wilt zien of de inhoud, structuur en volledigheid van je CV de zwakke schakel zijn.',
                },
                {
                    href: '/tools/ats-cv-checker',
                    label: 'Controleer daarna je ATS-risico',
                    description: 'Gebruik deze stap als je vermoedt dat software je document al blokkeert vóór een recruiter kijkt.',
                },
            ],
        },
        {
            id: 'binnen-24-uur-afgewezen',
            title: 'Binnen 24 uur afgewezen: wat betekent dat meestal?',
            answerCapsule: 'Een afwijzing binnen 24 uur wijst vaak op een snelle mismatch: verkeerde functierichting, ontbrekende keywords, taalprobleem, salaris- of beschikbaarheidsverschil, of een CV dat technisch niet goed uitleesbaar is.',
            content: [
                'Een afwijzing binnen 24 uur voelt hard, maar zegt niet automatisch dat je profiel zwak is. Het betekent meestal dat iemand of iets heel snel een duidelijke mismatch zag. Denk aan een rol waarvoor een recruiter direct een harde eis controleert: taalniveau, locatie, beschikbaarheid, salarisband, certificering, senioriteit of een specifieke tool die in jouw CV niet zichtbaar genoeg terugkomt.',
                'Bij grotere werkgevers gebeurt dit vaak in twee stappen. Eerst scant software of het document technisch en qua trefwoorden bruikbaar is. Daarna kijkt een recruiter of sourcer kort naar titel, profieltekst, laatste functies en de eerste bullets. Als daar geen directe aansluiting zichtbaar is, kan een afwijzing heel snel volgen — ook als je op langere termijn best passend had kunnen zijn.',
                'Juist daarom moet je een snelle afwijzing niet interpreteren als een algemene uitspraak over je hele loopbaan. Zie het als signaal dat de eerste scan onvoldoende overtuigde. De oplossing is dan niet een volledig nieuw CV voor je hele carrière, maar een scherper eerste scherm: betere trefwoorden, helderdere titels, sterkere openingszinnen en minder technische ruis.',
            ],
            bullets: [
                'Je functietitel sluit niet goed aan op hoe de vacature de rol benoemt.',
                'Belangrijke tool-, certificaat- of branchetermen ontbreken in de eerste scan.',
                'Je CV is Engelstalig terwijl de vacature duidelijk Nederlands verwacht, of andersom.',
                'Je meest recente ervaring oogt te senior, te junior of te zijwaarts voor deze rol.',
                'Het document is technisch lastig leesbaar door kolommen, vreemde kopjes of rommelige PDF-export.',
            ],
        },
        {
            id: 'ats-afwijzing',
            title: 'CV afgewezen door ATS: herken de technische signalen',
            answerCapsule: 'Een ATS wijst vooral af op structuurproblemen, onduidelijke secties, ontbrekende trefwoorden, creatieve opmaak en bestanden die tekstueel slecht uitleesbaar zijn.',
            content: [
                'Als je vermoedt dat je CV door ATS wordt afgewezen, kijk dan eerst naar structuur en herkenbaarheid. Sollicitatiesoftware werkt het best met een simpele tekstlogica: standaard sectiekoppen, duidelijke datums, logische volgorde en gewone tekst in plaats van visuele objecten. Zodra je CV te veel leunt op kolommen, grafische balken, tekstvakken of creatieve labels, neemt het risico toe dat onderdelen verkeerd worden gelezen of helemaal wegvallen.',
                'Een tweede technisch probleem is keyword mismatch. ATS-systemen zijn niet slim in de menselijke zin van het woord; ze zoeken vooral naar herkenbare termen. Als de vacature spreekt over stakeholdermanagement, Power BI of SAP S/4HANA en jouw CV gebruikt alleen bredere of alternatieve omschrijvingen, kan je matchscore lager uitvallen dan je werkelijke geschiktheid.',
                'Het derde probleem is bestandskwaliteit. Een CV dat er goed uitziet als visuele PDF kan alsnog slecht zijn als de tekstlaag onhandig is opgebouwd. Dat zie je vaak bij exports uit design-tools of oude templates. Als je tekst niet netjes kopieerbaar is uit de PDF, is dat een waarschuwing dat recruitmentsoftware waarschijnlijk ook moeite krijgt.',
            ],
            intentLinks: [
                {
                    href: '/tools/ats-cv-checker',
                    label: 'Scan je CV op ATS-fouten',
                    description: 'Gebruik deze checker als je technische oorzaken van een snelle afwijzing wilt uitsluiten.',
                },
                {
                    href: '/ats-cv-template',
                    label: 'Stap over op een ATS-vriendelijk template',
                    description: 'Handig als je huidige layout te visueel of te creatief is voor recruiter-software.',
                },
            ],
        },
        {
            id: 'recruiter-red-flags',
            title: 'De recruiter ziet je CV wel, maar vertrouwt het nog niet',
            answerCapsule: 'Recruiters haken vaak af op vage profielteksten, taaklijstjes zonder resultaat, te veel irrelevante informatie en een document dat niet snel duidelijk maakt voor welk type rol jij bedoeld bent.',
            content: [
                'Niet elke afwijzing is technisch. Vaak ziet een recruiter je CV wel degelijk, maar ontstaat er geen direct vertrouwen. Dat gebeurt vooral als je profieltekst algemeen blijft, je functierichting niet scherp genoeg is of je werkervaring vooral taken opsomt in plaats van impact. Een recruiter wil snel kunnen beantwoorden: wat voor rol zoek je, wat heb je recent gedaan en welk bewijs lever je dat je dit niveau aankunt?',
                'Vage taal helpt daar niet bij. Formuleringen als resultaatgericht, communicatief sterk of brede ervaring voegen weinig toe zolang ze niet worden ondersteund door context. Hetzelfde geldt voor bullets als verantwoordelijk voor administratie, klantcontact of projectondersteuning. Dat zegt wat je deed, maar niet hoe goed, hoe zelfstandig of met welk resultaat.',
                'Ook overvolle CV’s werken tegen je. Als een recruiter eerst door irrelevante bijbanen, oude cursussen of een te brede vaardighedenlijst moet werken voordat de relevante informatie verschijnt, gaat de kern van je profiel verloren. Je CV moet niet alles vertellen; het moet snel het juiste vertellen.',
            ],
            intentLinks: [
                {
                    href: '/tools/cv-score',
                    label: 'Gebruik de CV score voor inhoudelijke zwaktes',
                    description: 'Deze check helpt vooral bij profieltekst, werkervaring, volledigheid en recruiterleesbaarheid.',
                },
                {
                    href: '/cv-tips/cv-werkervaring-beschrijven',
                    label: 'Herschrijf je werkervaring resultaatgerichter',
                    description: 'Gebruik deze gids als je bullets nu nog te veel taakgericht en te weinig overtuigend zijn.',
                },
            ],
        },
        {
            id: 'veelvoorkomende-inhoudsredenen',
            title: 'De 9 meest voorkomende inhoudelijke afwijsredenen',
            answerCapsule: 'De meest voorkomende oorzaken zijn: generieke profieltekst, geen duidelijke functiematch, te weinig resultaten, keyword mismatch, ATS-risico, verkeerde taal of toon, onduidelijke senioriteit, rommelige structuur en een CV dat niet per vacature is aangepast.',
            content: [
                'Onder bijna elke CV-afwijzing zit één van een beperkt aantal patronen. Je profieltekst is te breed of te algemeen. Je laatste functies lijken niet logisch aan te sluiten op de vacature. Je werkervaring bevat te weinig bewijs in de vorm van resultaten, cijfers of concrete projecten. Je vaardighedenlijst mist de termen waarop recruiters of ATS actief zoeken. Of je document maakt in vorm en volgorde te weinig snel duidelijk waar je sterkste fit zit.',
                'Een andere veelvoorkomende oorzaak is niveau-onduidelijkheid. Recruiters twijfelen dan of je junior, medior of senior bent, of je operationeel of strategisch werkt, of je vooral uitvoerend of leidend bent. Als je CV daar geen scherp kader voor geeft, wordt het veiliger om af te wijzen dan om te gokken.',
                'Tot slot is er de simpele maar pijnlijke reden: je stuurt te vaak dezelfde basisversie naar verschillende rollen. Zelfs een goed hoofd-CV heeft per vacature een lichte herordening nodig. De eerste zinnen, de eerste bullets en de zichtbare trefwoorden moeten aansluiten op de rol waar deze recruiter nu op zoekt.',
            ],
            bullets: [
                'Te algemene profieltekst zonder rol, niveau of richting.',
                'Functietitels en trefwoorden sluiten niet aan op de vacaturetaal.',
                'Werkervaring beschrijft taken, geen resultaten of impact.',
                'ATS-risico door opmaak, secties of bestandskwaliteit.',
                'Te veel irrelevante ervaring vóór de relevante ervaring.',
                'Onduidelijk of je niveau past bij de vacature.',
                'CV is niet aangepast op de functie of branche.',
                'Taal, toon of documentstructuur past niet bij de werkgever.',
                'Belangrijke basisinfo ontbreekt: locatie, LinkedIn, duidelijke data of vaardigheden.',
            ],
        },
        {
            id: 'snelle-diagnose',
            title: 'Zo diagnoseer je in 10 minuten waar het misgaat',
            answerCapsule: 'Begin met drie checks: kan software je CV goed lezen, begrijpt een recruiter direct voor welke rol je gaat, en staan de vacaturetermen zichtbaar in profieltekst, werkervaring en vaardigheden?',
            content: [
                'Je hoeft niet te wachten op recruiterfeedback om de eerste diagnose te maken. Gebruik een eenvoudige volgorde. Stap één: controleer technische leesbaarheid. Stap twee: controleer inhoudelijke duidelijkheid. Stap drie: controleer vacaturematch. Als je deze drie lagen apart bekijkt, zie je meestal snel welke schakel het zwakst is.',
                'Voor de technische check kijk je naar ATS-signalen: simpele sectiekoppen, logische volgorde, tekstueel leesbare PDF, geen kolommen of rare objecten. Voor de inhoudelijke check kijk je naar je profieltekst en eerste twee bullets per recente functie: maken die meteen duidelijk wat je doet, op welk niveau en met welke impact? Voor de vacaturecheck vergelijk je je CV met één concrete vacature en markeer je de termen die zichtbaar terugkomen en de termen die ontbreken.',
                'Deze aanpak is ook psychologisch beter. In plaats van te denken "mijn hele CV is slecht", krijg je een specifieker beeld: de inhoud is best goed, maar de eerste scan is te zwak; of de ATS-kant is veilig, maar de rolpositionering is te breed. Dat maakt verbeteren veel sneller en veel rationeler.',
            ],
            intentLinks: [
                {
                    href: '/tools/cv-score',
                    label: 'Start met de gratis CV beoordeling',
                    description: 'Gebruik dit als eerste laag voor inhoud, structuur en recruiterleesbaarheid.',
                },
                {
                    href: '/tools/cv-keywords',
                    label: 'Controleer daarna je vacaturetrefwoorden',
                    description: 'Handig als je vermoedt dat je ervaring wel klopt, maar de juiste termen niet zichtbaar genoeg zijn.',
                },
            ],
        },
        {
            id: 'verbeterplan',
            title: 'Een praktisch verbeterplan voor je volgende sollicitatie',
            answerCapsule: 'Verbeter eerst je profieltekst, daarna je eerste werkervaring-bullets, vervolgens je zichtbare trefwoorden en pas als laatste je design of template aan.',
            content: [
                'Begin niet met het hele document herschrijven. De snelste winst zit meestal in vier onderdelen. Eén: maak je profieltekst specifieker. Noem rol, ervaringsniveau, domein en het soort probleem dat je oplost. Twee: herschrijf de eerste bullets van je twee meest recente functies zodat daar resultaat, eigenaarschap of schaal zichtbaar worden. Drie: voeg de belangrijkste vacaturetermen op natuurlijke plekken toe. Vier: kijk dan pas of je template of layout nog in de weg zit.',
                'Werk daarna met een hoofdversie en per-vacature versie. Je hoofdversie bevat alle relevante ervaring en sterke voorbeelden. Per vacature verander je de bovenste laag: profieltekst, eerste bullets, vaardighedenvolgorde en trefwoorden. Dat kost minder tijd dan steeds helemaal opnieuw schrijven en levert toch een veel gerichter document op.',
                'Als je al meerdere afwijzingen hebt gehad, gebruik dan één versie als testdocument. Verbeter die systematisch, solliciteer gericht op vergelijkbare rollen en kijk of het patroon verandert. Je wilt geen twintig verschillende experimenten tegelijk. Eén scherp verbeterde basis geeft sneller inzicht dan voortdurend wisselen zonder meetpunt.',
            ],
            intentLinks: [
                {
                    href: '/templates',
                    label: 'Werk het verbeterplan uit in een strak template',
                    description: 'Gebruik een rustige template als je inhoud al beter is maar je document nog te rommelig oogt.',
                },
                {
                    href: '/tools/werkervaring-bullets',
                    label: 'Herschrijf je bullets met de bullet-tool',
                    description: 'Handig als je weet dat je resultaten er wel zijn, maar nog niet scherp genoeg op papier staan.',
                },
            ],
        },
        {
            id: 'wanneer-niet-aan-cv',
            title: 'Wanneer ligt het niet aan je CV?',
            answerCapsule: 'Soms is je CV niet het probleem maar de context: te veel concurrentie, een interne kandidaat, een al gevulde pipeline, een salarisverschil of een vacature die feitelijk al was ingevuld.',
            content: [
                'Niet elke afwijzing is oplosbaar met een beter document. Soms is de vacature al half ingevuld, zoekt een werkgever vooral lokaal talent, ligt de salarisverwachting scheef of is er intern al een favoriete kandidaat. Dat soort oorzaken zie je niet altijd terug in de vacaturetekst, maar ze bestaan wel degelijk.',
                'Toch is het gevaarlijk om daar te snel op te leunen. Gebruik context als verklaring pas nadat je de technische en inhoudelijke laag redelijk op orde hebt. Anders wordt "de markt is lastig" een excuus terwijl je eerste scan nog vol gemiste kansen zit.',
                'De beste houding is dus dubbel. Ja, de arbeidsmarkt is niet volledig maakbaar. Maar nee, dat ontslaat je niet van het optimaliseren van de delen die wel onder jouw controle vallen. Hoe scherper je CV, hoe beter je onderscheid kunt maken tussen echte marktmismatch en oplosbare documentproblemen.',
            ],
        },
    ],

    faq: [
        {
            question: 'Waarom wordt mijn CV afgewezen zonder feedback?',
            answer: 'Omdat recruiters vaak te weinig tijd hebben om individuele feedback te geven. De meest voorkomende redenen zijn een snelle functiemismatch, te algemene positionering, ontbrekende vacaturetermen of technische ATS-problemen.',
        },
        {
            question: 'Betekent een afwijzing binnen 24 uur dat mijn CV slecht is?',
            answer: 'Niet per se. Zo’n snelle afwijzing betekent meestal dat er in de eerste scan een duidelijke mismatch zichtbaar was. Dat kan aan je CV liggen, maar ook aan harde vacature-eisen zoals taal, locatie, senioriteit of certificering.',
        },
        {
            question: 'Kan mijn CV door ATS worden afgewezen zonder dat ik het merk?',
            answer: 'Ja. Als je document slecht uitleesbaar is of belangrijke trefwoorden mist, kan je matchscore laag uitvallen voordat een recruiter je inhoud echt ziet. Dat is precies waarom een ATS-check nuttig is.',
        },
        {
            question: 'Wat moet ik eerst verbeteren als ik vaak word afgewezen?',
            answer: 'Begin meestal met je profieltekst, de eerste bullets van je recente functies en de zichtbare vacaturetermen. Pas daarna kijk je naar template, design en extra details.',
        },
        {
            question: 'Moet ik mijn CV voor elke vacature aanpassen?',
            answer: 'Ja, maar niet vanaf nul. Werk met een sterke basisversie en pas per vacature vooral je profieltekst, eerste bullets, vaardighedenvolgorde en belangrijke trefwoorden aan.',
        },
        {
            question: 'Wat is belangrijker: een ATS-check of een gewone CV check?',
            answer: 'Je hebt meestal allebei nodig. De ATS-check vertelt of software je document goed leest. De gewone CV check kijkt breder naar inhoud, overtuigingskracht en recruiterleesbaarheid.',
        },
        {
            question: 'Waarom krijg ik wel complimenten op mijn CV maar geen gesprekken?',
            answer: 'Omdat een mooi ogend CV niet hetzelfde is als een vacaturegericht CV. Vaak zijn de inhoud, trefwoorden of eerste scan niet scherp genoeg, ook als het document er verzorgd uitziet.',
        },
        {
            question: 'Wanneer weet ik dat het probleem waarschijnlijk niet mijn CV is?',
            answer: 'Als je CV technisch veilig is, inhoudelijk scherp aansluit en je nog steeds structureel wordt afgewezen op vergelijkbare rollen, speelt de context waarschijnlijk een grotere rol: concurrentie, interne kandidaten of vacaturedynamiek.',
        },
    ],

    relatedArticleSlugs: [
        'cv-fouten',
        'ats-vriendelijk-cv',
        'cv-werkervaring-beschrijven',
        'profieltekst-schrijven',
    ],
    relatedExampleSlugs: [
        'technologie-en-ict/software-ontwikkelaar',
        'zakelijk-en-financieel/hr-medewerker',
        'horeca-en-detailhandel/hotel-receptionist',
    ],
};
