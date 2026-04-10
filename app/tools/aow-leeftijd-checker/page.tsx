import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import AowLeeftijdTool from "./AowLeeftijdTool";

const faqItems = [
  {
    question: "Wanneer gaat mijn AOW in?",
    answer:
      "Je AOW-uitkering gaat in op de dag dat je je AOW-leeftijd bereikt. Je ontvangt de eerste betaling in de maand erna. De SVB informeert je automatisch 4 maanden vóór je AOW-ingangsdatum — je hoeft niets zelf aan te vragen als je al in Nederland woont.",
  },
  {
    question: "Kan de overheid mijn AOW-leeftijd nog verhogen?",
    answer:
      "Ja. De AOW-leeftijd is gekoppeld aan de levensverwachting via CBS-data. Als Nederlanders gemiddeld langer leven, kan de AOW-leeftijd stijgen. Verhogingen worden minimaal 5 jaar van tevoren aangekondigd. Per 2026 is voor de komende jaren geen verdere verhoging vastgesteld.",
  },
  {
    question: "Wat is het verschil tussen AOW en aanvullend pensioen?",
    answer:
      "AOW is de basisuitkering van de overheid voor iedereen die in Nederland heeft gewoond of gewerkt. Aanvullend pensioen is wat je via je werkgever of pensioenfonds opbouwt (de zogenoemde tweede pijler). In de meeste gevallen ontvang je beide. Je AOW-leeftijd bepaalt wanneer de staatsuitkering begint — je aanvullend pensioen kan soms eerder of later ingaan afhankelijk van je pensioenregeling.",
  },
  {
    question: "Wat als ik een deel van mijn leven buiten Nederland heb gewoond?",
    answer:
      "Voor elk jaar dat je niet in Nederland woonde of werkte tussen je 15e en je AOW-leeftijd, wordt 2% van je volledige AOW-bedrag afgetrokken. Na 50 jaar NL-inwonerschap heb je recht op de volledige AOW. Je kunt ontbrekende jaren soms vrijwillig verzekeren via de SVB.",
  },
  {
    question: "Kan ik eerder stoppen met werken dan mijn AOW-leeftijd?",
    answer:
      "Ja, maar je ontvangt dan nog geen AOW. Je moet zelf zorgen voor overbruggingsinkomsten via spaargeld, aanvullend pensioen of een regeling als RVU (Regeling Vervroegde Uittreding) als je werkgever dat aanbiedt. De AOW-uitkering start altijd pas op je wettelijke AOW-leeftijd.",
  },
  {
    question: "Hoe hoog is de AOW-uitkering?",
    answer:
      "De AOW-uitkering voor een alleenstaande is in 2026 circa €1.400 netto per maand (inclusief vakantiegeld). Voor gehuwden of samenwonenden is dit circa €960 netto per persoon per maand. De exacte bedragen worden elk halfjaar aangepast aan de minimumloonindex — raadpleeg svb.nl voor de actuele bedragen.",
  },
];

export const metadata: Metadata = {
  title: "AOW Leeftijd Berekenen – Wanneer Kan Ik Met Pensioen? | WerkCV",
  description:
    "Bereken je exacte AOW-leeftijd op basis van je geboortedatum. Inclusief pensioendatum, jaren tot AOW en effect van eerder stoppen met werken. Gebaseerd op officiële SVB-tabellen 2026.",
};

export default function AowLeeftijdCheckerPage() {
  return (
    <ToolPageShell
      badge="NL wetgeving"
      title="AOW leeftijd berekenen — wanneer kun je met pensioen?"
      description="Vul je geboortedatum in en zie direct wanneer je AOW ingaat, hoeveel maanden je nog moet wachten en wat eerder stoppen financieel betekent."
      toolLabel="AOW leeftijd checker"
      toolHref="/tools/aow-leeftijd-checker"
      faqTitle="Veelgestelde vragen over AOW en pensioen"
      faqItems={faqItems}
      statPills={[
        {
          label: "67 jaar",
          value: "AOW-leeftijd voor na 1957 geborenen",
          note: "momenteel vaste leeftijd vanaf 1958",
        },
        {
          label: "SVB-tabellen",
          value: "officiële leeftijden per geboortejaar gebruikt",
          note: "hardcoded volgens de opgegeven tabel",
        },
        {
          label: "CBS-koppeling",
          value: "leeftijd stijgt mee met levensverwachting",
          note: "kan later opnieuw worden aangepast",
        },
      ]}
      asideTitle="Waarom dit meer is dan een pensioendatum"
      asideParagraphs={[
        "Voor veel mensen is de AOW-leeftijd het ankerpunt voor stoppen met werken, eerder afbouwen of een RVU-regeling.",
        "Juist het verschil tussen AOW, aanvullend pensioen en eigen spaargeld zorgt vaak voor verwarring.",
        "Deze checker laat daarom meteen zien hoeveel tijd en buffer je nodig hebt als je eerder wilt stoppen.",
      ]}
    >
      <AowLeeftijdTool />
    </ToolPageShell>
  );
}
