"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { isAgencyAnalyticsPath } from "@/lib/agency-analytics-consent";

declare global {
  interface Window {
    clarity?: (...args: unknown[]) => void;
  }
}

const PRIVATE_OR_SOURCE_CONTENT_PATHS = new Set([
  "/tools/kandidaatvoorstel-checker",
  "/en/candidate-proposal-checker",
  "/kandidaat/bevestigen",
]);

export function clarityAllowedOnPath(pathname: string): boolean {
  return !isAgencyAnalyticsPath(pathname) && !PRIVATE_OR_SOURCE_CONTENT_PATHS.has(pathname);
}

export default function ConditionalClarity() {
  const pathname = usePathname();
  const allowed = clarityAllowedOnPath(pathname);

  useEffect(() => {
    if (!allowed && typeof window.clarity === "function") {
      window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      window.clarity("stop");
    }
  }, [allowed]);

  if (!allowed) return null;
  return (
    <Script id="microsoft-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wpik4m2kyh");`}
    </Script>
  );
}
