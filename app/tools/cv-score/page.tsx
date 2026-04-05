import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import CvScoreTool from "./CvScoreTool";

export const metadata: Metadata = {
  title: "CV Score Checker: Hoe Sterk is Jouw CV? | WerkCV",
  description:
    "Upload je CV en ontvang direct een score op 6 Nederlandse criteria: structuur, profieltekst, werkervaring, taalgebruik en meer. Gratis, geen registratie.",
  keywords: [
    "cv score checker",
    "cv kwaliteit check",
    "cv analyseren gratis",
    "cv score nederland",
    "cv feedback tool",
    "cv beoordelen",
  ],
  alternates: {
    canonical: "/tools/cv-score",
  },
  openGraph: {
    title: "Nederlandse CV Score Checker | WerkCV",
    description:
      "Hoe sterk is jouw CV? Ontvang een score op 6 criteria, gebaseerd op Nederlandse sollicitatiepraktijk.",
    url: "https://werkcv.nl/tools/cv-score",
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nederlandse CV Score Checker | WerkCV",
    description:
      "Hoe sterk is jouw CV? Ontvang een score op 6 criteria, gebaseerd op Nederlandse sollicitatiepraktijk.",
  },
};

export default function CvScorePage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
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
            Hoe sterk is jouw CV? Krijg een score in 30 seconden.
          </h1>
          <p className="mt-4 text-lg text-slate-600 font-medium max-w-3xl">
            Gebaseerd op Nederlandse sollicitatiepraktijk. Gratis, geen registratie.
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
              Waar deze score anders naar kijkt dan een gewone ATS-check
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
