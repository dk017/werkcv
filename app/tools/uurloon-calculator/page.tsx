import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import UurloonCalculatorTool from "./UurloonCalculatorTool";

const faqItems = [
    {
        question: "Hoe reken je je uurloon uit vanuit een maandsalaris?",
        answer: "Je rekent je bruto jaarsalaris uit, deelt dit door 52 weken en daarna door het aantal contracturen per week. Zo krijg je een bruto uurloon.",
    },
    {
        question: "Is dit bruto of netto uurloon?",
        answer: "Deze tool rekent bruto. Voor netto moet je rekening houden met loonheffing, premies en persoonlijke omstandigheden.",
    },
    {
        question: "Moet vakantiegeld in je uurloon zitten?",
        answer: "Dat hangt af van de vergelijking die je wilt maken. WerkCV laat zowel het uurloon zonder als met vakantiegeld zien, zodat je beide kunt gebruiken.",
    },
];

const cvIntentLinks = [
  {
    href: "/cv-aanmaken",
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

export const metadata: Metadata = {
    title: "Uurloon Calculator - Gratis Tool | WerkCV.nl",
    description: "Bereken snel je bruto uurloon vanuit je maand- of jaarsalaris. Inclusief vergelijking met uurloon mét vakantiegeld.",
    keywords: [
        "uurloon berekenen",
        "bruto uurloon berekenen",
        "uurloon calculator",
        "maandsalaris naar uurloon",
        "jaarsalaris naar uurloon",
    ],
};

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
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Uurloon calculator
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Gebruik deze tool als je wilt weten wat je bruto uurloon is vanuit je maand- of jaarsalaris. Handig voor salarisvergelijking, onderhandelingen en controle tegen het minimumloon.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                href="/editor"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
                            >
                                Maak gratis je CV
                            </Link>
                            <Link
                                href="/cv-maken-zonder-abonnement"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
                            >
                                Zonder abonnement
                            </Link>
                            <Link
                                href="/beste-cv-maker-nederland"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
                            >
                                Beste CV maker NL
                            </Link>
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
                        </ul>
                    </aside>
                </section>

                <section className="mb-12">
                    <UurloonCalculatorTool />
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
            </main>

            <Footer />
        </div>
    );
}
