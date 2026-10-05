import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { cvDownloadPrice, jobPassPrice } from "@/lib/site-content";

// The Sollicitatiepas / Job Search Pass callout (docs/product/2026-10-01-sollicitatiepas-growth-spec.md, P0.1).
// One source for the copy, so every pass mention uses only the claims that are true:
//  - every CV created within 90 days of payment can be downloaded as a PDF, also after the pass ends;
//  - one payment, no subscription, does not renew;
//  - cheaper than the single price from the 4th CV (3 x single price < pass price).
// Not claimed: cover letters, AI features or Word export "included", "cheapest", "unlimited" without the 90 days.
// Prices come from lib/site-content, never typed here. The pass is chosen at checkout in the editor.

type Locale = "nl" | "en";

const COPY = {
  nl: {
    eyebrow: "Meerdere vacatures?",
    title: "Solliciteer je op meer vacatures?",
    body: (pass: string) => `Met de Sollicitatiepas download je ${jobPassPrice.days} dagen lang elke cv die je maakt, voor ${pass}. Eenmalig, verlengt niet.`,
    fine: (single: string) =>
      `Elke cv die je binnen ${jobPassPrice.days} dagen na betaling maakt, kun je ook daarna nog downloaden. Voordeliger dan ${single} per cv vanaf 4 cv's.`,
    cta: "Maak je cv en kies de pas bij het afrekenen",
    href: "/editor?template=professional",
  },
  en: {
    eyebrow: "More than one job?",
    title: "Applying to several jobs?",
    body: (pass: string) => `With the Job Search Pass you download every CV you make for ${jobPassPrice.days} days, for ${pass}. One payment, never renews.`,
    fine: (single: string) =>
      `Every CV you create within ${jobPassPrice.days} days of payment can still be downloaded after the pass ends. Cheaper than ${single} per CV from the 4th CV.`,
    cta: "Build your CV and choose the pass at checkout",
    href: "/en/editor?template=professional",
  },
} as const;

export default function JobPassCallout({
  locale,
  placement,
  compact = false,
  className = "",
}: {
  locale: Locale;
  /** Where on the site this callout sits, e.g. "sponsor_checker_result". Used for the start source and for measuring clicks. */
  placement: string;
  compact?: boolean;
  className?: string;
}) {
  const copy = COPY[locale];
  const pass = locale === "en" ? jobPassPrice.displayEn : jobPassPrice.display;
  const single = locale === "en" ? cvDownloadPrice.displayEn : cvDownloadPrice.display;
  const href = `${copy.href}&startSource=job_pass_${placement}`;

  return (
    <aside className={`wk-card ${compact ? "p-4" : "p-5 sm:p-6"} ${className}`} aria-label={copy.title}>
      {!compact && <p className="wk-eyebrow">{copy.eyebrow}</p>}
      <h3 className={`${compact ? "text-base" : "mt-2 text-xl"} font-semibold text-[var(--wk-ink)]`}>{copy.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--wk-ink)]">{copy.body(pass)}</p>
      {!compact && <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{copy.fine(single)}</p>}
      <p className="mt-3">
        <TrackedLandingLink
          href={href}
          className="wk-button wk-button-primary wk-button-small"
          trackingLocation={`job_pass_${placement}`}
          trackingLabel="job_pass_callout_cta"
          startCvContext={{ entryPoint: `job_pass_${placement}`, templateId: "professional", pagePath: href, uiLanguage: locale }}
        >
          {copy.cta}
        </TrackedLandingLink>
      </p>
    </aside>
  );
}
