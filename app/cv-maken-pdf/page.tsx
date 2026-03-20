import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { templateList } from "@/lib/templates/registry";

const pdfBenefits = [
  "PDF houdt je layout stabiel op laptop, mobiel en ATS-preview.",
  "Recruiters zien exact dezelfde opmaak als jij bedoelde.",
  "Je voorkomt verschuivende regels of kapotte koppen uit Word-bestanden.",
  "Een PDF voelt direct definitiever en professioneler als bijlage.",
];

const pdfFlow = [
  {
    title: "1) Maak je CV eerst in een editor of vaste template",
    body: "Een PDF is een eindvorm, geen fijne schrijfomgeving. Bouw je CV eerst in een omgeving waar inhoud en layout makkelijk aanpasbaar zijn.",
  },
  {
    title: "2) Controleer titel, profiel en recente ervaring",
    body: "Zorg dat de eerste scan klopt voordat je exporteert. Een nette PDF helpt alleen als de inhoud direct relevant voelt.",
  },
  {
    title: "3) Bekijk de PDF altijd op mobiel en desktop",
    body: "Veel recruiters openen bijlagen eerst in een compacte preview. Check daarom of koppen, witruimte en bullets overal rustig blijven.",
  },
  {
    title: "4) Verstuur pas nadat je de eindversie hebt vastgezet",
    body: "PDF werkt juist goed omdat je sollicitatieversie na export niet meer ongewenst verschuift.",
  },
];

const faqs = [
  {
    question: "Hoe maak ik een cv als PDF?",
    answer:
      "De beste route is eerst je CV opbouwen in een editor of template en daarna exporteren naar PDF. Zo houd je controle over inhoud én een stabiele eindlayout.",
  },
  {
    question: "Is PDF beter dan Word voor sollicitaties?",
    answer:
      "Meestal wel. PDF voorkomt layoutverschillen en maakt de kans kleiner dat recruiters een verschoven of rommelige versie zien.",
  },
  {
    question: "Kan ik bij WerkCV een PDF-CV maken?",
    answer:
      "Ja. Je bouwt je CV in de editor op en downloadt daarna de definitieve versie als PDF zodra alles klopt.",
  },
  {
    question: "Moet een cv altijd als PDF worden verstuurd?",
    answer:
      "In de meeste gevallen wel, tenzij een werkgever expliciet om een ander formaat vraagt. PDF is voor standaardsollicitaties de veiligste keuze.",
  },
];

export const metadata: Metadata = {
  title: "CV Maken PDF - Maak Eerst Goed, Download Daarna Stabiel | WerkCV.nl",
  description:
    "CV maken als PDF? Leer waarom PDF de beste eindvorm is voor sollicitaties en bouw je CV eerst rustig op in de editor voordat je downloadt.",
  keywords: [
    "cv maken pdf",
    "cv pdf maken",
    "pdf cv maken",
    "cv in pdf maken",
    "gratis cv maken pdf",
    "cv maken gratis pdf",
  ],
  alternates: {
    canonical: "https://werkcv.nl/cv-maken-pdf",
    languages: {
      "nl-NL": "https://werkcv.nl/cv-maken-pdf",
      "x-default": "https://werkcv.nl/cv-maken-pdf",
    },
  },
};

export default function CvMakenPdfPage() {
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
        name: "CV Maken PDF",
        item: "https://werkcv.nl/cv-maken-pdf",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "CV als PDF maken in 4 stappen",
    description:
      "Praktische flow om eerst een sterk CV op te bouwen en daarna als stabiele PDF te downloaden.",
    totalTime: "PT15M",
    step: pdfFlow.map((step) => ({
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
              PDF-intentie
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV maken als PDF begint met een goede editor, niet met een losse file
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Zoekers op <strong>cv maken pdf</strong> willen meestal een nette
              sollicitatieversie die overal hetzelfde oogt. PDF is inderdaad de beste
              eindvorm, maar niet de slimste startvorm. WerkCV laat je eerst opbouwen,
              daarna pas stabiel downloaden.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/editor"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bouw je PDF-versie
              </Link>
              <Link
                href="/gratis-cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Start gratis
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                `${templateList.length} templates als basis`,
                "Stabiele PDF als eindversie",
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
            <h2 className="text-xl font-black text-black">Waarom PDF de beste eindvorm is</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              {pdfBenefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Exportflow
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Zo maak je een nette CV-PDF zonder layoutproblemen
          </h2>
          <div className="mt-6 space-y-4">
            {pdfFlow.map((step, index) => (
              <div key={step.title} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-black text-black">{step.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-relaxed text-slate-700">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-14 grid gap-4 md:grid-cols-3">
          {[
            {
              href: "/cv-maken-in-word",
              title: "CV maken in Word",
              body: "Zie waarom Word vaak vooral een tussenstap is richting PDF.",
            },
            {
              href: "/online-cv-maken",
              title: "Online CV maken",
              body: "Bouw eerst flexibel online voordat je de eindversie vastzet.",
            },
            {
              href: "/cv-maken-op-mobiel",
              title: "CV maken op mobiel",
              body: "Controleer ook of je CV-flow goed werkt op je telefoon.",
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
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen over CV als PDF maken</h2>
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
