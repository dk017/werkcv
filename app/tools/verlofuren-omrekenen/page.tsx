import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { buildDutchMetadata } from "@/lib/page-metadata";
import VerlofurenOmrekenenTool from "./VerlofurenOmrekenenTool";

const faqItems = [
  {
    question: "Waarom is 1 verlofdag niet altijd 8 uur?",
    answer: "Omdat een verlofdag afhangt van je echte contractverdeling. Werk je 36 uur in 4 dagen, dan is 1 verlofdag meestal 9 uur. Werk je 32 uur in 4 dagen, dan is dat vaak 8 uur.",
  },
  {
    question: "Kan ik dit ook gebruiken als parttimer?",
    answer: "Ja. Juist voor parttimers is uren omrekenen nuttig, omdat HR-systemen en contracten niet altijd dezelfde eenheid gebruiken.",
  },
  {
    question: "Berekent deze tool ook mijn wettelijke vakantiedagen?",
    answer: "Nee. Deze tool rekent alleen uren en dagen naar elkaar om. Voor opbouw en resterend saldo gebruik je de vakantiedagen-tool.",
  },
  {
    question: "Kan ik dit ook gebruiken voor ADV of tijd-voor-tijd?",
    answer: "Als rekenhulp wel, maar de rechten en regels voor ADV, tijd-voor-tijd of roostervrije uren kunnen afwijken per cao of werkgever.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Verlofuren Omrekenen 2026 - Gratis Tool | WerkCV",
  description:
    "Reken verlofuren om naar dagen of dagen naar uren. Handig voor parttime contracten, 36-urige werkweken en HR-systemen die anders registreren dan je contract.",
  path: "/tools/verlofuren-omrekenen",
  keywords: [
    "verlofuren omrekenen",
    "verlof omrekenen van uur naar dagen",
    "vakantie uren naar dagen",
    "dagen naar uren verlof",
    "verlof in uren berekenen",
    "parttime verlofuren",
  ],
});

export default function VerlofurenOmrekenenPage() {
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
            { label: "Verlofuren omrekenen", href: "/tools/verlofuren-omrekenen" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                NL wetgeving
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 19 maart 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Verlofuren omrekenen
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Zet verlofuren om naar dagen of dagen naar uren op basis van je echte werkweek. Dat is vooral handig als je contract, cao en HR-systeem niet allemaal dezelfde rekeneenheid gebruiken.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Niet altijd 8 uur", "Contractafhankelijk", "bij 36 uur in 4 dagen is 1 dag meestal 9 uur"],
                ["Dubbele richting", "Uren ↔ dagen", "handig voor HR-portalen en verlofaanvragen"],
                ["Parttime-proof", "Ja", "werkt ook voor 24, 28, 32 of 36 uur per week"],
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
              <p>Veel werknemers zien uren op hun loonstrook, maar denken in dagen als ze verlof plannen.</p>
              <p>Bij 32 of 36 uur, 4-daagse werkweken of lange werkdagen kan een standaard 8-uurs-aanname je snel op het verkeerde been zetten.</p>
              <p>Met deze omrekening zie je direct wat je saldo of aanvraag in de praktijk betekent.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <VerlofurenOmrekenenTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wanneer deze tool het meest helpt
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Als je HR-portaal verlof in uren toont maar jij in dagen plant.</li>
              <li>Als je parttime werkt of een schema hebt met 4 of 4,5 werkdagen.</li>
              <li>Als je wilt controleren of een manager of planner met dezelfde rekeneenheid werkt.</li>
              <li>Als je verlof wilt vergelijken met je wekelijkse contractomvang.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat deze tool niet bepaalt
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Hoeveel wettelijke of bovenwettelijke dagen je opbouwt.</li>
              <li>Of een saldo vervalt of mag worden meegenomen naar volgend jaar.</li>
              <li>Hoe ADV, tijd-voor-tijd of roostervrije uren in jouw cao werken.</li>
              <li>Welk saldo je werkgever administratief als leidend aanhoudt.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Logische vervolgstappen rond verlof en uren"
          description="Nadat je uren en dagen hebt omgerekend, wil je vaak ook weten hoeveel verlof je opbouwt of wat je contracturen betekenen voor salaris."
          tools={[
            {
              href: "/tools/vakantiedagen-berekenen",
              title: "Vakantiedagen berekenen",
              description: "Bereken hoeveel wettelijke en extra verlofuren je hebt opgebouwd.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/parttime-salaris-calculator",
              title: "Parttime salaris calculator",
              description: "Leg je verlofschema naast je contracturen en bruto salaris.",
              badge: "Geld",
            },
            {
              href: "/tools/uurloon-calculator",
              title: "Uurloon calculator",
              description: "Reken je salaris terug naar een bruikbaar uurloon.",
              badge: "Geld",
            },
            {
              href: "/tools/eindejaarsuitkering-berekenen",
              title: "Eindejaarsuitkering berekenen",
              description: "Check ook je bonus- of 13e maand-indicatie binnen hetzelfde pakket.",
              badge: "Geld",
            },
          ]}
        />

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over verlofuren omrekenen
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
              Deze tool zet uren en dagen naar elkaar om. Voor de echte opbouw, vervaltermijnen en wettelijke ondergrenzen moet je altijd kijken naar de vakantiedagenregels, je cao en je arbeidscontract.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld/vraag-en-antwoord/op-hoeveel-vakantiedagen-heb-ik-recht"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Op hoeveel vakantiedagen heb ik recht?
                </a>
              </li>
              <li>
                <a
                  href="https://www.rijksoverheid.nl/onderwerpen/vakantiedagen-en-vakantiegeld/vraag-en-antwoord/hoe-kan-ik-mijn-vakantiedagen-opnemen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Hoe kan ik mijn vakantiedagen opnemen?
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
