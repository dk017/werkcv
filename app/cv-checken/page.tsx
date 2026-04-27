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

const pageUrl = "https://werkcv.nl/cv-checken";

const checkCards = [
  {
    title: "Structuur",
    body: "Zijn je secties logisch opgebouwd en staan de belangrijkste onderdelen op de juiste plek?",
  },
  {
    title: "ATS-risico's",
    body: "Ziet je cv er niet alleen goed uit voor mensen, maar blijft het ook goed uitleesbaar voor software?",
  },
  {
    title: "Keywords",
    body: "Gebruik je functietermen en vaardigheden die passen bij de rol of vacature waarop je solliciteert?",
  },
  {
    title: "Volledigheid",
    body: "Ontbreken er onderdelen zoals profieltekst, duidelijke werkervaring of relevante skills?",
  },
  {
    title: "Leesbaarheid",
    body: "Kun je in enkele seconden begrijpen wat je profiel is en welke impact je hebt gemaakt?",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/cv-optimaliseren",
    title: "CV optimaliseren",
    body: "Logische vervolgstap als je na de check direct met ATS, keywords en vacaturematch verder wilt.",
  },
  {
    href: "/cv-verbeteren",
    title: "CV verbeteren",
    body: "Handig als je na de check vooral profieltekst, werkervaring en formulering wilt aanscherpen.",
  },
  {
    href: "/cv-nakijken",
    title: "CV laten nakijken",
    body: "Voor dezelfde intentie, maar met meer nadruk op automatische review en veelvoorkomende fouten.",
  },
  {
    href: "/ats-cv-template",
    title: "ATS cv-template",
    body: "Gebruik een ATS-vriendelijk template als je technische leesbaarheid je grootste zorg is.",
  },
];

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Wat betekent cv checken precies?",
    answer:
      "Cv checken betekent dat je je document controleert op structuur, inhoud, ATS-risico's, keywords en ontbrekende onderdelen. Het doel is snel zien wat recruiters of software nu kan afremmen.",
  },
  {
    question: "Is cv checken hetzelfde als cv laten nakijken?",
    answer:
      "Bijna. Beide termen gaan over feedback op je huidige cv. 'Cv laten nakijken' klinkt iets menselijker, terwijl 'cv checken' vaker gebruikt wordt voor snelle digitale of automatische controle.",
  },
  {
    question: "Moet ik na de check meteen een nieuw cv maken?",
    answer:
      "Niet per se, maar het is vaak wel slim. Zodra je weet waar de zwakke punten zitten, kun je die veel sneller oplossen in een duidelijke WerkCV-versie.",
  },
  {
    question: "Kan ik mijn cv checken zonder abonnement?",
    answer:
      "Ja. Je kunt je cv gratis checken en verbeteren. Je betaalt alleen wanneer je besluit een definitieve PDF te downloaden.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV checken? Controleer je cv gratis | WerkCV",
  description:
    "Check je cv op structuur, ATS-risico's, keywords en ontbrekende onderdelen. Krijg direct verbeterpunten en maak een betere cv-versie.",
  path: "/cv-checken",
  keywords: [
    "cv checken",
    "cv check",
    "cv controleren",
    "cv gratis checken",
    "cv checken op ats",
    "cv checken op fouten",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function CvCheckenPage() {
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
              Maak een nieuw cv
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV checken", href: "/cv-checken" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Structuur", "ATS", "Keywords", "Leesbaarheid", "Vacaturefit"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV checken: controleer je cv op opmaak, inhoud en ATS-risico&apos;s
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Upload of plak je cv en zie snel waar je cv sterker kan. WerkCV controleert onder andere op leesbaarheid, structuur, ATS-vriendelijke opmaak en aansluiting op de vacature.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/cv-score"
                trackingLocation="cv-checken:hero_primary"
                trackingLabel="Check mijn cv gratis"
                ctaEventName="cta_cv_checken_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Check mijn cv gratis
              </TrackedLandingLink>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak een nieuw cv
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Geen account nodig om te starten. Betaal alleen als je later een PDF downloadt.
            </p>
            <CvCheckStartBlock
              buttonHref="/tools/cv-score"
              trackingLocation="cv-checken:above_fold_check_block"
            />
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Eerst dit checken
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Waar haakt een cv het vaakst af?
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Onduidelijke profieltekst zonder heldere functie of richting.</p>
              <p>Werkervaring die vooral taken noemt en te weinig resultaat laat zien.</p>
              <p>Keywords en skills die te weinig aansluiten op de vacature.</p>
              <p>Opmaak of structuur die ATS-systemen onnodig lastig maakt.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Wat betekent cv checken?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat betekent cv checken?
          </h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              Een goede cv-check laat niet alleen zien of je document er netjes uitziet, maar vooral of het logisch leest voor recruiters en ATS-systemen. Je kijkt dus naar inhoud, structuur en aansluiting op de rol.
            </p>
            <p>
              Daardoor wordt snel duidelijk of je cv al sterk genoeg is of dat je eerst profieltekst, werkervaring, opmaak of trefwoorden moet aanscherpen.
            </p>
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Wat controleert de cv-check?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat controleert de cv-check?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {checkCards.map((item) => (
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
              CV checken voor ATS
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              CV checken voor ATS
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Een ATS-check laat zien of je lay-out, koppen en datumregels goed uitleesbaar blijven voor recruitersoftware. Dat is vooral belangrijk als je een creatief format, kolommen of veel visuele elementen gebruikt.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik de{" "}
              <Link href="/tools/ats-cv-checker" className="font-black underline">
                ATS CV checker
              </Link>
              {" "}en kijk daarna eventueel naar het{" "}
              <Link href="/ats-cv-template" className="font-black underline">
                ATS cv-template
              </Link>
              {" "}als je direct een rustiger alternatief wilt.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              CV checken op keywords
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              CV checken op keywords
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Naast leesbaarheid wil je ook weten of de termen in je cv overeenkomen met wat werkgevers zoeken. Denk aan functietitels, software, methodes en vaardigheden die in de vacature letterlijk terugkomen.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik de{" "}
              <Link href="/tools/cv-keywords" className="font-black underline">
                cv-keywords tool
              </Link>
              {" "}of de{" "}
              <Link href="/tools/cv-vacature-match" className="font-black underline">
                cv-vacature-match
              </Link>
              {" "}als je je huidige cv naast een specifieke vacature wilt leggen. Werk je nog vanuit LinkedIn-tekst? Gebruik dan ook{" "}
              <Link href="/tools/linkedin-naar-cv" className="font-black underline">
                LinkedIn naar cv omzetten
              </Link>
              .
            </p>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Wat doe je na de check?
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Wat doe je na de check?
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href="/cv-verbeteren"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Herschrijf zwakke onderdelen</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Ga door naar cv verbeteren als je vooral inhoud en formulering wilt aanscherpen.
              </p>
            </Link>
            <Link
              href="/cv-optimaliseren"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Optimaliseer op ATS en vacature</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Handig als je daarna concreet op keywords en vacaturematch wilt verbeteren.
              </p>
            </Link>
            <Link
              href="/cv-maken"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Maak direct een nieuwe versie</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Zet de feedback om in een beter cv en maak direct een nette PDF-versie.
              </p>
            </Link>
          </div>
        </section>

        <LinkCardSection
          eyebrow="Meer routes"
          title="Andere pagina's in deze cv-check cluster"
          links={routeLinks}
        />

        <FaqCardSection title="Veelgestelde vragen over cv checken" items={faqItems} />

        <WhyWerkCvSection locale="nl" />

        <FinalCtaSection
          title="Check je cv en verbeter hem direct"
          description="Gebruik de check om zwakke punten in structuur, ATS-fit en inhoud te vinden en zet die feedback daarna om in een sterkere cv-versie."
          supportLine="Gratis checken. Geen abonnement. Betaal alleen als je een PDF downloadt."
          buttonLabel="Maak een betere cv-versie"
          buttonHref="/editor"
          trackingLocation="cv-checken:final_primary"
          trackingLabel="Maak een betere cv-versie"
        />
      </main>

      <Footer />
    </div>
  );
}
