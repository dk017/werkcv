import type { ReactNode } from "react";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import CitedAuthorityBridgeTracker from "@/components/conversion/CitedAuthorityBridgeTracker";
import {
  buildCitedAuthorityEditorHref,
  type CitedAuthorityRouteConfig,
} from "@/lib/cited-authority-conversion";
import { cvDownloadPrice } from "@/lib/site-content";

export const citedAuthorityFictionalWarning =
  "Dit is fictieve voorbeeldinhoud. Vervang namen, werkgevers, periodes, resultaten, opleidingen, vaardigheden en certificaten door informatie die voor jou klopt voordat je het CV verstuurt.";

export type CitedAuthorityBridgeCopy = {
  eyebrow: string;
  heading: string;
  body: string;
  primaryLabel: string;
  pricingLabel?: string;
};

type CitedAuthorityConversionBridgeProps = {
  config: CitedAuthorityRouteConfig;
  copy: CitedAuthorityBridgeCopy;
  fictional?: boolean;
  primaryAction?: ReactNode;
  compact?: boolean;
  instance?: "main" | "repeat";
};

export default function CitedAuthorityConversionBridge({
  config,
  copy,
  fictional = false,
  primaryAction,
  compact = false,
  instance = "main",
}: CitedAuthorityConversionBridgeProps) {
  const headingId = `cited-authority-heading-${config.startSource}-${instance}`;
  const sectionId = `cited-authority-${config.startSource}-${instance}`;

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className={`wk-card overflow-hidden border-[var(--wk-border)] bg-[var(--wk-surface)] ${compact ? "p-5 sm:p-6" : "p-6 sm:p-8 lg:p-10"}`}
    >
      {instance === "main" ? (
        <CitedAuthorityBridgeTracker
          canonicalPath={config.canonicalPath}
          intentId={config.intentId}
          landingLocale={config.landingLocale}
          startSource={`${config.startSource}-${instance}`}
        />
      ) : null}
      <div className="max-w-3xl">
        <p className="wk-eyebrow">{copy.eyebrow}</p>
        <h2
          id={headingId}
          className="mt-3 text-balance text-2xl font-extrabold tracking-[-0.035em] text-[var(--wk-ink)] sm:text-3xl"
        >
          {copy.heading}
        </h2>
        <p className="mt-4 text-base leading-7 text-[var(--wk-ink-muted)]">{copy.body}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-[var(--wk-primary)]">
          Gratis bouwen en volledig bekijken. Alleen de definitieve PDF kost eenmalig {cvDownloadPrice.display}. Geen abonnement.
        </p>
        {fictional ? (
          <p className="mt-4 rounded-[var(--wk-radius-sm)] bg-[var(--wk-warning-soft)] px-4 py-3 text-sm leading-6 text-[var(--wk-ink)]">
            <strong>Let op:</strong> {citedAuthorityFictionalWarning}
          </p>
        ) : null}
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          {primaryAction ?? (
            <TrackedLandingLink
              href={buildCitedAuthorityEditorHref(config)}
              trackingLocation={`cited_authority:${config.intentId}:primary`}
              trackingLabel={`${config.startSource}:open_editor`}
              startCvContext={{
                entryPoint: config.startSource,
                templateId: config.templateId,
                pagePath: config.canonicalPath,
                uiLanguage: config.editorUiLanguage,
              }}
              className="wk-button wk-button-primary w-full sm:w-auto"
            >
              {copy.primaryLabel}
            </TrackedLandingLink>
          )}
          <TrackedLandingLink
            href="/prijzen"
            trackingLocation={`cited_authority:${config.intentId}:pricing`}
            trackingLabel={`${config.startSource}:view_pricing`}
            className="wk-button wk-button-quiet w-full sm:w-auto"
          >
            {copy.pricingLabel ?? "Bekijk prijs en werkwijze"}
          </TrackedLandingLink>
        </div>
      </div>
    </section>
  );
}
