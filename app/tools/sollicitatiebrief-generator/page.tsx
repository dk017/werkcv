import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import SollicitatiebriefTool from "./SollicitatiebriefTool";

export const metadata: Metadata = buildDutchMetadata({
    title: "Sollicitatiebrief Generator 2026 | Gratis Brief Maken | WerkCV",
    description: "Maak gratis een eerste sollicitatiebrief op basis van vacature-eisen en jouw controleerbare ervaring. Pas de brief daarna aan in je eigen stem.",
    path: "/tools/sollicitatiebrief-generator",
    keywords: [
        "sollicitatiebrief schrijven",
        "sollicitatiebrief generator",
        "motivatiebrief",
        "sollicitatiebrief ai",
        "gratis sollicitatiebrief",
        "motivatiebrief generator",
    ],
});

const faqItems = [
    {
        question: "Kan ik de gegenereerde sollicitatiebrief direct versturen?",
        answer: "Gebruik de brief als eerste versie. Controleer alle feiten, de aanhef, de aansluiting op de vacature en of de tekst echt als jouw eigen stem klinkt voordat je hem verstuurt.",
    },
    {
        question: "Moet ik de hele vacaturetekst plakken?",
        answer: "Dat hoeft niet, maar de belangrijkste taken, eisen en vaardigheden helpen de generator om jouw bewijs aan de juiste vacaturepunten te koppelen. Verwijder namen, e-mailadressen en andere gegevens die niet nodig zijn.",
    },
    {
        question: "Verzint de generator informatie over mij of het bedrijf?",
        answer: "De generator krijgt de instructie om uitsluitend jouw invoer te gebruiken en ontbrekende feiten niet in te vullen. AI kan toch fouten maken; daarom moet je elke claim zelf controleren.",
    },
    {
        question: "Welke informatie kan ik beter niet invullen?",
        answer: "Plak geen BSN, medische gegevens, privégegevens van klanten of andere vertrouwelijke informatie. Deel alleen informatie die nodig is om de brief te schrijven.",
    },
    {
        question: "Hoe lang wordt de sollicitatiebrief?",
        answer: "De normale versies mikken op ongeveer 180 tot 240 woorden; de beknopte toon op ongeveer 140 tot 190 woorden. Volg altijd de instructies in de vacature als daar een andere lengte of vorm wordt gevraagd.",
    },
] as const;

export default function SollicitatiebriefGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <FAQJsonLd questions={[...faqItems]} />
            <JsonLd
                data={{
                    "@context": "https://schema.org",
                    "@type": "WebApplication",
                    name: "WerkCV sollicitatiebrief generator",
                    url: "https://werkcv.nl/tools/sollicitatiebrief-generator",
                    applicationCategory: "BusinessApplication",
                    operatingSystem: "Web",
                    inLanguage: ["nl-NL", "en"],
                    offers: {
                        "@type": "Offer",
                        price: "0",
                        priceCurrency: "EUR",
                    },
                }}
            />
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
                        Sollicitatiebrief generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Plak de vacature, voeg jouw controleerbare bewijs toe en krijg een gerichte eerste versie. Controleer en herschrijf hem daarna in je eigen stem.
                    </p>
                    <p className="mt-3 text-sm font-bold text-slate-700">
                        Liever eerst inspiratie?{" "}
                        <Link href="/sollicitatiebrief-maken" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk de centrale briefhub
                        </Link>
                        {" "}of{" "}
                        <Link href="/sollicitatiebrief-voorbeeld" className="underline decoration-2 underline-offset-2 text-slate-900">
                            Bekijk sollicitatiebrief voorbeelden
                        </Link>
                        {" "}of lees hoe je een{" "}
                        <Link href="/motivatiebrief-schrijven" className="underline decoration-2 underline-offset-2 text-slate-900">
                            motivatiebrief schrijft
                        </Link>
                        .
                    </p>
                </div>

                <div id="brief-generator" className="scroll-mt-24">
                    <Suspense
                        fallback={(
                            <div className="border-4 border-black bg-white p-8 text-sm font-bold text-slate-600 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                Generator laden…
                            </div>
                        )}
                    >
                        <SollicitatiebriefTool />
                    </Suspense>
                </div>

                <section className="mt-8 rounded-2xl border-2 border-slate-200 bg-white p-5">
                    <h2 className="text-lg font-black text-slate-900">Meer briefhulp</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Gebruik deze gidsen als je niet vastloopt op de hele brief, maar op een specifiek onderdeel zoals de opening, een starteraanpak of een open sollicitatie.
                    </p>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            ["/baan-wisselen", "Baan wisselen", "Handig als je brief, ontslagstappen en cv-update in een logische overstaproute wilt zetten."],
                            ["/sollicitatiebrief-maken", "Briefhub", "Start hier als je nog moet kiezen tussen workflow, voorbeelden en specialistische routes."],
                            ["/sollicitatiebrief-beginnen", "Sterke openingszinnen", "Voor als je eerste alinea vlak of generiek voelt."],
                            ["/motivatiebrief-zonder-werkervaring", "Zonder werkervaring", "Gebruik studie, stage en projecten als geloofwaardig bewijs."],
                            ["/open-sollicitatie-brief", "Open sollicitatie", "Schrijf een gerichte brief zonder bestaande vacature."],
                        ].map(([href, title, body]) => (
                            <Link
                                key={href}
                                href={href}
                                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-slate-300 hover:bg-slate-100"
                            >
                                <p className="text-sm font-black text-slate-900">{title}</p>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">{body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Wat maakt een goede sollicitatiebrief?</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Een sterke sollicitatiebrief herhaalt je CV niet, maar koppelt relevante ervaring aan de functie en legt uit waarom je solliciteert. Gebruik concrete voorbeelden die je zelf kunt onderbouwen.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">Structuur van een sterke sollicitatiebrief</h3>
                        <ol className="space-y-2">
                            {[
                                ['Opening', 'Pakkende zin die direct je motivatie laat zien — geen "Hierbij solliciteer ik".'],
                                ['Meerwaarde', 'Wat breng jij mee? Noem 1-2 concrete prestaties of vaardigheden die aansluiten op de vacature.'],
                                ['Fit met rol of organisatie', 'Leg je echte reden uit. Noem alleen organisatiefeiten die je zelf hebt gecontroleerd.'],
                                ['Afsluiting', 'Nodig uit voor een gesprek. Zelfverzekerd en concreet.'],
                            ].map(([stap, uitleg], i) => (
                                <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#4ECDC4] border border-teal-400 flex items-center justify-center text-[10px] font-black text-slate-900">{i + 1}</span>
                                    <span><strong className="text-slate-900">{stap}:</strong> {uitleg}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>

                <section className="mt-10 border-t-2 border-slate-200 pt-8">
                    <h2 className="text-xl font-black text-slate-900">Veelgestelde vragen</h2>
                    <div className="mt-4 space-y-3">
                        {faqItems.map((item) => (
                            <details key={item.question} className="group rounded-xl border border-slate-200 bg-white p-4">
                                <summary className="cursor-pointer list-none pr-6 text-sm font-black text-slate-900">
                                    {item.question}
                                </summary>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h2 className="text-base font-black text-slate-900">Bronnen voor de schrijfrichtlijnen</h2>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">
                        De generator en controlelijst volgen advies van Nederlandse loopbaan- en taalbronnen. AI blijft een hulpmiddel: UWV adviseert om zelf de regie te houden en gegenereerde informatie te controleren.
                    </p>
                    <ul className="mt-3 space-y-2 text-sm font-bold">
                        <li>
                            <a href="https://www.fnv.nl/werk-inkomen/loopbaan/sollicitatiebrief" rel="noreferrer" target="_blank" className="text-teal-800 underline decoration-2 underline-offset-2">
                                FNV — een sollicitatiebrief schrijven
                            </a>
                        </li>
                        <li>
                            <a href="https://inspiratie.uwv.nl/motivatiebrief-maken-met-chatgpt" rel="noreferrer" target="_blank" className="text-teal-800 underline decoration-2 underline-offset-2">
                                UWV — motivatiebrief maken met AI
                            </a>
                        </li>
                        <li>
                            <a href="https://taalwinkel.uva.nl/tekstsoorten/motivatiebrief-en-cv/motivatiebrief/motivatiebrief.html" rel="noreferrer" target="_blank" className="text-teal-800 underline decoration-2 underline-offset-2">
                                UvA Taalwinkel — motivatiebrief
                            </a>
                        </li>
                    </ul>
                </section>

                <ToolToCvCTA
                    toolName="sollicitatiebrief-generator"
                    eyebrow="Bijpassende CV-PDF"
                    title="Maak ook de CV die bij je brief past"
                    description="Als je hier een sollicitatiebrief maakt, ben je al bezig met een concrete vacature. Zorg dat je CV dezelfde rol, toon en bewijzen laat zien."
                    primaryLabel="Maak de CV die bij deze brief past"
                    secondaryHref="/cv-maken-zonder-abonnement"
                    secondaryLabel="Bekijk hoe betalen werkt"
                    intent="cover_letter"
                    insightText="Start gratis in de editor, kies een rustige Nederlandse template en betaal pas €4,99 als je de PDF echt wilt downloaden."
                    proofItems={["Brief en CV sluiten beter op elkaar aan", "Gratis bewerken voor betaling", "Eenmalig €4,99", "Geen abonnement"]}
                />
            </div>

            <Footer />
        </div>
    );
}
