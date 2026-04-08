"use client";

import { useState } from "react";
import Link from "next/link";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  TAX_FREE_HOME_OFFICE_RATE_2026,
  calculateThuiswerkvergoeding,
  type ThuiswerkvergoedingResult,
} from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function ThuiswerkvergoedingTool() {
  const [homeDaysPerWeek, setHomeDaysPerWeek] = useState("3");
  const [monthsPerYear, setMonthsPerYear] = useState("11");
  const [employerRatePerDay, setEmployerRatePerDay] = useState("2,35");
  const [result, setResult] = useState<ThuiswerkvergoedingResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedHomeDaysPerWeek = parseDecimal(homeDaysPerWeek);
    const parsedMonthsPerYear = parseDecimal(monthsPerYear);
    const parsedEmployerRatePerDay = parseDecimal(employerRatePerDay);

    if (
      Number.isNaN(parsedHomeDaysPerWeek) ||
      parsedHomeDaysPerWeek < 1 ||
      parsedHomeDaysPerWeek > 5
    ) {
      setError("Kies tussen 1 en 5 thuiswerkdagen per week.");
      return;
    }

    if (Number.isNaN(parsedMonthsPerYear) || parsedMonthsPerYear < 1 || parsedMonthsPerYear > 12) {
      setError("Kies een aantal maanden tussen 1 en 12.");
      return;
    }

    if (Number.isNaN(parsedEmployerRatePerDay) || parsedEmployerRatePerDay < 0 || parsedEmployerRatePerDay > 20) {
      setError("Gebruik een realistisch bedrag per thuiswerkdag.");
      return;
    }

    setError("");
    setResult(
      calculateThuiswerkvergoeding({
        homeDaysPerWeek: parsedHomeDaysPerWeek,
        monthsPerYear: parsedMonthsPerYear,
        employerRatePerDay: parsedEmployerRatePerDay,
      }),
    );
  }

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Thuiswerkdagen per week
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setHomeDaysPerWeek(String(days));
                    setResult(null);
                    setError("");
                  }}
                  className={`border-2 border-black px-4 py-2 text-sm font-black ${
                    homeDaysPerWeek === String(days)
                      ? "bg-[#4ECDC4] text-black"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {days} dag{days > 1 ? "en" : ""}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Maanden per jaar
              </label>
              <input
                value={monthsPerYear}
                onChange={(event) => setMonthsPerYear(event.target.value)}
                placeholder="11"
                className={inputClass}
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Werkgever betaalt per thuiswerkdag
              </label>
              <input
                value={employerRatePerDay}
                onChange={(event) => setEmployerRatePerDay(event.target.value)}
                placeholder="2,35"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                De belastingvrije grens ligt in 2026 op {formatEuro(TAX_FREE_HOME_OFFICE_RATE_2026)} per dag.
              </p>
            </div>
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
            style={{ borderWidth: "3px" }}
          >
            Bereken thuiswerkvergoeding
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
              Belastingvrije thuiswerkvergoeding per maand
            </p>
            <p className="text-4xl font-black text-emerald-900">
              {formatEuro(result.maximumTaxFreePerMonth)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Op basis van {homeDaysPerWeek} thuiswerkdagen per week en {monthsPerYear} maanden per jaar.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Belastingvrij per maand", formatEuro(result.maximumTaxFreePerMonth)],
              ["Belastingvrij per jaar", formatEuro(result.maximumTaxFreePerYear)],
              ["Werkgever betaalt per maand", formatEuro(result.actualPerMonth)],
              ["Belastingplichtig deel", formatEuro(result.taxablePerYear)],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">
                  {label}
                </p>
                <p className="text-xl font-black text-slate-900">{value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-black text-slate-900">
              {result.withinTaxFreeLimit
                ? "Je ingevoerde dagvergoeding valt volledig binnen de belastingvrije grens."
                : "Je werkgever betaalt meer dan het belastingvrije maximum per dag."}
            </p>
            <p className="mt-2">
              Het belastingvrije maximum voor thuiswerken is in 2026 {formatEuro(TAX_FREE_HOME_OFFICE_RATE_2026)} per werkdag. Betaalt je werkgever meer, dan is het meerdere belast loon.
            </p>
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
              Van baan wisselen?
            </p>
            <h3 className="mt-2 text-xl font-black">Zorg dat je CV klaar is.</h3>
            <p className="mt-2 text-sm text-slate-300">
              Thuiswerkafspraken zijn onderdeel van moderne baanpakketten. Vergelijk je voorwaarden
              en zorg dat je CV klaarstaat voor een sterkere volgende stap.
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
