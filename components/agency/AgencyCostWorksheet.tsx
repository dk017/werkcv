"use client";

import { useState } from "react";
import { monthlyWorkflowCost } from "@/lib/agency-cost-worksheet";

export default function AgencyCostWorksheet({ monthlyPrice }: { monthlyPrice: number }) {
  const [values, setValues] = useState(["30", "45", "20", "10", "0", "20", "10", String(monthlyPrice)]);
  const labels = ["Documenten per maand", "Interne uurkosten (€)", "Huidige reviewtijd per document (minuten)", "Huidige overdracht per document (minuten)", "Huidige softwarekosten per maand (€)", "Nieuwe reviewtijd per document (minuten)", "Nieuwe overdracht per document (minuten)", "Nieuwe softwarekosten per maand (€)"];
  const numbers = values.map((value) => value.trim() === "" ? NaN : Number(value.replace(",", ".")));
  const [volume, hourly, oldReview, oldTransfer, oldSoftware, newReview, newTransfer, newSoftware] = numbers;
  const current = monthlyWorkflowCost(volume, oldReview, oldTransfer, hourly, oldSoftware);
  const proposed = monthlyWorkflowCost(volume, newReview, newTransfer, hourly, newSoftware);
  const euro = (value: number) => new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(value);
  return (
    <div className="wk-card mt-6 min-w-0 p-5">
      <p className="text-sm">Hypothetisch startvoorbeeld: beide werkwijzen kosten evenveel tijd. Vul je eigen metingen in. Waarden blijven in deze pagina en worden niet verstuurd.</p>
      <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
        {labels.map((label, index) => <label key={label} className="min-w-0 text-sm font-semibold">{label}<input type="number" min="0" step={index === 0 ? "1" : "any"} value={values[index]} onChange={(event) => setValues((previous) => previous.map((value, position) => position === index ? event.target.value : value))} className="mt-2 block w-full min-w-0 rounded-lg border border-[var(--wk-border)] bg-[var(--wk-surface)] p-3" /></label>)}
      </div>
      <p className="mt-5 text-sm">Uren = documenten × (reviewminuten + overdrachtminuten) ÷ 60. Maandkosten = uren × uurkosten + softwarekosten. Gebruik voor beide werkwijzen dezelfde btw-basis en neem eventuele inrichting apart mee.</p>
      <div role="status" aria-live="polite" className="mt-5 space-y-2 text-sm">
        {current && proposed ? <>
          <p>Huidig: {current.hours.toLocaleString("nl-NL")} uur; arbeid {euro(current.labour)}; totaal {euro(current.total)} per maand.</p>
          <p>Nieuw: {proposed.hours.toLocaleString("nl-NL")} uur; arbeid {euro(proposed.labour)}; totaal {euro(proposed.total)} per maand.</p>
          <p>Verschil (huidig − nieuw): {euro(current.total - proposed.total)} per maand. Een negatief bedrag betekent hogere kosten in de nieuwe werkwijze.</p>
        </> : <p>Vul voor alle velden een geldig, niet-negatief getal in; documenten moeten een geheel aantal zijn.</p>}
      </div>
      <p className="mt-4 text-sm">Dit is een eigen scenario, geen gemeten besparing of belofte van WerkCV.</p>
    </div>
  );
}
