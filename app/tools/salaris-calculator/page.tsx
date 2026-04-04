import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import SalarisCalculatorTool from "./SalarisCalculatorTool";

const cvIntentLinks = [
    {
        href: "/cv-aanmaken",
        label: "CV aanmaken zodra je weet welke salarisrange bij je markt past",
        description: "Gebruik je salarisindicatie om gerichter te solliciteren op rollen die echt binnen je doelniveau vallen.",
    },
    {
        href: "/gratis-cv-maken",
        label: "Gratis CV maken voor je volgende salarisstap",
        description: "Trek je marktsalaris door naar een sollicitatieversie zonder eerst te hoeven betalen.",
    },
    {
        href: "/cv-maken-template",
        label: "CV maken met een template voor een serieuzere salarisswitch",
        description: "Kies een rustige layout als je met marktdata, onderhandeling en recruitercontact serieuzer wilt sturen.",
    },
    {
        href: "/cv-maken-pdf",
        label: "CV maken en als PDF klaarzetten voor je volgende aanbod of gesprek",
        description: "Werk eerst online en rond pas af wanneer je sollicitatieversie helemaal klopt.",
    },
];

export const metadata: Metadata = {
    title: "Salaris Calculator Nederland 2026 - Wat Verdien Jij? | WerkCV",
    description: "Bereken je marktsalaris op basis van sector, ervaringsniveau en regio. Gratis salarisindicatie voor de Nederlandse arbeidsmarkt.",
    keywords: [
        "salaris calculator nederland",
        "salaris berekenen",
        "wat verdien ik",
        "salaris per sector",
        "salarisindicatie",
        "gemiddeld salaris nederland",
    ],
};

export default function SalarisCalculatorPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
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
                        Gratis tool
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Salaris calculator 2026
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Selecteer je sector, ervaringsniveau en regio voor een realistische salarisindicatie — gebaseerd op actuele marktdata.
                    </p>
                </div>

                <SalarisCalculatorTool />

                <div className="mt-10 space-y-6">
                    <h2 className="text-xl font-black text-slate-900">Salaris onderhandelen: zo pak je het aan</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        Weten wat je waard bent is de eerste stap. De tweede stap is het ook daadwerkelijk vragen. Meer dan 60% van de werknemers laat geld liggen door niet te onderhandelen.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                titel: 'Doe je huiswerk',
                                tekst: 'Gebruik deze calculator en vergelijk met Glassdoor, Intermediair en LinkedIn Salary Insights. Bewapend met data sta je sterk.',
                            },
                            {
                                titel: 'Noem een bandbreedte',
                                tekst: 'Geef een range van €5.000, niet één exact getal. Zo geef je speelruimte terwijl je ondergrens goed is.',
                            },
                            {
                                titel: 'Timing is alles',
                                tekst: 'Onderhandel na het aanbod, niet ervoor. Dan weet je zeker dat ze jou willen — en heb je de sterkste positie.',
                            },
                            {
                                titel: 'Denk breed',
                                tekst: 'Vakantiedagen, thuiswerken, opleidingsbudget en reiskostenvergoeding tellen ook mee. Onderhandel het totaalpakket.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white border-2 border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="font-black text-slate-900 text-sm mb-2">{item.titel}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.tekst}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <RelatedToolsSection
                    title="Verdiep je salarischeck"
                    description="Na een marktindicatie wil je meestal ook je uurloon, minimumgrens en vakantiegeld scherp hebben voordat je gaat onderhandelen."
                    tools={[
                        {
                            href: "/tools/netto-bruto-calculator",
                            title: "Netto bruto calculator",
                            description: "Zet je marktloon door naar een netto indicatie met 2026 belastingregels.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/vakantiegeld-berekenen",
                            title: "Vakantiegeld berekenen",
                            description: "Reken je bruto vakantiegeld uit op basis van salaris en opgebouwde maanden.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/uurloon-calculator",
                            title: "Uurloon calculator",
                            description: "Zet je maand- of jaarsalaris om naar een concreet bruto uurloon.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/minimumloon-checker",
                            title: "Minimumloon checker",
                            description: "Controleer of je uurloon boven de wettelijke ondergrens ligt.",
                            badge: "NL wetgeving",
                        },
                        {
                            href: "/tools/salaris-onderhandeling",
                            title: "Salaris onderhandeling",
                            description: "Gebruik je salarischeck direct in een script of e-mail.",
                            badge: "AI",
                        },
                    ]}
                />

                <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Van marktloon naar een sterker CV
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Gebruik je salarisindicatie om je volgende sollicitatiestap concreet te maken
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
                        Een salarischeck is vaak geen eindpunt maar een beslismoment. Gebruik die marktrange om je CV opnieuw te richten op rollen, niveaus en salarisbandes die beter bij je doel passen.
                    </p>
                    <SectionIntentLinks links={cvIntentLinks} locale="nl" />
                </section>
            </div>


            <Footer />
        </div>
    );
}
