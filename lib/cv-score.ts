import { CVData } from './cv';

export interface CvCheck {
    id: string;
    label: string;           // Short label shown in the list
    tip: string;             // Actionable tip shown when failed
    passed: boolean;
    points: number;          // Max points for this check
}

export interface CvScoreResult {
    score: number;           // 0-100
    checks: CvCheck[];
    label: string;           // "Aandacht nodig" | "Verbetering mogelijk" | "Goed op weg" | "Klaar om te versturen"
    color: string;           // Tailwind text color class
    ringColor: string;       // Hex for SVG stroke
}

// Dutch weak verbs — passive phrasing that kills ATS scoring
const WEAK_VERBS = [
    'verantwoordelijk voor',
    'betrokken bij',
    'hielp bij',
    'hielp met',
    'assisteerde',
    'ondersteuning bij',
    'was onderdeel van',
    'was werkzaam',
    'deed mee',
    'had als taak',
];

// Generic buzzwords that add zero value
const BUZZWORDS = [
    'gemotiveerd',
    'passievol',
    'hardwerkend',
    'resultaatgericht',
    'dynamisch',
    'proactief',
    'enthousiast',
    'gedreven',
    'klantgericht',
    'teamspeler',
    'flexibel',
    'hands-on',
];

function wordCount(text: string): number {
    return text.trim().split(/\s+/).filter(Boolean).length;
}

function containsNumber(text: string): boolean {
    // Matches digits, percentages, currency (€/$), ranges like "10-15"
    return /\d/.test(text);
}

function containsWeakVerb(text: string): boolean {
    const lower = text.toLowerCase();
    return WEAK_VERBS.some(v => lower.includes(v));
}

function containsBuzzword(text: string): boolean {
    const lower = text.toLowerCase();
    return BUZZWORDS.some(b => lower.includes(b));
}

export function computeCvScore(data: CVData): CvScoreResult {
    const checks: CvCheck[] = [];

    // ─── 1. Naam + contactgegevens (8 pts) ──────────────────────────────────
    const hasContact = !!(
        data.personal.name?.trim() &&
        data.personal.email?.trim() &&
        data.personal.phone?.trim()
    );
    checks.push({
        id: 'contact',
        label: 'Naam, e-mail en telefoon ingevuld',
        tip: 'Vul je volledige naam, e-mailadres en telefoonnummer in onder Persoonlijke Gegevens.',
        passed: hasContact,
        points: 8,
    });

    // ─── 2. Functietitel (6 pts) ─────────────────────────────────────────────
    const hasTitle = !!(data.personal.title?.trim());
    checks.push({
        id: 'title',
        label: 'Gewenste functie ingevuld',
        tip: 'Voeg een functietitel toe (bijv. "Marketing Manager") — dit is het eerste wat een recruiter ziet.',
        passed: hasTitle,
        points: 6,
    });

    // ─── 3. Profieltekst aanwezig (8 pts) ────────────────────────────────────
    const summary = data.personal.summary ?? '';
    const summaryWords = wordCount(summary);
    const hasSummary = summaryWords >= 20;
    checks.push({
        id: 'summary-present',
        label: 'Profieltekst aanwezig',
        tip: 'Schrijf een profieltekst van minimaal 3 zinnen die vertelt wie je bent, wat je kunt en wat je zoekt.',
        passed: hasSummary,
        points: 8,
    });

    // ─── 4. Profieltekst ideale lengte (5 pts) ───────────────────────────────
    const summaryIdealLength = summaryWords >= 30 && summaryWords <= 150;
    checks.push({
        id: 'summary-length',
        label: 'Profieltekst ideale lengte (30–150 woorden)',
        tip: summaryWords < 30
            ? 'Je profieltekst is te kort. Voeg meer context toe: je sterkste skills, je ervaring in jaren en wat je zoekt.'
            : 'Je profieltekst is te lang. Recruiters lezen profielteksten die korter zijn dan 150 woorden vaker volledig.',
        passed: summaryIdealLength,
        points: 5,
    });

    // ─── 5. Werkervaring aanwezig (10 pts) ───────────────────────────────────
    const hasExperience = data.experience.length > 0;
    checks.push({
        id: 'experience-present',
        label: 'Minimaal 1 werkervaring vermeld',
        tip: 'Voeg je meest recente baan of stage toe onder Werkervaring. Ook korte opdrachten en bijbanen tellen mee.',
        passed: hasExperience,
        points: 10,
    });

    // ─── 6. Bullet points per functie (8 pts) ────────────────────────────────
    const entriesWithHighlights = data.experience.filter(
        e => e.highlights && e.highlights.filter(h => h.trim()).length > 0
    );
    const highlightRatio = data.experience.length > 0
        ? entriesWithHighlights.length / data.experience.length
        : 0;
    const hasHighlights = highlightRatio >= 0.5;
    checks.push({
        id: 'highlights',
        label: 'Bullet points toegevoegd per functie',
        tip: 'Voeg bij elke functie minimaal 2 bullet points toe die beschrijven wat je hebt bereikt — niet alleen wat je deed.',
        passed: hasHighlights,
        points: 8,
    });

    // ─── 7. Cijfers in bullet points (10 pts) ────────────────────────────────
    const allHighlights = data.experience.flatMap(e => e.highlights ?? []).filter(h => h.trim());
    const highlightsWithNumbers = allHighlights.filter(containsNumber);
    const hasMetrics = allHighlights.length > 0 && highlightsWithNumbers.length > 0;
    checks.push({
        id: 'metrics',
        label: 'Resultaten met cijfers onderbouwd',
        tip: 'Voeg getallen toe aan je bullet points: percentages, bedragen, aantallen of tijdsperioden. "Verhoogde verkoop met 23%" overtuigt meer dan "Verbeterde verkoop".',
        passed: hasMetrics,
        points: 10,
    });

    // ─── 8. Geen zwakke werkwoorden (7 pts) ──────────────────────────────────
    const allHighlightText = allHighlights.join(' ');
    const summaryAndHighlights = `${summary} ${allHighlightText}`;
    const hasWeakVerbs = containsWeakVerb(summaryAndHighlights);
    checks.push({
        id: 'weak-verbs',
        label: 'Geen passieve formuleringen',
        tip: 'Vermijd "verantwoordelijk voor", "betrokken bij" en "hielp bij". Gebruik actieve werkwoorden: Geleid, Ontwikkeld, Gerealiseerd, Verhoogd.',
        passed: !hasWeakVerbs,
        points: 7,
    });

    // ─── 9. Geen buzzwords (5 pts) ───────────────────────────────────────────
    const hasBuzzwords = containsBuzzword(summaryAndHighlights);
    checks.push({
        id: 'buzzwords',
        label: 'Geen lege buzzwords',
        tip: 'Woorden als "gemotiveerd", "dynamisch" en "resultaatgericht" zeggen niets. Toon het in je werkervaring in plaats van het te claimen.',
        passed: !hasBuzzwords,
        points: 5,
    });

    // ─── 10. Vaardigheden aanwezig (8 pts) ───────────────────────────────────
    const hasSkills = data.skills.length >= 3;
    checks.push({
        id: 'skills',
        label: 'Minimaal 3 vaardigheden vermeld',
        tip: 'Voeg concrete vaardigheden toe: software, tools, technische skills. "Excel (gevorderd)" is beter dan alleen "MS Office".',
        passed: hasSkills,
        points: 8,
    });

    // ─── 11. Talen vermeld (5 pts) ───────────────────────────────────────────
    const hasLanguages = data.languages.length > 0;
    checks.push({
        id: 'languages',
        label: 'Talen toegevoegd',
        tip: 'Voeg minimaal je moedertaal en het Engels toe onder Talen. Recruiters en ATS-systemen matchen actief op taalniveau.',
        passed: hasLanguages,
        points: 5,
    });

    // ─── 12. Opleiding aanwezig (8 pts) ──────────────────────────────────────
    const hasEducation = data.education.length > 0;
    checks.push({
        id: 'education',
        label: 'Opleiding vermeld',
        tip: 'Voeg je hoogst genoten opleiding toe. Vermeld ook de instelling en de periode.',
        passed: hasEducation,
        points: 8,
    });

    // ─── 13. LinkedIn URL (5 pts) ────────────────────────────────────────────
    const hasLinkedIn = !!(data.personal.linkedIn?.trim());
    checks.push({
        id: 'linkedin',
        label: 'LinkedIn-URL toegevoegd',
        tip: '87% van recruiters bekijkt je LinkedIn naast je CV. Voeg je LinkedIn-URL toe — bij voorkeur een persoonlijke URL (linkedin.com/in/jounaam).',
        passed: hasLinkedIn,
        points: 5,
    });

    // ─── 14. CV niet leeg / voldoende inhoud (7 pts) ─────────────────────────
    const totalWords =
        wordCount(summary) +
        data.experience.reduce((sum, e) => sum + wordCount(e.description) + (e.highlights ?? []).reduce((s, h) => s + wordCount(h), 0), 0) +
        data.education.reduce((sum, e) => sum + wordCount(e.description), 0);
    const hasEnoughContent = totalWords >= 100;
    checks.push({
        id: 'content-volume',
        label: 'Voldoende inhoud (min. 100 woorden)',
        tip: 'Je CV heeft nog weinig inhoud. Werk je werkervaring en profieltekst verder uit voor een sterkere indruk.',
        passed: hasEnoughContent,
        points: 7,
    });

    // ─── Totaalscore ─────────────────────────────────────────────────────────
    const score = checks
        .filter(c => c.passed)
        .reduce((sum, c) => sum + c.points, 0);

    let label: string;
    let color: string;
    let ringColor: string;

    if (score >= 90) {
        label = 'Klaar om te versturen';
        color = 'text-emerald-700';
        ringColor = '#10b981';
    } else if (score >= 75) {
        label = 'Goed op weg';
        color = 'text-teal-600';
        ringColor = '#4ECDC4';
    } else if (score >= 50) {
        label = 'Verbetering mogelijk';
        color = 'text-amber-600';
        ringColor = '#f59e0b';
    } else {
        label = 'Aandacht nodig';
        color = 'text-red-600';
        ringColor = '#ef4444';
    }

    return { score, checks, label, color, ringColor };
}
