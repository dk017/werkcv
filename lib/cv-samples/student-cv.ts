import type { CVData } from "@/lib/cv";

// Fictional hbo student looking for a bijbaan next to their studies; no real employers named.
export const studentCvSample: CVData = {
  personal: {
    name: "Daan Bakker",
    title: "Student Commerciële Economie | Bijbaan avond en weekend",
    email: "daan.bakker@email.nl",
    phone: "06-23456789",
    location: "Rotterdam",
    address: "",
    postalCode: "",
    summary:
      "Tweedejaars student Commerciële Economie met twee jaar ervaring aan de kassa en in de bediening. Beschikbaar voor 12 tot 16 uur per week: dinsdag- en donderdagavond en zaterdag, en fulltime in juli en augustus. Werkt rustig door als het druk is en heeft in twee jaar geen dienst gemist.",
    birthDate: "12 mei 2006",
    birthPlace: "",
    nationality: "",
    driversLicense: "",
    gender: "",
    maritalStatus: "",
    linkedIn: "",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Medewerker bediening",
      company: "Lunchcafé, centrum Rotterdam",
      location: "Rotterdam",
      start: "april 2025",
      end: "heden",
      description: "Avond- en weekenddiensten, 10 tot 14 uur per week.",
      highlights: [
        "Tafels bediend in een zaak met 60 plaatsen, ook op drukke zomerweekenden",
        "Na zes maanden zelfstandig sluitdiensten gedraaid, inclusief kassa opmaken",
        "Twee nieuwe collega's ingewerkt",
      ],
    },
    {
      role: "Kassamedewerker",
      company: "Supermarkt",
      location: "Capelle aan den IJssel",
      start: "september 2023",
      end: "maart 2025",
      description: "Koopavonden en zaterdagen naast de havo.",
      highlights: [
        "Kassa en zelfscankassa's bediend en klanten geholpen met retouren",
        "Ingezet bij de jaarlijkse inventarisatie en het vullen van de versafdeling",
      ],
    },
    {
      role: "Penningmeester (vrijwillig)",
      company: "Studievereniging",
      location: "Rotterdam",
      start: "september 2025",
      end: "heden",
      description: "Bestuursfunctie naast de studie.",
      highlights: ["Begroting van €8.000 bijgehouden in Excel en elk kwartaal verantwoord aan de leden"],
    },
  ],
  education: [
    {
      degree: "HBO Commerciële Economie",
      school: "Hogeschool",
      location: "Rotterdam",
      start: "september 2024",
      end: "heden (verwacht afgerond: juli 2028)",
      description: "Propedeuse behaald in één jaar. Project: marktonderzoek voor een lokale fietsenwinkel, in een team van vijf.",
    },
    {
      degree: "Havo, profiel Economie en Maatschappij",
      school: "Middelbare school",
      location: "Capelle aan den IJssel",
      start: "september 2019",
      end: "juli 2024",
      description: "Diploma behaald.",
    },
  ],
  skills: [
    { name: "Klantcontact", level: 4 },
    { name: "Kassa en pinbetalingen", level: 4 },
    { name: "Werken onder tijdsdruk", level: 4 },
    { name: "Excel", level: 3 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Goed" },
  ],
  interests: ["Hardlopen", "Koken"],
  courses: [{ name: "EHBO", institution: "Het Oranje Kruis", year: "2025" }],
  internships: [],
  awards: [],
};
