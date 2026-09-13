import test from "node:test";
import assert from "node:assert/strict";
import { checkWritingFacts } from "./ai-writing-facts";
import { sanitizeInternalReturnPath, isEnglishReturnPath } from "./auth/safe-return-path";
test("both handoffs survive login and English remains English", () => {
  for (const path of ["/cv-handoff", "/en/cv-handoff"]) assert.equal(sanitizeInternalReturnPath(path), path);
  assert.equal(isEnglishReturnPath("/en/cv-handoff"), true);
  assert.equal(sanitizeInternalReturnPath("//attacker.test/cv-handoff"), "/templates");
});
test("reject invented products outside the vocabulary", () => {
  for (const product of ["Zendesk", "Workday", "HubSpot"]) assert(checkWritingFacts("Answered customer enquiries.", `Answered customer enquiries using ${product}.`).includes("NEW_NAMED_TERM"));
  assert(checkWritingFacts("Answered customer enquiries.", "Answered customer enquiries using zendesk.").includes("NEW_NAMED_TERM"));
  assert(checkWritingFacts("Answered customer enquiries.", "Zendesk was used for enquiries.").includes("NEW_NAMED_TERM"));
  assert.deepEqual(checkWritingFacts("Careful customer service assistant.", "Strong customer service assistant."), []);
});
test("numeric frequency changes cannot pass unchanged quantities", () => {
  assert(checkWritingFacts("Processed 25 orders per week.", "Processed 25 orders per day.").includes("NEW_NUMBER_OR_UNIT"));
  assert(checkWritingFacts("Verwerkte 25 orders per week.", "Verwerkte 25 orders dagelijks.").includes("NEW_NUMBER_OR_UNIT"));
  assert(checkWritingFacts("Processed 25 orders per week.", "Processed 25 orders.").includes("NEW_NUMBER_OR_UNIT"));
  assert.equal(checkWritingFacts("Processed 25 orders daily.", "Processed 25 orders per day.").length, 0);
});
