import Link from "next/link";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "@/app/templates/gallery";
import { buildEnglishMetadata } from "../metadata";

export const metadata = buildEnglishMetadata({
  title: "English CV Templates for Jobs in the Netherlands",
  description:
    "Compare ATS-friendly CV templates in English for jobs in the Netherlands. Start free, switch templates later, and download a Dutch-market A4 PDF when ready.",
  path: "/en/templates",
  nlPath: "/templates",
  keywords: [
    "english cv templates netherlands",
    "dutch cv template english",
    "expat cv template netherlands",
    "ats cv template english",
    "cv templates for netherlands jobs",
  ],
});

export default function EnglishTemplatesPage() {
  return (
    <main id="quick-start">
      <section className="border-b-4 border-black bg-[#FFFEF0]">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-slate-600">
              For jobs in the Netherlands
            </p>
            <h2 className="text-2xl font-black text-black sm:text-3xl">
              Compare ATS-friendly CV templates in English
            </h2>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700 sm:text-base">
              Start with an English-friendly template selection, keep the Dutch-market
              structure, and export an A4 PDF that fits common expectations in the Netherlands.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase tracking-[0.18em] text-black">
              <span className="border-2 border-black bg-white px-3 py-1">ATS-friendly</span>
              <span className="border-2 border-black bg-white px-3 py-1">A4 Dutch-market format</span>
              <span className="border-2 border-black bg-white px-3 py-1">Switch templates later</span>
              <span className="border-2 border-black bg-white px-3 py-1">No subscription</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/en/dutch-cv-template"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Dutch CV template guide
            </Link>
            <Link
              href="/en/netherlands-cv-format"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Netherlands CV format
            </Link>
            <Link
              href="/en/dutch-cv-examples"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Dutch CV examples
            </Link>
            <Link
              href="/en/ats-resume-netherlands"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              ATS resume help
            </Link>
            <Link
              href="/en/cv-or-resume-netherlands"
              className="border-2 border-black bg-yellow-400 px-4 py-2 text-sm font-black text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              CV or resume?
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b-4 border-black bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="border-4 border-black bg-[#FFF7E8] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Not sure where to start?
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Use the template picker first, then move into the English editor
            </h2>
            <p className="mt-2 max-w-3xl text-sm font-medium leading-relaxed text-slate-700">
              This route is built for expats and international candidates applying in the Netherlands.
              Choose a layout first, then fill it in inside the English editor while keeping the Dutch-market CV structure.
            </p>
          </div>
        </div>
      </section>

      <TemplateGallery templates={templateList} uiLanguage="en" />
    </main>
  );
}
