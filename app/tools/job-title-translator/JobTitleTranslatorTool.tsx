'use client';

import { useState } from 'react';

interface TranslatorResult {
    vertaling: string;
    alternatieven: string[];
    uitleg: string;
    linkedinTip: string;
}

export default function JobTitleTranslatorTool() {
    const [titel, setTitel] = useState('');
    const [richting, setRichting] = useState<'nl-en' | 'en-nl'>('nl-en');
    const [result, setResult] = useState<TranslatorResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        try {
            const res = await fetch('/api/tools/job-title-translator', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ titel, richting }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Vertaling mislukt.');
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er ging iets mis.');
        } finally {
            setLoading(false);
        }
    }

    async function copy(text: string) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Direction toggle */}
                <div>
                    <label className="block text-sm font-black text-slate-900 mb-2">Vertaalrichting</label>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setRichting('nl-en')}
                            className={`flex-1 py-3 text-sm font-black border-2 border-black transition-all ${
                                richting === 'nl-en'
                                    ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white hover:bg-slate-50'
                            }`}
                        >
                            🇳🇱 Nederlands → 🇬🇧 Engels
                        </button>
                        <button
                            type="button"
                            onClick={() => setRichting('en-nl')}
                            className={`flex-1 py-3 text-sm font-black border-2 border-black transition-all ${
                                richting === 'en-nl'
                                    ? 'bg-[#4ECDC4] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white hover:bg-slate-50'
                            }`}
                        >
                            🇬🇧 Engels → 🇳🇱 Nederlands
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-black text-slate-900 mb-1">
                        Functietitel <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        value={titel}
                        onChange={e => setTitel(e.target.value)}
                        placeholder={richting === 'nl-en' ? 'bijv. Verpleegkundige, Accountmanager' : 'bijv. Software Engineer, Project Manager'}
                        required
                        className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-400 p-3 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !titel.trim()}
                    className="w-full bg-[#4ECDC4] text-slate-900 font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Vertalen…' : 'Vertaal functietitel →'}
                </button>
            </form>

            {result && (
                <div className="space-y-4 border-t-2 border-black pt-6">
                    {/* Main translation */}
                    <div className="bg-[#4ECDC4]/10 border-2 border-[#4ECDC4] p-5">
                        <p className="text-xs font-black text-slate-500 mb-1">BESTE VERTALING</p>
                        <div className="flex items-center justify-between gap-4">
                            <p className="text-2xl font-black text-slate-900">{result.vertaling}</p>
                            <button
                                onClick={() => copy(result.vertaling)}
                                className="text-xs font-bold text-teal-600 hover:text-teal-800 underline flex-shrink-0"
                            >
                                {copied ? 'Gekopieerd!' : 'Kopieer'}
                            </button>
                        </div>
                    </div>

                    {/* Alternatives */}
                    <div className="bg-white border-2 border-black p-4">
                        <p className="text-xs font-black text-slate-500 mb-2">ALTERNATIEVEN</p>
                        <div className="flex flex-wrap gap-2">
                            {result.alternatieven.map((alt, i) => (
                                <button
                                    key={i}
                                    onClick={() => copy(alt)}
                                    title="Klik om te kopiëren"
                                    className="text-sm font-bold bg-slate-100 border-2 border-black px-3 py-1.5 hover:bg-[#4ECDC4]/20 transition-colors"
                                >
                                    {alt}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-slate-400 mt-2">Klik om te kopiëren</p>
                    </div>

                    {/* Uitleg */}
                    <div className="bg-slate-50 border-2 border-slate-300 p-4">
                        <p className="text-xs font-black text-slate-500 mb-1">CONTEXT & NUANCE</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{result.uitleg}</p>
                    </div>

                    {/* LinkedIn tip */}
                    <div className="bg-blue-50 border-2 border-blue-300 p-4">
                        <p className="text-xs font-black text-blue-600 mb-1">💼 LINKEDIN TIP</p>
                        <p className="text-sm text-blue-700">{result.linkedinTip}</p>
                    </div>

                    <button
                        onClick={() => { setResult(null); setTitel(''); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuwe vertaling →
                    </button>
                </div>
            )}
        </div>
    );
}
