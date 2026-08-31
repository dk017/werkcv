"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import type { CitedAuthorityRouteConfig } from "@/lib/cited-authority-conversion";

type CitedAuthorityBridgeTrackerProps = Pick<
  CitedAuthorityRouteConfig,
  "canonicalPath" | "intentId" | "landingLocale"
> & { startSource: string };

export default function CitedAuthorityBridgeTracker({
  canonicalPath,
  intentId,
  landingLocale,
  startSource,
  targetId,
}: CitedAuthorityBridgeTrackerProps & { targetId?: string }) {
  useEffect(() => {
    const target = document.getElementById(targetId ?? `cited-authority-${startSource}`);
    if (!target) return;

    let tracked = false;
    const recordView = () => {
      if (tracked) return;
      tracked = true;
      track("cta_viewed", {
        location: `cited_authority:${intentId}:main`,
        variant: "v1",
        slug: canonicalPath.replace(/^\//, ""),
        locale: landingLocale,
      });
    };

    if (!("IntersectionObserver" in window)) {
      recordView();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5)) {
          recordView();
          observer.disconnect();
        }
      },
      { threshold: [0.5] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [canonicalPath, intentId, landingLocale, startSource, targetId]);

  return null;
}
