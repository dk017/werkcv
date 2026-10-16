import assert from "node:assert/strict";
import test from "node:test";
import { assignBuildFirstArm, isBuildFirstEligible, parseBuildFirstArm } from "./build-first";

test("the split is 50/50 and only accepts its own values", () => {
  assert.equal(assignBuildFirstArm(0.1), "on");
  assert.equal(assignBuildFirstArm(0.9), "off");
  const arms = Array.from({ length: 4000 }, () => assignBuildFirstArm());
  const on = arms.filter((arm) => arm === "on").length;
  assert.ok(on > 1800 && on < 2200, `on=${on}`);
  assert.equal(parseBuildFirstArm("on"), "on");
  assert.equal(parseBuildFirstArm("off"), "off");
  assert.equal(parseBuildFirstArm("yes"), null);
  assert.equal(parseBuildFirstArm(undefined), null);
});

test("generic and example starts can build first; existing CVs, agency and post-login intents keep the login page", () => {
  for (const startSource of ["home_hero_primary", "public_header", "nl_pricing_card", "editor_direct", "home_howto", "en_home_upload", "template_modern"]) {
    assert.equal(isBuildFirstEligible({ startSource }), true, startSource);
  }
  // Their pending CV becomes a browser draft in the no-account editor (since 16 Oct 2026).
  for (const startSource of ["example_page", "english_example_page", "example_blank_template", "linkedin_to_cv_tool", "salary_role_page", "en_role_example_nurse", "role_example_page"]) {
    assert.equal(isBuildFirstEligible({ startSource }), true, startSource);
  }
  assert.equal(isBuildFirstEligible({ id: "cv-1", startSource: "home_hero_primary" }), false);
  assert.equal(isBuildFirstEligible({ workspace: "agency", startSource: "home_hero_primary" }), false);
  for (const startSource of ["public:consumer:abc", "tool_handoff", "agency_landing", "matchpack_pilot", "claim_flow"]) {
    assert.equal(isBuildFirstEligible({ startSource }), false, startSource);
  }
});
