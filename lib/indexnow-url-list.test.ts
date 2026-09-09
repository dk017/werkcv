import test from "node:test";
import assert from "node:assert/strict";
import { parseIndexNowUrlList } from "./indexnow-url-list";
test("scoped notification list rejects private/foreign URLs and deduplicates", () => {
  assert.deepEqual(parseIndexNowUrlList("https://werkcv.nl/agency\nhttps://werkcv.nl/agency", "werkcv.nl"), ["https://werkcv.nl/agency"]);
  for (const url of ["https://other.nl/", "https://werkcv.nl/agency/account", "https://werkcv.nl/agency?token=abc", "http://werkcv.nl/agency"]) assert.throws(() => parseIndexNowUrlList(url, "werkcv.nl"));
});
