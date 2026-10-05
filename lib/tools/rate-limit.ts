/**
 * Simple in-memory rate limiter for public AI tool endpoints.
 * Works for single-instance deployments (Hetzner). Not shared across
 * multiple processes — acceptable trade-off vs. adding Redis.
 *
 * Strategy: sliding window per IP.
 * Limit: MAX_REQUESTS per WINDOW_MS.
 */

const DEFAULT_MAX_REQUESTS = 20;
const DEFAULT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

interface Entry {
    timestamps: number[];
}

const store = new Map<string, Entry>();
type RateLimitOptions = {
    bucket?: string;
    maxRequests?: number;
    windowMs?: number;
};

// Prune stale entries every 15 minutes to prevent unbounded memory growth
setInterval(() => {
    const cutoff = Date.now() - DEFAULT_WINDOW_MS;
    for (const [key, entry] of store) {
        entry.timestamps = entry.timestamps.filter(t => t > cutoff);
        if (entry.timestamps.length === 0) store.delete(key);
    }
}, 15 * 60 * 1000).unref();

export function checkRateLimit(ip: string, options: RateLimitOptions = {}): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const windowMs = options.windowMs ?? DEFAULT_WINDOW_MS;
    const maxRequests = options.maxRequests ?? DEFAULT_MAX_REQUESTS;
    const bucket = options.bucket ?? 'default';
    const cutoff = now - windowMs;
    const key = `${bucket}:${ip}`;

    let entry = store.get(key);
    if (!entry) {
        entry = { timestamps: [] };
        store.set(key, entry);
    }

    // Remove timestamps outside the window
    entry.timestamps = entry.timestamps.filter(t => t > cutoff);

    if (entry.timestamps.length >= maxRequests) {
        return { allowed: false, remaining: 0 };
    }

    entry.timestamps.push(now);
    return { allowed: true, remaining: maxRequests - entry.timestamps.length };
}

export function getClientIp(request: Request): string {
    // nginx (see /etc/nginx/sites-enabled/werkcv.nl) sets X-Real-IP to the connecting address and
    // replaces anything the client sent, so it can be trusted. X-Forwarded-For is only appended to:
    // its FIRST entry is whatever the client wrote, so a limit keyed on it can be dodged by sending
    // a new fake value each time. Fall back to its LAST entry, the one nginx added.
    // If a CDN is ever put in front of nginx, X-Real-IP becomes the CDN's address: revisit this then.
    const headers = request.headers as Headers;
    const realIp = headers.get('x-real-ip')?.trim();
    if (realIp) return realIp;
    const forwarded = headers.get('x-forwarded-for')?.split(',').pop()?.trim();
    if (forwarded) return forwarded;
    return 'unknown';
}
