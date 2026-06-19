"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { track, trackLanding, trackPageView } from "@/lib/analytics";
import { isEditorPath, isFunnelCtaTargetPath, isTemplatePath } from "@/lib/analytics-paths";
import { landingStartSource, PENDING_START_SOURCE_COOKIE } from "@/lib/start-source";

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

        if (isEditorPath(pathname)) {
            document.cookie = `${PENDING_START_SOURCE_COOKIE}=; Path=/; Max-Age=0; SameSite=Lax`;
        }
    }, [pathname]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
            if (!anchor) return;
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
            if (isEditorPath(pathname)) return;

            let url: URL;
            try {
                url = new URL(href, window.location.origin);
            } catch {
                return;
            }

            if (url.origin !== window.location.origin) return;

            const toPath = url.pathname;
            if (!isFunnelCtaTargetPath(toPath)) return;

            if (isEditorPath(toPath) || isTemplatePath(toPath)) {
                const source = encodeURIComponent(landingStartSource(pathname));
                document.cookie = `${PENDING_START_SOURCE_COOKIE}=${source}; Path=/; Max-Age=600; SameSite=Lax`;
            }

            if (anchor.dataset.trackCta === 'manual') return;

            const label =
                anchor.getAttribute('aria-label') ||
                anchor.textContent?.trim() ||
                toPath;

            track('landing_cta_click', {
                fromPath: pathname,
                toPath,
                label: label.slice(0, 120),
            });
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [pathname]);

    return null;
}
