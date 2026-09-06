import test from "node:test";
import assert from "node:assert/strict";
import { anonymizeCvData, scrubAnonymizedText, scrubKnownCandidateName } from "../lib/agency-matchpack";
import { parseCsv, stringifyCsv } from "../lib/agency-csv";
import { sampleCV } from "../lib/cv";
import { fictionalCandidate } from "./agency-tests-fixtures";
import { agencyTransactionalEmailTemplate } from "../lib/email";

test("contact-free text removes direct identifiers but keeps a visible limitation", () => {
  const source = `${fictionalCandidate.name} can be reached at ${fictionalCandidate.email} or ${fictionalCandidate.phone}.`;
  const scrubbed = scrubKnownCandidateName(scrubAnonymizedText(source), fictionalCandidate.name);
  assert.equal(scrubbed.includes(fictionalCandidate.email), false);
  assert.equal(scrubbed.includes(fictionalCandidate.phone), false);
  assert.equal(scrubbed.includes(fictionalCandidate.name), false);
  assert.match(scrubbed, /kandidaat/i);
});

test("CSV output round-trips commas, quotes and line breaks", () => {
  const csv = stringifyCsv(["title", "summary"], [{ title: "HR, adviseur", summary: "Regel 1\nRegel 2\"" }]);
  const parsed = parseCsv(csv);
  assert.equal(parsed[0].title, "HR, adviseur");
  assert.equal(parsed[0].summary, "Regel 1\nRegel 2\"");
});

test("contact-free structured output scrubs a repeated candidate name in narrative text", () => {
  const source = structuredClone(sampleCV);
  source.personal.name = fictionalCandidate.name;
  source.personal.summary = `${fictionalCandidate.name} led a fictional project.`;
  source.experience[0] = {
    ...source.experience[0],
    description: `${fictionalCandidate.name} managed the fictional workstream.`,
  };
  const anonymized = anonymizeCvData(source, "en");
  assert.doesNotMatch(anonymized.data.personal.summary, /Mila|Vermeer/i);
  assert.doesNotMatch(anonymized.data.experience[0]?.description || "", /Mila|Vermeer/i);
});

test("welcome email is factual and contains no candidate content", () => {
  const message = agencyTransactionalEmailTemplate("agency_welcome_v1", "nl");
  assert.match(message.text, /300/u);
  assert.match(message.text, /Eén credit geldt voor één nieuw zelfstandig kandidaat-CV/u);
  assert.match(message.text, /90 dagen/u);
  for (const link of ["/agency#voorbeeld", "/agency/account", "/agency/privacy", "/voor-bureaus/kennisbank/matchpack-handleiding"]) assert.match(message.text, new RegExp(link.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "u"));
  assert.doesNotMatch(`${message.subject}\n${message.text}`, /Mila Vermeer|mila\.vermeer@example\.test/u);
});
