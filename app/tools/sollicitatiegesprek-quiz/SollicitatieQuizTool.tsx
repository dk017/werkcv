'use client';

import { useState } from 'react';

interface QuizVraag {
    id: string;
    categorie: string;
    vraag: string;
    waaromGevraagd: string;
    antwoordTips: string[];
    voorbeeldAntwoord: string;
}

interface QuizResult {
    functietitel: string;
    vragen: QuizVraag[];
}

const categorieKleur: Record<string, string> = {
    Motivatie: 'bg-blue-100 text-blue-800',
    Ervaring: 'bg-teal-100 text-teal-800',
    Gedrag: 'bg-purple-100 text-purple-800',
    Situationeel: 'bg-orange-100 text-orange-800',
    Vaktechnisch: 'bg-yellow-100 text-yellow-800',
    Persoonlijkheid: 'bg-pink-100 text-pink-800',
};

export default function SollicitatieQuizTool() {
    const [functietitel, setFunctietitel] = useState('');
    const [sector, setSector] = useState('');
    const [ervaringsniveau, setErvaringsniveau] = useState<'junior' | 'medior' | 'senior'>('medior');
    const [result, setResult] = useState<QuizResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [openVraag, setOpenVraag] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);
        setOpenVraag(null);

        try {
            const res = await fetch('/api/tools/sollicitatiegesprek-quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ functietitel, sector, ervaringsniveau }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Genereren mislukt.');
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er ging iets mis.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Functietitel <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={functietitel}
                            onChange={e => setFunctietitel(e.target.value)}
                            placeholder="bijv. Marketing Manager"
                            required
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Sector</label>
                        <input
                            type="text"
                            value={sector}
                            onChange={e => setSector(e.target.value)}
                            placeholder="bijv. Retail, Zorg, IT"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-black text-slate-900 mb-2">Ervaringsniveau</label>
                    <div className="flex gap-2">
                        {(['junior', 'medior', 'senior'] as const).map(n => (
                            <button
                                key={n}
                                type="button"
                                onClick={() => setErvaringsniveau(n)}
                                className={`px-4 py-2 text-sm font-black border-2 border-black transition-all capitalize ${
                                    ervaringsniveau === n
                                        ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                        : 'bg-white hover:bg-slate-50'
                                }`}
                            >
                                {n}
                            </button>
                        ))}
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-400 p-3 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !functietitel}
                    className="w-full bg-[#4ECDC4] text-slate-900 font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? '8 vragen genereren…' : 'Genereer oefenvragen →'}
                </button>
            </form>

            {result && (
                <div className="space-y-3 border-t-2 border-black pt-6">
                    <p className="text-sm font-black text-slate-600">
                        8 vragen voor <span className="text-slate-900">{result.functietitel}</span> — klik om antwoord te zien
                    </p>
                    {result.vragen.map((v, i) => (
                        <div key={v.id} className="border-2 border-black">
                            <button
                                onClick={() => setOpenVraag(openVraag === v.id ? null : v.id)}
                                className="w-full flex items-start gap-3 p-4 text-left hover:bg-slate-50 transition-colors"
                            >
                                <span className="flex-shrink-0 w-6 h-6 bg-[#4ECDC4] border-2 border-black text-xs font-black flex items-center justify-center">
                                    {i + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${categorieKleur[v.categorie] ?? 'bg-slate-100 text-slate-700'}`}>
                                            {v.categorie}
                                        </span>
                                    </div>
                                    <p className="font-bold text-slate-900 text-sm">{v.vraag}</p>
                                </div>
                                <span className="flex-shrink-0 text-slate-400 font-black">
                                    {openVraag === v.id ? '▲' : '▼'}
                                </span>
                            </button>

                            {openVraag === v.id && (
                                <div className="border-t-2 border-black p-4 space-y-3 bg-slate-50">
                                    <div>
                                        <p className="text-xs font-black text-slate-500 mb-1">WAAROM GEVRAAGD</p>
                                        <p className="text-sm text-slate-600">{v.waaromGevraagd}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-500 mb-1">ANTWOORDTIPS</p>
                                        <ul className="space-y-1">
                                            {v.antwoordTips.map((tip, j) => (
                                                <li key={j} className="text-sm text-slate-700 flex gap-2">
                                                    <span className="text-teal-600 flex-shrink-0">→</span>{tip}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-500 mb-1">VOORBEELDANTWOORD</p>
                                        <p className="text-sm text-slate-700 italic leading-relaxed bg-white border border-slate-200 p-3">
                                            {v.voorbeeldAntwoord}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <button
                        onClick={() => { setResult(null); setFunctietitel(''); setSector(''); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuwe quiz →
                    </button>
                </div>
            )}
        </div>
    );
}
