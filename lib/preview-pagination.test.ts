import test from "node:test";
import assert from "node:assert/strict";
import { calculatePageBreaks } from "./preview-pagination";

// Compact header + profile end at ~330px; Werkervaring (330–1230) has three jobs.
const experience = { top: 330, bottom: 1230 };
const jobs = [{ top: 362, bottom: 640 }, { top: 656, bottom: 1000 }, { top: 1016, bottom: 1230 }];

test("a long section breaks between entries instead of moving whole to the next page", () => {
  const breaks = calculatePageBreaks({ height: 1500, breakAvoidRanges: [experience, ...jobs] });
  assert.deepEqual(breaks, [0, 1016]);
});

test("a heading is never left alone at the bottom of a page", () => {
  const section = { top: 1060, bottom: 1500 };
  const firstEntry = { top: 1092, bottom: 1300 };
  assert.deepEqual(calculatePageBreaks({ height: 1600, breakAvoidRanges: [section, firstEntry] }), [0, 1060]);
});

test("small sections still move as a whole", () => {
  const languages = { top: 1050, bottom: 1250 };
  const item = { top: 1150, bottom: 1250 };
  assert.deepEqual(calculatePageBreaks({ height: 1400, breakAvoidRanges: [languages, item] }), [0, 1050]);
});

test("without ranges the page is cut at the A4 height; content taller than a page is not kept together", () => {
  assert.deepEqual(calculatePageBreaks({ height: 2000, breakAvoidRanges: [] }), [0, 1123]);
  assert.deepEqual(calculatePageBreaks({ height: 2600, breakAvoidRanges: [{ top: 100, bottom: 1400 }] }), [0, 1123, 2208]);
});
