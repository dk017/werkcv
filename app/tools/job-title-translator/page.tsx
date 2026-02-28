import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import JobTitleTranslatorTool from './JobTitleTranslatorTool';

export const metadata: Metadata = {
    title: 'Functietitel Vertaler NL↔EN — Gratis Tool | WerkCV.nl',
    description: 'Vertaal Nederlandse functietitels naar Engels of andersom. Ideaal voor je LinkedIn profiel, internationaal CV of wanneer je in Nederland solliciteert als expat.',
    keywords: ['functietitel vertalen', 'job title vertaler', 'functienaam engels', 'english job title dutch'],
};

export default function JobTitleTranslatorPage() {
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

            <div className="max-w-2xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#4ECDC4]/15 p-2 border-2 border-black">
                            <svg className="w-5 h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Functietitel Vertaler NL ↔ EN
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vertaal je functietitel naar Engels of Nederlands — inclusief alternatieven en LinkedIn-advies.
                    </p>
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <JobTitleTranslatorTool />
                </div>

                <div className="mt-10 bg-slate-50 border-2 border-slate-200 p-6">
                    <h2 className="font-black text-slate-900 mb-3">Wanneer gebruik je deze tool?</h2>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex gap-2"><span className="text-teal-600 font-black">→</span> Je solliciteert bij een internationaal bedrijf in Nederland en wilt je titel vertalen.</li>
                        <li className="flex gap-2"><span className="text-teal-600 font-black">→</span> Je bent expat en wilt je buitenlandse functietitel vertalen voor een Nederlandse vacature.</li>
                        <li className="flex gap-2"><span className="text-teal-600 font-black">→</span> Je wilt weten welke Engelse functietitel beter vindbaar is op LinkedIn.</li>
                        <li className="flex gap-2"><span className="text-teal-600 font-black">→</span> Je maakt een Engels CV en weet niet welk equivalent gebruikelijk is.</li>
                    </ul>
                </div>
            </div>

            <Footer />
        </div>
    );
}
