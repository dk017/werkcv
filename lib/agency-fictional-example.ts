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
    location: "Utrecht; werkvoorkeur nog te bevestigen",
    hours: "Nog te bevestigen",
  },
  vacancy: {
    title: "Senior HR-adviseur",
    organisation: "Stadshaven Zorggroep",
    hours: "32–36 uur",
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
      status: "partially_supported" as const,
      sourceSection: "Profiel",
      sourceLocation: "CV · sectie Profiel",
      sourceSnippet: "Senior HR-adviseur met zeven jaar ervaring in verzuimbegeleiding, organisatieverandering en HR-advies.",
      explanation: "Zeven jaar brede HR-ervaring bewijst niet hoeveel jaar de kandidaat zelfstandig als HR-adviseur werkte.",
      nextAction: "Beperk tot zeven jaar HR-ervaring; vraag de duur en scope van zelfstandige verantwoordelijkheid na",
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
      explanation: "Rapportage staat in de bron, maar Power BI en het bouwen van dashboards worden niet genoemd.",
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
    phone: "",
    location: "Utrecht",
    address: "",
    postalCode: "",
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
      start: "januari 2023",
      end: "augustus 2026",
      description: "Adviseert leidinggevenden over verzuim, ontwikkeling en arbeidsvoorwaarden.",
      highlights: [agencyFictionalExample.sourceSections.find((source) => source.id === "experience")?.snippet ?? ""],
    },
    {
      role: "HR-adviseur",
      company: "Middenland Services",
      location: "Nieuwegein",
      start: "september 2019",
      end: "december 2022",
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

export const fictionalExampleVersion = "nina-hr-v2";
export const fictionalExampleModified = "2026-09-07";
export const fictionalExampleAsOf = "2026-08-31";

/** Authored teaching examples, not output from a live verifier or a benchmark. */
export const fictionalDraftReview = [
  { id: "supported", draft: "Nina heeft een bachelor Human Resource Management.", sourceId: "education", explanation: "De opleiding staat expliciet in het CV.", action: "Behouden", final: "Bachelor Human Resource Management." },
  { id: "partial", draft: "Nina werkte zeven jaar zelfstandig als HR-adviseur.", sourceId: "profile", explanation: "Brede HR-ervaring bewijst niet de duur van zelfstandige adviesverantwoordelijkheid.", action: "Beperken tot wat de bron zegt", final: "Zeven jaar HR-ervaring; duur van zelfstandige adviesverantwoordelijkheid nog te bevestigen." },
  { id: "unsupported", draft: "Nina configureert zelfstandig AFAS-workflows.", sourceId: "systems", explanation: "Algemene HR-systemen zijn geen bewijs voor AFAS of configuratie. Ontbrekend bewijs is niet automatisch een tegenspraak.", action: "Verwijderen als kandidaatfeit", final: "AFAS-workflowconfiguratie: niet aangetoond in het CV." },
  { id: "numerical", draft: "Nina adviseerde 40 teamleiders.", sourceId: "experience", explanation: "De bron noemt 24, niet 40. Het concept vergroot hetzelfde aantal zonder bron.", action: "Aantal corrigeren", final: "Adviseerde 24 teamleiders over verzuim, ontwikkeling en arbeidsvoorwaarden." },
  { id: "current", draft: "Nina is vanaf 1 oktober 2026 beschikbaar voor 32–36 uur.", sourceId: null, explanation: "Dit zijn wensen uit de vacature, geen bevestigde kandidaatfeiten.", action: "Kandidaat navragen; onbekend laten", final: "Startdatum en uren: nog te bevestigen." },
] as const;

export const fictionalVacancyText = [
  agencyFictionalExample.notice,
  `VACATURE — ${agencyFictionalExample.vacancy.title}`,
  agencyFictionalExample.vacancy.organisation,
  agencyFictionalExample.vacancy.context,
  "Locatie: Utrecht, gedeeltelijk thuiswerken mogelijk.",
  `Omvang: ${agencyFictionalExample.vacancy.hours} per week. Gewenste start: 1 oktober 2026.`,
  "Opdracht: negen maanden; dit zijn vacaturevoorwaarden, geen kandidaatbevestiging.",
  "Werkzaamheden: leidinggevenden adviseren, verzuimdossiers begeleiden en HR-rapportages verbeteren.",
  "Functie-eisen:",
  ...agencyFictionalExample.evidence.map((item, index) => `${index + 1}. ${item.requirement}`),
  "Reageer niet op deze vacature: uitsluitend een fictief uitlegbaar voorbeeld.",
].join("\n");

export const fictionalFullCvText = [
  agencyFictionalExample.notice,
  `Bronversie ${fictionalExampleVersion}; peildatum ${fictionalExampleAsOf}`,
  agencyFictionalExample.candidate.name,
  agencyFictionalExample.candidate.role,
  "nina.devries@example.com · Utrecht",
  ...agencyFictionalExample.sourceSections.flatMap((source) => [source.label, source.snippet]),
  "Volledige werkperioden",
  ...agencyFictionalCandidateData.experience.flatMap((item) => [`${item.role} · ${item.company} · ${item.start} - ${item.end}`, item.description, ...item.highlights]),
  "Opleidingsperiode: september 2013 - juni 2017.",
  "Vaardigheden: Verzuimbegeleiding; Organisatieverandering.",
  "Talen: Nederlands — moedertaal; Engels — goed.",
  "Eigenschappen: Analytisch; Zorgvuldig; Praktisch.",
  "Cursus: Regie op verzuim · Voorbeeld Academie · 2024.",
  "Rijbewijs: B.",
  "Beschikbaarheid, uren, salaris, opzegtermijn en werkvoorkeur: niet opgegeven.",
].join("\n");
