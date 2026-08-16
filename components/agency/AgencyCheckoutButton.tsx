"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

type AgencyCheckoutButtonProps = {
  label?: string;
  location: string;
  className?: string;
};

export default function AgencyCheckoutButton({
  label = "Start MatchPack · Agency",
  location,
  className = "",
}: AgencyCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCheckout = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    track("cta_clicked", { location, label });
    track("agency_checkout_started", { location, product: "agency" });

    try {
      const response = await fetch("/api/agency/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.checkoutUrl !== "string") {
        track("agency_checkout_failed", {
          location,
          product: "agency",
          reason: data?.code || "invalid_response",
        });
        setError("Agency checkout is being prepared. Please try again shortly.");
        return;
      }
      window.location.assign(data.checkoutUrl);
    } catch {
      track("agency_checkout_failed", { location, product: "agency", reason: "network_error" });
      setError("Could not start checkout. Please try again.");
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
        {isLoading ? "Checkout openen…" : label}
      </button>
      {error ? <p className="mt-2 text-xs font-semibold text-rose-700" role="alert">{error}</p> : null}
    </div>
  );
}
