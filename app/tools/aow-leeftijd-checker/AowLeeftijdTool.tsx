"use client";

import { useState } from "react";
import { createUtcDate, formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { ToolResultCta } from "@/components/tools/ToolResultCta";
import {
  calculateAowResult,
  calculateEarlyRetirementBridge,
} from "@/lib/tools/employment-tools";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

function formatMonthYear(date: Date) {
  return new Intl.DateTimeFormat("nl-NL", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function formatDuration(years: number, months: number) {
  return `${years} jaar en ${months} maanden`;
}

export default function AowLeeftijdTool() {
  const [birthDate, setBirthDate] = useState("1985-06-15");
  const [desiredStopAge, setDesiredStopAge] = useState("65");
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState("3500");

  const parsedBirthDate = createUtcDate(birthDate);
  const parsedDesiredStopAge = parseDecimal(desiredStopAge);
  const parsedGrossMonthlyIncome = parseDecimal(grossMonthlyIncome);

  let error = "";

  if (!parsedBirthDate) {
    error = "Vul een geldige geboortedatum in.";
  } else if (Number.isNaN(parsedDesiredStopAge) || parsedDesiredStopAge <= 0) {
    error = "Vul een geldige leeftijd in waarop je wilt stoppen.";
  } else if (Number.isNaN(parsedGrossMonthlyIncome) || parsedGrossMonthlyIncome <= 0) {
    error = "Vul een geldig bruto maandinkomen in.";
  }

  const aowResult = !error && parsedBirthDate ? calculateAowResult(parsedBirthDate) : null;
  const bridgeResult =
    aowResult && !error
      ? calculateEarlyRetirementBridge(
          aowResult.ageYears,
          aowResult.ageMonths,
          parsedDesiredStopAge,
          parsedGrossMonthlyIncome,
        )
      : null;

  const desiredAgeTooLate =
    aowResult && parsedDesiredStopAge >= aowResult.ageYears + aowResult.ageMonths / 12;

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <div>
        <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
          Geboortedatum
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          className={inputClass}
        />
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {aowResult ? (
        <>
          <div className="mt-6 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Jouw AOW-resultaat
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Jouw AOW-leeftijd
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {formatDuration(aowResult.ageYears, aowResult.ageMonths)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Jouw AOW-ingangsdatum
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {formatMonthYear(aowResult.aowDate)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Nog te gaan
                </p>
                <p className="mt-1 text-2xl font-black text-slate-900">
                  {aowResult.reached
                    ? "AOW-leeftijd al bereikt"
                    : formatDuration(aowResult.remainingYears, aowResult.remainingMonths)}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-700">
              De AOW gaat in op {formatLongDate(aowResult.aowDate)}. SVB stuurt je automatisch een
              brief 4 maanden voor je AOW-ingangsdatum.
            </p>
          </div>

          {aowResult.reached ? (
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
              Je AOW-leeftijd is al bereikt. Je hebt recht op AOW-uitkering. Als je deze nog niet
              ontvangt, neem dan contact op met de SVB.
            </div>
          ) : null}

          {aowResult.note ? (
            <div className="mt-4 rounded-xl border border-blue-300 bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
              {aowResult.note}
            </div>
          ) : null}

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xl font-black text-slate-900">
              Wat als je eerder stopt met werken?
            </h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Op welke leeftijd wil je stoppen?
                </label>
                <input
                  value={desiredStopAge}
                  onChange={(event) => setDesiredStopAge(event.target.value)}
                  className={inputClass}
                  inputMode="decimal"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                  Huidig bruto maandinkomen
                </label>
                <input
                  value={grossMonthlyIncome}
                  onChange={(event) => setGrossMonthlyIncome(event.target.value)}
                  className={inputClass}
                  inputMode="decimal"
                />
              </div>
            </div>

            {desiredAgeTooLate ? (
              <p className="mt-4 text-sm font-medium text-red-600">
                Kies een stopleeftijd die lager ligt dan je AOW-leeftijd.
              </p>
            ) : null}

            {bridgeResult && !desiredAgeTooLate ? (
              <>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Jaren zonder regulier inkomen voor AOW
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900">
                      {formatDuration(bridgeResult.gapYears, bridgeResult.gapMonths)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Netto-schatting per maand
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900">
                      {formatEuro(bridgeResult.monthlyNetEstimate, 0)}
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-4">
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                      Geschat benodigd overbrugvermogen
                    </p>
                    <p className="mt-1 text-xl font-black text-slate-900">
                      {formatEuro(bridgeResult.totalBridgeCapital, 0)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
                  Dit is een ruwe indicatie zonder rekening te houden met AOW-opbouwkorting,
                  aanvullend pensioen, of beleggingsrendement. Raadpleeg een onafhankelijk
                  financieel adviseur voor je persoonlijke pensioenplan.
                </div>
              </>
            ) : null}
          </div>

          <div className="mt-6">
            <ToolResultCta />
          </div>
        </>
      ) : null}
    </div>
  );
}
