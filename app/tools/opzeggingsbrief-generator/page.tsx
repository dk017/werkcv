import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { buildDutchMetadata } from "@/lib/page-metadata";
import OpzeggingsbriefTool from "./OpzeggingsbriefTool";

const faqItems = [
    {
        question: "Moet ik zelf ontslag schriftelijk indienen?",
        answer: "Ja. Rijksoverheid zegt dat je ontslag schriftelijk moet indienen. Vraag daarnaast om een schriftelijke bevestiging van ontvangst en einddatum, zodat daar later geen onduidelijkheid over ontstaat.",
    },
    {
        question: "Is de opzegtermijn voor een werknemer altijd één maand?",
        answer: "Nee. Bij een vast contract is één kalendermaand de wettelijke hoofdregel als geen andere geldige afspraak geldt, maar contract of cao kan afwijken. Een tijdelijk contract kan vaak alleen eerder worden opgezegd als een tussentijds opzegbeding is afgesproken.",
    },
    {
        question: "Krijg ik WW als ik zelf ontslag neem?",
        answer: "Waarschijnlijk niet. UWV adviseert de gevolgen vooraf goed te onderzoeken. Zelf ontslag nemen kent geen bedenktijd; bij ziekte of een onveilige situatie is juridisch advies vóór opzegging extra belangrijk.",
    },
    {
        question: "Is deze gegenereerde brief juridisch advies?",
        answer: "Nee. De generator maakt een nette conceptbrief op basis van je invoer, maar controleert je contract, cao, tijdelijke opzegmogelijkheid, opzegtermijn of uitkeringsgevolgen niet. Doe die controles vóór verzending.",
    },
];

export const metadata: Metadata = buildDutchMetadata({
    title: "Opzeggingsbrief Generator – Gratis Conceptbrief | WerkCV",
    description: "Maak gratis een nette concept-opzeggingsbrief. Controleer eerst contract, cao en opzegtermijn; vul daarna werkgever en beoogde einddatum in.",
    path: "/tools/opzeggingsbrief-generator",
    keywords: [
        "opzeggingsbrief",
        "opzeggingsbrief generator",
        "ontslagbrief",
        "ontslag brief",
        "opzegging schrijven",
        "opzeggingsbrief voorbeeld",
    ],
});

export default function OpzeggingsbriefGeneratorPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <FAQJsonLd questions={faqItems} />
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
                        Gratis conceptbrief
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Opzeggingsbrief generator
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je naam, werkgever en beoogde einddatum in. Je krijgt een nette conceptbrief die om bevestiging van ontvangst en einddatum vraagt. Controleer vóór verzending altijd je contract, cao en opzegtermijn.
                    </p>
                </div>

                <OpzeggingsbriefTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Controleer dit voordat je de brief verstuurt</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Rijksoverheid zegt dat je zelf ontslag schriftelijk moet indienen en je aan de afgesproken opzegtermijn moet houden. Kies een verzendwijze die je kunt aantonen en vraag je werkgever om ontvangst én de einddatum schriftelijk te bevestigen.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            ['Vast of tijdelijk contract?', 'Een tijdelijk contract kun je niet altijd tussentijds opzeggen. Zoek het opzegbeding op voordat je een datum noemt.'],
                            ['Controleer contract en cao', 'Bij een vast contract is 1 kalendermaand de hoofdregel zonder afwijkende afspraak. Contract of cao kan verschil maken.'],
                            ['Check de gevolgen', 'Zelf ontslag nemen betekent waarschijnlijk geen WW en kent volgens UWV geen bedenktijd. Vraag bij ziekte eerst advies.'],
                            ['Leg ontvangst en datum vast', 'Bewaar bewijs van verzending en vraag je werkgever de ontvangst en definitieve einddatum schriftelijk te bevestigen.'],
                        ].map(([titel, tekst], i) => (
                            <div key={i} className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-black text-slate-900 text-sm mb-1.5">{titel}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{tekst}</p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                        <Link
                            href="/baan-wisselen"
                            className="bg-[#FFF4D6] text-slate-900 border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                        >
                            <p className="text-xs font-black uppercase tracking-wide text-amber-700 mb-1">
                                Overstappen
                            </p>
                            <p className="font-black text-lg mb-2">Bekijk de baan-wisselen checklist</p>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Handig als je naast je brief ook je opzegtermijn, motivatiebrief en cv wilt meenemen.
                            </p>
                        </Link>
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

                <section className="mt-12 border-4 border-black bg-[#E9FBF8] p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="text-2xl font-black text-slate-900">Officiële bronnen</h2>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">Gecontroleerd op 12 augustus 2026. Persoonlijke contracten en cao&apos;s kunnen afwijken.</p>
                    <ul className="mt-5 space-y-4 text-sm">
                        <li>
                            <a href="https://www.rijksoverheid.nl/vraag-en-antwoord/ontslag/hoe-kan-ik-ontslag-nemen" target="_blank" rel="noopener noreferrer" className="font-black text-black underline decoration-2 underline-offset-4">Rijksoverheid: Hoe kan ik ontslag nemen?</a>
                            <p className="mt-1 text-slate-600">Schriftelijk opzeggen, tijdelijke contracten en gevolgen van een onjuiste opzegtermijn.</p>
                        </li>
                        <li>
                            <a href="https://www.rijksoverheid.nl/vraag-en-antwoord/ontslag/ontslag-nemen-opzegtermijn-werknemer" target="_blank" rel="noopener noreferrer" className="font-black text-black underline decoration-2 underline-offset-4">Rijksoverheid: opzegtermijn werknemer</a>
                            <p className="mt-1 text-slate-600">Kalendermaand, afwijkende afspraken, proeftijd en tussentijds opzeggen bij een tijdelijk contract.</p>
                        </li>
                        <li>
                            <a href="https://www.uwv.nl/nl/ontslag/zelf-ontslag-nemen" target="_blank" rel="noopener noreferrer" className="font-black text-black underline decoration-2 underline-offset-4">UWV: Waar u aan moet denken als u zelf ontslag neemt</a>
                            <p className="mt-1 text-slate-600">Waarschuwingen over WW, ziekte, tijdelijke contracten en het ontbreken van bedenktijd.</p>
                        </li>
                    </ul>
                </section>

                <section className="mt-12 mb-12">
                    <h2 className="text-2xl font-black text-slate-900">Veelgestelde vragen</h2>
                    <div className="mt-5 space-y-4">
                        {faqItems.map((faq) => (
                            <details key={faq.question} className="border-2 border-black bg-white p-5">
                                <summary className="cursor-pointer list-none font-black text-slate-900">{faq.question}</summary>
                                <p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <RelatedToolsSection
                    title="Regel ook de stappen rond je vertrek"
                    description="Een nette brief is pas stap één. Controleer je termijn, breng verlof in kaart en plan je overdracht en volgende sollicitatie."
                    tools={[
                        {
                            href: "/tools/opzegtermijn-berekenen",
                            title: "Opzegtermijn berekenen",
                            description: "Controleer eerst de hoofdregel en vergelijk die met je contract en cao.",
                            badge: "Eerst doen",
                        },
                        {
                            href: "/baan-wisselen",
                            title: "Baan wisselen checklist",
                            description: "Plan overdracht, administratie, nieuwe baan en cv-update in de juiste volgorde.",
                            badge: "Workflow",
                        },
                        {
                            href: "/tools/vakantiedagen-berekenen",
                            title: "Vakantiedagen berekenen",
                            description: "Breng resterende verlofuren in kaart en bespreek de afwikkeling met je werkgever.",
                            badge: "Verlof",
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
