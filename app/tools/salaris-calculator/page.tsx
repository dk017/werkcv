import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SalarisCalculatorTool from "./SalarisCalculatorTool";

export const metadata: Metadata = {
    title: "Salaris Calculator Nederland 2026 - Wat Verdien Jij? | WerkCV.nl",
    description: "Bereken je marktsalaris op basis van sector, ervaringsniveau en regio. Gratis salarisindicatie voor de Nederlandse arbeidsmarkt.",
    keywords: [
        "salaris calculator nederland",
        "salaris berekenen",
        "wat verdien ik",
        "salaris per sector",
        "salarisindicatie",
        "gemiddeld salaris nederland",
    ],
};

export default function SalarisCalculatorPage() {
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
                        Gratis tool
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Salaris calculator 2026
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Selecteer je sector, ervaringsniveau en regio voor een realistische salarisindicatie — gebaseerd op actuele marktdata.
                    </p>
                </div>

                <SalarisCalculatorTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Salaris onderhandelen: zo pak je het aan</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Weten wat je waard bent is de eerste stap. De tweede stap is het ook daadwerkelijk vragen. Meer dan 60% van de werknemers laat geld liggen door niet te onderhandelen.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                titel: 'Doe je huiswerk',
                                tekst: 'Gebruik deze calculator en vergelijk met Glassdoor, Intermediair en LinkedIn Salary Insights. Bewapend met data sta je sterk.',
                            },
                            {
                                titel: 'Noem een bandbreedte',
                                tekst: 'Geef een range van €5.000, niet één exact getal. Zo geef je speelruimte terwijl je ondergrens goed is.',
                            },
                            {
                                titel: 'Timing is alles',
                                tekst: 'Onderhandel na het aanbod, niet ervoor. Dan weet je zeker dat ze jou willen — en heb je de sterkste positie.',
                            },
                            {
                                titel: 'Denk breed',
                                tekst: 'Vakantiedagen, thuiswerken, opleidingsbudget en reiskostenvergoeding tellen ook mee. Onderhandel het totaalpakket.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-black text-slate-900 text-sm mb-2">{item.titel}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.tekst}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
