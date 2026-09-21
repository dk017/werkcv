import assert from "node:assert/strict";
import test from "node:test";
import { defaultCV } from "./cv";
import { writingChanges, applyWritingChange, writingContextKey, rebaseWritingChanges } from "./ai-writing-changes";

function fixture() {
  const before = structuredClone(defaultCV);
  before.personal.summary = "Original profile";
  before.personal.name = "Do not change";
  before.experience = [{ entryId: "job", role: "Assistant", company: "Example", location: "", start: "", end: "", description: "Original description", highlights: ["Original bullet"] }];
  before.customSections = [{ title: "Keep", items: ["Unchanged"] }];
  const after = structuredClone(before);
  after.personal.summary = "New profile";
  after.experience[0].description = "New description";
  after.experience[0].highlights = ["New bullet"];
  return { before, after };
}
test("review creates individual profile, description and bullet changes", () => {
  const { before, after } = fixture();
  assert.deepEqual(writingChanges(before, after, { kind: "all" }).map(c => c.field), ["summary", "description", "highlights"]);
});

test("duplicate bullets are addressed by array context and index; sibling acceptance rebases only known edits", () => {
  const { before, after } = fixture();
  before.experience[0].highlights = ["same", "same"];
  after.experience[0].highlights = ["first", "second"];
  const changes = writingChanges(before, after, { kind: "experience", entryId: "job" }).filter(c => c.bullet);
  const once = applyWritingChange(before, changes[0]);
  assert.deepEqual(once.experience[0].highlights, ["first", "same"]);
  assert.throws(() => applyWritingChange(once, changes[1]), /STALE_CHANGE/);
  const rebased = rebaseWritingChanges(changes, changes[0], once);
  const twice = applyWritingChange(once, rebased[1]);
  assert.deepEqual(twice.experience[0].highlights, ["first", "second"]);
  assert.throws(() => applyWritingChange(twice, changes[0], true), /STALE_CHANGE/);
  const undone = applyWritingChange(twice, rebased[1], true);
  assert.deepEqual(applyWritingChange(undone, changes[0], true).experience[0].highlights, ["same", "same"]);
});

test("changed count or known reordered bullets are not paired by guesswork", () => {
  const { before, after } = fixture();
  after.experience[0].highlights.push("new");
  assert.equal(writingChanges(before, after, { kind: "experience", entryId: "job" }).filter(c => c.bullet).length, 0);
});

test("insert preview accepts once and safely undoes", () => {
  const { before, after } = fixture();
  after.experience[0].highlights = [...before.experience[0].highlights, "New task"];
  const change = writingChanges(before, after, { kind: "experience", entryId: "job" }, { operation: "insert_bullet", index: 1 })[0];
  const accepted = applyWritingChange(before, change);
  assert.throws(() => applyWritingChange(accepted, change), /STALE_CHANGE/);
  assert.deepEqual(applyWritingChange(accepted, change, true), before);
});
test("accepting a single change preserves every unrelated field", () => {
  const { before, after } = fixture();
  const changes = writingChanges(before, after, { kind: "all" });
  const accepted = applyWritingChange(before, changes[1]);
  assert.equal(accepted.personal.summary, before.personal.summary);
  assert.deepEqual(accepted.customSections, before.customSections);
  assert.deepEqual(accepted.experience[0].highlights, before.experience[0].highlights);
  assert.equal(accepted.experience[0].description, after.experience[0].description);
  assert.equal(before.experience[0].description, "Original description");
});
test("acceptance and undo work independently in either field order", () => {
  const { before, after } = fixture();
  const changes = writingChanges(before, after, { kind: "all" });
  let current = applyWritingChange(before, changes[2]);
  current = applyWritingChange(current, changes[0]);
  current = applyWritingChange(current, changes[2], true);
  assert.equal(current.personal.summary, after.personal.summary);
  assert.deepEqual(current.experience, before.experience);
});
test("undo never overwrites later manual editing; original remains in change", () => {
  const { before, after } = fixture();
  const change = writingChanges(before, after, { kind: "profile" })[0];
  const current = applyWritingChange(before, change);
  current.personal.summary = "Manual text afterwards";
  assert.throws(() => applyWritingChange(current, change, true), /STALE_CHANGE/);
  assert.equal(current.personal.summary, "Manual text afterwards");
  assert.equal(change.before, "Original profile");
});
test("deleted or changed targets reject; identity is not the array position", () => {
  const { before, after } = fixture();
  const change = writingChanges(before, after, { kind: "experience", entryId: "job" })[0];
  assert.throws(() => applyWritingChange({ ...before, experience: [] }, change), /STALE_CHANGE/);
  const other = { ...before.experience[0], entryId: "other" };
  const reordered = applyWritingChange({ ...before, experience: [other, before.experience[0]] }, change);
  assert.equal(reordered.experience[0].description, "Original description");
  assert.equal(reordered.experience[1].description, "New description");
});
test("section review excludes unrelated suggestions", () => {
  const { before, after } = fixture();
  assert.equal(writingChanges(before, after, { kind: "profile" }).length, 1);
  assert.equal(writingChanges(before, after, { kind: "experience", entryId: "job" }).length, 2);
});
test("experience context ignores identity but invalidates job facts/language", () => {
  const { before } = fixture();
  const target = { kind: "experience" as const, entryId: "job" };
  const key = writingContextKey(before, target, "", "");
  before.personal.name = "Changed name";
  assert.equal(writingContextKey(before, target, "", ""), key);
  before.experience[0].company = "Another company";
  assert.notEqual(writingContextKey(before, target, "", ""), key);
});
