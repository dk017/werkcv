import { createHash, randomUUID } from "node:crypto";
import type { Prisma, PrismaClient } from "@prisma/client";

export type AiLimitCode = "AI_BUSY" | "AI_DAILY_LIMIT" | "REQUEST_REPLAY";
type Database = Pick<PrismaClient, "$transaction" | "$executeRaw">;
export function aiDailyLimit(value = process.env.CONSUMER_AI_DAILY_LIMIT): number {
  const parsed = Number(value ?? 30);
  return Number.isInteger(parsed) && parsed > 0 && parsed <= 100 ? parsed : 30;
}
const key = (scope: string, id: string) => createHash("sha256").update(scope + ":" + id).digest("hex");

/** One shared DB transaction serialises admission across all app instances. Fail closed. */
export async function acquireConsumerAiLease(
  db: Database, userId: string, cvId: string, requestId: string, limit = aiDailyLimit(),
): Promise<{ ok: false; code: AiLimitCode } | { ok: true; release: () => Promise<void> }> {
  const accountKey = key("ai-account", userId);
  const documentKey = key("ai-document", cvId);
  const id = randomUUID();
  const admission = await db.$transaction(async (tx: Prisma.TransactionClient) => {
    const [lock] = await tx.$queryRaw<Array<{ acquired: boolean }>>
      `SELECT pg_try_advisory_xact_lock(714209, 1) AS acquired`;
    if (!lock.acquired) return "AI_BUSY" as const;
    await tx.$executeRaw`DELETE FROM "ConsumerAiAttempt" WHERE "startedAt" <= CURRENT_TIMESTAMP - INTERVAL '24 hours'`;
    const [state] = await tx.$queryRaw<Array<{ attempts: number; replay: boolean; busy: boolean }>>`
      SELECT
        (SELECT COUNT(*)::int FROM "ConsumerAiAttempt" WHERE "accountKey" = ${accountKey}) AS attempts,
        EXISTS(SELECT 1 FROM "ConsumerAiAttempt" WHERE "accountKey" = ${accountKey} AND "requestId" = ${requestId}) AS replay,
        (EXISTS(SELECT 1 FROM "ConsumerAiAttempt" WHERE "documentKey" = ${documentKey} AND "leaseUntil" > CURRENT_TIMESTAMP)
        OR (SELECT COUNT(*) FROM "ConsumerAiAttempt" WHERE "leaseUntil" > CURRENT_TIMESTAMP) >= 10) AS busy
    `;
    if (state.replay) return "REQUEST_REPLAY" as const;
    if (state.attempts >= limit) return "AI_DAILY_LIMIT" as const;
    if (state.busy) return "AI_BUSY" as const;
    await tx.$executeRaw`
      INSERT INTO "ConsumerAiAttempt" ("id", "accountKey", "documentKey", "requestId", "leaseUntil")
      VALUES (${id}, ${accountKey}, ${documentKey}, ${requestId}, CURRENT_TIMESTAMP + INTERVAL '60 seconds')
    `;
    return null;
  }, { timeout: 5000, maxWait: 2000 });
  if (admission) return { ok: false, code: admission };
  return { ok: true, release: async () => {
    // Release only this request's lease. An expired worker cannot release a newer lease.
    await db.$executeRaw`UPDATE "ConsumerAiAttempt" SET "leaseUntil" = CURRENT_TIMESTAMP WHERE "id" = ${id}`;
  } };
}
