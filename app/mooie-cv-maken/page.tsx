import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const featuredTemplates = templateList.filter((template) =>
  ["modern", "remarkable", "elegant"].includes(template.id),
);

const templateUseCases: Record<string, string> = {
  modern:
    "Sterke keuze als je een frisse, professionele uitstraling wilt zonder te creatief te worden.",
  remarkable:
    "Handig als je iets opvallender mag zijn, maar nog steeds een duidelijke CV-structuur wilt houden.",
  elegant:
    "Werkt goed als je mooie opmaak zoekt met meer rust, verfijning en minder visuele drukte.",
};

const designSteps = [
  {
    title: "1) Bepaal eerst welk type mooi je bedoelt",
    body: "Mooi kan strak, modern, creatief of verfijnd betekenen. Zonder die keuze voelt een designroute al snel willekeurig.",
  },
  {
    title: "2) Laat leesbaarheid altijd winnen van decoratie",
    body: "Een mooie CV-layout werkt alleen als koppen, witruimte en hiërarchie recruiters nog steeds snel naar de kern leiden.",
  },
  {
    title: "3) Kies één visuele richting en hou die vast",
    body: "Mooie CV's voelen consistent. Als typografie, kleur en secties dezelfde stijl spreken, oogt de pagina meteen professioneler.",
  },
  {
    title: "4) Gebruik design om de inhoud sterker te maken",
    body: "Een mooie template moet je ervaring beter laten uitkomen, niet verstoppen. De inhoud blijft het zwaarste onderdeel.",
  },
  {
    title: "5) Controleer altijd of de PDF nog rustig leest",
    body: "Wat in de editor aantrekkelijk oogt, moet in de eind-PDF nog steeds helder, serieus en niet te druk aanvoelen.",
  },
];

const beautySignals = [
  "Duidelijke hiërarchie tussen naam, titel en secties.",
  "Witruimte die rust geeft in plaats van lege gaten.",
  "Een samenhangende kleur- en typografiekeuze.",
  "Design dat de inhoud ondersteunt in plaats van overneemt.",
];

const mistakes = [
  {
    title: "Te veel willen opvallen",
    body: "Als elk blok aandacht vraagt, blijft er juist minder focus over voor je profiel en ervaring.",
  },
  {
    title: "Mooi verwarren met creatief om het creatieve",
    body: "Voor de meeste sollicitaties is verzorgd, helder en consistent mooier dan experimenteel design.",
  },
  {
    title: "Geen rekening houden met sector en rol",
    body: "Een mooi CV voor marketing mag meer uitstraling hebben dan een mooi CV voor finance of operations.",
  },
  {
    title: "De inhoud te laat aanscherpen",
    body: "Een mooie template redt geen vage profieltekst of rommelige werkervaring. Eerst de kern, dan de afwerking.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik een mooi cv zonder dat het te druk wordt?",
    answer:
      "Kies één duidelijke stijlrichting, gebruik voldoende witruimte en laat standaardsecties duidelijk leesbaar blijven. Een mooi CV voelt verzorgd, niet volgestopt.",
  },
  {
    question: "Welke templates zijn het mooist op WerkCV?",
    answer:
      "Voor veel gebruikers zijn Modern, Remarkable en Elegant de sterkste keuzes als uitstraling belangrijk is. Welke het best past hangt af van hoe strak of creatief je wilt ogen.",
  },
  {
    question: "Kan een mooi cv nog steeds professioneel zijn?",
    answer:
      "Ja. Mooie opmaak en professionaliteit sluiten elkaar niet uit, zolang de inhoud dominant blijft en de layout recruiters niet afleidt van je kerninformatie.",
  },
  {
    question: "Is een mooi cv geschikt voor elke sector?",
    answer:
      "Niet in dezelfde vorm. Voor creatieve rollen mag je meer visuele persoonlijkheid tonen dan voor formele functies zoals finance, overheid of operations.",
  },
];

export const metadata: Metadata = {
  title: "Mooie CV Maken - Verzorgde Opmaak Zonder Overdesign | WerkCV",
  description:
    "Mooie cv maken? Kies een stijlvolle template met rust, hiërarchie en verzorgde opmaak zodat je CV mooi oogt zonder recruiter-focus te verliezen.",
  keywords: [
    "mooie cv maken",
    "mooi cv maken",
    "mooie curriculum vitae",
    "mooie cv template",
    "stijlvol cv maken",
    "net cv ontwerpen",
  ],
  alternates: {
    canonical: "https://werkcv.nl/mooie-cv-maken",
    languages: {
      "nl-NL": "https://werkcv.nl/mooie-cv-maken",
      "x-default": "https://werkcv.nl/mooie-cv-maken",
    },
  },
};

export default function MooieCvMakenPage() {
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
        name: "Mooie CV maken",
        item: "https://werkcv.nl/mooie-cv-maken",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Mooie CV maken in 5 stappen",
    description:
      "Praktische route voor sollicitanten die een stijlvolle, verzorgde CV-layout willen zonder overdesign.",
    totalTime: "PT25M",
    step: designSteps.map((step) => ({
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
            href="/templates"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Bekijk templates
          </Link>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Design-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Mooie CV maken die verzorgd oogt zonder dat het te druk wordt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Mooie cv maken betekent meestal niet dat je de meest opvallende
              layout nodig hebt. Het betekent dat je CV verzorgd, samenhangend en
              prettig leesbaar voelt, met genoeg stijl om professioneel over te
              komen zonder de inhoud te overschaduwen.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-medium leading-relaxed text-slate-600">
              Deze pagina pakt vooral de vraag aan hoe je CV verzorgd en
              aantrekkelijk oogt. Voor het bredere stappenplan rond inhoud,
              structuur en vacatureaanpassing gebruik je beter de{" "}
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
                href="/templates"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Kies een mooie template
              </Link>
              <Link
                href="/editor"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start in editor
              </Link>
            </div>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">
              Signalen van een mooie maar bruikbare CV
            </h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {beautySignals.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Opmaakroute
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je je CV mooier zonder recruiter-focus kwijt te raken
          </h2>
          <div className="mt-6 space-y-4">
            {designSteps.map((step, index) => (
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

        <section className="mb-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
                Aanbevolen templates
              </p>
              <h2 className="text-3xl font-black text-black">
                Templates voor een mooie en verzorgde uitstraling
              </h2>
            </div>
            <Link
              href="/templates"
              className="text-sm font-black text-black underline decoration-2 underline-offset-4"
            >
              Bekijk alle templates
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="flex h-full flex-col border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  {template.nameDutch}
                </p>
                <h3 className="mt-2 text-xl font-black text-black">
                  {template.name}
                </h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {template.description}
                </p>
                <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
                  {templateUseCases[template.id]}
                </p>
                <div className="mt-auto pt-5">
                  <Link
                    href="/editor"
                    className="inline-block border-2 border-black bg-yellow-400 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-black"
                  >
                    Start nu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-6 md:grid-cols-2">
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
              href: "/cv-ontwerpen",
              title: "CV ontwerpen",
              body: "Ga dieper op ontwerpkeuzes in als layout, stijl en uitstraling je hoofdvraag zijn.",
            },
            {
              href: "/cv-maken",
              title: "CV maken",
              body: "Gebruik daarna het brede stappenplan als je behalve uitstraling ook inhoud en vacaturematch wilt verbeteren.",
            },
            {
              href: "/cv-opmaken",
              title: "CV opmaken",
              body: "Verfijn daarna witruimte, hiërarchie en eindpresentatie van je gekozen template.",
            },
            {
              href: "/templates",
              title: "CV templates",
              body: "Vergelijk alle stijlen naast elkaar als je nog twijfelt tussen strak, opvallend of elegant.",
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

        <section className="mb-14 border-4 border-black bg-black p-8 text-white shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
          <h2 className="text-3xl font-black">
            Een mooi CV voelt vooral verzorgd, niet overdreven ontworpen
          </h2>
          <p className="mt-4 max-w-3xl text-base font-medium leading-relaxed text-slate-200">
            Recruiters onthouden zelden losse decoratie, maar wel een document dat
            rustig leest en professioneel oogt. Gebruik design dus als versterker
            van je verhaal, niet als vervanging ervan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/templates"
              className="border-4 border-white bg-yellow-400 px-5 py-3 text-base font-black text-black"
            >
              Bekijk mooie templates
            </Link>
            <Link
              href="/prijzen"
              className="border-4 border-white bg-transparent px-5 py-3 text-base font-black text-white"
            >
              Bekijk prijzen
            </Link>
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-3xl font-black text-black">
            Veelgestelde vragen over mooie CV maken
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
