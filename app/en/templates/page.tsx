import Link from "next/link";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "@/app/templates/gallery";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { buildEnglishMetadata } from "../metadata";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";

const englishTemplateFaqs = [
  {
    question: "Which CV template works best for jobs in the Netherlands?",
    answer:
      "Choose a template with a clear reading order, recognisable headings, restrained typography, and enough white space. The best design depends on the role and application route; a more decorative template is not automatically more professional.",
  },
  {
    question: "Which template has the lowest ATS risk?",
    answer:
      "For an unknown application portal, use a simple single-column template with selectable text and standard headings. Always follow the employer's file instructions. No template can guarantee identical parsing across every ATS.",
  },
  {
    question: "Can I use a two-column CV?",
    answer:
      "Some modern systems read two columns correctly, while others may change the reading order. A single-column ATS layout is the cautious choice for corporate portals; a restrained two-column CV can work for direct applications if the exported text remains logical.",
  },
  {
    question: "Can I switch templates after writing my CV?",
    answer:
      "Yes. WerkCV lets you review the same content in different templates and change the accent colour before downloading. Check page length, section order, and line breaks after each switch.",
  },
  {
    question: "Should an English CV for the Netherlands include a photo?",
    answer:
      "A photo is optional, not required. Follow the vacancy and employer context. Leave it out for anonymous recruitment or when the international hiring process follows a no-photo convention.",
  },
];

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

export default async function EnglishTemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ startSource?: string }>;
}) {
  const { startSource } = await searchParams;
  const cookieStore = await cookies();
  const resolvedStartSource =
    normalizeStartSource(startSource) ||
    readEncodedStartSource(cookieStore.get(PENDING_START_SOURCE_COOKIE)?.value) ||
    undefined;
  return (
    <main id="quick-start">
      <TemplateGallery templates={templateList} uiLanguage="en" initialStartSource={resolvedStartSource} />
      <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase text-emerald-700">Choosing a design</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">English CV template questions</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Choose for the vacancy and submission route. Read the{" "}
            <Link className="font-semibold text-emerald-700 underline" href="/en/ats-resume-netherlands">
              Netherlands ATS guidance
            </Link>{" "}
            when you are applying through a portal, or the{" "}
            <Link className="font-semibold text-emerald-700 underline" href="/en/expat-cv-netherlands">
              expat CV guide
            </Link>{" "}
            for language, photo, and work-authorisation decisions.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {englishTemplateFaqs.map((faq) => (
              <details key={faq.question} className="border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer font-semibold text-slate-950">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FAQJsonLd questions={englishTemplateFaqs} />
    </main>
  );
}
