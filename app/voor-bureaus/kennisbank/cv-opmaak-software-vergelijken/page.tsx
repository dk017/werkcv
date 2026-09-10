import { agencyComparisonProfiles } from "@/lib/comparisons/agency-profiles";
import type { Metadata } from "next";
import AgencyGuideArticle, { type AgencyGuideArticleProps } from "@/components/agency/AgencyGuideArticle";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { AGENCY_MONTHLY_CREDIT_LIMIT, getAgencyMonthlyPriceDisplay } from "@/lib/agency-plan";
import { agencyBuyingGuideModified, getAgencyComparisonUsageExamples } from "@/lib/agency-buying-guide";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";

const slug = "cv-opmaak-software-vergelijken";
const route = getAgencyAcquisitionRoute(`/voor-bureaus/kennisbank/${slug}`)!;
const pageUrl = `https://werkcv.nl${route.path}`;
const capabilities = getAgencyPublicCapabilities();
const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");
const allocationRows = getAgencyComparisonUsageExamples().map(({ items, display }) => [
  `${items} creditverbruikende items`,
  `${display} toegerekend per item`,
  "De volledige maandprijs blijft verschuldigd; dit is geen los tarief of gemeten besparing.",
] as [string, string, string]);

export const metadata: Metadata = {
  title: route.title,
  description: route.description,
  alternates: { canonical: pageUrl },
  openGraph: { title: route.title, description: route.description, url: pageUrl, type: "article", locale: "nl_NL" },
};

const guide: AgencyGuideArticleProps = {
  slug,
  modified: agencyBuyingGuideModified,
  title: route.h1,
  description: route.description,
  intro: "Voor een recruitmentbureau zijn CV-opmaak en kandidaatvoorstel-review niet hetzelfde probleem. Deze gids helpt je software vergelijken op het werk dat je werkelijk wilt uitvoeren: een herkenbare huisstijl, een controleerbare introductie, een vaste export of een koppeling met je bestaande ATS.",
  readingTime: "11 minuten",
  sections: [
    {
      eyebrow: "Begin bij de handeling",
      title: "Welke taak wil je herhalen?",
      paragraphs: [
        "Een formatter kan vooral een vaste CV-opmaak leveren. Een ATS kan het bestaande kandidaatproces ondersteunen. Een voorstelworkflow kan vacaturecontext, bronpassages en recruiterbeslissingen bij elkaar brengen. Zet deze taken niet op één hoop en vraag een leverancier welke stap hij aantoonbaar ondersteunt.",
      ],
      table: {
        columns: ["Primaire taak", "Wanneer passend", "Wat je zelf moet controleren"],
        rows: [
          ["CV in bureauhuisstijl", "Je wilt herhaalbare logo-, kleur- en sectiestijlen voor veel kandidaten.", "Behoud van functietitels, werkgevers, datums, resultaten en een vaste PDF/DOCX-export."],
          ["Kandidaatvoorstel reviewen", "Je wilt vacature-eisen naast broninformatie leggen en open punten zichtbaar houden.", "Bronlocatie, bewijsstatus, recruiterdispositie, versieverschil en wat werkelijk naar de klant gaat."],
          ["Werken binnen het ATS", "Je ATS beheert al de kandidaatdata en export die je nodig hebt.", "Templatebeperkingen, parsergedrag, eigenaarschap van wijzigingen en eventuele native synchronisatie."],
        ],
      },
    },
    {
      eyebrow: "Naam is geen bewijs",
      title: "Taakgerichte vergelijking van Agency-software",
      paragraphs: [
        "Gecontroleerd op 10 september 2026 aan de hand van officiële product- en prijspagina’s. De functies zijn door de aanbieders beschreven; we hebben de producten niet hands-on getest. Credits, kandidaten per jaar en actieve profielen zijn verschillende rekeneenheden. Vergelijk ook looptijd, btw en inrichting.",
      ],
      table: {
        columns: ["Product / route", "Gedocumenteerde werkwijze", "Prijs, limieten en controle"],
        rows: [
          ["WerkCV MatchPack", "Aanvullende reviewroute met geselecteerde vacature-eisen, CV-bewijs, open punten, recruiterreview en PDF/DOCX-uitvoer uit de goedgekeurde versie.", `${monthlyPrice} per maand; ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde credits. CSV-overdracht; geen native ATS-koppeling.`],
          ...agencyComparisonProfiles.map((profile): [string, string, string] => [profile.product, profile.workflow, `${profile.price} ${profile.check}`]),
        ],
      },
    },
    {
      eyebrow: "Stel dezelfde vragen",
      title: "Wat moet je tijdens een demo of test vastleggen?",
      bullets: [
        "Kan de tool een bestaand PDF- of DOCX-CV verwerken zonder secties, datums of links stilzwijgend te veranderen?",
        "Kan je per klantclaim de bron, status en reden terugvinden, of krijg je alleen een algemene samenvatting?",
        "Blijven onbevestigde beschikbaarheid, salaris, locatie en startdatum zichtbaar als open punt?",
        "Wie mag corrigeren, goedkeuren, exporteren en verwijderen? Bestaat versiegeschiedenis?",
        "Is PDF en DOCX uit dezelfde goedgekeurde inhoud gemaakt, en heb je beide visueel gecontroleerd?",
        "Is er CSV-uitwisseling of een native ATS-koppeling? Meet de extra handmatige overdracht in je eigen proces.",
        "Welke bewaartermijn, verwijdering, DPA- en subverwerkersinformatie krijg je vóór verwerking van kandidaatdata?",
      ],
    },
    {
      eyebrow: "Werkelijk gebruik",
      title: "Wat betekent de Agency-prijs bij verschillend volume?",
      paragraphs: [
        `De huidige MatchPack-billing tier is ${monthlyPrice} voor ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits. De tabel deelt de maandprijs door het aantal creditverbruikende items; het zijn rekenvoorbeelden, geen losse tarieven, kortingen of gemeten rendementen.`,
      ],
      table: { columns: ["Werkelijk gebruik", "Toegerekende maandprijs", "Belangrijke nuance"], rows: allocationRows },
    },
    {
      eyebrow: "Waar MatchPack past",
      title: "Wanneer is deze route logisch — en wanneer niet?",
      paragraphs: [
        "MatchPack kan passen wanneer je regelmatig vacaturegerichte kandidaatvoorstellen maakt en bron, open punten, recruiterreview en export in één aanvullende werkruimte wilt controleren. Het vervangt je ATS niet.",
        "Een bestaande Word-template kan logischer zijn bij incidentele cosmetische opmaak. Een ATS-formatter kan logischer zijn wanneer native synchronisatie het zwaarste criterium is. Een ander specialistisch product kan logischer zijn wanneer het aantoonbaar betere output of teamcontrole levert voor jouw proces.",
        "Je kunt de goedgekeurde klantversie als PDF en DOCX exporteren. Je team kan bureauhuisstijl, rollen en versiegeschiedenis gebruiken.",
        ...(capabilities.candidateAcknowledgement ? ["Je kunt de kandidaat de te delen versie laten bekijken en informatie laten bevestigen."] : []),
        ...(capabilities.proposalClaimVerifier ? ["Je kunt klantgerichte claims op ondersteuning door de aangeleverde bron controleren."] : []),
      ],
      bullets: [
        "Geen kandidaatselectie, ranking of geschiktheidsadvies.",
        "Geen bewijs dat kandidaatfeiten objectief waar zijn.",
        "Geen native ATS-synchronisatie of automatisch versturen.",
        "Geen garantie op AVG-compliance of juridische anonimiteit.",
        "Geselecteerde eisen zijn niet hetzelfde als volledige uitputtende claimverificatie.",
      ],
      links: [
        { label: "Bekijk het volledig fictieve kandidaatvoorstel", href: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" },
        { label: "Lees de privacy- en retentie-informatie", href: "/agency/privacy" },
      ],
    },
    {
      eyebrow: "Onderzoekstatus",
      title: "Wat is in deze versie nog niet onafhankelijk getest?",
      paragraphs: [
        "Deze pagina publiceert geen overall score. De vier alternatieven zijn vergeleken op officiële documentatie. Er zijn geen gelijkwaardige hands-on tests of eigen klantresultaten opgenomen. De juiste volgende stap is dezelfde fictieve CV- en voorsteltest uitvoeren wanneer je toegang en toestemming hebt; daarna kunnen afzonderlijke observaties worden toegevoegd met datum en artifact.",
        "WerkCV publiceert deze vergelijking en verkoopt MatchPack. De vergelijking is daarom een transparante keuzehulp, geen onafhankelijke certificering. Gebruik de bronlinks en vraag vóór aankoop naar de actuele voorwaarden.",
      ],
    },
  ],
  faqs: [
    { question: "Vervangt MatchPack ons ATS?", answer: "Nee. MatchPack is een aanvullende voorbereidings- en reviewroute. CSV-uitwisseling is mogelijk; native ATS-synchronisatie is geen onderdeel van de huidige openbare productbeschrijving." },
    { question: "Zijn alle genoemde tools getest?", answer: "Nee. In deze versie is de shortlist transparant opgenomen, maar de functies en prijsmodellen zijn gecontroleerd in officiële documentatie. De producten zijn niet hands-on getest; uitvoerkwaliteit moet je met je eigen fictieve test beoordelen." },
    { question: "Wat is het verschil tussen CV-opmaak en kandidaatvoorstel-review?", answer: "Opmaak richt zich op presentatie en output. Review koppelt vacaturecontext aan broninformatie, open punten en recruiterbeslissingen. Een leverancier kan het ene wel en het andere niet ondersteunen." },
    { question: "Wat kost MatchPack per CV?", answer: "De maandprijs is een vaste billing tier met gedeelde credits. De toegerekende prijs per item hangt af van je werkelijke gebruik; bij lage volumes is die rekensom geen los tarief of besparing." },
    { question: "Kan MatchPack kandidaatfeiten verifiëren?", answer: "Nee. Het maakt de bronrelatie en open punten zichtbaar; het bewijst niet dat een kandidaat de waarheid spreekt en neemt geen hiring-beslissing." },
  ],
  sources: [
    { label: "WerkCV Agency-productpagina", href: "/agency", note: "Huidige openbare productgrenzen, workflow en planinformatie." },
    { label: "WerkCV fictief kandidaatvoorstel", href: "/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld", note: "Gratis voorbeeld met bronpassages, status, recruiteractie en PDF/DOCX-downloads." },
    ...agencyComparisonProfiles.flatMap((profile) => profile.sources.map((source) => ({ label: `${profile.product}: ${source.label}`, href: source.href, note: "Officiële aanbiedersbron, gecontroleerd op 10 september 2026. Geen onafhankelijke producttest." }))),
    { label: "NVP Sollicitatiecode", href: "https://www.nvp-hrnetwerk.nl/sollicitatiecode", note: "Nederlandse context voor zorgvuldigheid, transparantie en vertrouwelijkheid in werving." },
  ],
  ctaTitle: "Bekijk eerst het bewijs in een fictief voorstel",
  ctaText: "Vergelijk bron, open punten, recruiterdispositie en klantoutput voordat je beslist of MatchPack bij je bureauproces past.",
};

export default function CvOpmaakSoftwareVergelijkenPage() {
  return <AgencyGuideArticle {...guide} />;
}
