import { MetadataRoute } from 'next';
import { getAllCategories, getAllExamples } from '@/lib/cv-voorbeelden/registry';
import { getAllArticles } from '@/lib/cv-tips/registry';
import { getDutchWavePages, getEnglishWavePages } from '@/lib/seo-wave/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://werkcv.nl';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/en`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/dutch-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/netherlands-cv-format`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/dutch-cv-examples`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/ats-resume-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/cv-or-resume-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/guides`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.78,
        },
        {
            url: `${baseUrl}/cv-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cv-tips`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cv-gids`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/prijzen`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/faq`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/over-ons`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/voorwaarden`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ];

    // =========================================================================
    // NEW: /cv-voorbeelden/ pages (TS-based)
    // =========================================================================
    const newCategories = getAllCategories();
    const newCategoryPages: MetadataRoute.Sitemap = newCategories.map((cat) => ({
        url: `${baseUrl}/cv-voorbeelden/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }));

    const newExamples = getAllExamples();
    const newExamplePages: MetadataRoute.Sitemap = newExamples.map((ex) => ({
        url: `${baseUrl}/cv-voorbeelden/${ex.categorySlug}/${ex.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // =========================================================================
    // NEW: /cv-tips/ article pages (TS-based)
    // =========================================================================
    const articles = getAllArticles();
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/cv-tips/${article.slug}`,
        lastModified: article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }));

    const dutchWave = getDutchWavePages();
    const dutchWavePages: MetadataRoute.Sitemap = dutchWave.map((page) => ({
        url: `${baseUrl}/cv-gids/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.74,
    }));

    const englishWave = getEnglishWavePages();
    const englishWavePages: MetadataRoute.Sitemap = englishWave.map((page) => ({
        url: `${baseUrl}/en/guides/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.73,
    }));

    return [
        ...staticPages,
        ...newCategoryPages,
        ...newExamplePages,
        ...articlePages,
        ...dutchWavePages,
        ...englishWavePages,
    ];
}
