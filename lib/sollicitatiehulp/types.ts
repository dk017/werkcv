export type ApplicationHelpCategory = "taal" | "brief" | "cv";

export type ApplicationHelpExampleTone = "recommended" | "alternative" | "avoid";

export interface ApplicationHelpExample {
  label: string;
  text: string;
  explanation: string;
  tone: ApplicationHelpExampleTone;
}

export interface ApplicationHelpTable {
  headers: string[];
  rows: string[][];
}

export interface ApplicationHelpSection {
  id: string;
  title: string;
  answer?: string;
  paragraphs: string[];
  bullets?: string[];
  examples?: ApplicationHelpExample[];
  table?: ApplicationHelpTable;
}

export interface ApplicationHelpSource {
  publisher: string;
  title: string;
  url: string;
  note: string;
}

export interface ApplicationHelpFaq {
  question: string;
  answer: string;
}

export interface ApplicationHelpLink {
  href: string;
  label: string;
  description: string;
}

export interface ApplicationHelpArticle {
  slug: string;
  category: ApplicationHelpCategory;
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
  secondaryCta?: ApplicationHelpLink;
  order: number;
}

export const applicationHelpCategoryLabels: Record<ApplicationHelpCategory, string> = {
  taal: "Taal & formulering",
  brief: "Zakelijke brieven",
  cv: "Cv-kennis",
};

export const applicationHelpCategoryColors: Record<ApplicationHelpCategory, string> = {
  taal: "#FFD166",
  brief: "#4ECDC4",
  cv: "#FF8E8E",
};
