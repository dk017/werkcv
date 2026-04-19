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
  {
    question: "Waarom valt mijn netto eindejaarsuitkering lager uit dan verwacht?",
    answer: "Je eindejaarsuitkering blijft loon voor de loonheffingen. Werkgevers houden daarom loonheffing in, en bij eenmalige extra uitkeringen gebruiken ze vaak de tabellen voor bijzondere beloningen. Het exacte netto effect hangt af van je totale inkomen en loonheffingskorting.",
  },
  {
    question: "Wordt een eindejaarsuitkering anders belast dan normaal loon?",
    answer: "Het blijft onderdeel van je loon, maar op de loonstrook kan de inhouding anders aanvoelen door de manier waarop werkgevers loonheffing op bijzondere beloningen toepassen. Daardoor kan bruto en netto verder uit elkaar liggen dan je verwacht.",
  },
];

export const metadata: Metadata = {
  title: "Eindejaarsuitkering Berekenen 2026 | 13e Maand, Pro Rata, Belasting",
  description: "Bereken direct je eindejaarsuitkering of 13e maand in 2026. Inclusief pro rata, december-uitbetaling, bruto indicatie en uitleg over belasting en bijzondere beloningen.",
  keywords: [
    "eindejaarsuitkering berekenen",
    "eindejaarsuitkering calculator",
    "13e maand berekenen",
    "13e maand calculator",
    "bonus percentage salaris",
    "pro rata eindejaarsuitkering",
    "bruto eindejaarsuitkering",
    "eindejaarsuitkering uitrekenen",
    "eindejaarsuitkering netto berekenen",
    "bruto naar netto eindejaarsuitkering",
    "eindejaarsuitkering belasting berekenen",
    "eindejaarsuitkering en 13e maand",
    "wanneer eindejaarsuitkering",
    "bijzonder tarief eindejaarsuitkering",
  ],
  alternates: {
    canonical: "https://werkcv.nl/tools/eindejaarsuitkering-berekenen",
  },
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
                Bijgewerkt 17 april 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Eindejaarsuitkering berekenen: 13e maand en pro rata
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Bereken direct je bruto eindejaarsuitkering of 13e maand. Vul je maandsalaris, percentage en gewerkte maanden in en zie meteen wat je pro-rata bruto bedrag ongeveer wordt. Daarna kun je ook beter inschatten wanneer uitbetaling meestal plaatsvindt en waarom belasting op je loonstrook anders kan aanvoelen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
              >
                Schat netto effect
              </Link>
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
              >
                Maak gratis je CV
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Veelgebruikte basis", "8,33%", "komt ongeveer neer op 1 extra bruto maandloon"],
                ["Pro rata", "Later gestart?", "dan rekent je werkgever vaak over gewerkte maanden"],
                ["Netto verschil", "Loonheffing", "kan op je loonstrook anders aanvoelen dan je verwacht"],
              ].map(([label, value, note]) => (
                <div key={label} className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-[11px] font-black uppercase tracking-wide text-slate-500 mb-1">{label}</p>
                  <p className="text-lg font-black text-slate-900">{value}</p>
                  <p className="text-xs text-slate-500 mt-1">{note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                In het kort
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <div>
                  <p className="text-sm font-black text-slate-900">13e maand vs eindejaarsuitkering</p>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    Een 13e maand is meestal een vast extra bruto maandloon. Een eindejaarsuitkering is vaker een percentage van je jaarsalaris, vaak rond 4% tot 8,33%.
                  </p>
                </div>
                <div>
                  <p className="text-sm font-black text-slate-900">Wanneer krijg je die meestal?</p>
                  <p className="mt-1 text-sm text-slate-700 leading-relaxed">
                    Vaak in december, soms al in november. Of je recht hebt op uitbetaling en hoe pro rata werkt, hangt af van je cao, contract en werkgeversregeling.
                  </p>
                </div>
              </div>
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
            <div className="mt-5 border-t-2 border-black pt-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                Calculator-intent
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>Bereken direct een bruto indicatie.</li>
                <li>Check pro rata als je later in het jaar bent gestart.</li>
                <li>Gebruik daarna de netto-bruto calculator voor je loonstrook-effect.</li>
              </ul>
            </div>
          </aside>
        </section>

        <section className="mb-8 bg-[#FFF7E8] border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-slate-900 mb-3">
            Eerst berekenen, daarna pas de nuance
          </h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            De snelste route is simpel: bereken eerst je bruto eindejaarsuitkering of 13e maand, kijk daarna of jouw werkgever werkt met een vast maandloon of percentage, en check pas daarna de belasting- en netto-uitleg. Zo krijg je sneller antwoord op de hoofdvraag achter deze zoekopdracht.
          </p>
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

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Netto eindejaarsuitkering: waarom bruto niet gelijk is aan wat je ontvangt
            </h2>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>Deze tool rekent eerst je bruto uitkering uit. Dat is de juiste basis als je verschillende banen, percentages of pro-rata scenario&apos;s wilt vergelijken.</p>
              <p>Op je loonstrook zie je daarna een netto bedrag. Dat bedrag hangt af van loonheffing, de toepassing van loonheffingskorting en je totale inkomenssituatie in het jaar.</p>
              <p>Daardoor voelt een bruto bonus op de loonstrook soms zwaarder belast dan een normaal maandsalaris, ook al blijft het loon voor de loonheffingen.</p>
            </div>
            <div className="mt-5">
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-block border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
              >
                Reken door naar netto indicatie
              </Link>
            </div>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Belasting en 13e maand: wat je praktisch moet controleren
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Of jouw werkgever werkt met een vaste 13e maand of een percentage van je bruto loon.</li>
              <li>Of je uitkering volledig in december komt of via IKB / maandelijkse opbouw loopt.</li>
              <li>Of je bij instroom of uitstroom pro rata krijgt uitbetaald.</li>
              <li>Hoe de loonstrook de inhouding op bijzondere beloningen laat zien ten opzichte van je normale maandloon.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Slimme vervolgstappen rond loon en arbeidsvoorwaarden"
          description="Na je eindejaarsuitkering wil je vaak ook weten wat je netto effect, vakantiegeld of parttime scenario betekent in dezelfde baan."
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
              <li>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/hulpmiddel-loonbelastingtabellen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Belastingdienst - Loonbelastingtabellen en bijzondere beloningen
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
