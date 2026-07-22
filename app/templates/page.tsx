import type { Metadata } from "next";
import Link from "next/link";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import { templateList } from "@/lib/templates/registry";
import TemplateGallery from "./gallery";
import { cookies } from "next/headers";
import { normalizeStartSource, PENDING_START_SOURCE_COOKIE, readEncodedStartSource } from "@/lib/start-source";

const pageUrl = "https://werkcv.nl/templates";

const templateFaqs = [
  {
    question: "Welk CV-template oogt professioneel in Nederland?",
    answer:
      "Een professioneel template heeft een duidelijke leesvolgorde, rustige typografie, voldoende witruimte en herkenbare sectiekoppen. De inhoud en de functie bepalen uiteindelijk de beste keuze; een opvallend ontwerp is niet automatisch professioneler.",
  },
  {
    question: "Welk template is het veiligst voor een ATS?",
    answer:
      "Kies bij twijfel een eenvoudige eenkoloms indeling met standaard sectienamen en tekst die je kunt selecteren. Volg altijd de bestandsinstructie van de werkgever. Geen enkel template kan garanderen dat ieder ATS je CV hetzelfde verwerkt.",
  },
  {
    question: "Kan een CV met twee kolommen door een ATS worden gelezen?",
    answer:
      "Sommige moderne systemen verwerken twee kolommen goed, andere kunnen de leesvolgorde verkeerd interpreteren. Voor een vacature via een groot sollicitatieportaal is een eenkoloms ATS-template de voorzichtigste keuze; voor directe e-mail kan een rustige tweekoloms indeling passend zijn.",
  },
  {
    question: "Mag je kleur gebruiken op een CV?",
    answer:
      "Ja. Gebruik kleur spaarzaam voor koppen of lijnen en houd de hoofdtekst contrastrijk. Een neutrale of donkere accentkleur werkt voor veel zakelijke functies; creatieve rollen kunnen iets meer visuele vrijheid verdragen.",
  },
  {
    question: "Welk CV-template past bij mijn sector?",
    answer:
      "Voor finance, juridisch, overheid en corporate functies werkt een rustige klassieke of ATS-indeling vaak goed. Voor tech, marketing en klantgerichte rollen kan een modern ontwerp passen, zolang ervaring en vaardigheden snel te vinden blijven.",
  },
  {
    question: "Kan ik later nog van CV-template wisselen?",
    answer:
      "Ja. In de WerkCV-editor kun je dezelfde inhoud in andere templates bekijken en vóór het downloaden van ontwerp en accentkleur wisselen. Controleer na iedere wissel wel de paginalengte en leesvolgorde.",
  },
  {
    question: "Moet een foto in mijn CV-template staan?",
    answer:
      "Nee. Een foto is in Nederland niet verplicht. Kies op basis van de vacature, werkgever en het land van de sollicitatie. Bij anoniem werven of een internationale procedure is weglaten vaak verstandiger.",
  },
];

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
      en: "https://werkcv.nl/en/templates",
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

export default async function TemplatesPage({
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
      <TemplateGallery templates={templateList} initialStartSource={resolvedStartSource} />
      <section className="border-t border-slate-200 bg-white px-5 py-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-bold uppercase text-emerald-700">Templatekeuze</p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Veelgestelde vragen over CV-templates</h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Kies op leesbaarheid, functie en sollicitatieroute. Bekijk voor een strikte uploadprocedure ook de{" "}
            <Link className="font-semibold text-emerald-700 underline" href="/cv-tips/ats-vriendelijk-cv">
              ATS-richtlijnen
            </Link>
            , en bepaal apart of een{" "}
            <Link className="font-semibold text-emerald-700 underline" href="/cv-tips/foto-op-je-cv">
              foto op je CV
            </Link>{" "}
            past.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {templateFaqs.map((faq) => (
              <details key={faq.question} className="border border-slate-200 bg-slate-50 p-5">
                <summary className="cursor-pointer font-semibold text-slate-950">{faq.question}</summary>
                <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <FAQJsonLd questions={templateFaqs} />
    </main>
  );
}
