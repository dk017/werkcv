import assert from "node:assert/strict";
import test from "node:test";
import { advertLanguage, compareSalary, dutchRequirement, parseAdvertisedSalary, parseAmount } from "./job-signals";

test("amounts are read in Dutch and English notation", () => {
  assert.equal(parseAmount("4.500"), 4500);
  assert.equal(parseAmount("4,500"), 4500);
  assert.equal(parseAmount("4.500,00"), 4500);
  assert.equal(parseAmount("60", "K"), 60000);
  assert.equal(parseAmount("25,50"), 25.5);
  assert.equal(parseAmount("4 500"), 4500);
});

test("a monthly range in Dutch", () => {
  const salary = parseAdvertisedSalary("Wij bieden: € 4.500 – € 5.500 bruto per maand, 30 vakantiedagen");
  assert.deepEqual({ ...salary, text: undefined }, { min: 4500, max: 5500, period: "month", text: undefined });
});

test("LinkedIn and Indeed salary formats", () => {
  assert.deepEqual(parseAdvertisedSalary("€4,000/month - €5,000/month")?.period, "month");
  const yearly = parseAdvertisedSalary("€60K/yr - €80K/yr · Full-time")!;
  assert.equal(yearly.min, 60000);
  assert.equal(yearly.max, 80000);
  assert.equal(yearly.period, "year");
  assert.equal(parseAdvertisedSalary("Salary: EUR 72,000 per year plus bonus")?.period, "year");
  assert.equal(parseAdvertisedSalary("€ 25 - € 30 per uur")?.period, "hour");
  assert.equal(parseAdvertisedSalary("€60 - 80K")?.min, 60000);
});

test("without a period word, the size of the amount decides", () => {
  assert.equal(parseAdvertisedSalary("Salary €3.800 - €4.600")?.period, "month");
  assert.equal(parseAdvertisedSalary("Salary €65.000 - €75.000")?.period, "year");
  assert.equal(parseAdvertisedSalary("€ 22,50")?.period, "hour");
  assert.equal(parseAdvertisedSalary("No salary mentioned here"), null);
  assert.equal(parseAdvertisedSalary("Bonus of €5"), null);
});

test("the salary verdict against a threshold", () => {
  const month = (min: number, max = min) => ({ min, max, period: "month" as const, text: "" });
  assert.equal(compareSalary(month(4500), 4357).verdict, "above");
  assert.equal(compareSalary(month(4000), 4357).verdict, "below");
  assert.equal(compareSalary(month(4000, 5000), 4357).verdict, "range");
  assert.equal(compareSalary({ min: 30, max: 30, period: "hour", text: "" }, 4357).verdict, "unclear");
});

test("a yearly amount holds either way, or is unclear when holiday allowance decides it", () => {
  const year = (amount: number) => ({ min: amount, max: amount, period: "year" as const, text: "" });
  assert.equal(compareSalary(year(80000), 5942).verdict, "above", "80,000 / 12.96 = 6,173");
  assert.equal(compareSalary(year(60000), 5942).verdict, "below", "60,000 / 12 = 5,000");
  assert.equal(compareSalary(year(74000), 5942).verdict, "unclear", "74,000 / 12 = 6,167 but / 12.96 = 5,710");
  assert.equal(compareSalary(year(72000), 5942).monthlyMin, 6000);
});

test("Dutch requirements in English and Dutch adverts", () => {
  assert.equal(dutchRequirement("You are fluent in Dutch and English.").level, "required");
  assert.equal(dutchRequirement("Fluency in both English and Dutch is required").level, "required");
  assert.equal(dutchRequirement("Dutch is a must for this role").level, "required");
  assert.equal(dutchRequirement("We are looking for a Dutch-speaking account manager").level, "required");
  assert.equal(dutchRequirement("Je spreekt en schrijft vloeiend Nederlands").level, "required");
  assert.equal(dutchRequirement("Uitstekende beheersing van de Nederlandse taal").level, "required");
});

test("a plus or a negation is not a requirement", () => {
  assert.equal(dutchRequirement("Speaking Dutch is a plus").level, "plus");
  assert.equal(dutchRequirement("Dutch language skills are a nice-to-have").level, "plus");
  assert.equal(dutchRequirement("No Dutch required. Fluent English is a must.").level, "not_required");
  assert.equal(dutchRequirement("Dutch is not required, but fluent Dutch speakers are welcome").level, "not_required");
  assert.equal(dutchRequirement("Our team speaks English every day.").level, "none_found");
});

test("the advert language comes from common words", () => {
  const nl = "Wij zoeken een collega voor ons team. Je hebt ervaring met de klant en je bent niet bang om op te vallen. Bij ons werk je in een open cultuur met veel ruimte voor jouw ideeën.";
  const en = "We are looking for a colleague to join our team. You have experience with the customer and you will work in an open culture where your ideas matter to us and to the business.";
  assert.equal(advertLanguage(nl), "nl");
  assert.equal(advertLanguage(en), "en");
  assert.equal(advertLanguage("Senior engineer"), "unknown");
});
