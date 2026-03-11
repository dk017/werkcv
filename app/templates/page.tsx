import type { Metadata } from "next";
import Link from "next/link";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "./gallery";

export const metadata: Metadata = {
  title: "CV Templates Kiezen - 13+ Professionele Ontwerpen | WerkCV.nl",
  description: "Kies uit 13+ professionele CV templates. Van klassiek tot modern, ATS-vriendelijk ontwerp. Vind de perfecte stijl voor jouw sollicitatie.",
  keywords: [
    "cv template",
    "cv ontwerp",
    "cv layout",
    "professioneel cv template",
    "modern cv template",
    "klassiek cv template",
    "ATS-vriendelijk cv template",
    "cv template kiezen",
    "cv stijl",
    "gratis cv template",
  ],
  alternates: {
    canonical: "https://werkcv.nl/templates",
    languages: {
      "nl-NL": "https://werkcv.nl/templates",
      "en-NL": "https://werkcv.nl/en/dutch-cv-template",
      "x-default": "https://werkcv.nl/templates",
    },
  },
};

export default function TemplatesPage() {
  return (
    <main id="quick-start">
      <section className="border-b-4 border-black bg-[#FFFEF0]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-slate-600">
              Slim Startpunt
            </p>
            <h2 className="text-2xl font-black text-black sm:text-3xl">
              Zoek je een gratis CV template?
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              Start gratis met een professioneel ontwerp, vergelijk ATS-vriendelijke opties en betaal pas als je een PDF wilt downloaden.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cv-maken"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              CV maken stappenplan
            </Link>
            <Link
              href="/online-cv-maken"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Online CV maken
            </Link>
            <Link
              href="/cv-opstellen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              CV opstellen
            </Link>
            <Link
              href="/cv-maken-in-engels"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              CV maken in Engels
            </Link>
            <Link
              href="/cv-opmaak-voorbeeld"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              CV opmaak voorbeeld
            </Link>
            <Link
              href="/gratis-cv-template"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Bekijk gratis opties
            </Link>
            <Link
              href="/cv-tips/cv-template-kiezen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Template kiezen
            </Link>
          </div>
        </div>
      </section>
      <TemplateGallery templates={templateList} />
    </main>
  );
}
