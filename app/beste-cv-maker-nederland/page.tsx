import type { Metadata } from "next";
import EvidenceComparisonArticle from "@/components/seo/EvidenceComparisonArticle";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { cvDownloadPrice } from "@/lib/site-content";
import { consumerComparisonPrice, comparisonEvidenceLabel, getComparisonEvidence } from "@/lib/comparisons/evidence";

export const revalidate = 86400;

const path = "/beste-cv-maker-nederland" as const;
const pageDescription = "Vergelijk CV-makers voor Nederlandse sollicitaties op prijsmodel, preview, import en PDF-uitvoer. Zie welke keuze past bij één CV, gratis gebruik of extra begeleiding.";

export const metadata: Metadata = buildDutchMetadata({
  title: "CV-makers Nederland vergelijken: prijs, preview en PDF",
  description: pageDescription,
  path,
  type: "article",
  keywords: ["beste cv maker nederland", "cv maker vergelijken", "cv builder nederland", "cv maker prijs vergelijken", "cv maken pdf"],
  languages: {
    "nl-NL": `https://werkcv.nl${path}`,
    "x-default": `https://werkcv.nl${path}`,
  },
});

const rows = [
  {
    product: "WerkCV",
    bestFor: "Een begeleide CV-route voor Nederlandse sollicitaties.",
    price: `Bouwen en preview gratis; ${cvDownloadPrice.display} eenmalig voor de PDF van dit CV.`,
    output: "Editor, template-preview en PDF-download; opnieuw bewerken blijft mogelijk.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("werkcv-consumer-price-2026-09").status, "nl")}.`,
    href: "/prijzen",
  },
  {
    product: "YoungCapital",
    bestFor: "Wie een gratis CV-route wil verkennen.",
    price: consumerComparisonPrice("youngcapital", "nl"),
    output: "De aanbieder beschrijft gratis CV’s maken en als PDF downloaden.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("youngcapital-free-route-2026-09").status, "nl")}.`,
  },
  {
    product: "Europass",
    bestFor: "Een gestandaardiseerd Europees CV-profiel.",
    price: "Controleer de actuele voorwaarden bij Europass.",
    output: "Officiële Europass-CV-route; niet iedere Nederlandse rol vraagt om dit format.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("europass-create-cv-2026-09").status, "nl")}.`,
  },
  {
    product: "Canva",
    bestFor: "Meer visuele ontwerpcontrole.",
    price: consumerComparisonPrice("canva", "nl"),
    output: "Ontwerpgerichte templates; controleer tekstselectie en leesbaarheid vóór verzending.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("canva-free-route-2026-09").status, "nl")}.`,
  },
  {
    product: "FlowCV",
    bestFor: "Een gratis online builder als startpunt.",
    price: "Gratis aanbod gedocumenteerd; plan- en exportgrenzen kunnen wijzigen.",
    output: "Online resume builder; test het gewenste template en bestand zelf.",
    evidence: `${comparisonEvidenceLabel(getComparisonEvidence("flowcv-free-offer-2026-09").status, "nl")}.`,
  },
  {
    product: "CVMaker",
    bestFor: "Een aanbieder met een aparte prijs- en templatekeuze.",
    price: consumerComparisonPrice("cvmaker", "nl"),
    output: "Controleer actuele templates, import en export op de officiële route.",
    evidence: comparisonEvidenceLabel(getComparisonEvidence("cvmaker-terms-2026-09").status, "nl") + ".",
  },
];

const faqs = [
  { question: "Is er één beste CV-maker voor iedereen?", answer: "Nee. Kies op basis van je document, gewenste export, budget en hoeveel begeleiding je wilt. Deze pagina geeft geen universele winnaar." },
  { question: "Wat is het verschil tussen gratis bouwen en gratis downloaden?", answer: "Een aanbieder kan het maken of previewen gratis aanbieden terwijl export, een template of een betaald plan apart valt. Controleer altijd wat je precies kunt downloaden voordat je gegevens invoert." },
  { question: "Welke optie past bij één sollicitatie?", answer: `Vergelijk vooral de totale kosten en voorwaarden voor één document. WerkCV laat je gratis bouwen en previewen en rekent ${cvDownloadPrice.display} eenmalig voor de PDF van het afzonderlijke CV.` },
  { question: "Is een design-CV automatisch ATS-vriendelijk?", answer: "Nee. Een visueel aantrekkelijke template kan nog steeds lastig te lezen zijn voor software. Controleer tekstselectie, kolommen, afbeeldingen en de uiteindelijke PDF." },
  { question: "Hoe betrouwbaar zijn de gegevens op deze pagina?", answer: "De tabel toont per rij of een punt door de aanbieder is gedocumenteerd, in onze test is waargenomen of niet is geverifieerd. Prijzen en voorwaarden kunnen veranderen; controleer de officiële bron vóór betaling." },
];

export default function BesteCvMakerNederlandPage() {
  return (
    <EvidenceComparisonArticle
      locale="nl"
      path={path}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "CV-makers vergelijken", href: path }]}
      eyebrow="CV-keuze voor Nederland"
      title="CV-makers voor Nederland vergelijken: prijs, preview en PDF"
      description={pageDescription}
      reviewedLabel="Laatste controle: 10 september 2026"
      modifiedDate="2026-09-10"
      rows={rows}
      cardsTitle="Kies op basis van wat je vandaag nodig hebt"
      cards={[
        { title: "Eén CV, geen abonnement", body: `Wil je één sollicitatieversie maken? Vergelijk dan de totale downloadprijs, verlenging en wat na betaling opnieuw kan worden bewerkt. WerkCV rekent ${cvDownloadPrice.display} eenmalig voor de PDF van dit CV.` },
        { title: "Zo min mogelijk kosten", body: "Een gratis route kan voldoende zijn. Controleer wel of de gewenste export, template en tekstbewerking werkelijk zonder betaling beschikbaar zijn." },
        { title: "Meer ontwerpvrijheid", body: "Design-tools geven meer visuele keuze. Controleer daarna zelf of de tekst leesbaar blijft, vooral wanneer een werkgever met software of een ATS werkt." },
        { title: "Een gestandaardiseerd format", body: "Europass kan logisch zijn wanneer een Europese standaard belangrijk is. Het is niet automatisch de beste keuze voor iedere Nederlandse vacature." },
        { title: "Een bestaand CV importeren", body: "Vraag vóór je begint hoe secties, datums en links behouden blijven. Een mooie preview is niet genoeg wanneer inhoud verloren gaat." },
        { title: "Langdurig meerdere documenten beheren", body: "Een abonnementsplatform kan functioneel passen wanneer je langere tijd veel documenten nodig hebt. Vergelijk de doorlopende kosten met je werkelijke gebruik." },
      ]}
      methodTitle="Hoe deze vergelijking is opgebouwd"
      method={[
        "We gebruiken een taakgerichte shortlist voor Nederlandse werkzoekenden: gratis route, standaardformat, ontwerpvrijheid, bestaande CV importeren en één download.",
        "Een eigen waarneming wordt alleen zo genoemd wanneer dezelfde fictieve input en taak aantoonbaar zijn uitgevoerd; dat is voor deze eerste versie nog niet voor iedere aanbieder gebeurd.",
        "Prijs- en featuregegevens zijn gedateerd. Een officiële bron ondersteunt de documentatie, maar bewijst niet dat een product de beste keuze is.",
        "De vergelijking bevat geen ATS-acceptatiebelofte, hiring-resultaat, rangschikking of onafhankelijke producttestscore.",
      ]}
      sources={[
        { label: "CVMaker", href: getComparisonEvidence("cvmaker-terms-2026-09").sourceUrl!, note: "Officiële download- en abonnementsvoorwaarden." },
        { label: "WerkCV prijzen", href: "/prijzen", note: "De actuele consumentenprijs en betaalgrens van WerkCV." },
        { label: "YoungCapital CV-hulp", href: "https://www.youngcapital.nl/sollicitatietips/cv/gratis-cv-maken", note: "Aanbiedersbron voor de gratis CV-route; exportvoorwaarden moeten bij gebruik worden gecontroleerd." },
        { label: "Europass: Create your CV", href: "https://europass.europa.eu/en/create-europass-cv", note: "Officiële informatie over de Europass-CV-route." },
        { label: "Canva resume maker", href: "https://www.canva.com/create/resumes/", note: "Aanbiedersbron voor de ontwerpgerichte CV-route." },
        { label: "FlowCV", href: "https://flowcv.com/", note: "Aanbiedersbron die een gratis online resume-builderaanbod beschrijft." },
      ]}
      faqs={faqs}
      primaryCta={{ href: "/editor?template=professional&startSource=nl_best_cv_comparison", label: "Start gratis met je CV", trackingLocation: "nl_best_cv_comparison_hero" }}
      secondaryCta={{ href: "/templates?startSource=nl_best_cv_comparison", label: "Bekijk templates" }}
      relatedLinks={[
        { href: "/goedkoopste-cv-maker-nederland", label: "Goedkoopste CV-maker", body: "Vergelijk totale kosten, gratis routes en proefmodellen." },
        { href: "/cv-maken-zonder-abonnement", label: "CV maken zonder abonnement", body: "Lees precies wat eenmalig betalen en opnieuw downloaden betekenen." },
        { href: "/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures", label: "ATS-vriendelijke CV-builder", body: "Gebruik deze route wanneer tekstleesbaarheid de hoofdvraag is." },
        { href: "/cv-voorbeelden", label: "CV-voorbeelden", body: "Bekijk voorbeelden per rol en situatie voordat je een template kiest." },
      ]}
      disclosure="WerkCV publiceert deze vergelijking en verkoopt zijn eigen CV-builder. Daarom tonen we ook gratis alternatieven, beperkingen en niet-geverifieerde punten. Controleer de officiële voorwaarden vóór je betaalt."
    />
  );
}
