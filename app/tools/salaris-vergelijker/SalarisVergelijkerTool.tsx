"use client";

import { useState } from "react";
import Link from "next/link";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  compareSalaryOffers,
  type SalaryComparisonResult,
  type SalaryOfferInput,
} from "@/lib/tools/moat-calculators";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

type OfferState = {
  monthlyGrossSalary: string;
  holidayAllowanceOnTop: boolean;
  travelReimbursementMonthly: string;
  homeOfficeDaysPerWeek: string;
  annualBonusGross: string;
  vacationDaysPerYear: string;
};

const defaultOfferA: OfferState = {
  monthlyGrossSalary: "3800",
  holidayAllowanceOnTop: true,
  travelReimbursementMonthly: "160",
  homeOfficeDaysPerWeek: "2",
  annualBonusGross: "1500",
  vacationDaysPerYear: "25",
};

const defaultOfferB: OfferState = {
  monthlyGrossSalary: "4000",
  holidayAllowanceOnTop: false,
  travelReimbursementMonthly: "80",
  homeOfficeDaysPerWeek: "4",
  annualBonusGross: "0",
  vacationDaysPerYear: "30",
};

function parseOffer(offer: OfferState): SalaryOfferInput | null {
  const monthlyGrossSalary = parseDecimal(offer.monthlyGrossSalary);
  const travelReimbursementMonthly = parseDecimal(offer.travelReimbursementMonthly);
  const homeOfficeDaysPerWeek = parseDecimal(offer.homeOfficeDaysPerWeek);
  const annualBonusGross = parseDecimal(offer.annualBonusGross);
  const vacationDaysPerYear = parseDecimal(offer.vacationDaysPerYear);

  if (
    Number.isNaN(monthlyGrossSalary) ||
    monthlyGrossSalary <= 0 ||
    monthlyGrossSalary > 50000 ||
    Number.isNaN(travelReimbursementMonthly) ||
    travelReimbursementMonthly < 0 ||
    travelReimbursementMonthly > 5000 ||
    Number.isNaN(homeOfficeDaysPerWeek) ||
    homeOfficeDaysPerWeek < 0 ||
    homeOfficeDaysPerWeek > 5 ||
    Number.isNaN(annualBonusGross) ||
    annualBonusGross < 0 ||
    annualBonusGross > 100000 ||
    Number.isNaN(vacationDaysPerYear) ||
    vacationDaysPerYear < 0 ||
    vacationDaysPerYear > 60
  ) {
    return null;
  }

  return {
    monthlyGrossSalary,
    holidayAllowanceOnTop: offer.holidayAllowanceOnTop,
    travelReimbursementMonthly,
    homeOfficeDaysPerWeek,
    annualBonusGross,
    vacationDaysPerYear,
  };
}

export default function SalarisVergelijkerTool() {
  const [offerA, setOfferA] = useState<OfferState>(defaultOfferA);
  const [offerB, setOfferB] = useState<OfferState>(defaultOfferB);
  const [result, setResult] = useState<SalaryComparisonResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    const parsedOfferA = parseOffer(offerA);
    const parsedOfferB = parseOffer(offerB);

    if (!parsedOfferA || !parsedOfferB) {
      setError("Vul voor beide aanbiedingen realistische bedragen en aantallen in.");
      return;
    }

    setError("");
    setResult(compareSalaryOffers(parsedOfferA, parsedOfferB));
  }

  function renderOfferInputs(
    label: string,
    offer: OfferState,
    setOffer: React.Dispatch<React.SetStateAction<OfferState>>,
  ) {
    return (
      <div className="space-y-4 border-2 border-black bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-black text-slate-900">{label}</h3>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-wide text-slate-600">
            Netto indicatie
          </span>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Bruto maandsalaris
          </label>
          <input
            value={offer.monthlyGrossSalary}
            onChange={(event) => setOffer((current) => ({ ...current, monthlyGrossSalary: event.target.value }))}
            className={inputClass}
            inputMode="decimal"
          />
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700">
          <input
            type="checkbox"
            checked={offer.holidayAllowanceOnTop}
            onChange={(event) =>
              setOffer((current) => ({ ...current, holidayAllowanceOnTop: event.target.checked }))
            }
            className="mt-1"
          />
          <span>
            Vakantiegeld komt nog bovenop dit salaris
            <span className="mt-1 block text-xs text-slate-500">
              Zet dit uit als vakantiegeld al is inbegrepen in het opgegeven maandbedrag.
            </span>
          </span>
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Reiskostenvergoeding per maand
            </label>
            <input
              value={offer.travelReimbursementMonthly}
              onChange={(event) =>
                setOffer((current) => ({ ...current, travelReimbursementMonthly: event.target.value }))
              }
              className={inputClass}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Thuiswerkdagen per week
            </label>
            <select
              value={offer.homeOfficeDaysPerWeek}
              onChange={(event) =>
                setOffer((current) => ({ ...current, homeOfficeDaysPerWeek: event.target.value }))
              }
              className={inputClass}
            >
              {[0, 1, 2, 3, 4, 5].map((days) => (
                <option key={days} value={days}>
                  {days}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Verwachte bonus per jaar
            </label>
            <input
              value={offer.annualBonusGross}
              onChange={(event) =>
                setOffer((current) => ({ ...current, annualBonusGross: event.target.value }))
              }
              className={inputClass}
              inputMode="decimal"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
              Vakantiedagen per jaar
            </label>
            <input
              value={offer.vacationDaysPerYear}
              onChange={(event) =>
                setOffer((current) => ({ ...current, vacationDaysPerYear: event.target.value }))
              }
              className={inputClass}
              inputMode="decimal"
            />
          </div>
        </div>
      </div>
    );
  }

  function renderOfferResult(
    title: string,
    offer: SalaryComparisonResult["offerA"],
    accent: string,
  ) {
    return (
      <div className={`border-2 border-black ${accent} p-5`}>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">{title}</p>
        <p className="mt-2 text-4xl font-black text-slate-900">
          {formatEuro(offer.totalNetEquivalentMonthly)}
        </p>
        <p className="mt-2 text-sm font-medium text-slate-700">
          Totale netto-equivalent per maand, inclusief vergoedingen, bonus en vakantiedagenwaarde.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {[
            ["Netto maandsalaris", formatEuro(offer.regularMonthlyNet)],
            ["Netto jaarsalaris incl. vakantiegeld", formatEuro(offer.netAnnualSalaryIncludingHoliday)],
            ["Bonus netto indicatie", formatEuro(offer.annualBonusNet)],
            [
              "Reiskosten + thuiswerk per maand",
              formatEuro(offer.monthlyTravelReimbursement + offer.monthlyHomeOfficeAllowance),
            ],
            ["Waarde vakantiedagen", formatEuro(offer.vacationDaysValueNet)],
            ["Totaal per jaar", formatEuro(offer.totalNetEquivalentAnnual)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</p>
              <p className="text-lg font-black text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div className="grid gap-5 lg:grid-cols-2">
            {renderOfferInputs("Aanbod A", offerA, setOfferA)}
            {renderOfferInputs("Aanbod B", offerB, setOfferB)}
          </div>

          {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full border-3 border-black bg-[#4ECDC4] px-6 py-3 text-sm font-black text-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-teal-500"
            style={{ borderWidth: "3px" }}
          >
            Vergelijk aanbiedingen
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Vergelijkingsuitkomst
            </p>
            <h3 className="mt-2 text-2xl font-black text-emerald-900">
              {result.winner === "tie"
                ? "Beide aanbiedingen liggen praktisch gelijk."
                : result.winner === "offer_a"
                  ? `Aanbod A is ${formatEuro(result.monthlyDifference)} netto per maand voordeliger.`
                  : `Aanbod B is ${formatEuro(result.monthlyDifference)} netto per maand voordeliger.`}
            </h3>
            <p className="mt-2 text-sm text-slate-700">
              WerkCV rekent op basis van salaris, vakantiegeld, bonus, vergoedingen en de netto waarde
              van extra of minder vakantiedagen ten opzichte van 20 dagen.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {renderOfferResult("Aanbod A", result.offerA, "bg-[#FFF9D9]")}
            {renderOfferResult("Aanbod B", result.offerB, "bg-[#E8FBF8]")}
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-black text-slate-900">Aannames achter de netto-indicatie</p>
            <p className="mt-2">
              Deze vergelijking gebruikt dezelfde loonbelastingaannames als de netto-bruto calculator:
              werknemer onder AOW-leeftijd, loonheffingskorting aan en vakantiegeld volgens de standaard 8% als het bovenop het salaris komt.
            </p>
          </div>

          <div className="border-2 border-black bg-black p-5 text-white">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-yellow-300">
              Van baan wisselen?
            </p>
            <h3 className="mt-2 text-xl font-black">Zorg dat je CV klaar is.</h3>
            <p className="mt-2 text-sm text-slate-300">
              Heb je een beter aanbod gevonden? Trek de vergelijking door naar een CV dat klaarstaat
              voor je volgende stap of onderhandeling.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-2 border-white bg-[#4ECDC4] px-4 py-2 text-sm font-black text-slate-900"
              >
                Maak gratis een ATS-vriendelijk CV - eenmalig €4,99
              </Link>
              <Link
                href="/templates"
                className="border-2 border-white bg-transparent px-4 py-2 text-sm font-black text-white"
              >
                Vergelijk CV templates
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
            Opnieuw vergelijken
          </button>
        </div>
      )}
    </div>
  );
}
