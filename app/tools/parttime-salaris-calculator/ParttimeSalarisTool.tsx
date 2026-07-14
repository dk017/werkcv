"use client";

import { useState } from "react";
import SalaryResultCvCta from "@/components/tools/SalaryResultCvCta";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateParttimeSalary,
  type ParttimeSalaryMode,
  type ParttimeSalaryResult,
} from "@/lib/tools/moat-calculators";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const targetHourPresets = [24, 28, 32, 36, 38, 40];
const statutoryMinimumHourlyWage2026 = 14.99;

type CalculationDirection = "fulltime-to-parttime" | "parttime-to-fulltime";

function formatPercent(value: number): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits: 1,
  }).format(value);
}

export default function ParttimeSalarisTool() {
  const [direction, setDirection] = useState<CalculationDirection>("fulltime-to-parttime");
  const [mode, setMode] = useState<ParttimeSalaryMode>("monthly");
  const [fullTimeSalary, setFullTimeSalary] = useState("3600");
  const [fullTimeHours, setFullTimeHours] = useState("40");
  const [targetHours, setTargetHours] = useState("32");
  const [holidayPercentage, setHolidayPercentage] = useState("8");
  const [result, setResult] = useState<ParttimeSalaryResult | null>(null);
  const [error, setError] = useState("");
  const selectedHours = Number(targetHours);
  const selectedHoursLabel = Number.isFinite(selectedHours)
    ? `${formatPercent(selectedHours)} uur`
    : `${targetHours} uur`;

  function selectDirection(nextDirection: CalculationDirection) {
    setDirection(nextDirection);
    setFullTimeSalary("3600");
    setFullTimeHours(nextDirection === "fulltime-to-parttime" ? "40" : "32");
    setTargetHours(nextDirection === "fulltime-to-parttime" ? "32" : "40");
    setResult(null);
    setError("");
  }

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

    const invalidDirection = direction === "fulltime-to-parttime"
      ? parsedTargetHours > parsedFullTimeHours
      : parsedTargetHours < parsedFullTimeHours;

    if (Number.isNaN(parsedTargetHours) || parsedTargetHours <= 0 || parsedTargetHours > 80 || invalidDirection) {
      setError(direction === "fulltime-to-parttime"
        ? "Je gewenste parttime uren moeten lager zijn dan of gelijk zijn aan je fulltime uren."
        : "Je gewenste fulltime uren moeten hoger zijn dan of gelijk zijn aan je huidige parttime uren.");
      return;
    }

    if (Number.isNaN(parsedHolidayPercentage) || parsedHolidayPercentage < 0 || parsedHolidayPercentage > 25) {
      setError("Gebruik een realistisch vakantiegeldpercentage, bijvoorbeeld 8.");
      return;
    }

    setError("");
    if (direction === "fulltime-to-parttime") {
      setResult(calculateParttimeSalary({
        mode,
        fullTimeSalary: parsedSalary,
        fullTimeHours: parsedFullTimeHours,
        targetHours: parsedTargetHours,
        holidayPercentage: parsedHolidayPercentage,
      }));
    } else {
      const inferredFullTimeSalary = parsedSalary * (parsedTargetHours / parsedFullTimeHours);
      setResult(calculateParttimeSalary({
        mode,
        fullTimeSalary: inferredFullTimeSalary,
        fullTimeHours: parsedTargetHours,
        targetHours: parsedFullTimeHours,
        holidayPercentage: parsedHolidayPercentage,
      }));
    }
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Wat wil je omrekenen?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {([
                ["fulltime-to-parttime", "Fulltime naar parttime"],
                ["parttime-to-fulltime", "Parttime naar fulltime"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectDirection(value)}
                  className={`p-3 border-2 text-left text-sm font-black transition-colors ${
                    direction === value
                      ? "bg-black text-white border-black"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Reken vanaf
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["monthly", `${direction === "fulltime-to-parttime" ? "Fulltime" : "Parttime"} maandsalaris`],
                ["annual", `${direction === "fulltime-to-parttime" ? "Fulltime" : "Parttime"} jaarsalaris`],
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
                Bruto {mode === "monthly" ? "maand" : "jaar"}salaris {direction === "fulltime-to-parttime" ? "fulltime" : "parttime"}
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
                {direction === "fulltime-to-parttime" ? "Fulltime uren per week" : "Huidige parttime uren"}
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
                {direction === "fulltime-to-parttime" ? "Gewenste parttime uren" : "Gewenste fulltime uren"}
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

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-950">
            <p className="font-black mb-1">Minimumloon-check 2026</p>
            <p className="leading-relaxed">
              Voor werknemers van 21 jaar en ouder is het wettelijk minimumuurloon sinds 1 juli 2026
              {" "}{formatEuro(statutoryMinimumHourlyWage2026)} bruto per uur. Van januari tot en met juni was dit € 14,71. Na het berekenen tonen we hoe je ingevoerde salaris zich tot de actuele grens verhoudt.
            </p>
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
              {targetHourPresets.filter((hours) => direction === "fulltime-to-parttime"
                ? hours <= Number(fullTimeHours)
                : hours >= Number(fullTimeHours)).map((hours) => (
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
            {direction === "fulltime-to-parttime" ? "Bereken parttime salaris" : "Bereken fulltime salaris"}
          </button>

          <p className="text-xs text-slate-500 text-center">
            Deze tool rekent pro rata vanaf een fulltime salaris en laat direct zien wat 24, 28, 32 of 36 uur bruto betekenen.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
              Jouw {direction === "fulltime-to-parttime" ? "parttime" : "fulltime"} indicatie
            </p>
            <p className="text-4xl font-black text-emerald-900 mb-2">
              {formatEuro(direction === "fulltime-to-parttime" ? result.targetMonthlyGross : result.fullTimeMonthlyGross)}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {direction === "fulltime-to-parttime"
                ? `Dat is ${formatPercent(result.targetFtePercentage)}% van fulltime, op basis van ${targetHours} uur per week.`
                : `Dit is de pro-rata fulltime-equivalent bij ${targetHours} uur, omgerekend vanaf je salaris voor ${fullTimeHours} uur.`}
            </p>
          </div>

          <div className={`border-2 rounded-xl p-4 ${
            result.hourlyGross >= statutoryMinimumHourlyWage2026
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-300"
          }`}>
            <p className={`text-xs font-black uppercase tracking-wide mb-1 ${
              result.hourlyGross >= statutoryMinimumHourlyWage2026 ? "text-emerald-700" : "text-amber-800"
            }`}>
              Minimumloon 2026
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Je ingevoerde salaris komt neer op {formatEuro(result.hourlyGross)} bruto per uur. Voor 21 jaar en ouder is het wettelijke minimum sinds 1 juli 2026 {formatEuro(statutoryMinimumHourlyWage2026)} bruto per uur.
              {result.hourlyGross >= statutoryMinimumHourlyWage2026
                ? " Op basis van deze invoer zit je boven die grens."
                : " Controleer je cao, leeftijd, contracturen en loonstrook, want deze invoer zit onder die grens voor 21 jaar en ouder."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per maand bruto</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(direction === "fulltime-to-parttime" ? result.targetMonthlyGross : result.fullTimeMonthlyGross)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per jaar bruto</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(direction === "fulltime-to-parttime" ? result.targetAnnualGross : result.fullTimeAnnualGross, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Vakantiegeld per jaar</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(direction === "fulltime-to-parttime" ? result.targetHolidayAllowance : result.fullTimeAnnualGross * (parseDecimal(holidayPercentage) / 100), 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto uurloon</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.hourlyGross)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                {direction === "fulltime-to-parttime" ? "Minder dan fulltime" : "Meer dan parttime"}
              </p>
              <p className="text-lg font-black text-slate-900 mb-1">{formatEuro(result.monthlyDifference)} per maand</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Jaarlijks is dat ongeveer {formatEuro(result.annualDifference, 0)} {direction === "fulltime-to-parttime" ? "minder dan hetzelfde salaris op fulltime basis" : "meer dan je huidige parttime salaris"}.
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

          <SalaryResultCvCta
            toolName="parttime-salaris-calculator"
            title={`Maak je CV klaar voor een ${selectedHoursLabel} sollicitatie`}
            text={`Je hebt nu een salarisindicatie voor ${selectedHoursLabel}. Als je deze uren serieus overweegt, maak dan ook je CV concreet: gewenste functie, beschikbaarheid en relevante ervaring moeten direct duidelijk zijn.`}
            insightText="Voor parttime functies scannen recruiters snel op beschikbaarheid, recente ervaring en praktische inzetbaarheid. Zet die punten bovenin je CV voordat je gaat solliciteren."
            primaryLabel="Open editor met deze focus"
            primaryHref="/editor?template=professional&startSource=parttime_salary_result"
            secondaryLabel="Vergelijk eerst templates"
            secondaryHref="/templates?startSource=parttime_salary_template_compare"
            resultState={`parttime_${targetHours}_hours_result`}
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
