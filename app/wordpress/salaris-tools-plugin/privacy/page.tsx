import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | WerkCV Salaris Tools plugin",
  description:
    "Privacy- en dataverwerkingsinformatie voor de WerkCV Salaris Tools plugin voor WordPress.",
  alternates: {
    canonical: "https://werkcv.nl/wordpress/salaris-tools-plugin/privacy",
  },
};

export default function WordpressSalarisToolsPluginPrivacyPage() {
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
          <li className="font-bold text-black">Privacy</li>
        </ol>
      </nav>

      <section className="mb-10 border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="mb-4 inline-block border-2 border-black bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.2em] text-black">
          Privacy
        </div>
        <h1 className="mb-4 text-4xl font-black text-black md:text-5xl">
          Privacy-informatie voor de WerkCV Salaris Tools plugin
        </h1>
        <p className="max-w-3xl text-lg font-medium leading-relaxed text-black">
          De WordPress-plugin zelf slaat geen salarisgegevens op in WordPress. De tools worden geladen
          via iframes vanaf WerkCV.nl en verwerken invoer in de browser voor het tonen van een uitkomst.
        </p>
      </section>

      <section className="space-y-6">
        <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-2xl font-black text-black">Wat de plugin lokaal opslaat</h2>
          <ul className="list-disc space-y-2 pl-6 text-sm font-medium leading-relaxed text-gray-700">
            <li>Plugin-instellingen zoals standaardthema, CTA aan/uit en footer-credit aan/uit.</li>
            <li>Geen individuele salarisberekeningen van bezoekers.</li>
            <li>Geen account- of profielgegevens van WerkCV-gebruikers.</li>
          </ul>
        </section>

        <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-2xl font-black text-black">Wat via WerkCV.nl wordt geladen</h2>
          <p className="text-sm font-medium leading-relaxed text-gray-700">
            De plugin embedt hosted routes zoals <code>/embed/netto-bruto-calculator</code>. Daardoor wordt de
            calculatorinterface vanaf WerkCV.nl geladen. Voor algemene informatie over WerkCV en privacy verwijzen
            we naar het reguliere privacybeleid van WerkCV.nl.
          </p>
          <div className="mt-4">
            <Link
              href="/privacy"
              className="inline-block border-2 border-black bg-[#FFFEF0] px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-yellow-100"
            >
              Bekijk WerkCV privacybeleid
            </Link>
          </div>
        </section>

        <section className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-2xl font-black text-black">Tracking en analytics</h2>
          <p className="text-sm font-medium leading-relaxed text-gray-700">
            De plugin gebruikt geen eigen third-party trackingcode. Als een publisher CTA of footer-links inschakelt,
            kunnen bezoekers doorklikken naar WerkCV.nl. Verdere verwerking op WerkCV.nl valt onder het privacybeleid
            van WerkCV zelf.
          </p>
        </section>

        <section className="border-4 border-black bg-teal-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="mb-3 text-2xl font-black text-black">Contact</h2>
          <p className="text-sm font-medium leading-relaxed text-black">
            Vragen over de plugin of de gegevensstroom? Neem contact op via contact@werkcv.nl met als onderwerp
            “WerkCV WordPress plugin privacy”.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/wordpress/salaris-tools-plugin/installatie"
              className="inline-block border-4 border-black bg-yellow-400 px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Installatiehandleiding
            </Link>
            <Link
              href="/contact"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-sm font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Contact
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
