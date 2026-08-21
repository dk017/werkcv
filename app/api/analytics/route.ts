import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sanitizeAttribution } from '@/lib/attribution';
import { classifyTrafficSource, parseUserAgent } from '@/lib/analytics-source';
import { geolocateIp, getClientIp } from '@/lib/geoip';
import { z } from 'zod';

const shortText = z.string().trim().max(120);
const agencyLocale = z.enum(['nl', 'en']);
const agencyEventSchemas: Record<string, z.ZodTypeAny> = {
    agency_hub_viewed: z.object({ path: shortText }).strict(),
    agency_guide_index_viewed: z.object({ path: shortText }).strict(),
    agency_guide_viewed: z.object({ path: shortText, slug: shortText }).strict(),
    agency_content_cta_clicked: z.object({ path: shortText, location: shortText, destination: shortText }).strict(),
    agency_roi_completed: z.object({ recruiters: z.number().nonnegative().max(10000), proposalsPerRecruiter: z.number().nonnegative().max(10000), minutesSaved: z.number().nonnegative().max(10000) }).strict(),
    agency_checkout_started: z.object({ location: shortText, product: z.literal('agency') }).strict(),
    agency_checkout_failed: z.object({ location: shortText, product: z.literal('agency'), reason: shortText }).strict(),
    agency_demo_started: z.object({ location: shortText, mode: z.literal('sample') }).strict(),
    agency_demo_field_changed: z.object({ field: z.enum(['name', 'title', 'summary', 'experience', 'skills']), mode: z.literal('sample') }).strict(),
    agency_submission_demo_viewed: z.object({ location: shortText }).strict(),
    agency_submission_demo_tab_changed: z.object({ tab: z.enum(['intro', 'evidence', 'gaps', 'email', 'outputs']) }).strict(),
    agency_sample_pack_downloaded: z.object({ variant: z.enum(['full', 'anonymized']) }).strict(),
    agency_sample_output_viewed: z.object({ variant: z.enum(['full', 'anonymized']), location: shortText }).strict(),
    agency_workspace_started: z.object({ location: shortText }).strict(),
    agency_docx_cta_clicked: z.object({ path: shortText, location: shortText }).strict(),
    agency_redaction_cta_clicked: z.object({ path: shortText, location: shortText }).strict(),
    agency_evidence_checker_viewed: z.object({ locale: agencyLocale }).strict(),
    agency_evidence_checker_sample_loaded: z.object({ locale: agencyLocale }).strict(),
    agency_evidence_checker_started: z.object({ locale: agencyLocale, inputType: z.enum(['file', 'text']), sample: z.boolean() }).strict(),
    agency_evidence_checker_completed: z.object({ locale: agencyLocale, requirementCount: z.number().int().nonnegative().max(100), missingCount: z.number().int().nonnegative().max(100), sample: z.boolean() }).strict(),
    agency_evidence_checker_failed: z.object({ locale: agencyLocale, reason: shortText }).strict(),
    agency_evidence_checker_cta_clicked: z.object({ locale: agencyLocale, destination: z.enum(['agency', 'guide']) }).strict(),
    agency_onboarding_step_clicked: z.object({ step: shortText }).strict(),
    agency_onboarding_dismissed: z.object({ completed: z.number().int().nonnegative().max(20), total: z.number().int().positive().max(20) }).strict(),
    matchpack_analysis_started: z.object({ locale: agencyLocale, fileType: z.enum(['pdf', 'docx', 'unknown']) }).strict(),
    matchpack_analysis_completed: z.object({ locale: agencyLocale, requirementCount: z.number().int().nonnegative().max(100), scoreBand: shortText }).strict(),
    matchpack_analysis_failed: z.object({ locale: agencyLocale, reason: shortText }).strict(),
    matchpack_review_opened: z.object({ locale: agencyLocale, status: z.enum(['analyzed', 'approved']) }).strict(),
    matchpack_draft_saved: z.object({ locale: agencyLocale, selectedVariant: z.enum(['full', 'anonymized']) }).strict(),
    matchpack_approved: z.object({ locale: agencyLocale, selectedVariant: z.enum(['full', 'anonymized']), requirementCount: z.number().int().nonnegative().max(100) }).strict(),
    matchpack_pdf_downloaded: z.object({ variant: z.enum(['full', 'anonymized']) }).strict(),
    matchpack_docx_downloaded: z.object({ variant: z.enum(['full', 'anonymized']) }).strict(),
    matchpack_email_copied: z.object({ locale: agencyLocale }).strict(),
    matchpack_client_outcome_saved: z.object({ status: z.enum(['unknown', 'pending', 'accepted', 'rejected', 'withdrawn']) }).strict(),
};

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
        const agencySchema = agencyEventSchemas[event];
        if ((event.startsWith('agency_') || event.startsWith('matchpack_')) && !agencySchema) {
            return NextResponse.json({ error: 'Unsupported event' }, { status: 400 });
        }
        const parsedAgencyProperties = agencySchema?.safeParse(rawProperties);
        if (parsedAgencyProperties && !parsedAgencyProperties.success) {
            return NextResponse.json({ error: 'Invalid event properties' }, { status: 400 });
        }
        const safeProperties = (parsedAgencyProperties?.data || rawProperties) as Record<string, unknown>;
        const cvId = typeof safeProperties.cvId === 'string' ? safeProperties.cvId : null;
        const orderId = typeof safeProperties.orderId === 'string' ? safeProperties.orderId : null;
        const cluster = safeAttribution?.firstTouchCluster || null;
        const requestUserAgent = typeof userAgent === 'string' ? userAgent : request.headers.get('user-agent') || '';
        const parsedUserAgent = parseUserAgent(requestUserAgent);
        const referrer =
            typeof safeProperties.referrer === 'string'
                ? safeProperties.referrer
                : request.headers.get('referer') || safeAttribution?.firstTouchReferrer || '';
        const source = classifyTrafficSource(referrer, safeAttribution);
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

        if (PERSISTED_FUNNEL_EVENTS.has(event)) {
            try {
                await prismaWithOptionalAnalytics.analyticsEvent?.create({
                    data: {
                        event,
                        cvId,
                        orderId,
                        path: typeof url === 'string' ? url : null,
                        cluster,
                        properties: enrichedProperties as unknown as Prisma.InputJsonValue,
                        attribution: (safeAttribution || undefined) as unknown as Prisma.InputJsonValue | undefined,
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
            attribution: safeAttribution,
            timestamp: timestamp || new Date().toISOString(),
            url: url || '',
            ua: requestUserAgent,
        }));

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
}
