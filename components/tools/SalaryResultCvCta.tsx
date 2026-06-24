"use client";

import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type SalaryResultCvCtaProps = {
  toolName: string;
  title?: string;
  text?: string;
  insightText?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  proofItems?: string[];
  resultState?: string;
};

export default function SalaryResultCvCta({
  toolName,
  title = "Zet deze uitkomst om in een sterke sollicitatie",
  text = "Als je salaris, uren of voorwaarden vergelijkt, is dit vaak het moment om je CV bij te werken voor de functie die beter past.",
  insightText = "Tip: pas je profiel, gewenste functie en werkervaring aan op het salarisniveau of de contractvorm die je nu bekijkt.",
  primaryLabel = "Maak mijn sollicitatie-CV",
  secondaryLabel = "Hoe betalen werkt",
  primaryHref = "/editor?template=professional&startSource=salary_tool_result",
  secondaryHref = "/templates?startSource=salary_tool_template_compare",
  proofItems = ["Gratis bewerken", "Eenmalig betalen bij PDF-download", "Geen abonnement"],
  resultState = "calculator_result",
}: SalaryResultCvCtaProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">
            Volgende stap na je berekening
          </p>
          <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
          <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{text}</p>
        </div>
        <div className="flex flex-wrap gap-2 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-xs font-bold text-emerald-800 lg:max-w-[260px]">
          {proofItems.map((item) => (
            <span key={item} className="whitespace-nowrap">
              ✓ {item}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 rounded-lg border border-emerald-200 bg-white px-3 py-2 text-sm font-semibold leading-relaxed text-slate-800">
        {insightText}
      </div>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <TrackedToolLink
          href={primaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          ctaIntent="salary"
          resultState={resultState}
          trackingLocation={`${toolName}:salary_result_cv`}
          trackingLabel={primaryLabel}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-black text-white transition-colors hover:bg-emerald-700"
        >
          {primaryLabel}
        </TrackedToolLink>
        <TrackedToolLink
          href={secondaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          ctaIntent="salary"
          resultState={resultState}
          trackingLocation={`${toolName}:salary_result_no_subscription`}
          trackingLabel={secondaryLabel}
          className="inline-flex flex-1 items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-black text-slate-800 transition-colors hover:bg-slate-50"
        >
          {secondaryLabel}
        </TrackedToolLink>
      </div>
    </div>
  );
}
