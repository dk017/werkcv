"use client";

import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type SalaryResultCvCtaProps = {
  toolName: string;
  title?: string;
  text?: string;
};

export default function SalaryResultCvCta({
  toolName,
  title = "Gebruik je salarisinzicht voor je volgende stap",
  text = "Solliciteer je op een betere functie of vergelijk je een aanbod? Werk je cv direct bij terwijl je motivatie nog scherp is.",
}: SalaryResultCvCtaProps) {
  return (
    <div className="rounded-2xl border-2 border-black bg-[#FFF7E8] p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
        Volgende sollicitatiestap
      </p>
      <h3 className="mt-2 text-xl font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{text}</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <TrackedToolLink
          href="/editor"
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          trackingLocation={`${toolName}:salary_result_cv`}
          trackingLabel="Maak cv voor mijn volgende sollicitatie"
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          Maak cv voor mijn volgende sollicitatie
        </TrackedToolLink>
        <TrackedToolLink
          href="/cv-maken-zonder-abonnement"
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          trackingLocation={`${toolName}:salary_result_no_subscription`}
          trackingLabel="Bekijk cv zonder abonnement"
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
        >
          Bekijk cv zonder abonnement
        </TrackedToolLink>
      </div>
      <p className="mt-3 text-xs font-bold text-slate-600">
        Gratis bouwen. Eénmalig €4,99 bij PDF-download. Geen abonnement.
      </p>
    </div>
  );
}
