"use client";

import { useState } from "react";
import { parseDecimal } from "@/lib/tools/calculator-utils";
import { calculateVacationDays, type VacationDaysResult } from "@/lib/tools/moat-calculators";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const presets = [
  { label: "40 uur / 5 dagen", weeklyHours: "40", workDaysPerWeek: "5" },
  { label: "36 uur / 4,5 dag", weeklyHours: "36", workDaysPerWeek: "4,5" },
  { label: "32 uur / 4 dagen", weeklyHours: "32", workDaysPerWeek: "4" },
  { label: "24 uur / 3 dagen", weeklyHours: "24", workDaysPerWeek: "3" },
];

function formatNumber(value: number, maximumFractionDigits = 1): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits,
  }).format(value);
}

export default function VakantiedagenTool() {
  const [weeklyHours, setWeeklyHours] = useState("40");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [accrualMonths, setAccrualMonths] = useState("12");
  const [extraDays, setExtraDays] = useState("");
  const [takenDays, setTakenDays] = useState("0");
  const [result, setResult] = useState<VacationDaysResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedWeeklyHours = parseDecimal(weeklyHours);
    const parsedWorkDays = parseDecimal(workDaysPerWeek);
    const parsedAccrualMonths = parseDecimal(accrualMonths);
    const parsedExtraDays = extraDays.trim() ? parseDecimal(extraDays) : 0;
    const parsedTakenDays = takenDays.trim() ? parseDecimal(takenDays) : 0;

    if (Number.isNaN(parsedWeeklyHours) || parsedWeeklyHours <= 0 || parsedWeeklyHours > 80) {
      setError("Vul een realistisch aantal contracturen per week in.");
      return;
    }

    if (Number.isNaN(parsedWorkDays) || parsedWorkDays <= 0 || parsedWorkDays > 7) {
      setError("Vul een realistisch aantal werkdagen per week in.");
      return;
    }

    if (parsedWorkDays > parsedWeeklyHours) {
      setError("Werkdagen per week kunnen niet hoger zijn dan je contracturen.");
      return;
    }

    if (Number.isNaN(parsedAccrualMonths) || parsedAccrualMonths <= 0 || parsedAccrualMonths > 12) {
      setError("Vul een aantal opgebouwde maanden in tussen 1 en 12.");
      return;
    }

    if (Number.isNaN(parsedExtraDays) || parsedExtraDays < 0 || parsedExtraDays > 60) {
      setError("Gebruik een realistisch aantal bovenwettelijke extra dagen.");
      return;
    }

    if (Number.isNaN(parsedTakenDays) || parsedTakenDays < 0 || parsedTakenDays > 80) {
      setError("Gebruik een realistisch aantal al opgenomen verlofdagen.");
      return;
    }

    setError("");
    setResult(calculateVacationDays({
      weeklyHours: parsedWeeklyHours,
      workDaysPerWeek: parsedWorkDays,
      accrualMonths: parsedAccrualMonths,
      extraDays: parsedExtraDays,
      takenDays: parsedTakenDays,
    }));
  }

  const statusClassName = result?.status === "negative"
    ? "bg-red-50 border-red-300 text-red-900"
    : result?.status === "low"
    ? "bg-amber-50 border-amber-300 text-amber-900"
    : "bg-emerald-50 border-emerald-300 text-emerald-900";

  const statusEyebrowClassName = result?.status === "negative"
    ? "text-red-700"
    : result?.status === "low"
    ? "text-amber-700"
    : "text-emerald-700";

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-slate-600 mb-2">
              Snelle schema&apos;s
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setWeeklyHours(preset.weeklyHours);
                    setWorkDaysPerWeek(preset.workDaysPerWeek);
                    setResult(null);
                    setError("");
                  }}
                  className="border-2 border-slate-200 bg-slate-50 px-3 py-2 text-left hover:border-teal-300 hover:bg-teal-50 transition-colors"
                >
                  <span className="block text-xs font-black text-slate-900">{preset.label}</span>
                  <span className="block text-[11px] text-slate-500 mt-1">Veelgebruikte contractindeling</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Contracturen per week
              </label>
              <input
                value={weeklyHours}
                onChange={(event) => setWeeklyHours(event.target.value)}
                placeholder="bijv. 32"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Werkdagen per week
              </label>
              <input
                value={workDaysPerWeek}
                onChange={(event) => setWorkDaysPerWeek(event.target.value)}
                placeholder="bijv. 4 of 5"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Maanden opgebouwd
              </label>
              <input
                value={accrualMonths}
                onChange={(event) => setAccrualMonths(event.target.value)}
                placeholder="12"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Bovenwettelijke extra dagen
              </label>
              <input
                value={extraDays}
                onChange={(event) => setExtraDays(event.target.value)}
                placeholder="bijv. 5"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Alleen invullen als je cao of contract extra verlof boven het wettelijke minimum geeft.
              </p>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Al opgenomen verlofdagen
              </label>
              <input
                value={takenDays}
                onChange={(event) => setTakenDays(event.target.value)}
                placeholder="bijv. 8"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Vul hier alleen hele of halve dagen in die je al hebt gebruikt in deze opbouwperiode.
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
            Bereken vakantiedagen en uren
          </button>

          <p className="text-xs text-slate-500 text-center">
            WerkCV rekent met het wettelijke minimum van 4 keer je wekelijkse arbeidsduur, plus optionele bovenwettelijke dagen.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className={`border-2 rounded-xl p-5 ${statusClassName}`}>
            <p className={`text-xs font-black uppercase tracking-wide mb-2 ${statusEyebrowClassName}`}>
              {result.status === "negative"
                ? "Meer verlof ingevoerd dan opgebouwd"
                : result.status === "low"
                ? "Nog maar beperkte ruimte over"
                : "Resterend verlof"}
            </p>
            <p className="text-4xl font-black mb-2">
              {formatNumber(result.remainingDays)} dagen
            </p>
            <p className="text-sm leading-relaxed">
              Dat is ongeveer {formatNumber(result.remainingHours)} uur, oftewel {formatNumber(result.remainingWeeks, 2)} werkweek aan verlof op jouw huidige schema.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Wettelijk per jaar</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.statutoryHoursPerYear)} uur</p>
              <p className="text-xs text-slate-500 mt-1">{formatNumber(result.statutoryHoursPerYear / result.hoursPerDay)} dagen</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Wettelijk opgebouwd</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.accruedStatutoryDays)} dagen</p>
              <p className="text-xs text-slate-500 mt-1">{formatNumber(result.accruedStatutoryHours)} uur</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Totaal beschikbaar</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.totalAvailableDays)} dagen</p>
              <p className="text-xs text-slate-500 mt-1">incl. {formatNumber(result.extraHours / result.hoursPerDay)} extra dagen</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Werkdag op jouw schema</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.hoursPerDay)} uur</p>
              <p className="text-xs text-slate-500 mt-1">voor omzetting tussen uren en dagen</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Wat je al hebt gebruikt
              </p>
              <p className="text-lg font-black text-slate-900 mb-1">{formatNumber(result.usedHours)} uur</p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Op basis van je ingevulde opgenomen dagen rekent WerkCV met {formatNumber(result.usedHours / result.hoursPerDay)} gebruikte verlofdagen.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Praktische uitleg
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Wettelijke vakantiedagen vervallen meestal 6 maanden na het kalenderjaar waarin je ze opbouwde.</li>
                <li>Bovenwettelijke dagen kunnen andere verval- of verjaringstermijnen hebben in je cao of contract.</li>
                <li>Ook bij ziekte bouw je in principe wettelijke vakantiedagen op.</li>
              </ul>
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
