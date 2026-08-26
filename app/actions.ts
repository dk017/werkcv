'use server'

import { prisma } from '@/lib/prisma'
import { cvSchema, CVData, defaultCV } from '@/lib/cv'
import { buildCheckoutURL, CheckoutAddon, CheckoutProduct, parseCheckoutAddons, parseCheckoutProduct } from '@/lib/polar'
import { buildDodoCheckoutURL, isDodoEnabledForCheckout } from '@/lib/dodo'
import { getCurrentUser } from '@/lib/auth'
import { reportOpsIncident } from '@/lib/ops-alerts'
import { getResumeLanguage } from '@/lib/resume-language'
import { getDefaultThemeId } from '@/lib/templates/registry'
import { Prisma } from '@prisma/client'
import { createPersonalCvDocument } from '@/lib/workspace/cv-document-service'
import { authorizeCvDocument, CvAuthorizationError } from '@/lib/workspace/cv-authorization'
import { saveCvDocumentWithMeaningfulState, type MeaningfulSaveSource } from '@/lib/cv-meaningful-persistence'
import { revalidatePath } from 'next/cache'
import {
    buildPersonalCvPreview,
    personalCvLibraryQuerySchema,
    type PersonalCvLibraryResult,
    type PersonalCvLibrarySort,
} from '@/lib/cv-library'

const userCVListSelect = {
    id: true,
    title: true,
    templateId: true,
    colorThemeId: true,
    data: true,
    createdAt: true,
    updatedAt: true,
};

const paidOrderSelect = {
    cvId: true,
};

type UserCVListItem = {
    id: string;
    title: string;
    templateId: string;
    colorThemeId: string | null;
    data: unknown;
    createdAt: Date;
    updatedAt: Date;
};

type PaidOrderItem = {
    cvId: string | null;
};

export type CheckoutUrlResult =
    | { ok: true; url: string }
    | {
        ok: false;
        code: 'AUTH_REQUIRED' | 'NOT_FOUND' | 'CV_WORKSPACE_FORBIDDEN' | 'CHECKOUT_FAILED';
        reason?: string;
        supportNotified?: boolean;
    };

export async function createCV(templateId: string = 'professional', colorThemeId?: string, initialData?: CVData) {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('AUTH_REQUIRED');
    }

    // Validate initial data if provided, otherwise use blank default
    let cvData = defaultCV;
    if (initialData) {
        const parsed = cvSchema.safeParse(initialData);
        if (parsed.success) {
            cvData = parsed.data;
        }
    }

    const cv = await createPersonalCvDocument(user.id, {
        title: 'Mijn CV',
        // Prisma's JSON input type intentionally excludes `undefined`, while
        // CVData has a few optional sections. The schema has already validated
        // the value; this cast keeps the consumer path JSON-compatible.
        data: cvData as unknown as Prisma.InputJsonValue,
        templateId,
        colorThemeId: colorThemeId || getDefaultThemeId(templateId),
    })
    // Legacy callers can create a document with imported initial data. Route
    // that write through the same first-transition service as editor saves so
    // meaningful-content state and its idempotent event are not skipped.
    if (initialData) {
        await saveCvDocumentWithMeaningfulState({
            id: cv.id,
            where: { id: cv.id, userId: user.id, agencySubscriptionId: null },
            data: cvData,
            source: "initial_create",
            uiLanguage: cvData.personal.resumeLanguage === "en" ? "en" : "nl",
        });
    }
    return cv.id
}

export async function getCV(id: string, expectedWorkspace?: 'personal' | 'matchpack') {
    const user = await getCurrentUser();
    if (!user) return null;

    try {
        const cv = await authorizeCvDocument(user.id, id, 'read');
        if (expectedWorkspace && cv.workspace.kind !== expectedWorkspace) return null;
        return cv.data as unknown as CVData;
    } catch {
        return null;
    }
}

export async function getCVWithSettings(id: string, expectedWorkspace?: 'personal' | 'matchpack') {
    const user = await getCurrentUser();
    if (!user) return null;

    let cv;
    try {
        cv = await authorizeCvDocument(user.id, id, 'read');
    } catch {
        return null;
    }
    if (expectedWorkspace && cv.workspace.kind !== expectedWorkspace) return null;
    const isMatchPack = cv.workspace.kind === 'matchpack';
    const matchPackLocked = Boolean(cv.matchPack && (cv.matchPack.approvedAt || cv.matchPack.status === 'approved'));
    let canExport = !isMatchPack;
    if (isMatchPack) {
        try {
            await authorizeCvDocument(user.id, id, 'agency_export');
            canExport = true;
        } catch {
            canExport = false;
        }
    }
    return {
        data: cv.data as unknown as CVData,
        templateId: cv.templateId,
        colorThemeId: cv.colorThemeId ?? getDefaultThemeId(cv.templateId),
        agencyRouteLocked: isMatchPack,
        workspace: cv.workspace,
        workspaceContext: {
            kind: isMatchPack ? 'matchpack' as const : 'personal' as const,
            label: isMatchPack ? 'MatchPack' : 'Persoonlijke CV',
            backHref: isMatchPack ? '/agency/account' : '/mijn-cvs',
            canEdit: isMatchPack ? cv.role !== 'viewer' && !matchPackLocked : true,
            canEditDesign: isMatchPack ? cv.role !== 'viewer' && !matchPackLocked : true,
            canExport,
            downloadMode: isMatchPack ? 'matchpack_export' as const : 'personal_checkout' as const,
        },
    }
}

export async function updateCV(
    id: string,
    data: CVData,
    options: { source?: MeaningfulSaveSource; uiLanguage?: 'nl' | 'en' } = {},
) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    const parsed = cvSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: parsed.error }

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'edit_content');
        const where = authorised.workspace.kind === 'personal'
            ? { id, userId: user.id, agencySubscriptionId: null }
            : { id, agencySubscriptionId: authorised.workspace.agencySubscriptionId };
        return await saveCvDocumentWithMeaningfulState({
            id,
            where,
            data: parsed.data,
            source: options.source ?? 'manual_save',
            uiLanguage: options.uiLanguage ?? parsed.data.personal.resumeLanguage ?? 'nl',
        });
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}

export async function updateCVTemplate(id: string, templateId: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'edit_design');
        const where = authorised.workspace.kind === 'personal'
            ? { id, userId: user.id, agencySubscriptionId: null }
            : { id, agencySubscriptionId: authorised.workspace.agencySubscriptionId };
        const updated = await prisma.cVDocument.updateMany({ where, data: { templateId } });
        if (updated.count === 0) return { success: false, error: 'NOT_FOUND' };
        return { success: true }
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}

export async function updateCVColorTheme(id: string, colorThemeId: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'edit_design');
        const where = authorised.workspace.kind === 'personal'
            ? { id, userId: user.id, agencySubscriptionId: null }
            : { id, agencySubscriptionId: authorised.workspace.agencySubscriptionId };
        const updated = await prisma.cVDocument.updateMany({ where, data: { colorThemeId } });
        if (updated.count === 0) return { success: false, error: 'NOT_FOUND' };
        return { success: true }
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}

export async function checkPaymentStatus(cvId: string): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user) return false;

    try {
        await authorizeCvDocument(user.id, cvId, 'personal_download');
    } catch {
        return false;
    }

    const order = await prisma.order.findFirst({
        where: {
            cvId: cvId,
            paidAt: { not: null },
        },
    })
    return !!order
}

type PersonalCvCursor = {
    version: 1;
    sort: PersonalCvLibrarySort;
    id: string;
    value: string;
};

function encodePersonalCvCursor(item: UserCVListItem, sort: PersonalCvLibrarySort): string {
    const value = sort === 'updated_desc'
        ? item.updatedAt.toISOString()
        : sort === 'title_asc'
            ? item.title
            : item.createdAt.toISOString();
    const payload: PersonalCvCursor = { version: 1, sort, id: item.id, value };
    return Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
}

function decodePersonalCvCursor(value: string | undefined, sort: PersonalCvLibrarySort): PersonalCvCursor | null {
    if (!value) return null;
    try {
        const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as Partial<PersonalCvCursor>;
        if (parsed.version !== 1 || parsed.sort !== sort || typeof parsed.id !== 'string' || typeof parsed.value !== 'string') return null;
        if (!/^[a-zA-Z0-9_-]{1,120}$/.test(parsed.id) || parsed.value.length > 500) return null;
        if (sort !== 'title_asc' && Number.isNaN(new Date(parsed.value).getTime())) return null;
        return parsed as PersonalCvCursor;
    } catch {
        return null;
    }
}

function personalCvOrderBy(sort: PersonalCvLibrarySort): Prisma.CVDocumentOrderByWithRelationInput[] {
    if (sort === 'created_desc') return [{ createdAt: 'desc' }, { id: 'desc' }];
    if (sort === 'created_asc') return [{ createdAt: 'asc' }, { id: 'asc' }];
    if (sort === 'title_asc') return [{ title: 'asc' }, { id: 'asc' }];
    return [{ updatedAt: 'desc' }, { id: 'desc' }];
}

function personalCvCursorWhere(cursor: PersonalCvCursor): Prisma.CVDocumentWhereInput {
    if (cursor.sort === 'title_asc') {
        return { OR: [{ title: { gt: cursor.value } }, { title: cursor.value, id: { gt: cursor.id } }] };
    }
    const date = new Date(cursor.value);
    const field = cursor.sort === 'updated_desc' ? 'updatedAt' : 'createdAt';
    const direction = cursor.sort === 'created_asc' ? 'gt' : 'lt';
    return {
        OR: [
            { [field]: { [direction]: date } },
            { [field]: date, id: { [direction]: cursor.id } },
        ],
    };
}

export async function getUserCVs(input: unknown = {}): Promise<PersonalCvLibraryResult> {
    const user = await getCurrentUser();
    if (!user) return { ok: false, code: 'AUTH_REQUIRED', message: 'Log opnieuw in om je CV\'s te bekijken.' };

    const parsedQuery = personalCvLibraryQuerySchema.safeParse(input);
    if (!parsedQuery.success) {
        return { ok: false, code: 'VALIDATION_ERROR', message: 'Controleer de zoekterm en sortering.' };
    }
    const query = { ...parsedQuery.data, limit: 12 as const };
    const cursor = decodePersonalCvCursor(query.cursor, query.sort);
    if (query.cursor && !cursor) {
        return { ok: false, code: 'INVALID_CURSOR', message: 'Deze lijstpositie is niet meer geldig. Laad de lijst opnieuw.' };
    }

    const baseWhere: Prisma.CVDocumentWhereInput = {
        userId: user.id,
        agencySubscriptionId: null,
        ...(query.query ? { title: { contains: query.query, mode: 'insensitive' as const } } : {}),
    };
    const where: Prisma.CVDocumentWhereInput = cursor
        ? { AND: [baseWhere, personalCvCursorWhere(cursor)] }
        : baseWhere;

    try {
        const [records, totalCount] = await Promise.all([
            prisma.cVDocument.findMany({
                where,
                orderBy: personalCvOrderBy(query.sort),
                take: query.limit + 1,
                select: userCVListSelect,
            }),
            prisma.cVDocument.count({ where: baseWhere }),
        ]);
        const hasMore = records.length > query.limit;
        const cvs = records.slice(0, query.limit);

        const cvIds = cvs.map((cv: UserCVListItem) => cv.id);
        const paidOrders = cvIds.length ? await prisma.order.findMany({
            where: { cvId: { in: cvIds }, paidAt: { not: null } },
            select: paidOrderSelect,
        }) : [];
        const paidCvIds = new Set(
            paidOrders.flatMap((order: PaidOrderItem) => (order.cvId ? [order.cvId] : []))
        );

        return {
            ok: true,
            items: cvs.map((cv: UserCVListItem) => ({
                id: cv.id,
                title: cv.title,
                templateId: cv.templateId,
                colorThemeId: cv.colorThemeId ?? getDefaultThemeId(cv.templateId),
                previewData: buildPersonalCvPreview(cv.data),
                createdAt: cv.createdAt.toISOString(),
                updatedAt: cv.updatedAt.toISOString(),
                isPaid: paidCvIds.has(cv.id),
            })),
            nextCursor: hasMore && cvs.length ? encodePersonalCvCursor(cvs[cvs.length - 1], query.sort) : null,
            totalCount,
            query: query.query,
            sort: query.sort,
        };
    } catch {
        return { ok: false, code: 'LOAD_FAILED', message: 'Je CV\'s konden niet worden geladen. Probeer het opnieuw.' };
    }
}

export async function deleteCV(id: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false };

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'delete');
        if (authorised.workspace.kind !== 'personal') {
            return { success: false, error: 'CV_WORKSPACE_FORBIDDEN' };
        }
        const deleted = await prisma.cVDocument.deleteMany({
            where: { id, userId: user.id, agencySubscriptionId: null },
        });
        if (deleted.count > 0) {
            revalidatePath('/mijn-cvs');
            return { success: true };
        }
        return { success: false, error: 'NOT_FOUND' };
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}


export async function renameCV(id: string, title: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    const safeTitle = title.trim();
    if (!safeTitle) return { success: false, error: 'TITLE_REQUIRED' };
    if (safeTitle.length > 80) return { success: false, error: 'TITLE_TOO_LONG' };

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'edit_content');
        if (authorised.workspace.kind !== 'personal') {
            return { success: false, error: 'CV_WORKSPACE_FORBIDDEN' };
        }
        const updated = await prisma.cVDocument.updateMany({
            where: { id, userId: user.id, agencySubscriptionId: null },
            data: { title: safeTitle },
        });
        if (updated.count > 0) {
            revalidatePath('/mijn-cvs');
            return { success: true };
        }
        return { success: false, error: 'NOT_FOUND' };
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}

export async function duplicateCV(id: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    try {
        const authorised = await authorizeCvDocument(user.id, id, 'read');
        if (authorised.workspace.kind !== 'personal') {
            return { success: false, error: 'CV_WORKSPACE_FORBIDDEN' };
        }
        const sourceTitle = authorised.title?.trim() || 'Naamloos CV';
        const suffix = ' – kopie';
        const copy = await createPersonalCvDocument(user.id, {
            title: sourceTitle.slice(0, 80 - suffix.length) + suffix,
            data: authorised.data as unknown as Prisma.InputJsonValue,
            templateId: authorised.templateId,
            colorThemeId: authorised.colorThemeId ?? getDefaultThemeId(authorised.templateId),
        });
        revalidatePath('/mijn-cvs');
        return { success: true, id: copy.id };
    } catch (error) {
        return { success: false, error: error instanceof CvAuthorizationError ? error.code : 'NOT_FOUND' };
    }
}

export async function getCheckoutURL(
    cvId: string,
    email?: string,
    addons: CheckoutAddon[] = [],
    checkoutProduct: CheckoutProduct = 'cv-download'
): Promise<CheckoutUrlResult> {
    const user = await getCurrentUser();
    if (!user) {
        return { ok: false, code: 'AUTH_REQUIRED' };
    }
    let owned;
    try {
        owned = await authorizeCvDocument(user.id, cvId, 'personal_checkout');
    } catch (error) {
        if (error instanceof CvAuthorizationError && error.code === 'CV_WORKSPACE_FORBIDDEN') {
            return { ok: false, code: 'CV_WORKSPACE_FORBIDDEN' };
        }
        return { ok: false, code: 'NOT_FOUND' };
    }

    const safeAddons = parseCheckoutAddons(addons);
    const safeProduct = parseCheckoutProduct(checkoutProduct);
    const resumeLanguage = getResumeLanguage(owned.data as CVData);
    const paymentProvider = isDodoEnabledForCheckout(safeProduct, safeAddons) ? 'dodo' : 'polar';
    try {
        let url: string;
        if (paymentProvider === 'dodo') {
            const checkout = await buildDodoCheckoutURL(cvId, email || user.email, resumeLanguage);
            url = checkout.checkoutUrl;

            if (checkout.sessionId) {
                try {
                    await prisma.paymentCheckout.upsert({
                        where: { externalCheckoutId: checkout.sessionId },
                        update: {
                            cvId,
                            email: email || user.email,
                            siteHost: checkout.siteHost,
                            product: safeProduct,
                        },
                        create: {
                            provider: 'dodo',
                            externalCheckoutId: checkout.sessionId,
                            cvId,
                            email: email || user.email,
                            siteHost: checkout.siteHost,
                            product: safeProduct,
                        },
                    });
                } catch (persistError) {
                    console.error('dodo_checkout_session_persist_failed', persistError);
                }
            }
        } else {
            url = await buildCheckoutURL(cvId, email || user.email, safeAddons, resumeLanguage, safeProduct);
        }
        return { ok: true, url };
    } catch (error) {
        const { supportNotified } = await reportOpsIncident({
            event: 'ops_checkout_create_failed',
            route: '/app/actions#getCheckoutURL',
            stage: `${paymentProvider}_checkout_create`,
            error,
            cvId,
            userId: user.id,
            userEmail: user.email,
            cluster: owned.sourceCluster,
            startSource: owned.startSource,
            locale: owned.sourceLocale === 'en' ? 'en' : 'nl',
            notifyUser: true,
            context: {
                addons: safeAddons,
                product: safeProduct,
                paymentProvider,
            },
        });

        return {
            ok: false,
            code: 'CHECKOUT_FAILED',
            reason: error instanceof Error ? error.message.slice(0, 160) : 'unknown',
            supportNotified,
        };
    }
}
