import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import LinkedinToCvTool from "./LinkedinToCvTool";

const faqItems = [
  {
    question: "Kan WerkCV automatisch mijn LinkedIn-profiel ophalen?",
    answer:
      "Nee. Je plakt zelf de tekst uit je LinkedIn-profiel. WerkCV vraagt niet om je LinkedIn-login en gebruikt geen LinkedIn API.",
  },
  {
    question: "Is een LinkedIn-profiel hetzelfde als een cv?",
    answer:
      "Nee. LinkedIn is vaak breder en informeler. Een cv moet korter, gerichter en beter scanbaar zijn voor recruiters en ATS-systemen.",
  },
  {
    question: "Kan ik de tekst daarna aanpassen?",
    answer:
      "Ja. Gebruik de gegenereerde structuur als basis en pas je cv daarna verder aan in WerkCV.",
  },
  {
    question: "Is dit gratis?",
    answer:
      "Je kunt gratis starten en je tekst omzetten. Je betaalt alleen als je later je definitieve cv als PDF wilt downloaden.",
  },
  {
    question: "Werkt dit ook voor een Engels LinkedIn-profiel?",
    answer:
      "Ja, maar voor Nederlandse sollicitaties is het vaak beter om de uiteindelijke cv aan te passen aan de Nederlandse arbeidsmarkt.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "LinkedIn naar CV omzetten | Maak snel een professioneel cv",
  description:
    "Zet je LinkedIn-profiel om naar een professioneel Nederlands cv. Plak je LinkedIn-tekst, controleer de inhoud en maak direct een ATS-vriendelijke cv in WerkCV.",
  path: "/tools/linkedin-naar-cv",
  keywords: [
    "linkedin naar cv",
    "linkedin profiel omzetten naar cv",
    "cv maken van linkedin",
    "linkedin profiel cv",
    "linkedin naar nederlands cv",
  ],
  type: "article",
});

export default function LinkedinNaarCvPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <Link href="/tools" className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900">
            ← Alle tools
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <section className="mb-10">
          <span className="inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black uppercase tracking-widest text-teal-700">
            AI tool — Gratis
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            LinkedIn naar CV omzetten
          </h1>
          <p className="mt-4 max-w-3xl text-lg font-medium text-slate-600">
            Plak de tekst van je LinkedIn-profiel en zet je ervaring, profieltekst, vaardigheden en opleidingen om naar een duidelijke Nederlandse cv-structuur. Daarna kun je je cv direct verder bewerken in WerkCV.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="#linkedin-tool"
              className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              LinkedIn-profiel omzetten naar cv
            </Link>
            <Link
              href="/cv-maken"
              className="border-4 border-black bg-white px-5 py-3 text-sm font-black text-black"
            >
              Maak direct een nieuw cv
            </Link>
          </div>
          <p className="mt-3 text-sm font-medium text-slate-700">
            Gratis starten. Betaal alleen als je later je cv als PDF downloadt.
          </p>
        </section>

        <section id="linkedin-tool" className="mb-12">
          <LinkedinToCvTool />
        </section>

        <section className="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">Hoe werkt LinkedIn naar CV omzetten?</h2>
          <ol className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <li>1. Kopieer tekst uit je LinkedIn-profiel.</li>
            <li>2. Plak de tekst in de tool.</li>
            <li>3. Zet de inhoud om naar een duidelijke cv-structuur.</li>
          </ol>
        </section>

        <section className="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">Waarom je LinkedIn-profiel niet hetzelfde is als je cv</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
            <li>LinkedIn is vaak uitgebreider en informeler.</li>
            <li>Een cv moet sneller scanbaar zijn.</li>
            <li>Werkervaring moet concreet en relevant zijn.</li>
            <li>Een cv moet goed leesbaar zijn voor ATS-systemen.</li>
            <li>Niet alle LinkedIn-secties horen op je cv.</li>
          </ul>
        </section>

        <section className="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">Wat moet je aanpassen na het omzetten?</h2>
          <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
            <li>Maak je profieltekst korter en functiegericht.</li>
            <li>Zet werkervaring om naar concrete bullets.</li>
            <li>Verwijder irrelevante details.</li>
            <li>Voeg keywords uit de vacature toe.</li>
            <li>Controleer of je cv ATS-vriendelijk blijft.</li>
          </ul>
        </section>

        <section className="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">LinkedIn-profiel exporteren als tekst</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            Open je LinkedIn-profiel, kopieer de onderdelen die relevant zijn voor je cv en plak die in de tool. Denk aan je headline, info-sectie, werkervaring, opleiding en vaardigheden. WerkCV gebruikt geen LinkedIn scraping of automatische login.
          </p>
        </section>

        <section className="mb-10 rounded-3xl border-2 border-slate-200 bg-white p-6">
          <h2 className="text-2xl font-black text-slate-900">Van LinkedIn-profiel naar Nederlandse cv</h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            WerkCV helpt om LinkedIn-informatie om te zetten naar een Nederlandse cv-opbouw met contactgegevens, profiel, werkervaring, opleiding, vaardigheden, talen en certificaten. Gebruik daarna ook de{" "}
            <Link href="/tools/ats-cv-checker" className="font-black underline decoration-2 underline-offset-4">
              ATS CV checker
            </Link>
            , de{" "}
            <Link href="/tools/cv-score" className="font-black underline decoration-2 underline-offset-4">
              cv-score
            </Link>
            {" "}of de{" "}
            <Link href="/cv-checken" className="font-black underline decoration-2 underline-offset-4">
              cv-check route
            </Link>
            {" "}om je eindversie scherper te maken.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              { href: "/cv-maken", label: "Maak een nieuw cv" },
              { href: "/cv-maken-zonder-abonnement", label: "CV maken zonder abonnement" },
              { href: "/cv-optimaliseren", label: "CV optimaliseren" },
              { href: "/cv-checken", label: "CV checken" },
              { href: "/tools/profieltekst-generator", label: "Profieltekst generator" },
              { href: "/tools/werkervaring-bullets", label: "Werkervaring bullets" },
              { href: "/tools/vaardigheden-generator", label: "Vaardigheden generator" },
              { href: "/tools/ats-cv-checker", label: "ATS CV checker" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border-2 border-black bg-[#FFFEF9] px-4 py-3 text-sm font-black text-black transition-colors hover:bg-[#E9FFFC]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border-2 border-slate-200 bg-white p-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">FAQ</p>
          <h2 className="mt-2 text-2xl font-black text-slate-900">Veelgestelde vragen</h2>
          <div className="mt-5 space-y-4">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-2xl border border-slate-200 p-4">
                <h3 className="text-sm font-black text-slate-900">{item.question}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
