import { CVData } from '@/lib/cv';

// A category groups related CV examples (e.g., "Studenten & Starters")
export interface CVExampleCategory {
    slug: string;             // URL slug: "studenten-en-starters"
    name: string;             // Dutch display name: "Studenten & Starters"
    description: string;      // Dutch SEO description
    metaTitle: string;        // <title> tag for category page
    metaDesc: string;         // Meta description for category page
    keywords: string[];       // SEO keywords
    heroTitle: string;        // H1 for the category page
    heroText: string;         // Hero paragraph
    tips: string[];           // General tips for this category
    order: number;            // Display order on overview page
}

// An individual CV example (e.g., "Verpleegkundige CV")
export interface CVExample {
    slug: string;             // URL slug: "verpleegkundige"
    categorySlug: string;     // Parent category slug: "zorg-en-welzijn"
    name: string;             // Dutch display name: "Verpleegkundige"
    description: string;      // Short description for listing cards
    sampleCV: CVData;         // The actual pre-filled sample CV data
    templateId: string;       // Best-fit template ID from registry
    colorThemeId: string;     // Best-fit color theme ID

    // SEO
    metaTitle: string;        // <title> tag
    metaDesc: string;         // Meta description
    keywords: string[];       // SEO keywords

    // Page content
    heroTitle: string;        // H1 for the example page
    heroText: string;         // Hero section description
    tips: string[];           // Specific tips for this job type

    // Internal linking
    relatedSlugs?: string[];  // Slugs of related examples (format: "category/slug")
}

// Resolved example with category info (for page rendering)
export interface CVExampleWithCategory extends CVExample {
    category: CVExampleCategory;
}
