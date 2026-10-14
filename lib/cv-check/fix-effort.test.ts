import assert from "node:assert/strict";
import test from "node:test";
import { fixEffort, resolvedByDesign } from "./fix-effort";

test("a check counts as fixed by the design only when it no longer fails in WerkCV", () => {
  const resolved = resolvedByDesign(["parse_reading_order", "parse_file_name", "score_profile_length"], ["score_profile_length"]);
  assert.deepEqual(resolved, ["parse_reading_order", "parse_file_name"]);
});

test("effort labels: design first, then quick inputs, otherwise the person writes it", () => {
  const resolved = new Set(["parse_reading_order"]);
  assert.equal(fixEffort("parse_reading_order", resolved), "design");
  assert.equal(fixEffort("nl_language_levels", resolved), "quick");
  assert.equal(fixEffort("score_linkedin_present", resolved), "quick");
  assert.equal(fixEffort("score_date_format_consistency", resolved), "quick");
  assert.equal(fixEffort("score_profile_length", resolved), "write");
  assert.equal(fixEffort("score_quantified_achievement", resolved), "write");
});

test("a quick check that is already fixed by the design is labelled design", () => {
  assert.equal(fixEffort("score_experience_dates", new Set(["score_experience_dates"])), "design");
});
