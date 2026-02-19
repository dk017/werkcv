import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks';

const WEBHOOK_SECRET = process.env.POLAR_WEBHOOK_SECRET;
const SUPPORTED_ADDONS = new Set(['ats-rewrite', 'cover-letter', 'localization-polish']);

type PrismaWithAttributionExtensions = typeof prisma & {
    cVDocument: {
        findUnique: (args: { where: { id: string }; select: Record<string, boolean> }) => Promise<{
            attribution?: unknown;
            sourceCluster?: string | null;
        } | null>;
    };
    order: {
        create: (args: { data: Record<string, unknown> }) => Promise<{ id: string }>;
    };
    analyticsEvent?: {
        create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
    };
};

function toHeaderRecord(headers: Headers): Record<string, string> {
    const entries = Array.from(headers.entries()).map(([key, value]) => [key.toLowerCase(), value] as const);
    return Object.fromEntries(entries);
}

function readCvId(metadata: Record<string, string | number | boolean>): string | null {
    const raw = metadata.cv_id;
    if (typeof raw === 'string') return raw;
    if (typeof raw === 'number') return String(raw);
    return null;
}

function readAddons(metadata: Record<string, string | number | boolean>): string[] {
    const raw = metadata.addons_csv;
    if (typeof raw !== 'string' || !raw.trim()) return [];
    return raw
        .split(',')
        .map((value) => value.trim())
        .filter((value) => SUPPORTED_ADDONS.has(value));
}

export async function POST(request: NextRequest) {
    const prismaWithAttributionExtensions = prisma as unknown as PrismaWithAttributionExtensions;

    if (!WEBHOOK_SECRET) {
        console.error('POLAR_WEBHOOK_SECRET is not configured');
        return NextResponse.json(
            { error: 'Webhook not configured' },
            { status: 500 }
        );
    }

    const rawBody = await request.text();

    let event;
    try {
        event = validateEvent(rawBody, toHeaderRecord(request.headers), WEBHOOK_SECRET);
    } catch (error) {
        if (error instanceof WebhookVerificationError) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
        }
        console.error('Failed to validate Polar webhook event', error);
        return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    if (event.type !== 'order.paid') {
        return NextResponse.json({ status: 'ignored' });
    }

    const externalOrderId = event.data.id;
    const metadata = event.data.metadata || {};
    const cvId = readCvId(metadata);
    const addons = readAddons(metadata);
    const email = event.data.customer.email;
    const amountCents = event.data.totalAmount;
    const currency = event.data.currency || 'EUR';

    if (!cvId) {
        console.error('No cv_id found in Polar order metadata');
        return NextResponse.json({ error: 'Missing cv_id metadata' }, { status: 400 });
    }

    const existingOrder = await prisma.order.findUnique({
        where: { lemonId: externalOrderId },
    });

    if (existingOrder) {
        return NextResponse.json({ status: 'already_processed' });
    }

    const cvDocument = await prismaWithAttributionExtensions.cVDocument.findUnique({
        where: { id: cvId },
        select: {
            attribution: true,
            sourceCluster: true,
        },
    });

    let order;
    try {
        order = await prismaWithAttributionExtensions.order.create({
            data: {
                email,
                cvId,
                product: 'cv-download',
                amountCents,
                currency,
                addons,
                attribution: (cvDocument?.attribution || undefined) as unknown as Prisma.InputJsonValue | undefined,
                sourceCluster: cvDocument?.sourceCluster || null,
                lemonId: externalOrderId,
                paidAt: new Date(),
            },
        });
    } catch {
        order = await prisma.order.create({
            data: {
                email,
                cvId,
                product: 'cv-download',
                lemonId: externalOrderId,
                paidAt: new Date(),
            },
        });
    }

    const paidProperties = {
        cvId,
        orderId: order.id,
        amountCents,
        currency,
        addons,
        polarOrderId: externalOrderId,
    };

    try {
        await prismaWithAttributionExtensions.analyticsEvent?.create({
            data: {
                event: 'paid',
                cvId,
                orderId: order.id,
                cluster: cvDocument?.sourceCluster || null,
                properties: paidProperties as unknown as Prisma.InputJsonValue,
                attribution: (cvDocument?.attribution || undefined) as unknown as Prisma.InputJsonValue | undefined,
            },
        });
    } catch (error) {
        console.error('paid_event_persist_failed', error);
    }

    console.log(
        JSON.stringify({
            type: 'analytics',
            event: 'paid',
            properties: paidProperties,
            cluster: cvDocument?.sourceCluster || null,
        })
    );

    return NextResponse.json({ status: 'ok' });
}
