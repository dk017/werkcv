import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getLanguageAlternates } from "@/lib/i18n/route-pairs";

export const metadata: Metadata = {
    title: "Privacybeleid - WerkCV",
    description: "Hoe WerkCV.nl omgaat met je persoonsgegevens. Lees ons privacybeleid over gegevensverzameling, AVG-rechten en beveiliging.",
    alternates: {
        canonical: "https://werkcv.nl/privacy",
        languages: getLanguageAlternates("/privacy") ?? undefined,
    },
};

export default function PrivacyPage() {
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
                    <h1 className="text-3xl font-black text-black mb-2">Privacybeleid</h1>
                    <p className="text-sm font-medium text-gray-500 mb-8">Laatst bijgewerkt: juli 2026</p>

                    <div className="prose prose-sm max-w-none space-y-6 text-black">
                        <section>
                            <h2 className="text-lg font-black text-black mb-2">1. Wie zijn wij</h2>
                            <p className="font-medium leading-relaxed">
                                WerkCV.nl is een online CV-builder waarmee je eenvoudig een professioneel CV kunt maken en downloaden als PDF.
                                Je kunt contact met ons opnemen via het e-mailadres op onze website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">2. Welke gegevens verzamelen wij</h2>
                            <p className="font-medium leading-relaxed mb-2">
                                Wij verzamelen en verwerken de volgende persoonsgegevens die je zelf invoert bij het maken van je CV:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li>Naam, adres, postcode en woonplaats</li>
                                <li>E-mailadres en telefoonnummer</li>
                                <li>Geboortedatum, geboorteplaats, nationaliteit</li>
                                <li>Werkervaring, opleiding, stages, vaardigheden en cursussen</li>
                                <li>Overige informatie die je in je CV invult</li>
                                <li>Bestanden en afbeeldingen die je zelf uploadt voor een CV- of profielfotofunctie</li>
                                <li>Technische gebruiksgegevens, zoals bezochte pagina&apos;s, apparaattype, browser en interacties met de editor</li>
                            </ul>
                            <p className="font-medium leading-relaxed mt-2">
                                De standaard CV-download wordt afgerekend via Dodo Payments. Voor bepaalde aanvullende
                                producten kan Polar worden gebruikt. WerkCV slaat geen volledige creditcardnummers of
                                bankgegevens op.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">3. Waarvoor gebruiken wij je gegevens</h2>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li>Het aanmaken en opslaan van je CV</li>
                                <li>Het genereren en leveren van je PDF-download</li>
                                <li>Het verwerken van betalingen</li>
                                <li>Het uitvoeren van AI-functies die je zelf start, zoals CV-import, optimalisatie of tekstgeneratie</li>
                                <li>Het meten en verbeteren van de werking, betrouwbaarheid en gebruiksvriendelijkheid van WerkCV</li>
                                <li>Het voorkomen van misbruik en het oplossen van technische problemen</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">4. Rechtsgrond</h2>
                            <p className="font-medium leading-relaxed">
                                Voor account-, CV-, AI- en betaalfuncties verwerken wij gegevens voor het uitvoeren van
                                de gevraagde dienst of overeenkomst (Art. 6(1)(b) AVG). Voor beveiliging, foutonderzoek
                                en beperkte interne productanalyse kunnen wij ons beroepen op een gerechtvaardigd belang
                                (Art. 6(1)(f) AVG). Voor externe analytics is toestemming de rechtsgrond waar de
                                toepasselijke regels of technische impact dat vereisen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">5. Cookies</h2>
                            <p className="font-medium leading-relaxed">
                                WerkCV gebruikt functionele opslag voor onder meer inloggen, sessies, taalkeuze en het
                                bewaren van je voortgang. Daarnaast gebruiken we eigen productanalytics om de funnel en
                                technische werking te begrijpen. Google Analytics en Microsoft Clarity kunnen technische
                                gebruiksgegevens en online identifiers verwerken. WerkCV gebruikt deze diensten voor
                                statistiek en productverbetering, niet om CV-inhoud te verkopen of voor gepersonaliseerde
                                advertenties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">6. Bewaartermijn</h2>
                            <p className="font-medium leading-relaxed">
                                Je CV-gegevens worden bewaard zolang je account actief is of zolang dat nodig is om de
                                dienst te leveren. Betaal- en factuurgegevens worden bewaard voor de termijnen die voor
                                administratie en belasting gelden. Technische en analytische gegevens bewaren we niet
                                langer dan nodig voor productanalyse, beveiliging en foutonderzoek. Je kunt op elk moment
                                verzoeken om verwijdering van gegevens die niet langer wettelijk of contractueel nodig zijn.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">7. Delen met derden</h2>
                            <p className="font-medium leading-relaxed mb-2">
                                Wij delen je gegevens alleen met de volgende partijen, uitsluitend voor zover nodig voor onze dienstverlening:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li><strong>Dodo Payments</strong> - voor de standaard CV-download, betaling, belastingafhandeling en facturatie</li>
                                <li><strong>Polar</strong> - voor betalingen van bepaalde aanvullende producten</li>
                                <li><strong>OpenAI</strong> - voor AI-functies die je zelf start, zoals CV-import, analyse, herschrijven en tekstgeneratie</li>
                                <li><strong>Hetzner</strong> - voor hosting en opslag binnen de EU</li>
                                <li><strong>Google Analytics</strong> - voor website- en gebruiksstatistieken</li>
                                <li><strong>Microsoft Clarity</strong> - voor geaggregeerde gebruiksanalyse en het opsporen van UX-problemen</li>
                                <li><strong>E-maildienstverlener</strong> - voor inlogcodes, serviceberichten, support en antwoorden op contactverzoeken</li>
                            </ul>
                            <p className="font-medium leading-relaxed mt-2">
                                We delen alleen gegevens die nodig zijn voor de betreffende functie. CV-inhoud wordt niet
                                opgenomen in onze analytics-events en wij verkopen je persoonsgegevens nooit aan derden.
                                Sommige leveranciers kunnen gegevens buiten de Europese Economische Ruimte verwerken;
                                daarbij gebruiken we de waarborgen en contractuele afspraken die voor de betreffende
                                leverancier beschikbaar en vereist zijn.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">8. Jouw rechten (AVG)</h2>
                            <p className="font-medium leading-relaxed mb-2">
                                Op grond van de Algemene Verordening Gegevensbescherming (AVG) heb je de volgende rechten:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 font-medium">
                                <li><strong>Recht op inzage</strong> - Je mag opvragen welke gegevens wij van je hebben</li>
                                <li><strong>Recht op rectificatie</strong> - Je mag je gegevens laten corrigeren</li>
                                <li><strong>Recht op wissing</strong> - Je mag je gegevens laten verwijderen</li>
                                <li><strong>Recht op dataportabiliteit</strong> - Je mag je gegevens in een gangbaar formaat ontvangen</li>
                                <li><strong>Recht op bezwaar</strong> - Je mag bezwaar maken tegen de verwerking van je gegevens</li>
                            </ul>
                            <p className="font-medium leading-relaxed mt-2">
                                Om gebruik te maken van deze rechten kun je contact met ons opnemen via e-mail.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">9. Beveiliging</h2>
                            <p className="font-medium leading-relaxed">
                                Wij nemen passende technische en organisatorische maatregelen om je persoonsgegevens te beschermen tegen
                                verlies, misbruik of ongeautoriseerde toegang. Onze website maakt gebruik van een beveiligde HTTPS-verbinding.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-black text-black mb-2">10. Contact</h2>
                            <p className="font-medium leading-relaxed">
                                Heb je vragen over dit privacybeleid of wil je gebruik maken van je rechten?
                                Neem dan contact met ons op via het e-mailadres op onze website.
                                Je hebt ook het recht om een klacht in te dienen bij de Autoriteit Persoonsgegevens.
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
