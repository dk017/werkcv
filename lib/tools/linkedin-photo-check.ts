import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

/**
 * Free LinkedIn photo check (lead magnet for the AI profile photo, 21 Oct 2026). The model only judges each
 * criterion (pass / warn / fail + one short tip); the score is computed here from fixed weights, so it is
 * stable and explainable. Resolution is measured from the file itself. The photo is not stored.
 * Criteria follow common LinkedIn photo guidance (face around 60% of the frame, head and shoulders, plain
 * background, looking at the camera, current and sharp) — the same points BetterPic's analyzer checks.
 */

export type Locale = "nl" | "en";
export type CheckStatus = "pass" | "warn" | "fail";
export const CRITERIA = ["face", "framing", "eyes", "expression", "light", "sharpness", "background", "clothing"] as const;
export type CriterionId = (typeof CRITERIA)[number] | "resolution";

export const WEIGHTS: Record<CriterionId, number> = {
  face: 20,
  framing: 15,
  light: 15,
  eyes: 10,
  expression: 10,
  sharpness: 10,
  background: 10,
  clothing: 5,
  resolution: 5,
};

const Judgement = z.object({ status: z.enum(["pass", "warn", "fail"]), tip: z.string() });
export const PhotoJudgement = z.object({
  isPersonPhoto: z.boolean().describe("True only for a photo of a real person (not a logo, pet, drawing, landscape or group)."),
  peopleCount: z.number().int(),
  face: Judgement.describe("One face, clearly visible, not covered by sunglasses, a cap brim, hands or heavy shadow."),
  framing: Judgement.describe("Head and shoulders; the face fills roughly half to two thirds of the frame height. Too far away or cropped through the head is warn/fail."),
  eyes: Judgement.describe("Looking at or very near the camera."),
  expression: Judgement.describe("Friendly or calm neutral expression suitable for a professional profile."),
  light: Judgement.describe("Even light on the face; not too dark, not blown out, no harsh shadows across the face."),
  sharpness: Judgement.describe("The face is in focus; no motion blur, heavy noise or strong compression."),
  background: Judgement.describe("Plain or softly blurred background that does not distract (no clutter, car interior, bathroom, crowd)."),
  clothing: Judgement.describe("Clothing fits a professional profile in general terms (casual is fine for many jobs; swimwear, sleepwear or party outfits are not)."),
});
export type PhotoJudgement = z.infer<typeof PhotoJudgement>;

export function systemPrompt(locale: Locale): string {
  return `You review profile photos for LinkedIn and CVs. Judge ONLY the photo as a photo: framing, light, focus,
background, eye line, expression and whether the clothing suits a professional profile in general terms.
Never comment on or judge the person's looks, attractiveness, body, weight, age, skin colour, ethnicity, gender,
hair texture, disability or religion. Religious or cultural clothing (for example a headscarf, turban or kippah)
and glasses are always fine and professional. Do not guess anything about the person.
Be strict, like a recruiter scrolling past: "pass" means it already looks like a professional profile photo
on that point. Typical casual phone photos get warn or fail:
- background: home interiors (kitchen, living room, bedroom, bathroom), car interiors, streets with bikes or
  traffic, crowds, busy offices or shelves in sharp focus are warn (fail if very busy); only plain, studio-like
  or strongly blurred backgrounds pass.
- framing: an arm's-length selfie angle (camera above or below, visible arm, wide-angle distortion), a face too
  small or too large, or a tilted head is warn; cut through the head or chin, or a full-body/distant shot, is fail.
- light: mixed indoor light, colour casts, one dark side of the face or overhead lamp shadows are warn.
For each criterion give status pass, warn or fail and one tip of at most 110 characters. Make tips concrete:
name what you actually see and what to do (e.g. "De keuken achter je trekt de aandacht: ga voor een lichte
muur staan."), not generic advice. Write tips in ${locale === "en" ? "English" : "Dutch (informal 'je')"}.
If the image is not a photo of one real person, set isPersonPhoto false and mark all criteria fail with a tip
explaining that LinkedIn needs a photo of yourself.`;
}

export async function judgePhotoWithAi(dataUrl: string, locale: Locale): Promise<PhotoJudgement> {
  // Loaded on use: the client throws at import without OPENAI_API_KEY (tests, local runs without a key).
  const { default: openai } = await import("@/lib/openai-client");
  const response = await openai.chat.completions.parse({
    model: process.env.OPENAI_PHOTO_CHECK_MODEL || "gpt-4o-mini",
    temperature: 0.1,
    response_format: zodResponseFormat(PhotoJudgement, "linkedin_photo_check"),
    messages: [
      { role: "system", content: systemPrompt(locale) },
      {
        role: "user",
        content: [
          { type: "text", text: "Review this profile photo." },
          { type: "image_url", image_url: { url: dataUrl, detail: "auto" } },
        ],
      },
    ],
  });
  const parsed = response.choices[0]?.message?.parsed;
  if (!parsed) throw new Error("No structured photo judgement returned");
  return parsed;
}

/** Width and height from a JPEG, PNG or WebP header, without decoding the image. */
export function imageSize(bytes: Uint8Array): { width: number; height: number } | null {
  const b = bytes;
  const u16be = (i: number) => (b[i] << 8) | b[i + 1];
  const u32be = (i: number) => ((b[i] << 24) >>> 0) + (b[i + 1] << 16) + (b[i + 2] << 8) + b[i + 3];
  const u16le = (i: number) => b[i] | (b[i + 1] << 8);
  if (b.length > 24 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
    return { width: u32be(16), height: u32be(20) };
  }
  if (b.length > 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i++; continue; }
      const marker = b[i + 1];
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
      const length = u16be(i + 2);
      // SOF0–SOF15 except DHT (C4), JPG (C8) and DAC (CC) carry the frame size.
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: u16be(i + 5), width: u16be(i + 7) };
      }
      i += 2 + length;
    }
    return null;
  }
  if (b.length > 30 && String.fromCharCode(...b.slice(0, 4)) === "RIFF" && String.fromCharCode(...b.slice(8, 12)) === "WEBP") {
    const chunk = String.fromCharCode(...b.slice(12, 16));
    if (chunk === "VP8 ") return { width: u16le(26) & 0x3fff, height: u16le(28) & 0x3fff };
    if (chunk === "VP8L") {
      const bits = b[21] | (b[22] << 8) | (b[23] << 16) | (b[24] << 24);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8X") return { width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)), height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)) };
  }
  return null;
}

export function resolutionCheck(size: { width: number; height: number } | null, locale: Locale): { status: CheckStatus; tip: string } {
  const nl = locale === "nl";
  if (!size) return { status: "warn", tip: nl ? "Formaat niet te lezen; gebruik een JPG of PNG van minstens 400 × 400 pixels." : "Size unreadable; use a JPG or PNG of at least 400 × 400 pixels." };
  const min = Math.min(size.width, size.height);
  if (min >= 400) return { status: "pass", tip: nl ? `${size.width} × ${size.height} pixels: scherp genoeg voor LinkedIn.` : `${size.width} × ${size.height} pixels: sharp enough for LinkedIn.` };
  if (min >= 200) return { status: "warn", tip: nl ? `${size.width} × ${size.height} pixels is klein; LinkedIn raadt minstens 400 × 400 aan.` : `${size.width} × ${size.height} pixels is small; LinkedIn recommends at least 400 × 400.` };
  return { status: "fail", tip: nl ? `${size.width} × ${size.height} pixels is te klein; de foto wordt wazig op LinkedIn.` : `${size.width} × ${size.height} pixels is too small; it will look blurry on LinkedIn.` };
}

export type PhotoCheckItem = { id: CriterionId; status: CheckStatus; tip: string; weight: number };
export type PhotoCheckResult = {
  score: number;
  band: "excellent" | "good" | "improve" | "weak";
  items: PhotoCheckItem[];
  topFixes: PhotoCheckItem[];
  isPersonPhoto: boolean;
};

const POINTS: Record<CheckStatus, number> = { pass: 1, warn: 0.5, fail: 0 };

/** Score 0–100 from the weighted statuses. A photo that is not of one person scores at most 20. */
export function scorePhoto(judgement: PhotoJudgement, resolution: { status: CheckStatus; tip: string }): PhotoCheckResult {
  const items: PhotoCheckItem[] = [
    ...CRITERIA.map((id) => ({ id, status: judgement[id].status, tip: judgement[id].tip.slice(0, 160), weight: WEIGHTS[id] })),
    { id: "resolution" as const, status: resolution.status, tip: resolution.tip, weight: WEIGHTS.resolution },
  ];
  const total = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  let score = Math.round((100 * items.reduce((sum, item) => sum + item.weight * POINTS[item.status], 0)) / total);
  const personOk = judgement.isPersonPhoto && judgement.peopleCount === 1;
  if (!personOk) score = Math.min(score, 20);
  const band = score >= 85 ? "excellent" : score >= 70 ? "good" : score >= 50 ? "improve" : "weak";
  const topFixes = items
    .filter((item) => item.status !== "pass")
    .sort((a, b) => (POINTS[a.status] - POINTS[b.status]) || b.weight - a.weight)
    .slice(0, 3);
  return { score, band, items, topFixes, isPersonPhoto: personOk };
}

let dailyCount = 0;
let dailyKey = "";
/** Shared daily cap for the free check (cost guard); default 400 checks per UTC day. */
export function takePhotoCheckBudget(now = new Date(), cap = Number(process.env.LINKEDIN_PHOTO_CHECK_DAILY_CAP || 400)): boolean {
  const day = now.toISOString().slice(0, 10);
  if (day !== dailyKey) { dailyKey = day; dailyCount = 0; }
  if (dailyCount >= cap) return false;
  dailyCount++;
  return true;
}
