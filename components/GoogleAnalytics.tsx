"use client";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { isAgencyAnalyticsPath } from "@/lib/agency-analytics-consent";
import { isPrivateContentPath } from "@/lib/privacy-content-paths";

/**
 * Google Analytics 4 loader.
 * NEXT_PUBLIC_GA_MEASUREMENT_ID can override the production property.
 */
export default function GoogleAnalytics() {
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-PCC26F3HBJ";
    const pathname = usePathname() || "/";
    const disabled = isAgencyAnalyticsPath(pathname) || isPrivateContentPath(pathname);
    useEffect(() => {
        (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] = disabled;
    }, [disabled, gaId]);
    if (disabled) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gaId}', {
                        page_path: window.location.pathname,
                        send_page_view: false,
                    });
                `}
            </Script>
        </>
    );
}
