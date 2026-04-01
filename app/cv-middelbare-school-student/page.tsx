import type { Metadata } from "next";
import IntentLandingPage from "@/components/seo/IntentLandingPage";

const faqs = [
  {
    question: "Wat zet je op een cv als middelbare school student?",
    answer:
      "Gebruik vooral opleiding, vakken of profiel, bijbaan, vrijwilligerswerk, schoolprojecten, talen, software en een korte profieltekst. Je hoeft geen fulltime werkervaring te hebben om een bruikbaar CV te maken.",
  },
  {
    question: "Is een cv voor middelbare school anders dan een normaal cv?",
    answer:
      "Ja. Bij een middelbare school CV ligt de nadruk meer op potentie, beschikbaarheid, werkhouding en praktische inzetbaarheid. Opleiding en eerste ervaringen staan daardoor vaak hoger op de pagina.",
  },
  {
    question: "Hoe lang moet een cv voor middelbare school student zijn?",
    answer:
      "Voor bijna alle middelbare school leerlingen is 1 pagina genoeg. Houd het kort, netjes en alleen gericht op wat relevant is voor stage, bijbaan of eerste werkervaring.",
  },
  {
    question: "Kan ik eerst gratis starten?",
    answer:
      "Ja. Je kunt je CV gratis opbouwen in de editor en pas betalen als je jouw definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "CV Middelbare School Student | Eerste CV voor Bijbaan of Stage",
  description:
    "Maak een sterk CV als middelbare school student. Bekijk opbouw, wat je bovenaan zet en hoe je school, bijbaan en projecten professioneel presenteert.",
  keywords: [
    "cv middelbare school student",
    "middelbare school cv",
    "eerste cv middelbare school",
    "cv scholier",
    "cv voor bijbaan scholier",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-middelbare-school-student",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-middelbare-school-student",
      "x-default": "https://werkcv.nl/cv-middelbare-school-student",
    },
  },
};

export default function CvMiddelbareSchoolStudentPage() {
  return (
    <IntentLandingPage
      breadcrumbItems={[
        { label: "Home", href: "/" },
        { label: "CV middelbare school student", href: "/cv-middelbare-school-student" },
      ]}
      eyebrow="Scholier-intentie"
      title="CV middelbare school student dat laat zien wat je nu al kunt meenemen"
      description="Wie zoekt op cv middelbare school student heeft meestal geen jaren ervaring, maar wil wel serieus overkomen voor een bijbaan, stage of eerste werkplek. Op deze pagina draait het daarom niet om senioriteit, maar om duidelijke opbouw, nette presentatie en slim gebruik van school, projecten en eerste praktijkervaring."
      badges={["Middelbare school", "Scholier", "Bijbaan", "Stage", "1 pagina"]}
      primaryCta={{ href: "/editor", label: "Start scholier-CV in editor" }}
      secondaryCta={{
        href: "/cv-voorbeelden/studenten-en-starters/student-cv",
        label: "Bekijk volledig student voorbeeld",
      }}
      sidebarTitle="Waar werkgevers bij scholieren op letten"
      sidebarItems={[
        "Duidelijke beschikbaarheid voor bijbaan, weekendwerk of stage.",
        "School, profiel of vakrichting die logisch past bij de rol.",
        "Praktisch bewijs uit projecten, vrijwilligerswerk, sport of eerste bijbaan.",
        "Een korte, verzorgde CV-opmaak zonder te veel tekst.",
      ]}
      cardsTitle="Zo gebruik je deze zoekintentie slim"
      cards={[
        {
          title: "Zet opleiding hoger dan bij ervaren kandidaten",
          body: "Bij een middelbare school CV is je opleiding vaak het sterkste vaste onderdeel. Noem school, leerjaar, profiel en vakken of onderdelen die relevant zijn voor je doelrol.",
        },
        {
          title: "Gebruik kleine ervaringen als echt bewijs",
          body: "Ook een oppasbaan, clubwerk, vakkenvullen, schoolproject of hulp bij evenementen telt mee als je laat zien wat je deed en wat dat zegt over jouw werkhouding.",
        },
        {
          title: "Houd je doel concreet",
          body: "Een scholier-CV wordt sterker zodra je weet of je mikt op een bijbaan, stage of eerste werkervaring. Dat bepaalt je profieltekst, skills en welke ervaringen voorrang krijgen.",
        },
        {
          title: "Maak er daarna een nette PDF van",
          body: "Zodra je inhoud klopt, zet je alles in een rustige template zodat je eerste CV professioneel oogt en makkelijk te lezen is.",
        },
      ]}
      relatedTitle="Sterke vervolgroutes voor scholieren en jonge starters"
      relatedDescription="Open 2 of 3 routes die het dichtst bij jouw situatie liggen en werk daarna direct je eigen eerste CV uit."
      relatedLinks={[
        {
          href: "/cv-maken-student",
          label: "CV maken als student",
          body: "Gebruik deze route als je direct van intentie naar editorflow wilt voor stage, bijbaan of starterswerk.",
        },
        {
          href: "/cv-voorbeeld-student",
          label: "CV voorbeeld student",
          body: "Sterk als je eerst wilt zien hoe profieltekst, opleiding en eerste ervaring worden opgebouwd.",
        },
        {
          href: "/cv-gids/cv-voorbeeld-student-bijbaan",
          label: "CV voorbeeld student bijbaan",
          body: "Handig voor supermarkt, horeca, winkel of logistiek werk naast school.",
        },
        {
          href: "/cv-gids/cv-voorbeeld-zonder-ervaring",
          label: "CV zonder ervaring",
          body: "Gebruik deze gids als je vooral zoekt hoe je relevant blijft zonder formeel werkverleden.",
        },
      ]}
      faqs={faqs}
      footerTitle="Maak van je eerste scholier-CV direct een nette sollicitatieversie"
      footerBody="Start gratis, houd het compact en laat vooral zien dat je betrouwbaar, leerbaar en inzetbaar bent voor stage of bijbaan."
      footerPrimaryCta={{ href: "/editor", label: "Open editor" }}
      footerSecondaryCta={{ href: "/prijzen", label: "Bekijk prijzen" }}
    />
  );
}
