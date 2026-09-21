import test from "node:test";
import assert from "node:assert/strict";
import { checkWritingFacts } from "./ai-writing-facts";

test("observed ordinary paraphrases retain facts without a false named-entity warning", () => {
  assert.deepEqual(checkWritingFacts(
    "Answered customer enquiries by email and telephone without management responsibilities.",
    "Responded to customer inquiries via email and phone without management responsibilities.",
  ), []);
  assert.deepEqual(checkWritingFacts(
    "Hielp klanten bij het vinden van kleding en vulde de voorraad aan.",
    "Assisteerde klanten bij het vinden van kleding en vulde de voorraad aan.",
  ), []);
});

test("narrow aliases never excuse new tools, management or omitted limits", () => {
  const source = "Answered enquiries by telephone without management responsibilities.";
  assert.ok(checkWritingFacts(source, "Responded to enquiries using Zendesk without management responsibilities.").includes("NEW_NAMED_TERM"));
  assert.ok(checkWritingFacts(source, "Responded to enquiries and managed a team.").includes("LOST_QUALIFIER"));
  assert.ok(checkWritingFacts("Assisteerde klanten onder begeleiding.", "Leidde zelfstandig een team.").length > 0);
  assert.ok(checkWritingFacts("The course is not yet completed.", "Completed the course.").includes("LOST_QUALIFIER"));
});
