import assert from "node:assert/strict";
import test from "node:test";

process.env.DODO_PRODUCT_ID = "product_test";
process.env.DODO_AGENCY_PRODUCT_ID = "agency_product_test";
process.env.DODO_JOB_PASS_PRODUCT_ID = "job_pass_product_test";
process.env.NEXT_PUBLIC_APP_URL = "https://werkcv.nl";
process.env.DODO_API_KEY ||= "test-key-not-sent";

const dodoModule = import("./dodo");

test("English checkout keeps the English return flow and explicitly requests English", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-123", "person@example.com", "en");
  const customization = body.customization as Record<string, unknown>;
  const featureFlags = body.feature_flags as Record<string, unknown>;

  assert.equal(body.return_url, "https://werkcv.nl/success?lang=en&cvId=cv-123");
  assert.equal(body.cancel_url, "https://werkcv.nl/en/editor?id=cv-123&checkout=cancelled");
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
  assert.equal(body.cancel_url, "https://werkcv.nl/editor?id=cv-456&checkout=cancelled");
  assert.equal(customization.force_language, "nl");
  assert.equal(featureFlags.allow_currency_selection, false);
  assert.equal(body.billing_currency, "EUR");
  assert.ok((body.allowed_payment_method_types as string[]).includes("ideal"));
});

test("English CV bought from the Netherlands gets EUR, NL billing and iDEAL", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-789", undefined, "en", "nl");
  const customization = body.customization as Record<string, unknown>;
  const featureFlags = body.feature_flags as Record<string, unknown>;

  assert.equal(customization.force_language, "en");
  assert.equal(body.return_url, "https://werkcv.nl/success?lang=en&cvId=cv-789");
  assert.equal(featureFlags.allow_currency_selection, false);
  assert.equal(body.billing_currency, "EUR");
  assert.deepEqual(body.billing_address, { country: "NL", zipcode: "1012JS" });
  assert.ok((body.allowed_payment_method_types as string[]).includes("ideal"));
  assert.ok(!(body.allowed_payment_method_types as string[]).includes("upi_collect"));
});

test("Dutch CV bought from outside the euro area: country filled in, local currency, not forced to NL", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-790", undefined, "nl", "IN");
  const customization = body.customization as Record<string, unknown>;
  const featureFlags = body.feature_flags as Record<string, unknown>;

  assert.equal(customization.force_language, "nl");
  assert.equal(featureFlags.allow_currency_selection, true);
  assert.deepEqual(body.billing_address, { country: "IN" });
  assert.equal(body.billing_currency, undefined);
  assert.ok((body.allowed_payment_method_types as string[]).includes("upi_collect"));
});

test("Invalid visitor country falls back to the CV language", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const english = buildDodoCheckoutBody("cv-791", undefined, "en", "");
  const dutch = buildDodoCheckoutBody("cv-792", undefined, "nl", "Netherlands");

  assert.equal(english.billing_address, undefined);
  assert.equal(dutch.billing_currency, "EUR");
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

test("Agency checkout carries only the registered route attribution into provider metadata", async () => {
  const { buildAgencyDodoCheckoutBody } = await dodoModule;
  const body = buildAgencyDodoCheckoutBody(undefined, "en", {
    version: 1,
    firstTouchAt: "2026-09-02T10:00:00.000Z",
    firstTouchPath: "/en/agency",
    firstTouchCluster: "en-agency",
    firstTouchReferrer: "https://www.google.com/search",
    lastTouchAt: "2026-09-02T10:00:00.000Z",
    lastTouchPath: "/en/agency",
    lastTouchCluster: "en-agency",
    locale: "en",
    utmSource: "google",
    utmMedium: "organic",
    utmCampaign: "",
    utmTerm: "",
    utmContent: "",
    gclid: "",
    fbclid: "",
    msclkid: "",
  });
  const metadata = body.metadata as Record<string, unknown>;
  assert.equal(metadata.agency_route_id, "en_product");
  assert.equal(metadata.agency_locale, "en");
  assert.equal(metadata.agency_utm_source, "google");
  assert.equal(metadata.firstTouchPath, undefined);
});

test("Agency checkout metadata carries the 99/300 contract without personal or document identifiers", async () => {
  const { buildAgencyDodoCheckoutBody } = await dodoModule;
  const body = buildAgencyDodoCheckoutBody("recruiter@example.com", "en");
  const metadata = body.metadata as Record<string, unknown>;
  assert.deepEqual(
    {
      product: metadata.product,
      plan_code: metadata.plan_code,
      plan_version: metadata.plan_version,
      credit_limit: metadata.credit_limit,
      display_price_cents: metadata.display_price_cents,
      currency: metadata.currency,
    },
    {
      product: "agency",
      plan_code: "agency",
      plan_version: "agency_99_300_2026_09",
      credit_limit: "300",
      display_price_cents: "9900",
      currency: "EUR",
    },
  );
  const metadataText = JSON.stringify(metadata).toLowerCase();
  assert.doesNotMatch(metadataText, /email|cv[_-]?id|candidate|vacancy|proposal/u);
});

test("Euro-area buyers pay in EUR with their country filled in; local methods wait for DODO_EU_LOCAL_METHODS", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  delete process.env.DODO_EU_LOCAL_METHODS;
  for (const country of ["BE", "DE", "ES", "PT", "IT"]) {
    const body = buildDodoCheckoutBody("cv-800", undefined, "en", country);
    assert.equal(body.billing_currency, "EUR", country);
    assert.deepEqual(body.billing_address, { country }, country);
    assert.equal((body.feature_flags as Record<string, unknown>).allow_currency_selection, false, country);
    const methods = body.allowed_payment_method_types as string[];
    assert.ok(!methods.includes("bancontact_card") && !methods.includes("upi_collect"), country);
  }
  const poland = buildDodoCheckoutBody("cv-804", undefined, "en", "PL");
  assert.equal(poland.billing_currency, undefined, "outside the euro area the currency follows the country");
  assert.deepEqual(poland.billing_address, { country: "PL" });
});

test("If Dodo rejects the filled-in country or currency, the checkout is retried once without them", async () => {
  const { buildDodoCheckoutURL } = await dodoModule;
  const original = globalThis.fetch;
  const payloads: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async (_url: string, init: { body: string }) => {
    payloads.push(JSON.parse(init.body));
    return payloads.length === 1
      ? new Response("unsupported billing country", { status: 422 })
      : new Response(JSON.stringify({ checkout_url: "https://checkout.example/x", session_id: "cks_1" }), { status: 200 });
  }) as unknown as typeof fetch;
  const originalError = console.error;
  console.error = () => undefined;
  try {
    const result = await buildDodoCheckoutURL("cv-805", undefined, "en", "DE");
    assert.equal(result.checkoutUrl, "https://checkout.example/x");
    assert.equal(payloads.length, 2);
    assert.deepEqual(payloads[0].billing_address, { country: "DE" });
    assert.equal(payloads[1].billing_address, undefined);
    assert.equal(payloads[1].billing_currency, undefined);
    assert.equal((payloads[1].feature_flags as Record<string, unknown>).allow_currency_selection, true);
  } finally {
    globalThis.fetch = original;
    console.error = originalError;
  }
});

test("With DODO_EU_LOCAL_METHODS on, BE/AT/PT get EUR, their country and their local method", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  process.env.DODO_EU_LOCAL_METHODS = "true";
  try {
    for (const [country, method] of [["BE", "bancontact_card"], ["AT", "eps"], ["PT", "multibanco"]] as const) {
      const body = buildDodoCheckoutBody("cv-801", undefined, "nl", country);
      const methods = body.allowed_payment_method_types as string[];
      assert.equal(body.billing_currency, "EUR");
      assert.deepEqual(body.billing_address, { country });
      assert.equal(methods[0], method);
      assert.ok(methods.includes("credit") && methods.includes("apple_pay"));
      assert.ok(!methods.includes("upi_collect"));
      assert.equal((body.feature_flags as Record<string, unknown>).allow_currency_selection, false);
    }
    const germany = buildDodoCheckoutBody("cv-802", undefined, "en", "DE");
    assert.equal(germany.billing_currency, "EUR", "euro-area countries without a local method get EUR");
    assert.equal((germany.allowed_payment_method_types as string[])[0], "ideal", "and no local method of their own");
    const nl = buildDodoCheckoutBody("cv-803", undefined, "en", "NL");
    assert.deepEqual(nl.billing_address, { country: "NL", zipcode: "1012JS" });
  } finally {
    delete process.env.DODO_EU_LOCAL_METHODS;
  }
});

test("Sollicitatiepas checkout uses the pass product and says so in the metadata", async () => {
  const { buildDodoCheckoutBody } = await dodoModule;
  const body = buildDodoCheckoutBody("cv-900", undefined, "nl", "NL", "job-pass");
  assert.deepEqual(body.product_cart, [{ product_id: "job_pass_product_test", quantity: 1 }]);
  assert.equal((body.metadata as Record<string, unknown>).product, "job-pass");
  assert.equal((body.metadata as Record<string, unknown>).cv_id, "cv-900");
  assert.equal(body.billing_currency, "EUR");

  const single = buildDodoCheckoutBody("cv-901", undefined, "nl", "NL");
  assert.deepEqual(single.product_cart, [{ product_id: "product_test", quantity: 1 }]);
  assert.equal((single.metadata as Record<string, unknown>).product, "cv-download");
});

test("Dodo product ids map back to the order product", async () => {
  const { checkoutProductForDodoProductId } = await dodoModule;
  assert.equal(checkoutProductForDodoProductId("job_pass_product_test"), "job-pass");
  assert.equal(checkoutProductForDodoProductId("product_test"), "cv-download");
  assert.equal(checkoutProductForDodoProductId("agency_product_test"), null);
  assert.equal(checkoutProductForDodoProductId(null), null);
});
