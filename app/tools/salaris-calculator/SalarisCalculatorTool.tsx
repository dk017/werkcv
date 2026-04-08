"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateSalaryBenchmark,
  getSalaryBenchmarkById,
  salaryBenchmarkGroups,
  type SalaryBenchmarkCalculationResult,
  type SalaryBenchmarkId,
} from "@/lib/tools/salary-benchmark";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";
const hourPresets = [24, 32, 36, 40];

function statusLabel(result: SalaryBenchmarkCalculationResult): string {
  switch (result.status) {
    case "below_p25":
      return "Onder de marktband";
    case "below_median":
      return "Onder de mediaan";
    case "around_median":
      return "Rond de mediaan";
    case "above_median":
      return "Boven de mediaan";
    case "above_p75":
      return "Boven het 75e percentiel";
    default:
      return "CBS benchmark";
  }
}

function statusClasses(result: SalaryBenchmarkCalculationResult): string {
  switch (result.status) {
    case "below_p25":
      return "bg-rose-100 border-rose-300 text-rose-800";
    case "below_median":
      return "bg-amber-100 border-amber-300 text-amber-800";
    case "around_median":
      return "bg-emerald-100 border-emerald-300 text-emerald-800";
    case "above_median":
      return "bg-sky-100 border-sky-300 text-sky-800";
    case "above_p75":
      return "bg-violet-100 border-violet-300 text-violet-800";
    default:
      return "bg-slate-100 border-slate-300 text-slate-700";
  }
}

function insightCopy(result: SalaryBenchmarkCalculationResult): string {
  if (result.currentMonthlyGross === null || result.percentDifferenceFromMedian === null) {
    return `Voor ${result.weeklyHours} uur per week ligt de CBS-mediaan voor ${result.benchmark.shortLabel.toLowerCase()} rond ${formatEuro(result.monthlyMedian, 0)} bruto per maand.`;
  }

  const direction = result.monthlyDifferenceFromMedian === null || result.monthlyDifferenceFromMedian >= 0
    ? "boven"
    : "onder";

  return `Jouw ingevoerde salaris ligt ${formatEuro(Math.abs(result.monthlyDifferenceFromMedian ?? 0), 0)} ${direction} de CBS-mediaan voor ${result.benchmark.shortLabel.toLowerCase()} bij ${result.weeklyHours} uur per week.`;
}

export default function SalarisCalculatorTool() {
  const [benchmarkId, setBenchmarkId] = useState<SalaryBenchmarkId>("software-developer");
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [currentSalary, setCurrentSalary] = useState("");
  const [result, setResult] = useState<SalaryBenchmarkCalculationResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedHours = parseDecimal(weeklyHours);
    const parsedSalary = currentSalary.trim() ? parseDecimal(currentSalary) : NaN;

    if (Number.isNaN(parsedHours) || parsedHours < 8 || parsedHours > 60) {
      setError("Vul een realistisch aantal uren per week in, bijvoorbeeld 32, 36 of 40.");
      return;
    }

    if (currentSalary.trim() && (Number.isNaN(parsedSalary) || parsedSalary <= 0)) {
      setError("Vul een geldig bruto maandsalaris in of laat dat veld leeg voor alleen de benchmark.");
      return;
    }

    setError("");
    setResult(calculateSalaryBenchmark({
      benchmarkId,
      weeklyHours: parsedHours,
      currentMonthlyGross: Number.isNaN(parsedSalary) ? null : parsedSalary,
    }));
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Beroepsgroep
            </label>
            <select
              value={benchmarkId}
              onChange={(event) => {
                setBenchmarkId(event.target.value as SalaryBenchmarkId);
                setResult(null);
              }}
              className={inputClass}
            >
              {salaryBenchmarkGroups.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.benchmarks.map((benchmark) => (
                    <option key={benchmark.id} value={benchmark.id}>
                      {benchmark.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              {getSalaryBenchmarkById(benchmarkId).description}
            </p>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Uren per week
            </label>
            <input
              value={weeklyHours}
              onChange={(event) => {
                setWeeklyHours(event.target.value);
                setResult(null);
              }}
              placeholder="bijv. 40"
              className={inputClass}
              inputMode="decimal"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {hourPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setWeeklyHours(String(preset));
                    setResult(null);
                  }}
                  className={`rounded-full border px-3 py-1 text-xs font-black transition-colors ${
                    weeklyHours === String(preset)
                      ? "border-black bg-black text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                  }`}
                >
                  {preset} uur
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
            Jouw bruto maandsalaris
          </label>
          <input
            value={currentSalary}
            onChange={(event) => {
              setCurrentSalary(event.target.value);
              setResult(null);
            }}
            placeholder="optioneel, bijvoorbeeld 4200"
            className={inputClass}
            inputMode="decimal"
          />
          <p className="text-[11px] text-slate-500 mt-1">
            Vul je salaris in exclusief vakantiegeld, bonus, 13e maand en pensioeninhouding. Laat leeg als je alleen de CBS-benchmark wilt zien.
          </p>
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

        <button
          type="button"
          onClick={handleCalculate}
          className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
          style={{ borderWidth: "3px" }}
        >
          {currentSalary.trim() ? "Check mijn salaris" : "Toon CBS benchmark"}
        </button>
      </div>

      {result ? (
        <div className="mt-6 space-y-5 border-t border-slate-200 pt-6">
          <div className="border-2 border-black bg-[#FFFEF0] p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${statusClasses(result)}`}>
                  {statusLabel(result)}
                </div>
                <h3 className="mt-3 text-2xl font-black text-slate-900">
                  {result.benchmark.shortLabel}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {insightCopy(result)}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 min-w-[180px]">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">CBS mediaan</p>
                <p className="text-2xl font-black text-slate-900">{formatEuro(result.monthlyMedian, 0)}</p>
                <p className="text-xs text-slate-500 mt-1">bruto per maand bij {result.weeklyHours} uur</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">25e percentiel</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyP25, 0)}</p>
              <p className="text-xs text-slate-500 mt-1">lage kant van de marktband</p>
            </div>
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-teal-700 mb-1">Mediaan</p>
              <p className="text-xl font-black text-teal-900">{formatEuro(result.monthlyMedian, 0)}</p>
              <p className="text-xs text-teal-700 mt-1">centrale CBS-benchmark</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">75e percentiel</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyP75, 0)}</p>
              <p className="text-xs text-slate-500 mt-1">bovenkant van de marktband</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Steekproef</p>
              <p className="text-xl font-black text-slate-900">{result.benchmark.sampleSize}</p>
              <p className="text-xs text-slate-500 mt-1">CBS-werknemers in 2024</p>
            </div>
          </div>

          {result.currentMonthlyGross !== null && result.currentHourlyGross !== null ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white border-2 border-black rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Jouw salaris</p>
                <p className="text-xl font-black text-slate-900">{formatEuro(result.currentMonthlyGross, 0)}</p>
                <p className="text-xs text-slate-500 mt-1">bruto per maand</p>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Jouw bruto uurloon</p>
                <p className="text-xl font-black text-slate-900">{formatEuro(result.currentHourlyGross)}</p>
                <p className="text-xs text-slate-500 mt-1">vergeleken op dezelfde urennorm</p>
              </div>
              <div className="bg-white border-2 border-black rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Verschil met mediaan</p>
                <p className={`text-xl font-black ${(result.monthlyDifferenceFromMedian ?? 0) >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                  {(result.monthlyDifferenceFromMedian ?? 0) >= 0 ? "+" : "-"}
                  {formatEuro(Math.abs(result.monthlyDifferenceFromMedian ?? 0), 0)}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {result.percentDifferenceFromMedian !== null
                    ? `${Math.abs(result.percentDifferenceFromMedian).toFixed(1)}% ten opzichte van de CBS-mediaan`
                    : "ten opzichte van de CBS-mediaan"}
                </p>
              </div>
            </div>
          ) : null}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Jaarbenchmark bij jouw urennorm</p>
              <div className="space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between gap-4">
                  <span>25e percentiel</span>
                  <span className="font-black text-slate-900">{formatEuro(result.annualP25, 0)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Mediaan</span>
                  <span className="font-black text-slate-900">{formatEuro(result.annualMedian, 0)}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>75e percentiel</span>
                  <span className="font-black text-slate-900">{formatEuro(result.annualP75, 0)}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Wat je hier wel en niet uit haalt</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Wel: een officiële CBS-benchmark per beroep, omgerekend naar jouw uren.</li>
                <li>Wel: inzicht of je onder, rond of boven de mediaan zit.</li>
                <li>Niet: bedrijfsgrootte, regio, bonus, CAO-trede of 13e maand.</li>
                <li>Niet: een exact aanbod of loonstrookvoorspelling.</li>
              </ul>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-900 leading-relaxed">
              WerkCV gebruikt hier CBS beroepsdata uit {result.benchmark.dataYear} ({result.benchmark.dataNote.toLowerCase()}) en vergelijkt op bruto uurloon. Dat maakt deze tool sterker dan een generieke sectorrange, maar het blijft een benchmark en geen persoonlijke loonstrook of CAO-inschaling.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError("");
            }}
            className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Opnieuw checken
          </button>
        </div>
      ) : null}
    </div>
  );
}
