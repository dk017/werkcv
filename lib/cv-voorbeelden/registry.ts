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
import { zonderWerkervaring } from './examples/studenten-en-starters/zonder-werkervaring';
import { cv15Jarige } from './examples/studenten-en-starters/cv-15-jarige';
import { cv16Jarige } from './examples/studenten-en-starters/cv-16-jarige';
import { parttimeBaan } from './examples/studenten-en-starters/parttime-baan';
import { vakantiewerk } from './examples/studenten-en-starters/vakantiewerk';

// ============================================================================
// EXAMPLE IMPORTS - Zorg & Welzijn
// ============================================================================
import { verpleegkundige } from './examples/zorg-en-welzijn/verpleegkundige';
import { zorgmedewerkerHelpende } from './examples/zorg-en-welzijn/zorgmedewerker-helpende';
import { artsAnios } from './examples/zorg-en-welzijn/arts-anios';
import { ggzMedewerker } from './examples/zorg-en-welzijn/ggz-medewerker';
import { apotheekassistent } from './examples/zorg-en-welzijn/apotheekassistent';
import { opticien } from './examples/zorg-en-welzijn/opticien';
import { verzorgendeIg } from './examples/zorg-en-welzijn/verzorgende-ig';
import { tandarts } from './examples/zorg-en-welzijn/tandarts';

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
import { schoonmaker } from './examples/vakmanschap-en-logistiek/schoonmaker';
import { productiemedewerker } from './examples/vakmanschap-en-logistiek/productiemedewerker';
import { orderpicker } from './examples/vakmanschap-en-logistiek/orderpicker';
import { logistiekMedewerker } from './examples/vakmanschap-en-logistiek/logistiek-medewerker';
import { bezorger } from './examples/vakmanschap-en-logistiek/bezorger';
import { koerier } from './examples/vakmanschap-en-logistiek/koerier';

// ============================================================================
// EXAMPLE IMPORTS - Onderwijs
// ============================================================================
import { basisschoolDocent } from './examples/onderwijs/basisschool-docent';
import { onderwijsassistent } from './examples/onderwijs/onderwijsassistent';
import { docentVoortgezetOnderwijs } from './examples/onderwijs/docent-voortgezet-onderwijs';
import { gymdocent } from './examples/onderwijs/gymdocent';
import { speciaaalOnderwijs } from './examples/onderwijs/speciaal-onderwijs';
import { pedagogischMedewerker } from './examples/onderwijs/pedagogisch-medewerker';

// ============================================================================
// EXAMPLE IMPORTS - Horeca & Detailhandel
// ============================================================================
import { kokChef } from './examples/horeca-en-detailhandel/kok-chef';
import { oberServeerster } from './examples/horeca-en-detailhandel/ober-serveerster';
import { hotelReceptionist } from './examples/horeca-en-detailhandel/hotel-receptionist';
import { winkelmedewerker } from './examples/horeca-en-detailhandel/winkelmedewerker';
import { vakkenvuller } from './examples/horeca-en-detailhandel/vakkenvuller';
import { kassamedewerker } from './examples/horeca-en-detailhandel/kassamedewerker';
import { filiaalmanager } from './examples/horeca-en-detailhandel/filiaalmanager';
import { cateringmedewerker } from './examples/horeca-en-detailhandel/cateringmedewerker';
import { klantenserviceMedewerker } from './examples/horeca-en-detailhandel/klantenservice-medewerker';

// ============================================================================
// EXAMPLE IMPORTS - Zakelijk & Financieel
// ============================================================================
import { accountant } from './examples/zakelijk-en-financieel/accountant';
import { financieelAnalist } from './examples/zakelijk-en-financieel/financieel-analist';
import { controller } from './examples/zakelijk-en-financieel/controller';
import { bedrijfsadviseur } from './examples/zakelijk-en-financieel/bedrijfsadviseur';
import { inkoper } from './examples/zakelijk-en-financieel/inkoper';
import { hrMedewerker } from './examples/zakelijk-en-financieel/hr-medewerker';
import { administratiefMedewerker } from './examples/zakelijk-en-financieel/administratief-medewerker';
import { officeManager } from './examples/zakelijk-en-financieel/office-manager';
import { receptionist } from './examples/zakelijk-en-financieel/receptionist';
import { projectmanager } from './examples/zakelijk-en-financieel/projectmanager';

// ============================================================================
// EXAMPLE IMPORTS - Marketing & Communicatie
// ============================================================================
import { marketingManager } from './examples/marketing-en-communicatie/marketing-manager';
import { socialMediaSpecialist } from './examples/marketing-en-communicatie/social-media-specialist';
import { contentSchrijver } from './examples/marketing-en-communicatie/content-schrijver';
import { prAdviseur } from './examples/marketing-en-communicatie/pr-adviseur';
import { grafischOntwerper } from './examples/marketing-en-communicatie/grafisch-ontwerper';
import { communicatieAdviseur } from './examples/marketing-en-communicatie/communicatie-adviseur';
import { marketingMedewerker } from './examples/marketing-en-communicatie/marketing-medewerker';

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
    zonderWerkervaring,
    cv15Jarige,
    cv16Jarige,
    parttimeBaan,
    vakantiewerk,
    // Zorg & Welzijn
    verpleegkundige,
    zorgmedewerkerHelpende,
    artsAnios,
    ggzMedewerker,
    apotheekassistent,
    opticien,
    verzorgendeIg,
    tandarts,
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
    schoonmaker,
    productiemedewerker,
    orderpicker,
    logistiekMedewerker,
    bezorger,
    koerier,
    // Onderwijs
    basisschoolDocent,
    onderwijsassistent,
    docentVoortgezetOnderwijs,
    gymdocent,
    speciaaalOnderwijs,
    pedagogischMedewerker,
    // Horeca & Detailhandel
    kokChef,
    oberServeerster,
    hotelReceptionist,
    winkelmedewerker,
    vakkenvuller,
    kassamedewerker,
    filiaalmanager,
    cateringmedewerker,
    klantenserviceMedewerker,
    // Zakelijk & Financieel
    accountant,
    financieelAnalist,
    controller,
    bedrijfsadviseur,
    inkoper,
    hrMedewerker,
    administratiefMedewerker,
    officeManager,
    receptionist,
    projectmanager,
    // Marketing & Communicatie
    marketingManager,
    socialMediaSpecialist,
    contentSchrijver,
    prAdviseur,
    grafischOntwerper,
    communicatieAdviseur,
    marketingMedewerker,
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
    'studenten-en-starters/zonder-werkervaring': {
        href: '/cv-tips/cv-zonder-werkervaring',
        title: 'CV zonder werkervaring',
        description: 'Gebruik deze gids als je school, projecten, vrijwilligerswerk en vaardigheden moet vertalen naar je eerste CV.',
    },
    'studenten-en-starters/cv-15-jarige': {
        href: '/cv-maken-15-jarige',
        title: 'CV maken als 15-jarige',
        description: 'Gebruik de 15-jarige gids voor leeftijd, beschikbaarheid, bijbaanrichting en een korte eerste CV-opbouw.',
    },
    'studenten-en-starters/cv-16-jarige': {
        href: '/cv-maken-16-jarige',
        title: 'CV maken als 16-jarige',
        description: 'Gebruik de 16-jarige gids voor bijbaanervaring, beschikbaarheid en een volwassen eerste werk-CV.',
    },
    'studenten-en-starters/parttime-baan': {
        href: '/templates',
        title: 'CV templates',
        description: 'Kies een rustige template als beschikbaarheid, vaste dagen en relevante deeltijdervaring snel zichtbaar moeten zijn.',
    },
    'studenten-en-starters/vakantiewerk': {
        href: '/cv-gids/cv-voorbeeld-student-bijbaan',
        title: 'CV voorbeeld student bijbaan',
        description: 'Gebruik de student-bijbaan gids als je vakantiewerk wilt combineren met weekendwerk of schoolrooster.',
    },
    'horeca-en-detailhandel/winkelmedewerker': {
        href: '/cv-gids/cv-voorbeeld-verkoopmedewerker',
        title: 'CV voorbeeld verkoopmedewerker',
        description: 'Pak een commercielere variant als klantadvies, winkelvloer en verkoopresultaat belangrijk zijn.',
    },
    'horeca-en-detailhandel/vakkenvuller': {
        href: '/cv-gids/cv-voorbeeld-student-bijbaan',
        title: 'CV voorbeeld student bijbaan',
        description: 'Gebruik de bijbaan-gids voor een korte, overtuigende supermarkt-CV met beschikbaarheid, werktempo en betrouwbaarheid centraal.',
    },
    'horeca-en-detailhandel/kassamedewerker': {
        href: '/cv-gids/cv-voorbeeld-verkoopmedewerker',
        title: 'CV voorbeeld verkoopmedewerker',
        description: 'Gebruik de retail-gids als je kassa, klantcontact, retouren en winkelervaring sterker wilt combineren.',
    },
    'horeca-en-detailhandel/klantenservice-medewerker': {
        href: '/cv-template-klantenservice-medewerker',
        title: 'CV template klantenservice medewerker',
        description: 'Gebruik de klantenservice-templatepagina als je een rustige support-layout zoekt met klantcontact, CRM en servicevaardigheden centraal.',
    },
    'zakelijk-en-financieel/administratief-medewerker': {
        href: '/cv-template-administratief-medewerker',
        title: 'CV template administratief medewerker',
        description: 'Gebruik de administratieve templatepagina als je layout, opbouw en downloadroute voor kantoor- en backofficerollen wilt vergelijken.',
    },
    'zakelijk-en-financieel/office-manager': {
        href: '/cv-template-office-manager',
        title: 'CV template office manager',
        description: 'Bekijk de office-manager templatepagina als je kantoororganisatie, directieondersteuning en operations overzichtelijk wilt presenteren.',
    },
    'zakelijk-en-financieel/receptionist': {
        href: '/cv-gids/cv-voorbeeld-receptionist',
        title: 'CV voorbeeld receptionist',
        description: 'Gebruik de receptionist-gids als ontvangst, telefonie, planning en representatieve administratie de kern van je CV zijn.',
    },
    'zakelijk-en-financieel/projectmanager': {
        href: '/cv-gids/cv-voorbeeld-projectmanager',
        title: 'CV voorbeeld projectmanager',
        description: 'Gebruik de projectmanager-gids voor sterkere formuleringen rond scope, budget, stakeholders en opleverresultaat.',
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
    'technologie-en-ict/software-ontwikkelaar': {
        href: '/cv-template-software-ontwikkelaar',
        title: 'CV template software ontwikkelaar',
        description: 'Gebruik de developer-templatepagina als tech stack, projectimpact, GitHub en recruiter-proof bullets centraal moeten staan.',
    },
    'technologie-en-ict/systeembeheerder': {
        href: '/ats-cv-template',
        title: 'ATS CV template',
        description: 'Kies een scanbare ATS-template voor systeembeheerrollen waar tools, certificaten en infrastructuurkeywords zwaar meetellen.',
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
    'vakmanschap-en-logistiek/chauffeur': {
        href: '/cv-tips/cv-voor-uitzendbureau',
        title: 'CV voor uitzendbureau',
        description: 'Gebruik deze gids om rijbewijs, Code 95, beschikbaarheid, route-ervaring en directe inzetbaarheid scherper te presenteren.',
    },
    'vakmanschap-en-logistiek/schoonmaker': {
        href: '/templates',
        title: 'CV templates',
        description: 'Kies een eenvoudige, scanbare template als hygiëne, betrouwbaarheid en beschikbaarheid snel zichtbaar moeten zijn.',
    },
    'vakmanschap-en-logistiek/productiemedewerker': {
        href: '/cv-gids/cv-voorbeeld-productiemedewerker',
        title: 'CV voorbeeld productiemedewerker',
        description: 'Gebruik de productiegids voor sterkere formuleringen rond veiligheid, kwaliteit, output en ploegendienst.',
    },
    'vakmanschap-en-logistiek/orderpicker': {
        href: '/cv-template-magazijnmedewerker',
        title: 'CV template magazijnmedewerker',
        description: 'Gebruik de magazijn-templatepagina als orderpicking, WMS, scanner, EPT en ploegendienst overzichtelijk moeten landen.',
    },
    'vakmanschap-en-logistiek/logistiek-medewerker': {
        href: '/cv-template-magazijnmedewerker',
        title: 'CV template magazijnmedewerker',
        description: 'Gebruik de logistieke template als inbound, outbound, voorraadcontrole en transportdocumenten strak moeten worden gepresenteerd.',
    },
    'vakmanschap-en-logistiek/bezorger': {
        href: '/cv-tips/cv-voor-uitzendbureau',
        title: 'CV voor uitzendbureau',
        description: 'Gebruik deze gids als je bezorgervaring wilt vertalen naar directe inzetbaarheid voor transport, logistiek of horeca.',
    },
    'vakmanschap-en-logistiek/koerier': {
        href: '/cv-tips/cv-voor-uitzendbureau',
        title: 'CV voor uitzendbureau',
        description: 'Gebruik deze gids om rijbewijs, beschikbaarheid, route-ervaring en directe inzetbaarheid sterker te presenteren.',
    },
    'onderwijs/pedagogisch-medewerker': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Scherp de openingsalinea aan als kindontwikkeling, veiligheid en oudercontact direct vertrouwen moeten geven.',
    },
    'zorg-en-welzijn/verpleegkundige': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik sterkere openingszinnen voor zorgrollen waar verantwoordelijkheid, samenwerking en patientgerichtheid snel zichtbaar moeten zijn.',
    },
    'zorg-en-welzijn/zorgmedewerker-helpende': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Scherp je zorgprofiel aan zodat ADL, betrouwbaarheid, cliëntcontact en rapportage direct zichtbaar zijn.',
    },
    'zorg-en-welzijn/verzorgende-ig': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik zorggerichte profielteksten om diploma, doelgroep, zorghandelingen en betrouwbaarheid direct te tonen.',
    },
    'onderwijs/onderwijsassistent': {
        href: '/profieltekst-cv-voorbeelden',
        title: 'Profieltekst CV voorbeelden',
        description: 'Gebruik onderwijsgerichte profielteksten om leerlingbegeleiding, differentiatie en samenwerking sneller te laten landen.',
    },
    'marketing-en-communicatie/marketing-medewerker': {
        href: '/cv-template-marketing-medewerker',
        title: 'CV template marketing medewerker',
        description: 'Gebruik de marketing-templatepagina als je campagnes, tools en meetbare resultaten overzichtelijk wilt presenteren.',
    },
    'zakelijk-en-financieel/hr-medewerker': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Gebruik deze gids om HR-processen, AFAS, verzuim, recruitment en vertrouwelijke dossiers concreet te bewijzen.',
    },
    'zakelijk-en-financieel/controller': {
        href: '/cv-tips/cv-werkervaring-beschrijven',
        title: 'Werkervaring op je CV beschrijven',
        description: 'Gebruik deze gids om budgetscope, forecastresultaten, SAP/Power BI en business impact scherper te formuleren.',
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
