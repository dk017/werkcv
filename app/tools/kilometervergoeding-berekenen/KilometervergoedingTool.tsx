"use client";

import { useState } from "react";
import Link from "next/link";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  TAX_FREE_KILOMETER_RATE_2026,
  calculateKilometervergoeding,
  type KilometervergoedingResult,
} from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function KilometervergoedingTool() {
  const [oneWayKilometers, setOneWayKilometers] = useState("24");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [monthsPerYear, setMonthsPerYear] = useState("12");
  const [employerRatePerKilometer, setEmployerRatePerKilometer] = useState("0,23");
  const [result, setResult] = useState<KilometervergoedingResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedOneWayKilometers = parseDecimal(oneWayKilometers);
    const parsedWorkDaysPerWeek = parseDecimal(workDaysPerWeek);
    const parsedMonthsPerYear = parseDecimal(monthsPerYear);
    const parsedEmployerRatePerKilometer = parseDecimal(employerRatePerKilometer);

    if (
      Number.isNaN(parsedOneWayKilometers) ||
      parsedOneWayKilometers <= 0 ||
      parsedOneWayKilometers > 250
    ) {
      setError("Vul een realistische afstand in voor je enkele reis.");
      return;
    }

    if (
      Number.isNaN(parsedWorkDaysPerWeek) ||
      parsedWorkDaysPerWeek < 1 ||
      parsedWorkDaysPerWeek > 5
    ) {
      setError("Kies tussen 1 en 5 werkdagen per week.");
      return;
    }

    if (
      Number.isNaN(parsedMonthsPerYear) ||
      parsedMonthsPerYear < 1 ||
      parsedMonthsPerYear > 12
    ) {
      setError("Kies een aantal maanden tussen 1 en 12.");
      return;
    }

    if (
      Number.isNaN(parsedEmployerRatePerKilometer) ||
      parsedEmployerRatePerKilometer < 0 ||
      parsedEmployerRatePerKilometer > 2
    ) {
      setError("Gebruik een realistisch kilometertarief per km.");
      return;
    }

    setError("");
    setResult(
      calculateKilometervergoeding({
        oneWayKilometers: parsedOneWayKilometers,
        workDaysPerWeek: parsedWorkDaysPerWeek,
        monthsPerYear: parsedMonthsPerYear,
        employerRatePerKilometer: parsedEmployerRatePerKilometer,
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
                Kilometers enkele reis
              </label>
              <input
                value={oneWayKilometers}
                onChange={(event) => setOneWayKilometers(event.target.value)}
                placeholder="bijv. 24"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                De tool rekent automatisch heen en terug mee.
              </p>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Vergoed door werkgever per km
              </label>
              <input
                value={employerRatePerKilometer}
                onChange={(event) => setEmployerRatePerKilometer(event.target.value)}
                placeholder="0,23"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="mt-1 text-[11px] text-slate-500">
                Tot {formatEuro(TAX_FREE_KILOMETER_RATE_2026)} per km is in 2026 belastingvrij.
              </p>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Werkdagen per week
            </label>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => {
                    setWorkDaysPerWeek(String(days));
                    setResult(null);
                    setError("");
                  }}
                  className={`border-2 border-black px-4 py-2 text-sm font-black ${
                    workDaysPerWeek === String(days)
                      ? "bg-[#4ECDC4] text-black"
                      : "bg-white text-slate-700"
                  }`}
                >
                  {days} dag{days > 1 ? "en" : ""}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Maanden per jaar
            </label>
            <input
              value={monthsPerYear}
              onChange={(event) => setMonthsPerYear(event.target.value)}
              placeholder="12"
              className={inputClass}
              inputMode="decimal"
            />
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
            style={{ borderWidth: "3px" }}
          >
            Bereken kilometervergoeding
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
              Vergoeding per maand
            </p>
            <p className="text-4xl font-black text-emerald-900">
              {formatEuro(result.reimbursementPerMonth)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Op basis van {workDaysPerWeek} werkdagen per week en {oneWayKilometers} km enkele reis.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            {[
              ["Per dag", formatEuro(result.reimbursementPerDay)],
              ["Per maand", formatEuro(result.reimbursementPerMonth)],
              ["Per jaar", formatEuro(result.reimbursementPerYear)],
              ["Belastingvrij deel", formatEuro(result.taxFreePerYear)],
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
                ? "Je volledige vergoeding valt binnen de belastingvrije grens."
                : "Een deel van je vergoeding ligt boven de belastingvrije grens."}
            </p>
            <p className="mt-2">
              De maximale belastingvrije kilometervergoeding in 2026 is{" "}
              {formatEuro(TAX_FREE_KILOMETER_RATE_2026)} per kilometer. Vergoedt je werkgever meer,
              dan is het meerdere belast als loon.
            </p>
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
              Van baan wisselen?
            </p>
            <h3 className="mt-2 text-xl font-black">Zorg dat je CV klaar is.</h3>
            <p className="mt-2 text-sm text-slate-300">
              Reiskosten zijn vaak onderdeel van een nieuw aanbod. Trek dat moment door naar een CV
              dat klaarstaat voor je volgende stap.
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
