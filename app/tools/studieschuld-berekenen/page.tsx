import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { buildDutchMetadata } from "@/lib/page-metadata";
import StudieschuldTool from "./StudieschuldTool";

const faqItems = [
  {
    question: "Hoeveel moet ik per maand terugbetalen aan DUO?",
    answer:
      "Je betaalt 4% van het deel van je inkomen dat boven het drempelinkomen van €24.893 per jaar (2026, alleenstaand) uitkomt. Verdien je minder dan de drempel, dan betaal je niets terug. DUO herberekent dit elk jaar op basis van je belastingaangifte van 2 jaar eerder.",
  },
  {
    question: "Wat is het verschil tussen oud stelsel en nieuw stelsel?",
    answer:
      "In het oud stelsel (lenen vóór september 2015) heb je 15 jaar om terug te betalen. In het nieuw stelsel (lenen ná september 2015) is dit 35 jaar. Het aflospercentage is in beide stelsels 4% van het inkomen boven het drempelinkomen. Na de looptijd wordt de restschuld automatisch kwijtgescholden.",
  },
  {
    question: "Wordt mijn studieschuld kwijtgescholden als ik niet alles heb terugbetaald?",
    answer:
      "Ja. Na 15 jaar (oud stelsel) of 35 jaar (nieuw stelsel) wordt het resterende bedrag automatisch kwijtgescholden door DUO. Je hoeft hiervoor niets aan te vragen — het gebeurt automatisch op basis van de startdatum van je terugbetaling.",
  },
  {
    question: "Wat als ik tijdelijk geen inkomen heb, bijvoorbeeld door werkloosheid?",
    answer:
      "Als je inkomen onder het drempelinkomen van €24.893 valt, is je verplichte aflossing €0. Je hoeft dit niet apart aan te vragen — DUO gebruikt automatisch je belastingaangifte. Je kunt ook een betalingspauze aanvragen als je in een bijzondere financiële situatie zit.",
  },
  {
    question: "Kan ik vrijwillig extra aflossen zonder boete?",
    answer:
      "Ja, altijd en zonder boete. Extra aflossen verlaagt je openstaande schuld en vermindert de renteopbouw. Je regelt dit via Mijn DUO op duo.nl. Er is geen minimum- of maximumbedrag voor vrijwillige extra aflossingen.",
  },
  {
    question: "Hoe weet ik wanneer mijn terugbetalingstermijn begint?",
    answer:
      "De terugbetalingstermijn start 2 jaar na het einde van je studie (of na afmelding als student). DUO stuurt je een betalingsoverzicht met je startdatum, het maandelijkse aflosbedrag en de actuele rente. Je kunt dit ook altijd inzien via Mijn DUO.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title:
    "Studieschuld DUO Berekenen 2026 – Maandelijkse Aflossing Calculator | WerkCV",
  description:
    "Bereken hoeveel je maandelijks terugbetaalt aan DUO op basis van je inkomen. Voor oud stelsel (voor 2015) en nieuw stelsel (na 2015). Gratis en direct inzichtelijk.",
  path: "/tools/studieschuld-berekenen",
  keywords: [
    "studieschuld duo berekenen",
    "duo maandlast berekenen",
    "duo berekenen",
    "maandbedrag berekenen duo",
    "studieschuld berekenen",
    "duo aflossing berekenen",
  ],
});

export default function StudieschuldBerekenenPage() {
  return (
    <ToolPageShell
      badge="Geld"
      title="Studieschuld DUO berekenen — hoeveel betaal je maandelijks?"
      description="Bereken je maandelijkse DUO-aflossing op basis van je stelsel, openstaande schuld en huidige inkomen. Je betaalt altijd naar draagkracht — nooit meer dan je kunt missen."
      toolLabel="Studieschuld DUO berekenen"
      toolHref="/tools/studieschuld-berekenen"
      faqTitle="Veelgestelde vragen over studieschuld en DUO"
      faqItems={faqItems}
      statPills={[
        {
          label: "35 jaar",
          value: "maximale looptijd nieuw stelsel",
          note: "oud stelsel kent 15 jaar",
        },
        {
          label: "Inkomensgerelateerd",
          value: "je betaalt naar draagkracht",
          note: "onder de drempel betaal je niets",
        },
        {
          label: "Kwijtschelding",
          value: "restschuld vervalt na looptijd",
          note: "automatisch via DUO",
        },
      ]}
      asideTitle="Waarom deze rekensom vaak onduidelijk voelt"
      asideParagraphs={[
        "DUO kijkt niet alleen naar je schuld, maar vooral naar je inkomen, stelsel en drempelbedrag.",
        "Daardoor lijkt het maandbedrag soms laag, terwijl de looptijd juist heel lang is en rente blijft meelopen.",
        "Deze tool laat meteen zien wat verplicht is, wat vrijwillig extra doet en wat er aan het einde wordt kwijtgescholden.",
      ]}
    >
      <StudieschuldTool />
    </ToolPageShell>
  );
}
