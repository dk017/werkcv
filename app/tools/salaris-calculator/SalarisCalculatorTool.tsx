"use client";
import { useState } from "react";

type Sector =
    | 'it' | 'finance' | 'marketing' | 'zorg' | 'onderwijs'
    | 'juridisch' | 'logistiek' | 'hr' | 'sales' | 'bouw' | 'overheid' | 'overig';
type Ervaringsniveau = 'junior' | 'medior' | 'senior';
type Regio = 'randstad' | 'overig';

// Bruto jaarsalaris ranges (min, max) in euros
// Sources: CBS, Nationale Salarisgids, Intermediair Salarisonderzoek
const salaryData: Record<Sector, Record<Ervaringsniveau, [number, number]>> = {
    it:         { junior: [36000, 46000], medior: [52000, 72000], senior: [72000, 100000] },
    finance:    { junior: [34000, 44000], medior: [50000, 70000], senior: [70000, 105000] },
    marketing:  { junior: [28000, 38000], medior: [38000, 55000], senior: [55000, 80000] },
    zorg:       { junior: [27000, 34000], medior: [34000, 48000], senior: [48000, 65000] },
    onderwijs:  { junior: [28000, 36000], medior: [36000, 47000], senior: [47000, 60000] },
    juridisch:  { junior: [36000, 46000], medior: [52000, 72000], senior: [72000, 110000] },
    logistiek:  { junior: [25000, 33000], medior: [32000, 46000], senior: [46000, 62000] },
    hr:         { junior: [28000, 37000], medior: [37000, 52000], senior: [52000, 70000] },
    sales:      { junior: [28000, 40000], medior: [40000, 58000], senior: [58000, 85000] },
    bouw:       { junior: [28000, 38000], medior: [38000, 55000], senior: [55000, 75000] },
    overheid:   { junior: [30000, 38000], medior: [38000, 52000], senior: [52000, 70000] },
    overig:     { junior: [26000, 34000], medior: [34000, 48000], senior: [48000, 65000] },
};

const sectorLabels: Record<Sector, string> = {
    it: 'IT & Tech',
    finance: 'Finance & Banking',
    marketing: 'Marketing & Communicatie',
    zorg: 'Zorg & Welzijn',
    onderwijs: 'Onderwijs',
    juridisch: 'Juridisch',
    logistiek: 'Logistiek & Supply Chain',
    hr: 'HR & P&O',
    sales: 'Sales & Commercieel',
    bouw: 'Bouw & Techniek',
    overheid: 'Overheid & Non-profit',
    overig: 'Overige sector',
};

function formatEuro(amount: number) {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
}

const inputClass = "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 font-medium bg-white";

interface Result {
    min: number;
    max: number;
    mediaan: number;
    perMaand: [number, number];
}

export default function SalarisCalculatorTool() {
    const [sector, setSector] = useState<Sector>('it');
    const [niveau, setNiveau] = useState<Ervaringsniveau>('medior');
    const [regio, setRegio] = useState<Regio>('randstad');
    const [result, setResult] = useState<Result | null>(null);

    function handleBereken() {
        const [min, max] = salaryData[sector][niveau];
        const modifier = regio === 'randstad' ? 1.07 : 1;
        const adjMin = Math.round(min * modifier / 500) * 500;
        const adjMax = Math.round(max * modifier / 500) * 500;
        const mediaan = Math.round((adjMin + adjMax) / 2 / 500) * 500;

        setResult({
            min: adjMin,
            max: adjMax,
            mediaan,
            perMaand: [Math.round(adjMin / 12), Math.round(adjMax / 12)],
        });
    }

    return (
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Sector
                        </label>
                        <select
                            value={sector}
                            onChange={e => { setSector(e.target.value as Sector); setResult(null); }}
                            className={inputClass}
                        >
                            {(Object.entries(sectorLabels) as [Sector, string][]).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                            Regio
                        </label>
                        <select
                            value={regio}
                            onChange={e => { setRegio(e.target.value as Regio); setResult(null); }}
                            className={inputClass}
                        >
                            <option value="randstad">Randstad (Amsterdam, Rotterdam, Den Haag, Utrecht)</option>
                            <option value="overig">Rest van Nederland</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                        Ervaringsniveau
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {([
                            ['junior', 'Junior', '0-2 jaar'],
                            ['medior', 'Medior', '3-7 jaar'],
                            ['senior', 'Senior', '8+ jaar'],
                        ] as const).map(([val, label, sub]) => (
                            <button
                                key={val}
                                type="button"
                                onClick={() => { setNiveau(val); setResult(null); }}
                                className={`p-3 border-2 text-left transition-colors ${
                                    niveau === val
                                        ? 'bg-black text-white border-black'
                                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                                }`}
                            >
                                <div className="font-black text-sm">{label}</div>
                                <div className={`text-xs mt-0.5 ${niveau === val ? 'text-slate-300' : 'text-slate-400'}`}>{sub}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleBereken}
                    className="w-full py-3 px-6 bg-[#4ECDC4] hover:bg-teal-500 text-slate-900 font-black text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
                    style={{ borderWidth: '3px' }}
                >
                    Bereken salarisindicatie
                </button>
            </div>

            {result && (
                <div className="mt-6 space-y-4 border-t border-slate-200 pt-6">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black uppercase tracking-wide text-slate-500">Salarisindicatie — {sectorLabels[sector]} · {niveau}</span>
                    </div>

                    {/* Main range */}
                    <div className="grid grid-cols-3 gap-3">
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Minimum</p>
                            <p className="text-xl font-black text-slate-800">{formatEuro(result.min)}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">per jaar</p>
                        </div>
                        <div className="bg-teal-50 border-2 border-teal-300 rounded-xl p-4 text-center">
                            <p className="text-[11px] font-black uppercase tracking-wide text-teal-700 mb-1">Mediaan</p>
                            <p className="text-2xl font-black text-teal-900">{formatEuro(result.mediaan)}</p>
                            <p className="text-[11px] text-teal-600 mt-0.5">per jaar</p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
                            <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">Maximum</p>
                            <p className="text-xl font-black text-slate-800">{formatEuro(result.max)}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">per jaar</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-1">Per maand (bruto)</p>
                        <p className="text-lg font-black text-slate-800">
                            {formatEuro(result.perMaand[0])} – {formatEuro(result.perMaand[1])}
                        </p>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-xs font-bold text-amber-800">
                            ⚠ Indicatief op basis van marktdata (CBS, Intermediair). Werkelijk salaris hangt af van bedrijfsgrootte, opleiding, CAO en onderhandelingsresultaat. Gebruik dit als vertrekpunt — niet als garantie.
                        </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">Onderhandeltips</p>
                        <ul className="space-y-1.5">
                            <li className="text-xs text-slate-600 font-medium flex items-start gap-2">
                                <span className="text-teal-500 font-black mt-0.5">→</span>
                                Vraag altijd aan de bovenkant van de range — je kunt altijd omlaag, maar zelden omhoog.
                            </li>
                            <li className="text-xs text-slate-600 font-medium flex items-start gap-2">
                                <span className="text-teal-500 font-black mt-0.5">→</span>
                                Noem je huidige salaris pas als ernaar gevraagd wordt.
                            </li>
                            <li className="text-xs text-slate-600 font-medium flex items-start gap-2">
                                <span className="text-teal-500 font-black mt-0.5">→</span>
                                Onderhandel ook over bonussen, opleidingsbudget en thuiswerkvergoeding.
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
