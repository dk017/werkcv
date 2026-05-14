import TrackedToolLink from "@/components/analytics/TrackedToolLink";

type ToolResultCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  proofItems?: string[];
  toolName?: string;
  ctaIntent?: "salary" | "legal" | "cv_content" | "cancellation" | "cover_letter" | "general";
  resultState?: string;
};

export function ToolResultCta({
  eyebrow = "Zet je resultaat om in actie",
  title = "Maak nu een CV dat klaar is om te versturen",
  description = "Je hebt net inzicht gekregen. Gebruik dat moment om je CV direct scherper, rustiger en ATS-vriendelijker te maken.",
  primaryHref = "/editor",
  primaryLabel = "Verbeter mijn CV nu",
  secondaryHref = "/templates",
  secondaryLabel = "Kies eerst een template",
  proofItems = ["Gratis starten", "Eenmalig €4,99", "Geen abonnement"],
  toolName = "tool-result",
  ctaIntent = "general",
  resultState = "calculator_result",
}: ToolResultCtaProps) {
  return (
    <div className="border-2 border-black bg-black p-5 text-white">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-[#4ECDC4]">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-xl font-black leading-tight text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">
        {description}
      </p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <TrackedToolLink
          href={primaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          ctaIntent={ctaIntent}
          resultState={resultState}
          trackingLocation={`${toolName}:tool_result_cta_primary`}
          trackingLabel={primaryLabel}
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
        >
          {primaryLabel}
        </TrackedToolLink>
        <TrackedToolLink
          href={secondaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          ctaIntent={ctaIntent}
          resultState={resultState}
          trackingLocation={`${toolName}:tool_result_cta_secondary`}
          trackingLabel={secondaryLabel}
          className="inline-flex flex-1 items-center justify-center gap-2 border-2 border-white bg-transparent px-5 py-3 text-sm font-black text-white transition-colors hover:bg-white hover:text-black"
        >
          {secondaryLabel}
        </TrackedToolLink>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-xs font-black text-slate-300">
        {proofItems.map((item) => (
          <span key={item}>✓ {item}</span>
        ))}
      </div>
    </div>
  );
}
