"use client";
import { useState } from "react";

export default function OpzeggingsbriefTool() {
    const [naam, setNaam] = useState('');
    const [adres, setAdres] = useState('');
    const [werkgever, setWerkgever] = useState('');
    const [functie, setFunctie] = useState('');
    const [datumBrief, setDatumBrief] = useState('');
    const [datumEinde, setDatumEinde] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    async function handleGenerate() {
        if (!naam.trim() || !werkgever.trim() || !functie.trim() || !datumEinde.trim()) {
            setError('Vul naam, werkgever, functie en einddatum in.');
            return;
        }
        setError('');

        try {
            const res = await fetch('/api/tools/opzeggingsbrief', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ naam, adres, werkgever, functie, datumBrief, datumEinde }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Genereren mislukt.'); return; }
            setResult(json.brief ?? '');
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        }
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Jouw naam <span className="text-red-500">*</span>
                            </label>
                            <input value={naam} onChange={e => setNaam(e.target.value)} placeholder="bijv. Jan de Groot" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Jouw adres (optioneel)
                            </label>
                            <input value={adres} onChange={e => setAdres(e.target.value)} placeholder="bijv. Keizersgracht 12, 1015 Amsterdam" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Naam werkgever / bedrijf <span className="text-red-500">*</span>
                            </label>
                            <input value={werkgever} onChange={e => setWerkgever(e.target.value)} placeholder="bijv. Acme B.V." className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Jouw functietitel <span className="text-red-500">*</span>
                            </label>
                            <input value={functie} onChange={e => setFunctie(e.target.value)} placeholder="bijv. Projectmanager" className={inputClass} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Datum brief (optioneel)
                            </label>
                            <input value={datumBrief} onChange={e => setDatumBrief(e.target.value)} placeholder="bijv. 27 februari 2026" className={inputClass} />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Datum laatste werkdag <span className="text-red-500">*</span>
                            </label>
                            <input value={datumEinde} onChange={e => setDatumEinde(e.target.value)} placeholder="bijv. 31 maart 2026" className={inputClass} />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                    <button
                        onClick={handleGenerate}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: '3px' }}
                    >
                        Genereer opzeggingsbrief
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Jouw opzeggingsbrief</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded">✓ Klaar</span>
                    </div>

                    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
                        <pre className="text-slate-800 font-medium text-sm leading-relaxed whitespace-pre-wrap font-sans">{result}</pre>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            💡 Tip: Stuur de brief aangetekend of vraag een schriftelijke bevestiging van ontvangst.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            {copied ? '✓ Gekopieerd!' : 'Kopieer brief'}
                        </button>
                        <a
                            href="/tools/opzegtermijn-berekenen"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Bereken opzegtermijn →
                        </a>
                    </div>

                    <button
                        onClick={() => { setResult(''); setError(''); }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Opnieuw invullen
                    </button>
                </div>
            )}
        </div>
    );
}
