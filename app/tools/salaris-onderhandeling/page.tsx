import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SalarisOnderhandelingTool from './SalarisOnderhandelingTool';

export const metadata: Metadata = {
    title: 'Salaris Onderhandeling Script Generator — Gratis | WerkCV.nl',
    description: 'Genereer een persoonlijk salarisonderhandelingsscript met AI. Inclusief e-mailsjabloon, argumenten en hoe je reageert op bezwaren.',
    keywords: ['salaris onderhandelen', 'salarisverhoging vragen', 'onderhandeling script', 'salaris negotiation'],
};

export default function SalarisOnderhandelingPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="font-black text-2xl tracking-tight text-black">
                        Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← Alle tools
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#4ECDC4]/15 p-2 border-2 border-black">
                            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Salaris Onderhandeling Script Generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je situatie in en ontvang een persoonlijk onderhandelingsscript — inclusief e-mail, argumenten en hoe je omgaat met bezwaren.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { stat: '60%', label: 'van Nederlanders vraagt nooit om salarisverhoging' },
                        { stat: '€3.400', label: 'gemiddeld verlies per jaar bij niet onderhandelen' },
                        { stat: '70%', label: 'van werkgevers verwacht onderhandeling' },
                    ].map(({ stat, label }) => (
                        <div key={stat} className="bg-white border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xl font-black text-slate-900">{stat}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <SalarisOnderhandelingTool />
                </div>
            </div>

            <Footer />
        </div>
    );
}
