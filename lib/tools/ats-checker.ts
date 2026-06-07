import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
type AtsLocale = 'nl' | 'en';

export interface AtsCheck {
    id: string;
    categorie: string;
    label: string;
    passed: boolean;
    tip: string | null;
    punten: number;
}

export interface AtsCheckerResult {
    score: number;
    label: string;
    labelKleur: 'rood' | 'oranje' | 'geel' | 'groen';
    samenvatting: string;
    checks: AtsCheck[];
}

const nlSystemPrompt = `Je bent een ATS-expert die CV's beoordeelt voor de Nederlandse arbeidsmarkt.
Analyseer het CV en beoordeel het op ATS-compatibiliteit en inhoudskwaliteit.

Geef de beoordeling terug als JSON met dit exacte formaat:
{
  "score": <getal 0-100>,
  "label": <"Zwak" | "Matig" | "Goed" | "Sterk">,
  "labelKleur": <"rood" | "oranje" | "geel" | "groen">,
  "samenvatting": "<2-3 zinnen over de grootste sterke en zwakke punten>",
  "checks": [
    {
      "id": "<unieke id>",
      "categorie": "<categorienaam>",
      "label": "<wat wordt gecontroleerd>",
      "passed": <true|false>,
      "tip": "<null als passed=true, anders korte verbetertip>",
      "punten": <waarde van dit check 5-15>
    }
  ]
}

Gebruik deze 16 checks (categorie → checks):

Categorie "Contactgegevens" (4 checks):
- "email": E-mailadres aanwezig (8 punten)
- "telefoon": Telefoonnummer aanwezig (5 punten)
- "locatie": Stad/woonplaats aanwezig (5 punten)
- "linkedin": LinkedIn-profiel aanwezig (7 punten)

Categorie "Structuur & Opmaak" (4 checks):
- "profieltekst": Persoonlijk profiel of samenvatting aanwezig (10 punten)
- "werkervaring_sectie": Werkervaringsectie aanwezig en gevuld (10 punten)
- "opleiding_sectie": Opleidingssectie aanwezig (7 punten)
- "vaardigheden_sectie": Vaardigheidensectie aanwezig (8 punten)

Categorie "Inhoudskwaliteit" (4 checks):
- "actieve_werkwoorden": Gebruik van actieve werkwoorden (Leidde, Ontwikkelde, Realiseerde, etc.) (8 punten)
- "meetbare_resultaten": Meetbare resultaten of cijfers aanwezig (bijv. %, €, aantallen) (10 punten)
- "lengte": CV-lengte geschikt (niet te kort <200 woorden, niet te lang >800 woorden) (7 punten)
- "buzzwords": Geen overdaad aan holle buzzwords (Resultaatgericht, Teamplayer, Proactief) zonder bewijs (5 punten)

Categorie "ATS-compatibiliteit" (4 checks):
- "datumformaat": Datums in consistent en leesbaar formaat (jan 2023 – heden) (5 punten)
- "sectikoppen": Herkenbare, standaard sectikoppen gebruikt (5 punten)
- "geen_tabellen": Geen complexe tabelstructuren die ATS verwarren (5 punten — schat op basis van tekstflow)
- "email_professioneel": E-mailadres ziet er professioneel uit (geen 'coolguy1987@...') (5 punten)

Regels:
- score = som van punten van alle passed checks (max 103 → normaliseer naar 100)
- label: Zwak (0-40), Matig (41-60), Goed (61-80), Sterk (81-100)
- labelKleur: rood (Zwak), oranje (Matig), geel (Goed), groen (Sterk)
- tip: null als passed=true, anders max 1 zin met concrete verbetertip in het Nederlands
- Geef ALLEEN de JSON, niets anders`;

const enSystemPrompt = `You are an ATS expert reviewing CVs for the Dutch job market.
Analyze the CV for ATS compatibility and content quality.

Return the assessment as JSON in this exact shape:
{
  "score": <number 0-100>,
  "label": <"Weak" | "Fair" | "Good" | "Strong">,
  "labelKleur": <"rood" | "oranje" | "geel" | "groen">,
  "samenvatting": "<2-3 sentences on the biggest strengths and weaknesses>",
  "checks": [
    {
      "id": "<unique id>",
      "categorie": "<category name>",
      "label": "<what is being checked>",
      "passed": <true|false>,
      "tip": "<null if passed=true, otherwise one short improvement tip>",
      "punten": <points for this check 5-15>
    }
  ]
}

Use these 16 checks (category → checks):

Category "Contact details" (4 checks):
- "email": Email address present (8 points)
- "telefoon": Phone number present (5 points)
- "locatie": City/location present (5 points)
- "linkedin": LinkedIn profile present (7 points)

Category "Structure & Layout" (4 checks):
- "profieltekst": Profile summary present (10 points)
- "werkervaring_sectie": Work experience section present and filled (10 points)
- "opleiding_sectie": Education section present (7 points)
- "vaardigheden_sectie": Skills section present (8 points)

Category "Content Quality" (4 checks):
- "actieve_werkwoorden": Uses active verbs (Led, Built, Improved, Delivered, etc.) (8 points)
- "meetbare_resultaten": Includes measurable outcomes or numbers (for example %, €, counts) (10 points)
- "lengte": CV length is suitable (not too short <200 words, not too long >800 words) (7 points)
- "buzzwords": No overload of empty buzzwords (results-driven, team player, proactive) without proof (5 points)

Category "ATS Compatibility" (4 checks):
- "datumformaat": Dates use a consistent, readable format (Jan 2023 – Present) (5 points)
- "sectikoppen": Uses recognizable standard headings (5 points)
- "geen_tabellen": No complex table structure likely to confuse ATS parsing (5 points — infer from text flow)
- "email_professioneel": Email address looks professional (not something like coolguy1987@...) (5 points)

Rules:
- score = sum of points of all passed checks (max 103 → normalize to 100)
- label: Weak (0-40), Fair (41-60), Good (61-80), Strong (81-100)
- labelKleur: rood (Weak), oranje (Fair), geel (Good), groen (Strong)
- categorie, label, samenvatting and tip must be in English
- tip: null if passed=true, otherwise max 1 sentence with a concrete improvement tip in English
- Return ONLY the JSON, nothing else`;

export async function analyzeAts(cvText: string, locale: AtsLocale = 'nl'): Promise<AtsCheckerResult> {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 1200,
        messages: [
            {
                role: 'system',
                content: locale === 'en' ? enSystemPrompt : nlSystemPrompt,
            },
            {
                role: 'user',
                content: `Analyseer dit CV:\n\n${cvText.slice(0, 6000)}`,
            },
        ],
    });

    const raw = response.choices[0]?.message?.content?.trim() ?? '{}';

    // Strip markdown code fences if present
    const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();

    try {
        const parsed = JSON.parse(clean) as AtsCheckerResult;
        // Clamp score
        parsed.score = Math.max(0, Math.min(100, Math.round(parsed.score)));
        return parsed;
    } catch {
        throw new Error(locale === 'en'
            ? 'ATS analysis could not be processed. Please try again.'
            : 'ATS analyse kon niet worden verwerkt. Probeer het opnieuw.');
    }
}
