import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CvKeywordsTool from "./CvKeywordsTool";

export const metadata: Metadata = {
    title: "CV Keywords Generator - ATS Trefwoorden voor je CV | WerkCV",
    description: "Ontdek welke keywords je CV moet bevatten voor jouw functie. Verhoog je ATS-score en val op bij recruiters met de juiste trefwoorden.",
    keywords: [
        "cv keywords",
        "ats keywords cv",
        "cv trefwoorden",
        "cv keyword optimalisatie",
        "ats cv optimalisatie",
        "cv keywords generator",
    ],
};

export default function CvKeywordsPage() {
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
                        CV keywords optimizer
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je functietitel in en ontdek de exacte trefwoorden die ATS-systemen en recruiters verwachten in je CV — gecategoriseerd per type.
                    </p>
                </div>

                <CvKeywordsTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Waarom zijn CV keywords zo belangrijk?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Meer dan 70% van de grote bedrijven gebruikt een ATS (Applicant Tracking System) om CV&apos;s te filteren vóórdat een recruiter ze te zien krijgt. Een CV zonder de juiste keywords wordt automatisch afgewezen — hoe goed je ook bent.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            ['70%+', 'van bedrijven gebruikt ATS', 'bg-red-50 border-red-200'],
                            ['6 sec', 'besteedt een recruiter gemiddeld aan een CV', 'bg-amber-50 border-amber-200'],
                            ['3x', 'meer callbacks met geoptimaliseerde keywords', 'bg-emerald-50 border-emerald-200'],
                        ].map(([stat, label, style], i) => (
                            <div key={i} className={`border-2 rounded-xl p-4 text-center ${style}`}>
                                <p className="text-3xl font-black text-slate-900 mb-1">{stat}</p>
                                <p className="text-xs text-slate-600 font-medium leading-snug">{label}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Zo verwerk je keywords in je CV</h3>
                        <ul className="space-y-2">
                            {[
                                'Verwerk must-have keywords letterlijk — ATS herkent geen synoniemen.',
                                'Gebruik keywords in je profieltekst, werkervaring én vaardigheidensectie.',
                                'Pas je CV per vacature aan met specifieke keywords uit de vacaturetekst.',
                                'Vermijd keyword stuffing — schrijf altijd voor de menselijke lezer.',
                            ].map((tip, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                    <span className="text-teal-500 font-black mt-0.5">✓</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
