"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
    estimateGrossFromTargetNet,
    estimateNetFromGross,
    SalaryEstimateResult,
    TaxAgeProfile,
} from "@/lib/tools/netto-bruto";

type Mode = "gross_to_net" | "net_to_gross";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const ageOptions: Array<{ value: TaxAgeProfile; label: string; note: string }> = [
    {
        value: "under_aow",
        label: "Nog geen AOW-leeftijd",
        note: "Standaard keuze voor de meeste werknemers in loondienst.",
    },
    {
        value: "aow_full_year",
        label: "Hele jaar AOW-leeftijd",
        note: "Indicatie voor mensen die het hele jaar onder AOW-tarieven vallen.",
    },
];

function SummaryCards({ result }: { result: SalaryEstimateResult }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Belastbaar jaarinkomen</p>
                <p className="text-xl font-black text-slate-900">{formatEuro(result.taxableAnnualIncome)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Loonheffing indicatie</p>
                <p className="text-xl font-black text-slate-900">{formatEuro(result.taxDue)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Heffingskortingen</p>
                <p className="text-xl font-black text-slate-900">{formatEuro(result.taxCreditsApplied)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Effectieve belastingdruk</p>
                <p className="text-xl font-black text-slate-900">{result.effectiveTaxRate.toFixed(1)}%</p>
            </div>
        </div>
    );
}

export default function NettoBrutoTool() {
    const [mode, setMode] = useState<Mode>("gross_to_net");
    const [monthlyAmount, setMonthlyAmount] = useState("");
    const [holidayPercentage, setHolidayPercentage] = useState("8");
    const [includeHolidayAllowance, setIncludeHolidayAllowance] = useState(true);
    const [applyTaxCredits, setApplyTaxCredits] = useState(true);
    const [ageProfile, setAgeProfile] = useState<TaxAgeProfile>("under_aow");
    const [result, setResult] = useState<SalaryEstimateResult | null>(null);
    const [error, setError] = useState("");

    function handleCalculate() {
        const amount = parseDecimal(monthlyAmount);
        const holidayRate = parseDecimal(holidayPercentage);

        if (isNaN(amount) || amount <= 0) {
            setError(mode === "gross_to_net"
                ? "Vul een geldig bruto maandsalaris in."
                : "Vul een geldig gewenst netto maandsalaris in.");
            return;
        }

        if (isNaN(holidayRate) || holidayRate < 0 || holidayRate > 20) {
            setError("Vul een realistisch vakantiegeldpercentage in, bijvoorbeeld 8.");
            return;
        }

        const calculationInput = {
            holidayAllowancePercentage: holidayRate,
            includeHolidayAllowance,
            applyTaxCredits,
            ageProfile,
        };

        const nextResult = mode === "gross_to_net"
            ? estimateNetFromGross({ ...calculationInput, monthlyGross: amount })
            : estimateGrossFromTargetNet(amount, calculationInput);

        setError("");
        setResult(nextResult);
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Richting
                            </label>
                            <select
                                value={mode}
                                onChange={(event) => setMode(event.target.value as Mode)}
                                className={inputClass}
                            >
                                <option value="gross_to_net">Bruto naar netto</option>
                                <option value="net_to_gross">Netto naar bruto</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Leeftijdsprofiel
                            </label>
                            <select
                                value={ageProfile}
                                onChange={(event) => setAgeProfile(event.target.value as TaxAgeProfile)}
                                className={inputClass}
                            >
                                {ageOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <p className="text-[11px] text-slate-500 mt-1">
                                {ageOptions.find((option) => option.value === ageProfile)?.note}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                {mode === "gross_to_net" ? "Bruto maandsalaris" : "Gewenst netto maandsalaris"}
                            </label>
                            <input
                                value={monthlyAmount}
                                onChange={(event) => setMonthlyAmount(event.target.value)}
                                placeholder={mode === "gross_to_net" ? "bijv. 3800" : "bijv. 2850"}
                                className={inputClass}
                                inputMode="decimal"
                            />
                            <p className="text-[11px] text-slate-500 mt-1">
                                Normaal maandsalaris in loondienst, exclusief een apart uitbetaald vakantiegeldmoment.
                            </p>
                        </div>

                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Vakantiegeld %
                            </label>
                            <input
                                value={holidayPercentage}
                                onChange={(event) => setHolidayPercentage(event.target.value)}
                                placeholder="8"
                                className={inputClass}
                                inputMode="decimal"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={includeHolidayAllowance}
                                onChange={(event) => setIncludeHolidayAllowance(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Neem apart uitbetaald vakantiegeld mee in de jaarberekening.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
                            <input
                                type="checkbox"
                                checked={applyTaxCredits}
                                onChange={(event) => setApplyTaxCredits(event.target.checked)}
                                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                            />
                            <span className="text-sm text-slate-600 leading-relaxed">
                                Pas loonheffingskorting toe in deze indicatie.
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
                        {mode === "gross_to_net" ? "Bereken netto indicatie" : "Bereken bruto indicatie"}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                        Indicatie voor standaard loondienst in Nederland in 2026. Pensioenpremie, leaseauto, cafetariaregeling en andere loonstrookspecifieke inhoudingen zitten hier niet in.
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="border-2 rounded-xl p-5 bg-emerald-50 border-emerald-300">
                        <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-2">
                            {mode === "gross_to_net" ? "Netto indicatie" : "Bruto indicatie"}
                        </p>
                        <p className="text-4xl font-black text-emerald-900 mb-2">
                            {mode === "gross_to_net"
                                ? formatEuro(result.regularMonthlyNet)
                                : formatEuro(result.monthlyGross)}
                        </p>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            {mode === "gross_to_net"
                                ? "Geschat regulier netto maandsalaris op basis van je ingevoerde bruto bedrag."
                                : "Geschat bruto maandsalaris dat hoort bij je gewenste netto maandbedrag onder deze aannames."}
                        </p>
                    </div>

                    <SummaryCards result={result} />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                {mode === "gross_to_net" ? "Bruto maandsalaris" : "Netto maandsalaris"}
                            </p>
                            <p className="text-xl font-black text-slate-900">
                                {mode === "gross_to_net" ? formatEuro(result.monthlyGross) : formatEuro(result.regularMonthlyNet)}
                            </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                Netto jaarinkomen
                            </p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.netAnnualIncome)}</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">
                                Netto vakantiegeld indicatie
                            </p>
                            <p className="text-xl font-black text-slate-900">{formatEuro(result.holidayAllowanceNet)}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Hoe WerkCV rekent
                        </p>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>We gebruiken de officiële 2026 box 1-tarieven en heffingskortingen van Belastingdienst.</li>
                            <li>Loonheffingskorting telt alleen mee als je die optie aan laat staan.</li>
                            <li>Werkgeversheffing Zvw zit niet als werknemersinhouding in deze standaard loondienst-indicatie.</li>
                            <li>De maanduitkomst is een praktische verdeling van een jaarberekening en kan afwijken van je echte loonstrook.</li>
                        </ul>
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
