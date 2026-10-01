/**
 * Real customer quotes, published with the customer's permission. Keep `quote` in the customer's own
 * words (light punctuation fixes only); `quoteNl` is a faithful translation and is labelled as such.
 */
export type Testimonial = {
  id: string;
  quote: string;
  quoteLanguage: "en" | "nl";
  quoteNl: string;
  name: string;
  placeNl: string;
  placeEn: string;
  /** When the customer wrote it, for the record. */
  writtenOn: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "john-2026-06",
    quote:
      "There are many design templates available on the site, which is great, but what was remarkable is the customer support. Very fast and fact-based answers to my questions, because of which the CV was ready within hours.",
    quoteLanguage: "en",
    quoteNl:
      "Er staan veel ontwerpen op de site, wat fijn is, maar wat echt opviel was de klantenservice. Heel snelle en feitelijke antwoorden op mijn vragen, waardoor mijn cv binnen een paar uur klaar was.",
    name: "John",
    placeNl: "Nederland",
    placeEn: "The Netherlands",
    writtenOn: "2026-06-01",
  },
];

export const FEATURED_TESTIMONIAL = TESTIMONIALS[0];
