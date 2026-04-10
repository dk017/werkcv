"use client";

import { useState } from "react";
import { ToolResultCta } from "@/components/tools/ToolResultCta";
import {
  DEFAULT_PAYROLL_LINE_ITEM_IDS,
  PAYROLL_LINE_ITEMS,
} from "@/lib/tools/employment-tools";

export default function LoonstrookUitlegTool() {
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_PAYROLL_LINE_ITEM_IDS);

  function toggleItem(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  const selectedItems = PAYROLL_LINE_ITEMS.filter((item) => selectedIds.includes(item.id));

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:p-8">
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-slate-500">
          Selecteer jouw regels
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Vink de regels aan die op jouw loonstrook staan. De uitleg hieronder werkt ook als je
          loonstrook in het Engels is opgesteld, zolang het om Nederlandse loonregels gaat.
        </p>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {PAYROLL_LINE_ITEMS.map((item) => {
          const active = selectedIds.includes(item.id);

          return (
            <label
              key={item.id}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
                active
                  ? "border-black bg-[#FFFEF0]"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <input
                type="checkbox"
                checked={active}
                onChange={() => toggleItem(item.id)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm font-black leading-relaxed text-slate-900">{item.label}</span>
            </label>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50 p-4">
        <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
          Uitleg actief
        </p>
        <p className="mt-2 text-sm text-slate-700">
          {selectedItems.length} regel{selectedItems.length === 1 ? "" : "s"} geselecteerd. Scroll
          door de kaarten om snel te zien wat belast is, wat je werkgever inhoudt en welke posten
          netto of bruto doorwerken.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {selectedItems.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-slate-200 bg-slate-50 p-5"
          >
            <p className="text-xs font-black uppercase tracking-wide text-slate-500">
              Regel op loonstrook
            </p>
            <h3 className="mt-2 text-xl font-black text-slate-900">{item.label}</h3>

            <div className="mt-4 space-y-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Wat betekent dit?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">{item.explanation}</p>
              </div>

              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                  Hoe werkt de berekening?
                </p>
                <p className="mt-1 text-sm leading-relaxed text-slate-700">
                  {item.calculationHint}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Wie betaalt?
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{item.whoPays}</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">
                    Belast?
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-800">{item.taxable}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6">
        <ToolResultCta />
      </div>
    </div>
  );
}
