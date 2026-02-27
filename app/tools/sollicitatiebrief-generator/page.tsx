import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SollicitatiebriefTool from "./SollicitatiebriefTool";

export const metadata: Metadata = {
    title: "Sollicitatiebrief Generator - Gratis AI Sollicitatiebrief | WerkCV.nl",
    description: "Schrijf in seconden een persoonlijke sollicitatiebrief met AI. Vul je motivatie in en ontvang een professionele, op maat gemaakte brief.",
    keywords: [
        "sollicitatiebrief schrijven",
        "sollicitatiebrief generator",
        "motivatiebrief",
        "sollicitatiebrief ai",
        "gratis sollicitatiebrief",
        "motivatiebrief generator",
    ],
};

export default function SollicitatiebriefGeneratorPage() {
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
                        Sollicitatiebrief generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je doelrol en motivatie in — onze AI schrijft binnen 30 seconden een professionele sollicitatiebrief die je direct kunt gebruiken.
                    </p>
                </div>

                <SollicitatiebriefTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Wat maakt een goede sollicitatiebrief?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Een sterke sollicitatiebrief is geen herhaling van je CV. Het is een persoonlijk verhaal dat uitlegt waarom jij de juiste persoon bent voor díeze specifieke rol bij díet specifieke bedrijf.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Structuur van een sterke sollicitatiebrief</h3>
                        <ol className="space-y-2">
                            {[
                                ['Opening', 'Pakkende zin die direct je motivatie laat zien — geen "Hierbij solliciteer ik".'],
                                ['Meerwaarde', 'Wat breng jij mee? Noem 1-2 concrete prestaties of vaardigheden die aansluiten op de vacature.'],
                                ['Fit met het bedrijf', 'Laat zien dat je het bedrijf kent. Koppel hun missie aan jouw motivatie.'],
                                ['Afsluiting', 'Nodig uit voor een gesprek. Zelfverzekerd en concreet.'],
                            ].map(([stap, uitleg], i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4ECDC4] border border-teal-400 flex items-center justify-center text-[10px] font-black text-slate-900">{i + 1}</span>
                                    <span><strong className="text-slate-900">{stap}:</strong> {uitleg}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
