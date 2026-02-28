import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import CvVacatureMatchTool from './CvVacatureMatchTool';

export const metadata: Metadata = {
    title: 'CV vs Vacature Match Checker — Gratis ATS Match Score | WerkCV.nl',
    description: 'Plak je CV en een vacature en zie direct hoe goed ze bij elkaar passen. Ontdek ontbrekende keywords en verbeterpunten om meer interviews te scoren.',
    keywords: ['cv vacature match', 'cv checker vacature', 'ats match score', 'cv vergelijken vacature'],
};

export default function CvVacatureMatchPage() {
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

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#4ECDC4]/15 p-2 border-2 border-black">
                            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        CV vs Vacature Match Checker
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Plak je CV en de vacaturetekst. Ontvang direct een matchscore, ontbrekende keywords en concrete verbeterpunten.
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { stat: '75%', label: 'CV\'s afgewezen door ATS voor screening' },
                        { stat: '3×', label: 'meer kans op interview bij sterke match' },
                        { stat: '< 1 min', label: 'analyse tijd' },
                    ].map(({ stat, label }) => (
                        <div key={stat} className="bg-white border-2 border-black p-3 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className="text-xl font-black text-slate-900">{stat}</div>
                            <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <CvVacatureMatchTool />
                </div>

                <div className="mt-10 bg-slate-50 border-2 border-slate-200 p-6">
                    <h2 className="font-black text-slate-900 mb-3">Hoe werkt de match checker?</h2>
                    <ol className="space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2"><span className="font-black text-teal-600">1.</span> Kopieer de volledige tekst van je CV en plak die in het linker veld.</li>
                        <li className="flex gap-2"><span className="font-black text-teal-600">2.</span> Kopieer de vacaturetekst (inclusief vereisten) en plak die rechts.</li>
                        <li className="flex gap-2"><span className="font-black text-teal-600">3.</span> De AI analyseert beide teksten en geeft een matchscore van 0–100%.</li>
                        <li className="flex gap-2"><span className="font-black text-teal-600">4.</span> Voeg de ontbrekende keywords toe aan je CV en verhoog je kans op een interview.</li>
                    </ol>
                </div>
            </div>

            <Footer />
        </div>
    );
}
