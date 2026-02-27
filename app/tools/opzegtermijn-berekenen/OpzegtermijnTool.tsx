"use client";
import { useState } from "react";

interface Result {
    werknemer: string;
    werkgever: string;
    toelichting: string;
}

function berekenOpzegtermijn(dienstjaren: number): Result {
    // Wettelijke opzegtermijnen (BW 7:672)
    const werkgeverMaanden = dienstjaren < 5 ? 1 : dienstjaren < 10 ? 2 : dienstjaren < 15 ? 3 : 4;

    return {
        werknemer: '1 maand',
        werkgever: `${werkgeverMaanden} ${werkgeverMaanden === 1 ? 'maand' : 'maanden'}`,
        toelichting: dienstjaren < 5
            ? 'Bij minder dan 5 jaar dienst geldt voor de werkgever een opzegtermijn van 1 maand.'
            : dienstjaren < 10
            ? 'Bij 5–10 jaar dienst geldt voor de werkgever een opzegtermijn van 2 maanden.'
            : dienstjaren < 15
            ? 'Bij 10–15 jaar dienst geldt voor de werkgever een opzegtermijn van 3 maanden.'
            : 'Bij 15 jaar of meer dienst geldt voor de werkgever een opzegtermijn van 4 maanden.',
    };
}

export default function OpzegtermijnTool() {
    const [dienstjaren, setDienstjaren] = useState('');
    const [contractType, setContractType] = useState<'vast' | 'tijdelijk'>('vast');
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    function handleBereken() {
        const jaren = parseFloat(dienstjaren.replace(',', '.'));
        if (isNaN(jaren) || jaren < 0) {
            setError('Vul een geldig aantal dienstjaren in (bijv. 3 of 7.5).');
            return;
        }
        setError('');
        if (contractType === 'tijdelijk') {
            setResult({
                werknemer: 'Niet van toepassing',
                werkgever: 'Niet van toepassing',
                toelichting: 'Bij een tijdelijk contract eindigt de arbeidsovereenkomst van rechtswege op de afgesproken einddatum. Er is geen opzegging nodig, tenzij tussentijdse opzegging is overeengekomen.',
            });
        } else {
            setResult(berekenOpzegtermijn(jaren));
        }
    }

    const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            {!result ? (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Type arbeidscontract
                            </label>
                            <select
                                value={contractType}
                                onChange={e => setContractType(e.target.value as 'vast' | 'tijdelijk')}
                                className={inputClass}
                            >
                                <option value="vast">Vast contract</option>
                                <option value="tijdelijk">Tijdelijk contract</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                Aantal dienstjaren
                            </label>
                            <input
                                value={dienstjaren}
                                onChange={e => { setDienstjaren(e.target.value); setError(''); }}
                                placeholder="bijv. 3 of 7.5"
                                className={inputClass}
                                type="number"
                                min="0"
                                step="0.5"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                    <button
                        onClick={handleBereken}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: '3px' }}
                    >
                        Bereken opzegtermijn
                    </button>

                    <p className="text-xs text-slate-400 text-center">
                        Gebaseerd op artikel 7:672 Burgerlijk Wetboek. Controleer altijd je arbeidsovereenkomst en CAO.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-50 border-2 border-teal-300 rounded-lg p-4 text-center">
                            <p className="text-xs font-black uppercase tracking-wide text-teal-700 mb-1">Jouw opzegtermijn</p>
                            <p className="text-3xl font-black text-teal-900">{result.werknemer}</p>
                            <p className="text-xs text-teal-700 mt-1">als werknemer</p>
                        </div>
                        <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 text-center">
                            <p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">Opzegtermijn werkgever</p>
                            <p className="text-3xl font-black text-amber-900">{result.werkgever}</p>
                            <p className="text-xs text-amber-700 mt-1">bij ontslag door werkgever</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                        <p className="text-sm text-slate-700 leading-relaxed">{result.toelichting}</p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            ⚠ Disclaimer: Dit is een berekening op basis van de wettelijke minimumtermijnen (art. 7:672 BW). Je arbeidsovereenkomst of CAO kan andere termijnen bevatten. Raadpleeg bij twijfel een juridisch adviseur.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="/tools/opzeggingsbrief-generator"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Maak opzeggingsbrief →
                        </a>
                        <button
                            onClick={() => { setResult(null); setDienstjaren(''); }}
                            className="flex-1 py-3 px-4 text-sm font-bold text-slate-600 border-2 border-slate-300 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                            Opnieuw berekenen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
