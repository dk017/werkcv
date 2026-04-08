import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import ThuiswerkvergoedingTool from "./ThuiswerkvergoedingTool";

const faqItems = [
  {
    question: "Hoe hoog is de belastingvrije thuiswerkvergoeding in 2026?",
    answer:
      "In 2026 mag een werkgever maximaal €2,35 per thuiswerkdag belastingvrij vergoeden. Dat bedrag geldt alleen voor dagen waarop je daadwerkelijk thuiswerkt.",
  },
  {
    question: "Mag je thuiswerkvergoeding en reiskostenvergoeding op dezelfde dag krijgen?",
    answer:
      "Meestal niet voor dezelfde werkdag. Werkgevers kiezen normaal per dag voor thuiswerkvergoeding of reiskostenvergoeding, afhankelijk van waar je werkt.",
  },
  {
    question: "Tellen vakantiedagen of kantoordagen mee?",
    answer:
      "Nee. Deze tool rekent alleen met thuiswerkdagen. Vakantiedagen en kantoordagen horen daar niet bij.",
  },
  {
    question: "Is het meerdere boven €2,35 belast?",
    answer:
      "Ja. Betaalt je werkgever meer dan het belastingvrije maximum, dan is het meerdere in principe belast loon.",
  },
];

export const metadata: Metadata = {
  title: "Thuiswerkvergoeding Berekenen 2026 - €2,35 per Dag | WerkCV",
  description:
    "Bereken je belastingvrije thuiswerkvergoeding voor 2026. Het tarief is €2,35 per dag thuiswerken. Bereken hoeveel je maandelijks belastingvrij kunt ontvangen.",
};

export default function ThuiswerkvergoedingBerekenenPage() {
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
              { label: "Thuiswerkvergoeding berekenen", href: "/tools/thuiswerkvergoeding-berekenen" },
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
              Thuiswerkvergoeding berekenen 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bereken je belastingvrije thuiswerkvergoeding op basis van het 2026 maximum van €2,35 per thuiswerkdag. Handig als je hybride werkt of twee aanbiedingen wilt vergelijken op totaalpakket.
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
                ["Belastingvrij maximum", "€2,35 per dag", "tarief voor 2026"],
                ["Gebruik", "Alleen thuiswerkdagen", "geen kantoordagen of verlof"],
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
              Waarom dit meeweegt
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Hybride werken is voor veel werknemers standaard geworden in nieuwe aanbiedingen.</p>
              <p>Een thuiswerkvergoeding lijkt klein per dag, maar telt op jaarbasis wel degelijk mee in je netto-equivalent.</p>
              <p>Daarom hoort deze vergoeding thuis in elke serieuze aanbodvergelijking.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <ThuiswerkvergoedingTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wat deze tool voor je doet</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Laat het belastingvrije maximum zien op maand- en jaarbasis.</li>
              <li>Vergelijkt wat je werkgever betaalt met de fiscale grens.</li>
              <li>Toont direct welk deel eventueel als loon belast wordt.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Waar je nog op moet letten</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Werk je hybride, dan kunnen thuiswerkvergoeding en reiskostenvergoeding niet onbeperkt tegelijk lopen voor dezelfde dag. Controleer daarom altijd hoe je werkgever hybride dagen precies registreert.
            </p>
          </div>
        </section>

        <RelatedToolsSection
          title="Meer tools voor hybride en financiële vergelijking"
          description="Gebruik thuiswerkvergoeding samen met deze routes als je een totaalpakket voor een nieuwe baan beoordeelt."
          tools={[
            {
              href: "/tools/kilometervergoeding-berekenen",
              title: "Kilometervergoeding berekenen",
              description: "Vergelijk woon-werkverkeer met thuiswerkvergoeding in hetzelfde pakket.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Zet twee aanbiedingen naast elkaar inclusief thuiswerk- en reiskostenvoordeel.",
              badge: "Geld",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Bekijk wat je bruto salaris daarnaast netto ongeveer betekent.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je berekening direct in een gesprek over arbeidsvoorwaarden.",
              badge: "AI",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over thuiswerkvergoeding
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
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/vergoedingen-thuiswerken"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Belastingdienst - Vergoedingen thuiswerken
              </a>
            </li>
            <li>
              <a
                href="https://www.rijksoverheid.nl/onderwerpen/werken-thuis"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Rijksoverheid - Werken vanuit huis
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
