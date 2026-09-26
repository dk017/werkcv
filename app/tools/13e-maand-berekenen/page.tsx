import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { estimateNetFromTaxableIncome } from "@/lib/tools/netto-bruto";
import EindejaarsuitkeringTool from "../eindejaarsuitkering-berekenen/EindejaarsuitkeringTool";

const euroFormatter = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

// One full 13th month, full year worked, under AOW age, with loonheffingskorting.
const thirteenthMonthExamples = [1800, 2200, 2800, 3500, 4500].map((monthlyGross) => {
  const annualGross = monthlyGross * 12;
  const baseEstimate = estimateNetFromTaxableIncome({ taxableAnnualIncome: annualGross, applyTaxCredits: true, ageProfile: "under_aow" });
  const totalEstimate = estimateNetFromTaxableIncome({ taxableAnnualIncome: annualGross + monthlyGross, applyTaxCredits: true, ageProfile: "under_aow" });
  const net = Math.round(totalEstimate.netAnnualIncome - baseEstimate.netAnnualIncome);

  return {
    monthlyGross,
    net,
    withheldShare: Math.round(((monthlyGross - net) / monthlyGross) * 100),
  };
});

const faqItems = [
  {
    question: "Wat is een 13e maand?",
    answer: "Een 13e maand is een extra uitbetaling van één bruto maandsalaris per jaar, bovenop je gewone twaalf salarissen. Omgerekend is dat 8,33% van je bruto jaarsalaris. Je krijgt hem alleen als dat in je cao, arbeidsovereenkomst of personeelsregeling staat.",
  },
  {
    question: "Wanneer krijg je een 13e maand?",
    answer: "Meestal in december, samen met of vlak na je decembersalaris. Sommige werkgevers betalen in november, verdelen de 13e maand over het jaar of laten je hem via een individueel keuzebudget (IKB) maandelijks opnemen. Je cao of contract bepaalt het moment.",
  },
  {
    question: "Hoeveel belasting betaal je over een 13e maand?",
    answer: "Over een 13e maand houdt je werkgever loonheffing in volgens de tabel voor bijzondere beloningen. Het percentage hangt af van je jaarloon en is vaak hoger dan wat je op je normale maandloon ziet, omdat de heffingskortingen al op je gewone loon zijn verrekend. Volgens onze indicatie houd je bij een bruto maandloon van ongeveer €2.200 tot €6.000 ruwweg de helft tot tweederde netto over; bij lagere inkomens vaak meer. Wat definitief verschuldigd is, volgt uit je jaarinkomen.",
  },
  {
    question: "Hoeveel is een 13e maand netto?",
    answer: "Dat hangt af van je totale jaarinkomen. De tabel op deze pagina geeft voorbeelden: het netto bedrag is het verschil tussen je geschatte netto jaarinkomen met en zonder 13e maand, volgens de belastingtarieven en heffingskortingen van 2026. Je loonstrook blijft leidend.",
  },
  {
    question: "Is een 13e maand verplicht?",
    answer: "Nee. Er is in Nederland geen wettelijk recht op een 13e maand. Je hebt er alleen recht op als je cao, arbeidsovereenkomst of personeelsregeling dat vastlegt. Staat het erin, dan moet je werkgever zich daar wel aan houden.",
  },
  {
    question: "Wat is het verschil tussen een 13e maand en een eindejaarsuitkering?",
    answer: "Een 13e maand is een vast extra maandsalaris (8,33% van je jaarsalaris). Een eindejaarsuitkering is vaker een ander percentage, bijvoorbeeld 4% of 5%, of een vast bedrag. In de praktijk worden de termen door elkaar gebruikt; kijk in je cao welk percentage en welke grondslag gelden.",
  },
  {
    question: "Krijg ik een 13e maand als ik later in het jaar ben begonnen of uit dienst ga?",
    answer: "Vaak krijg je dan een deel naar rato: het aantal gewerkte maanden gedeeld door twaalf. Ga je uit dienst, dan wordt het opgebouwde deel meestal met je eindafrekening uitbetaald. Controleer de exacte regel in je cao of contract.",
  },
  {
    question: "Krijg ik als parttimer een 13e maand?",
    answer: "Ja, als je regeling voor jou geldt. Parttimers krijgen een 13e maand over hun parttime salaris. Werk je 32 uur met een bruto maandloon van €2.800, dan is je bruto 13e maand ook €2.800.",
  },
  {
    question: "Is een 13e maand hetzelfde als vakantiegeld?",
    answer: "Nee. Vakantiegeld is wettelijk verplicht en bedraagt minimaal 8% van je bruto jaarloon, meestal uitbetaald in mei of juni. Een 13e maand is een extra, niet-wettelijke uitkering die je alleen krijgt als die is afgesproken.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "13e Maand Berekenen 2026: Netto, Belasting en Wanneer | WerkCV",
  description: "Bereken gratis je 13e maand in 2026. Zie wat je netto overhoudt, hoeveel belasting je betaalt, wanneer je hem krijgt en hoe pro rata werkt.",
  path: "/tools/13e-maand-berekenen",
  keywords: [
    "13e maand berekenen",
    "13e maand netto",
    "13e maand belasting",
    "wat is een 13e maand",
    "wanneer krijg je 13e maand",
    "hoeveel is 13e maand",
    "13e maand verplicht",
    "dertiende maand berekenen",
    "13e maand parttime",
    "13e maand pro rata",
  ],
});

export default function DertiendeMaandBerekenenPage() {
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
            { label: "13e maand berekenen", href: "/tools/13e-maand-berekenen" },
          ]} />
        </div>

        <section className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs font-black uppercase tracking-wide bg-blue-100 text-blue-800 px-3 py-1 border border-blue-300 rounded-full">
              Geld
            </span>
            <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
              Belastingtarieven 2026
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
            13e maand berekenen 2026: netto, belasting en wanneer je hem krijgt
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-3xl">
            Vul je bruto maandsalaris en gewerkte maanden in en zie direct je bruto 13e maand en wat je daarvan ongeveer netto overhoudt.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="#dertiende-maand-calculator"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black hover:bg-teal-300 transition-colors"
            >
              Bereken je 13e maand
            </Link>
            <Link
              href="/tools/eindejaarsuitkering-berekenen"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-900 font-black text-sm border-2 border-black hover:bg-slate-100 transition-colors"
            >
              Eindejaarsuitkering met percentage
            </Link>
          </div>
        </section>

        <section className="mb-8 bg-[#FFF7E8] border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-slate-900 mb-3">Wat is een 13e maand? Direct antwoord</h2>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed">
            Een 13e maand is één extra bruto maandsalaris per jaar, oftewel 8,33% van je bruto jaarsalaris. Je krijgt hem meestal in december, maar alleen als je cao of arbeidsovereenkomst hem noemt: er is geen wettelijk recht op. Over de uitbetaling houdt je werkgever loonheffing in volgens de tabel voor bijzondere beloningen, waardoor je bij een bruto maandloon van €2.200 tot €6.000 ongeveer de helft tot tweederde netto overhoudt; bij lagere inkomens vaak meer.
          </p>
          <p className="mt-3 text-sm font-black text-slate-900">
            Formule: bruto 13e maand = bruto maandsalaris × (gewerkte maanden ÷ 12).
          </p>
        </section>

        <section className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              title: "Wanneer krijg je hem?",
              body: "Meestal in december. Sommige werkgevers betalen in november, verdelen hem over het jaar of laten je hem via een IKB maandelijks opnemen.",
            },
            {
              title: "Hoeveel belasting?",
              body: "Je werkgever gebruikt de tabel voor bijzondere beloningen. Het percentage hangt af van je jaarloon en voelt vaak hoger dan op je gewone maandloon.",
            },
            {
              title: "Is het verplicht?",
              body: "Nee. Je hebt alleen recht op een 13e maand als je cao, contract of personeelsregeling dat vastlegt.",
            },
          ].map((card) => (
            <div key={card.title} className="border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-lg font-black text-slate-900">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{card.body}</p>
            </div>
          ))}
        </section>

        <section id="dertiende-maand-calculator" className="mb-12 scroll-mt-6">
          <EindejaarsuitkeringTool initialMethod="thirteenth-month" />
        </section>

        <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Voorbeelden 2026</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Hoeveel is een 13e maand netto?</h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">
            Uitgaande van een volledig gewerkt jaar, een werknemer onder de AOW-leeftijd en loonheffingskorting. Het netto bedrag is het verschil in geschat netto jaarinkomen met en zonder 13e maand.
          </p>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th className="px-3 py-2">Bruto maandloon = bruto 13e maand</th>
                  <th className="px-3 py-2">Netto indicatie</th>
                  <th className="px-3 py-2">Ingehouden (indicatie)</th>
                </tr>
              </thead>
              <tbody>
                {thirteenthMonthExamples.map((example) => (
                  <tr key={example.monthlyGross} className="border-b border-slate-200">
                    <td className="px-3 py-3 font-medium text-slate-700">{euroFormatter.format(example.monthlyGross)}</td>
                    <td className="px-3 py-3 font-medium text-slate-700">{euroFormatter.format(example.net)}</td>
                    <td className="px-3 py-3 font-medium text-slate-700">ca. {example.withheldShare}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Dit is geen loonstrookberekening. De inhouding op je loonstrook volgens de tabel voor bijzondere beloningen kan afwijken; wat je definitief verschuldigd bent, volgt uit je jaarinkomen. Pensioen en andere persoonlijke inhoudingen zijn niet meegenomen.
          </p>
        </section>

        <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-slate-900 mb-4">13e maand, eindejaarsuitkering of vakantiegeld?</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th className="px-3 py-2"></th>
                  <th className="px-3 py-2">13e maand</th>
                  <th className="px-3 py-2">Eindejaarsuitkering</th>
                  <th className="px-3 py-2">Vakantiegeld</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-200">
                  <td className="px-3 py-3 font-black">Hoogte</td>
                  <td className="px-3 py-3">1 maandsalaris (8,33%)</td>
                  <td className="px-3 py-3">Percentage of bedrag uit cao, vaak 4–8,33%</td>
                  <td className="px-3 py-3">Minimaal 8% van je jaarloon</td>
                </tr>
                <tr className="border-b border-slate-200">
                  <td className="px-3 py-3 font-black">Wettelijk verplicht?</td>
                  <td className="px-3 py-3">Nee</td>
                  <td className="px-3 py-3">Nee</td>
                  <td className="px-3 py-3">Ja</td>
                </tr>
                <tr>
                  <td className="px-3 py-3 font-black">Meestal uitbetaald</td>
                  <td className="px-3 py-3">December</td>
                  <td className="px-3 py-3">November of december</td>
                  <td className="px-3 py-3">Mei of juni</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            Werkt je cao met een ander percentage dan 8,33%? Gebruik dan de{" "}
            <Link href="/tools/eindejaarsuitkering-berekenen" className="font-bold text-teal-700 underline underline-offset-2">
              eindejaarsuitkering calculator
            </Link>{" "}
            met je eigen percentage.
          </p>
        </section>

        <RelatedToolsSection
          title="Ook handig rond je decemberloon"
          description="Reken door wat je extra uitkering betekent voor je netto loon, je vakantiegeld of een nieuwe baan."
          tools={[
            {
              href: "/tools/eindejaarsuitkering-berekenen",
              title: "Eindejaarsuitkering berekenen",
              description: "Voor regelingen met een eigen percentage, bijvoorbeeld 4% of 5% van je jaarloon.",
              badge: "Geld",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zie wat je maandloon netto ongeveer oplevert.",
              badge: "Geld",
            },
            {
              href: "/tools/vakantiegeld-berekenen",
              title: "Vakantiegeld berekenen",
              description: "Reken je wettelijke 8% vakantiegeld uit.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-calculator",
              title: "Salaris vergelijken met de markt",
              description: "Weeg je 13e maand mee als je een baanaanbod vergelijkt.",
              badge: "Salaris",
            },
          ]}
        />

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Veelgestelde vragen over de 13e maand</h2>
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
          toolName="13e-maand-berekenen"
          eyebrow="Denk je aan een nieuwe baan?"
          title="Weeg je 13e maand mee in je volgende stap"
          description="Maak je Nederlandse cv zonder abonnement. Je bouwt gratis en betaalt alleen eenmalig wanneer je de PDF wilt downloaden."
          primaryLabel="Maak je CV voor je volgende baan"
          primaryHref="/editor?template=professional&startSource=tool_13e_maand_berekenen"
          insightText="Een 13e maand scheelt al snel duizenden euro's per jaar. Vergelijk bij een nieuw aanbod altijd het totale pakket, niet alleen het maandloon."
          intent="salary"
        />

        <section className="bg-slate-50 border-2 border-slate-200 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">Bronnen en scope</p>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              Deze tool geeft een indicatie. Je recht op een 13e maand en de exacte berekening volgen uit je cao, arbeidsovereenkomst of personeelsregeling.
            </p>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://ondernemersplein.overheid.nl/personeel/arbeidsvoorwaarden/13e-maand-of-eindejaarsuitkering-voor-uw-personeel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Ondernemersplein - 13e maand of eindejaarsuitkering
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
              <li>
                <a
                  href="https://www.rijksoverheid.nl/vraag-en-antwoord/vakantiedagen-en-vakantiegeld/hoe-hoog-is-mijn-vakantiegeld"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Rijksoverheid - Hoe hoog is mijn vakantiegeld?
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
