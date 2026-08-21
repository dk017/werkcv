import { randomUUID } from "node:crypto";

export function requireAgencyTestDatabase() {
  const value = process.env.AGENCY_TEST_DATABASE_URL;
  if (!value) throw new Error("AGENCY_TEST_DATABASE_URL_REQUIRED");
  if (process.env.DATABASE_URL && process.env.DATABASE_URL !== value) throw new Error("DATABASE_URL_MUST_EQUAL_AGENCY_TEST_DATABASE_URL_DURING_TESTS");
  const url = new URL(value);
  const database = url.pathname.replace(/^\//u, "");
  if (!database.endsWith("_test") && !database.endsWith("_ci")) throw new Error("UNSAFE_AGENCY_TEST_DATABASE_NAME");
  if (/werkcv\.nl|65\.108\.243\.208/iu.test(url.hostname)) throw new Error("PRODUCTION_DATABASE_FORBIDDEN");
  const runId = randomUUID().replaceAll("-", "").slice(0, 16);
  console.log(JSON.stringify({ databaseClass: ["localhost", "127.0.0.1"].includes(url.hostname) ? "local" : "non-production", runId }));
  return { url: value, runId };
}
