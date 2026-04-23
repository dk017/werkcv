import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import AtsCheckerTool from "./AtsCheckerTool";

const faqItems = [
    {
        question: "Wat doet een cv scanner online precies?",
        answer: "Een cv scanner online controleert of je CV technisch goed leesbaar is voor recruitersoftware. Deze tool kijkt onder meer naar structuur, koppen, datums, contactgegevens en signalen die ATS-systemen vaak verkeerd verwerken.",
    },
    {
        question: "Kan ik mijn CV door AI laten checken?",
        answer: "Ja. Deze tool gebruikt AI om je CV te beoordelen op ATS-compatibiliteit en leesbaarheid. Je krijgt geen losse hype-score, maar concrete punten waarop een parser of recruiter kan afhaken.",
    },
    {
        question: "Wat is het verschil tussen een ATS check en een gewone CV check?",
        answer: "Een ATS check kijkt vooral naar technische uitleesbaarheid voor software. Een gewone CV check kijkt breder naar inhoud, profieltekst, overtuigingskracht en volledigheid. Veel sollicitanten gebruiken eerst de ATS checker en daarna de CV score tool.",
    },
    {
        question: "Moet ik een account maken voor deze ATS CV check?",
        answer: "Nee. Je kunt je CV direct uploaden of plakken en meteen de scan uitvoeren zonder eerst een account te maken.",
    },
];

export const metadata: Metadata = {
    title: "CV Scanner Online: Gratis ATS CV Check met AI | WerkCV",
    description: "Gebruik deze cv scanner online en laat je CV door AI checken op ATS-fouten. Upload je CV en ontvang direct je ATS-score met concrete verbeterpunten.",
    keywords: [
        "cv scanner online",
        "cv door ai laten checken",
        "ats cv checker",
        "ats score berekenen",
        "cv ats check",
        "ats vriendelijk cv",
        "ats cv scanner",
    ],
    alternates: {
        canonical: "/tools/ats-cv-checker",
    },
    openGraph: {
        title: "CV Scanner Online | Gratis ATS CV Check met AI",
        description: "Check of recruitersoftware je CV goed leest en zie direct welke ATS-fouten je eerst moet oplossen.",
        url: "https://werkcv.nl/tools/ats-cv-checker",
        siteName: "WerkCV",
        locale: "nl_NL",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "CV Scanner Online | WerkCV",
        description: "Laat je CV door AI checken op ATS-fouten en ontvang direct je verbeterpunten.",
    },
};

export default function AtsCvCheckerPage() {
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
                        CV scanner online: check je CV op ATS-fouten
                    </h1>
                    <p className="text-lg text-slate-600 font-medium">
                        Upload je CV als PDF of Word, of plak de tekst direct. Laat je CV door AI checken op ATS-compatibiliteit en zie precies welke fouten recruitersoftware kunnen blokkeren.
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                        Zoek je op <strong>cv scanner online</strong> of <strong>cv door ai laten checken</strong>? Deze tool is bedoeld voor precies dat moment: je wilt snel weten of je CV technisch goed leesbaar is voordat een recruiter het ziet.
                    </p>
                </div>

                {/* What ATS checks */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[
                        ['📋', 'Structuur', 'Profieltekst, secties, opmaak'],
                        ['📞', 'Contactinfo', 'Email, telefoon, LinkedIn'],
                        ['💪', 'Inhoud', 'Werkwoorden, resultaten, lengte'],
                        ['🤖', 'ATS-fit', 'Koppen, datums, leesbaarheid'],
                    ].map(([icon, titel, sub]) => (
                        <div key={titel} className="bg-white border-2 border-slate-200 rounded-xl p-3 text-center">
                            <div className="text-xl mb-1">{icon}</div>
                            <p className="text-xs font-black text-slate-800">{titel}</p>
                            <p className="text-[10px] text-slate-400 leading-snug mt-0.5">{sub}</p>
                        </div>
                    ))}
                </div>

                <AtsCheckerTool />

                <div className="mt-10 space-y-6">
                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">Wat doet deze cv scanner online precies?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            De scan kijkt niet alleen of je bestand opent, maar vooral of een ATS de inhoud logisch kan uitlezen. Dat betekent: duidelijke secties, leesbare datums, herkenbare contactgegevens en geen opmaak die een parser door elkaar haalt.
                        </p>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                ["Structuur", "Controle op sectiekoppen, vaste volgorde en scanbare opmaak."],
                                ["Datums en periodes", "Signalering van onduidelijke of inconsistente datumregels."],
                                ["Contactgegevens", "Check op e-mail, telefoon en signalen die recruiters verwachten."],
                                ["ATS-risico's", "Herkenning van kolommen, creatieve labels en andere parser-problemen."],
                            ].map(([title, copy]) => (
                                <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                    <p className="text-sm font-black text-slate-900">{title}</p>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">CV scanner online of gewone CV check?</h2>
                        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                            Een ATS-check en een gewone CV check lossen niet hetzelfde probleem op. Deze pagina is vooral technisch: kan software je CV goed lezen? Wil je daarnaast weten of je profieltekst, werkervaring en schrijfstijl overtuigend genoeg zijn, dan heb je ook een bredere beoordeling nodig.
                        </p>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-slate-200 p-4">
                                <p className="text-sm font-black text-slate-900">Gebruik deze ATS checker als...</p>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    je wilt uitsluiten dat kolommen, koppen of PDF-opmaak je CV al tegenhouden voordat een mens het leest.
                                </p>
                            </div>
                            <Link
                                href="/tools/cv-score"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                            >
                                <p className="text-sm font-black text-slate-900">Ga daarna door naar de CV score</p>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                                    Handig als je na de scan ook je inhoudelijke CV beoordeling wilt zien.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-black text-slate-900">Wat is een ATS en waarom telt het?</h2>
                        <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                            Een ATS (Applicant Tracking System) is software die bedrijven gebruiken om CV&apos;s automatisch te filteren. Meer dan 70% van de grote werkgevers in Nederland gebruikt een ATS. Een CV dat er goed uitziet voor mensen, maar slecht leesbaar is voor software, wordt nooit door een recruiter gezien.
                        </p>
                    </section>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                        <h3 className="font-black text-slate-900 text-sm mb-3">De 5 meest gemaakte ATS-fouten in een CV</h3>
                        <ul className="space-y-2">
                            {[
                                'Tabellen en kolommen gebruiken — ATS leest dit door elkaar',
                                'Geen of een creatieve sectienaam zoals "Wat ik heb gedaan"',
                                'Datums inconsistent opschrijven (2021-22 vs. jan 2021 – dec 2022)',
                                'Geen LinkedIn-profiel of contactgegevens bovenaan',
                                'Holle buzzwords zonder bewijs: "resultaatgericht", "teamplayer"',
                            ].map((fout, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                    <span className="flex-shrink-0 mt-0.5 text-red-500 font-black">✗</span>
                                    {fout}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <h2 className="text-xl font-black text-slate-900">CV door AI laten checken: wat krijg je wel en niet?</h2>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                                <p className="text-sm font-black text-emerald-900">Wel</p>
                                <p className="mt-2 text-sm text-emerald-900/80 leading-relaxed">
                                    Een snelle technische check op ATS-risico&apos;s, duidelijke feedback en een bruikbare volgende stap richting een beter template of sterkere inhoud.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                                <p className="text-sm font-black text-red-900">Niet</p>
                                <p className="mt-2 text-sm text-red-900/80 leading-relaxed">
                                    Geen garantie op interviews en geen volledige vacaturematch. Voor inhoudelijke kwaliteit en overtuigingskracht gebruik je daarna liever ook de CV score tool.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
                        <h2 className="mt-2 text-xl font-black text-slate-900">Veelgestelde vragen over cv scanner online en ATS check</h2>
                        <div className="mt-5 space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.question} className="rounded-2xl border border-slate-200 p-4">
                                    <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 mb-3">Wil je een CV dat wél door ATS komt én inhoudelijk sterker is?</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link
                                href="/templates"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                            >
                                Maak ATS-vriendelijk CV →
                            </Link>
                            <Link
                                href="/tools/cv-score"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-50 transition-colors"
                            >
                                Doe ook een CV beoordeling →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
