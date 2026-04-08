import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import SalarisCalculatorTool from "./SalarisCalculatorTool";

const faqItems = [
  {
    question: "Wat vul ik in bij mijn salaris in deze tool?",
    answer: "Gebruik je bruto maandsalaris exclusief vakantiegeld, bonus, 13e maand en pensioeninhouding. Zo vergelijk je zo eerlijk mogelijk met het CBS-uurloon per beroep.",
  },
  {
    question: "Waarom gebruikt WerkCV CBS 2024 data op een pagina in 2026?",
    answer: "CBS publiceert deze beroepsspecifieke loonpercentielen met vertraging. Op 7 april 2026 is 2024 het nieuwste beschikbare CBS-jaar in deze dataset, en dat is duidelijker dan doen alsof er al officiële 2026 beroepsdata is.",
  },
  {
    question: "Waarom kan mijn echte salaris toch afwijken?",
    answer: "Je werkelijke loon hangt ook af van CAO-inschaling, bedrijfsgrootte, regio, ploegendienst, bonus, toeslagen, pensioen en de exacte functiezwaarte binnen dezelfde beroepsgroep.",
  },
  {
    question: "Is dit een netto calculator?",
    answer: "Nee. Dit is een bruto salarischeck tegen CBS-benchmarks per beroep. Voor bruto naar netto of netto naar bruto gebruik je daarna de netto-bruto calculator.",
  },
];

const cvIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken zodra je weet welke salarisrange je wilt targeten",
    description: "Gebruik je benchmark om gerichter te solliciteren op rollen die echt bij je niveau passen.",
  },
  {
    href: "/gratis-cv-maken",
    label: "Gratis CV maken voor je volgende salarissprong",
    description: "Trek je salarischeck direct door naar een sollicitatieversie zonder eerst te betalen.",
  },
  {
    href: "/cv-maken-template",
    label: "CV maken met een template voor een sterkere offercheck",
    description: "Handig als je straks met recruiters of werkgevers over een hoger niveau wilt praten.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV als PDF klaarzetten voor je volgende gesprek",
    description: "Werk eerst je inhoud bij en maak daarna een nette versie voor je sollicitatie of onderhandeling.",
  },
];

export const metadata: Metadata = {
  title: "Salaris Check 2026 - Check Je Salaris Met CBS Data | WerkCV",
  description: "Vergelijk je bruto maandsalaris met CBS 2024 loonpercentielen per beroep. Check of je onder, rond of boven de mediaan zit en koppel je salarischeck aan netto, onderhandeling en je CV.",
  keywords: [
    "salaris check",
    "salaris calculator nederland",
    "check je salaris",
    "marktconform salaris",
    "wat verdien ik",
    "salaris vergelijking",
    "gemiddeld salaris per beroep",
  ],
};

export default function SalarisCalculatorPage() {
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
            { label: "Salaris check", href: "/tools/salaris-calculator" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                Geld
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 7 april 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Salaris check 2026
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Vergelijk je bruto salaris met de nieuwste beschikbare CBS-benchmark per beroep. WerkCV rekent de officiële 2024 uurloonpercentielen om naar jouw urennorm, zodat je sneller ziet of je onder, rond of boven de markt zit.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/netto-bruto-calculator"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
              >
                Reken daarna netto door
              </Link>
              <Link
                href="/tools/salaris-onderhandeling"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
              >
                Onderhandelingsscript
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Data", "CBS 2024", "voorlopige beroepsspecifieke loonpercentielen"],
                ["Vergelijking", "25 / 50 / 75", "je ziet meteen waar je salaris landt"],
                ["Input", "Uren + bruto maand", "excl. bonus, vakantiegeld en pensioen"],
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
              Waarom deze tool beter is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>De oude versie gaf een generieke sectorrange. Deze versie vergelijkt op CBS-uurloon per concreet beroep.</p>
              <p>Daardoor kun je je huidige loon realistischer toetsen voordat je gaat onderhandelen of reageren op een aanbod.</p>
              <p>En omdat de uitkomst direct linkt naar netto, onderhandeling en CV-pagina&apos;s past dit perfect in de WerkCV-funnel.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <SalarisCalculatorTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat deze salarischeck bewust wel meeneemt
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Officiële CBS-loonpercentielen per beroep in plaats van een losse sectorinschatting.</li>
              <li>Vergelijking op uurloon, daarna omgerekend naar jouw wekelijkse urennorm.</li>
              <li>Een duidelijke mediaan plus onder- en bovenkant van de marktband.</li>
              <li>Een directe vertaalslag naar de volgende stap: netto, onderhandeling of sollicitatie.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat je nog steeds zelf moet controleren
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je CAO-schaal, trede en eventuele periodieken.</li>
              <li>Bonus, ploegentoeslag, 13e maand, ORT of andere extra looncomponenten.</li>
              <li>Regionale verschillen, bedrijfsgrootte en specialistische nichekennis.</li>
              <li>De exacte functie-inhoud: niet elke titel binnen één CBS-groep is even zwaar.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Verdiep je salarischeck"
          description="Na een marktbenchmark wil je meestal ook weten wat een aanbod netto betekent, hoe je je uurloon vergelijkt en hoe je dat gesprek voert."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zet je bruto salarischeck direct om naar een netto indicatie met 2026 belastingregels.",
              badge: "Geld",
            },
            {
              href: "/tools/uurloon-calculator",
              title: "Uurloon calculator",
              description: "Controleer je eigen uurloon los van deze benchmark nog een keer in een aparte rekenflow.",
              badge: "Geld",
            },
            {
              href: "/tools/vakantiegeld-berekenen",
              title: "Vakantiegeld berekenen",
              description: "Bekijk daarna wat 8% of een afwijkend percentage bruto toevoegt aan je totaalpakket.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je benchmark direct in een script of e-mail voor recruiter of werkgever.",
              badge: "AI",
            },
          ]}
        />

        <section className="mt-12 mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
            Van salarischeck naar sollicitatieactie
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
            Gebruik je benchmark om gerichter te solliciteren
          </h2>
          <p className="max-w-3xl text-sm text-slate-600 leading-relaxed">
            Wie checkt of een salaris marktconform is, zit meestal midden in een baanwissel, offercheck of onderhandelingsmoment. Maak daar gebruik van en trek die duidelijkheid meteen door naar je CV en sollicitatiepositie.
          </p>
          <SectionIntentLinks links={cvIntentLinks} locale="nl" />
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over deze salarischeck
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
            Bronnen
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://opendata.cbs.nl/ODataApi/OData/85517NED/TypedDataSet"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                CBS OData 85517NED - uurloonpercentielen per beroep
              </a>
            </li>
            <li>
              <a
                href="https://opendata.cbs.nl/ODataApi/OData/85517NED/Beroep"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                CBS OData 85517NED - beroepsindeling
              </a>
            </li>
            <li>
              <a
                href="https://www.cbs.nl/nl-nl/visualisaties/dashboard-arbeidsmarkt/ontwikkeling-cao-lonen/uurloon"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                CBS Dashboard Arbeidsmarkt - uurloon
              </a>
            </li>
          </ul>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Deze pagina is bijgewerkt op <span className="font-black text-slate-900">7 april 2026</span>. De beroepsspecifieke benchmark gebruikt de nieuwste beschikbare CBS-jaargang in deze dataset: <span className="font-black text-slate-900">2024 voorlopige cijfers</span>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
