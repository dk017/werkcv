/**
 * Canonical, fully fictional public-sector submission used by the Agency
 * acquisition guide, its matrix downloads and automated content checks.
 * Nothing in this fixture is a real candidate, vacancy or organisation.
 */

export type PublicSectorRequirementStatus =
  | "supported"
  | "partially_supported"
  | "unsupported"
  | "contradicted"
  | "confirmation_required"
  | "not_checkable";

export type PublicSectorRequirementType =
  | "knock_out"
  | "wish"
  | "current_fact"
  | "competency"
  | "portal_rule";

export type PublicSectorRequirement = {
  id: string;
  requirement: string;
  type: PublicSectorRequirementType;
  clientClaim: string;
  status: PublicSectorRequirementStatus;
  evidence: string;
  sourcePage: string;
  sourceSection: string;
  explanation: string;
  candidateConfirmation: string;
  disposition: string;
};

export const agencyPublicSectorExample = {
  notice: "Volledig fictief voorbeeld — kandidaat, organisatie, opdracht en CV-inhoud zijn verzonnen.",
  candidate: {
    name: "Sanne Jansen",
    title: "Senior HR-adviseur",
    location: "Utrecht",
  },
  vacancy: {
    title: "Senior HR-adviseur",
    organisation: "Gemeente Rivierenstad",
    assignment: "Fictieve overheidsopdracht voor HR-advies en duurzame inzetbaarheid.",
    checkedOn: "3 september 2026",
  },
  clientIntroduction: "Sanne heeft ruim zeven jaar ervaring als HR-adviseur en adviseerde volgens haar CV 24 teamleiders over verzuim, functioneren en personeelsplanning. De specifieke AFAS-ervaring, cao VVT-werkervaring en startdatum zijn nog niet als CV-bewijs onderbouwd.",
  emailExcerpt: "Beste opdrachtgever,\n\nGraag stel ik Sanne Jansen voor voor de rol Senior HR-adviseur. De onderbouwde eisen, open punten en actuele kandidaatbevestigingen staan in het bijgevoegde voorstel.\n\nMet vriendelijke groet,",
  finalOutputPreview: {
    selectedOutput: "Volledig kandidaatvoorstel · gecontroleerde CV-versie",
    recipient: "Gemeente Rivierenstad",
    vacancy: "Senior HR-adviseur",
    included: "Onderbouwde opleiding, senioriteit, Power BI en adviesomvang; open punten blijven zichtbaar.",
    notIncluded: "AFAS-workflows, cao VVT-werkervaring, beschikbaarheid en tarief worden niet als CV-feit gedeeld zonder nadere bron of kandidaatbevestiging.",
  },
  sourceSections: [
    {
      id: "profile",
      page: "1",
      section: "Profiel",
      text: "Senior HR-adviseur met ruim zeven jaar ervaring in verzuimbegeleiding, organisatieadvies en leidinggevenden adviseren.",
    },
    {
      id: "experience-1",
      page: "1",
      section: "Werkervaring · Fictieve Zorggroep Middenland",
      text: "Adviseerde 24 teamleiders over verzuim, functioneren en personeelsplanning.",
    },
    {
      id: "experience-2",
      page: "2",
      section: "Werkervaring · Fictieve Zorggroep Middenland",
      text: "Begeleidde dossiers volgens interne verzuimprocedures en werkte samen met de arbodienst.",
    },
    {
      id: "systems",
      page: "2",
      section: "Vaardigheden",
      text: "Power BI: onderhoud van HR-dashboard voor verzuim en bezetting.",
    },
    {
      id: "education",
      page: "2",
      section: "Opleiding",
      text: "Hbo Human Resource Management — Hogeschool Rivierenland, 2013–2017.",
    },
    {
      id: "sector",
      page: "2",
      section: "Opleiding en cursussen",
      text: "Cursus cao Jeugdzorg en arbeidsrecht — Academie voor Zorgwerk, 2022.",
    },
  ],
  requirements: [
    {
      id: "education",
      requirement: "Afgeronde hbo-opleiding Human Resource Management of vergelijkbaar.",
      type: "knock_out" as const,
      clientClaim: "Sanne heeft een afgeronde hbo-opleiding HRM.",
      status: "supported" as const,
      evidence: "Hbo Human Resource Management — Hogeschool Rivierenland, 2013–2017.",
      sourcePage: "2",
      sourceSection: "Opleiding",
      explanation: "De opleiding en periode staan expliciet in de bron.",
      candidateConfirmation: "Niet nodig voor de bronrelatie; recruiter controleert het originele CV.",
      disposition: "Behouden",
    },
    {
      id: "seniority",
      requirement: "Minimaal vijf jaar werkervaring als zelfstandig HR-adviseur.",
      type: "knock_out" as const,
      clientClaim: "Sanne heeft ruim zeven jaar ervaring als HR-adviseur.",
      status: "supported" as const,
      evidence: "Senior HR-adviseur met ruim zeven jaar ervaring in verzuimbegeleiding, organisatieadvies en leidinggevenden adviseren.",
      sourcePage: "1",
      sourceSection: "Profiel",
      explanation: "De bron noemt de duur en de relevante adviescontext; werkperiodes blijven een recruitercontrole.",
      candidateConfirmation: "Niet nodig voor de bronrelatie.",
      disposition: "Behouden; controleer werkperiodes",
    },
    {
      id: "absence-law",
      requirement: "Aantoonbare ervaring met complexe verzuimdossiers en de Wet verbetering poortwachter.",
      type: "knock_out" as const,
      clientClaim: "Sanne begeleidde complexe verzuimdossiers volgens de Wet verbetering poortwachter.",
      status: "partially_supported" as const,
      evidence: "Begeleidde dossiers volgens interne verzuimprocedures en werkte samen met de arbodienst.",
      sourcePage: "2",
      sourceSection: "Werkervaring · Fictieve Zorggroep Middenland",
      explanation: "Verzuimdossiers en arbodienst staan in de bron, maar complexiteit en de specifieke wet worden niet genoemd.",
      candidateConfirmation: "Vraag de kandidaat naar de concrete wettelijke/proceservaring.",
      disposition: "Herschrijf voorzichtiger of vraag nadere onderbouwing",
    },
    {
      id: "afas",
      requirement: "Ruime AFAS-ervaring, inclusief zelfstandig workflows configureren en beheren.",
      type: "knock_out" as const,
      clientClaim: "Sanne configureert en beheert zelfstandig AFAS-workflows.",
      status: "unsupported" as const,
      evidence: "Geen exact CV-bewijs gevonden.",
      sourcePage: "—",
      sourceSection: "Niet aanwezig in bron-CV",
      explanation: "De bron noemt geen AFAS en geen workflowconfiguratie.",
      candidateConfirmation: "Vraag de kandidaat alleen na als de opdrachtgever dit vereist; label een antwoord als kandidaatbevestiging.",
      disposition: "Niet als CV-feit opnemen",
    },
    {
      id: "sector",
      requirement: "Aantoonbare werkervaring binnen de cao VVT.",
      type: "knock_out" as const,
      clientClaim: "Sanne heeft werkervaring binnen de cao VVT.",
      status: "contradicted" as const,
      evidence: "Cursus cao Jeugdzorg en arbeidsrecht — Academie voor Zorgwerk, 2022.",
      sourcePage: "2",
      sourceSection: "Opleiding en cursussen",
      explanation: "De bron ondersteunt een cursus over cao Jeugdzorg, niet werkervaring binnen cao VVT. Dit is een attributie- en inhoudsrisico.",
      candidateConfirmation: "Vraag naar werkervaring binnen cao VVT en leg de werkgever/periode vast voordat je dit claimt.",
      disposition: "Verwijderen of handmatig uitzoeken",
    },
    {
      id: "power-bi",
      requirement: "Ervaring met het bouwen of onderhouden van HR-dashboards in Power BI.",
      type: "wish" as const,
      clientClaim: "Sanne onderhoudt HR-dashboards in Power BI.",
      status: "supported" as const,
      evidence: "Power BI: onderhoud van HR-dashboard voor verzuim en bezetting.",
      sourcePage: "2",
      sourceSection: "Vaardigheden",
      explanation: "Power BI, het dashboard en de onderhoudsactiviteit worden expliciet genoemd.",
      candidateConfirmation: "Niet nodig voor de bronrelatie; controleer omvang en periode indien commercieel relevant.",
      disposition: "Behouden",
    },
    {
      id: "team-leaders",
      requirement: "Ervaring met het adviseren van ten minste twintig leidinggevenden.",
      type: "knock_out" as const,
      clientClaim: "Sanne adviseerde 24 teamleiders.",
      status: "supported" as const,
      evidence: "Adviseerde 24 teamleiders over verzuim, functioneren en personeelsplanning.",
      sourcePage: "1",
      sourceSection: "Werkervaring · Fictieve Zorggroep Middenland",
      explanation: "De bron bevat de numerieke omvang en de doelgroep.",
      candidateConfirmation: "Niet nodig voor de bronrelatie.",
      disposition: "Behouden",
    },
    {
      id: "availability",
      requirement: "Beschikbaar voor 32–36 uur per week vanaf 1 oktober 2026.",
      type: "current_fact" as const,
      clientClaim: "Sanne is beschikbaar voor 32–36 uur vanaf 1 oktober 2026.",
      status: "confirmation_required" as const,
      evidence: "Geen exact CV-bewijs gevonden.",
      sourcePage: "—",
      sourceSection: "Niet aanwezig in bron-CV",
      explanation: "Beschikbaarheid is veranderlijk en hoort niet als CV-feit te worden afgeleid.",
      candidateConfirmation: "Vraag de kandidaat en toon het antwoord apart als bevestigde actuele informatie.",
      disposition: "Open laten totdat kandidaat bevestigt",
    },
    {
      id: "rate",
      requirement: "Salaris of tarief volgens de commerciële afspraak.",
      type: "current_fact" as const,
      clientClaim: "Het afgesproken tarief is €95 per uur.",
      status: "confirmation_required" as const,
      evidence: "Geen exact CV-bewijs gevonden.",
      sourcePage: "—",
      sourceSection: "Niet aanwezig in bron-CV",
      explanation: "Een tarief is een actuele commerciële afspraak, geen bronfeit uit een CV.",
      candidateConfirmation: "Bevestig tarief en deel het alleen volgens de afgesproken commerciële workflow.",
      disposition: "Niet opnemen zonder bevestiging",
    },
  ] satisfies PublicSectorRequirement[],
} as const;

export const agencyPublicSectorMatrixColumns = [
  "Requirement number",
  "Exact requirement",
  "Requirement type",
  "Proposed client-facing claim",
  "Exact CV evidence",
  "Source page/section",
  "Evidence status",
  "Risk or gap",
  "Candidate confirmation needed",
  "Recruiter disposition",
  "Reviewer",
  "Review date",
  "Next action",
] as const;

export function getAgencyPublicSectorSourceText(): string {
  return agencyPublicSectorExample.sourceSections
    .map((section) => `[Page ${section.page} · ${section.section}]\n${section.text}`)
    .join("\n\n");
}

export function getAgencyPublicSectorMatrixRows(): Array<Record<string, string>> {
  return agencyPublicSectorExample.requirements.map((item, index) => ({
    "Requirement number": String(index + 1),
    "Exact requirement": item.requirement,
    "Requirement type": item.type,
    "Proposed client-facing claim": item.clientClaim,
    "Exact CV evidence": item.evidence,
    "Source page/section": item.sourcePage === "—" ? item.sourceSection : `Page ${item.sourcePage} · ${item.sourceSection}`,
    "Evidence status": item.status,
    "Risk or gap": item.explanation,
    "Candidate confirmation needed": item.candidateConfirmation,
    "Recruiter disposition": item.disposition,
    Reviewer: "",
    "Review date": "",
    "Next action": item.disposition,
  }));
}
