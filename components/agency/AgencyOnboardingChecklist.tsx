"use client";

import Link from "next/link";
import { useState } from "react";
import { track } from "@/lib/analytics";

export type AgencyOnboardingItem = {
  id: string;
  label: string;
  href: string;
  done: boolean;
  detail: string;
};

export default function AgencyOnboardingChecklist({
  items,
  initiallyDismissed = false,
}: {
  items: AgencyOnboardingItem[];
  initiallyDismissed?: boolean;
}) {
  const [dismissed, setDismissed] = useState(initiallyDismissed);
  const [busy, setBusy] = useState(false);

  if (dismissed || !items.length) return null;

  const completed = items.filter((item) => item.done).length;

  async function dismiss() {
    setBusy(true);
    try {
      const response = await fetch("/api/agency/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "dismiss" }),
      });
      if (!response.ok) throw new Error("ONBOARDING_DISMISS_FAILED");
      setDismissed(true);
      track("agency_onboarding_dismissed", { completed, total: items.length });
    } catch {
      // Keep the checklist visible if the dismissal could not be persisted.
    } finally {
      setBusy(false);
    }
  }

  function recordStep(item: AgencyOnboardingItem) {
    track("agency_onboarding_step_clicked", { step: item.id });
    if (item.id === "example") {
      void fetch("/api/agency/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "view_example" }),
      });
    }
  }

  return (
    <section className="mt-8 border-2 border-slate-900 bg-white p-5 shadow-[4px_4px_0px_0px_rgba(78,205,196,1)] sm:p-6" aria-labelledby="agency-onboarding-title">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">Zelf starten</p>
          <h2 id="agency-onboarding-title" className="mt-1 text-2xl font-black">Werk je eerste MatchPack af</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">Volg deze korte route. Analyse en conceptreview gebruiken geen slot; alleen een nieuw CV of definitieve goedkeuring gebruikt één gedeeld slot uit de limiet van 50.</p>
        </div>
        <button type="button" onClick={() => void dismiss()} disabled={busy} className="text-xs font-black text-slate-500 underline underline-offset-4 disabled:opacity-50">{busy ? "Opslaan…" : "Checklist verbergen"}</button>
      </div>

      <div className="mt-5 h-2 bg-slate-100" aria-label={`${completed} van ${items.length} stappen voltooid`}>
        <div className="h-full bg-emerald-500 transition-all" style={{ width: `${Math.round((completed / items.length) * 100)}%` }} />
      </div>

      <ol className="mt-5 grid gap-3 md:grid-cols-2">
        {items.map((item, index) => (
          <li key={item.id} className={`border-2 p-4 ${item.done ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-slate-50"}`}>
            <div className="flex gap-3">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center text-xs font-black ${item.done ? "bg-emerald-400 text-slate-950" : "bg-slate-200 text-slate-600"}`} aria-hidden="true">{item.done ? "✓" : index + 1}</span>
              <div className="min-w-0">
                <p className="text-sm font-black">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{item.detail}</p>
                {!item.done ? <Link href={item.href} onClick={() => recordStep(item)} className="mt-3 inline-flex text-xs font-black text-emerald-800 underline decoration-2 underline-offset-4">Volgende stap →</Link> : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-5 border-l-4 border-yellow-400 pl-3 text-xs font-semibold leading-relaxed text-slate-600">Contactvrije output verwijdert directe contactvelden, maar is geen juridische anonimiteitsgarantie. Gebruik alleen data waarvoor je bevoegd bent en controleer elke bron vóór verzending.</p>
    </section>
  );
}
