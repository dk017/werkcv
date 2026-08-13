import Link from "next/link";
import Footer from "@/components/Footer";

export type EmployerMotivationPageData = {
  slug: string;
  eyebrow: string;
  title: string;
  intro: string;
  presetSlug: string;
  presetLabel: string;
  updatedAt: string;
  roleOptions: string[];
  evidenceRows: Array<{
    requirement: string;
    weak: string;
    strong: string;
  }>;
  researchTitle: string;
  researchParagraphs: string[];
  exampleTitle: string;
  exampleContext: string;
  exampleParagraphs: string[];
  customizationSteps: string[];
  mistakes: Array<{ title: string; body: string }>;
  sources: Array<{ publisher: string; title: string; url: string; note: string }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ href: string; title: string; description: string }>;
};

export default function EmployerMotivationLetterPage({ data }: { data: EmployerMotivationPageData }) {
  const canonical = `https://werkcv.nl/${data.slug}`;
  const generatorHref = `/tools/sollicitatiebrief-generator?voorbeeld=${encodeURIComponent(data.presetSlug)}#brief-generator`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    dateModified: data.updatedAt,
    datePublished: data.updatedAt,
    inLanguage: "nl-NL",
    mainEntityOfPage: canonical,
    author: { "@type": "Organization", name: "WerkCV" },
    publisher: { "@type": "Organization", name: "WerkCV", url: "https://werkcv.nl" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://werkcv.nl" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Motivatiebrief voorbeelden",
        item: "https://werkcv.nl/motivatiebrief-voorbeeld",
      },
      { "@type": "ListItem", position: 3, name: data.presetLabel, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-2xl font-black tracking-tight text-black">
            Werk<span className="bg-yellow-400 px-1">CV</span>.nl
          </Link>
          <Link
            href={generatorHref}
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black hover:bg-yellow-300"
          >
            Maak mijn brief
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <nav aria-label="Kruimelpad" className="mb-7 text-sm font-bold text-slate-600">
          <Link href="/" className="underline underline-offset-4">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link href="/motivatiebrief-voorbeeld" className="underline underline-offset-4">Motivatiebrief voorbeelden</Link>
          <span aria-hidden="true"> / </span>
          <span>{data.presetLabel}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <p className="inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
              {data.eyebrow}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight text-black md:text-5xl">{data.title}</h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">{data.intro}</p>
            <Link
              href={generatorHref}
              className="mt-7 inline-flex border-4 border-black bg-yellow-400 px-5 py-3 font-black text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              Open het {data.presetLabel}-voorbeeld in de generator
            </Link>
          </div>
          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[7px_7px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Voor welke functie?</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">Pas functienaam, bewijs en beschikbaarheid aan. Deze voorbeelden zijn geen universele brief.</p>
            <ul className="mt-4 space-y-3">
              {data.roleOptions.map((role) => <li key={role} className="border-2 border-black bg-[#F7F3FF] px-3 py-2 text-sm font-bold">{role}</li>)}
            </ul>
          </aside>
        </section>

        <section className="mt-16">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Van eigenschap naar bewijs</p>
          <h2 className="mt-2 text-3xl font-black text-black">Wat zet je in deze motivatiebrief?</h2>
          <div className="mt-6 overflow-x-auto border-4 border-black bg-white">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-sm font-black">Relevant punt</th>
                  <th className="p-4 text-sm font-black">Te algemeen</th>
                  <th className="p-4 text-sm font-black">Geloofwaardig bewijs</th>
                </tr>
              </thead>
              <tbody>
                {data.evidenceRows.map((row) => (
                  <tr key={row.requirement} className="border-t-2 border-black align-top">
                    <th scope="row" className="p-4 text-sm font-black">{row.requirement}</th>
                    <td className="p-4 text-sm leading-relaxed text-slate-600">{row.weak}</td>
                    <td className="bg-[#E9FBF8] p-4 text-sm font-medium leading-relaxed text-slate-800">{row.strong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14 border-4 border-black bg-[#E9FBF8] p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-800">Vacaturegericht onderzoek</p>
          <h2 className="mt-2 text-3xl font-black text-black">{data.researchTitle}</h2>
          <div className="mt-4 space-y-4 text-base font-medium leading-relaxed text-slate-700">
            {data.researchParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>

        <section className="mt-14 grid gap-7 lg:grid-cols-[1.25fr_0.75fr]">
          <article className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Volledig voorbeeld</p>
            <h2 className="mt-2 text-3xl font-black text-black">{data.exampleTitle}</h2>
            <p className="mt-3 border-l-4 border-yellow-400 pl-4 text-sm font-bold leading-relaxed text-slate-600">{data.exampleContext}</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-800">
              <p>Geachte heer/mevrouw,</p>
              {data.exampleParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <p>Met vriendelijke groet,<br />[Jouw naam]</p>
            </div>
          </article>
          <aside className="h-fit border-4 border-black bg-yellow-300 p-6">
            <h2 className="text-2xl font-black text-black">Maak dit echt van jou</h2>
            <ol className="mt-5 space-y-4">
              {data.customizationSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm font-bold leading-relaxed">
                  <span className="flex h-7 w-7 flex-none items-center justify-center border-2 border-black bg-white text-xs font-black">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </aside>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black text-black">Fouten die een voorbeeldbrief zwakker maken</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {data.mistakes.map((mistake) => (
              <article key={mistake.title} className="border-4 border-black bg-white p-5">
                <h3 className="text-lg font-black text-black">{mistake.title}</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">{mistake.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14 border-4 border-black bg-white p-6 sm:p-8">
          <h2 className="text-2xl font-black text-black">Bronnen en controle</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">WerkCV gebruikt primaire bronnen voor organisatie- en functiefeiten. Controleer daarnaast altijd de actuele vacature: eisen kunnen per rol en locatie verschillen.</p>
          <ul className="mt-5 space-y-4">
            {data.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="font-black text-black underline decoration-2 underline-offset-4">{source.publisher}: {source.title}</a>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{source.note}</p>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs font-bold uppercase tracking-wide text-slate-500">Inhoudelijk gecontroleerd: 12 augustus 2026</p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-black text-black">Veelgestelde vragen</h2>
          <div className="mt-6 space-y-4">
            {data.faqs.map((faq) => (
              <details key={faq.question} className="group border-4 border-black bg-white p-5">
                <summary className="cursor-pointer list-none pr-8 text-lg font-black text-black">{faq.question}</summary>
                <p className="mt-3 max-w-4xl text-sm font-medium leading-relaxed text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-2xl font-black text-black">Ga verder met je sollicitatie</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {data.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="border-4 border-black bg-white p-5 transition-transform hover:-translate-y-1">
                <h3 className="font-black text-black">{link.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
