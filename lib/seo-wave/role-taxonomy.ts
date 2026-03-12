import { RoleTaxonomy } from './programmatic-types';

const pilotRoleTaxonomy: RoleTaxonomy[] = [
    {
        slug: 'administratief-medewerker',
        roleName: 'administratief medewerker',
        sector: 'office-support',
        painPoint: 'algemene taken concreet en meetbaar te maken',
        recruiterSignals: ['nauwkeurigheid', 'structuur', 'betrouwbaarheid'],
        topSkills: ['facturatie en dossierbeheer', 'prioriteiten stellen', 'foutarm werken'],
        atsKeywords: ['facturatie', 'dossierbeheer', 'agendabeheer', 'Excel', 'Office 365'],
        hardSkills: ['Excel', 'Office 365', 'dossierbeheer', 'facturatie', 'agendabeheer'],
        softSkills: ['nauwkeurig werken', 'prioriteiten bewaken', 'discreet communiceren', 'zelfstandig werken', 'afstemmen met teams'],
        profileExamples: [
            'Administratief medewerker met 5+ jaar ervaring in facturatie, dossierbeheer en teamondersteuning binnen drukke omgevingen.',
            'Sterk in foutarme verwerking, prioriteiten bewaken en het verbeteren van administratieve doorlooptijden.',
        ],
        bulletExamples: [
            'Factuurcontrole gestandaardiseerd waardoor correcties met 32% afnamen.',
            'Documentmanagement heringericht; terugvindtijd van dossiers ging van minuten naar seconden.',
            'Maandafsluiting ondersteund met heldere controles waardoor rapportages op tijd en foutloos werden opgeleverd.',
        ],
        primaryLanding: {
            href: '/cv-template-administratief-medewerker',
            title: 'CV template administratief medewerker',
            description: 'Gebruik een rolgerichte template en voorbeeldstructuur voor administratieve functies.',
        },
    },
    {
        slug: 'klantenservice-medewerker',
        roleName: 'klantenservice medewerker',
        sector: 'customer-operations',
        painPoint: 'soft skills en KPI-resultaten tegelijk zichtbaar te maken',
        recruiterSignals: ['klantgerichtheid', 'duidelijke communicatie', 'constante performance'],
        topSkills: ['CRM en ticketing', 'gespreksstructuur', 'probleemoplossend werken'],
        atsKeywords: ['NPS', 'SLA', 'CRM', 'first contact resolution', 'klantbehoud'],
        hardSkills: ['CRM-systemen', 'ticketing', 'chat en e-mail support', 'telefonie', 'SLA-werken'],
        softSkills: ['empathisch communiceren', 'rust houden onder druk', 'doorvragen', 'verwachtingen managen', 'escalaties voorkomen'],
        profileExamples: [
            'Klantgerichte medewerker met ervaring in telefonie, e-mail en chat binnen KPI-gestuurde service teams.',
            'Combineert empathie met duidelijke oplossingsstructuur om cases snel en duurzaam af te handelen.',
        ],
        bulletExamples: [
            'First contact resolution verhoogd van 68% naar 79% door verbeterde intakevragen en kennisbankgebruik.',
            'NPS-score verhoogd met 12 punten door proactieve opvolging van complexe dossiers.',
            'Escalatievolume verlaagd door terugkerende issues te signaleren en met operations op te lossen.',
        ],
        primaryLanding: {
            href: '/cv-template-klantenservice-medewerker',
            title: 'CV template klantenservice medewerker',
            description: 'Rolgerichte CV-opbouw voor service, support en KPI-gedreven klantcontact.',
        },
    },
    {
        slug: 'verpleegkundige',
        roleName: 'verpleegkundige',
        sector: 'zorg',
        painPoint: 'zorginhoud, verantwoordelijkheid en menselijke communicatie tegelijk te bewijzen',
        recruiterSignals: ['klinische nauwkeurigheid', 'verantwoordelijkheid', 'teamcommunicatie'],
        topSkills: ['klinisch redeneren', 'rapporteren en overdragen', 'patientgerichte zorg'],
        atsKeywords: ['zorgplan', 'klinisch redeneren', 'medicatietoediening', 'observatie', 'overdracht'],
        hardSkills: ['medicatietoediening', 'klinisch redeneren', 'EPD-registratie', 'triage', 'zorgplannen'],
        softSkills: ['rust bewaren', 'helder overdragen', 'empathisch communiceren', 'samenwerken in diensten', 'prioriteren onder druk'],
        profileExamples: [
            'Verpleegkundige met ervaring in acute en planbare zorg, sterk in observatie, overdracht en patientgerichte uitvoering.',
            'Werkt gestructureerd, communiceert helder met artsen en collega s en houdt overzicht in dynamische zorgsituaties.',
        ],
        bulletExamples: [
            'Overdracht aangescherpt met vaste SBAR-structuur waardoor informatieverlies tussen diensten afnam.',
            'Medicatie- en observatieproces gestroomlijnd met betere dossiervoering en minder correcties achteraf.',
            'Patientvoorlichting verbeterd waardoor therapietrouw en duidelijkheid rondom nazorg toenamen.',
        ],
        primaryLanding: {
            href: '/cv-template-verpleegkundige',
            title: 'CV template verpleegkundige',
            description: 'Praktische structuur voor verpleegkundige CV s met focus op zorgkwaliteit en verantwoordelijkheid.',
        },
    },
    {
        slug: 'software-ontwikkelaar',
        roleName: 'software ontwikkelaar',
        sector: 'tech',
        painPoint: 'technische diepte te vertalen naar businessimpact en ownership',
        recruiterSignals: ['technische scherpte', 'ownership', 'meetbare delivery'],
        topSkills: ['software development', 'samenwerken in productteams', 'codekwaliteit en delivery'],
        atsKeywords: ['software development', 'API', 'TypeScript', 'CI/CD', 'code review'],
        hardSkills: ['TypeScript', 'React', 'API-integraties', 'testing', 'CI/CD'],
        softSkills: ['ownership nemen', 'gestructureerd uitleggen', 'samenwerken met product', 'problemen ontleden', 'kwaliteit bewaken'],
        profileExamples: [
            'Software ontwikkelaar met ervaring in productontwikkeling, API-integraties en het leveren van onderhoudbare code in teamverband.',
            'Combineert technische diepgang met pragmatische delivery en duidelijke communicatie richting product en stakeholders.',
        ],
        bulletExamples: [
            'Releaseproces gestroomlijnd waardoor deployfrequentie omhoog ging en regressies sneller werden opgelost.',
            'Nieuwe API-koppeling gebouwd die handmatig werk verving en doorlooptijd in operationele processen verkortte.',
            'Codebase opgeschoond met testdekking en reviewafspraken waardoor wijzigingsrisico per sprint afnam.',
        ],
        primaryLanding: {
            href: '/cv-template-software-ontwikkelaar',
            title: 'CV template software ontwikkelaar',
            description: 'Gebruik een tech-gerichte CV-structuur met ruimte voor impact, stack en delivery.',
        },
    },
    {
        slug: 'verkoopmedewerker',
        roleName: 'verkoopmedewerker',
        sector: 'retail-sales',
        painPoint: 'service en commercieel resultaat in dezelfde bullet zichtbaar te maken',
        recruiterSignals: ['commerciele effectiviteit', 'klantadvies', 'resultaatgerichtheid'],
        topSkills: ['adviesverkoop', 'targetgericht werken', 'productkennis inzetten'],
        atsKeywords: ['omzetdoelen', 'upsell', 'cross-sell', 'klantadvies', 'retail KPI'],
        hardSkills: ['adviesverkoop', 'kassa en POS', 'voorraadbewaking', 'productpresentatie', 'retail KPI s'],
        softSkills: ['actief luisteren', 'commercieel schakelen', 'vertrouwen opbouwen', 'tempo houden', 'samenwerken op de vloer'],
        profileExamples: [
            'Commercieel gedreven verkoopmedewerker met ervaring in retail, klantadvies en resultaatgericht werken op target.',
            'Verbindt productkennis met sterke klantgesprekken om conversie en herhaalaankopen te verhogen.',
        ],
        bulletExamples: [
            'Gemiddeld 13% boven maandtarget gepresteerd door actieve adviesverkoop en slimme productcombinaties.',
            'Conversie in piekuren verbeterd via duidelijke klantrouting en teamafspraken op de vloer.',
            'Retouren in nieuwe productlijn verlaagd door betere behoefteanalyse aan het begin van het gesprek.',
        ],
        primaryLanding: {
            href: '/cv-template-verkoopmedewerker',
            title: 'CV template verkoopmedewerker',
            description: 'Rolgerichte CV-pagina voor verkoop, retail KPI s en adviesgesprekken.',
        },
    },
    {
        slug: 'docent',
        roleName: 'docent',
        sector: 'onderwijs',
        painPoint: 'didactiek, klassenmanagement en leerresultaat compact te bewijzen',
        recruiterSignals: ['didactische scherpte', 'klassenmanagement', 'pedagogische communicatie'],
        topSkills: ['lesvoorbereiding', 'differentiatie', 'leerdoelen vertalen naar uitvoering'],
        atsKeywords: ['lesvoorbereiding', 'klassenmanagement', 'differentiatie', 'leerdoelen', 'pedagogisch'],
        hardSkills: ['lesvoorbereiding', 'toetsing', 'differentiatie', 'mentorwerk', 'digitale leermiddelen'],
        softSkills: ['rust en duidelijkheid brengen', 'coachend communiceren', 'structuur bieden', 'samenwerken met ouders en collega s', 'leerlingen motiveren'],
        profileExamples: [
            'Docent met focus op duidelijke lesstructuur, differentiatie en het vertalen van leerdoelen naar dagelijkse praktijk.',
            'Creert rust, betrokkenheid en voorspelbaarheid in de klas en werkt nauw samen met collega s en ouders.',
        ],
        bulletExamples: [
            'Lesopbouw aangescherpt waardoor leerlingen sneller zelfstandig konden werken en overgangsmomenten rustiger verliepen.',
            'Differentiatieplan ingevoerd voor kernvakken waardoor leerachterstanden gerichter werden aangepakt.',
            'Oudercommunicatie en voortgangsafspraken gestroomlijnd met duidelijkere rapportage en terugkoppeling.',
        ],
        primaryLanding: {
            href: '/cv-voorbeelden/onderwijs/basisschool-docent',
            title: 'Docent CV voorbeeld',
            description: 'Voorbeeld-CV voor onderwijsfuncties met focus op didactiek en klaspraktijk.',
        },
    },
];

export function getPilotRoleTaxonomy(): RoleTaxonomy[] {
    return pilotRoleTaxonomy;
}
