import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface ProfieltekstInput {
    huidigeFunctie: string;
    doelrol: string;
    competenties: string;
    ervaringJaren: string;
    toon: 'professioneel' | 'enthousiast' | 'beknopt';
    locale?: 'nl' | 'en';
}

export async function generateProfieltekst(input: ProfieltekstInput): Promise<string> {
    const toonInstructies = {
        professioneel: 'formele, professionele toon',
        enthousiast: 'enthousiaste, motiverende toon',
        beknopt: 'beknopte, krachtige toon',
    };

    const locale = input.locale ?? 'nl';
    const english = locale === 'en';
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 300,
        messages: [
            {
                role: 'system',
                content: english
                    ? `You are an expert CV writer for people applying in the Netherlands.
Write a concise professional profile for a CV.

Rules:
- 4–5 sentences (60–80 words maximum)
- Do not begin with “I”
- Use active, concrete language
- Mention only the role, strengths and experience supplied by the user
- Do not invent employers, tools, metrics, qualifications or responsibilities
- End with what the candidate offers or is seeking
- Tone: ${input.toon === 'enthousiast' ? 'enthusiastic and motivating' : input.toon === 'beknopt' ? 'concise and direct' : 'professional and clear'}
- Return only the profile text, with no explanation or quotation marks`
                    : `Je bent een expert CV-schrijver voor de Nederlandse arbeidsmarkt.
Schrijf een sterke profieltekst (persoonlijk profiel) voor een CV.

Regels:
- Maximaal 4-5 zinnen (60-80 woorden)
- Begin NIET met "Ik"
- Gebruik actieve, concrete taal
- Noem alleen de functie, sterke punten en ervaring die de gebruiker opgeeft
- Verzin geen werkgevers, tools, cijfers, diploma's of verantwoordelijkheden
- Sluit af met wat de kandidaat zoekt of biedt
- Schrijf in de derde persoon enkelvoud of als verklarende introductie
- Toon: ${toonInstructies[input.toon]}
- Geef ALLEEN de profieltekst terug, geen uitleg of aanhalingstekens`,
            },
            {
                role: 'user',
                content: english
                    ? `Write a profile using only these user-provided facts:
Current/last role: ${input.huidigeFunctie}
Target role: ${input.doelrol}
Strengths: ${input.competenties || 'not provided'}
Years of experience: ${input.ervaringJaren || 'not provided'}`
                    : `Maak een profieltekst voor:
Huidige/laatste functie: ${input.huidigeFunctie}
Doelrol: ${input.doelrol}
Kerncompetenties: ${input.competenties || 'niet opgegeven'}
Jaren ervaring: ${input.ervaringJaren || 'niet opgegeven'}`,
            },
        ],
    });

    return response.choices[0]?.message?.content?.trim() ?? '';
}
