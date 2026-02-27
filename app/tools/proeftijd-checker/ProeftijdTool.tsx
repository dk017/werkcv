"use client";
import { useState } from "react";

interface Result {
    toegestaan: boolean;
    maximumDuur: string;
    kleur: 'groen' | 'oranje' | 'rood';
    toelichting: string;
    tips: string[];
}

function berekenProeftijd(
    contractType: 'onbepaald' | 'bepaald',
    duurMaanden: number | null
): Result {
    // Art. 7:652 BW
    if (contractType === 'bepaald' && duurMaanden !== null && duurMaanden <= 6) {
        return {
            toegestaan: false,
            maximumDuur: 'Geen proeftijd',
            kleur: 'rood',
            toelichting: 'Bij een tijdelijk contract van 6 maanden of korter is een proeftijdbeding nietig (art. 7:652 lid 4 BW). Je werkgever mag geen proeftijd opnemen.',
            tips: [
                'Een eventueel opgenomen proeftijdbeding is van rechtswege nietig.',
                'Je kunt niet worden ontslagen op grond van een ongeldig proeftijdbeding.',
                'Controleer altijd je arbeidsovereenkomst — en vraag schriftelijk bevestiging als je twijfelt.',
            ],
        };
    }

    if (contractType === 'bepaald' && duurMaanden !== null && duurMaanden <= 24) {
        return {
            toegestaan: true,
            maximumDuur: '1 maand',
            kleur: 'oranje',
            toelichting: 'Bij een tijdelijk contract tussen de 6 maanden en 2 jaar is maximaal 1 maand proeftijd toegestaan. Een langere proeftijd is nietig.',
            tips: [
                'Staat er meer dan 1 maand in je contract? Dan is het meerdere nietig.',
                'De proeftijd moet schriftelijk zijn vastgelegd — mondelinge afspraken tellen niet.',
                'Tijdens proeftijd kan beide partijen direct opzeggen, zonder reden.',
            ],
        };
    }

    if (contractType === 'bepaald' && duurMaanden !== null && duurMaanden > 24) {
        return {
            toegestaan: true,
            maximumDuur: '2 maanden',
            kleur: 'groen',
            toelichting: 'Bij een tijdelijk contract van meer dan 2 jaar is maximaal 2 maanden proeftijd toegestaan.',
            tips: [
                'De proeftijd moet altijd schriftelijk zijn vastgelegd.',
                'Beide partijen mogen tijdens de proeftijd direct opzeggen.',
                'Je CAO kan een kortere proeftijd voorschrijven — check je arbeidsovereenkomst.',
            ],
        };
    }

    // Onbepaalde tijd
    return {
        toegestaan: true,
        maximumDuur: '2 maanden',
        kleur: 'groen',
        toelichting: 'Bij een vast contract (onbepaalde tijd) is maximaal 2 maanden proeftijd toegestaan.',
        tips: [
            'De proeftijd moet schriftelijk zijn vastgelegd in je arbeidsovereenkomst.',
            'Tijdens proeftijd mogen beide partijen per direct opzeggen.',
            'Je CAO kan een andere (kortere) termijn voorschrijven.',
        ],
    };
}

const kleurStyles = {
    groen: 'bg-emerald-50 border-emerald-300 text-emerald-900',
    oranje: 'bg-amber-50 border-amber-300 text-amber-900',
    rood: 'bg-red-50 border-red-300 text-red-900',
};

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

export default function ProeftijdTool() {
    const [contractType, setContractType] = useState<'onbepaald' | 'bepaald'>('onbepaald');
    const [duurMaanden, setDuurMaanden] = useState('');
    const [result, setResult] = useState<Result | null>(null);
    const [error, setError] = useState('');

    function handleBereken() {
        if (contractType === 'bepaald') {
            const maanden = parseInt(duurMaanden, 10);
            if (isNaN(maanden) || maanden < 1) {
                setError('Vul een geldig aantal maanden in (minimaal 1).');
                return;
            }
            setError('');
            setResult(berekenProeftijd('bepaald', maanden));
        } else {
            setError('');
            setResult(berekenProeftijd('onbepaald', null));
        }
    }

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
                                onChange={e => { setContractType(e.target.value as 'onbepaald' | 'bepaald'); setError(''); setDuurMaanden(''); }}
                                className={inputClass}
                            >
                                <option value="onbepaald">Vast contract (onbepaalde tijd)</option>
                                <option value="bepaald">Tijdelijk contract (bepaalde tijd)</option>
                            </select>
                        </div>

                        {contractType === 'bepaald' && (
                            <div>
                                <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                                    Duur contract (in maanden)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    value={duurMaanden}
                                    onChange={e => { setDuurMaanden(e.target.value); setError(''); }}
                                    placeholder="bijv. 6 of 12"
                                    className={inputClass}
                                />
                            </div>
                        )}
                    </div>

                    {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

                    <button
                        onClick={handleBereken}
                        className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                        style={{ borderWidth: '3px' }}
                    >
                        Controleer proeftijd
                    </button>

                    <p className="text-xs text-slate-400 text-center">
                        Gebaseerd op artikel 7:652 Burgerlijk Wetboek. Raadpleeg bij twijfel een juridisch adviseur.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Main result */}
                    <div className={`border-2 rounded-xl p-5 ${kleurStyles[result.kleur]}`}>
                        <p className="text-xs font-black uppercase tracking-wide mb-1 opacity-70">
                            {result.toegestaan ? 'Maximale proeftijd' : 'Proeftijd status'}
                        </p>
                        <p className="text-4xl font-black mb-2">{result.maximumDuur}</p>
                        <p className="text-sm font-medium leading-relaxed">{result.toelichting}</p>
                    </div>

                    {/* Tips */}
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Wat je moet weten</p>
                        {result.tips.map((tip, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-slate-300 flex items-center justify-center text-[10px] font-black text-white">{i + 1}</span>
                                <p className="text-xs text-slate-700 font-medium leading-relaxed">{tip}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            ⚠ Disclaimer: Dit is een indicatie op basis van wettelijke minimumregels. Je CAO of arbeidsovereenkomst kan afwijken. Raadpleeg bij twijfel een juridisch adviseur.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a
                            href="/tools/opzegtermijn-berekenen"
                            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-[#4ECDC4] text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            style={{ borderWidth: '3px' }}
                        >
                            Bereken ook opzegtermijn →
                        </a>
                        <button
                            onClick={() => { setResult(null); setDuurMaanden(''); }}
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
