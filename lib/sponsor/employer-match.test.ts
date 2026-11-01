import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import { SPONSOR_ALIASES, compileAliases } from "./aliases";
import { employerIndexFromEntries, employerNameVariants, matchEmployer, searchEmployer, type EmployerIndex } from "./employer-match";

// The register as the Chrome extension ships it (chrome-extension/werkcv-visa-sponsor-checker/data/register.json,
// written by its build.mjs from the IND page), so the test checks exactly what users get.
const data = JSON.parse(readFileSync(path.join(process.cwd(), "chrome-extension/werkcv-visa-sponsor-checker/data/register.json"), "utf8")) as {
  registerDate: string;
  entries: [string, string][];
};
const index = employerIndexFromEntries(data.entries, compileAliases(), data.registerDate);

// Employers from public LinkedIn job cards in the Netherlands, labelled by hand against the register: "yes" (the
// employer's own entity is listed, with the acceptable KvK numbers), "related" (only a sister company is listed) or "no".
// "tuning" (31 Oct 2026) shaped the rules; "holdout" (1 Nov 2026) was labelled before the last changes.
type Golden = { set: "tuning" | "holdout"; name: string; slug: string; label: "yes" | "related" | "no"; kvk?: string[] };
const golden = JSON.parse(readFileSync(path.join(process.cwd(), "lib/sponsor/fixtures/linkedin-employers-golden.json"), "utf8")) as Golden[];

const tiny = (entries: [string, string][], aliases = {}) => employerIndexFromEntries(entries, aliases, "2026-10-05");
const tier = (idx: EmployerIndex, name: string, slug?: string) => matchEmployer(idx, { name, slug }).tier;

test("name variants drop taglines, generic words and brackets", () => {
  assert.deepEqual(employerNameVariants("Foot Locker EMEA"), ["foot locker emea", "foot locker"]);
  assert.ok(employerNameVariants("Royal Den Hartogh Logistics").includes("den hartogh logistics"));
  assert.ok(employerNameVariants("NX GROUP (NIPPON EXPRESS GROUP)").includes("nippon express"));
  assert.ok(employerNameVariants("Logistics United B.V. - Partner in Groei").includes("logistics united"));
  assert.ok(employerNameVariants("ECEM European Chemical Marketing BV, Amsterdam").includes("ecem european chemical marketing"));
  assert.ok(employerNameVariants("Harmonic Finance™ | Certified B Corp").includes("harmonic finance"));
  assert.ok(employerNameVariants("AEB Amsterdam").includes("aeb"));
  assert.ok(employerNameVariants("Foot Locker EMEA", "foot-locker-europe").includes("foot locker"));
});

test("an exact or loose legal name is a sponsor; a longer legal name is only likely", () => {
  const idx = tiny([
    ["Tommy Hilfiger Europe B.V.", "11111111"],
    ["Coöperatieve Rabobank U.A.", "22222222"],
    ["Vanderlande Industries B.V.", "33333333"],
    ["Suit Supply B.V.", "44444444"],
  ]);
  assert.equal(tier(idx, "Tommy Hilfiger"), "sponsor");
  assert.equal(tier(idx, "Rabobank"), "sponsor");
  assert.equal(tier(idx, "Vanderlande"), "likely");
  assert.equal(tier(idx, "Suitsupply"), "sponsor");
  assert.equal(tier(idx, "Unknown Employer"), "not_found");
});

test("short or generic names never turn green on a loose match", () => {
  const idx = tiny([
    ["ACE Company B.V.", "11111111"],
    ["The Antenna Company Nederland B.V.", "22222222"],
    ["Edge Technologies Contract B.V.", "33333333"],
  ]);
  assert.equal(tier(idx, "ACE"), "likely");
  assert.notEqual(tier(idx, "Antenna"), "sponsor");
  assert.equal(tier(idx, "Edge"), "likely");
});

test("aliases match on the LinkedIn slug or the name, and a missing KvK falls through", () => {
  const idx = tiny([["PricewaterhouseCoopers B.V.", "34180289"]], { "slug:pwc": ["34180289"], "name:pwc": ["34180289"], "name:gone": ["99999999"] });
  assert.equal(matchEmployer(idx, { name: "Some display name", slug: "pwc" }).via, "slug_alias");
  assert.equal(matchEmployer(idx, { name: "PwC" }).via, "name_alias");
  assert.equal(tier(idx, "Gone"), "not_found");
});

test("a rare first word gives a likely match; a common one gives nothing", () => {
  const idx = tiny([
    ["Rhenus Air & Ocean B.V.", "11111111"],
    ["Van Leeuwen Buizen Groep B.V.", "22222222"],
  ]);
  assert.equal(matchEmployer(idx, { name: "Rhenus Logistics" }).via, "first_word");
  assert.equal(tier(idx, "Van Leeuwen Stainless"), "not_found");
});

test("a sponsor lists its other registered entities after the matched one", () => {
  const result = matchEmployer(index, { name: "Philips" });
  assert.equal(result.tier, "sponsor");
  assert.equal(result.matches[0].name, "Philips Nederland B.V.");
  assert.ok(result.matches.length > 1);
  assert.ok(result.matches.every((entry) => /philips/i.test(entry.name)));
});

test("the web checker answers brands the way the badges do", () => {
  const aliases = compileAliases();
  const ing = searchEmployer(index.register, aliases, "ING");
  assert.equal(ing.status, "listed");
  assert.equal(ing.matches[0].match, "exact");
  assert.ok(ing.matches.some((entry) => entry.name === "ING Bank N.V."));
  assert.equal(searchEmployer(index.register, aliases, "Tommy Hilfiger").status, "listed");
  assert.equal(searchEmployer(index.register, aliases, "Vanderlande").status, "possible");
  assert.equal(searchEmployer(index.register, aliases, "Zzyzx Qwerty Consultancy").status, "not_found");
  const philips = searchEmployer(index.register, aliases, "Philips");
  assert.equal(philips.status, "listed");
  const kvk = data.entries.find(([name]) => name === "ING Bank N.V.")![1];
  assert.equal(searchEmployer(index.register, aliases, kvk).matches[0].name, "ING Bank N.V.");
});

test("every alias KvK number is still on the register", () => {
  const kvks = new Set(data.entries.map(([, kvk]) => kvk));
  const missing = SPONSOR_ALIASES.flatMap((alias) => Object.entries(alias.entities).filter(([kvk]) => !kvks.has(kvk)).map(([kvk, name]) => `${alias.brand}: ${name} (${kvk})`));
  assert.deepEqual(missing, [], "update lib/sponsor/aliases.ts for these entries");
});

for (const set of ["tuning", "holdout"] as const) {
  test(`golden set (${set}): green precision at least 98%, green plus amber recall at least 85%`, () => {
    const rows = golden.filter((row) => row.set === set);
    let green = 0;
    let greenRight = 0;
    let sponsors = 0;
    let found = 0;
    const wrong: string[] = [];
    for (const row of rows) {
      const result = matchEmployer(index, row);
      const right = (row.kvk ?? []).some((kvk) => result.matches.some((entry) => entry.kvk === kvk));
      if (result.tier === "sponsor") {
        green++;
        if (row.label === "yes" && right) greenRight++;
        else wrong.push(`green: ${row.name} -> ${result.matches.map((entry) => entry.name).join("; ")}`);
      }
      if (row.label === "yes") {
        sponsors++;
        if (result.tier !== "not_found" && right) found++;
        else wrong.push(`missed: ${row.name}`);
      }
    }
    const precision = greenRight / green;
    const recall = found / sponsors;
    assert.ok(precision >= 0.98, `green precision ${precision.toFixed(3)}\n${wrong.join("\n")}`);
    assert.ok(recall >= 0.85, `recall ${recall.toFixed(3)}\n${wrong.join("\n")}`);
  });
}

test("matching a page of employers is fast", () => {
  const rows = golden.slice(0, 100);
  const start = performance.now();
  for (const row of rows) matchEmployer(index, row);
  const perCard = (performance.now() - start) / rows.length;
  assert.ok(perCard < 2, `${perCard.toFixed(2)} ms per card`);
});
