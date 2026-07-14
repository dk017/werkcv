import type { CVData } from "@/lib/cv";
import {
  callcenterCvSample,
  klantenserviceCvSample,
  productmanagerCvSample,
} from "@/lib/cv-samples/conversion-role-cvs";

export type RoleCvConversion = {
  roleLabel: string;
  proofItems: string[];
  motivationHref: string;
};

const examplePageConversions: Record<string, RoleCvConversion> = {
  "technologie-en-ict/cybersecurity-specialist": {
    roleLabel: "cybersecurity specialist",
    proofItems: ["SIEM en incidentrespons", "ISO 27001 / NIS2", "Meetbare security-impact"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
  },
  "horeca-en-detailhandel/ober-serveerster": {
    roleLabel: "serveerster",
    proofItems: ["Gastvrij profiel", "Kassa en bediening", "Tempo, upselling en resultaat"],
    motivationHref: "/sollicitatiebrief-voorbeeld-horeca-medewerker",
  },
  "onderwijs/onderwijsassistent": {
    roleLabel: "onderwijsassistent",
    proofItems: ["Leerlingbegeleiding", "Klasondersteuning", "Stage en pedagogisch bewijs"],
    motivationHref: "/motivatiebrief-voorbeeld#kies-voorbeeld",
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
  },
  "cv-voorbeeld-klantenservice-medewerker": {
    roleLabel: "klantenservice medewerker",
    templateId: "simple",
    colorThemeId: "modern-teal",
    sampleCV: klantenserviceCvSample,
    proofItems: ["CRM en kanalen", "Service-KPI's", "Klachtoplossing"],
    motivationHref: "/sollicitatiebrief-voorbeeld-klantenservice",
  },
  "cv-voorbeeld-callcenter-medewerker": {
    roleLabel: "callcenter medewerker",
    templateId: "simple",
    colorThemeId: "modern-teal",
    sampleCV: callcenterCvSample,
    proofItems: ["AHT en FCR", "Kwaliteitsscore", "Retentie en bezwaar"],
    motivationHref: "/sollicitatiebrief-voorbeeld-klantenservice",
  },
};

export function getWavePageRoleConversion(slug: string) {
  return wavePageConversions[slug];
}
