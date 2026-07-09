"use client";

import { useEffect } from "react";

const CURRENT_BUILD_ID = process.env.NEXT_PUBLIC_APP_BUILD_ID || "local";
const DYNAMIC_PATH_PREFIXES = ["/editor", "/en/editor", "/login", "/cover-letter"];
const CHECK_INTERVAL_MS = 60_000;

function isDynamicAppPath(pathname: string): boolean {
  return DYNAMIC_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export default function BuildVersionGuard() {
  useEffect(() => {
    if (CURRENT_BUILD_ID === "local" || !isDynamicAppPath(window.location.pathname)) {
      return;
    }

    let cancelled = false;
    let inFlight = false;

    async function checkBuildVersion() {
      if (cancelled || inFlight || document.visibilityState === "hidden") {
        return;
      }

      inFlight = true;

      try {
        const response = await fetch("/api/build-version", {
          cache: "no-store",
          headers: {
            "X-WerkCV-Build-Check": "1",
          },
        });

        if (!response.ok) {
          return;
        }

        const payload = (await response.json()) as { buildId?: string };

        if (payload.buildId && payload.buildId !== CURRENT_BUILD_ID) {
          window.location.reload();
        }
      } catch {
        // Ignore transient network errors. The next visibility/focus/interval check
        // will retry without interrupting the user's editor session.
      } finally {
        inFlight = false;
      }
    }

    const interval = window.setInterval(checkBuildVersion, CHECK_INTERVAL_MS);
    window.addEventListener("focus", checkBuildVersion);
    document.addEventListener("visibilitychange", checkBuildVersion);
    void checkBuildVersion();

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      window.removeEventListener("focus", checkBuildVersion);
      document.removeEventListener("visibilitychange", checkBuildVersion);
    };
  }, []);

  return null;
}
