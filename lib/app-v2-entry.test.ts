import test from "node:test";
import assert from "node:assert/strict";
import { appEntryLocale, appPostLoginPath, isGenericEntryPath } from "./app-v2-entry";
import { sanitizeInternalReturnPath, isEnglishReturnPath } from "./auth/safe-return-path";

test("generic entry destinations go to the dashboard in the right language", () => {
  for (const path of [null, "", "/editor", "/en/editor", "/editor?template=professional", "/templates", "/en/templates", "/prijzen", "/"]) {
    assert.equal(appPostLoginPath(path, "nl"), "/mijn-cvs", String(path));
    assert.equal(appPostLoginPath(path, "en"), "/en/my-cvs", String(path));
  }
});

test("specific destinations are kept", () => {
  for (const path of [
    "/editor?id=cv-1",
    "/editor?template=professional&startSource=public_header",
    "/editor/claim?draftId=x&flow=consumer",
    "/success?cvId=cv-1&lang=en",
    "/cv-handoff",
    "/en/my-cvs/jobs",
    "/mijn-cvs/brief?id=cv-1",
  ]) {
    assert.equal(isGenericEntryPath(path), false, path);
    assert.equal(appPostLoginPath(path, "nl"), path);
  }
});

test("entry locale prefers the destination, then the login locale, then attribution", () => {
  assert.equal(appEntryLocale({ next: "/en/my-cvs/jobs" }), "en");
  assert.equal(appEntryLocale({ next: "/success?cvId=1&lang=en" }), "en");
  assert.equal(appEntryLocale({ next: "/editor", locale: "en" }), "en");
  assert.equal(appEntryLocale({ next: "/editor", firstTouchPath: "/en/guides" }), "en");
  assert.equal(appEntryLocale({ next: "/mijn-cvs/vacatures", firstTouchPath: "/en/guides" }), "nl");
  assert.equal(appEntryLocale({ next: "/editor" }), "nl");
});

test("app, cover letter and profile photo destinations survive login", () => {
  for (const path of [
    "/en/my-cvs", "/en/my-cvs/letter?id=cv-1", "/en/my-cvs/jobs", "/en/my-cvs/applications",
    "/sollicitatiebrief?id=cv-1", "/en/cover-letter?id=cv-1", "/profielfoto-cv-maken", "/en/profile-photo",
  ]) assert.equal(sanitizeInternalReturnPath(path), path, path);
  assert.equal(sanitizeInternalReturnPath("/profielfoto-cv-maken#profielfoto-tool"), "/profielfoto-cv-maken");
  assert.equal(isEnglishReturnPath("/en/my-cvs/jobs"), true);
  assert.equal(isEnglishReturnPath("/en/cover-letter?id=1"), true);
  assert.equal(sanitizeInternalReturnPath("/en/my-cvsx"), "/templates");
});
