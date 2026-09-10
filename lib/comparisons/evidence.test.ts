import assert from "node:assert/strict";
import test from "node:test";
import { comparisonEvidence, comparisonEvidenceLabel } from "./evidence";
import { consumerComparisonPrice, getComparisonEvidence } from "./evidence";
import { consumerCvPricingFactsById } from "../commercial/consumer-cv-pricing";
import { monthlyWorkflowCost } from "../agency-cost-worksheet";

test("consumer comparisons reuse the pricing source and suppress expired prices in both languages", () => {
  assert.equal(getComparisonEvidence("cvmaker-terms-2026-09").sourceUrl, consumerCvPricingFactsById.cvmaker.officialUrl);
  for (const locale of ["nl", "en"] as const) {
    assert.match(consumerComparisonPrice("cvmaker", locale, new Date("2026-09-10")), /21,99/);
    assert.doesNotMatch(consumerComparisonPrice("cvmaker", locale, new Date("2027-01-01")), /21,99|2,99/);
  }
});

test("worksheet includes transfer and software; zero volume and invalid inputs are handled", () => {
  assert.deepEqual(monthlyWorkflowCost(30, 20, 10, 45, 99), { hours: 15, labour: 675, total: 774 });
  assert.deepEqual(monthlyWorkflowCost(0, 20, 10, 45, 99), { hours: 0, labour: 0, total: 99 });
  assert.equal(monthlyWorkflowCost(-1, 20, 10, 45, 99), null);
  assert.equal(monthlyWorkflowCost(1.5, 20, 10, 45, 99), null);
  assert.equal(monthlyWorkflowCost(30, NaN, 10, 45, 99), null);
});

test("comparison evidence records are unique, dated and safe to publish", () => {
  const ids = new Set<string>();
  for (const item of comparisonEvidence) {
    assert.equal(ids.has(item.id), false, `duplicate evidence id: ${item.id}`);
    ids.add(item.id);
    assert.match(item.checkedAt, /^2026-\d{2}-\d{2}$/);
    assert.match(item.reviewBy, /^2026-\d{2}-\d{2}$/);
    assert.ok(item.product.trim());
    assert.ok(item.claim.trim());
    assert.ok(item.limitation.trim());
    assert.equal(item.publicSafe, true);
    if (item.status === "vendor_documented") {
      assert.match(item.sourceUrl ?? "", /^https?:\/\//);
      assert.ok(item.sourceTitle?.trim());
    }
  }
});

test("evidence labels keep unknown facts visibly unknown", () => {
  assert.equal(comparisonEvidenceLabel("vendor_documented", "nl"), "Gedocumenteerd door de aanbieder");
  assert.equal(comparisonEvidenceLabel("hands_on_observed", "en"), "Observed in our test");
  assert.equal(comparisonEvidenceLabel("not_verified", "nl"), "Niet geverifieerd");
});
