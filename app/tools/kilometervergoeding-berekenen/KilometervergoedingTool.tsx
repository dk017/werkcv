"use client";

import { useState } from "react";
import SalaryResultCvCta from "@/components/tools/SalaryResultCvCta";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  TAX_FREE_KILOMETER_RATE_2026,
  calculateKilometervergoeding,
  type KilometervergoedingResult,
} from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

const kilometerRatePresets = [
  { label: "€0,25", value: "0,25", note: "belastingvrij maximum" },
  { label: "€0,23", value: "0,23", note: "ouder 2025/2026 tarief" },
  { label: "€0,30", value: "0,30", note: "eigen afspraak" },
];

const WEEKS_PER_YEAR = 52;
const MONTHS_PER_YEAR = 12;
const FIXED_TRAVEL_DAYS_FULL_TIME = 214;

function formatTravelDays(days: number) {
  return Number.isInteger(days) ? String(days) : days.toLocaleString("nl-NL", { maximumFractionDigits: 1 });
}

type TravelMode = "kilometers" | "public-transport";
type KilometerCalculationMethod = "actual-days" | "fixed-214-days";

type PublicTransportResult = {
  singleTripPrice: number;
  returnTripPrice: number;
  travelDaysPerWeek: number;
  homeDaysPerWeek: number;
  travelDaysPerMonth: number;
  travelDaysInPeriod: number;
  monthsPerYear: number;
  reimbursementPerMonth: number;
  reimbursementInPeriod: number;
};

export default function KilometervergoedingTool() {
  const [travelMode, setTravelMode] = useState<TravelMode>("kilometers");
  const [kilometerCalculationMethod, setKilometerCalculationMethod] =
    useState<KilometerCalculationMethod>("actual-days");
  const [oneWayKilometers, setOneWayKilometers] = useState("24");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState("5");
  const [monthsPerYear, setMonthsPerYear] = useState("12");
  const [employerRatePerKilometer, setEmployerRatePerKilometer] = useState("0,25");
  const [singleTripPrice, setSingleTripPrice] = useState("4,40");
  const [result, setResult] = useState<KilometervergoedingResult | null>(null);
  const [publicTransportResult, setPublicTransportResult] = useState<PublicTransportResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    if (travelMode === "public-transport") {
      const parsedSingleTripPrice = parseDecimal(singleTripPrice);
      const parsedWorkDaysPerWeek = parseDecimal(workDaysPerWeek);
      const parsedMonthsPerYear = parseDecimal(monthsPerYear);

      if (
        Number.isNaN(parsedSingleTripPrice) ||
        parsedSingleTripPrice <= 0 ||
        parsedSingleTripPrice > 100
      ) {
        setError("Vul een realistische prijs voor een enkele OV-rit in.");
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

      const returnTripPrice = parsedSingleTripPrice * 2;
      const travelDaysPerMonth = parsedWorkDaysPerWeek * (WEEKS_PER_YEAR / MONTHS_PER_YEAR);
      const weeksInSelectedPeriod = WEEKS_PER_YEAR * (parsedMonthsPerYear / MONTHS_PER_YEAR);
      const travelDaysInPeriod = parsedWorkDaysPerWeek * weeksInSelectedPeriod;
      const reimbursementPerMonth = returnTripPrice * travelDaysPerMonth;
      const reimbursementInPeriod = returnTripPrice * travelDaysInPeriod;

      setError("");
      setResult(null);
      setPublicTransportResult({
        singleTripPrice: parsedSingleTripPrice,
        returnTripPrice,
        travelDaysPerWeek: parsedWorkDaysPerWeek,
        homeDaysPerWeek: Math.max(0, 5 - parsedWorkDaysPerWeek),
        travelDaysPerMonth,
        travelDaysInPeriod,
        monthsPerYear: parsedMonthsPerYear,
        reimbursementPerMonth,
        reimbursementInPeriod,
      });
      return;
    }

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
    setPublicTransportResult(null);
    setResult(
      calculateKilometervergoeding({
        oneWayKilometers: parsedOneWayKilometers,
        workDaysPerWeek: parsedWorkDaysPerWeek,
        monthsPerYear: parsedMonthsPerYear,
        employerRatePerKilometer: parsedEmployerRatePerKilometer,
        calculationMethod: kilometerCalculationMethod,
      }),
    );
  }

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result && !publicTransportResult ? (
        <div className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">
              Type reiskosten
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {[
                { id: "kilometers" as const, label: "Eigen vervoer", detail: "km-vergoeding per kilometer" },
                { id: "public-transport" as const, label: "OV ritprijs", detail: "enkele ritprijs × 2 × kantoordagen per week" },
              ].map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setTravelMode(option.id);
                    setResult(null);
                    setPublicTransportResult(null);
                    setError("");
                  }}
                  className={`border-2 border-black p-3 text-left transition-colors ${
                    travelMode === option.id ? "bg-[#4ECDC4]" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className="block text-sm font-black text-slate-900">{option.label}</span>
                  <span className="mt-1 block text-xs font-medium text-slate-600">{option.detail}</span>
                </button>
              ))}
            </div>
          </div>

          {travelMode === "kilometers" ? (
            <>
              <div>
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-slate-600">
                  Berekenmethode
                </p>
                <div className="grid gap-2 md:grid-cols-2">
                  {[
                    {
                      id: "actual-days" as const,
                      label: "Werkelijke reisdagen",
                      detail: "werkdagen per week × 52 weken",
                    },
                    {
                      id: "fixed-214-days" as const,
                      label: "Vaste vergoeding",
                      detail: "Belastingdienst 214-dagenregeling",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setKilometerCalculationMethod(option.id);
                        setResult(null);
                        setError("");
                      }}
                      className={`border-2 border-black p-3 text-left transition-colors ${
                        kilometerCalculationMethod === option.id
                          ? "bg-[#4ECDC4]"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      <span className="block text-sm font-black text-slate-900">{option.label}</span>
                      <span className="mt-1 block text-xs font-medium text-slate-600">{option.detail}</span>
                    </button>
                  ))}
                </div>
                {kilometerCalculationMethod === "fixed-214-days" ? (
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    Voor een onbelaste vaste vergoeding rekent de Belastingdienst met{" "}
                    {FIXED_TRAVEL_DAYS_FULL_TIME} werkdagen per jaar bij 5 werkdagen per week. Bij parttime werk
                    corrigeert de tool dit naar rato.
                  </p>
                ) : null}
              </div>

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
                    placeholder="0,25"
                    className={inputClass}
                    inputMode="decimal"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    Vul elk tarief in, bijvoorbeeld 0,25. Tot {formatEuro(TAX_FREE_KILOMETER_RATE_2026)} per km is in 2026 belastingvrij.
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {kilometerRatePresets.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => {
                          setEmployerRatePerKilometer(preset.value);
                          setResult(null);
                          setError("");
                        }}
                        className={`rounded-full border px-3 py-1.5 text-[11px] font-black transition-colors ${
                          employerRatePerKilometer === preset.value
                            ? "border-black bg-[#4ECDC4] text-black"
                            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-slate-500"
                        }`}
                        title={preset.note}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
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
            </>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                    Prijs enkele OV-rit
                  </label>
                  <input
                    value={singleTripPrice}
                    onChange={(event) => setSingleTripPrice(event.target.value)}
                    placeholder="bijv. 4,40"
                    className={inputClass}
                    inputMode="decimal"
                  />
                  <p className="mt-1 text-[11px] text-slate-500">
                    De tool rekent automatisch heen en terug: enkele rit × 2.
                  </p>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                    Kantoordagen met OV per week
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((days) => (
                      <button
                        key={days}
                        type="button"
                        onClick={() => {
                          setWorkDaysPerWeek(String(days));
                          setPublicTransportResult(null);
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
                  <p className="mt-1 text-[11px] text-slate-500">
                    Kies alleen de dagen waarop je echt naar kantoor reist. Bij 3 dagen kantoor en 2 dagen thuis kies je 3.
                  </p>
                </div>
              </div>
            </>
          )}

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
            {travelMode === "public-transport" ? "Bereken OV-vergoeding" : "Bereken kilometervergoeding"}
          </button>

          <p className="text-center text-xs text-slate-500">
            Dit is een indicatie op basis van standaard Nederlandse regelgeving. Controleer je loonstrook of cao voor exacte bedragen.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {publicTransportResult ? (
            <>
              <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
                <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
                  OV-vergoeding per maand
                </p>
                <p className="text-4xl font-black text-emerald-900">
                  {formatEuro(publicTransportResult.reimbursementPerMonth)}
                </p>
                <p className="mt-2 text-sm text-slate-700">
                  Op basis van {formatEuro(publicTransportResult.singleTripPrice)} per enkele rit en{" "}
                  {publicTransportResult.travelDaysPerWeek} kantoordagen per week.
                  {publicTransportResult.homeDaysPerWeek > 0
                    ? ` Thuiswerkdagen zijn niet meegerekend.`
                    : ""}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-5">
                {[
                  ["Enkele rit", formatEuro(publicTransportResult.singleTripPrice)],
                  ["Retour per dag", formatEuro(publicTransportResult.returnTripPrice)],
                  ["Reisdagen/maand", formatTravelDays(publicTransportResult.travelDaysPerMonth)],
                  ["Per maand", formatEuro(publicTransportResult.reimbursementPerMonth)],
                  [
                    publicTransportResult.monthsPerYear === 12 ? "Per jaar" : `Per ${formatTravelDays(publicTransportResult.monthsPerYear)} mnd`,
                    formatEuro(publicTransportResult.reimbursementInPeriod),
                  ],
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
                <p className="font-black text-slate-900">Berekening</p>
                <p className="mt-2">
                  {formatEuro(publicTransportResult.singleTripPrice)} × 2 ={" "}
                  {formatEuro(publicTransportResult.returnTripPrice)} per reisdag.{" "}
                  {publicTransportResult.travelDaysPerWeek} kantoordagen per week is gemiddeld{" "}
                  {formatTravelDays(publicTransportResult.travelDaysPerMonth)} reisdagen per maand.{" "}
                  {formatEuro(publicTransportResult.returnTripPrice)} ×{" "}
                  {formatTravelDays(publicTransportResult.travelDaysPerMonth)} reisdagen ={" "}
                  {formatEuro(publicTransportResult.reimbursementPerMonth)} per maand. Over{" "}
                  {formatTravelDays(publicTransportResult.monthsPerYear)} maand(en) zijn dat{" "}
                  {formatTravelDays(publicTransportResult.travelDaysInPeriod)} reisdagen en{" "}
                  {formatEuro(publicTransportResult.reimbursementInPeriod)} totaal.
                </p>
              </div>
            </>
          ) : result ? (
            <>
              <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="mb-2 text-xs font-black uppercase tracking-wide text-emerald-700">
              Vergoeding per maand
            </p>
            <p className="text-4xl font-black text-emerald-900">
              {formatEuro(result.reimbursementPerMonth)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              Op basis van {workDaysPerWeek} werkdagen per week en {oneWayKilometers} km enkele reis.
              {result.calculationMethod === "fixed-214-days"
                ? " Berekend met de 214-dagenregeling voor een vaste vergoeding."
                : ""}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-7">
            {[
              ["Per dag", formatEuro(result.reimbursementPerDay)],
              ["Per maand", formatEuro(result.reimbursementPerMonth)],
              ["Per jaar", formatEuro(result.reimbursementPerYear)],
              ["Totaal km/maand", formatTravelDays(result.monthlyKilometers)],
              ["Totaal km/jaar", formatTravelDays(result.annualKilometers)],
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
            {result.calculationMethod === "fixed-214-days" ? (
              <div className="mb-4 rounded-lg border border-slate-200 bg-white p-3">
                <p className="font-black text-slate-900">214-dagenregeling</p>
                <p className="mt-2">
                  Fulltime rekent met {result.fixedFullTimeDays} dagen per jaar. Bij {workDaysPerWeek} werkdagen
                  per week wordt dat {result.fixedFullTimeDays} × {workDaysPerWeek} / 5 ={" "}
                  {formatTravelDays(result.fixedCorrectedDays)} dagen. De formule is{" "}
                  {oneWayKilometers} km × 2 × {formatTravelDays(result.workDaysInPeriod)} dagen ={" "}
                  {formatTravelDays(result.annualKilometers)} km per jaar, gemiddeld{" "}
                  {formatTravelDays(result.monthlyKilometers)} km per maand. Daarna ×{" "}
                  {formatEuro(parseDecimal(employerRatePerKilometer))} = {formatEuro(result.reimbursementPerYear)}.
                </p>
              </div>
            ) : null}
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
            {!result.withinTaxFreeLimit ? (
              <p className="mt-2">
                Bij het ingevulde tarief valt {formatEuro(result.taxablePerMonth)} per maand en{" "}
                {formatEuro(result.taxablePerYear)} per jaar boven de belastingvrije grens.
              </p>
            ) : null}
          </div>
            </>
          ) : null}

          <SalaryResultCvCta
            toolName="kilometervergoeding-berekenen"
            title="Gebruik je reiskosteninzicht voor je volgende stap"
            text="Vergelijk je een aanbod of nieuwe baan? Zet je cv klaar terwijl salaris, reistijd en vergoeding nog vers in beeld zijn."
          />

          <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs font-medium leading-relaxed text-slate-600">
            Dit is een indicatie op basis van standaard Nederlandse regelgeving. Controleer je loonstrook of cao voor exacte bedragen.
          </p>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setPublicTransportResult(null);
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
