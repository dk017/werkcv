import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import ProeftijdTool from "./ProeftijdTool";

export const metadata: Metadata = {
    title: "Proeftijd Checker - Wat is de Maximale Proeftijd? | WerkCV",
    description: "Check direct wat de maximale proeftijd is voor jouw contract. Gebaseerd op artikel 7:652 Burgerlijk Wetboek — gratis en in seconden.",
    keywords: [
        "proeftijd berekenen",
        "maximale proeftijd",
        "proeftijd tijdelijk contract",
        "proeftijd vast contract",
        "proeftijd wettelijk",
        "proeftijd arbeidsovereenkomst",
    ],
};

export default function ProeftijdCheckerPage() {
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
                        Proeftijd checker
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Selecteer je contracttype en zie direct wat de wettelijke maximale proeftijd is — en of je werkgever die überhaupt mag opnemen.
                    </p>
                </div>

                <ProeftijdTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Alles over de proeftijd in Nederland</h2>

                    <div className="overflow-hidden border-2 border-black">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-black text-white">
                                    <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide">Contractduur</th>
                                    <th className="text-left px-4 py-3 font-black text-xs uppercase tracking-wide">Max. proeftijd</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {[
                                    ['Tijdelijk ≤ 6 maanden', 'Geen proeftijd toegestaan', 'bg-red-50'],
                                    ['Tijdelijk 6 mnd – 2 jaar', 'Maximaal 1 maand', 'bg-amber-50'],
                                    ['Tijdelijk > 2 jaar', 'Maximaal 2 maanden', 'bg-emerald-50'],
                                    ['Vast (onbepaalde tijd)', 'Maximaal 2 maanden', 'bg-emerald-50'],
                                ].map(([duur, max, bg], i) => (
                                    <tr key={i} className={bg}>
                                        <td className="px-4 py-3 font-medium text-slate-800">{duur}</td>
                                        <td className="px-4 py-3 font-black text-slate-900">{max}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
                        <h3 className="font-black text-slate-900 text-sm">Veelgestelde vragen over proeftijd</h3>
                        {[
                            ['Moet de proeftijd schriftelijk worden vastgelegd?', 'Ja, een mondeling proeftijdbeding is nietig. De proeftijd moet altijd schriftelijk in de arbeidsovereenkomst staan.'],
                            ['Kan een proeftijd worden verlengd?', 'Nee. Zodra de proeftijd voorbij is, kan deze niet worden verlengd — ook niet met wederzijds goedvinden.'],
                            ['Wat als mijn contract een langere proeftijd bevat dan wettelijk toegestaan?', 'Het meerdere is nietig van rechtswege. Staat er 2 maanden in een tijdelijk contract van 12 maanden? Dan geldt er slechts 1 maand proeftijd.'],
                        ].map(([v, a], i) => (
                            <div key={i} className="border-t border-slate-200 pt-3 first:border-0 first:pt-0">
                                <p className="text-xs font-black text-slate-800 mb-1">{v}</p>
                                <p className="text-xs text-slate-600 leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
