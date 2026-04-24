import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { buildDutchMetadata } from "@/lib/page-metadata";
import KilometervergoedingTool from "./KilometervergoedingTool";

const faqItems = [
  {
    question: "Hoeveel kilometervergoeding is belastingvrij in 2026?",
    answer:
      "In 2026 mag een werkgever maximaal €0,23 per kilometer belastingvrij vergoeden voor woon-werkverkeer en zakelijke kilometers. Betaalt de werkgever meer, dan is het meerdere in principe belast loon.",
  },
  {
    question: "Tellen heen- en terugreis allebei mee?",
    answer:
      "Ja. Voor woon-werkverkeer reken je meestal zowel de heenreis als de terugreis mee. Daarom vraagt deze tool om kilometers enkele reis en verdubbelt hij dat automatisch.",
  },
  {
    question: "Moet ik weekends meetellen?",
    answer:
      "Nee. Deze calculator rekent alleen met je echte werkdagen per week en laat weekends buiten beschouwing.",
  },
  {
    question: "Is kilometervergoeding netto of bruto?",
    answer:
      "Tot €0,23 per kilometer in 2026 is de vergoeding belastingvrij. Komt je werkgever daarboven, dan is alleen het meerdere belastbaar.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Kilometervergoeding Berekenen 2026 - Reiskosten Calculator | WerkCV",
  description:
    "Bereken je belastingvrije kilometervergoeding voor woon-werkverkeer. Gebaseerd op het 2026 tarief van €0,23 per km. Gratis en direct inzichtelijk.",
  path: "/tools/kilometervergoeding-berekenen",
  keywords: [
    "kilometervergoeding berekenen",
    "reiskostenvergoeding 2026 berekenen",
    "reiskosten woon werk 2026",
    "kilometervergoeding woon-werk 2026",
    "kilometervergoeding belastingvrij 2026",
  ],
});

export default function KilometervergoedingBerekenenPage() {
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
              { label: "Kilometervergoeding berekenen", href: "/tools/kilometervergoeding-berekenen" },
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
              Kilometervergoeding berekenen 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bereken je bruto reiskostenvergoeding op basis van de belastingvrije kilometervergoeding van 2026. Vul je woon-werkafstand, werkdagen en kilometertarief in en zie direct wat je per dag, maand en jaar kunt verwachten.
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
                ["Wettelijke grens", "€0,23 per km", "belastingvrij maximum in 2026"],
                ["Rekenregel", "Heen + terug", "woon-werkverkeer telt beide richtingen"],
                ["Tijdswinst", "Binnen 1 minuut", "direct maand en jaar in beeld"],
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
              Waarom mensen dit zoeken
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Reiskosten zijn vaak een doorslaggevend onderdeel van een nieuwe baan of contractonderhandeling.</p>
              <p>Deze tool laat snel zien wat belastingvrij kan en welk deel eventueel als loon belast wordt.</p>
              <p>Daardoor kun je een aanbod beter vergelijken voordat je akkoord geeft of verder solliciteert.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <KilometervergoedingTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Hoe deze berekening werkt</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je vult alleen kilometers enkele reis in.</li>
              <li>De tool rekent automatisch heen en terug.</li>
              <li>Werkdagen per week bepalen hoeveel ritten je maakt.</li>
              <li>Het opgegeven kilometertarief wordt vergeleken met de belastingvrije grens van 2026.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wanneer wordt kilometervergoeding belast?</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Tot €0,23 per kilometer mag je werkgever in 2026 belastingvrij vergoeden. Ligt het bedrag per kilometer hoger, dan telt alleen het meerdere als belast loon. Daarom laat WerkCV altijd apart zien welk deel belastingvrij blijft en welk deel erboven komt.
            </p>
          </div>
        </section>

        <RelatedToolsSection
          title="Meer tools voor je aanbod en salaris"
          description="Gebruik kilometervergoeding samen met deze tools als je een nieuw aanbod op totaalwaarde wilt beoordelen."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zie wat je salaris ongeveer netto betekent naast je reiskostenvergoeding.",
              badge: "Geld",
            },
            {
              href: "/tools/thuiswerkvergoeding-berekenen",
              title: "Thuiswerkvergoeding berekenen",
              description: "Vergelijk reiskosten en thuiswerkvergoeding in hetzelfde aanbod.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Zet twee aanbiedingen naast elkaar inclusief vergoedingen en vakantiedagen.",
              badge: "Geld",
            },
            {
              href: "/tools/parttime-salaris-calculator",
              title: "Parttime salaris calculator",
              description: "Handig als je ook uren en dagen per week wilt doorrekenen.",
              badge: "Geld",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over kilometervergoeding
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
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/reiskosten-vergoeden"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Belastingdienst - Reiskosten vergoeden
              </a>
            </li>
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
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
