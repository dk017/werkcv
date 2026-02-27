"use client";
import { useState } from "react";

interface KeywordCategory {
    categorie: string;
    keywords: string[];
}

export default function CvKeywordsTool() {
    const [functietitel, setFunctietitel] = useState('');
    const [sector, setSector] = useState('');
    const [ervaringsniveau, setErvaringsniveau] = useState<'junior' | 'medior' | 'senior'>('medior');
    const [categories, setCategories] = useState<KeywordCategory[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

    async function handleGenerate() {
        if (!functietitel.trim()) {
            setError('Vul je functietitel in.');
            return;
        }
        setError('');
        setIsLoading(true);
        setCategories([]);

        try {
            const res = await fetch('/api/tools/cv-keywords', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ functietitel, sector, ervaringsniveau }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Genereren mislukt.'); return; }
            setCategories(json.categories ?? []);
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopyCategory(keywords: string[], idx: number) {
        await navigator.clipboard.writeText(keywords.join(', '));
        setCopiedIdx(idx);
        setTimeout(() => setCopiedIdx(null), 2000);
    }

    const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {categories.length === 0 ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Functietitel <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={functietitel}
                                onChange={e => { setFunctietitel(e.target.value); setError(''); }}
                                placeholder="bijv. Marketing Manager"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Sector (optioneel)
                            </label>
                            <input
                                value={sector}
                                onChange={e => setSector(e.target.value)}
                                placeholder="bijv. E-commerce, Zorg, IT"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Ervaringsniveau
                        </label>
                        <div className="flex gap-2">
                            {(['junior', 'medior', 'senior'] as const).map((niveau) => (
                                <button
                                    key={niveau}
                                    type="button"
                                    onClick={() => setErvaringsniveau(niveau)}
                                    className={`flex-1 py-2 text-xs font-black uppercase tracking-wide border-2 transition-colors ${
                                        ervaringsniveau === niveau
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                                    }`}
                                >
                                    {niveau.charAt(0).toUpperCase() + niveau.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                    <button
                        onClick={handleGenerate}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: '3px' }}
                    >
                        {isLoading ? (
                            <>
                                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Keywords ophalen...
                            </>
                        ) : (
                            'Genereer CV keywords'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-5">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Keywords voor {functietitel}</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded">✓ Gegenereerd</span>
                    </div>

                    {categories.map((cat, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
                                <span className="text-xs font-black uppercase tracking-wide text-slate-600">{cat.categorie}</span>
                                <button
                                    onClick={() => handleCopyCategory(cat.keywords, idx)}
                                    className="text-[11px] font-bold text-teal-600 hover:text-teal-800 transition-colors"
                                >
                                    {copiedIdx === idx ? '✓ Gekopieerd' : 'Kopieer'}
                                </button>
                            </div>
                            <div className="px-4 py-3 flex flex-wrap gap-2">
                                {cat.keywords.map((kw, ki) => (
                                    <span
                                        key={ki}
                                        className="inline-flex px-2.5 py-1 rounded-lg bg-[#4ECDC4]/10 text-teal-900 border border-teal-200 text-xs font-semibold"
                                    >
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            💡 Tip: Verwerk de &ldquo;Must-have&rdquo; keywords in je profieltekst en werkervaring. ATS-systemen scannen op exacte woordovereenkomsten.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="/templates"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Verwerk in je CV →
                        </a>
                        <button
                            onClick={() => { setCategories([]); setError(''); }}
                            className="flex-1 py-3 px-4 text-sm font-bold text-slate-600 border-2 border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Andere functie
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
