import assert from "node:assert/strict";
import { test } from "node:test";
import { CV_CHECK_HANDOFF_MAX_AGE_MS, isCvCheckStartSource, isFreshHandoff } from "./handoff";

test("only CV-check links hand a file to the editor", () => {
  assert.equal(isCvCheckStartSource("cv_check"), true);
  assert.equal(isCvCheckStartSource("cv_check_en"), true);
  assert.equal(isCvCheckStartSource("editor_direct"), false);
  assert.equal(isCvCheckStartSource(null), false);
});

test("a checked CV is only used shortly after the check", () => {
  const now = Date.UTC(2026, 8, 29, 12);
  assert.equal(isFreshHandoff(now - 60_000, now), true);
  assert.equal(isFreshHandoff(now - CV_CHECK_HANDOFF_MAX_AGE_MS, now), false);
  assert.equal(isFreshHandoff(now + 60_000, now), false, "clock skew");
  assert.equal(isFreshHandoff("yesterday", now), false);
});
