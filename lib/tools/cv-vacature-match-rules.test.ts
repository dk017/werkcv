import assert from "node:assert/strict";
import test from "node:test";
import { pickTopFixes, reconcileRequirementStatus } from "./cv-vacature-match-rules";

const cv = [
  "Talen: Nederlands (moedertaal), Engels (B2), Duits (A2)",
  "Vaardigheden: Microsoft Excel, Salesforce",
].join("\n");

function requirement(requirementText: string, cvEvidence: string, status: "strong" | "partial" | "missing") {
  return { requirement: requirementText, vacancyEvidence: requirementText, cvEvidence, status };
}

test("moedertaal meets any level in that language", () => {
  const result = reconcileRequirementStatus(
    requirement("Uitstekende beheersing van de Nederlandse taal in woord en geschrift", "Nederlands (moedertaal)", "missing"),
    cv,
  );
  assert.equal(result.status, "strong");
});

test("CEFR levels: equal or higher is strong, one below partial, further below missing", () => {
  assert.equal(reconcileRequirementStatus(requirement("Engels op B2-niveau", "Engels (B2)", "missing"), cv).status, "strong");
  assert.equal(reconcileRequirementStatus(requirement("Engels op C1-niveau", "Engels (B2)", "strong"), cv).status, "partial");
  assert.equal(reconcileRequirementStatus(requirement("Duits op B2-niveau", "Duits (A2)", "partial"), cv).status, "missing");
});

test("fluent/uitstekend maps to C1", () => {
  assert.equal(reconcileRequirementStatus(requirement("Fluent English", "Engels (B2)", "strong"), cv).status, "partial");
});

test("a quote that exists in the CV is never missing", () => {
  const result = reconcileRequirementStatus(
    requirement("Ervaring met Excel, waaronder draaitabellen", "Microsoft Excel", "missing"),
    cv,
  );
  assert.equal(result.status, "partial");
});

test("a named tool present in the CV is partial even without a quote", () => {
  const result = reconcileRequirementStatus(
    requirement("Ervaring met Excel, waaronder draaitabellen", "", "missing"),
    cv,
  );
  assert.equal(result.status, "partial");
});

test("education levels and absent tools are not treated as tool matches", () => {
  const lowerLevelCv = "Opleiding: MBO 2 Retail (2020)\nVaardigheden: Excel";
  assert.equal(reconcileRequirementStatus(requirement("Minimaal MBO 4 werk- en denkniveau", "", "missing"), lowerLevelCv).status, "missing");
  assert.equal(reconcileRequirementStatus(requirement("Ervaring met Zendesk", "", "missing"), lowerLevelCv).status, "missing");
});

test("an invented quote does not upgrade a missing requirement", () => {
  const result = reconcileRequirementStatus(requirement("Rijbewijs B", "Rijbewijs B", "missing"), cv);
  assert.equal(result.status, "missing");
});

test("multi-language requirements are left to the model", () => {
  const input = requirement("Nederlands op B2 en Engels op C1", "Nederlands (moedertaal)", "partial");
  assert.equal(reconcileRequirementStatus(input, cv).status, "partial");
});

test("availability fixes rank after substantive gaps", () => {
  const fixes = [
    { title: "Vermeld flexibiliteit in beschikbaarheid", action: "Noem je zaterdagen alleen als het klopt." },
    { title: "Onderbouw verzekeringskennis", action: "Beschrijf een concreet voorbeeld." },
    { title: "Kwantificeer je klantcontact", action: "Noem aantallen." },
    { title: "Maak je profiel specifieker", action: "Noem de doelfunctie." },
  ];
  assert.deepEqual(
    pickTopFixes(fixes).map((fix) => fix.title),
    ["Onderbouw verzekeringskennis", "Kwantificeer je klantcontact", "Maak je profiel specifieker"],
  );
});

test("availability fixes still fill the list when there are too few other gaps", () => {
  const fixes = [
    { title: "Onderbouw verzekeringskennis", action: "Beschrijf een voorbeeld." },
    { title: "Noem je beschikbaarheid", action: "Alleen als het klopt." },
  ];
  assert.equal(pickTopFixes(fixes).length, 2);
});
