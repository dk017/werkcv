"use client";

import { useState } from "react";
import {
    addMonths,
    createUtcDate,
    daysInMonth,
    diffDays,
    formatEuro,
    parseDecimal,
} from "@/lib/tools/calculator-utils";

type Result = {
    applicable: boolean;
    title: string;
    reason: string;
    deadline: Date | null;
    compensation: number;
    delayDays: number;
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

function formatDutchDate(date: Date) {
    return new Intl.DateTimeFormat("nl-NL", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
    }).format(date);
}

export default function AanzegvergoedingTool() {
    const [contractMonths, setContractMonths] = useState("12");
    const [contractEndDate, setContractEndDate] = useState("");
    const [monthlySalary, setMonthlySalary] = useState("");
    const [noticeDate, setNoticeDate] = useState("");
    const [hasFixedEndDate, setHasFixedEndDate] = useState(true);
    const [isReplacementContract, setIsReplacementContract] = useState(false);
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState("");

    function handleCalculate() {
        const months = parseDecimal(contractMonths);
        const salary = parseDecimal(monthlySalary);
        const endDate = createUtcDate(contractEndDate);
        const notifiedAt = noticeDate ? createUtcDate(noticeDate) : null;

        if (isNaN(months) || months <= 0) {
            setError("Vul een geldige contractduur in maanden in.");
            return;
        }

        if (isNaN(salary) || salary <= 0) {
            setError("Vul een geldig bruto maandsalaris in.");
            return;
        }

        if (!endDate) {
            setError("Vul een geldige einddatum van het contract in.");
            return;
        }

        if (noticeDate && !notifiedAt) {
            setError("De datum waarop je bericht kreeg is ongeldig.");
            return;
        }

        if (!hasFixedEndDate) {
            setError("");
            setResult({
                applicable: false,
                title: "Aanzegplicht geldt meestal niet",
                reason: "De wettelijke aanzegplicht geldt alleen voor tijdelijke contracten met een duidelijke vaste einddatum.",
                deadline: null,
                compensation: 0,
                delayDays: 0,
            });
            return;
        }

        if (months < 6) {
            setError("");
            setResult({
                applicable: false,
                title: "Geen aanzegvergoeding bij contract korter dan 6 maanden",
                reason: "De aanzegplicht geldt pas bij tijdelijke contracten van 6 maanden of langer.",
                deadline: null,
                compensation: 0,
                delayDays: 0,
            });
            return;
        }

        if (isReplacementContract) {
            setError("");
            setResult({
                applicable: false,
                title: "Meestal geen aanzegplicht bij vervangingscontract",
                reason: "Een tijdelijk contract dat is afgesloten om een zieke werknemer te vervangen valt meestal buiten de aanzegplicht.",
                deadline: null,
                compensation: 0,
                delayDays: 0,
            });
            return;
        }

        const deadline = addMonths(endDate, -1);
        let delayDays = 0;

        if (!notifiedAt || notifiedAt.getTime() >= endDate.getTime()) {
            delayDays = daysInMonth(deadline.getUTCFullYear(), deadline.getUTCMonth());
        } else if (notifiedAt.getTime() > deadline.getTime()) {
            delayDays = diffDays(deadline, notifiedAt);
        }

        const compensationBaseDays = daysInMonth(deadline.getUTCFullYear(), deadline.getUTCMonth());
        const compensation = monthlySalary
            ? Math.min(salary, salary * (delayDays / compensationBaseDays))
            : 0;

        setError("");
        setResult({
            applicable: true,
            title: delayDays > 0 ? "Waarschijnlijk recht op aanzegvergoeding" : "Geen aanzegvergoeding op basis van deze invoer",
            reason: delayDays > 0
                ? "Je werkgever lijkt te laat of helemaal niet schriftelijk te hebben aangezegd. Daardoor kan een vergoeding tot maximaal 1 bruto maandsalaris verschuldigd zijn."
                : "Als je uiterlijk 1 maand voor de einddatum schriftelijk bericht kreeg, is er meestal geen aanzegvergoeding verschuldigd.",
            deadline,
            compensation,
            delayDays,
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Contractduur in maanden
                            </label>
                            <input
                                value={contractMonths}
                                onChange={(event) => setContractMonths(event.target.value)}
                                placeholder="12"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Bruto maandsalaris
                            </label>
                            <input
                                value={monthlySalary}
                                onChange={(event) => setMonthlySalary(event.target.value)}
                                placeholder="bijv. 3200"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Einddatum contract
                            </label>
                            <input
                                type="date"
                                value={contractEndDate}
                                onChange={(event) => setContractEndDate(event.target.value)}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Datum schriftelijke aanzegging
                            </label>
                            <input
                                type="date"
                                value={noticeDate}
                                onChange={(event) => setNoticeDate(event.target.value)}
                                className={inputClass}
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Laat leeg als je geen schriftelijk bericht kreeg.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={hasFixedEndDate}
                                onChange={(event) => setHasFixedEndDate(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Mijn tijdelijke contract heeft een vaste einddatum in de overeenkomst.
                            </span>
                        </label>
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={isReplacementContract}
                                onChange={(event) => setIsReplacementContract(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Dit contract is afgesloten om een zieke werknemer te vervangen.
                            </span>
                        </label>
                    </div>

                    {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: "3px" }}
                    >
                        Controleer aanzegvergoeding
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className={`border-2 rounded-xl p-5 ${result.delayDays > 0 ? "bg-amber-50 border-amber-300" : "bg-emerald-50 border-emerald-300"}`}>
                        <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.delayDays > 0 ? "text-amber-700" : "text-emerald-700"}`}>
                            {result.title}
                        </p>
                        <p className={`text-4xl font-black mb-2 ${result.delayDays > 0 ? "text-amber-900" : "text-emerald-900"}`}>
                            {formatEuro(result.compensation)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {result.reason}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Uiterste aanzegdatum</p>
                            <p className="text-lg font-black text-slate-900">
                                {result.deadline ? formatDutchDate(result.deadline) : "Niet van toepassing"}
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Dagen te laat</p>
                            <p className="text-lg font-black text-slate-900">{result.delayDays}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Maximum volgens wet</p>
                            <p className="text-lg font-black text-slate-900">1 maandsalaris</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Praktische uitleg
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            De aanzegging moet schriftelijk gebeuren en uiterlijk 1 maand voor de einddatum binnen zijn. Bij te late aanzegging ontstaat meestal een vergoeding naar rato van de vertraging, met een maximum van 1 bruto maandsalaris.
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
                        Opnieuw controleren
                    </button>
                </div>
            )}
        </div>
    );
}
