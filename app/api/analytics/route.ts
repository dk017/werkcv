import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { sanitizeAttribution } from '@/lib/attribution';

const PERSISTED_FUNNEL_EVENTS = new Set([
    'landing',
    'start_cv',
    'complete_cv',
    'checkout_start',
    'paid',
]);

type PrismaWithOptionalAnalytics = typeof prisma & {
    analyticsEvent?: {
        create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    };
};

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

        const { event, properties, timestamp, url, attribution } = body;

        if (!event || typeof event !== 'string') {
            return NextResponse.json({ error: 'Missing event name' }, { status: 400 });
        }
        const safeAttribution = sanitizeAttribution(attribution);
        const safeProperties: Record<string, unknown> =
            properties && typeof properties === 'object' ? properties : {};
        const cvId = typeof safeProperties.cvId === 'string' ? safeProperties.cvId : null;
        const orderId = typeof safeProperties.orderId === 'string' ? safeProperties.orderId : null;
        const cluster = safeAttribution?.firstTouchCluster || null;

        if (PERSISTED_FUNNEL_EVENTS.has(event)) {
            try {
                await prismaWithOptionalAnalytics.analyticsEvent?.create({
                    data: {
                        event,
                        cvId,
                        orderId,
                        path: typeof url === 'string' ? url : null,
                        cluster,
                        properties: safeProperties as unknown as Prisma.InputJsonValue,
                        attribution: (safeAttribution || undefined) as unknown as Prisma.InputJsonValue | undefined,
                    },
                });
            } catch (error) {
                console.error('analytics_event_persist_failed', error);
            }
        }

        // Log the event — in production, replace with your data pipeline
        console.log(JSON.stringify({
            type: 'analytics',
            event,
            properties: safeProperties,
            attribution: safeAttribution,
            timestamp: timestamp || new Date().toISOString(),
            url: url || '',
            ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown',
            ua: request.headers.get('user-agent') || '',
        }));

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }
}
