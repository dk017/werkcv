import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const allowedOutcomes = new Set(["unknown", "pending", "accepted", "rejected", "withdrawn"]);
const execute = process.argv.includes("--execute");
const cursorArg = process.argv.find((value) => value.startsWith("--cursor="))?.slice("--cursor=".length).trim() || null;
const requestedLimit = Number(process.argv.find((value) => value.startsWith("--limit="))?.slice("--limit=".length) || 100);
const limit = Number.isInteger(requestedLimit) ? Math.min(500, Math.max(1, requestedLimit)) : 100;

function legacyObject(value: Prisma.JsonValue | null): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function nonnegativeInteger(value: unknown): number | null {
  return typeof value === "number" && Number.isInteger(value) && value >= 0 ? value : null;
}

function validDate(value: unknown): Date | null {
  if (typeof value !== "string") return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

async function main() {
  if (execute && process.env.AGENCY_MATCHPACK_BACKFILL_CONFIRM !== "BACKFILL_LEGACY_OUTCOMES") {
    throw new Error("BACKFILL_CONFIRMATION_REQUIRED");
  }
  const startedAt = Date.now();
  const rows = await prisma.agencyMatchPack.findMany({
    where: { outcomeData: { not: Prisma.JsonNull }, ...(cursorArg ? { id: { gt: cursorArg } } : {}) },
    orderBy: { id: "asc" },
    take: limit,
    select: {
      id: true,
      outcomeData: true,
      clientOutcome: true,
      correctionsCount: true,
      unsupportedClaimsCaught: true,
      clientOutcomeRecordedAt: true,
      clientOutcomeRecordedById: true,
    },
  });
  let selected = 0;
  let updated = 0;
  let skipped = 0;
  let invalid = 0;
  for (const row of rows) {
    const legacy = legacyObject(row.outcomeData);
    if (!legacy) {
      invalid += 1;
      continue;
    }
    const data: Prisma.AgencyMatchPackUpdateInput = {};
    const outcome = typeof legacy.status === "string" && allowedOutcomes.has(legacy.status) ? legacy.status : null;
    if (row.clientOutcome === "unknown" && outcome && outcome !== "unknown") {
      data.clientOutcome = outcome;
      if (!row.clientOutcomeRecordedAt) data.clientOutcomeRecordedAt = validDate(legacy.recordedAt);
      if (!row.clientOutcomeRecordedById && typeof legacy.recordedById === "string" && legacy.recordedById.length <= 160) data.clientOutcomeRecordedById = legacy.recordedById;
    }
    const corrections = nonnegativeInteger(legacy.correctionsCount);
    if (row.correctionsCount === 0 && corrections && corrections > 0) data.correctionsCount = corrections;
    const unsupported = nonnegativeInteger(legacy.unsupportedClaimsCaught);
    if (row.unsupportedClaimsCaught === 0 && unsupported && unsupported > 0) data.unsupportedClaimsCaught = unsupported;
    if (Object.keys(data).length === 0) {
      skipped += 1;
      continue;
    }
    selected += 1;
    if (execute) {
      await prisma.agencyMatchPack.update({ where: { id: row.id }, data });
      updated += 1;
    }
  }
  console.log(JSON.stringify({
    mode: execute ? "execute" : "dry_run",
    scanned: rows.length,
    selected,
    updated,
    skipped,
    invalid,
    nextCursor: rows.length === limit ? rows.at(-1)?.id || null : null,
    durationMs: Date.now() - startedAt,
    firstExportedAtInferred: false,
    retentionChanged: false,
  }));
}

main().catch((error) => {
  console.error(JSON.stringify({ backfill: "failed", code: error instanceof Error ? error.message : "UNKNOWN" }));
  process.exitCode = 1;
}).finally(async () => prisma.$disconnect());
