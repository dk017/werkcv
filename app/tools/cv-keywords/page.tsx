import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import CvKeywordsTool from "./CvKeywordsTool";

const faqItems = [
    {
        question: "Wat doet een cv trefwoorden finder?",
        answer: "Een cv trefwoorden finder helpt je herkennen welke termen recruiters en ATS-systemen verwachten bij een specifieke functie. Je krijgt dus geen algemene tips, maar functiegerichte woorden die je in profieltekst, werkervaring en vaardigheden kunt verwerken.",
    },
    {
        question: "Is dit hetzelfde als een trefwoorden scanner voor je cv?",
        answer: "Bijna. Mensen zoeken op cv trefwoorden finder, trefwoorden scanner cv of ATS keywords voor cv. De bedoeling is hetzelfde: snel zien welke termen in je CV ontbreken of sterker kunnen worden benoemd.",
    },
    {
        question: "Moet ik alle keywords letterlijk overnemen?",
        answer: "Nee. Gebruik alleen trefwoorden die echt passen bij je ervaring en verwerk ze natuurlijk in je CV. Keyword stuffing werkt averechts voor recruiters en maakt je tekst zwakker.",
    },
    {
        question: "Waar zet ik cv trefwoorden het best neer?",
        answer: "Meestal in je profieltekst, functietitels, werkervaring en vaardigheden. Dat zijn de plekken waar ATS-systemen en recruiters het eerst naar kijken.",
    },
];

export const metadata: Metadata = {
    title: "CV Trefwoorden Finder: ATS Keywords voor je CV | WerkCV",
    description: "Gebruik deze cv trefwoorden finder en trefwoorden scanner voor je cv. Ontdek per functie welke ATS-keywords en recruitertermen je in je CV moet verwerken.",
    keywords: [
        "cv trefwoorden finder",
        "trefwoorden scanner cv",
        "cv trefwoorden",
        "ats keywords cv",
        "keywords cv",
        "ats cv optimalisatie",
        "cv optimalisatie",
    ],
    alternates: {
        canonical: "/tools/cv-keywords",
    },
    openGraph: {
        title: "CV Trefwoorden Finder | WerkCV",
        description: "Vind de juiste cv trefwoorden voor je functie en verwerk ze slimmer in je CV.",
        url: "https://werkcv.nl/tools/cv-keywords",
        siteName: "WerkCV",
        locale: "nl_NL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CV Trefwoorden Finder | WerkCV",
        description: "Gebruik deze trefwoorden scanner voor je cv en vind de ATS-termen die recruiters verwachten.",
    },
};

export default function CvKeywordsPage() {
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
                        AI tool — Gratis
                    </span>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 leading-tight">
                        CV trefwoorden finder voor ATS en recruiters
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Vul je functietitel in en ontdek welke trefwoorden ATS-systemen en recruiters in je CV verwachten. Handig als je je CV per functie of vacature slimmer wilt aanscherpen.
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        Zoek je op <strong>cv trefwoorden finder</strong> of <strong>trefwoorden scanner cv</strong>? Deze tool helpt je vooral in de vertaalslag van functietitel naar de woorden die in je CV zichtbaar moeten zijn.
                    </p>
                </div>

                <CvKeywordsTool />

                <div className="mt-10 space-y-6">
                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">Wat doet deze cv trefwoorden finder precies?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            De tool vertaalt een functietitel naar de termen die in vacatures, ATS-filters en recruitersearches vaak terugkomen. Zo zie je sneller welke woorden in jouw CV ontbreken of te vaag zijn geformuleerd.
                        </p>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ["Must-have termen", "De basiswoorden die vrijwel altijd terugkomen bij een rol of discipline."],
                                ["Technische termen", "Tools, systemen, methodes en vaktaal die ATS-systemen herkennen."],
                                ["Soft skills", "Alleen de zachte vaardigheden die echt relevant zijn voor de functie."],
                                ["Certificaten en opleiding", "Handig om termen te vinden die recruiters gebruiken bij selectie."],
                            ].map(([title, copy]) => (
                                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-black text-slate-900">{title}</p>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-slate-900">Waarom zijn cv trefwoorden zo belangrijk?</h2>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                            Meer dan 70% van de grote bedrijven gebruikt een ATS (Applicant Tracking System) om CV&apos;s te filteren vóórdat een recruiter ze te zien krijgt. Een CV zonder de juiste trefwoorden wordt sneller gemist, ook als je inhoudelijk wel geschikt bent.
                        </p>
                    </section>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {[
                            ['70%+', 'van bedrijven gebruikt ATS', 'bg-red-50 border-red-200'],
                            ['6 sec', 'besteedt een recruiter gemiddeld aan een CV', 'bg-amber-50 border-amber-200'],
                            ['3x', 'meer callbacks met geoptimaliseerde keywords', 'bg-emerald-50 border-emerald-200'],
                        ].map(([stat, label, style], i) => (
                            <div key={i} className={`border-2 rounded-xl p-4 text-center ${style}`}>
                                <p className="text-3xl font-black text-slate-900 mb-1">{stat}</p>
                                <p className="text-xs text-slate-600 font-medium leading-snug">{label}</p>
                            </div>
                        ))}
                    </div>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">Trefwoorden scanner cv: waar let je op?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Het doel is niet om zo veel mogelijk woorden te stapelen. Een goede trefwoordenscan laat zien welke termen geloofwaardig passen bij jouw profiel en waar je ze logisch kunt verwerken.
                        </p>
                        <div className="mt-5 bg-slate-50 border border-slate-200 rounded-xl p-5">
                            <h3 className="font-black text-slate-900 text-sm mb-3">Zo verwerk je keywords in je CV</h3>
                            <ul className="space-y-2">
                                {[
                                    'Verwerk must-have keywords letterlijk als ze echt bij je ervaring passen.',
                                    'Gebruik trefwoorden in je profieltekst, werkervaring én vaardigheden.',
                                    'Pas je CV per vacature aan met specifieke woorden uit de vacaturetekst.',
                                    'Vermijd keyword stuffing — schrijf altijd eerst voor de menselijke lezer.',
                                ].map((tip, i) => (
                                    <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                        <span className="text-teal-500 font-black mt-0.5">✓</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">Wat doe je na de trefwoorden scan?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Gebruik de uitkomst om je CV concreter te maken, niet alleen voller. Voeg de juiste termen toe aan je profieltekst, herschrijf je bullet points en controleer daarna of je hele document ook technisch en inhoudelijk sterk genoeg is.
                        </p>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href="/tools/cv-score"
                                className="rounded-2xl border border-slate-300 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                            >
                                <p className="text-sm font-black text-slate-900">Doe daarna een CV beoordeling</p>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    Check of je CV naast de trefwoorden ook sterk genoeg is in structuur en inhoud.
                                </p>
                            </Link>
                            <Link
                                href="/tools/linkedin-naar-cv"
                                className="rounded-2xl border border-slate-300 bg-white p-4 transition-colors hover:bg-slate-50"
                            >
                                <p className="text-sm font-black text-slate-900">LinkedIn-profiel omzetten naar cv</p>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    Gebruik deze route als je je LinkedIn-tekst eerst wilt structureren en daarna de juiste vacaturekeywords wilt toevoegen.
                                </p>
                            </Link>
                            <Link
                                href="/templates"
                                className="rounded-2xl border-2 border-black bg-[#4ECDC4] p-4 text-slate-900 transition-transform hover:-translate-y-0.5"
                            >
                                <p className="text-sm font-black">Werk je trefwoorden meteen uit in een template</p>
                                <p className="mt-2 text-sm leading-relaxed">
                                    Zet de termen direct om in een duidelijk en ATS-vriendelijk CV.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
                        <h2 className="mt-2 text-xl font-black text-slate-900">Veelgestelde vragen over cv trefwoorden en ATS keywords</h2>
                        <div className="mt-5 space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.question} className="rounded-2xl border border-slate-200 p-4">
                                    <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Vervolgroute</p>
                        <h2 className="mt-2 text-xl font-black text-slate-900">Keywords gevonden?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Ga dan verder naar{" "}
                            <Link href="/cv-optimaliseren" className="font-black underline decoration-2 underline-offset-4">
                                cv optimaliseren
                            </Link>
                            {" "}als je die termen meteen wilt combineren met ATS, vacaturematch en inhoudelijke verbeterpunten.
                        </p>
                    </section>

                    <ToolToCvCTA
                        toolName="cv-keywords"
                        title="Gebruik deze keywords direct in je cv"
                        description="Verwerk de belangrijkste vacature-keywords in je profiel, werkervaring en vaardigheden."
                        primaryLabel="Maak cv met deze keywords"
                    />
                </div>
            </div>

            <Footer />
        </div>
    );
}
