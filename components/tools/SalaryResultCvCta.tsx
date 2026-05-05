"use client";

import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type SalaryResultCvCtaProps = {
  toolName: string;
  title?: string;
  text?: string;
};

export default function SalaryResultCvCta({
  toolName,
  title = "Gebruik dit inzicht voor je volgende sollicitatie",
  text = "Ben je aan het vergelijken, onderhandelen of solliciteren? Zet je CV direct klaar voor de functie waar je meer uit wilt halen.",
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
          trackingLabel="Maak mijn cv sollicitatieklaar"
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
        >
          Maak mijn CV sollicitatieklaar
        </TrackedToolLink>
        <TrackedToolLink
          href="/cv-maken-zonder-abonnement"
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          trackingLocation={`${toolName}:salary_result_no_subscription`}
          trackingLabel="Bekijk prijs zonder abonnement"
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
        >
          Bekijk hoe betalen werkt
        </TrackedToolLink>
      </div>
      <p className="mt-3 text-xs font-bold text-slate-600">
        Gratis bouwen en aanpassen. Eénmalig €7,99 bij PDF-download. Geen abonnement.
      </p>
    </div>
  );
}
