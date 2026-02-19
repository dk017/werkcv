// Central Registry for CV Examples
// Imports all categories and examples, provides lookup functions

import { CVExampleCategory, CVExample, CVExampleWithCategory } from './types';

// ============================================================================
// CATEGORY IMPORTS
// ============================================================================
import { studentenEnStarters } from './categories/studenten-en-starters';
import { zorgEnWelzijn } from './categories/zorg-en-welzijn';
import { technologieEnIct } from './categories/technologie-en-ict';
import { vakmanschapEnLogistiek } from './categories/vakmanschap-en-logistiek';
import { onderwijs } from './categories/onderwijs';
import { horecaEnDetailhandel } from './categories/horeca-en-detailhandel';
import { zakelijkEnFinancieel } from './categories/zakelijk-en-financieel';
import { marketingEnCommunicatie } from './categories/marketing-en-communicatie';
import { juridischEnOverheid } from './categories/juridisch-en-overheid';
import { bouwEnTechniek } from './categories/bouw-en-techniek';

// ============================================================================
// EXAMPLE IMPORTS - Studenten & Starters
// ============================================================================
import { studentCv } from './examples/studenten-en-starters/student-cv';
import { afgestudeerdeCv } from './examples/studenten-en-starters/afgestudeerde-cv';
import { eersteBaanStarter } from './examples/studenten-en-starters/eerste-baan-starter';
import { stageCv } from './examples/studenten-en-starters/stage-cv';
import { bijbaanDeeltijdCv } from './examples/studenten-en-starters/bijbaan-deeltijd-cv';

// ============================================================================
// EXAMPLE IMPORTS - Zorg & Welzijn
// ============================================================================
import { verpleegkundige } from './examples/zorg-en-welzijn/verpleegkundige';
import { zorgmedewerkerHelpende } from './examples/zorg-en-welzijn/zorgmedewerker-helpende';
import { artsAnios } from './examples/zorg-en-welzijn/arts-anios';
import { ggzMedewerker } from './examples/zorg-en-welzijn/ggz-medewerker';
import { apotheekassistent } from './examples/zorg-en-welzijn/apotheekassistent';
import { opticien } from './examples/zorg-en-welzijn/opticien';

// ============================================================================
// EXAMPLE IMPORTS - Technologie & ICT
// ============================================================================
import { softwareOntwikkelaar } from './examples/technologie-en-ict/software-ontwikkelaar';
import { dataEngineer } from './examples/technologie-en-ict/data-engineer';
import { systeembeheerder } from './examples/technologie-en-ict/systeembeheerder';
import { ictProjectleider } from './examples/technologie-en-ict/ict-projectleider';
import { cybersecuritySpecialist } from './examples/technologie-en-ict/cybersecurity-specialist';
import { technischeDienst } from './examples/technologie-en-ict/technische-dienst';

// ============================================================================
// EXAMPLE IMPORTS - Vakmanschap & Logistiek
// ============================================================================
import { autotechnicus } from './examples/vakmanschap-en-logistiek/autotechnicus';
import { elektricien } from './examples/vakmanschap-en-logistiek/elektricien';
import { loodgieter } from './examples/vakmanschap-en-logistiek/loodgieter';
import { chauffeur } from './examples/vakmanschap-en-logistiek/chauffeur';
import { magazijnmedewerker } from './examples/vakmanschap-en-logistiek/magazijnmedewerker';
import { logistiekCoordinator } from './examples/vakmanschap-en-logistiek/logistiek-coordinator';

// ============================================================================
// EXAMPLE IMPORTS - Onderwijs
// ============================================================================
import { basisschoolDocent } from './examples/onderwijs/basisschool-docent';
import { onderwijsassistent } from './examples/onderwijs/onderwijsassistent';
import { docentVoortgezetOnderwijs } from './examples/onderwijs/docent-voortgezet-onderwijs';
import { gymdocent } from './examples/onderwijs/gymdocent';
import { speciaaalOnderwijs } from './examples/onderwijs/speciaal-onderwijs';

// ============================================================================
// EXAMPLE IMPORTS - Horeca & Detailhandel
// ============================================================================
import { kokChef } from './examples/horeca-en-detailhandel/kok-chef';
import { oberServeerster } from './examples/horeca-en-detailhandel/ober-serveerster';
import { hotelReceptionist } from './examples/horeca-en-detailhandel/hotel-receptionist';
import { winkelmedewerker } from './examples/horeca-en-detailhandel/winkelmedewerker';
import { filiaalmanager } from './examples/horeca-en-detailhandel/filiaalmanager';
import { cateringmedewerker } from './examples/horeca-en-detailhandel/cateringmedewerker';

// ============================================================================
// EXAMPLE IMPORTS - Zakelijk & Financieel
// ============================================================================
import { accountant } from './examples/zakelijk-en-financieel/accountant';
import { financieelAnalist } from './examples/zakelijk-en-financieel/financieel-analist';
import { controller } from './examples/zakelijk-en-financieel/controller';
import { bedrijfsadviseur } from './examples/zakelijk-en-financieel/bedrijfsadviseur';
import { inkoper } from './examples/zakelijk-en-financieel/inkoper';
import { hrMedewerker } from './examples/zakelijk-en-financieel/hr-medewerker';

// ============================================================================
// EXAMPLE IMPORTS - Marketing & Communicatie
// ============================================================================
import { marketingManager } from './examples/marketing-en-communicatie/marketing-manager';
import { socialMediaSpecialist } from './examples/marketing-en-communicatie/social-media-specialist';
import { contentSchrijver } from './examples/marketing-en-communicatie/content-schrijver';
import { prAdviseur } from './examples/marketing-en-communicatie/pr-adviseur';
import { grafischOntwerper } from './examples/marketing-en-communicatie/grafisch-ontwerper';
import { communicatieAdviseur } from './examples/marketing-en-communicatie/communicatie-adviseur';

// ============================================================================
// EXAMPLE IMPORTS - Juridisch & Overheid
// ============================================================================
import { juridischMedewerker } from './examples/juridisch-en-overheid/juridisch-medewerker';
import { beleidsadviseur } from './examples/juridisch-en-overheid/beleidsadviseur';
import { ambtenaar } from './examples/juridisch-en-overheid/ambtenaar';
import { complianceOfficer } from './examples/juridisch-en-overheid/compliance-officer';
import { advocaatStagiair } from './examples/juridisch-en-overheid/advocaat-stagiair';
import { griffier } from './examples/juridisch-en-overheid/griffier';

// ============================================================================
// EXAMPLE IMPORTS - Bouw & Techniek
// ============================================================================
import { timmerman } from './examples/bouw-en-techniek/timmerman';
import { metselaar } from './examples/bouw-en-techniek/metselaar';
import { werkvoorbereider } from './examples/bouw-en-techniek/werkvoorbereider';
import { calculator } from './examples/bouw-en-techniek/calculator';
import { projectleiderBouw } from './examples/bouw-en-techniek/projectleider-bouw';
import { installatiemonteur } from './examples/bouw-en-techniek/installatiemonteur';

// ============================================================================
// DATA COLLECTIONS
// ============================================================================

const allCategories: CVExampleCategory[] = [
    studentenEnStarters,
    zorgEnWelzijn,
    technologieEnIct,
    vakmanschapEnLogistiek,
    onderwijs,
    horecaEnDetailhandel,
    zakelijkEnFinancieel,
    marketingEnCommunicatie,
    juridischEnOverheid,
    bouwEnTechniek,
].sort((a, b) => a.order - b.order);

const allExamples: CVExample[] = [
    // Studenten & Starters
    studentCv,
    afgestudeerdeCv,
    eersteBaanStarter,
    stageCv,
    bijbaanDeeltijdCv,
    // Zorg & Welzijn
    verpleegkundige,
    zorgmedewerkerHelpende,
    artsAnios,
    ggzMedewerker,
    apotheekassistent,
    opticien,
    // Technologie & ICT
    softwareOntwikkelaar,
    dataEngineer,
    systeembeheerder,
    ictProjectleider,
    cybersecuritySpecialist,
    technischeDienst,
    // Vakmanschap & Logistiek
    autotechnicus,
    elektricien,
    loodgieter,
    chauffeur,
    magazijnmedewerker,
    logistiekCoordinator,
    // Onderwijs
    basisschoolDocent,
    onderwijsassistent,
    docentVoortgezetOnderwijs,
    gymdocent,
    speciaaalOnderwijs,
    // Horeca & Detailhandel
    kokChef,
    oberServeerster,
    hotelReceptionist,
    winkelmedewerker,
    filiaalmanager,
    cateringmedewerker,
    // Zakelijk & Financieel
    accountant,
    financieelAnalist,
    controller,
    bedrijfsadviseur,
    inkoper,
    hrMedewerker,
    // Marketing & Communicatie
    marketingManager,
    socialMediaSpecialist,
    contentSchrijver,
    prAdviseur,
    grafischOntwerper,
    communicatieAdviseur,
    // Juridisch & Overheid
    juridischMedewerker,
    beleidsadviseur,
    ambtenaar,
    complianceOfficer,
    advocaatStagiair,
    griffier,
    // Bouw & Techniek
    timmerman,
    metselaar,
    werkvoorbereider,
    calculator,
    projectleiderBouw,
    installatiemonteur,
];

// ============================================================================
// LOOKUP MAPS (built once at module init)
// ============================================================================

const categoryMap = new Map<string, CVExampleCategory>(
    allCategories.map(c => [c.slug, c])
);

const examplesByCategoryMap = new Map<string, CVExample[]>();
for (const example of allExamples) {
    const list = examplesByCategoryMap.get(example.categorySlug) ?? [];
    list.push(example);
    examplesByCategoryMap.set(example.categorySlug, list);
}

const exampleMap = new Map<string, CVExample>(
    allExamples.map(e => [`${e.categorySlug}/${e.slug}`, e])
);

// ============================================================================
// PUBLIC API
// ============================================================================

/** Get all categories sorted by display order */
export function getAllCategories(): CVExampleCategory[] {
    return allCategories;
}

/** Get a category by its slug */
export function getCategoryBySlug(slug: string): CVExampleCategory | undefined {
    return categoryMap.get(slug);
}

/** Get all examples within a category */
export function getExamplesByCategory(categorySlug: string): CVExample[] {
    return examplesByCategoryMap.get(categorySlug) ?? [];
}

/** Get a specific example by category slug and example slug */
export function getExampleBySlug(categorySlug: string, slug: string): CVExampleWithCategory | undefined {
    const example = exampleMap.get(`${categorySlug}/${slug}`);
    if (!example) return undefined;

    const category = categoryMap.get(categorySlug);
    if (!category) return undefined;

    return { ...example, category };
}

/** Get all examples (flat list) */
export function getAllExamples(): CVExample[] {
    return allExamples;
}

/** Get all category/slug pairs for generateStaticParams */
export function getAllCategoryExamplePairs(): { category: string; slug: string }[] {
    return allExamples.map(e => ({
        category: e.categorySlug,
        slug: e.slug,
    }));
}

/** Get related examples for internal linking */
export function getRelatedExamples(example: CVExample, limit = 3): CVExampleWithCategory[] {
    // Try explicit relatedSlugs first
    if (example.relatedSlugs && example.relatedSlugs.length > 0) {
        const related: CVExampleWithCategory[] = [];
        for (const slug of example.relatedSlugs.slice(0, limit)) {
            const [catSlug, exSlug] = slug.split('/');
            const resolved = getExampleBySlug(catSlug, exSlug);
            if (resolved) related.push(resolved);
        }
        if (related.length > 0) return related;
    }

    // Fallback: other examples in the same category
    const siblings = getExamplesByCategory(example.categorySlug)
        .filter(e => e.slug !== example.slug)
        .slice(0, limit);

    return siblings.map(e => {
        const category = categoryMap.get(e.categorySlug)!;
        return { ...e, category };
    });
}
