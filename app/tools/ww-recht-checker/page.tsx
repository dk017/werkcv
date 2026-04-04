import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import WWRechtTool from "./WWRechtTool";

const faqItems = [
    {
        question: "Wanneer heb je meestal recht op WW?",
        answer: "Meestal als je als werknemer verzekerd was voor WW, genoeg uren verliest, in de laatste 36 weken minimaal 26 weken hebt gewerkt, beschikbaar bent voor werk en niet verwijtbaar werkloos bent geworden.",
    },
    {
        question: "Wat is de wekeneis voor WW?",
        answer: "De basisregel is dat je in de 36 weken voordat je werkloos werd minstens 26 weken moet hebben gewerkt.",
    },
    {
        question: "Kan ik WW krijgen als ik zelf ontslag neem?",
        answer: "Meestal niet. Bij vrijwillig ontslag ziet UWV dat vaak als verwijtbare werkloosheid, behalve in bijzondere situaties met een zwaarwegende reden.",
    },
    {
        question: "Geeft deze checker een definitief antwoord?",
        answer: "Nee. Deze tool geeft een sterke eerste indicatie. UWV beoordeelt je uiteindelijke recht op basis van je volledige arbeidsverleden, ontslagreden en persoonlijke situatie.",
    },
];

export const metadata: Metadata = {
    title: "WW Recht Checker - Gratis Tool | WerkCV",
    description: "Controleer snel of je waarschijnlijk recht hebt op WW. Inclusief urenverlies, wekeneis, beschikbaarheid en basischeck op verwijtbare werkloosheid.",
    keywords: [
        "ww recht checker",
        "heb ik recht op ww",
        "ww voorwaarden",
        "ww check",
        "wekeneis ww",
        "werkloosheidsuitkering check",
    ],
};

export default function WWRechtCheckerPage() {
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
                        { label: "WW recht checker", href: "/tools/ww-recht-checker" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                                NL wetgeving
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Bijgewerkt 11 maart 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            WW recht checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Gebruik deze snelle intake als je wilt weten of je waarschijnlijk aan de basisvoorwaarden voor WW voldoet. Geen juridisch rookgordijn, wel een heldere eerste check op urenverlies, arbeidsverleden en beschikbaarheid.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Wekeneis", "26 uit 36 weken", "basisvoorwaarde voor WW"],
                                ["Urenverlies", "5 uur of half", "afhankelijk van je oude werkweek"],
                                ["Beschikbaarheid", "Direct inzetbaar", "voor nieuw werk en sollicitatieplicht"],
                            ].map(([label, value, note]) => (
                                <div key={label} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">{label}</p>
                                    <p className="text-lg font-black text-slate-900">{value}</p>
                                    <p className="text-xs text-slate-500 mt-1">{note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Wat deze tool wel doet
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>Hij controleert de belangrijkste basisregels waarop veel mensen al vastlopen.</p>
                            <p>Hij maakt zichtbaar of het vooral om urenverlies, arbeidsverleden of verwijtbare werkloosheid gaat.</p>
                            <p>Hij is bedoeld als intake voor je volgende stap: WW-duur, contractcheck of nieuw werk.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <WWRechtTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Basisvoorwaarden die meestal tellen
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Je was werknemer in loondienst en verzekerd voor WW.</li>
                            <li>Je verliest genoeg werkuren: bij 10 uur of meer meestal minimaal 5 uur, daaronder minstens de helft.</li>
                            <li>Je hebt in de laatste 36 weken minimaal 26 weken gewerkt.</li>
                            <li>Je bent direct beschikbaar voor werk en kunt solliciteren.</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Situaties met extra risico
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Je hebt zelf ontslag genomen zonder zwaarwegende reden.</li>
                            <li>Het ontslag komt door verwijtbaar gedrag of dringende reden.</li>
                            <li>Je bent niet beschikbaar om direct weer te werken.</li>
                            <li>Je denkt uren te verliezen, maar valt niet onder de wettelijke urenverliesregel.</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Na je WW-check: dit wil je meestal ook weten"
                    description="WW-recht is meestal pas de eerste vraag. Daarna volgen de duur, vergoeding bij contracteinde en je volgende sollicitatiestap."
                    tools={[
                        {
                            href: "/tools/ww-duur-checker",
                            title: "WW duur checker",
                            description: "Schat hoe lang je WW ongeveer kan duren op basis van wekeneis en arbeidsverleden.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/aanzegvergoeding-checker",
                            title: "Aanzegvergoeding checker",
                            description: "Controleer of je werkgever te laat was met aanzeggen van een tijdelijk contract.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/transitievergoeding-berekenen",
                            title: "Transitievergoeding berekenen",
                            description: "Check of er ook een ontslagvergoeding in beeld komt.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/sollicitatiebrief-voorbeeld",
                            title: "Sollicitatiebrief voorbeelden",
                            description: "Pak direct door naar concrete voorbeelden voor je volgende sollicitatie.",
                            badge: "Sollicitatie",
                        },
                    ]}
                />

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over WW-recht
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
                        Bronnen
                    </p>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li>
                            <a href="https://www.rijksoverheid.nl/onderwerpen/ww-uitkering/vraag-en-antwoord/wanneer-heb-ik-recht-op-een-ww-uitkering" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Rijksoverheid - Wanneer heb ik recht op een WW-uitkering?
                            </a>
                        </li>
                        <li>
                            <a href="https://www.uwv.nl/nl/ww/wanneer-heb-ik-recht-op-ww" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                UWV - Wanneer heb ik recht op WW?
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
