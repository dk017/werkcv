import type { Metadata } from "next";
import RoleCvTemplatePage from "@/components/seo/RoleCvTemplatePage";

export const metadata: Metadata = {
  title: "CV Template Magazijnmedewerker | WerkCV.nl",
  description:
    "Gebruik een sterk CV template voor magazijnmedewerker. Inclusief profieltekst, logistieke voorbeeld bullets, checklist en links naar magazijn-CV en sollicitatiebrief routes.",
  keywords: [
    "cv template magazijnmedewerker",
    "magazijn cv template",
    "cv orderpicker template",
    "cv logistiek medewerker template",
    "cv magazijn voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-template-magazijnmedewerker",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-template-magazijnmedewerker",
      "x-default": "https://werkcv.nl/cv-template-magazijnmedewerker",
    },
  },
};

export default function CvTemplateMagazijnmedewerkerPage() {
  return (
    <RoleCvTemplatePage
      roleLabel="magazijnmedewerker"
      pageTitle="CV template magazijnmedewerker dat tempo, nauwkeurigheid en inzetbaarheid direct laat zien"
      intro="Voor logistieke vacatures moet je CV snel duidelijk maken dat je praktisch werkt, instructies volgt en foutarm kunt presteren. Deze template-route helpt je om magazijnervaring of overdraagbare praktijkervaring beter te structureren voor orderpick-, voorraad- en warehouse-rollen."
      profileText="Praktisch ingestelde magazijnmedewerker met focus op tempo, nauwkeurigheid en betrouwbare uitvoering van logistieke taken. Ervaren of aantoonbaar inzetbaar in orderpicken, voorraadwerk en samenwerken in een operationele omgeving. Zoekt een rol waarin discipline, veiligheid en teamwerk belangrijk zijn."
      recruiterSignals={[
        "Tempo en nauwkeurigheid tegelijk, niet alleen fysiek kunnen werken.",
        "Logistieke termen zoals orderpicken, voorraad, scanner of WMS waar relevant.",
        "Betrouwbaarheid in ploegendienst, instructie-opvolging en teamwerk.",
        "Een rustige, scanbare template die praktisch werk professioneel presenteert.",
      ]}
      bulletExamples={[
        "Verwerkte inkomende en uitgaande goederen nauwkeurig volgens instructies en vaste werkafspraken.",
        "Ondersteunde orderpick- en voorraadwerk met focus op tempo, foutreductie en nette overdracht.",
        "Werkte veilig en gestructureerd in een drukke logistieke omgeving met wisselende prioriteiten.",
        "Hield werkplek en goederenstroom overzichtelijk, waardoor picking en verwerking efficiënter verliepen.",
      ]}
      checklist={[
        "Noem logistieke kernwoorden die passen bij de vacature.",
        "Laat zien dat je tempo en nauwkeurigheid combineert.",
        "Gebruik praktijkvoorbeelden uit magazijn, retail, productie of ander uitvoerend werk.",
        "Houd je opmaak strak en ATS-vriendelijk, zonder afleiding.",
      ]}
      faqs={[
        {
          question: "Wat is het beste CV template voor magazijnmedewerker?",
          answer:
            "Een rustige, overzichtelijke template werkt meestal het best. Werkgevers willen snel zien of je betrouwbaar, praktisch en logistiek inzetbaar bent.",
        },
        {
          question: "Welke termen horen op een magazijn-CV?",
          answer:
            "Denk aan orderpicken, voorraad, logistiek, scanner, WMS, laden en lossen, veiligheid en ploegendienst, afhankelijk van je echte ervaring en de vacature.",
        },
        {
          question: "Kan ik een magazijn-CV maken zonder ervaring?",
          answer:
            "Ja. Gebruik dan andere praktische ervaring uit retail, horeca, productie of fysiek werk om discipline, tempo en nauwkeurigheid te bewijzen.",
        },
        {
          question: "Moet ik certificaten op mijn CV zetten?",
          answer:
            "Ja, zeker als je bijvoorbeeld heftruck- of reachtruckcertificaten hebt. Zulke signalen kunnen in logistieke selectie direct relevant zijn.",
        },
      ]}
      relatedLinks={[
        {
          href: "/cv-gids/cv-voorbeeld-magazijnmedewerker-zonder-ervaring",
          label: "CV voorbeeld magazijnmedewerker zonder ervaring",
        },
        {
          href: "/cv-gids/cv-voorbeeld-magazijnmedewerker-parttime",
          label: "CV voorbeeld magazijnmedewerker parttime",
        },
        {
          href: "/sollicitatiebrief-voorbeeld-magazijnmedewerker",
          label: "Sollicitatiebrief magazijnmedewerker",
        },
        {
          href: "/cv-voorbeelden/vakmanschap-en-logistiek/magazijnmedewerker",
          label: "Algemeen magazijnmedewerker voorbeeld",
        },
        { href: "/templates", label: "Vergelijk alle templates" },
      ]}
    />
  );
}
