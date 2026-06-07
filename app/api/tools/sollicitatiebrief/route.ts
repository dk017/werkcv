import { NextRequest, NextResponse } from 'next/server';
import { generateSollicitatiebrief } from '@/lib/tools/sollicitatiebrief';
type LetterLocale = 'nl' | 'en';

function toLocale(value: string | null | undefined): LetterLocale {
    return value === 'en' ? 'en' : 'nl';
}

export async function POST(request: NextRequest) {
    let locale: LetterLocale = 'nl';
    try {
        const body = await request.json();
        locale = toLocale(body.locale);
        const t = (nl: string, en: string) => (locale === 'en' ? en : nl);

        const naam = typeof body.naam === 'string' ? body.naam.trim() : '';
        const doelrol = typeof body.doelrol === 'string' ? body.doelrol.trim() : '';
        const bedrijfsnaam = typeof body.bedrijfsnaam === 'string' ? body.bedrijfsnaam.trim() : '';
        const motivatie = typeof body.motivatie === 'string' ? body.motivatie.trim() : '';
        const toon = body.toon === 'enthousiast' || body.toon === 'beknopt' ? body.toon : 'professioneel';

        if (!doelrol || !motivatie || motivatie.length < 20) {
            return NextResponse.json(
                { error: t('Doelrol en een korte motivatie zijn verplicht.', 'Target role and a short motivation are required.') },
                { status: 400 }
            );
        }

        const brief = await generateSollicitatiebrief({ naam, doelrol, bedrijfsnaam, motivatie, toon, locale });

        return NextResponse.json({ brief });
    } catch (err) {
        console.error('sollicitatiebrief error:', err);
        return NextResponse.json(
            { error: locale === 'en' ? 'Generation failed. Please try again.' : 'Genereren mislukt. Probeer het opnieuw.' },
            { status: 500 }
        );
    }
}
