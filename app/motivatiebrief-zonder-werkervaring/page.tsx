import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const proofBlocks = [
  {
    title: "Opleiding en relevante vakken",
    body: "Noem je studierichting, specialisatie en vakken of modules die direct aansluiten op de rol. Zo vervang je ontbrekende werkjaren door inhoudelijke basis.",
  },
  {
    title: "Stage, project of afstudeeropdracht",
    body: "Elke stage, studiecase of project met een concreet resultaat telt als bewijs. Beschrijf wat je deed, met wie en wat het opleverde.",
  },
  {
    title: "Bijbaan of vrijwilligerswerk",
    body: "Ook niet-perfect aansluitende ervaring kan waarde tonen: klantcontact, verantwoordelijkheid, planning, tempo, betrouwbaarheid en samenwerken.",
  },
  {
    title: "Leervermogen en richting",
    body: "Maak duidelijk waarom juist deze rol logisch is voor jouw volgende stap. Potentieel werkt alleen als het een duidelijke richting krijgt.",
  },
];

const examples = [
  {
    title: "Voorbeeld motivatiebrief zonder werkervaring voor een starter",
    text:
      "Met enthousiasme solliciteer ik naar de functie van junior marketingmedewerker bij [Bedrijfsnaam]. Tijdens mijn studie en stage heb ik gewerkt aan contentplanning, social posts en e-mailcampagnes, waarbij ik vooral sterk werd in structuur en schrijven. Die basis wil ik nu verder uitbouwen in een team waar ik snel kan leren en direct kan bijdragen.",
  },
  {
    title: "Voorbeeld motivatiebrief zonder werkervaring voor klantenservice",
    text:
      "Hoewel ik nog geen formele ervaring heb in klantenservice, heb ik tijdens mijn bijbaan en studieprojecten gemerkt dat ik sterk ben in helder communiceren, rustig blijven onder druk en mensen praktisch helpen. Daarom spreekt de rol van klantenservicemedewerker bij [Bedrijfsnaam] mij direct aan.",
  },
  {
    title: "Voorbeeld motivatiebrief zonder werkervaring voor administratief werk",
    text:
      "Tijdens mijn opleiding heb ik veel gewerkt met planning, verslaglegging en nauwkeurige dossierverwerking binnen groepsprojecten en stageopdrachten. Juist die combinatie van structuur, betrouwbaarheid en praktische uitvoering wil ik inzetten in de functie van administratief medewerker bij [Bedrijfsnaam].",
  },
];

const mistakes = [
  "Beginnen met alleen 'ik heb nog geen ervaring' en daarmee je hele brief in een verdedigende toon zetten.",
  "Algemene woorden als leergierig of gemotiveerd gebruiken zonder voorbeeld of context.",
  "Vergeten dat stage, studieprojecten, bijbanen en vrijwilligerswerk ook bewijs kunnen zijn.",
  "Te veel schrijven over wat je wilt leren en te weinig over wat je nu al kunt bijdragen.",
];

const faqs = [
  {
    question: "Kun je een motivatiebrief schrijven zonder werkervaring?",
    answer:
      "Ja. Je brief moet dan vooral steunen op opleiding, stage, studieprojecten, bijbaan, vrijwilligerswerk en een duidelijke uitleg waarom deze rol logisch past bij jouw volgende stap.",
  },
  {
    question: "Wat zet ik in mijn motivatiebrief als ik nog nooit echt heb gewerkt?",
    answer:
      "Focus op alles wat wel bewijs geeft: studie, opdrachten, groepswerk, stage, praktische verantwoordelijkheden en relevante vaardigheden die je al hebt opgebouwd.",
  },
  {
    question: "Moet ik zeggen dat ik geen werkervaring heb?",
    answer:
      "Alleen als dat functioneel is, en dan kort. Laat je brief daarna vooral draaien om wat je wel meebrengt in plaats van om wat ontbreekt.",
  },
  {
    question: "Is een motivatiebrief zonder werkervaring vooral voor studenten?",
    answer:
      "Vaak wel, maar niet alleen. Ook herintreders, schoolverlaters en mensen die naar een eerste echte functie overstappen kunnen dezelfde aanpak gebruiken.",
  },
  {
    question: "Wat is belangrijker zonder werkervaring: motivatie of bewijs?",
    answer:
      "Beide. Motivatie zonder bewijs is te dun, maar bewijs zonder richting voelt willekeurig. De sterkste brief laat zien waarom jij deze rol wilt en welk concreet potentieel je al kunt onderbouwen.",
  },
];

export const metadata: Metadata = {
  title: "Motivatiebrief zonder werkervaring in 2026: zo overtuig je toch | WerkCV",
  description:
    "Schrijf een sterke motivatiebrief zonder werkervaring met voorbeelden, structuur en bewijsblokken uit studie, stage, projecten en bijbanen. Inclusief startertips.",
  keywords: [
    "motivatiebrief zonder werkervaring",
    "sollicitatiebrief zonder werkervaring",
    "motivatiebrief starter",
    "eerste baan motivatiebrief",
    "motivatiebrief zonder ervaring voorbeeld",
    "brief zonder werkervaring",
  ],
  alternates: {
    canonical: "https://werkcv.nl/motivatiebrief-zonder-werkervaring",
    languages: {
      "nl-NL": "https://werkcv.nl/motivatiebrief-zonder-werkervaring",
      "x-default": "https://werkcv.nl/motivatiebrief-zonder-werkervaring",
    },
  },
};

export default function MotivatiebriefZonderWerkervaringPage() {
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
        name: "Motivatiebrief zonder werkervaring",
        item: "https://werkcv.nl/motivatiebrief-zonder-werkervaring",
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
              Intent: motivatiebrief zonder werkervaring
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Motivatiebrief zonder werkervaring die toch geloofwaardig voelt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Geen jaren werkervaring betekent niet dat je brief leeg hoeft te zijn. Gebruik je
              studie, stage, projecten, bijbaan en leervermogen als bewijs en laat zien waarom deze
              rol logisch is als volgende stap.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Schrijf direct je brief
              </Link>
              <Link
                href="/cv-tips/cv-zonder-werkervaring"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk ook je CV zonder werkervaring
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat telt als bewijs zonder werkervaring?</h2>
            <div className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <p>Stage en studieprojecten met een concreet resultaat.</p>
              <p>Bijbanen of vrijwilligerswerk die verantwoordelijkheid tonen.</p>
              <p>Vakken, tools of certificaten die direct relevant zijn voor de rol.</p>
              <p>Een duidelijke uitleg waarom deze functie logisch is voor jouw volgende stap.</p>
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/motivatiebrief-stage-voorbeeld"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook: motivatiebrief stage voorbeeld
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bewijsblokken
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Waar je brief wél op kan leunen
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {proofBlocks.map((block) => (
              <article
                key={block.title}
                className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-xl font-black text-black">{block.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{block.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready voorbeelden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Motivatiebrief voorbeeldblokken zonder werkervaring
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
              Alleen uitleggen wat ontbreekt
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-200">
              {mistakes.map((mistake) => (
                <li key={mistake}>{mistake}</li>
              ))}
            </ul>
          </div>
          <div className="border-4 border-black bg-white p-6">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Slimme vervolgstappen
            </p>
            <div className="mt-4 space-y-4">
              {[
                {
                  href: "/motivatiebrief-schrijven",
                  title: "Motivatiebrief schrijven",
                  body: "Gebruik de volledige schrijfstructuur zodra je starterbewijs helder is.",
                },
                {
                  href: "/sollicitatiebrief-beginnen",
                  title: "Sollicitatiebrief beginnen",
                  body: "Handig als je vooral zoekt naar een eerste zin die niet te algemeen voelt.",
                },
                {
                  href: "/motivatiebrief-stage-voorbeeld",
                  title: "Motivatiebrief stage voorbeeld",
                  body: "Vergelijk extra voorbeelden als jouw beste bewijs uit stage of opleiding komt.",
                },
                {
                  href: "/cv-tips/cv-zonder-werkervaring",
                  title: "CV zonder werkervaring",
                  body: "Laat je brief en cv dezelfde starterlogica volgen.",
                },
                {
                  href: "/cv-maken-student",
                  title: "CV maken als student",
                  body: "Bouw daarna een starter-cv dat past bij je brief en eerste sollicitaties.",
                },
                {
                  href: "/tools/sollicitatiebrief-generator",
                  title: "Sollicitatiebrief generator",
                  body: "Zet je studie, stage en projecten direct om in een complete brief.",
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
            Veelgestelde vragen over een motivatiebrief zonder werkervaring
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
                Klaar voor je eerste echte brief?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Laat motivatie en starterbewijs samen voor je werken
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Gebruik deze pagina als basis voor je brief en bouw daarna een cv dat dezelfde
                richting, voorbeelden en toon ondersteunt.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start met brief
              </Link>
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Bouw ook je CV
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
