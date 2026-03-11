import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import AanzegvergoedingTool from "./AanzegvergoedingTool";

const faqItems = [
    {
        question: "Wat is aanzegvergoeding?",
        answer: "Aanzegvergoeding is een vergoeding die een werkgever kan moeten betalen als een tijdelijk contract van 6 maanden of langer te laat of helemaal niet schriftelijk wordt aangezegd.",
    },
    {
        question: "Wanneer geldt de aanzegplicht niet?",
        answer: "De aanzegplicht geldt meestal niet bij tijdelijke contracten korter dan 6 maanden, zonder vaste einddatum of bij vervanging van een zieke werknemer.",
    },
    {
        question: "Hoe hoog kan aanzegvergoeding zijn?",
        answer: "Maximaal 1 bruto maandsalaris. Bij te late aanzegging wordt meestal naar rato gerekend over de vertraging.",
    },
];

export const metadata: Metadata = {
    title: "Aanzegvergoeding Checker - Gratis Tool | WerkCV.nl",
    description: "Controleer snel of je mogelijk recht hebt op aanzegvergoeding bij een tijdelijk contract. Inclusief uiterste aanzegdatum en indicatie van de vergoeding.",
    keywords: [
        "aanzegvergoeding checker",
        "aanzegvergoeding berekenen",
        "aanzegplicht tijdelijk contract",
        "te laat aangezegd contract",
        "vergoeding bij niet verlengen contract",
    ],
};

export default function AanzegvergoedingCheckerPage() {
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
                        { label: "Aanzegvergoeding checker", href: "/tools/aanzegvergoeding-checker" },
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
                            Aanzegvergoeding checker
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Tijdelijke contracten worden vaak te laat of te vaag aangezegd. Deze tool laat direct zien of de aanzegplicht waarschijnlijk geldt, wat de deadline was en welke vergoeding ongeveer in beeld komt.
                        </p>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Dit doet de tool
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>Checkt of de aanzegplicht waarschijnlijk van toepassing is</li>
                            <li>Berekt de uiterste datum voor schriftelijke aanzegging</li>
                            <li>Geeft een bruto indicatie van de mogelijke vergoeding</li>
                        </ul>
                    </aside>
                </section>

                <section className="mb-12">
                    <AanzegvergoedingTool />
                </section>

                <RelatedToolsSection
                    title="Sterke vervolgstappen bij contracteinde"
                    description="Aanzegvergoeding staat zelden op zichzelf. Combineer het met opzegtermijn, transitievergoeding en je volgende sollicitatiestap."
                    tools={[
                        {
                            href: "/tools/opzegtermijn-berekenen",
                            title: "Opzegtermijn berekenen",
                            description: "Check wat de wettelijke opzegtermijn is voor werknemer en werkgever.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/transitievergoeding-berekenen",
                            title: "Transitievergoeding berekenen",
                            description: "Controleer of ook een ontslagvergoeding in beeld komt.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/opzeggingsbrief-generator",
                            title: "Opzeggingsbrief generator",
                            description: "Regel je vertrek schriftelijk en professioneel.",
                            badge: "AI",
                        },
                        {
                            href: "/tools/ww-recht-checker",
                            title: "WW recht checker",
                            description: "Check snel de basisvoorwaarden voor WW na einde dienstverband.",
                            badge: "NL wetgeving",
                        },
                    ]}
                />

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over aanzegvergoeding
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
                    <a href="https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao/vraag-en-antwoord/wat-is-een-aanzegtermijn" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                        Rijksoverheid - Wat is een aanzegtermijn?
                    </a>
                </section>
            </main>

            <Footer />
        </div>
    );
}
