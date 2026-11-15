import { checkRateLimit } from '@/lib/tools/rate-limit';

// RFC 5321 caps a deliverable address at 254 characters.
export const MAX_EMAIL_LENGTH = 254;

// A login code may be tried this many times. After that it is burned and the user requests a new one.
// With 900,000 possible codes and at most 5 codes per address per hour, guessing one takes years.
export const MAX_CODE_ATTEMPTS = 5;

const QUARTER_HOUR_MS = 15 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

// In-memory, per process (one app instance on Hetzner, see lib/tools/rate-limit.ts). A restart resets
// the counters, which is acceptable: a burned code stays burned because it is marked used in the database.
export const LOGIN_LIMITS = {
    requestPerIp: { bucket: 'login-request-ip', maxRequests: 10, windowMs: QUARTER_HOUR_MS },
    requestPerEmail: { bucket: 'login-request-email', maxRequests: 5, windowMs: HOUR_MS },
    verifyPerIp: { bucket: 'login-verify-ip', maxRequests: 30, windowMs: QUARTER_HOUR_MS },
    attemptsPerCode: { bucket: 'login-code-attempt', maxRequests: MAX_CODE_ATTEMPTS, windowMs: QUARTER_HOUR_MS },
} as const;

/** One login-code request from this IP for this (normalized) address. Counts against both limits. */
export function allowLoginCodeRequest(ip: string, email: string): boolean {
    if (!checkRateLimit(ip, LOGIN_LIMITS.requestPerIp).allowed) return false;
    return checkRateLimit(email, LOGIN_LIMITS.requestPerEmail).allowed;
}

/** One code check from this IP. */
export function allowLoginCodeVerify(ip: string): boolean {
    return checkRateLimit(ip, LOGIN_LIMITS.verifyPerIp).allowed;
}

/**
 * Counts one attempt against a stored login code. `allowed` is false once the code has had its
 * MAX_CODE_ATTEMPTS tries; `lastAttempt` is true on the final allowed try, so a wrong guess then
 * should burn the code.
 */
export function countLoginCodeAttempt(codeId: string): { allowed: boolean; lastAttempt: boolean } {
    const result = checkRateLimit(codeId, LOGIN_LIMITS.attemptsPerCode);
    return { allowed: result.allowed, lastAttempt: result.allowed && result.remaining === 0 };
}
