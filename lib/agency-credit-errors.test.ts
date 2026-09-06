import { strict as assert } from "node:assert";
import test from "node:test";
import { getAgencyCreditErrorPayload, getAgencyCreditLimitDetails } from "@/lib/agency-credit-errors";
import { AgencyAccessError, serializeAgencyAccessError } from "@/lib/agency-access";

test("credit diagnostics report actual usage, allowance, remaining and request", () => {
  assert.deepEqual(getAgencyCreditLimitDetails({ used: 300, limit: 300, requested: 1 }, "en"), {
    used: 300,
    limit: 300,
    requested: 1,
    remaining: 0,
    shortfall: 1,
    error: "300 of 300 shared CV credits have been used in this billing period.",
  });

  assert.deepEqual(getAgencyCreditErrorPayload({ used: 295, limit: 300, requested: 8 }, "en"), {
    error: "295 of 300 shared CV credits have been used in this billing period. This request uses 8 credits; 5 remain.",
    used: 295,
    limit: 300,
    remaining: 5,
    requested: 8,
  });
});

test("credit diagnostics are localised and clamp invalid arithmetic safely", () => {
  const dutch = getAgencyCreditLimitDetails({ used: 295, limit: 300, requested: 8 }, "nl");
  assert.equal(dutch.error, "295 van de 300 gedeelde CV-credits zijn deze betaalperiode gebruikt. Deze aanvraag gebruikt 8 credits; er zijn nog 5 beschikbaar.");
  assert.equal(dutch.remaining, 5);
  assert.equal(dutch.shortfall, 3);

  const exhausted = getAgencyCreditLimitDetails({ used: 999, limit: 300, requested: 0 }, "en");
  assert.equal(exhausted.remaining, 0);
  assert.equal(exhausted.shortfall, 1);
  assert.equal(exhausted.requested, 1);
});

test("credit diagnostics preserve custom allowances and stored zero", () => {
  assert.equal(getAgencyCreditLimitDetails({ used: 749, limit: 750, requested: 1 }, "en").remaining, 1);
  assert.equal(getAgencyCreditLimitDetails({ used: 0, limit: 0, requested: 1 }, "en").remaining, 0);
  assert.equal(getAgencyCreditLimitDetails({ used: 0, limit: 0, requested: 1 }, "en").limit, 0);
});

test("authenticated access errors preserve the stable code and bounded credit context", () => {
  const error = new AgencyAccessError(
    "AGENCY_QUOTA_REACHED",
    "internal message must not replace diagnostics",
    { used: 295, limit: 300, requested: 8, locale: "en" },
  );

  assert.deepEqual(serializeAgencyAccessError(error, "en"), {
    error: "295 of 300 shared CV credits have been used in this billing period. This request uses 8 credits; 5 remain.",
    used: 295,
    limit: 300,
    remaining: 5,
    requested: 8,
    code: "AGENCY_QUOTA_REACHED",
  });
});
