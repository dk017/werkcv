export interface SeoSection {
    id: string;
    title: string;
    paragraphs: string[];
    bullets?: string[];
    exampleTitle?: string;
    exampleItems?: string[];
    intentLinks?: SeoIntentLink[];
}

export interface SeoIntentLink {
    href: string;
    label: string;
    description?: string;
}

export interface SeoFaq {
    question: string;
    answer: string;
}

export interface SeoRelatedLink {
    href: string;
    title: string;
    description: string;
}

export interface SeoSourceLink {
    label: string;
    href: string;
    note?: string;
}

export interface SeoGuidePage {
    slug: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDesc: string;
    keywords: string[];
    locale: 'nl' | 'en';
    intro: string;
    sections: SeoSection[];
    checklist: string[];
    faq: SeoFaq[];
    relatedLinks: SeoRelatedLink[];
    sources?: SeoSourceLink[];
    ctaTitle: string;
    ctaText: string;
    ctaHref: string;
}
