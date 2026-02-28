import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "15 Gratis CV & Carrière Tools | WerkCV.nl",
    description: "15 gratis tools voor je sollicitatie en carrière: ATS checker, salaris berekenen, sollicitatiegesprek oefenen, cv-vacature match, salarisonderhandeling en meer.",
    keywords: [
        "cv tools gratis",
        "salaris calculator",
        "proeftijd checker",
        "sollicitatiegesprek voorbereiding",
        "cv vacature match",
        "salarisonderhandeling",
        "functietitel vertaler",
        "carrièreswitch",
    ],
};

const tools = [
    {
        href: "/tools/ats-cv-checker",
        title: "ATS CV checker",
        description: "Upload je CV en ontvang direct je ATS-score met 16 concrete verbeterpunten.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/profieltekst-generator",
        title: "Profieltekst generator",
        description: "Genereer een overtuigende profieltekst voor bovenaan je CV.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/werkervaring-bullets",
        title: "Werkervaring bullets",
        description: "Zet je werkzaamheden om in krachtige CV-bullets die opvallen.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/sollicitatiebrief-generator",
        title: "Sollicitatiebrief generator",
        description: "Schrijf een sterke, persoonlijke sollicitatiebrief met AI-hulp.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/opzeggingsbrief-generator",
        title: "Opzeggingsbrief generator",
        description: "Genereer een professionele opzeggingsbrief in seconden.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/vaardigheden-generator",
        title: "Vaardigheden generator",
        description: "Ontdek relevante hard en soft skills voor jouw functie.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/cv-keywords",
        title: "CV keywords optimizer",
        description: "Vind de ATS-keywords die jouw CV moet bevatten voor jouw rol.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/salaris-calculator",
        title: "Salaris calculator 2026",
        description: "Bereken je marktsalaris op basis van sector, niveau en regio.",
        badge: "Gratis",
        color: "bg-slate-50 border-slate-300",
    },
    {
        href: "/tools/opzegtermijn-berekenen",
        title: "Opzegtermijn berekenen",
        description: "Bereken je wettelijke opzegtermijn op basis van dienstjaren.",
        badge: "Gratis",
        color: "bg-slate-50 border-slate-300",
    },
    {
        href: "/tools/proeftijd-checker",
        title: "Proeftijd checker",
        description: "Check direct wat de maximale proeftijd is voor jouw contract.",
        badge: "Gratis",
        color: "bg-slate-50 border-slate-300",
    },
    {
        href: "/tools/cv-vacature-match",
        title: "CV vs Vacature Match",
        description: "Vergelijk je CV met een vacature en zie je matchscore + ontbrekende keywords.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/salaris-onderhandeling",
        title: "Salaris Onderhandeling",
        description: "Genereer een persoonlijk script + e-mail voor je salarisonderhandeling.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/sollicitatiegesprek-quiz",
        title: "Sollicitatiegesprek Quiz",
        description: "Oefen met 8 op maat gemaakte vragen voor jouw functie en niveau.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/job-title-translator",
        title: "Functietitel Vertaler NL↔EN",
        description: "Vertaal je functietitel naar Engels of Nederlands voor LinkedIn en je CV.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
    {
        href: "/tools/career-change-advisor",
        title: "Carrièreswitch Advisor",
        description: "Analyseer de haalbaarheid van je carrièreswitch met een concreet stappenplan.",
        badge: "AI",
        color: "bg-teal-50 border-teal-300",
    },
];

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link href="/" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                        ← Home
                    </Link>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-6 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        Gratis carrière tools
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        15 gratis tools voor je sollicitatie, salarisonderhandeling en carrière — geen registratie vereist.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tools.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 block"
                        >
                            <div className="flex items-start justify-between gap-3 mb-2">
                                <h2 className="font-black text-slate-900 text-sm leading-tight group-hover:text-teal-700 transition-colors">
                                    {tool.title}
                                </h2>
                                <span className="flex-shrink-0 text-[10px] font-black uppercase tracking-wide bg-[#4ECDC4]/20 text-teal-700 px-2 py-0.5 rounded-full">
                                    {tool.badge}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                        </Link>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}
