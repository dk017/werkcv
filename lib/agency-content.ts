export const AGENCY_CONTENT_PUBLISHED = "2026-08-16";
export const AGENCY_CONTENT_MODIFIED = "2026-08-16";

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
    title: "Hoe stelt u een kandidaat professioneel voor aan een opdrachtgever?",
    description:
      "Van klantintroductie en bewijsmatrix tot beschikbaarheid, open punten en begeleidende e-mail.",
    readingTime: "12 minuten",
    status: "published",
    theme: "emerald",
  },
  {
    slug: "cv-in-huisstijl-recruitmentbureau",
    href: "/voor-bureaus/kennisbank/cv-in-huisstijl-recruitmentbureau",
    title: "Hoe zet u een kandidaat-CV in de huisstijl van uw recruitmentbureau?",
    description:
      "Bewaar de bron, voeg controleerbare branding toe en controleer iedere klantversie vóór verzending.",
    readingTime: "10 minuten",
    status: "published",
    theme: "yellow",
  },
  {
    slug: "cv-anonimiseren-recruitment",
    href: "/voor-bureaus/kennisbank/cv-anonimiseren-recruitment",
    title: "CV anonimiseren voor een opdrachtgever: wat moet een recruiter controleren?",
    description:
      "Directe en indirecte identificatie, menselijke controle en documentbeheer zonder garantie op juridische anonimiteit.",
    readingTime: "12 minuten",
    status: "published",
    theme: "sky",
  },
];

export const publishedAgencyKnowledgeGuides = agencyKnowledgeGuides.filter(
  (guide) => guide.status === "published",
);
