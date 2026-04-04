import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AtsCheckerTool from "./AtsCheckerTool";

export const metadata: Metadata = {
    title: "ATS CV Checker - Gratis ATS Score Berekenen | WerkCV",
    description: "Check je CV op ATS-compatibiliteit. Upload je PDF of plak je tekst en ontvang direct je ATS-score met concrete verbeterpunten.",
    keywords: [
        "ats cv checker",
        "ats score berekenen",
        "cv ats check",
        "ats vriendelijk cv",
        "cv checker gratis",
        "ats cv scanner",
    ],
};

export default function AtsCvCheckerPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← Alle tools
                    </Link>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
                        AI tool — Gratis
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        ATS CV checker
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Upload je CV als PDF of Word, of plak de tekst direct. Ontvang je ATS-score en zie precies wat je moet verbeteren.
                    </p>
                </div>

                {/* What ATS checks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                        ['📋', 'Structuur', 'Profieltekst, secties, opmaak'],
                        ['📞', 'Contactinfo', 'Email, telefoon, LinkedIn'],
                        ['💪', 'Inhoud', 'Werkwoorden, resultaten, lengte'],
                        ['🤖', 'ATS-fit', 'Koppen, datums, leesbaarheid'],
                    ].map(([icon, titel, sub]) => (
                        <div key={titel} className="bg-white border-2 border-slate-200 rounded-xl p-3 text-center">
                            <div className="text-xl mb-1">{icon}</div>
                            <p className="text-xs font-black text-slate-800">{titel}</p>
                            <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{sub}</p>
                        </div>
                    ))}
                </div>

                <AtsCheckerTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Wat is een ATS en waarom telt het?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Een ATS (Applicant Tracking System) is software die bedrijven gebruiken om CV&apos;s automatisch te filteren. Meer dan 70% van de grote werkgevers in Nederland gebruikt een ATS. Een CV dat er goed uitziet voor mensen, maar slecht leesbaar is voor software, wordt nooit door een recruiter gezien.
                    </p>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">De 5 meest gemaakte ATS-fouten</h3>
                        <ul className="space-y-2">
                            {[
                                'Tabellen en kolommen gebruiken — ATS leest dit door elkaar',
                                'Geen of een creatieve sectienaam zoals "Wat ik heb gedaan"',
                                'Datums inconsistent opschrijven (2021-22 vs. jan 2021 – dec 2022)',
                                'Geen LinkedIn-profiel of contactgegevens bovenaan',
                                'Holle buzzwords zonder bewijs: "resultaatgericht", "teamplayer"',
                            ].map((fout, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                    <span className="flex-shrink-0 mt-0.5 text-red-500 font-black">✗</span>
                                    {fout}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 mb-3">Wil je een CV dat wél door ATS komt?</p>
                        <Link
                            href="/templates"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            Maak ATS-vriendelijk CV →
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
