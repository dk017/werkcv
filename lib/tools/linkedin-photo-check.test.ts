import assert from "node:assert/strict";
import test from "node:test";
import { imageSize, resolutionCheck, scorePhoto, systemPrompt, takePhotoCheckBudget, type PhotoJudgement } from "./linkedin-photo-check";

const all = (status: "pass" | "warn" | "fail"): PhotoJudgement => ({
  isPersonPhoto: true,
  peopleCount: 1,
  face: { status, tip: "t" }, framing: { status, tip: "t" }, eyes: { status, tip: "t" }, expression: { status, tip: "t" },
  light: { status, tip: "t" }, sharpness: { status, tip: "t" }, background: { status, tip: "t" }, clothing: { status, tip: "t" },
});

test("score is computed from fixed weights", () => {
  assert.equal(scorePhoto(all("pass"), { status: "pass", tip: "" }).score, 100);
  assert.equal(scorePhoto(all("fail"), { status: "fail", tip: "" }).score, 0);
  assert.equal(scorePhoto(all("warn"), { status: "warn", tip: "" }).score, 50);
  const oneBad = { ...all("pass"), light: { status: "fail" as const, tip: "Te donker" } };
  const r = scorePhoto(oneBad, { status: "pass", tip: "" });
  assert.equal(r.score, 85);
  assert.equal(r.band, "excellent");
  assert.deepEqual(r.topFixes.map((f) => f.id), ["light"]);
});

test("top fixes: fails before warns, heavier criteria first, at most 3", () => {
  const j = { ...all("pass"), clothing: { status: "fail" as const, tip: "" }, face: { status: "warn" as const, tip: "" }, light: { status: "fail" as const, tip: "" }, background: { status: "warn" as const, tip: "" } };
  const r = scorePhoto(j, { status: "pass", tip: "" });
  assert.deepEqual(r.topFixes.map((f) => f.id), ["light", "clothing", "face"]);
});

test("a photo that is not of one person scores at most 20", () => {
  assert.equal(scorePhoto({ ...all("pass"), isPersonPhoto: false }, { status: "pass", tip: "" }).score, 20);
  assert.equal(scorePhoto({ ...all("pass"), peopleCount: 3 }, { status: "pass", tip: "" }).isPersonPhoto, false);
});

test("image size is read from PNG, JPEG and WebP headers", () => {
  const png = new Uint8Array(32); png.set([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]); png.set([0, 0, 2, 0], 16); png.set([0, 0, 1, 0x90], 20);
  assert.deepEqual(imageSize(png), { width: 512, height: 400 });
  // JPEG: SOI, APP0 (len 16), SOF0 with height 300, width 640.
  const jpg = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, ...new Array(14).fill(0), 0xff, 0xc0, 0x00, 0x11, 0x08, 0x01, 0x2c, 0x02, 0x80, 0x03, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  assert.deepEqual(imageSize(jpg), { width: 640, height: 300 });
  const webp = new Uint8Array(40); webp.set([...Buffer.from("RIFF")]); webp.set([...Buffer.from("WEBPVP8X")], 8); webp.set([0x1f, 0x03, 0x00], 24); webp.set([0x57, 0x02, 0x00], 27);
  assert.deepEqual(imageSize(webp), { width: 800, height: 600 });
  assert.equal(imageSize(new Uint8Array([1, 2, 3])), null);
});

test("resolution check uses LinkedIn's 400 × 400 advice", () => {
  assert.equal(resolutionCheck({ width: 1024, height: 1024 }, "nl").status, "pass");
  assert.equal(resolutionCheck({ width: 300, height: 300 }, "nl").status, "warn");
  assert.equal(resolutionCheck({ width: 150, height: 150 }, "en").status, "fail");
  assert.equal(resolutionCheck(null, "nl").status, "warn");
});

test("the prompt forbids judging the person and allows religious clothing", () => {
  const p = systemPrompt("nl");
  assert.match(p, /Never comment on or judge the person's looks/);
  assert.match(p, /headscarf/);
  assert.match(p, /Dutch/);
});

test("daily budget resets per UTC day", () => {
  const day = new Date("2026-10-21T10:00:00Z");
  assert.equal(takePhotoCheckBudget(day, 2), true);
  assert.equal(takePhotoCheckBudget(day, 2), true);
  assert.equal(takePhotoCheckBudget(day, 2), false);
  assert.equal(takePhotoCheckBudget(new Date("2026-10-22T00:01:00Z"), 2), true);
});
