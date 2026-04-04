import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getTemplateConfig } from "@/lib/templates/registry";

const simpleTemplate = getTemplateConfig("simple");

const easySteps = [
  {
    title: "1) Begin met een template die al rust en structuur geeft",
    body: "Makkelijk cv maken begint bij minder keuzes. Als de layout al klopt, hoef jij alleen nog de inhoud logisch op te bouwen.",
  },
  {
    title: "2) Vul eerst de drie kernblokken in",
    body: "Naam en contact, functietitel en profieltekst, daarna pas werkervaring. Zo staat de basis snel en voelt je CV direct minder leeg.",
  },
  {
    title: "3) Werk in kleine blokken in plaats van alles tegelijk",
    body: "Schrijf eerst je laatste functie, dan je opleiding en pas daarna je vaardigheden. Kleine stappen zijn makkelijker vol te houden dan een groot leeg document.",
  },
  {
    title: "4) Houd je keuzes simpel en vacaturegericht",
    body: "Kies liever één duidelijke functierichting en een paar relevante bullets dan een breed CV dat alles tegelijk probeert te zijn.",
  },
  {
    title: "5) Gebruik je basisversie daarna voor snellere volgende sollicitaties",
    body: "Makkelijk cv maken wordt pas echt waardevol als je niet elke keer opnieuw hoeft te beginnen, maar vanuit een nette basis verder kunt werken.",
  },
];

const easyWins = [
  "Je start niet vanuit een leeg Word-document.",
  "Je werkt met vaste secties die recruiters al verwachten.",
  "Je hoeft niet eerst design of marges uit te zoeken.",
  "Je kunt je CV later per vacature aanpassen zonder opnieuw te beginnen.",
];

const frictionReducers = [
  {
    title: "Minder keuzes",
    body: "Een simpele template voorkomt dat je vastloopt op kleur, lettertype of layout in plaats van inhoud.",
  },
  {
    title: "Klein beginnen",
    body: "Een functietitel en korte profieltekst geven meteen richting, ook als de rest nog niet af is.",
  },
  {
    title: "Herbruikbare basis",
    body: "Als je eerste versie staat, hoef je bij de volgende sollicitatie meestal alleen nog accenten te verleggen.",
  },
];

const mistakes = [
  {
    title: "Alles tegelijk willen perfectioneren",
    body: "Makkelijk werkt juist beter als je eerst compleet wordt en daarna scherper gaat formuleren.",
  },
  {
    title: "Te veel inspiratie tabs openzetten",
    body: "Een paar goede voorbeelden helpen, maar te veel vergelijken vertraagt het moment waarop je echt begint.",
  },
  {
    title: "Denken dat simpel hetzelfde is als zwak",
    body: "Voor de meeste sollicitaties is een duidelijke simpele structuur juist overtuigender dan een druk ontwerp.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik mijn cv makkelijker?",
    answer:
      "Maak het proces kleiner: kies een simpele template, vul eerst titel en profiel in en werk daarna sectie voor sectie. Zo voorkom je dat je blijft hangen in een leeg document.",
  },
  {
    question: "Welke template is het makkelijkst om mee te starten?",
    answer:
      "De Simpel-template is de meest logische start als je weinig frictie wilt. Die geeft duidelijke structuur zonder afleidende designkeuzes.",
  },
  {
    question: "Kan ik makkelijk cv maken zonder veel ervaring?",
    answer:
      "Ja. Juist dan helpt een vaste structuur. Je kunt opleiding, projecten, bijbanen en vaardigheden stap voor stap invullen zonder dat het rommelig wordt.",
  },
  {
    question: "Is makkelijk cv maken hetzelfde als snel cv maken?",
    answer:
      "Niet helemaal. Makkelijk draait vooral om minder gedoe en minder mentale frictie. Snel gaat meer over tijdswinst en direct klaar willen zijn.",
  },
];

export const metadata: Metadata = {
  title: "Makkelijk CV Maken - Minder Gedoe, Sneller Een Goede Basis | WerkCV",
  description:
    "Makkelijk cv maken zonder te worstelen met layout of een leeg document. Gebruik een simpele template en bouw stap voor stap een nette basisversie.",
  keywords: [
    "makkelijk cv maken",
    "eenvoudig cv maken",
    "simpel cv maken",
    "makkelijk curriculum vitae maken",
    "cv maken zonder gedoe",
    "snel en makkelijk cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/makkelijk-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/makkelijk-cv-maken",
      "x-default": "https://werkcv.nl/makkelijk-cv-maken",
    },
  },
};

export default function MakkelijkCvMakenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Makkelijk CV maken",
        item: "https://werkcv.nl/makkelijk-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Makkelijk CV maken in 5 stappen",
    description:
      "Eenvoudige flow voor mensen die zonder gedoe een goede basisversie van hun CV willen opzetten.",
    totalTime: "PT18M",
    step: easySteps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.body,
    })),
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
            href="/editor"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Start in editor
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Lage-frictie intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Makkelijk CV maken zonder te blijven hangen in een leeg document
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Wie zoekt op makkelijk cv maken wil vooral minder gedoe. Geen
              gevecht met opmaak, geen twintig keuzes vooraf, maar een logische
              route naar een nette eerste versie die later verder kan worden
              aangescherpt.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze route is bedoeld voor minder frictie en sneller beginnen, niet
              voor de volledige sollicitatiestrategie. Wil je daarna dieper werken
              aan inhoud, profieltekst en ATS-structuur, pak dan de{" "}
              <Link
                href="/cv-maken"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                hoofdgids CV maken
              </Link>
              .
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak makkelijk je CV
              </Link>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk hoofdgids
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Waarom deze route lichter voelt
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {easyWins.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Eenvoudige workflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je je CV makkelijker in plaats van complexer
          </h2>
          <div className="mt-6 space-y-4">
            {easySteps.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-5 md:grid-cols-3">
          {frictionReducers.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-14">
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Aanbevolen starttemplate
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Begin met {simpleTemplate.nameDutch.toLowerCase()} zodat je minder hoeft na te denken over layout
            </h2>
            <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
              <div>
                <p className="text-sm font-medium leading-relaxed text-slate-700">
                  {simpleTemplate.description}
                </p>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  Deze template werkt goed voor bezoekers die vooral snel
                  structuur willen, weinig designfrictie zoeken en een rustige
                  basisversie willen opbouwen.
                </p>
              </div>
              <div className="border-4 border-black bg-[#FFFEF0] p-5">
                <p className="text-sm font-black text-black">Waarom deze template past</p>
                <ul className="mt-3 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
                  <li>Eenkoloms, voorspelbare structuur.</li>
                  <li>Weinig visuele ruis tijdens het invullen.</li>
                  <li>Geschikt voor starters, switchers en snelle sollicitaties.</li>
                  <li>Later makkelijk uit te bouwen per vacature.</li>
                </ul>
                <Link
                  href="/editor"
                  className="mt-5 inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  Start met simpel
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-3">
          {mistakes.map((item) => (
            <article
              key={item.title}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-black text-black">{item.title}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </article>
          ))}
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/cv-aanmaken",
              title: "CV aanmaken",
              body: "Voor de kortste route naar een eerste complete basisversie.",
            },
            {
              href: "/gratis-cv-maken",
              title: "Gratis CV maken",
              body: "Nuttig als prijs en laagdrempelig starten een deel van je twijfel zijn.",
            },
            {
              href: "/cv-maken-op-mobiel",
              title: "CV maken op mobiel",
              body: "Handig als makkelijk voor jou ook betekent dat je tussendoor op je telefoon wilt werken.",
            },
            {
              href: "/cv-maken",
              title: "CV maken",
              body: "Ga hierna verder als je inhoud, profieltekst en vacaturematch dieper wilt aanscherpen.",
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-4 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-yellow-100"
            >
              <p className="text-sm font-black text-black">{item.title}</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                {item.body}
              </p>
            </Link>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Minder gedoe, meer voortgang
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Zet eerst een simpele versie neer en verbeter daarna pas de details
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Een makkelijk CV-proces wint niet door perfectie vooraf, maar door
                een rustige basis die je zonder weerstand kunt afmaken.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open editor
              </Link>
              <Link
                href="/templates"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bekijk templates
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">
            Veelgestelde vragen over makkelijk CV maken
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <article
                key={faq.question}
                className="border-4 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{faq.question}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </div>
  );
}
