"use client";

import { useMemo, useState } from "react";

function euro(value: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
}

export default function AgencyRoiCalculator() {
  const [submissions, setSubmissions] = useState(20);
  const [minutes, setMinutes] = useState(30);
  const [hourlyCost, setHourlyCost] = useState(50);

  const result = useMemo(() => {
    const hours = submissions * minutes / 60;
    const cost = hours * hourlyCost;
    const breakEvenMinutes = submissions > 0 && hourlyCost > 0 ? 149 / submissions / hourlyCost * 60 : 0;
    return { hours, cost, breakEvenMinutes };
  }, [hourlyCost, minutes, submissions]);

  return (
    <section className="border-y-2 border-slate-900 py-14">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Reken met jullie eigen workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Wanneer verdient het plan zichzelf terug?</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">We publiceren geen onbewezen universele tijdsbesparing. Vul jullie huidige volume, voorbereidingstijd en interne uurkosten in.</p>
        </div>

        <div className="border-2 border-slate-900 bg-white p-5 shadow-[5px_5px_0px_0px_rgba(78,205,196,1)] sm:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="text-xs font-black text-slate-600">Voorstellen per maand<input type="number" min="1" max="500" value={submissions} onChange={(event) => setSubmissions(Math.min(500, Math.max(1, Number(event.target.value) || 1)))} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
            <label className="text-xs font-black text-slate-600">Minuten per voorstel<input type="number" min="1" max="240" value={minutes} onChange={(event) => setMinutes(Math.min(240, Math.max(1, Number(event.target.value) || 1)))} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
            <label className="text-xs font-black text-slate-600">Interne kosten per uur<input type="number" min="1" max="300" value={hourlyCost} onChange={(event) => setHourlyCost(Math.min(300, Math.max(1, Number(event.target.value) || 1)))} className="mt-2 w-full border-2 border-slate-300 bg-[#FFFEF0] px-3 py-3 text-base font-black text-slate-900 outline-none focus:border-emerald-500" /></label>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="border-2 border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Huidige tijd</p><p className="mt-2 text-2xl font-black">{result.hours.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</p><p className="mt-1 text-xs font-semibold text-slate-500">per maand</p></div>
            <div className="border-2 border-slate-200 bg-slate-50 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-500">Interne waarde</p><p className="mt-2 text-2xl font-black">{euro(result.cost)}</p><p className="mt-1 text-xs font-semibold text-slate-500">van die voorbereidingstijd</p></div>
            <div className="border-2 border-slate-900 bg-yellow-300 p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-700">Break-even</p><p className="mt-2 text-2xl font-black">{result.breakEvenMinutes.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} min</p><p className="mt-1 text-xs font-semibold text-slate-700">benodigde besparing per voorstel</p></div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">Dit is een rekensom, geen rendementsbelofte. Meet na de pilot de echte tijd van upload tot goedgekeurde export.</p>
        </div>
      </div>
    </section>
  );
}
