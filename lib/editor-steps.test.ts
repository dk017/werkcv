import test from "node:test";
import assert from "node:assert/strict";
import { defaultCV, type CVData } from "./cv";
import {
  EDITOR_STEPS,
  entryForPreviewTarget,
  getStepStates,
  initialEditorStep,
  neighbourSteps,
  normalizeEditorStep,
  resolveInitialStep,
  stepForPreviewTarget,
  previewSelectorsForStep,
  stepForSection,
} from "./editor-steps";
import { CV_BODY_SECTION_IDS } from "./cv-sections";

test("every CV body section belongs to a content step", () => {
  for (const sectionId of CV_BODY_SECTION_IDS) {
    const step = stepForSection(sectionId);
    assert.ok(EDITOR_STEPS.includes(step), sectionId);
    assert.notEqual(step, "afronden", sectionId);
  }
});

test("preview clicks open the matching step", () => {
  assert.equal(stepForPreviewTarget({ edit: "personal" }), "persoonlijk");
  assert.equal(stepForPreviewTarget({ edit: "profile" }), "profiel");
  assert.equal(stepForPreviewTarget({ section: "experience" }), "werkervaring");
  assert.equal(stepForPreviewTarget({ section: "languages" }), "vaardigheden");
  assert.equal(stepForPreviewTarget({ section: "references" }), "extra");
  assert.equal(stepForPreviewTarget({ section: "toString" }), null);
  assert.equal(stepForPreviewTarget({}), null);
});

test("preview entry markers support legacy arrays and reject malformed indices", () => {
  for (const section of ["experience", "education", "internships"]) {
    assert.deepEqual(entryForPreviewTarget(`${section}:0`), { section, index: 0 });
    assert.deepEqual(entryForPreviewTarget(`${section}:12`), { section, index: 12 });
  }
  for (const marker of [undefined, "", "skills:0", "experience:-1", "education:1.5", "education:01", "internships:Infinity", "experience:9007199254740992"]) {
    assert.equal(entryForPreviewTarget(marker), null, marker);
  }
});

test("step names from the URL are validated", () => {
  assert.equal(normalizeEditorStep("werkervaring"), "werkervaring");
  assert.equal(normalizeEditorStep("WERKERVARING"), null);
  assert.equal(normalizeEditorStep(undefined), null);
});

test("an empty CV starts at personal details, a finished one at the finish step", () => {
  assert.equal(initialEditorStep(defaultCV, true), "persoonlijk");
  const states = getStepStates(defaultCV);
  assert.equal(states.werkervaring, false);
  assert.equal(states.afronden, false);
});

test("the first unfinished step is chosen for a half-filled CV", () => {
  const data: CVData = {
    ...defaultCV,
    personal: { ...defaultCV.personal, name: "Sanne de Vries", title: "Marketing medewerker", email: "sanne@voorbeeld.nl", phone: "0612345678", location: "Utrecht" },
  };
  const step = initialEditorStep(data, false);
  assert.notEqual(step, "persoonlijk");
});

test("steps link to their neighbours", () => {
  assert.deepEqual(neighbourSteps("persoonlijk"), { previous: null, next: "profiel" });
  assert.deepEqual(neighbourSteps("extra"), { previous: "vaardigheden", next: "afronden" });
  assert.deepEqual(neighbourSteps("afronden"), { previous: "extra", next: null });
});

test("the opening step prefers the URL, then focus and upload requests", () => {
  const base = { focus: null, uploadRequested: false, data: defaultCV, isEmpty: true } as const;
  assert.equal(resolveInitialStep({ ...base, step: "opleiding" }), "opleiding");
  assert.equal(resolveInitialStep({ ...base, step: "nonsense", focus: "skills" }), "vaardigheden");
  assert.equal(resolveInitialStep({ ...base, step: undefined, uploadRequested: true }), "persoonlijk");
  assert.equal(resolveInitialStep({ ...base, step: undefined }), "persoonlijk");
});

test("preview highlight selectors are the inverse of click-to-edit", () => {
  assert.deepEqual(previewSelectorsForStep("persoonlijk"), ['[data-cv-edit="personal"]']);
  assert.deepEqual(previewSelectorsForStep("vaardigheden"), ['[data-cv-section="skills"]', '[data-cv-section="languages"]']);
  assert.deepEqual(previewSelectorsForStep("afronden"), []);
  for (const id of CV_BODY_SECTION_IDS) {
    const step = stepForPreviewTarget({ section: id });
    assert.ok(step && previewSelectorsForStep(step).includes(`[data-cv-section="${id}"]`), id);
  }
});
