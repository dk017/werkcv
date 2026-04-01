import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["simple", "professional", "ats", "modern"].includes(template.id),
);

const studentUseCases: Record<string, string> = {
  simple:
    "Sterke start voor studenten die snel een eerste versie willen bouwen zonder afleiding.",
  professional:
    "Handig als je stage, studieprojecten en bijbaanervaring rustig en volwassen wilt presenteren.",
  ats: "Slim als je ook op trainee-, stage- of juniorrollen solliciteert waar scanbaarheid telt.",
  modern:
    "Past als je voor marketing, communicatie of digitale startersrollen net iets frisser wilt ogen.",
};

const studentSteps = [
  {
    title: "1) Begin met een duidelijke doelrol",
    body: "Zet bovenaan niet alleen 'student', maar ook waarop je mikt: stage, bijbaan, traineeship of eerste baan. Dat geeft richting aan de rest van je CV.",
  },
  {
    title: "2) Gebruik stage, projecten en bijbaan als bewijs",
    body: "Ook zonder fulltime werkervaring kun je laten zien dat je verantwoordelijkheid neemt, samenwerkt en resultaat levert.",
  },
  {
    title: "3) Houd je student-CV compact",
    body: "Voor de meeste studenten is 1 pagina genoeg. Prioriteer relevante ervaring, vaardigheden en schoolprojecten die echt aansluiten op de functie.",
  },
  {
    title: "4) Pas je profieltekst per vacature aan",
    body: "Een student-CV wint wanneer je laat zien waarom jij juist voor die stage, bijbaan of startersrol past.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik een goed cv als student?",
    answer:
      "Gebruik studie, stage, projecten, bestuurswerk, vrijwilligerswerk en bijbaanervaring als bewijs van vaardigheden. Houd het compact en relevant voor de rol waarop je solliciteert.",
  },
  {
    question: "Mag ik een student-CV op 1 pagina houden?",
    answer:
      "Ja. Voor de meeste studenten is 1 pagina de beste keuze. Dat dwingt je om alleen de meest relevante informatie te laten zien.",
  },
  {
    question: "Wat zet ik op mijn cv als student zonder veel ervaring?",
    answer:
      "Focus op studieprojecten, stages, bijbanen, vrijwilligerswerk, software, talen en een sterke profieltekst die je motivatie en richting duidelijk maakt.",
  },
  {
    question: "Kan ik als student gratis beginnen?",
    answer:
      "Ja. Je kunt gratis starten in de editor, je CV opbouwen en pas betalen als je de definitieve PDF wilt downloaden.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken Student - Sterk Student-CV voor Stage, Bijbaan en Starter | WerkCV.nl",
  description:
    "CV maken als student? Bouw snel een sterk student-CV met stage, projecten, bijbaan en profieltekst. Start gratis in de editor en download later als PDF.",
  keywords: [
    "cv maken student",
    "studenten cv maken",
    "cv maken als student",
    "cv student maken",
    "gratis cv maken student",
    "student cv maken",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-student",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-student",
      "x-default": "https://werkcv.nl/cv-maken-student",
    },
  },
};

export default function CvMakenStudentPage() {
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
        name: "CV Maken Student",
        item: "https://werkcv.nl/cv-maken-student",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Student-CV maken in 4 stappen",
    description:
      "Praktische aanpak voor studenten die een stage-, bijbaan- of starters-CV willen maken.",
    totalTime: "PT20M",
    step: studentSteps.map((step) => ({
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
              Student-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken als student zonder vast te lopen op weinig werkervaring
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een goed student-CV draait niet om jarenlang werkverleden, maar om
              slim laten zien wat je al hebt gedaan: stage, schoolprojecten, bijbaan,
              bestuur, vrijwilligerswerk en vaardigheden. WerkCV helpt je die
              ervaring om te zetten in een rustige, recruiter-proof versie.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Start je student-CV
              </Link>
              <Link
                href="/cv-voorbeelden/studenten-en-starters/student-cv"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Bekijk student voorbeeld
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Wat recruiters wél willen zien</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Een duidelijke doelrol: stage, bijbaan, trainee of junior functie.</li>
              <li>Praktisch bewijs uit studie, stage, project of bijbaan.</li>
              <li>Een korte profieltekst die motivatie en richting laat zien.</li>
              <li>Een rustige template die je potentie professioneel presenteert.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
          {featuredTemplates.map((template) => (
            <article
              key={template.id}
              className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-600">
                Template
              </p>
              <h2 className="mt-2 text-2xl font-black text-black">{template.nameDutch}</h2>
              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                {studentUseCases[template.id] ?? template.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/editor"
                  className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black"
                >
                  Gebruik deze template
                </Link>
                <Link
                  href="/templates"
                  className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
                >
                  Vergelijk layouts
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Stappenplan
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je als student snel een sterk CV
          </h2>
          <div className="mt-6 space-y-4">
            {studentSteps.map((step, index) => (
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
              href: "/cv-voorbeelden/studenten-en-starters/student-cv",
              title: "CV voorbeeld student",
              body: "Bekijk hoe een sterk studentprofiel is opgebouwd.",
            },
            {
              href: "/cv-voorbeelden/studenten-en-starters/stage-cv",
              title: "CV voorbeeld stage",
              body: "Zie hoe je stage-intentie en studieprojecten sterk koppelt.",
            },
            {
              href: "/cv-tips/cv-maken-als-student",
              title: "CV tips voor studenten",
              body: "Lees extra uitleg over lengte, inhoud en veelgemaakte fouten.",
            },
            {
              href: "/stage-cv-maken",
              title: "Stage CV maken",
              body: "Ga door naar de aparte stage-zoekintentie.",
            },
            {
              href: "/cv-gids/cv-voorbeeld-student-bijbaan",
              title: "CV voorbeeld student bijbaan",
              body: "Pak een kort, scanbaar voorbeeld voor winkel-, horeca- of logistiek werk naast je studie.",
            },
            {
              href: "/cv-middelbare-school-student",
              title: "CV middelbare school student",
              body: "Gebruik deze route als je nog op school zit en een eerste CV zoekt voor stage of bijbaan.",
            },
            {
              href: "/cv-gids/cv-voorbeeld-zonder-ervaring",
              title: "CV zonder ervaring",
              body: "Gebruik de BOFU gids als school, stage en kleine jobs nu nog je belangrijkste bewijs zijn.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over student-CV&apos;s</h2>
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
