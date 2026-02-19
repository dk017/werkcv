'use server'

import { prisma } from '@/lib/prisma'
import { cvSchema, CVData, defaultCV } from '@/lib/cv'
import { buildCheckoutURL, CheckoutAddon, parseCheckoutAddons } from '@/lib/polar'
import { getCurrentUser } from '@/lib/auth'

export async function createCV(templateId: string = 'professional', colorThemeId: string = 'classic-blue', initialData?: CVData) {
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

    const cv = await prisma.cVDocument.create({
        data: {
            title: 'Mijn CV',
            data: cvData,
            templateId,
            colorThemeId,
            userId: user.id,
        }
    })
    return cv.id
}

export async function getCV(id: string) {
    const user = await getCurrentUser();
    if (!user) return null;

    const cv = await prisma.cVDocument.findFirst({ where: { id, userId: user.id } })
    if (!cv) return null
    return cv.data as unknown as CVData
}

export async function getCVWithSettings(id: string) {
    const user = await getCurrentUser();
    if (!user) return null;

    const cv = await prisma.cVDocument.findFirst({ where: { id, userId: user.id } })
    if (!cv) return null
    return {
        data: cv.data as unknown as CVData,
        templateId: cv.templateId,
        colorThemeId: cv.colorThemeId ?? 'classic-blue',
    }
}

export async function updateCV(id: string, data: CVData) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    const parsed = cvSchema.safeParse(data)
    if (!parsed.success) return { success: false, error: parsed.error }

    const updated = await prisma.cVDocument.updateMany({
        where: { id, userId: user.id },
        data: { data: parsed.data }
    })
    if (updated.count === 0) return { success: false, error: 'NOT_FOUND' };
    return { success: true }
}

export async function updateCVTemplate(id: string, templateId: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    const updated = await prisma.cVDocument.updateMany({
        where: { id, userId: user.id },
        data: { templateId }
    })
    if (updated.count === 0) return { success: false, error: 'NOT_FOUND' };
    return { success: true }
}

export async function updateCVColorTheme(id: string, colorThemeId: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'AUTH_REQUIRED' };

    const updated = await prisma.cVDocument.updateMany({
        where: { id, userId: user.id },
        data: { colorThemeId }
    })
    if (updated.count === 0) return { success: false, error: 'NOT_FOUND' };
    return { success: true }
}

export async function checkPaymentStatus(cvId: string): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user) return false;

    const owned = await prisma.cVDocument.findFirst({
        where: { id: cvId, userId: user.id },
        select: { id: true },
    });
    if (!owned) return false;

    const order = await prisma.order.findFirst({
        where: {
            cvId: cvId,
            paidAt: { not: null },
        },
    })
    return !!order
}

export async function getUserCVs() {
    const user = await getCurrentUser();
    if (!user) return [];

    const cvs = await prisma.cVDocument.findMany({
        where: { userId: user.id },
        orderBy: { updatedAt: 'desc' },
        select: {
            id: true,
            title: true,
            templateId: true,
            colorThemeId: true,
            data: true,
            updatedAt: true,
        },
    });

    const cvIds = cvs.map((cv) => cv.id);
    const paidOrders = await prisma.order.findMany({
        where: { cvId: { in: cvIds }, paidAt: { not: null } },
        select: { cvId: true },
    });
    const paidCvIds = new Set(paidOrders.map((o) => o.cvId));

    return cvs.map((cv) => ({
        ...cv,
        isPaid: paidCvIds.has(cv.id),
    }));
}

export async function deleteCV(id: string) {
    const user = await getCurrentUser();
    if (!user) return { success: false };

    await prisma.cVDocument.deleteMany({ where: { id, userId: user.id } });
    return { success: true };
}

export async function getCheckoutURL(
    cvId: string,
    email?: string,
    addons: CheckoutAddon[] = []
): Promise<string> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('AUTH_REQUIRED');
    }
    const owned = await prisma.cVDocument.findFirst({
        where: { id: cvId, userId: user.id },
        select: { id: true },
    });
    if (!owned) {
        throw new Error('NOT_FOUND');
    }

    const safeAddons = parseCheckoutAddons(addons);
    return buildCheckoutURL(cvId, email, safeAddons)
}
