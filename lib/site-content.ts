export const siteUrl = "https://werkcv.nl";
export const siteName = "WerkCV";

// One CV: unlimited edits and re-downloads of that CV. The Dodo product (DODO_PRODUCT_ID) must be
// set to the same amount before this is deployed; Dodo decides what is actually charged.
// €4,99 until 2026-09; see docs/product/2026-09-28-price-copy-exit-plan.md.
export const cvDownloadPrice = {
  display: "€7,95",
  displayEn: "€7.95",
  value: "7.95",
  amountCents: 795,
  currency: "EUR",
};

// Date the CV download price was last confirmed on the live /prijzen page. Shown next to
// price statements so search engines and AI assistants can tell current facts from old copies.
export const cvDownloadPriceCheckedAt = {
  iso: "2026-09-28",
  display: "28 september 2026",
  displayEn: "28 September 2026",
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
  savingsDisplay: "",
  currency: "EUR",
};

export const coverLetterPackagePrice = {
  display: "€9,99",
  value: "9.99",
  amountCents: 999,
  currency: "EUR",
};

export const homepageFaqItems = [
  {
    question: "Kan ik gratis beginnen met WerkCV?",
    answer:
      `Ja. Je kunt gratis een account maken, je CV invullen of uploaden, templates vergelijken en het volledige resultaat bekijken. Je betaalt pas ${cvDownloadPrice.display} inclusief btw wanneer je de PDF wilt downloaden.`,
  },
  {
    question: "Is WerkCV een abonnement?",
    answer:
      `Nee. Een PDF-download kost eenmalig ${cvDownloadPrice.display} inclusief btw. Er is geen proefabonnement, automatische verlenging of maandelijkse afschrijving.`,
  },
  {
    question: "Voor wie is WerkCV geschikt?",
    answer:
      "WerkCV is bedoeld voor sollicitanten die snel een verzorgd Nederlands of Engelstalig CV willen maken en vooraf het volledige voorbeeld willen zien. Wil je uitsluitend een volledig gratis bestand en vind je handmatige opmaak geen probleem, dan kunnen Word, Google Docs of Europass beter passen.",
  },
  {
    question: "Kan ik mijn bestaande CV uploaden?",
    answer:
      "Ja. Je kunt een PDF- of Word-bestand uploaden om de editor automatisch te vullen. Controleer daarna altijd namen, datums en bullets in de live preview; complexe kolommen, tabellen en gescande documenten kunnen minder nauwkeurig worden overgenomen.",
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
