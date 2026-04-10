"use client";

import { useState } from "react";
import { formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { ToolResultCta } from "@/components/tools/ToolResultCta";
import {
  DUO_INTEREST_RATE_2026,
  calculateDuoRepayment,
  type DuoLivingSituation,
  type DuoSystem,
} from "@/lib/tools/employment-tools";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

function formatNumber(value: number, maximumFractionDigits = 1) {
  return new Intl.NumberFormat("nl-NL", {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(value);
}

function RadioCard({
  active,
  title,
  subtitle,
  onClick,
}: {
  active: boolean;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-2 px-4 py-3 text-left ${
        active ? "border-black bg-[#4ECDC4] text-black" : "border-slate-300 bg-white text-slate-700"
      }`}
    >
      <span className="block text-sm font-black">{title}</span>
      <span className="block text-[11px] font-medium">{subtitle}</span>
    </button>
  );
}

export default function StudieschuldTool() {
  const [system, setSystem] = useState<DuoSystem>("new");
  const [outstandingDebt, setOutstandingDebt] = useState("18000");
  const [annualIncome, setAnnualIncome] = useState("38000");
  const [noIncome, setNoIncome] = useState(false);
  const [livingSituation, setLivingSituation] = useState<DuoLivingSituation>("single");
  const [extraMonthlyRepayment, setExtraMonthlyRepayment] = useState("");

  const parsedDebt = parseDecimal(outstandingDebt);
  const parsedAnnualIncome = noIncome ? 0 : parseDecimal(annualIncome);
  const parsedExtraMonthlyRepayment = extraMonthlyRepayment.trim()
    ? parseDecimal(extraMonthlyRepayment)
    : 0;

  let error = "";

  if (Number.isNaN(parsedDebt) || parsedDebt < 0) {
    error = "Vul een geldige openstaande studieschuld in.";
  } else if (!noIncome && (Number.isNaN(parsedAnnualIncome) || parsedAnnualIncome < 0)) {
    error = "Vul een geldig bruto jaarinkomen in.";
  } else if (
    Number.isNaN(parsedExtraMonthlyRepayment) ||
    parsedExtraMonthlyRepayment < 0
  ) {
    error = "Vrijwillig extra aflossen kan niet negatief zijn.";
  }

  const result = error
    ? null
    : calculateDuoRepayment({
        system,
        outstandingDebt: parsedDebt,
        annualIncome: parsedAnnualIncome,
        livingSituation,
        extraMonthlyRepayment: parsedExtraMonthlyRepayment,
      });

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <div>
        <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
          Stelsel
        </label>
        <div className="grid gap-3 md:grid-cols-2">
          <RadioCard
            active={system === "old"}
            title="Oud stelsel — begonnen met lenen vóór september 2015"
            subtitle="looptijd 15 jaar"
            onClick={() => setSystem("old")}
          />
          <RadioCard
            active={system === "new"}
            title="Nieuw stelsel — begonnen met lenen ná september 2015"
            subtitle="looptijd 35 jaar"
            onClick={() => setSystem("new")}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Openstaande studieschuld bij DUO
          </label>
          <input
            value={outstandingDebt}
            onChange={(event) => setOutstandingDebt(event.target.value)}
            placeholder="18.000"
            className={inputClass}
            inputMode="decimal"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Bruto jaarinkomen
          </label>
          <input
            value={noIncome ? "0" : annualIncome}
            onChange={(event) => setAnnualIncome(event.target.value)}
            placeholder="38.000"
            className={inputClass}
            inputMode="decimal"
            disabled={noIncome}
          />
          <label className="mt-3 flex items-center gap-3 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              checked={noIncome}
              onChange={(event) => setNoIncome(event.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            Geen inkomen
          </label>
          {noIncome ? (
            <p className="mt-2 text-sm text-emerald-700">
              Zonder inkomen is je aflossing €0. DUO herberekent dit jaarlijks.
            </p>
          ) : null}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Woonsituatie
          </label>
          <div className="grid gap-3">
            <RadioCard
              active={livingSituation === "single"}
              title="Alleenstaand"
              subtitle="drempelinkomen €24.893"
              onClick={() => setLivingSituation("single")}
            />
            <RadioCard
              active={livingSituation === "partner"}
              title="Met toeslagpartner"
              subtitle="drempelinkomen €30.474"
              onClick={() => setLivingSituation("partner")}
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Vrijwillig extra aflossen (optioneel) — zonder boete mogelijk
          </label>
          <input
            value={extraMonthlyRepayment}
            onChange={(event) => setExtraMonthlyRepayment(event.target.value)}
            className={inputClass}
            inputMode="decimal"
          />
        </div>
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {result ? (
        <>
          <div className="mt-6 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Verplichte maandelijkse aflossing
            </p>
            <p className="mt-2 text-4xl font-black text-emerald-900">
              {result.underThreshold
                ? "€0,-"
                : formatEuro(result.requiredMonthlyRepayment, 0)}
            </p>
            <p className="mt-2 text-sm text-slate-700">
              {result.underThreshold
                ? "Je inkomen ligt onder het drempelinkomen."
                : "Dit is het bedrag dat DUO op basis van draagkracht verplicht rekent."}
            </p>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Jaarlijkse verplichte aflossing
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.requiredAnnualRepayment, 0)}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Jouw drempelinkomen
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.thresholdIncome, 0)} per jaar
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Inkomen boven drempel
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {result.incomeAboveThreshold > 0
                  ? `${formatEuro(result.incomeAboveThreshold, 0)} per jaar`
                  : "Geen - volledig onder drempel"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Geschatte aflosduur
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                circa {formatNumber(result.simplePayoffYears)} jaar
              </p>
            </div>
          </div>

          {result.extraMonthlyRepayment > 0 ? (
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Totale maandaflossing (incl. vrijwillig extra)
              </p>
              <p className="mt-1 text-xl font-black text-slate-900">
                {formatEuro(result.totalMonthlyRepayment, 0)}
              </p>
            </div>
          ) : null}

          {result.underThreshold ? (
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
              Je inkomen valt onder het drempelinkomen van{" "}
              {formatEuro(result.thresholdIncome, 0)}. Je hoeft dit jaar niets terug te betalen.
              DUO herberekent dit jaarlijks automatisch op basis van je belastingaangifte.
            </div>
          ) : null}

          {result.finishesWithinTerm ? (
            <div className="mt-4 rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm leading-relaxed text-slate-700">
              Op dit aflossingstempo betaal je je schuld af in circa{" "}
              {formatNumber(result.simplePayoffYears)} jaar — ruim vóór de maximale looptijd van{" "}
              {result.repaymentTermYears} jaar.
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
              Op dit aflossingstempo wordt je schuld niet volledig afgelost binnen de looptijd van{" "}
              {result.repaymentTermYears} jaar. De resterende schuld van circa{" "}
              {formatEuro(result.remainingDebtAfterTerm, 0)} wordt na{" "}
              {result.repaymentTermYears} jaar automatisch kwijtgescholden door DUO. Je hoeft hier
              niets voor te doen.
            </div>
          )}

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
            DUO baseert je aflossing in 2026 op het verzamelinkomen uit 2024 (T-2 jaar). Daardoor
            kan je actuele salaris afwijken van het bedrag dat DUO nu rekent.
          </div>

          <div className="mt-4 rounded-xl border border-blue-300 bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
            DUO hanteert in 2026 een rentevoet van {formatNumber(DUO_INTEREST_RATE_2026 * 100, 2)}%
            per jaar. Rente wordt maandelijks bijgeschreven op de openstaande schuld. De berekening
            hierboven is een vereenvoudigde schatting zonder rente-effect. De werkelijke aflosduur
            kan langer zijn dan berekend. Kijk op Mijn DUO voor je exacte saldo en rente-overzicht.
          </div>

          <div className="mt-4 rounded-xl border border-blue-300 bg-blue-50 p-4 text-sm leading-relaxed text-slate-700">
            Vrijwillig extra aflossen is altijd mogelijk en kost nooit een boete. Extra aflossen
            verlaagt je schuld en daarmee de toekomstige renteopbouw. Dit doe je eenvoudig via Mijn
            DUO.
          </div>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
              Restschuld na looptijd ({result.repaymentTermYears} jaar)
            </p>
            <p className="mt-1 text-xl font-black text-slate-900">
              {formatEuro(result.remainingDebtAfterTerm, 0)} - wordt automatisch kwijtgescholden
            </p>
          </div>

          <div className="mt-6">
            <ToolResultCta />
          </div>
        </>
      ) : null}
    </div>
  );
}
