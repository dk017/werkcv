export type SalaryRoleCvProfile = {
  exampleCategory: string;
  exampleSlug: string;
  exampleFit: "exact" | "related";
  salaryDrivers: [string, string, string];
  cvEvidence: [string, string, string, string];
  positioningTip: string;
  marketSignal?: string;
  marketSignalSource?: "general" | "hbo-wo";
};

const profiles: Record<string, SalaryRoleCvProfile> = {
  tandarts: {
    exampleCategory: "zorg-en-welzijn",
    exampleSlug: "tandarts",
    exampleFit: "exact",
    salaryDrivers: [
      "Type praktijk, loondienstconstructie en de omvang van je patiëntenagenda",
      "Ervaring met complexe behandelingen, aandachtsgebieden en praktijkverantwoordelijkheid",
      "Registraties, bij- en nascholing en aantoonbare continuïteit van zorg",
    ],
    cvEvidence: [
      "BIG-registratie, relevante registratienummers en actuele nascholing",
      "Behandelgebieden, patiëntvolume en zelfstandigheid zonder vertrouwelijke patiëntdata",
      "Concrete kwaliteitsverbeteringen, preventieprogramma's of efficiëntere praktijkprocessen",
      "Samenwerking met mondhygiënisten, assistenten, verwijzers en andere zorgverleners",
    ],
    positioningTip:
      "Zet registratie en behandelgebieden bovenaan en bewijs daarna je praktijkniveau met zelfstandigheid, samenwerking en kwaliteitsbijdrage.",
    marketSignal: "UWV noemt artsen en andere zorgprofessionals in 2026 als zeer gewild.",
    marketSignalSource: "hbo-wo",
  },
  "software-ontwikkelaar": {
    exampleCategory: "technologie-en-ict",
    exampleSlug: "software-ontwikkelaar",
    exampleFit: "exact",
    salaryDrivers: [
      "Technische diepgang, stack, architectuurverantwoordelijkheid en productcomplexiteit",
      "Aantoonbare impact op performance, betrouwbaarheid, omzet of ontwikkelsnelheid",
      "Eigenaarschap over delivery, mentoring, security en samenwerking met stakeholders",
    ],
    cvEvidence: [
      "Tech stack per functie in plaats van één losse, lange vaardighedenlijst",
      "Meetbare productimpact, zoals latency, uptime, conversie of kortere releasecycli",
      "Schaal en context: gebruikers, requests, teamgrootte of omvang van het platform",
      "Links naar GitHub of portfolio alleen als die representatief en actueel zijn",
    ],
    positioningTip:
      "Positioneer jezelf niet alleen als gebruiker van een stack, maar als iemand die aantoonbaar een technisch of bedrijfsprobleem heeft opgelost.",
    marketSignal: "UWV meldt in 2026 een aanzienlijke vraag naar softwareontwikkelaars en andere ICT-specialisten.",
    marketSignalSource: "hbo-wo",
  },
  systeembeheerder: {
    exampleCategory: "technologie-en-ict",
    exampleSlug: "systeembeheerder",
    exampleFit: "exact",
    salaryDrivers: [
      "Omvang en complexiteit van de beheerde infrastructuur, cloudomgeving en gebruikersbasis",
      "Specialisatie in security, automation, networking, Microsoft 365, Azure of Linux",
      "Beschikbaarheid, incidentverantwoordelijkheid en aantoonbare verbetering van stabiliteit",
    ],
    cvEvidence: [
      "Omvang van de omgeving: endpoints, servers, locaties, tenants of gebruikers",
      "Meetbare resultaten rond uptime, incidentduur, patchgraad en ticketdoorlooptijd",
      "Concrete tools, platformen en certificeringen die in de vacature terugkomen",
      "Automatisering en migraties met het effect op risico, tijd of beheerkosten",
    ],
    positioningTip:
      "Maak de schaal van je beheer zichtbaar; ‘verantwoordelijk voor IT’ zegt veel minder dan platform, gebruikersaantal en aantoonbaar resultaat.",
    marketSignal: "UWV noemt systeembeheerders in 2026 expliciet bij de ICT-specialisten waar veel vraag naar is.",
    marketSignalSource: "hbo-wo",
  },
  accountant: {
    exampleCategory: "zakelijk-en-financieel",
    exampleSlug: "accountant",
    exampleFit: "exact",
    salaryDrivers: [
      "Titel en kwalificatie, vaktechnische diepgang en omvang van klant- of dossierverantwoordelijkheid",
      "Ervaring met controle, advies, consolidatie, fiscaliteit en complexe verslaggeving",
      "Leidinggeven, klantontwikkeling en digitalisering of data-analyse binnen finance",
    ],
    cvEvidence: [
      "AA/RA-traject, registraties en relevante verslaggevingsstandaarden",
      "Omvang en type dossiers, sectoren en verantwoordelijkheidsniveau",
      "Concrete verbeteringen in doorlooptijd, kwaliteit, risico of rapportage",
      "ERP-, audit- en data-analysetools gekoppeld aan het resultaat dat je ermee bereikte",
    ],
    positioningTip:
      "Verbind vaktechniek aan scope en adviesimpact; een lijst controlesystemen zonder dossiercontext onderbouwt je niveau onvoldoende.",
    marketSignal: "UWV ziet in 2026 volop kansen voor accountants, vooral met advies-, digitaliserings- en data-analysekennis.",
    marketSignalSource: "hbo-wo",
  },
  "hr-adviseur": {
    exampleCategory: "zakelijk-en-financieel",
    exampleSlug: "hr-medewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Adviesniveau, complexiteit van casuïstiek en aantal medewerkers of managers in scope",
      "Specialisatie in arbeidsrecht, verzuim, organisatieontwikkeling, recruitment of HR analytics",
      "Eigenaarschap over verandertrajecten en aantoonbare verbetering van HR-processen",
    ],
    cvEvidence: [
      "Scope in medewerkers, afdelingen, vacatures, verzuimcases of adviesrelaties",
      "Resultaten zoals kortere time-to-hire, lager verzuim of betere datakwaliteit",
      "HR-systemen en ATS-tools gekoppeld aan concrete processen",
      "Arbeidsrechtelijke en veranderkundige casuïstiek zonder vertrouwelijke details",
    ],
    positioningTip:
      "Laat het verschil zien tussen uitvoeren en adviseren: benoem wie je adviseerde, over welk vraagstuk en welk effect je advies had.",
  },
  "office-manager": {
    exampleCategory: "zakelijk-en-financieel",
    exampleSlug: "office-manager",
    exampleFit: "exact",
    salaryDrivers: [
      "Omvang van kantoor, locaties, budgetten en operationele verantwoordelijkheid",
      "Combinatie van facilities, planning, directieondersteuning, leveranciers en people operations",
      "Procesverbetering, projectcoördinatie en leidinggeven aan supportteams",
    ],
    cvEvidence: [
      "Scope in locaties, medewerkers, leveranciers, agenda's of budget",
      "Besparingen, snellere processen of hogere interne tevredenheid",
      "Voorbeelden van events, verhuizingen, implementaties of crisissituaties",
      "Tools voor planning, finance, HR en facilitaire processen",
    ],
    positioningTip:
      "Maak van ‘alles op kantoor regelen’ een bewijsbaar operations-profiel met scope, stakeholders en verbeterresultaten.",
  },
  "administratief-medewerker": {
    exampleCategory: "zakelijk-en-financieel",
    exampleSlug: "administratief-medewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Complexiteit en volume van de administratie en mate van zelfstandigheid",
      "Specialisatie in finance, orderverwerking, contracten, planning of klantadministratie",
      "Systeemkennis, foutreductie en verantwoordelijkheid voor controles of rapportages",
    ],
    cvEvidence: [
      "Volumes per week of maand, foutpercentages en doorlooptijden",
      "Exacte systemen zoals AFAS, Exact, SAP, Salesforce of branchesoftware",
      "Controles, rapportages en procesverbeteringen waarvoor je eigenaar was",
      "Contact met klanten, leveranciers en interne afdelingen in concrete context",
    ],
    positioningTip:
      "Vervang algemene taken door volume, nauwkeurigheid, systemen en procesresultaat; daarmee wordt je zelfstandigheidsniveau zichtbaar.",
  },
  salarisadministrateur: {
    exampleCategory: "zakelijk-en-financieel",
    exampleSlug: "administratief-medewerker",
    exampleFit: "related",
    salaryDrivers: [
      "Aantal loonstroken, cao's, entiteiten en complexiteit van mutaties",
      "Kennis van loonheffingen, pensioen, ziekte, internationale payroll en controles",
      "Eigenaarschap over afsluiting, audits, systeeminrichting en advies aan HR of finance",
    ],
    cvEvidence: [
      "Payrollscope in medewerkers, landen, cao's, entiteiten en verwerkingsfrequentie",
      "Nmbrs, AFAS, Loket, Youforce of andere software met je beheerniveau",
      "Foutreductie, tijdige afsluiting, auditbevindingen en procesautomatisering",
      "PDL/VPS, fiscale actualiteit en advisering over complexe mutaties",
    ],
    positioningTip:
      "Gebruik het administratieve voorbeeld als basis, maar herschrijf profiel en bullets volledig rond payrollscope, compliance en foutloze afsluiting.",
  },
  "klantenservice-medewerker": {
    exampleCategory: "horeca-en-detailhandel",
    exampleSlug: "klantenservice-medewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Complexiteit van klantvragen, kanaalmix, productkennis en escalatieverantwoordelijkheid",
      "Taalvaardigheid, commerciële verantwoordelijkheid en werken in gereguleerde omgevingen",
      "Coaching, kwaliteitsbewaking en aantoonbare service- of retentieresultaten",
    ],
    cvEvidence: [
      "Contactvolume en kanalen zoals telefoon, chat, e-mail en social",
      "KPI's zoals first-contact resolution, klanttevredenheid en gemiddelde afhandeltijd",
      "CRM-, ticketsystemen en kennisbanken die je daadwerkelijk gebruikte",
      "Voorbeelden van escalaties, retentie, upsell of kwaliteitsverbetering",
    ],
    positioningTip:
      "Een sterk service-CV bewijst kwaliteit met KPI's én context; snelheid alleen is niet overtuigend zonder oplossing of klantresultaat.",
  },
  jurist: {
    exampleCategory: "juridisch-en-overheid",
    exampleSlug: "juridisch-medewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Rechtsgebied, complexiteit en financieel of maatschappelijk belang van dossiers",
      "Zelfstandig adviesniveau, stakeholdercontact en verantwoordelijkheid voor besluitvorming",
      "Ervaring in gereguleerde sectoren, onderhandelingen, procedures of leidinggeven",
    ],
    cvEvidence: [
      "Rechtsgebieden en type dossiers met omvang, volume of risiconiveau",
      "Adviezen, contracten of procedures en het concrete zakelijke resultaat",
      "Juridische databases, compliancekaders en relevante specialisatieopleidingen",
      "Stakeholders die je adviseerde, zonder vertrouwelijke cliëntinformatie te delen",
    ],
    positioningTip:
      "Benoem niet alleen het rechtsgebied, maar welk besluit, risico of onderhandelingsresultaat jouw juridische werk mogelijk maakte.",
  },
  "docent-voortgezet-onderwijs": {
    exampleCategory: "onderwijs",
    exampleSlug: "docent-voortgezet-onderwijs",
    exampleFit: "exact",
    salaryDrivers: [
      "Bevoegdheid, inschaling, relevante ervaring en eventuele tekortvakken",
      "Mentoraat, curriculumontwikkeling, examenverantwoordelijkheid en extra schooltaken",
      "Coördinatie, begeleiding van collega's en aantoonbare onderwijsontwikkeling",
    ],
    cvEvidence: [
      "Eerste- of tweedegraads bevoegdheid, vakken, niveaus en leerjaren",
      "Lesomvang, mentoraat, examenklassen en aanvullende verantwoordelijkheden",
      "Onderwijsresultaten en verbeteringen zorgvuldig en zonder leerlingdata",
      "Digitale leermiddelen, didactische aanpak en professionalisering",
    ],
    positioningTip:
      "Zet bevoegdheid en vak direct bovenaan en bewijs daarna je functiezwaarte met klassen, taken en onderwijsontwikkeling.",
    marketSignal: "UWV meldt in 2026 tekorten in basis-, voortgezet en middelbaar beroepsonderwijs, vooral bij exacte vakken.",
    marketSignalSource: "hbo-wo",
  },
  "leerkracht-basisonderwijs": {
    exampleCategory: "onderwijs",
    exampleSlug: "basisschool-docent",
    exampleFit: "exact",
    salaryDrivers: [
      "Bevoegdheid, relevante ervaring, inschaling en zwaarte van aanvullende taken",
      "Expertise in intern begeleiden, zorgcoördinatie, taal/rekenen of onderwijsontwikkeling",
      "Bouwcoördinatie, projectverantwoordelijkheid en begeleiding van collega's",
    ],
    cvEvidence: [
      "PABO/bevoegdheid, groepen, bouwen en omvang van je leservaring",
      "Leerlingbegeleiding, differentiatie en oudercontact zonder privacygevoelige details",
      "Meetbare of observeerbare verbetering in onderwijsaanpak en teamprocessen",
      "Specialisaties, coördinatietaken en relevante professionalisering",
    ],
    positioningTip:
      "Onderbouw je niveau met meer dan lesjaren: laat specialismen, coördinatietaken en bijdrage aan schoolontwikkeling zien.",
    marketSignal: "UWV noemt in 2026 een tekort aan leraren in het basisonderwijs.",
    marketSignalSource: "hbo-wo",
  },
  "gespecialiseerd-verpleegkundige": {
    exampleCategory: "zorg-en-welzijn",
    exampleSlug: "verpleegkundige",
    exampleFit: "related",
    salaryDrivers: [
      "Erkende specialisatie, functieniveau, cao-inschaling en klinische verantwoordelijkheid",
      "Complexiteit van patiëntenzorg, acute situaties en zelfstandige besluitvorming",
      "Coördinatie, kwaliteitsprojecten, scholing en begeleiding van collega's",
    ],
    cvEvidence: [
      "BIG-registratie en exacte specialisatie, vervolgopleiding en geldige certificaten",
      "Afdeling, patiëntcategorie en klinische verantwoordelijkheid zonder patiëntdata",
      "Kwaliteitsverbeteringen, protocollen, scholing en multidisciplinaire samenwerking",
      "Relevante apparatuur, EPD-systemen en acute of specialistische vaardigheden",
    ],
    positioningTip:
      "Gebruik het verpleegkundige voorbeeld als basis, maar zet specialisatie, afdeling en klinische zelfstandigheid in titel, profiel en eerste bullets.",
    marketSignal: "UWV noemt verpleegkundigen en andere zorgprofessionals in 2026 zeer gewild.",
    marketSignalSource: "hbo-wo",
  },
  verpleegkundige: {
    exampleCategory: "zorg-en-welzijn",
    exampleSlug: "verpleegkundige",
    exampleFit: "exact",
    salaryDrivers: [
      "Diplomaniveau, BIG-registratie, cao-inschaling en relevante ervaringsjaren",
      "Afdeling, doelgroep, onregelmatige diensten en klinische verantwoordelijkheid",
      "Specialistische handelingen, coördinatie en bijdrage aan kwaliteit of scholing",
    ],
    cvEvidence: [
      "BIG-registratie, diploma, geldige certificaten en verpleegtechnische bevoegdheden",
      "Afdeling, doelgroep en mate van zelfstandigheid zonder patiëntinformatie",
      "Voorbeelden van coördinatie, kwaliteitszorg en multidisciplinair overleg",
      "EPD-ervaring, protocollen en relevante specialistische handelingen",
    ],
    positioningTip:
      "Laat direct zien waar je inzetbaar bent: registraties, afdeling, doelgroep en klinische vaardigheden horen boven generieke eigenschappen.",
    marketSignal: "UWV noemt verpleegkundigen in 2026 zeer gewild.",
    marketSignalSource: "hbo-wo",
  },
  verkoopmedewerker: {
    exampleCategory: "horeca-en-detailhandel",
    exampleSlug: "winkelmedewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Productcomplexiteit, commerciële verantwoordelijkheid en type winkel of klantsegment",
      "Ervaring met advies, targets, visual merchandising, voorraad en sleutelverantwoordelijkheid",
      "Coördinatie van collega's, opening/sluiting en aantoonbare omzet- of serviceresultaten",
    ],
    cvEvidence: [
      "Omzet-, conversie-, bon- of klanttevredenheidsresultaten met geloofwaardige context",
      "Productgroepen, kassasystemen, voorraadprocessen en winkelverantwoordelijkheid",
      "Voorbeelden van klantadvies, klachtenoplossing en aanvullende verkoop",
      "Beschikbaarheid, talen en flexibiliteit alleen waar relevant voor de vacature",
    ],
    positioningTip:
      "Verbind klantgerichtheid aan commercieel bewijs: benoem productadvies, winkelverantwoordelijkheid en een controleerbaar resultaat.",
  },
  vrachtwagenchauffeur: {
    exampleCategory: "vakmanschap-en-logistiek",
    exampleSlug: "chauffeur",
    exampleFit: "exact",
    salaryDrivers: [
      "Rijbewijscategorie, type transport, internationale inzet en specialistische lading",
      "Toeslagen, werktijden, overnachtingen en verantwoordelijkheid voor materieel of documenten",
      "Ervaring, veiligheidsprestaties en aanvullende certificaten zoals ADR of autolaadkraan",
    ],
    cvEvidence: [
      "Rijbewijzen, Code 95, bestuurderskaart en geldigheid van certificaten",
      "Type voertuig, routes, lading, landen en aflevervolume",
      "Veiligheidsrecord, schadevrij rijden, punctualiteit en brandstofbewust rijgedrag",
      "ADR, autolaadkraan, heftruck of andere vacature-relevante bevoegdheden",
    ],
    positioningTip:
      "Zet rijbewijzen en geldige certificaten bovenaan; bewijs daarna inzetbaarheid met transporttype, routes en veiligheidsresultaat.",
  },
  magazijnmedewerker: {
    exampleCategory: "vakmanschap-en-logistiek",
    exampleSlug: "magazijnmedewerker",
    exampleFit: "exact",
    salaryDrivers: [
      "Ploegendienst, toeslagen, certificaten en verantwoordelijkheid voor bijzondere goederen",
      "WMS-kennis, voorraadcontrole, inbound/outbound en zelfstandigheid",
      "Coördinatie, veiligheid en aantoonbare productiviteit of foutreductie",
    ],
    cvEvidence: [
      "Orders, picks, pallets of zendingen per dienst met nauwkeurigheid",
      "WMS, scanners, EPT, heftruck en geldige certificaten",
      "Inbound, outbound, voorraadcontrole en type goederen",
      "Veiligheidsverbeteringen, foutreductie en begeleiding van collega's",
    ],
    positioningTip:
      "Maak tempo én nauwkeurigheid zichtbaar en noem alleen materieel waarvoor je echt bevoegd en inzetbaar bent.",
  },
  elektricien: {
    exampleCategory: "vakmanschap-en-logistiek",
    exampleSlug: "elektricien",
    exampleFit: "exact",
    salaryDrivers: [
      "Werkgebied, storingscomplexiteit, zelfstandigheid en projectverantwoordelijkheid",
      "Bevoegdheden, inspectiekennis, industriële installaties en duurzame energiesystemen",
      "Storingsdienst, leidinggeven en aantoonbare veiligheid, kwaliteit en oplevering",
    ],
    cvEvidence: [
      "NEN-certificering, VCA en andere actuele bevoegdheden met geldigheid",
      "Type installaties, spanning, sectoren en mate van zelfstandigheid",
      "Storingen, projecten en opleveringen met tijd-, kwaliteits- of veiligheidsresultaat",
      "Meetapparatuur, tekeninglezen, PLC, laadinfra of zonnepanelen waar relevant",
    ],
    positioningTip:
      "Laat vakniveau zien via bevoegdheden, installatietype en zelfstandig opgelost werk—niet alleen via een lijst gereedschappen.",
    marketSignal: "UWV ziet in 2026 goede kansen in energie- en installatietechniek en vraag naar elektrotechnische professionals.",
    marketSignalSource: "general",
  },
};

export function getSalaryRoleCvProfile(slug: string): SalaryRoleCvProfile {
  const profile = profiles[slug];

  if (!profile) {
    throw new Error(`Salary role ${slug} is missing a CV conversion profile.`);
  }

  return profile;
}
