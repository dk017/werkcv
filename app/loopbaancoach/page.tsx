import type { Metadata } from "next";
import Link from "next/link";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";

const audienceOptions = [
  { value: "loopbaancoach", label: "Loopbaancoach" },
  { value: "jobcoach", label: "Jobcoach" },
  { value: "reintegratie", label: "Re-integratiebegeleider" },
  { value: "outplacement", label: "Outplacementbegeleider" },
  { value: "student", label: "Studenten- of startercoach" },
  { value: "other", label: "Andere begeleidingspraktijk" },
];

const useCases = [
  {
    title: "CV's maken voor cliënten",
    body:
      "Gebruik WerkCV als praktische vervolgstap na een coachgesprek. Cliënten kunnen zelf starten met een Nederlandse cv-structuur en jij kunt gericht feedback geven op inhoud.",
  },
  {
    title: "Loopbaancoach cv software zonder zware implementatie",
    body:
      "Je hoeft geen eigen cv-editor te bouwen of technische integratie te doen. Verwijs cliënten naar een heldere route met templates, voorbeelden en tools.",
  },
  {
    title: "Geschikt voor trajecten met meerdere doelgroepen",
    body:
      "WerkCV past bij starters, carrièreswitchers, herintreders, internationals en kandidaten die na ontslag of re-integratie opnieuw moeten solliciteren.",
  },
];

const resources = [
  { href: "/cv-maken", label: "CV maken" },
  { href: "/cv-checken", label: "CV checken" },
  { href: "/cv-optimaliseren", label: "CV optimaliseren" },
  { href: "/tools/linkedin-naar-cv", label: "LinkedIn naar cv" },
  { href: "/cv-voorbeelden", label: "CV voorbeelden" },
  { href: "/for-coaches", label: "Algemene coachpagina" },
];

const faqItems = [
  {
    question: "Is WerkCV bedoeld als volledige coachsoftware?",
    answer:
      "Nee. WerkCV is vooral een praktische cv-route voor cliënten: templates, editor, voorbeelden en tools. Het vervangt geen persoonlijke begeleiding of trajectadministratie.",
  },
  {
    question: "Kunnen cliënten gratis starten?",
    answer:
      "Ja. Cliënten kunnen gratis bouwen, aanpassen en controleren. Ze betalen pas wanneer ze hun definitieve cv als PDF willen downloaden.",
  },
  {
    question: "Kan ik WerkCV gebruiken in loopbaantrajecten?",
    answer:
      "Ja. WerkCV is geschikt als resource-link, workshoproute of vaste vervolgstap na sessies over profiel, werkervaring en sollicitatiestrategie.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV tool voor loopbaancoaches | Cliënten sneller naar een cv | WerkCV",
  description:
    "Gebruik WerkCV als praktische cv tool voor loopbaancoaches. Help cliënten sneller naar een Nederlandse, ATS-vriendelijke cv zonder abonnement.",
  path: "/loopbaancoach",
  keywords: [
    "cv tool voor loopbaancoaches",
    "loopbaancoach cv software",
    "cv voor cliënten maken",
    "cv hulp loopbaancoach",
    "loopbaanbegeleiding cv tool",
  ],
  type: "article",
});

export default function LoopbaancoachPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <a
            href="#coach-aanvraag"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Vraag voorstel aan
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-slate-700">
              Voor loopbaancoaches
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV tool voor loopbaancoaches
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Help cliënten sneller van loopbaanadvies naar een concreet, professioneel cv. WerkCV combineert Nederlandse templates, cv-voorbeelden, automatische checks en een editor zonder abonnement voor individuele werkzoekenden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#coach-aanvraag"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Bespreek coach-route
              </a>
              <Link
                href="/for-coaches"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk algemene coachpagina
              </Link>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">
              Waarvoor gebruiken coaches WerkCV?
            </h2>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-slate-700">
              <li>&bull; Cliënten na een sessie direct laten starten</li>
              <li>&bull; Cv&apos;s structureren zonder Word-opmaakproblemen</li>
              <li>&bull; Profieltekst en werkervaring samen aanscherpen</li>
              <li>&bull; Kandidaten voorbereiden op Nederlandse vacatures</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12 grid gap-6 md:grid-cols-3">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">
            Hoe een loopbaancoach WerkCV praktisch inzet
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {[
              "Cliënt maakt eerste cv-versie",
              "Coach geeft feedback op profiel en ervaring",
              "Cliënt optimaliseert per vacature",
              "Definitieve PDF downloaden wanneer klaar",
            ].map((step, index) => (
              <div key={step} className="border-3 border-black bg-[#FFF9D9] p-4" style={{ borderWidth: "3px" }}>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">Stap {index + 1}</p>
                <p className="mt-2 text-sm font-black leading-relaxed text-black">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">Nuttige links voor cliënten</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="border-2 border-white bg-white px-4 py-3 text-sm font-black text-black"
              >
                {resource.label}
              </Link>
            ))}
          </div>
        </section>

        <section id="coach-aanvraag" className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-4 border-black bg-yellow-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">
              Wil je WerkCV gebruiken met cliënten?
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-black">
              Beschrijf kort je doelgroep en huidige werkwijze. Dan kijken we welke route logisch is: resource-link, workshop, partnerpagina of een vaste toolkit voor jouw trajecten.
            </p>
          </div>

          <B2BLeadForm
            pageType="coach"
            pagePath="/loopbaancoach"
            title="Vraag een loopbaancoach-route aan"
            description="Vertel kort welke cliënten je begeleidt en waar je cv-proces nu vastloopt."
            submitLabel="Stuur aanvraag"
            audienceLabel="Type begeleiding"
            audienceOptions={audienceOptions}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
