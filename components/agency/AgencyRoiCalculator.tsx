"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { AGENCY_CURRENCY, AGENCY_MONTHLY_PRICE_CENTS } from "@/lib/agency-plan";

function euro(value: number): string {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: AGENCY_CURRENCY, maximumFractionDigits: 0 }).format(value);
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
    const breakEvenMinutes = submissions > 0 && hourlyCost > 0 ? (AGENCY_MONTHLY_PRICE_CENTS / 100) / submissions / hourlyCost * 60 : 0;
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
    <section className="wk-section border-y border-[var(--wk-border)]">
      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Reken met jullie eigen workflow</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">Wanneer verdient het plan zichzelf terug?</h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--wk-ink-muted)]">We publiceren geen onbewezen universele tijdsbesparing. Vul je huidige volume, voorbereidingstijd, interne uurkosten en eigen besparingsaanname in.</p>
        </div>

        <div className="wk-card wk-card-accent min-w-0 p-5 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <label className="text-xs font-semibold text-[var(--wk-ink-muted)]">Voorstellen per maand<input type="number" min="1" max="500" value={submissions} onChange={(event) => { markInteracted(); setSubmissions(Math.min(500, Math.max(1, Number(event.target.value) || 1))); }} className="wk-input mt-2 w-full px-3 py-3 text-base font-semibold" /></label>
            <label className="text-xs font-semibold text-[var(--wk-ink-muted)]">Minuten per voorstel<input type="number" min="1" max="240" value={minutes} onChange={(event) => { markInteracted(); setMinutes(Math.min(240, Math.max(1, Number(event.target.value) || 1))); }} className="wk-input mt-2 w-full px-3 py-3 text-base font-semibold" /></label>
            <label className="text-xs font-semibold text-[var(--wk-ink-muted)]">Interne kosten per uur<input type="number" min="1" max="300" value={hourlyCost} onChange={(event) => { markInteracted(); setHourlyCost(Math.min(300, Math.max(1, Number(event.target.value) || 1))); }} className="wk-input mt-2 w-full px-3 py-3 text-base font-semibold" /></label>
            <label className="text-xs font-semibold text-[var(--wk-ink-muted)]">Eigen besparingsaanname<input type="number" min="1" max="90" value={reductionPercent} onChange={(event) => { markInteracted(); setReductionPercent(Math.min(90, Math.max(1, Number(event.target.value) || 1))); }} className="wk-input mt-2 w-full px-3 py-3 text-base font-semibold" /><span className="mt-1 block font-semibold text-[var(--wk-ink-muted)]">% van voorbereidingstijd</span></label>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="wk-card p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--wk-ink-muted)]">Huidige tijd</p><p className="mt-2 text-2xl font-black">{result.hours.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</p><p className="mt-1 text-xs font-semibold text-[var(--wk-ink-muted)]">per maand</p></div>
            <div className="wk-card p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--wk-ink-muted)]">Interne waarde</p><p className="mt-2 text-2xl font-black">{euro(result.cost)}</p><p className="mt-1 text-xs font-semibold text-[var(--wk-ink-muted)]">van die voorbereidingstijd</p></div>
            <div className="wk-card wk-card-success p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--wk-success)]">Potentieel vrij</p><p className="mt-2 text-2xl font-black">{result.potentialHoursSaved.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} uur</p><p className="mt-1 text-xs font-semibold text-[var(--wk-ink-muted)]">{euro(result.potentialCostSaved)} volgens je aanname</p></div>
            <div className="wk-card wk-card-warning p-4"><p className="text-[10px] font-black uppercase tracking-[0.1em] text-[var(--wk-ink-muted)]">Break-even</p><p className="mt-2 text-2xl font-black">{result.breakEvenMinutes.toLocaleString("nl-NL", { maximumFractionDigits: 1 })} min</p><p className="mt-1 text-xs font-semibold text-[var(--wk-ink-muted)]">benodigde besparing per voorstel</p></div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[var(--wk-ink-muted)]">Dit is een transparante scenario-berekening, geen rendementsbelofte. Meet in je eigen proces de echte tijd van upload tot goedgekeurde export.</p>
        </div>
      </div>
    </section>
  );
}
