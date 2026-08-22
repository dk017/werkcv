import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { defaultCV, cvSchema } from '@/lib/cv';
import { sanitizeAttribution } from '@/lib/attribution';
import { Prisma } from '@prisma/client';
import { getCurrentUserFromRequest } from '@/lib/auth';
import { normalizeStartSource } from '@/lib/start-source';
import { getDefaultThemeId, getTemplateConfig } from '@/lib/templates/registry';
import { canCreateAgencyWork, createCvDocumentForUser, getAgencyAccessForUser, isAgencyAccessError } from '@/lib/agency-access';

function getCreateCvErrorMessage(error: unknown): string {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'ECONNREFUSED') {
        return 'Database connection refused. Start PostgreSQL and try again.';
    }
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return 'Database is unavailable. Check DATABASE_URL and PostgreSQL status.';
    }
    return 'Failed to create CV document';
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUserFromRequest(request);
    if (!user) {
        return NextResponse.json(
            { error: 'Authentication required', code: 'AUTH_REQUIRED' },
            { status: 401 }
        );
    }

    let templateId = 'professional';
    let colorThemeId: string | null = null;
    let cvData = defaultCV;
    let attribution: ReturnType<typeof sanitizeAttribution> = null;
    let startSource = '';
    let workspace: 'consumer' | 'agency' = 'consumer';

    try {
        const body = await request.json();
        if (body.templateId) templateId = getTemplateConfig(body.templateId).id;
        if (body.colorThemeId) colorThemeId = body.colorThemeId;
        startSource = normalizeStartSource(body.startSource) || '';
        workspace = body.workspace === 'agency' ? 'agency' : 'consumer';
        attribution = sanitizeAttribution(body.attribution);

        // Support pre-populating with example CV data
        if (body.initialData) {
            const parsed = cvSchema.safeParse(body.initialData);
            if (parsed.success) {
                cvData = parsed.data;
            }
        }
    } catch {
        // No body or invalid JSON, use defaults
    }

    const baseData = {
        title: 'Mijn CV',
        data: cvData,
        templateId,
        colorThemeId: colorThemeId || getDefaultThemeId(templateId),
    };

    let effectiveUserId = user.id;
    if (workspace === 'agency') {
        const agencyAccess = await getAgencyAccessForUser(user.id);
        const agencyOwnerId = agencyAccess.state === 'active' ? agencyAccess.ownerUserId : null;
        if (agencyOwnerId && !canCreateAgencyWork(agencyAccess)) {
            return NextResponse.json(
                { error: 'Your agency role can review existing work but cannot create new CVs.', code: 'ROLE_READ_ONLY' },
                { status: 403 },
            );
        }
        if (!agencyOwnerId) {
            return NextResponse.json(
                { error: 'An active Agency subscription is required.', code: 'AGENCY_PLAN_REQUIRED' },
                { status: 409 },
            );
        }
        effectiveUserId = agencyOwnerId;
    }

    try {
        const data = {
            ...baseData,
            attribution: attribution as unknown as Prisma.InputJsonValue | undefined,
            sourceCluster: attribution?.firstTouchCluster || null,
            sourceLocale: attribution?.locale || null,
            startSource: startSource || null,
            userId: effectiveUserId,
        } as Prisma.CVDocumentUncheckedCreateInput;
        const cv = workspace === 'agency'
            ? await createCvDocumentForUser(data)
            : await prisma.cVDocument.create({ data });
        return NextResponse.json({ cvId: cv.id });
    } catch (error) {
        if (isAgencyAccessError(error)) {
            const status = error.code === 'AGENCY_QUOTA_REACHED' ? 409 : 503;
            return NextResponse.json(
                { error: error.message, code: error.code },
                { status },
            );
        }
        try {
            // Backward-compatible fallback if DB migration has not been applied yet
            const cv = await prisma.cVDocument.create({
                data: {
                    ...baseData,
                    userId: effectiveUserId,
                },
            });
            return NextResponse.json({ cvId: cv.id });
        } catch (error) {
            console.error('Failed to create CV document:', error);
            const message = getCreateCvErrorMessage(error);
            return NextResponse.json(
                { error: message },
                { status: 500 }
            );
        }
    }
}
