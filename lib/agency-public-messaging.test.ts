import { strict as assert } from "node:assert";
import test from "node:test";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";

const disabledCapabilities = getAgencyPublicCapabilities({});
const verifierCapabilities = getAgencyPublicCapabilities({ PROPOSAL_CLAIM_VERIFIER_ENABLED: "1" });

test("verifier-off public messaging describes vacancy requirements in both locales", () => {
  for (const locale of ["nl", "en"] as const) {
    const messaging = getAgencyPublicMessaging({ locale, capabilities: disabledCapabilities });
    const serialised = JSON.stringify(messaging);

    assert.equal(messaging.mode, "requirement_evidence");
    assert.ok(messaging.title.length <= 80);
    assert.ok(messaging.description.length <= 180);
    assert.match(serialised, /requirement|eis|functie-eis|vacature/i);
    assert.doesNotMatch(serialised, /every client-facing|client-facing proposal claim|proposal claim|proposed claim|voorstelclaim|klantclaim/i);
    assert.doesNotMatch(serialised, /truth verified|hallucination[- ]free|guaranteed accurate|match score|ranking|truth verification|waarheidsverificatie/i);
  }
});

test("verifier-on public messaging adds claim review without decisioning promises", () => {
  for (const locale of ["nl", "en"] as const) {
    const messaging = getAgencyPublicMessaging({ locale, capabilities: verifierCapabilities });
    const serialised = JSON.stringify(messaging);

    assert.equal(messaging.mode, "proposal_claim_verification");
    assert.match(serialised, /claim|claim[s]?|claim\b|klantclaim|claims/i);
    assert.doesNotMatch(serialised, /truth verified|hallucination[- ]free|guaranteed accurate|match score|ranking|winner|aanbeveling/i);
  }
});

test("the messaging workflow has four ordered steps and a flag-safe CTA", () => {
  const off = getAgencyPublicMessaging({ locale: "en", capabilities: disabledCapabilities });
  const on = getAgencyPublicMessaging({ locale: "en", capabilities: verifierCapabilities });

  assert.deepEqual(off.workflow.map((step) => step.number), ["01", "02", "03", "04"]);
  assert.deepEqual(on.workflow.map((step) => step.number), ["01", "02", "03", "04"]);
  assert.equal(off.freeToolCta, "Check CV evidence free");
  assert.equal(on.freeToolCta, "Check proposal claims free");
});
