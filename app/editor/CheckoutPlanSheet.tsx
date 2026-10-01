"use client";

import { useEffect, useId, useState } from "react";
import { cvDownloadPrice, jobPassPrice } from "@/lib/site-content";

export type CheckoutPlan = "cv-download" | "job-pass";

type CheckoutPlanSheetProps = {
  uiLanguage: "nl" | "en";
  busy: boolean;
  onChoose: (plan: CheckoutPlan) => void;
  onClose: (plan: CheckoutPlan) => void;
};

/**
 * Shown before checkout when the Sollicitatiepas is for sale: this CV (default) or the pass.
 * Keyboard: Escape closes; the options are a native radio group.
 */
export default function CheckoutPlanSheet({ uiLanguage, busy, onChoose, onClose }: CheckoutPlanSheetProps) {
  const [plan, setPlan] = useState<CheckoutPlan>("cv-download");
  const titleId = useId();
  const en = uiLanguage === "en";

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !busy) onClose(plan);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [busy, onClose, plan]);

  const options: Array<{ value: CheckoutPlan; title: string; price: string; body: string }> = [
    {
      value: "cv-download",
      title: en ? "This CV" : "Deze cv",
      price: en ? cvDownloadPrice.displayEn : cvDownloadPrice.display,
      body: en ? "One-time, for this CV." : "Eenmalig, voor deze cv.",
    },
    {
      value: "job-pass",
      title: en ? "Job Search Pass" : "Sollicitatiepas",
      price: en ? jobPassPrice.displayEn : jobPassPrice.display,
      body: en
        ? `Download every CV you make in the next ${jobPassPrice.days} days, for example one tailored to each vacancy. One-time, does not renew.`
        : `Download elke cv die je de komende ${jobPassPrice.days} dagen maakt, bijvoorbeeld een aangepaste cv per vacature. Eenmalig, verlengt niet.`,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={(event) => {
        if (event.target === event.currentTarget && !busy) onClose(plan);
      }}
    >
      <div className="w-full max-w-md rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          {en ? "Download your CV" : "Download je cv"}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {en ? "Applying to several jobs? The pass covers every CV." : "Solliciteer je op meer vacatures? De pas geldt voor al je cv's."}
        </p>

        <fieldset className="mt-4 space-y-3">
          <legend className="sr-only">{en ? "Choose what to pay for" : "Kies waarvoor je betaalt"}</legend>
          {options.map((option) => {
            const selected = plan === option.value;
            return (
              <label
                key={option.value}
                className={`flex cursor-pointer gap-3 rounded-xl border p-4 transition-colors ${
                  selected ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="checkout-plan"
                  value={option.value}
                  checked={selected}
                  onChange={() => setPlan(option.value)}
                  className="mt-1 h-4 w-4 accent-emerald-600"
                />
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-semibold text-slate-900">{option.title}</span>
                    <span className="font-semibold text-slate-900">{option.price}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">{option.body}</span>
                </span>
              </label>
            );
          })}
        </fieldset>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onClose(plan)}
            disabled={busy}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {en ? "Cancel" : "Annuleren"}
          </button>
          <button
            type="button"
            onClick={() => onChoose(plan)}
            disabled={busy}
            className="rounded-md border border-emerald-700 bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {busy ? (en ? "Opening checkout..." : "Betalen openen...") : en ? "Continue to payment" : "Verder naar betalen"}
          </button>
        </div>
      </div>
    </div>
  );
}
