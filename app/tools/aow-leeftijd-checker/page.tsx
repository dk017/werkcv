import type { Metadata } from "next";
import { RelatedToolsSection } from "@/components/tools/RelatedToolsSection";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { AOW_AGE_RANGES } from "@/lib/tools/employment-tools";
import AowLeeftijdTool from "./AowLeeftijdTool";

const aowAgeRows = AOW_AGE_RANGES
  .filter((range) => range.startKey >= 19530101 && range.startKey <= 19990401)
  .map((range) => ({
    birthWindow: range.label,
    age:
      range.months > 0
        ? `${range.years} jaar en ${range.months} maanden`
        : `${range.years} jaar`,
    expected: range.expected,
  }));

const faqItems = [
  {
    question: "Wanneer gaat mijn AOW in?",
    answer:
      "Je AOW-uitkering gaat in op de dag dat je je AOW-leeftijd bereikt. Je ontvangt de eerste betaling in de maand erna. De SVB informeert je automatisch 4 maanden vóór je AOW-ingangsdatum — je hoeft niets zelf aan te vragen als je al in Nederland woont.",
  },
  {
    question: "Kan de overheid mijn AOW-leeftijd nog verhogen?",
    answer:
      "Ja. De AOW-leeftijd is gekoppeld aan de levensverwachting via CBS-data. Als Nederlanders gemiddeld langer leven, kan de AOW-leeftijd stijgen. Verhogingen worden minimaal 5 jaar van tevoren aangekondigd. Per 2026 is voor de komende jaren geen verdere verhoging vastgesteld.",
  },
  {
    question: "Wat is het verschil tussen AOW en aanvullend pensioen?",
    answer:
      "AOW is de basisuitkering van de overheid voor iedereen die in Nederland heeft gewoond of gewerkt. Aanvullend pensioen is wat je via je werkgever of pensioenfonds opbouwt (de zogenoemde tweede pijler). In de meeste gevallen ontvang je beide. Je AOW-leeftijd bepaalt wanneer de staatsuitkering begint — je aanvullend pensioen kan soms eerder of later ingaan afhankelijk van je pensioenregeling.",
  },
  {
    question: "Wat als ik een deel van mijn leven buiten Nederland heb gewoond?",
    answer:
      "Voor elk jaar dat je niet in Nederland woonde of werkte tussen je 15e en je AOW-leeftijd, wordt 2% van je volledige AOW-bedrag afgetrokken. Na 50 jaar NL-inwonerschap heb je recht op de volledige AOW. Je kunt ontbrekende jaren soms vrijwillig verzekeren via de SVB.",
  },
  {
    question: "Kan ik eerder stoppen met werken dan mijn AOW-leeftijd?",
    answer:
      "Ja, maar je ontvangt dan nog geen AOW. Je moet zelf zorgen voor overbruggingsinkomsten via spaargeld, aanvullend pensioen of een regeling als RVU (Regeling Vervroegde Uittreding) als je werkgever dat aanbiedt. De AOW-uitkering start altijd pas op je wettelijke AOW-leeftijd.",
  },
  {
    question: "Hoe hoog is de AOW-uitkering?",
    answer:
      "De AOW-uitkering voor een alleenstaande is in 2026 circa €1.400 netto per maand (inclusief vakantiegeld). Voor gehuwden of samenwonenden is dit circa €960 netto per persoon per maand. De exacte bedragen worden elk halfjaar aangepast aan de minimumloonindex — raadpleeg svb.nl voor de actuele bedragen.",
  },
];

export const metadata: Metadata = {
  title: "Pensioenleeftijd Berekenen in 2026 | AOW-leeftijd en AOW-datum | WerkCV",
  description:
    "Bereken je pensioenleeftijd via je AOW-leeftijd en AOW-datum. Inclusief verschil tussen AOW, aanvullend pensioen en eerder stoppen met werken. Gebaseerd op SVB-regels voor 2026.",
  keywords: [
    "pensioenleeftijd berekenen",
    "pensioen leeftijd berekenen",
    "aow leeftijd berekenen",
    "wanneer met pensioen",
    "aow datum berekenen",
    "aow leeftijd 2026",
    "wanneer krijg ik aow",
  ],
};

export default function AowLeeftijdCheckerPage() {
  return (
    <ToolPageShell
      badge="NL wetgeving"
      title="Pensioenleeftijd berekenen: check je AOW-leeftijd en AOW-datum"
      description="Vul je geboortedatum in en zie direct wanneer je AOW ingaat. Je ziet ook waarom AOW-leeftijd niet hetzelfde is als je volledige pensioenleeftijd en wat eerder stoppen financieel betekent."
      toolLabel="Pensioenleeftijd berekenen"
      toolHref="/tools/aow-leeftijd-checker"
      faqTitle="Veelgestelde vragen over pensioenleeftijd en AOW"
      faqItems={faqItems}
      statPills={[
        {
          label: "AOW nu",
          value: "67 jaar",
          note: "voor 1 maart 1957 t/m 31 december 1960 vast, latere cohorten schuiven verder op",
        },
        {
          label: "SVB bron",
          value: "officiële AOW-leeftijd per geboortejaar",
          note: "de tool rekent met de huidige SVB-stappen",
        },
        {
          label: "Breder dan AOW",
          value: "pensioenleeftijd hangt ook van pensioenpot en werkgever af",
          note: "AOW is alleen het wettelijke startpunt van de staatsuitkering",
        },
      ]}
      asideTitle="AOW is niet je hele pensioen"
      asideParagraphs={[
        "Veel zoekers typen pensioenleeftijd, maar bedoelen in de praktijk hun AOW-datum.",
        "Die AOW-datum is het wettelijke startpunt van je staatsuitkering, niet automatisch de datum waarop je aanvullend pensioen ingaat.",
        "Daarom laat deze pagina zowel je AOW-start als het effect van eerder stoppen met werken zien.",
      ]}
    >
      <>
        <AowLeeftijdTool />

        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">
              AOW-leeftijd en pensioenleeftijd zijn niet hetzelfde
            </h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-700">
              <p>
                De AOW-leeftijd bepaalt wanneer je wettelijke basisuitkering van de overheid start.
                Dat is het deel waar deze checker direct antwoord op geeft.
              </p>
              <p>
                Je echte pensioenleeftijd kan breder liggen. Aanvullend pensioen via een
                pensioenfonds of werkgever kan soms eerder, later of in delen ingaan. Ook spaargeld,
                RVU-regelingen of deeltijdpensioen kunnen invloed hebben op wanneer jij feitelijk stopt
                met werken.
              </p>
              <p>
                Zoek je dus op pensioenleeftijd berekenen, dan is je AOW-datum het eerste ankerpunt,
                maar niet automatisch je volledige inkomensplaatje na werk.
              </p>
            </div>
          </div>

          <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-slate-900">
              Voor wie extra controle belangrijk is
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>Werknemers die eerder willen stoppen en een overbrugging tot AOW nodig hebben.</li>
              <li>Mensen die een deel van hun leven buiten Nederland hebben gewoond of gewerkt.</li>
              <li>50-plussers die in gesprekken duidelijk willen zijn over beschikbaarheid tot AOW.</li>
              <li>Werknemers met aanvullend pensioen dat niet exact op de AOW-datum start.</li>
              <li>Iedereen die AOW, pensioenfonds en eigen spaargeld niet door elkaar wil halen.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-5">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Snelle tabel
            </p>
            <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">
              AOW-leeftijd per geboortedatum
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th className="px-3 py-2 font-black text-slate-900">Geboortedatum</th>
                  <th className="px-3 py-2 font-black text-slate-900">AOW-leeftijd</th>
                </tr>
              </thead>
              <tbody>
                {aowAgeRows.map((row) => (
                  <tr key={row.birthWindow} className="border-b border-slate-200">
                    <td className="px-3 py-2 font-medium text-slate-700">{row.birthWindow}</td>
                    <td className="px-3 py-2 font-medium text-slate-700">
                      {row.age}
                      {row.expected ? (
                        <span className="ml-2 text-xs font-black uppercase tracking-wide text-amber-700">
                          verwacht
                        </span>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Bron: SVB en Belastingdienst. Voor geboorte vanaf 1 oktober 1964 zijn dit verwachte
            leeftijden, geen definitieve vaststellingen.
          </p>
        </section>

        <RelatedToolsSection
          title="Meer tools rond werk, inkomen en later stoppen"
          description="Gebruik deze routes als je naast je AOW-datum ook je loon, ontslagsituatie of totale pakket wilt doorrekenen."
          tools={[
            {
              href: "/tools/netto-bruto-calculator",
              title: "Netto bruto calculator",
              description: "Reken door wat je huidige bruto loon netto betekent zolang je nog werkt.",
              badge: "Geld",
            },
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              description: "Controleer of ontslag rond AOW of pensioen nog recht geeft op vergoeding.",
              badge: "NL wetgeving",
            },
            {
              href: "/tools/salaris-vergelijker",
              title: "Salaris vergelijker",
              description: "Vergelijk nog één keer twee pakketten als je richting afbouw of een laatste overstap kijkt.",
              badge: "Geld",
            },
            {
              href: "/tools/loonstrook-uitleggen",
              title: "Loonstrook uitleggen",
              description: "Handig als je wilt begrijpen hoe loonheffing, pensioenpremie en nettoloon nu opgebouwd zijn.",
              badge: "NL wetgeving",
            },
          ]}
        />

        <section className="mt-12 border-2 border-slate-200 bg-slate-50 p-6">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Bronnen
          </p>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a
                href="https://www.svb.nl/nl/aow/aow-leeftijd/uw-aow-leeftijd"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                SVB - Uw AOW-leeftijd
              </a>
            </li>
            <li>
              <a
                href="https://www.svb.nl/nl/aow/bedragen-aow/aow-bedragen"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 hover:underline"
              >
                SVB - AOW-bedragen
              </a>
            </li>
          </ul>
        </section>
      </>
    </ToolPageShell>
  );
}
