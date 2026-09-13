import assert from "node:assert/strict";
import test from "node:test";
import { randomBytes } from "node:crypto";
import { cvContentVersion } from "./cv-content-version";
import { defaultCV } from "./cv";
import { applyToolHandoff, HandoffError, reviewToolHandoff } from "./tool-handoff-service";
import { toolHandoffHash } from "./tool-cv-handoff";

function clone<T>(value: T): T { return structuredClone(value); }
function equalJson(a: unknown, b: unknown): boolean { return JSON.stringify(a) === JSON.stringify(b); }

/** Small Prisma-shaped fake for the transaction-bound handoff contract. */
function fixture() {
  const userId = "user-a";
  const data = clone(defaultCV);
  data.personal.summary = "Fictional profile with customer service experience.";
  const cv = { id: "cv-a", userId, agencySubscriptionId: null, title: "My CV", data, hasMeaningfulContent: false };
  const token = randomBytes(32).toString("base64url");
  const row = { id: "handoff-a", tokenHash: toolHandoffHash(token), kind: "profile", locale: "en", payload: { text: "Fictional revised profile with enough substantive detail." }, expiresAt: new Date(Date.now() + 60_000), consumedAt: null as Date | null, consumedByUserId: null as string | null, appliedAt: null as Date | null, destinationCvId: null as string | null };
  const events = new Map<string, unknown>();
  const db = {} as Record<string, unknown>;
  Object.assign(db, {
    $transaction: async <T>(callback: (tx: Record<string, unknown>) => Promise<T>) => callback(db),
    $queryRaw: async () => [],
    toolCvHandoff: {
      findUnique: async ({ where }: { where: { tokenHash: string } }) => where.tokenHash === row.tokenHash ? row : null,
      update: async ({ data: patch }: { data: Record<string, unknown> }) => Object.assign(row, patch),
    },
    cVDocument: {
      findMany: async () => [cv],
      findFirst: async ({ where }: { where: { id?: string; userId?: string; agencySubscriptionId?: null } }) => where.id && where.id !== cv.id ? null : where.userId === userId && where.agencySubscriptionId === null ? cv : null,
      create: async ({ data: input }: { data: typeof cv }) => { Object.assign(cv, input); return cv; },
      updateMany: async ({ where, data: patch }: { where: Record<string, unknown>; data: Record<string, unknown> }) => {
        if (where.id !== cv.id || where.userId !== userId || where.agencySubscriptionId !== null) return { count: 0 };
        if (where.hasMeaningfulContent === false && cv.hasMeaningfulContent) return { count: 0 };
        const dataWhere = where.data as { equals?: unknown } | undefined;
        if (dataWhere?.equals !== undefined && !equalJson(dataWhere.equals, cv.data)) return { count: 0 };
        Object.assign(cv, patch);
        return { count: 1 };
      },
    },
    analyticsEvent: { upsert: async ({ where, create }: { where: { dedupeKey: string }; create: unknown }) => { events.set(where.dedupeKey, create); return create; } },
  });
  return { db, row, cv, token, userId, events };
}

test("handoff binds the token to the first authenticated account", async () => {
  const f = fixture();
  const review = await reviewToolHandoff(f.db as never, f.token, f.userId);
  assert.equal(review.applied, false);
  assert.equal(f.row.consumedByUserId, f.userId);
  await assert.rejects(reviewToolHandoff(f.db as never, f.token, "different-user"), (error: unknown) => error instanceof HandoffError && error.code === "UNAVAILABLE");
});

test("apply is CAS-protected, clears source payload and is safely retryable", async () => {
  const f = fixture();
  const review = await reviewToolHandoff(f.db as never, f.token, f.userId, f.cv.id);
  assert.equal(review.applied, false);
  if (review.applied) throw new Error("unexpected applied handoff");
  assert.equal(review.destination?.version, cvContentVersion(f.cv.data));
  const applied = await applyToolHandoff(f.db as never, f.token, f.userId, f.cv.id, review.destination!.version);
  assert.deepEqual(applied, { applied: true, cvId: f.cv.id, locale: "en" });
  assert.equal(f.row.payload && Object.keys(f.row.payload).length, 0);
  assert.equal(f.row.destinationCvId, f.cv.id);
  const retry = await applyToolHandoff(f.db as never, f.token, f.userId, f.cv.id, null);
  assert.deepEqual(retry, applied);
  assert.equal(f.events.size, 1);
});

test("a changed destination is rejected instead of overwriting newer CV text", async () => {
  const f = fixture();
  const review = await reviewToolHandoff(f.db as never, f.token, f.userId, f.cv.id);
  if (review.applied) throw new Error("unexpected applied handoff");
  f.cv.data.personal.summary = "A newer fictional edit.";
  await assert.rejects(applyToolHandoff(f.db as never, f.token, f.userId, f.cv.id, review.destination!.version), (error: unknown) => error instanceof HandoffError && error.code === "STALE_DOCUMENT");
  assert.equal(f.row.appliedAt, null);
});
