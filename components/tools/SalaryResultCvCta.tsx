"use client";

import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type SalaryResultCvCtaProps = {
  toolName: string;
  title?: string;
  text?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  resultState?: string;
};

export default function SalaryResultCvCta({
  toolName,
  title = "Gebruik dit inzicht voor je volgende sollicitatie",
  text = "Ben je aan het vergelijken, onderhandelen of solliciteren? Zet je CV direct klaar voor de functie waar je meer uit wilt halen.",
  primaryLabel = "Maak mijn CV sollicitatieklaar",
  secondaryLabel = "Bekijk hoe betalen werkt",
  primaryHref = "/editor",
  secondaryHref = "/cv-maken-zonder-abonnement",
  resultState = "calculator_result",
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
          href={primaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          ctaIntent="salary"
          resultState={resultState}
          trackingLocation={`${toolName}:salary_result_cv`}
          trackingLabel={primaryLabel}
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
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
          className="inline-flex flex-1 items-center justify-center border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
        >
          {secondaryLabel}
        </TrackedToolLink>
      </div>
      <p className="mt-3 text-xs font-bold text-slate-600">
        Gratis bouwen en aanpassen. Eénmalig €4,99 bij PDF-download. Geen abonnement.
      </p>
    </div>
  );
}
