import assert from "node:assert/strict";
import test from "node:test";
import { getPublicCvClaimKey } from "./public-cv-claim";

test("public CV claim keys are deterministic and scoped to owner/workspace", () => {
  const personal = getPublicCvClaimKey("user-1", null, "draft_1234567890123456");
  assert.equal(personal, getPublicCvClaimKey("user-1", null, "draft_1234567890123456"));
  assert.match(personal, /^[a-f0-9]{64}$/);
  assert.notEqual(personal, getPublicCvClaimKey("user-2", null, "draft_1234567890123456"));
  assert.notEqual(personal, getPublicCvClaimKey("user-1", "agency-1", "draft_1234567890123456"));
  assert.notEqual(personal, getPublicCvClaimKey("user-1", null, "draft_abcdefghijklmnop"));
});
