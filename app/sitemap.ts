import { MetadataRoute } from 'next';
import { getAllCategories, getAllExamples } from '@/lib/cv-voorbeelden/registry';
import { getAllArticles } from '@/lib/cv-tips/registry';
import { getDutchWavePages, getEnglishWavePages } from '@/lib/seo-wave/data';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

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
            url: `${baseUrl}/gratis-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.91,
        },
        {
            url: `${baseUrl}/online-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cv-aanmaken`,
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
            url: `${baseUrl}/cv-tools-links`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.55,
        },
        {
            url: `${baseUrl}/curriculum-vitae-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.89,
        },
        {
            url: `${baseUrl}/cv-maken-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.88,
        },
        {
            url: `${baseUrl}/cv-maken-sjabloon`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.88,
        },
        {
            url: `${baseUrl}/cv-maken-in-word`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.88,
        },
        {
            url: `${baseUrl}/cv-maken-in-engels`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.88,
        },
        {
            url: `${baseUrl}/cv-maken-pdf`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/cv-maken-op-mobiel`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/cv-maken-student`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/cv-middelbare-school-student`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/cv-voorbeeld-student`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.86,
        },
        {
            url: `${baseUrl}/cv-voorbeeld-starter`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.86,
        },
        {
            url: `${baseUrl}/stage-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/cv-maken-15-jarige`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-maken-16-jarige`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-opmaken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/professioneel-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.86,
        },
        {
            url: `${baseUrl}/eerste-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.86,
        },
        {
            url: `${baseUrl}/mooie-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/cv-ontwerpen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/makkelijk-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/snel-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/cv-opmaak-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.87,
        },
        {
            url: `${baseUrl}/modern-cv-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
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
            url: `${baseUrl}/engels-cv-voorbeeld`,
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
            url: `${baseUrl}/professioneel-cv-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/wordpress/salaris-tools-plugin`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.56,
        },
        {
            url: `${baseUrl}/wordpress/salaris-tools-plugin/installatie`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.42,
        },
        {
            url: `${baseUrl}/wordpress/salaris-tools-plugin/privacy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.41,
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
            url: `${baseUrl}/cv-template-horeca-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/cv-template-magazijnmedewerker`,
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
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-horeca-medewerker`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-magazijnmedewerker`,
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
            url: `${baseUrl}/motivatiebrief-stage-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/motivatiebrief-schrijven`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/korte-motivatiebrief-voorbeeld`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/motivatiebrief-layout`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
        },
        {
            url: `${baseUrl}/open-sollicitatie-brief`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.83,
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
            url: `${baseUrl}/competenties-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/eigenschappen-cv-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/curriculum-vitae-template`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
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
            url: `${baseUrl}/en/templates`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.79,
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
            url: `${baseUrl}/en/english-speaking-companies-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
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
            url: `${baseUrl}/partners`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.64,
        },
        {
            url: `${baseUrl}/agency`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.66,
        },
        {
            url: `${baseUrl}/for-coaches`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.64,
        },
        {
            url: `${baseUrl}/prijzen`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-maken-zonder-abonnement`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/beste-cv-maker-nederland`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/engelstalige-bedrijven-in-nederland`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/cv-nl-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/cvmaker-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/cvster-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
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
        '30-procent-regeling-checker',
        'ats-cv-checker',
        'career-change-advisor',
        'cv-keywords',
        'cv-samenvatting-generator',
        'cv-vacature-match',
        'eindejaarsuitkering-berekenen',
        'eu-blue-card-checker',
        'job-title-translator',
        'kennismigrant-salary-checker',
        'minimumloon-checker',
        'netto-bruto-calculator',
        'opzegtermijn-berekenen',
        'opzeggingsbrief-generator',
        'parttime-salaris-calculator',
        'profieltekst-generator',
        'proeftijd-checker',
        'salaris-calculator',
        'salaris-onderhandeling',
        'sollicitatiebrief-generator',
        'sollicitatiegesprek-quiz',
        'transitievergoeding-berekenen',
        'uurloon-calculator',
        'vaardigheden-generator',
        'vakantiedagen-berekenen',
        'vakantiegeld-berekenen',
        'verlofuren-omrekenen',
        'werkervaring-bullets',
        'ww-dagloon-checker',
        'ww-duur-checker',
        'ww-recht-checker',
        'zoekjaar-checker',
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

