import assert from "node:assert/strict";
import test from "node:test";
import { defaultCV, type CVData } from "./cv";
import {
  DEFAULT_CV_SECTION_ORDER,
  cvSectionHasSubstantiveContent,
  getEditorSectionIds,
  moveSectionWithinLane,
  normalizeCvSectionOrder,
  resolveCvSectionLayout,
} from "./cv-sections";

test("legacy data receives a deterministic section order", () => {
  assert.deepEqual(normalizeCvSectionOrder(undefined), DEFAULT_CV_SECTION_ORDER);
});

test("invalid and duplicate section ids are removed without losing valid sections", () => {
    assert.deepEqual(
      normalizeCvSectionOrder(["skills", "skills", "not-a-section", "experience"]),
      ["skills", "experience", "education", "internships", "courses", "awards", "languages", "interests", "properties", "references", "sideActivities", "customSections"],
    );
});

test("the editor keeps core sections visible and adds optional sections once populated", () => {
  const data: CVData = {
    ...defaultCV,
    internships: [{ role: "Intern", company: "Example", location: "", start: "", end: "", description: "", highlights: [] }],
    sectionOrder: ["internships", "experience", "education", "skills", "languages", "courses", "awards", "interests"],
  };

  assert.deepEqual(getEditorSectionIds(data), ["internships", "experience", "education", "skills", "languages"]);
});

test("saved optional content wins over a stale hidden-section toggle", () => {
  const data: CVData = {
    ...defaultCV,
    internships: [{ role: "Intern", company: "Example", location: "", start: "", end: "", description: "", highlights: [] }],
    sectionOrder: ["internships", ...defaultCV.sectionOrder!],
  };

  assert.deepEqual(
    getEditorSectionIds(data, { internships: false }),
    ["internships", "experience", "education", "skills", "languages"],
  );
});

test("blank placeholder items are not substantive across every optional family", () => {
  const data: CVData = {
    ...defaultCV,
    internships: [{ role: "", company: "", location: "", start: "", end: "", description: "", highlights: [] }],
    courses: [{ name: "", institution: "", year: "" }],
    awards: [""],
    interests: [""],
    properties: [""],
    references: [{ name: "", role: "", company: "", email: "", phone: "" }],
    sideActivities: [{ title: "", organization: "", start: "", end: "", description: "" }],
    customSections: [{ title: "", items: [] }],
  };

  for (const id of ["internships", "courses", "awards", "interests", "properties", "references", "sideActivities", "customSections"] as const) {
    assert.equal(cvSectionHasSubstantiveContent(data, id), false, id);
  }
});

test("a language proficiency without a language name is still blank", () => {
  assert.equal(cvSectionHasSubstantiveContent({ ...defaultCV, languages: [{ name: "", level: "Fluent" }] }, "languages"), false);
});

test("two-column movement stays within the designed lane", () => {
  const data: CVData = {
    ...defaultCV,
    experience: [{ role: "Role", company: "Company", location: "", start: "", end: "", description: "", highlights: [] }],
    education: [{ degree: "Degree", school: "School", location: "", start: "", end: "", description: "" }],
    skills: [{ name: "Skill", level: 3 }],
    languages: [{ name: "Dutch", level: "Goed" }],
    sectionOrder: ["education", "experience", "skills", "languages", "internships", "courses", "awards", "interests", "properties", "references", "sideActivities", "customSections"],
  };
  const layout = resolveCvSectionLayout(data, "modern");
  assert.deepEqual(layout.sidebar, ["skills", "languages"]);
  assert.deepEqual(layout.main, ["education", "experience"]);
  assert.deepEqual(moveSectionWithinLane(data, "modern", "skills", -1), data.sectionOrder);
  assert.deepEqual(moveSectionWithinLane(data, "modern", "education", 1), ["experience", "education", "skills", "languages", "internships", "courses", "awards", "interests", "properties", "references", "sideActivities", "customSections"]);
});
