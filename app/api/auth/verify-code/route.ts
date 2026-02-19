import { NextRequest, NextResponse } from 'next/server';
import { applySessionCookie, verifyEmailLoginCode } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email : '';
        const code = typeof body.code === 'string' ? body.code : '';

        const session = await verifyEmailLoginCode(email, code);
        if (!session) {
            return NextResponse.json(
                { error: 'Invalid or expired code' },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ ok: true, userId: session.userId });
        applySessionCookie(response, session.token);
        return response;
    } catch (error) {
        console.error('verify-code failed', error);
        return NextResponse.json(
            { error: 'Failed to verify login code' },
            { status: 500 }
        );
    }
}
