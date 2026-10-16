/**
 * A logged-in visitor who clicks "Start je CV" on a content page (examples, guides, pricing) while
 * already working on a CV continues that CV instead of getting a new, empty one. 16 Oct 2026: a
 * buyer went back to /cv-voorbeelden three times while editing; each click opened an empty CV, so
 * they uploaded their CV four times and had to find the right copy in "Mijn cv's".
 */
export const RESUME_LATEST_CV_DAYS = 14;

/** Starts that ask for something new or carry their own content keep creating a CV. */
const NEW_CV_START = /(^dashboard|^app_|^new_cv|upload|cv_check|handoff|agency|matchpack|workspace|linkedin|example|role|claim|public:)/i;

export function shouldResumeLatestCv(input: {
  startSource: string;
  uploadRequested: boolean;
  workspace?: string;
  /** "Nieuw cv maken" from the resume notice. */
  forceNew: boolean;
}): boolean {
  if (input.forceNew || input.uploadRequested) return false;
  if (input.workspace === "agency") return false;
  return !NEW_CV_START.test(input.startSource);
}

export function resumeWindowStart(now = new Date()): Date {
  return new Date(now.getTime() - RESUME_LATEST_CV_DAYS * 24 * 60 * 60 * 1000);
}
