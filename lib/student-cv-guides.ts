import { cvDownloadPrice } from "@/lib/site-content";

export type StudentCvExampleEntry = {
  label: string;
  value: string;
  bullets?: string[];
};

export type StudentCvGuideConfig = {
  path: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  eyebrow: string;
  audienceLabel: string;
  startSource: string;
  ctaHref: string;
  ctaLabel: string;
  updatedLabel: string;
  datePublished?: string;
  dateModified: string;
  example: {
    name: string;
    target: string;
    contact: string[];
    profile: string;
    entries: StudentCvExampleEntry[];
    note: string;
    annotations: string[];
  };
  profileExamples: Array<{
    label: string;
    text: string;
    why: string;
  }>;
  weakImproved?: {
    weak: string;
    improved: string;
    explanation: string;
  };
  guidance: Array<{
    title: string;
    paragraphs: string[];
    bullets: string[];
  }>;
  checklist: string[];
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; label: string; description: string }>;
  sources?: Array<{ label: string; href: string; note: string }>;
};

const updatedDate = "2026-09-13";

export const mboWithoutExperienceGuide: StudentCvGuideConfig = {
  path: "/cv-gids/cv-zonder-ervaring-mbo",
  title: "Een cv maken zonder werkervaring als mbo-student",
  metaTitle: "CV zonder ervaring voor mbo: voorbeeld en tips | WerkCV",
  metaDescription:
    "Een cv maken zonder werkervaring als mbo-student? Bekijk een volledig fictief voorbeeld, profielteksten, schoolprojecten en een praktische checklist.",
  intro:
    "Ook zonder formele baan kun je een geloofwaardig mbo-cv maken. Laat zien wat je leert, welke praktijkopdrachten je hebt gedaan en hoe je verantwoordelijkheid neemt.",
  eyebrow: "MBO · eerste cv",
  audienceLabel: "Voor mbo-studenten met weinig of geen formele werkervaring",
  startSource: "mbo_cv_no_experience",
  ctaHref: "/editor?template=professional&startSource=mbo_cv_no_experience",
  ctaLabel: "Maak mijn eerste cv",
  updatedLabel: "Bijgewerkt op 13 september 2026",
  dateModified: updatedDate,
  example: {
    name: "Sanne de Boer",
    target: "Mbo-student · zoekt een eerste bijbaan in administratie of klantenservice",
    contact: [
      "sanne.deboer@example.test",
      "+31 6 0000 0000",
      "Utrecht · linkedin.com/in/sanne-de-boer-voorbeeld",
    ],
    profile:
      "Praktisch ingestelde mbo-student Office & Management Support. Tijdens schoolprojecten en een buurtactiviteit heb ik geleerd om afspraken bij te houden, bezoekers vriendelijk te helpen en nauwkeurig met Excel te werken. Ik zoek een eerste bijbaan waarin ik mijn werkhouding verder kan ontwikkelen.",
    entries: [
      {
        label: "Opleiding",
        value: "MBO 4 Office & Management Support · ROC Middenstad, Utrecht · 2024 – heden",
        bullets: [
          "Vakken: zakelijke communicatie, planning, digitale administratie en rekenen.",
          "Verwachte afronding: juni 2027.",
        ],
      },
      {
        label: "Schoolproject · administratie",
        value: "Projectgroep ‘Open dag organiseren’ · ROC Middenstad · 2025",
        bullets: [
          "Een Excel-overzicht gemaakt voor 86 bezoekers, tijdsloten en lokalen.",
          "Taken verdeeld met drie medestudenten en wijzigingen vóór elke deadline gecontroleerd.",
        ],
      },
      {
        label: "Vrijwillige ervaring",
        value: "Ontvangstteam Buurtfestival Oost · Utrecht · 2024 – 2025",
        bullets: [
          "Bezoekers ontvangen, vragen beantwoord en de aanwezigheidslijst bijgehouden.",
          "Rustig gebleven tijdens piekmomenten en bijzonderheden doorgegeven aan de coördinator.",
        ],
      },
      {
        label: "Digitale vaardigheden",
        value: "Microsoft Excel, Word, Outlook en Canva",
        bullets: [
          "Excel: eenvoudige formules, sorteren, filters en overzichtelijke tabellen.",
          "Word: brieven en verslagen opmaken volgens een vaste huisstijl.",
        ],
      },
      {
        label: "Talen",
        value: "Nederlands: moedertaal · Engels: B1",
      },
      {
        label: "Beschikbaarheid",
        value: "12–16 uur per week; maandagmiddag, woensdag en zaterdag beschikbaar. Extra inzetbaar in schoolvakanties.",
      },
    ],
    note:
      "Dit is een volledig fictief voorbeeld. Gebruik alleen je eigen opleiding, activiteiten en vaardigheden; verzin geen werkgevers, resultaten of certificaten.",
    annotations: [
      "De opleiding staat prominent omdat Sanne nog aan het begin van haar loopbaan staat.",
      "Schoolproject en vrijwilligerswerk benoemen haar eigen bijdrage in plaats van alleen ‘gemotiveerd’ te zeggen.",
      "Beschikbaarheid en digitale vaardigheden zijn concreet genoeg om in een gesprek te controleren.",
    ],
  },
  profileExamples: [
    {
      label: "Eerste parttime baan",
      text: "Mbo-student Retail met een rustige werkhouding en plezier in contact met mensen. Tijdens schoolopdrachten heb ik geleerd om nauwkeurig te werken en afspraken na te komen. Ik zoek een parttime bijbaan waarin ik klanten goed help en snel nieuwe taken leer.",
      why: "De tekst noemt de opleiding, werkhouding en het soort baan zonder te doen alsof er al jaren werkervaring is.",
    },
    {
      label: "Stage zoeken",
      text: "Mbo-student ICT op zoek naar een stage vanaf februari 2027. Ik heb ervaring met het installeren van software in schoolopdrachten, werk graag systematisch en leg technische stappen duidelijk uit. Tijdens mijn stage wil ik mijn supportvaardigheden in een echte werkomgeving verdiepen.",
      why: "De gewenste periode, richting en leerdoel maken deze tekst direct bruikbaar voor een stagevacature.",
    },
    {
      label: "Wel projecten, geen baan",
      text: "Analytische mbo-student Logistiek met praktijkopdrachten in voorraadbeheer en routeplanning. Ik werk graag met checklists, signaleer afwijkingen snel en overleg wanneer een planning verandert. Ik zoek een leerzame startersrol in een magazijn- of distributieteam.",
      why: "Schoolwerk wordt vertaald naar concreet gedrag dat een werkgever kan herkennen en navragen.",
    },
  ],
  weakImproved: {
    weak: "Ik ben gemotiveerd en leergierig.",
    improved:
      "Tijdens de open dag hield ik zelfstandig het bezoekersoverzicht bij en verwerkte ik wijzigingen vóór de deadline. Ik pak feedback snel op en wil die werkhouding inzetten in een eerste bijbaan.",
    explanation:
      "De verbeterde versie koppelt motivatie aan een echte activiteit, gedrag en een concrete volgende stap.",
  },
  guidance: [
    {
      title: "Gebruik opleiding als relevant bewijs",
      paragraphs: [
        "Zet je mbo-opleiding duidelijk bovenaan als je nog weinig werkervaring hebt. Noem de richting, het niveau, de school en de verwachte einddatum.",
        "Kies daarna alleen vakken, opdrachten of praktijkuren die aansluiten op de functie. Een lange cijferlijst is meestal niet nodig.",
      ],
      bullets: [
        "Noem relevante vakken zoals planning, zorg, ICT, verkoop of techniek.",
        "Beschrijf wat je zelf hebt gemaakt of georganiseerd, niet alleen wat het vak heette.",
        "Schrijf je opleidingsstatus eerlijk: ‘bezig met’, ‘afgerond’ of ‘verwacht in’. ",
      ],
    },
    {
      title: "Maak schoolprojecten en praktijkopdrachten zichtbaar",
      paragraphs: [
        "Een project telt niet als verzonnen werkervaring. Het is wel bruikbaar bewijs van hoe je werkt. Vermeld de context, jouw rol en wat je hebt opgeleverd.",
        "Kleine activiteiten zijn welkom wanneer ze echt gebeurd zijn: een planning, presentatie, voorraadlijst, website, evenement of praktijkopdracht.",
      ],
      bullets: [
        "Gebruik actie + context + resultaat: ‘een planning gemaakt voor 86 bezoekers’. ",
        "Vermijd opgeblazen cijfers of verantwoordelijkheden die je niet kunt uitleggen.",
        "Zet een portfolio- of projectlink alleen neer als die link werkt en je hem kunt delen.",
      ],
    },
    {
      title: "Vergeet bijbaan, vrijwilligerswerk en beschikbaarheid niet",
      paragraphs: [
        "Ook een korte bijbaan, vrijwilligersactiviteit of verantwoordelijkheid thuis kan iets zeggen over betrouwbaarheid, klantcontact of samenwerken. Kies alleen voorbeelden die je in een gesprek kunt toelichten.",
        "Voor een bijbaan of stage is beschikbaarheid vaak praktische informatie. Zet uren, dagen en vakantiebeschikbaarheid feitelijk neer wanneer de vacature ernaar vraagt.",
      ],
      bullets: [
        "Noem talen en digitale tools met een eerlijk niveau.",
        "Vervang ‘flexibel’ door dagen of uren waarop je echt beschikbaar bent.",
        "Laat hobby’s alleen staan wanneer ze relevant zijn of iets concreets over je laten zien.",
      ],
    },
  ],
  checklist: [
    "De mbo-opleiding, richting en verwachte einddatum zijn duidelijk.",
    "Minstens één schoolproject of praktijkopdracht beschrijft jouw eigen bijdrage.",
    "Bijbaan, vrijwilligerswerk of andere echte verantwoordelijkheid staat erbij als die relevant is.",
    "De profieltekst noemt een doel en wordt ondersteund door een concreet voorbeeld.",
    "Digitale vaardigheden en talen hebben een eerlijk niveau.",
    "Beschikbaarheid klopt met je rooster en de vacature.",
    "Alle namen, data, links en contactgegevens zijn fictief in het voorbeeld en correct in jouw eigen cv.",
  ],
  faqs: [
    {
      question: "Wat zet ik op mijn cv als mbo-student zonder baanervaring?",
      answer:
        "Begin met je opleiding en voeg relevante schoolprojecten, praktijkopdrachten, vrijwilligerswerk, bijbaan, talen en digitale vaardigheden toe. Beschrijf steeds wat jij deed en wat je opleverde.",
    },
    {
      question: "Moet mijn opleiding bovenaan staan?",
      answer:
        "Meestal wel wanneer je starter bent. Staat er al een stage of bijbaan die direct bij de vacature past, dan kun je die ervaring eerder plaatsen.",
    },
    {
      question: "Hoe toon ik motivatie zonder alleen ‘gemotiveerd’ te schrijven?",
      answer:
        "Koppel motivatie aan gedrag: een deadline halen, bezoekers helpen, een planning bijhouden of feedback toepassen. Zo kan een werkgever je voorbeeld bespreken.",
    },
    {
      question: "Is één pagina genoeg voor een mbo-starter?",
      answer:
        "Ja. Een korte, relevante pagina is meestal sterker dan een lange lijst met algemene eigenschappen.",
    },
    {
      question: "Kan ik gratis beginnen?",
      answer:
        `Ja. Je kunt gratis starten en je cv in de editor bekijken. Je betaalt eenmalig ${cvDownloadPrice.display} inclusief btw wanneer je de definitieve PDF downloadt; er is geen abonnement.`,
    },
  ],
  relatedLinks: [
    {
      href: "/cv-maken-met-ai#example-text-student",
      label: "AI-hulp bij je eerste cv",
      description: "Bekijk een fictief schoolproject in een volledig cv. Gebruik alleen je eigen ervaring; op de AI-pagina zie je welke schrijfhulp beschikbaar is.",
    },
    {
      href: "/stage-cv-maken",
      label: "Een stage-cv maken",
      description: "Zet opleiding, leerdoelen en projecten gericht in voor een stageplek.",
    },
    {
      href: "/cv-gids/cv-bbl-opleiding",
      label: "CV voor een BBL-leerwerkplek",
      description: "Lees hoe je leren en werken, praktische ervaring en beschikbaarheid presenteert.",
    },
    {
      href: "/cv-maken-student",
      label: "Brede student-CV gids",
      description: "Gebruik deze route wanneer je nog twijfelt tussen bijbaan, stage en eerste baan.",
    },
    {
      href: "/cv-voorbeelden/studenten-en-starters/student-cv",
      label: "Meer student-CV voorbeelden",
      description: "Vergelijk een tweede fictief voorbeeld met opleiding, projecten en startervaring.",
    },
  ],
};

export const stageCvGuide: StudentCvGuideConfig = {
  path: "/stage-cv-maken",
  title: "Een stage-cv maken dat past bij je stageplek",
  metaTitle: "Stage-cv maken: voorbeeld en tips voor je stage | WerkCV",
  metaDescription:
    "Een stage-cv maken? Bekijk een volledig fictief voorbeeld, profielteksten voor administratie, ICT en retail, plus een praktische stage-checklist.",
  intro:
    "Een stage-cv hoeft niet vol werkervaring te staan. Het moet snel duidelijk maken welke opleiding je volgt, wat je al hebt geoefend en wat je tijdens deze stage wilt leren.",
  eyebrow: "Stage · opleiding en leerdoel",
  audienceLabel: "Voor mbo-, hbo- en wo-studenten die een stage zoeken",
  startSource: "stage_cv_maken",
  ctaHref: "/editor?template=professional&startSource=stage_cv_maken",
  ctaLabel: "Maak mijn stage-cv",
  updatedLabel: "Bijgewerkt op 13 september 2026",
  dateModified: updatedDate,
  example: {
    name: "Noor Jansen",
    target: "HBO-student Communicatie · zoekt een meewerkstage content en marketing",
    contact: [
      "noor.jansen@example.test",
      "+31 6 0000 0000",
      "Amersfoort · noorjansen.example.test/portfolio",
    ],
    profile:
      "HBO-student Communicatie met ervaring in contentplanning, interviews en het maken van korte social posts voor studieprojecten. Ik zoek een meewerkstage van februari tot en met juni 2027 waarin ik leer hoe een contentkalender en campagne in de praktijk worden uitgevoerd.",
    entries: [
      {
        label: "Opleiding",
        value: "HBO Communicatie · Hogeschool Middenland · 2024 – heden",
        bullets: [
          "Propedeuse behaald; verwachte afstudeerdatum: juni 2028.",
          "Relevante vakken: contentstrategie, doelgroepanalyse, projectcommunicatie.",
        ],
      },
      {
        label: "Stageproject · contentplan",
        value: "Projectgroep ‘Lokale campagne’ · Hogeschool Middenland · 2026",
        bullets: [
          "Een contentkalender voor vier weken opgesteld op basis van drie doelgroepinterviews.",
          "Twaalf social concepten geschreven en de keuzes gepresenteerd aan de projectbegeleider.",
        ],
      },
      {
        label: "Studievereniging",
        value: "Communicatieteam · Studievereniging Kompas · 2025 – heden",
        bullets: [
          "Maandelijks een nieuwsbrief voorbereid en input van leden verzameld.",
          "Nieuwe berichten gecontroleerd op duidelijke taal, links en planning.",
        ],
      },
      {
        label: "Bijbaan",
        value: "Medewerker kassa · Fictieve Buurtwinkel · Amersfoort · 2024 – 2025",
        bullets: [
          "Klanten geholpen, schappen aangevuld en rustig gehandeld tijdens drukke momenten.",
        ],
      },
      {
        label: "Vaardigheden en tools",
        value: "Contentplanning, interviewen, Canva, WordPress (basis), Microsoft 365",
      },
      {
        label: "Stageperiode en leerdoel",
        value: "Beschikbaar van februari t/m juni 2027, 32 uur per week. Ik wil leren hoe contentprestaties worden gemeten en verbeterd.",
      },
      {
        label: "Talen",
        value: "Nederlands: moedertaal · Engels: B2",
      },
    ],
    note:
      "Dit is een volledig fictief voorbeeld. Vervang periode, opleiding, projecten en tools door informatie die voor jouw stage klopt.",
    annotations: [
      "De stageperiode en het leerdoel staan naast de opleiding, zodat de stagebegeleider direct weet wat Noor zoekt.",
      "Het project koppelt interviewen en contentplanning aan taken die in een stagevacature kunnen terugkomen.",
      "De bijbaan blijft kort en ondersteunt het verhaal over service en samenwerken.",
    ],
  },
  profileExamples: [
    {
      label: "Administratie",
      text: "Mbo-student Office & Management Support op zoek naar een administratieve stage vanaf september 2027. Ik werk nauwkeurig met documenten en planningen, leer nieuwe systemen snel en vind het prettig om collega’s duidelijk te helpen. Tijdens mijn stage wil ik mijn vaardigheden in dossierbeheer en klantcontact verdiepen.",
      why: "De stageperiode, opleiding, praktische basis en het leerdoel staan meteen in beeld.",
    },
    {
      label: "ICT",
      text: "HBO-student ICT met een basis in Python, SQL en het testen van webapplicaties. Voor schoolprojecten documenteerde ik problemen en werkte ik in korte sprints samen met drie medestudenten. Ik zoek een meewerkstage waarin ik softwaretesten en support in een professioneel team verder leer.",
      why: "De tekst verbindt technische termen aan echte projecten en maakt duidelijk wat de student wil leren.",
    },
    {
      label: "Retail",
      text: "Mbo-student Retail met ervaring in klantcontact vanuit een bijbaan en praktijkopdrachten over winkelpresentatie. Ik let op service, werk graag samen en pak taken zelfstandig op. Ik zoek een stage waarin ik merchandising, verkoopgesprekken en voorraadbeheer in de praktijk kan oefenen.",
      why: "De profieltekst gebruikt herkenbare retailtaken en maakt het gewenste leergebied concreet.",
    },
  ],
  weakImproved: {
    weak: "Ik ben enthousiast en wil graag stage lopen bij jullie bedrijf.",
    improved:
      "Voor jullie stage met een contentkalender en social posts sluit mijn projectervaring goed aan: ik interviewde drie doelgroepen, maakte twaalf concepten en wil nu leren hoe resultaten in een echte campagne worden gemeten.",
    explanation:
      "De verbeterde versie koppelt de stagevacature aan één aantoonbare opdracht en een specifiek leerdoel.",
  },
  guidance: [
    {
      title: "Zet opleiding, stageperiode en richting bovenaan",
      paragraphs: [
        "Een stagebegeleider moet snel kunnen zien welke opleiding je volgt, in welk jaar je zit en voor welke periode je beschikbaar bent. Zet die gegevens in je profiel of in een opvallend blok.",
        "Noem het soort stage dat je zoekt: meewerkstage, afstudeerstage, BPV of een specifieke richting. Gebruik de term uit de vacature als die bij jou past.",
      ],
      bullets: [
        "Vermeld studiejaar, relevante vakken en verwachte einddatum.",
        "Schrijf de periode als die bekend is en wees duidelijk over uren per week.",
        "Maak leerdoelen concreet: welk proces, welke tool of welk type verantwoordelijkheid wil je oefenen?",
      ],
    },
    {
      title: "Vertaal projecten naar de taken van de stage",
      paragraphs: [
        "Een schoolproject is sterker wanneer je uitlegt welke taak jij had en wat je hebt opgeleverd. Kies voorbeelden die lijken op de werkzaamheden in de stageomschrijving.",
        "Gebruik geen algemene lijst met vakken als een project beter bewijs geeft. Een korte, specifieke bullet is vaak genoeg.",
      ],
      bullets: [
        "Beschrijf context, eigen bijdrage en resultaat in maximaal twee regels.",
        "Link een portfolio alleen wanneer het actueel, toegankelijk en van jou is.",
        "Neem een bijbaan of vereniging op als die service, planning of samenwerken bewijst.",
      ],
    },
    {
      title: "Maak elke versie relevant voor de stageplek",
      paragraphs: [
        "Gebruik niet hetzelfde profiel voor iedere stage. Markeer eerst de drie belangrijkste taken en pas daarna je profiel, projecten en vaardigheden aan.",
        "Blijf feitelijk: een vacature geeft context, maar maakt jouw ervaring niet automatisch waar.",
      ],
      bullets: [
        "Gebruik de naam van de functie of afdeling als dat natuurlijk klinkt.",
        "Zet relevante tools en vaardigheden hoger dan algemene eigenschappen.",
        "Controleer naam van het bedrijf, stageperiode en contactpersoon vóór verzending.",
      ],
    },
  ],
  checklist: [
    "Opleiding, studiejaar en gewenste stage-richting staan duidelijk bovenaan.",
    "Stageperiode, uren en beschikbaarheid zijn ingevuld wanneer ze bekend zijn.",
    "Minstens één project beschrijft jouw eigen bijdrage en concrete output.",
    "Je leerdoel past bij de werkzaamheden van de stageplek.",
    "Profiel en vaardigheden zijn aangepast aan de echte stageomschrijving.",
    "Portfolio- en contactlinks werken en bevatten geen placeholdertekst.",
    "Het cv blijft overzichtelijk en bij voorkeur één pagina als je starter bent.",
  ],
  faqs: [
    {
      question: "Wat zet ik op een cv voor een stage?",
      answer:
        "Noem opleiding, studiejaar, gewenste stageperiode, relevante projecten, vakken, tools, bijbaanervaring en een concreet leerdoel. Kies voorbeelden die aansluiten op de stageomschrijving.",
    },
    {
      question: "Kan ik een stage-cv maken zonder eerdere stage?",
      answer:
        "Ja. Schoolprojecten, praktijkopdrachten, portfolio, vereniging en bijbaan kunnen laten zien hoe je werkt en wat je al hebt geoefend.",
    },
    {
      question: "Hoe lang mag een stage-cv zijn?",
      answer:
        "Voor de meeste beginnende stagiairs is één duidelijke pagina voldoende. Kies relevant bewijs boven een lange lijst.",
    },
    {
      question: "Moet ik mijn leerdoelen op het cv zetten?",
      answer:
        "Een korte leerdoelzin helpt wanneer de stage vooral op ontwikkeling is gericht. Koppel het doel aan een taak of tool uit de vacature.",
    },
    {
      question: "Kan ik gratis beginnen met mijn stage-cv?",
      answer:
        `Ja. Je begint gratis in de editor en betaalt pas eenmalig ${cvDownloadPrice.display} inclusief btw wanneer je de definitieve PDF downloadt. Er is geen abonnement.`,
    },
  ],
  relatedLinks: [
    {
      href: "/cv-maken-met-ai#example-text-student",
      label: "AI-hulp bij je eerste cv",
      description: "Bekijk een fictief schoolproject in een volledig cv. Gebruik alleen je eigen ervaring; op de AI-pagina zie je welke schrijfhulp beschikbaar is.",
    },
    {
      href: "/cv-gids/cv-zonder-ervaring-mbo",
      label: "CV zonder ervaring voor mbo",
      description: "Gebruik deze gids als school, praktijk en houding je belangrijkste bewijs zijn.",
    },
    {
      href: "/cv-gids/cv-bbl-opleiding",
      label: "CV voor een BBL-leerwerkplek",
      description: "Lees hoe je leren en werken, praktische ervaring en startdatum uitlegt.",
    },
    {
      href: "/cv-maken-student",
      label: "CV maken als student",
      description: "Een bredere route voor bijbaan, stage, traineeship of eerste baan.",
    },
    {
      href: "/cv-voorbeelden/studenten-en-starters/stage-cv",
      label: "Fictief stage-CV voorbeeld",
      description: "Bekijk een tweede stagevoorbeeld naast deze uitleg.",
    },
  ],
};

export const bblCvGuide: StudentCvGuideConfig = {
  path: "/cv-gids/cv-bbl-opleiding",
  title: "Een cv maken voor een BBL-leerwerkplek",
  metaTitle: "CV voor een BBL-opleiding: voorbeeld en tips | WerkCV",
  metaDescription:
    "Een cv maken voor een BBL-opleiding? Bekijk een volledig fictief voorbeeld, drie profielteksten, praktische tips en officiële bronnen over leren en werken.",
  intro:
    "Een BBL-cv moet twee dingen tegelijk duidelijk maken: welk vak je wilt leren en waarom een werkgever erop kan vertrouwen dat je het werk serieus aanpakt.",
  eyebrow: "BBL · leren en werken",
  audienceLabel: "Voor schoolverlaters, carrièreswitchers en werkenden die een BBL-leerwerkplek zoeken",
  startSource: "bbl_cv_opleiding",
  ctaHref: "/editor?template=professional&startSource=bbl_cv_opleiding",
  ctaLabel: "Maak mijn cv voor een BBL-leerwerkplek",
  updatedLabel: "Gepubliceerd en gecontroleerd op 13 september 2026",
  datePublished: updatedDate,
  dateModified: updatedDate,
  example: {
    name: "Ravi Meijer",
    target: "Sollicitant BBL Logistiek Medewerker · zoekt een leerwerkplek vanaf februari 2027",
    contact: [
      "ravi.meijer@example.test",
      "+31 6 0000 0000",
      "Nieuwegein · linkedin.com/in/ravi-meijer-voorbeeld",
    ],
    profile:
      "Praktisch ingestelde kandidaat die zich via een BBL-opleiding Logistiek Medewerker verder wil ontwikkelen. In mijn parttime werk in een fictief magazijn leerde ik orders zorgvuldig te controleren, veilig samen te werken en op tijd te communiceren wanneer een planning verandert. Ik zoek een erkend leerbedrijf waar ik werken en leren serieus kan combineren.",
    entries: [
      {
        label: "Gewenste opleiding",
        value: "BBL Logistiek Medewerker niveau 2 · start beoogd in februari 2027 · regio Utrecht",
        bullets: [
          "Wil leren over goederenontvangst, orderverwerking, voorraad en veilig werken.",
          "Beschikbaar voor vier dagen werken en een schooldag, afhankelijk van de afspraken met school en leerbedrijf.",
        ],
      },
      {
        label: "Parttime ervaring",
        value: "Magazijnmedewerker · Fictieve Distributie BV · Nieuwegein · 2025 – heden",
        bullets: [
          "Orders verzameld met een handscanner en aantallen gecontroleerd vóór verzending.",
          "Werkplek volgens veiligheidsinstructies gehouden en afwijkingen direct gemeld aan de teamleider.",
        ],
      },
      {
        label: "Opleiding",
        value: "Vmbo basis, profiel Economie & Ondernemen · 2021 – 2025",
        bullets: [
          "Praktijkopdrachten uitgevoerd rond voorraad, klantbestelling en eenvoudige planning.",
        ],
      },
      {
        label: "Praktische vaardigheden",
        value: "Orderpicken, voorraad tellen, handscanner (basis), veilig tillen en ploegoverdracht",
      },
      {
        label: "Beschikbaarheid",
        value: "Vanaf februari 2027, 32–36 uur per week. Bereikbaar met fiets en openbaar vervoer binnen regio Utrecht.",
      },
      {
        label: "Talen en certificaten",
        value: "Nederlands: moedertaal · Engels: basis · VCA-basis: gepland, nog niet behaald",
      },
    ],
    note:
      "Dit is een volledig fictief voorbeeld. Controleer bij een BBL-sollicitatie welke opleiding, startdatum, uren en certificaten werkelijk voor jou gelden.",
    annotations: [
      "De gewenste BBL-richting, startdatum en regio maken de leerwerkvraag concreet.",
      "De magazijnervaring laat zien wat Ravi al kan zonder te beweren dat hij de opleiding al heeft afgerond.",
      "Geplande certificaten zijn als gepland gemarkeerd en niet als behaalde kwalificatie gepresenteerd.",
    ],
  },
  profileExamples: [
    {
      label: "Schoolverlater",
      text: "Praktisch ingestelde schoolverlater die in een BBL-opleiding Elektrotechniek het vak in de praktijk wil leren. Ik werk nauwkeurig, volg veiligheidsinstructies en vraag door wanneer iets niet duidelijk is. Ik zoek een leerwerkplek waar ik stap voor stap zelfstandig installatiewerk kan leren.",
      why: "Er wordt geen ervaring verzonnen; leerhouding, veiligheid en het gewenste vak staan centraal.",
    },
    {
      label: "Carrièreswitcher",
      text: "Betrouwbare klantenservicemedewerker die via een BBL-opleiding Helpende Zorg & Welzijn wil overstappen naar de zorg. In mijn huidige werk heb ik geleerd om rustig te luisteren, zorgvuldig te rapporteren en afspraken na te komen. Ik wil die basis gebruiken om professioneel zorg en ondersteuning te leren bieden.",
      why: "Overdraagbare vaardigheden worden eerlijk verbonden aan de nieuwe richting.",
    },
    {
      label: "Relevante parttime ervaring",
      text: "Parttime magazijnmedewerker met ervaring in orderpicken, voorraad tellen en veilige overdracht. Ik wil via een BBL-opleiding Logistiek Medewerker meer leren over planning, goederenstromen en verantwoordelijkheid voor een volledige werkzone.",
      why: "De tekst benoemt bestaand praktisch bewijs en maakt duidelijk welke volgende vaardigheden de kandidaat wil leren.",
    },
  ],
  weakImproved: {
    weak: "Ik wil graag een BBL doen omdat ik hard kan werken.",
    improved:
      "In mijn magazijnbijbaan controleer ik orders met een handscanner en meld ik afwijkingen direct. Via BBL Logistiek Medewerker wil ik leren hoe voorraad en planning over een hele werkzone worden georganiseerd.",
    explanation:
      "De verbeterde versie gebruikt echt gedrag, een bestaande context en een concreet leerdoel.",
  },
  guidance: [
    {
      title: "Leg je gekozen richting en leerdoel uit",
      paragraphs: [
        "Zet de beoogde opleiding of het beroep duidelijk bovenaan. Een werkgever wil weten welk vak je wilt leren en waarom deze leerwerkplek daarbij past.",
        "Beschrijf leerdoelen als vaardigheden of werkzaamheden, niet als een belofte dat je al volledig zelfstandig bent.",
      ],
      bullets: [
        "Noem niveau, richting en beoogde startdatum wanneer die bekend zijn.",
        "Koppel je motivatie aan een activiteit, vak of eerdere ervaring.",
        "Schrijf je onderwijsstatus precies: oriënterend, aangemeld, toegelaten of nog niet definitief.",
      ],
    },
    {
      title: "Gebruik praktische ervaring en overdraagbare vaardigheden",
      paragraphs: [
        "Een BBL-werkgever kijkt vaak naar betrouwbaarheid, veilig werken, leren van feedback en omgaan met praktische taken. Dat bewijs kan uit een bijbaan, vrijwilligerswerk, sport, mantelzorg of eerdere sector komen.",
        "Maak duidelijk wat je werkelijk deed. Een eerdere baan in een andere sector is waardevol wanneer je de overdraagbare vaardigheid uitlegt.",
      ],
      bullets: [
        "Beschrijf één concreet voorbeeld van samenwerken, controleren of verantwoordelijkheid nemen.",
        "Noem een certificaat alleen als je het hebt behaald; zet geplande certificaten als ‘gepland’. ",
        "Gebruik geen ‘erkend leerbedrijf’ als feit over een werkgever zonder dit te controleren.",
      ],
    },
    {
      title: "Maak beschikbaarheid en afspraken controleerbaar",
      paragraphs: [
        "Zet startdatum, uren, regio en vervoer erbij als de vacature ernaar vraagt. De exacte verdeling tussen werken en school hangt af van opleiding en afspraken met school en leerbedrijf.",
        "Controleer ook of de organisatie de leerwerkplek en begeleiding biedt die jouw opleiding verlangt. WerkCV kan dat niet voor je vaststellen.",
      ],
      bullets: [
        "Schrijf ‘beoogde startdatum’ wanneer de datum nog niet definitief is.",
        "Geef regio of reistijd eerlijk weer.",
        "Vraag de school of het leerbedrijf naar de actuele praktijkovereenkomst en begeleiding.",
      ],
    },
  ],
  checklist: [
    "De BBL-richting, het niveau en de gewenste startdatum zijn duidelijk.",
    "Je legt uit waarom je leren en werken in dit vak wilt combineren.",
    "Minstens één praktische ervaring of overdraagbare vaardigheid is met bewijs beschreven.",
    "Beschikbaarheid, uren, regio en vervoer zijn gecontroleerd tegen de vacature.",
    "Onderwijsstatus en certificaten zijn precies en niet overdreven beschreven.",
    "Je controleert bij school of werkgever welke leerwerk- en begeleidingsafspraken gelden.",
    "Het cv belooft geen toelating of baan; het laat zien waarom een gesprek logisch is.",
  ],
  faqs: [
    {
      question: "Wat is een BBL-cv?",
      answer:
        "Het is een cv voor een leerwerkplek waarin je opleiding, gewenste richting, praktische ervaring, leerdoel en beschikbaarheid samen duidelijk maakt.",
    },
    {
      question: "Moet ik al een BBL-opleiding hebben gekozen?",
      answer:
        "Zet eerlijk neer of je je oriënteert, bent aangemeld of al bent toegelaten. Vermeld de richting en startdatum alleen zo definitief als die werkelijk zijn.",
    },
    {
      question: "Kan ervaring uit een andere sector op mijn BBL-cv?",
      answer:
        "Ja. Leg uit welke vaardigheid overdraagbaar is, bijvoorbeeld veilig werken, klantcontact, planning, nauwkeurigheid of verantwoordelijkheid.",
    },
    {
      question: "Hoeveel dagen werk je bij BBL?",
      answer:
        "Dat hangt af van de opleiding en afspraken. Rijksoverheid beschrijft dat BBL-studenten doorgaans drie of vier dagen bij een erkend leerbedrijf werken en de overige dagen onderwijs volgen; controleer jouw actuele regeling bij school en werkgever.",
    },
    {
      question: "Garandeert een goed BBL-cv een leerwerkplek?",
      answer:
        "Nee. Een cv helpt je ervaring en leerdoel duidelijk te presenteren, maar toelating, plaatsing en arbeidsvoorwaarden hangen af van school, werkgever en de beschikbare plek.",
    },
  ],
  relatedLinks: [
    {
      href: "/cv-maken-met-ai#example-text-student",
      label: "AI-hulp bij je eerste cv",
      description: "Bekijk een fictief schoolproject in een volledig cv. Gebruik alleen je eigen ervaring; op de AI-pagina zie je welke schrijfhulp beschikbaar is.",
    },
    {
      href: "/cv-gids/cv-zonder-ervaring-mbo",
      label: "CV zonder ervaring voor mbo",
      description: "Handig als schoolprojecten en houding je belangrijkste bewijs zijn.",
    },
    {
      href: "/stage-cv-maken",
      label: "Stage-cv maken",
      description: "Gebruik deze route als je een stage zoekt in plaats van een leerwerkplek.",
    },
    {
      href: "/cv-maken-student",
      label: "CV maken als student",
      description: "Een bredere basis voor eerste baan, stage en bijbaan.",
    },
    {
      href: "/cv-voorbeelden/studenten-en-starters/student-cv",
      label: "Student-CV voorbeeld",
      description: "Vergelijk structuur en formuleringen met een ander fictief starterprofiel.",
    },
  ],
  sources: [
    {
      label: "Rijksoverheid · stage en BBL in het mbo",
      href: "https://www.rijksoverheid.nl/vraag-en-antwoord/middelbaar-beroepsonderwijs/moet-ik-stage-lopen-als-ik-een-mbo-opleiding-volg",
      note: "Uitleg over de combinatie van werken en leren, praktijkovereenkomst, begeleiding en loon. Controleer de actuele afspraken voor jouw opleiding.",
    },
    {
      label: "Onderwijsinspectie · beroepspraktijkvorming",
      href: "https://www.onderwijsinspectie.nl/onderwijssectoren/middelbaar-beroepsonderwijs/beroepspraktijkvorming",
      note: "Achtergrond over de praktijkcomponent van het mbo en de verantwoordelijkheid van opleiding en leerbedrijf.",
    },
    {
      label: "SBB · zoeken naar een erkend leerbedrijf",
      href: "https://zoeken-mijn.s-bb.nl/",
      note: "Gebruik de actuele SBB-zoekomgeving om een erkend leerbedrijf en passende leerwerkplek te controleren.",
    },
  ],
};
