import assert from "node:assert/strict";
import test from "node:test";
import { RESUME_LATEST_CV_DAYS, resumeWindowStart, shouldResumeLatestCv } from "./editor-resume";

const base = { uploadRequested: false, forceNew: false };

test("content-page starts continue the latest CV", () => {
  for (const startSource of ["landing:/cv-voorbeelden", "public_header", "home_hero_primary", "nl_pricing_card", "vs_cv-nl", "editor_direct", "template_modern"]) {
    assert.equal(shouldResumeLatestCv({ ...base, startSource }), true, startSource);
  }
});

test("new-CV, upload and content-carrying starts keep creating a CV", () => {
  for (const startSource of ["dashboard_blank", "app_examples", "my_cvs_upload", "cv_check", "cv_check_en", "tool_handoff", "agency_landing", "linkedin_to_cv_tool", "example_page", "en_role_example_nurse", "public:consumer:abc"]) {
    assert.equal(shouldResumeLatestCv({ ...base, startSource }), false, startSource);
  }
  assert.equal(shouldResumeLatestCv({ ...base, startSource: "public_header", uploadRequested: true }), false);
  assert.equal(shouldResumeLatestCv({ ...base, startSource: "public_header", forceNew: true }), false);
  assert.equal(shouldResumeLatestCv({ ...base, startSource: "public_header", workspace: "agency" }), false);
});

test("the resume window is two weeks", () => {
  const now = new Date("2026-10-16T12:00:00Z");
  assert.equal(RESUME_LATEST_CV_DAYS, 14);
  assert.equal(resumeWindowStart(now).toISOString(), "2026-10-02T12:00:00.000Z");
});
