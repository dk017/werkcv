import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import OverurenTool from "./OverurenTool";

const faqItems = [
  {
    question: "Heb je in Nederland altijd recht op overwerktoeslag?",
    answer:
      "Nee. Er is geen algemeen wettelijk recht op overwerktoeslag. Of je toeslag krijgt hangt meestal af van je arbeidsovereenkomst, personeelsregeling of cao.",
  },
  {
    question: "Hoe bereken je de waarde van overuren?",
    answer:
      "Je begint met je bruto uurloon op basis van salaris en contracturen. Daarna vermenigvuldig je dat met het aantal extra uren en eventueel een afgesproken toeslagpercentage.",
  },
  {
    question: "Is 25%, 50% of 100% toeslag verplicht?",
    answer:
      "Nee. Zulke percentages komen veel voor in contracten of cao's, maar zijn niet automatisch wettelijk verplicht voor elke werknemer.",
  },
  {
    question: "Is deze tool bruto of netto?",
    answer:
      "Deze tool rekent bruto. Wil je het netto effect van je overuren benaderen, gebruik daarna de netto-bruto calculator.",
  },
];

export const metadata: Metadata = {
  title: "Overuren Berekenen 2026 - Wat Zijn Jouw Extra Uren Waard? | WerkCV",
  description:
    "Bereken de waarde van jouw overuren op basis van je maandsalaris en contracturen. Met of zonder overwerktoeslag. Gratis tool, direct resultaat.",
};

export default function OverurenBerekenenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/tools" className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900">
            ← Alle tools
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Tools", href: "/tools" },
              { label: "Overuren berekenen", href: "/tools/overuren-berekenen" },
            ]}
          />
        </div>

        <section className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-300 bg-blue-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-blue-800">
                Geld
              </span>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                Bijgewerkt april 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Overuren berekenen 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bereken wat je extra uren bruto waard zijn op basis van je maandsalaris, contracturen en eventuele overwerktoeslag. Handig als je wilt weten of je huidige baanpakket nog klopt of een nieuw aanbod slimmer is.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Maak gratis je CV
              </Link>
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Netto-bruto calculator
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Regel", "Geen automatisch recht", "toeslag hangt af van contract of cao"],
                ["Rekenbasis", "Uurloon + toeslag", "gebaseerd op salaris en extra uren"],
                ["Tijdswinst", "Direct inzicht", "bruikbaar voor maand en jaar"],
              ].map(([label, value, note]) => (
                <div key={label} className="border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="mb-1 text-[11px] font-black uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="text-lg font-black text-slate-900">{value}</p>
                  <p className="mt-1 text-xs text-slate-500">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">
              Waarom dit ertoe doet
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Overuren vertekenen vaak hoe aantrekkelijk een baan echt is.</p>
              <p>Een hoger salaris zonder toeslag kan onderaan de streep slechter zijn dan een lager salaris met fatsoenlijke compensatie.</p>
              <p>Daarom hoort overwerk bij een complete aanbodvergelijking.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <OverurenTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Waar deze tool sterk voor is</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je bruto uurloon snel terugrekenen uit je salaris.</li>
              <li>De waarde van extra uren deze maand doorzien.</li>
              <li>Scenario&apos;s met en zonder toeslag vergelijken.</li>
              <li>Het jaar-effect inschatten als overwerk structureel wordt.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat je nog moet controleren</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Kijk altijd in je arbeidsovereenkomst of cao hoe overuren worden geregistreerd, uitbetaald of eventueel in tijd-voor-tijd worden omgezet. Niet elke sector werkt met hetzelfde toeslagmodel.
            </p>
          </div>
        </section>

        <RelatedToolsSection
          title="Meer tools voor loon en arbeidsvoorwaarden"
          description="Gebruik overuren samen met deze routes als je je totale pakket of een nieuw aanbod wilt toetsen."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Bekijk daarna wat je bruto overuren ongeveer netto betekenen.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Vergelijk twee aanbiedingen inclusief vergoedingen en extra dagen.",
              badge: "Geld",
            },
            {
              href: "/tools/uurloon-calculator",
              title: "Uurloon calculator",
              description: "Controleer je basisuurloon ook los van overuren.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je uitkomst in een gesprek over toeslagen of werkdruk.",
              badge: "AI",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over overuren
            </h2>
          </div>
          <div className="divide-y divide-slate-200 border-2 border-black bg-white">
            {faqItems.map((item) => (
              <div key={item.question} className="p-5">
                <h3 className="mb-2 font-black text-slate-900">{item.question}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-2 border-slate-200 bg-slate-50 p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Bronnen</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Rijksoverheid - Arbeidsovereenkomst en cao
              </a>
            </li>
            <li>
              <a
                href="https://www.juridischloket.nl/werk-en-inkomen/arbeidsvoorwaarden/overuren-uitbetalen/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Juridisch Loket - Overuren uitbetalen
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
