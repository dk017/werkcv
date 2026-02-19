/**
 * WerkCV Analytics — lightweight client-side event tracking.
 *
 * Sends events to /api/analytics (internal) and optionally to Google Analytics
 * (GA4) if a measurement ID is configured.
 *
 * Usage:
 *   import { track } from '@/lib/analytics';
 *   track('template_selected', { templateId: 'modern' });
 */
import {
    AttributionSnapshot,
    buildInitialAttribution,
    mergeAttributionTouch,
    sanitizeAttribution,
} from '@/lib/attribution';

const ATTRIBUTION_STORAGE_KEY = 'werkcv_attribution_v1';
const LANDING_TRACKED_SESSION_KEY = 'werkcv_landing_tracked_v1';
const COMPLETION_TRACKED_PREFIX = 'werkcv_complete_cv_tracked_';

// ============================================================
// Event types — exhaustive list of all tracked interactions
// ============================================================
export type AnalyticsEvent =
    // Navigation
    | { event: 'page_view'; properties: { path: string; referrer?: string } }
    | {
          event: 'landing';
          properties: {
              path: string;
              referrer: string;
              firstTouchCluster: string;
              locale: 'nl' | 'en';
          };
      }
    // CV lifecycle
    | { event: 'cv_created'; properties: { templateId: string } }
    | { event: 'cv_uploaded'; properties: { fileType: string } }
    | { event: 'cv_saved'; properties: { cvId: string } }
    | { event: 'start_cv'; properties: { entryPoint: string; templateId?: string; cvId?: string } }
    | { event: 'complete_cv'; properties: { cvId: string; completionScore: number } }
    // Template & theme
    | { event: 'template_selected'; properties: { templateId: string; previousId?: string } }
    | { event: 'color_theme_changed'; properties: { themeId: string; templateId: string } }
    // Photo
    | { event: 'photo_uploaded'; properties: { method: 'click' | 'drag' } }
    | { event: 'photo_removed'; properties: Record<string, never> }
    | { event: 'photo_edit_opened'; properties: { source: string } }
    | { event: 'photo_repositioned'; properties: { moved: boolean } }
    // Download & payment
    | { event: 'pdf_download_started'; properties: { cvId: string } }
    | { event: 'pdf_download_completed'; properties: { cvId: string } }
    | { event: 'addon_selected'; properties: { cvId: string; addons: string[] } }
    | { event: 'checkout_start'; properties: { cvId: string } }
    | { event: 'checkout_started'; properties: { cvId: string } }
    | { event: 'paid'; properties: { cvId: string; orderId?: string; amountCents?: number } }
    | { event: 'payment_completed'; properties: { cvId: string } }
    // Engagement
    | { event: 'onboarding_shown'; properties: Record<string, never> }
    | { event: 'onboarding_dismissed'; properties: { action: 'start_typing' | 'upload_cv' } }
    | { event: 'section_expanded'; properties: { section: string } }
    | { event: 'cta_viewed'; properties: { location: string; variant: string; slug?: string; locale?: 'nl' | 'en' } }
    | { event: 'cta_clicked'; properties: { location: string; label: string } };

// ============================================================
// Core track function
// ============================================================
export function track<E extends AnalyticsEvent['event']>(
    event: E,
    properties: Extract<AnalyticsEvent, { event: E }>['properties']
): void {
    // Never track during SSR
    if (typeof window === 'undefined') return;
    const attribution = getStoredAttribution();

    const payload = {
        event,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        attribution,
    };

    // 1) Send to our internal endpoint (non-blocking)
    sendToInternal(payload);

    // 2) Forward to GA4 if configured
    sendToGA4(event, properties);

    // 3) Console log in development
    if (process.env.NODE_ENV === 'development') {
        console.log(`[analytics] ${event}`, properties);
    }
}

// ============================================================
// Internal endpoint — fire-and-forget via sendBeacon + fetch fallback
// ============================================================
function sendToInternal(payload: Record<string, unknown>): void {
    const body = JSON.stringify(payload);

    // Prefer sendBeacon — works even when page is unloading
    if (typeof navigator.sendBeacon === 'function') {
        try {
            navigator.sendBeacon('/api/analytics', body);
            return;
        } catch {
            // Fall through to fetch
        }
    }

    // Fetch fallback
    fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
    }).catch(() => {
        // Silently fail — analytics should never break the app
    });
}

// ============================================================
// Google Analytics 4 — forward events via gtag
// ============================================================
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

function sendToGA4(event: string, properties: Record<string, unknown>): void {
    if (typeof window.gtag === 'function') {
        window.gtag('event', event, properties);
    }
}

// ============================================================
// Page view tracker — call from AnalyticsProvider
// ============================================================
export function trackPageView(path: string): void {
    ensureAttribution(path, window.location.search);
    track('page_view', {
        path,
        referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    });
}

export function trackLanding(path: string, search: string): void {
    if (typeof window === 'undefined') return;

    const attribution = ensureAttribution(path, search);
    if (!attribution) return;

    const alreadyTracked = window.sessionStorage.getItem(LANDING_TRACKED_SESSION_KEY);
    if (alreadyTracked) return;

    track('landing', {
        path,
        referrer: attribution.firstTouchReferrer,
        firstTouchCluster: attribution.firstTouchCluster,
        locale: attribution.locale,
    });
    window.sessionStorage.setItem(LANDING_TRACKED_SESSION_KEY, '1');
}

export function ensureAttribution(path: string, search: string): AttributionSnapshot | null {
    if (typeof window === 'undefined') return null;

    const nowIso = new Date().toISOString();
    const params = new URLSearchParams(search || '');
    const existing = getStoredAttribution();
    const updated = existing
        ? mergeAttributionTouch(existing, path, params, nowIso)
        : buildInitialAttribution(path, document.referrer || '', params, nowIso);

    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(updated));
    return updated;
}

export function getStoredAttribution(): AttributionSnapshot | null {
    if (typeof window === 'undefined') return null;

    try {
        const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return sanitizeAttribution(parsed);
    } catch {
        return null;
    }
}

export function markCompletionTracked(cvId: string): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(`${COMPLETION_TRACKED_PREFIX}${cvId}`, '1');
}

export function hasCompletionTracked(cvId: string): boolean {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(`${COMPLETION_TRACKED_PREFIX}${cvId}`) === '1';
}
