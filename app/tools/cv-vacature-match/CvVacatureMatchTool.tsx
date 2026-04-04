'use client';

import Link from 'next/link';
import { useState } from 'react';

interface MatchResult {
    matchScore: number;
    label: string;
    labelKleur: 'rood' | 'oranje' | 'geel' | 'groen';
    samenvatting: string;
    sterkePunten: string[];
    ontbrekendeKeywords: string[];
    verbeterpunten: string[];
    aanbeveling: string;
}

const kleurMap = {
    rood: { ring: 'stroke-red-500', text: 'text-red-600', bg: 'bg-red-50 border-red-300' },
    oranje: { ring: 'stroke-orange-500', text: 'text-orange-600', bg: 'bg-orange-50 border-orange-300' },
    geel: { ring: 'stroke-yellow-500', text: 'text-yellow-700', bg: 'bg-yellow-50 border-yellow-300' },
    groen: { ring: 'stroke-teal-500', text: 'text-teal-600', bg: 'bg-teal-50 border-teal-300' },
};

export default function CvVacatureMatchTool() {
    const [cvText, setCvText] = useState('');
    const [vacatureText, setVacatureText] = useState('');
    const [result, setResult] = useState<MatchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        try {
            const res = await fetch('/api/tools/cv-vacature-match', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cvText, vacatureText }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Analyse mislukt.');
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er ging iets mis.');
        } finally {
            setLoading(false);
        }
    }

    const kleur = result ? kleurMap[result.labelKleur] : null;
    const circumference = 2 * Math.PI * 36;

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Jouw CV tekst <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={cvText}
                            onChange={e => setCvText(e.target.value)}
                            placeholder="Plak hier de tekst van je CV…"
                            rows={12}
                            required
                            minLength={50}
                            className="w-full border-2 border-black p-3 text-sm font-mono resize-y focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                        <p className="text-xs text-slate-400 mt-1">{cvText.length} tekens</p>
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Vacaturetekst <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={vacatureText}
                            onChange={e => setVacatureText(e.target.value)}
                            placeholder="Plak hier de vacaturetekst…"
                            rows={12}
                            required
                            minLength={50}
                            className="w-full border-2 border-black p-3 text-sm font-mono resize-y focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                        <p className="text-xs text-slate-400 mt-1">{vacatureText.length} tekens</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-400 p-3 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || cvText.length < 50 || vacatureText.length < 50}
                    className="w-full bg-[#4ECDC4] text-slate-900 font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Analyseren…' : 'Analyseer match →'}
                </button>
            </form>

            {result && kleur && (
                <div className="space-y-4 border-t-2 border-black pt-6">
                    {/* Score ring */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative w-28 h-28 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="7" />
                                <circle
                                    cx="40" cy="40" r="36" fill="none"
                                    className={kleur.ring}
                                    strokeWidth="7"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - result.matchScore / 100)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-slate-900">{result.matchScore}%</span>
                            </div>
                        </div>
                        <div>
                            <div className={`inline-block text-sm font-black px-3 py-1 border-2 border-black mb-2 ${kleur.bg} ${kleur.text}`}>
                                {result.label}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{result.samenvatting}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Sterke punten */}
                        <div className="bg-teal-50 border-2 border-teal-300 p-4">
                            <h3 className="font-black text-teal-800 text-sm mb-3">✓ Sterke matches</h3>
                            <ul className="space-y-1">
                                {result.sterkePunten.map((punt, i) => (
                                    <li key={i} className="text-sm text-teal-700 flex gap-2">
                                        <span className="flex-shrink-0">→</span>{punt}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Ontbrekende keywords */}
                        <div className="bg-red-50 border-2 border-red-300 p-4">
                            <h3 className="font-black text-red-800 text-sm mb-3">✗ Ontbrekende keywords</h3>
                            <div className="flex flex-wrap gap-1.5">
                                {result.ontbrekendeKeywords.map((kw, i) => (
                                    <span key={i} className="text-xs font-bold bg-white border-2 border-red-300 text-red-700 px-2 py-0.5">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Verbeterpunten */}
                    <div className="bg-orange-50 border-2 border-orange-300 p-4">
                        <h3 className="font-black text-orange-800 text-sm mb-3">Zo verbeter je de match</h3>
                        <ul className="space-y-1.5">
                            {result.verbeterpunten.map((tip, i) => (
                                <li key={i} className="text-sm text-orange-700 flex gap-2">
                                    <span className="font-black flex-shrink-0">{i + 1}.</span>{tip}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Aanbeveling */}
                    <div className="bg-slate-50 border-2 border-slate-300 p-4">
                        <h3 className="font-black text-slate-800 text-sm mb-1">Aanbeveling</h3>
                        <p className="text-sm text-slate-600">{result.aanbeveling}</p>
                    </div>

                    <div className="bg-[#FFF7D6] border-2 border-black p-4 sm:p-5">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-600 mb-2">
                            Volgende stap
                        </p>
                        <h3 className="text-lg font-black text-slate-900 mb-2">
                            Verwerk deze keywords direct in je CV
                        </h3>
                        <p className="text-sm text-slate-700 leading-relaxed mb-4">
                            Open de editor om ontbrekende termen, sterkere bullets en een duidelijkere profieltekst meteen in je CV te zetten.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/editor"
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            >
                                Verbeter mijn CV in de editor →
                            </Link>
                            <Link
                                href="/templates"
                                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-50 transition-colors"
                            >
                                Bekijk ATS-vriendelijke templates
                            </Link>
                        </div>
                    </div>

                    <button
                        onClick={() => { setResult(null); setCvText(''); setVacatureText(''); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuwe analyse →
                    </button>
                </div>
            )}
        </div>
    );
}
