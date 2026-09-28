import assert from "node:assert/strict";
import { test } from "node:test";
import { PRICE_COPY_VARIANTS, getPriceCopy, isPriceCopyVariant } from "./pricing-copy-experiment";
import { cvDownloadPrice } from "./site-content";

const FRESH = new Date("2026-09-28T12:00:00Z");
const STALE = new Date("2027-03-01T12:00:00Z");

test("every arm shows the current price on the download button", () => {
  for (const variant of PRICE_COPY_VARIANTS) {
    assert.equal(getPriceCopy(variant, "nl", FRESH).downloadLabel, `PDF downloaden · ${cvDownloadPrice.display}`);
    assert.equal(getPriceCopy(variant, "en", FRESH).downloadLabel, `Download PDF · ${cvDownloadPrice.displayEn}`);
  }
});

test("plain arm has no anchor caption and names the price in the preview", () => {
  const copy = getPriceCopy("plain", "nl", FRESH);
  assert.equal(copy.toolbarCaption, null);
  assert.equal(copy.pricingLead, null);
  assert.ok(copy.previewLine.startsWith(cvDownloadPrice.display));
});

test("pizza arm only claims 'less than a pizza' while the price is below a Margherita (€10,99)", () => {
  assert.ok(cvDownloadPrice.amountCents < 1099, "update the pizza copy: the price is no longer below a Margherita");
  assert.match(getPriceCopy("pizza", "nl", FRESH).toolbarCaption ?? "", /minder dan een pizza/);
});

test("competitor arm uses the verified CV.nl price while fresh and generic copy once stale", () => {
  assert.match(getPriceCopy("competitor", "nl", FRESH).toolbarCaption ?? "", /CV\.nl kost €19,99 per maand/);
  const stale = getPriceCopy("competitor", "nl", STALE);
  assert.doesNotMatch(`${stale.toolbarCaption} ${stale.previewLine} ${stale.pricingLead}`, /CV\.nl|19,99/);
});

test("English copy uses decimal points and the guard rejects unknown arms", () => {
  for (const variant of PRICE_COPY_VARIANTS) {
    const copy = getPriceCopy(variant, "en", FRESH);
    assert.doesNotMatch(`${copy.previewLine} ${copy.toolbarCaption ?? ""}`, /€\d+,\d{2}/);
  }
  assert.equal(isPriceCopyVariant("pizza"), true);
  assert.equal(isPriceCopyVariant("control"), false);
});
