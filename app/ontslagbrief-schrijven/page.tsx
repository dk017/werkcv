import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TrackedCareerLink from "@/components/analytics/TrackedCareerLink";
import { CareerHubLinks, CareerToCvCTA, ToolCTA } from "@/components/landing/CareerTransitionSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/ontslagbrief-schrijven";

const faqItems = [
  {
    question: "Moet een ontslagbrief lang zijn?",
    answer:
      "Nee, een ontslagbrief mag kort en duidelijk zijn. Het belangrijkste is dat je helder aangeeft dat je ontslag neemt.",
  },
  {
    question: "Kan ik mijn ontslagbrief per e-mail sturen?",
    answer:
      "Dat hangt af van je werkgever en situatie. Zorg in ieder geval dat je een schriftelijke bevestiging hebt en bewaar een kopie.",
  },
  {
    question: "Moet ik een reden geven voor mijn ontslag?",
    answer:
      "Meestal is een korte, nette brief voldoende. Je hoeft niet uitgebreid uit te leggen waarom je vertrekt.",
  },
  {
    question: "Wat doe ik na mijn ontslagbrief?",
    answer:
      "Controleer je opzegtermijn, rond je werk netjes af en werk je cv bij voor je volgende sollicitaties.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Ontslagbrief schrijven? Gratis voorbeeld en generator | WerkCV",
  description:
    "Schrijf snel een nette ontslagbrief met voorbeelden en een gratis generator. Bekijk wat erin moet en werk daarna direct je cv bij voor je volgende stap.",
  path: "/ontslagbrief-schrijven",
  keywords: [
    "ontslagbrief schrijven",
    "ontslagbrief voorbeeld",
    "ontslagbrief maken",
    "ontslagbrief generator",
    "opzeggingsbrief schrijven",
    "ontslag nemen brief",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function OntslagbriefSchrijvenPage() {
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
            href="/tools/opzeggingsbrief-generator"
            className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Ontslagbrief schrijven", href: "/ontslagbrief-schrijven" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Ontslagbrief", "Voorbeeld", "Generator", "Volgende stap"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Ontslagbrief schrijven: voorbeeld, uitleg en gratis generator
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wil je ontslag nemen en heb je een nette ontslagbrief nodig? Gebruik de uitleg, voorbeelden en generator om snel een duidelijke brief op te stellen. Ben je daarna klaar voor je volgende stap, dan kun je ook direct je cv bijwerken in WerkCV.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedCareerLink
                href="/tools/opzeggingsbrief-generator"
                eventName="cta_ontslagbrief_generator_click"
                ctaLocation="ontslagbrief:hero_generator"
                ctaText="Maak mijn ontslagbrief"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak mijn ontslagbrief
              </TrackedCareerLink>
              <TrackedCareerLink
                href="/cv-maken-zonder-abonnement"
                eventName="cta_ontslagbrief_cv_click"
                ctaLocation="ontslagbrief:hero_cv"
                ctaText="Werk mijn cv bij"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Werk mijn cv bij
              </TrackedCareerLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Gratis generator. Geen account nodig om te starten.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Rustige aanpak
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Eerst de brief, daarna je volgende stap
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Schrijf een korte, duidelijke ontslagbrief.</p>
              <p>2. Controleer je opzegtermijn als je laatste werkdag nog niet vaststaat.</p>
              <p>3. Bewaar een kopie van je brief en schriftelijke bevestiging.</p>
              <p>4. Werk daarna je cv bij voor je volgende sollicitaties.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">Wat is een ontslagbrief?</h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              Een ontslagbrief is een schriftelijke bevestiging dat je je arbeidsovereenkomst wilt beeindigen. Daarmee leg je duidelijk vast dat je ontslag neemt.
            </p>
            <p>
              In zo&apos;n brief staan meestal je naam, je werkgever, de datum van opzegging, je laatste werkdag als die bekend is en een nette afsluiting.
            </p>
            <p className="border-l-4 border-black bg-[#FFFEF9] px-4 py-3 text-sm font-medium text-slate-700">
              Dit is algemene informatie en geen juridisch advies. Controleer bij twijfel altijd je arbeidsovereenkomst, cao of vraag passend advies.
            </p>
          </div>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">Wat zet je in een ontslagbrief?</h2>
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
            {[
              "Je naam en contactgegevens",
              "Naam van werkgever of leidinggevende",
              "Datum van de brief",
              "Duidelijke zin dat je ontslag neemt",
              "Gewenste of verwachte laatste werkdag",
              "Bedankje of nette afsluiting",
              "Je naam en handtekening als dat van toepassing is",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <ToolCTA
          title="Gratis ontslagbrief generator"
          text="Open de tool om snel een nette eerste versie te maken. Gebruik de generator als praktische start en controleer daarna zelf of de inhoud goed past bij jouw werkgever, contract en situatie."
          buttonLabel="Open de ontslagbrief generator"
          buttonHref="/tools/opzeggingsbrief-generator"
          eventName="cta_ontslagbrief_generator_click"
          ctaLocation="ontslagbrief:tool_block"
        />

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">Ontslagbrief voorbeeld</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Korte standaard ontslagbrief",
                body:
                  "Geachte [naam],\nHierbij bevestig ik dat ik mijn arbeidsovereenkomst wil beeindigen. Mijn laatste werkdag bespreek ik graag in lijn met de geldende afspraken.\nIk wil u bedanken voor de samenwerking.\nMet vriendelijke groet,\n[naam]",
              },
              {
                title: "Ontslagbrief met opzegtermijn",
                body:
                  "Geachte [naam],\nHierbij bevestig ik dat ik mijn arbeidsovereenkomst wil beeindigen. Rekening houdend met de geldende opzegtermijn is mijn beoogde laatste werkdag [datum].\nIk wil u bedanken voor de samenwerking.\nMet vriendelijke groet,\n[naam]",
              },
              {
                title: "Ontslagbrief per e-mail",
                body:
                  "Geachte [naam],\nMet deze e-mail bevestig ik dat ik mijn arbeidsovereenkomst wil beeindigen. Mijn beoogde laatste werkdag is [datum], onder voorbehoud van de geldende afspraken.\nDank voor de samenwerking. Ik ontvang graag een schriftelijke bevestiging van ontvangst.\nMet vriendelijke groet,\n[naam]",
              },
            ].map((example) => (
              <article key={example.title} className="border-2 border-black bg-[#FFFEF9] p-4">
                <h3 className="text-sm font-black text-black">{example.title}</h3>
                <p className="mt-3 whitespace-pre-line text-sm font-medium leading-relaxed text-slate-700">
                  {example.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Veelgemaakte fouten bij een ontslagbrief</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {[
                "Geen duidelijke ontslagdatum noemen",
                "Te emotioneel of negatief schrijven",
                "Geen rekening houden met opzegtermijn",
                "Alleen mondeling opzeggen zonder schriftelijke bevestiging",
                "Geen kopie bewaren",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <h2 className="text-3xl font-black text-white">Na je ontslagbrief: werk je cv bij</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Een ontslagbrief is vaak niet het einde van het proces, maar het begin van je volgende stap. Juist dan is het slim om je profieltekst, recente resultaten en vacaturekeywords in je cv direct bij te werken.
            </p>
            <div className="mt-5 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              <p>
                Gebruik ook{" "}
                <Link href="/tools/opzegtermijn-berekenen" className="font-black underline">
                  opzegtermijn berekenen
                </Link>
                {" "}als je je laatste werkdag nog wilt controleren.
              </p>
              <p>
                Kijk bij{" "}
                <Link href="/baan-wisselen" className="font-black underline">
                  baan wisselen
                </Link>
                {" "}als je het hele overstaptraject stap voor stap wilt bekijken.
              </p>
            </div>
          </article>
        </section>

        <CareerHubLinks
          title="Meer routes rond ontslag, opzegtermijn en cv bijwerken"
          items={[
            {
              href: "/tools/opzeggingsbrief-generator",
              title: "Opzeggingsbrief-generator",
              body: "Maak direct een eerste versie van je brief als je meteen wilt schrijven.",
            },
            {
              href: "/opzegtermijn-berekenen",
              title: "Opzegtermijn berekenen",
              body: "Controleer eerst je opzegtermijn als je laatste werkdag nog niet zeker is.",
            },
            {
              href: "/tools/transitievergoeding-berekenen",
              title: "Transitievergoeding berekenen",
              body: "Handig als je wilt begrijpen welke vervolgstappen financieel relevant kunnen zijn.",
            },
            {
              href: "/baan-wisselen",
              title: "Baan wisselen",
              body: "Gebruik de checklist als je ontslag, solliciteren en cv bijwerken wilt combineren.",
            },
            {
              href: "/cv-maken-zonder-abonnement",
              title: "Cv maken zonder abonnement",
              body: "Werk je cv gratis bij en betaal pas wanneer je de PDF echt wilt downloaden.",
            },
            {
              href: "/cv-optimaliseren",
              title: "Cv optimaliseren",
              body: "Scherp je cv aan op ATS, vacaturekeywords en Nederlandse sollicitaties.",
            },
            {
              href: "/tools/ats-cv-checker",
              title: "ATS CV checker",
              body: "Controleer of je bijgewerkte cv technisch goed uitleesbaar blijft.",
            },
          ]}
        />

        <CareerToCvCTA
          title="Nieuwe baan zoeken na je ontslag?"
          text="Zodra je je ontslag voorbereidt, is dit ook een goed moment om je cv bij te werken. Met WerkCV maak je een nette, ATS-vriendelijke Nederlandse cv zonder abonnement."
          buttonLabel="Werk mijn cv bij"
          buttonHref="/cv-maken-zonder-abonnement"
          supportLine="Gratis starten. Eenmalig EUR 4,99 bij PDF-download. Geen abonnement."
          eventName="cta_ontslagbrief_cv_click"
          ctaLocation="ontslagbrief:bottom_cv"
        />
      </main>

      <Footer />
    </div>
  );
}
