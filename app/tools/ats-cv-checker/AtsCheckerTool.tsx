"use client";
import { useState, useRef } from "react";

interface AtsCheck {
    id: string;
    categorie: string;
    label: string;
    passed: boolean;
    tip: string | null;
    punten: number;
}

interface AtsResult {
    score: number;
    label: string;
    labelKleur: 'rood' | 'oranje' | 'geel' | 'groen';
    samenvatting: string;
    checks: AtsCheck[];
}

const RADIUS = 40;
const CIRC = 2 * Math.PI * RADIUS;

const kleurMap = {
    rood:   { ring: '#ef4444', bg: 'bg-red-50',     border: 'border-red-300',   text: 'text-red-700' },
    oranje: { ring: '#f97316', bg: 'bg-orange-50',  border: 'border-orange-300',text: 'text-orange-700' },
    geel:   { ring: '#eab308', bg: 'bg-amber-50',   border: 'border-amber-300', text: 'text-amber-800' },
    groen:  { ring: '#22c55e', bg: 'bg-emerald-50', border: 'border-emerald-300',text: 'text-emerald-700' },
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

function groupByCategory(checks: AtsCheck[]) {
    const map: Record<string, AtsCheck[]> = {};
    for (const check of checks) {
        if (!map[check.categorie]) map[check.categorie] = [];
        map[check.categorie].push(check);
    }
    return map;
}

export default function AtsCheckerTool() {
    const [mode, setMode] = useState<'upload' | 'tekst'>('upload');
    const [file, setFile] = useState<File | null>(null);
    const [cvText, setCvText] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState<AtsResult | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    async function handleAnalyze() {
        setError('');
        setIsLoading(true);
        setResult(null);

        try {
            let res: Response;

            if (mode === 'upload') {
                if (!file) { setError('Upload eerst een PDF of Word-bestand.'); setIsLoading(false); return; }
                const formData = new FormData();
                formData.append('file', file);
                res = await fetch('/api/tools/ats-checker', { method: 'POST', body: formData });
            } else {
                if (cvText.trim().length < 50) { setError('Plak minimaal 50 tekens van je CV-tekst.'); setIsLoading(false); return; }
                res = await fetch('/api/tools/ats-checker', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cvText }),
                });
            }

            const json = await res.json();
            if (!res.ok) { setError(json.error ?? 'Analyse mislukt.'); return; }
            setResult(json as AtsResult);
        } catch {
            setError('Verbindingsfout. Probeer het opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    function handleDrop(e: React.DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) setFile(dropped);
    }

    const dashOffset = result ? CIRC * (1 - result.score / 100) : CIRC;
    const ringColor = result ? kleurMap[result.labelKleur].ring : '#e2e8f0';
    const categories = result ? groupByCategory(result.checks) : {};
    const passedCount = result?.checks.filter(c => c.passed).length ?? 0;
    const totalCount = result?.checks.length ?? 0;

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-5">
                    {/* Mode tabs */}
                    <div className="flex border-2 border-slate-200 rounded-lg overflow-hidden">
                        <button
                            type="button"
                            onClick={() => setMode('upload')}
                            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wide transition-colors ${
                                mode === 'upload' ? 'bg-black text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            PDF / Word uploaden
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('tekst')}
                            className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wide transition-colors ${
                                mode === 'tekst' ? 'bg-black text-white' : 'bg-white text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            Tekst plakken
                        </button>
                    </div>

                    {mode === 'upload' ? (
                        <div
                            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                                isDragging
                                    ? 'border-teal-400 bg-teal-50'
                                    : file
                                    ? 'border-emerald-400 bg-emerald-50'
                                    : 'border-slate-300 hover:border-teal-300 hover:bg-slate-50'
                            }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                onChange={e => { const f = e.target.files?.[0]; if (f) setFile(f); }}
                            />
                            {file ? (
                                <>
                                    <div className="text-2xl mb-2">📄</div>
                                    <p className="font-black text-emerald-700 text-sm">{file.name}</p>
                                    <p className="text-xs text-emerald-600 mt-1">{(file.size / 1024).toFixed(0)} KB — klik om te wijzigen</p>
                                </>
                            ) : (
                                <>
                                    <div className="text-3xl mb-3">☁</div>
                                    <p className="font-black text-slate-700 text-sm mb-1">Sleep je CV hier naartoe</p>
                                    <p className="text-xs text-slate-400">of klik om te uploaden — PDF of Word, max 5 MB</p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Plak je CV-tekst
                            </label>
                            <textarea
                                value={cvText}
                                onChange={e => { setCvText(e.target.value); setError(''); }}
                                placeholder="Kopieer de volledige tekst van je CV en plak die hier..."
                                rows={10}
                                className={`${inputClass} resize-none`}
                            />
                            <p className="text-xs text-slate-400 mt-1">{cvText.length} tekens — minimaal 50 nodig</p>
                        </div>
                    )}

                    {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                    <button
                        onClick={handleAnalyze}
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
                                CV analyseren...
                            </>
                        ) : (
                            'Analyseer mijn CV'
                        )}
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Score header */}
                    <div className="flex items-center gap-6">
                        {/* Score ring */}
                        <div className="relative flex-shrink-0 w-24 h-24">
                            <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
                                <circle cx="48" cy="48" r={RADIUS} fill="none" stroke="#e2e8f0" strokeWidth="8" />
                                <circle
                                    cx="48" cy="48" r={RADIUS}
                                    fill="none"
                                    stroke={ringColor}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={CIRC}
                                    strokeDashoffset={dashOffset}
                                    style={{ transition: 'stroke-dashoffset 0.8s ease, stroke 0.4s ease' }}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-slate-800">{result.score}</span>
                                <span className="text-[10px] font-bold text-slate-400 -mt-0.5">/ 100</span>
                            </div>
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-lg font-black ${kleurMap[result.labelKleur].text}`}>{result.label}</span>
                                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${kleurMap[result.labelKleur].bg} ${kleurMap[result.labelKleur].border} ${kleurMap[result.labelKleur].text}`}>
                                    {passedCount}/{totalCount} checks
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{result.samenvatting}</p>
                        </div>
                    </div>

                    {/* Checks by category */}
                    {Object.entries(categories).map(([cat, checks]) => (
                        <div key={cat}>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-black uppercase tracking-wide text-slate-500">{cat}</span>
                                <span className="text-[10px] font-bold text-slate-400">
                                    {checks.filter(c => c.passed).length}/{checks.length}
                                </span>
                            </div>
                            <div className="space-y-1.5">
                                {/* Failed first */}
                                {checks.filter(c => !c.passed).map(check => (
                                    <div key={check.id} className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
                                        <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-red-100 border border-red-300 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-semibold text-slate-800 leading-snug">{check.label}</p>
                                            {check.tip && <p className="text-[11px] text-red-700 mt-0.5 leading-snug">{check.tip}</p>}
                                        </div>
                                        <span className="flex-shrink-0 text-[10px] font-bold text-slate-400 mt-0.5">+{check.punten}</span>
                                    </div>
                                ))}
                                {/* Passed */}
                                {checks.filter(c => c.passed).map(check => (
                                    <div key={check.id} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-lg px-3 py-2">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <p className="text-xs text-slate-400 line-through leading-snug">{check.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {result.score === 100 && (
                        <p className="text-sm font-bold text-emerald-700 text-center py-2 bg-emerald-50 rounded-xl border border-emerald-200">
                            🎉 Perfect score! Je CV is volledig ATS-geoptimaliseerd.
                        </p>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                            href="/templates"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Maak ATS-vriendelijk CV →
                        </a>
                        <button
                            onClick={() => { setResult(null); setFile(null); setCvText(''); setError(''); }}
                            className="flex-1 py-3 px-4 text-sm font-bold text-slate-600 border-2 border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Ander CV analyseren
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
