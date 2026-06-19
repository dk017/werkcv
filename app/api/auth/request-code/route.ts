import { NextRequest, NextResponse } from 'next/server';
import { requestEmailLoginCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email : '';
        const locale = body.locale === 'en' ? 'en' : 'nl';
        const result = await requestEmailLoginCode(email, locale);
        return NextResponse.json({ ok: true, ...result });
    } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_EMAIL') {
            return NextResponse.json(
                { error: 'Invalid email address', code: 'INVALID_EMAIL' },
                { status: 400 }
            );
        }
        console.error('request-code failed', error);
        return NextResponse.json(
            { error: 'Failed to request login code', code: 'REQUEST_CODE_FAILED' },
            { status: 500 }
        );
    }
}
