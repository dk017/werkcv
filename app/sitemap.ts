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
            url: `${baseUrl}/cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.92,
        },
        {
            url: `${baseUrl}/online-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cv-opstellen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.89,
        },
        {
            url: `${baseUrl}/cv-maken-in-engels`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.88,
        },
        {
            url: `${baseUrl}/cv-opmaak-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/gratis-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.86,
        },
        {
            url: `${baseUrl}/ats-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/modern-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-word`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/engels-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/professioneel-cv-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-administratief-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-klantenservice-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-verpleegkundige`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-software-ontwikkelaar`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-verkoopmedewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-marketing-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-office-manager`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-administratief-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-klantenservice`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-verpleegkundige`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-marketing`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-office-manager`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-verkoopmedewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-software-ontwikkelaar`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/motivatiebrief-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-in-engels`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-samenvatting-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/profieltekst-cv-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/werkervaring-cv-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/vaardigheden-cv-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/tools`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
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

    const toolSlugs = [
        'aanzegvergoeding-checker',
        'ats-cv-checker',
        'career-change-advisor',
        'cv-keywords',
        'cv-samenvatting-generator',
        'cv-vacature-match',
        'eu-blue-card-checker',
        'job-title-translator',
        'kennismigrant-salary-checker',
        'minimumloon-checker',
        'netto-bruto-calculator',
        'opzegtermijn-berekenen',
        'opzeggingsbrief-generator',
        'profieltekst-generator',
        'proeftijd-checker',
        'salaris-calculator',
        'salaris-onderhandeling',
        'sollicitatiebrief-generator',
        'sollicitatiegesprek-quiz',
        'transitievergoeding-berekenen',
        'uurloon-calculator',
        'vaardigheden-generator',
        'vakantiegeld-berekenen',
        'werkervaring-bullets',
        'ww-duur-checker',
        'ww-recht-checker',
    ];

    const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.72,
    }));

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
        ...toolPages,
        ...newCategoryPages,
        ...newExamplePages,
        ...articlePages,
        ...dutchWavePages,
        ...englishWavePages,
    ];
}
