import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import TrackedToolLink from "@/components/analytics/TrackedToolLink";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import ParttimeSalarisTool from "./ParttimeSalarisTool";

const faqItems = [
  {
    question: "Hoe bereken je parttime salaris vanuit fulltime?",
    answer: "Je rekent het fulltime salaris terug naar de verhouding tussen je parttime uren en de fulltime uren. Werk je bijvoorbeeld 32 uur op een fulltime norm van 40 uur, dan kom je uit op 80% van het fulltime salaris.",
  },
  {
    question: "Blijft mijn uurloon hetzelfde als ik parttime ga werken?",
    answer: "Bij een zuivere pro-rata omzetting meestal wel. In de praktijk kunnen toeslagen, ORT, ploegendienst, provisie of cao-schalen de echte uitkomst wel beinvloeden.",
  },
  {
    question: "Waarom is vakantiegeld apart zichtbaar?",
    answer: "Vakantiegeld maakt meestal geen deel uit van het kale bruto maandsalaris. Daarom laat WerkCV het apart zien als jaarlijkse opbouw boven op je parttime basisloon.",
  },
  {
    question: "Kan ik hiermee ook 24, 28, 32 of 36 uur vergelijken?",
    answer: "Ja. De tool laat naast je eigen invoer ook direct meerdere veelgekozen parttime scenario's zien, zodat je sneller kunt vergelijken.",
  },
  {
    question: "Wat is het minimumloon bij parttime werken in 2026?",
    answer: "Sinds 2024 is er geen vast wettelijk minimum maandloon meer. De wettelijke basis is een minimumuurloon. Per 1 januari 2026 is dat voor werknemers van 21 jaar en ouder 14,71 euro bruto per uur. Je maandloon hangt dus af van je gewerkte of afgesproken uren.",
  },
  {
    question: "Is parttime salaris altijd precies naar rato?",
    answer: "Bij dezelfde functie, schaal en arbeidsvoorwaarden is pro rata meestal de juiste rekensom. De echte loonstrook kan afwijken door cao-afspraken, toeslagen, een individueel keuzebudget, pensioenpremie, loonheffingskorting of wisselende maanduren.",
  },
];

const parttimeCvIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor je volgende stap",
    description: "Zet je salarisvergelijking direct om in een sollicitatieversie voor een andere rol of urenafspraak.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    label: "CV maken zonder abonnement",
    description: "Sterk voor bezoekers die een nieuwe baan overwegen, maar geen maandelijkse CV-tool willen.",
  },
  {
    href: "/cv-voorbeeld-starter",
    label: "CV voorbeeld starter",
    description: "Handig als je parttime of junior zoekt en eerst een inhoudelijke voorbeeldstructuur wilt zien.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV als PDF afronden",
    description: "Maak de vergelijking af met een stabiele sollicitatie-PDF zodra je keuze duidelijk is.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Parttime salaris berekenen 2026 | Fulltime naar 24-36 uur | WerkCV",
  description:
    "Reken fulltime naar parttime salaris om voor 24, 28, 32 of 36 uur. Zie bruto maandloon, jaarloon, uurloon en vakantiegeld in een tool.",
  path: "/tools/parttime-salaris-calculator",
  keywords: [
    "parttime salaris calculator",
    "parttime salaris berekenen",
    "parttime salaris berekenen 2026",
    "32 uur salaris berekenen",
    "28 uur salaris berekenen",
    "24 uur salaris berekenen",
    "36 uur salaris berekenen",
    "parttime loon berekenen",
    "fulltime naar parttime salaris",
    "minimumloon parttime 2026",
  ],
});

export default function ParttimeSalarisCalculatorPage() {
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
            { label: "Parttime salaris calculator", href: "/tools/parttime-salaris-calculator" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
                Geld
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 13 mei 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Parttime salaris berekenen: van fulltime naar 24, 28, 32 of 36 uur
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Reken je fulltime bruto salaris direct om naar parttime. WerkCV toont je maandloon, jaarloon, uurloon en vakantiegeld-indicatie voor je eigen uren en voor veelgebruikte scenario&apos;s zoals 24, 28, 32 en 36 uur.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedToolLink
                href="/cv-maken-zonder-abonnement"
                eventName="tool_to_cv_cta_click"
                toolName="parttime-salaris-calculator"
                ctaIntent="salary"
                trackingLocation="parttime-salaris-calculator:hero_salary_to_cv"
                trackingLabel="Bekijk cv zonder abonnement"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
              >
                Bekijk cv zonder abonnement
              </TrackedToolLink>
              <TrackedToolLink
                href="/cv-maken-zonder-abonnement"
                eventName="tool_to_cv_cta_click"
                toolName="parttime-salaris-calculator"
                ctaVariant="secondary"
                ctaIntent="salary"
                trackingLocation="parttime-salaris-calculator:hero_no_subscription"
                trackingLabel="CV maken zonder abonnement"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-200 transition-colors"
              >
                CV zonder abonnement
              </TrackedToolLink>
              <Link
                href="/templates"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-200 transition-colors"
              >
                Bekijk CV-templates
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Basis", "Pro rata", "van fulltime naar gewenste uren"],
                ["Veelgebruikte schema's", "24 / 28 / 32 / 36", "direct naast elkaar vergelijken"],
                ["Minimumloon", "2026-check", "op basis van bruto uurloon 21+"],
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
              Waarom deze tool sterk is
            </p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Veel mensen zoeken niet naar een theoretische FTE-formule, maar naar een concreet antwoord op 24, 28, 32 of 36 uur.</p>
              <p>Deze tool vertaalt dat meteen door naar maandloon, jaarloon, vakantiegeld en bruto uurloon, zodat je sneller kunt vergelijken of onderhandelen.</p>
              <p>Omdat het minimumloon sinds 2024 per uur geldt, is de uurloon-check belangrijker dan een vast maandbedrag.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <ParttimeSalarisTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Snel antwoord: zo werkt parttime salaris
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>De basisformule is: fulltime salaris x gewenste uren / fulltime uren.</li>
              <li>32 uur bij een fulltime norm van 40 uur is dus 80% van het fulltime salaris.</li>
              <li>24 uur is 60%, 28 uur is 70% en 36 uur is 90% als fulltime 40 uur is.</li>
              <li>De tool toont naast maand- en jaarloon ook vakantiegeld en bruto uurloon.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wanneer je echte loon kan afwijken
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Je uurloon verandert door een andere schaal, trede of functiewijziging.</li>
              <li>Je ontvangt ORT, ploegentoeslag, provisie of een bonusstructuur.</li>
              <li>Je hebt een IKB of vaste 13e maand die anders wordt berekend.</li>
              <li>Je werkgever gebruikt een andere fulltime norm, bijvoorbeeld 36 in plaats van 40 uur.</li>
              <li>Je maand heeft meer of minder werkdagen, waardoor uurloon en maandloon niet altijd hetzelfde aanvoelen.</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 mb-12">
          <div className="bg-[#FFF7D6] border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 mb-2">
              Voorbeeld
            </p>
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              32 uur salaris berekenen
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Stel: je fulltime salaris is 3.600 euro bruto per maand bij 40 uur. Bij 32 uur werk je 32 / 40 = 80%. Je parttime salaris wordt dan 2.880 euro bruto per maand, exclusief eventuele toeslagen of afwijkende cao-afspraken.
            </p>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Minimumloon bij parttime werken in 2026
            </h2>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Sinds 2024 werkt Nederland met een wettelijk minimumuurloon. Volgens de Rijksoverheid is het minimumuurloon per 1 januari 2026 voor werknemers van 21 jaar en ouder 14,71 euro bruto per uur.
              </p>
              <p>
                Daarom rekent deze tool ook je bruto uurloon uit. Voor een vaste maandafspraak blijft je cao of contract belangrijk, maar de minimumlooncontrole begint bij het uurloon.
              </p>
            </div>
          </div>
        </section>

        <RelatedToolsSection
          title="Gebruik deze salaristools samen"
          description="Parttime vergelijken wordt sterker als je daarna doorrekent naar netto, vakantiegeld en onderhandelingsruimte."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zet je parttime bruto bedrag direct om naar een bruikbare netto indicatie.",
              badge: "Geld",
            },
            {
              href: "/tools/uurloon-calculator",
              title: "Uurloon calculator",
              description: "Controleer of je uurloon logisch blijft na minder uren werken.",
              badge: "Geld",
            },
            {
              href: "/tools/vakantiegeld-berekenen",
              title: "Vakantiegeld berekenen",
              description: "Maak je parttime vergelijking compleet met een aparte bruto netto check van je vakantiegeld.",
              badge: "Geld",
            },
            {
              href: "/tools/verlofuren-omrekenen",
              title: "Verlofuren omrekenen",
              description: "Reken parttime verlofuren terug naar dagen voor je echte rooster.",
              badge: "Verlof",
            },
            {
              href: "/tools/salaris-onderhandeling",
              title: "Salaris onderhandeling",
              description: "Gebruik je uitkomst meteen als basis voor een loon- of urenonderhandeling.",
              badge: "AI",
            },
          ]}
        />

        <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            CV vervolgstap
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Van parttime salarisvergelijking naar nieuw CV
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Parttime rekenen is vaak geen eindpunt maar een voorbereiding op een nieuwe baan, urenafspraak of sollicitatie. Gebruik deze routes om die stap direct door te trekken naar je CV.
          </p>
          <SectionIntentLinks links={parttimeCvIntentLinks} locale="nl" />
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over parttime salaris
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

        <ToolToCvCTA
          toolName="parttime-salaris-calculator"
          eyebrow="Volgende stap na je salarisvergelijking"
          title="Op zoek naar een baan die beter bij je uren past?"
          description="Maak je Nederlandse cv zonder abonnement. Je bouwt gratis en betaalt alleen eenmalig wanneer je tevreden bent en de PDF wilt downloaden."
          primaryLabel="Werk mijn CV bij"
          primaryHref="/editor?template=professional&startSource=parttime_salary_page"
          secondaryHref="/cv-maken-zonder-abonnement?startSource=parttime_salary_no_subscription"
          secondaryLabel="Hoe betalen werkt"
          insightText="Gebruik je vergelijking als voorbereiding op je volgende sollicitatie: houd je cv praktisch, duidelijk en gericht op de uren en functie die je zoekt."
          intent="salary"
          resultState="parttime_salary_page_cta"
        />

        <section className="bg-slate-50 border-2 border-slate-200 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
            Bronnen en scope
          </p>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              Deze tool gebruikt een pro-rata omzetting van fulltime naar parttime uren. De juridische basis voor het wijzigen van je arbeidsduur en de gevolgen voor je salaris liggen in de afspraken met je werkgever, cao en contract. Sinds 2024 is het minimumloon een uurloon; per 1 januari 2026 is het minimumuurloon voor werknemers van 21 jaar en ouder 14,71 euro bruto.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.rijksoverheid.nl/onderwerpen/arbeidsovereenkomst-en-cao/vraag-en-antwoord/wanneer-mag-ik-meer-of-minder-uren-werken"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Wanneer mag ik meer of minder uren werken?
                </a>
              </li>
              <li>
                <a
                  href="https://www.rijksoverheid.nl/onderwerpen/minimumloon/bedragen-minimumloon/bedragen-minimumloon-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Bedragen minimumloon 2026
                </a>
              </li>
            </ul>
            <p>
              Voor netto loon, heffingskortingen en loonstrookcontrole hoort deze tool samen gebruikt te worden met de{" "}
              <Link href="/tools/netto-bruto-calculator" className="font-medium text-teal-700 hover:underline">
                netto-bruto calculator
              </Link>
              . Wil je je parttime vergelijking compleet maken, reken dan ook je{" "}
              <Link href="/tools/vakantiegeld-berekenen" className="font-medium text-teal-700 hover:underline">
                vakantiegeld bruto netto
              </Link>
              {" "}door.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
