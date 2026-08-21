import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { Client } from "pg";
import { requireAgencyTestDatabase } from "./agency-tests-db-guard";

const { url, runId } = requireAgencyTestDatabase();
const baseUrl = new URL(url);
const baseName = baseUrl.pathname.slice(1);
const databaseNames = {
  empty: `${baseName}_${runId}_empty_ci`,
  legacy: `${baseName}_${runId}_legacy_ci`,
  restore: `${baseName}_${runId}_restore_ci`,
};

function databaseUrl(name: string) {
  const next = new URL(baseUrl);
  next.pathname = `/${name}`;
  return next.toString();
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

async function adminClient(database = "postgres") {
  const client = new Client({ connectionString: databaseUrl(database) });
  await client.connect();
  return client;
}

function quotedIdentifier(value: string) {
  if (!/^[a-z0-9_]+$/u.test(value)) throw new Error("UNSAFE_DATABASE_IDENTIFIER");
  return `"${value}"`;
}

async function main() {
  const admin = await adminClient();
  try {
    for (const name of Object.values(databaseNames)) await admin.query(`CREATE DATABASE ${quotedIdentifier(name)}`);
  } finally {
    await admin.end();
  }

  runPrisma(["migrate", "deploy"], databaseUrl(databaseNames.empty));
  runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.empty));

  const legacyClient = await adminClient(databaseNames.legacy);
  try {
    for (const migration of ["20260820000000_baseline", "20260820000100_agency_retention_controls", "20260820000200_agency_onboarding_state"]) {
      const sql = await readFile(`prisma/migrations/${migration}/migration.sql`, "utf8");
      await legacyClient.query(sql);
      runPrisma(["migrate", "resolve", "--applied", migration], databaseUrl(databaseNames.legacy));
    }
  } finally {
    await legacyClient.end();
  }
  runPrisma(["migrate", "deploy"], databaseUrl(databaseNames.legacy));
  runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.legacy));

  const docker = process.platform === "win32" ? "docker.exe" : "docker";
  const dump = spawnSync(docker, ["compose", "exec", "-T", "db", "pg_dump", "-U", baseUrl.username || "postgres", "--no-owner", "--no-privileges", databaseNames.legacy], {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  if (dump.status !== 0 || !dump.stdout) throw new Error("BACKUP_FAILED");
  const restored = spawnSync(docker, ["compose", "exec", "-T", "db", "psql", "-U", baseUrl.username || "postgres", "-d", databaseNames.restore, "-v", "ON_ERROR_STOP=1"], { cwd: process.cwd(), input: dump.stdout, encoding: "utf8" });
  if (restored.status !== 0) throw new Error("RESTORE_FAILED");
  const restoreClient = await adminClient(databaseNames.restore);
  try {
    const probe = await restoreClient.query(`SELECT COUNT(*)::int AS count FROM "_prisma_migrations"`);
    if (Number(probe.rows[0]?.count || 0) < 4) throw new Error("RESTORE_PROBE_FAILED");
  } finally {
    await restoreClient.end();
  }
  runPrisma(["migrate", "diff", "--exit-code", "--from-config-datasource", "--to-schema=prisma/schema.prisma"], databaseUrl(databaseNames.restore));
  console.log(JSON.stringify({ migrations: "passed", emptyChain: true, legacyForward: true, restoreOpened: true, drift: false }));
}

main().catch((error) => {
  console.error(JSON.stringify({ migrations: "failed", code: error instanceof Error ? error.message : "unknown" }));
  process.exitCode = 1;
}).finally(async () => {
  const admin = await adminClient().catch(() => null);
  if (admin) {
    try {
      for (const name of Object.values(databaseNames)) {
        await admin.query("SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE datname = $1 AND pid <> pg_backend_pid()", [name]);
        await admin.query(`DROP DATABASE IF EXISTS ${quotedIdentifier(name)}`);
      }
    } finally {
      await admin.end();
    }
  }
});
