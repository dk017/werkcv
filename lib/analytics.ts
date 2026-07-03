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
    sanitizeReferrer,
} from '@/lib/attribution';
import { isEditorPath } from '@/lib/analytics-paths';

const ATTRIBUTION_STORAGE_KEY = 'werkcv_attribution_v1';
const LANDING_TRACKED_SESSION_KEY = 'werkcv_landing_tracked_v1';
const COMPLETION_TRACKED_PREFIX = 'werkcv_complete_cv_tracked_';
const EDITOR_STARTED_TRACKED_PREFIX = 'werkcv_editor_started_tracked_';
const PREVIOUS_PATH_SESSION_KEY = 'werkcv_previous_path_v1';
const VISITOR_ID_STORAGE_KEY = 'werkcv_visitor_id_v1';
const SESSION_ID_SESSION_KEY = 'werkcv_session_id_v1';
const VISIT_COUNT_STORAGE_KEY = 'werkcv_visit_count_v1';

export type NamedLandingCtaEvent =
    | 'cta_no_subscription_hero'
    | 'cta_no_subscription_comparison'
    | 'cta_no_subscription_bottom'
    | 'cta_no_subscription_sticky'
    | 'cta_one_time_payment_hero'
    | 'cta_one_time_payment_mid'
    | 'cta_one_time_payment_bottom'
    | 'cta_one_time_payment_sticky'
    | 'cta_cvnl_cancel_hero'
    | 'cta_cvnl_cancel_after_steps'
    | 'cta_cvnl_cancel_bottom'
    | 'cta_cvnl_cancel_sticky'
    | 'cta_cvster_cancel_hero'
    | 'cta_cvster_cancel_after_steps'
    | 'cta_cvster_cancel_bottom'
    | 'cta_cvster_cancel_sticky'
    | 'cta_livecareer_cancel_header'
    | 'cta_livecareer_cancel_hero'
    | 'cta_livecareer_cancel_after_steps'
    | 'cta_livecareer_cancel_why'
    | 'cta_livecareer_cancel_footer'
    | 'cta_livecareer_cancel_sticky'
    | 'cta_cv_optimaliseren_hero'
    | 'cta_cv_verbeteren_hero'
    | 'cta_cv_checken_hero'
    | 'cta_cv_nakijken_hero'
    | 'cta_resume_optimizer_en_hero';

export type CareerTransitionCtaEvent =
    | 'cta_ontslagbrief_generator_click'
    | 'cta_ontslagbrief_cv_click'
    | 'cta_motivatiebrief_generator_click'
    | 'cta_motivatiebrief_cv_click'
    | 'cta_baan_wisselen_cv_click'
    | 'cta_opzegtermijn_tool_click'
    | 'cta_opzegtermijn_cv_click'
    | 'cta_transitievergoeding_tool_click'
    | 'cta_transitievergoeding_cv_click';

export type LinkedinToCvEvent =
    | 'linkedin_to_cv_tool_view'
    | 'linkedin_to_cv_submit'
    | 'linkedin_to_cv_output_generated'
    | 'linkedin_to_cv_copy_section'
    | 'linkedin_to_cv_cta_editor_click'
    | 'linkedin_to_cv_cta_templates_click';

export type ProfilePhotoEvent =
    | 'profile_photo_tool_view'
    | 'profile_photo_checkout_click'
    | 'profile_photo_submit'
    | 'profile_photo_generated'
    | 'profile_photo_variant_selected'
    | 'profile_photo_refine_submit'
    | 'profile_photo_refined'
    | 'profile_photo_download'
    | 'profile_photo_cta_editor_click';

export type CvUploadSource = 'route_intent' | 'toolbar' | 'empty_state' | 'onboarding';
export type FullPreviewSource = 'desktop_preview_header' | 'desktop_document' | 'mobile_floating';

type EditorSourceContext = {
    templateId?: string;
    startSource?: string;
    requestedTemplate?: string;
    uiLanguage?: 'nl' | 'en';
};

type CheckoutExperimentContext = EditorSourceContext & {
    variant?: 'modal' | 'direct';
    experimentVariant?: 'modal' | 'direct';
};

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
    | { event: 'landing_cta_click'; properties: { fromPath: string; toPath: string; label: string } }
    | { event: 'landing_to_editor'; properties: { fromPath: string; toPath: string } }
    // Authentication
    | { event: 'login_view'; properties: { locale: 'nl' | 'en'; nextPath: string } }
    | { event: 'login_code_requested'; properties: { locale: 'nl' | 'en'; nextPath: string } }
    | { event: 'login_verified'; properties: { locale: 'nl' | 'en'; nextPath: string; isNewUser: boolean } }
    | {
          event: 'login_failed';
          properties: {
              locale: 'nl' | 'en';
              nextPath: string;
              stage: 'request_code' | 'verify_code';
              reason: 'invalid_email' | 'invalid_code' | 'server_error' | 'network_error';
          };
      }
    // CV lifecycle
    | { event: 'cv_created'; properties: { templateId: string } }
    | { event: 'cv_uploaded'; properties: { fileType: string; cvId?: string; templateId?: string; entryMethod?: 'upload' } }
    | {
          event: 'cv_upload_modal_opened';
          properties: {
              cvId: string;
              source: CvUploadSource;
              uiLanguage: 'nl' | 'en';
          } & EditorSourceContext;
      }
    | {
          event: 'cv_upload_started';
          properties: {
              cvId: string;
              source: CvUploadSource;
              uiLanguage: 'nl' | 'en';
              fileType: 'pdf' | 'doc' | 'docx' | 'unknown';
              sizeBucket: 'under_1mb' | '1_to_5mb' | '5_to_10mb' | 'over_10mb';
          };
      }
    | {
          event: 'cv_upload_completed';
          properties: {
              cvId: string;
              source: CvUploadSource;
              uiLanguage: 'nl' | 'en';
              fileType: 'pdf' | 'doc' | 'docx';
              durationMs: number;
          };
      }
    | {
          event: 'cv_upload_failed';
          properties: {
              cvId: string;
              source: CvUploadSource;
              uiLanguage: 'nl' | 'en';
              fileType: 'pdf' | 'doc' | 'docx' | 'unknown';
              reason: 'invalid_type' | 'too_large' | 'parse_error' | 'network_error';
          };
      }
    | {
          event: 'cv_upload_cancelled';
          properties: {
              cvId: string;
              source: CvUploadSource;
              uiLanguage: 'nl' | 'en';
              hadError: boolean;
          };
      }
    | { event: 'cv_saved'; properties: { cvId: string } }
    | { event: 'start_cv'; properties: { entryPoint: string; templateId?: string; cvId?: string; roleSlug?: string } }
    | { event: 'editor_started'; properties: { cvId: string; fromPath?: string } & EditorSourceContext }
    | { event: 'example_cv_applied_after_login'; properties: { cvId: string; templateId: string; startSource: string; hasSampleCV: boolean } }
    | { event: 'complete_cv'; properties: { cvId: string; completionScore: number } }
    | { event: 'cv_progress_milestone'; properties: { cvId: string; milestone: 25 | 50 | 75 | 100; completionScore: number } }
    | { event: 'cv_section_completed'; properties: { cvId: string; section: string; completionScore: number } }
    | { event: 'ready_to_download_viewed'; properties: { cvId: string; completionScore: number } }
    // Template & theme
    | {
          event: 'template_selector_opened';
          properties: {
              cvId: string;
              source: 'toolbar' | 'ready_state';
              completionScore: number;
              isReady: boolean;
          } & EditorSourceContext;
      }
    | { event: 'template_selected'; properties: { templateId: string; previousId?: string; cvId?: string } }
    | { event: 'color_theme_changed'; properties: { themeId: string; templateId: string } }
    | {
          event: 'full_preview_opened';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
          };
      }
    | {
          event: 'full_preview_closed';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
              closeMethod: 'x' | 'back_to_editor' | 'escape' | 'browser_back';
              durationMs: number;
              maxPageViewed: number;
              finalZoomMode: 'fit' | 'custom';
              designOpened: boolean;
              templateChanged: boolean;
              downloadClicked: boolean;
          };
      }
    | {
          event: 'full_preview_design_opened';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
              activePage: number;
              zoomMode: 'fit' | 'custom';
          };
      }
    | {
          event: 'full_preview_template_selected';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              previousTemplateId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
          };
      }
    | {
          event: 'full_preview_color_changed';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              previousThemeId: string;
              themeId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
          };
      }
    | {
          event: 'full_preview_download_clicked';
          properties: {
              cvId: string;
              source: FullPreviewSource;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              isReady: boolean;
              pageCount: number;
              durationMs: number;
              maxPageViewed: number;
              designOpened: boolean;
              templateChanged: boolean;
          };
      }
    // Photo
    | { event: 'photo_uploaded'; properties: { method: 'click' | 'drag' } }
    | { event: 'photo_removed'; properties: Record<string, never> }
    | { event: 'photo_edit_opened'; properties: { source: string } }
    | { event: 'photo_repositioned'; properties: { moved: boolean } }
    // Download & payment
    | { event: 'pdf_download_started'; properties: { cvId: string; source?: string; completionScore?: number; templateId?: string; pageCount?: number } }
    | { event: 'pdf_download_completed'; properties: { cvId: string } }
    | { event: 'addon_selected'; properties: { cvId: string; addons: string[] } }
    | {
          event: 'checkout_experiment_assigned';
          properties: { cvId: string; variant: 'modal' | 'direct'; uiLanguage: 'nl' | 'en' } & EditorSourceContext;
      }
    | {
          event: 'checkout_paywall_reached';
          properties: {
              cvId: string;
              variant: 'modal' | 'direct';
               source: string;
               completionScore: number;
               pageCount?: number;
          } & CheckoutExperimentContext;
      }
    | {
          event: 'checkout_modal_viewed';
          properties: { cvId: string; source: 'pdf_download' } & CheckoutExperimentContext;
      }
    | {
          event: 'checkout_option_viewed';
          properties: {
              cvId: string;
              product: string;
              amountCents: number;
              uiLanguage: 'nl' | 'en';
              recommended: boolean;
          } & CheckoutExperimentContext;
      }
    | {
          event: 'checkout_option_clicked';
          properties: {
              cvId: string;
              product: string;
              amountCents: number;
              uiLanguage: 'nl' | 'en';
              recommended: boolean;
              ctaText: string;
          } & CheckoutExperimentContext;
      }
    | {
          event: 'checkout_modal_closed';
          properties: { cvId: string; reason: 'later_button' | 'close_button' | 'overlay' };
      }
    | { event: 'checkout_start'; properties: { cvId: string; product?: string; amountCents?: number; source?: string } & CheckoutExperimentContext }
    | { event: 'checkout_started'; properties: { cvId: string; product?: string; amountCents?: number; source?: string } & CheckoutExperimentContext }
    | { event: 'checkout_failed'; properties: { cvId: string; reason?: string; product?: string; amountCents?: number; source?: string } & CheckoutExperimentContext }
    | { event: 'checkout_completed'; properties: { cvId: string; orderId?: string; amountCents?: number; product?: string } }
    | { event: 'paid'; properties: { cvId: string; orderId?: string; amountCents?: number; product?: string } }
    | { event: 'payment_completed'; properties: { cvId: string } }
    // B2B lead capture
    | { event: 'b2b_form_started'; properties: { pageType: 'agency' | 'coach' | 'partner'; path: string } }
    | { event: 'b2b_form_submitted'; properties: { pageType: 'agency' | 'coach' | 'partner'; path: string } }
    | {
          event: 'b2b_form_failed';
          properties: { pageType: 'agency' | 'coach' | 'partner'; path: string; reason: string };
      }
    | { event: 'contact_form_started'; properties: { path: string } }
    | { event: 'contact_form_submitted'; properties: { path: string; subject: string } }
    | { event: 'contact_form_failed'; properties: { path: string; reason: string } }
    | {
          event: 'editor_feedback_opened';
          properties: {
              cvId: string;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              pageCount: number;
              nextStep: string | null;
          };
      }
    | {
          event: 'editor_feedback_submitted';
          properties: {
              cvId: string;
              uiLanguage: 'nl' | 'en';
              templateId: string;
              completionScore: number;
              pageCount: number;
              nextStep: string | null;
          };
      }
    | {
          event: 'editor_feedback_failed';
          properties: {
              cvId: string;
              uiLanguage: 'nl' | 'en';
              reason: string;
          };
      }
    // Engagement
    | { event: 'onboarding_shown'; properties: Record<string, never> }
    | { event: 'onboarding_dismissed'; properties: { action: 'start_typing' | 'upload_cv' } }
    | { event: 'section_expanded'; properties: { section: string } }
    | { event: 'cta_viewed'; properties: { location: string; variant: string; slug?: string; locale?: 'nl' | 'en' } }
    | { event: 'cta_clicked'; properties: { location: string; label: string } }
    | {
          event: 'cta_experiment_assigned';
          properties: { experiment: 'guide_cta_copy_v1'; variant: 'trust' | 'speed'; slug: string; locale: 'nl' | 'en' };
      }
    | {
          event: 'cta_experiment_clicked';
          properties: { experiment: 'guide_cta_copy_v1'; variant: 'trust' | 'speed'; slug: string; locale: 'nl' | 'en' };
      }
    | { event: NamedLandingCtaEvent; properties: Record<string, never> }
    | {
          event: CareerTransitionCtaEvent;
          properties: { page_path: string; cta_location: string; cta_text: string };
      }
    | {
          event: 'tool_to_cv_cta_click';
          properties: {
              tool_name: string;
              page_path: string;
              cta_variant: 'primary' | 'secondary';
              cta_text: string;
              cta_location?: string;
              cta_intent?: 'salary' | 'legal' | 'cv_content' | 'cancellation' | 'cover_letter' | 'general';
              cta_destination?: string;
              result_state?: string;
          };
      }
    // CV-to-vacancy screener
    | { event: 'resume_screener_viewed'; properties: { locale: 'nl' | 'en' } }
    | {
          event: 'resume_screener_started';
          properties: { locale: 'nl' | 'en'; input_type: 'file' | 'text' };
      }
    | {
          event: 'resume_screener_completed';
          properties: {
              locale: 'nl' | 'en';
              input_type: 'file' | 'text';
              score_band: 'weak' | 'fair' | 'good' | 'strong';
              duration_ms: number;
              top_issue_category: string;
          };
      }
    | {
          event: 'resume_screener_failed';
          properties: {
              locale: 'nl' | 'en';
              input_type: 'file' | 'text';
              reason: 'analysis_failed' | 'import_failed';
          };
      }
    | {
          event: 'resume_screener_result_cta_clicked';
          properties: {
              locale: 'nl' | 'en';
              score_band: 'weak' | 'fair' | 'good' | 'strong';
              destination: '/editor' | '/en/editor';
          };
      }
    | {
          event: 'resume_screener_editor_imported';
          properties: {
              cvId: string;
              locale: 'nl' | 'en';
              input_type: 'file' | 'text';
              score_band: 'weak' | 'fair' | 'good' | 'strong';
              top_issue_category: string;
          };
      }
    | { event: 'linkedin_to_cv_tool_view'; properties: { page_path: string } }
    | {
          event: 'linkedin_to_cv_submit';
          properties: { page_path: string; target_role?: string; language: 'nl' | 'en' };
      }
    | {
          event: 'linkedin_to_cv_output_generated';
          properties: { page_path: string; language: 'nl' | 'en'; sections_generated: number };
      }
    | { event: 'linkedin_to_cv_copy_section'; properties: { page_path: string; section: string } }
    | {
          event: 'linkedin_to_cv_cta_editor_click';
          properties: { page_path: string; cta_location: string; cta_text: string };
      }
    | {
          event: 'linkedin_to_cv_cta_templates_click';
          properties: { page_path: string; cta_location: string; cta_text: string };
      }
    | { event: 'profile_photo_tool_view'; properties: { page_path: string } }
    | {
          event: 'profile_photo_checkout_click';
          properties: { page_path: string; amount_cents: number; currency: string };
      }
    | { event: 'profile_photo_submit'; properties: { page_path: string; style: string } }
    | {
          event: 'profile_photo_generated';
          properties: { page_path: string; style: string; images_generated: number };
      }
    | {
          event: 'profile_photo_variant_selected';
          properties: { page_path: string; image_id: string; variant_position: number; style: string };
      }
    | {
          event: 'profile_photo_refine_submit';
          properties: { page_path: string; style: string; refinement_length: number };
      }
    | {
          event: 'profile_photo_refined';
          properties: { page_path: string; style: string; images_generated: number };
      }
    | { event: 'profile_photo_download'; properties: { page_path: string; image_id: string; style: string } }
    | {
          event: 'profile_photo_cta_editor_click';
          properties: { page_path: string; cta_location: string; cta_text: string };
      }
    // CV score tool
    | { event: 'cv_score_tool_viewed'; properties: Record<string, never> }
    | { event: 'cv_score_input_provided'; properties: { input_type: 'file' | 'text' } }
    | {
          event: 'cv_score_result_shown';
          properties: {
              total_score: number;
              score_band: 'critical' | 'fair' | 'good' | 'excellent';
              top_issue_dimension: string;
          };
      }
    | { event: 'cv_score_cta_clicked'; properties: { button: 'editor' | 'templates' } };

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
    const identity = getAnalyticsIdentity();

    const payload = {
        event,
        properties,
        timestamp: new Date().toISOString(),
        url: window.location.pathname,
        userAgent: navigator.userAgent,
        visitorId: identity.visitorId,
        sessionId: identity.sessionId,
        visitNumber: identity.visitNumber,
        screen: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        attribution,
    };

    // 1) Send to our internal endpoint (non-blocking)
    sendToInternal(payload);

    // 2) Forward to GA4 if configured
    sendToGA4(event, properties);

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
    maybeTrackLandingToEditor(path);
    track('page_view', {
        path,
        referrer: typeof document !== 'undefined' ? sanitizeReferrer(document.referrer) : undefined,
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
        : buildInitialAttribution(path, sanitizeReferrer(document.referrer || ''), params, nowIso);

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

function createAnalyticsId(prefix: string): string {
    const random =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;

    return `${prefix}_${random}`;
}

function getAnalyticsIdentity(): { visitorId: string; sessionId: string; visitNumber: number } {
    let visitorId = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);
    if (!visitorId) {
        visitorId = createAnalyticsId('v');
        window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
    }

    let sessionId = window.sessionStorage.getItem(SESSION_ID_SESSION_KEY);
    let visitNumber = Number(window.localStorage.getItem(VISIT_COUNT_STORAGE_KEY) || '0');

    if (!sessionId) {
        sessionId = createAnalyticsId('s');
        window.sessionStorage.setItem(SESSION_ID_SESSION_KEY, sessionId);
        visitNumber += 1;
        window.localStorage.setItem(VISIT_COUNT_STORAGE_KEY, String(visitNumber));
    }

    return {
        visitorId,
        sessionId,
        visitNumber: Number.isFinite(visitNumber) && visitNumber > 0 ? visitNumber : 1,
    };
}

export function markCompletionTracked(cvId: string): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(`${COMPLETION_TRACKED_PREFIX}${cvId}`, '1');
}

export function hasCompletionTracked(cvId: string): boolean {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(`${COMPLETION_TRACKED_PREFIX}${cvId}`) === '1';
}

export function markEditorStartedTracked(cvId: string): void {
    if (typeof window === 'undefined') return;
    window.sessionStorage.setItem(`${EDITOR_STARTED_TRACKED_PREFIX}${cvId}`, '1');
}

export function hasEditorStartedTracked(cvId: string): boolean {
    if (typeof window === 'undefined') return false;
    return window.sessionStorage.getItem(`${EDITOR_STARTED_TRACKED_PREFIX}${cvId}`) === '1';
}

function maybeTrackLandingToEditor(currentPath: string): void {
    if (typeof window === 'undefined') return;

    const previousPath = window.sessionStorage.getItem(PREVIOUS_PATH_SESSION_KEY) || '';

    if (isEditorPath(currentPath) && previousPath && !isEditorPath(previousPath)) {
        track('landing_to_editor', {
            fromPath: previousPath,
            toPath: currentPath,
        });
    }

    window.sessionStorage.setItem(PREVIOUS_PATH_SESSION_KEY, currentPath);
}
