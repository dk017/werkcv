import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Waar vind je Engelstalige bedrijven in Nederland?",
    answer:
      "Vaak in internationale hubs zoals Amsterdam, Rotterdam, Utrecht, Eindhoven en Den Haag, maar ook via scale-ups, techbedrijven, customer support teams, logistiek en internationale shared services.",
  },
  {
    question: "Moet ik bij Engelstalige bedrijven altijd een Engels CV gebruiken?",
    answer:
      "Vaak wel, maar niet altijd. Kijk naar de vacaturetaal en de context van het bedrijf. Bij internationale teams werkt Engels meestal het best, maar een Nederlandse structuur blijft vaak logisch.",
  },
  {
    question: "Waarom past dit onderwerp bij WerkCV?",
    answer:
      "WerkCV helpt internationals en expats met Nederlandse CV-logica, Engelstalige routes en tools voor job-title vertaling en salaris-/visachecks die samenhangen met solliciteren in Nederland.",
  },
  {
    question: "Wat is een goede eerste stap als expat of international?",
    answer:
      "Begin vaak met de juiste CV-structuur en vacaturetaal. Daarna kun je pas goed beslissen of je Engelse functietitels, Nederlandse termen of visa-/salary-routes extra moet checken.",
  },
];

export const metadata: Metadata = {
  title: "Engelstalige Bedrijven in Nederland | Waar Je Als Expat Echt Kans Maakt",
  description:
    "Zoek je Engelstalige bedrijven in Nederland? Gebruik deze route om je CV, functietitels en expat-aanpak beter af te stemmen op internationale vacatures in de Nederlandse markt.",
  keywords: [
    "engelstalige bedrijven in nederland",
    "engelse bedrijven nederland",
    "english speaking companies netherlands",
    "expat jobs netherlands english",
    "bedrijven waar engels gesproken wordt nederland",
  ],
  alternates: {
    canonical: "https://werkcv.nl/engelstalige-bedrijven-in-nederland",
    languages: {
      "nl-NL": "https://werkcv.nl/engelstalige-bedrijven-in-nederland",
      "en-NL": "https://werkcv.nl/en/english-speaking-companies-netherlands",
      "x-default": "https://werkcv.nl/engelstalige-bedrijven-in-nederland",
    },
  },
};

export default function EngelstaligeBedrijvenInNederlandPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "Engelstalige bedrijven in Nederland", href: "/engelstalige-bedrijven-in-nederland" },
      ]}
      eyebrow="Expat zoekintentie"
      title="Engelstalige bedrijven in Nederland vinden is stap één, maar je CV moet daarna ook kloppen"
      description="Deze zoekopdracht ligt dicht tegen expat-sollicitatie-intentie aan. Mensen zoeken niet alleen namen van bedrijven, maar proberen ook te begrijpen hoe ze hun CV, functietitels en profiel moeten aanpassen aan internationale vacatures in Nederland. Dat maakt dit een goede brug tussen informatievraag en productfit."
      badges={["Expat", "English-speaking", "Netherlands", "CV route", "Job titles"]}
      primaryCta={{ href: "/en/dutch-cv-template", label: "Open English CV route" }}
      secondaryCta={{ href: "/tools/job-title-translator", label: "Translate job titles" }}
      sidebarTitle="Waar deze zoekers meestal tegenaan lopen"
      sidebarItems={[
        "Welke bedrijven of sectoren echt met Engels werken.",
        "Of een Engels CV logisch is voor deze vacatures.",
        "Hoe Nederlandse CV-structuur verschilt van internationale resume-gewoontes.",
        "Hoe ze functietitels, salaris of visacontext goed vertalen.",
      ]}
      cardsTitle="Wat WerkCV op deze intentie toevoegt"
      cards={[
        {
          title: "Van bedrijfslijst naar sollicitatieklaar CV",
          body: "Alleen weten waar Engelstalige bedrijven zitten is niet genoeg. WerkCV helpt ook met de inhoudelijke stap daarna: een CV dat beter past bij vacatures in Nederland.",
        },
        {
          title: "Nederlandse context, ook als je in het Engels solliciteert",
          body: "Veel expats gebruiken een Engels CV, maar moeten nog steeds rekening houden met Nederlandse verwachtingen rond opbouw, toon en scanbaarheid.",
        },
        {
          title: "Tools voor localization en threshold checks",
          body: "Naast CV-advies heb je soms ook functietitels, salary thresholds of visa-routes nodig. Dat is precies waarom deze pagina goed aansluit op de expat-toolcluster.",
        },
        {
          title: "Sterke brug naar expat-content met koopintentie",
          body: "Wie hier landt, zit al dicht op een baanzoekactie. Daardoor kan deze pagina relatief waardevol verkeer naar de CV-editor en expat-routes sturen.",
        },
      ]}
      relatedTitle="Handige vervolgroutes voor internationals"
      relatedDescription="Gebruik deze routes als je verder wilt van oriëntatie naar concrete sollicitatie- of verhuisstappen."
      relatedLinks={[
        {
          href: "/cv-tips/cv-schrijven-buitenlander-nederland",
          label: "CV schrijven als buitenlander in Nederland",
          body: "Lees hoe Nederlandse werkgevers kijken naar foto, taalkeuze, persoonsgegevens en vertaalde functietitels op een CV van een internationale kandidaat.",
        },
        {
          href: "/en",
          label: "English guide hub",
          body: "De hoofdroute voor CV, ATS en Nederlandse sollicitatieverwachtingen in het Engels.",
        },
        {
          href: "/en/dutch-cv-examples",
          label: "Dutch CV examples in English context",
          body: "Gebruik voorbeeldstructuren die je kunt aanpassen voor internationale sollicitaties.",
        },
        {
          href: "/tools/kennismigrant-salary-checker",
          label: "Highly skilled migrant salary checker",
          body: "Handig als je ook salary thresholds wilt checken bij internationale werkgevers.",
        },
        {
          href: "/tools/zoekjaar-checker",
          label: "Zoekjaar checker",
          body: "Relevant voor internationals die nog binnen de orientation year route vallen.",
        },
      ]}
      faqs={faqs}
      footerTitle="Maak je CV klaar voor Engelstalige rollen in Nederland"
      footerBody="Gebruik de Engelse WerkCV-routes om je CV-opbouw, functietitels en Nederlandse sollicitatielogica beter te laten aansluiten op internationale vacatures."
      footerPrimaryCta={{ href: "/en/dutch-cv-template", label: "Open English CV template route" }}
      footerSecondaryCta={{ href: "/en", label: "Bekijk English guides" }}
    />
  );
}
