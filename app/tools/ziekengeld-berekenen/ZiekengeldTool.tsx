"use client";

import { useState } from "react";
import Link from "next/link";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { calculateZiekengeld, type ZiekengeldResult } from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function ZiekengeldTool() {
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("3600");
  const [illnessYear, setIllnessYear] = useState<"1" | "2">("1");
  const [employerCoveragePercentage, setEmployerCoveragePercentage] = useState("100");
  const [result, setResult] = useState<ZiekengeldResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedMonthlyGrossSalary = parseDecimal(monthlyGrossSalary);
    const parsedEmployerCoveragePercentage = parseDecimal(employerCoveragePercentage);

    if (
      Number.isNaN(parsedMonthlyGrossSalary) ||
      parsedMonthlyGrossSalary <= 0 ||
      parsedMonthlyGrossSalary > 50000
    ) {
      setError("Vul een realistisch bruto maandsalaris in.");
      return;
    }

    if (
      Number.isNaN(parsedEmployerCoveragePercentage) ||
      parsedEmployerCoveragePercentage < 70 ||
      parsedEmployerCoveragePercentage > 100
    ) {
      setError("Gebruik een percentage tussen 70% en 100%.");
      return;
    }

    setError("");
    setResult(
      calculateZiekengeld({
        monthlyGrossSalary: parsedMonthlyGrossSalary,
        illnessYear: illnessYear === "1" ? 1 : 2,
        employerCoveragePercentage: parsedEmployerCoveragePercentage,
      }),
    );
  }

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Bruto maandsalaris
            </label>
            <input
              value={monthlyGrossSalary}
              onChange={(event) => setMonthlyGrossSalary(event.target.value)}
              placeholder="bijv. 3600"
              className={inputClass}
              inputMode="decimal"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Jaar van ziekte
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                ["1", "Jaar 1", "vaak 100% in veel cao's"],
                ["2", "Jaar 2", "vaak 70% van het salaris"],
              ].map(([value, label, note]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setIllnessYear(value as "1" | "2");
                    setEmployerCoveragePercentage(value === "1" ? "100" : "70");
                    setResult(null);
                    setError("");
                  }}
                  className={`border-2 border-black px-4 py-2 text-left text-sm font-black ${
                    illnessYear === value ? "bg-[#4ECDC4] text-black" : "bg-white text-slate-700"
                  }`}
                >
                  <span className="block">{label}</span>
                  <span className="text-[11px] font-medium">{note}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Percentage dat werkgever vergoedt
            </label>
            <input
              value={employerCoveragePercentage}
              onChange={(event) => setEmployerCoveragePercentage(event.target.value)}
              placeholder={illnessYear === "1" ? "100" : "70"}
              className={inputClass}
              inputMode="decimal"
            />
            <p className="mt-1 text-[11px] text-slate-500">
              Wettelijk minimum is 70%. Sommige cao&apos;s of contracten zitten daarboven.
            </p>
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
            style={{ borderWidth: "3px" }}
          >
            Bereken ziekengeld
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
              Verwacht bruto ziekengeld per maand
            </p>
            <p className="text-4xl font-black text-emerald-900">
              {formatEuro(result.expectedGrossPerMonth)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Gebaseerd op {result.selectedCoveragePercentage}% van je laatst verdiende maandsalaris.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              ["Minimum wettelijk", formatEuro(result.legalMinimumGrossPerMonth)],
              ["Verschil met huidig salaris", formatEuro(result.differenceWithCurrentSalary)],
              ["Boven wettelijk minimum", formatEuro(result.differenceVsLegalMinimum)],
              ["Op jaarbasis", formatEuro(result.annualizedGross)],
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
            <p className="font-black text-slate-900">Belangrijke nuance</p>
            <p className="mt-2">
              Dit is een indicatieve berekening. Je werkgever kan meer betalen dan het wettelijk
              minimum van 70%, afhankelijk van je cao of arbeidscontract. Raadpleeg je HR-afdeling
              of cao voor de exacte regeling. Na 104 weken ziekte volgt meestal een WIA-beoordeling.
            </p>
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
              Van baan wisselen?
            </p>
            <h3 className="mt-2 text-xl font-black">Zorg dat je CV klaar is.</h3>
            <p className="mt-2 text-sm text-slate-300">
              Langdurige ziekte raakt vaak je volgende carrièrestap. Zorg dat je CV op tijd klaarstaat
              voor heroriëntatie of een nieuwe start.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-2 border-white bg-[#4ECDC4] px-4 py-2 text-sm font-black text-slate-900"
              >
                Maak gratis een ATS-vriendelijk CV - eenmalig €4,99
              </Link>
              <Link
                href="/tools/ww-recht-checker"
                className="border-2 border-white bg-transparent px-4 py-2 text-sm font-black text-white"
              >
                WW recht checker
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
