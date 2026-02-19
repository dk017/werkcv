// Types for the CV Tips / Blog system

export interface ArticleSection {
    id: string;              // URL-friendly ID for anchor links
    title: string;           // Section heading (H2)
    content: string[];       // Paragraphs of text (rendered as <p> tags)
    answerCapsule?: string;  // 120-150 char direct answer for AI/featured-snippet extraction
    bullets?: string[];      // Optional bullet points rendered after content paragraphs
}

export interface ArticleFAQ {
    question: string;
    answer: string;
}

export interface BlogArticle {
    slug: string;                    // URL slug: "cv-schrijven-tips"
    title: string;                   // Article title / H1
    description: string;             // Short description for cards/listings
    publishedAt: string;             // ISO date string: "2025-01-15"
    updatedAt?: string;              // Optional update date

    // SEO
    metaTitle: string;               // <title> tag
    metaDesc: string;                // Meta description
    keywords: string[];              // SEO keywords

    // Content
    heroImage?: string;              // Optional hero image path
    readingTime: number;             // Reading time in minutes
    sections: ArticleSection[];      // Main content sections
    keyTakeaways: string[];          // Key takeaways / summary bullets

    // FAQ (renders as accordion + JSON-LD FAQPage schema)
    faq: ArticleFAQ[];

    // Internal linking
    relatedArticleSlugs: string[];   // Slugs of related blog articles
    relatedExampleSlugs: string[];   // Format: "category/slug" for CV examples

    // Display
    category: ArticleCategory;       // Grouping for visual badge
    featured?: boolean;              // Show in featured section on hub
    order: number;                   // Display order on hub page
}

export type ArticleCategory =
    | 'schrijven'       // Writing tips
    | 'solliciteren'    // Job application tips
    | 'carriere'        // Career advice
    | 'opmaak';         // Layout/formatting tips

export const articleCategoryLabels: Record<ArticleCategory, string> = {
    schrijven: 'CV Schrijven',
    solliciteren: 'Solliciteren',
    carriere: 'Carrière',
    opmaak: 'Opmaak & Design',
};

export const articleCategoryColors: Record<ArticleCategory, string> = {
    schrijven: '#FF6B6B',
    solliciteren: '#4ECDC4',
    carriere: '#FFD700',
    opmaak: '#60A5FA',
};
