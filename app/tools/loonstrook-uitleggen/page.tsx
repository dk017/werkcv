import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import LoonstrookUitlegTool from "./LoonstrookUitlegTool";

const faqItems = [
  {
    question: "Moet ik de heffingskorting aanvragen?",
    answer:
      "Ja, je moet zelf aangeven bij je werkgever dat je de heffingskorting wil laten toepassen — via een loonbelastingverklaring. Heb je meerdere werkgevers, vraag hem dan maar bij één aan om te voorkomen dat je te weinig belasting betaalt.",
  },
  {
    question: "Waarom klopt mijn nettoloon niet met wat ik uitreken?",
    answer:
      "Er zijn meerdere oorzaken mogelijk: de heffingskorting is wel of niet toegepast, je hebt een onbelaste vergoeding (reiskosten, thuiswerk) die het nettobedrag verhoogt, of je pensioenpremie wordt van het bruto ingehouden vóór belastingberekening.",
  },
  {
    question: "Wat is het verschil tussen loonheffing en inkomstenbelasting?",
    answer:
      "Loonheffing is een voorheffing die je werkgever inhoudt. Aan het eind van het jaar doe je aangifte inkomstenbelasting en wordt gekeken of je te veel of te weinig hebt betaald. Het verschil krijg je terug of moet je bijbetalen.",
  },
  {
    question: "Ik krijg een loonstrook in het Engels — geldt dit ook voor mij?",
    answer:
      "Ja. Veel internationale werkgevers gebruiken Engelse loonstroken, maar de Nederlandse regels gelden nog steeds. De termen wijken af (bijv. \"wage tax\" voor loonheffing, \"holiday allowance\" voor vakantiegeld), maar de berekeningen zijn identiek.",
  },
];

export const metadata: Metadata = {
  title:
    "Loonstrook Uitleggen – Wat Betekent Elke Regel op je Salarisstrook? | WerkCV",
  description:
    "Begrijp je loonstrook in 2 minuten. Uitleg van loonheffing, heffingskorting, arbeidskorting, WW-premie en alle andere codes op je Nederlandse salarisstrook. Voor werknemers én expats.",
};

export default function LoonstrookUitleggenPage() {
  return (
    <ToolPageShell
      badge="NL wetgeving"
      title="Loonstrook uitleggen — wat betekent elke regel?"
      description="Selecteer de regels die op jouw loonstrook staan. Je krijgt direct een heldere uitleg in gewoon Nederlands — inclusief wat elke aftrekpost betekent en of het klopt wat je werkgever berekent."
      toolLabel="Loonstrook uitleggen"
      toolHref="/tools/loonstrook-uitleggen"
      faqTitle="Veelgestelde vragen over loonstroken"
      faqItems={faqItems}
      statPills={[
        {
          label: "15+ regels",
          value: "uitgelegd per salarisstrook",
          note: "snelle uitleg per loonregel",
        },
        {
          label: "Expat-proof",
          value: "ook in begrijpelijk Engels",
          note: "werkt ook bij internationale payroll",
        },
        {
          label: "2026 regels",
          value: "loonheffingstabellen bijgewerkt",
          note: "Nederlandse loonregels van 2026",
        },
      ]}
      asideTitle="Waarom dit helpt"
      asideParagraphs={[
        "Veel loonstroken gebruiken afkortingen en premiecodes die logisch zijn voor payroll, maar niet voor werknemers.",
        "Met deze uitleg zie je sneller welke regels je nettoloon drukken en welke juist netto worden uitgekeerd.",
        "Dat is handig voor controle, salarisgesprekken en vragen aan HR of je payrollprovider.",
      ]}
    >
      <LoonstrookUitlegTool />
    </ToolPageShell>
  );
}
