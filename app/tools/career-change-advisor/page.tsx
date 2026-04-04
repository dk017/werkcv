import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import CareerChangeAdvisorTool from './CareerChangeAdvisorTool';

export const metadata: Metadata = {
    title: 'Carrièreswitch Advisor — Gratis AI Loopbaanadvies | WerkCV',
    description: 'Overweeg je een carrièreswitch? Ontvang gratis AI-advies: haalbaarheid, overdraagbare vaardigheden, kennishiaten en een concreet actieplan.',
    keywords: ['carrièreswitch', 'loopbaanadvies', 'van baan wisselen', 'carriere veranderen', 'career change'],
};

export default function CareerChangeAdvisorPage() {
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Carrièreswitch Advisor
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je huidige en gewenste functie in. Ontvang een realistische haalbaarheidsanalyse, overdraagbare vaardigheden en een concreet stappenplan.
                    </p>
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <CareerChangeAdvisorTool />
                </div>

                <div className="mt-10 bg-slate-50 border-2 border-slate-200 p-6">
                    <h2 className="font-black text-slate-900 mb-3">Wat analyseren we?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                        {[
                            'Haalbaarheid van de switch (0–100%)',
                            'Welke vaardigheden je al hebt die meegaan',
                            'Wat je nog moet leren of ontwikkelen',
                            'Concreet 4-stappen actieplan met tijdlijn',
                            'Aanbevolen cursussen en certificeringen',
                            'Realistische inschatting van de doorlooptijd',
                        ].map((item, i) => (
                            <div key={i} className="flex gap-2">
                                <span className="text-teal-600 font-black flex-shrink-0">→</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
