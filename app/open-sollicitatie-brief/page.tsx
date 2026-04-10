import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Open sollicitatie brief voorbeeld voor administratie",
    text:
      "Met interesse richt ik mij tot [Bedrijfsnaam] omdat uw organisatie bekendstaat om een zorgvuldige en mensgerichte werkwijze. In mijn huidige administratieve rol ondersteun ik planning, dossierbeheer en interne procesverbetering. Juist die combinatie van structuur, nauwkeurigheid en klantcontact wil ik inzetten binnen uw team. Graag licht ik in een gesprek toe waar ik op korte termijn waarde kan toevoegen.",
  },
  {
    title: "Open sollicitatie brief voorbeeld voor marketing",
    text:
      "Ik benader [Bedrijfsnaam] omdat uw merk zich duidelijk onderscheidt in hoe het content, design en commercie samenbrengt. In mijn recente werk heb ik campagnes ondersteund, contentkalenders beheerd en conversiegericht geschreven voor online kanalen. Die mix van uitvoering en leervermogen wil ik graag inzetten in een marketingteam waar snelheid en kwaliteit samenkomen.",
  },
  {
    title: "Open sollicitatie brief voorbeeld voor starter",
    text:
      "Hoewel er op dit moment geen specifieke vacature openstaat, stuur ik u graag mijn open sollicitatie omdat de werkzaamheden binnen [Bedrijfsnaam] goed aansluiten op mijn studierichting en stage-ervaring. Tijdens mijn projecten werkte ik aan onderzoek, rapportage en samenwerking met verschillende stakeholders. Ik zoek een omgeving waarin ik snel kan leren en direct kan bijdragen.",
  },
];

const checklist = [
  "Richt je brief aan een echte contactpersoon in plaats van aan een algemeen e-mailadres.",
  "Leg uit waarom juist dit bedrijf logisch is voor jouw volgende stap.",
  "Noem 1 of 2 concrete prestaties of sterke voorbeelden als bewijs van fit.",
  "Maak duidelijk voor welk type rol of team je jezelf aanbiedt.",
  "Houd de brief kort: open sollicitaties winnen op relevantie, niet op lengte.",
];

const faqs = [
  {
    question: "Wat is een goede open sollicitatie brief?",
    answer:
      "Een goede open sollicitatie brief laat zien waarom je juist dit bedrijf benadert, welke rol of richting je zoekt en welke concrete waarde je kunt toevoegen. Zonder vacature moet je extra duidelijk zijn over je relevantie.",
  },
  {
    question: "Is een open sollicitatie brief anders dan een gewone sollicitatiebrief?",
    answer:
      "Ja. Je reageert niet op een specifieke functie, dus je moet zelf de brug slaan tussen jouw profiel en wat het bedrijf waarschijnlijk nodig heeft. De brief is daarom iets meer gericht op bedrijfsfit en toegevoegde waarde.",
  },
  {
    question: "Hoe lang moet een open sollicitatie brief zijn?",
    answer:
      "Voor de meeste situaties werkt een halve tot driekwart A4 goed. Je wilt genoeg context geven om interessant te zijn, maar niet zo veel dat de brief voelt als een algemene motivatie-essay.",
  },
  {
    question: "Kan ik een open sollicitatie brief voorbeeld letterlijk gebruiken?",
    answer:
      "Gebruik voorbeelden alleen als basis. Een open sollicitatie werkt juist beter wanneer je laat zien dat je het bedrijf echt hebt bekeken en je brief niet generiek is.",
  },
];

export const metadata: Metadata = {
  title: "Open sollicitatie schrijven in 2026: brief, aanpak en voorbeelden | WerkCV",
  description:
    "Leer open sollicitatie schrijven met een gerichte bedrijfsfit, voorbeeldblokken en een praktische aanpak voor situaties zonder concrete vacature.",
  keywords: [
    "open sollicitatie brief",
    "open sollicitatiebrief",
    "open sollicitatie brief voorbeeld",
    "open sollicitatie motivatiebrief",
    "brief open sollicitatie",
  ],
  alternates: {
    canonical: "https://werkcv.nl/open-sollicitatie-brief",
    languages: {
      "nl-NL": "https://werkcv.nl/open-sollicitatie-brief",
      "x-default": "https://werkcv.nl/open-sollicitatie-brief",
    },
  },
};

export default function OpenSollicitatieBriefPage() {
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
        name: "Open sollicitatie brief",
        item: "https://werkcv.nl/open-sollicitatie-brief",
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
              Intent: open sollicitatie brief
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Open sollicitatie schrijven zonder generieke brief
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zonder concrete vacature moet je brief sneller duidelijk maken waarom juist dit
              bedrijf, deze richting en jouw profiel logisch samenkomen. Een open sollicitatie wint
              niet op volume, maar op gerichte bedrijfsfit en een heldere volgende stap.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf open sollicitatie brief
              </Link>
              <Link
                href="/sollicitatiebrief-voorbeeld"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk algemene briefvoorbeelden
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Checklist voor een open brief</h2>
            <div className="mt-5 space-y-4">
              {checklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Open sollicitatie voorbeelden per situatie
          </h2>
          <div className="mt-6 space-y-5">
            {examples.map((example) => (
              <article
                key={example.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{example.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{example.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Veelgemaakte fout
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Een open brief schrijven alsof het een standaard template is
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Bedrijven reageren eerder op een open sollicitatie als je laat zien waarom jij juist hen
              benadert. Zonder die bedrijfsfit voelt de brief te breed en te vrijblijvend.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/sollicitatiebrief-maken",
                  title: "Sollicitatiebrief maken",
                  body: "Gebruik de centrale briefhub als je eerst wilt bepalen of je open sollicitatie, voorbeeld of workflow-route nodig hebt.",
                },
                {
                  href: "/sollicitatiebrief-beginnen",
                  title: "Sollicitatiebrief beginnen",
                  body: "Gebruik een sterkere openingszin als je open brief nog te algemeen start.",
                },
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Handig als je eerst de opbouw en logica van je brief wilt verbeteren.",
                },
                {
                  href: "/sollicitatiebrief-voorbeeld",
                  title: "Sollicitatiebrief voorbeelden",
                  body: "Vergelijk extra openings- en afsluitzinnen als je je open brief wilt aanscherpen.",
                },
                {
                  href: "/motivatiebrief-zonder-werkervaring",
                  title: "Motivatiebrief zonder werkervaring",
                  body: "Gebruik deze route als je open brief vooral moet steunen op studie, stage of projecten.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Zet je open sollicitatie direct om in een nette brief per bedrijf.",
                },
                {
                  href: "/cv-maken-zonder-abonnement",
                  title: "CV maken zonder abonnement",
                  body: "Rond je open sollicitatie af met een rustig CV dat je per bedrijf kunt aanpassen.",
                },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block border-2 border-black bg-[#FFFEF0] p-4 transition-colors hover:bg-yellow-100"
                >
                  <p className="text-sm font-black text-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{item.body}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over open sollicitatie brieven
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
                Klaar om je open sollicitatie te sturen?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Maak een gerichte brief en koppel daar direct je CV aan
              </h2>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start open brief
            </Link>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
