import { NextRequest, NextResponse } from 'next/server';
import { generateProfieltekst, ProfieltekstInput } from '@/lib/tools/profieltekst';
import { AiInputError, readAiJson } from '@/lib/ai-request-body';

export async function POST(request: NextRequest) {
    try {
        const parsedBody = await readAiJson(request, 6000);
        const body = parsedBody && typeof parsedBody === 'object' ? parsedBody as Record<string, unknown> : {};

        const huidigeFunctie = typeof body.huidigeFunctie === 'string' ? body.huidigeFunctie.trim() : '';
        const doelrol = typeof body.doelrol === 'string' ? body.doelrol.trim() : '';
        const competenties = typeof body.competenties === 'string' ? body.competenties.trim() : '';
        const ervaringJaren = typeof body.ervaringJaren === 'string' ? body.ervaringJaren.trim() : '';
        const toon = body.toon === 'enthousiast' || body.toon === 'beknopt' ? body.toon : 'professioneel';
        if (body.locale !== undefined && body.locale !== 'en' && body.locale !== 'nl') {
            return NextResponse.json({ error: 'Invalid locale.' }, { status: 400 });
        }
        const locale = body.locale === 'en' ? 'en' : 'nl';

        if (!huidigeFunctie || !doelrol) {
            return NextResponse.json(
                { error: 'Huidige functie en doelrol zijn verplicht.' },
                { status: 400 }
            );
        }

        if ([huidigeFunctie, doelrol, competenties, ervaringJaren].some((value) => value.length > 800)) {
            return NextResponse.json({ error: 'Input is too long.' }, { status: 413 });
        }
        const input: ProfieltekstInput = { huidigeFunctie, doelrol, competenties, ervaringJaren, toon, locale };
        const profieltekst = await generateProfieltekst(input);

        return NextResponse.json({ profieltekst }, { headers: { 'Cache-Control': 'no-store' } });
    } catch (err) {
        if (err instanceof AiInputError) {
            return NextResponse.json({ error: err.code }, { status: err.code === 'INPUT_TOO_LARGE' ? 413 : err.code === 'REQUEST_TIMEOUT' ? 408 : 400 });
        }
        console.error('profieltekst generation failed');
        return NextResponse.json(
            { error: 'Genereren mislukt. Probeer het opnieuw.' },
            { status: 500 }
        );
    }
}
