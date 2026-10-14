import Link from "next/link";
import { cvDownloadPrice } from "@/lib/site-content";

// "Hoe maak je een cv?" on the homepage, which owns the "cv maken" search intent since the
// 14 Oct 2026 consolidation (/cv-maken and its variants redirect here). Short, factual steps that
// search engines and AI answers can quote, then the WerkCV route with its price.

const STEPS = [
  {
    title: "Kies de functie waarop je solliciteert",
    body: "Die keuze bepaalt welke ervaring vooraan komt en welke woorden uit de vacature je gebruikt.",
  },
  {
    title: "Schrijf een profiel van drie tot vier zinnen",
    body: "Ongeveer 50 tot 120 woorden: je ervaring, waar je sterk in bent en wat voor baan je zoekt.",
  },
  {
    title: "Zet je werkervaring in omgekeerde volgorde",
    body: "De meest recente functie eerst, met per functie drie tot zes punten die beginnen met wat je deed en eindigen met het resultaat.",
  },
  {
    title: "Voeg opleiding, vaardigheden en talen toe",
    body: "Noem bij talen een niveau, zoals moedertaal of Engels C1. Een BSN, IBAN of kopie van je ID hoort niet op een cv.",
  },
  {
    title: "Controleer en download als pdf",
    body: "Eén datumnotatie, één of twee pagina's, een rustige opmaak die sollicitatiesystemen goed kunnen lezen, en een bestandsnaam als CV-Voornaam-Achternaam.pdf.",
  },
];

export default function HowToMakeCv() {
  return (
    <section className="relative z-10 wk-section" aria-labelledby="hoe-maak-je-een-cv">
      <div className="max-w-4xl mx-auto px-6">
        <h2 id="hoe-maak-je-een-cv" className="text-2xl md:text-3xl font-semibold text-[var(--wk-ink)]">
          Hoe maak je een cv? In 5 stappen
        </h2>
        <p className="mt-3 text-[var(--wk-ink-muted)] leading-7">
          Een goed cv maak je in ongeveer een half uur. Zo pak je het aan, met of zonder WerkCV.
        </p>
        <ol className="mt-6 space-y-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="wk-card flex gap-4 p-4">
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--wk-accent-soft)] font-semibold text-[var(--wk-primary)]">
                {index + 1}
              </span>
              <div>
                <h3 className="font-semibold text-[var(--wk-ink)]">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--wk-ink-muted)]">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-[var(--wk-ink-muted)] leading-7">
          In WerkCV doe je dit gratis, met een live voorbeeld en het cijfer uit de CV-check terwijl je typt. Je betaalt pas{" "}
          {cvDownloadPrice.display} eenmalig als je de pdf downloadt, zonder abonnement.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href="/editor?template=professional&startSource=home_howto" className="wk-button wk-button-primary">
            Begin gratis met je cv
          </Link>
          <Link href="/cv-check" className="text-sm font-semibold text-[var(--wk-primary)] underline underline-offset-4">
            Heb je al een cv? Check het gratis
          </Link>
        </div>
      </div>
    </section>
  );
}
