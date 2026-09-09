import assert from "node:assert/strict";
import test from "node:test";
import { clarityAllowedOnPath } from "./ConditionalClarity";

test("session replay is excluded from source-content and candidate review routes", () => {
  assert.equal(clarityAllowedOnPath("/tools/kandidaatvoorstel-checker"), false);
  assert.equal(clarityAllowedOnPath("/en/candidate-proposal-checker"), false);
  assert.equal(clarityAllowedOnPath("/kandidaat/bevestigen"), false);
  assert.equal(clarityAllowedOnPath("/en/agency"), false);
  assert.equal(clarityAllowedOnPath("/agency/account"), false);
  assert.equal(clarityAllowedOnPath("/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld"), false);
  assert.equal(clarityAllowedOnPath("/prijzen"), true);
});
