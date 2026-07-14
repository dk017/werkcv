import type { CVData } from "@/lib/cv";
import { klantenserviceMedewerker } from "@/lib/cv-voorbeelden/examples/horeca-en-detailhandel/klantenservice-medewerker";

export const productmanagerCvSample: CVData = {
  personal: {
    name: "Sophie de Jong",
    title: "Productmanager SaaS",
    email: "sophie.dejong@email.nl",
    phone: "06-12345678",
    location: "Utrecht",
    address: "",
    postalCode: "",
    summary:
      "Productmanager met 6 jaar ervaring in B2B SaaS, discovery en datagedreven roadmapsturing. Verbindt klantinzichten, productdata en commerciële doelen tot heldere prioriteiten. Realiseerde aantoonbare groei in activatie en retentie door nauwe samenwerking met engineering, design, sales en customer success.",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "linkedin.com/in/sophiedejong",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Senior Productmanager",
      company: "Voorbeeld SaaS B.V.",
      location: "Utrecht",
      start: "januari 2022",
      end: "heden",
      description: "Verantwoordelijk voor discovery, roadmap en go-to-market van het onboarding- en activatiedomein.",
      highlights: [
        "Onboarding-funnel herontworpen op basis van interviews en productdata, waardoor activatie in 90 dagen met 23% steeg",
        "Roadmap geprioriteerd met impact/effort en kwartaal-OKR's, waardoor time-to-release met 28% daalde",
        "Pricing-experiment met sales en customer success uitgevoerd dat de upgrade-rate met 11% verhoogde",
      ],
    },
    {
      role: "Product Owner",
      company: "Voorbeeld Platform N.V.",
      location: "Amsterdam",
      start: "mei 2019",
      end: "december 2021",
      description: "Aansturing van een multidisciplinair team voor self-service en accountbeheer.",
      highlights: [
        "Klantfeedback uit supporttickets vertaald naar een backlog die het aantal herhaalvragen met 18% verlaagde",
        "Wekelijkse productreviews ingevoerd om stakeholders eerder bij beslissingen en trade-offs te betrekken",
      ],
    },
  ],
  education: [
    {
      degree: "MSc Business Information Management",
      school: "Erasmus Universiteit Rotterdam",
      location: "Rotterdam",
      start: "september 2016",
      end: "juli 2018",
      description: "Focus op digitale strategie, analytics en productinnovatie.",
    },
  ],
  skills: [
    { name: "Product discovery", level: 5 },
    { name: "Roadmapprioritering", level: 5 },
    { name: "Product analytics", level: 4 },
    { name: "Stakeholdermanagement", level: 5 },
    { name: "Go-to-market", level: 4 },
    { name: "Jira", level: 4 },
    { name: "Figma", level: 3 },
    { name: "SQL", level: 3 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Vloeiend" },
  ],
  internships: [],
  interests: ["Digitale producten", "Hardlopen", "Gedragspsychologie"],
  properties: ["Analytisch", "Besluitvaardig", "Samenwerkingsgericht"],
  courses: [
    { name: "Product Analytics", institution: "Reforge", year: "2023" },
    { name: "Professional Scrum Product Owner", institution: "Scrum.org", year: "2020" },
  ],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

export const callcenterCvSample: CVData = {
  ...klantenserviceMedewerker.sampleCV,
  personal: {
    ...klantenserviceMedewerker.sampleCV.personal,
    name: "Yassin El Amrani",
    title: "Callcenter Medewerker Inbound & Retentie",
    email: "yassin.elamrani@email.nl",
    phone: "06-87654321",
    location: "Den Haag",
    linkedIn: "linkedin.com/in/yassinelamrani",
    summary:
      "Callcenter medewerker met 4 jaar ervaring in inbound service, retentie en klachtbehandeling binnen KPI-gedreven teams. Combineert duidelijke gespreksvoering met snelle probleemanalyse en nauwkeurige CRM-registratie. Behaalde structureel een kwaliteitsscore boven 92% en verbeterde klantbehoud door gerichte bezwaarbehandeling.",
  },
  experience: [
    {
      role: "Callcenter Medewerker Retentie",
      company: "Voorbeeld Telecom B.V.",
      location: "Den Haag",
      start: "maart 2022",
      end: "heden",
      description: "Inbound klantcontact over contracten, opzeggingen, facturen en behoudsvoorstellen.",
      highlights: [
        "Gemiddelde gesprekstijd met 14% verlaagd door een betere gespreksopening en snellere probleemdiagnose",
        "Gemiddeld 76% klantbehoud gerealiseerd door gerichte bezwaarbehandeling en passende voorstellen",
        "Kwaliteitsscore boven 92% gehouden tijdens piekperioden met verhoogd belvolume",
        "Nieuwe medewerkers gecoacht op gesprekstructuur, compliance en correcte CRM-notities",
      ],
    },
    {
      role: "Inbound Klantenservice Medewerker",
      company: "Voorbeeld Service N.V.",
      location: "Rotterdam",
      start: "januari 2020",
      end: "februari 2022",
      description: "Telefonische eerstelijnsondersteuning en registratie van vragen en klachten.",
      highlights: [
        "First-contact resolution verhoogd door kennisbankartikelen actief tijdens gesprekken te gebruiken",
        "Escalaties zorgvuldig vastgelegd en met duidelijke vervolgstappen overgedragen aan tweedelijnssupport",
      ],
    },
  ],
  skills: [
    { name: "Inbound klantcontact", level: 5 },
    { name: "Retentie en bezwaarbehandeling", level: 5 },
    { name: "Gesprekskwaliteit", level: 5 },
    { name: "CRM-registratie", level: 4 },
    { name: "AHT en FCR", level: 4 },
    { name: "De-escalatie", level: 4 },
    { name: "Salesforce", level: 4 },
  ],
  courses: [
    { name: "Effectieve bezwaarbehandeling", institution: "Voorbeeld Opleidingen", year: "2023" },
    { name: "Privacy en klantcontact", institution: "Interne Academy", year: "2022" },
  ],
  awards: ["Hoogste kwaliteitsscore van het retentieteam, Q3 2024"],
};

export const klantenserviceCvSample = klantenserviceMedewerker.sampleCV;
