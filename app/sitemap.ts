import { MetadataRoute } from 'next';
import { stat } from 'fs/promises';
import path from 'path';
import { getAllCategories, getAllExamples } from '@/lib/cv-voorbeelden/registry';
import { getAllArticles } from '@/lib/cv-tips/registry';
import { getDutchWavePages, getEnglishWavePages, getPilotRoleGuidePages } from '@/lib/seo-wave/data';
import { extraDutchEditorialPages } from '@/lib/seo-wave/extra-dutch-pages';
import { salaryRolePages } from '@/lib/tools/salary-role-pages';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const ROOT_DIR = process.cwd();
const dutchEditorialSlugs = new Set(extraDutchEditorialPages.map((page) => page.slug));
const pilotRoleGuideSlugs = new Set(getPilotRoleGuidePages().map((page) => page.slug));

function maxDate(dates: Date[]): Date {
    return dates.reduce((latest, current) => (
        current.getTime() > latest.getTime() ? current : latest
    ));
}

async function getExistingFileLastModified(relativePath: string): Promise<Date | null> {
    try {
        const stats = await stat(path.join(ROOT_DIR, relativePath));
        return stats.mtime;
    } catch {
        return null;
    }
}

async function getFirstExistingLastModified(relativePaths: string[]): Promise<Date> {
    for (const relativePath of relativePaths) {
        const lastModified = await getExistingFileLastModified(relativePath);
        if (lastModified) {
            return lastModified;
        }
    }

    return new Date();
}

async function getLatestExistingLastModified(relativePaths: string[]): Promise<Date> {
    const dates = (
        await Promise.all(relativePaths.map((relativePath) => getExistingFileLastModified(relativePath)))
    ).filter((date): date is Date => Boolean(date));

    return dates.length > 0 ? maxDate(dates) : new Date();
}

function routePathToPageFile(routePath: string): string {
    const normalized = routePath.replace(/^\/+|\/+$/g, '');
    return normalized ? `app/${normalized}/page.tsx` : 'app/page.tsx';
}

async function getRouteLastModified(routePath: string): Promise<Date> {
    return getFirstExistingLastModified([routePathToPageFile(routePath)]);
}

async function getCvVoorbeeldenCategoryLastModified(categorySlug: string): Promise<Date> {
    return getLatestExistingLastModified([
        `lib/cv-voorbeelden/categories/${categorySlug}.ts`,
        'app/cv-voorbeelden/[category]/page.tsx',
    ]);
}

async function getCvVoorbeeldenExampleLastModified(categorySlug: string, slug: string): Promise<Date> {
    return getLatestExistingLastModified([
        `lib/cv-voorbeelden/examples/${categorySlug}/${slug}.ts`,
        'app/cv-voorbeelden/[category]/[slug]/page.tsx',
    ]);
}

async function getSeoWaveLastModified(slug: string, locale: 'nl' | 'en'): Promise<Date> {
    if (locale === 'en') {
        return getLatestExistingLastModified([
            'lib/seo-wave/data.ts',
            'app/en/guides/[slug]/page.tsx',
        ]);
    }

    if (dutchEditorialSlugs.has(slug)) {
        return getLatestExistingLastModified([
            'lib/seo-wave/extra-dutch-pages.ts',
            'app/cv-gids/[slug]/page.tsx',
        ]);
    }

    if (pilotRoleGuideSlugs.has(slug)) {
        return getLatestExistingLastModified([
            'lib/seo-wave/programmatic-builders.ts',
            'lib/seo-wave/page-families.ts',
            'lib/seo-wave/role-taxonomy.ts',
            'app/cv-gids/[slug]/page.tsx',
        ]);
    }

    return getLatestExistingLastModified([
        'lib/seo-wave/data.ts',
        'app/cv-gids/[slug]/page.tsx',
    ]);
}

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
            url: `${baseUrl}/salaris`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
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
            url: `${baseUrl}/sollicitatiebrief-maken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
        },
        {
            url: `${baseUrl}/sollicitatiebrief-beginnen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.84,
        },
        {
            url: `${baseUrl}/motivatiebrief-zonder-werkervaring`,
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
            url: `${baseUrl}/tools/cv-score/methodologie`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.62,
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
            url: `${baseUrl}/goedkoopste-cv-maker-nederland`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.81,
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
            url: `${baseUrl}/resume-io-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/zety-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/novoresume-opzeggen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/livecareer-opzeggen`,
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
        'aow-leeftijd-checker',
        'ats-cv-checker',
        'career-change-advisor',
        'cv-score',
        'cv-keywords',
        'cv-samenvatting-generator',
        'cv-vacature-match',
        'eindejaarsuitkering-berekenen',
        'eu-blue-card-checker',
        'job-title-translator',
        'kilometervergoeding-berekenen',
        'kennismigrant-salary-checker',
        'loonstrook-uitleggen',
        'minimumloon-checker',
        'netto-bruto-calculator',
        'opzegtermijn-berekenen',
        'opzeggingsbrief-generator',
        'overuren-berekenen',
        'parttime-salaris-calculator',
        'profieltekst-generator',
        'proeftijd-checker',
        'salaris-vergelijker',
        'salaris-calculator',
        'salaris-onderhandeling',
        'sollicitatiebrief-generator',
        'sollicitatiegesprek-quiz',
        'thuiswerkvergoeding-berekenen',
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
        'ziekengeld-berekenen',
        'studieschuld-berekenen',
        'zwangerschapsverlof-berekenen',
        'zzp-uurtarief-berekenen',
    ];

    const toolPages: MetadataRoute.Sitemap = await Promise.all(toolSlugs.map(async (slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        lastModified: await getFirstExistingLastModified([`app/tools/${slug}/page.tsx`]),
        changeFrequency: 'monthly' as const,
        priority: 0.72,
    })));

    const salaryRolePagesSitemap: MetadataRoute.Sitemap = await Promise.all(salaryRolePages.map(async (page) => ({
        url: `${baseUrl}/salaris/${page.slug}`,
        lastModified: await getLatestExistingLastModified([
            'app/salaris/[slug]/page.tsx',
            'lib/tools/salary-role-pages.ts',
            'lib/tools/salary-benchmark.ts',
        ]),
        changeFrequency: 'monthly' as const,
        priority: 0.71,
    })));

    // =========================================================================
    // NEW: /cv-voorbeelden/ pages (TS-based)
    // =========================================================================
    const newCategories = getAllCategories();
    const newCategoryPages: MetadataRoute.Sitemap = await Promise.all(newCategories.map(async (cat) => ({
        url: `${baseUrl}/cv-voorbeelden/${cat.slug}`,
        lastModified: await getCvVoorbeeldenCategoryLastModified(cat.slug),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    })));

    const newExamples = getAllExamples();
    const newExamplePages: MetadataRoute.Sitemap = await Promise.all(newExamples.map(async (ex) => ({
        url: `${baseUrl}/cv-voorbeelden/${ex.categorySlug}/${ex.slug}`,
        lastModified: await getCvVoorbeeldenExampleLastModified(ex.categorySlug, ex.slug),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    })));

    // =========================================================================
    // NEW: /cv-tips/ article pages (TS-based)
    // =========================================================================
    const articles = getAllArticles();
    const articlePages: MetadataRoute.Sitemap = await Promise.all(articles.map(async (article) => ({
        url: `${baseUrl}/cv-tips/${article.slug}`,
        lastModified: maxDate([
            article.updatedAt ? new Date(article.updatedAt) : new Date(article.publishedAt),
            await getFirstExistingLastModified(['app/cv-tips/[slug]/page.tsx']),
        ]),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    })));

    const dutchWave = getDutchWavePages();
    const dutchWavePages: MetadataRoute.Sitemap = await Promise.all(dutchWave.map(async (page) => ({
        url: `${baseUrl}/cv-gids/${page.slug}`,
        lastModified: await getSeoWaveLastModified(page.slug, 'nl'),
        changeFrequency: 'monthly' as const,
        priority: 0.74,
    })));

    const englishWave = getEnglishWavePages();
    const englishWavePages: MetadataRoute.Sitemap = await Promise.all(englishWave.map(async (page) => ({
        url: `${baseUrl}/en/guides/${page.slug}`,
        lastModified: await getSeoWaveLastModified(page.slug, 'en'),
        changeFrequency: 'monthly' as const,
        priority: 0.73,
    })));

    const staticPagesWithLastModified: MetadataRoute.Sitemap = await Promise.all(staticPages.map(async (page) => ({
        ...page,
        lastModified: await getRouteLastModified(new URL(page.url).pathname),
    })));

    return [
        ...staticPagesWithLastModified,
        ...toolPages,
        ...salaryRolePagesSitemap,
        ...newCategoryPages,
        ...newExamplePages,
        ...articlePages,
        ...dutchWavePages,
        ...englishWavePages,
    ];
}

