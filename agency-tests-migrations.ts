import { readFile, readdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { Client } from "pg";
import { requireAgencyTestDatabase } from "./scripts/agency-tests-db-guard";

/** Throw-away clean/upgrade/backup rehearsal for the Agency migration chain. */
const TARGET_MIGRATION = "20260903000000_agency_plan_99_300";
const { url, runId } = requireAgencyTestDatabase();
const baseUrl = new URL(url);
const migrationsUrl = new URL("./prisma/migrations/", import.meta.url);
const adminDatabase = process.env.AGENCY_TEST_ADMIN_DATABASE || "postgres";
const fixtureIds = {
  currentSubscription: "clagencyfixturecurrent000000001",
  customSubscription: "clagencyfixturecustom00000002",
  zeroSubscription: "clagencyfixturezero00000000003",
  cancelledSubscription: "clagencyfixturecancelled000004",
  currentPeriod: "clusagefixturecurrent00000001",
  futurePeriod: "clusagefixturefuture000000002",
  expiredPeriod: "clusagefixtureexpired0000003",
  customPeriod: "clusagefixturecustom0000004",
} as const;

function sourceDatabaseName() {
  const name = baseUrl.pathname.replace(/^\//u, "");
  if (!/^[a-z0-9_]+$/u.test(name)) throw new Error("UNSAFE_SOURCE_DATABASE_NAME");
  if (Buffer.byteLength(name, "utf8") > 63) throw new Error("SOURCE_DATABASE_NAME_TOO_LONG");
  return name;
}

function generatedDatabaseName(kind: "empty" | "legacy" | "restore") {
  const suffix = `_${runId}_${kind}_ci`;
  const maximumPrefixBytes = 63 - Buffer.byteLength(suffix, "utf8");
  if (maximumPrefixBytes < 1) throw new Error("RUN_ID_TOO_LONG_FOR_DATABASE_NAME");
  const prefix = sourceDatabaseName().slice(0, maximumPrefixBytes).replace(/_+$/u, "") || "agency";
  const name = `${prefix}${suffix}`;
  if (!/^[a-z0-9_]+$/u.test(name) || Buffer.byteLength(name, "utf8") > 63) {
    throw new Error("UNSAFE_GENERATED_DATABASE_NAME");
  }
  return name;
}

const databaseNames = {
  empty: generatedDatabaseName("empty"),
  legacy: generatedDatabaseName("legacy"),
  restore: generatedDatabaseName("restore"),
};

function databaseUrl(name: string) {
  const next = new URL(baseUrl);
  next.pathname = `/${name}`;
  return next.toString();
}

function quotedIdentifier(value: string) {
  if (!/^[a-z0-9_]+$/u.test(value)) throw new Error("UNSAFE_DATABASE_IDENTIFIER");
  if (Buffer.byteLength(value, "utf8") > 63) throw new Error("DATABASE_IDENTIFIER_TOO_LONG");
  return `"${value}"`;
}

function runPrisma(args: string[], database: string) {
  const result = spawnSync(process.execPath, ["node_modules/prisma/build/index.js", ...args], {
    cwd: process.cwd(),
    env: { ...process.env, DATABASE_URL: database, AGENCY_TEST_DATABASE_URL: database },
    encoding: "utf8",
    stdio: "inherit",
  });
  if (result.status !== 0) throw new Error(`PRISMA_${args.slice(0, 2).join("_").toUpperCase()}_FAILED`);
}

function postgresEnv(connectionString: string) {
  const parsed = new URL(connectionString);
  const env = { ...process.env } as NodeJS.ProcessEnv;
  if (parsed.password) env.PGPASSWORD = decodeURIComponent(parsed.password);
  return env;
}

function runPg(name: "pg_dump" | "psql", args: string[], input?: string) {
  const configured = name === "pg_dump" ? process.env.AGENCY_TEST_PG_DUMP_BIN : process.env.AGENCY_TEST_PSQL_BIN;
  const result = spawnSync(configured || name, args, { cwd: process.cwd(), env: postgresEnv(url), input, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`${name.toUpperCase()}_FAILED`);
  return result.stdout || "";
}

async function client(connectionString: string) {
  const connection = new Client({ connectionString });
  await connection.connect();
  return connection;
}

async function adminClient() {
  return client(databaseUrl(adminDatabase));
}

async function migrationNames() {
  const entries = await readdir(migrationsUrl, { withFileTypes: true });
  const names = entries.filter((entry) => entry.isDirectory() && /^\d+_[a-z0-9_]+$/u.test(entry.name)).map((entry) => entry.name).sort();
  for (const name of names) {
    const files = await readdir(new URL(`${name}/`, migrationsUrl), { withFileTypes: true });
    const migrationSqlFiles = files.filter((entry) => entry.isFile() && entry.name === "migration.sql");
    if (migrationSqlFiles.length !== 1) throw new Error(`INVALID_MIGRATION_DIRECTORY_${name}`);
  }
  if (names.filter((name) => name === TARGET_MIGRATION).length !== 1) throw new Error("TARGET_MIGRATION_NOT_UNIQUE");
  return names;
}

async function applyRawMigrations(database: string, names: string[]) {
  const connection = await client(database);
  try {
    for (const name of names) {
      await connection.query(await readFile(new URL(`${name}/migration.sql`, migrationsUrl), "utf8"));
      runPrisma(["migrate", "resolve", "--applied", name], database);
    }
  } finally {
    await connection.end();
  }
}

async function projection(database: string) {
  const connection = await client(database);
  try {
    const subscriptions = await connection.query(`SELECT "id", "planCode", "status", "monthlyLimit", "retentionDays", "currentPeriodStart", "currentPeriodEnd", "cancelAtPeriodEnd" FROM "AgencySubscription" ORDER BY "id"`);
    const periods = await connection.query(`SELECT "id", "subscriptionId", "allowance", "startsAt", "endsAt" FROM "AgencyUsagePeriod" ORDER BY "id"`);
    const usage = await connection.query(`SELECT COUNT(*)::int AS count FROM "AgencyCvUsage"`);
    return { subscriptions: subscriptions.rows, periods: periods.rows, usageCount: Number(usage.rows[0]?.count || 0) };
  } finally {
    await connection.end();
  }
}

async function seedLegacyFixture(database: string) {
  const connection = await client(database);
  const now = new Date();
  const startsAt = new Date(now.getTime() - 7 * 86400000);
  const endsAt = new Date(now.getTime() + 23 * 86400000);
  const futureStart = new Date(now.getTime() + 31 * 86400000);
  const futureEnd = new Date(now.getTime() + 61 * 86400000);
  const expiredStart = new Date(now.getTime() - 61 * 86400000);
  const expiredEnd = new Date(now.getTime() - 31 * 86400000);
  const subscriptions = [
    [fixtureIds.currentSubscription, "active", 50, false, "00000000-0000-4000-8000-000000000001"],
    [fixtureIds.customSubscription, "active", 750, false, "00000000-0000-4000-8000-000000000002"],
    [fixtureIds.zeroSubscription, "active", 0, false, "00000000-0000-4000-8000-000000000003"],
    [fixtureIds.cancelledSubscription, "cancelled", 50, true, "00000000-0000-4000-8000-000000000004"],
  ] as const;
  try {
    await connection.query("BEGIN");
    for (const [, , , , userId] of subscriptions) {
      await connection.query(`INSERT INTO "User" ("id", "email", "createdAt") VALUES ($1, $2, $3) ON CONFLICT ("id") DO NOTHING`, [userId, `agency-migration-${userId.slice(-4)}@example.test`, now]);
    }
    for (const [id, status, limit, cancelAtPeriodEnd, userId] of subscriptions) {
      await connection.query(`INSERT INTO "AgencySubscription" ("id", "userId", "planCode", "provider", "status", "monthlyLimit", "retentionDays", "currentPeriodStart", "currentPeriodEnd", "cancelAtPeriodEnd", "createdAt", "updatedAt") VALUES ($1, $2, 'agency', 'fixture', $3, $4, 90, $5, $6, $7, $8, $8)`, [id, userId, status, limit, startsAt, endsAt, cancelAtPeriodEnd, now]);
    }
    await connection.query(`INSERT INTO "AgencyUsagePeriod" ("id", "subscriptionId", "startsAt", "endsAt", "allowance", "createdAt") VALUES ($1, $2, $3, $4, 50, $8), ($5, $2, $9, $10, 50, $8), ($6, $2, $11, $12, 50, $8), ($7, $3, $3, $4, 750, $8)`, [fixtureIds.currentPeriod, subscriptions[0][0], startsAt, endsAt, fixtureIds.futurePeriod, fixtureIds.expiredPeriod, fixtureIds.customPeriod, now, futureStart, futureEnd, expiredStart, expiredEnd]);
    for (let index = 1; index <= 37; index += 1) {
      await connection.query(`INSERT INTO "AgencyCvUsage" ("id", "periodId", "cvId", "countedAt") VALUES ($1, $2, $3, $4)`, [`clusageentry${String(index).padStart(20, "0")}`, fixtureIds.currentPeriod, `cv-fixture-${index}`, now]);
    }
    await connection.query("COMMIT");
  } catch (error) {
    await connection.query("ROLLBACK");
    throw error;
  } finally {
    await connection.end();
  }
}

async function createDatabases() {
  const connection = await adminClient();
  try {
    for (const name of Object.values(databaseNames)) await connection.query(`CREATE DATABASE ${quotedIdentifier(name)}`);
  } finally {
    await connection.end();
  }
}

async function dropDatabases() {
  const connection = await adminClient().catch(() => null);
  if (!connection) return;
  try {
    for (const name of Object.values(databaseNames)) {
      await connection.query("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()", [name]);
      await connection.query(`DROP DATABASE IF EXISTS ${quotedIdentifier(name)}`);
    }
  } finally {
    await connection.end();
  }
}

async function backupAndRestore() {
  // Use only tools that connect through the guarded database URL. A compose
  // fallback can silently target another PostgreSQL cluster and is therefore
  // intentionally forbidden in this destructive rehearsal.
  const dump = runPg("pg_dump", ["--dbname", databaseUrl(databaseNames.legacy), "--no-owner", "--no-privileges", "--clean", "--if-exists"]);
  if (!dump.trim()) throw new Error("EMPTY_BACKUP");
  runPg("psql", ["--dbname", databaseUrl(databaseNames.restore), "--set", "ON_ERROR_STOP=1"], dump);
}

type Projection = Awaited<ReturnType<typeof projection>>;

function rowById<T extends { id: string }>(rows: T[], id: string): T {
  const matches = rows.filter((row) => row.id === id);
  if (matches.length !== 1) throw new Error(`FIXTURE_ROW_COUNT_${id}`);
  return matches[0];
}

function assertUnchangedFields(before: Projection, after: Projection) {
  for (const id of [fixtureIds.currentSubscription, fixtureIds.customSubscription, fixtureIds.zeroSubscription, fixtureIds.cancelledSubscription]) {
    const previous = rowById(before.subscriptions, id);
    const next = rowById(after.subscriptions, id);
    for (const field of ["planCode", "status", "retentionDays", "currentPeriodStart", "currentPeriodEnd", "cancelAtPeriodEnd"] as const) {
      if (JSON.stringify(previous[field]) !== JSON.stringify(next[field])) throw new Error(`SUBSCRIPTION_FIELD_CHANGED_${id}_${field}`);
    }
  }
  for (const id of [fixtureIds.currentPeriod, fixtureIds.futurePeriod, fixtureIds.expiredPeriod, fixtureIds.customPeriod]) {
    const previous = rowById(before.periods, id);
    const next = rowById(after.periods, id);
    for (const field of ["subscriptionId", "startsAt", "endsAt"] as const) {
      if (JSON.stringify(previous[field]) !== JSON.stringify(next[field])) throw new Error(`PERIOD_FIELD_CHANGED_${id}_${field}`);
    }
  }
}

function assertTargetMigrationResult(before: Projection, after: Projection) {
  assertUnchangedFields(before, after);
  const expectedSubscriptionLimits = new Map<string, number>([
    [fixtureIds.currentSubscription, 300],
    [fixtureIds.customSubscription, 750],
    [fixtureIds.zeroSubscription, 300],
    [fixtureIds.cancelledSubscription, 300],
  ]);
  for (const [id, expected] of expectedSubscriptionLimits) {
    if (Number(rowById(after.subscriptions, id).monthlyLimit) !== expected) throw new Error(`SUBSCRIPTION_LIMIT_${id}`);
  }
  const expectedPeriodAllowances = new Map<string, number>([
    [fixtureIds.currentPeriod, 300],
    [fixtureIds.futurePeriod, 300],
    [fixtureIds.expiredPeriod, 50],
    [fixtureIds.customPeriod, 750],
  ]);
  for (const [id, expected] of expectedPeriodAllowances) {
    if (Number(rowById(after.periods, id).allowance) !== expected) throw new Error(`PERIOD_ALLOWANCE_${id}`);
  }
  if (after.usageCount !== 37) throw new Error("HISTORICAL_USAGE_NOT_PRESERVED");
}

async function main() {
  const names = await migrationNames();
  const targetIndex = names.indexOf(TARGET_MIGRATION);
  if (targetIndex < 0) throw new Error("TARGET_MIGRATION_NOT_FOUND");
  try {
    await createDatabases();
    runPrisma(["migrate", "deploy"], databaseUrl(databaseNames.empty));
    runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.empty));

    await applyRawMigrations(databaseUrl(databaseNames.legacy), names.slice(0, targetIndex));
    await seedLegacyFixture(databaseUrl(databaseNames.legacy));
    const before = await projection(databaseUrl(databaseNames.legacy));
    runPrisma(["migrate", "deploy"], databaseUrl(databaseNames.legacy));
    const after = await projection(databaseUrl(databaseNames.legacy));
    if (JSON.stringify(before) === JSON.stringify(after)) throw new Error("TARGET_MIGRATION_DID_NOT_CHANGE_EXPECTED_DEFAULTS");
    assertTargetMigrationResult(before, after);

    const replay = await client(databaseUrl(databaseNames.legacy));
    try {
      await replay.query(await readFile(new URL(`${TARGET_MIGRATION}/migration.sql`, migrationsUrl), "utf8"));
    } finally {
      await replay.end();
    }
    if (JSON.stringify(after) !== JSON.stringify(await projection(databaseUrl(databaseNames.legacy)))) throw new Error("MIGRATION_NOT_IDEMPOTENT");
    runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.legacy));

    await backupAndRestore();
    if (JSON.stringify(after) !== JSON.stringify(await projection(databaseUrl(databaseNames.restore)))) throw new Error("RESTORE_PROJECTION_MISMATCH");
    const restored = await client(databaseUrl(databaseNames.restore));
    try {
      const rows = await restored.query(`SELECT "migration_name" FROM "_prisma_migrations" ORDER BY "started_at", "migration_name"`);
      const actual = rows.rows.map((row) => row.migration_name);
      if (actual.length !== names.length || actual.some((name, index) => name !== names[index])) throw new Error("MIGRATION_CHAIN_MISMATCH");
    } finally {
      await restored.end();
    }
    runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.restore));
    console.log(JSON.stringify({ migrations: "passed", migrationCount: names.length, emptyChain: true, legacyForward: true, replayIdempotent: true, restoreOpened: true, drift: false }));
  } finally {
    await dropDatabases();
  }
}

main().catch((error) => {
  console.error(JSON.stringify({ migrations: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
});
