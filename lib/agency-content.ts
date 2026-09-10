export const AGENCY_CONTENT_PUBLISHED = "2026-08-16";
export const AGENCY_CONTENT_MODIFIED = "2026-09-10";

export type AgencyKnowledgeGuide = {
  slug: string;
  href: string;
  title: string;
  description: string;
  readingTime: string;
  status: "published" | "planned";
  theme: "emerald" | "yellow" | "sky";
};

export const agencyKnowledgeGuides: AgencyKnowledgeGuide[] = [
  {
    slug: "kandidaat-voorstellen-opdrachtgever",
    href: "/voor-bureaus/kennisbank/kandidaat-voorstellen-opdrachtgever",
    title: "Hoe stel je een kandidaat professioneel voor aan een opdrachtgever?",
    description:
      "Van klantintroductie en bewijsmatrix tot beschikbaarheid, open punten en begeleidende e-mail.",
    readingTime: "12 minuten",
    status: "published",
    theme: "emerald",
  },
  {
    slug: "kandidaatvoorstel-voorbeeld",
    href: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld",
    title: "Kandidaatvoorstel voorbeeld: van CV-bewijs naar klantintroductie",
    description:
      "Een volledig fictief voorbeeld met bronpassages, bewijsstatus, open punten, recruiterdispositie en gecontroleerde output.",
    readingTime: "8 minuten",
    status: "published",
    theme: "yellow",
  },
  {
    slug: "cv-in-huisstijl-recruitmentbureau",
    href: "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau",
    title: "Hoe zet je een kandidaat-CV in de huisstijl van je recruitmentbureau?",
    description:
      "Bewaar de bron, voeg controleerbare branding toe en controleer iedere klantversie vóór verzending.",
    readingTime: "10 minuten",
    status: "published",
    theme: "yellow",
  },
  {
    slug: "cv-anonimiseren-recruitment",
    href: "/voor-bureaus/kennisbank/cv-anonimiseren-recruitment",
    title: "CV delen zonder directe contactgegevens: wat controleer je als recruiter?",
    description:
      "Directe en indirecte identificatie, menselijke controle en documentbeheer zonder garantie op juridische anonimiteit.",
    readingTime: "12 minuten",
    status: "published",
    theme: "sky",
  },
  {
    slug: "cv-opmaak-software-vergelijken",
    href: "/voor-bureaus/kennisbank/cv-opmaak-software-vergelijken",
    title: "CV-opmaaksoftware voor recruitmentbureaus vergelijken",
    description:
      "Een taakgerichte vergelijking van CV-opmaak en kandidaatvoorstel-workflows, met bronstatus, beperkingen en vragen voor je eigen proces.",
    readingTime: "11 minuten",
    status: "published",
    theme: "emerald",
  },
  {
    slug: "kandidaat-aanbieden-overheid",
    href: "/voor-bureaus/kennisbank/kandidaat-aanbieden-overheid",
    title: "Kandidaat aanbieden bij de overheid: maak functie-eisen aantoonbaar",
    description:
      "Een praktische eisenmatrix met exact CV-bewijs, open punten, kandidaatbevestiging en recruitercontrole voor evidence-heavy overheidsopdrachten.",
    readingTime: "14 minuten",
    status: "published",
    theme: "emerald",
  },
];

export const publishedAgencyKnowledgeGuides = agencyKnowledgeGuides.filter(
  (guide) => guide.status === "published",
);
