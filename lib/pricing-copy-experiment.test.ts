import assert from "node:assert/strict";
import { test } from "node:test";
import { PRICE_COPY_VARIANTS, getPriceCopy, isPriceCopyVariant } from "./pricing-copy-experiment";

const FRESH = new Date("2026-09-28T12:00:00Z");
const STALE = new Date("2027-03-01T12:00:00Z");

test("control keeps today's copy and adds nothing next to the download button", () => {
  const copy = getPriceCopy("control", "nl", FRESH);
  assert.equal(copy.toolbarCaption, null);
  assert.equal(copy.pricingLead, null);
  assert.equal(copy.previewLine, "Veilig betalen · Geen abonnement · Direct je PDF");
});

test("pizza variant states the real price and 'less than half a pizza'", () => {
  const copy = getPriceCopy("pizza", "nl", FRESH);
  assert.match(copy.toolbarCaption ?? "", /€4,99 eenmalig · minder dan een halve pizza/);
  assert.match(copy.previewLine, /onbeperkt aan/);
});

test("competitor variant uses the verified CV.nl price while fresh, generic copy once stale", () => {
  assert.match(getPriceCopy("competitor", "nl", FRESH).toolbarCaption ?? "", /CV\.nl kost €19,99 per maand/);
  const stale = getPriceCopy("competitor", "nl", STALE);
  assert.doesNotMatch(`${stale.toolbarCaption} ${stale.previewLine} ${stale.pricingLead}`, /CV\.nl|19,99/);
  assert.match(stale.toolbarCaption ?? "", /geen maandabonnement/);
});

test("every variant has English copy and variant guard works", () => {
  for (const variant of PRICE_COPY_VARIANTS) {
    const copy = getPriceCopy(variant, "en", FRESH);
    assert.ok(copy.previewLine.length > 10);
    assert.doesNotMatch(copy.previewLine, /€\d+,\d{2}/, "English copy uses a decimal point");
  }
  assert.equal(isPriceCopyVariant("pizza"), true);
  assert.equal(isPriceCopyVariant("free"), false);
});
