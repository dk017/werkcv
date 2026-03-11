"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";

type RouteType = "under_30" | "age_30_plus" | "reduced";

const thresholdMap: Record<RouteType, number> = {
    under_30: 4357,
    age_30_plus: 5942,
    reduced: 3122,
};

const labelMap: Record<RouteType, string> = {
    under_30: "Highly skilled migrant under 30",
    age_30_plus: "Highly skilled migrant aged 30 or over",
    reduced: "Reduced salary criterion (orientation year / recent graduate route)",
};

type Result = {
    threshold: number;
    salary: number;
    meetsSalary: boolean;
    hasRecognizedSponsor: boolean;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function KennismigrantSalaryTool() {
    const [routeType, setRouteType] = useState<RouteType>("age_30_plus");
    const [grossMonthlySalary, setGrossMonthlySalary] = useState("");
    const [recognizedSponsor, setRecognizedSponsor] = useState(true);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCheck() {
        const salary = parseDecimal(grossMonthlySalary);
        const threshold = thresholdMap[routeType];

        if (isNaN(salary) || salary <= 0) {
            setError("Enter a valid gross monthly salary excluding holiday allowance.");
            return;
        }

        setError("");
        setResult({
            threshold,
            salary,
            meetsSalary: salary >= threshold,
            hasRecognizedSponsor: recognizedSponsor,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Route
                        </label>
                        <select
                            value={routeType}
                            onChange={(event) => setRouteType(event.target.value as RouteType)}
                            className={inputClass}
                        >
                            {(Object.entries(labelMap) as [RouteType, string][]).map(([value, label]) => (
                                <option key={value} value={value}>
                                    {label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Gross monthly salary
                            </label>
                            <input
                                value={grossMonthlySalary}
                                onChange={(event) => setGrossMonthlySalary(event.target.value)}
                                placeholder="for example 5900"
                                className={inputClass}
                                inputMode="decimal"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Use the salary excluding 8% holiday allowance.
                            </p>
                        </div>
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={recognizedSponsor}
                                onChange={(event) => setRecognizedSponsor(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                My employer is a recognised sponsor with the IND.
                            </span>
                        </label>
                    </div>

                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCheck}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        Check salary threshold
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${result.meetsSalary && result.hasRecognizedSponsor ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.meetsSalary && result.hasRecognizedSponsor ? "text-emerald-700" : "text-amber-700"}`}>
                            IND 2026 salary check
                        </p>
                        <p className={`text-3xl font-black mb-2 ${result.meetsSalary && result.hasRecognizedSponsor ? "text-emerald-900" : "text-amber-900"}`}>
                            {result.meetsSalary && result.hasRecognizedSponsor ? "Likely salary-compliant" : "Not fully compliant yet"}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Threshold for this route: <span className="font-black">{formatEuro(result.threshold)}</span> gross per month excluding holiday allowance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Your salary</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.salary)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Required threshold</p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.threshold)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Recognised sponsor</p>
                            <p className="text-xl font-black text-slate-900">{result.hasRecognizedSponsor ? "Yes" : "No"}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Important note
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            These amounts are the IND thresholds valid from 1 January 2026 up to and including 30 June 2026. This tool only checks salary threshold and recognised sponsor status. IND also assesses whether the reduced criterion truly applies and whether your salary is market conform.
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
                        Check again
                    </button>
                </div>
            )}
        </div>
    );
}
