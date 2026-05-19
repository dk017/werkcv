import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { buildDutchMetadata } from "@/lib/page-metadata";
import WWDagloonTool from "./WWDagloonTool";

const faqItems = [
  {
    question: "Hoe bereken je je WW-uitkering?",
    answer: "Je start met je WW-dagloon. UWV rekent daarmee je WW-maandloon uit. De eerste 2 maanden is je bruto WW-uitkering meestal 75% van dat maandloon, daarna meestal 70%.",
  },
  {
    question: "Hoe hoog is de WW-uitkering in de eerste maanden?",
    answer: "De eerste 2 maanden is de bruto WW-uitkering meestal 75% van het WW-maandloon. Daarna is dit doorgaans 70%.",
  },
  {
    question: "Is dit een WW-uitkering calculator of alleen een dagloon checker?",
    answer: "Beide. De tool berekent eerst een dagloon-indicatie en vertaalt die daarna naar een bruto maandbedrag voor de eerste 2 maanden WW en voor de periode daarna.",
  },
  {
    question: "Waarom is het dagloon voor parttimers niet hetzelfde als wat zij per werkdag verdienen?",
    answer: "UWV rekent het dagloon vanuit een fulltime werkweek. Daardoor kan het dagloon voor parttimers lager uitvallen dan wat zij feitelijk op een gewerkte dag verdienden.",
  },
  {
    question: "Waarom kan mijn echte WW-uitkomst afwijken van deze tool?",
    answer: "UWV kijkt naar SV-loon, de referteperiode, uitbetaalde en gereserveerde reserveringen, en speciale situaties zoals ziekte of onbetaald verlof. Deze tool geeft daarom een sterke indicatie, geen formele beschikking.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "WW Uitkering Berekenen 2026 | Dagloon en Maandbedrag | WerkCV",
  description: "Bereken je WW-uitkering in 2026 via dagloon, maandbedrag en 75%/70%-regel. Inclusief snelle salarisroute en SV-loon invoer.",
  path: "/tools/ww-dagloon-checker",
  keywords: [
    "ww uitkering berekenen",
    "ww berekenen",
    "hoogte ww uitkering",
    "ww maandbedrag berekenen",
    "ww dagloon checker",
    "ww dagloon berekenen",
    "ww maandloon berekenen",
    "maximum dagloon 2026",
    "sv loon ww berekenen",
  ],
});

export default function WWDagloonCheckerPage() {
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
            { label: "WW uitkering berekenen", href: "/tools/ww-dagloon-checker" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                NL wetgeving
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 12 maart 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              WW uitkering berekenen 2026
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Bereken een bruto indicatie van je WW-uitkering per maand. WerkCV laat eerst je dagloon zien en vertaalt dat daarna naar de 75%-regel voor de eerste 2 maanden en de 70%-regel vanaf maand 3.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Formulebasis", "Referte-inkomen / dagloondagen", "met een snelle en een geavanceerde route"],
                ["WW-bedrag", "75% en daarna 70%", "eerste 2 maanden versus vanaf maand 3"],
                ["Maximum 2026", "EUR 304,25", "wettelijk maximum dagloon"],
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
              Waarom dit belangrijk is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Veel mensen zoeken niet alleen het dagloon, maar vooral het maandbedrag dat ze straks kunnen verwachten.</p>
              <p>Dat bedrag bepaalt of je ontslagvergoeding, spaargeld of sollicitatieplanning anders moet bekijken.</p>
              <p>Deze tool maakt die stap concreet zonder te doen alsof een indicatie al een formele UWV-beschikking is.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <WWDagloonTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat de maandbedragen betekenen
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De eerste 2 maanden liggen meestal op 75% van je WW-maandloon.</li>
              <li>Vanaf maand 3 zakt dit meestal naar 70% van je WW-maandloon.</li>
              <li>De tool toont bruto bedragen; loonheffing en persoonlijke inhoudingen zitten daar nog niet in.</li>
              <li>Bij een hoog loon kan het wettelijke maximum dagloon je uitkering begrenzen.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wanneer de UWV-uitkomst kan afwijken
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je loon wisselde sterk per maand of je had onregelmatige toeslagen.</li>
              <li>Je had ziekte, onbetaald verlof of maanden zonder loon in de referteperiode.</li>
              <li>Je reserveringen voor vakantiegeld, IKB of AVWB zijn anders opgebouwd dan in deze schatting.</li>
              <li>UWV corrigeert op details die niet uit een snelle invoer blijken.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Gebruik deze WW-cluster samen"
          description="Het dagloon is meestal pas stap 2. Daarna wil je weten of je recht hebt, hoe lang je WW ongeveer duurt en wat er rond contracteinde nog meespeelt."
          tools={[
            {
              href: "/tools/ww-recht-checker",
              title: "WW recht checker",
              description: "Controleer eerst of je waarschijnlijk aan de basisvoorwaarden voor WW voldoet.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/ww-duur-checker",
              title: "WW duur checker",
              description: "Schat hoe lang je WW ongeveer kan duren.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              description: "Check of er naast WW ook een ontslagvergoeding speelt.",
              badge: "NL wetgeving",
            },
            {
              href: "/sollicitatiebrief-voorbeeld",
              title: "Sollicitatiebrief voorbeelden",
              description: "Zet je uitkeringsplanning direct om in een nieuwe sollicitatiestap.",
              badge: "Sollicitatie",
            },
          ]}
        />

        <section className="mt-12 mb-12 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0px_0px_rgba(78,205,196,1)]">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                Van WW-check naar je volgende sollicitatie
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl">
                Als je ongeveer weet waar je financieel staat, kun je sneller door naar WW-duur, sollicitatiebrieven en een nieuw cv.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/tools/ww-duur-checker"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-white hover:bg-teal-300 transition-colors"
              >
                Bereken ook WW-duur
              </Link>
              <Link
                href="/cv-maken-zonder-abonnement"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-white font-black text-sm border-2 border-white hover:bg-white hover:text-black transition-colors"
              >
                Maak je cv zonder abonnement
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
              Veelgestelde vragen over WW-uitkering berekenen
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
              Deze pagina is bijgewerkt op <span className="font-black text-slate-900">12 maart 2026</span> op basis van actuele UWV-informatie over het berekenen van dagloon, de hoogte van WW en het wettelijke maximum dagloon van 2026.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.uwv.nl/nl/premies-bedragen/dagloon-berekenen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  UWV - Het dagloon berekenen
                </a>
              </li>
              <li>
                <a
                  href="https://www.uwv.nl/nl/ww/hoogte-ww"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  UWV - Hoogte WW-uitkering
                </a>
              </li>
              <li>
                <a
                  href="https://www.uwv.nl/nl/premies-bedragen/maximum-dagloon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  UWV - Maximum dagloon
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
