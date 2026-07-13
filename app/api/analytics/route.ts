import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sanitizeAttribution } from '@/lib/attribution';
import { classifyTrafficSource, parseUserAgent } from '@/lib/analytics-source';
import { geolocateIp, getClientIp } from '@/lib/geoip';

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
    'example_cv_applied_after_login',
    'complete_cv',
    'cv_progress_milestone',
    'cv_section_completed',
    'ready_to_download_viewed',
    'template_selector_closed',
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
        const safeProperties: Record<string, unknown> =
            properties && typeof properties === 'object' ? properties : {};
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
