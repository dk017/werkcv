import assert from "node:assert/strict";
import { test } from "node:test";
import { aiLeftoversCheck, findAiLeftovers } from "./ai-leftovers";

const CLEAN_CV = `Sanne de Vries
Utrecht | sanne@voorbeeld.nl | 06-12345678
Profiel
Medewerker klantenservice met 3 jaar ervaring in telefonisch en schriftelijk klantcontact.
Werkervaring
Medewerker klantenservice, Energiebedrijf (2023 - heden)
- Beantwoordde gemiddeld 60 klantvragen per dag
- Verlaagde de afhandeltijd met 15%
Talen
Nederlands (moedertaal), Engels (C1)`;

test("clean CV has no leftovers", () => {
  assert.deepEqual(findAiLeftovers(CLEAN_CV), []);
  assert.equal(aiLeftoversCheck(CLEAN_CV, "nl").status, "pass");
});

test("finds placeholders, markdown and chatbot text as seen in ChatGPT output", () => {
  const pasted = `Natuurlijk, hieronder staat een aangepaste versie van je cv.
## Persoonlijke gegevens
**Naam:** Sanne Voorbeeld
**Telefoon:** [jouw telefoonnummer]
- Kotlin: basiskennis (alleen opnemen als dit klopt)
Als je wél ervaring hebt met HiX, voeg dan toe onder vaardigheden.`;
  const kinds = new Set(findAiLeftovers(pasted).map((hit) => hit.kind));
  assert.deepEqual([...kinds].sort(), ["chat", "markdown", "placeholder"]);
  const check = aiLeftoversCheck(pasted, "nl");
  assert.equal(check.status, "fail");
  assert.equal(check.severity, "critical");
  assert.match(check.fix ?? "", /invulvelden/);
  assert.ok(check.evidence && check.evidence.length <= 90);
});

test("English report copy", () => {
  const check = aiLeftoversCheck("Here is your CV:\nName: [Your name]", "en");
  assert.equal(check.status, "fail");
  assert.match(check.fix ?? "", /placeholders/);
});

test("markdown alone is important, not critical", () => {
  const check = aiLeftoversCheck("**Werkervaring**\nMedewerker klantenservice (2023 - heden)", "nl");
  assert.equal(check.status, "fail");
  assert.equal(check.severity, "important");
});

test("finds English chatbot framing", () => {
  const pasted = "Below is a tailored, honest version of your CV for the vacancy.\nProfile\nWarehouse operative with forklift experience.";
  assert.ok(findAiLeftovers(pasted).some((hit) => hit.kind === "chat"));
});
