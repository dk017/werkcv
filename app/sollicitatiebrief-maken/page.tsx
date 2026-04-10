import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd, HowToJsonLd } from "@/components/seo/JsonLd";
import { cvDownloadPrice, siteUrl } from "@/lib/site-content";

const pageUrl = `${siteUrl}/sollicitatiebrief-maken`;

const routeCards = [
  {
    href: "/motivatiebrief-schrijven",
    title: "Schrijfworkflow",
    body: "Gebruik deze route als je de hele brief stap voor stap wilt opbouwen en aanscherpen.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld",
    title: "Voorbeelden",
    body: "Open voorbeeldblokken voor opening, middenstuk en afsluiting zodra je vooral inspiratie zoekt.",
  },
  {
    href: "/sollicitatiebrief-beginnen",
    title: "Openingszinnen",
    body: "Pak eerst je eerste alinea aan als je brief te vlak of te standaard opent.",
  },
  {
    href: "/motivatiebrief-zonder-werkervaring",
    title: "Zonder werkervaring",
    body: "Leun op studie, stage, projecten en bijbanen als je nog geen sterke werkhistorie hebt.",
  },
  {
    href: "/open-sollicitatie-brief",
    title: "Open sollicitatie",
    body: "Gebruik een andere brieflogica wanneer je zonder concrete vacature schrijft.",
  },
  {
    href: "/sollicitatiebrief-in-engels",
    title: "In het Engels",
    body: "Schakel naar English cover letter regels als de vacature of bedrijfstaal Engels is.",
  },
];

const makingSteps = [
  {
    name: "Lees de vacature en markeer de echte eisen",
    text: "Haal functietitel, belangrijke skills, sectorcontext en toon uit de vacature. Je brief moet daarop reageren, niet op een algemeen idee van de rol.",
  },
  {
    name: "Kies 1 of 2 bewijzen die echt relevant zijn",
    text: "Gebruik meetbare resultaten, stage-output, projectwerk of praktijkvoorbeelden die direct laten zien waarom jij past bij deze functie.",
  },
  {
    name: "Bouw je brief in vier compacte blokken",
    text: "Werk met opening, bewijs, bedrijfsfit en afsluiting. Dat houdt je brief scanbaar en voorkomt dat je CV-zinnen herhaalt.",
  },
  {
    name: "Maak de brief bedrijfsspecifiek",
    text: "Noem het bedrijf, de rol en een concrete reden waarom juist deze omgeving logisch is voor jouw volgende stap.",
  },
  {
    name: "Zet de brief direct om in een nette eindversie",
    text: "Werk je tekst af in de generator of editor en controleer daarna toon, lengte en aansluiting met je CV voordat je verstuurt.",
  },
];

const structureBlocks = [
  {
    title: "Opening",
    body: "Noem direct de functie, het bedrijf en je eerste inhoudelijke match. Vermijd een losse zin die naar elk bedrijf gestuurd kan worden.",
    example:
      "Met enthousiasme solliciteer ik naar de functie van [functietitel] bij [bedrijfsnaam], omdat deze rol direct aansluit op mijn ervaring met [relevant domein] en mijn motivatie om [type bijdrage] te leveren.",
  },
  {
    title: "Bewijs",
    body: "Kies 1 of 2 prestaties, projecten of verantwoordelijkheden die de vacature-eisen echt ondersteunen.",
    example:
      "In mijn huidige rol heb ik [resultaat] bereikt door [aanpak]. Juist die combinatie van [vaardigheid] en [vaardigheid] wil ik inzetten binnen deze functie.",
  },
  {
    title: "Bedrijfsfit",
    body: "Laat zien waarom dit bedrijf inhoudelijk bij jou past. Geen algemene complimenten, maar een korte concrete reden.",
    example:
      "Wat mij aanspreekt in [bedrijfsnaam] is [inhoudelijke reden uit vacature, missie of teamcontext]. Dat sluit goed aan op hoe ik zelf werk en wil bijdragen.",
  },
  {
    title: "Afsluiting",
    body: "Rond zakelijk en rustig af. Nodig uit tot een gesprek zonder overdreven toon of lange herhaling.",
    example:
      "Graag licht ik mijn motivatie en ervaring in een gesprek verder toe. Dank voor uw tijd en overweging.",
  },
];

const roleExampleLinks = [
  {
    href: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
    title: "Administratief medewerker",
    body: "Voor rustige, nauwkeurige rollen waar structuur en foutarm werken centraal staan.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld-klantenservice",
    title: "Klantenservice",
    body: "Voor servicegerichte rollen waar tempo, toon en klantresultaten zwaar wegen.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld-verpleegkundige",
    title: "Verpleegkundige",
    body: "Voor zorgrollen waar kwaliteit, verantwoordelijkheid en patiëntcontext tellen.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld-marketing",
    title: "Marketing",
    body: "Voor rollen waar campagnes, content en commerciële impact concreet moeten worden gemaakt.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld-office-manager",
    title: "Office manager",
    body: "Voor brede coördinatierollen waarin rust, overzicht en operationele grip centraal staan.",
  },
  {
    href: "/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
    title: "Software ontwikkelaar",
    body: "Voor technische rollen waar stackmatch, bouwimpact en teamfit duidelijk moeten zijn.",
  },
];

const qualityRules = [
  "Houd je brief meestal op 3 tot 5 korte alinea's en maximaal ongeveer 1 A4.",
  "Gebruik de exacte functietitel en natuurlijke keywords uit de vacature.",
  "Laat bewijs zwaarder wegen dan algemene woorden als gemotiveerd of leergierig.",
  "Zorg dat brief en CV dezelfde richting, taal en professionaliteit uitstralen.",
];

const faqs = [
  {
    question: "Hoe maak je een goede sollicitatiebrief?",
    answer:
      "Een goede sollicitatiebrief koppelt de vacature aan jouw meest relevante bewijs, blijft kort en laat zien waarom juist dit bedrijf logisch is voor jouw volgende stap.",
  },
  {
    question: "Wat moet er in een sollicitatiebrief staan?",
    answer:
      "Minimaal een sterke opening, 1 of 2 relevante bewijsblokken, een korte reden waarom het bedrijf past en een professionele afsluiting met uitnodiging voor een gesprek.",
  },
  {
    question: "Hoe lang moet een sollicitatiebrief zijn?",
    answer:
      "Voor de meeste sollicitaties werkt een halve tot maximaal een hele A4 het best. Richt je op 3 tot 5 korte alinea's in plaats van een lange tekstmuur.",
  },
  {
    question: "Wat is het verschil tussen een motivatiebrief en sollicitatiebrief?",
    answer:
      "In Nederland worden de termen vaak door elkaar gebruikt. Praktisch gezien gaat het meestal om dezelfde brief: motivatie plus geschiktheid voor een concrete functie of bedrijfscontext.",
  },
  {
    question: "Kan ik eerst een voorbeeld gebruiken en daarna de generator?",
    answer:
      "Ja. Dat is vaak de slimste route: pak eerst de juiste structuur of voorbeeldblokken en zet die daarna om in een persoonlijke eindversie in de generator.",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief maken in 2026: opbouw, voorbeelden en generator | WerkCV",
  description:
    "Leer stap voor stap een sollicitatiebrief maken met opbouw, voorbeeldblokken, specialistische routes en een directe generatorflow voor Nederlandse vacatures.",
  keywords: [
    "sollicitatiebrief maken",
    "sollicitatiebrief schrijven",
    "hoe maak je een sollicitatiebrief",
    "goede sollicitatiebrief",
    "sollicitatiebrief opbouw",
    "motivatiebrief maken",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
};

export default function SollicitatiebriefMakenPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sollicitatiebrief maken",
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <FAQJsonLd questions={faqs} />
      <HowToJsonLd
        name="Sollicitatiebrief maken in 5 stappen"
        description="Praktische workflow om een sollicitatiebrief te maken voor Nederlandse vacatures."
        steps={makingSteps}
      />

      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/tools/sollicitatiebrief-generator"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Open generator
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Hub: sollicitatiebrief maken
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief maken: van opening tot verzendklare brief
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op sollicitatiebrief maken wil meestal niet alleen een tool of alleen een
              voorbeeld. Je wilt weten hoe een goede brief is opgebouwd, welke route bij jouw
              situatie past en hoe je daarna snel een nette eindversie maakt. Deze pagina is de
              centrale ingang voor die hele briefcluster.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct je brief
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst voorbeelden bekijken
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "Kies de juiste briefroute",
                "Stap-voor-stap structuur",
                "Direct door naar generator",
              ].map((item) => (
                <div
                  key={item}
                  className="border-3 border-black bg-white px-4 py-3 text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat deze hub direct oplost</h2>
            <div className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Je ziet welke briefroute past bij jouw situatie in plaats van te verdwalen tussen losse pagina&apos;s.</p>
              <p>Je krijgt een vaste schrijfstructuur die ook werkt zonder loze standaardzinnen.</p>
              <p>Je schakelt snel door naar specialistische routes zoals open sollicitatie of Engels.</p>
              <p>Je rondt daarna je brief en CV in dezelfde flow af zonder abonnement.</p>
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-maken-zonder-abonnement"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: CV maken zonder abonnement
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Kies je route
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke briefpagina heb je nu echt nodig?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {routeCards.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1"
              >
                <h3 className="text-xl font-black text-black">{route.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{route.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief maken in 5 praktische stappen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {makingSteps.map((step, index) => (
              <article
                key={step.name}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                  Stap {index + 1}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">{step.name}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Briefopbouw
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            De vier blokken die vrijwel elke goede brief nodig heeft
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {structureBlocks.map((block) => (
              <article
                key={block.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{block.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{block.body}</p>
                <div className="mt-4 border-2 border-black bg-[#FFFEF9] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    Voorbeeld
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-black">{block.example}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Kwaliteitslat
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Een sterke brief wint op relevantie, niet op lengte
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {qualityRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Volgende stap
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Rond je brief af en laat je CV mee bewegen
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
              Je brief wordt sterker als je CV dezelfde richting volgt. Gebruik daarom dezelfde
              functietitel, taal en bewijslogica in beide documenten en werk daarna verder in de
              editor of templateflow.
            </p>
            <div className="mt-5 space-y-4">
              <Link
                href="/editor"
                className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Open CV editor</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                  Bouw je CV direct naast je brief en stem beide documenten op elkaar af.
                </p>
              </Link>
              <Link
                href="/prijzen"
                className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
              >
                <p className="text-sm font-black text-black">Prijs en downloadmodel</p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                  WerkCV laat je gratis starten en rekent pas {cvDownloadPrice.display} per CV bij
                  download, zonder maandmodel.
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Role-specifieke voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Pak een voorbeeld dat dichter op jouw vacature zit
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roleExampleLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-y-1"
              >
                <h3 className="text-lg font-black text-black">{item.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over sollicitatiebrief maken
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar om je brief af te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Zet je gekozen route nu om in een brief die je echt kunt versturen
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start in de generator als je al genoeg richting hebt, of open eerst een specialistische
                route als je nog vastloopt op opening, voorbeeld, Engels of startersbewijs.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-black px-5 py-3 text-center text-base font-black text-white"
              >
                Open generator
              </Link>
              <Link
                href="/motivatiebrief-schrijven"
                className="border-4 border-black bg-white px-5 py-3 text-center text-base font-black text-black"
              >
                Naar schrijfworkflow
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
