import type { CVExample } from "../../types";

export const tandarts: CVExample = {
  slug: "tandarts",
  categorySlug: "zorg-en-welzijn",
  name: "Tandarts",
  description:
    "CV voorbeeld voor tandartsen in loondienst of een nieuwe praktijk. Presenteer je BIG-registratie, behandelgebieden, patiëntenzorg en praktijkbijdrage zorgvuldig en concreet.",
  templateId: "formal",
  colorThemeId: "elegant-navy",

  metaTitle: "CV Voorbeeld Tandarts | BIG, Behandelingen & Praktijkervaring | WerkCV.nl",
  metaDesc:
    "Professioneel CV voorbeeld voor tandartsen. Met voorbeeldteksten voor BIG-registratie, behandelgebieden, patiëntenzorg, kwaliteit en praktijkervaring. Direct te gebruiken.",
  keywords: [
    "cv voorbeeld tandarts",
    "tandarts cv",
    "cv tandheelkunde",
    "cv tandarts maken",
    "solliciteren tandarts",
    "BIG registratie tandarts cv",
  ],
  heroTitle: "CV Voorbeeld Tandarts",
  heroText:
    "Een tandarts-CV moet snel vertrouwen geven én controleerbaar blijven. Dit voorbeeld laat zien hoe je BIG-registratie, behandelgebieden, patiëntcommunicatie, praktijkervaring en kwaliteitsbijdrage presenteert zonder vertrouwelijke patiëntinformatie te delen.",
  tips: [
    "Zet je BIG-registratie en actuele professionele status direct bij je contact- of profielgegevens",
    "Benoem behandelgebieden en zelfstandigheid, maar claim alleen handelingen waarvoor je aantoonbaar bekwaam bent",
    "Gebruik patiëntvolume alleen als context en deel nooit herleidbare patiëntinformatie",
    "Laat zien hoe je samenwerkt met assistenten, mondhygiënisten, verwijzers en andere zorgprofessionals",
    "Onderbouw kwaliteit met concrete procesverbeteringen, preventie, scholing of praktijkresultaten",
  ],
  relatedSlugs: ["zorg-en-welzijn/arts-anios", "zorg-en-welzijn/apotheekassistent"],

  sampleCV: {
    personal: {
      name: "Sophie de Vries",
      title: "Algemeen practicus tandarts",
      email: "sophie.devries@email.nl",
      phone: "06-12345678",
      location: "Utrecht",
      address: "Voorbeeldstraat 24",
      postalCode: "3512 AB",
      summary:
        "BIG-geregistreerd tandarts met 6 jaar ervaring in de algemene praktijk. Ervaren in restauratieve tandheelkunde, endodontische behandelingen, preventie en patiëntbegeleiding bij behandelspanning. Combineert zorgvuldige diagnostiek met heldere communicatie en werkt nauw samen met mondhygiënisten, assistenten en verwijzers aan veilige, doelmatige mondzorg.",
      birthDate: "12 mei 1991",
      birthPlace: "Amersfoort",
      nationality: "Nederlands",
      driversLicense: "B",
      gender: "",
      maritalStatus: "",
      linkedIn: "linkedin.com/in/sophiedevries-tandarts",
      github: "",
      website: "",
      photo: "",
    },
    experience: [
      {
        role: "Tandarts algemeen practicus",
        company: "Tandartspraktijk De Singel",
        location: "Utrecht",
        start: "januari 2022",
        end: "heden",
        description:
          "Algemene mondzorg binnen een groepspraktijk met tandartsen, mondhygiënisten, preventieassistenten en balieteam.",
        highlights: [
          "Zelfstandig behandelplannen opgesteld en uitgevoerd binnen restauratieve tandheelkunde, endodontologie en preventieve mondzorg",
          "Patiënten met behandelspanning begeleid met heldere uitleg, gefaseerde planning en vaste evaluatiemomenten",
          "Interne overdracht en verwijsafspraken gestandaardiseerd, waardoor behandelplannen consistenter werden vastgelegd",
          "Twee startende tandartsen begeleid bij praktijkprotocollen, dossiervoering en multidisciplinaire samenwerking",
        ],
      },
      {
        role: "Tandarts",
        company: "Mondzorgpraktijk Parkzicht",
        location: "Amersfoort",
        start: "september 2019",
        end: "december 2021",
        description: "Brede algemene tandheelkunde voor volwassenen en kinderen in een wijkgerichte praktijk.",
        highlights: [
          "Periodieke controles, diagnostiek en algemene tandheelkundige behandelingen zelfstandig uitgevoerd",
          "Preventietraject met mondhygiënist en preventieassistent opgezet voor patiënten met verhoogd cariësrisico",
          "Deelgenomen aan structurele complicatiebespreking en actualisatie van infectiepreventieprotocollen",
        ],
      },
    ],
    education: [
      {
        degree: "Master Tandheelkunde",
        school: "Academisch Centrum Tandheelkunde Amsterdam (ACTA)",
        location: "Amsterdam",
        start: "september 2013",
        end: "juli 2019",
        description:
          "Klinische opleiding met ervaring in diagnostiek, restauratieve tandheelkunde, endodontologie, parodontologie en patiëntcommunicatie.",
      },
    ],
    skills: [
      { name: "Restauratieve tandheelkunde", level: 5 },
      { name: "Endodontische behandelingen", level: 4 },
      { name: "Diagnostiek & behandelplanning", level: 5 },
      { name: "Patiëntcommunicatie", level: 5 },
      { name: "Preventieve mondzorg", level: 4 },
      { name: "Exquise Next Generation", level: 4 },
    ],
    languages: [
      { name: "Nederlands", level: "Moedertaal" },
      { name: "Engels", level: "Vloeiend" },
    ],
    interests: ["Wielrennen", "Koken", "Gezondheidscommunicatie"],
    courses: [
      { name: "Herregistratie en bij- en nascholing", institution: "Vervang door eigen aanbieder", year: "2026" },
      { name: "Omgaan met behandelspanning", institution: "Vervang door eigen aanbieder", year: "2024" },
    ],
    internships: [],
    awards: [],
  },
};
