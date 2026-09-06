/** Shared, client-safe limit. The consumer matcher and Agency projection use the same engine. */
export const MAX_REVIEWED_VACANCY_REQUIREMENTS = 8;

export function getAgencyReviewScopeNotice(locale: "nl" | "en"): string {
  return locale === "en"
    ? `First-pass review of up to ${MAX_REVIEWED_VACANCY_REQUIREMENTS} selected vacancy requirements, not an exhaustive check. Compare the result with the full vacancy and review omitted requirements yourself before sharing.`
    : `Eerste controle van maximaal ${MAX_REVIEWED_VACANCY_REQUIREMENTS} geselecteerde vacature-eisen, geen volledige controle. Vergelijk de uitslag met de hele vacature en controleer ontbrekende eisen zelf voordat je het voorstel deelt.`;
}

export const AGENCY_WORKSPACE_LANGUAGE_NOTICE = "The MatchPack workspace is currently in Dutch. Candidate documents can be generated in Dutch or English.";
