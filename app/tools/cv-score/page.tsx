import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import CvScoreTool from "./CvScoreTool";

const faqItems = [
  {
    question: "Hoe werkt een gratis CV check?",
    answer:
      "Je uploadt je CV of plakt de tekst. Daarna krijg je direct een CV score op zes onderdelen, plus concrete verbeterpunten voor profieltekst, werkervaring, structuur en volledigheid.",
  },
  {
    question: "Is dit hetzelfde als een CV beoordeling?",
    answer:
      "Ja. Veel mensen zoeken op gratis CV check, CV beoordeling of CV score berekenen. In de praktijk bedoelen ze hetzelfde: snel zien hoe sterk hun CV is en wat er beter kan.",
  },
  {
    question: "Kan ik mijn CV score berekenen zonder account?",
    answer:
      "Ja. Deze tool werkt zonder registratie. Je kunt dus eerst je CV laten beoordelen en daarna beslissen of je de feedback omzet in een nieuw CV of template.",
  },
  {
    question: "Wat moet ik doen als mijn score laag is?",
    answer:
      "Begin met de onderdelen die de tool als kritisch markeert. Vaak levert een sterkere profieltekst, duidelijkere werkervaring en een simpeler template de snelste winst op. Daarna kun je eventueel ook de ATS checker gebruiken.",
  },
];

export const metadata: Metadata = {
  title: "Gratis CV Check: CV Score Berekenen in 30 Seconden | WerkCV",
  description:
    "Doe een gratis CV check en ontvang direct je CV score op 6 Nederlandse criteria. Upload je CV, laat je CV beoordelen en zie wat je eerst moet verbeteren.",
  keywords: [
    "gratis cv check",
    "cv check",
    "cv beoordeling",
    "cv score berekenen",
    "cv beoordelen gratis",
    "cv checken op fouten",
  ],
  alternates: {
    canonical: "/tools/cv-score",
  },
  openGraph: {
    title: "Gratis CV Check | CV Score Berekenen met WerkCV",
    description:
      "Laat je CV gratis beoordelen op 6 Nederlandse criteria en zie direct waar recruiters afhaken.",
    url: "https://werkcv.nl/tools/cv-score",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gratis CV Check | WerkCV",
    description:
      "Doe een gratis CV check en bereken direct je CV score op basis van Nederlandse sollicitatiepraktijk.",
  },
};

export default function CvScorePage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
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

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full mb-4">
            AI tool — Gratis
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
            Gratis CV check: krijg je CV score in 30 seconden.
          </h1>
          <p className="mt-4 text-lg text-slate-600 font-medium max-w-3xl">
            Upload je CV en laat het direct beoordelen op Nederlandse recruiter- en sollicitatienormen. Gratis, zonder account.
          </p>
          <p className="mt-3 text-sm text-slate-600 max-w-3xl leading-relaxed">
            Zoek je op <strong>cv check</strong>, <strong>cv beoordeling</strong> of <strong>cv score berekenen</strong>?
            Dan zit je hier goed: deze tool geeft je een snelle, praktische beoordeling van wat al sterk is en wat eerst beter moet.
          </p>
          <p className="mt-3 text-sm text-slate-500">
            Wil je precies weten hoe de score werkt?{" "}
            <Link
              href="/tools/cv-score/methodologie"
              className="font-black underline decoration-2 underline-offset-4"
            >
              Bekijk de publieke methodologie
            </Link>
            .
          </p>
        </div>

        <CvScoreTool />

        <div className="mt-10 space-y-8">
          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-900">
              Wat krijg je met deze gratis CV check?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Dit is geen vage AI-samenvatting. Je krijgt een concrete CV beoordeling op zes vaste onderdelen, zodat je snel ziet waar je document recruiters vertrouwen geeft en waar het nog afhaakt.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Directe CV score",
                  copy: "Je ziet meteen hoe sterk je CV is op een schaal van 0 tot 100, zonder eerst een account aan te maken.",
                },
                {
                  title: "Concrete verbeterpunten",
                  copy: "Niet alleen een cijfer, maar ook feedback op profieltekst, werkervaring, taalgebruik en volledigheid.",
                },
                {
                  title: "Nederlandse norm",
                  copy: "De beoordeling is afgestemd op wat recruiters in Nederland verwachten van contactgegevens, secties en schrijfstijl.",
                },
                {
                  title: "Snelle volgende stap",
                  copy: "Met de uitkomst kun je gericht door naar een simpeler template, een ATS-check of een herschreven profieltekst.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-900">
              CV check, CV beoordeling of CV score berekenen: wat is het verschil?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Voor de meeste zoekers is het verschil klein. Een <strong>cv check</strong> is de brede term, <strong>cv beoordeling</strong> klinkt iets menselijker, en <strong>cv score berekenen</strong> legt de nadruk op de uitkomst. Deze pagina combineert die drie intenties: snel beoordelen, een score geven en meteen vertellen wat je moet aanpassen.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ["CV check", "Snel zien of je CV in grote lijnen goed staat."],
                ["CV beoordeling", "Snappen waar recruiters twijfel krijgen."],
                ["CV score berekenen", "Eerst een cijfer, daarna de concrete uitleg."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-black text-slate-900">{title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-900">
              Waar deze gratis CV check anders naar kijkt dan een gewone ATS-check
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Een ATS-check kijkt vooral of software je CV kan lezen. Deze kwaliteitsscore gaat een stap verder: is je profieltekst sterk, klinkt je werkervaring actief, staan je contactgegevens op de manier die Nederlandse recruiters verwachten, en ontbreekt er niets essentieels?
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Voor recruiters",
                  copy: "Je score laat zien hoe overtuigend je CV inhoudelijk overkomt, niet alleen of het technisch uitleesbaar is.",
                },
                {
                  title: "Voor de Nederlandse markt",
                  copy: "De feedback is afgestemd op Nederlandse CV-conventies zoals profieltekst, woonplaats, LinkedIn en duidelijke werkervaring.",
                },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-900">{item.title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-900">
              De 6 dimensies van een sterk Nederlands CV
            </h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                ["Structuur & Opmaak", "Is je CV scanbaar, consistent en ATS-vriendelijk opgebouwd?"],
                ["Persoonlijke Gegevens", "Staan e-mail, telefoon, LinkedIn en woonplaats duidelijk vermeld?"],
                ["Profieltekst", "Open je sterk met een korte, concrete samenvatting?"],
                ["Werkervaring", "Laat je resultaten en actieve werkwoorden zien in plaats van taaklijstjes?"],
                ["Taalgebruik & Stijl", "Blijf je consistent in taal en voorkom je zwakke formuleringen?"],
                ["Volledigheid", "Ontbreken er standaardsecties die recruiters in Nederland verwachten?"],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-sm font-black text-slate-900">{title}</p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <h2 className="text-xl font-black text-slate-900">
              Wat doe je na je CV beoordeling?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Gebruik je score als prioriteitenlijst. Verbeter eerst de onderdelen die het zwaarst wegen: profieltekst, werkervaring en overzicht. Daarna kun je de technische kant controleren met een ATS-scan of direct overstappen naar een duidelijker template.
            </p>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/templates"
                className="rounded-2xl border-2 border-black bg-[#4ECDC4] p-4 text-slate-900 transition-transform hover:-translate-y-0.5"
              >
                <p className="text-sm font-black">Kies een sterker CV template</p>
                <p className="mt-2 text-sm leading-relaxed">
                  Gebruik je feedback meteen in een duidelijk, ATS-vriendelijk WerkCV template.
                </p>
              </Link>
              <Link
                href="/tools/ats-cv-checker"
                className="rounded-2xl border border-slate-300 bg-slate-50 p-4 text-slate-900 transition-colors hover:bg-slate-100"
              >
                <p className="text-sm font-black">Doe daarna ook een ATS-check</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Handig als je wilt weten of software je CV technisch goed uitleest.
                </p>
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              FAQ
            </p>
            <h2 className="mt-2 text-xl font-black text-slate-900">
              Veelgestelde vragen over gratis CV check en CV beoordeling
            </h2>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-2xl border border-slate-200 p-4">
                  <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center">
            <p className="text-sm text-slate-500 mb-3">
              Klaar om je score direct om te zetten in een beter CV?
            </p>
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#4ECDC4] text-slate-900 font-black text-sm border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              Vergelijk WerkCV templates →
            </Link>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
