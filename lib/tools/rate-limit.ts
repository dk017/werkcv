/**
 * Simple in-memory rate limiter for public AI tool endpoints.
 * Works for single-instance deployments (Hetzner). Not shared across
 * multiple processes — acceptable trade-off vs. adding Redis.
 *
 * Strategy: sliding window per IP.
 * Limit: MAX_REQUESTS per WINDOW_MS.
 */

const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface Entry {
    timestamps: number[];
}

const store = new Map<string, Entry>();

// Prune stale entries every 15 minutes to prevent unbounded memory growth
setInterval(() => {
    const cutoff = Date.now() - WINDOW_MS;
    for (const [key, entry] of store) {
        entry.timestamps = entry.timestamps.filter(t => t > cutoff);
        if (entry.timestamps.length === 0) store.delete(key);
    }
}, 15 * 60 * 1000);

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const cutoff = now - WINDOW_MS;

    let entry = store.get(ip);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(ip, entry);
    }

    // Remove timestamps outside the window
    entry.timestamps = entry.timestamps.filter(t => t > cutoff);

    if (entry.timestamps.length >= MAX_REQUESTS) {
        return { allowed: false, remaining: 0 };
    }

    entry.timestamps.push(now);
    return { allowed: true, remaining: MAX_REQUESTS - entry.timestamps.length };
}

export function getClientIp(request: Request): string {
    // Respect reverse-proxy headers (Nginx/Hetzner)
    const forwarded = (request.headers as Headers).get('x-forwarded-for');
    if (forwarded) return forwarded.split(',')[0].trim();
    const realIp = (request.headers as Headers).get('x-real-ip');
    if (realIp) return realIp.trim();
    return 'unknown';
}
