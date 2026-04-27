import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TrackedCareerLink from "@/components/analytics/TrackedCareerLink";
import { CareerHubLinks, CareerToCvCTA, ToolCTA } from "@/components/landing/CareerTransitionSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/opzegtermijn-berekenen";

const faqItems = [
  {
    question: "Wat is opzegtermijn?",
    answer:
      "Opzegtermijn is de periode tussen het moment waarop je opzegt en je laatste werkdag. Hoe lang die periode is, hangt vaak af van je contract, cao en de algemene regels die op jouw situatie van toepassing zijn.",
  },
  {
    question: "Waar vind ik mijn opzegtermijn?",
    answer:
      "Controleer eerst je arbeidsovereenkomst en eventuele cao. Gebruik de tool daarna als algemene check als je wilt begrijpen waar je ongeveer rekening mee moet houden.",
  },
  {
    question: "Waarom is opzegtermijn belangrijk bij baan wisselen?",
    answer:
      "Omdat je nieuwe werkgever vaak wil weten wanneer je kunt starten. Een realistische inschatting voorkomt misverstanden in je overstapplanning.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Opzegtermijn berekenen? Check je opzegtermijn | WerkCV",
  description:
    "Bereken of controleer je opzegtermijn en bekijk waar je op moet letten als je van baan wisselt. Werk daarna direct je cv bij.",
  path: "/opzegtermijn-berekenen",
  keywords: [
    "opzegtermijn berekenen",
    "opzegtermijn checken",
    "ontslag opzegtermijn",
    "baan wisselen opzegtermijn",
    "wanneer kan ik opzeggen",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function OpzegtermijnBerekenenPage() {
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
            href="/tools/opzegtermijn-berekenen"
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
              { label: "Opzegtermijn berekenen", href: "/opzegtermijn-berekenen" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Opzegtermijn berekenen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je ontslag nemen of van baan wisselen? Controleer eerst je opzegtermijn, zodat je weet waar je rekening mee moet houden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedCareerLink
                href="/tools/opzegtermijn-berekenen"
                eventName="cta_opzegtermijn_tool_click"
                ctaLocation="opzegtermijn:hero_tool"
                ctaText="Bereken mijn opzegtermijn"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Bereken mijn opzegtermijn
              </TrackedCareerLink>
              <TrackedCareerLink
                href="/cv-maken-zonder-abonnement"
                eventName="cta_opzegtermijn_cv_click"
                ctaLocation="opzegtermijn:hero_cv"
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
              Deze tool geeft algemene informatie en is geen juridisch advies. Controleer altijd je arbeidsovereenkomst, cao of vraag advies bij twijfel.
            </p>
          </aside>
        </section>

        <ToolCTA
          title="Bereken je opzegtermijn"
          text="Gebruik de bestaande tool als eerste check. Dat geeft je een praktische inschatting voordat je je ontslagbrief opstelt of een nieuwe startdatum afspreekt."
          buttonLabel="Open de opzegtermijn-tool"
          buttonHref="/tools/opzegtermijn-berekenen"
          eventName="cta_opzegtermijn_tool_click"
          ctaLocation="opzegtermijn:tool_block"
        />

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Wat is opzegtermijn?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Opzegtermijn is de periode tussen het moment waarop je opzegt en de datum waarop je dienstverband eindigt. Die termijn bepaalt dus hoe snel je waarschijnlijk kunt overstappen.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Waar vind je je opzegtermijn?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Kijk eerst in je arbeidsovereenkomst en controleer of er ook een cao van toepassing is. Daarin staan vaak de afspraken die voor jouw situatie relevant zijn.
            </p>
          </article>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-3">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">Waarom belangrijk bij baan wisselen?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Je opzegtermijn bepaalt vaak wanneer je kunt starten bij een nieuwe werkgever. Een realistische check voorkomt dat je te vroeg toezeggingen doet.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black">Wat doe je na het berekenen?</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Als je ongeveer weet hoe je planning eruitziet, kun je je ontslagbrief voorbereiden en je cv alvast bijwerken voor je volgende sollicitaties.
            </p>
          </article>

          <article className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <h2 className="text-2xl font-black text-white">Ontslagbrief schrijven</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Gebruik{" "}
              <Link href="/ontslagbrief-schrijven" className="font-black underline">
                ontslagbrief schrijven
              </Link>
              {" "}als je na de termijncheck meteen je brief wilt opstellen.
            </p>
          </article>
        </section>

        <CareerHubLinks
          title="Meer routes na je opzegtermijn-check"
          items={[
            {
              href: "/tools/opzegtermijn-berekenen",
              title: "Opzegtermijn-tool",
              body: "Open de calculator als je direct een algemene check wilt doen.",
            },
            {
              href: "/ontslagbrief-schrijven",
              title: "Ontslagbrief schrijven",
              body: "Ga door naar de uitleg en generator voor een nette schriftelijke bevestiging.",
            },
            {
              href: "/baan-wisselen",
              title: "Baan wisselen",
              body: "Gebruik de overstap-checklist als je het hele proces wilt doorlopen.",
            },
            {
              href: "/cv-maken-zonder-abonnement",
              title: "Cv maken zonder abonnement",
              body: "Werk je cv alvast bij terwijl je planning en vertrekdatum duidelijker worden.",
            },
            {
              href: "/tools/ats-cv-checker",
              title: "ATS CV checker",
              body: "Controleer of je bijgewerkte cv technisch goed uitleesbaar blijft.",
            },
          ]}
        />

        <CareerToCvCTA
          title="Nieuwe baan op het oog?"
          text="Als je je opzegtermijn controleert omdat je wilt overstappen, is dit ook het moment om je cv bij te werken."
          buttonLabel="Werk mijn cv bij"
          buttonHref="/cv-maken-zonder-abonnement"
          eventName="cta_opzegtermijn_cv_click"
          ctaLocation="opzegtermijn:bottom_cv"
        />
      </main>

      <Footer />
    </div>
  );
}
