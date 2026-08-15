export const AGENCY_CONTENT_PUBLISHED = "2026-08-15";
export const AGENCY_CONTENT_MODIFIED = "2026-08-15";

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
    title: "Hoe maakt u kandidaat-CV's consistent zonder de inhoud te veranderen?",
    description:
      "Een praktische controleaanpak voor bronbestand, opmaak, voorblad en inhoudelijke wijzigingen.",
    readingTime: "Gids in voorbereiding",
    status: "planned",
    theme: "yellow",
  },
  {
    slug: "cv-anonimiseren-recruitment",
    href: "/voor-bureaus/kennisbank/cv-anonimiseren-recruitment",
    title: "Wat moet u controleren voordat u een geredigeerd CV deelt?",
    description:
      "Directe en indirecte identificatie, menselijke controle en veilig documentbeheer uitgelegd.",
    readingTime: "Gids in voorbereiding",
    status: "planned",
    theme: "sky",
  },
];

export const publishedAgencyKnowledgeGuides = agencyKnowledgeGuides.filter(
  (guide) => guide.status === "published",
);
