import { getAgencyReviewScopeNotice } from "@/lib/agency-review-scope";
import type { AgencyPublicCapabilities } from "@/lib/agency-public-capabilities";

export type AgencyPublicLocale = "nl" | "en";
export type AgencyEvidenceMode = "requirement_evidence" | "proposal_claim_verification";

export type AgencyPublicWorkflowStep = {
  number: string;
  title: string;
  body: string;
  tone: "highlight" | "accent" | "info" | "success";
};

export type AgencyPublicMessaging = {
  locale: AgencyPublicLocale;
  mode: AgencyEvidenceMode;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  hero: string;
  freeToolCta: string;
  checkedObject: string;
  workflow: readonly AgencyPublicWorkflowStep[];
  featureList: readonly string[];
  evidenceBenefit: string;
  limitation: string;
  faqAnswer: string;
};

type AgencyPublicMessagingInput = {
  locale: AgencyPublicLocale;
  capabilities: AgencyPublicCapabilities;
};

/**
 * The public product promise is deliberately derived from the same capability
 * flags that control the protected workflow. Keep this module free of React,
 * URLs and request state so pages, metadata and tests can share one contract.
 */
export function getAgencyPublicMessaging({
  locale,
  capabilities,
}: AgencyPublicMessagingInput): AgencyPublicMessaging {
  const verifierEnabled = capabilities.proposalClaimVerifier;

  if (locale === "en") {
    if (verifierEnabled) {
      return {
        locale,
        mode: "proposal_claim_verification",
        title: "Candidate Submission Software | MatchPack by WerkCV",
        description: "Check client-facing proposal claims against exact CV passages, keep gaps visible, and approve one controlled PDF or DOCX submission.",
        h1: "Client-ready proposals. Claims open for review.",
        eyebrow: "Candidate submission software",
        hero: "Upload an authorised candidate CV, a genuine vacancy and your client-facing draft. MatchPack shows the source passage behind each claim, keeps unresolved points visible and lets the recruiter approve the final version.",
        freeToolCta: "Check proposal claims free",
        checkedObject: "client-facing proposal claims",
        workflow: [
          { number: "01", title: "Add the sources", body: "Bring together an authorised candidate CV, the genuine vacancy and the client-facing draft.", tone: "highlight" },
          { number: "02", title: "Review extracted claims", body: "Inspect the exact CV passage behind each claim and see unsupported, contradictory or changing information.", tone: "accent" },
          { number: "03", title: "Resolve open points", body: "Record your review decision and resolve the claims that cannot be carried into the final version.", tone: "info" },
          { number: "04", title: "Export the approved version", body: "The approved introduction, selected CV and PDF/DOCX outputs come from the same controlled version.", tone: "success" },
        ],
        featureList: [
          "Exact CV source references for client-facing proposal claims",
          "Recruiter review and version history",
          "Controlled PDF and DOCX export",
          "Full and contact-reduced output",
          "CSV import and export",
        ],
        evidenceBenefit: "Exact source evidence for client-facing claims",
        limitation: "A support status describes the supplied source; it does not prove that the candidate is truthful or objectively suitable.",
        faqAnswer: "MatchPack checks whether a client-facing proposal claim is supported by the supplied CV and keeps gaps visible. It does not verify truth, identity or objective suitability; the recruiter remains responsible for the decision.",
      };
    }

    return {
      locale,
      mode: "requirement_evidence",
      title: "Candidate Submission Software | MatchPack by WerkCV",
      description: "Map selected vacancy requirements to exact passages in a candidate CV, keep missing information visible, and approve one controlled PDF or DOCX proposal.",
      h1: "Client-ready proposals. CV evidence in view.",
      eyebrow: "Candidate submission software",
      hero: "Turn a candidate CV and vacancy into a proposal you can review, edit and export as PDF or Word. See source passages and missing information before sharing.",
      freeToolCta: "Check CV evidence free",
      checkedObject: "vacancy requirements",
      workflow: [
        { number: "01", title: "Upload the source", body: "Add an authorised candidate CV and the genuine vacancy. MatchPack maps the source before drafting anything client-facing.", tone: "highlight" },
        { number: "02", title: "Review selected requirements", body: "Inspect the CV passages found for selected vacancy requirements. Check the full vacancy for omitted requirements; missing and changing information stays visible.", tone: "accent" },
        { number: "03", title: "Resolve open points", body: "Record recruiter corrections and keep facts that need a human check separate from CV evidence.", tone: "info" },
        { number: "04", title: "Export the approved version", body: "The approved introduction, selected CV and PDF/DOCX outputs come from the same controlled version.", tone: "success" },
      ],
      featureList: [
        "Exact CV source references for vacancy requirements",
        "Recruiter review and version history",
        "Controlled PDF and DOCX export",
        "Full and contact-reduced output",
        "CSV import and export",
      ],
      evidenceBenefit: "Exact CV passages for vacancy requirements",
      limitation: getAgencyReviewScopeNotice("en"),
      faqAnswer: "MatchPack checks whether vacancy requirements are supported by the supplied CV and keeps missing information visible. It does not verify truth, identity or objective suitability; the recruiter remains responsible for the decision.",
    };
  }

  if (verifierEnabled) {
    return {
      locale,
      mode: "proposal_claim_verification",
      title: "Kandidaatvoorstel-software voor recruitmentbureaus | MatchPack",
      description: "Controleer claims in een kandidaatvoorstel aan exacte CV-passages, houd open punten zichtbaar en keur één gecontroleerd PDF- of DOCX-voorstel goed.",
      h1: "Klaar voor je klant. Claims eerst gecontroleerd.",
      eyebrow: "Kandidaatvoorstel-software",
      hero: "Upload een kandidaat-CV dat je mag verwerken, een echte vacature en de klantgerichte concepttekst. MatchPack toont de bronpassage achter de gevonden claim, houdt onopgeloste punten zichtbaar en laat de recruiter de definitieve versie goedkeuren.",
      freeToolCta: "Controleer claims gratis",
      checkedObject: "claims in de klantgerichte voorsteltekst",
      workflow: [
        { number: "01", title: "Breng de bronnen samen", body: "Voeg een kandidaat-CV dat je mag verwerken, de echte vacature en de klantgerichte concepttekst samen.", tone: "highlight" },
        { number: "02", title: "Controleer de gevonden claim", body: "Bekijk de exacte CV-passage achter de gevonden claim en zie onbewezen, tegenstrijdige of veranderlijke informatie.", tone: "accent" },
        { number: "03", title: "Los open punten op", body: "Leg de recruiterbeslissing vast en los claims op die niet in de definitieve versie thuishoren.", tone: "info" },
        { number: "04", title: "Exporteer de goedgekeurde versie", body: "Introductie, gekozen CV en PDF/DOCX-output komen uit dezelfde gecontroleerde versie.", tone: "success" },
      ],
      featureList: [
        "Exacte CV-bronverwijzingen voor claims in het kandidaatvoorstel",
        "Recruiterreview en versiegeschiedenis",
        "Gecontroleerde PDF- en DOCX-export",
        "Volledig CV of zonder directe contactgegevens",
        "CSV-import en -export",
      ],
      evidenceBenefit: "Exact bronbewijs voor claims in het kandidaatvoorstel",
      limitation: "Een bronstatus beschrijft alleen ondersteuning in de aangeleverde bron; het is geen bewijs dat de kandidaat de waarheid spreekt of geschikt is.",
      faqAnswer: "MatchPack controleert of een klantclaim in het kandidaatvoorstel door het aangeleverde CV wordt ondersteund en houdt open punten zichtbaar. Het verifieert niet de waarheid, identiteit of objectieve geschiktheid; de recruiter blijft verantwoordelijk.",
    };
  }

  return {
    locale,
    mode: "requirement_evidence",
    title: "Kandidaatvoorstel-software voor recruitmentbureaus | MatchPack",
    description: "Koppel geselecteerde vacature-eisen aan exacte passages in het kandidaat-CV, houd ontbrekende informatie zichtbaar en keur één gecontroleerd PDF- of DOCX-voorstel goed.",
    h1: "Klaar voor je klant. Met CV-bewijs in beeld.",
    eyebrow: "Kandidaatvoorstel-software",
    hero: "Maak van een kandidaat-CV en vacature een voorstel dat je controleert, bewerkt en exporteert als PDF of Word. Zie bronfragmenten en ontbrekende informatie vóór het delen.",
    freeToolCta: "Controleer CV-bewijs gratis",
    checkedObject: "vacature-eisen",
    workflow: [
      { number: "01", title: "Breng de bron samen", body: "Voeg een kandidaat-CV dat je mag verwerken en de echte vacature samen. MatchPack brengt de bron in kaart voordat er klanttekst wordt gemaakt.", tone: "highlight" },
      { number: "02", title: "Controleer geselecteerde eisen", body: "Bekijk de gevonden CV-passages voor geselecteerde vacature-eisen. Controleer zelf of er eisen ontbreken; ontbrekende en veranderlijke informatie blijft zichtbaar.", tone: "accent" },
      { number: "03", title: "Los open punten op", body: "Leg recruiter-correcties vast en houd informatie die nog menselijk onderzoek vraagt apart van CV-bewijs.", tone: "info" },
      { number: "04", title: "Keur het voorstel goed", body: "Introductie, gekozen CV en PDF/DOCX-output komen uit dezelfde gecontroleerde versie.", tone: "success" },
    ],
    featureList: [
      "Exacte CV-bronverwijzingen per vacature-eis",
      "Recruiterreview en versiegeschiedenis",
      "Gecontroleerde PDF- en DOCX-export",
      "Volledig CV of zonder directe contactgegevens",
      "CSV-import en -export",
    ],
    evidenceBenefit: "Exacte CV-passages per vacature-eis",
    limitation: getAgencyReviewScopeNotice("nl"),
    faqAnswer: "MatchPack controleert of vacature-eisen door het aangeleverde CV worden ondersteund en houdt ontbrekende informatie zichtbaar. Het verifieert niet de waarheid, identiteit of objectieve geschiktheid; de recruiter blijft verantwoordelijk.",
  };
}
