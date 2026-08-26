import type { Prisma } from "@prisma/client";
import { getCompletionState } from "./cv-completion";
import type { CVData } from "./cv";
import { getMeaningfulCvState } from "./cv-meaningful";
import { prisma } from "./prisma";

export type MeaningfulSaveSource =
    | "manual_save"
    | "auto_save"
    | "upload"
    | "download"
    | "public_claim"
    | "import"
    | "initial_create";

export type SaveCvDocumentInput = {
    id: string;
    where: Prisma.CVDocumentWhereInput;
    data: CVData;
    source: MeaningfulSaveSource;
    uiLanguage?: "nl" | "en";
};

export type SaveCvDocumentResult =
    | { success: true; meaningfulTransitionRecorded: boolean }
    | { success: false; error: "NOT_FOUND" };

export type PersistenceTransactionClient = {
    cVDocument: {
        updateMany: (args: { where: Prisma.CVDocumentWhereInput; data: Record<string, unknown> }) => Promise<{ count: number }>;
    };
    analyticsEvent: {
        upsert: (args: Record<string, unknown>) => Promise<unknown>;
    };
};

export type PersistenceClient = {
    $transaction: <T>(callback: (tx: PersistenceTransactionClient) => Promise<T>) => Promise<T>;
};

export function meaningfulEventDedupeKey(cvId: string): string {
    return `cv_meaningful_content_saved:${cvId}`;
}

/**
 * Save CV data and record the first meaningful transition in one transaction.
 * The conditional update is the concurrency gate: exactly one writer can
 * transition a document whose hasMeaningfulContent flag is still false.
 */
export async function saveCvDocumentWithMeaningfulStateUsingClient(
    client: PersistenceClient,
    {
    id,
    where,
    data,
    source,
    uiLanguage = "nl",
    }: SaveCvDocumentInput,
): Promise<SaveCvDocumentResult> {
    const meaningfulState = getMeaningfulCvState(data);
    const completionScore = Math.max(0, Math.min(100, Math.round(getCompletionState(data, uiLanguage).score)));
    const locale = uiLanguage;

    return client.$transaction(async (tx) => {
        const updated = await tx.cVDocument.updateMany({
            where,
            data: { data: data as unknown as Prisma.InputJsonValue },
        });
        if (updated.count === 0) return { success: false, error: "NOT_FOUND" };
        if (!meaningfulState.isMeaningful) {
            return { success: true, meaningfulTransitionRecorded: false };
        }

        const transition = await tx.cVDocument.updateMany({
            where: { ...where, id, hasMeaningfulContent: false },
            data: {
                hasMeaningfulContent: true,
                meaningfulContentAt: new Date(),
                meaningfulContentSignals: {
                    profileSummary: meaningfulState.signals.profileSummary,
                    experience: meaningfulState.signals.experience,
                    education: meaningfulState.signals.education,
                    skills: meaningfulState.signals.skills,
                    languages: meaningfulState.signals.languages,
                    otherSections: meaningfulState.signals.otherSections,
                } as Prisma.InputJsonValue,
            },
        });

        // Upsert even when another request already completed the transition.
        // This repairs a missing event after an interrupted public-claim flow,
        // while the unique dedupe key still guarantees one durable event row.
        await tx.analyticsEvent.upsert({
            where: { dedupeKey: meaningfulEventDedupeKey(id) },
            create: {
                event: "cv_meaningful_content_saved",
                dedupeKey: meaningfulEventDedupeKey(id),
                cvId: id,
                properties: {
                    schemaVersion: 2,
                    source,
                    completionScore,
                    signalCount: Object.values(meaningfulState.signals).filter(Boolean).length,
                    contentSignals: meaningfulState.signals,
                    locale,
                } as Prisma.InputJsonValue,
            },
            update: {},
        });

        return { success: true, meaningfulTransitionRecorded: transition.count === 1 };
    });
}

export function saveCvDocumentWithMeaningfulState(input: SaveCvDocumentInput): Promise<SaveCvDocumentResult> {
    return saveCvDocumentWithMeaningfulStateUsingClient(prisma as unknown as PersistenceClient, input);
}
