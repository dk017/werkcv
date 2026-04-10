import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import B2BLeadForm from "@/components/b2b/B2BLeadForm";
import { FAQJsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";

const painPoints = [
  {
    title: "Minder handmatig knip- en plakwerk",
    body:
      "Kleine bureaus verliezen snel uren aan opmaak, Word-fouten en het telkens opnieuw netjes zetten van bron-CV's voordat ze voorstelbaar zijn voor een opdrachtgever.",
  },
  {
    title: "Klantklaar zonder rommelig bronbestand",
    body:
      "Opdrachtgevers willen geen rommelige PDF of losse Word-opmaak. Ze willen een rustige, professionele versie in jouw stijl of die van de klant.",
  },
  {
    title: "Privacy en redactie vooraf helder",
    body:
      "In de Nederlandse markt spelen contactgegevens, redactie en retentie vaak meteen mee. Daarom spreken we dat in de pilot vooraf expliciet af in plaats van het weg te wuiven.",
  },
  {
    title: "Ook bruikbaar voor internationale kandidaten",
    body:
      "WerkCV heeft al Nederlandse en Engelstalige CV-routes. Dat helpt bureaus die zowel lokale kandidaten als internationals of expats voorstellen.",
  },
];

const pilotIncludes = [
  "Pilot vanaf EUR249 per maand",
  "Losse volume-route op aanvraag vanaf EUR5 per client-ready CV",
  "1 branded route in jouw bureau-uitstraling of die van de opdrachtgever",
  "Handmatige onboarding en eerste template-setup",
  "Factuur in plaats van consumenten-checkout",
  "Fair-use en retentie-afspraken vooraf",
  "Support tijdens de pilot, zonder enterprise theater",
];

const responseExpectations = [
  "Verwachte eerste reactie: binnen 1 tot 2 werkdagen",
  "Geen generieke demo-sequence of automatische salesreeks",
  "Bij duidelijke mismatch zeggen we dat ook snel en eerlijk",
];

const roiExamples = [
  {
    volume: "10 CV's per maand",
    minutes: "200 min minder handwerk",
    hours: "3,3 uur",
  },
  {
    volume: "20 CV's per maand",
    minutes: "400 min minder handwerk",
    hours: "6,7 uur",
  },
  {
    volume: "40 CV's per maand",
    minutes: "800 min minder handwerk",
    hours: "13,3 uur",
  },
];

const fitCards = [
  {
    title: "Goede eerste fit",
    items: [
      "Boutique recruitmentbureaus en solo recruiters",
      "Detacherings- en consultancybureaus met klantpresentaties",
      "Executive search, interim-bemiddeling en outplacement",
      "Teams die bron-CV's sneller klantklaar willen maken zonder zwaar softwaretraject",
    ],
    tone: "bg-white",
  },
  {
    title: "Nog geen fit voor deze pilot",
    items: [
      "Enterprise aanbestedingen met uitgebreide security review",
      "Volledige ATS-integraties en multi-workspace beheer vanaf dag één",
      "Coachpraktijken die vooral een doorverwijspagina voor individuele cliënten zoeken",
      "Teams die nu al harde unlimited-SLA's of maatwerkprocurement nodig hebben",
    ],
    tone: "bg-rose-100",
  },
];

const pilotSteps = [
  {
    title: "1. Intake op workflow, type kandidaten en volume",
    body:
      "We kijken eerst naar jouw type kandidaten, hoe bron-CV's binnenkomen, welke klantpresentatie je nodig hebt en hoeveel kandidaat-CV's je maandelijks wilt verwerken.",
  },
  {
    title: "2. Eerste client-ready route opzetten",
    body:
      "Daarna richten we een eerste template-route in die past bij je bureau-uitstraling of die van de opdrachtgever, inclusief afspraken over redactie en output.",
  },
  {
    title: "3. Pilot draaien met echte kandidaatcases",
    body:
      "Je test de workflow met echte kandidaatcases in plaats van direct breed uit te rollen. Zo zien we waar de tijdswinst, kwaliteitswinst en frictie echt zitten.",
  },
  {
    title: "4. Beslissen: opschalen of niet",
    body:
      "Pas na echte usage bepalen we of een bredere agency-workspace logisch is, of dat een lichtere volume-afspraak beter past.",
  },
];

const comparisonRows = [
  {
    title: "Start klein: betaal per CV",
    body:
      "Voor bureaus die nog niet weten of dit terugkerend werk is. Je test met echte dossiers en betaalt alleen voor client-ready output, zonder direct een maandmodel vast te trekken.",
  },
  {
    title: "Als het terugkomt: pilot per maand",
    body:
      "Voor bureaus die elke maand hetzelfde opmaak- en klantpresentatiegedoe terugzien. Dan is een maandpilot logischer dan losse CV-prijzen, maar nog steeds zonder groot platformproject.",
  },
];

const agencyProof = [
  {
    title: "Dutch-first templatebasis staat al live",
    body:
      "WerkCV draait al op een Nederlandse CV-editor met ATS-vriendelijke templates. De agency-pilot gebruikt die bestaande basis in plaats van een losse demo zonder echte productlaag.",
  },
  {
    title: "Smalle use case in plaats van brede B2B-belofte",
    body:
      "We focussen eerst op bron-CV naar client-ready document. Niet op een compleet ATS-vervangend platform. Dat maakt de pilot scherper en geloofwaardiger.",
  },
  {
    title: "Engelse en expat-routes zijn al aanwezig",
    body:
      "Naast Dutch-first CV-routes zijn er ook Engelse en expat-assets. Dat helpt bureaus die zowel Nederlandse kandidaten als internationals begeleiden.",
  },
  {
    title: "Privacy- en retentieafspraken horen bij de intake",
    body:
      "In de pilot maken we vooraf expliciet afspraken over opslag, retentie en eventuele redactie van persoonsgegevens. Dat past beter bij de Nederlandse markt dan een vage 'komt goed'-belofte.",
  },
];

const proofRoadmap = [
  "Hoeveel kandidaat-CV's een pilotteam in de eerste maand echt door de route haalde",
  "Of pay-per-CV of maandpilot beter aansloot op de workflow",
  "Welke redactie- en privacyafspraken vooraf cruciaal bleken",
  "Welke tijdswinst recruiters of consultants werkelijk terugzagen per dossier",
];

const agencyAudienceOptions = [
  { value: "boutique-recruitment", label: "Boutique recruitmentbureau" },
  { value: "detachering", label: "Detacherings- of consultancybureau" },
  { value: "executive-search", label: "Executive search of interim-bemiddeling" },
  { value: "staffing", label: "Uitzend- of staffingpartij" },
  { value: "outplacement", label: "Outplacement of mobiliteit" },
  { value: "other", label: "Andere B2B kandidaatflow" },
];

const faqs = [
  {
    question: "Is dit al een volledig self-serve agency-platform?",
    answer:
      "Nee. Dit is bewust een pilot-aanpak. We starten klein met onboarding, een branded template en heldere afspraken, zodat we eerst echte betaalde vraag valideren.",
  },
  {
    question: "Kan ik klein beginnen zonder direct een maandabonnement?",
    answer:
      "Ja. Als je nog geen terugkerend volume durft vast te leggen, kunnen we eerst een kleinere volume-afspraak of pay-per-CV test bespreken. Het maandmodel is pas logisch als dit echt terugkomt in je workflow.",
  },
  {
    question: "Voor wie is deze pilot het meest geschikt?",
    answer:
      "Voor boutique recruitmentbureaus, detacheerders, executive search en outplacementpartijen die bron-CV's sneller willen omzetten naar rustige, client-ready documenten.",
  },
  {
    question: "Doen jullie nu al automatische anonimisering?",
    answer:
      "Nog niet als volledig productfeature. We kunnen in de pilot wel afspraken maken over handmatige redactie, welke gegevens zichtbaar mogen blijven en hoe output wordt opgeslagen. Automatische anonimisering bouwen we pas verder uit na betaalde vraag.",
  },
  {
    question: "Hoe zit het met AVG en dataretentie?",
    answer:
      "Tijdens de pilot maken we vooraf expliciete afspraken over opslag, retentie en eventuele extra privacy-eisen. Voor zwaardere eisen of enterprise-behoeften is aanvullend productwerk nodig.",
  },
  {
    question: "Hoe snel reageren jullie op een agency aanvraag?",
    answer:
      "Normaal binnen 1 tot 2 werkdagen. Je krijgt geen generieke demo-sequence, maar een korte eerste reactie op fit, plus de kleinste logische vervolgstap: gesprek, sample-route of een snelle nee als het duidelijk niet past.",
  },
];

export const metadata: Metadata = {
  title: "Kandidaat-CV's sneller klantklaar | WerkCV Agency",
  description:
    "WerkCV Agency is een pilot voor recruiters, detacheerders en outplacement. Zet bron-CV's sneller om naar client-ready documenten met onboarding, factuur en fair-use vanaf EUR249 per maand.",
  keywords: [
    "cv formatteren recruitment bureau",
    "client-ready kandidaat cv",
    "cv formatting software recruiters",
    "kandidaat cv in huisstijl",
    "cv anonimiseren recruiter",
    "cv tool recruiter",
    "cv converter recruitment",
    "cv opmaak bureau",
    "agency cv formatting",
    "recruitment cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/agency",
  },
};

export default function AgencyPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Agency",
        item: "https://werkcv.nl/agency",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <Link
            href="/partners"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-bold text-black transition-colors hover:bg-yellow-300"
          >
            Partners
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-gray-600">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-black hover:underline">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-bold text-black">Agency</li>
          </ol>
        </nav>

        <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div>
              <div className="mb-4 inline-block border-2 border-black bg-sky-200 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
                WerkCV Agency Pilot
              </div>
              <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
                Kandidaat-CV&apos;s sneller klantklaar zonder Word-chaos
              </h1>
              <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
                WerkCV Agency is een kleine pilot voor boutique recruiters, detacheerders,
                executive search en outplacementpartijen die bron-CV&apos;s sneller willen omzetten
                naar rustige, client-ready documenten. Geen zwaar ATS-project of vage
                enterprise-praat, maar een praktische eerste stap met onboarding, factuur en
                duidelijke fair-use- en retentieafspraken.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm font-black text-black">
                <span className="border-2 border-black bg-white px-3 py-1">Vanaf EUR249 p/m</span>
                <span className="border-2 border-black bg-white px-3 py-1">Of vanaf EUR5 per CV</span>
                <span className="border-2 border-black bg-white px-3 py-1">1 branded route</span>
                <span className="border-2 border-black bg-white px-3 py-1">Factuur + onboarding</span>
                <span className="border-2 border-black bg-white px-3 py-1">Pilot met fair use</span>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#b2b-lead-form"
                  className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  Vraag pilot aan
                </a>
                <Link
                  href="/contact"
                  className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                >
                  Plan eerst een kennismaking
                </Link>
              </div>
              <p className="mt-3 text-sm font-bold text-slate-700">
                Verwachte eerste reactie: binnen 1 tot 2 werkdagen.
              </p>
            </div>

            <aside className="h-fit border-4 border-black bg-[#FFF4D6] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Korte pilot, heldere verwachting
              </p>
              <h2 className="mt-2 text-2xl font-black text-black">
                Eerst fit checken, daarna pas bouwen
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                Deze route is bedoeld voor teams die terugkerend opmaakwerk of client-ready
                redactie voelen, niet voor een grote softwareselectie. Daarom sturen we eerst op
                fit, snelheid en een kleine pilot in plaats van op een brede demo.
              </p>
              <div className="mt-5 space-y-3 text-sm font-bold leading-relaxed text-black">
                {responseExpectations.map((item) => (
                  <p key={item}>&bull; {item}</p>
                ))}
              </div>
              <div className="mt-6 border-2 border-black bg-white p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                  Snelle intake werkt het best met
                </p>
                <ul className="mt-3 space-y-2 text-sm font-bold leading-relaxed text-black">
                  <li>&bull; je huidige volume of ruwe schatting</li>
                  <li>&bull; hoe bron-CV&apos;s nu binnenkomen</li>
                  <li>&bull; of privacy/redactie direct meespeelt</li>
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="mb-10 space-y-6">
          <article className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Indicatief dossier
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Van bron-CV naar client-ready voorstel
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-gray-700">
              Geen glanzende enterprise-demo, maar een realistische sample van
              het type dossier waar deze pilot op mikt: een bruikbare
              Nederlandse kandidaat met inhoud die nog te rommelig binnenkomt
              voor directe klantpresentatie.
            </p>
            <div className="mt-6 max-w-3xl space-y-4">
              <p className="text-sm font-bold leading-relaxed text-black">
                Wat er in zo&apos;n eerste stap meestal verandert:
              </p>
              <ul className="space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                <li>&bull; minder ruis bovenaan: geen overvolle persoonsgegevens of losse details</li>
                <li>&bull; scherpere positionering: van breed bronverhaal naar rustige voorsteltekst</li>
                <li>&bull; scanbare werkervaring: korter, consistenter en sneller leesbaar voor opdrachtgever</li>
              </ul>
              <p className="text-sm font-medium leading-relaxed text-slate-700">
                Een echte before/after sample komt pas terug op deze pagina zodra de definitieve
                versie sterk genoeg is om echt als verkoopbewijs te dienen.
              </p>
            </div>
            <p className="mt-5 text-xs font-medium leading-relaxed text-slate-600">
              Indicatief, geanonimiseerd voorbeeld van het type transformatie
              dat we in een pilot willen testen. Geen claim over volledige
              automatisering of anonieme bulkverwerking vanaf dag één.
            </p>
          </article>

          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border-4 border-black bg-sky-200 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-700">
                Ruwe ROI, zonder theater
              </p>
              <h2 className="mt-2 text-2xl font-black text-black">
                20 CV&apos;s per maand x 20 minuten = 6,7 uur
              </h2>
              <p className="mt-4 text-sm font-medium leading-relaxed text-black">
                Als een recruiter of consultant gemiddeld 20 minuten per dossier kwijt is aan
                opschonen, herschikken en nette output maken, loopt de tijdswinst snel op. Dit is
                geen belofte, maar een simpele sanity check voor teams waar client-ready opmaak
                elke maand terugkomt.
              </p>
              <div className="mt-5 space-y-3">
                {roiExamples.map((example) => (
                  <div
                    key={example.volume}
                    className="grid gap-1 border-2 border-black bg-white px-4 py-3 text-sm font-bold text-black sm:grid-cols-[1.2fr_1fr_auto] sm:gap-3"
                  >
                    <span>{example.volume}</span>
                    <span>{example.minutes}</span>
                    <span>{example.hours}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs font-medium leading-relaxed text-slate-700">
                Uitgangspunt: gemiddeld 20 minuten minder handmatig opmaak- of redactiegedoe per
                kandidaat-CV. Exclusief extra reviewrondes of uitzonderlijke dossiers.
              </p>
            </article>

            <article className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
                Niet voor iedereen
              </p>
              <h2 className="mt-2 text-2xl font-black">
                Deze pilot is waarschijnlijk geen fit als je nu al zoekt naar
              </h2>
              <ul className="mt-5 space-y-2 text-sm font-bold leading-relaxed text-white">
                <li>&bull; volledige ATS-integratie, rechtenbeheer en multi-workspace vanaf dag één</li>
                <li>&bull; een enterprise security- of procurementtraject voordat je kunt testen</li>
                <li>&bull; vooral een doorverwijsroute voor individuele cliënten in plaats van agency-usage</li>
              </ul>
              <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
                Dan zijn <Link href="/for-coaches" className="underline underline-offset-2">voor coaches</Link> of{" "}
                <Link href="/partners" className="underline underline-offset-2">partners</Link>{" "}
                waarschijnlijk logischer dan deze agency-pilot.
              </p>
            </article>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {painPoints.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{item.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-3xl font-black text-black">Wat de pilot nu wel bevat</h2>
            <ul className="space-y-3 text-sm font-bold leading-relaxed text-black">
              {pilotIncludes.map((item) => (
                <li key={item}>&bull; {item}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm font-medium leading-relaxed text-gray-700">
              De pilot is bedoeld om echte betaalde vraag te toetsen. Daarom houden we de
              propositie scherp en geloofwaardig in plaats van direct een vol enterprise-platform
              te beloven.
            </p>
          </div>

          <div className="border-4 border-black bg-sky-200 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-4 text-2xl font-black text-black">Waarom nu klein starten</h2>
            <p className="text-sm font-medium leading-relaxed text-black">
              Jouw eerste doel is niet twintig agencies tegelijk. Jouw eerste doel is één betalende
              pilot die laat zien welke workflow, prijs en privacy-afspraken echt belangrijk zijn.
              Dat voorkomt een dure B2B-bouwronde zonder bewijs.
            </p>
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {fitCards.map((card) => (
            <article
              key={card.title}
              className={`border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${card.tone}`}
            >
              <h2 className="mb-3 text-xl font-black text-black">{card.title}</h2>
              <ul className="space-y-2 text-sm font-bold leading-relaxed text-black">
                {card.items.map((item) => (
                  <li key={item}>&bull; {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="mb-10 border-4 border-dashed border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Proof block
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Hier komt usageproof zodra de eerste pilot draait
          </h2>
          <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-gray-700">
            We vullen deze sectie pas met echte usagedata zodra de eerste pilot live draait.
            Liever nog geen opgepoetste testimonial dan een halfzachte claim. Wat we hier straks
            geanonimiseerd willen laten zien:
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {proofRoadmap.map((item) => (
              <article
                key={item}
                className="border-4 border-black bg-[#FFFEF0] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-sm font-bold leading-relaxed text-black">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Hoe de pilot werkt</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {pilotSteps.map((step) => (
              <article
                key={step.title}
                className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="mb-3 text-xl font-black text-black">{step.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-gray-700">{step.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-10 grid gap-6 md:grid-cols-2">
          {comparisonRows.map((row) => (
            <article
              key={row.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="mb-3 text-xl font-black text-black">{row.title}</h2>
              <p className="font-medium leading-relaxed text-gray-700">{row.body}</p>
            </article>
          ))}
        </section>

        <section className="mb-10">
          <h2 className="mb-6 text-3xl font-black text-black">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-black text-black">
                  {faq.question}
                  <span className="ml-2 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 font-medium leading-relaxed text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section id="b2b-lead-form" className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="border-4 border-black bg-yellow-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="mb-3 text-3xl font-black text-black">
                Laat zien hoe je kandidaat-CV&apos;s nu verwerkt
              </h2>
              <p className="font-medium leading-relaxed text-black">
                Als er echte betaalde vraag is, moet de eerste stap niet een losse demo-call zijn
                maar een bruikbare intake. Stuur je doelgroep, volume, huidige bronbestanden en of
                je vooral snelheid, privacy/redactie of klantpresentatie wilt verbeteren. Dan
                reageren we met de kleinste pilotroute die nu geloofwaardig te testen is.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {agencyProof.map((item) => (
                <article
                  key={item.title}
                  className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  <h3 className="mb-2 text-lg font-black text-black">{item.title}</h3>
                  <p className="text-sm font-medium leading-relaxed text-gray-700">{item.body}</p>
                </article>
              ))}
            </div>

            <div className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="mb-3 text-xl font-black text-black">Wat we het liefst meteen zien</h3>
              <ul className="space-y-2 text-sm font-bold leading-relaxed text-black">
                <li>&bull; Hoe kandidaten nu hun bron-CV&apos;s aanleveren</li>
                <li>&bull; Of je output in bureau- of opdrachtgeverstijl nodig hebt</li>
                <li>&bull; Of contactgegevens of andere persoonsgegevens aangepast moeten worden</li>
                <li>&bull; Of je klein wilt starten per CV of liever meteen een maandpilot test</li>
              </ul>
            </div>
          </div>

          <B2BLeadForm
            pageType="agency"
            pagePath="/agency"
            title="Vraag een agency pilot-intake aan"
            description="Geen generieke salesform. We willen genoeg context om terug te komen met een kleine pilot of volume-afspraak die echt past bij jouw kandidaatflow."
            submitLabel="Stuur agency intake"
            audienceLabel="Type organisatie"
            audienceOptions={agencyAudienceOptions}
          />
        </section>
      </main>

      <FAQJsonLd questions={faqs} />
      <OrganizationJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Footer />
    </div>
  );
}
