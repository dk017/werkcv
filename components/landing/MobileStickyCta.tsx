import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import type { NamedLandingCtaEvent } from "@/lib/analytics";

type MobileStickyCtaProps = {
  text: string;
  buttonLabel: string;
  href: string;
  trackingLocation: string;
  trackingLabel: string;
  ctaEventName?: NamedLandingCtaEvent;
  variant?: "default" | "brand";
};

export default function MobileStickyCta({
  text,
  buttonLabel,
  href,
  trackingLocation,
  trackingLabel,
  ctaEventName,
  variant = "default",
}: MobileStickyCtaProps) {
  const isBrand = variant === "brand";

  return (
    <div
      className={
        isBrand
          ? "fixed inset-x-0 bottom-0 z-40 border-t border-[var(--wk-border)] bg-[var(--wk-surface)]/95 backdrop-blur md:hidden"
          : "fixed inset-x-0 bottom-0 z-40 border-t-4 border-black bg-white/95 backdrop-blur md:hidden"
      }
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <p
          className={
            isBrand
              ? "min-w-0 text-sm font-semibold leading-tight text-[var(--wk-ink)]"
              : "min-w-0 text-sm font-black leading-tight text-black"
          }
        >
          {text}
        </p>
        <TrackedLandingLink
          href={href}
          trackingLocation={trackingLocation}
          trackingLabel={trackingLabel}
          ctaEventName={ctaEventName}
          className={
            isBrand
              ? "wk-button wk-button-primary wk-button-small shrink-0"
              : "shrink-0 border-2 border-black bg-yellow-400 px-3 py-2 text-sm font-black text-black"
          }
        >
          {buttonLabel}
        </TrackedLandingLink>
      </div>
    </div>
  );
}
