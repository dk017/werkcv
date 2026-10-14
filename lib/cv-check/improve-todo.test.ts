import assert from "node:assert/strict";
import test from "node:test";
import { sampleCV, type CVData } from "../cv";
import { normalizeCvDates, normalizeResumeDate, profileWordCount, todoActionFor } from "./improve-todo";

const getDefaultCvData = (): CVData => structuredClone(sampleCV);

test("dates become one style without inventing months", () => {
  assert.equal(normalizeResumeDate("augustus 2021", "nl"), "aug 2021");
  assert.equal(normalizeResumeDate("sep. 2014", "nl"), "sep 2014");
  assert.equal(normalizeResumeDate("2018-08", "nl"), "aug 2018");
  assert.equal(normalizeResumeDate("07/2021", "nl"), "jul 2021");
  assert.equal(normalizeResumeDate("maart 2020", "nl"), "mrt 2020");
  assert.equal(normalizeResumeDate("October 2019", "en"), "Oct 2019");
  assert.equal(normalizeResumeDate("Heden", "nl"), "heden");
  assert.equal(normalizeResumeDate("heden", "en"), "present");
  assert.equal(normalizeResumeDate("2016", "nl"), "2016");
  assert.equal(normalizeResumeDate("zomer 2016", "nl"), "zomer 2016");
  assert.equal(normalizeResumeDate("2018-13", "nl"), "2018-13");
});

test("all periods on the CV are normalised", () => {
  const data = getDefaultCvData();
  data.experience = [{ ...data.experience[0], start: "2018-08", end: "juli 2021" }];
  data.education = [{ ...data.education[0], start: "sep. 2014", end: "06/2018" }];
  const fixed = normalizeCvDates(data);
  assert.deepEqual([fixed.experience[0].start, fixed.experience[0].end], ["aug 2018", "jul 2021"]);
  assert.deepEqual([fixed.education[0].start, fixed.education[0].end], ["sep 2014", "jun 2018"]);
});

test("each finding maps to an automatic fix, an input or the step that edits it", () => {
  assert.deepEqual(todoActionFor("score_date_format_consistency"), { kind: "auto", fix: "normalize_dates" });
  assert.deepEqual(todoActionFor("score_linkedin_present"), { kind: "input", field: "linkedIn" });
  assert.deepEqual(todoActionFor("score_profile_length"), { kind: "step", step: "profiel" });
  assert.deepEqual(todoActionFor("score_quantified_achievement"), { kind: "step", step: "werkervaring" });
  assert.deepEqual(todoActionFor("unknown_check"), { kind: "step", step: "afronden" });
});

test("profile word count", () => {
  const data = getDefaultCvData();
  data.personal.summary = "  Betrokken leerkracht   met zes jaar ervaring. ";
  assert.equal(profileWordCount(data), 6);
});
