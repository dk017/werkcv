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
  eyebrow?: string;
  insightText?: string;
  intent?: "salary" | "legal" | "cv_content" | "cancellation" | "cover_letter" | "general";
  proofItems?: string[];
  resultState?: string;
};

export function ToolToCvCTA({
  toolName,
  title,
  description,
  primaryLabel,
  primaryHref = "/cv-maken-zonder-abonnement",
  secondaryHref = "/templates",
  secondaryLabel = "Bekijk cv-templates",
  eyebrow = "Maak je volgende stap concreet",
  insightText = "Gebruik dit resultaat terwijl het nog vers is: zet je CV klaar voor de functie, uren of voorwaarden die je nu serieus overweegt.",
  intent = "general",
  proofItems = ["Gratis starten", "Eenmalig €4,99 bij PDF-download", "Geen abonnement"],
  resultState = "tool_page_cta",
}: ToolToCvCTAProps) {
  const locationPrefix = `${toolName}:tool_to_cv`;

  return (
    <section className="mt-10 rounded-[var(--wk-radius-lg,22px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] p-6 shadow-[var(--wk-shadow-md,0_14px_34px_rgb(24_33_31/0.08))]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted,#606a67)]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink,#18211f)]">{title}</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--wk-ink-muted,#606a67)]">
        {description}
      </p>
      <div className="mt-4 rounded-[var(--wk-radius-md,14px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface-subtle,#f0f3ef)] px-4 py-3 text-sm leading-6 text-[var(--wk-ink,#18211f)]">
        {insightText}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <TrackedToolLink
          href={primaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="primary"
          ctaIntent={intent}
          resultState={resultState}
          trackingLocation={`${locationPrefix}:primary`}
          trackingLabel={primaryLabel}
          className="rounded-[var(--wk-radius-md,14px)] bg-[var(--wk-primary,#173f38)] px-5 py-3 text-sm font-semibold text-[var(--wk-primary-contrast,#ffffff)] transition-colors hover:bg-[var(--wk-primary-hover,#0f332d)]"
        >
          {primaryLabel}
        </TrackedToolLink>
        <TrackedToolLink
          href={secondaryHref}
          eventName="tool_to_cv_cta_click"
          toolName={toolName}
          ctaVariant="secondary"
          ctaIntent={intent}
          resultState={resultState}
          trackingLocation={`${locationPrefix}:secondary`}
          trackingLabel={secondaryLabel}
          className="rounded-[var(--wk-radius-md,14px)] border border-[var(--wk-border-strong,#aebbb5)] bg-[var(--wk-surface,#ffffff)] px-5 py-3 text-sm font-semibold text-[var(--wk-primary,#173f38)] transition-colors hover:bg-[var(--wk-accent-soft,#dff7f3)]"
        >
          {secondaryLabel}
        </TrackedToolLink>
      </div>
      <p className="mt-3 text-sm text-[var(--wk-ink-muted,#606a67)]">
        {proofItems.join(" · ")}.
      </p>
      <div className="mt-4 text-sm text-[var(--wk-ink-muted,#606a67)]">
        Liever eerst weten hoe downloaden werkt?{" "}
        <Link href="/cv-maken-zonder-abonnement" className="font-semibold text-[var(--wk-primary,#173f38)] underline underline-offset-4">
          Bekijk de route zonder abonnement
        </Link>
        .
      </div>
    </section>
  );
}
