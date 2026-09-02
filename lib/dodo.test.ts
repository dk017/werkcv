import assert from "node:assert/strict";
import test from "node:test";

process.env.DODO_PRODUCT_ID = "product_test";
process.env.DODO_AGENCY_PRODUCT_ID = "agency_product_test";
process.env.NEXT_PUBLIC_APP_URL = "https://werkcv.nl";

const dodoModule = import("./dodo");

test("English checkout keeps the English return flow and explicitly requests English", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-123", "person@example.com", "en");
  const customization = body.customization as Record<string, unknown>;
  const featureFlags = body.feature_flags as Record<string, unknown>;

  assert.equal(body.return_url, "https://werkcv.nl/success?lang=en&cvId=cv-123");
  assert.equal(body.cancel_url, "https://werkcv.nl/en/editor?id=cv-123");
  assert.equal(customization.force_language, "en");
  assert.equal(featureFlags.allow_currency_selection, true);
  assert.equal(body.billing_address, undefined);
  assert.deepEqual(body.customer, { email: "person@example.com" });
  assert.ok((body.allowed_payment_method_types as string[]).includes("credit"));
});

test("Dutch checkout preserves EUR, iDEAL and Dutch checkout language", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-456", undefined, "nl");
  const customization = body.customization as Record<string, unknown>;
  const featureFlags = body.feature_flags as Record<string, unknown>;

  assert.equal(body.return_url, "https://werkcv.nl/success?lang=nl&cvId=cv-456");
  assert.equal(body.cancel_url, "https://werkcv.nl/editor?id=cv-456");
  assert.equal(customization.force_language, "nl");
  assert.equal(featureFlags.allow_currency_selection, false);
  assert.equal(body.billing_currency, "EUR");
  assert.ok((body.allowed_payment_method_types as string[]).includes("ideal"));
});

test("English Agency checkout keeps EUR billing and returns to the shared account", async () => {
  const { buildAgencyDodoCheckoutBody } = await dodoModule;
  const body = buildAgencyDodoCheckoutBody("recruiter@example.com", "en");
  const customization = body.customization as Record<string, unknown>;

  assert.equal(body.return_url, "https://werkcv.nl/agency/account?status=success&locale=en");
  assert.equal(body.cancel_url, "https://werkcv.nl/en/agency?checkout=cancelled");
  assert.equal(body.billing_currency, "EUR");
  assert.equal(customization.force_language, "en");
  assert.deepEqual(body.customer, { email: "recruiter@example.com" });
});

test("Dutch Agency checkout preserves the Dutch commercial return path", async () => {
  const { buildAgencyDodoCheckoutBody } = await dodoModule;
  const body = buildAgencyDodoCheckoutBody(undefined, "nl");
  const customization = body.customization as Record<string, unknown>;

  assert.equal(body.return_url, "https://werkcv.nl/agency/account?status=success&locale=nl");
  assert.equal(body.cancel_url, "https://werkcv.nl/agency?checkout=cancelled");
  assert.equal(customization.force_language, "nl");
});
