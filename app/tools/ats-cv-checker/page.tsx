import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
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

export const metadata: Metadata = buildDutchMetadata({
    title: "ATS CV Checker 2026 | Gratis CV Scanner Online | WerkCV",
    description: "Check gratis of je cv goed leesbaar is voor ATS-software. Upload je cv en krijg direct concrete verbeterpunten voor structuur en opmaak.",
    path: "/tools/ats-cv-checker",
    keywords: [
        "cv scanner online",
        "cv door ai laten checken",
        "ats cv checker",
        "ats score berekenen",
        "cv ats check",
        "ats vriendelijk cv",
        "ats cv scanner",
    ],
});

export default function AtsCvCheckerPage() {
    return (
        <main>
            <FAQJsonLd questions={faqItems} />

            <div className="wk-container max-w-3xl py-12">
                <div className="mb-8">
                    <span className="wk-badge wk-badge-accent mb-4">AI tool — Gratis</span>
                    <h1 className="mb-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl">
                        CV scanner online: check je CV op <span className="wk-hero-highlight">ATS-fouten</span>
                    </h1>
                    <p className="text-lg font-medium leading-8 text-[var(--wk-ink-muted)]">
                        Upload je CV als PDF of Word, of plak de tekst direct. Laat je CV door AI checken op ATS-compatibiliteit en zie precies welke fouten recruitersoftware kunnen blokkeren.
                    </p>
                    <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                        Zoek je op <strong className="text-[var(--wk-ink)]">cv scanner online</strong> of <strong className="text-[var(--wk-ink)]">cv door ai laten checken</strong>? Deze tool is bedoeld voor precies dat moment: je wilt snel weten of je CV technisch goed leesbaar is voordat een recruiter het ziet.
                    </p>
                </div>

                {/* What ATS checks */}
                <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {[
                        ['📋', 'Structuur', 'Profieltekst, secties, opmaak'],
                        ['📞', 'Contactinfo', 'Email, telefoon, LinkedIn'],
                        ['💪', 'Inhoud', 'Werkwoorden, resultaten, lengte'],
                        ['🤖', 'ATS-fit', 'Koppen, datums, leesbaarheid'],
                    ].map(([icon, titel, sub]) => (
                        <div key={titel} className="wk-card p-3 text-center">
                            <div className="mb-1 text-xl">{icon}</div>
                            <p className="text-xs font-semibold text-[var(--wk-ink)]">{titel}</p>
                            <p className="mt-0.5 text-[10px] leading-4 text-[var(--wk-ink-muted)]">{sub}</p>
                        </div>
                    ))}
                </div>

                <AtsCheckerTool />

                <div className="mt-10 space-y-6">
                    <section className="wk-card p-6">
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">Wat doet deze cv scanner online precies?</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                            De scan kijkt niet alleen of je bestand opent, maar vooral of een ATS de inhoud logisch kan uitlezen. Dat betekent: duidelijke secties, leesbare datums, herkenbare contactgegevens en geen opmaak die een parser door elkaar haalt.
                        </p>
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {[
                                ["Structuur", "Controle op sectiekoppen, vaste volgorde en scanbare opmaak."],
                                ["Datums en periodes", "Signalering van onduidelijke of inconsistente datumregels."],
                                ["Contactgegevens", "Check op e-mail, telefoon en signalen die recruiters verwachten."],
                                ["ATS-risico's", "Herkenning van kolommen, creatieve labels en andere parser-problemen."],
                            ].map(([title, copy]) => (
                                <div key={title} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4">
                                    <p className="text-sm font-semibold text-[var(--wk-ink)]">{title}</p>
                                    <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{copy}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="wk-card p-6">
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">CV scanner online of gewone CV check?</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                            Een ATS-check en een gewone CV check lossen niet hetzelfde probleem op. Deze pagina is vooral technisch: kan software je CV goed lezen? Wil je daarnaast weten of je profieltekst, werkervaring en schrijfstijl overtuigend genoeg zijn, dan heb je ook een bredere beoordeling nodig.
                        </p>
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4">
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">Gebruik deze ATS checker als...</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    je wilt uitsluiten dat kolommen, koppen of PDF-opmaak je CV al tegenhouden voordat een mens het leest.
                                </p>
                            </div>
                            <Link
                                href="/tools/cv-score"
                                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
                            >
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">Ga daarna door naar de CV score</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Handig als je na de scan ook je inhoudelijke CV beoordeling wilt zien.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">Wat is een ATS en waarom telt het?</h2>
                        <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
                            Een ATS (Applicant Tracking System) is software die veel grotere werkgevers gebruiken om CV&apos;s te verwerken en te ordenen. Een CV dat er goed uitziet voor mensen, maar slecht leesbaar is voor software, kan daardoor onnodig zwak uit de eerste selectie komen.
                        </p>
                    </section>

                    <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-5">
                        <h3 className="mb-3 text-sm font-semibold text-[var(--wk-ink)]">De 5 meest gemaakte ATS-fouten in een CV</h3>
                        <ul className="space-y-2">
                            {[
                                'Tabellen en kolommen gebruiken — ATS leest dit door elkaar',
                                'Geen of een creatieve sectienaam zoals "Wat ik heb gedaan"',
                                'Datums inconsistent opschrijven (2021-22 vs. jan 2021 – dec 2022)',
                                'Geen LinkedIn-profiel of contactgegevens bovenaan',
                                'Holle buzzwords zonder bewijs: "resultaatgericht", "teamplayer"',
                            ].map((fout, i) => (
                                <li key={i} className="flex items-start gap-2 text-xs leading-5 text-[var(--wk-ink-muted)]">
                                    <span className="mt-0.5 flex-shrink-0 font-semibold text-[var(--wk-danger)]">✗</span>
                                    {fout}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <section className="wk-card p-6">
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">CV door AI laten checken: wat krijg je wel en niet?</h2>
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-success-soft)] p-4">
                                <p className="text-sm font-semibold text-[var(--wk-success)]">Wel</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Een snelle technische check op ATS-risico&apos;s, duidelijke feedback en een bruikbare volgende stap richting een beter template of sterkere inhoud.
                                </p>
                            </div>
                            <div className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-danger-soft)] p-4">
                                <p className="text-sm font-semibold text-[var(--wk-danger)]">Niet</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Geen garantie op interviews en geen volledige vacaturematch. Voor inhoudelijke kwaliteit en overtuigingskracht gebruik je daarna liever ook de CV score tool.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="wk-card p-6">
                        <div className="wk-eyebrow mb-2">
                            <span>FAQ</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over cv scanner online en ATS check</h2>
                        <div className="mt-5 space-y-4">
                            {faqItems.map((item) => (
                                <div key={item.question} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4">
                                    <h3 className="text-sm font-semibold text-[var(--wk-ink)]">{item.question}</h3>
                                    <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="wk-card p-6">
                        <div className="wk-eyebrow mb-2">
                            <span>Vervolgroute</span>
                        </div>
                        <h2 className="text-xl font-semibold text-[var(--wk-ink)]">Na deze ATS-check verder?</h2>
                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Link
                                href="/cv-checken"
                                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
                            >
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">CV checken</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Gebruik deze route als je naast ATS ook structuur, inhoud en ontbrekende onderdelen wilt beoordelen.
                                </p>
                            </Link>
                            <Link
                                href="/tools/linkedin-naar-cv"
                                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
                            >
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">Maak een cv van je LinkedIn-profiel</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Handig als je bestaande LinkedIn-tekst eerst wilt omzetten naar een rustigere cv-opbouw voordat je ATS-risico&apos;s oplost.
                                </p>
                            </Link>
                            <Link
                                href="/cv-optimaliseren"
                                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
                            >
                                <p className="text-sm font-semibold text-[var(--wk-ink)]">CV optimaliseren</p>
                                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                                    Handig als je de ATS-uitkomst wilt combineren met vacaturekeywords en sterkere profiel- en ervaringsblokken.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <ToolToCvCTA
                        toolName="ats-cv-checker"
                        title="Los ATS-risico&apos;s direct op in je cv"
                        description="Als je cv lastig te lezen is voor ATS-systemen, maak dan een schonere versie met een eenvoudige Nederlandse template."
                        primaryLabel="Maak een ATS-vriendelijke cv"
                        primaryHref="/editor?template=ats&startSource=ats_checker_page"
                        secondaryHref="/templates?startSource=ats_checker_template_compare"
                        secondaryLabel="Vergelijk ATS templates"
                        intent="cv_content"
                        resultState="ats_checker_page_cta"
                    />
                </div>
            </div>

            <Footer variant="brand" />
        </main>
    );
}
