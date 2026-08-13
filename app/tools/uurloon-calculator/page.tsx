import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import TrackedToolLink from "@/components/analytics/TrackedToolLink";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import UurloonCalculatorTool from "./UurloonCalculatorTool";

const faqItems = [
    {
        question: "Hoe reken je je uurloon uit vanuit een maandsalaris?",
        answer: "Je rekent je bruto jaarsalaris uit, deelt dit door 52 weken en daarna door het aantal contracturen per week. Zo krijg je een bruto uurloon.",
    },
    {
        question: "Hoe reken je uurloon naar maandloon om?",
        answer: "Vermenigvuldig je bruto uurloon met je uren per week en daarna met 52 weken per jaar. Deel dat jaarbedrag vervolgens door 12 om een bruto maandindicatie te krijgen.",
    },
    {
        question: "Is dit bruto of netto uurloon?",
        answer: "Deze tool rekent bruto. Voor netto moet je rekening houden met loonheffing, premies en persoonlijke omstandigheden.",
    },
    {
        question: "Moet vakantiegeld in je uurloon zitten?",
        answer: "Dat hangt af van de vergelijking die je wilt maken. WerkCV laat zowel het uurloon zonder als met vakantiegeld zien, zodat je beide kunt gebruiken.",
    },
    {
        question: "Met hoeveel uur per maand reken je bij een weekcontract?",
        answer: "Voor een gemiddelde maand gebruik je uren per week × 52 ÷ 12. Dat is ongeveer 156 uur bij 36 uur per week, 164,7 uur bij 38 uur en 173,3 uur bij 40 uur. Een echte kalendermaand kan afwijken.",
    },
    {
        question: "Is uurloon maal 160 hetzelfde als maandsalaris?",
        answer: "Alleen als je bewust met 160 betaalde uren rekent. Voor een vast weekcontract is uren per week × 52 ÷ 12 nauwkeuriger: bij 40 uur is dat gemiddeld 173,3 uur per maand, niet 160.",
    },
    {
        question: "Hoe vergelijk ik een uurloon inclusief vakantiegeld?",
        answer: "Vermenigvuldig het kale bruto uurloon met 1 plus het vakantiegeldpercentage. Bij €20 per uur en 8% vakantiegeld is dat €21,60 inclusief vakantiegeld. Controleer of andere toeslagen al in het aangeboden all-in loon zitten.",
    },
];

const cvIntentLinks = [
  {
    href: "/cv-maken",
    label: "CV aanmaken zodra je uurloon laat zien wat je volgende stap waard is",
    description: "Gebruik je uurlooncheck om gerichter te mikken op functies die beter betalen dan je huidige situatie.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    label: "CV maken zonder abonnement als je geen maandelijkse tool wilt voor een baanwissel",
    description: "Sterk voor bezoekers die wel direct willen bouwen, maar niet in een abonnementsmodel willen belanden.",
  },
  {
    href: "/beste-cv-maker-nederland",
    label: "Vergelijk eerst de beste CV makers in Nederland",
    description: "Handig als je salarissignalen al hebt en nu de juiste tool of prijslogica wilt kiezen.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV maken en als PDF klaarzetten voor je volgende aanbod",
    description: "Werk eerst online en rond pas af als je sollicitatieversie echt klaar is om te versturen.",
    },
];

export const metadata: Metadata = buildDutchMetadata({
    title: "Uurloon Berekenen 2026 — Maandloon naar Uurloon | WerkCV",
    description: "Bereken direct je bruto uurloon uit maandloon of jaarloon, of zet uurloon om naar maandloon. Met 36-, 38- en 40-urige werkweken en vakantiegeld.",
    path: "/tools/uurloon-calculator",
    keywords: [
        "uurloon berekenen",
        "bruto uurloon berekenen",
        "uurloon calculator",
        "maandsalaris naar uurloon",
        "jaarsalaris naar uurloon",
        "uurloon naar maandloon berekenen",
        "bereken uurloon naar maandloon",
        "netto uurloon uitrekenen",
        "bruto netto uurloon omrekenen",
        "bereken uurloon",
        "uurloon uitrekenen",
        "maandloon omrekenen naar uurloon",
        "uurloon naar maandsalaris",
        "uurloon berekenen 36 uur",
        "uurloon berekenen 38 uur",
        "uurloon berekenen 40 uur",
    ],
});

export default function UurloonCalculatorPage() {
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
                        { label: "Uurloon calculator", href: "/tools/uurloon-calculator" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                                Geld
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Gecontroleerd 12 augustus 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Uurloon berekenen uit maandloon of jaarsalaris
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Gebruik deze tool als je wilt weten wat je bruto uurloon is vanuit je maand- of jaarsalaris, of juist wat een uurloon betekent als bruto maandloon. Handig voor salarisvergelijking, onderhandelingen en controle tegen het minimumloon.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="#uurloon-calculator"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
                            >
                                Bereken mijn uurloon
                            </Link>
                            <TrackedToolLink
                                href="/editor?template=professional&startSource=uurloon_hero"
                                eventName="tool_to_cv_cta_click"
                                toolName="uurloon-calculator"
                                ctaIntent="salary"
                                trackingLocation="uurloon-calculator:hero_salary_to_cv"
                                trackingLabel="Maak CV voor beter betaalde functies"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
                            >
                                Maak CV voor beter betaalde functies
                            </TrackedToolLink>
                        </div>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Wanneer je dit gebruikt
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>Bij een nieuwe baan of salarisaanbod</li>
                            <li>Als je parttime en fulltime salarissen wilt vergelijken</li>
                            <li>Als je wilt checken hoe jouw loon zich verhoudt tot minimumloon of marktloon</li>
                            <li>Als je uurloon naar maandloon wilt omrekenen voor een concreet aanbod</li>
                        </ul>
                    </aside>
                </section>

                <section className="mb-8 border-4 border-black bg-[#FFF7E8] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-2xl font-black text-slate-900">Uurloon berekenen en omrekenen naar maandloon</h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        Je bruto uurloon bereken je door je bruto maandsalaris met 12 te vermenigvuldigen en te delen door 52 keer je wekelijkse uren. Bij €2.500 bruto per maand en 40 uur per week is dat (€2.500 × 12) ÷ (52 × 40) = <strong>€14,42 bruto per uur</strong>.
                    </p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <p className="border-2 border-black bg-white p-3 text-sm font-black text-slate-900">
                            Uurloon = (bruto maandloon × 12) ÷ (52 × uren per week)
                        </p>
                        <p className="border-2 border-black bg-white p-3 text-sm font-black text-slate-900">
                            Maandloon = uurloon × (52 × uren per week) ÷ 12
                        </p>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        De urennorm kan per cao verschillen. Gebruik daarom het aantal uren uit je eigen arbeidsovereenkomst.
                    </p>
                </section>

                <section id="uurloon-calculator" className="mb-12 scroll-mt-6">
                    <UurloonCalculatorTool />
                </section>

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Uurloon voorbeelden</p>
                    <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">Maandloon naar uurloon bij 36, 38 en 40 uur</h2>
                    <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">
                        Hetzelfde maandsalaris geeft een ander uurloon als de contractuele werkweek verschilt. Daarom is de urennorm uit je contract onmisbaar bij salarisvergelijking.
                    </p>
                    <div className="mt-5 overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b-2 border-black text-left">
                                    <th className="px-3 py-2">Bruto maandloon</th>
                                    <th className="px-3 py-2">36 uur</th>
                                    <th className="px-3 py-2">38 uur</th>
                                    <th className="px-3 py-2">40 uur</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ["€2.500", "€16,03", "€15,18", "€14,42"],
                                    ["€3.000", "€19,23", "€18,22", "€17,31"],
                                    ["€3.500", "€22,44", "€21,26", "€20,19"],
                                    ["€4.000", "€25,64", "€24,29", "€23,08"],
                                ].map((row) => (
                                    <tr key={row[0]} className="border-b border-slate-200">
                                        {row.map((cell, index) => (
                                            <td key={cell} className={`px-3 py-3 text-slate-700 ${index === 0 ? "font-black" : "font-medium"}`}>{cell}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-slate-600">
                        Formule: bruto maandloon × 12 ÷ (uren per week × 52). Bedragen zijn afgerond op twee decimalen en exclusief vakantiegeld.
                    </p>
                </section>

                <section className="mb-12 grid gap-6 lg:grid-cols-2">
                    <div className="border-2 border-black bg-[#E9FFFC] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900">Uurloon naar maandloon berekenen</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">
                            Vermenigvuldig je uurloon met je contracturen per week en met 52; deel daarna door 12. Bij €20 bruto per uur en 36 uur per week is de uitkomst €20 × 36 × 52 ÷ 12 = €3.120 bruto per gemiddelde maand.
                        </p>
                    </div>
                    <div className="border-2 border-black bg-[#FFF7D6] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900">Kaal uurloon, all-in loon of inclusief vakantiegeld?</h2>
                        <p className="mt-3 text-sm leading-relaxed text-slate-700">
                            Vergelijk aanbiedingen op dezelfde basis. Een all-in uurloon kan vakantiegeld, vakantie-uren of toeslagen bevatten; een kaal uurloon niet. De calculator toont vakantiegeld apart, maar je contract of loonstrook bepaalt welke componenten werkelijk zijn inbegrepen.
                        </p>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Combineer met deze salarischecks"
                    description="Uurloon is pas echt bruikbaar als je het naast minimumloon, vakantiegeld en marktloon legt."
                    tools={[
                        {
                            href: "/tools/netto-bruto-calculator",
                            title: "Netto bruto calculator",
                            description: "Vertaal je bruto uur- of maandloon direct naar een netto indicatie.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/minimumloon-checker",
                            title: "Minimumloon checker",
                            description: "Check direct het wettelijke minimum per leeftijd in 2026.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/vakantiegeld-berekenen",
                            title: "Vakantiegeld berekenen",
                            description: "Zie wat 8% vakantiegeld in jouw situatie ongeveer oplevert.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/salaris-onderhandeling",
                            title: "Salaris onderhandeling",
                            description: "Gebruik je uitkomst direct in een script of e-mail.",
                            badge: "AI",
                        },
                    ]}
                />

                <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Van uurloon naar sollicitatieactie
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Gebruik je uurlooncheck om je volgende baanstap concreet te maken
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
                        Wie uurloon vergelijkt, zit vaak midden in een aanbodcheck, onderhandeling of baanwissel. Trek dat moment door naar een CV dat past bij het niveau en type rol waar je nu op mikt.
                    </p>
                    <SectionIntentLinks links={cvIntentLinks} locale="nl" />
                </section>

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over uurloon
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

                <ToolToCvCTA
                    toolName="uurloon-calculator"
                    eyebrow="Volgende stap na je uurlooncheck"
                    title="Past je uurloon niet meer bij het werk dat je zoekt?"
                    description="Maak je Nederlandse cv zonder abonnement. Je bouwt gratis en betaalt alleen eenmalig wanneer je de PDF wilt downloaden."
                    primaryLabel="Werk mijn CV bij"
                    primaryHref="/editor?template=professional&startSource=uurloon_page"
                    secondaryHref="/cv-maken-zonder-abonnement?startSource=uurloon_no_subscription"
                    secondaryLabel="Hoe betalen werkt"
                    insightText="Gebruik je uurlooncheck als startpunt voor een nieuwe sollicitatie, aanbodvergelijking of salarisonderhandeling."
                    intent="salary"
                    resultState="uurloon_page_cta"
                />

                <section className="bg-slate-50 border-2 border-slate-200 p-6">
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Methodologie en bronnen</p>
                    <p className="text-sm leading-relaxed text-slate-600">
                        De calculator deelt het bruto jaarloon door 52 weken en de ingevoerde contracturen. Dat is een praktische contractvergelijking. Het CBS waarschuwt dat uurloonbegrippen kunnen verschillen doordat betaalde verlofuren, overwerk en bijzondere beloningen niet in iedere definitie hetzelfde worden behandeld.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600">
                        <li><a href="https://longreads.cbs.nl/dearbeidsmarktincijfers-2025/begrippen/" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">CBS - Uurloon en wekelijkse arbeidsduur</a></li>
                        <li><a href="https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">Rijksoverheid - Bedragen minimumloon 2026</a></li>
                        <li><Link href="/tools/vakantiegeld-berekenen" className="font-medium text-teal-700 hover:underline">WerkCV - Vakantiegeld apart berekenen</Link></li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}
