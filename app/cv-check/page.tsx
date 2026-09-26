import type { Metadata } from "next";
import CvCheckTool from "@/components/cv-check/CvCheckTool";
import { FAQJsonLd, JsonLd } from "@/components/seo/JsonLd";
import { buildDutchMetadata } from "@/lib/page-metadata";
import { cvDownloadPrice } from "@/lib/site-content";

const faqItems = [
  {
    question: "Is de cv-check gratis?",
    answer:
      "Ja. Je krijgt het volledige rapport zonder account en zonder e-mailadres, ook de vergelijking met een vacature. Opnieuw checken na aanpassingen is ook gratis. Alleen als je je cv in de WerkCV-editor verbetert en als PDF downloadt, betaal je eenmalig " +
      `${cvDownloadPrice.display}.`,
  },
  {
    question: "Wordt mijn cv opgeslagen?",
    answer:
      "Nee. Je cv en de vacaturetekst worden alleen voor deze check gebruikt en daarna niet bewaard. We slaan geen cv-tekst op in logbestanden of statistieken.",
  },
  {
    question: "Wijst een ATS mijn cv automatisch af?",
    answer:
      "Zelden. Een sollicitatiesysteem (ATS) leest vooral je gegevens uit en recruiters zoeken en filteren daarin. Het bekende cijfer dat '75% van de cv's door de ATS wordt afgewezen' heeft geen onderzoek als basis. Wat wel telt: dat het systeem je cv goed kan lezen, dat je de gevraagde ervaring aantoont en dat een recruiter dat snel ziet.",
  },
  {
    question: "Wat betekent mijn cijfer?",
    answer:
      "Het cijfer (1 tot 10) vat vier onderdelen samen: leesbaarheid voor systemen, basis en contact, inhoud en bewijs, en Nederlandse conventies. Met een vacature telt de aansluiting op de vacature voor de helft mee. Een ernstig probleem, zoals een gescande pdf of je BSN op je cv, houdt het cijfer onder de 5,5 tot je het oplost.",
  },
  {
    question: "Kan ik mijn cv vergelijken met een vacature?",
    answer:
      "Ja. Plak de vacaturetekst in het optionele veld. Je ziet dan per eis uit de vacature of je cv die aantoont, met citaten uit beide teksten. Harde eisen staan bovenaan; een 'pre' telt als pluspunt, niet als harde eis.",
  },
  {
    question: "Welke Nederlandse regels controleert de check?",
    answer:
      "Onder meer taalniveaus (moedertaal of A1–C2), een herkenbaar opleidingsniveau (mbo, hbo, wo), de lengte van je cv, of er gevoelige gegevens zoals je BSN op staan, en waar het past een VOG, BIG-registratie of rijbewijs. Foto, geboortedatum en nationaliteit zijn in Nederland optioneel; die noemen we alleen ter info.",
  },
];

export const metadata: Metadata = {
  ...buildDutchMetadata({
    title: "Gratis CV-check met AI: ATS, inhoud en match met de vacature | WerkCV",
    description:
      "Check je cv gratis met AI, zonder account. Zie wat systemen en recruiters uit je cv halen, wat ontbreekt voor de vacature en wat je als eerste verbetert, met Nederlandse regels.",
    path: "/cv-check",
    keywords: ["cv check", "cv checker", "ai cv checker", "ats cv checker", "cv laten checken", "cv vergelijken met vacature"],
    languages: {
      nl: "https://werkcv.nl/cv-check",
      "nl-NL": "https://werkcv.nl/cv-check",
      en: "https://werkcv.nl/en/cv-check",
      "en-NL": "https://werkcv.nl/en/cv-check",
      "x-default": "https://werkcv.nl/cv-check",
    },
  }),
  // Not indexed until the launch that redirects the old checker pages here (spec §6.1).
  robots: { index: false, follow: true },
};

const webApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "WerkCV CV-check",
  url: "https://werkcv.nl/cv-check",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "nl-NL",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  description:
    "Gratis AI cv-check voor sollicitaties in Nederland: leesbaarheid voor sollicitatiesystemen, inhoud, Nederlandse conventies en de aansluiting op een vacature.",
};

const whatWeCheck = [
  { title: "Leesbaarheid voor systemen", body: "Scans, twee kolommen, tekstvakken en kop- of voetteksten die sollicitatiesystemen verkeerd of niet lezen." },
  { title: "Basis en contact", body: "Naam, e-mail, telefoon, woonplaats en LinkedIn: kan een recruiter je direct bereiken?" },
  { title: "Inhoud en bewijs", body: "Een concrete profieltekst, resultaten met cijfers, actieve werkwoorden en consistente data." },
  { title: "Nederlandse conventies", body: "Taalniveaus, mbo/hbo/wo, lengte, gevoelige gegevens, en waar relevant VOG, BIG of rijbewijs." },
];

export default function CvCheckPage() {
  return (
    <main>
      <FAQJsonLd questions={faqItems} />
      <JsonLd data={webApplicationJsonLd} />

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <p className="wk-eyebrow">Gratis cv-check met AI</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-[var(--wk-ink)] md:text-5xl">
            Check je cv zoals een systeem en een recruiter het lezen
          </h1>
          <p className="mt-4 text-lg leading-8 text-[var(--wk-ink-muted)]">
            Binnen een minuut zie je wat sollicitatiesystemen uit je cv halen, wat ontbreekt voor de vacature en wat je als eerste verbetert, met citaten uit je eigen cv.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="wk-trust-pill">Gratis, zonder account</span>
            <span className="wk-trust-pill">Je cv wordt niet opgeslagen</span>
            <span className="wk-trust-pill">Nederlandse regels: taalniveau, mbo/hbo, VOG</span>
          </div>
          <div className="mt-8">
            <CvCheckTool
              locale="nl"
              methodologyHref="/cv-check/methodologie"
              editorHref="/editor?template=professional&startSource=cv_check"
            />
          </div>
        </div>
      </section>

      <section className="wk-section bg-[var(--wk-surface)]">
        <div className="wk-container max-w-4xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Wat de cv-check controleert</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {whatWeCheck.map((item) => (
              <div key={item.title} className="wk-card p-5">
                <h3 className="font-semibold text-[var(--wk-ink)]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-6 text-[var(--wk-ink-muted)]">
            Plak je een vacature, dan zie je daarnaast per eis of je cv die aantoont, met citaten uit je cv en de vacature. Harde eisen staan bovenaan; een &lsquo;pre&rsquo; telt als pluspunt.
          </p>
        </div>
      </section>

      <section className="wk-section">
        <div className="wk-container max-w-3xl">
          <h2 className="text-2xl font-semibold text-[var(--wk-ink)]">Veelgestelde vragen over de cv-check</h2>
          <div className="mt-6 space-y-3">
            {faqItems.map((item) => (
              <details key={item.question} className="wk-card p-4">
                <summary className="cursor-pointer font-semibold text-[var(--wk-ink)]">{item.question}</summary>
                <p className="mt-2 text-sm leading-6 text-[var(--wk-ink-muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
