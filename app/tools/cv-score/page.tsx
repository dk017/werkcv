import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { ToolToCvCTA } from "@/components/tools/ToolToCvCTA";
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
    <main>
      <FAQJsonLd questions={faqItems} />

      <div className="wk-container max-w-3xl py-12">
        <div className="mb-8">
          <span className="wk-badge wk-badge-accent mb-4">AI tool — Gratis</span>
          <h1 className="mb-3 text-3xl font-semibold leading-tight text-[var(--wk-ink)] sm:text-4xl">
            Gratis CV check: krijg je <span className="wk-hero-highlight">CV score</span> in 30 seconden.
          </h1>
          <p className="text-lg font-medium leading-8 text-[var(--wk-ink-muted)]">
            Upload je CV en laat het direct beoordelen op Nederlandse recruiter- en sollicitatienormen. Gratis, zonder account.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
            Zoek je op <strong className="text-[var(--wk-ink)]">cv check</strong>, <strong className="text-[var(--wk-ink)]">cv beoordeling</strong> of <strong className="text-[var(--wk-ink)]">cv score berekenen</strong>?
            Dan zit je hier goed: deze tool geeft je een snelle, praktische beoordeling van wat al sterk is en wat eerst beter moet.
          </p>
          <p className="mt-3 text-sm text-[var(--wk-ink-muted)]">
            Wil je precies weten hoe de score werkt?{" "}
            <Link
              href="/tools/cv-score/methodologie"
              className="font-semibold text-[var(--wk-primary)] underline underline-offset-4"
            >
              Bekijk de publieke methodologie
            </Link>
            .
          </p>
        </div>

        <CvScoreTool />

        <div className="mt-10 space-y-6">
          <section className="wk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              Wat krijg je met deze gratis CV check?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Dit is geen vage AI-samenvatting. Je krijgt een concrete CV beoordeling op zes vaste onderdelen, zodat je snel ziet waar je document recruiters vertrouwen geeft en waar het nog afhaakt.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <div key={item.title} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4">
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              CV check, CV beoordeling of CV score berekenen: wat is het verschil?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Voor de meeste zoekers is het verschil klein. Een <strong className="text-[var(--wk-ink)]">cv check</strong> is de brede term, <strong className="text-[var(--wk-ink)]">cv beoordeling</strong> klinkt iets menselijker, en <strong className="text-[var(--wk-ink)]">cv score berekenen</strong> legt de nadruk op de uitkomst. Deze pagina combineert die drie intenties: snel beoordelen, een score geven en meteen vertellen wat je moet aanpassen.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                ["CV check", "Snel zien of je CV in grote lijnen goed staat."],
                ["CV beoordeling", "Snappen waar recruiters twijfel krijgen."],
                ["CV score berekenen", "Eerst een cijfer, daarna de concrete uitleg."],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4">
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              Waar deze gratis CV check anders naar kijkt dan een gewone ATS-check
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Een ATS-check kijkt vooral of software je CV kan lezen. Deze kwaliteitsscore gaat een stap verder: is je profieltekst sterk, klinkt je werkervaring actief, staan je contactgegevens op de manier die Nederlandse recruiters verwachten, en ontbreekt er niets essentieels?
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                <div key={item.title} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4">
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              De 6 dimensies van een sterk Nederlands CV
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                ["Structuur & Opmaak", "Is je CV scanbaar, consistent en ATS-vriendelijk opgebouwd?"],
                ["Persoonlijke Gegevens", "Staan e-mail, telefoon, LinkedIn en woonplaats duidelijk vermeld?"],
                ["Profieltekst", "Open je sterk met een korte, concrete samenvatting?"],
                ["Werkervaring", "Laat je resultaten en actieve werkwoorden zien in plaats van taaklijstjes?"],
                ["Taalgebruik & Stijl", "Blijf je consistent in taal en voorkom je zwakke formuleringen?"],
                ["Volledigheid", "Ontbreken er standaardsecties die recruiters in Nederland verwachten?"],
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4">
                  <p className="text-sm font-semibold text-[var(--wk-ink)]">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{copy}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card p-6">
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              Wat doe je na je CV beoordeling?
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Gebruik je score als prioriteitenlijst. Verbeter eerst de onderdelen die het zwaarst wegen: profieltekst, werkervaring en overzicht. Daarna kun je de technische kant controleren met een ATS-scan of direct overstappen naar een duidelijker template.
            </p>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Link
                href="/templates"
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] p-4 transition-colors hover:bg-[var(--wk-highlight-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">Kies een sterker CV template</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  Gebruik je feedback meteen in een duidelijk, ATS-vriendelijk WerkCV template.
                </p>
              </Link>
              <Link
                href="/tools/ats-cv-checker"
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">Doe daarna ook een ATS-check</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  Handig als je wilt weten of software je CV technisch goed uitleest.
                </p>
              </Link>
            </div>
          </section>

          <section className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>FAQ</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              Veelgestelde vragen over gratis CV check en CV beoordeling
            </h2>
            <div className="mt-5 space-y-4">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] p-4">
                  <h3 className="text-sm font-semibold text-[var(--wk-ink)]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>Vervolgroute</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--wk-ink)]">
              Klaar met je cv-score?
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Link
                href="/cv-checken"
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">CV checken</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  Gebruik deze pagina als je dezelfde score wilt vertalen naar een bredere cv-check route met uitleg en vervolgstappen.
                </p>
              </Link>
              <Link
                href="/tools/linkedin-naar-cv"
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">LinkedIn-profiel omzetten naar cv</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  Handig als je al veel profielinformatie op LinkedIn hebt staan en die sneller wilt omzetten naar een Nederlandse cv-structuur.
                </p>
              </Link>
              <Link
                href="/cv-optimaliseren"
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-surface-subtle)] p-4 transition-colors hover:bg-[var(--wk-accent-soft)]"
              >
                <p className="text-sm font-semibold text-[var(--wk-ink)]">CV optimaliseren</p>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">
                  Handig als je daarna verder wilt met ATS, vacaturematch en ontbrekende keywords.
                </p>
              </Link>
            </div>
          </section>

          <ToolToCvCTA
            toolName="cv-score"
            title="Verbeter je cv-score direct"
            description="Gebruik de score als checklist en maak daarna een sterkere cv-versie in WerkCV."
            primaryLabel="Maak mijn verbeterde cv"
            primaryHref="/editor?template=professional&startSource=cv_score_page"
            secondaryHref="/templates?startSource=cv_score_template_compare"
            secondaryLabel="Vergelijk templates"
            intent="cv_content"
            resultState="cv_score_page_cta"
          />
        </div>
      </div>

      <Footer variant="brand" />
    </main>
  );
}
