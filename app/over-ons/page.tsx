import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Over Ons - WerkCV.nl | Nederlands CV Platform",
    description: "WerkCV.nl helpt Nederlanders een professioneel CV te maken. Geen abonnement, eerlijke prijs. Leer meer over onze missie.",
    keywords: [
        "werkcv",
        "cv maker nederland",
        "nederlands cv platform",
        "cv builder nederland",
        "over werkcv",
    ],
};

export default function OverOnsPage() {
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

            <main className="relative z-10 max-w-3xl mx-auto px-6 py-12">
                <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    <h1 className="text-3xl font-black text-black mb-6">Over WerkCV.nl</h1>

                    <div className="space-y-6 text-black">
                        <section>
                            <h2 className="text-xl font-black mb-3 flex items-center gap-2">
                                <span className="bg-yellow-400 px-2 py-0.5 border-2 border-black -rotate-1">Onze Missie</span>
                            </h2>
                            <p className="font-medium leading-relaxed">
                                WerkCV.nl is gebouwd met een simpel doel: iedereen in Nederland de kans geven om een
                                professioneel CV te maken, zonder gedoe en zonder een duur abonnement. Wij geloven dat
                                een goed CV geen luxe zou moeten zijn.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">Waarom WerkCV.nl?</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    { title: 'Eerlijke prijs', desc: 'Eenmalig \u20ac5 per download. Geen abonnementen, geen verborgen kosten, geen automatische verlengingen.' },
                                    { title: 'ATS-geoptimaliseerd', desc: 'Al onze templates zijn getest met de meest gebruikte Applicant Tracking Systems in Nederland.' },
                                    { title: 'Nederlandse focus', desc: 'Ontworpen voor de Nederlandse arbeidsmarkt. Met de juiste opmaak, secties en taal die werkgevers verwachten.' },
                                    { title: 'Privacy eerst', desc: 'Je gegevens zijn van jou. We verkopen niets aan derden en je kunt je data altijd laten verwijderen.' },
                                ].map((item, i) => (
                                    <div key={i} className="border-3 border-black p-4 bg-gray-50" style={{ borderWidth: '3px' }}>
                                        <h3 className="font-black text-sm mb-1">{item.title}</h3>
                                        <p className="text-sm font-medium text-gray-700">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">Hoe het werkt</h2>
                            <div className="space-y-4">
                                {[
                                    { step: '1', title: 'Upload of begin nieuw', desc: 'Upload je bestaande CV of begin vanaf nul met een leeg template.' },
                                    { step: '2', title: 'Bewerk in de live editor', desc: 'Vul je gegevens in en zie direct hoe je CV eruitziet. Wissel van template en kleurthema wanneer je wilt.' },
                                    { step: '3', title: 'Download als PDF', desc: 'Tevreden? Download je CV als professionele PDF voor een eenmalige betaling van \u20ac5.' },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="w-10 h-10 bg-yellow-400 border-3 border-black flex items-center justify-center flex-shrink-0 font-black text-lg" style={{ borderWidth: '3px' }}>
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="font-black text-sm">{item.title}</h3>
                                            <p className="text-sm font-medium text-gray-700">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">Ons team</h2>
                            <p className="font-medium leading-relaxed">
                                WerkCV.nl is een Nederlands initiatief, gebouwd door een team dat gelooft in
                                toegankelijkheid en eerlijkheid. We werken continu aan het verbeteren van onze
                                templates, functies en gebruikservaring.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-black mb-3">Contact</h2>
                            <p className="font-medium leading-relaxed">
                                Heb je vragen, suggesties of feedback? We horen graag van je.
                                Neem contact met ons op via het e-mailadres op onze website.
                            </p>
                        </section>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <Link
                        href="/"
                        className="inline-block bg-yellow-400 text-black px-8 py-4 font-black text-lg border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
                    >
                        Begin nu je CV
                    </Link>
                </div>
            </main>

            {/* JSON-LD Organization Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Organization",
                        "name": "WerkCV.nl",
                        "url": "https://werkcv.nl",
                        "description": "Online CV-builder voor de Nederlandse arbeidsmarkt. Maak een professioneel, ATS-vriendelijk CV.",
                    }),
                }}
            />

            <Footer />
        </div>
    );
}
