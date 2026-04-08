import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import ZiekengeldTool from "./ZiekengeldTool";

const faqItems = [
  {
    question: "Hoeveel loon krijg je doorbetaald bij ziekte in Nederland?",
    answer:
      "Tijdens de eerste 104 weken ziekte moet een werkgever in Nederland meestal minimaal 70% van het loon doorbetalen. In veel cao's is jaar 1 ruimer geregeld, bijvoorbeeld 100%, en jaar 2 vaak 70%.",
  },
  {
    question: "Is ziekengeld altijd 100% in het eerste jaar?",
    answer:
      "Nee. Veel werkgevers of cao's betalen in het eerste jaar 100%, maar wettelijk ligt de ondergrens meestal op 70% van het loon. Daarom is het slim om je contract of cao te controleren.",
  },
  {
    question: "Wat gebeurt er na 104 weken ziekte?",
    answer:
      "Na 104 weken volgt meestal een WIA-beoordeling. Deze calculator rekent alleen de periode van loondoorbetaling door de werkgever door.",
  },
  {
    question: "Is dit netto of bruto ziekengeld?",
    answer:
      "Deze tool rekent met bruto bedragen. Wat je netto ontvangt hangt af van loonheffing, pensioeninhouding en andere afspraken op je loonstrook.",
  },
];

export const metadata: Metadata = {
  title: "Ziekengeld Berekenen 2026 - Wat Krijg Je Bij Ziekte? | WerkCV",
  description:
    "Bereken je ziekengeld bij ziekte in Nederland. Hoeveel procent van je salaris ontvang je in jaar 1 en jaar 2? Direct inzichtelijk met onze 2026 calculator.",
};

export default function ZiekengeldBerekenenPage() {
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
              { label: "Ziekengeld berekenen", href: "/tools/ziekengeld-berekenen" },
            ]}
          />
        </div>

        <section className="mb-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-emerald-800">
                NL wetgeving
              </span>
              <span className="rounded-full border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-black uppercase tracking-wide text-slate-700">
                Bijgewerkt april 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Ziekengeld berekenen 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bereken hoeveel bruto loon je ongeveer ontvangt tijdens ziekte in jaar 1 en jaar 2. Deze tool rekent door met de Nederlandse ondergrens van 70% en laat ook zien hoeveel je werkgever daar eventueel boven zit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Maak gratis je CV
              </Link>
              <Link
                href="/tools/ww-recht-checker"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                WW recht checker
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Wettelijke bodem", "Minimaal 70%", "van je laatst verdiende loon"],
                ["Duur", "104 weken", "daarna meestal WIA-beoordeling"],
                ["Tijdswinst", "1 minuut inzicht", "direct jaar 1 en jaar 2 vergelijken"],
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
              Wanneer dit speelt
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Bij ziekte wil je snel weten wat er financieel verandert en hoeveel ruimte je nog hebt.</p>
              <p>Dat is extra relevant als je contract eindigt, je re-integratie onduidelijk is of je nadenkt over een nieuwe rol zodra het weer kan.</p>
              <p>WerkCV verbindt die inkomensvraag direct met je volgende loopbaanstap.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <ZiekengeldTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Waar je op moet letten</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Check altijd je cao of arbeidsovereenkomst voor de exacte loondoorbetaling.</li>
              <li>Jaar 1 en jaar 2 verschillen vaak sterk in percentage.</li>
              <li>Pensioen, loonheffing en andere inhoudingen kunnen je netto bedrag nog veranderen.</li>
            </ul>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wanneer je verder moet kijken dan ziekengeld</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Loopt ziekte langer door, dan verschuift de focus vaak naar re-integratie, contracteinde, WW of WIA. Daarom is ziekengeld vooral een eerste financiële indicatie, geen compleet vangnetoverzicht.
            </p>
          </div>
        </section>

        <RelatedToolsSection
          title="Meer tools rond werk, inkomen en heroriëntatie"
          description="Gebruik deze routes samen als ziekte, contract en inkomen tegelijk relevant zijn."
          tools={[
            {
              href: "/tools/ww-recht-checker",
              title: "WW recht checker",
              description: "Check de basisvoorwaarden als je contract of werkuren veranderen.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              description: "Handig als ziekte samengaat met uitdiensttreding of ontslag.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Vertaal het bruto bedrag daarna naar een netto indicatie.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Vergelijk twee aanbiedingen zodra je weer vooruit kunt kijken.",
              badge: "Geld",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over ziekengeld
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
                href="https://www.rijksoverheid.nl/onderwerpen/ziekte-en-arbeidsongeschiktheid/vraag-en-antwoord/hoeveel-loon-krijg-ik-doorbetaald-als-ik-ziek-ben"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Rijksoverheid - Hoeveel loon krijg ik doorbetaald als ik ziek ben?
              </a>
            </li>
            <li>
              <a
                href="https://www.uwv.nl/particulieren/ziek/ik-ben-ziek/detail/ziek-na-2-jaar-loondoorbetaling"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                UWV - Ziek na 2 jaar loondoorbetaling
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
