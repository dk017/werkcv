import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import ZwangerschapsverlofTool from "./ZwangerschapsverlofTool";

const faqItems = [
  {
    question: "Wanneer begint mijn zwangerschapsverlof?",
    answer:
      "Je mag zelf kiezen wanneer je verlof ingaat — tussen 4 en 6 weken vóór de uitgerekende datum. Je moet dit minimaal 3 weken van tevoren aan je werkgever melden. Hoe later je begint met verlof, hoe langer het verlof na de bevalling duurt. Totaal blijft altijd minimaal 16 weken.",
  },
  {
    question: "Krijg ik 100% van mijn salaris tijdens zwangerschapsverlof?",
    answer:
      "Het UWV keert 100% van je dagloon uit, maar er geldt een maximum dagloon van €290,68 per dag (2026). Als je meer verdient, is de UWV-uitkering gemaximeerd. Je werkgever kan het verschil aanvullen — dit hangt af van je cao of individueel contract.",
  },
  {
    question: "Hoelang is het aanvullend geboorteverlof voor de partner?",
    answer:
      "5 werkweken. Het UWV betaalt de partner 70% van het dagloon tijdens dit verlof (ook gemaximeerd op het UWV-dagloon). Het verlof moet worden opgenomen binnen 6 maanden na de geboorte. De werkgever is niet verplicht het resterende 30% aan te vullen, tenzij de cao dit bepaalt.",
  },
  {
    question: "Hoe vraag ik zwangerschapsverlof aan?",
    answer:
      "Je meldt je verlof minstens 3 weken van tevoren bij je werkgever met je uitgerekende datum. Je werkgever vraagt vervolgens de UWV-uitkering namens jou aan. Je hoeft zelf niets bij het UWV in te dienen — dat doet je werkgever.",
  },
  {
    question: "Heb ik als ZZP'er ook recht op verlof?",
    answer:
      "Ja. Als ZZP'er heb je recht op de ZEZ-uitkering (Zelfstandig en Zwanger) van het UWV. De hoogte is gebaseerd op de winst over het voorgaande boekjaar. Je vraagt dit minimaal 2 weken vóór de gewenste startdatum zelf aan via uwv.nl.",
  },
  {
    question: "Wat als mijn baby eerder of later wordt geboren dan de uitgerekende datum?",
    answer:
      "Als je baby eerder wordt geboren, duurt je bevallingsverlof na de geboorte minimaal 10 weken — ongeacht wanneer je verlof begon. Als de baby later wordt geboren, worden de extra wachtdagen opgeteld bij je verlof ná de bevalling. Totaal blijft minimaal 16 weken gegarandeerd.",
  },
];

export const metadata: Metadata = {
  title:
    "Zwangerschapsverlof Berekenen 2026 – Startdatum, Duur en UWV Uitkering | WerkCV",
  description:
    "Bereken wanneer je zwangerschapsverlof begint, hoelang het duurt en wat je van het UWV ontvangt. Ook partnerverlof en geboorteverlof berekenen. Gebaseerd op Nederlandse wet 2026.",
};

export default function ZwangerschapsverlofBerekenenPage() {
  return (
    <ToolPageShell
      badge="NL wetgeving"
      title="Zwangerschapsverlof berekenen — startdatum, duur en uitkering"
      description="Bereken je exacte verlofdatum, einddatum en geschatte UWV-uitkering op basis van je uitgerekende datum en salaris. Ook het geboorteverlof voor de partner wordt doorgerekend."
      toolLabel="Zwangerschapsverlof berekenen"
      toolHref="/tools/zwangerschapsverlof-berekenen"
      faqTitle="Veelgestelde vragen over zwangerschapsverlof en partnerverlof"
      faqItems={faqItems}
      statPills={[
        {
          label: "Min. 16 weken",
          value: "totaal zwangerschaps- en bevallingsverlof",
          note: "wettelijke basis volgens WAZO",
        },
        {
          label: "100% dagloon",
          value: "UWV-uitkering tijdens verlof (tot max dagloon)",
          note: "gemaximeerd op €290,68 per dag",
        },
        {
          label: "5 weken extra",
          value: "aanvullend geboorteverlof partner via UWV",
          note: "naast 1 werkweek kraamverlof",
        },
      ]}
      asideTitle="Wat je hier in één keer ziet"
      asideParagraphs={[
        "Zwangerschapsverlof draait niet alleen om de startdatum, maar ook om de financiële uitkomst tijdens de verlofperiode.",
        "Voor partners is vooral het verschil tussen 1 week volledig betaald en 5 weken op 70% vaak onduidelijk.",
        "Deze tool zet beide routes naast elkaar met de minimale wettelijke rechten van 2026.",
      ]}
    >
      <ZwangerschapsverlofTool />
    </ToolPageShell>
  );
}
