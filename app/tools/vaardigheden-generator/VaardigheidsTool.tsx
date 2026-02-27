"use client";
import { useState } from "react";

export default function VaardigheidsTool() {
    const [functietitel, setFunctietitel] = useState('');
    const [sector, setSector] = useState('');
    const [soort, setSoort] = useState<'beide' | 'hard' | 'soft'>('beide');
    const [vaardigheden, setVaardigheden] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    async function handleGenerate() {
        if (!functietitel.trim()) {
            setError('Vul je functietitel in.');
            return;
        }
        setError('');
        setIsLoading(true);
        setVaardigheden([]);

        try {
            const res = await fetch('/api/tools/vaardigheden', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ functietitel, sector, soort }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Genereren mislukt.'); return; }
            setVaardigheden(json.vaardigheden ?? []);
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopy() {
        const text = vaardigheden.join(', ');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {vaardigheden.length === 0 ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Functietitel <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={functietitel}
                                onChange={e => { setFunctietitel(e.target.value); setError(''); }}
                                placeholder="bijv. Data Analyst"
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
                                placeholder="bijv. Financiën, IT, Zorg"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Soort vaardigheden
                        </label>
                        <div className="flex gap-2">
                            {(['beide', 'hard', 'soft'] as const).map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setSoort(opt)}
                                    className={`flex-1 py-2 text-xs font-black uppercase tracking-wide border-2 transition-colors ${
                                        soort === opt
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                                    }`}
                                >
                                    {opt === 'beide' ? 'Beide' : opt === 'hard' ? 'Hard skills' : 'Soft skills'}
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
                                Vaardigheden genereren...
                            </>
                        ) : (
                            'Genereer vaardigheden'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Jouw vaardigheden</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded">✓ {vaardigheden.length} vaardigheden</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {vaardigheden.map((v, i) => (
                            <span
                                key={i}
                                className="inline-flex items-center px-3 py-1.5 rounded-lg bg-[#4ECDC4]/15 text-teal-900 border border-teal-300 text-sm font-semibold"
                            >
                                {v}
                            </span>
                        ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            💡 Tip: Kies de vaardigheden die het best bij jou passen en voeg ze toe aan de sectie &ldquo;Vaardigheden&rdquo; in je CV.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            {copied ? '✓ Gekopieerd!' : 'Kopieer als lijst'}
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
                        onClick={() => { setVaardigheden([]); setError(''); }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Andere functie invullen
                    </button>
                </div>
            )}
        </div>
    );
}
