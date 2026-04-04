import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import {
  THIRTY_PERCENT_GENERAL_THRESHOLD_2026,
  THIRTY_PERCENT_MAX_ALLOWANCE_2026,
  THIRTY_PERCENT_YOUNG_MASTER_THRESHOLD_2026,
} from "@/lib/tools/moat-calculators";
import { formatEuro } from "@/lib/tools/calculator-utils";
import DertigProcentRegelingTool from "./DertigProcentRegelingTool";

const faqItems = [
  {
    question: "Welke salarisdrempel geldt voor de 30%-regeling in 2026?",
    answer: "Voor 2026 geldt voor de algemene deskundigheidstoets een belastbaar jaarsalaris hoger dan EUR 48.013 exclusief de belastingvrije vergoeding. Voor werknemers jonger dan 30 met een erkende master geldt EUR 36.497.",
  },
  {
    question: "Geldt de salarisdrempel ook voor onderzoekers?",
    answer: "Nee. Voor wetenschappelijk onderzoekers bij aangewezen instellingen en artsen in opleiding tot specialist geldt geen salarisdrempel, maar de andere voorwaarden blijven wel relevant.",
  },
  {
    question: "Is 30% belastingvrij altijd gegarandeerd?",
    answer: "Nee. De werkgever mag maximaal 30% belastingvrij vergoeden. De feitelijke vergoeding kan lager zijn en de Belastingdienst moet de aanvraag goedkeuren.",
  },
  {
    question: "Wat doet deze checker wel en niet?",
    answer: "Deze tool geeft een pre-check op salaris en basisvoorwaarden. Het is geen officiële beschikking en vervangt geen advies van je werkgever, payrollprovider of de Belastingdienst.",
  },
];

const expatCvIntentLinks = [
  {
    href: "/en/dutch-cv-template",
    label: "Dutch CV template voor expats",
    description: "Gebruik een template die past bij Nederlandse recruiter-verwachtingen en Engelstalige kandidaten.",
  },
  {
    href: "/templates",
    label: "Vergelijk alle CV templates",
    description: "Bekijk welke template het best werkt voor jouw branche, visumroute of sollicitatieniveau.",
  },
  {
    href: "/en/guides/translate-resume-to-dutch-format",
    label: "Zet je bestaande resume om naar Dutch format",
    description: "Handig als je al een CV hebt maar het moet passen bij Nederlandse selectie.",
  },
  {
    href: "/editor",
    label: "Start direct in de editor",
    description: "Ga meteen van salaris- en expatcheck naar een sollicitatieklare CV-versie.",
  },
];

export const metadata: Metadata = {
  title: "30%-Regeling Checker 2026 - Gratis Tool | WerkCV",
  description: "Check de 30%-regeling voor 2026 met actuele Belastingdienst-drempels. Vergelijk je salaris, maanden in de regeling en basisvoorwaarden voor expats in Nederland.",
  keywords: [
    "30 regeling checker",
    "30 procent regeling 2026",
    "expatregeling salarisdrempel",
    "30 ruling netherlands 2026",
    "belastingdienst expatregeling",
  ],
};

export default function DertigProcentRegelingCheckerPage() {
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
            { label: "30%-regeling checker", href: "/tools/30-procent-regeling-checker" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-violet-100 text-violet-800 px-3 py-1 border border-violet-300 rounded-full">
                Expat
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 19 maart 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              30%-regeling checker
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Check snel of jouw salaris en basisvoorwaarden globaal aansluiten op de 30%-regeling in Nederland. Deze tool is bedoeld voor expats, internationals en werkgevers die eerst een snelle haalbaarheidscheck willen doen voordat ze de formele aanvraag starten.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Algemene drempel 2026", formatEuro(THIRTY_PERCENT_GENERAL_THRESHOLD_2026, 0), "belastbaar jaarsalaris excl. belastingvrije vergoeding"],
                ["Tot 30 jaar + master", formatEuro(THIRTY_PERCENT_YOUNG_MASTER_THRESHOLD_2026, 0), "lagere drempel voor deze doelgroep in 2026"],
                ["Maximale vergoeding", formatEuro(THIRTY_PERCENT_MAX_ALLOWANCE_2026, 0), "jaarlijkse cap vanaf 2026, pro rata als niet heel jaar"],
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
              <p>De 30%-regeling draait niet alleen om een ja/nee op expatstatus, maar vooral om salaris, buitenlandse werving en de 150 km-regel.</p>
              <p>Deze checker trekt die voorwaarden naar voren zodat je sneller ziet of een aanbod realistisch is.</p>
              <p>Dat is handig voordat je gaat onderhandelen, payroll opzet of een complete aanvraag met je werkgever opstart.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <DertigProcentRegelingTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat deze pre-check meeneemt
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De actuele salarisdrempels van de Belastingdienst voor 2026.</li>
              <li>Het lagere deskundigheidsbedrag voor werknemers jonger dan 30 met een master.</li>
              <li>De uitzondering zonder salarisdrempel voor aangewezen onderzoekers en artsen in opleiding tot specialist.</li>
              <li>De belangrijkste basisvoorwaarden rond buitenlandse werving, de 150 km-zone en loondienst.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat je daarna nog moet regelen
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De formele gezamenlijke aanvraag met je werkgever.</li>
              <li>Een geldige beschikking van de Belastingdienst.</li>
              <li>Controle op je exacte looncomponenten en payroll-opzet.</li>
              <li>Afstemming met je werkgever over de hoogte van de belastingvrije vergoeding, die ook lager dan 30% mag zijn.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Vervolgtools voor expats en internationale kandidaten"
          description="Na de 30%-regeling wil je meestal ook weten welke visumroute, salarisroute en functievertaling het best past bij je volgende stap in Nederland."
          tools={[
            {
              href: "/tools/kennismigrant-salary-checker",
              title: "Kennismigrant salary checker",
              description: "Vergelijk je aanbod ook met de IND-drempels voor de kennismigrantroute.",
              badge: "Expat",
            },
            {
              href: "/tools/eu-blue-card-checker",
              title: "EU Blue Card checker",
              description: "Leg de Blue Card-route naast de 30%-regeling en kennismigrantoptie.",
              badge: "Expat",
            },
            {
              href: "/tools/zoekjaar-checker",
              title: "Zoekjaar checker",
              description: "Check of je ook via het zoekjaar een logische route hebt.",
              badge: "Expat",
            },
            {
              href: "/tools/job-title-translator",
              title: "Functietitel vertaler NL-EN",
              description: "Maak je functietitel recruiter- en LinkedIn-proof voor de Nederlandse markt.",
              badge: "Expat",
            },
          ]}
        />

        <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            CV vervolgstap
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Van expatregeling naar sollicitatieklaar CV
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Zodra je weet welke salaris- en belastingroute haalbaar is, draait de volgende stap meestal om een Nederlandse CV-template, goede formattering en een snelle editorflow.
          </p>
          <SectionIntentLinks links={expatCvIntentLinks} locale="nl" />
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over de 30%-regeling
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
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              Deze pagina is bijgewerkt op <span className="font-black text-slate-900">19 maart 2026</span> op basis van actuele informatie van de Belastingdienst over de expatregeling, de 2026 salarisdrempels, de 150 km-voorwaarde en de maximale vergoeding.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/nl/buitenland/content/ik-kom-in-nederland-werken-30-procent-regeling-aanvragen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Belastingdienst - Kan ik de expatregeling aanvragen als ik in Nederland kom werken?
                </a>
              </li>
              <li>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/internationaal/personeel/u_bent_niet_in_nederland_gevestigd_loonheffingen_inhouden/als_u_loonheffingen_gaat_inhouden/extraterritoriale_kosten_en_de_30procentregeling/voorwaarden_voor_de_30procentregeling1/voorwaarden_voor_de_30procentregeling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Belastingdienst - Voorwaarden voor de expatregeling
                </a>
              </li>
              <li>
                <a
                  href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/internationaal/personeel/u_bent_niet_in_nederland_gevestigd_loonheffingen_inhouden/als_u_loonheffingen_gaat_inhouden/extraterritoriale_kosten_en_de_30procentregeling/voorwaarden_voor_de_30procentregeling1/definitie_ingekomen_werknemer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Belastingdienst - Definitie ingekomen werknemer
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
