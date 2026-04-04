import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TransitievergoedingTool from "./TransitievergoedingTool";

const faqItems = [
    {
        question: "Wanneer heb ik recht op transitievergoeding?",
        answer: "Je hebt meestal recht als het initiatief om de arbeidsovereenkomst te beeindigen of niet voort te zetten bij de werkgever ligt. Dat geldt ook bij veel tijdelijke contracten die niet worden verlengd. Bij vrijwillig ontslag meestal niet, behalve bij ernstig verwijtbaar handelen van de werkgever.",
    },
    {
        question: "Welke looncomponenten telt deze tool mee?",
        answer: "De tool telt je basis bruto maandsalaris mee, plus vakantiegeld, 1/12 van een vaste eindejaarsuitkering en optioneel structurele variabele componenten zoals bonus, provisie, ploegentoeslag of overwerkvergoeding.",
    },
    {
        question: "Geldt in 2026 een maximum voor transitievergoeding?",
        answer: "Ja. Per 1 januari 2026 is de wettelijke grens EUR 102.000 bruto. Verdien je bruto jaarsalaris meer dan dat bedrag, dan geldt maximaal 1 bruto jaarsalaris.",
    },
    {
        question: "Is deze tool exact hetzelfde als de officiele rekenhulp?",
        answer: "Nee. Deze tool geeft een sterke indicatie, maar bij wisselende uren, cao-vervangende voorzieningen, inhoudingen of juridische uitzonderingen kan de officiele uitkomst anders zijn. Gebruik loonstroken en contractdocumenten voor de definitieve claim.",
    },
];

const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tools", href: "/tools" },
    { label: "Transitievergoeding berekenen", href: "/tools/transitievergoeding-berekenen" },
];

export const metadata: Metadata = {
    title: "Transitievergoeding Berekenen 2026 - Gratis Tool | WerkCV",
    description: "Bereken je transitievergoeding voor 2026. Check eerst of je waarschijnlijk recht hebt, tel vaste looncomponenten mee en zie direct een duidelijke indicatie.",
    keywords: [
        "transitievergoeding berekenen",
        "transitievergoeding 2026",
        "heb ik recht op transitievergoeding",
        "ontslagvergoeding berekenen",
        "tijdelijk contract niet verlengd vergoeding",
        "transitievergoeding ontslag",
    ],
};

export default function TransitievergoedingPage() {
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
                    <Breadcrumbs items={breadcrumbItems} />
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
                            Transitievergoeding berekenen in 2026
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Geen oppervlakkige schatting. Deze tool begint met de vraag of je waarschijnlijk recht hebt, telt de belangrijkste looncomponenten mee en zet daarna de berekening helder uiteen.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                {
                                    label: "Regel",
                                    value: "1/3 maandloon",
                                    note: "per dienstjaar vanaf dag 1",
                                },
                                {
                                    label: "Maximum 2026",
                                    value: "EUR 102.000",
                                    note: "of 1 bruto jaarsalaris",
                                },
                                {
                                    label: "Meegeteld",
                                    value: "Vakantiegeld + bonus",
                                    note: "plus variabele componenten",
                                },
                            ].map((item) => (
                                <div key={item.label} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">{item.label}</p>
                                    <p className="text-lg font-black text-slate-900">{item.value}</p>
                                    <p className="text-xs text-slate-500 mt-1">{item.note}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Waarom deze tool beter is dan een losse formule
                        </p>
                        <div className="space-y-3">
                            {[
                                "Eerst recht-check, daarna pas bedrag.",
                                "Rekent vakantiegeld, vaste eindejaarsuitkering en variabel loon mee.",
                                "Laat direct zien waar het wettelijke maximum ingrijpt.",
                                "Gemaakt voor Nederlandse werknemers, contracten en ontslagsituaties.",
                            ].map((item) => (
                                <div key={item} className="flex gap-3">
                                    <span className="text-teal-600 font-black">→</span>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <TransitievergoedingTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wanneer heb je meestal wel recht?
                        </h2>
                        <div className="space-y-3">
                            {[
                                "Je werkgever zegt het contract op of laat het ontbinden.",
                                "Je tijdelijke contract wordt niet verlengd.",
                                "Je neemt zelf ontslag omdat je werkgever ernstig verwijtbaar handelt.",
                                "Je bent nog maar kort in dienst; sinds 2020 bouw je vanaf dag 1 op.",
                            ].map((item) => (
                                <div key={item} className="flex gap-3">
                                    <span className="text-emerald-600 font-black">+</span>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wanneer meestal niet?
                        </h2>
                        <div className="space-y-3">
                            {[
                                "Je neemt vrijwillig zelf ontslag zonder bijzondere reden.",
                                "Je wordt ontslagen door ernstig verwijtbaar eigen handelen.",
                                "Je bent nog geen 18 en werkt gemiddeld hooguit 12 uur per week.",
                                "Je werkgever is failliet of heeft surseance / WSNP.",
                                "Je werkgever bood tijdig een gelijkwaardig nieuw contract of verlenging aan.",
                            ].map((item) => (
                                <div key={item} className="flex gap-3">
                                    <span className="text-amber-600 font-black">-</span>
                                    <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Opbouw van het maandloon
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Welke bedragen moet je wel en niet meenemen?
                        </h2>
                        <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
                            Veel calculators missen precies dit onderdeel. De vergoeding hangt niet alleen af van je kale maandsalaris, maar ook van structurele looncomponenten.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 border-2 border-emerald-300 p-5">
                            <h3 className="font-black text-slate-900 mb-3">Wel meenemen</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>Basis bruto maandsalaris of gemiddeld bruto maandloon</li>
                                <li>Vakantiegeld</li>
                                <li>1/12 van een vaste eindejaarsuitkering</li>
                                <li>Ploegentoeslag, bonus, provisie, winstuitkering of overwerk als dit structureel is</li>
                            </ul>
                        </div>

                        <div className="bg-slate-50 border-2 border-slate-300 p-5">
                            <h3 className="font-black text-slate-900 mb-3">Niet blind meenemen</h3>
                            <ul className="space-y-2 text-sm text-slate-700">
                                <li>Incidentele onkostenvergoedingen</li>
                                <li>Werkgeversbijdragen die geen loon zijn</li>
                                <li>Bedragen die alleen eenmalig en niet structureel zijn uitgekeerd</li>
                                <li>Eventuele kosten die juridisch in mindering mogen worden gebracht zonder dit eerst te controleren</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            Voorbeelden
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Drie snelle scenario&apos;s
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            {
                                title: "Tijdelijk contract stopt na 2 jaar",
                                amount: "EUR 2.304",
                                detail: "Bruto maandsalaris EUR 3.200 + 8% vakantiegeld, zonder extra componenten.",
                            },
                            {
                                title: "6 jaar en 6 maanden in dienst",
                                amount: "EUR 10.027",
                                detail: "Bruto maandsalaris EUR 4.100 + 8% vakantiegeld + EUR 2.400 vaste bonus per jaar.",
                            },
                            {
                                title: "11 maanden met variabel loon",
                                amount: "EUR 970",
                                detail: "Bruto maandsalaris EUR 2.800 + 8% vakantiegeld + EUR 150 structureel variabel loon per maand.",
                            },
                        ].map((example) => (
                            <div key={example.title} className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-2">
                                    Scenario
                                </p>
                                <h3 className="font-black text-slate-900 text-lg mb-2">{example.title}</h3>
                                <p className="text-2xl font-black text-teal-700 mb-2">{example.amount}</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{example.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mb-12 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3">
                                Klaar voor je volgende stap?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                                Ontslag of contracteinde is vaak ook het moment om je CV, Engelse functietitel of sollicitatiebrief opnieuw strak neer te zetten.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/tools/opzegtermijn-berekenen"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-white hover:bg-teal-300 transition-colors"
                            >
                                Check je opzegtermijn
                            </Link>
                            <Link
                                href="/editor"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-black text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
                            >
                                Maak gratis je CV
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over transitievergoeding
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
                        Bronnen en scope
                    </p>
                    <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                        <p>
                            Deze pagina is bijgewerkt op <span className="font-black text-slate-900">11 maart 2026</span> op basis van actuele informatie van de Rijksoverheid over recht op transitievergoeding, de berekening en het maximum van 2026.
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <a
                                    href="https://www.rijksoverheid.nl/onderwerpen/ontslag/vraag-en-antwoord/heb-ik-recht-op-een-vergoeding-als-ik-word-ontslagen"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-teal-700 hover:underline"
                                >
                                    Rijksoverheid - Heb ik recht op een vergoeding als ik word ontslagen?
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.rijksoverheid.nl/onderwerpen/ontslag/vraag-en-antwoord/hoe-hoog-is-de-transitievergoeding-als-ik-word-ontslagen"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-medium text-teal-700 hover:underline"
                                >
                                    Rijksoverheid - Hoe hoog is de transitievergoeding als ik word ontslagen?
                                </a>
                            </li>
                        </ul>
                        <p>
                            Deze tool geeft een indicatie. Bij complexe dossiers, sterk wisselende uren, inhoudingen of discussie over de ontslaggrond hoort een definitieve berekening thuis bij de officiele rekenhulp of juridisch advies.
                        </p>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
