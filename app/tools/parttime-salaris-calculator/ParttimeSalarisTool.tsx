"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateParttimeSalary,
  type ParttimeSalaryMode,
  type ParttimeSalaryResult,
} from "@/lib/tools/moat-calculators";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const targetHourPresets = [24, 28, 32, 36];

function formatPercent(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export default function ParttimeSalarisTool() {
  const [mode, setMode] = useState<ParttimeSalaryMode>("monthly");
  const [fullTimeSalary, setFullTimeSalary] = useState("3600");
  const [fullTimeHours, setFullTimeHours] = useState("40");
  const [targetHours, setTargetHours] = useState("32");
  const [holidayPercentage, setHolidayPercentage] = useState("8");
  const [result, setResult] = useState<ParttimeSalaryResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedSalary = parseDecimal(fullTimeSalary);
    const parsedFullTimeHours = parseDecimal(fullTimeHours);
    const parsedTargetHours = parseDecimal(targetHours);
    const parsedHolidayPercentage = parseDecimal(holidayPercentage);

    if (Number.isNaN(parsedSalary) || parsedSalary <= 0) {
      setError(`Vul een geldig bruto ${mode === "monthly" ? "maand" : "jaar"}salaris in.`);
      return;
    }

    if (Number.isNaN(parsedFullTimeHours) || parsedFullTimeHours <= 0 || parsedFullTimeHours > 80) {
      setError("Vul een realistisch aantal fulltime-uren per week in.");
      return;
    }

    if (Number.isNaN(parsedTargetHours) || parsedTargetHours <= 0 || parsedTargetHours > parsedFullTimeHours) {
      setError("Je gewenste parttime uren moeten lager zijn dan of gelijk zijn aan het fulltime schema.");
      return;
    }

    if (Number.isNaN(parsedHolidayPercentage) || parsedHolidayPercentage < 0 || parsedHolidayPercentage > 25) {
      setError("Gebruik een realistisch vakantiegeldpercentage, bijvoorbeeld 8.");
      return;
    }

    setError("");
    setResult(calculateParttimeSalary({
      mode,
      fullTimeSalary: parsedSalary,
      fullTimeHours: parsedFullTimeHours,
      targetHours: parsedTargetHours,
      holidayPercentage: parsedHolidayPercentage,
    }));
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Reken vanaf
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["monthly", "Fulltime maandsalaris"],
                ["annual", "Fulltime jaarsalaris"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value);
                    setResult(null);
                    setError("");
                  }}
                  className={`p-3 border-2 text-left transition-colors ${
                    mode === value
                      ? "bg-black text-white border-black"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="font-black text-sm">{label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Bruto {mode === "monthly" ? "maand" : "jaar"}salaris fulltime
              </label>
              <input
                value={fullTimeSalary}
                onChange={(event) => setFullTimeSalary(event.target.value)}
                placeholder={mode === "monthly" ? "bijv. 3600" : "bijv. 43200"}
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Fulltime uren per week
              </label>
              <input
                value={fullTimeHours}
                onChange={(event) => setFullTimeHours(event.target.value)}
                placeholder="40"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Gewenste parttime uren
              </label>
              <input
                value={targetHours}
                onChange={(event) => setTargetHours(event.target.value)}
                placeholder="32"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Vakantiegeld %
              </label>
              <input
                value={holidayPercentage}
                onChange={(event) => setHolidayPercentage(event.target.value)}
                placeholder="8"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Handig om je parttime bruto jaarbedrag meteen inclusief opgebouwde vakantiegeld-indicatie te zien.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {targetHourPresets.map((hours) => (
                <button
                  key={hours}
                  type="button"
                  onClick={() => {
                    setTargetHours(String(hours));
                    setResult(null);
                    setError("");
                  }}
                  className="border-2 border-slate-200 bg-slate-50 px-3 py-2 text-xs font-black text-slate-700 hover:border-teal-300 hover:bg-teal-50 transition-colors"
                >
                  {hours} uur
                </button>
              ))}
            </div>
          </div>

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ borderWidth: "3px" }}
          >
            Bereken parttime salaris
          </button>

          <p className="text-xs text-slate-500 text-center">
            Deze tool rekent pro rata vanaf een fulltime salaris en laat direct zien wat 24, 28, 32 of 36 uur bruto betekenen.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
              Jouw parttime indicatie
            </p>
            <p className="text-4xl font-black text-emerald-900 mb-2">
              {formatEuro(result.targetMonthlyGross)}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dat is {formatPercent(result.targetFtePercentage)}% van fulltime, op basis van {targetHours} uur per week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per maand bruto</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.targetMonthlyGross)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per jaar bruto</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.targetAnnualGross, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Vakantiegeld per jaar</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.targetHolidayAllowance, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto uurloon</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.hourlyGross)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Verschil met fulltime
              </p>
              <p className="text-lg font-black text-slate-900 mb-1">{formatEuro(result.monthlyDifference)} per maand</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Jaarlijks is dat ongeveer {formatEuro(result.annualDifference, 0)} minder bruto dan hetzelfde salaris op fulltime basis.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Belangrijke nuance
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Deze tool rekent met een zuivere pro-rata verhouding.</li>
                <li>ORT, toeslagen, provisie, IKB of ploegendienst kunnen de echte uitkomst veranderen.</li>
                <li>Voor netto uitkomst of loonheffingskorting moet je daarna naar de netto-bruto tool.</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex items-center justify-between gap-3 mb-3">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Vergelijking met veelgekozen parttime schema&apos;s
              </p>
              <span className="text-[11px] text-slate-500">zelfde schaal, andere uren</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
              {result.scenarios.map((scenario) => {
                const isCurrent = Number(targetHours) === scenario.hours;

                return (
                  <div
                    key={scenario.hours}
                    className={`rounded-xl border p-4 ${isCurrent ? "border-teal-300 bg-teal-50" : "border-slate-200 bg-white"}`}
                  >
                    <p className={`text-[11px] font-black uppercase tracking-wide mb-1 ${isCurrent ? "text-teal-700" : "text-slate-500"}`}>
                      {isCurrent ? "Jouw keuze" : "Scenario"}
                    </p>
                    <p className="text-lg font-black text-slate-900">{scenario.hours} uur</p>
                    <p className="text-sm text-slate-600 mt-1">{formatPercent(scenario.ratio)}% FTE</p>
                    <p className="text-sm font-black text-slate-900 mt-3">{formatEuro(scenario.monthlyGross)} p/m</p>
                    <p className="text-xs text-slate-500">{formatEuro(scenario.annualGross, 0)} per jaar bruto</p>
                  </div>
                );
              })}
            </div>
          </div>

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
