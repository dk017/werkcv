import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  FaqCardSection,
  FinalCtaSection,
  LinkCardSection,
  WhyWerkCvSection,
  type OptimizerFaqItem,
  type OptimizerLinkCard,
} from "@/components/landing/CvOptimizerSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/cv-verbeteren";

const improvementPoints = [
  {
    title: "Profieltekst",
    body: "Schrijf concreter wie je bent, welke ervaring je hebt en voor welk type rol je relevant bent.",
  },
  {
    title: "Werkervaring",
    body: "Laat meer actie en resultaat zien, en minder taakbeschrijvingen zonder context.",
  },
  {
    title: "Vaardigheden",
    body: "Kies skills die echt aansluiten op je doelrol en die je in werkervaring kunt onderbouwen.",
  },
  {
    title: "Opmaak",
    body: "Gebruik een rustige structuur met duidelijke koppen, consistente datums en scanbare secties.",
  },
  {
    title: "ATS-leesbaarheid",
    body: "Controleer of recruitersoftware je cv logisch kan uitlezen en of je keywords zichtbaar genoeg zijn.",
  },
];

const sentencePairs = [
  {
    weak: "Verantwoordelijk voor klantenservice en administratie.",
    strong:
      "Dagelijks 35+ klantvragen afgehandeld en administratieve opvolging gestroomlijnd, waardoor reactietijd zichtbaar daalde.",
  },
  {
    weak: "Goede communicatieve vaardigheden en teamplayer.",
    strong:
      "Werkte dagelijks samen met sales en operations en vertaalde klantvragen naar concrete acties voor meerdere teams.",
  },
  {
    weak: "Ondersteunde projecten en rapportages.",
    strong:
      "Projectvoortgang bewaakt en wekelijkse rapportages opgesteld, waardoor knelpunten sneller zichtbaar werden voor het team.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/cv-optimaliseren",
    title: "CV optimaliseren",
    body: "Voor de combinatie van ATS, vacaturekeywords en inhoudelijke verbeterpunten in één route.",
  },
  {
    href: "/cv-checken",
    title: "CV checken",
    body: "Gebruik deze route als je eerst snel wilt zien wat er inhoudelijk of technisch ontbreekt.",
  },
  {
    href: "/cv-nakijken",
    title: "CV laten nakijken",
    body: "Sterk als je zoekt naar een automatische review van veelvoorkomende fouten.",
  },
  {
    href: "/cv-voorbeelden",
    title: "CV-voorbeelden bekijken",
    body: "Handig als je naast de check ook concrete Nederlandse voorbeelden per functie wilt zien.",
  },
];

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Wanneer moet je je cv verbeteren?",
    answer:
      "Verbeter je cv als je weinig reacties krijgt, als je profieltekst te algemeen blijft of als je document te weinig aansluit op de vacature waarop je nu solliciteert.",
  },
  {
    question: "Moet ik eerst mijn profieltekst of werkervaring verbeteren?",
    answer:
      "Begin meestal met profieltekst en werkervaring. Dat zijn de onderdelen die recruiters het snelst lezen en waar het meeste verschil in overtuigingskracht zit.",
  },
  {
    question: "Kan ik mijn cv verbeteren zonder alles opnieuw te schrijven?",
    answer:
      "Ja. Vaak zit de grootste winst in het herschrijven van een paar zwakke zinnen, het aanscherpen van skills en het kiezen van een duidelijkere structuur.",
  },
  {
    question: "Helpt WerkCV ook bij voorbeelden en formulering?",
    answer:
      "Ja. Je kunt je cv eerst controleren, daarna gericht werken aan profieltekst, werkervaring-bullets en vaardigheden, en vervolgens direct een sterkere cv-versie maken.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV verbeteren? Gratis tips en CV-check | WerkCV",
  description:
    "Verbeter je cv met duidelijke profieltekst, betere werkervaring en ATS-vriendelijke opmaak. Check je cv gratis en maak direct een professionele versie.",
  path: "/cv-verbeteren",
  keywords: [
    "cv verbeteren",
    "cv verbeteren gratis",
    "cv verbeteren tips",
    "beter cv maken",
    "cv sterker maken",
    "cv verbeteren voor sollicitatie",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function CvVerbeterenPage() {
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
              href="/cv-voorbeelden"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk cv-voorbeelden
            </Link>
            <Link
              href="/cv-maken"
              className="border-2 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black"
            >
              Maak direct een cv
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV verbeteren", href: "/cv-verbeteren" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Profieltekst", "Werkervaring", "Vaardigheden", "ATS", "Opmaak"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV verbeteren: maak je cv duidelijker, sterker en ATS-vriendelijker
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je je cv verbeteren voordat je solliciteert? Controleer je cv op structuur, inhoud, keywords en leesbaarheid. Daarna kun je direct een professionele Nederlandse cv-versie maken.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/cv-score"
                trackingLocation="cv-verbeteren:hero_primary"
                trackingLabel="Verbeter mijn cv gratis"
                ctaEventName="cta_cv_verbeteren_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Verbeter mijn cv gratis
              </TrackedLandingLink>
              <Link
                href="/cv-voorbeelden"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk cv-voorbeelden
              </Link>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Handig als je je huidige cv eerst wilt aanscherpen voordat je een nieuwe versie downloadt.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Snelle winst
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Waar zit vaak de grootste verbetering?
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Een profieltekst die te algemeen blijft.</p>
              <p>2. Werkervaring die taken noemt, maar weinig resultaat laat zien.</p>
              <p>3. Vaardigheden die niet duidelijk gekoppeld zijn aan de functie.</p>
              <p>4. Opmaak of keywords die ATS-systemen niet goed ondersteunen.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Wanneer moet je je cv verbeteren?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wanneer moet je je cv verbeteren?
          </h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              Als je weinig reacties krijgt, als je twijfelt over je profieltekst of als je het gevoel hebt dat je cv te weinig laat zien wat je echt hebt bereikt, is verbeteren meestal slimmer dan direct opnieuw beginnen.
            </p>
            <p>
              Ook als je van functie wisselt of gerichter wilt solliciteren, helpt het om je cv opnieuw te prioriteren. Vaak kun je met gerichte aanpassingen al veel meer duidelijkheid en relevantie creëren.
            </p>
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            De 5 belangrijkste verbeterpunten
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            De 5 belangrijkste verbeterpunten
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {improvementPoints.map((item) => (
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

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Voorbeelden van zwakke vs sterke cv-zinnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Voorbeelden van zwakke vs sterke cv-zinnen
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {sentencePairs.map((pair) => (
              <article key={pair.weak} className="border-2 border-white bg-white/10 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Zwak</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200">{pair.weak}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Sterker</p>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-100">{pair.strong}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              CV verbeteren per functie
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              CV verbeteren per functie
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Een administratief cv vraagt andere nadruk dan een marketing-, sales- of zorg-cv. Daarom loont het om voorbeelden en taalgebruik per functie te bekijken voordat je herschrijft.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik hiervoor de pagina&apos;s met{" "}
              <Link href="/profieltekst-cv-voorbeelden" className="font-black underline">
                profieltekst-voorbeelden
              </Link>
              ,{" "}
              <Link href="/werkervaring-cv-voorbeelden" className="font-black underline">
                werkervaring-voorbeelden
              </Link>
              ,{" "}
              <Link href="/vaardigheden-cv-voorbeelden" className="font-black underline">
                vaardigheden-voorbeelden
              </Link>
              {" "}en bredere{" "}
              <Link href="/cv-voorbeelden" className="font-black underline">
                cv-voorbeelden
              </Link>
              .
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Gebruik WerkCV om je verbeterde cv te maken
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Gebruik WerkCV om je verbeterde cv te maken
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Nadat je weet wat sterker moet, kun je direct door naar de tools voor{" "}
              <Link href="/tools/profieltekst-generator" className="font-black underline">
                profieltekst
              </Link>
              ,{" "}
              <Link href="/tools/werkervaring-bullets" className="font-black underline">
                werkervaring-bullets
              </Link>
              {" "}en{" "}
              <Link href="/tools/vaardigheden-generator" className="font-black underline">
                vaardigheden
              </Link>
              . Daarna zet je alles om in een nieuwe versie via{" "}
              <Link href="/cv-maken" className="font-black underline">
                cv maken
              </Link>
              .
            </p>
          </article>
        </section>

        <LinkCardSection
          eyebrow="Meer routes"
          title="Andere pagina's om je cv sterker te maken"
          links={routeLinks}
        />

        <FaqCardSection title="Veelgestelde vragen over cv verbeteren" items={faqItems} />

        <WhyWerkCvSection locale="nl" />

        <FinalCtaSection
          title="Maak een sterkere cv-versie in WerkCV"
          description="Gebruik de feedback om profieltekst, werkervaring en structuur meteen te verbeteren en zet die versie direct om in een nette sollicitatie-PDF."
          supportLine="Gratis bouwen. Eénmalig €4,99 bij PDF-download. Geen abonnement."
          buttonLabel="Maak een sterkere cv-versie"
          buttonHref="/editor"
          trackingLocation="cv-verbeteren:final_primary"
          trackingLabel="Maak een sterkere cv-versie"
        />
      </main>

      <Footer />
    </div>
  );
}
