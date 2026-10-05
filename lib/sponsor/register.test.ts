import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import {
  coreName,
  entriesForLetter,
  kvkFromQuery,
  normaliseName,
  parseIndRegisterHtml,
  registerDateFromText,
  searchSponsors,
  tidyDisplayName,
} from "./register";

// Real rows from the IND public register (work and highly skilled migrants), shortened for the tests.
const html = readFileSync(path.join(process.cwd(), "lib/sponsor/fixtures/ind-register-sample.html"), "utf8");
const register = parseIndRegisterHtml(html);
const names = (query: string, limit = 10) => searchSponsors(register, query, limit).matches.map((match) => match.name);

test("the register page is parsed: entries, KvK numbers and the update date", () => {
  assert.ok(register.entries.length >= 120);
  assert.equal(register.registerDate, "2026-10-05");
  assert.ok(register.entries.every((entry) => /^\d{8}$/.test(entry.kvk) && entry.name.length > 0));
  assert.equal(register.keys.length, register.entries.length);
});

test("the update date is read from Dutch text, and a missing or odd date is null", () => {
  assert.equal(registerDateFromText("Het overzicht is bijgewerkt op 5 oktober 2026."), "2026-10-05");
  assert.equal(registerDateFromText("Het overzicht is bijgewerkt op 12 maart 2027."), "2027-03-12");
  assert.equal(registerDateFromText("Geen datum hier"), null);
  assert.equal(registerDateFromText("bijgewerkt op 5 smarch 2026"), null);
});

test("a changed table never silently empties the checker", () => {
  assert.throws(() => parseIndRegisterHtml("<table><tr><th>Naam</th><th>Nummer</th></tr><tr><td>X</td><td>12345678</td></tr></table>"), /Unexpected register columns/);
  assert.throws(() => parseIndRegisterHtml("<p>De site wordt onderhouden</p>"), /Unexpected register columns/);
});

test("rows with a bad KvK number or an empty name are skipped, entities decoded", () => {
  const parsed = parseIndRegisterHtml(
    "<table><tr><th>Organisatie</th><th>KVK-nummer</th></tr>" +
      "<tr><td>Smit &amp; Zonen B.V.</td><td>12345678</td></tr>" +
      "<tr><td>Zonder nummer B.V.</td><td>abc</td></tr>" +
      "<tr><td></td><td>87654321</td></tr>" +
      "<tr><td>Café&nbsp;Zuid N.V.</td><td>11112222</td></tr></table>",
  );
  assert.deepEqual(parsed.entries.map((entry) => entry.name), ["Smit & Zonen B.V.", "Café Zuid N.V."]);
});

test("names are normalised: dotted abbreviations, ampersands, accents, quotes", () => {
  assert.equal(normaliseName("Booking.com B.V."), "booking com bv");
  assert.equal(normaliseName("Ghanchi - h.o.d.n FEBO"), "ghanchi hodn febo");
  assert.equal(normaliseName("Smit & Zonen"), "smit en zonen");
  assert.equal(normaliseName("Café Müller N.V."), "cafe muller nv");
  assert.equal(tidyDisplayName('""Aa-Dee"" Machinefabriek'), '"Aa-Dee" Machinefabriek');
});

test("the distinctive part of a name drops legal forms and keeps words like holding and group", () => {
  assert.equal(coreName("ASML Netherlands B.V."), "asml");
  assert.equal(coreName("Adyen N.V."), "adyen");
  assert.equal(coreName("ASML Holding N.V."), "asml holding");
  assert.equal(coreName("The Acme Limited"), "acme");
  assert.equal(coreName("B.V."), "bv", "a name that is only a legal form is kept");
});

test("the brand name finds the registered legal name as 'listed'", () => {
  const result = searchSponsors(register, "Booking.com");
  assert.equal(result.status, "listed");
  assert.ok(result.matches[0].name.startsWith("Booking.com"));
  assert.equal(result.matches[0].match, "exact");
  assert.equal(searchSponsors(register, "adyen").status, "listed");
  assert.equal(searchSponsors(register, "  ADYEN  nv ").status, "listed", "case, spaces and legal form do not matter");
});

test("an exact match ranks before close matches and is marked as such", () => {
  const result = searchSponsors(register, "ASML");
  assert.equal(result.status, "listed");
  // "ASML Netherlands B.V." reduces to exactly "asml"; "ASML Holding N.V." keeps "holding", so it is only a close match.
  assert.equal(result.matches[0].name, "ASML Netherlands B.V.");
  assert.equal(result.matches[0].match, "exact");
  const holding = result.matches.find((match) => match.name === "ASML Holding N.V.");
  assert.equal(holding?.match, "close");
  assert.ok(result.matches.findIndex((match) => match.match === "close") > result.matches.findIndex((match) => match.match === "exact"));
});

test("names that only contain the words are 'possible', never 'listed'", () => {
  const result = searchSponsors(register, "customer service");
  assert.equal(result.status, "possible");
  assert.ok(result.matches.every((match) => match.match === "close"));
  assert.ok(names("customer service").some((name) => name.includes("Customer Service")));
});

test("an unknown employer is 'not_found', and a one-letter query finds nothing", () => {
  assert.deepEqual(searchSponsors(register, "Zzyzx Qwerty Consultancy"), { status: "not_found", matches: [], total: 0 });
  assert.equal(searchSponsors(register, "a").status, "not_found");
  assert.equal(searchSponsors(register, "").status, "not_found");
});

test("a KvK number is an exact lookup, typed with spaces or dots", () => {
  const entry = register.entries.find((candidate) => candidate.name.startsWith("Adyen N.V."))!;
  for (const typed of [entry.kvk, `${entry.kvk.slice(0, 4)} ${entry.kvk.slice(4)}`, `${entry.kvk.slice(0, 2)}.${entry.kvk.slice(2, 5)}.${entry.kvk.slice(5)}`]) {
    const result = searchSponsors(register, typed);
    assert.equal(result.status, "listed", typed);
    assert.equal(result.matches[0].name, entry.name);
  }
  assert.equal(kvkFromQuery("1234567"), null, "seven digits is not a KvK number");
  assert.equal(searchSponsors(register, "00000000").status, "not_found");
});

test("a trading name after h.o.d.n. is matched on its own", () => {
  const hodn = register.entries.find((entry) => /h\.o\.d\.n/i.test(entry.name));
  assert.ok(hodn, "the fixture holds a trading-name row");
  assert.equal(searchSponsors(register, "FEBO Van Woustraat").status, "listed");
});

test("names with doubled quotes are shown with one pair and still found", () => {
  const ame = register.entries.find((entry) => entry.name.includes("AME"))!;
  assert.ok(!ame.name.includes('""'));
  assert.ok(names("Applied Micro Electronics").some((name) => name.includes("AME")));
});

test("the result list is limited, with the full count reported", () => {
  const result = searchSponsors(register, "Netherlands", 3);
  assert.ok(result.matches.length <= 3);
  assert.ok(result.total >= result.matches.length);
});

test("letter pages hold the names that start with that letter, sorted; digits and symbols go under 0", () => {
  const a = entriesForLetter(register, "a");
  assert.ok(a.length > 5 && a.every((entry) => normaliseName(entry.name).startsWith("a")));
  assert.deepEqual(a.map((entry) => entry.name), [...a].sort((x, y) => normaliseName(x.name).localeCompare(normaliseName(y.name)) || x.kvk.localeCompare(y.kvk)).map((entry) => entry.name));
  const other = entriesForLetter(register, "0");
  assert.ok(other.every((entry) => !/[a-z]/.test(normaliseName(entry.name).charAt(0))));
  const total = "0abcdefghijklmnopqrstuvwxyz".split("").reduce((sum, letter) => sum + entriesForLetter(register, letter).length, 0);
  assert.equal(total, register.entries.length, "every entry lands on exactly one letter page");
});
