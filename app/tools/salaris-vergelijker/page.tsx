import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import SalarisVergelijkerTool from "./SalarisVergelijkerTool";

const faqItems = [
  {
    question: "Wat vergelijkt deze salarisvergelijker precies?",
    answer:
      "De tool vergelijkt twee aanbiedingen op netto maandsalaris, vakantiegeld, bonus, reiskostenvergoeding, thuiswerkvergoeding en de waarde van meer of minder vakantiedagen ten opzichte van 20 dagen.",
  },
  {
    question: "Waarom kijkt WerkCV naar vakantiedagen als geldwaarde?",
    answer:
      "Extra vakantiedagen hebben economische waarde. Daarom zet WerkCV het verschil met 20 dagen om naar een netto-indicatie per jaar, zodat je aanbiedingen eerlijker kunt vergelijken.",
  },
  {
    question: "Is dit een exacte loonstrookvergelijking?",
    answer:
      "Nee. Het blijft een sterke netto-indicatie op basis van standaard loonbelastingaannames. Pensioen, leaseauto, cao-afspraken en andere inhoudingen kunnen het echte resultaat nog veranderen.",
  },
  {
    question: "Kan een lager salaris toch beter uitpakken?",
    answer:
      "Ja. Een lager bruto salaris kan alsnog een betere deal zijn als daar hogere vergoedingen, meer vakantiedagen of een bonus tegenover staan.",
  },
];

export const metadata: Metadata = {
  title: "Salaris Vergelijker - Vergelijk Twee Salarissen Netto | WerkCV",
  description:
    "Vergelijk twee baanaanbiedingen op netto maandsalaris, reiskosten, thuiswerkvergoeding en vakantiedagen. Welk aanbod is echt beter? Bereken het direct.",
};

export default function SalarisVergelijkerPage() {
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
              { label: "Salaris vergelijker", href: "/tools/salaris-vergelijker" },
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
              Salaris vergelijker
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Vergelijk twee baanaanbiedingen op netto maandsalaris, reiskosten, thuiswerkvergoeding, bonus en vakantiedagen. Zo zie je welk aanbod echt beter is, niet alleen op papier maar op totaalpakket.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Maak gratis je CV
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Vergelijk CV templates
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Vergelijking", "2 aanbiedingen", "in één overzicht naast elkaar"],
                ["Basis", "20 vakantiedagen", "extra of minder dagen tellen mee"],
                ["Tijdswinst", "Direct duidelijk", "welk aanbod netto sterker is"],
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
              Waarom deze tool commercieel sterk is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Mensen die twee aanbiedingen vergelijken zitten meestal vlak voor een beslissing.</p>
              <p>Dat is een hoog-intent moment: ze weten welke stap ze willen zetten en willen alleen het slimste pakket kiezen.</p>
              <p>WerkCV verbindt dat moment direct aan een CV dat klaarstaat voor de volgende carrièrezet.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <SalarisVergelijkerTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat deze tool meeneemt</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Regulier netto salaris op basis van Nederlandse loonbelastingaannames.</li>
              <li>Vakantiegeld als het nog bovenop je salaris komt.</li>
              <li>Bonus als netto-indicatie op jaarbasis.</li>
              <li>Thuiswerk- en reiskostenvergoeding buiten het salaris om.</li>
              <li>De waarde van extra of minder vakantiedagen.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat je daarna nog moet checken</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Controleer daarna altijd pensioenpremie, leaseauto, cao-afspraken, variabele bonusstructuren en eventuele sign-on bonus of opleidingsbudgetten. Die zitten niet standaard in deze vergelijking, maar kunnen een aanbod nog verder kantelen.
            </p>
          </div>
        </section>

        <RelatedToolsSection
          title="Bouw verder op je aanbodvergelijking"
          description="Gebruik deze tools als je dieper wilt inzoomen op netto loon, reiskosten of je onderhandelingsruimte."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Controleer de netto-aannames achter je vergelijking nog los per aanbod.",
              badge: "Geld",
            },
            {
              href: "/tools/kilometervergoeding-berekenen",
              title: "Kilometervergoeding berekenen",
              description: "Werk je veel op kantoor, dan kan reiskostenvergoeding flink meetellen.",
              badge: "Geld",
            },
            {
              href: "/tools/thuiswerkvergoeding-berekenen",
              title: "Thuiswerkvergoeding berekenen",
              description: "Voor hybride banen wil je thuiswerkdagen ook in euro's kunnen waarderen.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je vergelijking meteen als basis voor een beter gesprek of tegenvoorstel.",
              badge: "AI",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over de salarisvergelijker
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
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/loonheffingen/content/tabellen-tarieven-en-bedragen-voor-de-loonheffingen"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Belastingdienst - Tabellen, tarieven en bedragen voor de loonheffingen
              </a>
            </li>
            <li>
              <a
                href="https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Rijksoverheid - Vakantiedagen en vakantiegeld
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
