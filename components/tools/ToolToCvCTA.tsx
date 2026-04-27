import Link from "next/link";
import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type ToolToCvCTAProps = {
  toolName: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function ToolToCvCTA({
  toolName,
  title,
  description,
  primaryLabel,
  primaryHref = "/editor",
  secondaryHref = "/templates",
  secondaryLabel = "Bekijk cv-templates",
}: ToolToCvCTAProps) {
  const locationPrefix = `${toolName}:tool_to_cv`;

  return (
    <section className="mt-10 rounded-3xl border-4 border-black bg-[#FFF7E8] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
        Volgende stap
      </p>
      <h2 className="mt-2 text-2xl font-black text-black">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
        {description}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <TrackedToolLink
          href={primaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          trackingLocation={`${locationPrefix}:primary`}
          trackingLabel={primaryLabel}
          className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          {primaryLabel}
        </TrackedToolLink>
        <TrackedToolLink
          href={secondaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          trackingLocation={`${locationPrefix}:secondary`}
          trackingLabel={secondaryLabel}
          className="border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
        >
          {secondaryLabel}
        </TrackedToolLink>
      </div>
      <p className="mt-3 text-sm font-medium text-slate-700">
        Gratis starten. Eénmalig €4,99 bij PDF-download. Geen abonnement.
      </p>
      <div className="mt-4 text-sm font-medium text-slate-700">
        Liever eerst lezen hoe WerkCV werkt?{" "}
        <Link href="/cv-maken" className="font-black underline decoration-2 underline-offset-4">
          Bekijk de cv-maakroute
        </Link>
        .
      </div>
    </section>
  );
}
