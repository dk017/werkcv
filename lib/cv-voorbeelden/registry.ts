// Central Registry for CV Examples
// Imports all categories and examples, provides lookup functions

import { CVExampleCategory, CVExample, CVExampleInternalLink, CVExampleWithCategory } from './types';

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
import { ictMedewerker } from './examples/technologie-en-ict/ict-medewerker';

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
    ictMedewerker,
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

const exactGuideLinks: Record<string, CVExampleInternalLink> = {
    'studenten-en-starters/student-cv': {
        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
        title: 'CV voorbeeld zonder ervaring',
        description: 'Gebruik de startergids als opleiding, stage en nevenactiviteiten je belangrijkste bewijs zijn.',
    },
    'studenten-en-starters/afgestudeerde-cv': {
        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
        title: 'CV voorbeeld zonder ervaring',
        description: 'Handig als je net bent afgestudeerd en je eerste serieuze sollicitaties scherper wilt positioneren.',
    },
    'studenten-en-starters/eerste-baan-starter': {
        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
        title: 'CV voorbeeld zonder ervaring',
        description: 'Pak een concreet BOFU voorbeeld voor je eerste baan en zet stage, studie en bijbaan beter neer.',
    },
    'studenten-en-starters/stage-cv': {
        href: '/stage-cv-maken',
        title: 'Stage CV maken',
        description: 'Ga naar de stagegids als je stage-intentie, leerdoelen en praktijkervaring centraal wilt zetten.',
    },
    'studenten-en-starters/bijbaan-deeltijd-cv': {
        href: '/cv-gids/cv-voorbeeld-student-bijbaan',
        title: 'CV voorbeeld student bijbaan',
        description: 'Gebruik een korte, scanbare variant voor winkel-, horeca- of logistiek werk naast school of studie.',
    },
    'horeca-en-detailhandel/winkelmedewerker': {
        href: '/cv-gids/cv-voorbeeld-verkoopmedewerker',
        title: 'CV voorbeeld verkoopmedewerker',
        description: 'Pak een commercielere variant als klantadvies, winkelvloer en verkoopresultaat belangrijk zijn.',
    },
    'horeca-en-detailhandel/filiaalmanager': {
        href: '/cv-gids/cv-voorbeeld-verkoopmedewerker',
        title: 'CV voorbeeld verkoopmedewerker',
        description: 'Gebruik de retail-gids voor sterkere formuleringen rond omzet, teamcoordinatie en klantbeleving.',
    },
    'horeca-en-detailhandel/hotel-receptionist': {
        href: '/cv-gids/cv-voorbeeld-receptionist',
        title: 'CV voorbeeld receptionist',
        description: 'Relevant als ontvangst, reserveringen, administratie en servicegerichtheid je kernpunten zijn.',
    },
    'technologie-en-ict/ict-projectleider': {
        href: '/cv-gids/cv-voorbeeld-projectmanager',
        title: 'CV voorbeeld projectmanager',
        description: 'Gebruik de bredere projectmanager-gids voor sterkere formuleringen rond scope, governance en delivery.',
    },
    'technologie-en-ict/ict-medewerker': {
        href: '/cv-tips/ats-vriendelijk-cv',
        title: 'ATS-vriendelijk CV',
        description: 'Relevante vervolgstap voor ICT support- en werkplekrollen waar scanbare structuur en herkenbare toolnamen zwaar meewegen.',
    },
    'bouw-en-techniek/projectleider-bouw': {
        href: '/cv-gids/cv-voorbeeld-projectmanager',
        title: 'CV voorbeeld projectmanager',
        description: 'Handig als je bouw- of implementatierollen wilt vertalen naar een bredere projectmanagementpositie.',
    },
    'horeca-en-detailhandel/ober-serveerster': {
        href: '/cv-gids/cv-voorbeeld-horeca-medewerker',
        title: 'CV voorbeeld horeca medewerker',
        description: 'Gebruik de brede horeca-gids voor bediening, tempo, gastvrijheid en beschikbaarheid.',
    },
    'horeca-en-detailhandel/kok-chef': {
        href: '/cv-gids/cv-voorbeeld-horeca-medewerker',
        title: 'CV voorbeeld horeca medewerker',
        description: 'Handig als je horeca-ervaring breder wilt kaderen voor keuken, restaurant of fastservice.',
    },
    'horeca-en-detailhandel/cateringmedewerker': {
        href: '/cv-gids/cv-voorbeeld-horeca-medewerker',
        title: 'CV voorbeeld horeca medewerker',
        description: 'Pak een horeca-gids die tempo, service en inzetbaarheid in wisselende shifts beter laat landen.',
    },
    'vakmanschap-en-logistiek/magazijnmedewerker': {
        href: '/cv-gids/cv-voorbeeld-magazijnmedewerker-zonder-ervaring',
        title: 'CV voorbeeld magazijnmedewerker zonder ervaring',
        description: 'Gebruik deze variant als je ook starters, zij-instromers of kandidaten zonder warehouseverleden wilt bedienen.',
    },
    'zorg-en-welzijn/verpleegkundige': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik sterkere openingszinnen voor zorgrollen waar verantwoordelijkheid, samenwerking en patientgerichtheid snel zichtbaar moeten zijn.',
    },
};

const categoryGuideLinks: Record<string, CVExampleInternalLink> = {
    'studenten-en-starters': {
        href: '/cv-gids/cv-voorbeeld-zonder-ervaring',
        title: 'CV voorbeeld zonder ervaring',
        description: 'Gebruik deze gids om opleiding, stage, projecten en kleine jobs recruiterproof te positioneren.',
    },
    'zorg-en-welzijn': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Scherp je openingsalinea aan zodat verantwoordelijkheden, zorgkwaliteit en samenwerking sneller opvallen.',
    },
    'technologie-en-ict': {
        href: '/cv-tips/ats-vriendelijk-cv',
        title: 'ATS-vriendelijk CV',
        description: 'Relevante gids voor technische CV s waar keywords, stack-termen en scanbaarheid zwaar meewegen.',
    },
    'vakmanschap-en-logistiek': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Maak van taken rond veiligheid, tempo en uitvoering sterkere bullets met actie en resultaat.',
    },
    onderwijs: {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik sterkere openingszinnen voor onderwijsrollen waar didactiek, begeleiding en betrouwbaarheid tellen.',
    },
    'horeca-en-detailhandel': {
        href: '/cv-gids/cv-voorbeeld-horeca-medewerker',
        title: 'CV voorbeeld horeca medewerker',
        description: 'Brede BOFU gids voor horeca, service, tempo, beschikbaarheid en bijbaanachtige sollicitaties.',
    },
    'zakelijk-en-financieel': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Handig voor scherpere bullets rond controle, analyse, processen en zakelijke impact.',
    },
    'marketing-en-communicatie': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik sterkere profielteksten voor rollen waar positionering, impact en doelgroepfocus veel uitmaken.',
    },
    'juridisch-en-overheid': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Maak van dossiers, regelgeving en besluitvorming concretere, beter scanbare ervaringsteksten.',
    },
    'bouw-en-techniek': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Gebruik sterkere bullets voor oplevering, veiligheid, planning en vaktechnische uitvoering.',
    },
};

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
    const related: CVExampleWithCategory[] = [];
    const seen = new Set<string>([`${example.categorySlug}/${example.slug}`]);

    // Try explicit relatedSlugs first and then top up to the requested limit.
    if (example.relatedSlugs && example.relatedSlugs.length > 0) {
        for (const slug of example.relatedSlugs.slice(0, limit)) {
            if (seen.has(slug)) continue;
            const [catSlug, exSlug] = slug.split('/');
            const resolved = getExampleBySlug(catSlug, exSlug);
            if (!resolved) continue;
            related.push(resolved);
            seen.add(slug);
        }
    }

    if (related.length < limit) {
        const siblings = getExamplesByCategory(example.categorySlug)
            .filter(e => !seen.has(`${e.categorySlug}/${e.slug}`))
            .slice(0, limit - related.length);

        for (const sibling of siblings) {
            const category = categoryMap.get(sibling.categorySlug)!;
            related.push({ ...sibling, category });
            seen.add(`${sibling.categorySlug}/${sibling.slug}`);
        }
    }

    return related;
}

/** Get the most relevant guide-like internal link for an example page */
export function getRelatedGuideLink(example: CVExample): CVExampleInternalLink {
    const key = `${example.categorySlug}/${example.slug}`;
    return exactGuideLinks[key] ?? categoryGuideLinks[example.categorySlug] ?? {
        href: '/cv-maken',
        title: 'Hoe maak je een CV?',
        description: 'Gebruik de algemene CV-gids als je eerst structuur, volgorde en inhoud scherp wilt krijgen.',
    };
}
