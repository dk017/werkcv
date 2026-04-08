import type { Metadata } from "next";
import Link from "next/link";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "./gallery";

const pageUrl = "https://werkcv.nl/templates";

export const metadata: Metadata = {
  title: {
    absolute: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
  },
  description:
    "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download. | WerkCV",
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
    canonical: pageUrl,
    languages: {
      "nl-NL": pageUrl,
      "en-NL": "https://werkcv.nl/en/templates",
      "x-default": pageUrl,
    },
  },
  openGraph: {
    title: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
    description:
      "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download.",
    url: pageUrl,
    siteName: "WerkCV",
    locale: "nl_NL",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WerkCV - ATS-vriendelijke CV templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATS-vriendelijke CV Templates voor Nederlandse Vacatures | WerkCV",
    description:
      "Vergelijk ATS-vriendelijke CV templates voor Nederlandse vacatures. Kies rustig, modern of strikt ATS, start gratis en betaal pas bij PDF-download.",
    images: ["/opengraph-image"],
  },
};

export default function TemplatesPage() {
  return (
    <main id="quick-start">
      <section className="border-b-4 border-black bg-[#FFFEF0]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-slate-600">
              Voor Nederlandse sollicitaties
            </p>
            <h2 className="text-2xl font-black text-black sm:text-3xl">
              Vergelijk templates en kies de stijl die past bij jouw vacature
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              WerkCV.nl helpt je eerst gratis vergelijken, daarna pas beslissen. Kies een rustige of moderne layout, wissel later nog van template of kleur en betaal eenmalig per CV wanneer je wilt downloaden.
            </p>
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-slate-700">
              Wil je vooral weten hoe{" "}
              <Link
                href="/cv-maken-zonder-abonnement"
                className="font-black text-black underline decoration-2 underline-offset-4"
              >
                eenmalig betalen
              </Link>{" "}
              precies werkt? Gebruik dan eerst die prijsuitlegpagina.
            </p>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-slate-600">
              Gebruik de hulplinks hieronder alleen als je naast een template ook nog zoekt naar uitleg over de workflow, gratis opties, Engels of het prijsmodel.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.18em] text-black">
              <span className="border-2 border-black bg-white px-3 py-1">ATS-vriendelijk</span>
              <span className="border-2 border-black bg-white px-3 py-1">Eenmalig per CV</span>
              <span className="border-2 border-black bg-white px-3 py-1">Later opnieuw downloaden</span>
              <span className="border-2 border-black bg-white px-3 py-1">Ontworpen voor NL vacatures</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cv-maken"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Hoe werkt CV maken?
            </Link>
            <Link
              href="/cv-maken-in-engels"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Voor Engelstalige CVs
            </Link>
            <Link
              href="/cv-maken-zonder-abonnement"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Zonder abonnement
            </Link>
            <Link
              href="/gratis-cv-template"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              Gratis template opties
            </Link>
            <Link
              href="/cv-tips/cv-template-kiezen"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Hulp bij template kiezen
            </Link>
            <Link
              href="/cv-opmaak-voorbeeld"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Goede CV opmaak
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="border-4 border-black bg-[#FFF7E8] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Eerst de tool kiezen?
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Twijfel je nog tussen templates, builders of ATS-routes?
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              Als je niet alleen tussen layouts twijfelt, maar ook tussen prijsmodel, ATS-veiligheid of een tool zoals Canva, gebruik dan eerst een van deze keuzehulpen.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/cv-maken-zonder-abonnement"
                className="border-2 border-black bg-yellow-200 px-3 py-2 text-sm font-black text-black hover:bg-yellow-300 transition-colors"
              >
                CV zonder abonnement
              </Link>
              <Link
                href="/beste-cv-maker-nederland"
                className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors"
              >
                CV builders vergelijken
              </Link>
              <Link
                href="/cv-gids/welke-cv-builder-past-bij-jou-in-nederland"
                className="border-2 border-black bg-blue-200 px-3 py-2 text-sm font-black text-black hover:bg-blue-300 transition-colors"
              >
                Welke CV builder past bij jou?
              </Link>
              <Link
                href="/cv-gids/beste-cv-builder-zonder-abonnement"
                className="border-2 border-black bg-yellow-200 px-3 py-2 text-sm font-black text-black hover:bg-yellow-300 transition-colors"
              >
                Vergelijk prijsmodellen
              </Link>
              <Link
                href="/cv-gids/canva-vs-cv-builder-voor-sollicitaties"
                className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors"
              >
                Canva vs CV builder
              </Link>
              <Link
                href="/cv-gids/ats-vriendelijke-cv-builder-voor-nederlandse-vacatures"
                className="border-2 border-black bg-white px-3 py-2 text-sm font-black text-black hover:bg-yellow-100 transition-colors"
              >
                ATS-veilige builders
              </Link>
            </div>
          </div>
        </div>
      </section>
      <TemplateGallery templates={templateList} />
    </main>
  );
}
