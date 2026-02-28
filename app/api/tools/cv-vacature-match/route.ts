import { NextRequest, NextResponse } from 'next/server';
import { matchCvVacature } from '@/lib/tools/cv-vacature-match';
import { checkRateLimit, getClientIp } from '@/lib/tools/rate-limit';

const MAX_TEXT_LENGTH = 5000;

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
        return NextResponse.json(
            { error: 'Te veel aanvragen. Probeer het over een uur opnieuw.' },
            { status: 429 }
        );
    }

    try {
        const body = await request.json();

        const cvText = typeof body.cvText === 'string'
            ? body.cvText.trim().slice(0, MAX_TEXT_LENGTH)
            : '';
        const vacatureText = typeof body.vacatureText === 'string'
            ? body.vacatureText.trim().slice(0, MAX_TEXT_LENGTH)
            : '';

        if (!cvText || cvText.length < 50) {
            return NextResponse.json({ error: 'CV-tekst is te kort (minimaal 50 tekens).' }, { status: 400 });
        }
        if (!vacatureText || vacatureText.length < 50) {
            return NextResponse.json({ error: 'Vacaturetekst is te kort (minimaal 50 tekens).' }, { status: 400 });
        }

        const result = await matchCvVacature(cvText, vacatureText);
        return NextResponse.json(result);
    } catch (err) {
        console.error('cv-vacature-match error:', err);
        return NextResponse.json({ error: 'Analyse mislukt. Probeer het opnieuw.' }, { status: 500 });
    }
}
