import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handige tools voor je carrière | WerkCV",
  description:
    "Handige tools en websites die je helpen bij het maken van een professioneel CV en het verbeteren van je baankansen.",
  alternates: {
    canonical: "https://werkcv.nl/cv-tools-links",
  },
};

export default function CvToolsLinksPage() {
  return (
    <main className="min-h-screen bg-[#FFFEF9]">
      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-4xl font-black text-black md:text-5xl">
            Handige tools voor je carrière
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-gray-700">
            Hier vind je handige tools en websites die je helpen bij het maken
            van een professioneel CV en het verbeteren van je baankansen.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <article className="border-4 border-black bg-white p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black text-black">
            Overzicht van handige links
          </h2>
          <ul className="mt-6 space-y-4 text-base font-medium text-black">
            <li>
              <a
                href="https://werkcv.nl"
                className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]"
              >
                CV maken (gratis en ATS-proof)
              </a>
            </li>
            <li>
              <a
                href="http://aanhetwerk.jouwpagina.nl"
                className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]"
              >
                aanhetwerk
              </a>
            </li>
            <li>
              <a
                href="https://example.com"
                className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]"
              >
                Sollicitatie tips
              </a>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
