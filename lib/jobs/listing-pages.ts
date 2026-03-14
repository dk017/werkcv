import type { JobListingPageSeed } from "./types";

// These are the first curated listing pages for the jobs MVP.
// The jobs table drives membership; we only publish a page when the filter
// meets the minimum job + company thresholds below.
export const jobsListingPageSeeds: JobListingPageSeed[] = [
  {
    slug: "engelstalige-vacatures-nederland",
    path: "/vacatures/engelstalige-vacatures-nederland",
    locale: "nl",
    kind: "english_speaking_nl",
    title: "Engelstalige vacatures in Nederland",
    heroTitle: "Engelstalige vacatures in Nederland",
    description:
      "Gecurateerde vacatures in Nederland voor kandidaten die in het Engels solliciteren of in een internationaal team werken.",
    metaTitle: "Engelstalige vacatures in Nederland | WerkCV",
    metaDesc:
      "Bekijk Engelstalige vacatures in Nederland en verbeter direct je cv voor internationale werkgevers met WerkCV.",
    introText:
      "Deze pagina bundelt vacatures in Nederland waar Engels duidelijk mogelijk is. Elke vacature hoort een cv-actie te hebben: pas je cv aan op keywords, controleer ATS-geschiktheid en gebruik een format dat past bij de Nederlandse markt.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      languageHints: ["english", "mixed"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/en/dutch-cv-template",
    primaryCtaLabel: "Build a Dutch CV in English",
    relatedGuideHref: "/cv-maken-in-engels",
  },
  {
    slug: "vacatures-voor-engelstaligen",
    path: "/vacatures/vacatures-voor-engelstaligen",
    locale: "nl",
    kind: "english_speaking_nl",
    title: "Vacatures voor Engelstaligen",
    heroTitle: "Vacatures voor Engelstaligen",
    description:
      "Praktische vacature-overzichten voor Engelstalige kandidaten die in Nederland willen werken zonder volledig Nederlandstalige functie-eisen.",
    metaTitle: "Vacatures voor Engelstaligen | WerkCV",
    metaDesc:
      "Vind vacatures voor Engelstaligen in Nederland en stem je cv af op internationale teams en ATS-systemen.",
    introText:
      "Niet elke baan in Nederland vraagt vloeiend Nederlands. Deze route focust op functies waar Engels expliciet bruikbaar is en koppelt elke vacature aan concrete cv-hulp.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/engels-cv-template",
    primaryCtaLabel: "Start with an English CV template",
    relatedGuideHref: "/gids/cv-voor-engelstalige-vacatures",
  },
  {
    slug: "banen-zonder-nederlandse-taal",
    path: "/vacatures/banen-zonder-nederlandse-taal",
    locale: "nl",
    kind: "without_dutch",
    title: "Banen zonder Nederlandse taal",
    heroTitle: "Banen zonder Nederlandse taal",
    description:
      "Vacatures in Nederland waarbij Nederlands niet duidelijk verplicht is of waar een internationaal team wordt genoemd.",
    metaTitle: "Banen zonder Nederlandse taal | WerkCV",
    metaDesc:
      "Zoek banen in Nederland waarvoor Nederlands niet duidelijk verplicht is en maak een cv dat past bij internationale werkgevers.",
    introText:
      "Deze pagina is strenger dan de brede Engelse cluster: hij focust op vacatures waar Nederlands niet als harde eis naar voren komt. Dat maakt de pagina nuttiger voor internationals en sterker voor SEO.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isWithoutDutch: true,
    },
    minJobCount: 10,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your CV for ATS issues",
    relatedGuideHref: "/gids/werken-in-nederland-zonder-nederlands",
  },
  {
    slug: "english-speaking-jobs-netherlands",
    path: "/jobs/english-speaking-jobs-netherlands",
    locale: "en",
    kind: "english_speaking_nl",
    title: "English-Speaking Jobs in the Netherlands",
    heroTitle: "English-Speaking Jobs in the Netherlands",
    description:
      "Curated Netherlands job listings for international candidates applying in English or joining international teams.",
    metaTitle: "English-Speaking Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking jobs in the Netherlands and tailor your CV for Dutch employers with WerkCV.",
    introText:
      "This route is for international candidates who need real job pages plus immediate CV help. The page should only stay live when there is enough density across multiple employers.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      languageHints: ["english", "mixed"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/en/dutch-cv-template",
    primaryCtaLabel: "Build a Dutch CV in English",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "jobs-in-netherlands-without-dutch",
    path: "/jobs/jobs-in-netherlands-without-dutch",
    locale: "en",
    kind: "without_dutch",
    title: "Jobs in the Netherlands Without Dutch",
    heroTitle: "Jobs in the Netherlands Without Dutch",
    description:
      "Curated jobs in the Netherlands for candidates targeting roles where Dutch is not clearly required.",
    metaTitle: "Jobs in the Netherlands Without Dutch | WerkCV",
    metaDesc:
      "Find jobs in the Netherlands where Dutch is not clearly required and get CV help tailored to international applications.",
    introText:
      "This page is narrower than the general English-speaking cluster. It should stay indexable only while the dataset clearly supports the promise.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isWithoutDutch: true,
    },
    minJobCount: 10,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your CV for ATS issues",
    relatedGuideHref: "/cv-maken-in-engels",
  },
  {
    slug: "visa-sponsorship-jobs-netherlands",
    path: "/jobs/visa-sponsorship-jobs-netherlands",
    locale: "en",
    kind: "visa_sponsorship",
    title: "Visa Sponsorship Jobs in the Netherlands",
    heroTitle: "Visa Sponsorship Jobs in the Netherlands",
    description:
      "Netherlands roles where visa support or international relocation signals are visible in the source job data.",
    metaTitle: "Visa Sponsorship Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse visa sponsorship jobs in the Netherlands and adapt your CV for international applications with WerkCV.",
    introText:
      "This route should be strict. We only keep jobs here when the source copy contains strong visa or relocation signals, otherwise the page becomes misleading.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      visaHint: true,
    },
    minJobCount: 8,
    minCompanyCount: 4,
    primaryCtaHref: "/en/dutch-cv-template",
    primaryCtaLabel: "Build a Dutch CV in English",
    relatedGuideHref: "/tools/zoekjaar-checker",
  },
  {
    slug: "engelstalige-vacatures-amsterdam",
    path: "/vacatures/engelstalige-vacatures-amsterdam",
    locale: "nl",
    kind: "english_speaking_city",
    title: "Engelstalige vacatures in Amsterdam",
    heroTitle: "Engelstalige vacatures in Amsterdam",
    description:
      "Geselecteerde Engelstalige vacatures in Amsterdam voor internationals en kandidaten die in het Engels solliciteren.",
    metaTitle: "Engelstalige vacatures in Amsterdam | WerkCV",
    metaDesc:
      "Bekijk Engelstalige vacatures in Amsterdam en pas je cv direct aan voor internationale werkgevers met WerkCV.",
    introText:
      "Amsterdam heeft genoeg internationale werkgevers om een aparte Engelstalige vacaturepagina te verdienen. Deze route blijft alleen live zolang de dataset breed genoeg blijft over meerdere bedrijven.",
    filters: {
      countryCode: "NL",
      citySlug: "amsterdam",
      isNlRelevant: true,
      isEnglishFriendly: true,
      languageHints: ["english", "mixed"],
    },
    minJobCount: 25,
    minCompanyCount: 8,
    primaryCtaHref: "/engels-cv-template",
    primaryCtaLabel: "Start with an English CV template",
    relatedGuideHref: "/cv-maken-in-engels",
  },
  {
    slug: "english-speaking-jobs-amsterdam",
    path: "/jobs/english-speaking-jobs-amsterdam",
    locale: "en",
    kind: "english_speaking_city",
    title: "English-Speaking Jobs in Amsterdam",
    heroTitle: "English-Speaking Jobs in Amsterdam",
    description:
      "Curated English-speaking jobs in Amsterdam for international candidates applying in the Dutch market.",
    metaTitle: "English-Speaking Jobs in Amsterdam | WerkCV",
    metaDesc:
      "Browse English-speaking jobs in Amsterdam and tailor your CV for international employers with WerkCV.",
    introText:
      "Amsterdam is dense enough to support its own English-speaking jobs page. We keep this route indexable only while the data stays broad across multiple employers.",
    filters: {
      countryCode: "NL",
      citySlug: "amsterdam",
      isNlRelevant: true,
      isEnglishFriendly: true,
      languageHints: ["english", "mixed"],
    },
    minJobCount: 25,
    minCompanyCount: 8,
    primaryCtaHref: "/en/dutch-cv-template",
    primaryCtaLabel: "Build a Dutch CV in English",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "starter-jobs-netherlands",
    path: "/jobs/starter-jobs-netherlands",
    locale: "en",
    kind: "starter_nl",
    title: "Starter Jobs in the Netherlands",
    heroTitle: "Starter Jobs in the Netherlands",
    description:
      "Entry-level, graduate, and internship jobs in the Netherlands for candidates who need a clear first step into the Dutch market.",
    metaTitle: "Starter Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse starter jobs in the Netherlands and tailor your CV for graduate, junior, and internship roles with WerkCV.",
    introText:
      "This route is for early-career candidates: internships, graduate roles, and junior jobs where an English CV can still be realistic. We keep it live only while the dataset stays broad across multiple employers.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      seniorities: ["internship", "graduate", "junior"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/en/dutch-cv-template",
    primaryCtaLabel: "Build a starter CV for the Netherlands",
    relatedGuideHref: "/gratis-cv-template",
  },
  {
    slug: "english-speaking-sales-jobs-netherlands",
    path: "/jobs/english-speaking-sales-jobs-netherlands",
    locale: "en",
    kind: "role_family_nl",
    title: "English-Speaking Sales Jobs in the Netherlands",
    heroTitle: "English-Speaking Sales Jobs in the Netherlands",
    description:
      "Sales and business development roles in the Netherlands for candidates applying in English or joining international commercial teams.",
    metaTitle: "English-Speaking Sales Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking sales jobs in the Netherlands and tailor your CV for account executive, SDR, and business development roles.",
    introText:
      "This category stays focused on commercial roles where English is clearly workable. That makes the page more useful than a generic jobs list and closer to the actual CV changes sales candidates need.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      roleFamilies: ["sales"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your sales CV for ATS issues",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "english-speaking-marketing-jobs-netherlands",
    path: "/jobs/english-speaking-marketing-jobs-netherlands",
    locale: "en",
    kind: "role_family_nl",
    title: "English-Speaking Marketing Jobs in the Netherlands",
    heroTitle: "English-Speaking Marketing Jobs in the Netherlands",
    description:
      "Marketing and growth roles in the Netherlands for candidates applying in English or joining international teams.",
    metaTitle: "English-Speaking Marketing Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking marketing jobs in the Netherlands and adapt your CV for growth, content, and brand roles.",
    introText:
      "We only publish this page when there is enough breadth across multiple employers. Until then, the route stays dark instead of pretending we have a full marketing jobs vertical.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      roleFamilies: ["marketing"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your marketing CV for ATS issues",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "english-speaking-finance-jobs-netherlands",
    path: "/jobs/english-speaking-finance-jobs-netherlands",
    locale: "en",
    kind: "role_family_nl",
    title: "English-Speaking Finance Jobs in the Netherlands",
    heroTitle: "English-Speaking Finance Jobs in the Netherlands",
    description:
      "Finance and accounting roles in the Netherlands for candidates applying in English or joining international employers.",
    metaTitle: "English-Speaking Finance Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking finance jobs in the Netherlands and tailor your CV for accounting, controllership, and FP&A roles.",
    introText:
      "Finance is a priority category for WerkCV, but we only keep this page live when the job mix is strong enough across multiple companies.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      roleFamilies: ["finance_accounting"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your finance CV for ATS issues",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "english-speaking-customer-support-jobs-netherlands",
    path: "/jobs/english-speaking-customer-support-jobs-netherlands",
    locale: "en",
    kind: "role_family_nl",
    title: "English-Speaking Customer Support Jobs in the Netherlands",
    heroTitle: "English-Speaking Customer Support Jobs in the Netherlands",
    description:
      "Customer support and service roles in the Netherlands for candidates working in English-first or mixed-language teams.",
    metaTitle: "English-Speaking Customer Support Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking customer support jobs in the Netherlands and tailor your CV for service and support roles.",
    introText:
      "Support roles can convert well for WerkCV, but only if we have enough real jobs from different employers. Until then, this stays below threshold.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      roleFamilies: ["customer_support"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your support CV for ATS issues",
    relatedGuideHref: "/en/dutch-cv-template",
  },
  {
    slug: "english-speaking-operations-jobs-netherlands",
    path: "/jobs/english-speaking-operations-jobs-netherlands",
    locale: "en",
    kind: "role_family_nl",
    title: "English-Speaking Operations Jobs in the Netherlands",
    heroTitle: "English-Speaking Operations Jobs in the Netherlands",
    description:
      "Operations roles in the Netherlands for candidates applying in English across international or mixed-language employers.",
    metaTitle: "English-Speaking Operations Jobs in the Netherlands | WerkCV",
    metaDesc:
      "Browse English-speaking operations jobs in the Netherlands and tailor your CV for project, business, and process roles.",
    introText:
      "Operations is a good long-term category for WerkCV, but this page should remain hidden until the source mix is broad enough to justify it.",
    filters: {
      countryCode: "NL",
      isNlRelevant: true,
      isEnglishFriendly: true,
      roleFamilies: ["operations"],
    },
    minJobCount: 15,
    minCompanyCount: 5,
    primaryCtaHref: "/tools/ats-cv-checker",
    primaryCtaLabel: "Check your operations CV for ATS issues",
    relatedGuideHref: "/en/dutch-cv-template",
  }
];
