export const siteUrl = "https://werkcv.nl";
export const siteName = "WerkCV";

export const cvDownloadPrice = {
  display: "€7,99",
  value: "7.99",
  amountCents: 799,
  currency: "EUR",
};

export const profilePhotoPrice = {
  display: "€9,99",
  value: "9.99",
  amountCents: 999,
  currency: "EUR",
};

export const applicationBundlePrice = {
  display: "€14,99",
  value: "14.99",
  amountCents: 1499,
  savingsDisplay: "€2,99",
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
