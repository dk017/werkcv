import assert from "node:assert/strict";
import test from "node:test";
import { clientErrorMessage } from "./client-error";

test("keeps the error type and the start of the message", () => {
  assert.equal(clientErrorMessage(new RangeError("Maximum call stack size exceeded")), "RangeError: Maximum call stack size exceeded");
  assert.equal(clientErrorMessage(new Error("Minified React error #310; visit https://react.dev/errors/310")).startsWith("Error: Minified React error #310"), true);
});

test("removes emails and long numbers and caps the length", () => {
  assert.equal(clientErrorMessage(new Error("no user jan.jansen@example.nl with id 1234567")), "Error: no user [email] with id [n]");
  assert.equal(clientErrorMessage(new Error("x".repeat(500))).length, 140);
  assert.equal(clientErrorMessage("plain string"), "plain string");
  assert.equal(clientErrorMessage(undefined), "");
});
