import test from "node:test";
import assert from "node:assert/strict";
import { getPdfRenderOrigin, getPdfRenderer } from "./pdf";

test("the template renderer is opt-in; anything else keeps the legacy builder", () => {
  assert.equal(getPdfRenderer({}), "legacy");
  assert.equal(getPdfRenderer({ PDF_RENDERER: "react" }), "react");
  assert.equal(getPdfRenderer({ PDF_RENDERER: " React " }), "react");
  assert.equal(getPdfRenderer({ PDF_RENDERER: "yes" }), "legacy");
});

test("production renders through the app inside its own container, not the public site", () => {
  assert.equal(getPdfRenderOrigin("https://werkcv.nl", { NODE_ENV: "production" }), "http://127.0.0.1:3000");
  assert.equal(getPdfRenderOrigin("https://werkcv.nl", { NODE_ENV: "production", PORT: "4000" }), "http://127.0.0.1:4000");
  assert.equal(getPdfRenderOrigin("https://werkcv.nl", { NODE_ENV: "production", PDF_RENDER_ORIGIN: "http://app:3000/" }), "http://app:3000");
  assert.equal(getPdfRenderOrigin("http://localhost:3021", { NODE_ENV: "development" }), "http://localhost:3021");
});
