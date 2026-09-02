"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";

export default function AgencyCommercialAnalytics({
  locale,
  path,
  pricingSectionId = "pricing",
}: {
  locale: "nl" | "en";
  path: string;
  pricingSectionId?: string;
}) {
  const pricingTracked = useRef(false);

  useEffect(() => {
    track("agency_hub_viewed", { path });

    const section = document.getElementById(pricingSectionId);
    if (!section || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver((entries) => {
      if (pricingTracked.current || !entries.some((entry) => entry.isIntersecting)) return;
      pricingTracked.current = true;
      track("agency_pricing_viewed", { locale, path });
      observer.disconnect();
    }, { threshold: 0.35 });

    observer.observe(section);
    return () => observer.disconnect();
  }, [locale, path, pricingSectionId]);

  return null;
}
