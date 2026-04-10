import type { Metadata } from "next";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import ZzpUurtariefTool from "./ZzpUurtariefTool";

const faqItems = [
  {
    question: "Hoe bepaal ik mijn ZZP uurtarief in Nederland?",
    answer:
      "Je begint bij je gewenste netto inkomen en werkt terug: voeg belasting (box 1), Zvw-premie, overhead en niet-declarabele uren toe. Deel de vereiste omzet door je declarabele uren. Dit geeft je het minimale tarief — zet je tarief altijd iets hoger om ruimte te houden.",
  },
  {
    question: "Wat is de Zvw-premie voor ZZP'ers?",
    answer:
      "ZZP'ers betalen naast inkomstenbelasting ook een Zvw-premie (bijdrage Zorgverzekeringswet) over hun winst. In 2026 is dit 5,65% over een maximum grondslagbedrag van circa €70.650. Dit bedrag komt bovenop de normale zorgverzekeringspremie die je zelf als verzekerde betaalt.",
  },
  {
    question: "Wat is het urencriterium voor zelfstandigenaftrek?",
    answer:
      "Je moet minimaal 1.225 uur per jaar als ondernemer werken om recht te hebben op de zelfstandigenaftrek. Dit hoeven niet allemaal declarabele uren te zijn — acquisitie, opleiding, administratie en reistijd voor je onderneming tellen ook mee. Je moet dit wel kunnen aantonen met een urenregistratie.",
  },
  {
    question: "Wat is een realistisch declarabelheidspercentage?",
    answer:
      "Voor startende ZZP'ers ligt dit rond de 60–70%. Gevestigde freelancers met vaste klanten halen 75–85%. Stel het te optimistisch in en je tarief is te laag — gebruik 70% als veilig startpunt. In sectoren zoals IT en consultancy zijn 75–80% gangbaar.",
  },
  {
    question: "Moet ik BTW berekenen bovenop mijn uurtarief?",
    answer:
      "Ja, als je BTW-plichtig bent (de meeste ZZP'ers zijn dit) factureer je 21% BTW bovenop je tarief. De BTW is voor jou doorlopend — je draagt het af aan de Belastingdienst en houdt het niet zelf. Jouw uurtarief is altijd exclusief BTW; geef dit duidelijk aan op je offertes.",
  },
];

export const metadata: Metadata = {
  title:
    "ZZP Uurtarief Berekenen 2026 – Wat Moet Je Vragen als Freelancer? | WerkCV",
  description:
    "Bereken je minimale ZZP uurtarief of dagtarief op basis van gewenst netto inkomen, werkdagen, overhead en belasting. Gratis tool voor Nederlandse freelancers en zzp'ers.",
};

export default function ZzpUurtariefBerekenenPage() {
  return (
    <ToolPageShell
      badge="Geld"
      title="ZZP uurtarief berekenen — wat moet je vragen?"
      description="Bereken je minimale uur- of dagtarief op basis van wat je netto wilt overhouden. Inclusief belasting, ziekteverzekering, overhead en niet-declarabele uren."
      toolLabel="ZZP uurtarief berekenen"
      toolHref="/tools/zzp-uurtarief-berekenen"
      faqTitle="Veelgestelde vragen over ZZP uurtarieven"
      faqItems={faqItems}
      statPills={[
        {
          label: "1 op 7",
          value: "Nederlandse werkenden is ZZP'er",
          note: "freelancen is mainstream geworden",
        },
        {
          label: "Box 1",
          value: "ZZP inkomen belast als ondernemer",
          note: "belasting en Zvw horen bij je tarief",
        },
        {
          label: "2026 tarieven",
          value: "inclusief Zvw-premie en heffingen",
          note: "met harde 2026 aannames",
        },
      ]}
      asideTitle="Waarom dit tarief vaak te laag wordt ingeschat"
      asideParagraphs={[
        "Veel freelancers kijken eerst naar wat een opdrachtgever wil betalen, niet naar wat ze zelf minimaal moeten overhouden.",
        "Juist overhead, pensioen en niet-declarabele tijd maken het verschil tussen een gezond tarief en een tarief dat te laag uitpakt.",
        "Deze tool rekent daarom terug vanuit netto, niet vanuit een willekeurig marktbedrag.",
      ]}
    >
      <ZzpUurtariefTool />
    </ToolPageShell>
  );
}
