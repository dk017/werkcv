import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { resolve } from "node:path";

const script = readFileSync(resolve(process.cwd(), "scripts/followups-signup-feedback.mjs"), "utf8");
const queryStart = script.indexOf("export const ELIGIBLE_USERS_SQL");
const queryEnd = script.indexOf("export async function queryEligibleUsers");
const query = script.slice(queryStart, queryEnd);

test("all signup-feedback exclusions are applied before the SQL limit", () => {
  assert.ok(queryStart >= 0 && queryEnd > queryStart);
  const limitPosition = query.indexOf("LIMIT $4");
  assert.ok(limitPosition > 0);

  for (const exclusion of [
    "hasMeaningfulContent\" = true",
    "FROM \"FollowupTask\"",
    "FROM \"EmailMessage\"",
    "NOT LIKE '%@werkcv.nl'",
    "NOT LIKE '%+test%'",
    "<> 'dhineshkumar.stoic@gmail.com'",
  ]) {
    const exclusionPosition = query.indexOf(exclusion);
    assert.ok(exclusionPosition >= 0, `missing exclusion: ${exclusion}`);
    assert.ok(exclusionPosition < limitPosition, `${exclusion} must be evaluated before LIMIT`);
  }
});

test("query receives the reply cutoff before its limit parameter", () => {
  assert.match(script, /queryEligibleUsers\(pool, lowerBound, cutoff, recentReplyCutoff, limit\)/);
  assert.match(script, /\[lowerBound, cutoff, recentReplyCutoff, limit\]/);
  assert.doesNotMatch(script, /await alreadySent\(/);
  assert.doesNotMatch(script, /await hasInboundReplyAfter\(/);
});
