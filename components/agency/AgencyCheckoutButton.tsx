"use client";

import { useState } from "react";
import AgencyPurchaseNotes from "@/components/agency/AgencyPurchaseNotes";
import { getStoredAttribution, track } from "@/lib/analytics";

type AgencyCheckoutButtonProps = {
  label?: string;
  location: string;
  className?: string;
  locale?: "nl" | "en";
};

export default function AgencyCheckoutButton({
  label = "Start MatchPack",
  location,
  className = "",
  locale = "nl",
}: AgencyCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    track("cta_clicked", { location, label });
    track("agency_checkout_cta_clicked", { locale, location });
    track("agency_checkout_started", { location, product: "agency" });

    try {
      const response = await fetch("/api/agency/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, attribution: getStoredAttribution() }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.checkoutUrl !== "string") {
        track("agency_checkout_failed", {
          location,
          product: "agency",
          reason: data?.code || "invalid_response",
        });
        setError(locale === "en"
          ? "MatchPack checkout is being prepared. Please try again shortly."
          : "De MatchPack-checkout wordt voorbereid. Probeer het binnenkort opnieuw.");
        return;
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      track("agency_checkout_failed", { location, product: "agency", reason: "network_error" });
      setError(locale === "en"
        ? "Could not start checkout. Please try again."
        : "De checkout kon niet worden gestart. Probeer het opnieuw.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={startCheckout}
        disabled={isLoading}
        className={className}
      >
        {isLoading ? (locale === "en" ? "Opening checkout…" : "Checkout openen…") : label}
      </button>
      <AgencyPurchaseNotes locale={locale} />
      {error ? <p className="mt-2 text-xs font-semibold text-rose-700" role="alert">{error}</p> : null}
    </div>
  );
}
