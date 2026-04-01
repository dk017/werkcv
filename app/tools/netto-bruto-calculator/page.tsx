import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import NettoBrutoTool from "./NettoBrutoTool";

const faqItems = [
    {
        question: "Hoe reken je bruto naar netto in 2026?",
        answer: "Je begint met je belastbaar jaarinkomen, past daarop de box 1-tarieven van 2026 toe en trekt vervolgens de relevante heffingskortingen af. Pas daarna kun je het bedrag terugverdelen naar een maandindicatie.",
    },
    {
        question: "Waarom wijkt mijn echte loonstrook soms af van deze tool?",
        answer: "Een echte loonstrook kan pensioenpremie, leaseauto, reiskosten, cao-afspraken, cafetariaregelingen of een andere toepassing van loonheffingskorting bevatten. Deze tool geeft daarom een sterke indicatie, geen exacte salarisstrook.",
    },
    {
        question: "Moet ik loonheffingskorting aanzetten?",
        answer: "Als deze werkgever de plek is waar je loonheffingskorting laat toepassen, meestal wel. Heb je meerdere werkgevers, dan wordt die korting doorgaans maar bij één werkgever toegepast.",
    },
    {
        question: "Telt vakantiegeld mee in bruto naar netto?",
        answer: "Ja, als je vakantiegeld ontvangt telt het mee in je belastbare jaarinkomen. WerkCV laat daarom apart zien wat het geschatte netto effect van vakantiegeld is.",
    },
];

const cvIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken zodra je weet welke salarisrange bij je past",
    description: "Gebruik je looninschatting om gerichter op functies te solliciteren die bij je doelbedrag horen.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    label: "CV maken zonder abonnement voor je volgende salarissprong",
    description: "Handig als je wel meteen wilt bouwen, maar niet in een doorlopend prijsmodel wilt stappen.",
  },
  {
    href: "/beste-cv-maker-nederland",
    label: "Vergelijk de beste CV makers in Nederland",
    description: "Gebruik deze stap als je je salarisdoel al scherper hebt en nu de juiste tool wilt kiezen.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met een template voor een nette salarisgedreven sollicitatie",
    description: "Kies een rustige layout als je met recruiter- en loonvergelijkingen serieuzer wilt solliciteren.",
  },
];

export const metadata: Metadata = {
    title: "Netto Bruto Calculator 2026 - Bruto Naar Netto & Netto Naar Bruto | WerkCV.nl",
    description: "Bereken bruto naar netto en netto naar bruto voor 2026. Inclusief loonheffingskorting, vakantiegeld en actuele Belastingdienst-tarieven als duidelijke indicatie voor loondienst.",
    keywords: [
        "netto bruto calculator",
        "bruto naar netto 2026",
        "netto naar bruto berekenen",
        "bruto netto salaris calculator",
        "loonheffingskorting calculator",
        "netto salaris berekenen",
    ],
};

export default function NettoBrutoCalculatorPage() {
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
                        { label: "Netto bruto calculator", href: "/tools/netto-bruto-calculator" },
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
                            Netto bruto calculator 2026
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Dit is de brede salaristool die nog ontbrak in WerkCV. Gebruik hem voor bruto naar netto, netto naar bruto, loonheffingskorting en vakantiegeld in één flow, zonder dat je direct vastloopt in verspreide belastingtabellen.
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

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Richting", "2 kanten op", "bruto → netto en netto → bruto"],
                                ["Basis", "Belastingdienst 2026", "box 1 tarieven + heffingskortingen"],
                                ["Output", "Maand + jaar", "inclusief netto effect van vakantiegeld"],
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
                            Waarom deze tool ertoe doet
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>Mensen zoeken zelden alleen naar een bruto salaris. Ze willen weten wat er echt overblijft.</p>
                            <p>Deze route verbindt loonoriëntatie, minimumloon, uurloon en salarisonderhandeling in één cluster.</p>
                            <p>Daarmee is dit niet alleen een traffic-tool, maar ook een salaris-intent hub die sterk in de WerkCV-funnel past.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-12">
                    <NettoBrutoTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat deze tool bewust wel meeneemt
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Officiële box 1-tarieven voor 2026</li>
                            <li>Algemene heffingskorting en arbeidskorting</li>
                            <li>Loonheffingskorting als praktische payroll-keuze</li>
                            <li>Vakantiegeld als onderdeel van het jaarinkomen</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat je nog steeds op je loonstrook moet controleren
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Pensioenpremie of andere werknemersinhoudingen</li>
                            <li>Leaseauto of andere bijtellingen / inhoudingen</li>
                            <li>Cao-afspraken, bonusstructuren of 13e maand</li>
                            <li>Situaties met meerdere werkgevers of zonder loonheffingskorting</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Gebruik deze salariscluster samen"
                    description="Netto-bruto wordt sterker als je het koppelt aan wettelijke ondergrenzen, uurloon, vakantiegeld en je onderhandelingspositie."
                    tools={[
                        {
                            href: "/tools/uurloon-calculator",
                            title: "Uurloon calculator",
                            description: "Zet je salaris om naar een bruikbaar uurloon voor vergelijking en aanbiedingen.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/vakantiegeld-berekenen",
                            title: "Vakantiegeld berekenen",
                            description: "Bekijk wat 8% of een afwijkend percentage bruto en netto ongeveer betekent.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/minimumloon-checker",
                            title: "Minimumloon checker",
                            description: "Controleer de wettelijke ondergrens per leeftijd in 2026.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/salaris-onderhandeling",
                            title: "Salaris onderhandeling",
                            description: "Gebruik je looninzichten direct in een script of e-mail naar je werkgever.",
                            badge: "AI",
                        },
                    ]}
                />

                <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Van salarischeck naar sollicitatieactie
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Gebruik je looninzicht om de volgende stap concreet te maken
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
                        Wie bruto en netto vergelijkt, zit vaak midden in een baanwissel,
                        offercheck of salarisgesprek. Trek dat moment door naar een CV dat
                        past bij het niveau en type rol waar je nu op mikt.
                    </p>
                    <SectionIntentLinks links={cvIntentLinks} locale="nl" />
                </section>

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over netto en bruto
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
                            <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/loonheffingen/content/tabellen-tarieven-en-bedragen-voor-de-loonheffingen" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Belastingdienst - Tabellen, tarieven en bedragen voor de loonheffingen
                            </a>
                        </li>
                        <li>
                            <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/werkgevers-en-uitkeringsinstanties/content/algemene-heffingskorting-2026" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Belastingdienst - Algemene heffingskorting 2026
                            </a>
                        </li>
                        <li>
                            <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/werkgevers-en-uitkeringsinstanties/content/arbeidskorting-2026" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Belastingdienst - Arbeidskorting 2026
                            </a>
                        </li>
                        <li>
                            <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/zorgverzekeringswet/content/bijdrage-zvw-2026" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Belastingdienst - Bijdrage Zvw 2026
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}

