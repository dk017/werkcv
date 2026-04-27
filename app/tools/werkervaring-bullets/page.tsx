import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import WerkervaringTool from "./WerkervaringTool";

export const metadata: Metadata = {
    title: "Werkervaring Bullets Generator - CV Bullet Points | WerkCV",
    description: "Zet je werkervaring om in krachtige CV-bullets. Onze AI schrijft sterke, resultaatgerichte bullet points die opvallen bij recruiters.",
    keywords: [
        "cv bullets",
        "werkervaring cv",
        "cv bullet points",
        "cv werkervaring schrijven",
        "bullet points cv generator",
        "cv punten",
    ],
};

export default function WerkervaringBulletsPage() {
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
                        Werkervaring bullets generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Beschrijf wat je deed in je functie en ontvang 5 krachtige, resultaatgerichte bullet points — klaar om in je CV te plakken.
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                        Eerst voorbeelden zien?{" "}
                        <Link href="/werkervaring-cv-voorbeelden" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk werkervaring CV voorbeelden
                        </Link>
                        {" "}of{" "}
                        <Link href="/tools/linkedin-naar-cv" className="underline decoration-2 underline-offset-2 text-slate-900">
                            maak een cv van je LinkedIn-profiel
                        </Link>
                    </p>
                </div>

                <WerkervaringTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Zo schrijf je sterke werkervaring bullets</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Recruiters lezen CV&apos;s in 6 seconden. Bullet points die beginnen met een actief werkwoord en een resultaat bevatten, worden 3x vaker gelezen dan saaie taakomschrijvingen.
                    </p>
                    <div className="space-y-3">
                        <div className="border-2 border-red-200 rounded-xl p-4 bg-red-50">
                            <p className="text-xs font-black text-red-700 uppercase tracking-wide mb-2">❌ Zwak (niet doen)</p>
                            <p className="text-sm text-red-800 font-medium">&ldquo;Verantwoordelijk voor klantenservice en het oplossen van problemen.&rdquo;</p>
                        </div>
                        <div className="border-2 border-emerald-200 rounded-xl p-4 bg-emerald-50">
                            <p className="text-xs font-black text-emerald-700 uppercase tracking-wide mb-2">✓ Sterk (zo doen)</p>
                            <p className="text-sm text-emerald-800 font-medium">&ldquo;Verhoogde klanttevredenheidsscore van 7,4 naar 8,9 door invoering van gestructureerd klachtafhandelingsproces voor 200+ klanten per maand.&rdquo;</p>
                        </div>
                    </div>
                </div>

                <ToolToCvCTA
                    toolName="werkervaring-bullets"
                    title="Gebruik deze bullets in je werkervaring"
                    description="Zet je verbeterde werkervaring direct in een professionele cv-layout."
                    primaryLabel="Maak cv met deze bullets"
                />
            </div>

            <Footer />
        </div>
    );
}
