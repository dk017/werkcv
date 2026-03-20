import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const stageSteps = [
  {
    title: "1) Zet de stagefunctie of richting direct bovenaan",
    body: "Recruiters willen snel zien of je op marketing, HR, finance, zorg, IT of een andere stage richt. Maak dat meteen duidelijk.",
  },
  {
    title: "2) Gebruik studieprojecten en opdrachten als bewijs",
    body: "Als je nog geen eerdere stage hebt, kunnen schoolprojecten, portfolio-werk en verenigingsactiviteiten prima laten zien wat je kunt.",
  },
  {
    title: "3) Benoem wat je wilt leren én wat je al kunt bijdragen",
    body: "Een goed stage-CV laat niet alleen motivatie zien, maar ook initiatief, softwarekennis, samenwerking en praktische output.",
  },
  {
    title: "4) Houd het relevant en compact",
    body: "Voor een stage-CV is 1 pagina meestal genoeg. Laat vooral alles weg wat niets toevoegt aan de rol waarop je solliciteert.",
  },
];

const stageSignals = [
  "Heldere stage-richting of opleidingscontext.",
  "Projecten, opdrachten of portfolio met concrete output.",
  "Beschikbaarheid en leerhouding.",
  "Rustige opmaak zonder overdesign.",
];

const faqs = [
  {
    question: "Wat zet ik op mijn cv voor een stage?",
    answer:
      "Zet je opleiding, relevante vakken, projecten, software, vrijwilligerswerk, bijbaanervaring en een korte profieltekst op je stage-CV. Focus op potentie en bewijs.",
  },
  {
    question: "Kan ik een stage-cv maken zonder eerdere stage?",
    answer:
      "Ja. Gebruik schoolprojecten, praktijkopdrachten, portfolio, bestuurswerk en bijbanen om te laten zien dat je verantwoordelijkheid neemt en iets oplevert.",
  },
  {
    question: "Hoe lang mag een stage-cv zijn?",
    answer:
      "Voor de meeste stagekandidaten is 1 pagina voldoende. Recruiters willen snel zien wat relevant is, niet alles wat je ooit hebt gedaan.",
  },
  {
    question: "Kan ik gratis beginnen met mijn stage-cv?",
    answer:
      "Ja. WerkCV laat je gratis starten in de editor. Je betaalt alleen als je later de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "Stage CV Maken - Sterk CV voor Stageplek en Afstudeerstage | WerkCV.nl",
  description:
    "Stage cv maken? Zet opleiding, projecten, stage-intentie en vaardigheden om in een sterk stage-CV. Start gratis in de editor en download later als PDF.",
  keywords: [
    "stage cv maken",
    "cv maken stage",
    "cv maken voor stage",
    "stage cv",
    "stage sollicitatie cv",
    "cv stage maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/stage-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/stage-cv-maken",
      "x-default": "https://werkcv.nl/stage-cv-maken",
    },
  },
};

export default function StageCvMakenPage() {
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
        name: "Stage CV Maken",
        item: "https://werkcv.nl/stage-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Stage-CV maken in 4 stappen",
    description:
      "Praktische aanpak voor studenten die een sterk CV voor stage of afstudeerstage willen bouwen.",
    totalTime: "PT20M",
    step: stageSteps.map((step) => ({
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
              Stage-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Stage CV maken dat laat zien wat je al kunt en wat je snel gaat leren
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een stage-CV hoeft niet vol werkervaring te zitten. Het moet vooral
              geloofwaardig laten zien dat jij de basis hebt om snel mee te draaien:
              opleiding, projecten, software, verantwoordelijkheidsgevoel en een
              duidelijke leerhouding.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start je stage-CV
              </Link>
              <Link
                href="/cv-voorbeelden/studenten-en-starters/stage-cv"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk stage voorbeeld
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Waar stagebegeleiders op letten</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {stageSignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Stappenplan
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo bouw je een stage-CV dat serieus overkomt
          </h2>
          <div className="mt-6 space-y-4">
            {stageSteps.map((step, index) => (
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

        <section className="mb-14 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              href: "/cv-voorbeelden/studenten-en-starters/stage-cv",
              title: "Stage CV voorbeeld",
              body: "Zie hoe een stagegerichte versie inhoudelijk is opgebouwd.",
            },
            {
              href: "/cv-voorbeelden/studenten-en-starters/student-cv",
              title: "Student CV voorbeeld",
              body: "Gebruik dit als bredere basis voor studie, projecten en stage.",
            },
            {
              href: "/cv-maken-student",
              title: "CV maken student",
              body: "Ga terug naar de bredere student-intentie voor meer context.",
            },
            {
              href: "/cv-voorbeelden/studenten-en-starters/eerste-baan-starter",
              title: "Eerste baan starter",
              body: "Handig als je stage en eerste baan dicht tegen elkaar aan zitten.",
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

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over stage-CV's</h2>
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
