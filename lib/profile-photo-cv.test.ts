import assert from "node:assert/strict";
import { test } from "node:test";
import { CV_PHOTO_MAX_DATA_URL_LENGTH, cvPhotoCrop, getProfilePhotoToolPath, isCvPhotoDataUrl, parseProfilePhotoReturnTarget, profilePhotoToolBase } from "./profile-photo-cv";

test("only small JPEG data URLs are accepted as CV photos", () => {
  assert.equal(isCvPhotoDataUrl("data:image/jpeg;base64,/9j/4AAQSkZJRg=="), true);
  assert.equal(isCvPhotoDataUrl("data:image/png;base64,iVBORw0KGgo="), false);
  assert.equal(isCvPhotoDataUrl("https://example.com/photo.jpg"), false);
  assert.equal(isCvPhotoDataUrl("data:image/jpeg;base64,<script>"), false);
  assert.equal(isCvPhotoDataUrl(`data:image/jpeg;base64,${"A".repeat(CV_PHOTO_MAX_DATA_URL_LENGTH)}`), false);
  assert.equal(isCvPhotoDataUrl(""), false);
  assert.equal(isCvPhotoDataUrl(null), false);
});

test("tool links carry the CV and where the offer was shown", () => {
  assert.equal(getProfilePhotoToolPath("nl", "cv-1", "editor_photo_card"), "/profielfoto-cv-maken?cvId=cv-1&bron=editor_photo_card#profielfoto-tool");
  assert.equal(getProfilePhotoToolPath("en", "cv 2", "success_page"), "/en/profile-photo?cvId=cv+2&bron=success_page#profielfoto-tool");
  assert.equal(getProfilePhotoToolPath("nl", null), "/profielfoto-cv-maken#profielfoto-tool");
});

test("CV photo crop is square, keeps the face area of portraits and centres landscapes", () => {
  assert.deepEqual(cvPhotoCrop(1024, 1024), { sx: 0, sy: 0, side: 1024 });
  assert.deepEqual(cvPhotoCrop(1024, 1536), { sx: 0, sy: 102, side: 1024 });
  assert.deepEqual(cvPhotoCrop(1536, 1024), { sx: 256, sy: 0, side: 1024 });
});

test("in-app profile photo paths and a closed list of checkout return targets", () => {
  assert.equal(getProfilePhotoToolPath("nl", "cv-1", "editor_photo_card", "app"), "/mijn-cvs/profielfoto?cvId=cv-1&bron=editor_photo_card");
  assert.equal(getProfilePhotoToolPath("en", null, undefined, "app"), "/en/my-cvs/profile-photo");
  assert.equal(parseProfilePhotoReturnTarget("app_en"), "app_en");
  assert.equal(parseProfilePhotoReturnTarget("https://evil.example"), "public_nl");
  assert.equal(parseProfilePhotoReturnTarget(undefined), "public_nl");
  assert.equal(profilePhotoToolBase("public_nl"), "/profielfoto-cv-maken");
});
