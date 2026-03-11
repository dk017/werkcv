"use client";

import { useState } from "react";

type Result = {
    eligible: boolean;
    failedChecks: string[];
    passedChecks: string[];
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function WWRechtTool() {
    const [hoursBefore, setHoursBefore] = useState("40");
    const [hoursLost, setHoursLost] = useState("40");
    const [weeksWorkedLast36, setWeeksWorkedLast36] = useState("36");
    const [insuredEmployee, setInsuredEmployee] = useState(true);
    const [availableForWork, setAvailableForWork] = useState(true);
    const [culpableDismissal, setCulpableDismissal] = useState(false);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCheck() {
        const previousHours = Number(hoursBefore);
        const lostHours = Number(hoursLost);
        const weeksWorked = Number(weeksWorkedLast36);

        if (!Number.isFinite(previousHours) || previousHours <= 0) {
            setError("Vul een geldig aantal uren per week voor je werkloosheid in.");
            return;
        }

        if (!Number.isFinite(lostHours) || lostHours <= 0) {
            setError("Vul een geldig aantal verloren uren per week in.");
            return;
        }

        if (lostHours > previousHours) {
            setError("Verloren uren kunnen niet hoger zijn dan je eerdere werkuren.");
            return;
        }

        if (!Number.isFinite(weeksWorked) || weeksWorked < 0 || weeksWorked > 36) {
            setError("Vul een geldig aantal gewerkte weken in de laatste 36 weken in.");
            return;
        }

        const passedChecks: string[] = [];
        const failedChecks: string[] = [];
        const meetsHoursLoss = previousHours < 10 ? lostHours >= previousHours / 2 : lostHours >= 5;

        if (meetsHoursLoss) {
            passedChecks.push("Je voldoet waarschijnlijk aan de urenvoorwaarde voor werkloosheid.");
        } else {
            failedChecks.push("Je lijkt niet genoeg uren te verliezen voor WW volgens de basisregel.");
        }

        if (weeksWorked >= 26) {
            passedChecks.push("Je voldoet waarschijnlijk aan de wekeneis van 26 uit 36 weken.");
        } else {
            failedChecks.push("Je voldoet waarschijnlijk niet aan de wekeneis van 26 uit 36 weken.");
        }

        if (insuredEmployee) {
            passedChecks.push("Je geeft aan dat je als werknemer verzekerd bent voor WW.");
        } else {
            failedChecks.push("WW geldt alleen voor werknemers die verzekerd zijn voor werknemersverzekeringen.");
        }

        if (availableForWork) {
            passedChecks.push("Je geeft aan dat je direct beschikbaar bent voor werk.");
        } else {
            failedChecks.push("Voor WW moet je beschikbaar zijn om direct weer te werken.");
        }

        if (!culpableDismissal) {
            passedChecks.push("Op basis van je invoer lijkt er geen duidelijke eigen schuld-red flag.");
        } else {
            failedChecks.push("Werkloos door eigen schuld kan je WW-recht blokkeren of beperken.");
        }

        setError("");
        setResult({
            eligible: failedChecks.length === 0,
            failedChecks,
            passedChecks,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Uren per week voor werkloosheid
                            </label>
                            <input
                                value={hoursBefore}
                                onChange={(event) => setHoursBefore(event.target.value)}
                                className={inputClass}
                                inputMode="numeric"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Uren per week verloren
                            </label>
                            <input
                                value={hoursLost}
                                onChange={(event) => setHoursLost(event.target.value)}
                                className={inputClass}
                                inputMode="numeric"
                            />
                        </div>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={insuredEmployee}
                                onChange={(event) => setInsuredEmployee(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Ik was werknemer in loondienst en verzekerd voor WW.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={availableForWork}
                                onChange={(event) => setAvailableForWork(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Ik ben direct beschikbaar om te werken.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={culpableDismissal}
                                onChange={(event) => setCulpableDismissal(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Mijn werkloosheid is ontstaan door eigen schuld of verwijtbaar gedrag.
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
                        Controleer WW-recht
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${result.eligible ? "bg-emerald-50 border-emerald-300" : "bg-amber-50 border-amber-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.eligible ? "text-emerald-700" : "text-amber-700"}`}>
                            {result.eligible ? "Waarschijnlijk recht op WW" : "Waarschijnlijk nog geen duidelijk WW-recht"}
                        </p>
                        <p className={`text-lg font-black mb-2 ${result.eligible ? "text-emerald-900" : "text-amber-900"}`}>
                            {result.eligible
                                ? "Je basisvoorwaarden lijken in orde."
                                : "Een of meer basisvoorwaarden lijken niet gehaald."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Positieve checks
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {result.passedChecks.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-emerald-600 font-black">+</span>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                                Aandachtspunten
                            </p>
                            <ul className="space-y-2 text-sm text-slate-700">
                                {result.failedChecks.length > 0 ? result.failedChecks.map((item) => (
                                    <li key={item} className="flex gap-2">
                                        <span className="text-amber-600 font-black">-</span>
                                        <span>{item}</span>
                                    </li>
                                )) : (
                                    <li className="text-sm text-slate-700">Geen directe blokkades op basis van deze invoer.</li>
                                )}
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
                        Opnieuw controleren
                    </button>
                </div>
            )}
        </div>
    );
}
