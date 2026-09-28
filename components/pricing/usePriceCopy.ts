"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import {
  PRICE_COPY_EXPERIMENT,
  getOrAssignPriceCopyVariant,
  getPriceCopy,
  type PriceCopy,
  type PriceCopyVariant,
} from "@/lib/pricing-copy-experiment";

/**
 * Returns the visitor's price-copy variant (sticky) and its copy. Until assigned on the client
 * (and whenever disabled) the variant is undefined and the copy is the plain arm's, so server and
 * first client render match and events never claim an arm that was not shown. Records one exposure
 * per surface per mount.
 */
export function usePriceCopy(
  locale: "nl" | "en",
  surface: "editor" | "full_preview" | "pricing_page",
  enabled = true,
): { variant: PriceCopyVariant | undefined; copy: PriceCopy } {
  const [variant, setVariant] = useState<PriceCopyVariant | undefined>(undefined);

  useEffect(() => {
    if (!enabled) return;
    // Deferred like CtaExperiment: assignment reads localStorage, which only exists on the client.
    const timeoutId = window.setTimeout(() => {
      const assigned = getOrAssignPriceCopyVariant();
      setVariant(assigned.variant);
      track("price_copy_exposed", {
        experiment: PRICE_COPY_EXPERIMENT,
        variant: assigned.variant,
        surface,
        locale,
        newAssignment: assigned.isNew,
      });
    }, 0);
    return () => window.clearTimeout(timeoutId);
  }, [enabled, locale, surface]);

  const active = enabled ? variant : undefined;
  return { variant: active, copy: getPriceCopy(active ?? "plain", locale) };
}
