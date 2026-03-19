import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import EindejaarsuitkeringTool from "./EindejaarsuitkeringTool";

const faqItems = [
  {
    question: "Is een eindejaarsuitkering wettelijk verplicht?",
    answer: "Nee, niet als algemene regel voor alle werknemers. Of je een eindejaarsuitkering krijgt en hoe die wordt berekend, hangt meestal af van je cao, arbeidsovereenkomst of personeelsregeling.",
  },
  {
    question: "Is een 13e maand hetzelfde als 8,33%?",
    answer: "In de praktijk komt 8,33% van een bruto jaarsalaris ongeveer neer op 1 extra bruto maandsalaris. Sommige werkgevers werken met een vaste 13e maand, anderen met een percentage of een andere bonusregeling.",
  },
  {
    question: "Krijg ik een pro-rata uitkering als ik later in het jaar ben gestart?",
    answer: "Vaak wel. Veel werkgevers rekenen de uitkering dan naar rato van het aantal maanden dat je in dat kalenderjaar hebt gewerkt. Controleer altijd je cao of contract.",
  },
  {
    question: "Rekent deze tool netto of bruto?",
    answer: "Deze tool geeft een bruto indicatie. Wil je daarna weten wat je netto ongeveer overhoudt, gebruik dan de netto-bruto calculator.",
  },
];

export const metadata: Metadata = {
  title: "Eindejaarsuitkering Berekenen 2026 - Gratis Tool | WerkCV.nl",
  description: "Bereken je bruto eindejaarsuitkering of 13e maand in 2026. Vul je bruto maandsalaris, percentage en gewerkte maanden in en zie direct je pro-rata indicatie.",
  keywords: [
    "eindejaarsuitkering berekenen",
    "13e maand berekenen",
    "bonus percentage salaris",
    "pro rata eindejaarsuitkering",
    "bruto eindejaarsuitkering",
  ],
};

export default function EindejaarsuitkeringBerekenenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/tools" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            ← Alle tools
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs items={[
            { label: "Home", href: "/" },
            { label: "Tools", href: "/tools" },
            { label: "Eindejaarsuitkering berekenen", href: "/tools/eindejaarsuitkering-berekenen" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                Geld
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 19 maart 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Eindejaarsuitkering berekenen
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Bereken snel je bruto eindejaarsuitkering of 13e maand. Deze tool is handig als je wilt inschatten wat december bruto kan opleveren, of als je een aanbod vergelijkt waarin een bonuspercentage of vaste eindejaarsuitkering zit.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Veelgebruikte basis", "8,33%", "komt ongeveer neer op 1 extra bruto maandloon"],
                ["Pro rata", "Later gestart?", "dan rekent je werkgever vaak over gewerkte maanden"],
                ["Echte bron", "Cao of contract", "daar staat of en hoe de regeling voor jou geldt"],
              ].map(([label, value, note]) => (
                <div key={label} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-black text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{note}</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-3">
              Waarom deze tool nuttig is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Veel werkgevers communiceren een percentage, maar niet direct wat dat bruto in euro&apos;s betekent.</p>
              <p>Deze tool rekent snel door wat een 13e maand of eindejaarspercentage ongeveer doet op je jaarsalaris en decemberloon.</p>
              <p>Voor gesprekken over aanbod, baanwissel of budgetteren geeft dat sneller houvast dan alleen een regel in je contract.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <EindejaarsuitkeringTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Waar deze indicatie sterk voor is
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Snel zien wat een bonuspercentage bruto in euro&apos;s betekent.</li>
              <li>Pro-rata inschatten wat een later gestarte werknemer ongeveer krijgt.</li>
              <li>Decemberloon met en zonder eindejaarsuitkering vergelijken.</li>
              <li>Een baanvoorstel vergelijken waarin salaris en bonus anders zijn opgebouwd.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat je zelf nog moet checken
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Of jouw werkgever werkt met een vaste 13e maand of een percentage van je jaarloon.</li>
              <li>Welke looncomponenten wel of niet meetellen in jouw regeling.</li>
              <li>Of uitbetaling plaatsvindt in december, maandelijks via IKB of op een ander moment.</li>
              <li>Of je bij uitdiensttreding of langdurig verlof een afwijkende pro-rata berekening hebt.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Slimme vervolgstappen rond loon en arbeidsvoorwaarden"
          description="Na je eindejaarsuitkering wil je vaak ook weten wat je vakantiegeld, netto salaris of verlofuren betekenen in dezelfde baan."
          tools={[
            {
              href: "/tools/vakantiegeld-berekenen",
              title: "Vakantiegeld berekenen",
              description: "Zet ook je 8% vakantiegeld om naar een bruikbare bruto indicatie.",
              badge: "Geld",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Reken daarna door wat je loon en extra uitkering netto ongeveer opleveren.",
              badge: "Geld",
            },
            {
              href: "/tools/parttime-salaris-calculator",
              title: "Parttime salaris calculator",
              description: "Handig als je salaris, bonus en uren samen wilt vergelijken.",
              badge: "Geld",
            },
            {
              href: "/tools/verlofuren-omrekenen",
              title: "Verlofuren omrekenen",
              description: "Check ook hoe je werkuren en verlofadministratie in elkaar passen.",
              badge: "NL",
            },
          ]}
        />

        <section className="mt-12 mb-12 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                Gebruik je salarischeck direct voor je volgende stap
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Vergelijk je aanbod, check je totale pakket en zet daarna meteen een nieuw CV of sollicitatie klaar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/editor"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-white hover:bg-teal-300 transition-colors"
              >
                Maak gratis je CV
              </Link>
              <Link
                href="/cv-maken"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-black text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                Lees CV tips
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over eindejaarsuitkering
            </h2>
          </div>
          <div className="bg-white border-2 border-black divide-y divide-slate-200">
            {faqItems.map((item) => (
              <div key={item.question} className="p-5">
                <h3 className="font-black text-slate-900 mb-2">{item.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 border-2 border-slate-200 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
            Bronnen en scope
          </p>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              Deze tool geeft een bruto rekenindicatie. Je daadwerkelijke recht op een eindejaarsuitkering volgt meestal uit je cao, arbeidsovereenkomst of personeelsregeling en kan per sector sterk verschillen.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao/vraag-en-antwoord/wat-is-een-cao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Wat is een cao?
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
