import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sanitizeAttribution } from '@/lib/attribution';
import { classifyTrafficSource, parseUserAgent } from '@/lib/analytics-source';
import { geolocateIp, getClientIp } from '@/lib/geoip';
import {
    isEnglishRoleAnalyticsContext,
    sanitizeEnglishRoleAnalyticsAttribution,
    sanitizeEnglishRoleAnalyticsProperties,
    sanitizeEnglishRoleAnalyticsUrl,
} from '@/lib/english-role-analytics-safety';
import { agencyAnalyticsEventSchemas } from '@/lib/agency-analytics-contract';

const PERSISTED_FUNNEL_EVENTS = new Set([
    'page_view',
    'landing',
    'landing_cta_click',
    'landing_to_editor',
    'cta_viewed',
    'cta_clicked',
    'cta_experiment_assigned',
    'cta_experiment_clicked',
    'login_view',
    'login_code_requested',
    'login_verified',
    'login_failed',
    'cta_no_subscription_hero',
    'cta_no_subscription_comparison',
    'cta_no_subscription_bottom',
    'cta_no_subscription_sticky',
    'cta_one_time_payment_hero',
    'cta_one_time_payment_mid',
    'cta_one_time_payment_bottom',
    'cta_one_time_payment_sticky',
    'cta_cvnl_cancel_hero',
    'cta_cvnl_cancel_after_steps',
    'cta_cvnl_cancel_bottom',
    'cta_cvnl_cancel_sticky',
    'cta_cvster_cancel_hero',
    'cta_cvster_cancel_after_steps',
    'cta_cvster_cancel_bottom',
    'cta_cvster_cancel_sticky',
    'cta_livecareer_cancel_header',
    'cta_livecareer_cancel_hero',
    'cta_livecareer_cancel_after_steps',
    'cta_livecareer_cancel_why',
    'cta_livecareer_cancel_footer',
    'cta_livecareer_cancel_sticky',
    'cta_cv_optimaliseren_hero',
    'cta_cv_verbeteren_hero',
    'cta_cv_checken_hero',
    'cta_cv_nakijken_hero',
    'cta_resume_optimizer_en_hero',
    'cta_ontslagbrief_generator_click',
    'cta_ontslagbrief_cv_click',
    'cta_motivatiebrief_generator_click',
    'cta_motivatiebrief_cv_click',
    'cta_baan_wisselen_cv_click',
    'cta_opzegtermijn_tool_click',
    'cta_opzegtermijn_cv_click',
    'cta_transitievergoeding_tool_click',
    'cta_transitievergoeding_cv_click',
    'tool_to_cv_cta_click',
    'resume_screener_viewed',
    'resume_screener_started',
    'resume_screener_completed',
    'resume_screener_failed',
    'resume_screener_result_cta_clicked',
    'resume_screener_editor_imported',
    'linkedin_to_cv_tool_view',
    'linkedin_to_cv_submit',
    'linkedin_to_cv_output_generated',
    'linkedin_to_cv_copy_section',
    'linkedin_to_cv_cta_editor_click',
    'linkedin_to_cv_cta_templates_click',
    'profile_photo_tool_view',
    'profile_photo_checkout_click',
    'profile_photo_submit',
    'profile_photo_generated',
    'profile_photo_variant_selected',
    'profile_photo_refine_submit',
    'profile_photo_refined',
    'profile_photo_download',
    'profile_photo_cta_editor_click',
    'start_cv',
    'editor_started',
    'public_editor_viewed',
    'public_editor_download_intent',
    'public_editor_claim_started',
    'public_editor_claim_completed',
    'public_editor_claim_failed',
    'public_editor_post_login_routed',
    'cv_upload_modal_opened',
    'cv_upload_started',
    'cv_upload_completed',
    'cv_upload_failed',
    'cv_upload_cancelled',
    'example_cv_applied_after_login',
    'complete_cv',
    'cv_progress_milestone',
    'cv_section_completed',
    'ready_to_download_viewed',
    'quick_build_viewed',
    'quick_build_started',
    'quick_build_next_clicked',
    'quick_build_design_revealed',
    'quick_build_completed',
    'voice_mode_opened',
    'voice_permission_result',
    'voice_answer_started',
    'voice_answer_paused',
    'voice_answer_completed',
    'voice_interview_reviewed',
    'voice_proposal_started',
    'voice_proposal_completed',
    'voice_proposal_failed',
    'voice_changes_applied',
    'voice_mode_cancelled',
    'template_selector_opened',
    'template_selector_closed',
    'template_selected',
    'full_preview_opened',
    'full_preview_closed',
    'full_preview_design_opened',
    'full_preview_template_selected',
    'full_preview_color_changed',
    'full_preview_download_clicked',
    'pdf_download_started',
    'pdf_download_completed',
    'checkout_experiment_assigned',
    'checkout_paywall_reached',
    'checkout_modal_viewed',
    'checkout_option_viewed',
    'checkout_option_clicked',
    'checkout_modal_closed',
    'checkout_start',
    'checkout_started',
    'checkout_failed',
    'checkout_completed',
    'paid',
    'b2b_form_started',
    'b2b_form_submitted',
    'b2b_form_failed',
    'contact_form_started',
    'contact_form_submitted',
    'contact_form_failed',
    'agency_hub_viewed',
    'agency_guide_index_viewed',
    'agency_guide_viewed',
    'agency_content_cta_clicked',
    'agency_roi_completed',
    'agency_pricing_viewed',
    'agency_checkout_cta_clicked',
    'agency_checkout_started',
    'agency_checkout_failed',
    'agency_demo_started',
    'agency_demo_field_changed',
    'agency_submission_demo_viewed',
    'agency_submission_demo_tab_changed',
    'agency_sample_pack_downloaded',
    'agency_sample_output_viewed',
    'agency_workspace_started',
    'agency_docx_cta_clicked',
    'agency_redaction_cta_clicked',
    'matchpack_analysis_started',
    'matchpack_analysis_completed',
    'matchpack_analysis_failed',
    'matchpack_review_opened',
    'matchpack_draft_saved',
    'matchpack_approved',
    'matchpack_pdf_downloaded',
    'matchpack_email_copied',
    'matchpack_docx_downloaded',
    'matchpack_client_outcome_saved',
    'agency_evidence_checker_viewed',
    'agency_evidence_checker_sample_loaded',
    'agency_evidence_checker_started',
    'agency_evidence_checker_completed',
    'agency_evidence_checker_failed',
    'agency_evidence_checker_cta_clicked',
    'proposal_claim_verifier_viewed',
    'proposal_claim_verifier_sample_loaded',
    'proposal_claim_verifier_started',
    'proposal_claim_verifier_completed',
    'proposal_claim_verifier_failed',
    'proposal_claim_methodology_clicked',
    'proposal_claim_verifier_result_copied',
    'proposal_claim_verifier_cta_clicked',
    'agency_onboarding_step_clicked',
    'agency_onboarding_dismissed',
]);

type PrismaWithOptionalAnalytics = typeof prisma & {
    analyticsEvent?: {
        create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    };
};

let hasLoggedAnalyticsDbWarning = false;

function isDatabaseUnavailable(error: unknown) {
    return (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'ECONNREFUSED'
    );
}

/**
 * POST /api/analytics
 *
 * Lightweight analytics endpoint. Receives client-side events and logs them.
 * In production, forward to your data warehouse (BigQuery, Tinybird, etc.).
 *
 * For now: logs to stdout (visible in Vercel logs / server console).
 */
export async function POST(request: NextRequest) {
    try {
        const prismaWithOptionalAnalytics = prisma as unknown as PrismaWithOptionalAnalytics;
        const body = await request.json();

        const { event, properties, timestamp, url, attribution, visitorId, sessionId, visitNumber, screen, language, timezone, userAgent } = body;

        if (!event || typeof event !== 'string') {
            return NextResponse.json({ error: 'Missing event name' }, { status: 400 });
        }
        const safeAttribution = sanitizeAttribution(attribution);
        const rawProperties: Record<string, unknown> =
            properties && typeof properties === 'object' ? properties : {};
        const agencySchema = agencyAnalyticsEventSchemas[event];
        if ((event.startsWith('agency_') || event.startsWith('matchpack_')) && !agencySchema) {
            return NextResponse.json({ error: 'Unsupported event' }, { status: 400 });
        }
        const roleAnalyticsContext = isEnglishRoleAnalyticsContext(rawProperties, url);
        const eventAttribution = roleAnalyticsContext
            ? sanitizeEnglishRoleAnalyticsAttribution(safeAttribution)
            : safeAttribution;
        const parsedRoleProperties = roleAnalyticsContext
            ? sanitizeEnglishRoleAnalyticsProperties(rawProperties)
            : null;
        if (roleAnalyticsContext && !parsedRoleProperties) {
            return NextResponse.json({ error: 'Invalid event properties' }, { status: 400 });
        }
        const parsedAgencyProperties = agencySchema?.safeParse(rawProperties);
        if (parsedAgencyProperties && !parsedAgencyProperties.success) {
            return NextResponse.json({ error: 'Invalid event properties' }, { status: 400 });
        }
        const safeProperties = (
            parsedAgencyProperties?.data
            || parsedRoleProperties
            || rawProperties
        ) as Record<string, unknown>;
        const cvId = typeof safeProperties.cvId === 'string' ? safeProperties.cvId : null;
        const orderId = typeof safeProperties.orderId === 'string' ? safeProperties.orderId : null;
        const cluster = eventAttribution?.firstTouchCluster || null;
        const requestUserAgent = typeof userAgent === 'string' ? userAgent : request.headers.get('user-agent') || '';
        const parsedUserAgent = parseUserAgent(requestUserAgent);
        const referrer =
            typeof safeProperties.referrer === 'string'
                ? safeProperties.referrer
                : request.headers.get('referer') || eventAttribution?.firstTouchReferrer || '';
        const source = classifyTrafficSource(referrer, eventAttribution);
        const geo = event === 'page_view' ? await geolocateIp(getClientIp(request)) : null;
        const enrichedProperties = {
            ...safeProperties,
            ...(typeof visitorId === 'string' ? { visitorId } : {}),
            ...(typeof sessionId === 'string' ? { sessionId } : {}),
            ...(typeof visitNumber === 'number' ? { visitNumber } : {}),
            ...(typeof screen === 'string' ? { screen } : {}),
            ...(typeof language === 'string' ? { language } : {}),
            ...(typeof timezone === 'string' ? { timezone } : {}),
            sourceType: source.type,
            sourceLabel: source.label,
            ...(source.host ? { referrerHost: source.host } : {}),
            deviceType: parsedUserAgent.deviceType,
            browserName: parsedUserAgent.browserName,
            osName: parsedUserAgent.osName,
            ...(geo
                ? {
                    city: geo.city,
                    region: geo.region,
                    country: geo.country,
                    countryCode: geo.countryCode,
                    latitude: geo.latitude,
                    longitude: geo.longitude,
                    geoTimezone: geo.timezone,
                    geoProvider: 'ip-api',
                }
                : {}),
        };

        const safeEventUrl = roleAnalyticsContext ? sanitizeEnglishRoleAnalyticsUrl(url) : url;

        if (PERSISTED_FUNNEL_EVENTS.has(event)) {
            try {
                await prismaWithOptionalAnalytics.analyticsEvent?.create({
                    data: {
                        event,
                        cvId,
                        orderId,
                        path: typeof safeEventUrl === 'string' ? safeEventUrl : null,
                        cluster,
                        properties: enrichedProperties as unknown as Prisma.InputJsonValue,
                        attribution: (eventAttribution || undefined) as unknown as Prisma.InputJsonValue | undefined,
                    },
                });
            } catch (error) {
                if (isDatabaseUnavailable(error)) {
                    if (!hasLoggedAnalyticsDbWarning) {
                        console.warn(
                            'analytics_event_persist_skipped: database unavailable, continuing without persistence'
                        );
                        hasLoggedAnalyticsDbWarning = true;
                    }
                } else {
                    console.error('analytics_event_persist_failed', error);
                }
            }
        }

        // Log the event — in production, replace with your data pipeline
        console.log(JSON.stringify({
            type: 'analytics',
            event,
            properties: enrichedProperties,
            attribution: eventAttribution,
            timestamp: timestamp || new Date().toISOString(),
            url: safeEventUrl || '',
            // Keep logs content-free: the raw user-agent is never emitted.
            deviceType: parsedUserAgent.deviceType,
            browserName: parsedUserAgent.browserName,
            osName: parsedUserAgent.osName,
        }));

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
}
