import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import WWDuurTool from "./WWDuurTool";

const faqItems = [
    {
        question: "Hoe lang duurt WW meestal?",
        answer: "De WW-duur loopt meestal van 3 tot maximaal 24 maanden. Alleen aan de wekeneis voldoen geeft vaak 3 maanden. Met voldoende arbeidsverleden kan de duur oplopen.",
    },
    {
        question: "Wat is de jareneis voor WW?",
        answer: "Voor een langere WW-duur geldt meestal dat je in minimaal 4 van de laatste 5 kalenderjaren over elk jaar ten minste 208 uur hebt gewerkt.",
    },
    {
        question: "Krijg ik meteen meer WW als ik langer dan 10 jaar heb gewerkt?",
        answer: "Niet automatisch. Eerst moet je aan de basisvoorwaarden voldoen. Pas daarna telt extra arbeidsverleden mee voor een langere duur.",
    },
];

export const metadata: Metadata = {
    title: "WW Duur Checker - Gratis Tool | WerkCV",
    description: "Bereken hoe lang je WW waarschijnlijk duurt. Inclusief basischeck op wekeneis, jareneis en extra duur bij langer arbeidsverleden.",
    keywords: [
        "ww duur checker",
        "hoe lang ww",
        "ww duur berekenen",
        "jareneis ww",
        "wekeneis ww duur",
    ],
};

export default function WWDuurCheckerPage() {
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
                        { label: "WW duur checker", href: "/tools/ww-duur-checker" },
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
                            WW duur checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Deze tool geeft een praktische indicatie van je WW-duur. Dat is vooral nuttig als je wilt plannen: hoeveel tijd heb je om nieuw werk te vinden en hoe hard moet je sollicitatiefunnel direct draaien?
                        </p>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            De logica in 3 regels
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>Zonder wekeneis geen WW-duur.</li>
                            <li>Met alleen wekeneis is 3 maanden het startpunt.</li>
                            <li>Met voldoende arbeidsverleden kan de duur oplopen tot maximaal 24 maanden.</li>
                        </ul>
                    </aside>
                </section>

                <section className="mb-12">
                    <WWDuurTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat betekent wekeneis?
                        </h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            De wekeneis is de eerste drempel. In de 36 weken voordat je werkloos wordt, moet je meestal in 26 weken hebben gewerkt. Haal je die niet, dan stopt de WW-berekening meestal direct.
                        </p>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat betekent jareneis?
                        </h2>
                        <p className="text-sm text-slate-700 leading-relaxed">
                            De jareneis bepaalt vooral of je langer dan 3 maanden WW kunt krijgen. Daarvoor telt je arbeidsverleden mee. Hoe langer dat verleden, hoe groter de kans op extra maanden bovenop het minimum.
                        </p>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Maak de WW-cluster compleet"
                    description="Met alleen duur ben je er niet. Check ook je recht, vergoeding bij contracteinde en je vervolgstap richting nieuw werk."
                    tools={[
                        {
                            href: "/tools/ww-recht-checker",
                            title: "WW recht checker",
                            description: "Controleer eerst of je aan de basisvoorwaarden voor WW voldoet.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/transitievergoeding-berekenen",
                            title: "Transitievergoeding berekenen",
                            description: "Bekijk of er ook nog een ontslagvergoeding hoort bij je situatie.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/opzegtermijn-berekenen",
                            title: "Opzegtermijn berekenen",
                            description: "Controleer welke termijn voor jou en je werkgever geldt.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/editor",
                            title: "Maak direct je CV",
                            description: "Gebruik je WW-plan meteen om snel een nieuw CV klaar te hebben.",
                            badge: "CV",
                        },
                    ]}
                />

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over WW-duur
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
                    <a href="https://www.rijksoverheid.nl/onderwerpen/ww-uitkering/vraag-en-antwoord/hoe-lang-heb-ik-recht-op-een-ww-uitkering" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                        Rijksoverheid - Hoe lang heb ik recht op een WW-uitkering?
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
}
