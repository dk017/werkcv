import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";

const agencyPriceNl = getAgencyMonthlyPriceDisplay("nl");
const agencyPriceEn = getAgencyMonthlyPriceDisplay("en").replace("/month", " per month");

export const agencyAcquisitionRouteIds = [
  "nl_product",
  "nl_solution_hub",
  "nl_how_to",
  "nl_example",
  "nl_branded_cv",
  "nl_software_comparison",
  "nl_redaction_guide",
  "nl_matchpack_guide",
  "nl_public_sector_submission",
  "nl_checker",
  "en_product",
  "en_checker",
] as const;

export type AgencyAcquisitionRouteId = (typeof agencyAcquisitionRouteIds)[number];

export type AgencyAcquisitionRouteConfig = {
  id: AgencyAcquisitionRouteId;
  path: string;
  locale: "nl" | "en";
  kind: "commercial" | "hub" | "guide" | "example" | "tool";
  primaryIntent: string;
  secondaryIntents: readonly string[];
  title: string;
  description: string;
  h1: string;
  primaryDestination: string;
  hreflangPeer?: string;
};

export const agencyAcquisitionRoutes: readonly AgencyAcquisitionRouteConfig[] = [
  {
    id: "nl_product",
    path: "/agency",
    locale: "nl",
    kind: "commercial",
    primaryIntent: "kandidaatvoorstel software recruitmentbureau",
    secondaryIntents: ["candidate submission software in Dutch", "MatchPack voor recruitmentbureaus"],
    title: "Kandidaatvoorstel-software voor recruitmentbureaus | WerkCV",
    description: `Maak onderbouwde kandidaatvoorstellen met zichtbaar CV-bewijs, open punten, recruiter-review en gecontroleerde PDF- en DOCX-export. ${agencyPriceNl} voor ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits.`,
    h1: "Controleer geselecteerde functie-eisen met CV-bewijs voordat je een kandidaat aanbiedt.",
    primaryDestination: "/tools/kandidaatvoorstel-checker",
    hreflangPeer: "/en/agency",
  },
  {
    id: "nl_solution_hub",
    path: "/voor-bureaus",
    locale: "nl",
    kind: "hub",
    primaryIntent: "kandidaatvoorstellen voor opdrachtgevers",
    secondaryIntents: ["workflow recruitmentbureau kandidaat voorstellen", "CV-bewijs voor bureaus"],
    title: "Kandidaat voorstellen aan opdrachtgevers | Voor bureaus",
    description: "Praktische workflow voor recruitmentbureaus: verbind functie-eisen met CV-bewijs, houd onbevestigde informatie zichtbaar en keur één klantversie goed.",
    h1: "Kandidaat voorstellen aan een opdrachtgever, met bewijs uit het CV",
    primaryDestination: "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
  },
  {
    id: "nl_how_to",
    path: "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
    locale: "nl",
    kind: "guide",
    primaryIntent: "kandidaatvoorstel maken",
    secondaryIntents: ["kandidaat voorstellen aan opdrachtgever", "kandidaatvoorstel checklist"],
    title: "Kandidaatvoorstel maken: voorbeeld en checklist | WerkCV",
    description: "Leer stap voor stap een kandidaatvoorstel voor een opdrachtgever maken, met een klantintroductie, CV-bewijs, bevestigde gegevens, open punten en begeleidende e-mail.",
    h1: "Hoe maak je een kandidaatvoorstel voor een opdrachtgever?",
    primaryDestination: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
  },
  {
    id: "nl_example",
    path: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
    locale: "nl",
    kind: "example",
    primaryIntent: "kandidaatvoorstel voorbeeld",
    secondaryIntents: ["voorbeeld kandidaatvoorstel recruiter", "kandidaatvoorstel met CV-bewijs"],
    title: "Kandidaatvoorstel voorbeeld voor recruiters | WerkCV",
    description: "Bekijk een volledig fictief kandidaatvoorstel met vacature-eisen, exact CV-bewijs, open punten, klantintroductie, begeleidende e-mail en PDF/DOCX-output.",
    h1: "Kandidaatvoorstel voorbeeld: van CV-bewijs naar klantintroductie",
    primaryDestination: "/tools/kandidaatvoorstel-checker",
  },
  {
    id: "nl_branded_cv",
    path: "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau",
    locale: "nl",
    kind: "guide",
    primaryIntent: "cv in huisstijl recruitmentbureau",
    secondaryIntents: ["kandidaat CV bureau huisstijl", "branded candidate CV"],
    title: "Kandidaat-CV in huisstijl van je recruitmentbureau | WerkCV",
    description: "Zet een kandidaat-CV gecontroleerd in bureauhuisstijl, bewaar de inhoudelijke bron en exporteer de goedgekeurde klantversie als PDF of DOCX.",
    h1: "Hoe zet je een kandidaat-CV in de huisstijl van je recruitmentbureau?",
    primaryDestination: "/agency#voorbeeld",
  },
  {
    id: "nl_redaction_guide",
    path: "/voor-bureaus/kennisbank/cv-anonimiseren-recruitment",
    locale: "nl",
    kind: "guide",
    primaryIntent: "cv contactgegevens verwijderen recruitment",
    secondaryIntents: ["contact-reduced kandidaat CV", "CV delen zonder directe contactgegevens"],
    title: "CV delen zonder directe contactgegevens: wat controleert een recruiter? | WerkCV",
    description: "Controleer directe en indirecte herkenbaarheid wanneer je een kandidaat-CV zonder directe contactgegevens deelt. Inclusief menselijke review en outputcontrole.",
    h1: "CV delen zonder directe contactgegevens: controleer ook indirecte herkenning",
    primaryDestination: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
  },
  {
    id: "nl_software_comparison",
    path: "/voor-bureaus/kennisbank/cv-opmaak-software-vergelijken",
    locale: "nl",
    kind: "guide",
    primaryIntent: "cv opmaak software recruitmentbureau vergelijken",
    secondaryIntents: ["candidate submission software comparison", "candidate CV formatting tools agency"],
    title: "CV-opmaaksoftware voor recruitmentbureaus vergelijken | WerkCV",
    description: "Vergelijk CV-opmaak en kandidaatvoorstel-workflows voor recruitmentbureaus op output, review, integraties, teamwerk en controleerbare broninformatie.",
    h1: "CV-opmaaksoftware voor recruitmentbureaus vergelijken",
    primaryDestination: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
  },
  {
    id: "nl_matchpack_guide",
    path: "/voor-bureaus/kennisbank/matchpack-handleiding",
    locale: "nl",
    kind: "guide",
    primaryIntent: "MatchPack handleiding recruiter",
    secondaryIntents: ["bewijs per functie-eis", "recruiter kandidaatvoorstel workflow"],
    title: "MatchPack handleiding voor recruiters | WerkCV",
    description: "Stap-voor-stap MatchPack handleiding: upload, bewijs per functie-eis, recruiter-review, correcties, versies, goedkeuring, PDF/DOCX-export, retentie en Agency-rollen.",
    h1: "Van CV en vacature naar een controleerbaar kandidaatvoorstel",
    primaryDestination: "/agency",
  },
  {
    id: "nl_checker",
    path: "/tools/kandidaatvoorstel-checker",
    locale: "nl",
    kind: "tool",
    primaryIntent: "kandidaatvoorstel checker",
    secondaryIntents: ["vacature CV bewijs controleren", "free candidate proposal evidence checker Dutch"],
    title: "Gratis kandidaatvoorstel evidence checker | WerkCV",
    description: "Controleer gratis of vacature-eisen door concreet CV-bewijs worden ondersteund. Bekijk bronregels en open punten vóór je een kandidaatvoorstel verstuurt.",
    h1: "Controleer CV-bewijs vóór je een kandidaatvoorstel verstuurt",
    primaryDestination: "/agency",
  },
  {
    id: "nl_public_sector_submission",
    path: "/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid",
    locale: "nl",
    kind: "guide",
    primaryIntent: "kandidaat aanbieden overheid",
    secondaryIntents: [
      "functie-eisen aantoonbaar in cv",
      "knock-out eisen cv",
      "motivatie per functie-eis",
      "cv per functie-eis onderbouwen",
      "eisen en wensen kandidaat cv",
      "kandidaatvoorstel detachering",
      "kandidaatvoorstel voor overheidsopdracht",
    ],
    title: "Kandidaat aanbieden bij de overheid: functie-eisen aantoonbaar maken | WerkCV",
    description: "Praktische uitleg om bij een overheidsopdracht elke functie-eis aan exact CV-bewijs te koppelen, open punten zichtbaar te houden en een gecontroleerd kandidaatvoorstel te maken.",
    h1: "Kandidaat aanbieden bij de overheid: maak functie-eisen aantoonbaar in het CV",
    primaryDestination: "/tools/kandidaatvoorstel-checker",
  },
  {
    id: "en_product",
    path: "/en/agency",
    locale: "en",
    kind: "commercial",
    primaryIntent: "candidate submission software",
    secondaryIntents: ["candidate presentation software", "candidate proposal evidence"],
    title: "Candidate Submission Software for Recruitment Agencies | WerkCV",
    description: `Map vacancy requirements to exact CV passages, keep missing information visible, and approve a controlled PDF or DOCX proposal. ${agencyPriceEn} · ${AGENCY_MONTHLY_CREDIT_LIMIT} shared CV credits.`,
    h1: "Review selected vacancy requirements against CV evidence before submission.",
    primaryDestination: "/en/candidate-proposal-checker",
    hreflangPeer: "/agency",
  },
  {
    id: "en_checker",
    path: "/en/candidate-proposal-checker",
    locale: "en",
    kind: "tool",
    primaryIntent: "candidate proposal checker",
    secondaryIntents: ["candidate submission evidence checker", "CV evidence checker for recruiters"],
    title: "Free Candidate Proposal Evidence Checker | WerkCV",
    description: "Check whether candidate-proposal requirements are supported by source CV evidence. Keep missing and changing information visible before a recruiter sends a client version.",
    h1: "Check vacancy requirements against CV evidence",
    primaryDestination: "/en/agency",
  },
] as const;

const routeByPath = new Map(agencyAcquisitionRoutes.map((route) => [route.path, route]));
const routeById = new Map(agencyAcquisitionRoutes.map((route) => [route.id, route]));

export function getAgencyAcquisitionRoute(path: string): AgencyAcquisitionRouteConfig | undefined {
  return routeByPath.get(path);
}

export function getAgencyAcquisitionRouteById(id: AgencyAcquisitionRouteId): AgencyAcquisitionRouteConfig {
  const route = routeById.get(id);
  if (!route) throw new Error(`Unknown Agency acquisition route: ${id}`);
  return route;
}

export function validateAgencyAcquisitionRoutes(
  routes: readonly AgencyAcquisitionRouteConfig[] = agencyAcquisitionRoutes,
): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const paths = new Set<string>();
  const intents = new Set<string>();
  const pathsInRegistry = new Map(routes.map((route) => [route.path, route]));

  for (const route of routes) {
    if (ids.has(route.id)) errors.push(`duplicate route id: ${route.id}`);
    if (paths.has(route.path)) errors.push(`duplicate route path: ${route.path}`);
    if (intents.has(route.primaryIntent)) errors.push(`duplicate primary intent: ${route.primaryIntent}`);
    ids.add(route.id);
    paths.add(route.path);
    intents.add(route.primaryIntent);

    if (!/^\/[^\s?#]+$/.test(route.path)) errors.push(`route path must be an internal normalised pathname: ${route.path}`);
    if (!/^\/[^\s?#]+(?:#[^\s?#]+)?$/.test(route.primaryDestination)) {
      errors.push(`primary destination must be an internal path: ${route.primaryDestination}`);
    }
    if (route.primaryDestination.startsWith("/agency/account")) {
      errors.push(`primary destination must not expose an authenticated account URL: ${route.primaryDestination}`);
    }
    if (!route.title.trim() || !route.description.trim() || !route.h1.trim()) {
      errors.push(`route metadata is incomplete: ${route.id}`);
    }
    if (route.locale === "en" && !route.path.startsWith("/en/")) errors.push(`English route is not under /en: ${route.path}`);
    if (route.locale === "nl" && route.path.startsWith("/en/")) errors.push(`Dutch route is under /en: ${route.path}`);
  }

  for (const route of routes) {
    const isLanguagePair = route.id === "nl_product" || route.id === "en_product";
    if (!isLanguagePair && route.hreflangPeer) errors.push(`only the commercial language pair may declare hreflang: ${route.path}`);
    if (isLanguagePair && !route.hreflangPeer) errors.push(`commercial language route is missing hreflang peer: ${route.path}`);
    if (!route.hreflangPeer) continue;
    const peer = pathsInRegistry.get(route.hreflangPeer);
    if (!peer) errors.push(`missing hreflang peer ${route.hreflangPeer} for ${route.path}`);
    else if (peer.hreflangPeer !== route.path) errors.push(`hreflang is not reciprocal for ${route.path}`);
  }

  return errors;
}

const registryErrors = validateAgencyAcquisitionRoutes();
if (registryErrors.length > 0) {
  throw new Error(`Invalid Agency acquisition registry: ${registryErrors.join("; ")}`);
}
