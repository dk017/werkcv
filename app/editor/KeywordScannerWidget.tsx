"use client";
import { useState, useRef } from "react";
import { cvKeywordEvidence } from "@/lib/cv-keyword-evidence";
import { CVData } from "@/lib/cv";
import { UiLanguage } from "@/lib/ui-language";

interface KeywordResult {
    keyword: string;
    found: boolean;
}

interface KeywordScannerWidgetProps {
    cvId: string;
    data: CVData;
    jobDescription: string;
    onJobDescriptionChange: (value: string) => void;
    uiLanguage?: UiLanguage;
    readOnly?: boolean;
}

export default function KeywordScannerWidget({
    cvId,
    data,
    jobDescription,
    onJobDescriptionChange,
    uiLanguage = "nl",
    readOnly = false,
}: KeywordScannerWidgetProps) {
    const isEnglish = uiLanguage === "en";
    const [expanded, setExpanded] = useState(false);
    const [results, setResults] = useState<KeywordResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const currentContext = JSON.stringify([data, jobDescription]);
    const latestContext = useRef(currentContext);
    latestContext.current = currentContext;
    const [resultContext, setResultContext] = useState("");

    const validResults = resultContext === currentContext ? results : null;
    const checked = validResults?.map(r => ({ ...r, evidence: cvKeywordEvidence(data, r.keyword) })) ?? [];
    const missing = checked.filter(r => !r.evidence.length);
    const found = checked.filter(r => r.evidence.length);

    async function handleScan() {
        if (!jobDescription.trim() || jobDescription.trim().length < 20) {
            setError(isEnglish ? 'Paste the full vacancy text (at least 20 characters).' : 'Plak de volledige vacaturetekst (minimaal 20 tekens).');
            return;
        }
        setError('');
        setIsLoading(true);
        setResults(null);

        try {
            const res = await fetch('/api/keyword-scan', {
                method: 'POST',
                signal: AbortSignal.timeout(30000),
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jobDescription, cvId, requestId: crypto.randomUUID() }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                setError(body.code === "AUTH_REQUIRED" ? (isEnglish ? "Sign in again to use the scanner. Your CV is unchanged." : "Meld je opnieuw aan om de scanner te gebruiken. Je cv is niet gewijzigd.") : body.code === "AI_DAILY_LIMIT" ? (isEnglish ? "Your daily AI limit is reached. Editing and downloads remain available." : "Je dagelijkse AI-limiet is bereikt. Bewerken en downloaden blijft mogelijk.") : (isEnglish ? 'Analysis unavailable. Please try again later.' : 'Analyse niet beschikbaar. Probeer het later opnieuw.'));
                return;
            }

            const json = await res.json();
            if (latestContext.current !== currentContext) return;
            const keywords = Array.isArray(json.keywords) ? json.keywords.filter((r: unknown): r is KeywordResult => Boolean(r && typeof r === "object" && "keyword" in r && typeof r.keyword === "string" && r.keyword.length <= 120)).slice(0, 40) : [];
            setResults(keywords);
            setResultContext(currentContext);
        } catch {
            setError(isEnglish ? 'Connection error. Check your internet and try again.' : 'Verbindingsfout. Controleer je internet en probeer opnieuw.');
        } finally {
            setIsLoading(false);
        }
    }

    async function handleCopyMissing() {
        if (missing.length === 0) return;
        const text = missing.map(r => r.keyword).join(', ');
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    function handleReset() {
        setResults(null);
        if (!readOnly) onJobDescriptionChange('');
        setError('');
    }

    const missingScore = validResults?.length
        ? Math.round((found.length / validResults.length) * 100)
        : null;

    return (
        <section className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <button
                type="button"
                onClick={() => setExpanded(v => !v)}
                className="w-full flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors text-left"
            >
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4ECDC4]/15 flex items-center justify-center">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{isEnglish ? "Job Scanner" : "Vacature Scanner"}</span>
                        <span className="text-[10px] font-bold bg-[#4ECDC4]/20 text-teal-700 px-1.5 py-0.5 rounded-full">{isEnglish ? "NEW" : "NIEUW"}</span>
                    </div>
                    {validResults ? (
                        <p className="text-sm font-semibold text-slate-800">
                            {validResults.length === 0 ? (isEnglish ? "No literal terms extracted." : "Geen letterlijke termen gevonden.") : missing.length === 0
                                ? (isEnglish ? "Extracted terms found in the text." : 'Gevonden termen staan in de tekst.')
                                : <><span className="text-red-600">{isEnglish ? `${missing.length} terms not mentioned literally` : `${missing.length} termen niet letterlijk genoemd`}</span> · {isEnglish ? `${found.length} found` : `${found.length} gevonden`}</>
                            }
                        </p>
                    ) : (
                        <p className="text-sm text-slate-500">{isEnglish ? "Paste a vacancy and see which keywords are missing." : "Plak een vacature en zie welke keywords ontbreken"}</p>
                    )}
                </div>

                {/* Match % badge when results available */}
                {missingScore !== null && (
                    <span className={`flex-shrink-0 text-sm font-black px-2 py-1 rounded-lg ${
                        missingScore >= 80 ? 'bg-emerald-100 text-emerald-700'
                        : missingScore >= 50 ? 'bg-amber-100 text-amber-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                        {found.length}/{validResults?.length}
                    </span>
                )}

                <svg
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Body */}
            {expanded && (
                <div className="border-t border-slate-100 px-5 py-4 space-y-4">

                    {/* Input area — hide once results are shown */}
                    {!validResults && (
                        <>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wide text-slate-500 mb-1.5">
                                    {isEnglish ? "Job description" : "Vacaturetekst"}
                                </label>
                                <textarea
                                    readOnly={readOnly}
                                    maxLength={8000}
                                    value={jobDescription}
                                    onChange={e => { onJobDescriptionChange(e.target.value); setError(''); }}
                                    placeholder={isEnglish ? "Paste the full job description here..." : "Plak hier de volledige vacaturetekst..."}
                                    rows={6}
                                    className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 resize-none font-medium"
                                />
                                {error && (
                                    <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleScan}
                                disabled={isLoading || jobDescription.trim().length < 20}
                                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#4ECDC4] hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 text-sm font-bold rounded-lg transition-colors"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        {isEnglish ? "Analyzing..." : "Analyseren..."}
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                        {isEnglish ? "Analyze job description" : "Analyseer vacature"}
                                    </>
                                )}
                            </button>
                        </>
                    )}

                    {/* Results */}
                    {validResults && (
                        <div className="space-y-4">

                            {/* Missing keywords */}
                            {missing.length > 0 && (
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[11px] font-bold uppercase tracking-wide text-red-600">
                                            {isEnglish ? `Not mentioned literally (${missing.length})` : `Niet letterlijk genoemd (${missing.length})`}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={handleCopyMissing}
                                            className="text-[11px] font-bold text-teal-600 hover:text-teal-800 transition-colors"
                                        >
                                            {copied ? (isEnglish ? "Copied." : '✓ Gekopieerd!') : (isEnglish ? "Copy all" : 'Kopieer alles')}
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {missing.map(r => (
                                            <span
                                                key={r.keyword}
                                                className="inline-flex max-w-full break-all items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200"
                                            >
                                                {r.keyword}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-slate-500 mt-2 leading-snug">
                                        {isEnglish ? (
                                            <>
                                                Do you have relevant experience? Describe a real example in the appropriate CV section first. Not mentioned does not mean you lack the skill. Never add a qualification just because the vacancy asks for it.
                                            </>
                                        ) : (
                                            <>
                                                Heb je relevante ervaring? Beschrijf eerst een echt voorbeeld in het juiste cv-onderdeel. Niet genoemd betekent niet dat je de vaardigheid mist. Voeg nooit een kwalificatie toe alleen omdat de vacature erom vraagt.
                                            </>
                                        )}
                                    </p>
                                </div>
                            )}

                            {/* Found keywords */}
                            {found.length > 0 && (
                                <div>
                                    <span className="text-[11px] font-bold uppercase tracking-wide text-emerald-600 block mb-2">
                                        {isEnglish ? `Found in your CV (${found.length})` : `✅ Aanwezig in je CV (${found.length})`}
                                    </span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {found.map(r => (
                                            <span
                                                key={r.keyword}
                                                className="inline-flex max-w-full break-all items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200"
                                            >
                                                {r.keyword}
                                            </span>
                                        ))}
                                    </div>
                                    {found.map(r => <details key={r.keyword} className="mt-2 rounded-lg border p-2 text-sm"><summary className="cursor-pointer font-medium">{r.keyword} — {isEnglish ? "View literal CV text" : "Bekijk letterlijke cv-tekst"}</summary>{r.evidence.map((source, index) => <blockquote key={index} className="mt-2 break-words border-l-2 pl-3"><p>{source.text}</p><footer className="text-xs text-slate-500">{source.section}</footer></blockquote>)}</details>)}
                                </div>
                            )}

                            {/* All found */}
                            {missing.length === 0 && found.length > 0 && (
                                <p className="text-sm font-semibold text-emerald-700 text-center py-2">
                                        {isEnglish ? "The extracted terms occur in your CV. This does not assess suitability or proficiency." : "De gevonden termen komen voor in je cv. Dit beoordeelt niet je geschiktheid of vaardigheidsniveau."}
                                </p>
                            )}

                            {/* Reset */}
                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                {readOnly ? (isEnglish ? "Try analysis again" : "Analyse opnieuw proberen") : (isEnglish ? "Analyze another vacancy" : "Nieuwe vacature analyseren")}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
