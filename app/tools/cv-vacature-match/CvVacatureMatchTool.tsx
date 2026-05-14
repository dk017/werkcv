'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';

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

const ALLOWED_FILE_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export default function CvVacatureMatchTool() {
    const [cvInputMode, setCvInputMode] = useState<'upload' | 'text'>('upload');
    const [cvFile, setCvFile] = useState<File | null>(null);
    const [cvText, setCvText] = useState('');
    const [vacatureText, setVacatureText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [result, setResult] = useState<MatchResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleCvFile(file: File) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            setError('Upload een PDF of Word document.');
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            setError('Bestand is te groot. Maximale grootte is 10MB.');
            return;
        }

        setError(null);
        setCvFile(file);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        try {
            let res: Response;

            if (cvInputMode === 'upload') {
                if (!cvFile) {
                    throw new Error('Upload eerst je CV als PDF of Word-bestand.');
                }

                const formData = new FormData();
                formData.append('cvFile', cvFile);
                formData.append('vacatureText', vacatureText);

                res = await fetch('/api/tools/cv-vacature-match', {
                    method: 'POST',
                    body: formData,
                });
            } else {
                res = await fetch('/api/tools/cv-vacature-match', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cvText, vacatureText }),
                });
            }

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
    const hasValidCvInput = cvInputMode === 'upload' ? Boolean(cvFile) : cvText.length >= 50;

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-2">
                            Jouw CV <span className="text-red-500">*</span>
                        </label>
                        <div className="flex border-2 border-black overflow-hidden mb-3">
                            <button
                                type="button"
                                onClick={() => { setCvInputMode('upload'); setError(null); }}
                                className={`flex-1 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
                                    cvInputMode === 'upload' ? 'bg-black text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                Upload CV
                            </button>
                            <button
                                type="button"
                                onClick={() => { setCvInputMode('text'); setError(null); }}
                                className={`flex-1 py-2 text-xs font-black uppercase tracking-wide transition-colors ${
                                    cvInputMode === 'text' ? 'bg-black text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                Plak tekst
                            </button>
                        </div>

                        {cvInputMode === 'upload' ? (
                            <div
                                onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                                onDragLeave={() => setIsDragging(false)}
                                onDrop={e => {
                                    e.preventDefault();
                                    setIsDragging(false);
                                    const file = e.dataTransfer.files?.[0];
                                    if (file) handleCvFile(file);
                                }}
                                onClick={() => fileInputRef.current?.click()}
                                className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
                                    isDragging
                                        ? 'border-teal-500 bg-teal-50'
                                        : cvFile
                                        ? 'border-emerald-500 bg-emerald-50'
                                        : 'border-black bg-slate-50 hover:bg-slate-100'
                                }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={e => {
                                        const file = e.target.files?.[0];
                                        if (file) handleCvFile(file);
                                    }}
                                />
                                {cvFile ? (
                                    <>
                                        <div className="text-2xl mb-2">📄</div>
                                        <p className="text-sm font-black text-emerald-800">{cvFile.name}</p>
                                        <p className="text-xs text-emerald-700 mt-1">
                                            {(cvFile.size / 1024).toFixed(0)} KB • klik om te vervangen
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-3xl mb-2">☁</div>
                                        <p className="text-sm font-black text-slate-900">Sleep je CV hier of klik om te uploaden</p>
                                        <p className="text-xs text-slate-500 mt-1">PDF of Word • max 10MB</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <textarea
                                    value={cvText}
                                    onChange={e => setCvText(e.target.value)}
                                    placeholder="Plak hier de tekst van je CV…"
                                    rows={12}
                                    required={cvInputMode === 'text'}
                                    minLength={50}
                                    className="w-full border-2 border-black p-3 text-sm font-mono resize-y focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                                />
                                <p className="text-xs text-slate-400 mt-1">{cvText.length} tekens</p>
                            </>
                        )}
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
                    disabled={loading || !hasValidCvInput || vacatureText.length < 50}
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
                        <p className="mt-3 text-xs text-slate-600">
                            Eenmalig <Link href="/prijzen" className="font-black underline decoration-2 underline-offset-2 text-slate-900">€4,99 bij download</Link>, geen abonnement.
                        </p>
                    </div>

                    <button
                        onClick={() => { setResult(null); setCvText(''); setCvFile(null); setVacatureText(''); setError(null); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuwe analyse →
                    </button>
                </div>
            )}
        </div>
    );
}
