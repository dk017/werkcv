import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import OpzeggingsbriefTool from "./OpzeggingsbriefTool";

export const metadata: Metadata = {
    title: "Opzeggingsbrief Generator - Gratis Ontslagbrief | WerkCV",
    description: "Genereer in seconden een professionele opzeggingsbrief. Vul naam, werkgever en einddatum in en download je brief direct.",
    keywords: [
        "opzeggingsbrief",
        "opzeggingsbrief generator",
        "ontslagbrief",
        "ontslag brief",
        "opzegging schrijven",
        "opzeggingsbrief voorbeeld",
    ],
};

export default function OpzeggingsbriefGeneratorPage() {
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
                        Opzeggingsbrief generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je naam, werkgever en einddatum in. Ontvang direct een professionele, juridisch correcte opzeggingsbrief — klaar om te versturen.
                    </p>
                </div>

                <OpzeggingsbriefTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Hoe zeg je correct op?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Opzeggen doe je schriftelijk — een mondeling of per WhatsApp verstuurd ontslag is juridisch onzeker. Stuur de brief aangetekend of lever hem persoonlijk af en vraag een ontvangstbevestiging.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            ['Controleer je opzegtermijn', 'Als werknemer heb je doorgaans 1 maand opzegtermijn. Check je arbeidsovereenkomst of CAO.'],
                            ['Schrijf schriftelijk', 'Een opzegging per WhatsApp of mondelinge toezegging is juridisch onzeker. Altijd een brief of aangetekende email.'],
                            ['Houd het professioneel', 'Geen verwijten in de brief. Je werkt mogelijk nog samen of hebt een referentie nodig.'],
                            ['Vraag bevestiging', 'Stuur aangetekend of vraag een schriftelijke bevestiging van ontvangst. Bewaar dit goed.'],
                        ].map(([titel, tekst], i) => (
                            <div key={i} className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-black text-slate-900 text-sm mb-1.5">{titel}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{tekst}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <Link
                            href="/tools/opzegtermijn-berekenen"
                            className="bg-[#4ECDC4] text-slate-900 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-teal-900 mb-1">
                                Eerst checken
                            </p>
                            <p className="font-black text-lg mb-2">Bereken je opzegtermijn</p>
                            <p className="text-sm text-slate-800 leading-relaxed">
                                Handig als je nog niet zeker weet wat je laatste werkdag mag zijn.
                            </p>
                        </Link>
                        <Link
                            href="/tools/transitievergoeding-berekenen"
                            className="bg-white text-slate-900 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-emerald-700 mb-1">
                                Bij ontslag
                            </p>
                            <p className="font-black text-lg mb-2">Check je transitievergoeding</p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                Relevant als je contract eindigt op initiatief van je werkgever.
                            </p>
                        </Link>
                    </div>
                </div>

                <RelatedToolsSection
                    title="Controleer ook de juridische en financiële kant"
                    description="Een nette brief is pas stap één. Gebruik daarna deze checks om te zien of je nog rechten of vervolgstappen hebt."
                    tools={[
                        {
                            href: "/tools/aanzegvergoeding-checker",
                            title: "Aanzegvergoeding checker",
                            description: "Relevant bij tijdelijke contracten van 6 maanden of langer.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/ww-recht-checker",
                            title: "WW recht checker",
                            description: "Check of je waarschijnlijk aan de basisvoorwaarden voor WW voldoet.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/ww-duur-checker",
                            title: "WW duur checker",
                            description: "Schat de mogelijke duur van je WW-uitkering.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/editor",
                            title: "Maak je volgende CV",
                            description: "Ga direct door naar een nieuw CV voor je volgende sollicitatie.",
                            badge: "CV",
                        },
                    ]}
                />
            </div>

            <Footer />
        </div>
    );
}
