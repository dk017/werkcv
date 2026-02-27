"use client";
import { useState } from "react";

export default function WerkervaringTool() {
    const [functietitel, setFunctietitel] = useState('');
    const [bedrijf, setBedrijf] = useState('');
    const [werkzaamheden, setWerkzaamheden] = useState('');
    const [bullets, setBullets] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    async function handleGenerate() {
        if (!functietitel.trim() || werkzaamheden.trim().length < 20) {
            setError('Vul je functietitel en een beschrijving van je werkzaamheden in (minimaal 20 tekens).');
            return;
        }
        setError('');
        setIsLoading(true);
        setBullets([]);

        try {
            const res = await fetch('/api/tools/werkervaring-bullets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ functietitel, bedrijf, werkzaamheden }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Genereren mislukt.'); return; }
            setBullets(json.bullets ?? []);
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopyAll() {
        const text = bullets.map(b => `• ${b}`).join('\n');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {bullets.length === 0 ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Functietitel <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={functietitel}
                                onChange={e => setFunctietitel(e.target.value)}
                                placeholder="bijv. Software Developer"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Bedrijf (optioneel)
                            </label>
                            <input
                                value={bedrijf}
                                onChange={e => setBedrijf(e.target.value)}
                                placeholder="bijv. Coolblue"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Beschrijf je werkzaamheden <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={werkzaamheden}
                            onChange={e => { setWerkzaamheden(e.target.value); setError(''); }}
                            placeholder="bijv. Ik ontwikkelde nieuwe features in React, werkte samen met het design team, reviewde code van collega's en verbeterde de laadtijd van de app met 30%..."
                            rows={5}
                            className={`${inputClass} resize-none`}
                        />
                        <p className="text-xs text-slate-400 mt-1">Hoe meer detail, hoe sterker de bullets.</p>
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
                                Bullets genereren...
                            </>
                        ) : (
                            'Genereer CV bullets'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Jouw werkervaring bullets</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded">✓ {bullets.length} bullets</span>
                    </div>

                    <ul className="space-y-2">
                        {bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                                <span className="flex-shrink-0 mt-0.5 w-5 h-5 bg-[#4ECDC4] border border-black rounded-full flex items-center justify-center text-xs font-black">{i + 1}</span>
                                <span className="text-slate-800 font-medium text-sm leading-relaxed">{bullet}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCopyAll}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            {copied ? '✓ Gekopieerd!' : 'Kopieer alle bullets'}
                        </button>
                        <a
                            href="/templates"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Zet in je CV →
                        </a>
                    </div>

                    <button
                        onClick={() => { setBullets([]); setError(''); }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Nieuwe functie invullen
                    </button>
                </div>
            )}
        </div>
    );
}
