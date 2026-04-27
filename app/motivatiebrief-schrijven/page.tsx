import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import TrackedCareerLink from "@/components/analytics/TrackedCareerLink";
import { CareerHubLinks, CareerToCvCTA, ToolCTA } from "@/components/landing/CareerTransitionSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/motivatiebrief-schrijven";

const faqItems = [
  {
    question: "Hoe lang moet een motivatiebrief zijn?",
    answer:
      "Meestal is een pagina genoeg. Houd de brief kort, specifiek en relevant voor de functie waarop je solliciteert.",
  },
  {
    question: "Wat is het verschil tussen een motivatiebrief en sollicitatiebrief?",
    answer:
      "Een motivatiebrief legt vaak meer nadruk op waarom je de functie en werkgever wilt. Een sollicitatiebrief licht meestal ook sterker toe waarom je geschikt bent op basis van ervaring en vaardigheden. In de praktijk lopen die twee vaak in elkaar over.",
  },
  {
    question: "Moet mijn motivatiebrief aansluiten op mijn cv?",
    answer:
      "Ja. Je brief en cv moeten elkaar versterken. De brief geeft motivatie en context, terwijl je cv je ervaring overzichtelijk laat zien.",
  },
  {
    question: "Kan ik AI gebruiken voor mijn motivatiebrief?",
    answer:
      "Ja, als hulpmiddel. Controleer wel altijd of de uitkomst persoonlijk, correct en eerlijk blijft en goed past bij jouw situatie.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "Motivatiebrief schrijven? Voorbeeld, tips en generator | WerkCV",
  description:
    "Schrijf een sterke motivatiebrief met duidelijke structuur, voorbeelden en een gratis generator. Maak daarna ook een cv die past bij je sollicitatie.",
  path: "/motivatiebrief-schrijven",
  keywords: [
    "motivatiebrief schrijven",
    "motivatiebrief voorbeeld",
    "hoe schrijf je een motivatiebrief",
    "motivatiebrief generator",
    "motivatiebrief tips",
    "sollicitatiebrief generator",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function MotivatiebriefSchrijvenPage() {
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
            href="/tools/sollicitatiebrief-generator"
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
              { label: "Motivatiebrief schrijven", href: "/motivatiebrief-schrijven" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Motivatie", "Structuur", "Voorbeelden", "Generator"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief schrijven: structuur, voorbeelden en gratis generator
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een motivatiebrief laat zien waarom je voor een functie en werkgever kiest. Gebruik de uitleg, voorbeelden en generator om sneller een sterke brief te maken. Maak daarna ook een cv die past bij dezelfde sollicitatie.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedCareerLink
                href="/tools/sollicitatiebrief-generator"
                eventName="cta_motivatiebrief_generator_click"
                ctaLocation="motivatiebrief:hero_generator"
                ctaText="Maak mijn motivatiebrief"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak mijn motivatiebrief
              </TrackedCareerLink>
              <TrackedCareerLink
                href="/cv-maken"
                eventName="cta_motivatiebrief_cv_click"
                ctaLocation="motivatiebrief:hero_cv"
                ctaText="Maak bijpassende cv"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak bijpassende cv
              </TrackedCareerLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-700">
              Gratis starten. Geen abonnement voor je cv, betaal alleen bij PDF-download.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Praktische focus
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Brief en cv moeten hetzelfde verhaal vertellen
            </h2>
            <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>1. Kies een opening die direct past bij de vacature.</p>
              <p>2. Laat zien waarom je deze functie wilt, niet alleen dat je beschikbaar bent.</p>
              <p>3. Koppel je motivatie aan voorbeelden uit werk, stage of projecten.</p>
              <p>4. Zorg dat je cv dezelfde functierichting en keywords ondersteunt.</p>
            </div>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">Wat is een motivatiebrief?</h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
            <p>
              Een motivatiebrief legt uit waarom je voor een functie en werkgever kiest. Je stuurt die vaak samen met je cv mee als extra context bij je sollicitatie.
            </p>
            <p>
              Een goede motivatiebrief is specifiek, persoonlijk en relevant. Het doel is niet om je cv te herhalen, maar om uit te leggen waarom deze stap logisch is en waarom jouw ervaring daarbij past.
            </p>
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Motivatiebrief vs sollicitatiebrief</h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Een motivatiebrief legt meestal meer nadruk op motivatie, bedrijfsmatch en waarom je de rol wilt. Een sollicitatiebrief laat vaak ook explicieter zien waarom je geschikt bent op basis van ervaring en resultaten.
            </p>
            <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
              In de praktijk worden de termen vaak door elkaar gebruikt. Zie het vooral als een praktische brief die motivatie en geschiktheid combineert.
            </p>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Structuur van een motivatiebrief</h2>
            <ol className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {[
                "Contactgegevens",
                "Aanhef",
                "Sterke openingszin",
                "Motivatie voor functie en bedrijf",
                "Waarom jij past",
                "Afsluiting met uitnodiging tot gesprek",
                "Ondertekening",
              ].map((item, index) => (
                <li key={item}>
                  {index + 1}. {item}
                </li>
              ))}
            </ol>
          </article>
        </section>

        <ToolCTA
          title="Gratis motivatiebrief generator"
          text="Gebruik de sollicitatiebrief-generator als basis voor je motivatiebrief. Dat is de snelste manier om een eerste versie te maken en daarna inhoudelijk op jouw vacature aan te scherpen."
          buttonLabel="Open de motivatiebrief generator"
          buttonHref="/tools/sollicitatiebrief-generator"
          eventName="cta_motivatiebrief_generator_click"
          ctaLocation="motivatiebrief:tool_block"
        />

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-3xl font-black text-black">Motivatiebrief voorbeeld</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Starter of student",
                body:
                  "Geachte [naam],\nMet interesse reageer ik op de functie van [functie] bij [bedrijf]. Tijdens mijn studie en stage heb ik gemerkt dat ik energie krijg van [relevant werk]. Juist daarom spreekt deze rol mij aan. Met mijn ervaring in [project of stage] en mijn motivatie om snel te leren, wil ik graag bijdragen aan uw team.\nMet vriendelijke groet,\n[naam]",
              },
              {
                title: "Ervaren kandidaat",
                body:
                  "Geachte [naam],\nDe functie van [functie] spreekt mij aan omdat deze goed aansluit op mijn ervaring in [vakgebied] en mijn wens om verder te groeien in [relevant domein]. In mijn huidige rol heb ik gewerkt aan [resultaat of verantwoordelijkheid], waardoor ik weet wat nodig is om in deze functie snel waarde toe te voegen. Graag licht ik mijn motivatie en ervaring verder toe in een gesprek.\nMet vriendelijke groet,\n[naam]",
              },
              {
                title: "Carrièreswitch",
                body:
                  "Geachte [naam],\nMet deze brief solliciteer ik naar de functie van [functie]. Hoewel mijn achtergrond ligt in [huidig vakgebied], heb ik de afgelopen periode bewust gewerkt aan een overstap naar [nieuw vakgebied]. Via [cursus, project of praktijkervaring] heb ik relevante kennis opgebouwd. Deze rol spreekt mij aan omdat ik mijn ervaring in [overdraagbare vaardigheid] wil inzetten in een nieuwe richting.\nMet vriendelijke groet,\n[naam]",
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
          <article className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <h2 className="text-3xl font-black text-white">Openingszinnen voor een motivatiebrief</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
              {[
                "De combinatie van [functie] en de manier waarop [bedrijf] werkt, sluit sterk aan op waar ik de komende jaren aan wil bouwen.",
                "Wat mij direct aansprak in deze vacature is de mix van [taak] en [taak], omdat ik juist daar mijn ervaring wil inzetten.",
                "Met mijn achtergrond in [vakgebied] zie ik in deze functie een logische volgende stap richting [doel].",
                "Ik reageer op deze functie omdat ik graag werk in een omgeving waar [relevante waarde of aanpak] centraal staat.",
                "Deze vacature trok mijn aandacht omdat de gevraagde combinatie van [vaardigheid] en [vaardigheid] goed past bij mijn ervaring.",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-3xl font-black text-black">Veelgemaakte fouten</h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {[
                "Te algemeen schrijven",
                "Het cv herhalen zonder motivatie",
                "Geen link met bedrijf of functie",
                "Te lange brief",
                "Geen concrete voorbeelden geven",
              ].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <CareerHubLinks
          title="Meer routes rond solliciteren en cv bijwerken"
          items={[
            {
              href: "/tools/sollicitatiebrief-generator",
              title: "Sollicitatiebrief-generator",
              body: "Gebruik de tool als snelle eerste versie voor een motivatiebrief of sollicitatiebrief.",
            },
            {
              href: "/sollicitatiebrief-maken",
              title: "Sollicitatiebrief maken",
              body: "Lees de bredere hub als je nog twijfelt over opbouw, toon of type brief.",
            },
            {
              href: "/sollicitatiebrief-voorbeelden",
              title: "Sollicitatiebrief-voorbeelden",
              body: "Vergelijk complete voorbeeldbrieven voor meer inspiratie per situatie.",
            },
            {
              href: "/cv-maken",
              title: "Cv maken",
              body: "Bouw direct een cv die dezelfde vacature en functierichting ondersteunt.",
            },
            {
              href: "/cv-checken",
              title: "Cv checken",
              body: "Controleer of je cv inhoudelijk sterk genoeg is voordat je solliciteert.",
            },
            {
              href: "/cv-optimaliseren",
              title: "Cv optimaliseren",
              body: "Scherp je cv aan op ATS, vacaturekeywords en recruiterleesbaarheid.",
            },
            {
              href: "/tools/cv-vacature-match",
              title: "Cv-vacature-match",
              body: "Vergelijk je cv met de vacaturetekst als je brief en cv dezelfde richting moeten volgen.",
            },
            {
              href: "/tools/ats-cv-checker",
              title: "ATS CV checker",
              body: "Check of je cv technisch goed uitleesbaar blijft voor recruitersoftware.",
            },
          ]}
        />

        <CareerToCvCTA
          title="Maak ook een cv die past bij je motivatiebrief"
          text="Een sterke motivatiebrief werkt beter met een duidelijke, professionele cv erbij. Gebruik WerkCV om een nette, ATS-vriendelijke cv te maken voor dezelfde vacature."
          buttonLabel="Maak bijpassende cv"
          buttonHref="/cv-maken"
          supportLine="Gratis bouwen. Eenmalig EUR 4,99 bij PDF-download. Geen abonnement."
          eventName="cta_motivatiebrief_cv_click"
          ctaLocation="motivatiebrief:bottom_cv"
        />
      </main>

      <Footer />
    </div>
  );
}
