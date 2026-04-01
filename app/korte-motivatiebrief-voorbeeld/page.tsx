import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Korte motivatiebrief voorbeeld voor een starter",
    text:
      "Met veel interesse solliciteer ik naar de functie van junior marketingmedewerker bij [Bedrijfsnaam]. Tijdens mijn stage heb ik ervaring opgedaan met contentplanning en e-mailcampagnes, waarbij ik me vooral heb ontwikkeld in structuur en schrijven. De combinatie van creativiteit en data in deze rol past goed bij hoe ik wil doorgroeien. Graag licht ik mijn motivatie in een gesprek verder toe.",
  },
  {
    title: "Korte motivatiebrief voorbeeld voor klantenservice",
    text:
      "Graag solliciteer ik naar de functie van klantenservicemedewerker bij [Bedrijfsnaam]. In mijn huidige rol behandel ik dagelijks klantvragen via telefoon en e-mail, waarbij ik een hoge klanttevredenheid en duidelijke communicatie combineer. Juist die servicegerichte aanpak wil ik binnen uw team inzetten. Dank voor uw tijd en overweging.",
  },
  {
    title: "Korte motivatiebrief voorbeeld voor carrièreswitch",
    text:
      "Met deze brief solliciteer ik naar de functie van junior data-analist bij [Bedrijfsnaam]. Vanuit operations heb ik meerdere dashboards en rapportages gebouwd waarmee we sneller konden sturen op KPI&apos;s. Die ervaring, gecombineerd met mijn verdere ontwikkeling in SQL en Power BI, maakt deze stap logisch voor mij. Ik vertel daar graag meer over in een gesprek.",
  },
];

const whenShortWorks = [
  "Bij starters en junior rollen waar je nog geen lange loopbaan hoeft uit te leggen.",
  "Bij vacatures waar snelheid en duidelijkheid belangrijker zijn dan veel context.",
  "Als je CV al sterk is en de brief vooral motivatie en fit moet toevoegen.",
  "Als je per e-mail solliciteert en een compacte tekst beter werkt dan een lange bijlage.",
];

const faqs = [
  {
    question: "Hoe kort mag een motivatiebrief zijn?",
    answer:
      "Een korte motivatiebrief mag prima zolang de brief nog steeds functiematch, bewijs en motivatie bevat. Vier compacte alinea&apos;s zijn vaak genoeg.",
  },
  {
    question: "Is een korte motivatiebrief minder professioneel?",
    answer:
      "Nee. Kort en concreet werkt vaak beter dan lang en algemeen. Professioneel betekent vooral duidelijk, relevant en goed opgebouwd.",
  },
  {
    question: "Wanneer werkt een korte motivatiebrief niet goed?",
    answer:
      "Als je complexe context moet uitleggen, bijvoorbeeld een grote carrièreswitch, een opvallend cv-gat of een senior rol met veel verantwoordelijkheid. Dan is iets meer uitwerking logisch.",
  },
  {
    question: "Kan ik een korte motivatiebrief voorbeeld letterlijk gebruiken?",
    answer:
      "Gebruik voorbeelden als basis, maar pas altijd functietitel, prestaties en bedrijfsfit aan op jouw situatie. Anders blijft het een generieke tekst.",
  },
];

export const metadata: Metadata = {
  title: "Korte Motivatiebrief Voorbeeld - Compact en Overtuigend | WerkCV.nl",
  description:
    "Zoek je een korte motivatiebrief voorbeeld? Bekijk compacte voorbeeldbrieven, wanneer kort beter werkt en hoe je in weinig regels toch overtuigt.",
  keywords: [
    "korte motivatiebrief voorbeeld",
    "korte motivatiebrief",
    "motivatiebrief kort voorbeeld",
    "compacte motivatiebrief",
    "motivatiebrief voorbeeld kort",
  ],
  alternates: {
    canonical: "https://werkcv.nl/korte-motivatiebrief-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/korte-motivatiebrief-voorbeeld",
      "x-default": "https://werkcv.nl/korte-motivatiebrief-voorbeeld",
    },
  },
};

export default function KorteMotivatiebriefVoorbeeldPage() {
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
        name: "Korte Motivatiebrief Voorbeeld",
        item: "https://werkcv.nl/korte-motivatiebrief-voorbeeld",
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
              Intent: korte motivatiebrief voorbeeld
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Korte motivatiebrief voorbeelden die niet oppervlakkig aanvoelen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een korte motivatiebrief werkt alleen als je weinig woorden gebruikt, maar nog steeds
              genoeg zegt. De voorbeelden hieronder laten zien hoe je compact kunt schrijven zonder
              te vervallen in vage standaardzinnen.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Maak je korte brief
              </Link>
              <Link
                href="/motivatiebrief-schrijven"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Eerst structuur leren
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wanneer kort juist slim is</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {whenShortWorks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Korte motivatiebrief voorbeelden per situatie
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

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Vervolgstappen
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              {
                href: "/motivatiebrief-schrijven",
                title: "Motivatiebrief schrijven",
                body: "Gebruik deze pagina als je eerst de opbouw en schrijfvolgorde wilt aanscherpen.",
              },
              {
                href: "/motivatiebrief-voorbeeld",
                title: "Motivatiebrief voorbeelden",
                body: "Vergelijk langere voorbeeldalinea&apos;s zodra je meer context in je brief nodig hebt.",
              },
              {
                href: "/motivatiebrief-layout",
                title: "Motivatiebrief layout",
                body: "Controleer of je korte brief ook visueel rustig en professioneel overkomt.",
              },
              {
                href: "/tools/sollicitatiebrief-generator",
                title: "Sollicitatiebrief generator",
                body: "Zet je korte versie direct om in een nette, op maat gemaakte brief.",
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
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over korte motivatiebrieven
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
                Klaar om jouw korte versie te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Schrijf kort, concreet en vacaturegericht
              </h2>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start met korte brief
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
