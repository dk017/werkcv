import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import VaardigheidsTool from "./VaardigheidsTool";

export const metadata: Metadata = {
    title: "Vaardigheden Generator - Gratis CV Vaardigheden | WerkCV",
    description: "Genereer relevante hard en soft skills voor jouw functie. Voeg de juiste vaardigheden toe aan je CV en val op bij recruiters.",
    keywords: [
        "cv vaardigheden",
        "skills cv",
        "hard skills cv",
        "soft skills cv",
        "vaardigheden generator",
        "cv vaardigheden lijst",
    ],
};

export default function VaardigheidGeneratorPage() {
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
                        Vaardigheden generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je functietitel in en krijg direct een lijst met relevante hard en soft skills voor je CV — afgestemd op jouw rol en sector.
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                        Eerst inspiratie nodig?{" "}
                        <Link href="/vaardigheden-cv-voorbeelden" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk vaardigheden CV voorbeelden
                        </Link>
                    </p>
                </div>

                <VaardigheidsTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Welke vaardigheden zet je op je CV?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        De vaardigheidensectie is een van de eerste dingen die recruiters en ATS-systemen scannen. De juiste mix van hard skills en soft skills maakt het verschil tussen een gesprek of een afwijzing.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="font-black text-slate-900 mb-2">Hard skills</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Technische kennis en meetbare vaardigheden: software, tools, methoden, talen, certificaten. ATS-systemen filteren hier specifiek op.</p>
                        </div>
                        <div className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="font-black text-slate-900 mb-2">Soft skills</h3>
                            <p className="text-xs text-slate-600 leading-relaxed">Interpersoonlijke vaardigheden en karaktereigenschappen. Zeg niet teamplayer maar cross-functionele samenwerking; concreet telt.</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 mb-3 text-sm">Tips voor de vaardigheidensectie</h3>
                        <ul className="space-y-2">
                            {[
                                'Zet 6-10 vaardigheden — meer wordt ongeloofwaardig.',
                                'Match je vaardigheden met trefwoorden uit de vacature.',
                                'Gebruik exacte benamingen (bijv. "Power BI" niet "datadashboards").',
                                'Voeg geen vaardigheden toe die je niet kunt bewijzen in een gesprek.',
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
