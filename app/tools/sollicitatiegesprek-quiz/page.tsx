import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import SollicitatieQuizTool from './SollicitatieQuizTool';

export const metadata: Metadata = {
    title: 'Sollicitatiegesprek Voorbereiding — 8 Oefenvragen met Antwoorden | WerkCV',
    description: 'Bereid je voor op je sollicitatiegesprek met 8 op maat gemaakte vragen voor jouw functie. Inclusief antwoordtips en voorbeeldantwoorden.',
    keywords: ['sollicitatiegesprek voorbereiding', 'sollicitatievragen oefenen', 'interview vragen', 'sollicitatie vragen'],
};

export default function SollicitatieQuizPage() {
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full border border-teal-300">AI</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Sollicitatiegesprek Quiz
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Oefen met 8 realistische sollicitatievragen op maat voor jouw functie en niveau. Bekijk antwoordtips en voorbeeldantwoorden.
                    </p>
                </div>

                <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8">
                    <SollicitatieQuizTool />
                </div>

                <div className="mt-10 bg-slate-50 border-2 border-slate-200 p-6">
                    <h2 className="font-black text-slate-900 mb-3">De STAR-methode</h2>
                    <p className="text-sm text-slate-600 mb-3">Veel sollicitatievragen zijn gedragsvragen die je het best beantwoordt met de STAR-methode:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {[
                            { letter: 'S', word: 'Situatie', desc: 'Schets de context' },
                            { letter: 'T', word: 'Taak', desc: 'Wat was jouw rol?' },
                            { letter: 'A', word: 'Actie', desc: 'Wat deed jij concreet?' },
                            { letter: 'R', word: 'Resultaat', desc: 'Wat was het effect?' },
                        ].map(({ letter, word, desc }) => (
                            <div key={letter} className="bg-white border-2 border-black p-3 text-center">
                                <div className="w-8 h-8 bg-[#4ECDC4] border-2 border-black text-sm font-black flex items-center justify-center mx-auto mb-1">
                                    {letter}
                                </div>
                                <p className="text-xs font-black text-slate-900">{word}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 bg-white border-2 border-black p-6">
                    <h2 className="font-black text-slate-900 mb-3">Meer hulp bij je sollicitatiegesprek</h2>
                    <p className="text-sm text-slate-600 mb-5">
                        Gebruik deze gidsen als je naast oefenen ook je voorbereiding, kledingkeuze en eigen vragen wilt aanscherpen.
                    </p>

                    <div className="grid gap-3 sm:grid-cols-2">
                        {[
                            {
                                href: "/cv-tips/sollicitatiegesprek-voorbereiden",
                                title: "Sollicitatiegesprek voorbereiden",
                                description: "Volledig stappenplan voor bedrijfsonderzoek, STAR-antwoorden, lichaamstaal en follow-up.",
                            },
                            {
                                href: "/cv-tips/sollicitatievragen",
                                title: "Sollicitatievragen",
                                description: "Begrijp de belangrijkste vraagtypen en bereid per categorie sterkere antwoorden voor.",
                            },
                            {
                                href: "/cv-tips/meest-gestelde-sollicitatievragen",
                                title: "Meest gestelde sollicitatievragen",
                                description: "Snelle lijst met de vragen die in Nederlandse gesprekken het vaakst terugkomen.",
                            },
                            {
                                href: "/cv-tips/vragen-stellen-sollicitatiegesprek",
                                title: "Vragen stellen in een sollicitatiegesprek",
                                description: "Voorbeelden van sterke vragen aan je interviewer aan het einde van het gesprek.",
                            },
                            {
                                href: "/cv-tips/sollicitatiegesprek-kleding",
                                title: "Kleding voor je sollicitatiegesprek",
                                description: "Kies een outfit die past bij corporate, zorg, retail, tech of een creatief bedrijf.",
                            },
                        ].map(({ href, title, description }) => (
                            <Link
                                key={href}
                                href={href}
                                className="block border-2 border-slate-200 hover:border-black p-4 transition-colors"
                            >
                                <p className="font-black text-slate-900">{title}</p>
                                <p className="text-sm text-slate-600 mt-1">{description}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
