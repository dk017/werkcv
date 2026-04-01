"use client";

import Link from "next/link";
import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";

type Result = {
    earnedGross: number;
    holidayAllowance: number;
    monthlyAccrual: number;
    monthlyBase: number;
    percentage: number;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function VakantiegeldTool() {
    const [baseSalary, setBaseSalary] = useState("");
    const [monthsWorked, setMonthsWorked] = useState("12");
    const [structuralExtras, setStructuralExtras] = useState("");
    const [percentage, setPercentage] = useState("8");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCalculate() {
        const salary = parseDecimal(baseSalary);
        const months = parseDecimal(monthsWorked);
        const extras = structuralExtras.trim() ? parseDecimal(structuralExtras) : 0;
        const rate = parseDecimal(percentage);

        if (isNaN(salary) || salary <= 0) {
            setError("Vul een geldig bruto maandsalaris in.");
            return;
        }

        if (isNaN(months) || months < 1 || months > 12) {
            setError("Vul een geldig aantal opgebouwde maanden in tussen 1 en 12.");
            return;
        }

        if (isNaN(extras) || extras < 0) {
            setError("Gebruik alleen positieve bedragen voor structurele extra looncomponenten.");
            return;
        }

        if (isNaN(rate) || rate <= 0 || rate > 25) {
            setError("Vul een realistisch vakantiegeldpercentage in, bijvoorbeeld 8.");
            return;
        }

        const monthlyBase = salary + extras;
        const earnedGross = monthlyBase * months;
        const holidayAllowance = earnedGross * (rate / 100);

        setError("");
        setResult({
            earnedGross,
            holidayAllowance,
            monthlyAccrual: holidayAllowance / months,
            monthlyBase,
            percentage: rate,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Bruto maandsalaris
                            </label>
                            <input
                                value={baseSalary}
                                onChange={(event) => setBaseSalary(event.target.value)}
                                placeholder="bijv. 3200"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Opgebouwde maanden
                            </label>
                            <input
                                value={monthsWorked}
                                onChange={(event) => setMonthsWorked(event.target.value)}
                                placeholder="12"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Structurele extra looncomponenten per maand
                            </label>
                            <input
                                value={structuralExtras}
                                onChange={(event) => setStructuralExtras(event.target.value)}
                                placeholder="bijv. 150 provisie of ploegentoeslag"
                                className={inputClass}
                                inputMode="decimal"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Denk aan structurele toeslagen of provisie. Gebruik geen eenmalige bonus of onkostenvergoeding.
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Vakantiegeld %
                            </label>
                            <input
                                value={percentage}
                                onChange={(event) => setPercentage(event.target.value)}
                                placeholder="8"
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
                        Bereken vakantiegeld
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Praktische indicatie voor reguliere Nederlandse dienstverbanden. Controleer cao- of contractafspraken als jouw werkgever afwijkt van 8%.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-5">
                        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
                            Jouw indicatie
                        </p>
                        <p className="text-4xl font-black text-emerald-900 mb-2">
                            {formatEuro(result.holidayAllowance)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Dit is {result.percentage}% over {formatEuro(result.earnedGross)} bruto loon dat je in deze periode hebt opgebouwd.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Bruto loon in periode</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.earnedGross)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Gemiddelde opbouw per maand</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyAccrual)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Maandbasis voor berekening</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyBase)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Wat je moet weten
                        </p>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Vakantiegeld wordt meestal in mei of juni uitbetaald, maar je cao of contract kan een andere maand noemen.</li>
                            <li>Een reguliere werknemer krijgt minimaal 8%, maar werkgevers mogen meer betalen.</li>
                            <li>Eenmalige beloningen en onkostenvergoedingen tellen meestal niet standaard mee in deze eenvoudige indicatie.</li>
                        </ul>
                        <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                                Bruto naar netto
                            </p>
                            <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                                Je netto uitbetaling kan lager uitvallen door loonheffing op bijzondere beloningen.
                                Gebruik je bruto uitkomst als basis en vergelijk daarna met de{" "}
                                <Link href="/tools/netto-bruto-calculator" className="font-bold text-slate-900 underline decoration-2 underline-offset-2">
                                    netto bruto calculator
                                </Link>
                                .
                            </p>
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
