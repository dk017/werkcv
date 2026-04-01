import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Wat is het verschil tussen een Engels CV voorbeeld en een Engels CV template?",
    answer:
      "Een voorbeeld helpt je vooral met inhoud, toon en voorbeeldzinnen. Een template helpt je met de layout en structuur. De sterkste aanpak is beide combineren.",
  },
  {
    question: "Wanneer gebruik je een Engels CV voorbeeld in Nederland?",
    answer:
      "Vooral bij internationale werkgevers, Engelstalige vacatures of teams waar Engels de voertaal is. Gebruik dan een Engelse inhoud, maar houd de structuur wel duidelijk en recruiter-proof.",
  },
  {
    question: "Kan ik een Nederlands CV gewoon vertalen naar Engels?",
    answer:
      "Liever niet letterlijk. Goede Engelse CV's zijn directer, resultaatgerichter en gebruiken internationale functietitels die recruiters sneller herkennen.",
  },
  {
    question: "Kan ik daarna direct gratis mijn eigen versie maken?",
    answer:
      "Ja. Je kunt gratis starten in de editor en pas betalen als je je definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Engels CV Voorbeeld | Voorbeeldzinnen en Opbouw voor Nederland",
  description:
    "Gebruik een sterk Engels CV voorbeeld voor internationale vacatures in Nederland. Inclusief opbouw, voorbeeldzinnen, summary-logica en directe route naar je English CV template.",
  keywords: [
    "engels voorbeeld cv",
    "engels cv voorbeeld",
    "voorbeeld engels cv",
    "cv voorbeeld engels",
    "english cv example netherlands",
  ],
  alternates: {
    canonical: "https://werkcv.nl/engels-cv-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/engels-cv-voorbeeld",
      "en-NL": "https://werkcv.nl/en/dutch-cv-examples",
      "x-default": "https://werkcv.nl/engels-cv-voorbeeld",
    },
  },
};

export default function EngelsCvVoorbeeldPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Engels CV voorbeeld", href: "/engels-cv-voorbeeld" },
      ]}
      eyebrow="Taal-intentie"
      title="Engels CV voorbeeld voor internationale vacatures in Nederland"
      description="Wie zoekt op engels cv voorbeeld wil meestal niet alleen een lege template, maar vooral zien hoe een Engelse summary, werkervaring en functietitels goed klinken voor internationale recruiters. Deze pagina is de brug tussen voorbeeldinhoud en een echte English CV-flow."
      badges={["English CV", "Voorbeeldzinnen", "International", "ATS-proof", "NL context"]}
      primaryCta={{ href: "/editor", label: "Start je English CV" }}
      secondaryCta={{ href: "/engels-cv-template", label: "Bekijk Engels template" }}
      sidebarTitle="Wat een sterk English CV voorbeeld laat zien"
      sidebarItems={[
        "Een directere, resultaatgerichte schrijfstijl dan veel Nederlandse CV's.",
        "Internationale functietitels die recruiters meteen begrijpen.",
        "Een korte professional summary met richting en impact.",
        "Rustige structuur die ook voor ATS-systemen goed leesbaar blijft.",
      ]}
      cardsTitle="Waarom deze zoekintentie anders is dan template-intentie"
      cards={[
        {
          title: "Je zoekt inhoud, niet alleen layout",
          body: "Bij een voorbeeld wil je zien hoe een Engels CV echt klinkt. Dat gaat over summary, bulletstijl, functietitels en toon, niet alleen over design.",
        },
        {
          title: "Internationale recruiters lezen anders",
          body: "Een goed Engels CV is meestal korter, directer en resultaatgerichter dan een letterlijk vertaald Nederlands CV. Daarom helpt een voorbeeld vaak meer dan een lege template.",
        },
        {
          title: "Nederlandse context blijft relevant",
          body: "Ook als je in het Engels solliciteert, wil je structuur en duidelijkheid houden die in Nederland goed werken. Juist die combinatie maakt WerkCV sterk.",
        },
        {
          title: "Daarna moet je snel kunnen doorbouwen",
          body: "Als het voorbeeld goed aanvoelt, wil je direct door naar een echte editor of templateflow. Deze pagina maakt die stap korter.",
        },
      ]}
      relatedTitle="Sterke vervolgroutes voor een English CV"
      relatedDescription="Gebruik deze routes om vanuit voorbeeldinhoud door te gaan naar templatekeuze, Engelse schrijfworkflow of expat-context."
      relatedLinks={[
        {
          href: "/engels-cv-template",
          label: "Engels CV template",
          body: "Gebruik dit als je vooral de layout en templatekeuze wilt vastzetten.",
        },
        {
          href: "/cv-maken-in-engels",
          label: "CV maken in Engels",
          body: "De uitgebreide workflow voor summary, bullets, vertaalfouten en consistente Engelse toon.",
        },
        {
          href: "/sollicitatiebrief-in-engels",
          label: "Sollicitatiebrief in Engels",
          body: "Koppel je Engelse CV direct aan een passende cover letter.",
        },
        {
          href: "/en/dutch-cv-examples",
          label: "Dutch CV examples in English context",
          body: "Vergelijk ook de bredere expat-/international route voor CV-opbouw in Nederland.",
        },
      ]}
      faqs={faqs}
      footerTitle="Maak van een Engels CV voorbeeld direct je eigen sollicitatieversie"
      footerBody="Gebruik de voorbeeldlogica voor summary en bullets, kies daarna een passende template en rond je English CV af in de editor."
      footerPrimaryCta={{ href: "/editor", label: "Open editor" }}
      footerSecondaryCta={{ href: "/prijzen", label: "Bekijk prijzen" }}
    />
  );
}
