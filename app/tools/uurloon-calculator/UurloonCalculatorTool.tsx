"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";

type SalaryInputMode = "monthly" | "annual" | "hourly";

type Result = {
    annualGross: number;
    hourlyGross: number;
    hourlyWithHolidayAllowance: number;
    monthlyGross: number;
    weeklyHours: number;
    inputMode: SalaryInputMode;
    inputValue: number;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function UurloonCalculatorTool() {
    const [mode, setMode] = useState<SalaryInputMode>("monthly");
    const [salaryInput, setSalaryInput] = useState("");
    const [hoursPerWeek, setHoursPerWeek] = useState("40");
    const [holidayAllowancePct, setHolidayAllowancePct] = useState("8");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCalculate() {
        const salary = parseDecimal(salaryInput);
        const hours = parseDecimal(hoursPerWeek);
        const holidayPct = parseDecimal(holidayAllowancePct);

        if (isNaN(salary) || salary <= 0) {
            const label = mode === "monthly" ? "maand" : mode === "annual" ? "jaar" : "uur";
            setError(`Vul een geldig bruto ${label}loon in.`);
            return;
        }

        if (isNaN(hours) || hours <= 0 || hours > 80) {
            setError("Vul een realistisch aantal uren per week in.");
            return;
        }

        if (isNaN(holidayPct) || holidayPct < 0 || holidayPct > 25) {
            setError("Gebruik een realistisch vakantiegeldpercentage, bijvoorbeeld 8.");
            return;
        }

        const annualGross = mode === "monthly"
            ? salary * 12
            : mode === "annual"
                ? salary
                : salary * hours * 52;
        const hourlyGross = mode === "hourly" ? salary : annualGross / (hours * 52);

        setError("");
        setResult({
            annualGross,
            hourlyGross,
            hourlyWithHolidayAllowance: hourlyGross * (1 + (holidayPct / 100)),
            monthlyGross: annualGross / 12,
            weeklyHours: hours,
            inputMode: mode,
            inputValue: salary,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Rekenen vanaf
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {([
                                ["monthly", "Maandsalaris"],
                                ["annual", "Jaarsalaris"],
                                ["hourly", "Uurloon"],
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                {mode === "monthly"
                                    ? "Bruto maandsalaris"
                                    : mode === "annual"
                                        ? "Bruto jaarsalaris"
                                        : "Bruto uurloon"}
                            </label>
                            <input
                                value={salaryInput}
                                onChange={(event) => setSalaryInput(event.target.value)}
                                placeholder={
                                    mode === "monthly"
                                        ? "bijv. 3200"
                                        : mode === "annual"
                                            ? "bijv. 42000"
                                            : "bijv. 18,50"
                                }
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Uren per week
                            </label>
                            <input
                                value={hoursPerWeek}
                                onChange={(event) => setHoursPerWeek(event.target.value)}
                                placeholder="40"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Vakantiegeld %
                        </label>
                        <input
                            value={holidayAllowancePct}
                            onChange={(event) => setHolidayAllowancePct(event.target.value)}
                            placeholder="8"
                            className={inputClass}
                            inputMode="decimal"
                        />
                    </div>

                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        {mode === "hourly" ? "Bereken maandloon" : "Bereken uurloon"}
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
                        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
                            Bruto uurloon
                        </p>
                        <p className="text-4xl font-black text-emerald-900 mb-2">
                            {formatEuro(result.hourlyGross)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.inputMode === "hourly"
                                ? `Op basis van ${formatEuro(result.inputValue)} bruto per uur en ${result.weeklyHours} uur per week.`
                                : `Op basis van ${formatEuro(result.annualGross, 0)} bruto per jaar en ${result.weeklyHours} uur per week.`}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Uurloon zonder vakantiegeld</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.hourlyGross)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Uurloon incl. vakantiegeld</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.hourlyWithHolidayAllowance)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto maandsalaris</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyGross)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto jaarsalaris</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.annualGross, 0)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Formule
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.inputMode === "hourly"
                                ? "WerkCV rekent je uurloon terug naar bruto maandloon en bruto jaarloon via uren per week x 52 weken. Zo kun je snel zien wat een uurbedrag betekent voor een contractaanbod."
                                : "WerkCV rekent met bruto jaarsalaris gedeeld door 52 weken en je contracturen per week. Dit geeft je een bruikbare bruto uurprijs voor vergelijking, onderhandeling en controle tegen het minimumloon."}
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
                        Opnieuw berekenen
                    </button>
                </div>
            )}
        </div>
    );
}
