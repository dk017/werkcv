import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  CvCheckStartBlock,
  FaqCardSection,
  FinalCtaSection,
  LinkCardSection,
  WhyWerkCvSection,
  type OptimizerFaqItem,
  type OptimizerLinkCard,
} from "@/components/landing/CvOptimizerSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/cv-optimaliseren";

const controlPoints = [
  {
    title: "ATS-vriendelijke opmaak",
    body: "Controle op duidelijke koppen, logische secties, consistente datums en opmaak die recruitersoftware goed kan uitlezen.",
  },
  {
    title: "Duidelijke profieltekst",
    body: "Check of je profieltekst snel duidelijk maakt wie je bent, waar je goed in bent en wat je zoekt.",
  },
  {
    title: "Relevante keywords uit de vacature",
    body: "Vergelijk je cv met de termen en vaardigheden die in de vacature of functietitel terugkomen.",
  },
  {
    title: "Concrete werkervaring-bullets",
    body: "Signaleer waar je bullets te vaag blijven en waar je meer resultaat, context of actie kunt tonen.",
  },
  {
    title: "Vaardigheden die passen bij de functie",
    body: "Controleer of je skills aansluiten op de rol en niet alleen een los lijstje zonder bewijs vormen.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/cv-verbeteren",
    title: "CV verbeteren",
    body: "Gebruik deze route als je vooral inhoud, formulering en impact van je cv sterker wilt maken.",
  },
  {
    href: "/cv-checken",
    title: "CV checken",
    body: "Handig als je eerst snel wilt zien waar je cv inhoudelijk en technisch zwakker is.",
  },
  {
    href: "/cv-nakijken",
    title: "CV laten nakijken",
    body: "Sterk als je zoekt naar een automatische review van veelvoorkomende fouten en ATS-risico's.",
  },
  {
    href: "/en/resume-optimizer-netherlands",
    title: "English resume optimizer",
    body: "Voor expats of internationale kandidaten die een English-language route voor Dutch job applications zoeken.",
  },
];

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Wat betekent cv optimaliseren precies?",
    answer:
      "Je cv optimaliseren betekent dat je het document beter leesbaar, duidelijker en beter afgestemd maakt op vacatures en ATS-systemen. Het gaat dus niet alleen om opmaak, maar ook om profieltekst, keywords en werkervaring.",
  },
  {
    question: "Moet ik mijn cv optimaliseren voor elke vacature?",
    answer:
      "Meestal wel. Je hoeft niet elke regel te herschrijven, maar functietitel, profieltekst, keywords en prioriteiten in je werkervaring wil je idealiter afstemmen op de vacature waarop je nu solliciteert.",
  },
  {
    question: "Wat is het verschil tussen cv optimaliseren en cv checken?",
    answer:
      "Een cv check laat zien waar je document nu zwak is. Cv optimaliseren is de vervolgstap: je gebruikt die feedback om structuur, inhoud en vacaturematch daadwerkelijk sterker te maken.",
  },
  {
    question: "Kan ik na de check direct een nieuwe cv-versie maken?",
    answer:
      "Ja. Je kunt na de check direct door naar WerkCV om profieltekst, bullets en lay-out bij te werken en daarna een nette PDF te downloaden.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV optimaliseren voor ATS en vacatures | WerkCV",
  description:
    "Optimaliseer je cv voor Nederlandse vacatures. Check ATS-risico's, ontbrekende keywords en verbeterpunten. Start gratis en maak direct een sterker cv.",
  path: "/cv-optimaliseren",
  keywords: [
    "cv optimaliseren",
    "cv optimalisatie",
    "cv optimaliseren voor ats",
    "cv optimaliseren vacature",
    "ats cv optimaliseren",
    "cv verbeteren voor vacature",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    en: "https://werkcv.nl/en/resume-optimizer-netherlands",
    "en-NL": "https://werkcv.nl/en/resume-optimizer-netherlands",
    "x-default": pageUrl,
  },
});

export default function CvOptimaliserenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk tools
            </Link>
            <Link
              href="/cv-maken"
              className="border-2 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black"
            >
              Maak direct een nieuw cv
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV optimaliseren", href: "/cv-optimaliseren" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["ATS", "Keywords", "Vacaturematch", "Profieltekst", "Werkervaring"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV optimaliseren voor meer reacties op je sollicitaties
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Plak je cv en eventueel de vacaturetekst. WerkCV helpt je controleren op ATS-risico&apos;s, ontbrekende keywords, onduidelijke profieltekst en verbeterpunten in je werkervaring.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/cv-vacature-match"
                trackingLocation="cv-optimaliseren:hero_primary"
                trackingLabel="Check en optimaliseer mijn cv"
                ctaEventName="cta_cv_optimaliseren_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Check en optimaliseer mijn cv
              </TrackedLandingLink>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak direct een nieuw cv
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Start met de check en werk daarna direct verder aan een sterkere versie.
            </p>
            <CvCheckStartBlock
              buttonHref="/tools/cv-score"
              trackingLocation="cv-optimaliseren:above_fold_check_block"
            />
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme volgorde
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Van analyse naar betere cv-versie
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Start met een brede check via de vacaturematch of cv-score tool.</p>
              <p>2. Kijk daarna specifieker naar ATS-risico&apos;s en ontbrekende keywords.</p>
              <p>3. Herschrijf profieltekst en bullets, en zet de verbeterde versie om in een nette PDF.</p>
            </div>
            <div className="mt-5 border-t-4 border-black pt-4 text-sm font-medium leading-relaxed text-slate-700">
              Handige tools:{" "}
              <Link href="/tools/ats-cv-checker" className="font-black underline">
                ATS CV checker
              </Link>
              ,{" "}
              <Link href="/tools/cv-score" className="font-black underline">
                cv-score
              </Link>
              ,{" "}
              <Link href="/tools/cv-keywords" className="font-black underline">
                cv-keywords
              </Link>
              .
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Waarom je cv optimaliseren?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waarom je cv optimaliseren?
          </h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              Een cv dat net niet scherp genoeg is, verliest vaak al terrein voordat een recruiter inhoudelijk naar je ervaring kijkt. Dat kan door te brede profieltekst, gemiste keywords of bullets die niet laten zien wat je echt hebt bereikt.
            </p>
            <p>
              Door je cv te optimaliseren maak je het document niet alleen mooier, maar vooral duidelijker voor recruitersoftware en voor de persoon die binnen enkele seconden beslist of je doorgaat naar de volgende ronde.
            </p>
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Wat controleert WerkCV?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat controleert WerkCV?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {controlPoints.map((item) => (
              <article
                key={item.title}
                className="border-3 border-black bg-[#E9FFFC] p-4"
                style={{ borderWidth: "3px" }}
              >
                <h3 className="text-sm font-black text-black">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              CV optimaliseren voor ATS
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              CV optimaliseren voor ATS
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              ATS-optimalisatie draait vooral om duidelijke structuur, herkenbare koppen, consistente datums en woorden die softwaresystemen ook echt kunnen herkennen. Een rustig template helpt, maar ook je tekst moet logisch en scanbaar blijven.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik hiervoor eerst de{" "}
              <Link href="/tools/ats-cv-checker" className="font-black underline">
                ATS CV checker
              </Link>
              {" "}en controleer daarna met de{" "}
              <Link href="/tools/cv-score" className="font-black underline">
                cv-score
              </Link>
              {" "}of je document inhoudelijk ook sterk genoeg is.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              CV aanpassen aan een vacature
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              CV aanpassen aan een vacature
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              De meeste winst zit in afstemming op de rol waarop je nu solliciteert. Kijk welke functietermen, vaardigheden en resultaten in de vacature belangrijk zijn en zorg dat die op natuurlijke plekken terugkomen in profieltekst, werkervaring en skills.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik de{" "}
              <Link href="/tools/cv-keywords" className="font-black underline">
                cv-keywords tool
              </Link>
              {" "}voor trefwoorden en de{" "}
              <Link href="/tools/cv-vacature-match" className="font-black underline">
                cv-vacature-match
              </Link>
              {" "}als je je hele cv naast de vacaturetekst wilt leggen.
            </p>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Van check naar betere cv-versie
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Van check naar betere cv-versie
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href="/tools/profieltekst-generator"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Profieltekst aanscherpen</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Gebruik de profieltekst-generator als je opening te algemeen of te breed blijft.
              </p>
            </Link>
            <Link
              href="/tools/werkervaring-bullets"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Werkervaring concreter maken</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Herschrijf zwakke taaklijstjes naar heldere bullets met actie en resultaat.
              </p>
            </Link>
            <Link
              href="/cv-maken"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Direct een nieuwe cv-versie bouwen</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Zet je verbeterpunten om in een nieuwe WerkCV-versie met een duidelijke Nederlandse opmaak.
              </p>
            </Link>
            <Link
              href="/cv-maken-zonder-abonnement"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Zonder abonnement verder</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Handig als je je cv eerst gratis wilt verbeteren en pas later wilt downloaden.
              </p>
            </Link>
          </div>
        </section>

        <LinkCardSection
          eyebrow="Meer routes"
          title="Andere pagina's in deze cv-check cluster"
          links={routeLinks}
        />

        <FaqCardSection title="Veelgestelde vragen over cv optimaliseren" items={faqItems} />

        <WhyWerkCvSection locale="nl" />

        <FinalCtaSection
          title="Optimaliseer je cv en maak direct een nette PDF"
          description="Gebruik de check om je profiel, keywords en werkervaring scherper te maken en zet die verbeteringen daarna direct om in een nieuwe cv-versie."
          supportLine="Gratis starten. Pas betalen bij PDF-download. Geen abonnement."
          buttonLabel="Maak direct een beter cv"
          buttonHref="/editor"
          trackingLocation="cv-optimaliseren:final_primary"
          trackingLabel="Maak direct een beter cv"
        />
      </main>

      <Footer />
    </div>
  );
}
