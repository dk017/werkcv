import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, normalizeEmail, requestEmailLoginCode } from '@/lib/auth';
import { allowLoginCodeRequest } from '@/lib/auth-limits';
import { getClientIp } from '@/lib/tools/rate-limit';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email : '';
        const locale = body.locale === 'en' ? 'en' : 'nl';
        const normalizedEmail = normalizeEmail(email);
        if (!isValidEmail(normalizedEmail)) throw new Error('INVALID_EMAIL');
        // Caps login mails per sender and per inbox, so nobody can flood an address with codes.
        if (!allowLoginCodeRequest(getClientIp(request), normalizedEmail)) {
            return NextResponse.json(
                { error: 'Too many login codes requested. Please wait a few minutes.', code: 'RATE_LIMITED' },
                { status: 429, headers: { 'Retry-After': '900' } }
            );
        }
        const result = await requestEmailLoginCode(email, locale);
        return NextResponse.json({ ok: true, ...result });
    } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_EMAIL') {
            return NextResponse.json(
                { error: 'Invalid email address', code: 'INVALID_EMAIL' },
                { status: 400 }
            );
        }
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ECONNREFUSED') {
            return NextResponse.json(
                {
                    error: process.env.NODE_ENV === 'production'
                        ? 'The login service is temporarily unavailable. Please try again later.'
                        : 'The local database is not running. Start Docker Desktop and run: docker compose up -d db',
                    code: 'DATABASE_UNAVAILABLE',
                },
                { status: 503 }
            );
        }
        console.error('request-code failed', error);
        return NextResponse.json(
            { error: 'Failed to request login code', code: 'REQUEST_CODE_FAILED' },
            { status: 500 }
        );
    }
}
