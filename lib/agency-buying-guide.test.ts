import assert from "node:assert/strict";
import test from "node:test";
import { agencyBuyingSections, agencyBuyingFaqs, getAgencyComparisonUsageExamples, getAgencyUsageExamples } from "./agency-buying-guide";
import { AGENCY_MONTHLY_PRICE_CENTS } from "./agency-plan";

test("usage allocations derive from the subscription, not per-item billing", () => {
  const examples = getAgencyUsageExamples();
  assert.deepEqual(examples.map((example) => example.items), [10, 30, 100]);
  assert.deepEqual(examples.map((example) => example.allocatedCents), [990, 330, 99]);
  for (const row of examples) assert.equal(row.allocatedCents * row.items, AGENCY_MONTHLY_PRICE_CENTS);
  assert.match(agencyBuyingSections[1].paragraphs!.join(" "), /geen losse verkooptarieven/);
});

test("buying guide compares five categories with boundaries and free choices", () => {
  const table = agencyBuyingSections[0].table!;
  assert.equal(table.rows.length, 5);
  assert.ok(table.rows.every((row) => row.length === 3 && row.every(Boolean)));
  assert.match(JSON.stringify(agencyBuyingSections), /geen native ATS-synchronisatie/);
  assert.match(JSON.stringify(agencyBuyingSections), /geen onafhankelijke softwarevergelijking/);
  assert.equal(new Set(agencyBuyingFaqs.map((faq) => faq.question)).size, agencyBuyingFaqs.length);
});

test("comparison worksheet includes the four requested usage scenarios", () => {
  const examples = getAgencyComparisonUsageExamples();
  assert.deepEqual(examples.map((example) => example.items), [10, 30, 100, 300]);
  for (const row of examples) assert.equal(row.allocatedCents * row.items, AGENCY_MONTHLY_PRICE_CENTS);
});
