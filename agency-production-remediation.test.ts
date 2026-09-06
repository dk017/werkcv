import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

function source(relativePath: string): string {
  return readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("public Agency claim reuses an existing draft before enforcing new-credit exhaustion", () => {
  const route = source("app/api/public/cv/claim/route.ts");
  const existingLookup = route.indexOf("const existing = await prisma.cVDocument.findUnique");
  const existingBranch = route.indexOf("if (existing)", existingLookup);
  const quotaBranch = route.indexOf("if (flow === \"agency\" && agencyAccess && !agencyAccess.canCreate)");
  assert.ok(existingLookup >= 0 && existingBranch > existingLookup && quotaBranch > existingBranch, "existing claim reuse must precede new-credit rejection");
  assert.match(route.slice(existingBranch, quotaBranch), /reused:\s*true/u);
  assert.match(route.slice(quotaBranch), /code:\s*"AGENCY_QUOTA_REACHED"/u);
});

test("approved Agency outputs do not depend on remaining creation credits", () => {
  for (const routePath of [
    "app/api/agency/matchpack/[id]/pdf/route.ts",
    "app/api/agency/matchpack/[id]/docx/route.ts",
    "app/api/agency/matchpack/[id]/client-copy/route.ts",
  ]) {
    const route = source(routePath);
    assert.doesNotMatch(route, /canCreate|AGENCY_QUOTA_REACHED|remaining\s*[<=>]/u, `${routePath} must not block repeat output at credit exhaustion`);
  }
});

test("all Agency credit-writing API boundaries preserve the stable error payload", () => {
  const claim = source("app/api/public/cv/claim/route.ts");
  const matchPackApproval = source("app/api/agency/matchpack/[id]/approve/route.ts");
  const csvImport = source("app/api/agency/csv/import/route.ts");
  assert.match(claim, /getAgencyCreditErrorPayload/u);
  assert.match(claim, /code:\s*"AGENCY_QUOTA_REACHED"/u);
  assert.match(matchPackApproval, /serializeAgencyAccessError/u);
  assert.match(csvImport, /serializeAgencyAccessError/u);
});
