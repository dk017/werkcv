import assert from "node:assert/strict";
import { randomBytes, randomUUID } from "node:crypto";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { acquireConsumerAiLease } from "./consumer-ai-limits";
import { saveCvDocumentWithMeaningfulStateUsingClient, type PersistenceClient } from "./cv-meaningful-persistence";
import { defaultCV } from "./cv";
import { createToolHandoffToken, toolHandoffHash } from "./tool-cv-handoff";
import { applyToolHandoff, HandoffError, reviewToolHandoff } from "./tool-handoff-service";

// Only a newly-created local test database is ever touched. No DATABASE_URL reads.
const name = "ai_safeguards_" + randomBytes(5).toString("hex") + "_test";
const password = randomBytes(24).toString("hex");
if (!/^ai_safeguards_[a-f0-9]+_test$/.test(name)) throw new Error("UNSAFE_TEST_NAME");
const admin = (sql: string) => execFileSync("docker", ["exec", "-i", name, "psql", "-U", "postgres", "-d", "postgres", "-v", "ON_ERROR_STOP=1"], { input: sql, stdio: ["pipe", "pipe", "pipe"] });
let connectionString = "";
let client: PrismaClient | undefined, pool: Pool | undefined;
let containerCreated = false, stage = "setup";
async function main() {
  execFileSync("docker", ["run", "--rm", "-d", "--name", name, "-p", "127.0.0.1::5432", "-e", "POSTGRES_HOST_AUTH_METHOD=trust", "postgres:16-alpine"], { stdio: "pipe" });
  containerCreated = true;
  let ready = false;
  for (let i = 0; i < 60; i++) {
    try { admin("SELECT 1;"); ready = true; break; } catch { await new Promise(resolve => setTimeout(resolve, 500)); }
  }
  if (!ready) throw new Error("TEST_DATABASE_STARTUP");
  const mapping = execFileSync("docker", ["port", name, "5432/tcp"], { encoding: "utf8" }).trim();
  if (!/^127\.0\.0\.1:\d+$/.test(mapping)) throw new Error("UNSAFE_TEST_PORT");
  connectionString = `postgresql://${name}:${password}@${mapping}/${name}`;
  admin(`CREATE ROLE "${name}" LOGIN PASSWORD '${password}';`);
  admin(`CREATE DATABASE "${name}" OWNER "${name}";`);
  stage = "migration";
  const require = createRequire(import.meta.url);
  execFileSync(process.execPath, [require.resolve("prisma/build/index.js"), "migrate", "deploy"], {
    env: { ...process.env, DATABASE_URL: connectionString }, stdio: ["ignore", "pipe", "pipe"],
  });
  pool = new Pool({ connectionString });
  const db = client = new PrismaClient({ adapter: new PrismaPg(pool) });
  stage = "limits";
  const first = await acquireConsumerAiLease(db, "account", "document", randomUUID(), 3);
  assert.ok(first.ok);
  const contenders = await Promise.all(Array.from({ length: 8 }, () => acquireConsumerAiLease(db, "account", "document", randomUUID(), 3)));
  assert.ok(contenders.every(r => !r.ok)); await first.release();
  const requestId = randomUUID();
  const second = await acquireConsumerAiLease(db, "account", "document", requestId, 3);
  assert.ok(second.ok); await second.release();
  const replay = await acquireConsumerAiLease(db, "account", "document", requestId, 3);
  assert.ok(!replay.ok && replay.code === "REQUEST_REPLAY");
  const third = await acquireConsumerAiLease(db, "account", "document", randomUUID(), 3);
  assert.ok(third.ok); await third.release();
  const limited = await acquireConsumerAiLease(db, "account", "other", randomUUID(), 3);
  assert.ok(!limited.ok && limited.code === "AI_DAILY_LIMIT");
  stage = "expiry";
  await db.$executeRaw`UPDATE "ConsumerAiAttempt" SET "startedAt" = CURRENT_TIMESTAMP - INTERVAL '25 hours'`;
  const old = await acquireConsumerAiLease(db, "account", "document", randomUUID(), 3);
  assert.ok(old.ok);
  await db.$executeRaw`UPDATE "ConsumerAiAttempt" SET "leaseUntil" = CURRENT_TIMESTAMP - INTERVAL '1 second'`;
  const renewed = await acquireConsumerAiLease(db, "account", "document", randomUUID(), 3);
  assert.ok(renewed.ok); await old.release();
  const busy = await acquireConsumerAiLease(db, "account", "document", randomUUID(), 3);
  assert.ok(!busy.ok && busy.code === "AI_BUSY"); await renewed.release();
  stage = "content-CAS";
  const user = await db.user.create({ data: { email: name + "@example.test" } });
  const cv = await db.cVDocument.create({ data: { title: "Fictional", userId: user.id, data: defaultCV as unknown as Prisma.InputJsonValue } });
  const results = await Promise.all(["first", "second"].map(label => saveCvDocumentWithMeaningfulStateUsingClient(db as unknown as PersistenceClient, {
    id: cv.id, where: { id: cv.id, userId: user.id, agencySubscriptionId: null, data: { equals: cv.data as Prisma.InputJsonValue } },
    data: { ...defaultCV, personal: { ...defaultCV.personal, summary: label + " fictional substantial customer service experience" } },
    source: "manual_save",
  })));
  assert.equal(results.filter(r => r.success).length, 1);
  assert.ok((await db.cVDocument.findUniqueOrThrow({ where: { id: cv.id } })).hasMeaningfulContent);
  assert.equal(await db.analyticsEvent.count({ where: { cvId: cv.id, event: "cv_meaningful_content_saved" } }), 1);
  stage = "tool-handoff-CAS";
  const handoffToken = createToolHandoffToken();
  await db.toolCvHandoff.create({ data: { tokenHash: toolHandoffHash(handoffToken), kind: "profile", locale: "nl", payload: { text: "Fictional profile with substantive customer-service detail." }, expiresAt: new Date(Date.now() + 60_000) } });
  const handoffReview = await reviewToolHandoff(db, handoffToken, user.id, cv.id);
  assert.equal(handoffReview.applied, false);
  if (handoffReview.applied) throw new Error("HANDOFF_REVIEW_SHAPE");
  const handoffApplied = await applyToolHandoff(db, handoffToken, user.id, cv.id, handoffReview.destination?.version ?? null);
  assert.equal(handoffApplied.applied, true);
  assert.deepEqual((await db.toolCvHandoff.findUniqueOrThrow({ where: { tokenHash: toolHandoffHash(handoffToken) } })).payload, {});
  const handoffRetry = await applyToolHandoff(db, handoffToken, user.id, cv.id, null);
  assert.deepEqual(handoffRetry, handoffApplied);
  const otherUser = await db.user.create({ data: { email: name + "+other@example.test" } });
  await assert.rejects(reviewToolHandoff(db, handoffToken, otherUser.id), (error: unknown) => error instanceof HandoffError && error.code === "UNAVAILABLE");
  console.log("PASS: full migrations, concurrent admission, quota, expiry, crash recovery, stale lease release, content CAS, meaningful event, account-bound handoff CAS and replay.");
}
main().catch((error: unknown) => {
  console.error("Integration failed at " + stage + " (credentials and content suppressed).");
  if (stage === "migration" && error && typeof error === "object" && "stderr" in error) {
    console.error(String(error.stderr).replaceAll(password, "[redacted]").replaceAll(connectionString, "[test database]").replace(/postgres(?:ql)?:\/\/\S+/g, "[database URL]"));
  }
  process.exitCode = 1;
}).finally(async () => {
  if (client) await client.$disconnect();
  if (pool) await pool.end().catch(() => undefined);
  // Only this run's isolated, randomly named container and anonymous volume.
  if (containerCreated) execFileSync("docker", ["rm", "-f", "-v", name], { stdio: "pipe" });
});
