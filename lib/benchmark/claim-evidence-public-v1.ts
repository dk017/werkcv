import { createHash } from "node:crypto";
import type { ProposalClaimVerdict } from "@/lib/tools/proposal-claim-verifier-schema";

export type ClaimEvidenceBenchmarkCaseV1 = {
  version: 1;
  caseId: string;
  locale: "nl" | "en";
  occupationalFamily: string;
  seniority: "junior" | "medior" | "senior";
  sourceFormat: "text" | "pdf" | "docx";
  sourceDocumentVersion: string;
  sourceChecksum: string;
  cvText: string;
  proposalText: string;
  claim: {
    text: string;
    start: number;
    end: number;
    expectedVerdict: ProposalClaimVerdict;
    acceptedSourceSpan: { start: number; end: number; text: string } | null;
    errorCategory: string;
    annotationRationale: string;
  };
};

type BenchmarkProfile = {
  family: string;
  role: string;
  seniority: "junior" | "medior" | "senior";
  supportedEvidence: string;
  supportedClaim: string;
  partialEvidence: string;
  partialClaim: string;
  unsupportedClaim: string;
  unsupportedCategory: string;
  contradictionEvidence: string;
  contradictionClaim: string;
  contradictionCategory: string;
  confirmationClaim: string;
  subjectiveClaim: string;
};

const profiles: Record<"nl" | "en", BenchmarkProfile[]> = {
  nl: [
    {
      family: "zorg", role: "Verpleegkundige", seniority: "medior",
      supportedEvidence: "Coördineerde tijdens avonddiensten de zorg voor maximaal twaalf bewoners.",
      supportedClaim: "De kandidaat coördineerde avonddiensten voor maximaal twaalf bewoners.",
      partialEvidence: "Nam deel aan twee interne werkgroepen over medicatieveiligheid.",
      partialClaim: "De kandidaat leidde organisatiebreed het programma voor medicatieveiligheid.",
      unsupportedClaim: "De kandidaat is gecertificeerd als wondverpleegkundige.", unsupportedCategory: "missing_qualification",
      contradictionEvidence: "Werkte van maart 2022 tot en met februari 2024 op de geriatrische afdeling.",
      contradictionClaim: "De kandidaat heeft vier jaar ervaring op de geriatrische afdeling.", contradictionCategory: "incorrect_duration",
      confirmationClaim: "De kandidaat is vanaf volgende week beschikbaar voor nachtdiensten.",
      subjectiveClaim: "De kandidaat is de meest empathische verpleegkundige in haar team.",
    },
    {
      family: "technologie", role: "Softwareontwikkelaar", seniority: "senior",
      supportedEvidence: "Verminderde de gemiddelde verwerkingstijd van de factuur-API van 900 naar 420 milliseconden.",
      supportedClaim: "De kandidaat bracht de verwerkingstijd van een factuur-API terug van 900 naar 420 milliseconden.",
      partialEvidence: "Begeleidde twee junior ontwikkelaars bij code reviews.",
      partialClaim: "De kandidaat gaf als engineering manager leiding aan een volledig developmentteam.",
      unsupportedClaim: "De kandidaat heeft productie-ervaring met Kubernetes.", unsupportedCategory: "missing_skill",
      contradictionEvidence: "Werkte bij DeltaSoft aan Java- en Spring Boot-services; React werd gebruikt bij een eerder project voor NoordWeb.",
      contradictionClaim: "Bij DeltaSoft bouwde de kandidaat de React-frontend van het klantportaal.", contradictionCategory: "wrong_employer_attribution",
      confirmationClaim: "De kandidaat accepteert een salaris van €6.200 en kan per direct starten.",
      subjectiveClaim: "De kandidaat schrijft uitzonderlijk elegante code.",
    },
    {
      family: "logistiek", role: "Logistiek planner", seniority: "medior",
      supportedEvidence: "Planningsverantwoordelijk voor gemiddeld 38 dagelijkse ritten in Nederland en België.",
      supportedClaim: "De kandidaat plande gemiddeld 38 ritten per dag in Nederland en België.",
      partialEvidence: "Leveranciersproblemen werden samen met de teamleider geëscaleerd.",
      partialClaim: "De kandidaat besliste zelfstandig over alle leveranciersescalaties.",
      unsupportedClaim: "De kandidaat heeft aantoonbare ervaring met SAP EWM.", unsupportedCategory: "missing_system_experience",
      contradictionEvidence: "Behaalde in 2023 een leverbetrouwbaarheid van 94 procent.",
      contradictionClaim: "De kandidaat verhoogde de leverbetrouwbaarheid naar 99 procent.", contradictionCategory: "numerical_contradiction",
      confirmationClaim: "De kandidaat wil maximaal twee dagen per week op locatie werken.",
      subjectiveClaim: "De kandidaat blijft altijd kalm onder iedere vorm van druk.",
    },
    {
      family: "financiën", role: "Financial controller", seniority: "senior",
      supportedEvidence: "Stelde de maandafsluiting voor drie Nederlandse entiteiten op en rapporteerde aan de financieel directeur.",
      supportedClaim: "De kandidaat verzorgde de maandafsluiting voor drie Nederlandse entiteiten.",
      partialEvidence: "Ondersteunde de externe accountant bij de jaarlijkse controle.",
      partialClaim: "De kandidaat was eindverantwoordelijk voor de volledige externe accountantscontrole.",
      unsupportedClaim: "De kandidaat beschikt over een afgeronde RA-opleiding.", unsupportedCategory: "missing_education",
      contradictionEvidence: "Trad op 1 november 2021 in dienst bij Meridiaan Retail.",
      contradictionClaim: "De kandidaat werkt sinds januari 2020 bij Meridiaan Retail.", contradictionCategory: "incorrect_date",
      confirmationClaim: "De kandidaat verwacht een uurtarief van €105 exclusief btw.",
      subjectiveClaim: "De kandidaat is een briljante strategische sparringpartner voor iedere CFO.",
    },
    {
      family: "onderwijs", role: "Docent Nederlands", seniority: "junior",
      supportedEvidence: "Ontwikkelde zes lessen leesvaardigheid voor twee derde klassen havo.",
      supportedClaim: "De kandidaat ontwikkelde zes lessen leesvaardigheid voor twee havo-klassen.",
      partialEvidence: "Ving tijdens afwezigheid van de mentor twee oudergesprekken op.",
      partialClaim: "De kandidaat droeg structureel de volledige mentorverantwoordelijkheid voor twee klassen.",
      unsupportedClaim: "De kandidaat heeft een eerstegraads onderwijsbevoegdheid.", unsupportedCategory: "missing_qualification",
      contradictionEvidence: "Behaalde in juli 2025 de tweedegraads bevoegdheid Nederlands.",
      contradictionClaim: "De kandidaat behaalde in 2025 een eerstegraads bevoegdheid Nederlands.", contradictionCategory: "qualification_contradiction",
      confirmationClaim: "De kandidaat is komend schooljaar vier dagen per week beschikbaar.",
      subjectiveClaim: "De kandidaat inspireert zonder uitzondering iedere leerling.",
    },
  ],
  en: [
    {
      family: "human-resources", role: "HR adviser", seniority: "senior",
      supportedEvidence: "Advised 24 line managers on absence, performance and organisational change.",
      supportedClaim: "The candidate advised 24 line managers on absence and organisational change.",
      partialEvidence: "Provided HR data to the project lead during an AFAS workflow review.",
      partialClaim: "The candidate independently configured and owned the AFAS workflow programme.",
      unsupportedClaim: "The candidate has worked under the Dutch VVT collective labour agreement.", unsupportedCategory: "missing_sector_experience",
      contradictionEvidence: "Joined Northbridge Services in May 2021 and left in April 2024.",
      contradictionClaim: "The candidate spent five years at Northbridge Services.", contradictionCategory: "incorrect_duration",
      confirmationClaim: "The candidate can start on 1 October for 36 hours per week.",
      subjectiveClaim: "The candidate is an exceptionally influential HR adviser.",
    },
    {
      family: "engineering", role: "Mechanical engineer", seniority: "medior",
      supportedEvidence: "Released 18 production drawings for a stainless-steel conveyor redesign.",
      supportedClaim: "The candidate released 18 production drawings for a conveyor redesign.",
      partialEvidence: "Contributed tolerance calculations reviewed by the senior engineer.",
      partialClaim: "The candidate had final design authority for all tolerance calculations.",
      unsupportedClaim: "The candidate is a certified SolidWorks Professional.", unsupportedCategory: "missing_certification",
      contradictionEvidence: "Used Autodesk Inventor at Westline Machines and SolidWorks at an earlier internship.",
      contradictionClaim: "The candidate used SolidWorks to deliver the Westline Machines redesign.", contradictionCategory: "wrong_employer_attribution",
      confirmationClaim: "The candidate will relocate to Eindhoven before the proposed start date.",
      subjectiveClaim: "The candidate is a naturally gifted product inventor.",
    },
    {
      family: "sales", role: "Account executive", seniority: "senior",
      supportedEvidence: "Closed €740,000 in new annual contract value during 2025.",
      supportedClaim: "The candidate closed €740,000 in new annual contract value in 2025.",
      partialEvidence: "Supported the sales director in two enterprise renewal negotiations.",
      partialClaim: "The candidate independently owned all enterprise renewals across Europe.",
      unsupportedClaim: "The candidate has sold cybersecurity software to government buyers.", unsupportedCategory: "missing_market_experience",
      contradictionEvidence: "Finished 2025 at 92 percent of the €800,000 annual target.",
      contradictionClaim: "The candidate exceeded the 2025 sales target by 20 percent.", contradictionCategory: "numerical_contradiction",
      confirmationClaim: "The candidate accepts a €70,000 base salary plus commission.",
      subjectiveClaim: "The candidate is the strongest closer in the market.",
    },
    {
      family: "public-sector", role: "Policy officer", seniority: "medior",
      supportedEvidence: "Drafted the consultation summary used in the council meeting of 14 March 2025.",
      supportedClaim: "The candidate drafted a consultation summary used at a March 2025 council meeting.",
      partialEvidence: "Coordinated input from legal and finance colleagues for the project manager.",
      partialClaim: "The candidate held final budget and legal accountability for the programme.",
      unsupportedClaim: "The candidate holds active national security clearance.", unsupportedCategory: "missing_current_clearance",
      contradictionEvidence: "Worked for the Municipality of Havenstad from September 2022 to August 2024.",
      contradictionClaim: "The candidate still works for the Municipality of Havenstad.", contradictionCategory: "incorrect_current_employer",
      confirmationClaim: "The candidate agrees to complete a new background screening before appointment.",
      subjectiveClaim: "The candidate has unmatched political judgement.",
    },
    {
      family: "hospitality", role: "Hotel supervisor", seniority: "junior",
      supportedEvidence: "Supervised up to nine front-desk and guest-service colleagues on weekend shifts.",
      supportedClaim: "The candidate supervised up to nine colleagues during weekend shifts.",
      partialEvidence: "Prepared weekly occupancy figures for review by the revenue manager.",
      partialClaim: "The candidate set the hotel's complete pricing and revenue strategy.",
      unsupportedClaim: "The candidate speaks fluent German at C1 level.", unsupportedCategory: "missing_language_level",
      contradictionEvidence: "Completed the emergency response course in June 2023; the certificate expired in June 2025.",
      contradictionClaim: "The candidate currently holds a valid emergency response certificate.", contradictionCategory: "expired_qualification",
      confirmationClaim: "The candidate is available for rotating night and weekend shifts from next month.",
      subjectiveClaim: "The candidate creates a flawless guest experience in every situation.",
    },
  ],
};

const patterns: ProposalClaimVerdict[] = [
  "supported",
  "partially_supported",
  "unsupported",
  "contradicted",
  "confirmation_required",
  "not_checkable",
];

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function content(locale: "nl" | "en", profile: BenchmarkProfile, verdict: ProposalClaimVerdict) {
  const heading = locale === "nl" ? "WERKERVARING EN OPLEIDING" : "EXPERIENCE AND EDUCATION";
  const base = `${profile.role}\n${heading}\n`;
  if (verdict === "supported") return {
    cv: base + profile.supportedEvidence,
    proposal: profile.supportedClaim,
    evidence: profile.supportedEvidence,
    category: "supported_paraphrase",
    rationale: locale === "nl" ? "De kernactiviteit, omvang en context worden door de CV-bron ondersteund." : "The core activity, scope and context are supported by the CV source.",
  };
  if (verdict === "partially_supported") return {
    cv: base + profile.partialEvidence,
    proposal: profile.partialClaim,
    evidence: profile.partialEvidence,
    category: "inflated_responsibility",
    rationale: locale === "nl" ? "De bron toont betrokkenheid, maar ondersteunt de opgehoogde zelfstandigheid of eindverantwoordelijkheid niet." : "The source shows involvement but does not support the inflated independence or final accountability.",
  };
  if (verdict === "unsupported") return {
    cv: base + profile.supportedEvidence,
    proposal: profile.unsupportedClaim,
    evidence: null,
    category: profile.unsupportedCategory,
    rationale: locale === "nl" ? "De specifieke kwalificatie, vaardigheid of ervaring komt niet in de bron voor." : "The specific qualification, skill or experience is absent from the source.",
  };
  if (verdict === "contradicted") return {
    cv: base + profile.contradictionEvidence,
    proposal: profile.contradictionClaim,
    evidence: profile.contradictionEvidence,
    category: profile.contradictionCategory,
    rationale: locale === "nl" ? "Een expliciet getal, datum, kwalificatie of werkgeverscontext botst met de voorstelclaim." : "An explicit number, date, qualification or employer context conflicts with the proposal claim.",
  };
  if (verdict === "confirmation_required") return {
    cv: base + profile.supportedEvidence,
    proposal: profile.confirmationClaim,
    evidence: null,
    category: "current_commercial_fact",
    rationale: locale === "nl" ? "De claim betreft veranderlijke actuele informatie die door de kandidaat moet worden bevestigd." : "The claim concerns changing current information that requires candidate confirmation.",
  };
  return {
    cv: base + profile.supportedEvidence,
    proposal: profile.subjectiveClaim,
    evidence: null,
    category: "subjective_assessment",
    rationale: locale === "nl" ? "De subjectieve kwaliteitsbeoordeling kan niet uit een CV-bron worden vastgesteld." : "The subjective quality assessment cannot be established from a CV source.",
  };
}

export function createPublicClaimEvidenceBenchmarkV1(): ClaimEvidenceBenchmarkCaseV1[] {
  const cases: ClaimEvidenceBenchmarkCaseV1[] = [];
  for (const locale of ["nl", "en"] as const) {
    patterns.forEach((verdict, patternIndex) => {
      profiles[locale].forEach((profile, roleIndex) => {
        const generated = content(locale, profile, verdict);
        const claimStart = generated.proposal.indexOf(generated.proposal);
        const evidenceStart = generated.evidence ? generated.cv.indexOf(generated.evidence) : -1;
        const caseIndex = patternIndex * profiles[locale].length + roleIndex + 1;
        const cvText = generated.cv;
        cases.push({
          version: 1,
          caseId: `wcv-ceb-v1-${locale}-${String(caseIndex).padStart(2, "0")}`,
          locale,
          occupationalFamily: profile.family,
          seniority: profile.seniority,
          sourceFormat: (["text", "pdf", "docx"] as const)[caseIndex % 3],
          sourceDocumentVersion: "1.0.0",
          sourceChecksum: digest(cvText),
          cvText,
          proposalText: generated.proposal,
          claim: {
            text: generated.proposal,
            start: claimStart,
            end: generated.proposal.length,
            expectedVerdict: verdict,
            acceptedSourceSpan: generated.evidence ? { start: evidenceStart, end: evidenceStart + generated.evidence.length, text: generated.evidence } : null,
            errorCategory: generated.category,
            annotationRationale: generated.rationale,
          },
        });
      });
    });
  }
  return cases;
}

export const publicClaimEvidenceBenchmarkV1 = createPublicClaimEvidenceBenchmarkV1();
export const publicClaimEvidenceBenchmarkV1Checksum = digest(JSON.stringify(publicClaimEvidenceBenchmarkV1));
