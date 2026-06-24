import assert from "node:assert/strict";
import {
  getCounterpart,
  getRoutePair,
  routePairs,
  type RoutePair,
  validateRoutePairs,
} from "../lib/i18n/route-pairs";

assert.equal(getCounterpart("/"), "/en");
assert.equal(getCounterpart("/en/ats-resume-netherlands"), "/cv-tips/ats-vriendelijk-cv");
assert.equal(getCounterpart("/some-unmapped-page"), null);
assert.equal(getCounterpart("/editor", "hreflang"), null);
assert.equal(getCounterpart("/templates/"), "/en/templates");
assert.equal(getRoutePair("/en/editor")?.preserveSearch, true);
assert.equal(getCounterpart("/cv-gids/foto-op-cv-nederland"), null);
assert.equal(
  getCounterpart("/cv-gids/foto-op-cv-nederland", "hreflang"),
  "/en/guides/netherlands-cv-photo-rules",
);
assert.equal(getCounterpart("/en/guides/cv-format-netherlands-english"), null);
assert.equal(
  getCounterpart("/en/guides/cv-format-netherlands-english", "hreflang"),
  "/cv-gids/engels-cv-in-nederland",
);

const duplicateDutchRoute: readonly RoutePair[] = [
  ...routePairs,
  {
    id: "duplicate-dutch-test",
    nl: "/templates",
    en: "/en/duplicate-test",
    useForSwitcher: true,
    useForHreflang: false,
    preserveSearch: false,
  },
];

assert.throws(
  () => validateRoutePairs(duplicateDutchRoute),
  /Duplicate Dutch route: \/templates/,
);

const duplicateEnglishRoute: readonly RoutePair[] = [
  ...routePairs,
  {
    id: "duplicate-english-test",
    nl: "/unieke-test-route",
    en: "/en/templates",
    useForSwitcher: true,
    useForHreflang: false,
    preserveSearch: false,
  },
];

assert.throws(
  () => validateRoutePairs(duplicateEnglishRoute),
  /Duplicate English route: \/en\/templates/,
);

console.log(`Validated ${routePairs.length} one-to-one NL/EN route pairs.`);
