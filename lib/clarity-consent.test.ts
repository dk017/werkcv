import assert from "node:assert/strict";
import test from "node:test";
import { CLARITY_STORED_CONSENT_SNIPPET, clarityConsentPayload, readClarityConsent } from "./clarity-consent";

test("reads only a valid stored choice", () => {
  assert.equal(readClarityConsent("a=1; werkcv_clarity_consent_v1=granted; b=2"), "granted");
  assert.equal(readClarityConsent("werkcv_clarity_consent_v1=denied"), "denied");
  assert.equal(readClarityConsent("werkcv_clarity_consent_v1=yes"), null);
  assert.equal(readClarityConsent("werkcv_agency_analytics_v1=granted"), null);
  assert.equal(readClarityConsent(""), null);
});

test("ads storage is never granted", () => {
  assert.deepEqual(clarityConsentPayload("granted"), { ad_Storage: "denied", analytics_Storage: "granted" });
  assert.deepEqual(clarityConsentPayload("denied"), { ad_Storage: "denied", analytics_Storage: "denied" });
});

test("the stored-consent snippet re-sends the cookie value and nothing else", () => {
  const calls: unknown[][] = [];
  const run = (cookie: string) => {
    calls.length = 0;
    const window = { clarity: (...args: unknown[]) => calls.push(args) };
    const document = { cookie };
    new Function("window", "document", CLARITY_STORED_CONSENT_SNIPPET)(window, document);
    return calls.slice();
  };
  assert.deepEqual(run("x=1; werkcv_clarity_consent_v1=granted"), [["consentv2", { ad_Storage: "denied", analytics_Storage: "granted" }]]);
  assert.deepEqual(run("werkcv_clarity_consent_v1=denied"), [["consentv2", { ad_Storage: "denied", analytics_Storage: "denied" }]]);
  assert.deepEqual(run("x=1"), []);
});
