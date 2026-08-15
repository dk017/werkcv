"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";

function euro(value: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function AgencyRoiCalculator({ path = "/agency" }: { path?: string }) {
  const [submissions, setSubmissions] = useState(20);
  const [minutes, setMinutes] = useState(30);
  const [hourlyCost, setHourlyCost] = useState(50);
  const [reductionPercent, setReductionPercent] = useState(30);
  const hasInteracted = useRef(false);

  const result = useMemo(() => {
    const hours = submissions * minutes / 60;
    const cost = hours * hourlyCost;
    const potentialHoursSaved = hours * reductionPercent / 100;
    const potentialCostSaved = potentialHoursSaved * hourlyCost;
    const breakEvenMinutes = submissions > 0 && hourlyCost > 0 ? 149 / submissions / hourlyCost * 60 : 0;
    return { hours, cost, potentialHoursSaved, potentialCostSaved, breakEvenMinutes };
  }, [hourlyCost, minutes, reductionPercent, submissions]);

  useEffect(() => {
    if (!hasInteracted.current) return;
    const timeout = window.setTimeout(() => {
      track("agency_roi_completed", {
        path,
        submissions,
        minutes,
        hourlyCost,
        reductionPercent,
        potentialHoursSaved: Number(result.potentialHoursSaved.toFixed(2)),
        potentialCostSaved: Number(result.potentialCostSaved.toFixed(2)),
      });
    }, 800);
    return () => window.clearTimeout(timeout);
  }, [hourlyCost, minutes, path, reductionPercent, result.potentialCostSaved, result.potentialHoursSaved, submissions]);

  const markInteracted = () => {
    hasInteracted.current = true;
  };

  return (
    <section className="border-y-2 border-slate-900 py-14">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Reken met jullie eigen workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Wanneer verdient het plan zichzelf terug?</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">We publiceren geen onbewezen universele tijdsbesparing. Vul uw huidige volume, voorbereidingstijd, interne uurkosten en eigen besparingsaanname in.</p>
        </div>

        <div className="border-2 border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(78,205,196,1)] sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-black text-slate-600">Voorstellen per maand<input type="number" min="1" max="500" value={submissions} onChange={(event) => { markInteracted(); setSubmissions(Math.min(500, Math.max(1, Number(event.target.value) || 1))); }} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
            <label className="text-xs font-black text-slate-600">Minuten per voorstel<input type="number" min="1" max="240" value={minutes} onChange={(event) => { markInteracted(); setMinutes(Math.min(240, Math.max(1, Number(event.target.value) || 1))); }} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
            <label className="text-xs font-black text-slate-600">Interne kosten per uur<input type="number" min="1" max="300" value={hourlyCost} onChange={(event) => { markInteracted(); setHourlyCost(Math.min(300, Math.max(1, Number(event.target.value) || 1))); }} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
            <label className="text-xs font-black text-slate-600">Eigen besparingsaanname<input type="number" min="1" max="90" value={reductionPercent} onChange={(event) => { markInteracted(); setReductionPercent(Math.min(90, Math.max(1, Number(event.target.value) || 1))); }} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /><span className="mt-1 block font-semibold text-slate-500">% van voorbereidingstijd</span></label>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-2 border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Huidige tijd</p><p className="mt-2 text-2xl font-black">{result.hours.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</p><p className="mt-1 text-xs font-semibold text-slate-500">per maand</p></div>
            <div className="border-2 border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Interne waarde</p><p className="mt-2 text-2xl font-black">{euro(result.cost)}</p><p className="mt-1 text-xs font-semibold text-slate-500">van die voorbereidingstijd</p></div>
            <div className="border-2 border-slate-200 bg-emerald-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-800">Potentieel vrij</p><p className="mt-2 text-2xl font-black">{result.potentialHoursSaved.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</p><p className="mt-1 text-xs font-semibold text-slate-500">{euro(result.potentialCostSaved)} volgens uw aanname</p></div>
            <div className="border-2 border-slate-900 bg-yellow-300 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">Break-even</p><p className="mt-2 text-2xl font-black">{result.breakEvenMinutes.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} min</p><p className="mt-1 text-xs font-semibold text-slate-700">benodigde besparing per voorstel</p></div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">Dit is een transparante scenario-berekening, geen rendementsbelofte. Meet in uw eigen proces de echte tijd van upload tot goedgekeurde export.</p>
        </div>
      </div>
    </section>
  );
}
