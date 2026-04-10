import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

type ToolCard = {
    href: string;
    title: string;
    description: string;
    badge: string;
    badgeClass: string;
};

type ToolSection = {
    eyebrow: string;
    title: string;
    description: string;
    tools: ToolCard[];
};

const featuredTools: ToolCard[] = [
    {
        href: "/tools/transitievergoeding-berekenen",
        title: "Transitievergoeding berekenen",
        description: "Check direct of je waarschijnlijk recht hebt en bereken je vergoeding met 2026 regels.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/netto-bruto-calculator",
        title: "Netto bruto calculator",
        description: "Bereken bruto naar netto en netto naar bruto met 2026 loonheffingen, heffingskortingen en vakantiegeld.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
        href: "/tools/ww-recht-checker",
        title: "WW recht checker",
        description: "Controleer de basisvoorwaarden voor WW op urenverlies, wekeneis en beschikbaarheid.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/vakantiedagen-berekenen",
        title: "Vakantiedagen berekenen",
        description: "Reken wettelijke verlofuren en resterende dagen uit op basis van je echte contractschema.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/ww-dagloon-checker",
        title: "WW dagloon checker",
        description: "Schat je WW-dagloon en de bruto WW-uitkering in de eerste 2 maanden en daarna.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/parttime-salaris-calculator",
        title: "Parttime salaris calculator",
        description: "Vergelijk 24, 28, 32 of 36 uur direct met je fulltime salaris en vakantiegeld.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
];

const newLiveTools: ToolCard[] = [
    {
        href: "/tools/eindejaarsuitkering-berekenen",
        title: "Eindejaarsuitkering berekenen",
        description: "Bereken je bruto 13e maand of eindejaarsuitkering op basis van salaris, percentage en gewerkte maanden.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
        href: "/tools/30-procent-regeling-checker",
        title: "30%-regeling checker",
        description: "Check de 2026-drempels en basisvoorwaarden voor expats die de 30%-regeling willen inschatten.",
        badge: "Expat",
        badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
    },
    {
        href: "/tools/verlofuren-omrekenen",
        title: "Verlofuren omrekenen",
        description: "Zet verlofuren om naar dagen of dagen naar uren op basis van je echte contractschema.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/kilometervergoeding-berekenen",
        title: "Kilometervergoeding berekenen",
        description: "Bereken je woon-werkvergoeding met het belastingvrije tarief van €0,23 per kilometer in 2026.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
        href: "/tools/ziekengeld-berekenen",
        title: "Ziekengeld berekenen",
        description: "Schat hoeveel bruto loon je ontvangt in jaar 1 en jaar 2 van ziekte.",
        badge: "NL wetgeving",
        badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
        href: "/tools/thuiswerkvergoeding-berekenen",
        title: "Thuiswerkvergoeding berekenen",
        description: "Bereken het belastingvrije maximum van €2,35 per thuiswerkdag in 2026.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
        href: "/tools/salaris-vergelijker",
        title: "Salaris vergelijker",
        description: "Vergelijk twee aanbiedingen op netto-equivalent, vergoedingen, bonus en vakantiedagen.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
        href: "/tools/overuren-berekenen",
        title: "Overuren berekenen",
        description: "Reken uit wat extra uren waard zijn met of zonder overwerktoeslag.",
        badge: "Geld",
        badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
    },
];

const sections: ToolSection[] = [
    {
        eyebrow: "Werk & contract",
        title: "Werken in Nederland",
        description: "Praktische calculators en checkers voor ontslag, contractregels en WW - gebouwd rond Nederlandse arbeidsregels en echte uitkeringsvragen in plaats van generieke adviestekst.",
        tools: [
            featuredTools[0],
            {
                href: "/tools/zwangerschapsverlof-berekenen",
                title: "Zwangerschapsverlof berekenen",
                description: "Bereken startdatum, duur en UWV-uitkering voor zwangere werknemers en partners.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/aow-leeftijd-checker",
                title: "AOW leeftijd checker",
                description: "Bereken je exacte AOW-datum op basis van geboortedatum en de officiële SVB-tabel.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/loonstrook-uitleggen",
                title: "Loonstrook uitleggen",
                description: "Begrijp elke regel op je salarisstrook in gewoon Nederlands.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/opzegtermijn-berekenen",
                title: "Opzegtermijn berekenen",
                description: "Zie direct welke wettelijke opzegtermijn geldt voor jou en je werkgever.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/aanzegvergoeding-checker",
                title: "Aanzegvergoeding checker",
                description: "Controleer of je werkgever te laat of niet schriftelijk heeft aangezegd.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/proeftijd-checker",
                title: "Proeftijd checker",
                description: "Controleer wat wettelijk maximaal is bij een tijdelijk of vast contract.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            featuredTools[2],
            featuredTools[4],
            {
                href: "/tools/ww-duur-checker",
                title: "WW duur checker",
                description: "Schat hoe lang je WW ongeveer kan duren op basis van arbeidsverleden.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/opzeggingsbrief-generator",
                title: "Opzeggingsbrief generator",
                description: "Genereer een professionele opzeggingsbrief en regel je vertrek netjes.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
        ],
    },
    {
        eyebrow: "Salaris & loon",
        title: "Loonchecks die direct bruikbaar zijn",
        description: "Gebruik deze tools samen als je salarissen vergelijkt, parttime uren wilt doorrekenen, verlof wilt checken of wilt zien waar wettelijke ondergrenzen liggen.",
        tools: [
            {
                href: "/tools/salaris-calculator",
                title: "Salaris kompas 2026",
                description: "Gebruik een guided salarischeck op basis van CBS-beroepsdata plus ervaring, opleiding en regio.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            {
                href: "/salaris",
                title: "Salaris per beroep 2026",
                description: "Open vaste salarispagina's per beroep met CBS-mediaan, salarisband en vervolgstappen naar netto en CV.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            featuredTools[1],
            {
                href: "/tools/vakantiegeld-berekenen",
                title: "Vakantiegeld berekenen",
                description: "Reken met de 8%-basisregel en structurele looncomponenten voor een betere bruto indicatie.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            {
                href: "/tools/uurloon-calculator",
                title: "Uurloon calculator",
                description: "Reken je bruto maand- of jaarsalaris om naar een bruikbaar uurloon.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            {
                href: "/tools/minimumloon-checker",
                title: "Minimumloon checker",
                description: "Controleer het wettelijke minimumuurloon per leeftijd in 2026.",
                badge: "NL wetgeving",
                badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
            },
            {
                href: "/tools/zzp-uurtarief-berekenen",
                title: "ZZP uurtarief berekenen",
                description: "Bereken je minimale uur- en dagtarief als freelancer op basis van gewenst netto inkomen.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            {
                href: "/tools/studieschuld-berekenen",
                title: "Studieschuld DUO berekenen",
                description: "Bereken je maandelijkse DUO-aflossing voor oud en nieuw stelsel.",
                badge: "Geld",
                badgeClass: "bg-blue-100 text-blue-800 border-blue-300",
            },
            featuredTools[3],
            featuredTools[5],
            {
                href: "/tools/salaris-onderhandeling",
                title: "Salaris onderhandeling",
                description: "Genereer een persoonlijk script en een e-mail voor je salarisonderhandeling.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            newLiveTools[0],
            newLiveTools[3],
            newLiveTools[4],
            newLiveTools[5],
            newLiveTools[6],
            newLiveTools[7],
            newLiveTools[2],
        ],
    },
    {
        eyebrow: "CV & sollicitatie",
        title: "Van vacature naar sterk CV",
        description: "AI-tools die direct aansluiten op de kern van WerkCV: beter schrijven, beter matchen en sneller solliciteren.",
        tools: [
            {
                href: "/tools/ats-cv-checker",
                title: "ATS CV checker",
                description: "Upload je CV en ontvang direct je ATS-score met concrete verbeterpunten.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/cv-score",
                title: "Nederlandse CV score checker",
                description: "Ontvang een totaalscore op 6 Nederlandse CV-criteria, inclusief profieltekst, werkervaring en volledigheid.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/cv-vacature-match",
                title: "CV vs Vacature Match",
                description: "Vergelijk je CV met een vacature en zie waar je match of keywords mist.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/cv-keywords",
                title: "CV keywords optimizer",
                description: "Vind de ATS-termen die recruiters en systemen in jouw rol verwachten.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/cv-samenvatting-generator",
                title: "CV samenvatting generator",
                description: "Schrijf een korte, recruiter-vriendelijke intro die direct past bij je doelrol.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/profieltekst-generator",
                title: "Profieltekst generator",
                description: "Schrijf sneller een overtuigende profieltekst voor bovenaan je CV.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/werkervaring-bullets",
                title: "Werkervaring bullets",
                description: "Zet losse werkzaamheden om in resultaatgerichte bullet points.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/vaardigheden-generator",
                title: "Vaardigheden generator",
                description: "Selecteer relevante hard en soft skills voor jouw functie en niveau.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/sollicitatiebrief-generator",
                title: "Sollicitatiebrief generator",
                description: "Schrijf een persoonlijke sollicitatiebrief met AI en direct bruikbare opbouw.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
        ],
    },
    {
        eyebrow: "Expat & internationaal",
        title: "Internationale stap naar Nederland",
        description: "Deze tools zijn gericht op expats en internationals die Nederlandse salarisdrempels, functietitels en CV-verwachtingen willen begrijpen.",
        tools: [
            {
                href: "/tools/kennismigrant-salary-checker",
                title: "Kennismigrant salary checker",
                description: "Check de actuele IND-drempels voor under 30, 30+ en reduced criterion.",
                badge: "Expat",
                badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
            },
            {
                href: "/tools/zoekjaar-checker",
                title: "Zoekjaar checker",
                description: "Check of je nog binnen de 3-jaars IND-termijn valt voor de orientation year route.",
                badge: "Expat",
                badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
            },
            {
                href: "/tools/eu-blue-card-checker",
                title: "EU Blue Card checker",
                description: "Vergelijk je aanbod met de actuele Blue Card route en salary threshold.",
                badge: "Expat",
                badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
            },
            {
                href: "/tools/job-title-translator",
                title: "Functietitel vertaler NL-EN",
                description: "Vertaal functietitels voor LinkedIn, een Engels CV of solliciteren in Nederland.",
                badge: "Expat",
                badgeClass: "bg-violet-100 text-violet-800 border-violet-300",
            },
            {
                href: "/tools/sollicitatiegesprek-quiz",
                title: "Sollicitatiegesprek quiz",
                description: "Oefen met functiegerichte interviewvragen en voorbeeldantwoorden.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            {
                href: "/tools/career-change-advisor",
                title: "Carrièreswitch advisor",
                description: "Analyseer of je carrièreswitch haalbaar is en welke stappen logisch zijn.",
                badge: "AI",
                badgeClass: "bg-teal-100 text-teal-800 border-teal-300",
            },
            newLiveTools[1],
        ],
    },
];

const totalTools = new Set(sections.flatMap((section) => section.tools.map((tool) => tool.href))).size;

export const metadata: Metadata = {
    title: `${totalTools} Gratis CV, Sollicitatie & Werk Tools | WerkCV`,
    description: `${totalTools} gratis tools voor CV, sollicitatie en werken in Nederland: netto-bruto, parttime salaris, vakantiedagen, verlofuren, WW, transitievergoeding, salaris, 30%-regeling, ATS check en meer.`,
    keywords: [
        "cv tools gratis",
        "netto bruto calculator",
        "transitievergoeding berekenen",
        "eindejaarsuitkering berekenen",
        "vakantiegeld berekenen",
        "vakantiedagen berekenen",
        "verlofuren omrekenen",
        "parttime salaris calculator",
        "ww dagloon checker",
        "minimumloon checker",
        "ww recht checker",
        "opzegtermijn berekenen",
        "salaris calculator nederland",
        "proeftijd checker",
        "30 regeling checker",
        "ats cv checker",
        "cv samenvatting generator",
        "kennismigrant salary checker",
        "zoekjaar checker",
    ],
};

function ToolCardView({ tool }: { tool: ToolCard }) {
    return (
        <Link
            href={tool.href}
            className="group bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all p-5 block"
        >
            <div className="flex items-start justify-between gap-3 mb-2">
                <h2 className="font-black text-slate-900 text-sm leading-tight group-hover:text-teal-700 transition-colors">
                    {tool.title}
                </h2>
                <span className={`flex-shrink-0 text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full border ${tool.badgeClass}`}>
                    {tool.badge}
                </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
        </Link>
    );
}

export default function ToolsPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <header className="border-b-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
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

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 mb-12">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-teal-100 text-teal-800 px-3 py-1 border border-teal-300 rounded-full">
                                {totalTools} live tools
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                                NL wetgeving + AI + Expat
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Bijgewerkt 19 maart 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Gratis tools voor CV, sollicitatie en werken in Nederland
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            WerkCV is niet alleen een CV-builder. Dit is ook je gereedschapskist voor sollicitaties, salaris, contractvragen en expat-proof job search in Nederland.
                        </p>
                    </div>

                    <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
                            Waarom deze hub werkt
                        </p>
                        <div className="space-y-3">
                            {[
                                "Geen registratie nodig voor de tools.",
                                "Lokale focus: Nederlandse contractregels, salaris, WW en ontslag.",
                                "AI-tools sluiten direct aan op het CV- en sollicitatieproces.",
                                "Expat-tools sluiten aan op Nederlands solliciteren en IND-routes.",
                            ].map((item, index) => (
                                <div key={item} className="flex gap-3">
                                    <span className="text-teal-600 font-black">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <section className="mb-12">
                    <div className="flex items-end justify-between gap-4 mb-5">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700 mb-2">
                                Populair nu
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                                Tools met de hoogste intent
                            </h2>
                        </div>
                        <p className="hidden md:block text-sm text-slate-500 max-w-lg text-right">
                            Dit zijn de tools met de sterkste combinatie van zoekintentie, lokale relevantie en productfit voor WerkCV.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {featuredTools.map((tool) => (
                            <ToolCardView key={tool.href} tool={tool} />
                        ))}
                    </div>
                </section>

                <div className="space-y-12">
                    {sections.map((section) => (
                        <section key={section.title}>
                            <div className="mb-5">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                                    {section.eyebrow}
                                </p>
                                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                                    {section.title}
                                </h2>
                                <p className="text-sm sm:text-base text-slate-600 max-w-3xl">
                                    {section.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.tools.map((tool) => (
                                    <ToolCardView key={`${section.title}-${tool.href}`} tool={tool} />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-12 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <div className="max-w-4xl">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
                            Van tool-intentie naar CV-intentie
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                            Veel bezoekers beginnen met een tool, maar eindigen bij een nieuw CV
                        </h2>
                        <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                            Dat geldt vooral voor salaris-, WW- en parttime-vragen. Wie zijn loon vergelijkt of contractruimte onderzoekt, zoekt vaak daarna ook naar{" "}
                            <Link href="/gratis-cv-maken" className="font-black underline decoration-2 underline-offset-4">
                                gratis CV maken
                            </Link>
                            ,{" "}
                            <Link href="/cv-aanmaken" className="font-black underline decoration-2 underline-offset-4">
                                CV aanmaken
                            </Link>
                            {" "}of een snellere route voor{" "}
                            <Link href="/cv-maken-op-mobiel" className="font-black underline decoration-2 underline-offset-4">
                                CV maken op mobiel
                            </Link>
                            . Daarom koppelen we de sterkste intentpagina&apos;s hieronder aan deze toolhub.
                        </p>
                    </div>
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                        {[
                            {
                                href: "/gratis-cv-maken",
                                title: "Gratis CV maken",
                                description: "Sterk voor bezoekers die gratis willen starten, vergelijken en pas betalen wanneer de PDF echt klaar is.",
                            },
                            {
                                href: "/cv-aanmaken",
                                title: "CV aanmaken",
                                description: "Voor zoekers die vooral van lege pagina naar een eerste complete basisversie willen zonder layoutgedoe.",
                            },
                            {
                                href: "/cv-maken-op-mobiel",
                                title: "CV maken op mobiel",
                                description: "Sluit goed aan op toolverkeer dat direct vanaf mobiel zoekt en vergelijkt.",
                            },
                            {
                                href: "/cv-maken-pdf",
                                title: "CV maken PDF",
                                description: "Vangt bezoekers op die een eindformat zoeken en daarna naar de editorflow moeten.",
                            },
                        ].map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block border-2 border-black bg-[#FFFEF9] p-4 hover:bg-teal-50 transition-colors"
                            >
                                <p className="text-sm font-black text-slate-900">{item.title}</p>
                                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.description}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="mt-12 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 items-center">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3">
                                Klaar om van tool naar actie te gaan?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                                Gebruik de tools om duidelijkheid te krijgen, en stap daarna direct door naar je CV of sollicitatiebrief.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/editor"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-white hover:bg-teal-300 transition-colors"
                            >
                                Maak gratis je CV
                            </Link>
                            <Link
                                href="/cv-maken"
                                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-black text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
                            >
                                Lees hoe je een sterk CV maakt
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </div>
    );
}
