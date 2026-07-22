import { MetadataRoute } from 'next';
import { getAllCategories, getAllExamples } from '@/lib/cv-voorbeelden/registry';
import { getAllArticles } from '@/lib/cv-tips/registry';
import { getDutchWavePages, getEnglishWavePages } from '@/lib/seo-wave/data';
import { salaryRolePages } from '@/lib/tools/salary-role-pages';

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
            changeFrequency: 'monthly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/cv-aanmaken`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.81,
        },
        {
            url: `${baseUrl}/cv-opstellen`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-tools-links`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.55,
        },
        {
            url: `${baseUrl}/profielfoto-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.76,
        },
        {
            url: `${baseUrl}/en/profile-photo`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.72,
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
            changeFrequency: 'monthly',
            priority: 0.78,
        },
        {
            url: `${baseUrl}/cv-maken-template`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
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
            changeFrequency: 'monthly',
            priority: 0.73,
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
            changeFrequency: 'monthly',
            priority: 0.72,
        },
        {
            url: `${baseUrl}/snel-cv-maken`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.71,
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
            url: `${baseUrl}/cv-template-projectmanager`,
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
            url: `${baseUrl}/sollicitatiebrief-voorbeelden`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.85,
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
            url: `${baseUrl}/sollicitatiebrief-voorbeeld-projectmanager`,
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
            url: `${baseUrl}/ontslagbrief-schrijven`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/baan-wisselen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.82,
        },
        {
            url: `${baseUrl}/opzegtermijn-berekenen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.78,
        },
        {
            url: `${baseUrl}/transitievergoeding-berekenen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.78,
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
            url: `${baseUrl}/en/expat-cv-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/en/highly-skilled-migrant-cv-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-software-engineer-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-data-engineer-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-data-analyst-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-project-manager-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-business-analyst-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-product-manager-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-customer-support-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-finance-accounting-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-logistics-warehouse-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/english-cv-example-nurse-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/cv-netherlands-without-dutch-language`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.77,
        },
        {
            url: `${baseUrl}/en/dutch-cv-mistakes-english-speaking-job-seekers`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.78,
        },
        {
            url: `${baseUrl}/en/how-to-write-dutch-cv-without-speaking-dutch`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.78,
        },
        {
            url: `${baseUrl}/en/europass-vs-dutch-cv-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.76,
        },
        {
            url: `${baseUrl}/en/linkedin-to-cv-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.76,
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
            url: `${baseUrl}/en/english-cv-example-netherlands`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.74,
        },
        {
            url: `${baseUrl}/en/dutch-cv-checker`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.75,
        },
        {
            url: `${baseUrl}/en/cv-job-match-checker`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.76,
        },
        {
            url: `${baseUrl}/en/motivation-letter-netherlands`,
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
            url: `${baseUrl}/en/resume-optimizer-netherlands`,
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
            url: `${baseUrl}/cv-gids/cv-builder-opzeggen-en-alternatieven`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.79,
        },
        {
            url: `${baseUrl}/cv-gids/cv-voorbeelden-per-situatie`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.79,
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
            url: `${baseUrl}/loopbaancoach`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.78,
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
            url: `${baseUrl}/cv-maken-eenmalig-betalen`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.81,
        },
        {
            url: `${baseUrl}/cv-maken-zonder-verborgen-kosten`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.81,
        },
        {
            url: `${baseUrl}/cv-downloaden-zonder-abonnement`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.81,
        },
        {
            url: `${baseUrl}/alternatief-voor-cv-nl`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/alternatief-voor-cvster`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-maken-amsterdam`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.66,
        },
        {
            url: `${baseUrl}/cv-maken-rotterdam`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.66,
        },
        {
            url: `${baseUrl}/cv-maken-utrecht`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.66,
        },
        {
            url: `${baseUrl}/cv-optimaliseren`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-verbeteren`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-checken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/cv-nakijken`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.79,
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
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.55,
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
        'linkedin-naar-cv',
        'loonstrook-uitleggen',
        'minimumloon-checker',
        'netto-bruto-calculator',
        'opzegtermijn-berekenen',
        'opzeggingsbrief-generator',
        'overuren-berekenen',
        'parttime-salaris-calculator',
        'profieltekst-generator',
        'proeftijd-checker',
        'reiskostenvergoeding-berekenen',
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

    const highIntentToolPriority: Record<string, number> = {
        'ats-cv-checker': 0.9,
        'cv-score': 0.82,
    };

    const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
        url: `${baseUrl}/tools/${slug}`,
        changeFrequency: 'monthly' as const,
        priority: highIntentToolPriority[slug] ?? 0.72,
    }));

    const salaryRolePagesSitemap: MetadataRoute.Sitemap = salaryRolePages.map((page) => ({
        url: `${baseUrl}/salaris/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.71,
    }));

    // =========================================================================
    // NEW: /cv-voorbeelden/ pages (TS-based)
    // =========================================================================
    const newCategories = getAllCategories();
    const newCategoryPages: MetadataRoute.Sitemap = newCategories.map((cat) => ({
        url: `${baseUrl}/cv-voorbeelden/${cat.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.85,
    }));

    const newExamples = getAllExamples();
    const newExamplePages: MetadataRoute.Sitemap = newExamples.map((ex) => ({
        url: `${baseUrl}/cv-voorbeelden/${ex.categorySlug}/${ex.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    // =========================================================================
    // NEW: /cv-tips/ article pages (TS-based)
    // =========================================================================
    const articles = getAllArticles();
    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
        url: `${baseUrl}/cv-tips/${article.slug}`,
        lastModified: article.updatedAt
            ? new Date(article.updatedAt)
            : new Date(article.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
    }));

    const dutchWave = getDutchWavePages();
    const dutchWavePages: MetadataRoute.Sitemap = dutchWave.map((page) => ({
        url: `${baseUrl}/cv-gids/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.74,
    }));

    const englishWave = getEnglishWavePages().filter(
        (page) => page.slug !== 'dutch-cv-for-expats',
    );
    const englishWavePages: MetadataRoute.Sitemap = englishWave.map((page) => ({
        url: `${baseUrl}/en/guides/${page.slug}`,
        changeFrequency: 'monthly' as const,
        priority: 0.73,
    }));

    const pages = [
        ...staticPages,
        ...toolPages,
        ...salaryRolePagesSitemap,
        ...newCategoryPages,
        ...newExamplePages,
        ...articlePages,
        ...dutchWavePages,
        ...englishWavePages,
    ];

    const editoriallyDatedUrls = new Set(articlePages.map((page) => page.url));

    // Google ignores priority/changefreq. Only publish lastmod when it comes
    // from stored editorial metadata; filesystem mtimes become build timestamps
    // in Docker and would falsely claim that hundreds of pages changed together.
    return pages.map((page) => {
        const entry = { ...page };
        delete entry.changeFrequency;
        delete entry.priority;
        if (!editoriallyDatedUrls.has(entry.url)) {
            delete entry.lastModified;
        }
        return entry;
    });
}

