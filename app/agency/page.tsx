import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCtaLink from "@/components/agency/AgencyCtaLink";
import AgencySubmissionDemo from "@/components/agency/AgencySubmissionDemo";
import AgencyInteractiveDemo from "@/components/agency/AgencyInteractiveDemo";
import AgencyRoiCalculator from "@/components/agency/AgencyRoiCalculator";
import { FAQJsonLd, JsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { isAgencyDodoConfigured } from "@/lib/dodo";

export const metadata: Metadata = {
  title: "MatchPack voor recruitmentbureaus | WerkCV",
  description:
    "Van kandidaat-CV en vacature naar bewijs per functie-eis, recruiter-review en een volledig of optioneel concept zonder directe contactgegevens als PDF of DOCX.",
  alternates: { canonical: "https://werkcv.nl/agency" },
  openGraph: {
    title: "Van kandidaat-CV en vacature naar een compleet klantvoorstel",
    description: "Onderbouw het voorstel met CV-bewijs, controleer ontbrekende informatie en lever één consistent klantpakket.",
    url: "https://werkcv.nl/agency",
    type: "website",
  },
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const primaryButtonClass = "inline-flex min-h-12 items-center justify-center border-2 border-slate-900 bg-emerald-400 px-5 py-3 text-center text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5";

const planItems = [
  "Tot 50 nieuwe kandidaatdocumenten of goedgekeurde voorstellen per betaalde maand",
  "Vacature-eisen gekoppeld aan concreet CV-bewijs",
  "Bewerkbare klantintroductie en begeleidende e-mail",
  "Volledig voorstel en optioneel concept zonder directe contactgegevens in consistente bureau-opmaak",
  "Nederlandse en Engelse output",
  "Herbruikbare bureau-templates, teamrollen en versiegeschiedenis",
];

const faqs = [
  {
    question: "Wat is een compleet kandidaatvoorstel in WerkCV?",
    answer: "Een goedgekeurd voorstel bestaat uit een introductiepagina in de ingestelde agency-opmaak, de door de recruiter bevestigde voorstelgegevens en de gekozen CV-versie. De begeleidende e-mail kan direct worden gekopieerd. De interne bewijsmatrix en recruiternotities worden niet meegestuurd.",
  },
  {
    question: "Vult WerkCV ontbrekende kandidaatdata automatisch in?",
    answer: "Nee. WerkCV gebruikt het CV en de vacature om bewijs en openstaande punten zichtbaar te maken. Beschikbaarheid, opzegtermijn, salaris- of tariefindicatie en kandidaatwensen blijven leeg totdat de recruiter ze zelf bevestigt.",
  },
  {
    question: "Wat telt als één van de 50 slots?",
    answer: "Een nieuw los CV-document of de definitieve goedkeuring van een kandidaatvoorstel telt als één slot. Analyseren, een concept opslaan, opnieuw openen en hetzelfde pakket opnieuw downloaden tellen niet opnieuw.",
  },
  {
    question: "Is de versie zonder directe contactgegevens automatisch anoniem of AVG-proof?",
    answer: "Nee. WerkCV maakt gestructureerde naam- en contactvelden leeg en filtert contactachtige tekst. Namen in lopende tekst, bedrijfsnamen, scholen en projecten kunnen zichtbaar blijven. De recruiter moet het PDF-bestand, de grondslag voor verwerking en het doel van delen zelf controleren.",
  },
  {
    question: "Krijgt mijn hele team toegang?",
    answer: "De eigenaar kan editors, reviewers en viewers toevoegen. Editors maken en wijzigen, reviewers controleren en keuren goed en viewers lezen mee.",
  },
  {
    question: "Welke bestanden kan ik aan een klant geven?",
    answer: "Na goedkeuring kun je de gekozen versie als PDF én DOCX downloaden. De volledige versie en de versie zonder directe contactgegevens komen uit dezelfde gecontroleerde snapshot.",
  },
  {
    question: "Heeft WerkCV een ATS-integratie of bulkverwerking?",
    answer: "MatchPack is geen ATS. De eerste uitwisselroute is CSV voor een CV-register en MatchPack-overzicht; directe ATS-koppelingen en bulkverwerking zijn nog niet inbegrepen.",
  },
  {
    question: "Kan ik eerst zien wat WerkCV oplevert?",
    answer: "Ja. Bekijk en download het fictieve HR-adviseurvoorbeeld op deze pagina. Als de werkwijze past, start u de Agency-billing tier en verwerkt u kandidaatdata uitsluitend via het beveiligde account, niet via een openbaar formulier.",
  },
  {
    question: "Hoe lang blijft MatchPack-data bewaard?",
    answer: "Het bronbestand zelf wordt niet opgeslagen; vacaturetekst, gestructureerde kandidaatdata en revisies blijven bewaard totdat je ze verwijdert in Instellingen. Bekijk de actuele retentie- en DPA-informatie op de privacy-pagina.",
  },
];

function CheckoutAction({ location }: { location: string }) {
  if (!isAgencyDodoConfigured()) {
    return <AgencyCtaLink href="/contact" label="Neem contact op" location={`${location}_contact_fallback`} className={primaryButtonClass} />;
  }
  return <AgencyCheckoutButton location={location} label="Start MatchPack · Agency €149/maand" className={primaryButtonClass} />;
}

export default function AgencyPage() {
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WerkCV MatchPack",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: "https://werkcv.nl/agency",
    inLanguage: ["nl-NL", "en"],
    description: metadata.description,
    offers: {
      "@type": "Offer",
      price: "149",
      priceCurrency: "EUR",
      category: "subscription",
    },
  };

  return (
    <div className="wk-agency-marketing">
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="wk-agency-marketing-hero grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700">Voor recruitmentbureaus en detacheerders</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Maak ieder kandidaat<wbr />voorstel verdedigbaar vóór het naar de klant gaat.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">WerkCV legt functie-eisen naast concreet CV-bewijs, houdt ontbrekende informatie zichtbaar en brengt bevestigde voorstelgegevens samen in één review. U keurt de snapshot goed en kiest daarna een volledig voorstel of een optionele versie zonder directe contactgegevens als PDF of DOCX.</p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <CheckoutAction location="agency_hero_checkout" />
              <a href="#voorbeeld" className="text-sm font-black text-slate-700 underline decoration-2 underline-offset-4 hover:text-emerald-700">Bekijk eerst het complete voorbeeld</a>
            </div>
            <Link href="/tools/kandidaatvoorstel-checker" className="mt-4 inline-flex text-sm font-black text-emerald-800 underline decoration-2 underline-offset-4">Probeer gratis de eerste bewijscontrole →</Link>
            <div className="mt-7 flex flex-wrap gap-2 text-xs font-bold text-slate-600"><span className="border border-slate-300 bg-white px-3 py-2">Bewijs, geen aannames</span><span className="border border-slate-300 bg-white px-3 py-2">Menselijke goedkeuring</span><span className="border border-slate-300 bg-white px-3 py-2">NL + EN</span><span className="border border-slate-300 bg-white px-3 py-2">Volledig + contactvrij concept</span></div>
          </div>

          <div className="relative border-2 border-slate-900 bg-white p-5 shadow-[8px_8px_0px_0px_rgba(78,205,196,1)] sm:p-7">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-700">WerkCV MatchPack</p><h2 className="mt-2 text-2xl font-black">Eén review. Eén goedgekeurde bron. Jouw gekozen klantpakket.</h2>
            <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center text-xs font-black"><div className="border-2 border-slate-900 bg-yellow-200 p-4">Kandidaat-CV<br />+ vacature</div><span className="text-xl">→</span><div className="border-2 border-slate-900 bg-emerald-100 p-4">Bewijs<br />+ open punten</div></div>
            <div className="mx-auto my-2 w-fit text-xl font-black">↓</div>
            <div className="grid gap-3 sm:grid-cols-2"><div className="border-2 border-slate-900 p-4"><p className="font-black">Recruiter ziet</p><p className="mt-2 text-xs leading-relaxed text-slate-600">Bewijsmatrix, hiaten, correcties, intern commentaar en verplichte review.</p></div><div className="border-2 border-slate-900 bg-slate-950 p-4 text-white"><p className="font-black">Klant ontvangt</p><p className="mt-2 text-xs leading-relaxed text-slate-300">Introductie, bevestigde gegevens en het gekozen PDF-pakket in consistente opmaak.</p></div></div>
            <p className="mt-5 border-t-2 border-slate-100 pt-4 text-xs font-semibold leading-relaxed text-slate-500">Het originele uploadbestand wordt niet opgeslagen. Vacaturetekst en gestructureerde conceptdata blijven in het beveiligde agency-account voor review.</p>
          </div>
        </section>

        <AgencySubmissionDemo />
        <AgencyInteractiveDemo />

        <section id="hoe-het-werkt" className="py-14 sm:py-20">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Van bron naar gecontroleerd voorstel</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">De recruiter blijft beslissen. WerkCV maakt het voorbereidende werk controleerbaar.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">{[
            ["1", "Upload en plak", "Upload een tekstgebaseerd PDF- of DOCX-CV en plak de volledige vacature."],
            ["2", "Controleer bewijs", "Zie per functie-eis wat sterk, gedeeltelijk of niet aantoonbaar is in het CV."],
            ["3", "Corrigeer en vul aan", "Herstel extractiefouten en voeg alleen bevestigde commerciële gegevens toe."],
            ["4", "Keur één snapshot goed", "Kies de klantversie, download het voorstel en kopieer de begeleidende e-mail."],
          ].map(([number, title, body]) => <article key={number} className="border-2 border-slate-900 bg-white p-5"><span className="flex h-9 w-9 items-center justify-center bg-emerald-400 text-sm font-black">{number}</span><h3 className="mt-4 font-black">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{body}</p></article>)}</div>
        </section>

        <section className="border-y-2 border-slate-900 py-14">
          <div className="grid gap-8 lg:grid-cols-2"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">Wat WerkCV bewust wel doet</p><ul className="mt-5 space-y-3 text-sm font-semibold leading-relaxed">{["Vacature-eisen koppelen aan zichtbaar CV-bewijs.", "Ontbrekende informatie als open punt tonen.", "Correcties vóór goedkeuring in beide CV-versies verwerken.", "PDF én DOCX uit dezelfde gecontroleerde snapshot maken.", "Menselijke controle vereisen vóór het slot wordt gebruikt."].map((item) => <li key={item} className="flex gap-3"><span className="font-black text-emerald-700">✓</span>{item}</li>)}</ul></div><div className="border-2 border-amber-400 bg-amber-50 p-6"><p className="text-xs font-black uppercase tracking-[0.18em] text-amber-800">Wat WerkCV niet belooft</p><ul className="mt-5 space-y-3 text-sm font-semibold leading-relaxed text-amber-950">{["Geen verzonnen ervaring, beschikbaarheid, salaris of resultaten.", "Geen automatische selectie- of plaatsingsbeslissing.", "Geen garantie dat een versie zonder directe contactgegevens juridisch anoniem is.", "Geen ATS: CSV-uitwisseling is de eerste import/export-route.", "Geen automatische verzending naar klanten."].map((item) => <li key={item} className="flex gap-3"><span className="font-black">—</span>{item}</li>)}</ul></div></div>
        </section>

        <AgencyRoiCalculator />

        <section id="plan" className="py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-start"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-700">MatchPack · Agency billing tier</p><h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">MatchPack voor bureaus</h2><p className="mt-3 max-w-2xl text-lg font-bold leading-relaxed text-slate-700">€149 per maand · tot 50 nieuwe kandidaatdocumenten of goedgekeurde voorstellen.</p><ul className="mt-6 grid gap-3 text-sm font-semibold leading-relaxed sm:grid-cols-2">{planItems.map((item) => <li key={item} className="flex gap-2"><span className="font-black text-emerald-700">✓</span><span>{item}</span></li>)}</ul><p className="mt-5 max-w-2xl text-xs leading-relaxed text-slate-500">Analyse en conceptreview kosten geen slot. Losse nieuwe CV-documenten en definitief goedgekeurde voorstellen delen momenteel dezelfde maandlimiet.</p></div><div className="border-2 border-slate-900 bg-yellow-300 p-6 shadow-[5px_5px_0px_0px_rgba(15,23,42,1)]"><p className="text-xs font-black uppercase tracking-[0.18em] text-slate-700">Agency billing tier</p><p className="mt-3 text-5xl font-black tracking-tight">€149</p><p className="mt-1 text-sm font-black text-slate-700">per maand · maximaal 50 slots</p><div className="mt-6"><CheckoutAction location="agency_plan_card" /></div><p className="mt-4 text-xs font-semibold leading-relaxed text-slate-700">Bij volledig gebruik is dat €2,98 per nieuw kandidaatdocument of goedgekeurd voorstel. Bewerken en opnieuw downloaden tellen niet opnieuw.</p></div></div>
        </section>

        <section className="py-14"><h2 className="text-3xl font-black tracking-tight">Veelgestelde vragen</h2><div className="mt-6 space-y-3">{faqs.map((faq) => <details key={faq.question} className="border-2 border-slate-200 bg-white p-4"><summary className="cursor-pointer font-black">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600">{faq.answer}</p></details>)}</div></section>

        <section className="border-2 border-slate-900 bg-slate-950 p-6 text-white shadow-[6px_6px_0px_0px_rgba(250,204,21,1)] sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-300">Van CV-bestand naar klantvoorstel</p><h2 className="mt-2 text-3xl font-black">Beoordeel eerst het voorbeeld. Start alleen als de werkwijze past.</h2><p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">Geen verkoopgesprek nodig: MatchPack en de Agency-billing tier zijn direct beschikbaar.</p></div><div className="flex flex-col gap-3 sm:items-end"><a href="#voorbeeld" className="inline-flex min-h-12 items-center justify-center border-2 border-white bg-white px-5 py-3 text-sm font-black text-slate-950">Bekijk voorbeeld</a><CheckoutAction location="agency_bottom_checkout" /></div></div></section>
        <p className="mt-5 text-center text-xs font-semibold text-slate-500"><Link href="/agency/privacy#subprocessors" className="text-emerald-700 underline underline-offset-4">Privacy, retentie en DPA-informatie</Link></p>
      </main>

      <FAQJsonLd questions={faqs} />
      <JsonLd data={softwareJsonLd} />
      <OrganizationJsonLd />
      <Footer variant="brand" product="matchpack" />
    </div>
  );
}
