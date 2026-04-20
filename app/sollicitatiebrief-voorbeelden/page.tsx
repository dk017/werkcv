import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-content";

const pageUrl = `${siteUrl}/sollicitatiebrief-voorbeelden`;

const examples = [
  {
    title: "Algemeen sollicitatiebrief voorbeeld",
    href: "/sollicitatiebrief-voorbeeld",
    label: "Allround",
    bestFor: "Wie eerst de basisstructuur van opening, middenstuk en afsluiting wil zien.",
    tone: "Zakelijk en breed inzetbaar",
    body: "De beste start als je nog niet weet welk specialistisch voorbeeld het dichtst op jouw situatie zit. Je ziet direct hoe een overtuigende brief is opgebouwd zonder al in een specifieke functie te duiken.",
    notFor: "Mensen die al weten dat ze een stage-, starters- of vakinhoudelijk voorbeeld nodig hebben.",
  },
  {
    title: "Administratief medewerker",
    href: "/sollicitatiebrief-voorbeeld-administratief-medewerker",
    label: "Functie",
    bestFor: "Rollen waarin structuur, foutarm werken en overzicht centraal staan.",
    tone: "Rustig, precies en betrouwbaar",
    body: "Sterk voorbeeld als je wilt laten zien dat je processen bewaakt, accuraat werkt en administratieve taken zichtbaar verbetert.",
    notFor: "Functies waar commerciële slagkracht of creatieve output zwaarder wegen dan nauwkeurigheid.",
  },
  {
    title: "Klantenservice",
    href: "/sollicitatiebrief-voorbeeld-klantenservice",
    label: "Functie",
    bestFor: "Servicegerichte rollen met veel klantcontact via telefoon, mail of chat.",
    tone: "Empathisch maar resultaatgericht",
    body: "Goed bruikbaar als je service, tempo en klanttevredenheid met concrete voorbeelden wilt combineren in één brief.",
    notFor: "Backoffice- of supportfuncties zonder directe klantinteractie.",
  },
  {
    title: "Verpleegkundige",
    href: "/sollicitatiebrief-voorbeeld-verpleegkundige",
    label: "Functie",
    bestFor: "Zorgrollen waarin verantwoordelijkheid, kwaliteit en patiëntcontext belangrijk zijn.",
    tone: "Professioneel, betrokken en zorgvuldig",
    body: "Het juiste voorbeeld wanneer je klinische ervaring, teamwerk en kwaliteit van zorg compact en geloofwaardig wilt neerzetten.",
    notFor: "Algemene welzijns- of ondersteunende functies zonder verpleegkundige verantwoordelijkheid.",
  },
  {
    title: "Marketing",
    href: "/sollicitatiebrief-voorbeeld-marketing",
    label: "Functie",
    bestFor: "Marketingrollen waarin campagnes, content en commerciële impact tellen.",
    tone: "Energiek maar bewijsgericht",
    body: "Nuttig als je wilt laten zien dat je creativiteit en meetbaar resultaat samenbrengt, zonder in vage marketingtaal te vervallen.",
    notFor: "Operationele functies zonder campagneresultaten of kanaalverantwoordelijkheid.",
  },
  {
    title: "Office manager",
    href: "/sollicitatiebrief-voorbeeld-office-manager",
    label: "Functie",
    bestFor: "Brede coördinatierollen waarin overzicht, organisatie en rust zwaar wegen.",
    tone: "Stevig, ordelijk en proactief",
    body: "Goede keuze als je meerdere verantwoordelijkheden tegelijk draagt en wilt laten zien dat jij structuur brengt in de dagelijkse operatie.",
    notFor: "Functies die vooral specialistisch of inhoudelijk technisch zijn.",
  },
  {
    title: "Software ontwikkelaar",
    href: "/sollicitatiebrief-voorbeeld-software-ontwikkelaar",
    label: "Functie",
    bestFor: "Developerrollen waar stackmatch, technische impact en teamfit zichtbaar moeten worden.",
    tone: "Nuchter, concreet en technisch relevant",
    body: "Sterk voor kandidaten die niet alleen hun technologie willen noemen, maar ook willen laten zien wat ze hebben gebouwd en verbeterd.",
    notFor: "Niet-technische product- of projectrollen waar code niet centraal staat.",
  },
  {
    title: "Verkoopmedewerker",
    href: "/sollicitatiebrief-voorbeeld-verkoopmedewerker",
    label: "Functie",
    bestFor: "Retail- en salesomgevingen waar klantcontact en targetbijdrage samenkomen.",
    tone: "Actief, commercieel en toegankelijk",
    body: "Handig als je klantgerichtheid, productkennis en winkelvloerresultaten kort en overtuigend wilt tonen.",
    notFor: "B2B-accountrollen of specialistische salesfuncties met lange dealcycli.",
  },
  {
    title: "Horeca medewerker",
    href: "/sollicitatiebrief-voorbeeld-horeca-medewerker",
    label: "Functie",
    bestFor: "Horecarollen waar tempo, gastvrijheid en flexibiliteit belangrijk zijn.",
    tone: "Direct, energiek en praktisch",
    body: "Goed voorbeeld voor functies waarin je snel wilt laten zien dat je onder druk blijft presteren en servicegericht blijft werken.",
    notFor: "Formelere kantoorrollen waar hospitality niet de kern van de functie is.",
  },
  {
    title: "Magazijnmedewerker",
    href: "/sollicitatiebrief-voorbeeld-magazijnmedewerker",
    label: "Functie",
    bestFor: "Logistieke functies met focus op tempo, veiligheid en nauwkeurigheid.",
    tone: "Praktisch, helder en no-nonsense",
    body: "Sterke keuze als je taken als orderpicken, voorraadbeheer en samenwerking op de werkvloer concreet wilt benoemen.",
    notFor: "Kantoorfuncties of rollen waar klantcommunicatie belangrijker is dan logistieke uitvoering.",
  },
  {
    title: "Stage voorbeeld",
    href: "/motivatiebrief-stage-voorbeeld",
    label: "Situatie",
    bestFor: "Studenten en starters die nog vooral studie, projecten en stage-ervaring meenemen.",
    tone: "Leergierig, concreet en toekomstgericht",
    body: "Dit voorbeeld helpt als je nog weinig formele werkervaring hebt maar wel overtuigend wilt laten zien wat je al kunt en waarom je snel leert.",
    notFor: "Ervaren professionals die beter een rol- of sectorspecifiek voorbeeld kunnen kiezen.",
  },
  {
    title: "Zonder werkervaring",
    href: "/motivatiebrief-zonder-werkervaring",
    label: "Situatie",
    bestFor: "Kandidaten die vooral school, projecten, vrijwilligerswerk of bijbanen als bewijs hebben.",
    tone: "Eerlijk, ambitieus en bewijsgericht",
    body: "Belangrijk voorbeeld als je wilt voorkomen dat je brief leeg of te algemeen aanvoelt terwijl je nog weinig officiële ervaring hebt.",
    notFor: "Mensen met meerdere jaren relevante werkervaring die juist hun resultaten moeten benadrukken.",
  },
  {
    title: "Open sollicitatie",
    href: "/open-sollicitatie-brief",
    label: "Situatie",
    bestFor: "Wie zonder concrete vacature toch gericht een bedrijf wil benaderen.",
    tone: "Initiatiefrijk en gericht",
    body: "Goede route als je je motivatie en toegevoegde waarde helder wilt maken zonder terug te vallen op vacaturetekst of functiebeschrijving.",
    notFor: "Gewone sollicitaties op een bestaande vacature met duidelijke functie-eisen.",
  },
  {
    title: "In het Engels",
    href: "/sollicitatiebrief-in-engels",
    label: "Taal",
    bestFor: "Internationale bedrijven of Engelstalige vacatures in Nederland.",
    tone: "Professional, concise and role-specific",
    body: "Gebruik dit voorbeeld zodra de vacature of bedrijfstaal Engels is. Het helpt je om Nederlandse brieflogica niet te letterlijk te vertalen.",
    notFor: "Nederlandstalige vacatures waar een Nederlandse brief verwacht wordt.",
  },
  {
    title: "Korte motivatiebrief",
    href: "/korte-motivatiebrief-voorbeeld",
    label: "Format",
    bestFor: "Vacatures waarbij je compact en snel tot de kern wilt komen.",
    tone: "Compact en scherp",
    body: "Sterk als je al duidelijke relevante ervaring hebt en in weinig woorden overtuigend wilt schrijven zonder aan inhoud te verliezen.",
    notFor: "Situaties waarin je veel context moet geven, zoals een carrièreswitch of open sollicitatie.",
  },
  {
    title: "Motivatiebrief voorbeeld",
    href: "/motivatiebrief-voorbeeld",
    label: "Motivatie",
    bestFor: "Kandidaten die vooral hun motivatie en inhoudelijke fit beter willen formuleren.",
    tone: "Motiverend, maar nog steeds concreet",
    body: "Goede keuze als je brief te vlak voelt en je beter wilt uitleggen waarom juist deze rol en dit bedrijf logisch zijn voor jouw volgende stap.",
    notFor: "Mensen die vooral op zoek zijn naar functiegerichte zinnen per beroep.",
  },
];

const usageSteps = [
  "Kies eerst het voorbeeld dat het dichtst op jouw functie of situatie zit.",
  "Neem de opbouw over, maar vervang standaardzinnen door jouw eigen bewijs en resultaten.",
  "Gebruik woorden uit de vacature voor functietitel, skills en context.",
  "Werk je brief daarna af in de generator zodat toon, lengte en structuur kloppen.",
];

const mistakes = [
  {
    title: "Een voorbeeld letterlijk kopieren",
    body: "Voorbeelden werken alleen als kapstok. Recruiters herkennen standaardtekst snel zodra bewijs, functietitel en toon niet echt aansluiten op de vacature.",
  },
  {
    title: "Te algemeen openen",
    body: "Een opening die bij elk bedrijf past, overtuigt niemand. Noem direct de rol, het bedrijf en je eerste inhoudelijke match.",
  },
  {
    title: "Motivatie noemen zonder bewijs",
    body: "Woorden als gemotiveerd, leergierig en enthousiast werken pas als je ze onderbouwt met resultaten, projecten of verantwoordelijkheid.",
  },
  {
    title: "Het verkeerde voorbeeld kiezen",
    body: "Een compact voorbeeld werkt minder goed bij een carrièreswitch of open sollicitatie. Kies daarom eerst het juiste type brief en schrijf pas daarna.",
  },
];

const faqs = [
  {
    question: "Wat is het beste sollicitatiebrief voorbeeld?",
    answer:
      "Dat hangt af van je situatie. Voor de meeste mensen is een algemeen sollicitatiebrief voorbeeld de beste start, maar studenten, starters, open sollicitaties en Engelstalige vacatures vragen vaak om een specialistischer voorbeeld.",
  },
  {
    question: "Wat is het verschil tussen een sollicitatiebrief voorbeeld en motivatiebrief voorbeeld?",
    answer:
      "In de praktijk overlappen ze sterk. Een sollicitatiebrief voorbeeld helpt meestal meer op structuur en functie-fit, terwijl een motivatiebrief voorbeeld extra nadruk legt op waarom juist deze rol en dit bedrijf bij jou passen.",
  },
  {
    question: "Kan ik een sollicitatiebrief voorbeeld direct gebruiken?",
    answer:
      "Gebruik het als basis, niet als eindtekst. Neem de structuur, toon en soort bewijs over, maar vervang de inhoud altijd door jouw eigen resultaten, context en reden om juist daar te solliciteren.",
  },
  {
    question: "Welk sollicitatiebrief voorbeeld past het best zonder werkervaring?",
    answer:
      "Begin dan bij het voorbeeld voor stage of zonder werkervaring. Die routes helpen je om studie, projecten, bijbanen en leervermogen geloofwaardig als bewijs te gebruiken.",
  },
  {
    question: "Wat als ik in het Engels moet solliciteren?",
    answer:
      "Gebruik dan een Engels voorbeeld. Een Nederlandse brief letterlijk vertalen levert vaak onnatuurlijke formuleringen op. De Engelse route helpt je om korter en internationaler te schrijven.",
  },
];

export const metadata: Metadata = {
  title: "15 sollicitatiebrief voorbeelden in 2026 | Per functie en situatie | WerkCV",
  description:
    "Bekijk 15 sollicitatiebrief voorbeelden voor verschillende functies en situaties in Nederland. Inclusief beste gebruik, toon, valkuilen en directe links naar diepere voorbeeldpagina's.",
  keywords: [
    "sollicitatiebrief voorbeelden",
    "sollicitatiebrief voorbeeld",
    "motivatiebrief voorbeelden",
    "motivatiebrief voorbeeld",
    "sollicitatiebrief voorbeeld per functie",
    "sollicitatiebrief voorbeeld stage",
    "sollicitatiebrief zonder werkervaring",
    "sollicitatiebrief in engels",
    "korte motivatiebrief voorbeeld",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "15 sollicitatiebrief voorbeelden | WerkCV",
    description:
      "Van stage tot software developer: vergelijk 15 sollicitatiebrief voorbeelden per functie en situatie en kies direct de juiste route.",
    url: pageUrl,
    type: "article",
    locale: "nl_NL",
  },
};

export default function SollicitatiebriefVoorbeeldenPage() {
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
        name: "Sollicitatiebrief voorbeelden",
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "15 sollicitatiebrief voorbeelden per functie en situatie",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: examples.length,
    itemListElement: examples.map((example, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: example.title,
      url: `${siteUrl}${example.href}`,
    })),
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <FAQJsonLd questions={faqs} />

      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Listicle hub
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              15 sollicitatiebrief voorbeelden per functie en situatie
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoek je niet zomaar een sollicitatiebrief voorbeeld, maar het juiste
              voorbeeld voor jouw situatie? Gebruik deze pagina als overzicht: per
              voorbeeld zie je voor wie het werkt, welke toon past en wanneer je beter
              een andere route kiest.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct je brief
              </Link>
              <Link
                href="/sollicitatiebrief-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst de hele workflow bekijken
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "15 voorbeelden in 1 overzicht",
                "Per functie, situatie en taal",
                "Direct door naar de juiste verdiepende pagina",
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
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Snel antwoord
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Welke route past meestal het best?
            </h2>
            <div className="mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                Begin met het algemene voorbeeld als je vooral de structuur zoekt.
              </p>
              <p>
                Kies een rol-specifiek voorbeeld als je al weet welke functie je
                ambieert.
              </p>
              <p>
                Kies een situatievoorbeeld als je stage loopt, weinig ervaring hebt
                of open solliciteert.
              </p>
              <p>
                Schakel naar Engels zodra de vacaturetaal of bedrijfstaal Engels is.
              </p>
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Liever eerst 1 basisvoorbeeld? Start hier
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vergelijk eerst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Snel overzicht van de beste sollicitatiebrief voorbeelden
          </h2>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-[1.2fr_1fr_0.8fr] border-b-4 border-black bg-black text-sm font-black text-white">
              <div className="px-4 py-3">Voorbeeld</div>
              <div className="px-4 py-3">Beste voor</div>
              <div className="px-4 py-3">Toon</div>
            </div>
            {examples.map((example, index) => (
              <Link
                key={example.href}
                href={example.href}
                className="grid grid-cols-[1.2fr_1fr_0.8fr] border-b border-black bg-white text-sm transition-colors hover:bg-yellow-50"
              >
                <div className="px-4 py-4">
                  <p className="font-black text-black">
                    {index + 1}. {example.title}
                  </p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                    {example.label}
                  </p>
                </div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {example.bestFor}
                </div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {example.tone}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            De lijst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welk sollicitatiebrief voorbeeld moet jij kiezen?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {examples.map((example, index) => (
              <article
                key={example.href}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      #{index + 1} · {example.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-black">
                      {example.title}
                    </h3>
                  </div>
                  <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black uppercase tracking-[0.15em] text-black">
                    Voorbeeld
                  </span>
                </div>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {example.body}
                </p>
                <div className="mt-5 grid gap-4">
                  <div className="border-2 border-black bg-[#FFFEF9] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      Best voor
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                      {example.bestFor}
                    </p>
                  </div>
                  <div className="border-2 border-black bg-[#FFFEF9] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      Wanneer niet gebruiken
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                      {example.notFor}
                    </p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={example.href}
                    className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                  >
                    Open dit voorbeeld
                  </Link>
                  <Link
                    href="/tools/sollicitatiebrief-generator"
                    className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                  >
                    Gebruik in generator
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fouten
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Waarom voorbeeldbrieven vaak alsnog zwak uitpakken
            </h2>
            <div className="mt-4 space-y-4">
              {mistakes.map((mistake) => (
                <div key={mistake.title}>
                  <p className="text-sm font-black text-white">{mistake.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-200">
                    {mistake.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slim gebruiken
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Zo zet je een voorbeeld om in jouw eigen brief
            </h2>
            <div className="mt-5 space-y-4">
              {usageSteps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <div className="space-y-3">
                <Link
                  href="/sollicitatiebrief-maken"
                  className="block text-sm font-black text-black underline decoration-2 underline-offset-4"
                >
                  Eerst je hele briefworkflow bekijken
                </Link>
                <Link
                  href="/motivatiebrief-schrijven"
                  className="block text-sm font-black text-black underline decoration-2 underline-offset-4"
                >
                  Of direct naar motivatiebrief schrijven
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over sollicitatiebrief voorbeelden
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
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
                Klaar om jouw versie te schrijven?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kies een voorbeeld als startpunt en maak daarna je eigen brief
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik de juiste voorbeeldpagina voor richting, maar werk je uiteindelijke
                tekst altijd af op basis van jouw vacature, ervaring en resultaten.
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
                href="/sollicitatiebrief-maken"
                className="border-4 border-black bg-white px-5 py-3 text-center text-base font-black text-black"
              >
                Naar briefhub
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
