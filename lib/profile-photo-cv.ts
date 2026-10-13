/**
 * Link between a CV and the AI profile photo tool: the tool knows which CV the person came from,
 * can start from the photo already on that CV, and puts the paid photo back on that CV.
 */

export type ProfilePhotoOfferLocation = "editor_photo_card" | "success_page";

/** CV photos are square JPEG data URLs (see app/editor/PhotoUpload.tsx, 700×700 at quality 0.9). */
export const CV_PHOTO_SIZE = 700;
/** 700×700 JPEGs are ~60–150 KB; base64 adds a third. Anything far above this is not a CV photo. */
export const CV_PHOTO_MAX_DATA_URL_LENGTH = 600_000;

export function isCvPhotoDataUrl(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= CV_PHOTO_MAX_DATA_URL_LENGTH &&
    /^data:image\/jpeg;base64,[A-Za-z0-9+/]+={0,2}$/.test(value)
  );
}

/** Where the tool lives: the public SEO page, or inside the signed-in app (app v2). */
export type ProfilePhotoToolContext = "public" | "app";
/** Fixed list of checkout return targets, so the return URL can never be chosen freely. */
export const PROFILE_PHOTO_RETURN_TARGETS = ["public_nl", "public_en", "app_nl", "app_en"] as const;
export type ProfilePhotoReturnTarget = (typeof PROFILE_PHOTO_RETURN_TARGETS)[number];

export function profilePhotoReturnTarget(locale: "nl" | "en", context: ProfilePhotoToolContext): ProfilePhotoReturnTarget {
  return `${context}_${locale}` as ProfilePhotoReturnTarget;
}

export function parseProfilePhotoReturnTarget(value: unknown): ProfilePhotoReturnTarget {
  return (PROFILE_PHOTO_RETURN_TARGETS as readonly unknown[]).includes(value) ? value as ProfilePhotoReturnTarget : "public_nl";
}

/** The tool page without query or anchor. */
export function profilePhotoToolBase(target: ProfilePhotoReturnTarget): string {
  switch (target) {
    case "app_nl": return "/mijn-cvs/profielfoto";
    case "app_en": return "/en/my-cvs/profile-photo";
    case "public_en": return "/en/profile-photo";
    default: return "/profielfoto-cv-maken";
  }
}

/** The public pages scroll to the tool section; in the app the tool is the page. */
export function profilePhotoToolAnchor(target: ProfilePhotoReturnTarget): string {
  return target.startsWith("public") ? "#profielfoto-tool" : "";
}

export function getProfilePhotoToolPath(locale: "nl" | "en", cvId: string | null, location?: ProfilePhotoOfferLocation, context: ProfilePhotoToolContext = "public"): string {
  const target = profilePhotoReturnTarget(locale, context);
  const params = new URLSearchParams();
  if (cvId) params.set("cvId", cvId);
  if (location) params.set("bron", location);
  const query = params.toString();
  return `${profilePhotoToolBase(target)}${query ? `?${query}` : ""}${profilePhotoToolAnchor(target)}`;
}

// The CV the person came from has to survive the login and payment redirects (same tab).
const RETURN_CV_KEY = "werkcv_photo_return_cv";
const RETURN_CV_MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function rememberReturnCv(cvId: string, now = Date.now()) {
  try {
    window.sessionStorage.setItem(RETURN_CV_KEY, JSON.stringify({ cvId, at: now }));
  } catch {
    // Storage blocked: the URL parameter still works for this page view.
  }
}

export function readReturnCv(now = Date.now()): string | null {
  try {
    const parsed: unknown = JSON.parse(window.sessionStorage.getItem(RETURN_CV_KEY) ?? "null");
    if (!parsed || typeof parsed !== "object") return null;
    const { cvId, at } = parsed as { cvId?: unknown; at?: unknown };
    return typeof cvId === "string" && typeof at === "number" && now - at < RETURN_CV_MAX_AGE_MS ? cvId : null;
  } catch {
    return null;
  }
}

/**
 * Square crop for a CV photo from a generated headshot. Portraits keep the upper part, where the
 * face is; landscape images are cropped in the middle.
 */
export function cvPhotoCrop(width: number, height: number): { sx: number; sy: number; side: number } {
  const side = Math.min(width, height);
  return {
    sx: Math.round((width - side) / 2),
    sy: height > width ? Math.round((height - side) * 0.2) : 0,
    side,
  };
}
