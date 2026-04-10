"use client";

import { useState } from "react";
import { createUtcDate, formatEuro, parseDecimal } from "@/lib/tools/calculator-utils";
import { ToolResultCta } from "@/components/tools/ToolResultCta";
import {
  UWV_MAX_DAGLOON_2026,
  calculatePartnerLeave,
  calculatePregnancyLeave,
} from "@/lib/tools/employment-tools";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100";

function formatLongDate(date: Date) {
  return new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
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

export default function ZwangerschapsverlofTool() {
  const [dueDate, setDueDate] = useState("2026-10-01");
  const [weeksBeforeDue, setWeeksBeforeDue] = useState<4 | 5 | 6>(6);
  const [monthlyGrossSalary, setMonthlyGrossSalary] = useState("3500");
  const [employmentType, setEmploymentType] = useState<"employee" | "zzp">("employee");
  const [showPartnerLeave, setShowPartnerLeave] = useState(true);
  const [partnerBirthDate, setPartnerBirthDate] = useState("2026-10-01");
  const [partnerMonthlyGrossSalary, setPartnerMonthlyGrossSalary] = useState("3200");

  const parsedDueDate = createUtcDate(dueDate);
  const parsedMonthlyGrossSalary = parseDecimal(monthlyGrossSalary);
  const parsedPartnerBirthDate = createUtcDate(partnerBirthDate);
  const parsedPartnerMonthlyGrossSalary = parseDecimal(partnerMonthlyGrossSalary);

  let error = "";

  if (!parsedDueDate) {
    error = "Vul een geldige uitgerekende datum in.";
  } else if (Number.isNaN(parsedMonthlyGrossSalary) || parsedMonthlyGrossSalary <= 0) {
    error = "Vul een geldig bruto maandsalaris in.";
  } else if (
    showPartnerLeave &&
    (!parsedPartnerBirthDate ||
      Number.isNaN(parsedPartnerMonthlyGrossSalary) ||
      parsedPartnerMonthlyGrossSalary <= 0)
  ) {
    error = "Vul ook een geldige geboortedatum en salaris voor de partner in.";
  }

  const pregnancyResult =
    !error && parsedDueDate
      ? calculatePregnancyLeave({
          dueDate: parsedDueDate,
          weeksBeforeDue,
          monthlyGrossSalary: parsedMonthlyGrossSalary,
        })
      : null;

  const partnerResult =
    !error && showPartnerLeave && parsedPartnerBirthDate
      ? calculatePartnerLeave({
          birthDate: parsedPartnerBirthDate,
          monthlyGrossSalary: parsedPartnerMonthlyGrossSalary,
        })
      : null;

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Uitgerekende datum
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(event) => {
              setDueDate(event.target.value);
              if (partnerBirthDate === "2026-10-01") {
                setPartnerBirthDate(event.target.value);
              }
            }}
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
            Bruto maandsalaris
          </label>
          <input
            value={monthlyGrossSalary}
            onChange={(event) => setMonthlyGrossSalary(event.target.value)}
            placeholder="3.500"
            className={inputClass}
            inputMode="decimal"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
          Wanneer wil je verlof laten ingaan?
        </label>
        <div className="grid gap-3 md:grid-cols-3">
          <RadioCard
            active={weeksBeforeDue === 6}
            title="6 weken voor uitgerekende datum (aanbevolen)"
            subtitle="meest gekozen"
            onClick={() => setWeeksBeforeDue(6)}
          />
          <RadioCard
            active={weeksBeforeDue === 5}
            title="5 weken voor uitgerekende datum"
            subtitle="iets langer doorwerken"
            onClick={() => setWeeksBeforeDue(5)}
          />
          <RadioCard
            active={weeksBeforeDue === 4}
            title="4 weken voor uitgerekende datum (minimum)"
            subtitle="wettelijk minimum"
            onClick={() => setWeeksBeforeDue(4)}
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
          Type dienstverband
        </label>
        <div className="flex flex-wrap gap-3">
          <RadioCard
            active={employmentType === "employee"}
            title="Werknemer in loondienst"
            subtitle="UWV via werkgever"
            onClick={() => setEmploymentType("employee")}
          />
          <RadioCard
            active={employmentType === "zzp"}
            title="ZZP / Zelfstandige"
            subtitle="ZEZ-uitkering"
            onClick={() => setEmploymentType("zzp")}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-center gap-3 text-sm font-black text-slate-900">
          <input
            type="checkbox"
            checked={showPartnerLeave}
            onChange={(event) => setShowPartnerLeave(event.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          Bereken ook partnerverlof
        </label>

        {showPartnerLeave ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Geboortedatum baby - of vul de uitgerekende datum in als nog niet geboren
              </label>
              <input
                type="date"
                value={partnerBirthDate}
                onChange={(event) => setPartnerBirthDate(event.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-black uppercase tracking-wide text-slate-600">
                Bruto maandsalaris partner
              </label>
              <input
                value={partnerMonthlyGrossSalary}
                onChange={(event) => setPartnerMonthlyGrossSalary(event.target.value)}
                className={inputClass}
                inputMode="decimal"
              />
            </div>
          </div>
        ) : null}
      </div>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

      {pregnancyResult ? (
        <>
          <div className="mt-6 rounded-xl border-2 border-emerald-300 bg-emerald-50 p-5">
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              Verlofplanning
            </p>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Eerste verlofdag
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {formatLongDate(pregnancyResult.leaveStartDate)}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Verwachte einddatum verlof (minimaal)
                </p>
                <p className="mt-1 text-xl font-black text-slate-900">
                  {formatLongDate(pregnancyResult.minimumLeaveEndDate)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Bevallingsverlof na geboorte
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">minimaal 10 weken</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Geschat UWV-dagloon
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">
                {employmentType === "employee"
                  ? `${formatEuro(pregnancyResult.cappedDayWage)} per dag`
                  : "Niet van toepassing"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Geschatte bruto UWV-uitkering per maand
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">
                {employmentType === "employee"
                  ? formatEuro(pregnancyResult.monthlyBenefitEstimate, 0)
                  : "ZEZ via UWV"}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                Geschatte bruto UWV-uitkering totaal (16 weken)
              </p>
              <p className="mt-1 text-lg font-black text-slate-900">
                {employmentType === "employee"
                  ? formatEuro(pregnancyResult.totalBenefit16Weeks, 0)
                  : "ZEZ-uitkering"}
              </p>
            </div>
          </div>

          {employmentType === "employee" ? (
            <>
              {pregnancyResult.capped ? (
                <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
                  Je dagloon ({formatEuro(pregnancyResult.rawDayWage)}) is hoger dan het
                  UWV-maximum van {formatEuro(UWV_MAX_DAGLOON_2026)}. Je ontvangt circa{" "}
                  {formatEuro(pregnancyResult.shortfallPerMonth, 0)} per maand minder dan je
                  huidige salaris. Check of je cao aanvulling biedt.
                </div>
              ) : null}

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                <p>Je meldt verlof minimaal 3 weken van tevoren bij je werkgever.</p>
                <p className="mt-2">
                  Je werkgever vraagt de UWV-uitkering namens jou aan. Wordt je baby eerder
                  geboren, dan blijft het bevallingsverlof na de geboorte minimaal 10 weken. Bij
                  een latere geboorte schuift de einddatum mee naar achter.
                </p>
              </div>
            </>
          ) : (
            <div className="mt-4 rounded-xl border border-violet-300 bg-violet-50 p-4 text-sm leading-relaxed text-slate-700">
              Als ZZP&apos;er heb je recht op de ZEZ-uitkering (Zelfstandig en Zwanger). De hoogte
              is gebaseerd op je winst over het voorgaande jaar. Vraag dit aan via uwv.nl vóór je
              verlof begint — minimaal 2 weken voor startdatum.
            </div>
          )}

          {partnerResult ? (
            <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                Partnerverlof
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Kraamverlof
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    5 werkdagen, direct na geboorte
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    100% betaald door werkgever. Geschatte waarde:{" "}
                    {formatEuro(partnerResult.kraamverlofValue, 0)}.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Aanvullend geboorteverlof
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">5 weken</p>
                  <p className="mt-2 text-sm text-slate-700">
                    UWV betaalt 70% = {formatEuro(partnerResult.aanvullendDailyBenefit)} per dag /{" "}
                    {formatEuro(partnerResult.aanvullendFiveWeeksBenefit, 0)} voor 5 weken
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Uiterste opnamedatum aanvullend verlof
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {formatLongDate(partnerResult.uitersteAanvullendDate)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Totale partnervoordeel
                  </p>
                  <p className="mt-1 text-lg font-black text-slate-900">
                    {formatEuro(partnerResult.totalPartnerBenefit, 0)}
                  </p>
                  <p className="mt-2 text-sm text-slate-700">
                    5 dagen 100% + 5 weken 70%
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm leading-relaxed text-slate-700">
            Deze berekeningen zijn gebaseerd op wettelijke minimumrechten (WAZO 2026). Je cao of
            arbeidscontract kan ruimere rechten bieden, zoals aanvulling tot 100% salaris tijdens
            aanvullend geboorteverlof of langer bevallingsverlof. Raadpleeg altijd je HR-afdeling
            voor de exacte regeling die op jou van toepassing is.
          </div>

          <div className="mt-6">
            <ToolResultCta />
          </div>
        </>
      ) : null}
    </div>
  );
}
