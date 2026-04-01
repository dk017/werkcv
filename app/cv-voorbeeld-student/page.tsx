import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Wat zet je op een student CV als je weinig werkervaring hebt?",
    answer:
      "Gebruik vooral opleiding, bijbaan, stage, projecten, vrijwilligerswerk en vaardigheden die passen bij de vacature. Laat zien wat je al hebt gedaan en wat dat zegt over je werkhouding.",
  },
  {
    question: "Wat is het verschil tussen een student CV en een normaal CV?",
    answer:
      "Een student CV draait meer om potentie, beschikbaarheid en leerbaarheid. Bij ervaren kandidaten ligt de nadruk meestal meer op werkervaring, resultaten en senioriteit.",
  },
  {
    question: "Hoe lang mag een student CV zijn?",
    answer:
      "Voor de meeste studenten is 1 pagina genoeg. Houd alleen informatie over die helpt voor de stage, bijbaan of startersrol waarop je solliciteert.",
  },
  {
    question: "Kan ik dit eerst gratis opbouwen?",
    answer:
      "Ja. Je kunt gratis starten in de editor en pas betalen als je de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "CV Voorbeeld Student | Sterke Opbouw voor Stage, Bijbaan en Eerste Baan",
  description:
    "Bekijk een sterk CV voorbeeld voor studenten. Inclusief opbouw, profieltekst, stage- en bijbaanlogica en de snelste route naar een professioneel student-CV.",
  keywords: [
    "cv voorbeeld student",
    "student cv voorbeeld",
    "voorbeeld cv student",
    "studenten cv",
    "cv student voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-voorbeeld-student",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-voorbeeld-student",
      "x-default": "https://werkcv.nl/cv-voorbeeld-student",
    },
  },
};

export default function CvVoorbeeldStudentPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "CV voorbeeld student", href: "/cv-voorbeeld-student" },
      ]}
      eyebrow="Student zoekintentie"
      title="CV voorbeeld student dat laat zien wat je al wél kunt bewijzen"
      description="Wie zoekt op cv voorbeeld student wil meestal niet nóg een algemene uitleg, maar een heldere route: welke onderdelen zet je bovenaan, hoe maak je stage of bijbaan relevant, en hoe houd je je CV professioneel als je nog weinig formele ervaring hebt? Deze pagina bundelt precies die intentie."
      badges={["Student", "Stage", "Bijbaan", "Starter", "1 pagina"]}
      primaryCta={{ href: "/editor", label: "Start student-CV in editor" }}
      secondaryCta={{
        href: "/cv-voorbeelden/studenten-en-starters/student-cv",
        label: "Bekijk volledig student voorbeeld",
      }}
      sidebarTitle="Waar recruiters bij studenten op letten"
      sidebarItems={[
        "Een duidelijke richting: stage, bijbaan, trainee of eerste baan.",
        "Praktisch bewijs uit school, project, stage, vereniging of bijbaan.",
        "Beschikbaarheid, werkhouding en leervermogen.",
        "Een rustige layout zonder onnodige opmaakruis.",
      ]}
      cardsTitle="Zo gebruik je deze zoekintentie slim"
      cards={[
        {
          title: "Gebruik een voorbeeld voor structuur, niet als eindtekst",
          body: "Recruiters willen zien wat jij zelf hebt gedaan. Gebruik het studentvoorbeeld om volgorde, profieltekst en soort bullets te kiezen, maar vul daarna je eigen projecten en ervaring in.",
        },
        {
          title: "Zet opleiding, projecten en bijbaan als bewijs in",
          body: "Studenten winnen niet op jaren ervaring maar op relevant bewijs. Laat zien waar je verantwoordelijkheid nam, samenwerkte, software gebruikte of onder tijdsdruk leverde.",
        },
        {
          title: "Koppel je CV direct aan je doelrol",
          body: "Een student-CV voor een bijbaan in retail ziet er inhoudelijk anders uit dan een stage-CV of een starter-CV voor een eerste kantoorfunctie. Pas je profieltekst dus per doel aan.",
        },
        {
          title: "Rond het daarna af in een ATS-vriendelijke template",
          body: "Zodra de inhoud klopt, zet je die in de editor zodat je eindversie strak, scanbaar en direct bruikbaar is voor Nederlandse vacatures.",
        },
      ]}
      relatedTitle="Sterke vervolgroutes voor studenten en starters"
      relatedDescription="Open 2 of 3 routes die het dichtst bij jouw situatie liggen en bouw daarna direct je eigen versie."
      relatedLinks={[
        {
          href: "/cv-voorbeelden/studenten-en-starters/student-cv",
          label: "Volledig student-CV voorbeeld",
          body: "Gebruik dit als inhoudelijke basis voor profieltekst, opleiding en eerste ervaring.",
        },
        {
          href: "/cv-gids/cv-voorbeeld-student-bijbaan",
          label: "CV voorbeeld student bijbaan",
          body: "Sterk als je zoekt naar supermarkt, horeca, winkel of logistieke bijbaan.",
        },
        {
          href: "/cv-maken-student",
          label: "CV maken als student",
          body: "Gebruik deze route als je meteen van voorbeeld naar editorflow wilt.",
        },
        {
          href: "/stage-cv-maken",
          label: "Stage-CV maken",
          body: "Kies deze route als je vooral stage, projecten en opleiding als bewijs wilt inzetten.",
        },
      ]}
      faqs={faqs}
      footerTitle="Maak van een studentvoorbeeld direct je eigen CV"
      footerBody="Start gratis, gebruik een rustige template en werk daarna gericht verder aan profieltekst, opleiding en ervaring die passen bij jouw stage, bijbaan of eerste baan."
      footerPrimaryCta={{ href: "/editor", label: "Open editor" }}
      footerSecondaryCta={{ href: "/prijzen", label: "Bekijk prijzen" }}
    />
  );
}
