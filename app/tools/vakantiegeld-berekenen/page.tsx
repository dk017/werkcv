import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { estimateNetFromTaxableIncome } from "@/lib/tools/netto-bruto";
import VakantiegeldTool from "./VakantiegeldTool";

const faqItems = [
    {
        question: "Hoeveel vakantiegeld krijg ik in Nederland?",
        answer: "In Nederland krijg je als werknemer meestal minimaal 8% vakantiegeld over je brutoloon. Cao of arbeidsovereenkomst kan een hoger percentage geven.",
    },
    {
        question: "Hoe bereken je netto vakantiegeld?",
        answer: "Deze pagina rekent eerst je bruto vakantiegeld uit en geeft daarna een ruwe netto-indicatie op basis van 2026-loonheffingsaannames voor een werknemer onder AOW-leeftijd met loonheffingskorting. Je echte netto uitbetaling kan afwijken door bijzondere-beloningstabellen, pensioeninhouding en je persoonlijke situatie.",
    },
    {
        question: "Wanneer wordt vakantiegeld meestal uitbetaald?",
        answer: "Vakantiegeld wordt meestal in mei of juni uitbetaald. Je werkgever mag daarvan afwijken als dit in je contract of cao staat.",
    },
    {
        question: "Telt overwerk of provisie mee voor vakantiegeld?",
        answer: "Structureel loon zoals provisie of structurele toeslagen kan meetellen. Eenmalige beloningen en onkostenvergoedingen meestal niet. Controleer bij twijfel je cao of salarisafspraken.",
    },
    {
        question: "Is dit bedrag bruto of netto?",
        answer: "De hoofduitkomst blijft bruto. Daarnaast tonen we een ruwe netto-indicatie zodat je beter begrijpt wat er ongeveer op je rekening kan landen, maar je loonstrook en werkgever blijven leidend.",
    },
    {
        question: "Is vakantiegeld hetzelfde als een 13e maand?",
        answer: "Nee. Vakantiegeld is meestal minimaal 8% van loon dat je opbouwt. Een 13e maand is een aparte arbeidsvoorwaarde die niet automatisch voor iedereen geldt.",
    },
    {
        question: "Krijg ik vakantiegeld als ik parttime werk?",
        answer: "Ja. Ook bij parttime werk bouw je normaal vakantiegeld op over het loon dat je verdient. Het bedrag is lager dan bij fulltime werk omdat je bruto loonbasis lager is, maar de 8%-logica blijft meestal hetzelfde.",
    },
    {
        question: "Wat gebeurt er met vakantiegeld als ik uit dienst ga?",
        answer: "Bij uitdiensttreding wordt opgebouwd maar nog niet uitbetaald vakantiegeld meestal afgerekend op je eindafrekening. Controleer je contract, cao en loonstrook als je wilt zien over welke periode je nog opbouw hebt staan.",
    },
    {
        question: "Is vakantiegeld hetzelfde als vakantietoeslag?",
        answer: "Meestal wel. In Nederland worden vakantiegeld en vakantietoeslag vaak als dezelfde arbeidsvoorwaarde gebruikt: meestal minimaal 8% extra boven op je loon, vaak uitbetaald in mei of juni.",
    },
];

const howToSteps = [
    {
        name: "Vul je bruto salaris in",
        text: "Start met je bruto maandloon of een andere loonbasis die past bij je situatie. Gebruik bij twijfel het vaste loon dat normaal meetelt voor vakantiegeld.",
    },
    {
        name: "Kies de opbouwperiode",
        text: "Selecteer over hoeveel maanden je vakantiegeld is opgebouwd. Voor de meeste werknemers gaat het om de periode sinds de vorige uitbetaling in mei of juni.",
    },
    {
        name: "Controleer het vakantiegeldpercentage",
        text: "Gebruik meestal 8 procent als basisregel. Alleen als je cao of contract afwijkt, pas je dit percentage aan.",
    },
    {
        name: "Neem structurele extra looncomponenten mee",
        text: "Voeg structurele toeslagen of provisie alleen toe als die normaal als loon meetellen voor vakantiegeld. Eenmalige bonussen en onkostenvergoedingen laat je buiten beschouwing.",
    },
    {
        name: "Vergelijk bruto uitkomst met je loonstrook",
        text: "Gebruik de bruto uitkomst als controle voor je loonstrook of budget. Houd er rekening mee dat de netto uitbetaling lager kan zijn door loonheffing en regels voor bijzondere beloningen.",
    },
];

const cvIntentLinks = [
  {
    href: "/gratis-cv-maken",
    label: "Gratis CV maken als je rond vakantiegeld over een nieuwe baan nadenkt",
    description: "Gebruik je extra loonruimte of vergelijking direct als aanleiding voor een sterkere sollicitatie.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    label: "CV maken zonder abonnement voor een nieuwe baan of beter pakket",
    description: "Sluit goed aan op bezoekers die hun opties vergelijken maar niet vast willen zitten aan maandelijkse kosten.",
  },
  {
    href: "/beste-cv-maker-nederland",
    label: "Vergelijk eerst de beste CV maker voor Nederlandse sollicitaties",
    description: "Gebruik deze route als prijs, templates en ATS-veiligheid meewegen in je keuze.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV maken als PDF voor snelle sollicitaties in drukke salarisperiodes",
    description: "Bouw je CV online en download daarna een nette versie voor directe versturing.",
  },
];

const euroFormatter = new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
});

const holidayExamples = [2500, 3500, 4500].map((monthlyGross) => {
    const annualGross = monthlyGross * 12;
    const holidayAllowanceGross = annualGross * 0.08;
    const taxEstimate = estimateNetFromTaxableIncome({
        taxableAnnualIncome: annualGross + holidayAllowanceGross,
        applyTaxCredits: true,
        ageProfile: "under_aow",
    });

    return {
        monthlyGross,
        holidayAllowanceGross,
        holidayAllowanceNet: Math.round(holidayAllowanceGross * taxEstimate.effectiveNetRatio),
    };
});

const comparisonRows = [
    {
        term: "Vakantiegeld",
        meaning: "Meestal minimaal 8% extra over je brutoloon.",
        timing: "Vaak uitbetaling in mei of juni.",
    },
    {
        term: "Vakantietoeslag",
        meaning: "In de praktijk vaak hetzelfde begrip als vakantiegeld.",
        timing: "Meestal hetzelfde uitbetaalmoment als vakantiegeld.",
    },
    {
        term: "Vakantiedagen",
        meaning: "Betaalde verlofdagen, geen extra looncomponent.",
        timing: "Neem je op in uren of dagen, niet als apart salarisbedrag.",
    },
    {
        term: "13e maand",
        meaning: "Aparte arbeidsvoorwaarde naast vakantiegeld, vaak rond 8,33% of een extra maandloon.",
        timing: "Vaak in december of volgens cao/contract.",
    },
];

export const metadata: Metadata = {
    title: "Vakantiegeld Berekenen 2026 | 8% Tool + Bruto Netto Uitleg | WerkCV",
    description: "Bereken je vakantiegeld in 2026 met de Nederlandse 8%-regel. Zie direct je bruto vakantiegeld, een ruwe netto-indicatie en het verschil met vakantietoeslag, vakantiedagen en 13e maand.",
    keywords: [
        "vakantiegeld berekenen",
        "vakantie geld berekenen",
        "vakantietoeslag berekenen",
        "vakantiegeld berekenen bruto netto",
        "bruto netto vakantiegeld",
        "netto vakantiegeld berekenen",
        "hoeveel vakantiegeld",
        "vakantiegeld 2026",
        "8 procent vakantiegeld",
        "bruto vakantiegeld berekenen",
        "vakantiegeld calculator",
        "vakantiegeld parttime",
        "vakantiegeld bij uit dienst",
    ],
    alternates: {
        canonical: "https://werkcv.nl/tools/vakantiegeld-berekenen",
    },
};

export default function VakantiegeldBerekenenPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF9]">
            <FAQJsonLd questions={faqItems} />
            <HowToJsonLd
                name="Vakantiegeld berekenen"
                description="Bereken stap voor stap je bruto vakantiegeld en controleer welke looncomponenten meestal meetellen."
                steps={howToSteps}
            />

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
                        { label: "Vakantiegeld berekenen", href: "/tools/vakantiegeld-berekenen" },
                    ]} />
                </div>

                <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
                    <div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                                Geld
                            </span>
                            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                                Bijgewerkt 17 april 2026
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
                            Vakantiegeld berekenen in 2026
                        </h1>
                        <p className="text-lg text-slate-600 font-medium max-w-3xl">
                            Simpel, snel en bruikbaar voor werknemers in loondienst. Deze tool rekent met de Nederlandse basisregel van meestal minimaal 8% en laat direct zien wat je bruto vakantiegeld ongeveer is over de periode die je hebt opgebouwd. Daarna zie je ook een ruwe netto-indicatie en lees je waar het verschil tussen bruto en netto vakantiegeld meestal vandaan komt.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                            {[
                                ["Basisregel", "Minimaal 8%", "voor veel reguliere werknemers"],
                                ["Uitbetaling", "Mei of juni", "meestal, tenzij contract/cao anders zegt"],
                                ["Uitkomst", "Bruto + netto indicatie", "netto blijft een schatting door loonheffing en inhoudingen"],
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
                            Waarom dit nuttig is
                        </p>
                        <div className="space-y-3 text-sm text-slate-600">
                            <p>Veel mensen zoeken op vakantiegeld bruto netto, maar krijgen alleen een kale 8%-formule zonder context.</p>
                            <p>WerkCV rekent met bruto loon in de opgebouwde periode plus optionele structurele extra componenten en geeft daarna een ruwe netto-indicatie op basis van 2026-aannames.</p>
                            <p>Daardoor krijg je een betere indicatie voor loonstrookcontrole, budgetplanning en het verschil tussen gewone maandloonheffing en bijzondere beloningen.</p>
                        </div>
                    </aside>
                </section>

                <section className="mb-8 bg-[#FFF7E8] border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                        In het kort
                    </p>
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                        <div>
                            <p className="text-sm font-black text-slate-900">Hoe bereken je vakantiegeld?</p>
                            <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                                Meestal met deze basisformule: bruto loon in de opbouwperiode x 8%. Deze pagina rekent dat direct voor je door en laat daarna ook een ruwe netto-indicatie zien.
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-black text-slate-900">Wat is het niet?</p>
                            <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                                Vakantiegeld is niet hetzelfde als vakantiedagen of een 13e maand. Vakantietoeslag wordt in Nederland meestal wel als hetzelfde begrip gebruikt als vakantiegeld.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mb-12">
                    <VakantiegeldTool />
                </section>

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-5">
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                            Voorbeelden 2026
                        </p>
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            Voorbeelden vakantiegeld bruto netto in 2026
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                            Dit zijn snelle rekenvoorbeelden bij een volledig opbouwjaar, 8% vakantiegeld,
                            werknemer onder AOW-leeftijd en loonheffingskorting aan. Gebruik ze als grove
                            oriëntatie, niet als vervanging van je loonstrook.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b-2 border-black text-left">
                                    <th className="px-3 py-2 font-black text-slate-900">Bruto maandloon</th>
                                    <th className="px-3 py-2 font-black text-slate-900">Bruto vakantiegeld</th>
                                    <th className="px-3 py-2 font-black text-slate-900">Ruwe netto-indicatie</th>
                                </tr>
                            </thead>
                            <tbody>
                                {holidayExamples.map((example) => (
                                    <tr key={example.monthlyGross} className="border-b border-slate-200">
                                        <td className="px-3 py-2 font-medium text-slate-700">
                                            {euroFormatter.format(example.monthlyGross)}
                                        </td>
                                        <td className="px-3 py-2 font-medium text-slate-700">
                                            {euroFormatter.format(example.holidayAllowanceGross)}
                                        </td>
                                        <td className="px-3 py-2 font-medium text-slate-700">
                                            {euroFormatter.format(example.holidayAllowanceNet)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-slate-500">
                        Netto-indicatie gebaseerd op dezelfde standaardaannames als de calculator op
                        deze pagina. Pensioenpremie, cao-afspraken en persoonlijke inhoudingen kunnen de
                        echte uitbetaling merkbaar veranderen.
                    </p>
                </section>

                <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="mb-5">
                        <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                            Vergelijking
                        </p>
                        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
                            Vakantiegeld, vakantietoeslag, vakantiedagen en 13e maand
                        </h2>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
                            Veel zoekopdrachten lopen door elkaar. Dit is het praktische verschil tussen de termen die werknemers het vaakst samen zoeken.
                        </p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b-2 border-black text-left">
                                    <th className="px-3 py-2 font-black text-slate-900">Term</th>
                                    <th className="px-3 py-2 font-black text-slate-900">Betekenis</th>
                                    <th className="px-3 py-2 font-black text-slate-900">Hoe of wanneer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonRows.map((row) => (
                                    <tr key={row.term} className="border-b border-slate-200">
                                        <td className="px-3 py-2 font-black text-slate-900">{row.term}</td>
                                        <td className="px-3 py-2 font-medium text-slate-700">{row.meaning}</td>
                                        <td className="px-3 py-2 font-medium text-slate-700">{row.timing}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat telt meestal mee?
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Basis bruto salaris</li>
                            <li>Structurele overwerk- of ploegentoeslag als die loon vormen</li>
                            <li>Structurele provisie of commissie</li>
                        </ul>
                    </div>
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Wat telt meestal niet standaard mee?
                        </h2>
                        <ul className="space-y-2 text-sm text-slate-700">
                            <li>Eenmalige bonus of gratificatie</li>
                            <li>Onkostenvergoeding</li>
                            <li>Bedragen die in je cao of arbeidscontract expliciet anders zijn geregeld</li>
                        </ul>
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Bruto naar netto vakantiegeld: waar gaat het verschil zitten?
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Deze tool rekent eerst je bruto vakantiegeld uit en geeft daarna een ruwe netto-indicatie.
                                Op je loonstrook kan het netto bedrag alsnog anders uitvallen omdat je werkgever loonheffing
                                inhoudt via de tabellen voor bijzondere beloningen. Daardoor voelt vakantiegeld vaak zwaarder
                                belast dan een normale salarismaand.
                            </p>
                            <p>
                                Gebruik je bruto uitkomst daarom vooral als basis voor controle en vergelijking, en gebruik
                                de netto-indicatie als tussenstap. Wil je daarna beter snappen wat bruto en netto in jouw
                                situatie betekenen, ga dan verder met de{" "}
                                <Link href="/tools/netto-bruto-calculator" className="font-black underline decoration-2 underline-offset-2 text-slate-900">
                                    netto bruto calculator
                                </Link>
                                {" "}of vergelijk direct met de inhouding op je eigen loonstrook.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-slate-900 mb-4">
                            Vakantiegeld en 13e maand zijn niet hetzelfde
                        </h2>
                        <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                            <p>
                                Vakantiegeld is meestal minimaal 8% van het loon dat je over een periode opbouwt. Een 13e maand is
                                een aparte afspraak in je contract of cao en bestaat niet voor iedere werknemer.
                            </p>
                            <p>
                                Zoek je beide begrippen door elkaar, dan helpt deze pagina vooral voor vakantiegeld. Voor een
                                eindejaars- of extra maanduitkering gebruik je beter de{" "}
                                <Link href="/tools/eindejaarsuitkering-berekenen" className="font-black underline decoration-2 underline-offset-2 text-slate-900">
                                    eindejaarsuitkering berekenen
                                </Link>
                                {" "}tool.
                            </p>
                        </div>
                    </div>
                </section>

                <RelatedToolsSection
                    title="Meer rond loon, verlof en parttime"
                    description="Vakantiegeld staat zelden op zichzelf. Meestal wil je daarna ook je verlofdagen, parttime scenario of netto loonimpact controleren."
                    tools={[
                        {
                            href: "/tools/vakantiedagen-berekenen",
                            title: "Vakantiedagen berekenen",
                            description: "Bekijk hoeveel verlofdagen of uren je opbouwt naast je vakantiegeld.",
                            badge: "Verlof",
                        },
                        {
                            href: "/tools/parttime-salaris-calculator",
                            title: "Parttime salaris calculator",
                            description: "Reken door wat minder uren betekenen voor maandloon, jaarloon en vakantiegeld.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/netto-bruto-calculator",
                            title: "Netto bruto calculator",
                            description: "Zie wat je brutoloon en vakantiegeld ongeveer netto betekenen in 2026.",
                            badge: "Geld",
                        },
                        {
                            href: "/tools/uurloon-calculator",
                            title: "Uurloon calculator",
                            description: "Reken je bruto maand- of jaarsalaris om naar een bruikbaar bruto uurloon.",
                            badge: "Geld",
                        },
                    ]}
                />

                <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                        Van vakantiegeld naar nieuwe rol
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                        Gebruik je loonmoment om je volgende CV-versie klaar te zetten
                    </h2>
                    <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
                        Vakantiegeldvragen komen vaak samen met loonvergelijking, offerchecks
                        en het gevoel dat een nieuwe stap financieel slimmer is. Zet dat moment
                        meteen om in een CV dat je snel kunt gebruiken.
                    </p>
                    <SectionIntentLinks links={cvIntentLinks} locale="nl" />
                </section>

                <section className="mt-12 mb-12">
                    <div className="mb-5">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                            FAQ
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
                            Veelgestelde vragen over vakantiegeld
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
                            <a href="https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld/vraag-en-antwoord/hoe-hoog-is-mijn-vakantiegeld" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Rijksoverheid - Hoe hoog is mijn vakantiegeld?
                            </a>
                        </li>
                        <li>
                            <a href="https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/hulpmiddel-loonbelastingtabellen" target="_blank" rel="noopener noreferrer" className="font-medium text-teal-700 hover:underline">
                                Belastingdienst - Hulpmiddel loonbelastingtabellen en bijzondere beloningen
                            </a>
                        </li>
                    </ul>
                </section>
            </main>

            <Footer />
        </div>
    );
}

