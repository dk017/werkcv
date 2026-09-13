import test from "node:test";
import assert from "node:assert/strict";
import { defaultCV } from "./cv";
import { applyReviewedRewrite, rewriteContext, rewriteReviewKey } from "./ai-rewrite-review";

test("provider context removes direct identity and references", () => {
  const cv = structuredClone(defaultCV);
  cv.personal.email = "private@example.com";
  cv.personal.photo = "private-photo";
  cv.personal.name = "Private Name";
  cv.references = [{ name: "Ref", role: "", company: "", email: "ref@example.com", phone: "" }];
  const serialized = JSON.stringify(rewriteContext(cv));
  for (const value of ["private@example.com", "private-photo", "Private Name", "ref@example.com"]) {
    assert.equal(serialized.includes(value), false);
  }
});

test("applying suggestions changes only writing fields and does not mutate the source", () => {
  const source = structuredClone(defaultCV);
  source.personal.name = "Original";
  source.personal.summary = "Before";
  source.customSections = [{ title: "Keep", items: ["Keep this"] }];
  const suggestion = structuredClone(source);
  suggestion.personal.name = "Invented";
  suggestion.personal.summary = "After";
  suggestion.customSections = [];
  const applied = applyReviewedRewrite(source, suggestion);
  assert.equal(applied.personal.name, "Original");
  assert.equal(applied.personal.summary, "After");
  assert.deepEqual(applied.customSections, source.customSections);
  assert.equal(source.personal.summary, "Before");
});

test("review invalidates when writing, language or vacancy changes", () => {
  const source = structuredClone(defaultCV);
  const key = rewriteReviewKey(source, "vacancy", "role");
  source.personal.summary = "New unsaved edit";
  assert.notEqual(rewriteReviewKey(source, "vacancy", "role"), key);
  assert.notEqual(rewriteReviewKey(defaultCV, "other vacancy", "role"), key);
  assert.notEqual(rewriteReviewKey({ ...defaultCV, personal: { ...defaultCV.personal, resumeLanguage: "en" } }, "vacancy", "role"), key);
});

test("unexpected experience count cannot apply", () => {
  const source = structuredClone(defaultCV);
  source.experience = [{ role: "Role", company: "Company", location: "", start: "", end: "", description: "", highlights: [] }];
  assert.throws(() => applyReviewedRewrite(source, defaultCV), /INVALID_TARGETS/);
});
