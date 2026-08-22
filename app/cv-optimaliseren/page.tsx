import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import {
  CvCheckStartBlock,
  FaqCardSection,
  FinalCtaSection,
  LinkCardSection,
  WhyWerkCvSection,
  type OptimizerFaqItem,
  type OptimizerLinkCard,
} from "@/components/landing/CvOptimizerSections";
import { buildDutchMetadata } from "@/lib/page-metadata";

const pageUrl = "https://werkcv.nl/cv-optimaliseren";

const controlPoints = [
  {
    title: "ATS-vriendelijke opmaak",
    body: "Controle op duidelijke koppen, logische secties, consistente datums en opmaak die recruitersoftware goed kan uitlezen.",
  },
  {
    title: "Duidelijke profieltekst",
    body: "Check of je profieltekst snel duidelijk maakt wie je bent, waar je goed in bent en wat je zoekt.",
  },
  {
    title: "Relevante keywords uit de vacature",
    body: "Vergelijk je cv met de termen en vaardigheden die in de vacature of functietitel terugkomen.",
  },
  {
    title: "Concrete werkervaring-bullets",
    body: "Signaleer waar je bullets te vaag blijven en waar je meer resultaat, context of actie kunt tonen.",
  },
  {
    title: "Vaardigheden die passen bij de functie",
    body: "Controleer of je skills aansluiten op de rol en niet alleen een los lijstje zonder bewijs vormen.",
  },
];

const routeLinks: OptimizerLinkCard[] = [
  {
    href: "/cv-verbeteren",
    title: "CV verbeteren",
    body: "Gebruik deze route als je vooral inhoud, formulering en impact van je cv sterker wilt maken.",
  },
  {
    href: "/cv-checken",
    title: "CV checken",
    body: "Handig als je eerst snel wilt zien waar je cv inhoudelijk en technisch zwakker is.",
  },
  {
    href: "/cv-nakijken",
    title: "CV laten nakijken",
    body: "Sterk als je zoekt naar een automatische review van veelvoorkomende fouten en ATS-risico's.",
  },
  {
    href: "/en/resume-optimizer-netherlands",
    title: "English resume optimizer",
    body: "Voor expats of internationale kandidaten die een English-language route voor Dutch job applications zoeken.",
  },
  {
    href: "/profielfoto-cv-maken",
    title: "Profielfoto optimaliseren",
    body: "Gebruik deze route als je naast inhoud en ATS ook je visuele eerste indruk wilt verbeteren.",
  },
];

const faqItems: OptimizerFaqItem[] = [
  {
    question: "Wat betekent cv optimaliseren precies?",
    answer:
      "Je cv optimaliseren betekent dat je het document beter leesbaar, duidelijker en beter afgestemd maakt op vacatures en ATS-systemen. Het gaat dus niet alleen om opmaak, maar ook om profieltekst, keywords en werkervaring.",
  },
  {
    question: "Moet ik mijn cv optimaliseren voor elke vacature?",
    answer:
      "Meestal wel. Je hoeft niet elke regel te herschrijven, maar functietitel, profieltekst, keywords en prioriteiten in je werkervaring wil je idealiter afstemmen op de vacature waarop je nu solliciteert.",
  },
  {
    question: "Wat is het verschil tussen cv optimaliseren en cv checken?",
    answer:
      "Een cv check laat zien waar je document nu zwak is. Cv optimaliseren is de vervolgstap: je gebruikt die feedback om structuur, inhoud en vacaturematch daadwerkelijk sterker te maken.",
  },
  {
    question: "Kan ik na de check direct een nieuwe cv-versie maken?",
    answer:
      "Ja. Je kunt na de check direct door naar WerkCV om profieltekst, bullets en lay-out bij te werken en daarna een nette PDF te downloaden.",
  },
];

export const metadata: Metadata = buildDutchMetadata({
  title: "CV optimaliseren voor ATS en vacatures | WerkCV",
  description:
    "Optimaliseer je cv voor Nederlandse vacatures. Check ATS-risico's, ontbrekende keywords en verbeterpunten. Start gratis en maak direct een sterker cv.",
  path: "/cv-optimaliseren",
  keywords: [
    "cv optimaliseren",
    "cv optimalisatie",
    "cv optimaliseren voor ats",
    "cv optimaliseren vacature",
    "ats cv optimaliseren",
    "cv verbeteren voor vacature",
  ],
  type: "article",
  languages: {
    "nl-NL": pageUrl,
    en: "https://werkcv.nl/en/resume-optimizer-netherlands",
    "en-NL": "https://werkcv.nl/en/resume-optimizer-netherlands",
    "x-default": pageUrl,
  },
});

export default function CvOptimaliserenPage() {
  return (
    <main>
      <FAQJsonLd questions={faqItems} />

      <div className="wk-container py-10">
        <div className="mb-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "CV optimaliseren", href: "/cv-optimaliseren" },
            ]}
          />
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              {["ATS", "Keywords", "Vacaturematch", "Profieltekst", "Werkervaring"].map((badge) => (
                <span key={badge} className="wk-trust-pill">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
              <span className="wk-hero-highlight">CV optimaliseren</span> voor meer reacties op je
              sollicitaties
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--wk-ink-muted)]">
              Plak je cv en eventueel de vacaturetekst. WerkCV helpt je controleren op ATS-risico&apos;s, ontbrekende keywords, onduidelijke profieltekst en verbeterpunten in je werkervaring.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/tools/cv-vacature-match"
                trackingLocation="cv-optimaliseren:hero_primary"
                trackingLabel="Check en optimaliseer mijn cv"
                ctaEventName="cta_cv_optimaliseren_hero"
                className="wk-button wk-button-primary"
              >
                Check en optimaliseer mijn cv
              </TrackedLandingLink>
              <Link href="/cv-maken" className="wk-button wk-button-secondary">
                Maak direct een nieuw cv
              </Link>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
              Start met de check en werk daarna direct verder aan een sterkere versie.
            </p>
            <CvCheckStartBlock
              buttonHref="/tools/cv-score"
              trackingLocation="cv-optimaliseren:above_fold_check_block"
            />
          </div>

          <aside className="wk-card h-fit p-6">
            <div className="wk-eyebrow mb-2">
              <span>Slimme volgorde</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold text-[var(--wk-ink)]">
              Van analyse naar betere cv-versie
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--wk-ink-muted)]">
              <p>1. Start met een brede check via de vacaturematch of cv-score tool.</p>
              <p>2. Kijk daarna specifieker naar ATS-risico&apos;s en ontbrekende keywords.</p>
              <p>3. Herschrijf profieltekst en bullets, en zet de verbeterde versie om in een nette PDF.</p>
            </div>
            <div className="mt-5 border-t border-[var(--wk-border)] pt-4 text-sm leading-6 text-[var(--wk-ink-muted)]">
              Handige tools:{" "}
              <Link href="/tools/ats-cv-checker" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                ATS CV checker
              </Link>
              ,{" "}
              <Link href="/tools/cv-score" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                cv-score
              </Link>
              ,{" "}
              <Link href="/tools/cv-keywords" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                cv-keywords
              </Link>
              ,{" "}
              <Link href="/tools/linkedin-naar-cv" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                LinkedIn naar cv
              </Link>
              .
            </div>
          </aside>
        </section>

        <section className="wk-card mb-12 p-6">
          <div className="wk-eyebrow mb-2">
            <span>Waarom je cv optimaliseren?</span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
            Waarom je cv optimaliseren?
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
            <p>
              Een cv dat net niet scherp genoeg is, verliest vaak al terrein voordat een recruiter inhoudelijk naar je ervaring kijkt. Dat kan door te brede profieltekst, gemiste keywords of bullets die niet laten zien wat je echt hebt bereikt.
            </p>
            <p>
              Door je cv te optimaliseren maak je het document niet alleen mooier, maar vooral duidelijker voor recruitersoftware en voor de persoon die binnen enkele seconden beslist of je doorgaat naar de volgende ronde.
            </p>
          </div>
        </section>

        <section className="wk-card mb-12 p-6">
          <div className="wk-eyebrow mb-2">
            <span>Wat controleert WerkCV?</span>
          </div>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
            Wat controleert WerkCV?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {controlPoints.map((item) => (
              <article
                key={item.title}
                className="rounded-[var(--wk-radius-md)] border border-[var(--wk-border)] bg-[var(--wk-accent-soft)] p-4"
              >
                <h3 className="text-sm font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-12 grid gap-6 lg:grid-cols-2">
          <article className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>CV optimaliseren voor ATS</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
              CV optimaliseren voor ATS
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--wk-ink-muted)]">
              ATS-optimalisatie draait vooral om duidelijke structuur, herkenbare koppen, consistente datums en woorden die softwaresystemen ook echt kunnen herkennen. Een rustig template helpt, maar ook je tekst moet logisch en scanbaar blijven.
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Gebruik hiervoor eerst de{" "}
              <Link href="/tools/ats-cv-checker" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                ATS CV checker
              </Link>
              {" "}en controleer daarna met de{" "}
              <Link href="/tools/cv-score" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                cv-score
              </Link>
              {" "}of je document inhoudelijk ook sterk genoeg is.
            </p>
          </article>

          <article className="wk-card p-6">
            <div className="wk-eyebrow mb-2">
              <span>CV aanpassen aan een vacature</span>
            </div>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-ink)]">
              CV aanpassen aan een vacature
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--wk-ink-muted)]">
              De meeste winst zit in afstemming op de rol waarop je nu solliciteert. Kijk welke functietermen, vaardigheden en resultaten in de vacature belangrijk zijn en zorg dat die op natuurlijke plekken terugkomen in profieltekst, werkervaring en skills.
            </p>
            <p className="mt-3 text-sm leading-7 text-[var(--wk-ink-muted)]">
              Gebruik de{" "}
              <Link href="/tools/cv-keywords" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                cv-keywords tool
              </Link>
              {" "}voor trefwoorden en de{" "}
              <Link href="/tools/cv-vacature-match" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                cv-vacature-match
              </Link>
              {" "}als je je hele cv naast de vacaturetekst wilt leggen. Staat je basis vooral nog op LinkedIn, begin dan met{" "}
              <Link href="/tools/linkedin-naar-cv" className="font-semibold text-[var(--wk-primary)] underline underline-offset-4">
                LinkedIn-profiel omzetten naar cv
              </Link>
              .
            </p>
          </article>
        </section>

        <section className="mb-12 rounded-[var(--wk-radius-lg)] bg-[var(--wk-primary)] p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wk-primary-contrast)]/70">
            Van check naar betere cv-versie
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[var(--wk-primary-contrast)]">
            Van check naar betere cv-versie
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Link
              href="/tools/profieltekst-generator"
              className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-primary-contrast)]/25 bg-[var(--wk-primary-contrast)]/10 p-4 transition-colors hover:bg-[var(--wk-primary-contrast)] hover:text-[var(--wk-ink)]"
            >
              <p className="text-sm font-semibold">Profieltekst aanscherpen</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast)]/80">
                Gebruik de profieltekst-generator als je opening te algemeen of te breed blijft.
              </p>
            </Link>
            <Link
              href="/tools/werkervaring-bullets"
              className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-primary-contrast)]/25 bg-[var(--wk-primary-contrast)]/10 p-4 transition-colors hover:bg-[var(--wk-primary-contrast)] hover:text-[var(--wk-ink)]"
            >
              <p className="text-sm font-semibold">Werkervaring concreter maken</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast)]/80">
                Herschrijf zwakke taaklijstjes naar heldere bullets met actie en resultaat.
              </p>
            </Link>
            <Link
              href="/cv-maken"
              className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-primary-contrast)]/25 bg-[var(--wk-primary-contrast)]/10 p-4 transition-colors hover:bg-[var(--wk-primary-contrast)] hover:text-[var(--wk-ink)]"
            >
              <p className="text-sm font-semibold">Direct een nieuwe cv-versie bouwen</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast)]/80">
                Zet je verbeterpunten om in een nieuwe WerkCV-versie met een duidelijke Nederlandse opmaak.
              </p>
            </Link>
            <Link
              href="/cv-maken-zonder-abonnement"
              className="block rounded-[var(--wk-radius-md)] border border-[var(--wk-primary-contrast)]/25 bg-[var(--wk-primary-contrast)]/10 p-4 transition-colors hover:bg-[var(--wk-primary-contrast)] hover:text-[var(--wk-ink)]"
            >
              <p className="text-sm font-semibold">Zonder abonnement verder</p>
              <p className="mt-2 text-sm leading-6 text-[var(--wk-primary-contrast)]/80">
                Handig als je je cv eerst gratis wilt verbeteren en pas later wilt downloaden.
              </p>
            </Link>
          </div>
        </section>

        <LinkCardSection
          eyebrow="Meer routes"
          title="Andere pagina's in deze cv-check cluster"
          links={routeLinks}
        />

        <FaqCardSection title="Veelgestelde vragen over cv optimaliseren" items={faqItems} />

        <WhyWerkCvSection locale="nl" />

        <FinalCtaSection
          title="Optimaliseer je cv en maak direct een nette PDF"
          description="Gebruik de check om je profiel, keywords en werkervaring scherper te maken en zet die verbeteringen daarna direct om in een nieuwe cv-versie."
          supportLine="Gratis starten. Pas betalen bij PDF-download. Geen abonnement."
          buttonLabel="Maak direct een beter cv"
          buttonHref="/editor"
          trackingLocation="cv-optimaliseren:final_primary"
          trackingLabel="Maak direct een beter cv"
        />
      </div>

      <Footer variant="brand" />
    </main>
  );
}
