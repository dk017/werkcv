import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TrackedCareerLink from "@/components/analytics/TrackedCareerLink";
import { CareerHubLinks, CareerToCvCTA } from "@/components/landing/CareerTransitionSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/baan-wisselen";

const faqItems = [
  {
    question: "Wanneer moet ik mijn cv bijwerken als ik van baan wil wisselen?",
    answer:
      "Bij voorkeur voordat je actief solliciteert. Zo kun je sneller reageren op interessante vacatures en hoef je niet op het laatste moment nog alles te herschrijven.",
  },
  {
    question: "Moet ik eerst ontslag nemen voordat ik solliciteer?",
    answer:
      "Niet per se. Veel mensen solliciteren terwijl ze nog in dienst zijn. Let wel op je opzegtermijn en de afspraken in je contract of cao.",
  },
  {
    question: "Welke documenten heb ik nodig bij een baanwissel?",
    answer:
      "Vaak heb je een actuele cv, motivatiebrief of sollicitatiebrief nodig. In sommige situaties komt daar ook een ontslagbrief bij.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Baan wisselen? Checklist voor ontslag, cv en sollicitatie | WerkCV",
  description:
    "Ga je van baan wisselen? Gebruik deze checklist voor ontslagbrief, opzegtermijn, transitievergoeding, motivatiebrief en het bijwerken van je cv.",
  path: "/baan-wisselen",
  keywords: [
    "baan wisselen",
    "nieuwe baan zoeken",
    "ontslagbrief schrijven",
    "opzegtermijn berekenen",
    "cv bijwerken",
    "motivatiebrief schrijven",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function BaanWisselenPage() {
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
          <Link
            href="/cv-maken-zonder-abonnement"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Werk mijn cv bij
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Baan wisselen", href: "/baan-wisselen" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Ontslag", "Cv", "Motivatiebrief", "Checklist"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Baan wisselen: checklist voor ontslag, solliciteren en je cv
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Van baan wisselen betekent vaak meer dan alleen solliciteren. Je moet misschien ontslag nemen, je opzegtermijn controleren, een motivatiebrief schrijven en je cv bijwerken. Deze checklist helpt je stap voor stap.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedCareerLink
                href="/cv-maken-zonder-abonnement"
                eventName="cta_baan_wisselen_cv_click"
                ctaLocation="baan-wisselen:hero_cv"
                ctaText="Werk mijn cv bij"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Werk mijn cv bij
              </TrackedCareerLink>
              <a
                href="#checklist"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk checklist
              </a>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Nieuwe rol kiezen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Waar wil je op letten bij je volgende baan?
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              <li>Type rol en dagelijkse werkzaamheden</li>
              <li>Salarisverwachting en arbeidsvoorwaarden</li>
              <li>Locatie, hybride of remote werken</li>
              <li>Soort contract</li>
              <li>Ontwikkelkansen en groeidoelen</li>
            </ul>
          </aside>
        </section>

        <section id="checklist" className="mb-12 grid gap-6 lg:grid-cols-2">
          {[
            {
              title: "Stap 1: Orienteer op je volgende stap",
              body:
                "Denk eerst na over welk type rol, salarisniveau, locatie of hybride werkvorm en groeipad je zoekt. Dat helpt je om vacatures beter te filteren en je cv gerichter bij te werken.",
            },
            {
              title: "Stap 2: Controleer je opzegtermijn",
              body:
                "Kijk eerst naar je arbeidsovereenkomst of cao en gebruik daarna de tool om je opzegtermijn te controleren. Dat voorkomt dat je te snel toezeggingen doet over je startdatum.",
              linkHref: "/opzegtermijn-berekenen",
              linkLabel: "Opzegtermijn berekenen",
            },
            {
              title: "Stap 3: Schrijf je ontslagbrief",
              body:
                "Als je de overstap concreet maakt, wil je ook een nette schriftelijke bevestiging klaar hebben. Gebruik daarvoor de uitleg en generator op de ontslagbrief-pagina.",
              linkHref: "/ontslagbrief-schrijven",
              linkLabel: "Ontslagbrief schrijven",
            },
            {
              title: "Stap 4: Werk je cv bij",
              body:
                "Update je profieltekst, voeg recente resultaten toe, stem vacaturekeywords af en controleer of je cv ATS-vriendelijk blijft. Zo kun je sneller reageren zodra er een goede vacature langskomt.",
              linkHref: "/cv-maken-zonder-abonnement",
              linkLabel: "Maak je cv zonder abonnement",
            },
            {
              title: "Stap 5: Schrijf je motivatiebrief",
              body:
                "Gebruik per vacature een gerichte motivatiebrief of sollicitatiebrief. Leg uit waarom juist deze functie en werkgever bij jouw volgende stap passen.",
              linkHref: "/motivatiebrief-schrijven",
              linkLabel: "Motivatiebrief schrijven",
            },
            {
              title: "Stap 6: Check je cv voor elke vacature",
              body:
                "Controleer bij elke serieuze sollicitatie of je cv nog goed aansluit op de functie, de woorden uit de vacature en de technische ATS-leesbaarheid.",
              linkHref: "/cv-checken",
              linkLabel: "Cv checken",
            },
          ].map((step) => (
            <article
              key={step.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-3xl font-black text-black">{step.title}</h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
              {step.linkHref ? (
                <Link href={step.linkHref} className="mt-4 inline-block text-sm font-black underline">
                  {step.linkLabel}
                </Link>
              ) : null}
            </article>
          ))}
        </section>

        <CareerHubLinks
          title="Handige tools bij baan wisselen"
          items={[
            {
              href: "/tools/opzegtermijn-berekenen",
              title: "Opzegtermijn berekenen",
              body: "Controleer wanneer je waarschijnlijk kunt vertrekken voordat je afspraken maakt over je nieuwe startdatum.",
            },
            {
              href: "/tools/opzeggingsbrief-generator",
              title: "Ontslagbrief generator",
              body: "Maak snel een nette schriftelijke bevestiging als je ontslag wilt nemen.",
            },
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              body: "Handig als je wilt begrijpen welke vergoeding mogelijk relevant kan zijn bij ontslag of einde contract.",
            },
            {
              href: "/cv-checken",
              title: "Cv checken",
              body: "Zie snel welke onderdelen van je cv nog te zwak of te algemeen zijn.",
            },
            {
              href: "/tools/sollicitatiebrief-generator",
              title: "Motivatiebrief maken",
              body: "Gebruik de briefgenerator als snelle eerste versie voor je nieuwe sollicitatieronde.",
            },
            {
              href: "/tools/ats-cv-checker",
              title: "ATS CV checker",
              body: "Controleer of je cv technisch goed uitleesbaar blijft voor recruitersoftware.",
            },
          ]}
        />

        <CareerHubLinks
          title="Meer lezen binnen deze overstap-cluster"
          items={[
            {
              href: "/ontslagbrief-schrijven",
              title: "Ontslagbrief schrijven",
              body: "Uitleg, voorbeelden en generator voor een nette ontslagbrief.",
            },
            {
              href: "/motivatiebrief-schrijven",
              title: "Motivatiebrief schrijven",
              body: "Structuur, voorbeelden en generator voor een gerichte motivatiebrief.",
            },
            {
              href: "/opzegtermijn-berekenen",
              title: "Opzegtermijn berekenen",
              body: "SEO-landingspagina met uitleg en link naar de calculator.",
            },
            {
              href: "/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              body: "Wrapper met tool, disclaimer en vervolgstappen voor je volgende sollicitatie.",
            },
            {
              href: "/cv-optimaliseren",
              title: "Cv optimaliseren",
              body: "Scherp je cv aan op ATS, recruiterleesbaarheid en vacaturekeywords.",
            },
            {
              href: "/cv-checken",
              title: "Cv checken",
              body: "Controleer je cv voordat je op meerdere vacatures tegelijk reageert.",
            },
          ]}
        />

        <CareerToCvCTA
          title="Klaar voor je volgende sollicitatie?"
          text="Werk je cv bij voordat je solliciteert. Met WerkCV maak je gratis een professionele Nederlandse cv en betaal je alleen bij PDF-download."
          buttonLabel="Werk mijn cv bij"
          buttonHref="/cv-maken-zonder-abonnement"
          supportLine="Geen abonnement. Eenmalig EUR 4,99 bij PDF-download."
          eventName="cta_baan_wisselen_cv_click"
          ctaLocation="baan-wisselen:bottom_cv"
        />
      </main>

      <Footer />
    </div>
  );
}
