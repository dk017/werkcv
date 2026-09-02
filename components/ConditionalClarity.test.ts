import assert from "node:assert/strict";
import test from "node:test";
import { clarityAllowedOnPath } from "./ConditionalClarity";

test("session replay is excluded from source-content and candidate review routes", () => {
  assert.equal(clarityAllowedOnPath("/tools/kandidaatvoorstel-checker"), false);
  assert.equal(clarityAllowedOnPath("/en/candidate-proposal-checker"), false);
  assert.equal(clarityAllowedOnPath("/kandidaat/bevestigen"), false);
  assert.equal(clarityAllowedOnPath("/en/agency"), true);
});
