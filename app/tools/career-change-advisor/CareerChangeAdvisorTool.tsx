'use client';

import { useState } from 'react';

interface ActiePlan {
    stap: string;
    tijdlijn: string;
    actie: string;
}

interface CareerChangeResult {
    haalbaarheid: string;
    haalbaarheidsScore: number;
    samenvatting: string;
    overdraagbareVaardigheden: string[];
    kennisHiaten: string[];
    actieplan: ActiePlan[];
    aanbevolenOpleidingen: string[];
    realistischeTimeline: string;
}

const haalbaarheidsKleur: Record<string, string> = {
    'Goed haalbaar': 'bg-teal-50 border-teal-300 text-teal-700',
    'Haalbaar met inspanning': 'bg-yellow-50 border-yellow-300 text-yellow-700',
    'Uitdagend maar mogelijk': 'bg-orange-50 border-orange-300 text-orange-700',
    'Grote stap': 'bg-red-50 border-red-300 text-red-700',
};

export default function CareerChangeAdvisorTool() {
    const [form, setForm] = useState({
        huidigeRol: '', huidigeSector: '', doelRol: '', doelSector: '', ervaringJaren: '', motivatie: '',
    });
    const [result, setResult] = useState<CareerChangeResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function set(field: string, value: string) {
        setForm(f => ({ ...f, [field]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);
        setLoading(true);

        try {
            const res = await fetch('/api/tools/career-change-advisor', {
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

    const circumference = 2 * Math.PI * 36;

    return (
        <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Huidige functie <span className="text-red-500">*</span>
                        </label>
                        <input type="text" value={form.huidigeRol} onChange={e => set('huidigeRol', e.target.value)}
                            placeholder="bijv. Verpleegkundige" required
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Huidige sector</label>
                        <input type="text" value={form.huidigeSector} onChange={e => set('huidigeSector', e.target.value)}
                            placeholder="bijv. Zorg"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">
                            Doelfunctie <span className="text-red-500">*</span>
                        </label>
                        <input type="text" value={form.doelRol} onChange={e => set('doelRol', e.target.value)}
                            placeholder="bijv. UX Designer" required
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                    <div>
                        <label className="block text-sm font-black text-slate-900 mb-1">Doelsector</label>
                        <input type="text" value={form.doelSector} onChange={e => set('doelSector', e.target.value)}
                            placeholder="bijv. Tech"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-black text-slate-900 mb-1">Jaren werkervaring</label>
                        <input type="text" value={form.ervaringJaren} onChange={e => set('ervaringJaren', e.target.value)}
                            placeholder="bijv. 7 jaar"
                            className="w-full border-2 border-black p-3 text-sm focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                    <div className="sm:col-span-2">
                        <label className="block text-sm font-black text-slate-900 mb-1">Motivatie voor de switch</label>
                        <textarea value={form.motivatie} onChange={e => set('motivatie', e.target.value)}
                            placeholder="Waarom wil je wisselen? Wat trekt je aan in de nieuwe richting?"
                            rows={3}
                            className="w-full border-2 border-black p-3 text-sm resize-none focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100" />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-red-400 p-3 text-sm font-bold text-red-700">{error}</div>
                )}

                <button
                    type="submit"
                    disabled={loading || !form.huidigeRol || !form.doelRol}
                    className="w-full bg-[#4ECDC4] text-slate-900 font-black py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Advies genereren…' : 'Analyseer mijn carrièreswitch →'}
                </button>
            </form>

            {result && (
                <div className="space-y-4 border-t-2 border-black pt-6">
                    {/* Score + haalbaarheid */}
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative w-28 h-28 flex-shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                                <circle cx="40" cy="40" r="36" fill="none" stroke="#e2e8f0" strokeWidth="7" />
                                <circle cx="40" cy="40" r="36" fill="none"
                                    className="stroke-teal-500" strokeWidth="7"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={circumference * (1 - result.haalbaarheidsScore / 100)}
                                    strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-black text-slate-900">{result.haalbaarheidsScore}%</span>
                            </div>
                        </div>
                        <div>
                            <div className={`inline-block text-sm font-black px-3 py-1 border-2 border-black mb-2 ${haalbaarheidsKleur[result.haalbaarheid] ?? 'bg-slate-100 text-slate-700'}`}>
                                {result.haalbaarheid}
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">{result.samenvatting}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Overdraagbare vaardigheden */}
                        <div className="bg-teal-50 border-2 border-teal-300 p-4">
                            <h3 className="font-black text-teal-800 text-sm mb-3">✓ Overdraagbare vaardigheden</h3>
                            <ul className="space-y-1">
                                {result.overdraagbareVaardigheden.map((v, i) => (
                                    <li key={i} className="text-sm text-teal-700 flex gap-2">
                                        <span className="flex-shrink-0">→</span>{v}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kennishiaten */}
                        <div className="bg-orange-50 border-2 border-orange-300 p-4">
                            <h3 className="font-black text-orange-800 text-sm mb-3">△ Nog te ontwikkelen</h3>
                            <ul className="space-y-1">
                                {result.kennisHiaten.map((h, i) => (
                                    <li key={i} className="text-sm text-orange-700 flex gap-2">
                                        <span className="flex-shrink-0">→</span>{h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Actieplan */}
                    <div className="bg-white border-2 border-black p-4">
                        <h3 className="font-black text-slate-900 text-sm mb-4">Jouw actieplan</h3>
                        <div className="space-y-3">
                            {result.actieplan.map((stap, i) => (
                                <div key={i} className="flex gap-3">
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#4ECDC4] border-2 border-black text-xs font-black flex items-center justify-center">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                            <span className="text-xs font-black text-slate-900">{stap.stap}</span>
                                            <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                                                {stap.tijdlijn}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600">{stap.actie}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Opleidingen */}
                    <div className="bg-slate-50 border-2 border-slate-300 p-4">
                        <h3 className="font-black text-slate-800 text-sm mb-2">Aanbevolen opleidingen & cursussen</h3>
                        <ul className="space-y-1">
                            {result.aanbevolenOpleidingen.map((o, i) => (
                                <li key={i} className="text-sm text-slate-600 flex gap-2">
                                    <span className="text-teal-600 flex-shrink-0">•</span>{o}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Timeline */}
                    <div className="bg-[#4ECDC4]/10 border-2 border-[#4ECDC4] p-4">
                        <p className="text-xs font-black text-slate-500 mb-1">REALISTISCHE TIJDLIJN</p>
                        <p className="text-sm font-bold text-slate-800">{result.realistischeTimeline}</p>
                    </div>

                    <button
                        onClick={() => { setResult(null); setForm({ huidigeRol: '', huidigeSector: '', doelRol: '', doelSector: '', ervaringJaren: '', motivatie: '' }); }}
                        className="text-sm font-bold text-slate-500 hover:text-slate-700 underline"
                    >
                        Nieuw advies →
                    </button>
                </div>
            )}
        </div>
    );
}
