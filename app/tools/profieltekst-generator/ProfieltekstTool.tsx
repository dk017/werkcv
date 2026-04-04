"use client";
import { useState } from "react";

export default function ProfieltekstTool() {
    const [huidigeFunctie, setHuidigeFunctie] = useState('');
    const [doelrol, setDoelrol] = useState('');
    const [competenties, setCompetenties] = useState('');
    const [ervaringJaren, setErvaringJaren] = useState('');
    const [toon, setToon] = useState<'professioneel' | 'enthousiast' | 'beknopt'>('professioneel');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    async function handleGenerate() {
        if (!huidigeFunctie.trim() || !doelrol.trim()) {
            setError('Vul minimaal je huidige functie en doelrol in.');
            return;
        }
        setError('');
        setIsLoading(true);
        setResult('');

        try {
            const res = await fetch('/api/tools/profieltekst', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ huidigeFunctie, doelrol, competenties, ervaringJaren, toon }),
            });
            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Genereren mislukt.'); return; }
            setResult(json.profieltekst ?? '');
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
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
                                Huidige / laatste functie <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={huidigeFunctie}
                                onChange={e => setHuidigeFunctie(e.target.value)}
                                placeholder="bijv. Marketing Manager"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Doelrol (functie waarop je solliciteert) <span className="text-red-500">*</span>
                            </label>
                            <input
                                value={doelrol}
                                onChange={e => setDoelrol(e.target.value)}
                                placeholder="bijv. Head of Marketing"
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Kerncompetenties (kommagescheiden)
                        </label>
                        <input
                            value={competenties}
                            onChange={e => setCompetenties(e.target.value)}
                            placeholder="bijv. SEO, contentstrategie, teamleiding"
                            className={inputClass}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Jaren relevante ervaring
                            </label>
                            <input
                                value={ervaringJaren}
                                onChange={e => setErvaringJaren(e.target.value)}
                                placeholder="bijv. 7"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Toon
                            </label>
                            <select
                                value={toon}
                                onChange={e => setToon(e.target.value as 'professioneel' | 'enthousiast' | 'beknopt')}
                                className={inputClass}
                            >
                                <option value="professioneel">Professioneel</option>
                                <option value="enthousiast">Enthousiast</option>
                                <option value="beknopt">Beknopt</option>
                            </select>
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
                                Profieltekst genereren...
                            </>
                        ) : (
                            'Genereer profieltekst'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Jouw profieltekst</span>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 border border-emerald-200 rounded">✓ Gegenereerd</span>
                    </div>

                    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
                        <p className="text-slate-800 leading-relaxed font-medium">{result}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={handleCopy}
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-black text-white font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            {copied ? '✓ Gekopieerd!' : 'Kopieer tekst'}
                        </button>
                    </div>

                    <div className="bg-[#FFF7D6] border-2 border-black p-4 sm:p-5">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-600 mb-2">
                            Volgende stap
                        </p>
                        <h3 className="text-lg font-black text-slate-900 mb-2">
                            Zet deze profieltekst direct in je CV
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                            Open de editor om je profieltekst meteen bovenaan je CV te zetten, of kies eerst een template waarin je hem strak kunt plaatsen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <a
                                href="/editor"
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                                style={{ borderWidth: '3px' }}
                            >
                                Open editor met dit profiel →
                            </a>
                            <a
                                href="/templates"
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-50 transition-colors"
                            >
                                Bekijk templates
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => { setResult(''); setError(''); }}
                        className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                        Opnieuw genereren
                    </button>
                </div>
            )}
        </div>
    );
}
