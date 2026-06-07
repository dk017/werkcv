import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import KilometervergoedingTool from "../kilometervergoeding-berekenen/KilometervergoedingTool";

const faqItems = [
  {
    question: "Wat valt onder reiskostenvergoeding in 2026?",
    answer:
      "Reiskostenvergoeding is de brede vergoeding voor woon-werkverkeer. Dat kan kilometervergoeding met eigen vervoer zijn, vergoeding van OV-kosten, een vaste woon-werkvergoeding via de 214-dagenregeling of een combinatie binnen je werkgever- of cao-afspraken.",
  },
  {
    question: "Hoe hoog is de belastingvrije kilometervergoeding in 2026?",
    answer:
      "In 2026 mag een werkgever maximaal €0,25 per kilometer belastingvrij vergoeden voor eigen vervoer. Betaalt de werkgever meer, dan is alleen het deel boven €0,25 in principe belast loon.",
  },
  {
    question: "Mag een werkgever ook OV volledig vergoeden?",
    answer:
      "Ja. Bij openbaar vervoer mag een werkgever de werkelijke OV-kosten belastingvrij vergoeden. Daarom kun je in deze tool ook rekenen met de prijs van een enkele rit in plaats van alleen met kilometers.",
  },
  {
    question: "Hoe werkt reiskostenvergoeding bij hybride werken?",
    answer:
      "Je rekent alleen de dagen waarop je echt naar kantoor reist. Werk je bijvoorbeeld 3 dagen op kantoor en 2 dagen thuis, dan gebruik je 3 reisdagen per week. Voor een vaste vergoeding wordt vaak de 214-dagenregeling gebruikt, naar rato van je werkweek.",
  },
  {
    question: "Is reiskostenvergoeding hetzelfde als thuiswerkvergoeding?",
    answer:
      "Nee. Reiskostenvergoeding gaat over reisbewegingen naar werk, terwijl thuiswerkvergoeding geldt voor dagen waarop je thuiswerkt. Voor dezelfde dag loopt dat meestal niet onbeperkt naast elkaar.",
  },
  {
    question: "Waarom zie ik online soms nog €0,23 staan?",
    answer:
      "Sommige overheidspagina's lopen nog achter. De Belastingdienst publiceerde op 26 mei 2026 dat de onbelaste kilometervergoeding voor heel 2026 vooruitlopend is goedgekeurd op €0,25 met terugwerkende kracht vanaf 1 januari 2026.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Reiskostenvergoeding Berekenen 2026 | Woon-werk, OV en 214 dagen | WerkCV",
  description:
    "Bereken je reiskostenvergoeding in 2026 voor auto, fiets of OV. Inclusief €0,25 per km, hybride werken en de 214-dagenregeling.",
  path: "/tools/reiskostenvergoeding-berekenen",
  keywords: [
    "reiskostenvergoeding berekenen",
    "reiskostenvergoeding 2026",
    "woon werk vergoeding berekenen",
    "reiskostenvergoeding ov berekenen",
    "reiskostenvergoeding hybride werken",
    "214 dagen regeling reiskostenvergoeding",
    "vaste reiskostenvergoeding berekenen",
    "woon werk vergoeding 0,25",
    "reiskostenvergoeding per maand berekenen",
  ],
});

export default function ReiskostenvergoedingBerekenenPage() {
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
              { label: "Reiskostenvergoeding berekenen", href: "/tools/reiskostenvergoeding-berekenen" },
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
                Bijgewerkt juni 2026
              </span>
            </div>
            <h1 className="mb-4 text-3xl font-black leading-tight text-slate-900 sm:text-5xl">
              Reiskostenvergoeding berekenen 2026
            </h1>
            <p className="max-w-3xl text-lg font-medium text-slate-600">
              Bereken je woon-werkvergoeding voor eigen vervoer, fiets of openbaar vervoer. Deze route is bedoeld voor
              het bredere reiskostenvraagstuk: hoeveel is belastingvrij, hoe werkt hybride werken, en wat betekent de
              214-dagenregeling voor een vaste vergoeding?
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/salaris-vergelijker"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-teal-300"
              >
                Vergelijk een baanaanbod
              </Link>
              <Link
                href="/tools/thuiswerkvergoeding-berekenen"
                className="inline-flex items-center justify-center gap-2 border-2 border-black bg-white px-5 py-3 text-sm font-black text-slate-900 transition-colors hover:bg-slate-100"
              >
                Thuiswerkvergoeding erbij pakken
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ["Belastingvrij eigen vervoer", "€0,25 per km", "goedgekeurd voor heel 2026"],
                ["Openbaar vervoer", "Werkelijke kosten", "of ritprijs × 2 × reisdagen"],
                ["Vaste vergoeding", "214 dagen", "naar rato bij parttime of hybride"],
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
            <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-500">Waar mensen op vastlopen</p>
            <div className="space-y-3 text-sm text-slate-600">
              <p>Niet elke werkgever vergoedt reisdagen op dezelfde manier: sommige kiezen kilometers, andere vergoeden OV of werken met een vast maandbedrag.</p>
              <p>Bij hybride werken wil je weten hoeveel reisdagen werkelijk meetellen en of thuiswerkdagen apart worden vergoed.</p>
              <p>Deze pagina vertaalt dat brede beleid direct naar maand- en jaarbedragen die je kunt gebruiken in een aanbodvergelijking.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <KilometervergoedingTool />
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wanneer gebruik je kilometers?</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Gebruik de kilometerstand wanneer je met eigen vervoer reist, zoals auto, motor of fiets. De tool rekent
              automatisch heen en terug en vergelijkt jouw tarief met de belastingvrije grens van 2026.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wanneer gebruik je OV?</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Gebruik de OV-modus wanneer je werkgever je trein-, metro- of busritten vergoedt. Dan wil je meestal
              rekenen met de werkelijke ritprijs, niet alleen met een km-tarief.
            </p>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Wanneer gebruik je 214 dagen?</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Kies de 214-dagenregeling wanneer je een vaste woon-werkvergoeding wilt inschatten. Fulltime wordt dan
              gerekend met 214 reisdagen per jaar en parttime of hybride wordt naar rato aangepast.
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Reiskostenvergoeding is breder dan kilometervergoeding</h2>
            <p className="text-sm leading-relaxed text-slate-700">
              Kilometervergoeding is alleen het deel per kilometer bij eigen vervoer. Reiskostenvergoeding omvat ook OV,
              vaste maandafspraken, carpoolconstructies of combinaties met thuiswerkbeleid. Daarom zoeken veel mensen
              eigenlijk naar reiskostenvergoeding terwijl ze uiteindelijk met verschillende regelsoorten te maken hebben.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Wil je alleen de eigen-vervoerhoek lezen? Dan kun je ook naar{" "}
              <Link href="/tools/kilometervergoeding-berekenen" className="font-black text-teal-700 underline">
                kilometervergoeding berekenen
              </Link>
              .
            </p>
          </div>
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">Waar je in 2026 extra op moet letten</h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Controleer of je werkgever werkt met werkelijke reisdagen of een vast maandbedrag.</li>
              <li>Bij OV mogen werkelijke kosten belastingvrij worden vergoed.</li>
              <li>Bij hybride werken lopen thuiswerkvergoeding en reiskostenvergoeding meestal niet op dezelfde dag door elkaar.</li>
              <li>Sommige informatiepagina&apos;s noemen nog €0,23, maar de Belastingdienst keurde op 26 mei 2026 alvast €0,25 per km goed voor heel 2026.</li>
            </ul>
          </div>
        </section>

        <RelatedToolsSection
          title="Meer tools voor woon-werk en aanbodvergelijking"
          description="Gebruik reiskostenvergoeding samen met deze tools als je een baanvoorstel volledig wilt doorrekenen."
          tools={[
            {
              href: "/tools/thuiswerkvergoeding-berekenen",
              title: "Thuiswerkvergoeding berekenen",
              description: "Voor hybride werken wil je de balans zien tussen kantoordagen en thuiswerkdagen.",
              badge: "Geld",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Vergelijk twee aanbiedingen inclusief reisvergoeding, thuiswerk en vakantiedagen.",
              badge: "Geld",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Zet je totale pakket daarna af tegen je echte netto maandinkomen.",
              badge: "Geld",
            },
            {
              href: "/tools/kilometervergoeding-berekenen",
              title: "Kilometervergoeding berekenen",
              description: "Specifiek inzoomen op eigen vervoer en belastingvrij deel per kilometer.",
              badge: "Geld",
            },
          ]}
        />

        <section className="mb-12 mt-12">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              Veelgestelde vragen over reiskostenvergoeding
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

        <ToolToCvCTA
          toolName="reiskostenvergoeding-berekenen"
          eyebrow="Na je aanbodcheck"
          title="Gebruik je reiskosteninzicht wanneer je een nieuwe baan overweegt"
          description="Werk je aan een overstap? Zet je cv alvast klaar terwijl reistijd, vergoeding en thuiswerkafspraken nog scherp in beeld zijn."
          primaryLabel="Bekijk cv zonder abonnement"
          insightText="Een aanbod voelt anders zodra je het complete pakket doorrekent. Gebruik dit bedrag naast salaris, thuiswerkvergoeding en vakantiedagen."
          intent="salary"
        />

        <section className="border-2 border-slate-200 bg-slate-50 p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Bronnen</p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/nl/personeel-en-loon/content/reiskosten-vergoeden"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Belastingdienst - Reiskosten vergoeden
              </a>
            </li>
            <li>
              <a
                href="https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/berichten/nieuws/verhoging-onbelaste-kilometervergoeding-hoe-verwerkt-u-dit-in-de-loonaangifte"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Belastingdienst - Verhoging onbelaste kilometervergoeding (26 mei 2026)
              </a>
            </li>
            <li>
              <a
                href="https://www.rijksoverheid.nl/onderwerpen/inkomstenbelasting/vraag-en-antwoord/wat-is-de-maximale-kilometervergoeding-die-ik-van-mijn-werkgever-kan-ontvangen"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                Rijksoverheid - Maximale kilometervergoeding van je werkgever
              </a>
            </li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
