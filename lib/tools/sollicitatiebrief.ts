import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
type LetterLocale = 'nl' | 'en';

export interface SollicitatiebriefInput {
    naam: string;
    doelrol: string;
    bedrijfsnaam: string;
    motivatie: string;
    toon: 'professioneel' | 'enthousiast' | 'beknopt';
    locale?: LetterLocale;
}

export async function generateSollicitatiebrief(input: SollicitatiebriefInput): Promise<string> {
    const toonInstructies = {
        professioneel: 'formeel en professioneel',
        enthousiast: 'enthousiast en warm',
        beknopt: 'to-the-point en beknopt',
    };

    const locale = input.locale === 'en' ? 'en' : 'nl';
    const companyName = input.bedrijfsnaam.trim() || (locale === 'en' ? 'the company' : 'het bedrijf');
    const dutchPrompt = `Je bent een expert in het schrijven van Nederlandse sollicitatiebrieven.
Schrijf een professionele sollicitatiebrief.

Structuur:
1. Aanhef: "Geachte heer/mevrouw," of "Beste ${companyName} team,"
2. Opening: waarom je solliciteert (1 paragraaf, ~40 woorden)
3. Wat je te bieden hebt: relevante ervaring en vaardigheden (1-2 paragrafen, ~100 woorden)
4. Waarom dit bedrijf: motivatie voor specifiek dit bedrijf (1 paragraaf, ~40 woorden)
5. Afsluiting met call-to-action: gesprek aanvragen (1 paragraaf, ~30 woorden)
6. "Met vriendelijke groet," + naam

Toon: ${toonInstructies[input.toon]}
Totale lengte: 250-320 woorden
Geef ALLEEN de brief terug, geen extra uitleg.`;

    const englishToneMap = {
        professioneel: 'professional and direct',
        enthousiast: 'warm, confident and enthusiastic',
        beknopt: 'concise and to the point',
    } as const;
    const englishPrompt = `You are an expert in writing English cover letters for jobs in the Netherlands.
Write a concise, natural-sounding motivation letter / cover letter in English.

Structure:
1. Salutation: "Dear Hiring Manager," or "Dear ${companyName} team,"
2. Opening: state the role and your fit directly (1 paragraph, ~40 words)
3. What you bring: relevant experience and evidence (1-2 short paragraphs, ~100 words)
4. Why this company or role: specific motivation, not generic praise (1 paragraph, ~40 words)
5. Closing with call to action: invite an interview (1 paragraph, ~30 words)
6. "Kind regards," + name

Rules:
- Tone: ${englishToneMap[input.toon]}
- Keep it recruiter-friendly for the Dutch market: short paragraphs, concrete language, no CV repetition, no robotic AI phrases.
- Total length: 180-260 words
- Return ONLY the letter, with no extra explanation.`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 700,
        messages: [
            {
                role: 'system',
                content: locale === 'en' ? englishPrompt : dutchPrompt,
            },
            {
                role: 'user',
                content: locale === 'en'
                    ? `Applicant name: ${input.naam || 'the applicant'}
Applying for: ${input.doelrol}
Company: ${companyName}
Background/motivation: ${input.motivatie}`
                    : `Naam sollicitant: ${input.naam || 'de sollicitant'}
Solliciteert naar: ${input.doelrol}
Bij bedrijf: ${companyName}
Achtergrond/motivatie: ${input.motivatie}`,
            },
        ],
    });

    return response.choices[0]?.message?.content?.trim() ?? '';
}
