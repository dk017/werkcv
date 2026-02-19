import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Prijzen - CV Maken Kosten | WerkCV.nl",
    description: "Maak gratis je CV en betaal alleen als je downloadt. Eenmalig \u20ac5 voor een professionele PDF. Geen abonnement, geen verborgen kosten.",
    keywords: [
        "cv maken kosten",
        "cv maker prijs",
        "cv downloaden prijs",
        "goedkoop cv maken",
        "cv builder kosten",
        "professioneel cv prijs",
        "cv pdf kosten",
        "cv zonder abonnement",
    ],
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
                        Maak je CV helemaal gratis. Betaal alleen als je tevreden bent en wilt downloaden.
                    </p>
                </div>

                {/* Pricing Card */}
                <div className="max-w-md mx-auto mb-16">
                    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 px-4 py-1 border-3 border-black font-black text-sm" style={{ borderWidth: '3px' }}>
                            EENMALIGE BETALING
                        </div>

                        <div className="text-center pt-4">
                            <div className="text-6xl font-black text-black mb-2">&euro;5</div>
                            <p className="text-lg font-bold text-gray-600 mb-8">per CV download</p>

                            <ul className="text-left space-y-3 mb-8">
                                {[
                                    'Onbeperkt je CV bewerken',
                                    '13+ professionele templates',
                                    '12 kleurthema\'s per template',
                                    'ATS-vriendelijk PDF formaat',
                                    'Direct downloaden na betaling',
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
                                <li>&bull; Eenmalig &euro;5, klaar</li>
                                <li>&bull; Geen abonnement</li>
                                <li>&bull; Gratis bewerken, altijd</li>
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
                </div>

                {/* FAQ */}
                <div>
                    <h2 className="text-2xl font-black text-black text-center mb-8">Veelgestelde vragen over prijzen</h2>
                    <div className="space-y-4 max-w-2xl mx-auto">
                        {[
                            { q: 'Moet ik betalen om mijn CV te maken?', a: 'Nee, het aanmaken en bewerken van je CV is volledig gratis. Je betaalt alleen als je je CV als PDF wilt downloaden.' },
                            { q: 'Is het een abonnement?', a: 'Nee! Het is een eenmalige betaling van \u20ac5. Geen automatische verlengingen, geen verborgen kosten.' },
                            { q: 'Kan ik mijn CV later nog bewerken?', a: 'Ja, je CV blijft opgeslagen en je kunt het altijd gratis bewerken. Alleen voor een nieuwe PDF-download betaal je opnieuw.' },
                            { q: 'Welke betaalmethoden accepteren jullie?', a: 'We accepteren iDEAL, creditcard, Bancontact en andere gangbare betaalmethoden via onze betalingspartner.' },
                        ].map((faq, i) => (
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
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": "WerkCV - Professioneel CV Downloaden",
                        "description": "Maak een professioneel, ATS-vriendelijk CV en download als PDF.",
                        "offers": {
                            "@type": "Offer",
                            "price": "5.00",
                            "priceCurrency": "EUR",
                            "availability": "https://schema.org/InStock",
                        },
                    }),
                }}
            />

            <Footer />
        </div>
    );
}
