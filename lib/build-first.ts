/**
 * "Build first, log in at download": visitors without an account who open /editor (or /en/editor)
 * get the no-account editor instead of the login page. 58% of people left at the login page
 * before building anything (Sep-Oct 2026). Run as a 50/50 split so the effect on sales is measured:
 * the arm is assigned once per browser by proxy.ts and recorded server-side per editor entry.
 */

export const BUILD_FIRST_COOKIE = "werkcv_build_first";
export type BuildFirstArm = "on" | "off";
export const BUILD_FIRST_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

export function assignBuildFirstArm(random = Math.random()): BuildFirstArm {
  return random < 0.5 ? "on" : "off";
}

export function parseBuildFirstArm(value: string | undefined): BuildFirstArm | null {
  return value === "on" || value === "off" ? value : null;
}

// Starts that rely on something applied after login (an example CV, a tool handoff, an agency
// workspace) keep the login-first route.
const LOGIN_FIRST_START = /(example|linkedin|salary_role|role|handoff|agency|matchpack|workspace|claim|public:)/i;

/** Whether this /editor visit can open the no-account editor at all (both arms are counted only when it can). */
export function isBuildFirstEligible(input: { id?: string; workspace?: string; startSource: string }): boolean {
  if (input.id) return false; // an existing CV belongs to an account
  if (input.workspace === "agency") return false;
  return !LOGIN_FIRST_START.test(input.startSource);
}
