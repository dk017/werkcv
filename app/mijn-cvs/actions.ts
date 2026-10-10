'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { createEditorDraft } from '@/lib/editor-drafts';
import { duplicateCV, renameCV } from '@/app/actions';

const newCvSchema = z.object({
    title: z.string().trim().max(80).default(''),
    start: z.enum(['blank', 'upload', 'copy']),
    sourceCvId: z.string().trim().max(64).optional(),
    locale: z.enum(['nl', 'en']).default('nl'),
}).strict();

export type NewCvStart = z.infer<typeof newCvSchema>['start'];

export type CreateCvFromDashboardResult =
    | { ok: true; id: string }
    | { ok: false; message: string };

const MESSAGES = {
    nl: {
        auth: 'Log opnieuw in om een CV te maken.',
        invalid: 'Controleer de naam van je CV.',
        chooseCopy: 'Kies het CV dat je wilt kopiëren.',
        copyFailed: 'Dit CV kon niet worden gekopieerd.',
        createFailed: 'Je CV kon niet worden aangemaakt. Probeer het opnieuw.',
    },
    en: {
        auth: 'Log in again to create a CV.',
        invalid: 'Check the name of your CV.',
        chooseCopy: 'Choose the CV you want to copy.',
        copyFailed: 'This CV could not be copied.',
        createFailed: 'Your CV could not be created. Please try again.',
    },
} as const;

export async function createCvFromDashboard(input: unknown): Promise<CreateCvFromDashboardResult> {
    const requestedLocale = (input as { locale?: unknown } | null)?.locale === 'en' ? 'en' : 'nl';
    const user = await getCurrentUser();
    if (!user) return { ok: false, message: MESSAGES[requestedLocale].auth };

    const parsed = newCvSchema.safeParse(input);
    if (!parsed.success) return { ok: false, message: MESSAGES[requestedLocale].invalid };
    const { title, start, sourceCvId, locale } = parsed.data;
    const m = MESSAGES[locale];

    let id: string;
    if (start === 'copy') {
        if (!sourceCvId) return { ok: false, message: m.chooseCopy };
        const copy = await duplicateCV(sourceCvId);
        if (!copy.success || !copy.id) return { ok: false, message: m.copyFailed };
        id = copy.id;
    } else {
        try {
            id = await createEditorDraft({
                templateId: 'professional',
                uiLanguage: locale,
                startSource: start === 'upload' ? 'dashboard_upload' : 'dashboard_blank',
            });
        } catch {
            return { ok: false, message: m.createFailed };
        }
    }

    if (title) {
        // The CV exists either way; a failed rename only leaves the default name.
        await renameCV(id, title);
    }
    return { ok: true, id };
}

export type CoverLetterListItem = {
    cvId: string;
    cvTitle: string;
    name: string;
    updatedAt: string;
};

export async function getUserCoverLetters(): Promise<CoverLetterListItem[]> {
    const user = await getCurrentUser();
    if (!user) return [];

    const rows = await prisma.cVDocument.findMany({
        where: { userId: user.id, agencySubscriptionId: null, coverLetter: { not: null } },
        select: { id: true, title: true, data: true, coverLetter: true, coverLetterUpdatedAt: true, updatedAt: true },
        orderBy: [{ coverLetterUpdatedAt: { sort: 'desc', nulls: 'last' } }, { updatedAt: 'desc' }],
        take: 50,
    });

    return rows
        .filter((row) => (row.coverLetter || '').trim().length > 0)
        .map((row) => {
            const personal = (row.data as { personal?: { name?: unknown } } | null)?.personal;
            return {
                cvId: row.id,
                cvTitle: row.title?.trim() || '',
                name: typeof personal?.name === 'string' ? personal.name.trim().slice(0, 120) : '',
                updatedAt: (row.coverLetterUpdatedAt || row.updatedAt).toISOString(),
            };
        });
}
