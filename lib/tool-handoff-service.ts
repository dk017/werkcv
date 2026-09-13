import { Prisma, type PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { cvSchema, defaultCV } from "./cv";
import { cvContentVersion } from "./cv-content-version";
import { toolHandoffHash, toolHandoffInput } from "./tool-cv-handoff";
import { saveCvDocumentWithMeaningfulStateUsingClient, type PersistenceClient, type PersistenceTransactionClient } from "./cv-meaningful-persistence";

export class HandoffError extends Error {
  constructor(readonly code: "UNAVAILABLE" | "STALE_DOCUMENT" | "NOT_FOUND", readonly status = 409) { super(code); }
}
async function locked(tx: Prisma.TransactionClient, token: string, userId: string) {
  const hash = toolHandoffHash(token);
  await tx.$queryRaw`SELECT "id" FROM "ToolCvHandoff" WHERE "tokenHash" = ${hash} FOR UPDATE`;
  const row = await tx.toolCvHandoff.findUnique({ where: { tokenHash: hash } });
  if (!row || row.expiresAt <= new Date() || (row.consumedByUserId && row.consumedByUserId !== userId)) throw new HandoffError("UNAVAILABLE", 410);
  if (!row.consumedByUserId) await tx.toolCvHandoff.update({ where: { id: row.id }, data: { consumedAt: new Date(), consumedByUserId: userId } });
  return row;
}
async function appliedDestination(tx: Prisma.TransactionClient, row: { destinationCvId: string | null; locale: string }, userId: string) {
  const cv = await tx.cVDocument.findFirst({ where: { id: row.destinationCvId!, userId, agencySubscriptionId: null }, select: { id: true } });
  if (!cv) throw new HandoffError("NOT_FOUND", 404);
  return { applied: true as const, cvId: cv.id, locale: row.locale };
}
export async function reviewToolHandoff(db: PrismaClient, token: string, userId: string, cvId?: string) {
  return db.$transaction(async tx => {
    const row = await locked(tx, token, userId);
    if (row.appliedAt) return appliedDestination(tx, row, userId);
    const handoff = toolHandoffInput.parse({ kind: row.kind, locale: row.locale, payload: row.payload });
    const documents = await tx.cVDocument.findMany({ where: { userId, agencySubscriptionId: null }, orderBy: [{ updatedAt: "desc" }, { id: "asc" }], take: 100, select: { id: true, title: true } });
    const cv = cvId ? await tx.cVDocument.findFirst({ where: { id: cvId, userId, agencySubscriptionId: null }, select: { id: true, title: true, data: true } }) : null;
    if (cvId && !cv) throw new HandoffError("NOT_FOUND", 404);
    const data = cv ? cvSchema.parse(cv.data) : null;
    return { applied: false as const, handoff, documents, expiresAt: row.expiresAt.toISOString(), destination: cv && data ? { id: cv.id, title: cv.title, summary: data.personal.summary, language: data.personal.resumeLanguage, version: cvContentVersion(cv.data) } : null };
  });
}
export async function applyToolHandoff(db: PrismaClient, token: string, userId: string, cvId: string | null, version: string | null) {
  return db.$transaction(async tx => {
    const row = await locked(tx, token, userId);
    if (row.appliedAt) return appliedDestination(tx, row, userId);
    const handoff = toolHandoffInput.parse({ kind: row.kind, locale: row.locale, payload: row.payload });
    const cv = cvId ? await tx.cVDocument.findFirst({ where: { id: cvId, userId, agencySubscriptionId: null } }) : null;
    if (cvId && !cv) throw new HandoffError("NOT_FOUND", 404);
    if (cv && cvContentVersion(cv.data) !== version) throw new HandoffError("STALE_DOCUMENT");
    const data = cv ? cvSchema.parse(cv.data) : { ...structuredClone(defaultCV), personal: { ...defaultCV.personal, resumeLanguage: handoff.locale } };
    if (handoff.kind === "profile") data.personal.summary = handoff.payload.text;
    else data.experience.push({ entryId: randomUUID(), role: handoff.payload.role, company: handoff.payload.company, location: "", start: "", end: "", description: "", highlights: handoff.payload.bullets });
    const destination = cv || await tx.cVDocument.create({ data: { title: handoff.locale === "en" ? "My CV" : "Mijn CV", userId, agencySubscriptionId: null, data: defaultCV as Prisma.InputJsonValue, startSource: "free_tool_handoff", sourceLocale: handoff.locale } });
    // The shared persistence helper deliberately depends on the small subset
    // of Prisma used for a CV save. Keep this adapter narrow so the handoff
    // and its CV update stay inside the same transaction.
    const saved = await saveCvDocumentWithMeaningfulStateUsingClient({
      $transaction: async callback => callback(tx as unknown as PersistenceTransactionClient),
    } as PersistenceClient, {
      id: destination.id, where: { id: destination.id, userId, agencySubscriptionId: null, data: { equals: destination.data as Prisma.InputJsonValue } }, data, source: "import", uiLanguage: handoff.locale,
    });
    if (!saved.success) throw new HandoffError("STALE_DOCUMENT");
    await tx.toolCvHandoff.update({ where: { id: row.id }, data: { appliedAt: new Date(), destinationCvId: destination.id, payload: {} } });
    return { applied: true as const, cvId: destination.id, locale: handoff.locale };
  });
}
