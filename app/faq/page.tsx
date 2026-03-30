import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Veelgestelde Vragen (FAQ) - CV Maken | WerkCV.nl",
    description: "Antwoorden op veelgestelde vragen over WerkCV.nl. Alles over CV maken, betaling, templates, ATS-optimalisatie en meer.",
    keywords: [
        "cv maken vragen",
        "cv builder faq",
        "cv downloaden hulp",
        "ATS cv uitleg",
        "cv template vragen",
        "werkcv hulp",
    ],
};

const faqs = [
    {
        category: "Over WerkCV.nl",
        questions: [
            {
                q: "Wat is WerkCV.nl?",
                a: "WerkCV.nl is een online CV-builder waarmee je snel en eenvoudig een professioneel CV kunt maken. Je kiest een template, vult je gegevens in en downloadt je CV als PDF. Het is speciaal ontworpen voor de Nederlandse arbeidsmarkt."
            },
            {
                q: "Is WerkCV.nl gratis?",
                a: "Het aanmaken en bewerken van je CV is volledig gratis. Je betaalt eenmalig €4,99 per CV wanneer je dat CV als PDF wilt downloaden. Er zijn geen abonnementen of verborgen kosten."
            },
            {
                q: "Hoe verschilt WerkCV.nl van andere CV-sites?",
                a: "De meeste CV-sites werken met dure maandabonnementen (\u20ac10-25 per maand). Wij vragen een eenmalige betaling van €4,99 per CV. Daarna kun je datzelfde CV later opnieuw bewerken en downloaden zonder extra betaling. Geen automatische verlengingen, geen gedoe met opzeggen."
            },
        ],
    },
    {
        category: "CV Maken",
        questions: [
            {
                q: "Hoe maak ik een CV op WerkCV.nl?",
                a: "Je kunt op twee manieren beginnen: upload je bestaande CV (PDF of Word) en wij zetten het automatisch om, of begin vanaf nul met een leeg template. Daarna bewerk je alles in onze live editor met direct voorbeeld."
            },
            {
                q: "Kan ik mijn bestaande CV uploaden?",
                a: "Ja! Upload je bestaande CV in PDF- of Word-formaat. Onze AI leest je CV uit en vult alle velden automatisch in. Je kunt daarna alles bewerken en een nieuw template kiezen."
            },
            {
                q: "Hoeveel templates zijn er beschikbaar?",
                a: "We hebben 13+ professionele templates in verschillende stijlen: klassiek, modern, creatief en minimaal. Elk template is beschikbaar in 12 kleurthema's, wat meer dan 150 unieke combinaties oplevert."
            },
            {
                q: "Zijn de templates ATS-vriendelijk?",
                a: "Ja, al onze templates zijn geoptimaliseerd voor Applicant Tracking Systems (ATS). Dit betekent dat je CV correct wordt gelezen door de software die veel werkgevers gebruiken om sollicitaties te verwerken."
            },
            {
                q: "Kan ik mijn CV later nog bewerken?",
                a: "Ja, je CV blijft opgeslagen en je kunt het op elk moment gratis bewerken. Je wijzigingen worden automatisch opgeslagen terwijl je typt, ook nadat je al voor dat CV hebt betaald."
            },
        ],
    },
    {
        category: "Betaling & Download",
        questions: [
            {
                q: "Hoeveel kost het om een CV te downloaden?",
                a: "Een CV downloaden als PDF kost eenmalig €4,99 per CV. Dit is een eenmalige betaling, geen abonnement."
            },
            {
                q: "Moet ik opnieuw betalen als ik mijn CV later aanpas?",
                a: "Nee. Als je eenmaal voor een CV hebt betaald, kun je later gewoon inloggen, datzelfde CV opnieuw openen, aanpassen, van template of kleur wisselen en opnieuw downloaden zonder opnieuw te betalen."
            },
            {
                q: "Welke betaalmethoden worden geaccepteerd?",
                a: "We accepteren iDEAL, creditcard, Bancontact en andere gangbare betaalmethoden via onze beveiligde betalingspartner Polar."
            },
            {
                q: "Kan ik mijn geld terugkrijgen?",
                a: "Omdat het een digitaal product betreft dat direct na betaling wordt geleverd, is terugbetaling niet mogelijk. Je kunt je CV echter wel eerst gratis bewerken en bekijken voordat je betaalt."
            },
            {
                q: "In welk formaat wordt mijn CV gedownload?",
                a: "Je CV wordt gedownload als een professioneel PDF-bestand. Dit is het meest gebruikte en geaccepteerde formaat voor sollicitaties in Nederland."
            },
        ],
    },
    {
        category: "Privacy & Veiligheid",
        questions: [
            {
                q: "Is mijn data veilig?",
                a: "Ja, we gebruiken een beveiligde HTTPS-verbinding en slaan je gegevens veilig op. We verkopen je data nooit aan derden. Lees ons volledige privacybeleid voor meer informatie."
            },
            {
                q: "Kan ik mijn gegevens laten verwijderen?",
                a: "Ja, op grond van de AVG (GDPR) heb je het recht om je gegevens te laten verwijderen. Neem contact met ons op en we verwijderen al je gegevens."
            },
        ],
    },
];

const comparisonGuides = [
    {
        href: "/cv-gids/welke-cv-builder-past-bij-jou-in-nederland",
        title: "Welke CV builder past bij jou?",
        body: "Gebruik deze keuzehulp als je niet alleen vragen hebt over WerkCV, maar ook wilt vergelijken met andere CV-tools.",
    },
    {
        href: "/cv-gids/beste-cv-builder-zonder-abonnement",
        title: "Beste CV builder zonder abonnement",
        body: "Handig als je vooral prijsmodel, eenmalig betalen en abonnementsverschillen wilt afwegen.",
    },
    {
        href: "/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures",
        title: "ATS-vriendelijke CV builder",
        body: "Voor als je wilt begrijpen wat ATS-vriendelijk echt betekent zonder in marketingtaal te blijven hangen.",
    },
    {
        href: "/cv-gids/canva-vs-cv-builder-voor-sollicitaties",
        title: "Canva vs CV builder",
        body: "Gebruik deze gids als je twijfelt tussen een designtool en een rustiger sollicitatiedocument.",
    },
];

export default function FAQPage() {
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
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-black text-black mb-4">Veelgestelde Vragen</h1>
                    <p className="text-lg font-medium text-black">
                        Alles wat je wilt weten over WerkCV.nl
                    </p>
                </div>

                <div className="space-y-10">
                    {faqs.map((section, si) => (
                        <section key={si}>
                            <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                                <span className="bg-yellow-400 px-2 py-1 border-2 border-black -rotate-1">
                                    {section.category}
                                </span>
                            </h2>
                            <div className="space-y-3">
                                {section.questions.map((faq, qi) => (
                                    <details key={qi} className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                                        <summary className="p-4 font-black text-black cursor-pointer flex items-center justify-between text-sm sm:text-base">
                                            <span className="pr-4">{faq.q}</span>
                                            <span className="text-xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <div className="px-4 pb-4 font-medium text-gray-700 border-t-2 border-black pt-3 text-sm leading-relaxed">
                                            {faq.a}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <section className="mt-14">
                    <h2 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                        <span className="bg-yellow-400 px-2 py-1 border-2 border-black -rotate-1">
                            Vergelijkingsgidsen
                        </span>
                    </h2>
                    <p className="text-sm font-medium text-gray-700 leading-relaxed mb-5">
                        Nog aan het twijfelen tussen WerkCV en andere routes? Gebruik deze pagina&apos;s als je keuze eerder gaat over tooltype, prijsmodel of ATS-aanpak dan over een losse productvraag.
                    </p>
                    <div className="grid gap-4 md:grid-cols-2">
                        {comparisonGuides.map((guide) => (
                            <Link
                                key={guide.href}
                                href={guide.href}
                                className="block bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-100 transition-colors"
                            >
                                <p className="text-sm font-black text-black">{guide.title}</p>
                                <p className="mt-2 text-sm font-medium leading-relaxed text-gray-700">{guide.body}</p>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <div className="bg-yellow-400 border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        <h2 className="text-2xl font-black text-black mb-3">Nog vragen?</h2>
                        <p className="font-medium text-black mb-6">
                            Heb je een vraag die hier niet beantwoord wordt? Neem gerust contact met ons op.
                        </p>
                        <Link
                            href="/"
                            className="inline-block bg-black text-white px-8 py-3 font-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:bg-gray-800 transition-colors"
                        >
                            Begin je CV
                        </Link>
                    </div>
                </div>
            </main>

            {/* JSON-LD FAQPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.flatMap(section =>
                            section.questions.map(faq => ({
                                "@type": "Question",
                                "name": faq.q,
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": faq.a,
                                },
                            }))
                        ),
                    }),
                }}
            />

            <Footer />
        </div>
    );
}

