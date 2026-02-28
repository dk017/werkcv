'use client';

import { useState } from 'react';

interface OnderhandelingResult {
    strategie: string;
    openingszin: string;
    argumenten: string[];
    emailScript: string;
    tegenargumenten: { bezwaar: string; reactie: string }[];
    doTips: string[];
    dontTips: string[];
}

export default function SalarisOnderhandelingTool() {
    const [form, setForm] = useState({
        huidigeRol: '',
        sector: '',
        ervaringJaren: '',
        huidigSalaris: '',
        gewenstSalaris: '',
        sterktepunten: '',
    });
    const [result, setResult] = useState<OnderhandelingResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copiedEmail, setCopiedEmail] = useState(false);

    function set(field: string, value: string) {
        setForm(f => ({ ...f, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        try {
            const res = await fetch('/api/tools/salaris-onderhandeling', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Genereren mislukt.');
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Er ging iets mis.');
        } finally {
            setLoading(false);
        }
    }

    async function copyEmail() {
        if (!result) return;
        await navigator.clipboard.writeText(result.emailScript);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    }

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Functietitel <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.huidigeRol}
                            onChange={e => set('huidigeRol', e.target.value)}
                            placeholder="bijv. Senior Developer"
                            required
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Sector</label>
                        <input
                            type="text"
                            value={form.sector}
                            onChange={e => set('sector', e.target.value)}
                            placeholder="bijv. IT, Zorg, Finance"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Jaren ervaring</label>
                        <input
                            type="text"
                            value={form.ervaringJaren}
                            onChange={e => set('ervaringJaren', e.target.value)}
                            placeholder="bijv. 5 jaar"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Huidig salaris (optioneel)</label>
                        <input
                            type="text"
                            value={form.huidigSalaris}
                            onChange={e => set('huidigSalaris', e.target.value)}
                            placeholder="bijv. €4.500 p/m"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Gewenst salaris <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.gewenstSalaris}
                            onChange={e => set('gewenstSalaris', e.target.value)}
                            placeholder="bijv. €5.500 p/m of 10% verhoging"
                            required
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Jouw sterktepunten / argumenten <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={form.sterktepunten}
                            onChange={e => set('sterktepunten', e.target.value)}
                            placeholder="bijv. Heb afgelopen jaar project X opgeleverd, ben verantwoordelijk geworden voor team Y, marktconforme stijging…"
                            rows={4}
                            required
                            className="w-full border-2 border-black p-3 text-sm resize-none focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-400 p-3 text-sm font-bold text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !form.huidigeRol || !form.gewenstSalaris || !form.sterktepunten}
                    className="w-full bg-[#4ECDC4] text-slate-900 font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Script genereren…' : 'Genereer onderhandelingsscript →'}
                </button>
            </form>

            {result && (
                <div className="space-y-4 border-t-2 border-black pt-6">
                    {/* Strategie */}
                    <div className="bg-teal-50 border-2 border-teal-300 p-4">
                        <h3 className="font-black text-teal-800 text-sm mb-2">Jouw strategie</h3>
                        <p className="text-sm text-teal-700 leading-relaxed">{result.strategie}</p>
                    </div>

                    {/* Openingszin */}
                    <div className="bg-slate-50 border-2 border-slate-300 p-4">
                        <h3 className="font-black text-slate-800 text-sm mb-2">Ideale openingszin</h3>
                        <p className="text-sm italic text-slate-600 leading-relaxed">&ldquo;{result.openingszin}&rdquo;</p>
                    </div>

                    {/* Argumenten */}
                    <div className="bg-white border-2 border-black p-4">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Jouw sterke argumenten</h3>
                        <ul className="space-y-1.5">
                            {result.argumenten.map((arg, i) => (
                                <li key={i} className="text-sm text-slate-700 flex gap-2">
                                    <span className="font-black text-teal-600 flex-shrink-0">→</span>{arg}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Email script */}
                    <div className="bg-white border-2 border-black p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-black text-slate-900 text-sm">E-mailscript</h3>
                            <button
                                onClick={copyEmail}
                                className="text-xs font-bold text-teal-600 hover:text-teal-800 underline"
                            >
                                {copiedEmail ? 'Gekopieerd!' : 'Kopieer e-mail'}
                            </button>
                        </div>
                        <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed bg-slate-50 p-3 border border-slate-200">
                            {result.emailScript}
                        </pre>
                    </div>

                    {/* Tegenargumenten */}
                    <div className="bg-orange-50 border-2 border-orange-300 p-4">
                        <h3 className="font-black text-orange-800 text-sm mb-3">Bezwaren & reacties</h3>
                        <div className="space-y-3">
                            {result.tegenargumenten.map((t, i) => (
                                <div key={i} className="text-sm">
                                    <p className="font-bold text-orange-800">❝ {t.bezwaar}</p>
                                    <p className="text-orange-700 mt-0.5 pl-4">→ {t.reactie}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Do / Don't */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-teal-50 border-2 border-teal-300 p-4">
                            <h3 className="font-black text-teal-800 text-sm mb-2">✓ Wel doen</h3>
                            <ul className="space-y-1">
                                {result.doTips.map((tip, i) => (
                                    <li key={i} className="text-sm text-teal-700 flex gap-2">
                                        <span className="flex-shrink-0">•</span>{tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-red-50 border-2 border-red-300 p-4">
                            <h3 className="font-black text-red-800 text-sm mb-2">✗ Niet doen</h3>
                            <ul className="space-y-1">
                                {result.dontTips.map((tip, i) => (
                                    <li key={i} className="text-sm text-red-700 flex gap-2">
                                        <span className="flex-shrink-0">•</span>{tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={() => { setResult(null); setForm({ huidigeRol: '', sector: '', ervaringJaren: '', huidigSalaris: '', gewenstSalaris: '', sterktepunten: '' }); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuw script →
                    </button>
                </div>
            )}
        </div>
    );
}
