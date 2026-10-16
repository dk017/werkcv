import { afterEach, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import { sampleCV } from "./cv";
import {
  getOrAssignStartChoiceVariant,
  isStartChoiceDone,
  markStartChoiceDone,
  searchStartExamples,
  withoutExamplePerson,
  type StartExampleSummary,
} from "./start-choice";

class MemoryStorage {
  private map = new Map<string, string>();
  getItem(key: string) { return this.map.has(key) ? this.map.get(key)! : null; }
  setItem(key: string, value: string) { this.map.set(key, String(value)); }
  removeItem(key: string) { this.map.delete(key); }
}

beforeEach(() => {
  (globalThis as unknown as { window: unknown }).window = { localStorage: new MemoryStorage() };
});
afterEach(() => {
  delete (globalThis as unknown as { window?: unknown }).window;
});

describe("start choice test", () => {
  it("assigns 50/50 and keeps the variant", () => {
    assert.deepEqual(getOrAssignStartChoiceVariant(() => 0.2), { variant: "choice", isNew: true });
    assert.deepEqual(getOrAssignStartChoiceVariant(() => 0.9), { variant: "choice", isNew: false });
    (globalThis as unknown as { window: unknown }).window = { localStorage: new MemoryStorage() };
    assert.equal(getOrAssignStartChoiceVariant(() => 0.7).variant, "form");
  });

  it("remembers per CV that the choice was made", () => {
    assert.equal(isStartChoiceDone("cv-1"), false);
    markStartChoiceDone("cv-1");
    assert.equal(isStartChoiceDone("cv-1"), true);
    assert.equal(isStartChoiceDone("cv-2"), false);
  });
});

describe("example search", () => {
  const list: StartExampleSummary[] = [
    { key: "zorg-en-welzijn/verpleegkundige", name: "Verpleegkundige", group: "Zorg & Welzijn", terms: "cv verpleegkundige big zorg" },
    { key: "zorg-en-welzijn/verzorgende-ig", name: "Verzorgende IG", group: "Zorg & Welzijn", terms: "cv verzorgende" },
    { key: "vakmanschap-en-logistiek/magazijnmedewerker", name: "Magazijnmedewerker", group: "Vakmanschap & Logistiek", terms: "cv orderpicker logistiek" },
    { key: "horeca-en-detailhandel/kassamedewerker", name: "Kassamedewerker", group: "Horeca & Detailhandel", terms: "cv supermarktmedewerker kassa" },
    { key: "marketing-en-communicatie/grafisch-ontwerper", name: "Grafisch Ontwerper", group: "Marketing & Communicatie", terms: "cv grafisch vormgever" },
  ];

  it("finds by job name, start of a word and keywords, case and accents ignored", () => {
    assert.deepEqual(searchStartExamples(list, "verpleeg").map((e) => e.key), ["zorg-en-welzijn/verpleegkundige"]);
    assert.deepEqual(searchStartExamples(list, "ORDERPICKER").map((e) => e.key), ["vakmanschap-en-logistiek/magazijnmedewerker"]);
    assert.deepEqual(searchStartExamples(list, "grafisch vormgever").map((e) => e.key), ["marketing-en-communicatie/grafisch-ontwerper"]);
    assert.deepEqual(searchStartExamples(list, "supermarkt").map((e) => e.key), ["horeca-en-detailhandel/kassamedewerker"]);
    assert.equal(searchStartExamples(list, "zorg").length, 2);
  });

  it("ranks name matches first and returns nothing for an empty query", () => {
    assert.equal(searchStartExamples(list, "ver")[0].key, "zorg-en-welzijn/verpleegkundige");
    assert.deepEqual(searchStartExamples(list, "   "), []);
    assert.deepEqual(searchStartExamples(list, "astronaut"), []);
  });
});

describe("example content", () => {
  it("keeps the job content and drops the fictional person", () => {
    const cv = withoutExamplePerson(sampleCV);
    assert.equal(cv.personal.name, "");
    assert.equal(cv.personal.email, "");
    assert.equal(cv.personal.phone, "");
    assert.equal(cv.personal.title, sampleCV.personal.title);
    assert.equal(cv.personal.summary, sampleCV.personal.summary);
    assert.deepEqual(cv.experience, sampleCV.experience);
  });
});
