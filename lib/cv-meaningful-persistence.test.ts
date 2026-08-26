import assert from "node:assert/strict";
import test from "node:test";
import { defaultCV } from "./cv";
import {
  meaningfulEventDedupeKey,
  saveCvDocumentWithMeaningfulStateUsingClient,
  type PersistenceClient,
  type PersistenceTransactionClient,
} from "./cv-meaningful-persistence";

function dataWithExperience() {
  return {
    ...defaultCV,
    personal: { ...defaultCV.personal, name: "Fictional Candidate" },
    experience: [{ role: "Designer", company: "Example BV", location: "", start: "2020", end: "2024", description: "", highlights: [] }],
  };
}

test("meaningful persistence converges repeated writes on one deduplicated event", async () => {
  let transitionCount = 1;
  const events: unknown[] = [];
  const tx: PersistenceTransactionClient = {
    cVDocument: {
      async updateMany(args) {
        if (args.data.hasMeaningfulContent) return { count: Math.max(0, transitionCount--) };
        return { count: 1 };
      },
    },
    analyticsEvent: {
      async upsert(args) {
        events.push(args);
      },
    },
  };
  const client: PersistenceClient = {
    async $transaction<T>(callback: (transaction: PersistenceTransactionClient) => Promise<T>): Promise<T> {
      return callback(tx);
    },
  };

  const first = await saveCvDocumentWithMeaningfulStateUsingClient(client, {
    id: "cv-1",
    where: { id: "cv-1" },
    data: dataWithExperience(),
    source: "manual_save",
  });
  const second = await saveCvDocumentWithMeaningfulStateUsingClient(client, {
    id: "cv-1",
    where: { id: "cv-1" },
    data: dataWithExperience(),
    source: "auto_save",
  });

  assert.deepEqual(first, { success: true, meaningfulTransitionRecorded: true });
  assert.deepEqual(second, { success: true, meaningfulTransitionRecorded: false });
  assert.equal(events.length, 2);
  const event = events[0] as { where: { dedupeKey: string }; create: { properties: Record<string, unknown> } };
  const retryEvent = events[1] as { where: { dedupeKey: string } };
  assert.equal(event.where.dedupeKey, meaningfulEventDedupeKey("cv-1"));
  assert.equal(retryEvent.where.dedupeKey, meaningfulEventDedupeKey("cv-1"));
  assert.equal(event.create.properties.schemaVersion, 2);
  assert.equal((event.create.properties.contentSignals as Record<string, unknown>).profileSummary, false);
  assert.equal("experienceText" in event.create.properties, false);
});

test("identity-only saves never transition durable meaningful state", async () => {
  let updateCalls = 0;
  const tx: PersistenceTransactionClient = {
    cVDocument: { async updateMany() { updateCalls += 1; return { count: 1 }; } },
    analyticsEvent: { async upsert() { throw new Error("must not create event"); } },
  };
  const client: PersistenceClient = {
    async $transaction<T>(callback: (transaction: PersistenceTransactionClient) => Promise<T>): Promise<T> {
      return callback(tx);
    },
  };

  const result = await saveCvDocumentWithMeaningfulStateUsingClient(client, {
    id: "cv-identity",
    where: { id: "cv-identity" },
    data: { ...defaultCV, personal: { ...defaultCV.personal, name: "Only a name" } },
    source: "manual_save",
  });

  assert.deepEqual(result, { success: true, meaningfulTransitionRecorded: false });
  assert.equal(updateCalls, 1);
});
