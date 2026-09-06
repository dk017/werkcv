import type { CVData } from "@/lib/cv";

/**
 * One deterministic, fictional MatchPack example shared by public demos and
 * the worked-example page. Keep all displayed source snippets here so a page
 * cannot silently drift from the example used by the interactive demo.
 */
export type FictionalEvidenceStatus = "supported" | "partially_supported" | "confirmation_required" | "unsupported";

export type FictionalEvidence = {
  id: string;
  requirement: string;
  status: FictionalEvidenceStatus;
  sourceSection: string;
  sourceLocation: string;
  sourceSnippet?: string;
  explanation: string;
  nextAction: string;
};

export const agencyFictionalExample = {
  notice: "Volledig fictief voorbeeld — alle namen, organisaties, vacaturegegevens en CV-inhoud zijn verzonnen.",
  candidate: {
    name: "Nina de Vries",
    role: "Senior HR-adviseur",
    location: "Utrecht / hybride",
    hours: "32–36 uur",
  },
  vacancy: {
    title: "Senior HR-adviseur",
    organisation: "Stadshaven Zorggroep",
    context: "Fictieve zorgorganisatie met circa 1.200 medewerkers in de regio Utrecht.",
    requirementSummary: "Zelfstandig leidinggevenden adviseren, complexe verzuimdossiers begeleiden en HR-rapportages verbeteren.",
  },
  sourceSections: [
    {
      id: "profile",
      label: "Profiel",
      location: "CV · sectie Profiel",
      snippet: "Senior HR-adviseur met zeven jaar ervaring in verzuimbegeleiding, organisatieverandering en HR-advies.",
    },
    {
      id: "experience",
      label: "Werkervaring",
      location: "CV · sectie Werkervaring · HR-adviseur",
      snippet: "Adviseerde 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.",
    },
    {
      id: "systems",
      label: "Systemen",
      location: "CV · sectie Vaardigheden",
      snippet: "HR-systemen: personeelsadministratie, verzuimregistratie en rapportage.",
    },
    {
      id: "education",
      label: "Opleiding",
      location: "CV · sectie Opleiding",
      snippet: "Bachelor Human Resource Management, Hogeschool Middenland.",
    },
  ],
  evidence: [
    {
      id: "education",
      requirement: "Afgeronde hbo-opleiding HRM",
      status: "supported" as const,
      sourceSection: "Opleiding",
      sourceLocation: "CV · sectie Opleiding",
      sourceSnippet: "Bachelor Human Resource Management, Hogeschool Middenland.",
      explanation: "De opleiding wordt concreet genoemd in de bron.",
      nextAction: "Behouden",
    },
    {
      id: "seniority",
      requirement: "Minimaal vijf jaar als zelfstandig HR-adviseur",
      status: "supported" as const,
      sourceSection: "Profiel",
      sourceLocation: "CV · sectie Profiel",
      sourceSnippet: "Senior HR-adviseur met zeven jaar ervaring in verzuimbegeleiding, organisatieverandering en HR-advies.",
      explanation: "De bron noemt zeven jaar ervaring en de relevante adviescontext.",
      nextAction: "Behouden; recruiter controleert de werkperiodes",
    },
    {
      id: "team-leaders",
      requirement: "Advies aan ten minste twintig leidinggevenden",
      status: "supported" as const,
      sourceSection: "Werkervaring",
      sourceLocation: "CV · sectie Werkervaring · HR-adviseur",
      sourceSnippet: "Adviseerde 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden.",
      explanation: "De bron bevat de numerieke scope en doelgroep.",
      nextAction: "Behouden",
    },
    {
      id: "absence",
      requirement: "Ervaring met complexe verzuimdossiers",
      status: "partially_supported" as const,
      sourceSection: "Profiel",
      sourceLocation: "CV · sectie Profiel",
      sourceSnippet: "Senior HR-adviseur met zeven jaar ervaring in verzuimbegeleiding, organisatieverandering en HR-advies.",
      explanation: "Verzuimbegeleiding staat in de bron, maar complexiteit en de Wet verbetering poortwachter worden niet expliciet genoemd.",
      nextAction: "Handmatig beoordelen; vraag naar de specifieke wettelijke/proceservaring",
    },
    {
      id: "afas",
      requirement: "Zelfstandig AFAS-workflows configureren",
      status: "unsupported" as const,
      sourceSection: "Systemen",
      sourceLocation: "CV · sectie Vaardigheden",
      sourceSnippet: "HR-systemen: personeelsadministratie, verzuimregistratie en rapportage.",
      explanation: "De bron noemt algemene HR-systemen, niet AFAS of workflowconfiguratie.",
      nextAction: "Claim verwijderen of kandidaat navragen; niet als CV-bewijs tonen",
    },
    {
      id: "availability",
      requirement: "Beschikbaar vanaf 1 oktober",
      status: "confirmation_required" as const,
      sourceSection: "Praktische gegevens",
      sourceLocation: "Niet aanwezig in het CV",
      explanation: "Beschikbaarheid is veranderlijk en komt niet uit de bron-CV.",
      nextAction: "Kandidaat navragen en de bevestigde waarde apart labelen",
    },
    {
      id: "power-bi",
      requirement: "HR-dashboards bouwen in Power BI",
      status: "unsupported" as const,
      sourceSection: "Systemen",
      sourceLocation: "CV · sectie Vaardigheden",
      sourceSnippet: "HR-systemen: personeelsadministratie, verzuimregistratie en rapportage.",
      explanation: "Rapportage is present, but Power BI is not named and a dashboard-building responsibility is not supported.",
      nextAction: "Specifieke claim verwijderen of handmatig beoordelen",
    },
  ] satisfies FictionalEvidence[],
  recruiterIntroduction: "Nina heeft zeven jaar HR-ervaring en adviseerde volgens haar CV 24 teamleiders over verzuim en medewerkerontwikkeling. Haar ervaring met AFAS, Power BI en haar exacte startdatum worden nog bevestigd.",
  clientEmail: {
    subject: "Kandidaatvoorstel Senior HR-adviseur — Nina de Vries",
    body: "Beste opdrachtgever,\n\nGraag stel ik Nina de Vries voor voor de rol Senior HR-adviseur. Zij heeft zeven jaar relevante HR-ervaring en adviseerde volgens haar CV 24 teamleiders over verzuim en medewerkerontwikkeling.\n\nHet gecontroleerde kandidaatvoorstel vind je in de bijlage. Haar exacte startdatum en specifieke systeemervaring worden nog bevestigd.\n\nMet vriendelijke groet,",
  },
  outputNote: "De volledige en contact-reduced versie horen uit dezelfde goedgekeurde snapshot te komen. Contactgegevens verwijderen is geen garantie op juridische anonimiteit.",
} as const;

/**
 * The document projection used when we generate the downloadable sample
 * outputs. It deliberately contains the same names, role, education and
 * source wording as the public fixture above; there must not be a second
 * fictional candidate hidden in an asset-generation script.
 */
export const agencyFictionalCandidateData: CVData = {
  personal: {
    name: agencyFictionalExample.candidate.name,
    title: agencyFictionalExample.candidate.role,
    resumeLanguage: "nl",
    email: "nina.devries@example.com",
    phone: "06 1234 5678",
    location: "Utrecht",
    address: "Voorbeeldstraat 12",
    postalCode: "3511 AA",
    summary: agencyFictionalExample.sourceSections.find((source) => source.id === "profile")?.snippet ?? "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    driversLicense: "B",
    gender: "",
    maritalStatus: "",
    linkedIn: "",
    github: "",
    website: "",
    photo: "",
  },
  experience: [
    {
      role: "Senior HR-adviseur",
      company: "Fictieve Zorgdiensten",
      location: "Utrecht",
      start: "januari 2021",
      end: "heden",
      description: "Adviseert leidinggevenden over verzuim, ontwikkeling en arbeidsvoorwaarden.",
      highlights: [agencyFictionalExample.sourceSections.find((source) => source.id === "experience")?.snippet ?? ""],
    },
    {
      role: "HR-adviseur",
      company: "Middenland Services",
      location: "Nieuwegein",
      start: "september 2017",
      end: "december 2020",
      description: "Ondersteunde medewerkers en managers bij instroom, ontwikkeling en HR-administratie.",
      highlights: ["Verbeterde de verzuimregistratie en maakte rapportageafspraken inzichtelijk."],
    },
  ],
  education: [
    {
      degree: "Bachelor Human Resource Management",
      school: "Hogeschool Middenland",
      location: "Utrecht",
      start: "september 2013",
      end: "juni 2017",
      description: "",
    },
  ],
  skills: [
    { name: "HR-systemen: personeelsadministratie, verzuimregistratie en rapportage.", level: 4 },
    { name: "Verzuimbegeleiding", level: 4 },
    { name: "Organisatieverandering", level: 4 },
  ],
  languages: [
    { name: "Nederlands", level: "Moedertaal" },
    { name: "Engels", level: "Goed" },
  ],
  internships: [],
  interests: [],
  properties: ["Analytisch", "Zorgvuldig", "Praktisch"],
  courses: [{ name: "Regie op verzuim", institution: "Voorbeeld Academie", year: "2024" }],
  awards: [],
  references: [],
  sideActivities: [],
  customSections: [],
};

/**
 * Canonical source-only projection used for deterministic fixture checks. Keep
 * field order stable: the digest is deliberately not derived from rendered
 * copy, so a visual change cannot silently change the source fixture.
 */
export const fictionalExampleSourceCanonical = agencyFictionalExample.sourceSections.map(({ id, label, location, snippet }) => ({
  id,
  label,
  location,
  snippet,
}));

export const fictionalExampleSourceDigest = "sha256:ad9fbc196a0c5b8fb43dd5db63b33ebdf67366e7872f952d124ae720cacd3f86" as const;
