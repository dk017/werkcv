import type { Metadata } from "next";
import Link from "next/link";

const installSteps = [
  {
    title: "1. Installeer en activeer de plugin",
    body: "Upload de plugin-zip in WordPress of installeer hem straks direct vanuit WordPress.org zodra publicatie rond is.",
  },
  {
    title: "2. Controleer de standaardinstellingen",
    body: "Ga naar Instellingen → WerkCV Salaris Tools en kies of je CTA en footer-credit standaard aan of uit wilt zetten.",
  },
  {
    title: "3. Voeg een block of shortcode toe",
    body: "Gebruik de Gutenberg-blocks of een shortcode zoals [werkcv_netto_bruto] op de gewenste pagina of blogpost.",
  },
  {
    title: "4. Publiceer en test op mobiel",
    body: "De plugin rendert hosted iframes. Controleer altijd even de paginabreedte, de CTA-keuze en de embedded hoogte.",
  },
];

const shortcodes = [
  "[werkcv_netto_bruto]",
  "[werkcv_vakantiegeld]",
  "[werkcv_minimumloon]",
  "[werkcv_salaris_tool type=\"netto-bruto\" theme=\"light\" cta=\"on\" footer=\"on\"]",
];

export const metadata: Metadata = {
  title: "Installatie | WerkCV Salaris Tools plugin",
  description:
    "Installatiehandleiding voor de WerkCV Salaris Tools plugin voor WordPress. Inclusief shortcode-voorbeelden en embed-instellingen.",
  alternates: {
    canonical: "https://werkcv.nl/wordpress/salaris-tools-plugin/installatie",
  },
};

export default function WordpressSalarisToolsPluginInstallatiePage() {
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
            <Link href="/wordpress/salaris-tools-plugin" className="hover:text-black hover:underline">
              WordPress plugin
            </Link>
          </li>
          <li>/</li>
          <li className="font-bold text-black">Installatie</li>
        </ol>
      </nav>

      <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
          Installatie
        </div>
        <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
          WerkCV Salaris Tools installeren in WordPress
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
          Deze plugin gebruikt hosted embeds van WerkCV.nl. Je hoeft dus geen rekenregels of fiscale
          updates zelf te onderhouden. Hieronder staat de minimale installatieflow voor reviewers,
          testers en publishers.
        </p>
      </section>

      <section className="mb-10 grid gap-6 md:grid-cols-2">
        {installSteps.map((step) => (
          <article
            key={step.title}
            className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <h2 className="mb-3 text-xl font-black text-black">{step.title}</h2>
            <p className="text-sm font-medium leading-relaxed text-gray-700">{step.body}</p>
          </article>
        ))}
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-3xl font-black text-black">Shortcodes</h2>
          <div className="space-y-3">
            {shortcodes.map((code) => (
              <pre
                key={code}
                className="overflow-x-auto border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black"
              >
                <code>{code}</code>
              </pre>
            ))}
          </div>
        </div>

        <div className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-4 text-2xl font-black text-black">Belangrijke notitie</h2>
          <p className="text-sm font-medium leading-relaxed text-black">
            De plugin forceert geen publieke backlink. Publishers kunnen CTA en footer-credit aan of uit
            zetten. Dat houdt de plugin bruikbaar voor echte sites en blijft in lijn met WordPress.org-richtlijnen.
          </p>
          <div className="mt-5">
            <Link
              href="/wordpress/salaris-tools-plugin/privacy"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Bekijk privacy-info
            </Link>
          </div>
        </div>
      </section>

      <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="mb-4 text-3xl font-black text-black">Gerelateerde WerkCV-routes</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/tools/netto-bruto-calculator" className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100">
            Netto-bruto tool
          </Link>
          <Link href="/tools/vakantiegeld-berekenen" className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100">
            Vakantiegeld tool
          </Link>
          <Link href="/tools/minimumloon-checker" className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100">
            Minimumloon tool
          </Link>
          <Link href="/contact" className="border-2 border-black bg-[#FFFEF0] px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-yellow-100">
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
