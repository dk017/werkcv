"use client";

import { useState } from "react";
import Link from "next/link";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { calculateOveruren, type OvertimeResult } from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function OverurenTool() {
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("3200");
  const [contractHoursPerWeek, setContractHoursPerWeek] = useState("40");
  const [extraHoursThisMonth, setExtraHoursThisMonth] = useState("12");
  const [overtimePremiumPercentage, setOvertimePremiumPercentage] = useState("0");
  const [result, setResult] = useState<OvertimeResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedMonthlyGrossSalary = parseDecimal(monthlyGrossSalary);
    const parsedContractHoursPerWeek = parseDecimal(contractHoursPerWeek);
    const parsedExtraHoursThisMonth = parseDecimal(extraHoursThisMonth);
    const parsedOvertimePremiumPercentage = parseDecimal(overtimePremiumPercentage);

    if (
      Number.isNaN(parsedMonthlyGrossSalary) ||
      parsedMonthlyGrossSalary <= 0 ||
      parsedMonthlyGrossSalary > 50000
    ) {
      setError("Vul een realistisch bruto maandsalaris in.");
      return;
    }

    if (
      Number.isNaN(parsedContractHoursPerWeek) ||
      parsedContractHoursPerWeek <= 0 ||
      parsedContractHoursPerWeek > 60
    ) {
      setError("Gebruik een realistisch aantal contracturen per week.");
      return;
    }

    if (
      Number.isNaN(parsedExtraHoursThisMonth) ||
      parsedExtraHoursThisMonth < 0 ||
      parsedExtraHoursThisMonth > 200
    ) {
      setError("Gebruik een realistisch aantal overuren voor deze maand.");
      return;
    }

    if (
      Number.isNaN(parsedOvertimePremiumPercentage) ||
      parsedOvertimePremiumPercentage < 0 ||
      parsedOvertimePremiumPercentage > 200
    ) {
      setError("Gebruik een realistisch toeslagpercentage.");
      return;
    }

    setError("");
    setResult(
      calculateOveruren({
        monthlyGrossSalary: parsedMonthlyGrossSalary,
        contractHoursPerWeek: parsedContractHoursPerWeek,
        extraHoursThisMonth: parsedExtraHoursThisMonth,
        overtimePremiumPercentage: parsedOvertimePremiumPercentage,
      }),
    );
  }

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Bruto maandsalaris
              </label>
              <input
                value={monthlyGrossSalary}
                onChange={(event) => setMonthlyGrossSalary(event.target.value)}
                placeholder="bijv. 3200"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Contracturen per week
              </label>
              <input
                value={contractHoursPerWeek}
                onChange={(event) => setContractHoursPerWeek(event.target.value)}
                placeholder="40"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Extra gewerkte uren deze maand
              </label>
              <input
                value={extraHoursThisMonth}
                onChange={(event) => setExtraHoursThisMonth(event.target.value)}
                placeholder="12"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Overwerktoeslag
              </label>
              <select
                value={overtimePremiumPercentage}
                onChange={(event) => setOvertimePremiumPercentage(event.target.value)}
                className={inputClass}
              >
                <option value="0">0%</option>
                <option value="25">25%</option>
                <option value="50">50%</option>
                <option value="100">100%</option>
              </select>
            </div>
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
            style={{ borderWidth: "3px" }}
          >
            Bereken overuren
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
              Bruto overurenwaarde deze maand
            </p>
            <p className="text-4xl font-black text-emerald-900">
              {formatEuro(result.grossOvertimeWithPremium)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Inclusief {overtimePremiumPercentage}% toeslag over {extraHoursThisMonth} extra uren.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Uurloon", formatEuro(result.hourlyRate)],
              ["Zonder toeslag", formatEuro(result.grossOvertimeValue)],
              ["Toeslagwaarde", formatEuro(result.premiumValue)],
              ["Jaarlijks als dit terugkomt", formatEuro(result.recurringAnnualValue)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="text-xl font-black text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-slate-700">
            <p className="font-black text-slate-900">Belangrijke juridische nuance</p>
            <p className="mt-2">
              In Nederland is er geen wettelijk recht op overwerktoeslag. Of je toeslag ontvangt,
              hangt af van je arbeidscontract of cao. Controleer altijd je eigen arbeidsovereenkomst.
            </p>
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
              Van baan wisselen?
            </p>
            <h3 className="mt-2 text-xl font-black">Zorg dat je CV klaar is.</h3>
            <p className="mt-2 text-sm text-slate-300">
              Overuren en toeslagen zeggen veel over de echte waarde van je huidige baan. Gebruik die
              vergelijking voor je volgende stap.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-2 border-white bg-[#4ECDC4] px-4 py-2 text-sm font-black text-slate-900"
              >
                Maak gratis een ATS-vriendelijk CV - eenmalig €4,99
              </Link>
              <Link
                href="/tools/netto-bruto-calculator"
                className="border-2 border-white bg-transparent px-4 py-2 text-sm font-black text-white"
              >
                Netto-bruto calculator
              </Link>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError("");
            }}
            className="w-full rounded-lg border border-slate-200 py-2 text-xs font-bold text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700"
          >
            Opnieuw berekenen
          </button>
        </div>
      )}
    </div>
  );
}
