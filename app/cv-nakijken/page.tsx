import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  FaqCardSection,
  FinalCtaSection,
  LinkCardSection,
  WhyWerkCvSection,
  type OptimizerFaqItem,
  type OptimizerLinkCard,
} from "@/components/landing/CvOptimizerSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/cv-nakijken";

const reviewChecks = [
  "Structuur en logische volgorde van secties",
  "Leesbaarheid van profieltekst en werkervaring",
  "ATS-risico's in opmaak of koppen",
  "Ontbrekende onderdelen zoals skills of contactgegevens",
  "Aansluiting op de functie of vacature",
];

const commonMistakes = [
  "Profieltekst blijft te vaag en zegt weinig over je richting.",
  "Werkervaring bestaat vooral uit taken zonder resultaat of impact.",
  "Vaardigheden staan los van de rest van het cv en voelen willekeurig.",
  "Layout is onrustig of gebruikt te creatieve sectienamen.",
  "Keywords uit de vacature ontbreken of komen te weinig terug.",
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/cv-checken",
    title: "CV checken",
    body: "Voor dezelfde intentie, maar met meer nadruk op snelle inhoudelijke en technische controle.",
  },
  {
    href: "/cv-optimaliseren",
    title: "CV optimaliseren",
    body: "Gebruik deze route als je na de check vooral ATS, vacaturefit en keywords wilt aanscherpen.",
  },
  {
    href: "/cv-verbeteren",
    title: "CV verbeteren",
    body: "Sterk als je de feedback wilt omzetten in betere zinnen, bullets en structuur.",
  },
  {
    href: "/cv-maken",
    title: "CV maken",
    body: "Ga direct verder in de editor als je na de review een nieuwe cv-versie wilt bouwen.",
  },
];

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Wat kijkt een automatische cv-check na?",
    answer:
      "Een automatische cv-check kijkt onder andere naar structuur, leesbaarheid, ATS-risico's, keywords en ontbrekende onderdelen. Zo krijg je snel zicht op de grootste zwakke plekken in je document.",
  },
  {
    question: "Is cv laten nakijken hetzelfde als persoonlijke coaching?",
    answer:
      "Nee. Een automatische check helpt vooral om veelvoorkomende fouten en risico's snel te signaleren. Voor nuance, branchecontext of diep persoonlijk advies blijft menselijke feedback waardevol.",
  },
  {
    question: "Wanneer is een menselijke review alsnog slim?",
    answer:
      "Voor senior functies, carrièreswitches of situaties waarin je twijfelt over positionering en nuance kan een menselijke review extra waarde geven. De automatische check is vooral een snelle eerste filter.",
  },
  {
    question: "Kan ik na de check mijn cv direct verbeteren in WerkCV?",
    answer:
      "Ja. Je kunt na de controle meteen door naar WerkCV om profieltekst, werkervaring en structuur bij te werken en daarna een nieuwe PDF te downloaden.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV laten nakijken? Start met een gratis CV-check | WerkCV",
  description:
    "Laat je cv automatisch nakijken op structuur, leesbaarheid, ATS-risico's en ontbrekende onderdelen. Start gratis en verbeter je cv direct.",
  path: "/cv-nakijken",
  keywords: [
    "cv nakijken",
    "cv laten nakijken",
    "cv nakijken gratis",
    "cv laten controleren",
    "cv automatische check",
    "cv review",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    "x-default": pageUrl,
  },
});

export default function CvNakijkenPage() {
  return (
    <div className="min-h-screen bg-[#FFFEF9]">
      <FAQJsonLd questions={faqItems} />

      <header className="border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-[#4ECDC4] px-1">CV</span>.nl
            </span>
          </Link>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black text-black"
            >
              Bekijk tools
            </Link>
            <Link
              href="/cv-maken"
              className="border-2 border-black bg-[#4ECDC4] px-4 py-2 text-sm font-black text-black"
            >
              Maak mijn cv opnieuw
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV nakijken", href: "/cv-nakijken" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Automatische check", "ATS", "Leesbaarheid", "Structuur"].map((badge) => (
                <span
                  key={badge}
                  className="border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-black"
                >
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight text-black md:text-5xl">
              CV laten nakijken? Start met een gratis automatische cv-check
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              WerkCV geeft een automatische controle op structuur, leesbaarheid en ATS-risico&apos;s. Het is geen persoonlijke coachreview, maar helpt je snel de grootste verbeterpunten in je cv te vinden.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/cv-score"
                trackingLocation="cv-nakijken:hero_primary"
                trackingLabel="Doe de gratis cv-check"
                ctaEventName="cta_cv_nakijken_hero"
                className="border-4 border-black bg-[#4ECDC4] px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Doe de gratis cv-check
              </TrackedLandingLink>
              <Link
                href="/cv-maken"
                className="border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
              >
                Maak mijn cv opnieuw
              </Link>
            </div>
            <p className="mt-4 border-2 border-black bg-white px-4 py-3 text-sm font-medium leading-relaxed text-slate-700">
              WerkCV is geen persoonlijke loopbaancoach en vervangt geen menselijke review. De check helpt je wel om veelvoorkomende fouten snel te vinden.
            </p>
          </div>

          <aside className="h-fit border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Wat je direct ziet
            </p>
            <h2 className="mt-2 text-2xl font-black text-black">
              Wat kijkt een cv-check na?
            </h2>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {reviewChecks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="mb-12 border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Wat kijkt een cv-check na?
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Wat kijkt een cv-check na?
          </h2>
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-700">
            Een automatische cv-check kijkt vooral naar de onderdelen die in de praktijk het vaakst voor onduidelijkheid zorgen: profieltekst, structuur, werkervaring, vaardigheden, keywords en technische leesbaarheid voor ATS-systemen.
          </p>
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
            Daardoor zie je sneller of je cv inhoudelijk te algemeen is, of het document te weinig op de vacature aansluit, en of de opmaak mogelijk softwareproblemen veroorzaakt.
          </p>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Automatisch cv nakijken vs menselijke review
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Automatisch cv nakijken vs menselijke review
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="border-2 border-black bg-[#E9FFFC] p-4">
                <h3 className="text-sm font-black text-black">Automatische check</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Snel, schaalbaar en handig om veelvoorkomende fouten, ATS-risico&apos;s en zwakke onderdelen direct te vinden.
                </p>
              </div>
              <div className="border-2 border-black bg-[#FFF4D6] p-4">
                <h3 className="text-sm font-black text-black">Menselijke review</h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-slate-700">
                  Handig voor nuance, positionering en branchecontext, maar minder snel en minder consistent voor een eerste screening.
                </p>
              </div>
            </div>
          </article>

          <article className="border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
              Veelvoorkomende fouten in cv&apos;s
            </p>
            <h2 className="mt-2 text-3xl font-black text-black">
              Veelvoorkomende fouten in cv&apos;s
            </h2>
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm font-medium leading-relaxed text-slate-700 marker:text-black">
              {commonMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mb-12 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Je cv verbeteren na de check
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Je cv verbeteren na de check
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Link
              href="/tools/ats-cv-checker"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Kijk specifieker naar ATS</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Gebruik daarna de ATS-check als opmaak en technische leesbaarheid de grootste vraag zijn.
              </p>
            </Link>
            <Link
              href="/cv-verbeteren"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Werk inhoud en zinnen bij</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Ga verder naar cv verbeteren als je vooral profieltekst en werkervaring wilt aanscherpen.
              </p>
            </Link>
            <Link
              href="/cv-optimaliseren"
              className="block border-2 border-white bg-white/10 p-4 transition-colors hover:bg-white hover:text-black"
            >
              <p className="text-sm font-black">Optimaliseer op vacature en keywords</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-slate-200 hover:text-slate-700">
                Handig als je de check wilt combineren met vacaturematch en relevante keywords.
              </p>
            </Link>
          </div>
        </section>

        <LinkCardSection
          eyebrow="Meer routes"
          title="Andere pagina's in deze cv-check cluster"
          links={routeLinks}
        />

        <FaqCardSection title="Veelgestelde vragen over cv laten nakijken" items={faqItems} />

        <WhyWerkCvSection locale="nl" />

        <FinalCtaSection
          title="Laat je cv checken en maak direct een betere versie"
          description="Gebruik de automatische review om zwakke plekken snel te vinden en zet de uitkomst daarna direct om in een nieuwe, duidelijkere cv-versie."
          supportLine="Gratis starten. Geen abonnement. Eénmalig betalen bij PDF-download."
          buttonLabel="Maak direct een betere versie"
          buttonHref="/editor"
          trackingLocation="cv-nakijken:final_primary"
          trackingLabel="Maak direct een betere versie"
        />
      </main>

      <Footer />
    </div>
  );
}
