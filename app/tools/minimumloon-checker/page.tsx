import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import MinimumloonCheckerTool from "./MinimumloonCheckerTool";

const faqItems = [
    {
        question: "Wat is het minimumloon in 2026?",
        answer: "Vanaf 1 januari 2026 is het reguliere wettelijke minimumuurloon voor werknemers van 21 jaar en ouder 14,71 euro per uur. Voor jongere leeftijden gelden lagere staffels.",
    },
    {
        question: "Geldt dit ook voor BBL?",
        answer: "Nee, deze snelle checker gebruikt de reguliere minimumloonstaffel. Voor BBL kunnen andere bedragen gelden.",
    },
    {
        question: "Waarom rekent WerkCV in uurloon en niet maandloon?",
        answer: "Sinds de invoering van het minimumuurloon is het uurbedrag de meest bruikbare wettelijke basis. WerkCV rekent daaruit wel een week- en maandindicatie voor je uit.",
    },
];

export const metadata: Metadata = {
    title: "Minimumloon Checker 2026 - Gratis Tool | WerkCV.nl",
    description: "Controleer het wettelijke minimumloon per leeftijd in 2026. Inclusief vergelijking met je bruto uurloon en een maandindicatie op basis van je contracturen.",
    keywords: [
        "minimumloon checker",
        "minimumloon 2026",
        "minimumuurloon 2026",
        "minimumloon per leeftijd",
        "wettelijk minimumloon checken",
    ],
};

export default function MinimumloonCheckerPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <FAQJsonLd questions={faqItems} />

            <header className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

            <main className="max-w-6xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Tools", href: "/tools" },
                        { label: "Minimumloon checker", href: "/tools/minimumloon-checker" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                                NL wetgeving
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Minimumloon checker 2026
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Check in seconden het wettelijke minimumuurloon voor jouw leeftijdsgroep en vergelijk dit met je eigen bruto uurloon.
                        </p>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Handig voor
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>Scholieren, starters en parttimers</li>
                            <li>Looncontrole bij nieuw werk of contractwijziging</li>
                            <li>Snelle check tegen minimumuurloon vanaf 1 januari 2026</li>
                        </ul>
                    </aside>
                </section>

                <section className="mb-12">
                    <MinimumloonCheckerTool />
                </section>

                <RelatedToolsSection
                    title="Controleer je loon verder"
                    description="Na het minimumloon komen meestal uurloon, vakantiegeld en marktloon als volgende vragen."
                    tools={[
                        {
                            href: "/tools/netto-bruto-calculator",
                            title: "Netto bruto calculator",
                            description: "Controleer of je bruto loon ook netto logisch uitpakt op je loonstrook.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/uurloon-calculator",
                            title: "Uurloon calculator",
                            description: "Reken maand- of jaarsalaris door naar een bruto uurloon.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/vakantiegeld-berekenen",
                            title: "Vakantiegeld berekenen",
                            description: "Bereken wat je ongeveer aan vakantiegeld opbouwt.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/salaris-onderhandeling",
                            title: "Salaris onderhandeling",
                            description: "Gebruik je looncheck in een sterk script.",
                            badge: "AI",
                        },
                    ]}
                />

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over minimumloon
                        </h2>
                    </div>
                    <div className="bg-white border-2 border-black divide-y divide-slate-200">
                        {faqItems.map((item) => (
                            <div key={item.question} className="p-5">
                                <h3 className="font-black text-slate-900 mb-2">{item.question}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-slate-50 border-2 border-slate-200 p-6">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                        Bron
                    </p>
                    <a href="https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                        Rijksoverheid - Bedragen minimumloon 2026
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
}
