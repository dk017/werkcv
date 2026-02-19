"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackLanding, trackPageView } from "@/lib/analytics";

/**
 * Client component that tracks page views on route changes.
 * Include once in the root layout.
 */
export default function AnalyticsProvider() {
    const pathname = usePathname();

    useEffect(() => {
        const search = typeof window !== 'undefined' ? window.location.search : '';
        trackLanding(pathname, search);
        trackPageView(pathname);
    }, [pathname]);

    return null;
}
