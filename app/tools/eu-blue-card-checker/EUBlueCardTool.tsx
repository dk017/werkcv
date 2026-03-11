"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";

type RouteType = "standard" | "reduced";

const thresholdMap: Record<RouteType, number> = {
    standard: 5942,
    reduced: 4754,
};

const routeLabelMap: Record<RouteType, string> = {
    standard: "EU Blue Card standard threshold",
    reduced: "Reduced threshold for recent graduates",
};

type Result = {
    routeType: RouteType;
    threshold: number;
    salary: number;
    contractMonths: number;
    meetsSalary: boolean;
    meetsContract: boolean;
    meetsQualification: boolean;
    roleLooksQualified: boolean;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function EUBlueCardTool() {
    const [routeType, setRouteType] = useState<RouteType>("standard");
    const [grossMonthlySalary, setGrossMonthlySalary] = useState("");
    const [contractMonths, setContractMonths] = useState("12");
    const [hasQualification, setHasQualification] = useState(true);
    const [roleLooksQualified, setRoleLooksQualified] = useState(true);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCheck() {
        const salary = parseDecimal(grossMonthlySalary);
        const contractDuration = parseDecimal(contractMonths);
        const threshold = thresholdMap[routeType];

        if (isNaN(salary) || salary <= 0) {
            setError("Enter a valid gross monthly salary excluding holiday allowance.");
            return;
        }

        if (isNaN(contractDuration) || contractDuration <= 0) {
            setError("Enter a valid contract duration in months.");
            return;
        }

        setError("");
        setResult({
            routeType,
            threshold,
            salary,
            contractMonths: contractDuration,
            meetsSalary: salary >= threshold,
            meetsContract: contractDuration >= 6,
            meetsQualification: hasQualification,
            roleLooksQualified,
        });
    }

    const eligible = result
        ? result.meetsSalary && result.meetsContract && result.meetsQualification && result.roleLooksQualified
        : false;

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
                            {(Object.entries(routeLabelMap) as [RouteType, string][]).map(([value, label]) => (
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
                                placeholder="for example 6200"
                                className={inputClass}
                                inputMode="decimal"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Use the salary excluding 8% holiday allowance.
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Contract duration in months
                            </label>
                            <input
                                value={contractMonths}
                                onChange={(event) => setContractMonths(event.target.value)}
                                placeholder="12"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={hasQualification}
                                onChange={(event) => setHasQualification(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                I have a 3-year higher education diploma or relevant higher-level work experience that fits the route.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={roleLooksQualified}
                                onChange={(event) => setRoleLooksQualified(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                The role is a highly qualified position that matches my diploma level.
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
                        Check EU Blue Card fit
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${eligible ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${eligible ? "text-emerald-700" : "text-amber-700"}`}>
                            IND 2026 quick check
                        </p>
                        <p className={`text-3xl font-black mb-2 ${eligible ? "text-emerald-900" : "text-amber-900"}`}>
                            {eligible ? "Looks broadly eligible" : "One or more core checks fail"}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            Selected threshold: <span className="font-black">{formatEuro(result.threshold)}</span> gross per month excluding holiday allowance.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Core checks
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>Route: {routeLabelMap[result.routeType]}</li>
                                <li>Salary threshold: {result.meetsSalary ? "met" : "not met"}</li>
                                <li>Minimum 6-month contract: {result.meetsContract ? "met" : "not met"}</li>
                                <li>Qualification requirement: {result.meetsQualification ? "met" : "not met"}</li>
                                <li>Highly qualified role: {result.roleLooksQualified ? "met" : "not met"}</li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Practical note
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Unlike the highly skilled migrant route, the EU Blue Card route does not require a recognised sponsor. IND can still request diploma evaluation, proof of work experience and additional documents. These salary amounts are valid from 1 January 2026 up to and including 30 June 2026.
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
                        Check again
                    </button>
                </div>
            )}
        </div>
    );
}
