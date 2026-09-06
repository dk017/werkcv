import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { getAgencyPublicMessaging } from "./agency-public-messaging";
import { getAgencyPublicCapabilities } from "./agency-public-capabilities";
import { getAgencyEvidenceSample, getSampleReport } from "./agency-evidence-sample";
import { getAgencyReviewScopeNotice, MAX_REVIEWED_VACANCY_REQUIREMENTS } from "./agency-review-scope";
import { getAgencyAccountLoginHref } from "./agency-account-entry";
import { inspectAgencyCheckoutProduct } from "./agency-checkout-contract";
import { agencyPrivacyFacts, getAgencyStorageDescription } from "./agency-privacy-content";

test("English account entry preserves payment context through English login", () => {
  const href = new URL(getAgencyAccountLoginHref({ locale: "en", status: "success" }), "https://werkcv.nl");
  assert.equal(href.pathname, "/login");
  assert.equal(href.searchParams.get("locale"), "en");
  const next = new URL(href.searchParams.get("next")!, href.origin);
  assert.equal(next.pathname, "/agency/account");
  assert.equal(next.searchParams.get("status"), "success");
  assert.equal(next.searchParams.get("locale"), "en");
  assert.equal(getAgencyAccountLoginHref({ locale: "https://evil.invalid", status: "anything", error: "anything" }), "/login?next=%2Fagency%2Faccount");
});

test("storage disclosure includes extracted CV text without pretending legal review is complete", () => {
  assert.match(agencyPrivacyFacts.content.storedAfterAnalysis.join(" "), /complete extracted CV text/);
  assert.match(getAgencyStorageDescription("en"), /complete extracted CV text/);
  assert.match(getAgencyStorageDescription("nl"), /volledige uitgelezen CV-tekst/);
  assert.equal(agencyPrivacyFacts.dpa.status, "legal review required");
});

test("provider check rejects a wrong price even when metadata advertises 99", () => {
  const price = { type: "recurring_price", price: 9900, currency: "EUR", payment_frequency_interval: "Month", payment_frequency_count: 1, purchasing_power_parity: false, discount: 0, tax_inclusive: false };
  const product = { is_recurring: true, price };
  assert.equal(inspectAgencyCheckoutProduct(product).passed, true);
  for (const patch of [{ price: 14900 }, { currency: "USD" }, { payment_frequency_interval: "Year" }, { payment_frequency_count: 12 }, { type: "one_time_price" }, { tax_inclusive: null }, { purchasing_power_parity: true }, { trial_period_days: 7 }]) {
    assert.equal(inspectAgencyCheckoutProduct({ ...product, price: { ...price, ...patch }, metadata: { display_price_cents: "9900" } }).passed, false);
  }
  assert.equal(inspectAgencyCheckoutProduct({ ...product, pricing_mode: "by_country" }).passed, false);
  assert.equal(inspectAgencyCheckoutProduct(null).passed, false);
});

test("requirement mode discloses limited coverage and uses the searchable category", () => {
  for (const locale of ["nl", "en"] as const) {
    const message = getAgencyPublicMessaging({ locale, capabilities: getAgencyPublicCapabilities({}) });
    assert.doesNotMatch(JSON.stringify(message), /every (?:vacancy )?requirement|iedere (?:vacature|functie)[- ]?eis|iedere eis/i);
    assert.equal(message.limitation, getAgencyReviewScopeNotice(locale));
    assert.match(message.title, locale === "en" ? /Candidate Submission Software/ : /Kandidaatvoorstel-software/);
  }
  // Protect the public limit against drift in the shared consumer analysis engine.
  const engine = readFileSync("lib/tools/cv-vacature-match.ts", "utf8");
  assert.ok(engine.includes(`analysis.requirements.slice(0, ${MAX_REVIEWED_VACANCY_REQUIREMENTS})`));
});

test("both fictional samples resolve every displayed source against their own locale CV", () => {
  for (const locale of ["nl", "en"] as const) {
    const sample = getAgencyEvidenceSample(locale);
    const report = getSampleReport(locale);
    assert.equal(report.requirements.length, sample.result.requirements.length);
    assert.ok(report.limitations.includes(getAgencyReviewScopeNotice(locale)));
    for (const row of report.requirements) {
      assert.equal(row.vacancy.match, "exact");
      if (row.cv.snippet) {
        assert.equal(row.cv.match, "exact");
        assert.ok(sample.cvText.includes(row.cv.snippet));
        assert.equal(sample.cvText.split("\n")[row.cv.line! - 1], row.cv.snippet);
      }
    }
    assert.equal(report.requirements[5].status, "missing");
    assert.equal(report.requirements[5].cv.match, "not_found");
  }
});

test("English sample input, reasons and next actions contain no Dutch fallback", () => {
  const sample = getAgencyEvidenceSample("en");
  const report = getSampleReport("en");
  assert.doesNotMatch(JSON.stringify({ sample, report }), /WERKERVARING|VAARDIGHEDEN|Functie-eisen|Behouden|navragen|Adviseerde|Niet gevonden/);
  assert.match(sample.cvText, /Advised 24 team leaders/);
  assert.equal(report.requirements[1].status, "review");
});
