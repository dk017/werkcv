import type {
  ApplicationHelpFaq,
  ApplicationHelpLink,
  ApplicationHelpSection,
  ApplicationHelpSource,
} from "@/lib/sollicitatiehulp/types";

export type SkillGuideCategory = "eigenschappen" | "denken" | "werkgedrag";

export interface SkillGuideArticle {
  slug: string;
  category: SkillGuideCategory;
  title: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  quickAnswer: string;
  keyTakeaways: string[];
  sections: ApplicationHelpSection[];
  sources: ApplicationHelpSource[];
  faqs: ApplicationHelpFaq[];
  related: ApplicationHelpLink[];
  primaryCta: ApplicationHelpLink;
  order: number;
}

export const skillGuideCategoryLabels: Record<SkillGuideCategory, string> = {
  eigenschappen: "Eigenschappen & zelfkennis",
  denken: "Denk- & leervaardigheden",
  werkgedrag: "Gedrag op het werk",
};

export const skillGuideCategoryColors: Record<SkillGuideCategory, string> = {
  eigenschappen: "#FFD166",
  denken: "#A7F3D0",
  werkgedrag: "#BFDBFE",
};
