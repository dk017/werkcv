import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import VakantiegeldTool from "./VakantiegeldTool";

const faqItems = [
    {
        question: "Hoeveel vakantiegeld krijg ik in Nederland?",
        answer: "In Nederland krijg je als werknemer meestal minimaal 8% vakantiegeld over je brutoloon. Cao of arbeidsovereenkomst kan een hoger percentage geven.",
    },
    {
        question: "Wanneer wordt vakantiegeld meestal uitbetaald?",
        answer: "Vakantiegeld wordt meestal in mei of juni uitbetaald. Je werkgever mag daarvan afwijken als dit in je contract of cao staat.",
    },
    {
        question: "Telt overwerk of provisie mee voor vakantiegeld?",
        answer: "Structureel loon zoals provisie of structurele toeslagen kan meetellen. Eenmalige beloningen en onkostenvergoedingen meestal niet. Controleer bij twijfel je cao of salarisafspraken.",
    },
    {
        question: "Is dit bedrag bruto of netto?",
        answer: "Deze tool rekent bruto. De netto uitbetaling hangt af van loonheffing en je persoonlijke situatie.",
    },
];

const cvIntentLinks = [
    {
        href: "/gratis-cv-maken",
        label: "Gratis CV maken als je rond vakantiegeld over een nieuwe baan nadenkt",
        description: "Gebruik je extra loonruimte of vergelijking direct als aanleiding voor een sterkere sollicitatie.",
    },
    {
        href: "/cv-aanmaken",
        label: "CV aanmaken voor een beter loon- of vakantiegeldpakket",
        description: "Werk snel een Nederlandse CV-versie uit zodra je weet welk aanbod je wilt verbeteren.",
    },
    {
        href: "/cv-maken-pdf",
        label: "CV maken als PDF voor snelle sollicitaties in drukke salarisperiodes",
        description: "Bouw je CV online en download daarna een nette versie voor directe versturing.",
    },
];

export const metadata: Metadata = {
    title: "Vakantiegeld Berekenen 2026 - Gratis Tool | WerkCV.nl",
    description: "Bereken snel je vakantiegeld voor 2026. Vul je bruto salaris en opgebouwde maanden in en zie direct je bruto indicatie volgens de Nederlandse basisregel van 8%.",
    keywords: [
        "vakantiegeld berekenen",
        "hoeveel vakantiegeld",
        "vakantiegeld 2026",
        "8 procent vakantiegeld",
        "bruto vakantiegeld berekenen",
        "vakantiegeld calculator",
    ],
};

export default function VakantiegeldBerekenenPage() {
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
                        { label: "Vakantiegeld berekenen", href: "/tools/vakantiegeld-berekenen" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                                Geld
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Bijgewerkt 11 maart 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Vakantiegeld berekenen
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Simpel, snel en bruikbaar. Deze tool rekent met de Nederlandse basisregel van minimaal 8% en laat direct zien wat je bruto vakantiegeld ongeveer is over de periode die je hebt opgebouwd.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Basisregel", "Minimaal 8%", "voor veel reguliere werknemers"],
                                ["Uitbetaling", "Mei of juni", "meestal, tenzij contract/cao anders zegt"],
                                ["Uitkomst", "Bruto indicatie", "netto hangt af van loonheffing"],
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
                            Waarom dit nuttig is
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>Veel mensen kennen de 8%-regel, maar niet welk loon precies meetelt.</p>
                            <p>WerkCV rekent met bruto loon in de opgebouwde periode plus optionele structurele extra componenten.</p>
                            <p>Daardoor krijg je een betere indicatie voor loonstrookcontrole, budgetplanning of salarisonderhandeling.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <VakantiegeldTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat telt meestal mee?
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Basis bruto salaris</li>
                            <li>Structurele overwerk- of ploegentoeslag als die loon vormen</li>
                            <li>Structurele provisie of commissie</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat telt meestal niet standaard mee?
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Eenmalige bonus of gratificatie</li>
                            <li>Onkostenvergoeding</li>
                            <li>Bedragen die in je cao of arbeidscontract expliciet anders zijn geregeld</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Meer salaris- en loonchecks"
                    description="Gebruik deze tools samen als je salaris, uurloon en minimumgrenzen in Nederland wilt controleren."
                    tools={[
                        {
                            href: "/tools/netto-bruto-calculator",
                            title: "Netto bruto calculator",
                            description: "Zie wat je brutoloon en vakantiegeld ongeveer netto betekenen in 2026.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/uurloon-calculator",
                            title: "Uurloon calculator",
                            description: "Reken je bruto maand- of jaarsalaris om naar een bruikbaar bruto uurloon.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/minimumloon-checker",
                            title: "Minimumloon checker",
                            description: "Controleer het wettelijke minimumuurloon per leeftijd in 2026.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/salaris-onderhandeling",
                            title: "Salaris onderhandeling",
                            description: "Zet je salarischeck om in een concreet script of e-mail.",
                            badge: "AI",
                        },
                    ]}
                />

                <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Van vakantiegeld naar nieuwe rol
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Gebruik je loonmoment om je volgende CV-versie klaar te zetten
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
                        Vakantiegeldvragen komen vaak samen met loonvergelijking, offerchecks
                        en het gevoel dat een nieuwe stap financieel slimmer is. Zet dat moment
                        meteen om in een CV dat je snel kunt gebruiken.
                    </p>
                    <SectionIntentLinks links={cvIntentLinks} locale="nl" />
                </section>

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over vakantiegeld
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
                            <a href="https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld/vraag-en-antwoord/hoe-hoog-is-mijn-vakantiegeld" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Rijksoverheid - Hoe hoog is mijn vakantiegeld?
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}

