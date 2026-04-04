import type { Metadata } from "next";
import Link from "next/link";

const pluginTools = [
  {
    title: "Netto-bruto calculator",
    description: "Laat bezoekers bruto en netto salaris vergelijken met een compacte embed die op WerkCV wordt gehost.",
    href: "/tools/netto-bruto-calculator",
  },
  {
    title: "Vakantiegeld berekenen",
    description: "Een snelle 8%- en opbouwtool voor blogs over werk, salarissen en Nederlandse arbeidsvoorwaarden.",
    href: "/tools/vakantiegeld-berekenen",
  },
  {
    title: "Minimumloon checker",
    description: "Sterk voor scholieren-, starter- en HR-content rond minimumloon per leeftijd in Nederland.",
    href: "/tools/minimumloon-checker",
  },
];

const pluginHighlights = [
  "Gutenberg block en shortcode voor drie NL-salaristools",
  "Hosted embeds: geen eigen rekencode of onderhoud nodig",
  "Optionele CTA en optionele WerkCV-footer, geen geforceerde backlink",
  "Geschikt voor loopbaanblogs, HR-sites, expat-content en career services",
];

const pluginUseCases = [
  {
    title: "Loopbaan- en sollicitatieblogs",
    body: "Voeg een concrete calculator toe onder artikelen over salaris, contracten of werken in Nederland.",
  },
  {
    title: "Expat- en relocation-websites",
    body: "Gebruik Nederlandse salaris- en minimumloon-tools zonder zelf een fiscale rekenlaag te onderhouden.",
  },
  {
    title: "WordPress-sites voor HR en onderwijs",
    body: "Handig voor career centers, bootcamps en scholen die praktische NL-tools willen embedden.",
  },
];

export const metadata: Metadata = {
  title: "WerkCV Salaris Tools plugin voor WordPress | WerkCV",
  description:
    "WordPress-plugin van WerkCV.nl voor Nederlandse salaris-tools zoals netto-bruto, vakantiegeld en minimumloon. Hosted embeds, eenvoudige installatie en privacy-info.",
  alternates: {
    canonical: "https://werkcv.nl/wordpress/salaris-tools-plugin",
  },
};

export default function WordpressSalarisToolsPluginPage() {
  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6 text-sm font-medium text-gray-600">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-black hover:underline">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/tools" className="hover:text-black hover:underline">
              Tools
            </Link>
          </li>
          <li>/</li>
          <li className="font-bold text-black">WordPress plugin</li>
        </ol>
      </nav>

      <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 inline-block border-2 border-black bg-teal-300 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
          WordPress plugin
        </div>
        <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
          WerkCV Salaris Tools voor WordPress
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
          Een compacte WordPress-plugin voor Nederlandse salaris-tools. De plugin embedt de
          WerkCV-calculators via hosted iframes, zodat publishers de inhoud eenvoudig kunnen plaatsen
          zonder eigen fiscale logica of onderhoud.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/wordpress/salaris-tools-plugin/installatie"
            className="inline-block border-4 border-black bg-yellow-400 px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Installatie bekijken
          </Link>
          <Link
            href="/wordpress/salaris-tools-plugin/privacy"
            className="inline-block border-4 border-black bg-white px-6 py-4 text-center text-lg font-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-gray-50 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            Privacy & data
          </Link>
        </div>
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">Wat de plugin doet</h2>
          <ul className="space-y-3 text-sm font-medium leading-relaxed text-gray-700">
            {pluginHighlights.map((item) => (
              <li key={item} className="border-2 border-black bg-[#FFFEF0] px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-2xl font-black text-black">Status</h2>
          <p className="text-sm font-medium leading-relaxed text-black">
            Deze plugin wordt momenteel voorbereid voor WordPress.org-publicatie. Deze pagina is de
            officiële support- en informatiepagina voor reviewers, testers en publishers die de plugin
            willen volgen of vooraf willen beoordelen.
          </p>
          <div className="mt-5 space-y-3">
            <a
              href="mailto:contact@werkcv.nl?subject=WerkCV%20WordPress%20plugin"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Vraag early access
            </a>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-3xl font-black text-black">Meegeleverde tools</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pluginTools.map((tool) => (
            <article
              key={tool.title}
              className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <h3 className="mb-3 text-xl font-black text-black">{tool.title}</h3>
              <p className="mb-4 text-sm font-medium leading-relaxed text-gray-700">
                {tool.description}
              </p>
              <Link
                href={tool.href}
                className="inline-block border-2 border-black bg-[#FFFEF0] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
              >
                Bekijk volledige tool
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-3">
        {pluginUseCases.map((item) => (
          <article
            key={item.title}
            className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="mb-3 text-xl font-black text-black">{item.title}</h2>
            <p className="text-sm font-medium leading-relaxed text-gray-700">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 text-3xl font-black text-black">Handige links</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/wordpress/salaris-tools-plugin/installatie"
            className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
          >
            Installatie
          </Link>
          <Link
            href="/wordpress/salaris-tools-plugin/privacy"
            className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
          >
            Privacy
          </Link>
          <Link
            href="/tools"
            className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
          >
            Alle WerkCV tools
          </Link>
          <Link
            href="/partners"
            className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
          >
            Partners
          </Link>
        </div>
      </section>
    </>
  );
}
