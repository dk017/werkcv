import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import OpzeggenConversionSection from "@/components/opzeggen/OpzeggenConversionSection";

const sourceLinks = [
  {
    label: "Resume.io help: cancel, downgrade or delete your account",
    href: "https://help.resume.io/en/articles/3784896",
  },
  {
    label: "Resume.io help: billing work",
    href: "https://help.resume.io/en/articles/3785664",
  },
  {
    label: "Resume.io pricing",
    href: "https://resume.io/pricing",
  },
];

const steps = [
  "Open de officiele Resume.io contactroute en kies daar de tab 'Cancel Subscription', ook als je niet meer in de app kunt inloggen.",
  "Zoek je account op met het e-mailadres waarmee je hebt betaald en gebruik daarna de knop om je abonnement te annuleren.",
  "Open de bevestigingsmail van Resume.io en rond de annulering af via de stappen in die e-mail.",
  "Werkt dat niet, log dan in op de app, ga via je profielfoto naar Account Settings en downgrade je plan in de box 'My Plan', of mail support@resume.io.",
];

const faqs = [
  {
    question: "Hoe zeg je Resume.io op?",
    answer:
      "Volgens de officiele help-pagina kun je een Resume.io-subscriptie annuleren via de website zonder in te loggen, door op de contactpagina de tab 'Cancel Subscription' te kiezen. In de app kan het ook via Account Settings en de box 'My Plan'.",
  },
  {
    question: "Wat gebeurt er na opzeggen bij Resume.io?",
    answer:
      "Resume.io zegt dat premiumtoegang na bevestigde annulering nog 30 dagen actief blijft vanaf je laatste maandbetaling of 7 dagen vanaf je laatste trialbetaling. Daarna downgrade je account naar het gratis niveau.",
  },
  {
    question: "Moet je elke Resume.io-plan actief opzeggen?",
    answer:
      "Nee, niet altijd. De help-pagina zegt expliciet dat zesmaands- en jaarplannen niet automatisch verlengen. Ook noemt Resume.io eenmalige betalingen in sommige landen. De exacte planstructuur kan per locatie verschillen.",
  },
  {
    question: "Waarom zoeken mensen op resume.io opzeggen?",
    answer:
      "Die intentie gaat meestal verder dan alleen cancelen. Mensen willen weten welke billingstructuur actief is, hoe ze die stoppen en of een eenvoudiger Nederlands alternatief zonder planverwarring beter past.",
  },
];

export const metadata: Metadata = {
  title: "Resume.io Opzeggen - Officiele Stappen + Alternatief | WerkCV",
  description:
    "Zoek je hoe je Resume.io opzegt? Bekijk de officiele stappen uit het helpcentrum, wat er na annuleren gebeurt en vergelijk daarna een duidelijk alternatief voor Nederlandse sollicitaties.",
  keywords: [
    "resume.io opzeggen",
    "resume io opzeggen",
    "resume.io abonnement opzeggen",
    "resume io cancel subscription",
    "resume io downgrade",
    "resume.io alternatief",
  ],
  alternates: {
    canonical: "https://werkcv.nl/resume-io-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/resume-io-opzeggen",
      "x-default": "https://werkcv.nl/resume-io-opzeggen",
    },
  },
};

export default function ResumeIoOpzeggenPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://werkcv.nl",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Resume.io opzeggen",
        item: "https://werkcv.nl/resume-io-opzeggen",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FFFEF0]">
      <header className="relative z-10 border-b-4 border-black bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-black">
              Werk<span className="bg-yellow-400 px-1">CV</span>.nl
            </span>
          </Link>
          <TrackedLandingLink
            href="/cv-maken-zonder-abonnement"
            trackingLocation="resume-io-opzeggen:header_primary"
            trackingLabel="Alternatief zonder abonnement"
            className="border-2 border-black bg-yellow-400 px-3 py-1 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            Alternatief zonder abonnement
          </TrackedLandingLink>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-6 py-14">
        <section className="mb-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.25em] text-slate-700">
              Intent: resume.io opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Resume.io opzeggen: wat het officiele helpcentrum echt zegt
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat Resume.io zelf publiceert over annuleren,
              downgraden en wat er na cancelen gebeurt. Dat is belangrijk omdat
              Resume.io volgens het eigen helpcentrum verschillende planvormen
              gebruikt die per land kunnen verschillen.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="resume-io-opzeggen:hero_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </TrackedLandingLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Wil je pas daarna inhoudelijk vergelijken? De vergelijking met WerkCV staat lager op deze pagina.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 19 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Resume.io zegt dat annuleren zelfs via de website kan zonder eerst in te loggen in de app.</li>
              <li>De officiele help-pagina vereist een bevestiging via e-mail om de cancellation af te ronden.</li>
              <li>Na een bevestigde annulering blijft premium volgens Resume.io nog 30 dagen of 7 trialdagen actief, afhankelijk van je laatste betaling.</li>
              <li>Resume.io zegt zelf dat planvormen per locatie kunnen verschillen en dat niet elk plan automatisch verlengt.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van het officiele helpcentrum
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om Resume.io op te zeggen
          </h2>
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4">
                <div
                  className="flex h-9 w-9 flex-shrink-0 items-center justify-center border-3 border-black bg-[#FFFEF0] text-sm font-black text-black"
                  style={{ borderWidth: "3px" }}
                >
                  {index + 1}
                </div>
                <p className="pt-1 text-sm font-medium leading-relaxed text-slate-700">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10 border-4 border-black bg-black p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-300">
            Wat opvalt in de officiele helpteksten
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              Resume.io maakt een belangrijk onderscheid tussen plansoorten. Volgens de
              billing- en premium-uitleg kunnen er een 7-daagse trial, 6-maands- en
              jaarplannen en in sommige landen ook eenmalige betalingen bestaan.
            </p>
            <p>
              Daardoor is dit geen standaard &quot;klik hier om te cancelen&quot;-intentie. Je moet
              eerst weten welk type toegang je hebt. Resume.io zegt expliciet dat zesmaands-
              en jaarplannen niet automatisch verlengen, terwijl de trial juist wel kan
              overgaan naar terugkerende premiumtoegang.
            </p>
            <p>
              De cancel-flow zelf is wel vrij duidelijk: via contact plus e-mailbevestiging
              of via Account Settings en de box &quot;My Plan&quot;. Zonder bevestigingsmail is de
              annulering volgens het helpcentrum niet afgerond.
            </p>
          </div>
        </section>

        <OpzeggenConversionSection
          pageKey="resume-io-opzeggen"
          compareHref="/cv-gids/werkcv-vs-resume-io"
          compareTitle="WerkCV vs Resume.io"
          compareBody="Vergelijk de vaste Nederlandse documentflow van WerkCV met Resume.io's bredere en locatie-afhankelijke planstructuur."
        />

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele Resume.io pagina&apos;s
          </h2>
          <div className="mt-6 space-y-3">
            {sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="block border-2 border-black bg-white p-4 text-sm font-medium text-slate-700 transition-colors hover:bg-yellow-100"
              >
                <span className="font-black text-black">{source.label}</span>
                <span className="mt-1 block break-all">{source.href}</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mb-14">
          <h2 className="text-center text-3xl font-black text-black">
            Veelgestelde vragen over Resume.io opzeggen
          </h2>
          <div className="mx-auto mt-8 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 text-left text-base font-black text-black">
                  {faq.question}
                  <span className="ml-3 text-xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="border-t-2 border-black px-4 pb-4 pt-3 text-sm font-medium leading-relaxed text-slate-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="border-4 border-black bg-yellow-400 px-6 py-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-black">
                Klaar met planverwarring?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kijk of een duidelijke Nederlandse cv-route beter past bij jouw sollicitatieproces
              </h2>
            </div>
            <TrackedLandingLink
              href="/cv-maken-zonder-abonnement"
              trackingLocation="resume-io-opzeggen:footer_primary"
              trackingLabel="Bekijk alternatief"
              className="inline-block border-4 border-black bg-white px-5 py-3 text-base font-black text-black"
            >
              Bekijk alternatief
            </TrackedLandingLink>
          </div>
        </section>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Footer />
    </div>
  );
}
