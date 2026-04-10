import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Wat maakt een CV maker de beste keuze in Nederland?",
    answer:
      "Voor Nederlandse sollicitaties draait het vooral om gebruiksgemak, ATS-vriendelijke output, duidelijke templates, eerlijk prijsmodel en een workflow die aansluit op Nederlandse vacatures.",
  },
  {
    question: "Is de goedkoopste CV maker automatisch de beste?",
    answer:
      "Nee. Goedkoop is pas waardevol als de templates professioneel zijn en het eindresultaat recruiter-proof is. De beste keuze combineert prijs, kwaliteit en praktische bruikbaarheid.",
  },
  {
    question: "Waarom past WerkCV goed in deze vergelijking?",
    answer:
      "WerkCV combineert eenmalige betaling, Nederlandse sollicitatie-focus, ATS-vriendelijke templates en een duidelijke editorflow zonder abonnementsdruk.",
  },
  {
    question: "Moet ik builders vergelijken op templates of op prijs?",
    answer:
      "Allebei. Templates bepalen hoe professioneel je CV oogt, maar het prijsmodel bepaalt of de tool logisch voelt voor een kort sollicitatieproces.",
  },
];

export const metadata: Metadata = {
  title: "Beste CV Maker Nederland | Templates, ATS en Prijs Vergelijken",
  description:
    "Vergelijk de beste CV makers in Nederland op prijs, templates, ATS-vriendelijkheid en gebruiksgemak. Ontdek wanneer WerkCV beter past dan abonnementsmodellen.",
  keywords: [
    "beste cv maker nederland",
    "cv maker vergelijken",
    "beste cv builder nederland",
    "cv tool vergelijken",
    "goedkoopste cv tool",
  ],
  alternates: {
    canonical: "https://werkcv.nl/beste-cv-maker-nederland",
    languages: {
      "nl-NL": "https://werkcv.nl/beste-cv-maker-nederland",
      "x-default": "https://werkcv.nl/beste-cv-maker-nederland",
    },
  },
};

export default function BesteCvMakerNederlandPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Beste CV maker Nederland", href: "/beste-cv-maker-nederland" },
      ]}
      eyebrow="BOFU vergelijking"
      title="Beste CV maker Nederland voor wie prijs, ATS en templates serieus vergelijkt"
      description="Deze zoekopdracht is bijna koopklaar. Wie zoekt op beste CV maker Nederland wil niet alleen mooie templates zien, maar vooral weten welke tool in de praktijk het beste werkt voor Nederlandse vacatures, ATS-scans en een eerlijk prijsmodel. Dat maakt deze pagina direct relevant voor WerkCV’s kernpitch."
      badges={["Vergelijking", "BOFU", "ATS", "Templates", "Prijsmodel"]}
      primaryCta={{ href: "/templates", label: "Vergelijk WerkCV templates" }}
      secondaryCta={{ href: "/editor", label: "Test WerkCV gratis" }}
      sidebarTitle="Waar mensen hier echt op vergelijken"
      sidebarItems={[
        "Hoe professioneel en rustig de templates ogen.",
        "Of de output ATS-vriendelijk is voor Nederlandse vacatures.",
        "Of het prijsmodel logisch voelt voor een kort sollicitatieproces.",
        "Hoe snel je zonder opmaakgedoe tot een PDF komt.",
      ]}
      cardsTitle="Waarom deze pagina conversiekans heeft"
      cards={[
        {
          title: "Vergelijkers willen bewijs, geen mooie beloftes",
          body: "Op dit punt in de funnel is het belangrijk dat WerkCV duidelijk laat zien waar het sterker is: eerlijk prijsmodel, Nederlandse focus en een editor die direct naar een sollicitatieversie leidt.",
        },
        {
          title: "Prijsmodel is hier een echte differentiator",
          body: "Veel concurrenten sturen op abonnementen. WerkCV kan zich juist onderscheiden door één duidelijke, eenmalige route te bieden voor mensen die niet maandelijks willen betalen.",
        },
        {
          title: "ATS en templates zijn samen beslissend",
          body: "Bezoekers willen een CV dat er professioneel uitziet én makkelijk door systemen te lezen is. De combinatie daarvan maakt een builder echt bruikbaar.",
        },
        {
          title: "Deze intentie sluit direct aan op testen",
          body: "Wie builders vergelijkt, wil meestal snel zelf even kijken. Daarom is een gratis editor- of template-CTA op deze pagina extra logisch.",
        },
      ]}
      relatedTitle="Sterke vergelijkingsroutes vanuit deze pagina"
      relatedDescription="Deze routes helpen bezoekers door van brede vergelijking naar een concreet productargument of head-to-head keuze."
      relatedLinks={[
        {
          href: "/cv-maken-zonder-abonnement",
          label: "CV maken zonder abonnement",
          body: "Gebruik deze route als prijsmodel en eenmalig betalen voor jou doorslaggevend zijn.",
        },
        {
          href: "/goedkoopste-cv-maker-nederland",
          label: "Goedkoopste CV maker",
          body: "Vergelijk gratis opties, proefprijzen en eenmalig betalen op basis van werkelijke kosten per CV.",
        },
        {
          href: "/cv-gids/werkcv-vs-cvmaker",
          label: "WerkCV vs CVMaker",
          body: "Vergelijk WerkCV met een grote abonnementsgerichte speler.",
        },
        {
          href: "/cv-gids/werkcv-vs-cv-nl",
          label: "WerkCV vs CV.nl",
          body: "Bekijk de vergelijking met een dominante NL-speler in de markt.",
        },
        {
          href: "/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures",
          label: "ATS-vriendelijke CV builder",
          body: "Ga dieper op ATS-intentie als scanbaarheid zwaarder telt dan design.",
        },
      ]}
      faqs={faqs}
      footerTitle="Test zelf of WerkCV de beste fit is voor jouw sollicitatieflow"
      footerBody="Open de editor, vergelijk templates en kijk hoe ver je gratis komt. Daarmee kun je WerkCV direct beoordelen op gebruiksgemak, uitstraling en prijslogica."
      footerPrimaryCta={{ href: "/editor", label: "Test de editor" }}
      footerSecondaryCta={{ href: "/prijzen", label: "Bekijk prijzen" }}
    />
  );
}
