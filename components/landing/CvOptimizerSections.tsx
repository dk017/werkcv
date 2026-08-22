import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { cvDownloadPrice } from "@/lib/site-content";

export type OptimizerFaqItem = {
  question: string;
  answer: string;
};

export type OptimizerLinkCard = {
  href: string;
  title: string;
  body: string;
};

export function CvCheckStartBlock({
  buttonHref,
  trackingLocation,
  ctaEventName,
}: {
  buttonHref: string;
  trackingLocation: string;
  ctaEventName?: "cta_cv_optimaliseren_hero" | "cta_cv_verbeteren_hero" | "cta_cv_checken_hero" | "cta_cv_nakijken_hero";
}) {
  return (
    <section className="mb-12 rounded-[var(--wk-radius-lg,22px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] p-6 shadow-[var(--wk-shadow-md,0_14px_34px_rgb(24_33_31/0.08))]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted,#606a67)]">
        Gratis cv-check starten
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink,#18211f)]">Gratis cv-check starten</h2>
      <ol className="mt-5 grid gap-3 md:grid-cols-2">
        {[
          "Plak je cv-tekst",
          "Voeg eventueel een vacature toe",
          "Bekijk verbeterpunten",
          "Maak direct een betere cv-versie",
        ].map((step, index) => (
          <li
            key={step}
            className="flex items-start gap-3 rounded-[var(--wk-radius-md,14px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-accent-soft,#dff7f3)] p-4 text-sm leading-6 text-[var(--wk-ink-muted,#606a67)]"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] text-xs font-semibold text-[var(--wk-ink,#18211f)]">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
      <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <TrackedLandingLink
          href={buttonHref}
          trackingLocation={trackingLocation}
          trackingLabel="Start gratis cv-check"
          ctaEventName={ctaEventName}
          className="inline-block rounded-[var(--wk-radius-md,14px)] bg-[var(--wk-primary,#173f38)] px-5 py-3 text-base font-semibold text-[var(--wk-primary-contrast,#ffffff)] transition-colors hover:bg-[var(--wk-primary-hover,#0f332d)]"
        >
          Start gratis cv-check
        </TrackedLandingLink>
        <p className="text-sm leading-6 text-[var(--wk-ink-muted,#606a67)]">
          Geen abonnement. Betaal alleen als je later een PDF downloadt.
        </p>
      </div>
    </section>
  );
}

const whyWerkCvBullets = {
  nl: [
    "Gebouwd voor de Nederlandse arbeidsmarkt",
    "ATS-vriendelijke templates zonder overbodige opmaak",
    "Gratis starten, pas betalen bij PDF-download",
    "Geen abonnement of automatische verlenging",
    `Eén duidelijke prijs: ${cvDownloadPrice.display}`,
  ],
  en: [
    "Built for the Dutch job market",
    "ATS-friendly templates without unnecessary design noise",
    "Start free, pay only at PDF download",
    "No subscription or auto-renewal",
    `One clear price: ${cvDownloadPrice.display}`,
  ],
} as const;

export function WhyWerkCvSection({ locale = "nl" }: { locale?: "nl" | "en" }) {
  const title = locale === "en" ? "Why WerkCV?" : "Waarom WerkCV?";
  const bullets = whyWerkCvBullets[locale];

  return (
    <section className="mb-12 rounded-[var(--wk-radius-lg,22px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] p-6 shadow-[var(--wk-shadow-md,0_14px_34px_rgb(24_33_31/0.08))]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-ink-muted,#606a67)]">
        {title}
      </p>
      <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-[var(--wk-ink-muted,#606a67)] marker:text-[var(--wk-ink,#18211f)]">
        {bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>
    </section>
  );
}

export function LinkCardSection({
  eyebrow,
  title,
  links,
}: {
  eyebrow: string;
  title: string;
  links: OptimizerLinkCard[];
}) {
  return (
    <section className="mb-12 rounded-[var(--wk-radius-lg,22px)] bg-[var(--wk-primary,#173f38)] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-primary-contrast,#ffffff)]/70">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-primary-contrast,#ffffff)]">{title}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-[var(--wk-radius-md,14px)] border border-[var(--wk-primary-contrast,#ffffff)]/25 bg-[var(--wk-primary-contrast,#ffffff)]/10 p-4 transition-colors hover:bg-[var(--wk-primary-contrast,#ffffff)] hover:text-[var(--wk-ink,#18211f)]"
          >
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast,#ffffff)]/80">
              {item.body}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FaqCardSection({
  title,
  items,
}: {
  title: string;
  items: OptimizerFaqItem[];
}) {
  return (
    <section className="mb-12">
      <h2 className="text-center text-3xl font-semibold text-[var(--wk-ink,#18211f)]">{title}</h2>
      <div className="mx-auto mt-8 max-w-4xl space-y-4">
        {items.map((item) => (
          <details
            key={item.question}
            className="rounded-[var(--wk-radius-lg,22px)] border border-[var(--wk-border,#d7ded9)] bg-[var(--wk-surface,#ffffff)] p-5 shadow-[var(--wk-shadow-sm,0_1px_2px_rgb(24_33_31/0.06))]"
          >
            <summary className="cursor-pointer text-left text-base font-semibold text-[var(--wk-ink,#18211f)]">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted,#606a67)]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function FinalCtaSection({
  title,
  description,
  supportLine,
  buttonLabel,
  buttonHref,
  trackingLocation,
  trackingLabel,
}: {
  title: string;
  description: string;
  supportLine: string;
  buttonLabel: string;
  buttonHref: string;
  trackingLocation: string;
  trackingLabel: string;
}) {
  return (
    <section className="rounded-[var(--wk-radius-lg,22px)] bg-[var(--wk-primary,#173f38)] px-6 py-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold text-[var(--wk-primary-contrast,#ffffff)]">{title}</h2>
          <p className="mt-2 text-sm leading-7 text-[var(--wk-primary-contrast,#ffffff)]/80 sm:text-base">
            {description}
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast,#ffffff)]/80">
            {supportLine}
          </p>
        </div>
        <TrackedLandingLink
          href={buttonHref}
          trackingLocation={trackingLocation}
          trackingLabel={trackingLabel}
          className="inline-block rounded-[var(--wk-radius-md,14px)] bg-[var(--wk-accent,#4ecdc4)] px-5 py-3 text-base font-semibold text-[var(--wk-ink,#18211f)] transition-colors hover:bg-[var(--wk-highlight,#f3ca52)]"
        >
          {buttonLabel}
        </TrackedLandingLink>
      </div>
    </section>
  );
}
