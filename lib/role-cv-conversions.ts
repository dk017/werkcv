import type { CVData } from "@/lib/cv";
import {
  callcenterCvSample,
  klantenserviceCvSample,
  productmanagerCvSample,
} from "@/lib/cv-samples/conversion-role-cvs";
import type { CitedAuthorityIntentId } from "@/lib/cited-authority-conversion";

export type RoleCvConversion = {
  roleLabel: string;
  proofItems: string[];
  motivationHref: string;
  canonicalPath: string;
  startSource: string;
  heading?: string;
  primaryLabel?: string;
  citedAuthorityIntentId?: CitedAuthorityIntentId;
};

const examplePageConversions: Record<string, RoleCvConversion> = {
  "technologie-en-ict/cybersecurity-specialist": {
    roleLabel: "cybersecurity specialist",
    proofItems: ["SIEM en incidentrespons", "ISO 27001 / NIS2", "Meetbare security-impact"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
    canonicalPath: "/cv-voorbeelden/technologie-en-ict/cybersecurity-specialist",
    startSource: "example_page_cybersecurity_specialist",
  },
  "horeca-en-detailhandel/ober-serveerster": {
    roleLabel: "serveerster",
    proofItems: ["Gastvrij profiel", "Kassa en bediening", "Tempo, upselling en resultaat"],
    motivationHref: "/sollicitatiebrief-voorbeeld-horeca-medewerker",
    canonicalPath: "/cv-voorbeelden/horeca-en-detailhandel/ober-serveerster",
    startSource: "example_page_ober_serveerster",
  },
  "onderwijs/onderwijsassistent": {
    roleLabel: "onderwijsassistent",
    proofItems: ["Leerlingbegeleiding", "Klasondersteuning", "Stage en pedagogisch bewijs"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
    canonicalPath: "/cv-voorbeelden/onderwijs/onderwijsassistent",
    startSource: "example_page_onderwijsassistent",
  },
  "studenten-en-starters/student-cv": {
    roleLabel: "student",
    proofItems: ["Opleiding en projecten", "Stage en bijbaan", "Vaardigheden en talen"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
    canonicalPath: "/cv-voorbeelden/studenten-en-starters/student-cv",
    startSource: "cited_authority_student_example",
    heading: "Begin niet met een leeg document: open dit ingevulde student-CV",
    primaryLabel: "Open ingevuld student-CV",
    citedAuthorityIntentId: "student_cv",
  },
  "zakelijk-en-financieel/administratief-medewerker": {
    roleLabel: "administratief medewerker",
    proofItems: ["Dossier- en factuurbeheer", "Excel, AFAS en Exact", "Procesresultaten"],
    motivationHref: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
    canonicalPath: "/cv-voorbeelden/zakelijk-en-financieel/administratief-medewerker",
    startSource: "cited_authority_admin_example",
    heading: "Open een ingevuld administratief CV en vervang de voorbeeldgegevens",
    primaryLabel: "Open ingevuld administratief CV",
    citedAuthorityIntentId: "admin_cv",
  },
};

export function getExamplePageRoleConversion(category: string, slug: string) {
  return examplePageConversions[`${category}/${slug}`];
}

export type WaveRoleCvConversion = RoleCvConversion & {
  templateId: string;
  colorThemeId: string;
  sampleCV: CVData;
};

const wavePageConversions: Record<string, WaveRoleCvConversion> = {
  "cv-voorbeeld-productmanager": {
    roleLabel: "productmanager",
    templateId: "professional",
    colorThemeId: "classic-blue",
    sampleCV: productmanagerCvSample,
    proofItems: ["Discovery en roadmap", "Productmetrics", "Stakeholderimpact"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
    canonicalPath: "/cv-gids/cv-voorbeeld-productmanager",
    startSource: "wave_role_example_productmanager",
  },
  "cv-voorbeeld-klantenservice-medewerker": {
    roleLabel: "klantenservice medewerker",
    templateId: "simple",
    colorThemeId: "modern-teal",
    sampleCV: klantenserviceCvSample,
    proofItems: ["CRM en kanalen", "Service-KPI's", "Klachtoplossing"],
    motivationHref: "/sollicitatiebrief-voorbeeld-klantenservice",
    canonicalPath: "/cv-gids/cv-voorbeeld-klantenservice-medewerker",
    startSource: "wave_role_example_klantenservice",
  },
  "cv-voorbeeld-callcenter-medewerker": {
    roleLabel: "callcenter medewerker",
    templateId: "simple",
    colorThemeId: "modern-teal",
    sampleCV: callcenterCvSample,
    proofItems: ["AHT en FCR", "Kwaliteitsscore", "Retentie en bezwaar"],
    motivationHref: "/sollicitatiebrief-voorbeeld-klantenservice",
    canonicalPath: "/cv-gids/cv-voorbeeld-callcenter-medewerker",
    startSource: "wave_role_example_callcenter",
  },
};

export function getWavePageRoleConversion(slug: string) {
  return wavePageConversions[slug];
}
