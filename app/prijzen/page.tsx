import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Prijzen - CV Maken Kosten | WerkCV",
    description: "Maak gratis je CV en betaal eenmalig €4,99 per CV-download. Daarna kun je dat CV blijven bewerken, van template wisselen en opnieuw downloaden. Geen abonnement.",
    keywords: [
        "cv maken kosten",
        "cv maker prijs",
        "cv downloaden prijs",
        "cv maken betaald",
        "cv betalen per download",
        "goedkoop cv maken",
        "cv builder kosten",
        "professioneel cv prijs",
        "cv pdf kosten",
        "cv zonder abonnement",
    ],
};

const pricingIntentCards = [
    {
        title: "CV maken betaald: wat mensen daar meestal mee bedoelen",
        body: "Deze zoekterm betekent zelden dat iemand per se een duur platform zoekt. Meestal zoekt iemand een serieuze betaalde route waarbij het duidelijk is wanneer je betaalt, wat je krijgt en of er daarna nog maandkosten volgen.",
        href: "/goedkoopste-cv-maker-nederland",
        label: "Vergelijk betaalde routes",
    },
    {
        title: "CV betalen per download: hoe werkt dat bij WerkCV?",
        body: "Bij WerkCV zit de betaling op de definitieve PDF-download van het CV dat je wilt versturen. Je start gratis, bouwt je inhoud op, vergelijkt templates en betaalt pas wanneer je die versie echt wilt downloaden.",
        href: "/cv-maken-zonder-abonnement",
        label: "Lees hoe eenmalig betalen werkt",
    },
] as const;

const pricingFaqs = [
    { q: "Moet ik betalen om mijn CV te maken?", a: "Nee, het aanmaken en bewerken van je CV is volledig gratis. Je betaalt pas als je dat CV als PDF wilt downloaden." },
    { q: "Wat betekent cv maken betaald meestal?", a: "Meestal zoekt iemand een betaalde CV-tool met duidelijke kosten en zonder verrassingen achteraf. Voor WerkCV betekent dat: gratis starten en pas betalen wanneer je jouw definitieve PDF wilt downloaden." },
    { q: "Kan ik mijn CV per download betalen?", a: "Ja. Bij WerkCV betaal je eenmalig per CV wanneer je die definitieve PDF-download wilt doen. Voor datzelfde betaalde CV kun je later terugkomen, bewerken en opnieuw downloaden zonder opnieuw te betalen." },
    { q: "Is het een abonnement?", a: "Nee. Het is een eenmalige betaling van €4,99 per CV. Geen automatische verlengingen en geen verborgen kosten." },
    { q: "Kan ik mijn CV later nog bewerken?", a: "Ja. Na betaling blijft dat CV in je account staan en kun je het later opnieuw openen, bewerken, van template of kleur wisselen en opnieuw downloaden zonder opnieuw te betalen." },
    { q: "Wanneer betaal ik opnieuw?", a: "Alleen als je een nieuw CV als apart document aanmaakt. Voor een CV waarvoor je al hebt betaald, hoef je niet opnieuw te betalen om later nog een PDF te downloaden." },
    { q: "Welke betaalmethoden accepteren jullie?", a: "We accepteren iDEAL, creditcard, Bancontact en andere gangbare betaalmethoden via onze betalingspartner." },
] as const;

// Keep this date in sync with the currently advertised price period.
const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "WerkCV - Professioneel CV Downloaden",
    "description": "Maak een professioneel, ATS-vriendelijk CV en download als PDF. Na betaling kun je hetzelfde CV later opnieuw downloaden.",
    "url": "https://werkcv.nl/prijzen",
    "image": [
        "https://werkcv.nl/opengraph-image",
    ],
    "brand": {
        "@type": "Brand",
        "name": "WerkCV.nl",
    },
    "sku": "cv-download",
    "offers": {
        "@type": "Offer",
        "url": "https://werkcv.nl/prijzen",
        "price": "4.99",
        "priceCurrency": "EUR",
        "priceValidUntil": "2026-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
            "@type": "Organization",
            "name": "WerkCV.nl",
            "url": "https://werkcv.nl",
        },
        "shippingDetails": {
            "@type": "OfferShippingDetails",
            "doesNotShip": true,
        },
        "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "NL",
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
            "merchantReturnLink": "https://werkcv.nl/voorwaarden",
        },
    },
};

export default function PrijzenPage() {
    return (
        <div className="min-h-screen bg-[#FFFEF0]">
            {/* Header */}
            <header className="relative z-10 border-b-4 border-black bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="font-black text-2xl tracking-tight text-black">
                            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                        </span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-bold text-black bg-yellow-400 px-3 py-1 border-2 border-black hover:bg-yellow-300 transition-colors"
                    >
                        CV Maken
                    </Link>
                </div>
            </header>

            <main className="relative z-10 max-w-4xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
                        Simpel & eerlijk geprijsd
                    </h1>
                    <p className="text-lg font-medium text-black max-w-2xl mx-auto">
                        Maak je CV helemaal gratis. Betaal eenmalig per CV zodra je tevreden bent, en blijf datzelfde CV daarna gewoon bewerken en downloaden.
                    </p>
                    <p className="text-sm font-medium text-gray-700 max-w-2xl mx-auto mt-3">
                        Wil je eerst precies zien hoe{" "}
                        <Link
                            href="/cv-maken-zonder-abonnement"
                            className="font-black text-black underline decoration-2 underline-offset-4"
                        >
                            eenmalig betalen
                        </Link>{" "}
                        zich verhoudt tot abonnementen? Bekijk dan eerst de vergelijking.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="max-w-md mx-auto mb-16">
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 px-4 py-1 border-3 border-black font-black text-sm" style={{ borderWidth: '3px' }}>
                            EENMALIGE BETALING
                        </div>

                        <div className="text-center pt-4">
                            <div className="text-6xl font-black text-black mb-2">€4,99</div>
                            <p className="text-lg font-bold text-gray-600 mb-8">eenmalig per CV</p>

                            <ul className="text-left space-y-3 mb-8">
                                {[
                                    'Onbeperkt je CV bewerken',
                                    '13+ professionele templates',
                                    '12 kleurthema\'s per template',
                                    'ATS-vriendelijk PDF formaat',
                                    'Direct downloaden na betaling',
                                    'Later opnieuw downloaden zonder extra betaling',
                                    'Template en kleur later nog aanpassen',
                                    'Geen abonnement of verborgen kosten',
                                    'CV blijft opgeslagen voor later',
                                ].map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="bg-green-400 border-2 border-black w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="font-medium text-black">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/"
                                className="block w-full bg-yellow-400 text-black py-4 font-black text-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all text-center"
                            >
                                Begin nu gratis
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mb-16 grid gap-6 md:grid-cols-2">
                    {pricingIntentCards.map((card) => (
                        <article key={card.title} className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h2 className="text-2xl font-black text-black">{card.title}</h2>
                            <p className="mt-3 text-sm font-medium leading-relaxed text-gray-700">
                                {card.body}
                            </p>
                            <Link
                                href={card.href}
                                className="mt-5 inline-block border-2 border-black bg-yellow-200 px-3 py-2 text-sm font-black text-black hover:bg-yellow-300 transition-colors"
                            >
                                {card.label}
                            </Link>
                        </article>
                    ))}
                </div>

                {/* Comparison */}
                <div className="mb-16">
                    <h2 className="text-2xl font-black text-black text-center mb-8">Waarom WerkCV.nl?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-12 h-12 bg-red-400 border-3 border-black flex items-center justify-center mb-4 rotate-2" style={{ borderWidth: '3px' }}>
                                <span className="text-xl font-black">X</span>
                            </div>
                            <h3 className="font-black text-black mb-2">Andere CV-sites</h3>
                            <ul className="space-y-2 text-sm font-medium text-gray-700">
                                <li>&bull; Abonnement van &euro;10-25 per maand</li>
                                <li>&bull; Automatische verlenging</li>
                                <li>&bull; Gratis proefperiode als lokmiddel</li>
                                <li>&bull; Opzeggen is lastig</li>
                            </ul>
                        </div>
                        <div className="bg-yellow-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
                            <div className="absolute -top-3 -right-3 bg-green-400 border-3 border-black px-2 py-0.5 text-xs font-black rotate-3" style={{ borderWidth: '3px' }}>
                                WerkCV.nl
                            </div>
                            <div className="w-12 h-12 bg-white border-3 border-black flex items-center justify-center mb-4 -rotate-2" style={{ borderWidth: '3px' }}>
                                <span className="text-xl font-black">&hearts;</span>
                            </div>
                            <h3 className="font-black text-black mb-2">WerkCV.nl</h3>
                            <ul className="space-y-2 text-sm font-black text-black">
                                <li>&bull; Eenmalig €4,99 per CV</li>
                                <li>&bull; Geen abonnement</li>
                                <li>&bull; Later opnieuw bewerken en downloaden</li>
                                <li>&bull; Eerlijk en transparant</li>
                            </ul>
                        </div>
                        <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="w-12 h-12 bg-gray-300 border-3 border-black flex items-center justify-center mb-4 -rotate-1" style={{ borderWidth: '3px' }}>
                                <span className="text-xl font-black">?</span>
                            </div>
                            <h3 className="font-black text-black mb-2">Zelf doen in Word</h3>
                            <ul className="space-y-2 text-sm font-medium text-gray-700">
                                <li>&bull; Uren bezig met opmaak</li>
                                <li>&bull; Niet ATS-geoptimaliseerd</li>
                                <li>&bull; Moeilijk professioneel te krijgen</li>
                                <li>&bull; Geen templates beschikbaar</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6 bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-xs font-black uppercase tracking-[0.18em] text-gray-600 mb-2">
                            Vergelijking
                        </p>
                        <p className="text-sm md:text-base font-medium text-gray-700">
                            Twijfel je tussen een eenmalige CV-builder en een abonnementsplatform? Bekijk dan onze eerlijke vergelijkingen:
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Link href="/cv-maken-zonder-abonnement" className="border-2 border-black bg-yellow-200 px-3 py-2 text-sm font-black text-black hover:bg-yellow-300 transition-colors">
                                CV zonder abonnement
                            </Link>
                            <Link href="/beste-cv-maker-nederland" className="border-2 border-black bg-blue-200 px-3 py-2 text-sm font-black text-black hover:bg-blue-300 transition-colors">
                                Beste CV maker NL
                            </Link>
                            <Link href="/cv-gids/welke-cv-builder-past-bij-jou-in-nederland" className="border-2 border-black bg-blue-200 px-3 py-2 text-sm font-black text-black hover:bg-blue-300 transition-colors">
                                Welke CV builder past bij jou?
                            </Link>
                            <Link href="/cv-gids/beste-cv-builder-zonder-abonnement" className="border-2 border-black bg-yellow-200 px-3 py-2 text-sm font-black text-black hover:bg-yellow-300 transition-colors">
                                Beste zonder abonnement
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-cvmaker" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs CVMaker
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-cv-nl" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs CV.nl
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-cvwizard" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs CVwizard
                            </Link>
                            <Link href="/cv-nl-opzeggen" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                CV.nl opzeggen
                            </Link>
                            <Link href="/cvmaker-opzeggen" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                CVMaker opzeggen
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-cvster" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs CVster
                            </Link>
                            <Link href="/cvster-opzeggen" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                CVster opzeggen
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-europass" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs Europass
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-resumaker" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs Resumaker
                            </Link>
                            <Link href="/cv-gids/werkcv-vs-maakeencv" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                WerkCV vs maakeencv.nl
                            </Link>
                            <Link href="/cv-gids/canva-vs-cv-builder-voor-sollicitaties" className="border-2 border-black bg-[#FFFEF9] px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors">
                                Canva vs CV builder
                            </Link>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-2xl font-black text-black text-center mb-8">Veelgestelde vragen over prijzen</h2>
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {pricingFaqs.map((faq, i) => (
                            <details key={i} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                                <summary className="p-4 font-black text-black cursor-pointer flex items-center justify-between">
                                    {faq.q}
                                    <span className="text-xl ml-2 group-open:rotate-45 transition-transform">+</span>
                                </summary>
                                <div className="px-4 pb-4 font-medium text-gray-700 border-t-2 border-black pt-3">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </main>

            {/* JSON-LD Product Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(productJsonLd),
                }}
            />

            <Footer />
        </div>
    );
}

