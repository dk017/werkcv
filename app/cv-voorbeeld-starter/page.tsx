import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Wat is het verschil tussen een starter CV en een student CV?",
    answer:
      "Een starter CV is meestal gericht op een eerste vaste baan, traineeship of junior rol. Daardoor ligt de nadruk iets meer op richting, professionele potentie en relevante projecten of stages.",
  },
  {
    question: "Hoe maak ik een starter CV als ik nog weinig ervaring heb?",
    answer:
      "Gebruik stage, studieprojecten, bijbaan, portfolio en vrijwillige verantwoordelijkheid als bewijs. Werk vooral met concrete voorbeelden van samenwerking, initiatief en resultaat.",
  },
  {
    question: "Welke profieltekst werkt goed voor een starter?",
    answer:
      "Een goede starter-profieltekst benoemt je richting, je sterkste relevante ervaring en wat voor type rol je zoekt. Houd het concreet en laat algemene claims zonder bewijs weg.",
  },
  {
    question: "Kan ik mijn starter CV eerst gratis maken?",
    answer:
      "Ja. Je kunt gratis een versie opbouwen en pas betalen wanneer je de PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "CV Voorbeeld Starter | Eerste Baan, Traineeship of Junior Rol",
  description:
    "Gebruik een sterk CV voorbeeld voor starters. Leer hoe je stage, projecten en eerste werkervaring omzet naar een recruiter-proof starter-CV voor je eerste baan.",
  keywords: [
    "cv voorbeeld starter",
    "starter cv voorbeeld",
    "cv starter",
    "eerste baan cv voorbeeld",
    "junior cv voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-voorbeeld-starter",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-voorbeeld-starter",
      "x-default": "https://werkcv.nl/cv-voorbeeld-starter",
    },
  },
};

export default function CvVoorbeeldStarterPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "CV voorbeeld starter", href: "/cv-voorbeeld-starter" },
      ]}
      eyebrow="Starter zoekintentie"
      title="CV voorbeeld starter voor je eerste baan, junior rol of traineeship"
      description="Wie zoekt op cv voorbeeld starter wil meestal overtuigend laten zien dat potentie, stage-ervaring en projecten genoeg bewijs kunnen zijn voor een eerste serieuze rol. Deze pagina helpt je precies bij dat gat tussen ‘nog niet ervaren’ en ‘wel interessant voor recruiters’."
      badges={["Starter", "Junior", "Traineeship", "Eerste baan", "ATS-proof"]}
      primaryCta={{ href: "/editor", label: "Start starter-CV" }}
      secondaryCta={{
        href: "/cv-voorbeelden/studenten-en-starters/eerste-baan-starter",
        label: "Bekijk starter voorbeeld",
      }}
      sidebarTitle="Wat recruiters bij starters willen zien"
      sidebarItems={[
        "Richting: welke rol of sector je zoekt.",
        "Stage, project of bijbaan als bewijs van relevante skills.",
        "Concreet initiatief in plaats van algemene motivatie.",
        "Een rustige, professionele opmaak zonder ruis.",
      ]}
      cardsTitle="Wat deze pagina oplost voor starters"
      cards={[
        {
          title: "Je vertaalt potentie naar bewijs",
          body: "In plaats van alleen te zeggen dat je leergierig bent, laat je zien waar je al verantwoordelijkheid nam, deadlines haalde of impact maakte in projecten en stages.",
        },
        {
          title: "Je kiest de juiste inhoud voor een eerste baan",
          body: "Een starter-CV hoeft niet vol te zijn. Het moet vooral helder maken waarom jouw opleiding, profiel en eerste ervaring logisch aansluiten op de rol waarop je solliciteert.",
        },
        {
          title: "Je voorkomt een te schoolse uitstraling",
          body: "Door met resultaatgerichte bullets en een volwassen template te werken, oogt je CV professioneler en minder als een studieoverzicht.",
        },
        {
          title: "Je bouwt direct door naar sollicitatieactie",
          body: "Gebruik het voorbeeld als inhoudelijke basis en zet het daarna snel om naar een versie die je kunt versturen voor junior vacatures, traineeships en startersrollen.",
        },
      ]}
      relatedTitle="Routes die goed aansluiten op starter-intentie"
      relatedDescription="Gebruik deze routes als je starterzoekopdracht iets specifieker is dan alleen een voorbeeld nodig hebben."
      relatedLinks={[
        {
          href: "/cv-voorbeelden/studenten-en-starters/eerste-baan-starter",
          label: "Starter-CV voorbeeld",
          body: "De meest directe inhoudelijke voorbeeldpagina voor eerste baan en junior rollen.",
        },
        {
          href: "/cv-tips/cv-zonder-werkervaring",
          label: "CV zonder werkervaring",
          body: "Handig als je vooral worstelt met weinig formele ervaring op je CV.",
        },
        {
          href: "/cv-maken-student",
          label: "CV maken student / starter",
          body: "Past goed als je nog dicht tegen studie, stage of bijbaan aan zit.",
        },
        {
          href: "/professioneel-cv-maken",
          label: "Professioneel CV maken",
          body: "Gebruik deze stap als je starter-CV inhoudelijk staat en je uitstraling wilt aanscherpen.",
        },
      ]}
      faqs={faqs}
      footerTitle="Zet je starterprofiel om naar een serieuze sollicitatieversie"
      footerBody="Gebruik een voorbeeld voor richting, voeg je eigen stage- en projectbewijs toe en rond je CV daarna af in een rustige template die bij Nederlandse recruiters goed landt."
      footerPrimaryCta={{ href: "/editor", label: "Maak starter-CV" }}
      footerSecondaryCta={{ href: "/templates", label: "Vergelijk templates" }}
    />
  );
}
