"use client";

import { useState } from "react";

type Result = {
    weeksRequirementMet: boolean;
    yearsRequirementMet: boolean;
    durationMonths: number;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function WWDuurTool() {
    const [weeksWorkedLast36, setWeeksWorkedLast36] = useState("36");
    const [yearsWith208Hours, setYearsWith208Hours] = useState("5");
    const [employmentHistoryYears, setEmploymentHistoryYears] = useState("12");
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCheck() {
        const weeksWorked = Number(weeksWorkedLast36);
        const yearsWorked = Number(yearsWith208Hours);
        const employmentYears = Number(employmentHistoryYears);

        if (!Number.isFinite(weeksWorked) || weeksWorked < 0 || weeksWorked > 36) {
            setError("Vul een geldig aantal gewerkte weken in de laatste 36 weken in.");
            return;
        }

        if (!Number.isFinite(yearsWorked) || yearsWorked < 0 || yearsWorked > 5) {
            setError("Vul een geldig aantal kalenderjaren in tussen 0 en 5.");
            return;
        }

        if (!Number.isFinite(employmentYears) || employmentYears < 0 || employmentYears > 60) {
            setError("Vul een realistisch arbeidsverleden in jaren in.");
            return;
        }

        const weeksRequirementMet = weeksWorked >= 26;
        const yearsRequirementMet = yearsWorked >= 4;
        const durationMonths = !weeksRequirementMet
            ? 0
            : yearsRequirementMet
            ? Math.min(24, Math.max(3, 3 + Math.max(0, Math.floor(employmentYears) - 10)))
            : 3;

        setError("");
        setResult({
            weeksRequirementMet,
            yearsRequirementMet,
            durationMonths,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Gewerkte weken in laatste 36 weken
                            </label>
                            <input
                                value={weeksWorkedLast36}
                                onChange={(event) => setWeeksWorkedLast36(event.target.value)}
                                className={inputClass}
                                inputMode="numeric"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Kalenderjaren met 208+ uur in laatste 5 jaar
                            </label>
                            <input
                                value={yearsWith208Hours}
                                onChange={(event) => setYearsWith208Hours(event.target.value)}
                                className={inputClass}
                                inputMode="numeric"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Arbeidsverleden in jaren
                            </label>
                            <input
                                value={employmentHistoryYears}
                                onChange={(event) => setEmploymentHistoryYears(event.target.value)}
                                className={inputClass}
                                inputMode="numeric"
                            />
                        </div>
                    </div>

                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCheck}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        Bereken WW-duur
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Dit is een praktische indicatie. De officiele UWV-berekening van arbeidsverleden kan complexer zijn.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${result.durationMonths > 0 ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.durationMonths > 0 ? "text-emerald-700" : "text-amber-700"}`}>
                            Verwachte WW-duur
                        </p>
                        <p className={`text-4xl font-black mb-2 ${result.durationMonths > 0 ? "text-emerald-900" : "text-amber-900"}`}>
                            {result.durationMonths > 0 ? `${result.durationMonths} maanden` : "0 maanden"}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.durationMonths > 0
                                ? "Op basis van de basisregels lijk je recht te hebben op deze WW-duur."
                                : "Zonder de wekeneis is er normaal gesproken geen WW-recht en dus ook geen WW-duur."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Basisvoorwaarden
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li className="flex gap-2">
                                    <span className={result.weeksRequirementMet ? "text-emerald-600 font-black" : "text-amber-600 font-black"}>
                                        {result.weeksRequirementMet ? "+" : "-"}
                                    </span>
                                    <span>Wekeneis 26 uit 36 weken: {result.weeksRequirementMet ? "gehaald" : "niet gehaald"}</span>
                                </li>
                                <li className="flex gap-2">
                                    <span className={result.yearsRequirementMet ? "text-emerald-600 font-black" : "text-slate-500 font-black"}>
                                        {result.yearsRequirementMet ? "+" : "i"}
                                    </span>
                                    <span>Jareneis 4 uit 5 kalenderjaren: {result.yearsRequirementMet ? "gehaald" : "niet gehaald"}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Hoe WerkCV rekent
                            </p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Als je alleen aan de wekeneis voldoet, rekent WerkCV met 3 maanden. Als ook de jareneis is gehaald, wordt de duur langer wanneer je arbeidsverleden boven 10 jaar uitkomt, tot maximaal 24 maanden.
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
