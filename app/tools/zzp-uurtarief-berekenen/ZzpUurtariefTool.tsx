"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { ToolResultCta } from "@/components/tools/ToolResultCta";
import { calculateZzpTariff, type ZzpTaxProfile } from "@/lib/tools/employment-tools";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

export default function ZzpUurtariefTool() {
  const [desiredNetMonthlyIncome, setDesiredNetMonthlyIncome] = useState("3500");
  const [workableDaysPerYear, setWorkableDaysPerYear] = useState("220");
  const [declarabilityPercentage, setDeclarabilityPercentage] = useState("75");
  const [monthlyOverhead, setMonthlyOverhead] = useState("300");
  const [monthlyPensionBuffer, setMonthlyPensionBuffer] = useState("200");
  const [taxProfile, setTaxProfile] = useState<ZzpTaxProfile>("starter");

  const parsedNetMonthlyIncome = parseDecimal(desiredNetMonthlyIncome);
  const parsedWorkableDaysPerYear = parseDecimal(workableDaysPerYear);
  const parsedDeclarabilityPercentage = parseDecimal(declarabilityPercentage);
  const parsedMonthlyOverhead = parseDecimal(monthlyOverhead);
  const parsedMonthlyPensionBuffer = parseDecimal(monthlyPensionBuffer);

  let error = "";

  if (Number.isNaN(parsedNetMonthlyIncome) || parsedNetMonthlyIncome <= 0) {
    error = "Vul een geldig gewenst netto maandinkomen in.";
  } else if (
    Number.isNaN(parsedWorkableDaysPerYear) ||
    parsedWorkableDaysPerYear < 100 ||
    parsedWorkableDaysPerYear > 320
  ) {
    error = "Gebruik een realistisch aantal werkbare dagen per jaar.";
  } else if (
    Number.isNaN(parsedDeclarabilityPercentage) ||
    parsedDeclarabilityPercentage < 50 ||
    parsedDeclarabilityPercentage > 90
  ) {
    error = "Gebruik een declarabelheidspercentage tussen 50% en 90%.";
  } else if (Number.isNaN(parsedMonthlyOverhead) || parsedMonthlyOverhead < 0) {
    error = "Overhead per maand kan niet negatief zijn.";
  } else if (Number.isNaN(parsedMonthlyPensionBuffer) || parsedMonthlyPensionBuffer < 0) {
    error = "Pensioenbuffer per maand kan niet negatief zijn.";
  }

  const result = error
    ? null
    : calculateZzpTariff({
        desiredNetMonthlyIncome: parsedNetMonthlyIncome,
        workableDaysPerYear: parsedWorkableDaysPerYear,
        declarabilityPercentage: parsedDeclarabilityPercentage,
        monthlyOverhead: parsedMonthlyOverhead,
        monthlyPensionBuffer: parsedMonthlyPensionBuffer,
        taxProfile,
      });

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Gewenst netto maandinkomen
          </label>
          <input
            value={desiredNetMonthlyIncome}
            onChange={(event) => setDesiredNetMonthlyIncome(event.target.value)}
            placeholder="3500"
            className={inputClass}
            inputMode="decimal"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Werkbare dagen per jaar
          </label>
          <input
            value={workableDaysPerYear}
            onChange={(event) => setWorkableDaysPerYear(event.target.value)}
            className={inputClass}
            inputMode="decimal"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            365 min weekenden, vakantie, feestdagen en gemiddeld ziekteverzuim
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-4">
          <label className="block text-xs font-black uppercase tracking-wide text-slate-600">
            Declarabelheidspercentage
          </label>
          <span className="text-sm font-black text-slate-900">
            {formatNumber(parsedDeclarabilityPercentage, 0)}%
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="90"
          step="1"
          value={declarabilityPercentage}
          onChange={(event) => setDeclarabilityPercentage(event.target.value)}
          className="w-full accent-teal-500"
        />
        <p className="mt-1 text-[11px] text-slate-500">
          Niet alle werkuren zijn te factureren — acquisitie, administratie, vakantie tellen mee
        </p>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Overhead per maand
          </label>
          <input
            value={monthlyOverhead}
            onChange={(event) => setMonthlyOverhead(event.target.value)}
            className={inputClass}
            inputMode="decimal"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Accountant, software, verzekeringen, kantoorkosten
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Gewenste pensioenbuffer per maand
          </label>
          <input
            value={monthlyPensionBuffer}
            onChange={(event) => setMonthlyPensionBuffer(event.target.value)}
            className={inputClass}
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
          ZZP-belastingdruk
        </label>
        <select
          value={taxProfile}
          onChange={(event) => setTaxProfile(event.target.value as ZzpTaxProfile)}
          className={inputClass}
        >
          <option value="starter">Starter met MKB-winstvrijstelling 2026</option>
          <option value="established">Gevestigd ZZP geen startersaftrek</option>
        </select>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {result ? (
        <>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Minimaal dagtarief
              </p>
              <p className="mt-2 text-4xl font-black text-emerald-900">
                {formatEuro(result.minimumDayRate, 0)}
              </p>
              <p className="mt-2 text-sm text-slate-700">per dag</p>
            </div>
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
                Minimaal uurtarief
              </p>
              <p className="mt-2 text-4xl font-black text-emerald-900">
                {formatEuro(result.minimumHourlyRate, 0)}
              </p>
              <p className="mt-2 text-sm text-slate-700">per uur</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Vereiste omzet per jaar
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.requiredAnnualRevenue, 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Belasting (schatting)
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.estimatedAnnualTax, 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Zvw-premie
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.zvwPremium, 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Effectieve belastingdruk
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatNumber(result.effectiveCombinedBurdenRate)}%
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 bg-white text-sm">
              <tbody className="divide-y divide-slate-200">
                {[
                  ["Gewenst netto inkomen per jaar", formatEuro(result.netAnnualIncome, 0)],
                  ["Gekozen box 1-schatting", `${formatNumber(result.selectedTaxRate)}%`],
                  ["Benodigd bruto jaarinkomen", formatEuro(result.requiredGrossAnnualIncome, 0)],
                  ["Belasting volgens schatting", formatEuro(result.estimatedAnnualTax, 0)],
                  ["Overhead per jaar", formatEuro(result.annualOverhead, 0)],
                  ["Pensioenbuffer per jaar", formatEuro(result.annualPensionBuffer, 0)],
                  ["Zvw-premie 2026 (5,65%)", formatEuro(result.zvwPremium, 0)],
                  ["Declarabele dagen", formatNumber(result.declarableDays, 0)],
                  ["Totale kosten / vereiste omzet", formatEuro(result.totalAnnualCosts, 0)],
                ].map(([label, value]) => (
                  <tr key={String(label)}>
                    <td className="px-4 py-3 font-medium text-slate-600">{label}</td>
                    <td className="px-4 py-3 text-right font-black text-slate-900">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
            Dit is een indicatieve berekening. Schakel een ZZP-accountant in voor je werkelijke
            belastingaangifte, recht op zelfstandigenaftrek (urencriterium: min. 1.225 uur/jaar)
            en aftrekposten.
          </div>

          <div className="mt-6">
            <ToolResultCta />
          </div>
        </>
      ) : null}
    </div>
  );
}
