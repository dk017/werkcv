import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { siteUrl } from "@/lib/site-content";

const pageUrl = `${siteUrl}/cv-gids/cv-voorbeelden-per-situatie`;

const situations = [
  {
    title: "CV na ontslag",
    href: "/cv-tips/cv-na-ontslag",
    label: "Herstart",
    bestFor: "Na ontslag, reorganisatie of een periode van werkloosheid.",
    coreChange:
      "Je tijdlijn moet eerlijk blijven, maar je profieltekst en werkervaring moeten vooral laten zien wat je nu te bieden hebt en wat je in de tussenperiode hebt gedaan.",
    biggestMistake:
      "Ontslag proberen te verbergen of de periode zonder werk helemaal leeg laten.",
  },
  {
    title: "CV na loopbaanonderbreking of re-integratie",
    href: "/cv-tips/cv-na-loopbaanonderbreking",
    label: "Terugkeer",
    bestFor: "Na burnout, ziekte, mantelzorg, zwangerschapsverlof of re-integratie.",
    coreChange:
      "Je cv moet het gat professioneel kaderen en tegelijk laten zien dat je weer klaar bent voor werk. De nadruk ligt op terugkeer, niet op medische details.",
    biggestMistake:
      "Te veel uitleg geven over ziekte of herstel in plaats van je huidige inzetbaarheid te laten zien.",
  },
  {
    title: "CV na vaststellingsovereenkomst",
    href: "/cv-gids/cv-na-vaststellingsovereenkomst",
    label: "VSO",
    bestFor: "Na een vaststellingsovereenkomst of beëindiging met wederzijds goedvinden.",
    coreChange:
      "De cv-logica lijkt op ontslag, maar je wilt vooral juridisch en praktisch niets opschrijven wat je verhaal later onnodig bemoeilijkt.",
    biggestMistake:
      "De VSO zelf op je cv uitleggen in plaats van gewoon je tijdlijn en volgende stap sterk neerzetten.",
  },
  {
    title: "CV voor carrièreswitch",
    href: "/cv-tips/carriereswitch-cv",
    label: "Switch",
    bestFor: "Wie naar een ander vakgebied of een andere functierichting overstapt.",
    coreChange:
      "Overdraagbare vaardigheden, nieuwe richting en relevante bijscholing moeten prominenter worden dan je oude functietitels.",
    biggestMistake:
      "Je oude loopbaan chronologisch laten domineren zonder te vertalen naar het nieuwe vakgebied.",
  },
  {
    title: "CV als 50-plusser",
    href: "/cv-tips/cv-50-plus",
    label: "50+",
    bestFor: "Kandidaten die leeftijdsbias willen beperken en recente relevantie willen benadrukken.",
    coreChange:
      "Je cv moet strakker selecteren, moderne signalen geven en vooral recente impact en digitale vaardigheid zichtbaar maken.",
    biggestMistake:
      "Te ver teruggaan in werkervaring en onnodig veel leeftijdssignalen laten staan.",
  },
  {
    title: "CV voor detachering",
    href: "/cv-tips/cv-voor-detachering",
    label: "Projectmatig",
    bestFor: "Detacherings-, interim- en projectmatige rollen via bureau of opdrachtgever.",
    coreChange:
      "Projectcontext, resultaten, tools en beschikbaarheid moeten sneller leesbaar zijn dan op een standaard cv.",
    biggestMistake:
      "Te algemeen schrijven en niet duidelijk maken op welke projecten en inzetvorm jij past.",
  },
  {
    title: "CV zonder werkervaring",
    href: "/cv-tips/cv-zonder-werkervaring",
    label: "Starter",
    bestFor: "Studenten, starters en kandidaten zonder formele baanhistorie.",
    coreChange:
      "Je cv moet leunen op studie, stage, projecten, vrijwilligerswerk en vaardigheden in plaats van op klassieke werkervaring.",
    biggestMistake:
      "Een standaard werkervaringstructuur forceren terwijl je bewijsmateriaal ergens anders zit.",
  },
  {
    title: "CV met gat in je cv",
    href: "/cv-tips/gat-in-cv-uitleggen",
    label: "Gap",
    bestFor: "Wie een langere periode zonder werk of studie compact maar geloofwaardig moet toelichten.",
    coreChange:
      "Je legt niet alles uit, maar je geeft net genoeg context zodat de tijdlijn klopt en de aandacht weer naar je waarde gaat.",
    biggestMistake:
      "Te vaag blijven of juist te defensief en te uitgebreid uitleggen waarom de periode ontstond.",
  },
];

const routeSteps = [
  "Kies eerst de situatie die het dichtst op jouw cv-vraag zit.",
  "Pas daarna pas je profieltekst, werkervaring en eventuele gap-uitleg aan.",
  "Gebruik vervolgens een template dat past bij jouw doel: rust, scanbaarheid en recente relevantie.",
  "Werk tenslotte je bullets of profieltekst nog scherper uit met de tools als dat nodig is.",
];

const followUpLinks = [
  {
    href: "/templates",
    title: "Templates kiezen",
    body: "Gebruik een rustig template zodra de inhoud klopt en je de juiste situatie-logica hebt gekozen.",
  },
  {
    href: "/tools/profieltekst-generator",
    title: "Profieltekst generator",
    body: "Handig als je opening nog te algemeen is of niet past bij je nieuwe situatie.",
  },
  {
    href: "/tools/werkervaring-bullets",
    title: "Werkervaring bullets",
    body: "Nuttig als je taken nog niet genoeg bewijs of resultaat laten zien.",
  },
  {
    href: "/tools/career-change-advisor",
    title: "Career change advisor",
    body: "Speciaal nuttig als jouw situatie vooral draait om overstappen naar een andere richting.",
  },
];

const faqs = [
  {
    question: "Wanneer heb ik een ander type cv nodig dan een standaard cv?",
    answer:
      "Zodra je situatie afwijkt van een rechte, recente loopbaan. Denk aan ontslag, loopbaanonderbreking, carrièreswitch, 50-plus, detachering of weinig werkervaring. In die gevallen moet je cv andere accenten leggen.",
  },
  {
    question: "Welke situatie is het meest gevoelig op een cv?",
    answer:
      "Situaties met een onverklaard gat of met een veranderde richting trekken het snelst aandacht. Dat betekent niet dat ze problematisch zijn, maar wel dat je tijdlijn, profieltekst en bewijs zorgvuldiger moeten worden opgebouwd.",
  },
  {
    question: "Moet ik eerst mijn template kiezen of eerst mijn situatie?",
    answer:
      "Eerst je situatie. Een template lost geen inhoudelijk probleem op. De juiste cv-logica bepaalt wat je benadrukt, wat je inkort en wat je kort uitlegt. Pas daarna kies je de opmaak.",
  },
  {
    question: "Kan één cv werken voor al deze situaties?",
    answer:
      "Niet echt. Je basisgegevens kunnen hetzelfde blijven, maar de beste versie van je cv verschilt per situatie. Vooral profieltekst, volgorde, nadruk en formulering moeten worden aangepast.",
  },
  {
    question: "Welke volgende stap is na deze overzichtspagina het slimst?",
    answer:
      "Open eerst de verdiepende gids die bij jouw situatie past. Werk daarna je profieltekst of werkervaring uit en kies pas daarna een template of editorflow.",
  },
];

export const metadata: Metadata = {
  title: "8 CV-voorbeelden per situatie (2026) | Ontslag, 50+, re-integratie | WerkCV",
  description:
    "Niet elk cv hoort hetzelfde te zijn. Bekijk 8 situaties waarin je cv anders moet worden opgebouwd, van ontslag en re-integratie tot carrièreswitch, 50+ en detachering.",
  keywords: [
    "cv voorbeelden per situatie",
    "cv na ontslag",
    "cv na re-integratie",
    "cv na loopbaanonderbreking",
    "cv na vaststellingsovereenkomst",
    "cv maken carrièreswitch",
    "cv 50 plus nederland",
    "cv voor detachering",
    "cv zonder werkervaring",
    "gat in cv uitleggen",
  ],
  alternates: {
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "8 CV-voorbeelden per situatie | WerkCV",
    description:
      "Van ontslag tot carrièreswitch en 50+: zie welke cv-logica past bij jouw situatie en open daarna direct de juiste gids.",
    url: pageUrl,
    type: "article",
    locale: "nl_NL",
  },
};

export default function CvVoorbeeldenPerSituatiePage() {
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
        name: "CV gids",
        item: `${siteUrl}/cv-gids`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "CV voorbeelden per situatie",
        item: pageUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "8 cv-voorbeelden per situatie",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: situations.length,
    itemListElement: situations.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${siteUrl}${item.href}`,
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
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk templates
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Situation hub
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              8 cv-voorbeelden per situatie: ontslag, carrièreswitch, 50+ en meer
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Niet elk cv hoort hetzelfde te zijn. Een cv na ontslag vraagt andere accenten
              dan een cv na re-integratie, bij een carrièreswitch of als 50-plusser. Deze
              pagina laat per situatie zien wat je moet veranderen en waar je daarna verder moet.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Kies een template
              </Link>
              <Link
                href="/cv-gids"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Terug naar CV gids
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "8 veelvoorkomende cv-situaties",
                "Per situatie: wat moet veranderen",
                "Direct door naar de juiste gids",
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
            <h2 className="text-xl font-black text-black">Korte vuistregel</h2>
            <div className="mt-5 space-y-4 text-sm font-medium leading-relaxed text-slate-700">
              <p>
                Als je tijdlijn afwijkt, je richting verandert of je context gevoelig is,
                dan moet je cv meebewegen.
              </p>
              <p>
                De grootste fout is bijna altijd hetzelfde: een standaard cv gebruiken voor
                een niet-standaardsituatie.
              </p>
              <p>
                Kies dus eerst de juiste situatie-logica en pas daarna pas profieltekst,
                werkervaring, opmaak en tools aan.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vergelijk eerst
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Welke cv-situatie lijkt het meest op die van jou?
          </h2>
          <div className="mt-6 overflow-hidden border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-[0.95fr_1fr_1.1fr] border-b-4 border-black bg-black text-sm font-black text-white">
              <div className="px-4 py-3">Situatie</div>
              <div className="px-4 py-3">Beste voor</div>
              <div className="px-4 py-3">Wat verandert vooral</div>
            </div>
            {situations.map((situation) => (
              <Link
                key={situation.href}
                href={situation.href}
                className="grid grid-cols-[0.95fr_1fr_1.1fr] border-b border-black bg-white text-sm transition-colors hover:bg-yellow-50"
              >
                <div className="px-4 py-4">
                  <p className="font-black text-black">{situation.title}</p>
                  <p className="mt-1 text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                    {situation.label}
                  </p>
                </div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {situation.bestFor}
                </div>
                <div className="px-4 py-4 font-medium leading-relaxed text-slate-700">
                  {situation.coreChange}
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
            Wat moet er op je cv veranderen per situatie?
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {situations.map((situation, index) => (
              <article
                key={situation.href}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                      #{index + 1} · {situation.label}
                    </p>
                    <h3 className="mt-2 text-2xl font-black text-black">
                      {situation.title}
                    </h3>
                  </div>
                  <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black uppercase tracking-[0.15em] text-black">
                    Situatie
                  </span>
                </div>
                <div className="mt-5 border-2 border-black bg-[#FFFEF9] p-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    Best voor
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-black">
                    {situation.bestFor}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    Wat moet veranderen
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                    {situation.coreChange}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                    Grootste fout
                  </p>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                    {situation.biggestMistake}
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href={situation.href}
                    className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                  >
                    Open gids
                  </Link>
                  <Link
                    href="/templates"
                    className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                  >
                    Kies template
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Slimme route
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Zo gebruik je deze situatiepagina zonder te verdwalen
            </h2>
            <div className="mt-4 space-y-3">
              {routeSteps.map((step, index) => (
                <div key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-white bg-yellow-300 text-xs font-black text-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-200">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Daarna pas finetunen
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Tools en vervolgstappen
            </h2>
            <div className="mt-4 space-y-4">
              {followUpLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {item.body}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over cv’s per situatie
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
                Klaar om je situatie te vertalen naar een sterk cv?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Open eerst de juiste gids en werk daarna pas je cv echt af
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                De beste cv’s voor gevoelige of afwijkende situaties voelen niet generiek aan.
                Ze leggen precies de juiste nadruk op het juiste moment.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/templates"
                className="border-4 border-black bg-black px-5 py-3 text-center text-base font-black text-white"
              >
                Bekijk templates
              </Link>
              <Link
                href="/cv-gids"
                className="border-4 border-black bg-white px-5 py-3 text-center text-base font-black text-black"
              >
                Terug naar CV gids
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
