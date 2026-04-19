import type { Metadata } from "next";
import Link from "next/link";
import TrackedLandingLink from "@/components/analytics/TrackedLandingLink";
import Footer from "@/components/Footer";
import OpzeggenConversionSection from "@/components/opzeggen/OpzeggenConversionSection";

const sourceLinks = [
  {
    label: "Novoresume pricing",
    href: "https://novoresume.com/page/pricing",
  },
  {
    label: "Novoresume terms and conditions",
    href: "https://novoresume.com/page/legal/terms-and-conditions",
  },
  {
    label: "Novoresume about us",
    href: "https://novoresume.com/about-us",
  },
];

const steps = [
  "Controleer eerst of je een recente premiumaankoop wilt cancelen; de officiele pricingpagina zegt namelijk dat Novoresume geen automatische subscription gebruikt.",
  "Mail contact@novoresume.com en geef aan dat je je purchase wilt cancelen.",
  "Voeg de gegevens toe die Novoresume in de voorwaarden noemt: aankoopdatum, order- of receiptnummer, volledige naam, adres, telefoonnummer en datum.",
  "Controleer of je je receipt hebt ontvangen en check binnen 48 uur ook je spamfolder als die mail ontbreekt.",
];

const faqs = [
  {
    question: "Moet je Novoresume opzeggen om automatische verlenging te stoppen?",
    answer:
      "Volgens de officiele pricingpagina niet. Novoresume zegt expliciet dat het pricingmodel niet subscription based is en dat er geen automatische subscription is.",
  },
  {
    question: "Hoe cancel je een Novoresume-purchase?",
    answer:
      "De officiele voorwaarden zeggen dat je je purchase kunt cancelen door contact@novoresume.com te mailen. Novoresume geeft daar ook een formulierstructuur bij met aankoopdatum, ordernummer, naam, adres en telefoonnummer.",
  },
  {
    question: "Heeft Novoresume een refundtermijn?",
    answer:
      "Volgens de terms hebben consumenten het recht om hun purchase binnen 14 dagen vanaf de aankoopdatum te cancelen en een refund te claimen.",
  },
  {
    question: "Waarom zoeken mensen op novoresume opzeggen?",
    answer:
      "Die intentie gaat vaak niet over maandelijkse billing maar over het cancelen van een recente premiumaankoop, refundrechten of de vraag of een andere builder beter past bij Nederlandse vacatures.",
  },
];

export const metadata: Metadata = {
  title: "Novoresume Opzeggen - Officiele Stappen + Uitleg | WerkCV",
  description:
    "Zoek je hoe je Novoresume opzegt? Bekijk wat de officiele pricingpagina en voorwaarden zeggen over geen automatische subscription, purchase cancellation en refund binnen 14 dagen.",
  keywords: [
    "novoresume opzeggen",
    "novoresume annuleren",
    "novoresume refund",
    "novoresume cancel purchase",
    "novoresume alternatief",
  ],
  alternates: {
    canonical: "https://werkcv.nl/novoresume-opzeggen",
    languages: {
      "nl-NL": "https://werkcv.nl/novoresume-opzeggen",
      "x-default": "https://werkcv.nl/novoresume-opzeggen",
    },
  },
};

export default function NovoresumeOpzeggenPage() {
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
        name: "Novoresume opzeggen",
        item: "https://werkcv.nl/novoresume-opzeggen",
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
            trackingLocation="novoresume-opzeggen:header_primary"
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
              Intent: novoresume opzeggen
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight text-black md:text-5xl">
              Novoresume opzeggen: eerder purchase cancelen dan subscription stoppen
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-slate-700">
              Deze pagina vat samen wat Novoresume zelf publiceert over pricing,
              purchase cancellation en refunds. Het belangrijkste detail is meteen
              ook het grootste nuancepunt: volgens Novoresume is het model niet
              subscription based en bestaat er geen automatische verlenging.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLandingLink
                href="/cv-maken-zonder-abonnement"
                trackingLocation="novoresume-opzeggen:hero_primary"
                trackingLabel="Bekijk alternatief zonder abonnement"
                className="border-4 border-black bg-yellow-400 px-5 py-3 text-base font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Bekijk alternatief zonder abonnement
              </TrackedLandingLink>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-600">
              Wil je pas daarna inhoudelijk vergelijken? De volgende stap staat lager op deze pagina.
            </p>
            <p className="mt-5 text-sm font-medium text-slate-600">
              Officiele bronnen gecheckt op 19 april 2026.
            </p>
          </div>

          <div className="h-fit border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black">Kernpunten uit de officiele bronnen</h2>
            <ul className="mt-5 space-y-3 text-sm font-medium leading-relaxed text-slate-700">
              <li>Novoresume zegt op de pricingpagina expliciet dat het model niet subscription based is.</li>
              <li>Dezelfde pricingpagina zegt ook letterlijk dat er geen automatische subscription is.</li>
              <li>De terms geven consumenten volgens Novoresume 14 dagen om een purchase te cancelen en refund te vragen.</li>
              <li>Voor die cancellation adviseert Novoresume een e-mail aan contact@novoresume.com met vaste ordergegevens.</li>
            </ul>
          </div>
        </section>

        <section className="mb-14 border-4 border-black bg-white p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Op basis van de officiele voorwaarden
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Stappen om een Novoresume-purchase te cancelen
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
            Wat opvalt in de officiele Novoresume-bronnen
          </p>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-slate-200">
            <p>
              Novoresume verschilt wezenlijk van typische cancel-intentieplatforms zoals Zety,
              LiveCareer of sommige Resume.io-plannen. De officiele pricingpagina zet juist
              sterk neer dat er geen automatische subscription is.
            </p>
            <p>
              Daardoor gaat de zoekterm &quot;novoresume opzeggen&quot; meestal niet over maandelijkse
              verlengfrictie, maar over een recente premiumpurchase, refundrechten of twijfel
              over welk product beter past bij jouw workflow.
            </p>
            <p>
              Dat maakt de pagina commercieel nog steeds interessant, maar de juiste eerlijke
              uitleg is: dit is vooral een purchase-cancellation- en alternatief-intentie, geen
              klassieke abonnement-stop-intentie.
            </p>
          </div>
        </section>

        <OpzeggenConversionSection
          pageKey="novoresume-opzeggen"
          compareHref="/cv-gids/welke-cv-builder-past-bij-jou-in-nederland"
          compareTitle="Welke CV builder past bij jou?"
          compareBody="Gebruik deze vergelijking als je niet zozeer wilt cancelen, maar vooral een builder zoekt die beter past bij Nederlandse vacatures."
        />

        <section className="mb-14">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-600">
            Bronnen
          </p>
          <h2 className="mt-2 text-3xl font-black text-black">
            Officiele Novoresume pagina&apos;s
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
            Veelgestelde vragen over Novoresume opzeggen
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
                Wil je vooral een rustigere Nederlandse route?
              </p>
              <h2 className="mt-2 text-3xl font-black text-black">
                Kijk dan of WerkCV beter past bij jouw sollicitatieflow
              </h2>
            </div>
            <TrackedLandingLink
              href="/cv-maken-zonder-abonnement"
              trackingLocation="novoresume-opzeggen:footer_primary"
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
