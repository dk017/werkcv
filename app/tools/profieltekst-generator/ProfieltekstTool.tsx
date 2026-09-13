"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfieltekstTool() {
    const router = useRouter();
    const [huidigeFunctie, setHuidigeFunctie] = useState('');
    const [doelrol, setDoelrol] = useState('');
    const [competenties, setCompetenties] = useState('');
    const [ervaringJaren, setErvaringJaren] = useState('');
    const [toon, setToon] = useState<'professioneel' | 'enthousiast' | 'beknopt'>('professioneel');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);
    const [handoffBusy, setHandoffBusy] = useState(false);

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
    async function addToCv() {
        setHandoffBusy(true); setError('');
        try {
            const response = await fetch('/api/tools/cv-handoff', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ kind: 'profile', locale: 'nl', payload: { text: result } }) });
            const body = await response.json(); if (!response.ok || !body.token) throw new Error();
            router.replace(`/cv-handoff#token=${encodeURIComponent(body.token)}`);
        } catch { setError('De tekst kon niet veilig worden overgezet. Kopieer hem of probeer opnieuw.'); setHandoffBusy(false); }
    }

    const inputClass = "mt-2 w-full rounded-xl border border-[var(--wk-line)] bg-white px-4 py-3 text-[var(--wk-ink)] placeholder:text-[var(--wk-ink-muted)] outline-none focus:border-[var(--wk-accent)] focus:ring-2 focus:ring-[var(--wk-accent-soft)]";

    return (
        <div className="wk-card p-5 sm:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[var(--wk-ink)]">
                                Huidige / laatste functie <span className="text-red-600">*</span>
                            </label>
                            <input
                                value={huidigeFunctie}
                                onChange={e => setHuidigeFunctie(e.target.value)}
                                placeholder="bijv. Marketing Manager"
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[var(--wk-ink)]">
                                Doelrol (functie waarop je solliciteert) <span className="text-red-600">*</span>
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
                        <label className="block text-sm font-semibold text-[var(--wk-ink)]">
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
                            <label className="block text-sm font-semibold text-[var(--wk-ink)]">
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
                            <label className="block text-sm font-semibold text-[var(--wk-ink)]">
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

                    <button type="button" onClick={() => void handleGenerate()} disabled={isLoading} className="wk-button wk-button-primary w-full justify-center disabled:opacity-50">
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
                    <div className="flex items-center justify-between gap-3">
                        <span className="wk-eyebrow">Jouw profieltekst</span>
                        <span className="rounded-full bg-[var(--wk-success-soft)] px-3 py-1 text-xs font-semibold text-[var(--wk-success)]">✓ Gegenereerd</span>
                    </div>

                    <div className="rounded-xl border border-[var(--wk-line)] bg-[var(--wk-surface-subtle)] p-4">
                        <p className="break-words leading-7 text-[var(--wk-ink)]">{result}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <button type="button" onClick={() => void addToCv()} disabled={handoffBusy} className="wk-button wk-button-primary flex-1 justify-center disabled:opacity-50">{handoffBusy ? 'Voorbereiden…' : 'Voeg veilig toe aan mijn CV'}</button>
                        <button
                            onClick={() => void handleCopy()}
                            className="wk-button wk-button-secondary flex-1 justify-center"
                        >
                            {copied ? '✓ Gekopieerd!' : 'Kopieer tekst'}
                        </button>
                    </div>

                    <div className="rounded-xl border border-[var(--wk-line)] bg-[var(--wk-highlight-soft)] p-4 sm:p-5">
                        <p className="wk-eyebrow">
                            Volgende stap
                        </p>
                        <h3 className="mt-3 text-lg font-semibold text-[var(--wk-ink)]">
                            Zet deze profieltekst direct in je CV
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-[var(--wk-ink-muted)]">
                            Open de editor om je profieltekst meteen bovenaan je CV te zetten, of kies eerst een template waarin je hem strak kunt plaatsen.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button type="button" onClick={() => void addToCv()} disabled={handoffBusy} className="wk-button wk-button-primary flex-1 justify-center disabled:opacity-50">
                                Voeg toe aan mijn CV →
                            </button>
                            <a
                                href="/templates"
                                className="wk-button wk-button-secondary flex-1 justify-center"
                            >
                                Bekijk templates
                            </a>
                        </div>
                    </div>

                    <button
                        onClick={() => { setResult(''); setError(''); }}
                        className="w-full rounded-xl border border-[var(--wk-line)] py-2 text-sm font-semibold text-[var(--wk-ink-muted)] hover:bg-[var(--wk-surface-subtle)]"
                    >
                        Opnieuw genereren
                    </button>
                </div>
            )}
        </div>
    );
}
