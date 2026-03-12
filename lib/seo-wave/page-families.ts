import { RoleGuideFamilySchema, RoleTaxonomy } from './programmatic-types';

function capitalizeRole(roleName: string): string {
    return roleName ? `${roleName.charAt(0).toUpperCase()}${roleName.slice(1)}` : roleName;
}

function buildCommonFinalChecklist(role: RoleTaxonomy): string[] {
    return [
        `Functietitel en taalgebruik sluiten direct aan op ${role.roleName} vacatures.`,
        'Voorbeelden zijn concreet genoeg om in gesprek uit te leggen.',
        'ATS-termen zijn logisch verwerkt en niet los gestapeld.',
        'Je CV blijft scanbaar, rustig en foutloos geformuleerd.',
        'Bestandsnaam en PDF-export zijn professioneel.',
    ];
}

export const pilotGuideFamilies: RoleGuideFamilySchema[] = [
    {
        id: 'profieltekst',
        slug: (role) => `profieltekst-cv-${role.slug}`,
        title: (role) => `${capitalizeRole(role.roleName)} profieltekst: voorbeelden en opbouw`,
        description: (role) =>
            `Praktische gids voor een sterke ${role.roleName} profieltekst, met voorbeeldzinnen, recruiterfocus en ATS-termen.`,
        metaTitle: (role) => `Profieltekst ${role.roleName} CV | WerkCV`,
        metaDesc: (role) =>
            `Schrijf een sterke profieltekst voor een ${role.roleName} CV. Inclusief voorbeeldzinnen, recruiterfocus, ATS-keywords en veelgemaakte fouten.`,
        keywords: (role) => [
            `profieltekst cv ${role.roleName}`,
            `${role.roleName} profieltekst`,
            `${role.roleName} cv`,
            'profieltekst cv voorbeeld',
        ],
        intro: (role) =>
            `Zoek je een sterke profieltekst voor een ${role.roleName} CV? Recruiters willen in de eerste regels al zien dat jij past bij de rol. Deze pagina geeft je een vaste opbouw, voorbeeldzinnen en de termen die in Nederlandse vacatures terugkomen.`,
        sections: (role) => [
            {
                id: 'recruiter-scan',
                title: `Wat recruiters willen zien in een ${role.roleName} profieltekst`,
                paragraphs: [
                    `Bij ${role.roleName} sollicitaties letten recruiters vooral op ${role.recruiterSignals.join(', ')}.`,
                    `De grootste fout is vaak ${role.painPoint}. Je profieltekst moet daarom direct laten zien wat jij toevoegt in plaats van algemeen te blijven.`,
                ],
                bullets: [
                    `Verwerk 2-3 kernvaardigheden zoals ${role.topSkills.join(', ')}.`,
                    'Noem je rolfocus, relevant ervaringsniveau en het type resultaat dat je levert.',
                    'Houd de tekst compact: 3-5 regels is meestal genoeg.',
                ],
            },
            {
                id: 'opbouw',
                title: 'Vaste formule voor je profieltekst',
                paragraphs: [
                    'Een sterke profieltekst volgt meestal dezelfde logica: wie je bent, wat je sterkste rolfit is, en welk resultaat of type waarde je brengt.',
                    'Gebruik geen zachte containerwoorden zonder bewijs. Recruiters willen concrete signalen die later in werkervaring terugkomen.',
                ],
                bullets: [
                    `Open met je rol: "${capitalizeRole(role.roleName)} met ..."`,
                    'Voeg daarna 2-3 kerncompetenties toe die in de vacature terugkomen.',
                    'Sluit af met impact, context of het type omgeving waarin je sterk bent.',
                ],
            },
            {
                id: 'voorbeelden',
                title: `Voorbeeld profieltekst voor ${role.roleName}`,
                paragraphs: [
                    'Gebruik deze voorbeeldregels als basis en herschrijf ze naar jouw ervaring, niveau en vacature.',
                ],
                exampleTitle: 'Voorbeeld profielregels',
                exampleItems: role.profileExamples,
            },
            {
                id: 'ats',
                title: 'ATS-keywords slim verwerken',
                paragraphs: [
                    'Je profieltekst helpt niet alleen mensen; hij zet ook de toon voor ATS-relevantie. Gebruik belangrijke termen waar ze natuurlijk passen.',
                ],
                bullets: [
                    `Relevante termen voor dit profiel zijn onder andere: ${role.atsKeywords.join(', ')}.`,
                    'Neem alleen termen op die je in gesprek kunt onderbouwen.',
                    'Laat je profieltekst aansluiten op dezelfde woorden die in je top-bullets terugkomen.',
                ],
            },
            {
                id: 'final-check',
                title: 'Final check voor je profieltekst',
                paragraphs: [
                    'Lees de tekst hardop terug. Klinkt hij concreet, rolgericht en geloofwaardig, of nog te algemeen?',
                ],
                bullets: buildCommonFinalChecklist(role),
            },
        ],
        checklist: (role) => [
            'De eerste zin noemt direct je doelrol of huidige rol.',
            'Kernvaardigheden sluiten aan op de vacaturetaal.',
            `De tekst voelt specifiek voor ${role.roleName} en niet generiek.`,
            ...buildCommonFinalChecklist(role).slice(2),
        ],
        faq: (role) => [
            {
                question: `Hoe lang moet een ${role.roleName} profieltekst zijn?`,
                answer: 'Meestal 3-5 regels. Kort genoeg voor snelle scan, lang genoeg om rolfit en waarde te laten zien.',
            },
            {
                question: 'Moet ik jaren ervaring noemen?',
                answer: 'Ja, als dat je geloofwaardigheid versterkt. Bij starters kun je beter focussen op stage, potentieel en relevante vaardigheden.',
            },
            {
                question: 'Wat is de grootste fout?',
                answer: 'Algemene claims zoals "gemotiveerd" of "teamplayer" zonder functierelevante context of bewijs.',
            },
            {
                question: 'Moet de profieltekst per vacature aangepast worden?',
                answer: 'Ja. Vooral functietitel, kernvaardigheden en taalgebruik moeten aansluiten op de specifieke vacature.',
            },
        ],
        relatedLinks: (role) => [
            role.primaryLanding,
            {
                href: '/tools/profieltekst-generator',
                title: 'Profieltekst generator',
                description: 'Gebruik de generator om snel een eerste profieltekst te maken en daarna handmatig te verscherpen.',
            },
            {
                href: '/cv-tips/profieltekst-schrijven',
                title: 'Tips voor profieltekst schrijven',
                description: 'Leer hoe je je profieltekst concreet, kort en recruitergericht maakt.',
            },
        ],
        ctaTitle: (role) => `Schrijf je ${role.roleName} profieltekst sneller`,
        ctaText: () => 'Open de generator, maak een eerste versie, en gebruik deze gids om hem vacaturegericht af te werken.',
        ctaHref: '/tools/profieltekst-generator',
    },
    {
        id: 'werkervaring',
        slug: (role) => `werkervaring-cv-${role.slug}`,
        title: (role) => `${capitalizeRole(role.roleName)} werkervaring: sterke bullets en voorbeelden`,
        description: (role) =>
            `Praktische gids voor ${role.roleName} werkervaring op je CV, met voorbeeldbullets, recruiterfocus en ATS-termen.`,
        metaTitle: (role) => `Werkervaring ${role.roleName} CV | WerkCV`,
        metaDesc: (role) =>
            `Schrijf sterkere werkervaring voor een ${role.roleName} CV. Inclusief voorbeeldbullets, impactformules, ATS-termen en fouten om te vermijden.`,
        keywords: (role) => [
            `werkervaring cv ${role.roleName}`,
            `${role.roleName} cv voorbeelden`,
            `${role.roleName} werkervaring`,
            'cv werkervaring voorbeelden',
        ],
        intro: (role) =>
            `Bij een ${role.roleName} CV bepaalt werkervaring meestal of je wordt uitgenodigd. Deze pagina helpt je om taken om te zetten in korte, resultaatgerichte bullets die recruiters en ATS-systemen sneller begrijpen.`,
        sections: (role) => [
            {
                id: 'recruiter-scan',
                title: `Hoe recruiters naar ${role.roleName} werkervaring kijken`,
                paragraphs: [
                    `Recruiters zoeken snel bewijs van ${role.recruiterSignals.join(', ')}.`,
                    `Veel kandidaten blijven hangen in taakomschrijvingen. De sterkere versie laat zien welk probleem je oploste, hoe je werkte en wat het effect was.`,
                ],
                bullets: [
                    'Werk met actie + context + resultaat.',
                    'Zet je sterkste bullets in je meest recente rol.',
                    'Gebruik termen uit de vacature wanneer die echt bij je werk passen.',
                ],
            },
            {
                id: 'bullet-framework',
                title: 'Vaste structuur voor goede werkervaring-bullets',
                paragraphs: [
                    'Een goede bullet begint niet met verantwoordelijkheid, maar met impact. Recruiters willen zien wat er veranderde door jouw inzet.',
                ],
                bullets: [
                    'Context: waar werkte je aan?',
                    'Actie: wat deed jij precies?',
                    'Effect: wat verbeterde in kwaliteit, snelheid, omzet, klanttevredenheid of rust in de operatie?',
                ],
            },
            {
                id: 'voorbeelden',
                title: `Voorbeeld werkervaring voor ${role.roleName}`,
                paragraphs: [
                    'Gebruik deze voorbeeldbullets als startpunt. Pas cijfers, context en systemen aan naar je eigen praktijk.',
                ],
                exampleTitle: 'Voorbeeldbullets',
                exampleItems: role.bulletExamples,
            },
            {
                id: 'ats',
                title: 'ATS en vacaturetaal in werkervaring',
                paragraphs: [
                    'ATS kijkt niet alleen naar je vaardighedenlijst. Veel matching gebeurt juist in je recente rollen en bullet points.',
                ],
                bullets: [
                    `Belangrijke termen voor dit type rol: ${role.atsKeywords.join(', ')}.`,
                    'Noem systemen, methodes of KPI s alleen als je ze ook praktisch hebt gebruikt.',
                    'Vermijd bullets die alleen activiteit noemen zonder zichtbaar resultaat.',
                ],
            },
            {
                id: 'final-check',
                title: 'Final check voor je werkervaring',
                paragraphs: [
                    'Laat elke bullet door twee filters gaan: is dit relevant voor de vacature, en laat dit echt impact of kwaliteit zien?',
                ],
                bullets: buildCommonFinalChecklist(role),
            },
        ],
        checklist: (role) => [
            `De sterkste werkervaring sluit direct aan op ${role.roleName} vacatures.`,
            'Bullets beschrijven niet alleen taken, maar ook verandering of resultaat.',
            'Kernwoorden uit de vacature zijn logisch verwerkt.',
            ...buildCommonFinalChecklist(role).slice(2),
        ],
        faq: (role) => [
            {
                question: `Hoeveel bullets zijn ideaal voor ${role.roleName} werkervaring?`,
                answer: 'Meestal 3-5 sterke bullets per recente functie. Minder kan prima als de inhoud concreet en relevant is.',
            },
            {
                question: 'Moet ik altijd cijfers gebruiken?',
                answer: 'Ja als je ze hebt. Als niet, benoem dan een zichtbare verbetering in kwaliteit, snelheid, rust of klantimpact.',
            },
            {
                question: 'Wat als mijn werk veel routine bevatte?',
                answer: 'Beschrijf hoe jij kwaliteit bewaakte, fouten voorkwam, klanten hielp of processen stabiel hield. Dat is ook waarde.',
            },
            {
                question: 'Wat is de grootste fout in werkervaring?',
                answer: 'Algemene taken noemen zonder context, tools, prioriteit of effect op de operatie.',
            },
        ],
        relatedLinks: (role) => [
            role.primaryLanding,
            {
                href: '/tools/werkervaring-bullets',
                title: 'Werkervaring bullets tool',
                description: 'Zet ruwe werkzaamheden om in sterkere, resultaatgerichte bullet points.',
            },
            {
                href: '/cv-tips/cv-werkervaring-beschrijven',
                title: 'Werkervaring beschrijven op je CV',
                description: 'Praktische tips om van taken naar overtuigende CV-bullets te gaan.',
            },
        ],
        ctaTitle: (role) => `Maak sterkere ${role.roleName} bullets`,
        ctaText: () => 'Gebruik de bullets-tool als eerste concept en maak je output daarna scherper met de voorbeelden en regels op deze pagina.',
        ctaHref: '/tools/werkervaring-bullets',
    },
    {
        id: 'vaardigheden',
        slug: (role) => `vaardigheden-cv-${role.slug}`,
        title: (role) => `${capitalizeRole(role.roleName)} vaardigheden op je CV`,
        description: (role) =>
            `Praktische gids voor relevante ${role.roleName} vaardigheden op je CV, inclusief hard skills, soft skills en ATS-termen.`,
        metaTitle: (role) => `Vaardigheden ${role.roleName} CV | WerkCV`,
        metaDesc: (role) =>
            `Welke vaardigheden zet je op een ${role.roleName} CV? Bekijk hard skills, soft skills, ATS-termen en een sterke skill-mix per rol.`,
        keywords: (role) => [
            `vaardigheden cv ${role.roleName}`,
            `${role.roleName} vaardigheden`,
            `${role.roleName} cv`,
            'vaardigheden op cv',
        ],
        intro: (role) =>
            `Zoek je de juiste vaardigheden voor een ${role.roleName} CV? Een goede skills-sectie is kort, relevant en afgestemd op de vacature. Deze pagina helpt je kiezen wat je wel en niet moet opnemen.`,
        sections: (role) => [
            {
                id: 'recruiter-scan',
                title: `Welke skill-mix recruiters verwachten bij ${role.roleName}`,
                paragraphs: [
                    `Recruiters zoeken bij ${role.roleName} meestal een combinatie van ${role.recruiterSignals.join(', ')}.`,
                    'Alleen losse buzzwords opsommen werkt zelden. Kies vaardigheden die terugkomen in de vacature en die je in gesprek kunt bewijzen met voorbeelden.',
                ],
                bullets: [
                    `Begin met je sterkste mix van kernvaardigheden: ${role.topSkills.join(', ')}.`,
                    'Beperk je lijst tot wat echt relevant is voor de rol.',
                    'Zorg dat vaardigheden terugkomen in profieltekst en werkervaring.',
                ],
            },
            {
                id: 'hard-skills',
                title: 'Hard skills die passen bij deze rol',
                paragraphs: [
                    'Hard skills zijn systemen, methodes, inhoudelijke vakkennis en tools die recruiters expliciet terugzoeken in ATS en vacatureteksten.',
                ],
                exampleTitle: 'Voorbeeld hard skills',
                exampleItems: role.hardSkills,
            },
            {
                id: 'soft-skills',
                title: 'Soft skills die geloofwaardig werken',
                paragraphs: [
                    'Soft skills werken pas als ze logisch aansluiten op je werkcontext. Kies dus niet de langste lijst, maar de meest bewijsbare mix.',
                ],
                exampleTitle: 'Voorbeeld soft skills',
                exampleItems: role.softSkills,
            },
            {
                id: 'ats',
                title: 'ATS-termen en vacaturematch',
                paragraphs: [
                    'Veel vaardigheden worden door ATS-systemen uitgelezen. Daarom is het slim om dezelfde terminologie te gebruiken als in de vacature, zolang die eerlijk past.',
                ],
                bullets: [
                    `Typische ATS-termen voor deze rol: ${role.atsKeywords.join(', ')}.`,
                    'Gebruik geen irrelevante termen alleen omdat ze vaak voorkomen in vacatures.',
                    'Laat je skills-lijst kort genoeg om scanbaar te blijven.',
                ],
            },
            {
                id: 'final-check',
                title: 'Final check voor je vaardigheden',
                paragraphs: [
                    'Een sterke skills-sectie is kort, geloofwaardig en ondersteunend aan de rest van je CV.',
                ],
                bullets: buildCommonFinalChecklist(role),
            },
        ],
        checklist: (role) => [
            `De skills-sectie voelt specifiek voor ${role.roleName}.`,
            'Hard skills en soft skills zijn in balans.',
            'ATS-termen sluiten aan op de vacaturetaal.',
            ...buildCommonFinalChecklist(role).slice(2),
        ],
        faq: (role) => [
            {
                question: `Hoeveel vaardigheden zet ik op een ${role.roleName} CV?`,
                answer: 'Meestal 6-10 goed gekozen vaardigheden. Meer mag, maar alleen als de lijst scanbaar en relevant blijft.',
            },
            {
                question: 'Moet ik soft skills noemen?',
                answer: 'Ja, maar alleen de soft skills die logisch passen bij de rol en die je kunt onderbouwen met voorbeelden uit je werkervaring.',
            },
            {
                question: 'Moet ik tools en systemen apart noemen?',
                answer: 'Ja, vaak wel. Zeker als specifieke software of methodes expliciet in de vacature staan.',
            },
            {
                question: 'Wat is de grootste fout in de skills-sectie?',
                answer: 'Een te lange, generieke lijst zonder relatie met de vacature of zonder bewijs in de rest van je CV.',
            },
        ],
        relatedLinks: (role) => [
            role.primaryLanding,
            {
                href: '/tools/vaardigheden-generator',
                title: 'Vaardigheden generator',
                description: 'Laat een eerste skill-mix genereren en scherp daarna handmatig aan op basis van je echte ervaring.',
            },
            {
                href: '/cv-tips/cv-vaardigheden-kiezen',
                title: 'Welke vaardigheden zet je op je CV?',
                description: 'Praktische uitleg over het kiezen, ordenen en schrappen van vaardigheden per vacature.',
            },
        ],
        ctaTitle: (role) => `Kies betere ${role.roleName} vaardigheden`,
        ctaText: () => 'Gebruik de generator om een eerste skill-set te maken en controleer daarna met deze gids welke termen echt op je CV moeten blijven.',
        ctaHref: '/tools/vaardigheden-generator',
    },
];

