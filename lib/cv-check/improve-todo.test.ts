import assert from "node:assert/strict";
import test from "node:test";
process.env.OPENAI_API_KEY ||= "test-key-not-used";
import { sampleCV, type CVData } from "../cv";
import { normalizeCvDates, normalizeResumeDate, planDateFix, profileWordCount, todoActionFor, yearOnlyCvDates, yearOnlyResumeDate } from "./improve-todo";

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

const dateCheck = async (data: CVData) => {
  const { runCvCheck } = await import("./engine");
  const { cvDataToCheckText } = await import("./cv-data-text");
  const result = await runCvCheck({ cvText: cvDataToCheckText(data), locale: "nl", ai: false });
  return result.checks.find((item) => item.id === "score_date_format_consistency")?.status;
};

const mixedYearsCv = (): CVData => {
  const data = getDefaultCvData();
  const job = data.experience[0];
  data.experience = [
    { ...job, role: "Teamleider", start: "jan 2022", end: "nu" },
    { ...job, role: "Medewerker", start: "2019", end: "12/2021" },
    { ...job, role: "Stagiair", start: "2017", end: "2019" },
  ];
  return data;
};

test("dates that only need one style are fixed by Pas toe, and the grade agrees", async () => {
  const data = getDefaultCvData();
  data.experience = [{ ...data.experience[0], start: "2018-08", end: "juli 2021" }, { ...data.experience[0], start: "08/2021", end: "heden" }];
  assert.equal(await dateCheck(data), "fail");
  assert.deepEqual(planDateFix(data), { kind: "auto" });
  assert.equal(await dateCheck(normalizeCvDates(data)), "pass");
});

test("year-only periods next to month-year ones: the to-do names them and offers years only", async () => {
  const data = mixedYearsCv();
  const plan = planDateFix(data);
  assert.equal(plan.kind, "months");
  if (plan.kind !== "months") return;
  assert.deepEqual(
    plan.missing.map(({ section, index, label, period }) => [section, index, label, period]),
    [["experience", 1, "Medewerker", "2019 – dec 2021"], ["experience", 2, "Stagiair", "2017 – 2019"]],
  );
  assert.equal(plan.yearsOnly, true);
  // Same verdict as the grade: normalising alone leaves the check failed, years only passes it.
  assert.equal(await dateCheck(normalizeCvDates(data)), "fail");
  const yearsOnly = yearOnlyCvDates(data);
  assert.deepEqual(yearsOnly.experience.map((item) => [item.start, item.end]), [["2022", "heden"], ["2019", "2021"], ["2017", "2019"]]);
  assert.equal(await dateCheck(yearsOnly), "pass");
});

test("once the months are added, Pas toe finishes the job", async () => {
  const data = mixedYearsCv();
  data.experience[1].start = "03/2019";
  data.experience[2] = { ...data.experience[2], start: "sep 2017", end: "februari 2019" };
  assert.deepEqual(planDateFix(data), { kind: "auto" });
  assert.equal(await dateCheck(normalizeCvDates(data)), "pass");
});

test("years only keeps free text and the ongoing word", () => {
  assert.equal(yearOnlyResumeDate("augustus 2021", "nl"), "2021");
  assert.equal(yearOnlyResumeDate("2018-08", "nl"), "2018");
  assert.equal(yearOnlyResumeDate("Oct 2019", "en"), "2019");
  assert.equal(yearOnlyResumeDate("nu", "nl"), "heden");
  assert.equal(yearOnlyResumeDate("zomer 2016", "nl"), "zomer 2016");
  assert.equal(yearOnlyResumeDate("2016", "nl"), "2016");
});

test("a study with years only next to jobs with months needs no fix; a job with years only does", async () => {
  const data = getDefaultCvData();
  const job = data.experience[0];
  data.experience = [{ ...job, start: "jan 2022", end: "heden" }, { ...job, start: "mrt 2019", end: "dec 2021" }];
  data.education = [{ ...data.education[0], start: "2013", end: "2017" }];
  assert.deepEqual(planDateFix(data), { kind: "auto" });
  assert.equal(await dateCheck(data), "pass");

  data.experience[1] = { ...job, role: "Medewerker", start: "2019", end: "2021" };
  const plan = planDateFix(data);
  assert.equal(plan.kind, "months");
  if (plan.kind !== "months") return;
  assert.deepEqual(plan.missing.map(({ section, label }) => [section, label]), [["experience", "Medewerker"]]);
  assert.equal(await dateCheck(normalizeCvDates(data)), "fail");
});
