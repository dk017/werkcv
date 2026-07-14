"use client";

import { useState } from "react";
import SalaryResultCvCta from "@/components/tools/SalaryResultCvCta";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { calculateYearEndBonus, type YearEndBonusResult } from "@/lib/tools/moat-calculators";
import { estimateNetFromTaxableIncome } from "@/lib/tools/netto-bruto";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const percentagePresets = ["8,33", "8", "5", "4,17"];

type CalculationMethod = "percentage" | "thirteenth-month";
type DisplayResult = YearEndBonusResult & {
  netBonusEstimate: number;
  estimatedWithholding: number;
  appliedPercentage: number;
};

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits,
  }).format(value);
}

export default function EindejaarsuitkeringTool() {
  const [calculationMethod, setCalculationMethod] = useState<CalculationMethod>("percentage");
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("3600");
  const [bonusPercentage, setBonusPercentage] = useState("8,33");
  const [monthsWorked, setMonthsWorked] = useState("12");
  const [result, setResult] = useState<DisplayResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedMonthlySalary = parseDecimal(monthlyGrossSalary);
    const parsedBonusPercentage = calculationMethod === "thirteenth-month"
      ? 100 / 12
      : parseDecimal(bonusPercentage);
    const parsedMonthsWorked = parseDecimal(monthsWorked);

    if (Number.isNaN(parsedMonthlySalary) || parsedMonthlySalary <= 0 || parsedMonthlySalary > 50000) {
      setError("Vul een realistisch bruto maandsalaris in.");
      return;
    }

    if (Number.isNaN(parsedBonusPercentage) || parsedBonusPercentage < 0 || parsedBonusPercentage > 30) {
      setError("Gebruik een realistisch percentage, bijvoorbeeld 8,33.");
      return;
    }

    if (Number.isNaN(parsedMonthsWorked) || parsedMonthsWorked <= 0 || parsedMonthsWorked > 12) {
      setError("Vul het aantal maanden in tussen 1 en 12.");
      return;
    }

    const grossResult = calculateYearEndBonus({
      monthlyGrossSalary: parsedMonthlySalary,
      bonusPercentage: parsedBonusPercentage,
      monthsWorked: parsedMonthsWorked,
    });
    const baseTaxEstimate = estimateNetFromTaxableIncome({
      taxableAnnualIncome: grossResult.annualBaseSalary,
      applyTaxCredits: true,
      ageProfile: "under_aow",
    });
    const totalTaxEstimate = estimateNetFromTaxableIncome({
      taxableAnnualIncome: grossResult.annualBaseSalary + grossResult.proratedBonus,
      applyTaxCredits: true,
      ageProfile: "under_aow",
    });
    const netBonusEstimate = Math.max(0, totalTaxEstimate.netAnnualIncome - baseTaxEstimate.netAnnualIncome);

    setError("");
    setResult({
      ...grossResult,
      netBonusEstimate,
      estimatedWithholding: Math.max(0, grossResult.proratedBonus - netBonusEstimate),
      appliedPercentage: parsedBonusPercentage,
    });
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Type uitkering
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {([
                ["percentage", "Eindejaarsuitkering in %"],
                ["thirteenth-month", "Vaste 13e maand"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setCalculationMethod(value);
                    setResult(null);
                    setError("");
                  }}
                  className={`border-2 p-3 text-left text-sm font-black transition-colors ${calculationMethod === value ? "border-black bg-black text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Een vaste 13e maand is één bruto maandsalaris. Een eindejaarsuitkering wordt meestal als percentage van de afgesproken loonbasis berekend.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Bruto maandsalaris
              </label>
              <input
                value={monthlyGrossSalary}
                onChange={(event) => setMonthlyGrossSalary(event.target.value)}
                placeholder="bijv. 3600"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div className={calculationMethod === "thirteenth-month" ? "opacity-60" : ""}>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Eindejaarsuitkering %
              </label>
              <input
                value={bonusPercentage}
                onChange={(event) => setBonusPercentage(event.target.value)}
                placeholder="8,33"
                className={inputClass}
                inputMode="decimal"
                disabled={calculationMethod === "thirteenth-month"}
              />
              <div className={`mt-2 flex flex-wrap gap-2 ${calculationMethod === "thirteenth-month" ? "hidden" : ""}`}>
                {percentagePresets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setBonusPercentage(preset);
                      setResult(null);
                      setError("");
                    }}
                    className="border-2 border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700 hover:border-teal-300 hover:bg-teal-50 transition-colors"
                  >
                    {preset}%
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Maanden gewerkt dit jaar
              </label>
              <input
                value={monthsWorked}
                onChange={(event) => setMonthsWorked(event.target.value)}
                placeholder="12"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Handig als je in de loop van het jaar bent gestart en de uitkering pro rata is.
              </p>
            </div>
          </div>

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ borderWidth: "3px" }}
          >
            Bereken eindejaarsuitkering
          </button>

          <p className="text-xs text-slate-500 text-center">
            WerkCV berekent een bruto indicatie. Of je recht hebt op een 13e maand of percentage hangt af van je cao, contract en werkgeversbeleid.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
              Bruto indicatie
            </p>
            <p className="text-4xl font-black text-emerald-900 mb-2">
              {formatEuro(result.proratedBonus)}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dat is jouw geschatte {calculationMethod === "thirteenth-month" ? "13e maand" : "eindejaarsuitkering"} op basis van {monthsWorked} gewerkte maanden en {formatNumber(result.appliedPercentage)}% van je bruto jaarsalaris.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">Netto jaarindicatie</p>
                <p className="mt-1 text-xl font-black text-slate-900">{formatEuro(result.netBonusEstimate)}</p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">Geschatte belastingimpact</p>
                <p className="mt-1 text-xl font-black text-slate-900">{formatEuro(result.estimatedWithholding)}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-600">
              De netto-indicatie vergelijkt je geschatte netto jaarinkomen vóór en na de uitkering met de belastingtarieven en heffingskortingen van 2026. Je loonstrook kan afwijken door de tabel bijzondere beloningen, pensioen en persoonlijke inhoudingen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto jaarsalaris</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.annualBaseSalary, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Volledig jaar</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.fullYearBonus)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">December incl. bonus</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.decemberGrossWithBonus)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Opzij per werkmaand</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyBonusReserve)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Equivalent van maandloon
              </p>
              <p className="text-lg font-black text-slate-900 mb-1">{formatNumber(result.bonusEquivalentMonths)} maand</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Bij 8,33% over een volledig jaar kom je ongeveer uit op 1 extra bruto maandsalaris.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Praktische nuance
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Sommige cao&apos;s rekenen met een vaste 13e maand, andere met een percentage.</li>
                <li>Niet elke werkgever geeft een eindejaarsuitkering; het is geen algemene wettelijke verplichting.</li>
                <li>Bij indiensttreding of uitdiensttreding is pro rata gebruikelijk, maar controleer altijd je contract.</li>
              </ul>
            </div>
          </div>

          <SalaryResultCvCta
            toolName="eindejaarsuitkering-berekenen"
            title="Maak je CV klaar voor een sterker totaalpakket"
            text="Een 13e maand of eindejaarsuitkering verandert je totale beloning. Als je verder kijkt, maak dan een CV dat past bij de rol, senioriteit en voorwaarden die je nu wilt."
            insightText="Recruiters zien sneller waarde als je CV laat zien welke verantwoordelijkheid, impact en ervaring jouw gewenste beloningspakket onderbouwen."
            primaryLabel="Open editor voor beter aanbod"
            primaryHref="/editor?template=professional&startSource=year_end_bonus_result"
            secondaryLabel="Vergelijk eerst templates"
            secondaryHref="/templates?startSource=year_end_bonus_template_compare"
            resultState="year_end_bonus_result"
          />

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError("");
            }}
            className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Opnieuw berekenen
          </button>
        </div>
      )}
    </div>
  );
}
