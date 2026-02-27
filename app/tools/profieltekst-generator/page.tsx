import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProfieltekstTool from "./ProfieltekstTool";

export const metadata: Metadata = {
    title: "Profieltekst Generator - Schrijf je CV Profiel | WerkCV.nl",
    description: "Genereer een sterke profieltekst voor je CV met AI. Vul je functie en competenties in en krijg direct een professioneel persoonlijk profiel.",
    keywords: [
        "profieltekst generator",
        "cv profiel schrijven",
        "persoonlijk profiel cv",
        "profieltekst cv",
        "cv samenvatting",
        "cv introductie",
    ],
};

export default function ProfieltekstGeneratorPage() {
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
                        Profieltekst generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je huidige functie, doelrol en competenties in. Onze AI schrijft binnen seconden een scherpe profieltekst voor bovenaan je CV.
                    </p>
                </div>

                <ProfieltekstTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Wat is een goede profieltekst?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        De profieltekst staat bovenaan je CV en is het eerste wat een recruiter leest. In 4-5 zinnen vertel je wie je bent, wat je kunt en wat je zoekt. Begin nooit met &apos;Ik&apos; — dat is de eerste fout die de meeste mensen maken.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Checklist goede profieltekst</h3>
                        <ul className="space-y-2">
                            {[
                                'Niet beginnen met "Ik" — gebruik een actief werkwoord of beschrijving',
                                'Maximaal 4-5 zinnen (60-80 woorden)',
                                'Concreet: noem je specialisme, sector en jaren ervaring',
                                'Sluit af met wat je zoekt of wat je te bieden hebt',
                                'Pas aan per vacature met relevante keywords',
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
