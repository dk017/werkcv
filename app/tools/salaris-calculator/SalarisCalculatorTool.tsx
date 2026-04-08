"use client";

import Link from "next/link";
import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateSalaryBenchmark,
  getSalaryBenchmarkById,
  salaryBenchmarkGroups,
  salaryEducationOptions,
  salaryExperienceOptions,
  salaryRegionOptions,
  type SalaryBenchmarkCalculationResult,
  type SalaryBenchmarkId,
  type SalaryEducationLevel,
  type SalaryExperienceLevel,
  type SalaryRegionBand,
} from "@/lib/tools/salary-benchmark";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";
const hourPresets = [24, 32, 36, 40];
const totalSteps = 3;

function statusLabel(result: SalaryBenchmarkCalculationResult): string {
  switch (result.status) {
    case "below_p25":
      return "Waarschijnlijk onderbetaald voor dit profiel";
    case "below_median":
      return "Onder jouw profielmediaan";
    case "around_median":
      return "Marktconform voor dit profiel";
    case "above_median":
      return "Sterk ten opzichte van de markt";
    case "above_p75":
      return "Ruim boven de marktband";
    default:
      return "Persoonlijke benchmark";
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
    return `Voor ${result.weeklyHours} uur per week ligt de persoonlijke mediaan voor ${result.benchmark.shortLabel.toLowerCase()} rond ${formatEuro(result.monthlyMedian, 0)} bruto per maand.`;
  }

  const direction = (result.monthlyDifferenceFromMedian ?? 0) >= 0 ? "boven" : "onder";

  return `Jouw salaris ligt ${formatEuro(Math.abs(result.monthlyDifferenceFromMedian ?? 0), 0)} ${direction} de persoonlijke mediaan voor ${result.benchmark.shortLabel.toLowerCase()} bij ${result.weeklyHours} uur per week.`;
}

function rangePosition(min: number, max: number, value: number): number {
  if (max <= min) {
    return 50;
  }

  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Rol en urennorm";
    case 2:
      return "Ervaring en profiel";
    case 3:
      return "Jouw salaris";
    default:
      return "Salaris kompas";
  }
}

export default function SalarisCalculatorTool() {
  const [step, setStep] = useState(1);
  const [benchmarkId, setBenchmarkId] = useState<SalaryBenchmarkId>("software-developer");
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [experienceLevel, setExperienceLevel] = useState<SalaryExperienceLevel>("medior");
  const [educationLevel, setEducationLevel] = useState<SalaryEducationLevel>("hbo");
  const [regionBand, setRegionBand] = useState<SalaryRegionBand>("gemiddeld");
  const [currentSalary, setCurrentSalary] = useState("");
  const [result, setResult] = useState<SalaryBenchmarkCalculationResult | null>(null);
  const [error, setError] = useState("");

  const selectedBenchmark = getSalaryBenchmarkById(benchmarkId);
  const selectedExperience = salaryExperienceOptions.find((option) => option.id === experienceLevel)!;
  const selectedEducation = salaryEducationOptions.find((option) => option.id === educationLevel)!;
  const selectedRegion = salaryRegionOptions.find((option) => option.id === regionBand)!;

  function validateCurrentStep(): boolean {
    const parsedHours = parseDecimal(weeklyHours);

    if (step === 1) {
      if (Number.isNaN(parsedHours) || parsedHours < 8 || parsedHours > 60) {
        setError("Vul een realistisch aantal uren per week in, bijvoorbeeld 32, 36 of 40.");
        return false;
      }
    }

    if (step === 3 && currentSalary.trim()) {
      const parsedSalary = parseDecimal(currentSalary);
      if (Number.isNaN(parsedSalary) || parsedSalary <= 0) {
        setError("Vul een geldig bruto maandsalaris in of laat het veld leeg voor alleen je profielbenchmark.");
        return false;
      }
    }

    setError("");
    return true;
  }

  function handleNext() {
    if (!validateCurrentStep()) {
      return;
    }

    setStep((current) => Math.min(totalSteps, current + 1));
  }

  function handleCalculate() {
    if (!validateCurrentStep()) {
      return;
    }

    const parsedHours = parseDecimal(weeklyHours);
    const parsedSalary = currentSalary.trim() ? parseDecimal(currentSalary) : NaN;

    setResult(
      calculateSalaryBenchmark({
        benchmarkId,
        weeklyHours: parsedHours,
        experienceLevel,
        educationLevel,
        regionBand,
        currentMonthlyGross: Number.isNaN(parsedSalary) ? null : parsedSalary,
      }),
    );
  }

  const rangeMin = result
    ? Math.min(result.monthlyP25, result.currentMonthlyGross ?? result.monthlyP25)
    : 0;
  const rangeMax = result
    ? Math.max(result.monthlyP75, result.currentMonthlyGross ?? result.monthlyP75)
    : 0;

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-6">
          <div className="rounded-xl border-2 border-black bg-[#FFFEF0] p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Salaris kompas
                </p>
                <h3 className="mt-1 text-2xl font-black text-slate-900">{getStepTitle(step)}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className={`min-w-[110px] border-2 px-3 py-2 text-center text-xs font-black uppercase tracking-wide ${
                      item === step
                        ? "border-black bg-[#4ECDC4] text-black"
                        : item < step
                          ? "border-black bg-black text-white"
                          : "border-slate-300 bg-white text-slate-500"
                    }`}
                  >
                    Stap {item}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              WerkCV combineert CBS-beroepsdata met een transparante profielcorrectie voor ervaring,
              opleidingsniveau en regio. Zo krijg je een sterkere salarisrichting dan een kale mediaan.
            </p>
          </div>

          {step === 1 ? (
            <div className="space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Beroepsgroep
                </label>
                <select
                  value={benchmarkId}
                  onChange={(event) => {
                    setBenchmarkId(event.target.value as SalaryBenchmarkId);
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
                <p className="mt-1 text-[11px] text-slate-500">{selectedBenchmark.description}</p>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Uren per week
                </label>
                <input
                  value={weeklyHours}
                  onChange={(event) => setWeeklyHours(event.target.value)}
                  placeholder="bijv. 40"
                  className={inputClass}
                  inputMode="decimal"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  {hourPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setWeeklyHours(String(preset))}
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
          ) : null}

          {step === 2 ? (
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Ervaringsniveau
                </label>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {salaryExperienceOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setExperienceLevel(option.id)}
                      className={`border-2 p-4 text-left transition-colors ${
                        experienceLevel === option.id
                          ? "border-black bg-[#4ECDC4] text-black"
                          : "border-slate-300 bg-white text-slate-700 hover:border-black"
                      }`}
                    >
                      <p className="text-sm font-black">{option.label}</p>
                      <p className="mt-1 text-xs leading-relaxed">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Opleidingsniveau
                </label>
                <div className="grid gap-3 md:grid-cols-3">
                  {salaryEducationOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setEducationLevel(option.id)}
                      className={`border-2 p-4 text-left transition-colors ${
                        educationLevel === option.id
                          ? "border-black bg-yellow-300 text-black"
                          : "border-slate-300 bg-white text-slate-700 hover:border-black"
                      }`}
                    >
                      <p className="text-sm font-black">{option.label}</p>
                      <p className="mt-1 text-xs leading-relaxed">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Regio of zoekgebied
                </label>
                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
                  {salaryRegionOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setRegionBand(option.id)}
                      className={`border-2 p-4 text-left transition-colors ${
                        regionBand === option.id
                          ? "border-black bg-pink-200 text-black"
                          : "border-slate-300 bg-white text-slate-700 hover:border-black"
                      }`}
                    >
                      <p className="text-sm font-black">{option.label}</p>
                      <p className="mt-1 text-xs leading-relaxed">{option.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-5">
              <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                    Jouw bruto maandsalaris
                  </label>
                  <input
                    value={currentSalary}
                    onChange={(event) => setCurrentSalary(event.target.value)}
                    placeholder="optioneel, bijvoorbeeld 4200"
                    className={inputClass}
                    inputMode="decimal"
                  />
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Laat leeg als je alleen je persoonlijke marktband wilt zien. Vul het in als je
                    wilt weten of jouw huidige loon onder, rond of boven die band zit.
                  </p>
                </div>
                <div className="border-2 border-black bg-slate-50 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                    Jouw profielsamenvatting
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>
                      <span className="font-black text-slate-900">Rol:</span> {selectedBenchmark.shortLabel}
                    </p>
                    <p>
                      <span className="font-black text-slate-900">Uren:</span> {weeklyHours} uur
                    </p>
                    <p>
                      <span className="font-black text-slate-900">Ervaring:</span> {selectedExperience.label}
                    </p>
                    <p>
                      <span className="font-black text-slate-900">Opleiding:</span> {selectedEducation.label}
                    </p>
                    <p>
                      <span className="font-black text-slate-900">Regio:</span> {selectedRegion.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <div className="flex flex-wrap justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setError("");
                setStep((current) => Math.max(1, current - 1));
              }}
              disabled={step === 1}
              className={`border-2 px-5 py-3 text-sm font-black ${
                step === 1
                  ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                  : "border-black bg-white text-black"
              }`}
            >
              Vorige stap
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="border-2 border-black bg-black px-5 py-3 text-sm font-black text-white"
              >
                Volgende stap
              </button>
            ) : (
              <button
                type="button"
                onClick={handleCalculate}
                className="border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
                style={{ borderWidth: "3px" }}
              >
                Bereken mijn salaris kompas
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border-2 border-black bg-[#FFFEF0] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div
                  className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-black uppercase tracking-wide ${statusClasses(result)}`}
                >
                  {statusLabel(result)}
                </div>
                <h3 className="mt-3 text-3xl font-black text-slate-900">
                  {result.benchmark.shortLabel}
                </h3>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                  {insightCopy(result)}
                </p>
              </div>
              <div className="min-w-[220px] rounded-xl border border-slate-200 bg-white px-4 py-3">
                <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Persoonlijke mediaan
                </p>
                <p className="text-3xl font-black text-slate-900">
                  {formatEuro(result.monthlyMedian, 0)}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  bruto per maand bij {result.weeklyHours} uur
                </p>
              </div>
            </div>
          </div>

          <div className="border-2 border-black bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Marktband visualisatie
                </p>
                <h4 className="mt-1 text-xl font-black text-slate-900">
                  Jouw profielband voor {selectedBenchmark.shortLabel.toLowerCase()}
                </h4>
              </div>
              <p className="text-sm font-medium text-slate-600">
                Gebaseerd op ervaring, opleiding en regio-aanpassing van{" "}
                <span className="font-black text-slate-900">
                  {result.totalAdjustmentPercentage >= 0 ? "+" : ""}
                  {result.totalAdjustmentPercentage}%
                </span>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative h-4 rounded-full border-2 border-black bg-slate-100">
                <div
                  className="absolute left-0 top-0 h-full rounded-l-full bg-amber-300"
                  style={{ width: `${rangePosition(rangeMin, rangeMax, result.monthlyP25)}%` }}
                />
                <div
                  className="absolute top-0 h-full bg-emerald-400"
                  style={{
                    left: `${rangePosition(rangeMin, rangeMax, result.monthlyP25)}%`,
                    width: `${Math.max(
                      4,
                      rangePosition(rangeMin, rangeMax, result.monthlyP75) -
                        rangePosition(rangeMin, rangeMax, result.monthlyP25),
                    )}%`,
                  }}
                />
                <div
                  className="absolute top-1/2 h-8 w-1 -translate-y-1/2 bg-black"
                  style={{ left: `${rangePosition(rangeMin, rangeMax, result.monthlyMedian)}%` }}
                />
                {result.currentMonthlyGross !== null ? (
                  <div
                    className="absolute top-1/2 h-10 w-3 -translate-y-1/2 -translate-x-1/2 rounded-full border-2 border-black bg-pink-300"
                    style={{ left: `${rangePosition(rangeMin, rangeMax, result.currentMonthlyGross)}%` }}
                  />
                ) : null}
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-4">
                {[
                  ["25e percentiel", formatEuro(result.monthlyP25, 0)],
                  ["Mediaan", formatEuro(result.monthlyMedian, 0)],
                  ["75e percentiel", formatEuro(result.monthlyP75, 0)],
                  [
                    result.currentMonthlyGross !== null ? "Jouw salaris" : "CBS basis mediaan",
                    formatEuro(
                      result.currentMonthlyGross !== null
                        ? result.currentMonthlyGross
                        : result.baseMonthlyMedian,
                      0,
                    ),
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="text-xl font-black text-slate-900">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
            <div className="space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    Persoonlijke jaarband
                  </p>
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

                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-500">
                    Ruwe CBS basis
                  </p>
                  <div className="space-y-2 text-sm text-slate-700">
                    <div className="flex items-center justify-between gap-4">
                      <span>25e percentiel</span>
                      <span className="font-black text-slate-900">{formatEuro(result.baseMonthlyP25, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>Mediaan</span>
                      <span className="font-black text-slate-900">{formatEuro(result.baseMonthlyMedian, 0)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>75e percentiel</span>
                      <span className="font-black text-slate-900">{formatEuro(result.baseMonthlyP75, 0)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {result.currentMonthlyGross !== null ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Jouw salaris
                    </p>
                    <p className="text-2xl font-black text-slate-900">
                      {formatEuro(result.currentMonthlyGross, 0)}
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Verschil met mediaan
                    </p>
                    <p
                      className={`text-2xl font-black ${
                        (result.monthlyDifferenceFromMedian ?? 0) >= 0 ? "text-emerald-700" : "text-rose-700"
                      }`}
                    >
                      {(result.monthlyDifferenceFromMedian ?? 0) >= 0 ? "+" : "-"}
                      {formatEuro(Math.abs(result.monthlyDifferenceFromMedian ?? 0), 0)}
                    </p>
                  </div>
                  <div className="rounded-xl border-2 border-black bg-white p-4">
                    <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Afwijking in %
                    </p>
                    <p className="text-2xl font-black text-slate-900">
                      {result.percentDifferenceFromMedian !== null
                        ? `${result.percentDifferenceFromMedian >= 0 ? "+" : ""}${result.percentDifferenceFromMedian}%`
                        : "n.v.t."}
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
                <p className="text-sm font-medium leading-relaxed text-amber-900">
                  WerkCV gebruikt hier CBS beroepsdata uit {result.benchmark.dataYear} ({result.benchmark.dataNote.toLowerCase()}) als feitelijke basis. Ervaring, opleiding en regio zijn expliciete heuristische correcties om het kompas nuttiger te maken voor individuele profielen, niet om een exacte cao-inschaling te claimen.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-xl border-2 border-black bg-slate-50 p-5">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  Jouw profielaanpassingen
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <div>
                    <p className="font-black text-slate-900">{selectedExperience.label}</p>
                    <p>{selectedExperience.description}</p>
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{selectedEducation.label}</p>
                    <p>{selectedEducation.description}</p>
                  </div>
                  <div>
                    <p className="font-black text-slate-900">{selectedRegion.label}</p>
                    <p>{selectedRegion.description}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-black bg-black p-5 text-white">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                  Slimme vervolgstap
                </p>
                <h4 className="mt-2 text-xl font-black">
                  Gebruik je kompas direct in je volgende gesprek of sollicitatie
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Dit is het moment om je bruto range naar netto te vertalen, je onderhandeling voor te bereiden of je CV klaar te zetten voor beter betalende rollen.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href="/tools/netto-bruto-calculator"
                    className="border-2 border-white bg-[#4ECDC4] px-4 py-2 text-sm font-black text-slate-900"
                  >
                    Reken netto door
                  </Link>
                  <Link
                    href="/tools/salaris-onderhandeling"
                    className="border-2 border-white bg-transparent px-4 py-2 text-sm font-black text-white"
                  >
                    Onderhandelingsscript
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError("");
              setStep(1);
            }}
            className="w-full rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            Nieuw salaris kompas starten
          </button>
        </div>
      )}
    </div>
  );
}
