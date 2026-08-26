import test from "node:test";
import assert from "node:assert/strict";
import { defaultCV } from "./cv";
import { hasAnyCvUserContent, isCvEmpty } from "./cv-empty";

test("blank CV is empty", () => {
  assert.equal(isCvEmpty(defaultCV), true);
});

test("identity-only content uses the user's data", () => {
  assert.equal(hasAnyCvUserContent({ ...defaultCV, personal: { ...defaultCV.personal, name: "Sam" } }), true);
});

test("photo-only content uses the user's data", () => {
  assert.equal(hasAnyCvUserContent({ ...defaultCV, personal: { ...defaultCV.personal, photo: "data:image/png;base64,fake" } }), true);
});

test("highlight-only experience counts as user content", () => {
  assert.equal(hasAnyCvUserContent({ ...defaultCV, experience: [{ ...defaultCV.experience[0], highlights: ["Improved a process"] }] }), true);
});

test("custom item-only content counts as user content", () => {
  assert.equal(hasAnyCvUserContent({ ...defaultCV, customSections: [{ title: "", items: ["Volunteer work"] }] }), true);
});

test("optional sections are checked even when core sections are blank", () => {
  assert.equal(hasAnyCvUserContent({ ...defaultCV, interests: ["Cycling"] }), true);
});
