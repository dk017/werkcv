import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import CvSamenvattingTool from "./CvSamenvattingTool";

const faqItems = [
    {
        question: "Wat is een goede cv-samenvatting?",
        answer: "Een goede cv-samenvatting is kort, concreet en functiegericht. Je laat in 3 tot 5 zinnen zien wie je bent, welke ervaring je meebrengt, welke vaardigheden relevant zijn en welk resultaat je al hebt behaald.",
    },
    {
        question: "Hoe lang moet een cv-samenvatting zijn?",
        answer: "Meestal werkt 55 tot 85 woorden goed. Kort genoeg om scanbaar te blijven, lang genoeg om context en specialisatie te laten zien.",
    },
    {
        question: "Wat is het verschil tussen profieltekst en cv-samenvatting?",
        answer: "In de praktijk overlappen ze sterk. Een cv-samenvatting is meestal iets scherper op ervaring, resultaat en doelrol. Een profieltekst kan iets breder of persoonlijker zijn.",
    },
];

export const metadata: Metadata = {
    title: "CV Samenvatting Generator - Gratis Tool | WerkCV.nl",
    description: "Genereer een sterke cv-samenvatting voor de Nederlandse arbeidsmarkt. Vul je functie, doelrol, vaardigheden en resultaat in en krijg direct een recruiter-vriendelijke intro.",
    keywords: [
        "cv samenvatting generator",
        "cv samenvatting schrijven",
        "cv profiel generator",
        "persoonlijk profiel cv",
        "cv introductie maken",
    ],
};

export default function CvSamenvattingGeneratorPage() {
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
                        { label: "CV samenvatting generator", href: "/tools/cv-samenvatting-generator" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-teal-100 text-teal-800 px-3 py-1 border border-teal-300 rounded-full">
                                AI
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Bijgewerkt 11 maart 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            CV samenvatting generator
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Deze tool vult een echte intent-gap op: mensen zoeken niet alleen naar een profieltekst, maar specifiek naar een cv-samenvatting die recruiters snel snappen. Daarom krijg je hier geen generieke intro, maar een korte tekst die functie, ervaring, vaardigheid en resultaat direct verbindt.
                        </p>
                    </div>

                    <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Waar dit op beoordeeld wordt
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li>Duidelijke specialisatie of rolrichting</li>
                            <li>Relevant aantal jaren ervaring of context</li>
                            <li>Kernvaardigheden die passen bij de doelrol</li>
                            <li>Minstens een concreet resultaat of bewijs van niveau</li>
                        </ul>
                    </aside>
                </section>

                <section className="mb-12">
                    <CvSamenvattingTool />
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat een sterke samenvatting doet
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Hij maakt je rol en richting direct duidelijk.</li>
                            <li>Hij laat recruiters in seconden zien waar je waarde ligt.</li>
                            <li>Hij verbindt ervaring aan een concreet resultaat.</li>
                            <li>Hij maakt je CV sterker voor ATS en recruiter-scan tegelijk.</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Veelgemaakte fouten
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Te vaag schrijven: &quot;gedreven teamplayer&quot; zonder context.</li>
                            <li>Een alinea maken die te lang is voor de eerste scan.</li>
                            <li>Geen resultaat noemen waardoor je niveau onduidelijk blijft.</li>
                            <li>De tekst niet aanpassen aan de doelrol of vacature.</li>
                        </ul>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Gebruik je samenvatting meteen in de rest van je CV"
                    description="Een goede openingsalinea werkt het best als de rest van je CV dezelfde lijn vasthoudt: juiste keywords, sterke bullets en een profiel dat past bij de vacature."
                    tools={[
                        {
                            href: "/tools/profieltekst-generator",
                            title: "Profieltekst generator",
                            description: "Gebruik dit als je een iets bredere of persoonlijkere variant wilt testen.",
                            badge: "AI",
                        },
                        {
                            href: "/tools/cv-keywords",
                            title: "CV keywords optimizer",
                            description: "Voeg de termen toe die recruiters en ATS in jouw vakgebied verwachten.",
                            badge: "AI",
                        },
                        {
                            href: "/tools/werkervaring-bullets",
                            title: "Werkervaring bullets",
                            description: "Maak de rest van je CV net zo scherp en resultaatgericht als je samenvatting.",
                            badge: "AI",
                        },
                        {
                            href: "/cv-samenvatting-voorbeelden",
                            title: "CV samenvatting voorbeelden",
                            description: "Bekijk voorbeelden per situatie en beroep voordat je je definitieve versie kiest.",
                            badge: "Voorbeelden",
                        },
                    ]}
                />

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over cv-samenvattingen
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

                <section className="mt-12 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3">
                                Wil je de samenvatting direct in je CV zetten?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                                Gebruik de gegenereerde tekst meteen in de editor en werk daarna je ervaring, vaardigheden en template af in dezelfde flow.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/editor"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-white hover:bg-teal-300 transition-colors"
                            >
                                Open de editor
                            </Link>
                            <Link
                                href="/templates"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-black text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
                            >
                                Bekijk templates
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
