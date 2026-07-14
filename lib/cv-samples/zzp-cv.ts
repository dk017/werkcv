import type { CVData } from "@/lib/cv";

export const zzpCvSample: CVData = {
  personal: {
    name: "Sanne van Dijk",
    title: "Freelance projectmanager | Digitale implementaties",
    email: "sanne.vandijk@email.nl",
    phone: "06-12345678",
    location: "Utrecht",
    address: "",
    postalCode: "",
    summary:
      "Freelance projectmanager gespecialiseerd in digitale implementaties en procesverbetering bij middelgrote organisaties. Verbindt operatie, IT en leveranciers en stuurt opdrachten van intake tot overdracht. Beschikbaar vanaf september 2026 voor 24-32 uur per week, regio Midden-Nederland of hybride.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "B",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/sannevandijk",
    github: "",
    website: "sannevandijk.nl",
    photo: "",
  },
  experience: [
    {
      role: "Interim projectmanager digitale operatie",
      company: "Logistieke scale-up",
      location: "Utrecht",
      start: "januari 2025",
      end: "juni 2026",
      description:
        "Opdracht voor de selectie en invoering van een nieuw order- en fulfilmentproces in samenwerking met operations, IT en externe leveranciers.",
      highlights: [
        "Implementatie voor 85 gebruikers binnen afgesproken scope en planning opgeleverd",
        "Foutieve zendingen binnen vier maanden met 18% verminderd door proces- en datacontroles",
        "Besluitvormingsritme en risicolog opgezet voor opdrachtgever, leveranciers en key users",
      ],
    },
    {
      role: "Freelance projectleider procesverbetering",
      company: "Dienstverlener in de energiesector",
      location: "Amersfoort",
      start: "maart 2024",
      end: "december 2024",
      description:
        "Tijdelijke opdracht voor het verkorten van de klantdoorlooptijd en het verbeteren van overdrachten tussen service- en backofficeteams.",
      highlights: [
        "Doorlooptijd van klantverzoeken met 24% verkort na analyse en herontwerp van drie kernprocessen",
        "Nieuwe werkwijze getest met twee teams en daarna uitgerold naar 60 medewerkers",
        "Dashboard met wekelijkse kwaliteits- en capaciteitsindicatoren overgedragen aan lijnmanagement",
      ],
    },
    {
      role: "Projectmanager CRM-migratie",
      company: "Vertrouwelijke opdrachtgever | Zakelijke dienstverlening",
      location: "Amsterdam",
      start: "mei 2023",
      end: "februari 2024",
      description:
        "NDA-opdracht voor de migratie van klantdata, processen en rapportages naar een nieuw CRM-platform.",
      highlights: [
        "Migratie van ruim 40.000 klantrecords gecoördineerd met data-, sales- en complianceteams",
        "Acceptatiecriteria en controles ingevoerd waardoor kritieke dataproblemen voor livegang werden opgelost",
      ],
    },
  ],
  education: [
    {
      degree: "HBO Bedrijfskunde",
      school: "Hogeschool Utrecht",
      location: "Utrecht",
      start: "september 2010",
      end: "juli 2014",
      description: "Afstudeerrichting proces- en verandermanagement.",
    },
  ],
  skills: [
    { name: "Project- en programmasturing", level: 5 },
    { name: "Stakeholdermanagement", level: 5 },
    { name: "Procesverbetering", level: 5 },
    { name: "Leveranciersmanagement", level: 4 },
    { name: "Agile en hybride delivery", level: 4 },
    { name: "Risico- en besluitvorming", level: 5 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Vloeiend" },
  ],
  interests: ["Hardlopen", "Mentoring van startende ondernemers"],
  courses: [
    { name: "PRINCE2 Practitioner", institution: "PeopleCert", year: "2024" },
    { name: "Professional Scrum Master I", institution: "Scrum.org", year: "2022" },
  ],
  internships: [],
  awards: [],
};
