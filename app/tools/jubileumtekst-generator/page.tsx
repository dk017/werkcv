import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import JubileumtekstTool from "./JubileumtekstTool";

const faqItems = [
    {
        question: "Wat schrijf je voor iemand die 25 jaar in dienst is?",
        answer: "Noem de mijlpaal, bedank de persoon voor een concrete bijdrage en kies een afsluiting die bij jullie werkrelatie past. Een voorbeeld: ‘Gefeliciteerd met 25 jaar in dienst. Ik waardeer vooral hoe je nieuwe collega's op weg helpt en ook onder druk rustig blijft. Dank voor alles wat je in die jaren aan het team hebt bijgedragen.’",
    },
    {
        question: "Hoe maak ik een werkjubileum tekst persoonlijk?",
        answer: "Vervang algemene complimenten door één herkenbaar detail: een project, terugkerende bijdrage, vakkennis of manier van samenwerken. Gebruik alleen informatie die de ontvanger prettig vindt om terug te lezen, zeker in een openbare post.",
    },
    {
        question: "Is een grappige jubileumtekst gepast?",
        answer: "Lichte humor kan bij een collega die je goed kent, maar vermijd grappen over leeftijd, salaris, privéleven, fouten of pensioen. Kies bij twijfel voor warm en concreet; dat voelt persoonlijk zonder risico op ongemak.",
    },
    {
        question: "Wordt mijn invoer opgeslagen?",
        answer: "Nee. Deze generator stelt de tekst lokaal in je browser samen en vraagt geen account. Deel in een LinkedIn- of teambericht desondanks geen vertrouwelijke resultaten of privé-informatie.",
    },
];

export const metadata: Metadata = buildDutchMetadata({
    title: "Werkjubileum Tekst Generator – 25 Jaar in Dienst | WerkCV",
    description: "Maak gratis een persoonlijke tekst voor een werkjubileum. Kies jaren, relatie, toon en kanaal en krijg 3 teksten voor kaart, Teams, e-mail of LinkedIn.",
    path: "/tools/jubileumtekst-generator",
    keywords: [
        "werkjubileum tekst",
        "25 jaar in dienst tekst",
        "jubileum collega tekst",
        "werkjubileum tekst generator",
        "jubileum medewerker tekst",
        "gefeliciteerd werkjubileum",
    ],
});

export default function JubileumtekstGeneratorPage() {
    const applicationSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Werkjubileum tekst generator",
        url: "https://werkcv.nl/tools/jubileumtekst-generator",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "nl-NL",
        offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
        description: "Gratis generator voor Nederlandse werkjubileumteksten voor kaart, teambericht, e-mail en LinkedIn.",
    };

    return (
        <div className="min-h-screen bg-[#FFFEF0]">
            <FAQJsonLd questions={faqItems} />
            <JsonLd data={applicationSchema} />
            <header className="border-b-4 border-black bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link href="/" className="text-2xl font-black tracking-tight text-black">
                        Werk<span className="bg-yellow-400 px-1">CV</span>.nl
                    </Link>
                    <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-black">← Alle tools</Link>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
                <Breadcrumbs items={[
                    { label: "Home", href: "/" },
                    { label: "Tools", href: "/tools" },
                    { label: "Werkjubileum tekst generator", href: "/tools/jubileumtekst-generator" },
                ]} />

                <section className="mt-9 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            <span className="border border-violet-300 bg-violet-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-violet-800">Gratis teksttool</span>
                            <span className="border border-slate-300 bg-white px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">Bijgewerkt 12 augustus 2026</span>
                        </div>
                        <h1 className="mt-4 text-4xl font-black leading-tight text-black sm:text-5xl">Werkjubileum tekst generator</h1>
                        <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
                            Schrijf iets dat verder gaat dan “gefeliciteerd met 25 jaar in dienst”. Kies jullie relatie, het aantal jaren, de toon en waar je de tekst deelt. Voeg één echte bijdrage toe en krijg drie werkgeschikte varianten die je zelf kunt bijschaven.
                        </p>
                        <a href="#generator" className="mt-7 inline-flex border-4 border-black bg-yellow-400 px-5 py-3 font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">Maak een jubileumtekst</a>
                    </div>
                    <aside className="h-fit border-4 border-black bg-black p-6 text-white shadow-[7px_7px_0px_0px_rgba(78,205,196,1)]">
                        <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">Een goede tekst bevat</p>
                        <ol className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
                            <li><strong className="text-white">1. De mijlpaal:</strong> bijvoorbeeld 5, 12,5 of 25 jaar.</li>
                            <li><strong className="text-white">2. Echt bewijs:</strong> wat deze persoon zichtbaar bijdraagt.</li>
                            <li><strong className="text-white">3. Passende afstand:</strong> anders voor een kaart, HR-mail of openbare post.</li>
                        </ol>
                    </aside>
                </section>

                <section className="mt-12">
                    <JubileumtekstTool />
                </section>

                <section className="mt-16">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Direct te gebruiken</p>
                    <h2 className="mt-2 text-3xl font-black text-black">Tekst voor 25 jaar in dienst: drie vertrekpunten</h2>
                    <div className="mt-6 grid gap-5 md:grid-cols-3">
                        {[
                            ["Voor een collega", "Gefeliciteerd met je 25-jarig werkjubileum. Ik waardeer je vakkennis, je nuchtere blik en de manier waarop je altijd tijd maakt om een collega te helpen. Dank voor alles wat je aan het team bijdraagt."],
                            ["Als leidinggevende", "Van harte gefeliciteerd met 25 jaar in dienst. Je betrokkenheid en betrouwbare bijdrage zijn van grote waarde voor ons team. Dank voor je vakmanschap en voor de kennis die je al zoveel jaren deelt."],
                            ["Kort voor op een kaart", "25 jaar in dienst — een bijzondere mijlpaal. Gefeliciteerd en dank voor je jarenlange inzet, collegialiteit en alle mooie momenten samen."],
                        ].map(([title, text]) => (
                            <article key={title} className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <h3 className="text-lg font-black text-black">{title}</h3>
                                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">“{text}”</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="mt-16 grid gap-6 lg:grid-cols-2">
                    <div className="border-4 border-black bg-[#E9FBF8] p-6 sm:p-8">
                        <h2 className="text-2xl font-black text-black">Waarom een concreet detail het verschil maakt</h2>
                        <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                            “Bedankt voor je inzet” is vriendelijk, maar kan aan iedereen gericht zijn. Een klein, waar detail maakt waardering herkenbaar: hoe iemand nieuwe collega&apos;s inwerkt, kennis bewaart, klanten geruststelt of het team door een lastig project hielp. Noem één detail; een complete loopbaan samenvatten hoeft niet.
                        </p>
                    </div>
                    <div className="border-4 border-black bg-[#F7F3FF] p-6 sm:p-8">
                        <h2 className="text-2xl font-black text-black">Openbaar bericht? Eerst toestemming en context</h2>
                        <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                            Een kaart of persoonlijke e-mail is privé; een LinkedIn-post niet. Controleer of de collega openbaar genoemd wil worden en laat klantnamen, vertrouwelijke resultaten, gezondheidsinformatie en grappen over leeftijd of pensioen weg. Kies bij twijfel een persoonlijk bericht.
                        </p>
                    </div>
                </section>

                <section className="mt-16">
                    <h2 className="text-3xl font-black text-black">Veelgestelde vragen</h2>
                    <div className="mt-6 space-y-4">
                        {faqItems.map((faq) => (
                            <details key={faq.question} className="border-4 border-black bg-white p-5">
                                <summary className="cursor-pointer list-none text-lg font-black text-black">{faq.question}</summary>
                                <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </section>

                <section className="mt-16 border-4 border-black bg-yellow-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
                    <h2 className="text-2xl font-black text-black">Een jubileum kan ook een loopbaanmoment zijn</h2>
                    <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">Wil de jubilaris zijn of haar ervaring opnieuw zichtbaar maken? Werk dan het LinkedIn-profiel en cv bij met concrete projecten, expertise en impact uit die jaren.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <Link href="/cv-tips/linkedin-profiel-maken" className="border-3 border-black bg-white px-4 py-2 text-sm font-black text-black" style={{ borderWidth: "3px" }}>LinkedIn-profiel maken</Link>
                        <Link href="/tools/werkervaring-bullets" className="border-3 border-black bg-black px-4 py-2 text-sm font-black text-white" style={{ borderWidth: "3px" }}>Werkervaring aanscherpen</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
