"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  WW_MAX_DAGLOON_2026,
  calculateAdvancedWwDagloon,
  calculateQuickWwDagloon,
  type WwDagloonResult,
} from "@/lib/tools/moat-calculators";

type Mode = "quick" | "advanced";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function WWDagloonTool() {
  const [mode, setMode] = useState<Mode>("quick");
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("3200");
  const [monthsWithSalary, setMonthsWithSalary] = useState("12");
  const [holidayPercentage, setHolidayPercentage] = useState("8");
  const [annualReserve, setAnnualReserve] = useState("");
  const [svLoon, setSvLoon] = useState("46080");
  const [paidHolidayAndAvwb, setPaidHolidayAndAvwb] = useState("");
  const [reservedHolidayAndAvwb, setReservedHolidayAndAvwb] = useState("3686");
  const [dayCount, setDayCount] = useState("261");
  const [result, setResult] = useState<WwDagloonResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (mode === "quick") {
      const parsedMonthlyGrossSalary = parseDecimal(monthlyGrossSalary);
      const parsedMonthsWithSalary = parseDecimal(monthsWithSalary);
      const parsedHolidayPercentage = parseDecimal(holidayPercentage);
      const parsedAnnualReserve = annualReserve.trim() ? parseDecimal(annualReserve) : 0;

      if (Number.isNaN(parsedMonthlyGrossSalary) || parsedMonthlyGrossSalary <= 0) {
        setError("Vul een geldig bruto maandsalaris in.");
        return;
      }

      if (Number.isNaN(parsedMonthsWithSalary) || parsedMonthsWithSalary <= 0 || parsedMonthsWithSalary > 12) {
        setError("Vul een aantal maanden met loon in tussen 1 en 12.");
        return;
      }

      if (Number.isNaN(parsedHolidayPercentage) || parsedHolidayPercentage < 0 || parsedHolidayPercentage > 25) {
        setError("Gebruik een realistisch vakantiegeldpercentage, bijvoorbeeld 8.");
        return;
      }

      if (Number.isNaN(parsedAnnualReserve) || parsedAnnualReserve < 0) {
        setError("Gebruik alleen positieve bedragen voor 13e maand, IKB of andere vaste reserve.");
        return;
      }

      setError("");
      setResult(calculateQuickWwDagloon({
        monthlyGrossSalary: parsedMonthlyGrossSalary,
        monthsWithSalary: parsedMonthsWithSalary,
        holidayPercentage: parsedHolidayPercentage,
        annualReserve: parsedAnnualReserve,
      }));
      return;
    }

    const parsedSvLoon = parseDecimal(svLoon);
    const parsedPaidHolidayAndAvwb = paidHolidayAndAvwb.trim() ? parseDecimal(paidHolidayAndAvwb) : 0;
    const parsedReservedHolidayAndAvwb = reservedHolidayAndAvwb.trim() ? parseDecimal(reservedHolidayAndAvwb) : 0;
    const parsedDayCount = parseDecimal(dayCount);

    if (Number.isNaN(parsedSvLoon) || parsedSvLoon <= 0) {
      setError("Vul een geldig SV-loon in over de referteperiode.");
      return;
    }

    if (Number.isNaN(parsedPaidHolidayAndAvwb) || parsedPaidHolidayAndAvwb < 0) {
      setError("Gebruik alleen positieve bedragen voor uitbetaald vakantiegeld of AVWB.");
      return;
    }

    if (Number.isNaN(parsedReservedHolidayAndAvwb) || parsedReservedHolidayAndAvwb < 0) {
      setError("Gebruik alleen positieve bedragen voor gereserveerd vakantiegeld of AVWB.");
      return;
    }

    if (Number.isNaN(parsedDayCount) || parsedDayCount <= 0 || parsedDayCount > 261) {
      setError("Vul een realistisch aantal dagloondagen in, bijvoorbeeld 261 voor een volledig jaar.");
      return;
    }

    setError("");
    setResult(calculateAdvancedWwDagloon({
      svLoon: parsedSvLoon,
      paidHolidayAndAvwb: parsedPaidHolidayAndAvwb,
      reservedHolidayAndAvwb: parsedReservedHolidayAndAvwb,
      dayCount: parsedDayCount,
    }));
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
              Rekenniveau
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {([
                ["quick", "Snelle schatting", "Voor stabiel maandsalaris en globale WW-indicatie."],
                ["advanced", "Dichter op UWV-data", "Voor wie SV-loon, gereserveerd vakantiegeld en dagloondagen kent."],
              ] as const).map(([value, label, note]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setMode(value);
                    setResult(null);
                    setError("");
                  }}
                  className={`p-4 border-2 text-left transition-colors ${
                    mode === value
                      ? "bg-black text-white border-black"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="font-black text-sm">{label}</div>
                  <div className={`text-xs mt-1 ${mode === value ? "text-slate-300" : "text-slate-500"}`}>{note}</div>
                </button>
              ))}
            </div>
          </div>

          {mode === "quick" ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
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
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    Maanden met loon in referteperiode
                  </label>
                  <input
                    value={monthsWithSalary}
                    onChange={(event) => setMonthsWithSalary(event.target.value)}
                    placeholder="12"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    13e maand / IKB / vaste reserve per jaar
                  </label>
                  <input
                    value={annualReserve}
                    onChange={(event) => setAnnualReserve(event.target.value)}
                    placeholder="bijv. 3000"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                Deze snelle route gaat uit van een stabiel maandsalaris. WerkCV telt gereserveerd vakantiegeld en vaste jaarlijkse reserveringen mee en zet dat om naar een dagloon-indicatie.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    SV-loon in referteperiode
                  </label>
                  <input
                    value={svLoon}
                    onChange={(event) => setSvLoon(event.target.value)}
                    placeholder="bijv. 46080"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    Dagloondagen
                  </label>
                  <input
                    value={dayCount}
                    onChange={(event) => setDayCount(event.target.value)}
                    placeholder="261"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    Uitbetaald vakantiegeld / AVWB in SV-loon
                  </label>
                  <input
                    value={paidHolidayAndAvwb}
                    onChange={(event) => setPaidHolidayAndAvwb(event.target.value)}
                    placeholder="bijv. 0 of 2500"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                    Gereserveerd vakantiegeld / AVWB
                  </label>
                  <input
                    value={reservedHolidayAndAvwb}
                    onChange={(event) => setReservedHolidayAndAvwb(event.target.value)}
                    placeholder="bijv. 3686"
                    className={inputClass}
                    inputMode="decimal"
                  />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700">
                Deze route sluit dichter aan op de UWV-methode: SV-loon minus uitbetaalde reserveringen plus gereserveerde reserveringen, gedeeld door het aantal dagloondagen.
              </div>
            </div>
          )}

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ borderWidth: "3px" }}
          >
            Bereken WW-dagloon indicatie
          </button>

          <p className="text-xs text-slate-500 text-center">
            Maximum dagloon 2026: {formatEuro(WW_MAX_DAGLOON_2026)} bruto per dag. Deze tool geeft een sterke indicatie, geen definitieve UWV-beschikking.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className={`border-2 rounded-xl p-5 ${result.capped ? "bg-amber-50 border-amber-300" : "bg-emerald-50 border-emerald-300"}`}>
            <p className={`text-xs font-black uppercase tracking-wide mb-2 ${result.capped ? "text-amber-700" : "text-emerald-700"}`}>
              {result.capped ? "Dagloon begrensd door maximum" : "WW-dagloon indicatie"}
            </p>
            <p className={`text-4xl font-black mb-2 ${result.capped ? "text-amber-900" : "text-emerald-900"}`}>
              {formatEuro(result.dagloon)}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Dat leidt tot ongeveer {formatEuro(result.monthlyBenefitFirstTwoMonths, 0)} bruto per maand in de eerste 2 maanden WW en daarna ongeveer {formatEuro(result.monthlyBenefitAfterTwoMonths, 0)} bruto per maand.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Referte-inkomen</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.referenceIncome, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Dagloondagen</p>
              <p className="text-xl font-black text-slate-900">{result.dayCount}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Eerste 2 maanden</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.dailyBenefitFirstTwoMonths)}</p>
              <p className="text-xs text-slate-500 mt-1">75% per dag</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Vanaf maand 3</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.dailyBenefitAfterTwoMonths)}</p>
              <p className="text-xs text-slate-500 mt-1">70% per dag</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Hoe WerkCV rekende
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                {result.mode === "quick"
                  ? `WerkCV gebruikte een snelle schatting vanuit stabiel loon en reserveringen: referte-inkomen ${formatEuro(result.referenceIncome, 0)} gedeeld door ${result.dayCount} dagloondagen.`
                  : `WerkCV gebruikte de geavanceerde UWV-benadering: referte-inkomen ${formatEuro(result.referenceIncome, 0)} gedeeld door ${result.dayCount} dagloondagen.`}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Controlepunt
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Officiele UWV-uitkomsten kunnen afwijken door wisselend loon, ziekte, onbetaald verlof of afwijkende reserveringen.</li>
                <li>Bij een hoog loon kan het dagloon worden begrensd op {formatEuro(result.maxDagloon)} per dag.</li>
                {result.capped ? (
                  <li>In jouw berekening wordt ongeveer {formatEuro(result.capReduction)} per dag afgeroomd door het wettelijke maximum.</li>
                ) : (
                  <li>Jouw berekening blijft onder het wettelijke maximum dagloon.</li>
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
            Opnieuw berekenen
          </button>
        </div>
      )}
    </div>
  );
}
