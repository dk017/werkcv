import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

const quickChecklist = [
  "Address the role and company directly in your opening.",
  "Show 1-2 quantified results from relevant experience.",
  "Use clear, direct English instead of literal Dutch translations.",
  "Close with a confident call to action for an interview.",
];

const structureBlocks = [
  {
    title: "1) Greeting and opening",
    body: "Use a professional salutation and state the role immediately. Keep your first lines direct and relevant to the vacancy.",
  },
  {
    title: "2) Why you fit the role",
    body: "Connect your experience to what the employer asks. Mention concrete outcomes instead of broad claims.",
  },
  {
    title: "3) Why this company",
    body: "Show that you understand the company context. Keep this short, specific, and tied to your motivation.",
  },
  {
    title: "4) Closing and next step",
    body: "End politely with confidence. Ask for an interview and thank the reader for their consideration.",
  },
];

const copyReadyExamples = [
  {
    title: "Opening example (operations/admin)",
    text: "I am excited to apply for the Administrative Specialist position at [Company]. With five years of experience in process coordination and document control, I have consistently improved workflow accuracy and turnaround times in fast-paced teams.",
  },
  {
    title: "Body example (customer support)",
    text: "In my current role, I handle high-volume customer cases across email and phone while maintaining a 9.1/10 customer satisfaction score. I also reduced average case resolution time by 17% by introducing a clearer escalation process.",
  },
  {
    title: "Closing example (starter/junior)",
    text: "I would welcome the opportunity to discuss how my internship experience and proactive mindset can contribute to your team. Thank you for your time and consideration. I look forward to hearing from you.",
  },
];

const commonMistakes = [
  {
    title: "Literal Dutch translation",
    wrong: "With this letter I apply for the function...",
    better:
      "I am writing to apply for the [Job Title] position at [Company].",
  },
  {
    title: "Generic motivation without evidence",
    wrong: "I am motivated and hardworking.",
    better:
      "I improved monthly reporting speed by 30% by redesigning the internal workflow.",
  },
  {
    title: "Too informal tone for corporate roles",
    wrong: "Hi team, I would love to join your company!",
    better:
      "Dear Hiring Manager, I am excited to apply for the [Job Title] role.",
  },
  {
    title: "Weak closing without action",
    wrong: "I hope you like my letter.",
    better:
      "I would welcome the opportunity to discuss how I can contribute to your team.",
  },
];

const englishLetterRules = [
  "Keep your letter concise: usually 3 to 5 short paragraphs.",
  "Use active voice and clear verbs.",
  "Avoid long multi-clause sentences.",
  "Match keywords from the vacancy naturally.",
  "Check grammar and spelling before sending.",
];

const faqs = [
  {
    question: "How long should a sollicitatiebrief in English be?",
    answer:
      "Usually 3 to 5 short paragraphs are enough. Focus on role fit, relevant achievements, and a clear closing call to action.",
  },
  {
    question: "Can I translate my Dutch letter into English directly?",
    answer:
      "It is better to rewrite than translate literally. Direct translation often sounds unnatural. Use clear English phrasing and role-specific examples.",
  },
  {
    question: "What is the best opening for an English cover letter?",
    answer:
      "State the role and your fit immediately, for example: 'I am writing to apply for the [Job Title] position at [Company].'",
  },
  {
    question: "Should I include my CV with an English letter?",
    answer:
      "Yes. Pair your English letter with a matching English CV so your profile, terminology, and tone stay consistent.",
  },
  {
    question: "Is a motivatiebrief the same as an English cover letter?",
    answer:
      "In practice they serve the same goal: explain motivation and fit for the role. In English applications, the expected format is typically called a cover letter.",
  },
];

const sources = [
  {
    label: "Indeed NL - How to write an English cover letter",
    href: "https://nl.indeed.com/carrieregids/cv-motivatiebrief/sollicitatiebrief-engels",
  },
  {
    label: "Resume.io - Cover letter examples and structure patterns",
    href: "https://resume.io/cover-letter-examples",
  },
  {
    label: "Zety - Cover letter examples and best-practice formatting",
    href: "https://zety.com/cover-letter-examples",
  },
  {
    label: "Purdue OWL - Professional correspondence conventions",
    href: "https://owl.purdue.edu/owl/job_search_writing/job_search_letters/index.html",
  },
];

export const metadata: Metadata = {
  title: "Sollicitatiebrief in Engels - Voorbeelden + Opbouw | WerkCV",
  description:
    "Schrijf een sterke sollicitatiebrief in Engels met copy-ready voorbeelden, structuur per alinea en veelgemaakte fouten met verbeterde versies.",
  keywords: [
    "sollicitatiebrief in engels",
    "engelse sollicitatiebrief",
    "sollicitatiebrief engels voorbeeld",
    "cover letter english example",
    "opbouw sollicitatiebrief engels",
    "format sollicitatiebrief engels",
  ],
  alternates: {
    canonical: "https://werkcv.nl/sollicitatiebrief-in-engels",
    languages: {
      "nl-NL": "https://werkcv.nl/sollicitatiebrief-in-engels",
      "x-default": "https://werkcv.nl/sollicitatiebrief-in-engels",
    },
  },
};

export default function SollicitatiebriefInEngelsPage() {
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
        name: "Sollicitatiebrief in Engels",
        item: "https://werkcv.nl/sollicitatiebrief-in-engels",
      },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Sollicitatiebrief in Engels schrijven",
    description: "Praktische structuur voor een sterke English cover letter.",
    totalTime: "PT35M",
    step: structureBlocks.map((block) => ({
      "@type": "HowToStep",
      name: block.title,
      text: block.body,
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
              Taal-intentie: sollicitatiebrief in Engels
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Sollicitatiebrief in Engels schrijven zonder letterlijke vertaalfouten
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Een goede Engelse sollicitatiebrief is kort, direct en resultaatgericht. Veel Nederlandse kandidaten verliezen impact door te letterlijk vertalen. Op deze pagina vind je een duidelijke
              opbouw, copy-ready voorbeelden en fout-naar-goed correcties waarmee je sneller een professionele English cover letter schrijft.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Write in generator
              </Link>
              <Link
                href="/engels-cv-template"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Match with English CV
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                "English-ready examples",
                "Dutch-to-English mistake fixes",
                "Direct generator workflow",
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
            <h2 className="text-xl font-black text-black">Quick English cover letter checklist</h2>
            <div className="mt-5 space-y-4">
              {quickChecklist.map((item, index) => (
                <div key={item} className="flex gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center border-2 border-black bg-yellow-300 text-xs font-black">
                    {index + 1}
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-slate-700">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t-4 border-black pt-5">
              <Link
                href="/cv-tips/sollicitatiebrief-tips"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Read also: sollicitatiebrief tips
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Structuur
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Opbouw van een sterke English cover letter
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {structureBlocks.map((block) => (
              <article
                key={block.title}
                className="border-4 border-black bg-white p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="text-lg font-black text-black">{block.title}</h3>
                <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">{block.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Copy-ready content
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Sollicitatiebrief in Engels voorbeelden per onderdeel
          </h2>
          <div className="mt-6 space-y-5">
            {copyReadyExamples.map((example) => (
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

        <section className="mb-14 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
              Fout naar goed
            </p>
            <h2 className="mt-2 text-2xl font-black">
              Veelgemaakte fouten bij een Engelse sollicitatiebrief
            </h2>
            <div className="mt-4 space-y-4">
              {commonMistakes.map((mistake) => (
                <div key={mistake.title}>
                  <p className="text-sm font-bold text-slate-100">{mistake.title}</p>
                  <p className="mt-1 text-sm font-medium text-slate-300">
                    <span className="font-black">Wrong:</span> {mistake.wrong}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-100">
                    <span className="font-black">Better:</span> {mistake.better}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Kwaliteitscheck
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              English letter best-practice rules
            </h2>
            <ul className="mt-4 space-y-2 text-sm font-medium leading-relaxed text-slate-700">
              {englishLetterRules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <div className="mt-6 border-t-2 border-black pt-4">
              <Link
                href="/sollicitatiebrief-maken"
                className="text-sm font-black text-black underline decoration-2 underline-offset-4"
              >
                Bekijk ook de centrale sollicitatiebrief hub
              </Link>
              <div className="mt-3">
                <Link
                  href="/sollicitatiebrief-voorbeeld"
                  className="text-sm font-black text-black underline decoration-2 underline-offset-4"
                >
                  Bekijk ook NL sollicitatiebrief voorbeelden
                </Link>
              </div>
              <div className="mt-3">
                <Link
                  href="/cv-maken-in-engels"
                  className="text-sm font-black text-black underline decoration-2 underline-offset-4"
                >
                  Bouw ook je CV in het Engels met de complete gids
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen en checkdatum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Richtlijnen gecheckt op 8 april 2026
          </h2>
          <div className="mt-6 space-y-3">
            {sources.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over sollicitatiebrief in Engels
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
                Ready to apply in English?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Write your English letter and pair it with a matching CV
              </h2>
              <p className="mt-2 text-sm font-medium leading-relaxed text-black sm:text-base">
                Start in the generator, finalize your wording, and align your letter with an English CV for one consistent application.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/sollicitatiebrief-generator"
                className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Open generator
              </Link>
              <Link
                href="/editor"
                className="inline-block border-4 border-black bg-black px-5 py-3 text-base font-black text-white"
              >
                Open CV editor
              </Link>
            </div>
          </div>
        </section>
      </main>

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

      <Footer />
    </div>
  );
}
