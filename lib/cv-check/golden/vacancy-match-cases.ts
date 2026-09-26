// Golden cases for the CV-to-vacancy match. All people, companies and vacancies are fictional.
// Each case pins one Dutch-convention judgement the checker must get right (spec §8.1).

export type ExpectedRequirement = {
  /** Case-insensitive substring that identifies the requirement in the model output. */
  match: string;
  status?: Array<"strong" | "partial" | "missing">;
  importance?: "essential" | "preferred";
};

export type VacancyMatchGoldenCase = {
  id: string;
  locale: "nl" | "en";
  cvText: string;
  vacancyText: string;
  expect: ExpectedRequirement[];
  /** Substrings that must not appear in any topFix title (case-insensitive). */
  forbiddenTopFix?: string[];
};

function dutchCv(overrides: { languages?: string; education?: string; skills?: string; extra?: string } = {}): string {
  return [
    "Sanne de Vries (fictief voorbeeld)",
    "Utrecht | sanne.voorbeeld@example.com | 06-12345678",
    "",
    "Profiel",
    "Klantgerichte medewerker klantenservice met 3 jaar ervaring in telefonisch en schriftelijk klantcontact.",
    "",
    "Werkervaring",
    "Medewerker klantenservice, Voorbeeld Energie BV, Utrecht (2023 - heden)",
    "- Beantwoordde gemiddeld 60 klantvragen per dag via telefoon, e-mail en chat",
    "- Verlaagde de afhandeltijd van klachten met 15% door een nieuw FAQ-overzicht",
    "- Werkte dagelijks in Salesforce",
    "Kassamedewerker, Voorbeeld Supermarkt, Utrecht (2021 - 2023)",
    "- Hielp klanten aan de kassa en de servicebalie",
    "",
    "Opleiding",
    overrides.education ?? "MBO 4 Commercieel medewerker, ROC Midden Nederland (2021)",
    "",
    "Vaardigheden",
    overrides.skills ?? "Klantcontact, Salesforce, Microsoft Office",
    "",
    "Talen",
    overrides.languages ?? "Nederlands (moedertaal), Engels (goed)",
    overrides.extra ?? "",
  ].join("\n");
}

const customerServiceVacancy = [
  "Medewerker Klantenservice (32-40 uur) - Voorbeeldbedrijf Verzekeringen, Amersfoort.",
  "Wat ga je doen? Je beantwoordt vragen van klanten via telefoon, chat en e-mail over hun polis en schadeclaims.",
  "Je registreert klantcontacten zorgvuldig in ons CRM-systeem en denkt mee over verbeteringen in onze processen.",
  "Wat vragen wij? Minimaal mbo 4 werk- en denkniveau. Minimaal 2 jaar ervaring in een klantenservicefunctie.",
  "Uitstekende beheersing van de Nederlandse taal in woord en geschrift.",
  "Ervaring met Salesforce of een vergelijkbaar CRM-systeem is een pre. Kennis van verzekeringen is een pre.",
  "Je bent flexibel inzetbaar, ook op zaterdag.",
].join("\n");

export const vacancyMatchGoldenCases: VacancyMatchGoldenCase[] = [
  {
    id: "moedertaal-meets-excellent-dutch",
    locale: "nl",
    cvText: dutchCv(),
    vacancyText: customerServiceVacancy,
    expect: [
      { match: "Nederlandse taal", status: ["strong"] },
      { match: "Salesforce", importance: "preferred", status: ["strong"] },
      { match: "verzekeringen", importance: "preferred" },
      { match: "mbo 4", status: ["strong"], importance: "essential" },
    ],
    forbiddenTopFix: ["zaterdag", "flexib", "Nederlandse taal"],
  },
  {
    id: "hbo-meets-mbo4-level",
    locale: "nl",
    cvText: dutchCv({ education: "HBO Communicatie, Hogeschool Utrecht (2020)" }),
    vacancyText: customerServiceVacancy,
    expect: [{ match: "mbo 4", status: ["strong"] }],
  },
  {
    id: "skill-listed-without-example-is-partial",
    locale: "nl",
    cvText: dutchCv({ skills: "Klantcontact, Salesforce, Microsoft Excel" }),
    vacancyText: [
      "Administratief medewerker (fictief) - Voorbeeld Groothandel, Nieuwegein.",
      "Je verwerkt orders en maakt wekelijkse rapportages voor het verkoopteam.",
      "Wat vragen wij? Minimaal mbo 4 werk- en denkniveau.",
      "Ervaring met Excel, waaronder draaitabellen, voor wekelijkse rapportages.",
      "Nauwkeurig en klantgericht. Goede beheersing van de Nederlandse taal.",
    ].join("\n"),
    expect: [{ match: "Excel", status: ["partial"] }],
  },
  {
    id: "missing-driving-licence-is-essential-missing",
    locale: "nl",
    cvText: dutchCv(),
    vacancyText: [
      "Buitendienstmedewerker klantenservice (fictief) - Voorbeeld Installatietechniek, Houten.",
      "Je bezoekt klanten thuis om storingen op te nemen en afspraken te plannen.",
      "Wat vragen wij? Je bent in het bezit van rijbewijs B.",
      "Minimaal 2 jaar ervaring in klantcontact. Uitstekende beheersing van de Nederlandse taal.",
    ].join("\n"),
    expect: [{ match: "rijbewijs", status: ["missing"], importance: "essential" }],
  },
  {
    id: "cefr-b1-vs-b2-is-partial",
    locale: "nl",
    cvText: dutchCv({ languages: "Engels (moedertaal), Nederlands (B1, NT2 staatsexamen programma I)" }),
    vacancyText: [
      "Klantenservicemedewerker internationale klanten (fictief) - Voorbeeld Logistiek, Tilburg.",
      "Je helpt Nederlandse en internationale klanten per telefoon en e-mail.",
      "Wat vragen wij? Nederlands op minimaal B2-niveau en Engels op C1-niveau.",
      "Minimaal 2 jaar ervaring in klantcontact.",
    ].join("\n"),
    expect: [
      { match: "Nederlands", status: ["partial"] },
      { match: "Engels", status: ["strong"] },
    ],
  },
  {
    id: "vog-present-is-strong",
    locale: "nl",
    cvText: dutchCv({ extra: "\nCertificaten\nVOG aanwezig (afgegeven maart 2026)" }),
    vacancyText: [
      "Receptiemedewerker zorglocatie (fictief) - Voorbeeld Zorggroep, Zeist.",
      "Je ontvangt bewoners, familie en bezoekers en beantwoordt telefoon en e-mail.",
      "Wat vragen wij? Je beschikt over een geldige VOG. Ervaring in klantcontact.",
      "Ervaring in de zorg is een pre.",
    ].join("\n"),
    expect: [
      { match: "VOG", status: ["strong"] },
      { match: "zorg", importance: "preferred" },
    ],
  },
  {
    id: "english-native-meets-fluent",
    locale: "en",
    cvText: [
      "Alex Morgan (fictional example)",
      "Amsterdam | alex.example@example.com | +31 6 12345678",
      "Profile",
      "Customer support specialist with 4 years of experience in B2B software support.",
      "Experience",
      "Customer Support Specialist, Example SaaS BV, Amsterdam (2022 - present)",
      "- Resolved 45 tickets per day in Zendesk with a 94% satisfaction score",
      "Education",
      "BA Communication, Example University (2020)",
      "Languages",
      "English (native), Dutch (A2)",
    ].join("\n"),
    vacancyText: [
      "Customer Support Specialist (fictional) - Example Fintech, Amsterdam.",
      "You help international business customers by email and chat.",
      "Requirements: fluent English, written and spoken. At least 3 years of customer support experience.",
      "Experience with Zendesk. Dutch is a plus.",
    ].join("\n"),
    expect: [
      { match: "English", status: ["strong"] },
      { match: "Dutch", importance: "preferred" },
      { match: "Zendesk", status: ["strong"] },
    ],
  },
];
