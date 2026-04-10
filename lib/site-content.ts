export const siteUrl = "https://werkcv.nl";
export const siteName = "WerkCV";

export const cvDownloadPrice = {
  display: "€4,99",
  value: "4.99",
  currency: "EUR",
};

export const homepageFaqItems = [
  {
    question: "Kan ik gratis beginnen met WerkCV?",
    answer:
      "Ja. Je kunt gratis starten, templates vergelijken en je CV volledig opbouwen. Je betaalt pas wanneer je je PDF wilt downloaden.",
  },
  {
    question: "Is WerkCV een abonnement?",
    answer:
      "Nee. WerkCV werkt met een eenmalige betaling per CV-download en niet met automatische verlenging of een maandabonnement.",
  },
  {
    question: "Zijn de templates ATS-vriendelijk?",
    answer:
      "Ja. De templates zijn ontworpen voor rustige scanbaarheid, duidelijke koppen en een layout die goed leesbaar blijft voor recruiters en ATS-software.",
  },
  {
    question: "Kan ik mijn CV later opnieuw aanpassen?",
    answer:
      "Ja. Je kunt hetzelfde CV later opnieuw openen, bijwerken, van template wisselen en opnieuw downloaden zonder opnieuw helemaal opnieuw te beginnen.",
  },
];

export type SiteAggregateRating = {
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
};

// Keep this null until WerkCV has a real, publicly visible rating source with a
// defensible review count. Do not invent aggregate-review data for schema.
export const siteAggregateRating: SiteAggregateRating | null = null;
