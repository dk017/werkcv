import assert from "node:assert/strict";
import test from "node:test";
import { cvSchema } from "./cv";
import { dutchLinkedInDate, dutchLinkedInLocation, localizeLinkedInCvForDutch } from "./linkedin-dutch-format";

test("LinkedIn export dates become Dutch", () => {
  assert.equal(dutchLinkedInDate("March 2022"), "maart 2022");
  assert.equal(dutchLinkedInDate("Oct 2019"), "okt 2019");
  assert.equal(dutchLinkedInDate("Present"), "heden");
  assert.equal(dutchLinkedInDate("2015"), "2015");
  assert.equal(dutchLinkedInDate("maart 2022"), "maart 2022");
  assert.equal(dutchLinkedInDate(""), "");
});

test("LinkedIn export locations keep the Dutch city only", () => {
  assert.equal(dutchLinkedInLocation("Delft, South Holland, Netherlands"), "Delft");
  assert.equal(dutchLinkedInLocation("Utrecht, Utrecht, Netherlands"), "Utrecht");
  assert.equal(dutchLinkedInLocation("North Holland, Netherlands"), "Noord-Holland");
  assert.equal(dutchLinkedInLocation("Amsterdam Area, Netherlands"), "Amsterdam Area");
  assert.equal(dutchLinkedInLocation("Berlin, Germany"), "Berlin, Germany");
  assert.equal(dutchLinkedInLocation("Utrecht"), "Utrecht");
});

test("only dates and locations change in a localized CV", () => {
  const cv = cvSchema.parse({
    personal: { name: "Sanne", location: "Utrecht, Utrecht, Netherlands" },
    experience: [{ role: "Customer Success Manager", company: "Exact", location: "Delft, South Holland, Netherlands", start: "March 2022", end: "Present", description: "Own onboarding in March.", highlights: [] }],
    education: [{ degree: "BBA", school: "Hogeschool Utrecht", start: "2015", end: "2019" }],
  });
  const out = localizeLinkedInCvForDutch(cv);
  assert.equal(out.personal.location, "Utrecht");
  assert.equal(out.experience[0].start, "maart 2022");
  assert.equal(out.experience[0].end, "heden");
  assert.equal(out.experience[0].location, "Delft");
  assert.equal(out.experience[0].description, "Own onboarding in March.");
  assert.equal(out.education[0].start, "2015");
});
