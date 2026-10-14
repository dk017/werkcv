import assert from "node:assert/strict";
import test from "node:test";
import { cvDownloadPrice } from "./site-content";
import { isConsumerExcludedEmail } from "./consumer-analytics-exclusions";
import {
  assignCvReadyReminder,
  buildCvReadyEmail,
  buildCvReadyLink,
  CANDIDATES_SQL,
  CV_READY_PRICE,
  isExcludedEmail,
  isWithinSendWindow,
  pickEmailLanguage,
} from "../scripts/followups-cv-ready.mjs";

test("the language people used in the editor decides the email language", () => {
  // The four mismatches seen in production on 2026-10-14: CV marked Dutch, editor used in English.
  assert.equal(pickEmailLanguage({ editorUi: "en", locale: "nl", startSource: "home_hero_primary", sourcePath: "/" }), "en");
  assert.equal(pickEmailLanguage({ editorUi: "en", locale: "nl", startSource: "en_home_hero", sourcePath: "/" }), "en");
  assert.equal(pickEmailLanguage({ editorUi: "nl", locale: "en", startSource: "en_home_hero", sourcePath: "/en" }), "nl");
});

test("without an editor language it falls back to how the CV was started, and never guesses", () => {
  assert.equal(pickEmailLanguage({ editorUi: null, locale: null, startSource: "en_home_upload", sourcePath: null }), "en");
  assert.equal(pickEmailLanguage({ editorUi: null, locale: null, startSource: null, sourcePath: "/en/guides/x" }), "en");
  assert.equal(pickEmailLanguage({ editorUi: null, locale: "nl", startSource: "home_hero_primary", sourcePath: "/" }), "nl");
  assert.equal(pickEmailLanguage({ editorUi: null, locale: null, startSource: null, sourcePath: null }), null);
});

test("an English user never gets Dutch text, and the reverse", () => {
  for (const checkoutStarted of [false, true]) {
    const en = buildCvReadyEmail({ language: "en", checkoutStarted, link: buildCvReadyLink({ cvId: "cv-1", language: "en" }) });
    const nl = buildCvReadyEmail({ language: "nl", checkoutStarted, link: buildCvReadyLink({ cvId: "cv-1", language: "nl" }) });
    assert.doesNotMatch(`${en.subject}\n${en.body}`, /\b(je|jouw|hoi|groet|eenmalig|betaling|afgerond)\b/i);
    assert.doesNotMatch(`${nl.subject}\n${nl.body}`, /\b(your|hi|best|payment|one-time|reply)\b/i);
    assert.match(en.body, /https:\/\/werkcv\.nl\/en\/editor\?id=cv-1/);
    assert.match(nl.body, /https:\/\/werkcv\.nl\/editor\?id=cv-1/);
    assert.match(en.body, /Reply "stop"/);
    assert.match(nl.body, /Antwoord met "stop"/);
  }
});

test("the price in the email is the live download price", () => {
  assert.equal(CV_READY_PRICE.nl, cvDownloadPrice.display);
  assert.equal(CV_READY_PRICE.en, cvDownloadPrice.displayEn);
});

test("the link opens the download preview and is tagged for attribution", () => {
  const url = new URL(buildCvReadyLink({ cvId: "abc", language: "nl" }));
  assert.equal(url.searchParams.get("downloadIntent"), "1");
  assert.equal(url.searchParams.get("utm_medium"), "email");
  assert.throws(() => buildCvReadyLink({ cvId: "abc", language: "nl", origin: "http://werkcv.nl" }));
});

test("exclusions match the shared consumer exclusion list", () => {
  for (const email of ["dhinesh217@gmail.com", "someone+1@gmail.com", "qa.test@gmail.com", "x@werkcv.nl", "x@example.com", "redesign-test@werkcv.test", "anna.jansen@gmail.com", "not-an-email"]) {
    if (email.endsWith("@werkcv.test")) { assert.equal(isExcludedEmail(email), true); continue; }
    assert.equal(isExcludedEmail(email, ""), isConsumerExcludedEmail(email, ""), email);
  }
});

test("holdout is deterministic and about one in five", () => {
  assert.equal(assignCvReadyReminder("user-1"), assignCvReadyReminder("user-1"));
  const holdouts = Array.from({ length: 2000 }, (_, i) => assignCvReadyReminder(`user-${i}`)).filter((a) => a === "holdout").length;
  assert.ok(holdouts > 320 && holdouts < 480, `holdouts=${holdouts}`);
});

test("emails only go out between 08:00 and 21:00 Amsterdam time", () => {
  assert.equal(isWithinSendWindow(new Date("2026-10-14T05:59:00Z")), false); // 07:59 CEST
  assert.equal(isWithinSendWindow(new Date("2026-10-14T06:00:00Z")), true); // 08:00 CEST
  assert.equal(isWithinSendWindow(new Date("2026-10-14T18:59:00Z")), true); // 20:59 CEST
  assert.equal(isWithinSendWindow(new Date("2026-10-14T19:00:00Z")), false); // 21:00 CEST
});

test("the candidate query applies every exclusion", () => {
  for (const clause of ['"agencySubscriptionId" IS NULL', '"AgencyMatchPack"', '"AgencySubscription"', 'o."paidAt" IS NOT NULL',
    "'paused', 'do_not_contact'", "m.direction = 'inbound'", "t.type = 'cv_ready_reminder_v1'", '"hasMeaningfulContent"']) {
    assert.ok(CANDIDATES_SQL.includes(clause), clause);
  }
});
