import assert from "node:assert/strict";
import { test } from "node:test";
import {
  CHECKOUT_EXIT_REASONS,
  decideExitPrompt,
  getCheckoutExitCopy,
  sanitizeCheckoutExitProperties,
  scrubExitDetail,
} from "./checkout-exit";
import { cvDownloadPrice } from "./site-content";

const NOW = Date.UTC(2026, 8, 28, 12);
const MIN = 60 * 1000;
const HOUR = 60 * MIN;

test("asks after Dodo's back button or a recent checkout of this CV, at most once a day", () => {
  const base = { cvId: "cv-1", now: NOW, cancelMarker: false, pending: null, lastShownAt: null };
  assert.equal(decideExitPrompt({ ...base, cancelMarker: true }), "cancel_button");
  assert.equal(decideExitPrompt({ ...base, pending: { cvId: "cv-1", at: NOW - 30 * 1000 } }), "returned");
  assert.equal(decideExitPrompt({ ...base, pending: { cvId: "cv-2", at: NOW - MIN } }), null, "another CV's checkout");
  assert.equal(decideExitPrompt({ ...base, pending: { cvId: "cv-1", at: NOW - 7 * HOUR } }), null, "too long ago");
  assert.equal(decideExitPrompt({ ...base, pending: { cvId: "cv-1", at: NOW + MIN } }), null, "clock skew");
  assert.equal(decideExitPrompt({ ...base, cancelMarker: true, lastShownAt: NOW - 2 * HOUR }), null, "asked today");
  assert.equal(decideExitPrompt({ ...base, cancelMarker: true, lastShownAt: NOW - 25 * HOUR }), "cancel_button");
  assert.equal(decideExitPrompt(base), null);
});

test("free text drops contact details and links and is capped at 200 characters", () => {
  assert.equal(scrubExitDetail("PayPal graag, mail jan@example.nl"), "PayPal graag, mail [verwijderd]");
  assert.equal(scrubExitDetail("bel 06-12345678"), "bel [verwijderd]");
  assert.equal(scrubExitDetail("zie https://example.com/x"), "zie [verwijderd]");
  assert.equal(scrubExitDetail("Bancontact"), "Bancontact");
  assert.equal(scrubExitDetail("   "), undefined);
  assert.equal(scrubExitDetail(42), undefined);
  assert.equal(scrubExitDetail("a".repeat(500))?.length, 200);
});

test("server keeps only known fields and bounded values", () => {
  const shown = sanitizeCheckoutExitProperties("checkout_exit_prompt_shown", {
    cvId: "cv-1",
    uiLanguage: "fr",
    trigger: "weird",
    secondsSinceCheckout: 12.4,
    priceCopyVariant: "pizza",
    amountCents: 795,
    email: "jan@example.nl",
  });
  assert.deepEqual(shown, { cvId: "cv-1", uiLanguage: "nl", trigger: "returned", secondsSinceCheckout: 12, priceCopyVariant: "pizza", amountCents: 795 });

  const reason = sanitizeCheckoutExitProperties("checkout_exit_reason", { cvId: "cv-1", reason: "payment_method", detail: "PayPal, jan@example.nl" });
  assert.equal(reason.reason, "payment_method");
  assert.equal(reason.detail, "PayPal, [verwijderd]");

  const noDetail = sanitizeCheckoutExitProperties("checkout_exit_reason", { cvId: "cv-1", reason: "too_expensive", detail: "my whole story" });
  assert.equal("detail" in noDetail, false, "text is only kept for 'payment method' and 'something else'");
  assert.equal(sanitizeCheckoutExitProperties("checkout_exit_reason", { reason: "drop table" }).reason, "other");
});

test("every reason has an option and a reply in both languages, with the current price", () => {
  for (const locale of ["nl", "en"] as const) {
    const copy = getCheckoutExitCopy(locale);
    assert.deepEqual(copy.options.map((option) => option.reason), [...CHECKOUT_EXIT_REASONS]);
    for (const reason of CHECKOUT_EXIT_REASONS) assert.ok(copy.replies[reason].length > 20, `${locale} ${reason}`);
    const price = locale === "en" ? cvDownloadPrice.displayEn : cvDownloadPrice.display;
    assert.ok(copy.replies.expected_free.includes(price));
    assert.ok(copy.replies.too_expensive.includes(price));
  }
});
