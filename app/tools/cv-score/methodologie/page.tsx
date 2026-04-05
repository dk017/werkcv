import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "WerkCV CV Quality Standard v1 | Methodologie CV Score",
  description:
    "Lees hoe WerkCV de CV score berekent: 6 dimensies, vaste weging, Nederlandse sollicitatiepraktijk en beperkt AI-gebruik voor nuance.",
  alternates: {
    canonical: "/tools/cv-score/methodologie",
  },
  openGraph: {
    title: "WerkCV CV Quality Standard v1",
    description:
      "Onze publieke methodologie voor de Nederlandse CV kwaliteitsscore: wat we meten, hoe we wegen en waar AI wel en niet wordt gebruikt.",
    url: "https://werkcv.nl/tools/cv-score/methodologie",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "WerkCV CV Quality Standard v1",
    description:
      "Publieke methodologie voor de Nederlandse CV kwaliteitsscore van WerkCV.",
  },
};

const dimensions = [
  ["Structuur & Opmaak", "20 punten", "Lengte, standaard sectiekoppen, tabel/kolom-signalen en consistente datums."],
  ["Persoonlijke Gegevens", "10 punten", "E-mail, telefoon, LinkedIn en locatie of woonplaats."],
  ["Profieltekst", "20 punten", "Aanwezigheid, lengte, ervaringsniveau en overmatig buzzword-gebruik."],
  ["Werkervaring", "25 punten", "Aanwezigheid, meetbare resultaten, actieve werkwoorden en datum-signalen."],
  ["Taalgebruik & Stijl", "15 punten", "Taalconsistentie, eerste persoon, leesbare koppen en placeholder-data."],
  ["Volledigheid", "10 punten", "Opleiding, vaardigheden, talen en optioneel interesses."],
];

export default function CvScoreMethodologyPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <header className="border-b-4 border-black bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-2xl tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/tools/cv-score" className="text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
            ← Terug naar CV score
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <section className="space-y-4">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
            Publieke methodologie
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            WerkCV CV Quality Standard v1
          </h1>
          <p className="text-lg text-slate-600 font-medium max-w-3xl">
            Dit is de publieke methodologie achter onze Nederlandse CV kwaliteitsscore. De score is niet random, maar ook geen officiële overheids- of ATS-certificering.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Wat deze score wel en niet is</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-sm font-black text-emerald-900">Wel</p>
              <p className="mt-2 text-sm text-emerald-900/80 leading-relaxed">
                Een vaste productrubric voor Nederlandse sollicitatiepraktijk in 2025–2026, gebaseerd op recruiter-leesbaarheid, ATS-basishygiëne en CV-conventies voor de Nederlandse markt.
              </p>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
              <p className="text-sm font-black text-red-900">Niet</p>
              <p className="mt-2 text-sm text-red-900/80 leading-relaxed">
                Geen officiële ATS-score, geen ISO- of Europass-standaard, en geen garantie op interviewkans. De score is een beslissingshulp, geen externe certificering.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-5">
          <h2 className="text-2xl font-black text-slate-900">De 6 dimensies en weging</h2>
          <div className="space-y-3">
            {dimensions.map(([name, weight, copy]) => (
              <div key={name} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-base font-black text-slate-900">{name}</p>
                  <span className="text-xs font-black uppercase tracking-wide text-slate-500">{weight}</span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copy}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            De totaalscore is de som van deze zes dimensies en wordt afgerond naar een heel getal van 0 tot 100.
          </p>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Wat is rule-based en wat is AI-assisted?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-900">Deterministisch</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Lengte, sectiekoppen, datumformaten, contactgegevens, locatie-signalen, opleiding, vaardigheden, talen, eerste persoon en meetbare resultaten worden lokaal met vaste regels gecontroleerd.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-black text-slate-900">Beperkt AI-gebruik</p>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                OpenAI wordt alleen gebruikt voor nuance: buzzword-context, sterkte van bullet-openers en taalconsistentie. Het model ziet alleen relevante snippets, niet meer dan nodig.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Belangrijke beperkingen</h2>
          <ul className="space-y-3 text-sm text-slate-600 leading-relaxed">
            <li>De score is het sterkst voor tekstgebaseerde PDF&apos;s of duidelijke geplakte tekst. Gescande CV&apos;s blijven een zwakke input.</li>
            <li>Engelse CV&apos;s worden ondersteund, maar de norm blijft Nederlandse sollicitatiepraktijk tenzij de vacature expliciet Engelstalig is.</li>
            <li>Bepaalde onderdelen zijn marktconventies, geen absolute regels. Een interessesectie is bijvoorbeeld een lichte aanbeveling, geen harde afkeur.</li>
            <li>De tool beoordeelt een CV in isolatie. Match met een specifieke vacature hoort thuis in de CV-vacature matcher, niet in deze score.</li>
          </ul>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-2xl font-black text-slate-900">Waarom we dit publiek maken</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Grote CV-tools gebruiken vrijwel altijd een eigen rubric. Wij doen dat ook, maar maken de logica expliciet zodat gebruikers begrijpen waar de score op is gebaseerd en welke afwegingen erachter zitten.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Het doel is niet om een mysterieuze score uit te delen, maar om de feedback uitlegbaar en bruikbaar te maken.
          </p>
        </section>

        <section className="text-center">
          <Link
            href="/tools/cv-score"
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
          >
            Test je CV met deze methodologie →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
