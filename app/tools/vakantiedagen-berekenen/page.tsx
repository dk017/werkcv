import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import SectionIntentLinks from "@/components/seo/SectionIntentLinks";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
import { buildDutchMetadata } from "@/lib/page-metadata";
import VakantiedagenTool from "./VakantiedagenTool";

const faqItems = [
  {
    question: "Hoeveel wettelijke vakantiedagen krijg ik per jaar?",
    answer: "De wettelijke ondergrens is 4 keer je wekelijkse arbeidsduur. Werk je 40 uur per week, dan bouw je dus minimaal 160 vakantie-uren op. Werk je 32 uur, dan is het minimum 128 uur.",
  },
  {
    question: "Geldt dezelfde regel voor parttimers?",
    answer: "Ja. Voor parttimers geldt hetzelfde principe naar rato van hun contracturen. Daardoor hebben parttimers relatief evenveel wettelijk verlof als fulltimers.",
  },
  {
    question: "Wanneer vervallen wettelijke vakantiedagen meestal?",
    answer: "Wettelijke vakantiedagen vervallen meestal 6 maanden na het kalenderjaar waarin je ze hebt opgebouwd. Vakantie-uren die je in 2026 opbouwt, vervallen normaal gesproken op 1 juli 2027 als je ze kon opnemen. Voor bovenwettelijke dagen kunnen andere termijnen gelden.",
  },
  {
    question: "Bouw ik vakantiedagen op tijdens ziekte?",
    answer: "Ja, in principe bouw je tijdens ziekte wettelijke vakantiedagen op. Controleer bij bovenwettelijke dagen wel je cao of arbeidscontract.",
  },
  {
    question: "Hoe bereken ik vakantiedagen bij 32 uur werken?",
    answer: "Bij 32 uur per week is het wettelijke minimum 4 x 32 = 128 vakantie-uren per jaar. Werk je 4 dagen van 8 uur, dan is dat 16 wettelijke vakantiedagen per jaar.",
  },
  {
    question: "Mag mijn werkgever wettelijke vakantiedagen uitbetalen?",
    answer: "Tijdens je dienstverband mag je werkgever wettelijke vakantiedagen normaal niet zomaar uitbetalen. Bij einde dienstverband moeten niet-opgenomen vakantiedagen wel worden afgerekend. Bovenwettelijke dagen kunnen andere afspraken hebben.",
  },
];

const vacationCvIntentLinks = [
  {
    href: "/cv-aanmaken",
    label: "CV aanmaken voor een baanwissel",
    description: "Gebruik je verlof- en contractcheck als opstap naar een nieuwe sollicitatieversie.",
  },
  {
    href: "/cv-maken-zonder-abonnement",
    label: "CV maken zonder abonnement",
    description: "Past goed als je wel een nieuwe sollicitatieroute wilt, maar niet vast wilt zitten aan maandelijkse kosten.",
  },
  {
    href: "/beste-cv-maker-nederland",
    label: "Beste CV maker vergelijken",
    description: "Handig als je eerst prijsmodel, templates en Nederlandse sollicitatiefit wilt vergelijken.",
  },
  {
    href: "/cv-maken-pdf",
    label: "CV als PDF afronden",
    description: "Rond je nieuwe sollicitatieversie af zodra je plannen rond verlof of vertrek concreet worden.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Vakantiedagen Berekenen 2026 | Hoeveel Recht Heb Ik? | WerkCV",
  description: "Bereken je wettelijke vakantiedagen en vakantie-uren in 2026. Vul contracturen in en zie direct waar je recht op hebt.",
  path: "/tools/vakantiedagen-berekenen",
  keywords: [
    "vakantiedagen berekenen",
    "vakantie uren berekenen",
    "hoeveel vakantiedagen heb ik",
    "parttime vakantiedagen berekenen",
    "32 uur vakantiedagen berekenen",
    "24 uur vakantiedagen berekenen",
    "wettelijke vakantiedagen 2026",
    "verlofuren berekenen",
    "vakantiedagen vervallen 2026",
  ],
});

export default function VakantiedagenBerekenenPage() {
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
            { label: "Vakantiedagen berekenen", href: "/tools/vakantiedagen-berekenen" },
          ]} />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start mb-10">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs font-black uppercase tracking-wide bg-emerald-100 text-emerald-800 px-3 py-1 border border-emerald-300 rounded-full">
                NL wetgeving
              </span>
              <span className="text-xs font-black uppercase tracking-wide bg-slate-100 text-slate-700 px-3 py-1 border border-slate-300 rounded-full">
                Bijgewerkt 13 mei 2026
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 mb-4 leading-tight">
              Vakantiedagen berekenen in 2026
            </h1>
            <p className="text-lg text-slate-600 font-medium max-w-3xl">
              Bereken hoeveel wettelijke vakantiedagen en vakantie-uren je opbouwt bij fulltime of parttime werk. Vul je contracturen, werkdagen, extra dagen en opgenomen verlof in en zie direct wat je overhoudt.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
              {[
                ["Wettelijk minimum", "4x je weekuren", "de basisregel voor werknemers in Nederland"],
                ["Parttime-proof", "Naar rato", "zelfde verlofrecht relatief gezien"],
                ["Vervallen", "Meestal 1 juli", "wettelijke uren uit het vorige jaar"],
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
              <p>Veel calculators rekenen alsof iedereen 5 dagen van 8 uur werkt. Dat is voor 24, 32, 36 uur of 4x9-schema&apos;s te grof.</p>
              <p>WerkCV rekent eerst in vakantie-uren en zet daarna om naar dagen op basis van jouw werkdag.</p>
              <p>Zo controleer je sneller je saldo voordat je vrije dagen plant, verlof opneemt rond ontslag of een nieuwe baan start.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12">
          <VakantiedagenTool />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Snel antwoord: wettelijke vakantiedagen
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Het wettelijke minimum is 4 keer je wekelijkse arbeidsduur.</li>
              <li>Werk je 40 uur per week, dan is dat 160 vakantie-uren per jaar.</li>
              <li>Werk je 32 uur per week, dan is dat 128 vakantie-uren per jaar.</li>
              <li>Parttimers bouwen dus naar rato op, maar relatief evenveel als fulltimers.</li>
            </ul>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-slate-900 mb-4">
              Wat je zelf nog moet checken
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Andere vervaltermijnen voor bovenwettelijke dagen in je cao.</li>
              <li>Specifieke regels voor ADV, roostervrije uren of tijd-voor-tijd.</li>
              <li>Of je werkgever met uren of met dagen administreert op je loonstrook of HR-portaal.</li>
              <li>Of er nog openstaande dagen uit vorige jaren apart meetellen.</li>
              <li>Of feestdagen, ADV, roostervrije dagen of tijd-voor-tijd apart van vakantiedagen lopen.</li>
            </ul>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 mb-12">
          <div className="bg-[#FFF7D6] border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600 mb-2">
              Voorbeeld
            </p>
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              Vakantiedagen berekenen bij 32 uur
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Werk je 32 uur per week, dan is je wettelijke minimum 4 x 32 = 128 vakantie-uren per jaar. Werk je 4 dagen van 8 uur, dan is dat 16 wettelijke vakantiedagen. Werk je dezelfde 32 uur verdeeld over 5 kortere dagen, dan blijven het 128 uren, maar het aantal dagen hangt af van de lengte van je werkdag.
            </p>
          </div>
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              Vervallen of meenemen
            </p>
            <h2 className="text-2xl font-black text-slate-900 mb-3">
              Let op wettelijke en bovenwettelijke uren
            </h2>
            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              <p>
                Wettelijke vakantiedagen vervallen meestal 6 maanden na het kalenderjaar waarin je ze hebt opgebouwd. Voor vakantie-uren uit 2026 is dat normaal 1 juli 2027.
              </p>
              <p>
                Extra bovenwettelijke dagen kunnen langer blijven staan, maar cao, contract of personeelshandboek kunnen praktische afspraken bevatten. Controleer daarom altijd welk saldo wettelijk en welk saldo bovenwettelijk is.
              </p>
            </div>
          </div>
        </section>

        <RelatedToolsSection
          title="Sterke vervolgstappen rond loon, verlof en contract"
          description="Vakantiedagen staan zelden op zichzelf. Meestal wil je daarna ook weten wat je uurloon, vakantiegeld of opzegtermijn betekent."
          tools={[
            {
              href: "/tools/vakantiegeld-berekenen",
              title: "Vakantiegeld berekenen",
              description: "Bekijk wat je opgebouwde vakantiegeld ongeveer is naast je verlofuren.",
              badge: "Geld",
            },
            {
              href: "/tools/verlofuren-omrekenen",
              title: "Verlofuren omrekenen",
              description: "Zet je verlofsaldo om van uren naar dagen of andersom voor je echte werkweek.",
              badge: "Verlof",
            },
            {
              href: "/tools/parttime-salaris-calculator",
              title: "Parttime salaris calculator",
              description: "Vergelijk direct wat een 24-, 32- of 36-urige werkweek bruto betekent.",
              badge: "Geld",
            },
            {
              href: "/tools/opzegtermijn-berekenen",
              title: "Opzegtermijn berekenen",
              description: "Handig als je verlof plant rond een baanwissel of einddatum.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Reken daarna door wat je maandloon en vakantiegeld ongeveer netto opleveren.",
              badge: "Geld",
            },
          ]}
        />

        <section className="mb-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            CV vervolgstap
          </p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">
            Van verlofcheck naar sollicitatieactie
          </h2>
          <p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
            Verlofuren, einddata en baanwissels hangen vaak samen. Gebruik deze vervolgstappen als je vanuit contract- of verlofplanning door wilt naar een sollicitatieklaar CV.
          </p>
          <SectionIntentLinks links={vacationCvIntentLinks} locale="nl" />
        </section>

        <section className="mt-12 mb-12">
          <div className="mb-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
              FAQ
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
              Veelgestelde vragen over vakantiedagen
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
          toolName="vakantiedagen-berekenen"
          eyebrow="Volgende stap na je verlofcheck"
          title="Gebruik je verlofplanning voor je volgende baanstap"
          description="Maak je Nederlandse cv zonder abonnement. Je bouwt gratis en betaalt alleen eenmalig wanneer je de PDF wilt downloaden."
          primaryLabel="Bekijk cv zonder abonnement"
          insightText="Verlofuren, contracteinde en een baanwissel hangen vaak samen. Zet je cv klaar voordat je planning concreet wordt."
          intent="legal"
        />

        <section className="bg-slate-50 border-2 border-slate-200 p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-3">
            Bronnen en scope
          </p>
          <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <p>
              Deze pagina is bijgewerkt op <span className="font-black text-slate-900">13 mei 2026</span> op basis van actuele informatie van de Rijksoverheid en Business.gov.nl over het wettelijke minimum aan vakantiedagen en het opnemen, vervallen of meenemen van vakantie-uren.
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
              <li>
                <a
                  href="https://business.gov.nl/staff/terms-of-employment/statutory-holidays-what-you-need-to-know/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-700 hover:underline"
                >
                  Business.gov.nl - Statutory holidays: what you need to know
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
