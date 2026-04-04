import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Kan ik bij WerkCV echt een CV maken zonder abonnement?",
    answer:
      "Ja. Je start gratis, bouwt je CV op en betaalt alleen eenmalig wanneer je de PDF wilt downloaden. Er is geen maandelijkse verlenging nodig.",
  },
  {
    question: "Waarom zoeken mensen op cv maken zonder abonnement?",
    answer:
      "Veel mensen willen geen doorlopend bedrag betalen voor iets wat ze meestal maar kort nodig hebben. Die zoekintentie is dus sterk commercieel en draait vooral om eerlijk prijsmodel.",
  },
  {
    question: "Is een eenmalige CV-builder minder professioneel?",
    answer:
      "Nee. De kwaliteit hangt af van templates, ATS-veiligheid en gebruiksgemak, niet van het feit of een tool met abonnement werkt. WerkCV combineert eenmalige betaling met Nederlandse sollicitatie-focus.",
  },
  {
    question: "Kan ik na betaling later nog terug naar hetzelfde CV?",
    answer:
      "Ja. Je kunt hetzelfde betaalde CV later opnieuw openen, bewerken en opnieuw downloaden zonder opnieuw voor datzelfde document te betalen.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Zonder Abonnement | Eenmalig Betalen bij WerkCV",
  description:
    "Maak je CV zonder abonnement. WerkCV laat je gratis starten en pas eenmalig betalen bij download. Vergelijk het eerlijke prijsmodel, templates en ATS-focus.",
  keywords: [
    "cv maken zonder abonnement",
    "cv zonder abonnement",
    "cv eenmalig betalen",
    "cv builder zonder abonnement",
    "goedkope cv maker nederland",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-zonder-abonnement",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-zonder-abonnement",
      "x-default": "https://werkcv.nl/cv-maken-zonder-abonnement",
    },
  },
};

export default function CvMakenZonderAbonnementPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "CV maken zonder abonnement", href: "/cv-maken-zonder-abonnement" },
      ]}
      eyebrow="Commerciële zoekintentie"
      title="CV maken zonder abonnement en zonder maandelijkse verrassing"
      description="Deze zoekopdracht heeft duidelijke koopintentie: je wilt een CV-tool die werkt, maar zonder vast te zitten aan een abonnement voor iets dat je vaak maar tijdelijk nodig hebt. WerkCV speelt daar direct op in met een eenmalig model, Nederlandse templates en een ATS-vriendelijke editorflow."
      badges={["Eenmalig €4,99", "Geen abonnement", "ATS-vriendelijk", "NL vacatures"]}
      primaryCta={{ href: "/editor", label: "Start gratis zonder abonnement" }}
      secondaryCta={{ href: "/prijzen", label: "Bekijk prijsmodel" }}
      sidebarTitle="Waarom deze route commercieel sterk is"
      sidebarItems={[
        "Je wilt eerst bouwen en pas bij download betalen.",
        "Je wilt geen maandlast voor een tijdelijk sollicitatieproces.",
        "Je zoekt een CV-tool die ook na betaling praktisch bruikbaar blijft.",
        "Je wilt templates en ATS-veiligheid zonder enterprise-achtig prijsmodel.",
      ]}
      cardsTitle="Wat WerkCV op deze zoekintentie anders maakt"
      cards={[
        {
          title: "Gratis starten, pas later beslissen",
          body: "Je kunt eerst je inhoud schrijven, template kiezen en finetunen voordat er sprake is van betaling. Dat verlaagt de drempel voor bezoekers die prijsbewust zoeken.",
        },
        {
          title: "Eenmalig betalen past beter bij sollicitatiegedrag",
          body: "Een CV-builder is voor veel mensen geen maandelijkse tool. Daarom sluit een eenmalig downloadmodel beter aan op hoe jobzoekers de tool echt gebruiken.",
        },
        {
          title: "Nederlandse sollicitatie-focus in plaats van generieke builder",
          body: "WerkCV is gericht op Nederlandse vacatures, ATS-vriendelijke output en praktische flows voor CV, profieltekst en sollicitatie.",
        },
        {
          title: "Later nog terug kunnen naar hetzelfde CV",
          body: "Voor hetzelfde betaalde document kun je blijven terugkomen, bewerken en opnieuw downloaden. Dat maakt het model eerlijker én nuttiger.",
        },
      ]}
      relatedTitle="Vergelijk direct de beste vervolgpagina's"
      relatedDescription="Gebruik deze routes als je nog specifieker wilt vergelijken op prijsmodel, builder-keuze of templates."
      relatedLinks={[
        {
          href: "/prijzen",
          label: "Prijzen",
          body: "Bekijk precies hoe het eenmalige prijsmodel werkt en wat je daarvoor krijgt.",
        },
        {
          href: "/cv-gids/beste-cv-builder-zonder-abonnement",
          label: "Beste cv builder zonder abonnement",
          body: "Vergelijk de bredere markt voor eenmalige CV-builders en prijsmodellen.",
        },
        {
          href: "/beste-cv-maker-nederland",
          label: "Beste CV maker Nederland",
          body: "Gebruik deze route als je ook templates, ATS en totaalwaarde wilt vergelijken.",
        },
        {
          href: "/templates",
          label: "Templates vergelijken",
          body: "Ga direct van prijsintentie naar het kiezen van een passende CV-layout.",
        },
      ]}
      faqs={faqs}
      footerTitle="Maak je CV zonder vast te zitten aan een abonnement"
      footerBody="Start gratis, werk alles uit in de editor en betaal pas wanneer je de definitieve versie wilt downloaden. Geen maandelijkse verrassing, wel een serieuze sollicitatieflow."
      footerPrimaryCta={{ href: "/editor", label: "Open editor" }}
      footerSecondaryCta={{ href: "/templates", label: "Bekijk templates" }}
    />
  );
}
