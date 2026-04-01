import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const examples = [
  {
    title: "Motivatiebrief stage voorbeeld voor marketing",
    text:
      "Met veel interesse solliciteer ik naar de marketingstage bij [Bedrijfsnaam]. Tijdens mijn opleiding heb ik gewerkt aan contentplanning, doelgroepanalyse en campagnerapportages voor studieprojecten en een stage-opdracht. Juist de combinatie van creativiteit, data en samenwerken spreekt mij aan in deze rol. Ik kijk ernaar uit om mijn leergierigheid en praktische inzet binnen uw team verder te ontwikkelen.",
  },
  {
    title: "Motivatiebrief stage voorbeeld voor zorg of welzijn",
    text:
      "Graag solliciteer ik naar de stageplaats binnen [Afdeling of Organisatie]. Tijdens mijn opleiding heb ik geleerd hoe belangrijk duidelijke communicatie, observeren en zorgvuldig werken zijn. In mijn praktijkopdrachten merkte ik dat ik energie haal uit direct contact en het ondersteunen van anderen. Die motivatie wil ik graag verder uitbouwen in een leeromgeving waar kwaliteit en betrokkenheid centraal staan.",
  },
  {
    title: "Motivatiebrief stage voorbeeld voor ICT",
    text:
      "Met deze brief solliciteer ik naar de ICT-stage bij [Bedrijfsnaam]. Binnen mijn opleiding heb ik gewerkt aan projecten in [techniek of stack], waarbij ik vooral sterk werd in analyseren, testen en samenwerken aan een werkende oplossing. Ik zoek een stage waarin ik technische kennis kan verdiepen en tegelijk ervaring opdoe met echte gebruikers en teamprocessen.",
  },
];

const checklist = [
  "Noem duidelijk welke opleiding en fase van je studie relevant zijn.",
  "Leg kort uit waarom juist deze stage of leeromgeving bij je past.",
  "Gebruik schoolprojecten, praktijkopdrachten of bijbaanervaring als bewijs.",
  "Laat zien wat je wilt leren en tegelijk al kunt bijdragen.",
];

const faqs = [
  {
    question: "Wat zet je in een motivatiebrief voor stage?",
    answer:
      "Noem je opleiding, je stage-intentie, relevante projecten of opdrachten en waarom juist dit bedrijf of deze stageplek goed aansluit op wat je wilt leren. Laat ook kort zien wat je al kunt meebrengen.",
  },
  {
    question: "Is een motivatiebrief voor stage anders dan voor een gewone baan?",
    answer:
      "Ja. Bij een stagebrief ligt de nadruk vaak meer op leerdoelen, potentie en studiecontext. Je hoeft minder jaren ervaring te bewijzen, maar wel duidelijk te maken waarom jij serieus en relevant bent.",
  },
  {
    question: "Hoe lang moet een motivatiebrief voor stage zijn?",
    answer:
      "Voor de meeste stagebrieven is een halve tot driekwart A4 ruim genoeg. Kort, duidelijk en specifiek werkt meestal beter dan een lange algemene brief.",
  },
  {
    question: "Kan ik een stage motivatiebrief voorbeeld letterlijk gebruiken?",
    answer:
      "Gebruik voorbeelden als basis voor opbouw en toon, maar pas altijd opleiding, projecten, motivatie en stagecontext aan op jouw situatie. Anders blijft het een generieke brief.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief Stage Voorbeeld - Sterke Stagebrief + Structuur | WerkCV.nl",
  description:
    "Zoek je een motivatiebrief stage voorbeeld? Bekijk sterke stagebrief-voorbeelden, een korte checklist en hoe je opleiding, projecten en motivatie goed combineert.",
  keywords: [
    "motivatiebrief stage voorbeeld",
    "stage motivatiebrief voorbeeld",
    "motivatiebrief voor stage",
    "stage brief voorbeeld",
    "stage sollicitatiebrief voorbeeld",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-stage-voorbeeld",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-stage-voorbeeld",
      "x-default": "https://werkcv.nl/motivatiebrief-stage-voorbeeld",
    },
  },
};

export default function MotivatiebriefStageVoorbeeldPage() {
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
        name: "Motivatiebrief stage voorbeeld",
        item: "https://werkcv.nl/motivatiebrief-stage-voorbeeld",
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
              Intent: motivatiebrief stage voorbeeld
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief stage voorbeelden die opleiding en praktijk logisch verbinden
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een stagebrief hoeft niet te klinken alsof je al jaren ervaring hebt. Wat wel telt:
              een duidelijke leerintentie, relevant bewijs uit school of projecten en een goede reden
              waarom juist deze stageplek bij jouw ontwikkeling past.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf je stagebrief
              </Link>
              <Link
                href="/stage-cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak ook je stage-CV
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Checklist voor een sterke stagebrief</h2>
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
            Motivatiebrief stage voorbeelden per richting
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
              Te veel motivatie, te weinig bewijs uit school of praktijk
            </h2>
            <p className="mt-4 text-sm font-medium leading-relaxed text-slate-200">
              Ook bij stages willen recruiters of begeleiders zien wat je al hebt gedaan. Projecten,
              opdrachten, bijbanen en praktijklessen zijn vaak genoeg om je brief geloofwaardig te maken.
            </p>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Relevante vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/stage-cv-maken",
                  title: "Stage-CV maken",
                  body: "Koppel je stagebrief direct aan een rustige CV-structuur voor stage-intentie.",
                },
                {
                  href: "/cv-voorbeeld-student",
                  title: "CV voorbeeld student",
                  body: "Gebruik een studentvoorbeeld als je opleiding, projectwerk en eerste ervaring wilt aanscherpen.",
                },
                {
                  href: "/korte-motivatiebrief-voorbeeld",
                  title: "Korte motivatiebrief voorbeeld",
                  body: "Handig als je je stagebrief compact wilt houden zonder belangrijke punten te verliezen.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Gebruik de voorbeelden direct als basis en maak je brief stage-specifiek.",
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
            Veelgestelde vragen over motivatiebrief stage voorbeelden
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
                Klaar om je stagebrief te maken?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Laat je opleiding, projecten en motivatie samen overtuigen
              </h2>
            </div>
            <Link
              href="/tools/sollicitatiebrief-generator"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Start stagebrief
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
