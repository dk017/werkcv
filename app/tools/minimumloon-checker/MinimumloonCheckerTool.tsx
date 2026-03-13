"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";

type AgeBracket = "21_plus" | "20" | "19" | "18" | "17" | "16" | "15";

const hourlyRates: Record<AgeBracket, number> = {
    "21_plus": 14.71,
    "20": 11.77,
    "19": 8.83,
    "18": 7.36,
    "17": 5.81,
    "16": 5.07,
    "15": 4.41,
};

const ageLabels: Record<AgeBracket, string> = {
    "21_plus": "21 jaar en ouder",
    "20": "20 jaar",
    "19": "19 jaar",
    "18": "18 jaar",
    "17": "17 jaar",
    "16": "16 jaar",
    "15": "15 jaar",
};

type Result = {
    minimumHourly: number;
    weeklyAmount: number;
    monthlyAmount: number;
    offeredHourly: number | null;
    difference: number | null;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function MinimumloonCheckerTool() {
    const [age, setAge] = useState<AgeBracket>("21_plus");
    const [hoursPerWeek, setHoursPerWeek] = useState("40");
    const [offeredHourly, setOfferedHourly] = useState("");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCalculate() {
        const hours = parseDecimal(hoursPerWeek);
        const offered = offeredHourly.trim() ? parseDecimal(offeredHourly) : null;

        if (isNaN(hours) || hours <= 0 || hours > 80) {
            setError("Vul een realistisch aantal uren per week in.");
            return;
        }

        if (offeredHourly.trim() && (offered === null || isNaN(offered) || offered <= 0)) {
            setError("Gebruik een geldig bruto uurloon voor de vergelijking.");
            return;
        }

        const minimumHourly = hourlyRates[age];
        const weeklyAmount = minimumHourly * hours;
        const monthlyAmount = weeklyAmount * 52 / 12;

        setError("");
        setResult({
            minimumHourly,
            weeklyAmount,
            monthlyAmount,
            offeredHourly: offered,
            difference: offered !== null ? offered - minimumHourly : null,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Leeftijd
                        </label>
                        <select
                            value={age}
                            onChange={(event) => setAge(event.target.value as AgeBracket)}
                            className={inputClass}
                        >
                            {(Object.entries(ageLabels) as [AgeBracket, string][]).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Contracturen per week
                            </label>
                            <input
                                value={hoursPerWeek}
                                onChange={(event) => setHoursPerWeek(event.target.value)}
                                placeholder="40"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Afgesproken bruto uurloon (optioneel)
                            </label>
                            <input
                                value={offeredHourly}
                                onChange={(event) => setOfferedHourly(event.target.value)}
                                placeholder="bijv. 15,50"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        Controleer minimumloon
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Gebaseerd op het reguliere wettelijke minimumuurloon per 1 januari 2026. BBL-rates en uitzonderingen vallen buiten deze snelle checker.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
                        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
                            Minimumuurloon {ageLabels[age]}
                        </p>
                        <p className="text-4xl font-black text-emerald-900 mb-2">
                            {formatEuro(result.minimumHourly)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Dit is het wettelijke minimum per uur voor deze leeftijdsgroep vanaf 1 januari 2026.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per week</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.weeklyAmount)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per maand (indicatie)</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyAmount)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Vergelijking met jouw loon</p>
                            <p className="text-xl font-black text-slate-900">
                                {result.offeredHourly !== null ? formatEuro(result.offeredHourly) : "Niet ingevuld"}
                            </p>
                        </div>
                    </div>

                    {result.offeredHourly !== null ? (
                        <div className={`border-2 rounded-xl p-4 ${result.difference !== null && result.difference >= 0 ? "bg-emerald-50 border-emerald-300" : "bg-red-50 border-red-300"}`}>
                            <p className={`text-sm font-medium ${result.difference !== null && result.difference >= 0 ? "text-emerald-900" : "text-red-900"}`}>
                                {result.difference !== null && result.difference >= 0
                                    ? `Je ingevulde uurloon ligt ${formatEuro(result.difference)} boven het minimum.`
                                    : `Je ingevulde uurloon ligt ${formatEuro(Math.abs(result.difference ?? 0))} onder het minimum.`}
                            </p>
                        </div>
                    ) : null}

                    <button
                        type="button"
                        onClick={() => {
                            setResult(null);
                            setError("");
                        }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Opnieuw controleren
                    </button>
                </div>
            )}
        </div>
    );
}

