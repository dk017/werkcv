import type { Metadata } from "next";
import Link from "next/link";

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
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            Bekijk ook het <Link href="/tools" className="font-bold underline underline-offset-4">volledige overzicht van WerkCV-tools</Link> als je wilt rekenen, schrijven of je CV controleren.
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
              <Link href="/cv-maken" className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]">CV maken: de complete stappen</Link>
            </li>
            <li>
              <Link href="/cv-check" className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]">Controleer je CV-score</Link>
            </li>
            <li>
              <Link href="/tools/cv-keywords" className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]">Vind relevante CV-keywords</Link>
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
              <Link href="/cv-tips" className="underline decoration-2 underline-offset-4 hover:text-[#0F766E]">Praktische sollicitatie- en CV-tips</Link>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
}
