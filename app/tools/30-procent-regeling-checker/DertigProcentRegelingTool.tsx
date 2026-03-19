"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import {
  calculateThirtyPercentRuling,
  type ThirtyPercentRulingResult,
} from "@/lib/tools/moat-calculators";

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

function ToggleButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-2 text-xs font-black border-2 transition-colors ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-slate-700 border-slate-300 hover:border-slate-400"
      }`}
    >
      {label}
    </button>
  );
}

export default function DertigProcentRegelingTool() {
  const [annualTaxableSalary, setAnnualTaxableSalary] = useState("62000");
  const [monthsInScheme, setMonthsInScheme] = useState("12");
  const [under30WithMasters, setUnder30WithMasters] = useState(false);
  const [researcherOrMedicalSpecialist, setResearcherOrMedicalSpecialist] = useState(false);
  const [recruitedFromAbroad, setRecruitedFromAbroad] = useState(true);
  const [livedOutside150KmZone, setLivedOutside150KmZone] = useState(true);
  const [dutchPayrollEmployment, setDutchPayrollEmployment] = useState(true);
  const [result, setResult] = useState<ThirtyPercentRulingResult | null>(null);
  const [error, setError] = useState("");

  function resetResult() {
    setResult(null);
    setError("");
  }

  function handleCalculate() {
    const parsedAnnualSalary = parseDecimal(annualTaxableSalary);
    const parsedMonthsInScheme = parseDecimal(monthsInScheme);

    if (Number.isNaN(parsedAnnualSalary) || parsedAnnualSalary <= 0 || parsedAnnualSalary > 1000000) {
      setError("Vul een realistisch belastbaar jaarsalaris in.");
      return;
    }

    if (Number.isNaN(parsedMonthsInScheme) || parsedMonthsInScheme <= 0 || parsedMonthsInScheme > 12) {
      setError("Vul een aantal maanden in tussen 1 en 12.");
      return;
    }

    setError("");
    setResult(calculateThirtyPercentRuling({
      annualTaxableSalary: parsedAnnualSalary,
      monthsInScheme: parsedMonthsInScheme,
      under30WithMasters,
      researcherOrMedicalSpecialist,
      recruitedFromAbroad,
      livedOutside150KmZone,
      dutchPayrollEmployment,
    }));
  }

  const currentAnnualSalary = parseDecimal(annualTaxableSalary);

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
      {!result ? (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Belastbaar jaarsalaris
              </label>
              <input
                value={annualTaxableSalary}
                onChange={(event) => {
                  setAnnualTaxableSalary(event.target.value);
                  resetResult();
                }}
                placeholder="bijv. 62000"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Gebruik het loon dat belast blijft in Nederland, dus exclusief de belastingvrije 30%-vergoeding.
              </p>
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Aantal maanden in regeling dit jaar
              </label>
              <input
                value={monthsInScheme}
                onChange={(event) => {
                  setMonthsInScheme(event.target.value);
                  resetResult();
                }}
                placeholder="12"
                className={inputClass}
                inputMode="decimal"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Handig als je midden in het jaar start en de maximale vergoeding tijdsevenredig is.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                Jouw profiel
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    Jonger dan 30 met erkende master?
                  </p>
                  <div className="flex gap-2">
                    <ToggleButton active={under30WithMasters} label="Ja" onClick={() => {
                      setUnder30WithMasters(true);
                      resetResult();
                    }} />
                    <ToggleButton active={!under30WithMasters} label="Nee" onClick={() => {
                      setUnder30WithMasters(false);
                      resetResult();
                    }} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    Onderzoeker of arts in opleiding tot specialist?
                  </p>
                  <div className="flex gap-2">
                    <ToggleButton active={researcherOrMedicalSpecialist} label="Ja" onClick={() => {
                      setResearcherOrMedicalSpecialist(true);
                      resetResult();
                    }} />
                    <ToggleButton active={!researcherOrMedicalSpecialist} label="Nee" onClick={() => {
                      setResearcherOrMedicalSpecialist(false);
                      resetResult();
                    }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                Basisvoorwaarden
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    Ben je van buiten Nederland geworven?
                  </p>
                  <div className="flex gap-2">
                    <ToggleButton active={recruitedFromAbroad} label="Ja" onClick={() => {
                      setRecruitedFromAbroad(true);
                      resetResult();
                    }} />
                    <ToggleButton active={!recruitedFromAbroad} label="Nee" onClick={() => {
                      setRecruitedFromAbroad(false);
                      resetResult();
                    }} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    Woonde je in de 24 maanden ervoor meestal buiten de 150 km-zone?
                  </p>
                  <div className="flex gap-2">
                    <ToggleButton active={livedOutside150KmZone} label="Ja" onClick={() => {
                      setLivedOutside150KmZone(true);
                      resetResult();
                    }} />
                    <ToggleButton active={!livedOutside150KmZone} label="Nee" onClick={() => {
                      setLivedOutside150KmZone(false);
                      resetResult();
                    }} />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 mb-2">
                    Kom je in Nederlandse loondienst?
                  </p>
                  <div className="flex gap-2">
                    <ToggleButton active={dutchPayrollEmployment} label="Ja" onClick={() => {
                      setDutchPayrollEmployment(true);
                      resetResult();
                    }} />
                    <ToggleButton active={!dutchPayrollEmployment} label="Nee" onClick={() => {
                      setDutchPayrollEmployment(false);
                      resetResult();
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error ? <p className="text-sm text-red-600 font-medium">{error}</p> : null}

          <button
            type="button"
            onClick={handleCalculate}
            className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            style={{ borderWidth: "3px" }}
          >
            Check 30%-regeling
          </button>

          <p className="text-xs text-slate-500 text-center">
            Dit is een pre-check. De Belastingdienst beoordeelt uiteindelijk de volledige aanvraag samen met je werkgever.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className={`border-2 rounded-xl p-5 ${
            result.status === "eligible"
              ? "bg-emerald-50 border-emerald-300"
              : result.status === "salary_gap"
                ? "bg-amber-50 border-amber-300"
                : "bg-slate-50 border-slate-300"
          }`}>
            <p className={`text-xs font-black uppercase tracking-wide mb-2 ${
              result.status === "eligible"
                ? "text-emerald-700"
                : result.status === "salary_gap"
                  ? "text-amber-700"
                  : "text-slate-700"
            }`}>
              {result.status === "eligible" ? "Waarschijnlijk passend" : result.status === "salary_gap" ? "Nog geen salarismatch" : "Voorwaarden nog onvolledig"}
            </p>
            <p className="text-3xl font-black text-slate-900 mb-2">
              {result.status === "eligible"
                ? "Goede indicatie voor de regeling"
                : result.status === "salary_gap"
                  ? `${formatEuro(result.salaryGap, 0)} onder de drempel`
                  : "Check eerst de basisvoorwaarden"}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              {result.status === "eligible"
                ? "Op basis van je salaris en de ingevulde voorwaarden lijkt de 30%-regeling in grote lijnen haalbaar."
                : result.status === "salary_gap"
                  ? "Je belastbare loon ligt nog onder de pro-rata salarisdrempel voor 2026. Dat maakt de regeling op dit moment onwaarschijnlijk."
                  : "Zelfs met voldoende loon moeten buitenlandse werving, de 150 km-regel en Nederlandse loondienst ook kloppen."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Drempel 2026</p>
              <p className="text-xl font-black text-slate-900">
                {result.thresholdAnnual === 0 ? "Geen salarisdrempel" : formatEuro(result.thresholdAnnual, 0)}
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Jouw pro-rata drempel</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.proratedThresholdAnnual, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Max. onbelaste vergoeding</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.maximumUntaxedAllowanceAnnual, 0)}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Per maand indicatie</p>
              <p className="text-xl font-black text-slate-900">{formatEuro(result.monthlyUntaxedAllowance)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Wat deze berekening laat zien
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>Belastbaar salaris ingevoerd: {formatEuro(Number.isNaN(currentAnnualSalary) ? 0 : currentAnnualSalary, 0)}.</li>
                <li>Impliciet totaalpakket inclusief vergoeding: {formatEuro(result.impliedTotalPackageAnnual, 0)} per jaar.</li>
                <li>De maximale vergoeding is tijdsevenredig berekend over {monthsInScheme} maand(en).</li>
                <li>{result.capApplied ? "De wettelijke maximering is toegepast." : "De wettelijke maximering is niet geraakt."}</li>
              </ul>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Voorwaardencheck
              </p>
              <div className="space-y-2 text-sm text-slate-700">
                {[
                  ["Buiten Nederland geworven", recruitedFromAbroad],
                  ["Meer dan 150 km van NL-grens gewoond", livedOutside150KmZone],
                  ["Nederlandse loondienst", dutchPayrollEmployment],
                ].map(([label, passed]) => (
                  <div key={String(label)} className="flex items-center justify-between gap-3">
                    <span>{label}</span>
                    <span className={`text-xs font-black px-2 py-1 rounded-full ${passed ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                      {passed ? "Ja" : "Nee"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
              Belangrijke nuance
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De Belastingdienst kijkt niet alleen naar loon, maar ook naar de formele voorwaarden en de beschikking.</li>
              <li>Je werkgever mag minder dan 30% belastingvrij vergoeden; 30% is het maximum en geen verplicht standaardpercentage.</li>
              <li>Voor onderzoekers en artsen in opleiding tot specialist geldt geen salarisdrempel, maar de andere voorwaarden blijven relevant.</li>
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
