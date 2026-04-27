import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TrackedCareerLink from "@/components/analytics/TrackedCareerLink";
import { CareerHubLinks, CareerToCvCTA, ToolCTA } from "@/components/landing/CareerTransitionSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/transitievergoeding-berekenen";

const faqItems = [
  {
    question: "Wat is transitievergoeding?",
    answer:
      "Transitievergoeding is een vergoeding die relevant kan zijn bij ontslag of einde van een dienstverband. Of dat in jouw situatie speelt, hangt af van de manier waarop het dienstverband eindigt en de afspraken die gelden.",
  },
  {
    question: "Wanneer kan transitievergoeding relevant zijn?",
    answer:
      "Dat kan bijvoorbeeld relevant zijn als je contract eindigt op initiatief van de werkgever of niet wordt verlengd. Controleer altijd de details van je eigen situatie, contract en eventuele cao.",
  },
  {
    question: "Welke gegevens heb je nodig?",
    answer:
      "Meestal heb je gegevens nodig over je salaris, de duur van je dienstverband en de manier waarop het contract eindigt. Gebruik loonstroken en contractdocumenten voor een betere inschatting.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Transitievergoeding berekenen? Gratis tool en uitleg | WerkCV",
  description:
    "Bereken je transitievergoeding en bekijk wat je volgende stap kan zijn. Werk daarna je cv bij voor nieuwe sollicitaties.",
  path: "/transitievergoeding-berekenen",
  keywords: [
    "transitievergoeding berekenen",
    "transitievergoeding tool",
    "ontslag vergoeding berekenen",
    "einde contract vergoeding",
    "cv bijwerken na ontslag",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function TransitievergoedingBerekenenPage() {
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
            href="/tools/transitievergoeding-berekenen"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Open tool
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Transitievergoeding berekenen", href: "/transitievergoeding-berekenen" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Transitievergoeding berekenen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je weten waar je mogelijk recht op hebt bij ontslag of einde dienstverband? Gebruik de tool als eerste indicatie en bereid daarna je volgende stap voor.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedCareerLink
                href="/tools/transitievergoeding-berekenen"
                eventName="cta_transitievergoeding_tool_click"
                ctaLocation="transitievergoeding:hero_tool"
                ctaText="Bereken transitievergoeding"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Bereken transitievergoeding
              </TrackedCareerLink>
              <TrackedCareerLink
                href="/cv-maken-zonder-abonnement"
                eventName="cta_transitievergoeding_cv_click"
                ctaLocation="transitievergoeding:hero_cv"
                ctaText="Werk mijn cv bij"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Werk mijn cv bij
              </TrackedCareerLink>
            </div>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Belangrijk
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              Deze berekening is een indicatie en geen juridisch advies. Controleer je situatie altijd met officiele bronnen, je arbeidsovereenkomst, cao of een juridisch adviseur.
            </p>
          </aside>
        </section>

        <ToolCTA
          title="Bereken transitievergoeding"
          text="Gebruik de bestaande tool als eerste indicatie. Dat helpt je om sneller te begrijpen welke vervolgstappen relevant kunnen zijn, zonder dat de tool je situatie definitief beoordeelt."
          buttonLabel="Open de transitievergoeding-tool"
          buttonHref="/tools/transitievergoeding-berekenen"
          eventName="cta_transitievergoeding_tool_click"
          ctaLocation="transitievergoeding:tool_block"
        />

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Wat is transitievergoeding?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Transitievergoeding is een vergoeding die relevant kan zijn als een dienstverband eindigt. Of die vergoeding in jouw situatie een rol speelt, hangt af van hoe het contract eindigt en welke afspraken of regels van toepassing zijn.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Wanneer kan transitievergoeding relevant zijn?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Dat kan bijvoorbeeld relevant zijn bij ontslag of het einde van een tijdelijk contract. Controleer altijd je eigen contract, cao en de details van de situatie voordat je conclusies trekt.
            </p>
          </article>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">Welke gegevens heb je nodig?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Denk aan salarisgegevens, contractduur en de manier waarop je dienstverband eindigt. Met loonstroken en contractdocumenten kun je meestal een betere eerste inschatting maken.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">Wat doe je na de berekening?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Gebruik de uitkomst vooral als planning-input. Kijk daarna naar je volgende stap: je cv bijwerken, vacatures selecteren en je sollicitatie opnieuw voorbereiden.
            </p>
          </article>

          <article className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <h2 className="text-2xl font-black text-white">Sollicitatie voorbereiden</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Kijk bij{" "}
              <Link href="/baan-wisselen" className="font-black underline">
                baan wisselen
              </Link>
              {" "}als je ontslag, motivatiebrief en cv bijwerken in een logische volgorde wilt zetten.
            </p>
          </article>
        </section>

        <CareerHubLinks
          title="Meer routes na je berekening"
          items={[
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding-tool",
              body: "Open de calculator als je direct een eerste indicatie wilt zien.",
            },
            {
              href: "/baan-wisselen",
              title: "Baan wisselen",
              body: "Gebruik de hub als je na ontslag of contracteinde meteen vooruit wilt plannen.",
            },
            {
              href: "/ontslagbrief-schrijven",
              title: "Ontslagbrief schrijven",
              body: "Handig als je ook een nette schriftelijke bevestiging wilt voorbereiden.",
            },
            {
              href: "/cv-maken-zonder-abonnement",
              title: "Cv maken zonder abonnement",
              body: "Werk je cv gratis bij en betaal pas wanneer je de PDF nodig hebt.",
            },
            {
              href: "/cv-checken",
              title: "Cv checken",
              body: "Controleer je cv voordat je opnieuw actief gaat solliciteren.",
            },
            {
              href: "/tools/ats-cv-checker",
              title: "ATS CV checker",
              body: "Check of je volgende cv technisch goed leesbaar blijft voor recruitersoftware.",
            },
          ]}
        />

        <CareerToCvCTA
          title="Bereid je volgende stap voor"
          text="Na ontslag of einde contract is een actuele cv belangrijk. Maak gratis een nette Nederlandse cv in WerkCV en betaal alleen wanneer je de PDF downloadt."
          buttonLabel="Maak mijn cv"
          buttonHref="/cv-maken-zonder-abonnement"
          eventName="cta_transitievergoeding_cv_click"
          ctaLocation="transitievergoeding:bottom_cv"
        />
      </main>

      <Footer />
    </div>
  );
}
