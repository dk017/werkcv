import { NextRequest, NextResponse } from 'next/server';
import { defaultCV, cvSchema } from '@/lib/cv';
import { sanitizeAttribution } from '@/lib/attribution';
import { Prisma } from '@prisma/client';
import { getCurrentUserFromRequest } from '@/lib/auth';
import { normalizeStartSource } from '@/lib/start-source';
import {
    buildEnglishRoleExampleStartSource,
    normalizeEnglishRoleExampleSlug,
    normalizeEnglishRoleExampleStartSource,
} from '@/lib/english-role-examples';
import { getDefaultThemeId, getTemplateConfig } from '@/lib/templates/registry';
import { isAgencyAccessError } from '@/lib/agency-access';
import { createMatchPackCvDocument, createPersonalCvDocument } from '@/lib/workspace/cv-document-service';
import { recordEnglishRoleExampleCvCreated } from '@/lib/english-role-example-events';

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
    let uiLanguage: 'nl' | 'en' = 'nl';

    try {
        const body = await request.json();
        uiLanguage = body.uiLanguage === 'en' ? 'en' : 'nl';
        if (body.templateId) templateId = getTemplateConfig(body.templateId).id;
        if (body.colorThemeId) colorThemeId = body.colorThemeId;
        const roleSlug = normalizeEnglishRoleExampleSlug(body.roleSlug);
        const entryMethod = body.entryMethod === 'upload' ? 'upload' : 'example';
        const rawStartSource = typeof body.startSource === 'string' ? body.startSource : '';
        const hasRoleSourcePrefix = rawStartSource.toLowerCase().startsWith('en_role_example_');
        const validatedRoleSource = hasRoleSourcePrefix
            ? normalizeEnglishRoleExampleStartSource(rawStartSource)
            : null;
        startSource = buildEnglishRoleExampleStartSource(roleSlug, entryMethod)
            || validatedRoleSource
            || (hasRoleSourcePrefix ? '' : normalizeStartSource(rawStartSource))
            || '';
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

    try {
        const data = {
            ...baseData,
            attribution: attribution as unknown as Prisma.InputJsonValue | undefined,
            sourceCluster: attribution?.firstTouchCluster || null,
            sourceLocale: attribution?.locale || null,
            startSource: startSource || null,
        } as Omit<Prisma.CVDocumentUncheckedCreateInput, 'userId' | 'agencySubscriptionId'>;
        const cv = workspace === 'agency'
            ? await createMatchPackCvDocument(user.id, data)
            : await createPersonalCvDocument(user.id, data);
        await recordEnglishRoleExampleCvCreated({
            cvId: cv.id,
            templateId,
            startSource,
            uiLanguage,
        });
        return NextResponse.json({ cvId: cv.id });
    } catch (error) {
        if (isAgencyAccessError(error)) {
            const status = error.code === 'AGENCY_QUOTA_REACHED' || error.code === 'RETENTION_POLICY_REQUIRED'
                ? 409
                : error.code === 'AGENCY_SUBSCRIPTION_INACTIVE'
                    ? 403
                    : 503;
            return NextResponse.json(
                { error: error.message, code: error.code },
                { status },
            );
        }
        console.error('Failed to create CV document:', error);
        const message = getCreateCvErrorMessage(error);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
