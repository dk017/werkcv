"use client";

import { useState } from "react";
import { parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateLeaveHoursConversion,
  type LeaveHoursConversionMode,
  type LeaveHoursConversionResult,
} from "@/lib/tools/moat-calculators";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

function formatNumber(value: number, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 1,
    maximumFractionDigits,
  }).format(value);
}

function getPresets(mode: LeaveHoursConversionMode): string[] {
  return mode === "hours_to_days" ? ["8", "16", "24", "40"] : ["1", "2", "3", "5"];
}

export default function VerlofurenOmrekenenTool() {
  const [mode, setMode] = useState<LeaveHoursConversionMode>("hours_to_days");
  const [weeklyHours, setWeeklyHours] = useState("36");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [amount, setAmount] = useState("40");
  const [result, setResult] = useState<LeaveHoursConversionResult | null>(null);
  const [error, setError] = useState("");

  function resetResult() {
    setResult(null);
    setError("");
  }

  function handleCalculate() {
    const parsedWeeklyHours = parseDecimal(weeklyHours);
    const parsedWorkDays = parseDecimal(workDaysPerWeek);
    const parsedAmount = parseDecimal(amount);

    if (Number.isNaN(parsedWeeklyHours) || parsedWeeklyHours <= 0 || parsedWeeklyHours > 80) {
      setError("Vul een realistisch aantal contracturen per week in.");
      return;
    }

    if (Number.isNaN(parsedWorkDays) || parsedWorkDays <= 0 || parsedWorkDays > 7) {
      setError("Vul een realistisch aantal werkdagen per week in.");
      return;
    }

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError(`Vul een geldig aantal ${mode === "hours_to_days" ? "uren" : "dagen"} in.`);
      return;
    }

    setError("");
    setResult(calculateLeaveHoursConversion({
      weeklyHours: parsedWeeklyHours,
      workDaysPerWeek: parsedWorkDays,
      amount: parsedAmount,
      mode,
    }));
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Richting omzetten
            </label>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["hours_to_days", "Uren → dagen"],
                ["days_to_hours", "Dagen → uren"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value);
                    setAmount(value === "hours_to_days" ? "40" : "5");
                    resetResult();
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
                Contracturen per week
              </label>
              <input
                value={weeklyHours}
                onChange={(event) => {
                  setWeeklyHours(event.target.value);
                  resetResult();
                }}
                placeholder="36"
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
                onChange={(event) => {
                  setWorkDaysPerWeek(event.target.value);
                  resetResult();
                }}
                placeholder="5"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                {mode === "hours_to_days" ? "Aantal verlofuren" : "Aantal verlofdagen"}
              </label>
              <input
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  resetResult();
                }}
                placeholder={mode === "hours_to_days" ? "40" : "5"}
                className={inputClass}
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {getPresets(mode).map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => {
                  setAmount(preset);
                  resetResult();
                }}
                className="border-2 border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-700 hover:border-teal-300 hover:bg-teal-50 transition-colors"
              >
                {preset} {mode === "hours_to_days" ? "uur" : "dag"}
              </button>
            ))}
          </div>

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ borderWidth: "3px" }}
          >
            Verlof omrekenen
          </button>

          <p className="text-xs text-slate-500 text-center">
            Handig als je contract in dagen praat, maar je HR-systeem of loonstrook in uren administreert.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
              Omrekening
            </p>
            <p className="text-4xl font-black text-emerald-900 mb-2">
              {mode === "hours_to_days"
                ? `${formatNumber(result.convertedDays)} dag`
                : `${formatNumber(result.convertedHours)} uur`}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Op basis van {weeklyHours} uur verdeeld over {workDaysPerWeek} werkdag(en) per week.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Uren per werkdag</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.hoursPerDay)} uur</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Dagen</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.convertedDays)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Uren</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.convertedHours)} uur</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Werkweken</p>
              <p className="text-xl font-black text-slate-900">{formatNumber(result.workWeeksEquivalent)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Waar dit voor helpt
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Sneller checken hoeveel een verlofsaldo in uren of dagen waard is.</li>
                <li>Contracten met 32 of 36 uur en niet-standaard werkdagen netjes omrekenen.</li>
                <li>HR-portalen, loonstroken en cao-afspraken beter naast elkaar leggen.</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Belangrijke nuance
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Deze tool zet alleen om; hij bepaalt niet of uren wettelijk of bovenwettelijk zijn.</li>
                <li>Bij ADV, tijd-voor-tijd of roostervrije uren kunnen aparte regels gelden.</li>
                <li>Je echte saldo blijft altijd leidend zoals je werkgever of HR-systeem het bijhoudt.</li>
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
            Opnieuw omrekenen
          </button>
        </div>
      )}
    </div>
  );
}
