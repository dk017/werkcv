import type { Metadata } from "next";
import AgencyEvidencePreview from "@/components/agency/AgencyEvidencePreview";
import AgencyPurchaseNotes from "@/components/agency/AgencyPurchaseNotes";
import { getAgencyReviewScopeNotice } from "@/lib/agency-review-scope";
import Link from "next/link";
import AgencyCheckoutButton from "@/components/agency/AgencyCheckoutButton";
import AgencyCommercialAnalytics from "@/components/agency/AgencyCommercialAnalytics";
import AgencySubmissionDemo from "@/components/agency/AgencySubmissionDemo";
import AgencyRoiCalculator from "@/components/agency/AgencyRoiCalculator";
import { FAQJsonLd, JsonLd, OrganizationJsonLd } from "@/components/seo/JsonLd";
import { getAgencyAcquisitionRoute } from "@/lib/agency-acquisition";
import { getAgencyPublicCapabilities } from "@/lib/agency-public-capabilities";
import { getAgencyPublicMessaging } from "@/lib/agency-public-messaging";
import {
  AGENCY_CURRENCY,
  AGENCY_MONTHLY_CREDIT_LIMIT,
  AGENCY_MONTHLY_PRICE_CENTS,
  getAgencyFullUseUnitPriceDisplay,
  getAgencyMonthlyPriceDisplay,
} from "@/lib/agency-plan";
import { isAgencyDodoConfigured } from "@/lib/dodo";

const route = getAgencyAcquisitionRoute("/agency")!;
const pageUrl = `https://werkcv.nl${route.path}`;
const capabilities = getAgencyPublicCapabilities();
const messaging = getAgencyPublicMessaging({ locale: "nl", capabilities });
const monthlyPrice = getAgencyMonthlyPriceDisplay("nl");

export const metadata: Metadata = {
  title: messaging.title,
  description: messaging.description,
  alternates: {
    canonical: pageUrl,
    languages: { nl: pageUrl, "nl-NL": pageUrl, en: "https://werkcv.nl/en/agency", "en-GB": "https://werkcv.nl/en/agency", "x-default": pageUrl },
  },
  openGraph: { title: messaging.title, description: messaging.description, url: pageUrl, type: "website", locale: "nl_NL" },
};

const faqs = [
  { question: "Wat is kandidaatvoorstel-software?", answer: "Software voor kandidaatvoorstellen brengt de vacaturecontext, relevante CV-bewijzen, bevestigde praktische gegevens en een klantintroductie samen. MatchPack ondersteunt de review; de recruiter beslist wat wordt gedeeld." },
  { question: "Vervangt MatchPack ons ATS?", answer: "Nee. MatchPack is een pre-send kwaliteitslaag naast je ATS. CSV is de huidige uitwisselroute; directe ATS-koppelingen, ranking en automatische klantverzending zijn niet inbegrepen." },
  { question: "Bewijst MatchPack dat een kandidaat de waarheid spreekt?", answer: messaging.faqAnswer },
  { question: "Wat kost het MatchPack-abonnement?", answer: `Het MatchPack-abonnement kost ${monthlyPrice} en bevat ${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits per betaalde periode. Eén credit geldt voor een nieuw zelfstandig CV of de eerste definitieve goedkeuring van een MatchPack. Bewerken en opnieuw downloaden gebruiken geen extra credit.` },
  { question: "Welke bestanden kan ik exporteren?", answer: "Een goedgekeurde klantversie kan als PDF én DOCX worden gedownload. Zowel het volledige voorstel als de variant zonder directe contactgegevens hoort uit dezelfde gecontroleerde versie te komen." },
  { question: "Maakt contactgegevens verwijderen een CV anoniem?", answer: "Nee. Directe velden kunnen worden verwijderd, maar werkgevers, scholen, projecten, locaties en tekstfragmenten kunnen de kandidaat nog herkenbaar maken. Controleer het echte bestand en volg je eigen privacyproces." },
  ...(capabilities.candidateAcknowledgement ? [{ question: "Wat betekent kandidaatbevestiging?", answer: "De kandidaat kan een specifieke, benoemde versie bevestigen, corrigeren of afwijzen. Dit is geen identiteitsoverzicht, toestemming, elektronische handtekening of recht-op-vertegenwoordiging." }] : []),
];

function CheckoutAction({ location, variant = "primary" }: { location: string; variant?: "primary" | "secondary" }) {
  const className = variant === "primary" ? "wk-button wk-button-primary" : "wk-button wk-button-secondary";
  if (!isAgencyDodoConfigured()) return <div><Link href="/agency/account" className={className}>Open MatchPack</Link><AgencyPurchaseNotes locale="nl" /></div>;
  return <AgencyCheckoutButton locale="nl" location={location} label={`Start MatchPack · ${monthlyPrice}`} className={className} />;
}

export default function AgencyPage() {
  const workflow = messaging.workflow.map((step) => ({
    ...step,
    tone: {
      highlight: "bg-[var(--wk-highlight-soft)]",
      accent: "bg-[var(--wk-accent-soft)]",
      info: "bg-[var(--wk-info-soft)]",
      success: "bg-[var(--wk-success-soft)]",
    }[step.tone],
  }));
  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WerkCV MatchPack",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    inLanguage: "nl-NL",
    description: messaging.description,
    featureList: [
      ...messaging.featureList,
      ...(capabilities.reusableAgencyTemplates ? ["Herbruikbare bureau-templates"] : []),
      ...(capabilities.teamRoles ? ["Rollen voor owner, editor, reviewer en viewer"] : []),
      ...(capabilities.candidateAcknowledgement ? ["Kandidaatbevestiging voor een benoemde ontvanger"] : []),
    ],
    offers: {
      "@type": "Offer",
      price: (AGENCY_MONTHLY_PRICE_CENTS / 100).toFixed(2),
      priceCurrency: AGENCY_CURRENCY,
      category: "monthly subscription",
      description: `${AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits per betaalde periode`,
      url: `${pageUrl}#plan`,
    },
    publisher: { "@id": "https://werkcv.nl/#organization" },
  };

  return (
    <div className="wk-agency-marketing">
      <AgencyCommercialAnalytics locale="nl" path={route.path} />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--wk-border)] bg-gradient-to-br from-[#fffef0] via-[#f8fbf7] to-[#eaf7f5]">
          <div className="absolute left-8 top-16 h-24 w-24 rounded-full bg-[var(--wk-highlight)] opacity-25" aria-hidden="true" />
          <div className="absolute bottom-12 right-10 h-36 w-36 rounded-full bg-[var(--wk-accent)] opacity-15" aria-hidden="true" />
          <div className="wk-container grid min-w-0 gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.75fr)] lg:items-center lg:py-16">
            <div className="min-w-0">
              <p className="wk-eyebrow">{messaging.eyebrow}</p>
              <h1 className="mt-4 break-words text-3xl font-black leading-[1.08] tracking-[-0.045em] text-black sm:text-5xl lg:text-6xl">{messaging.h1}</h1>
              <p className="mt-4 text-base font-extrabold tracking-[-0.01em] text-[var(--wk-ink)] sm:text-lg">{monthlyPrice} · {AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits</p>
              <p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">{messaging.hero}</p>
              <div className="mt-7 flex min-w-0 flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <Link href="/tools/kandidaatvoorstel-checker" className="wk-button wk-button-primary min-h-12 px-7 text-base">{messaging.freeToolCta}</Link>
                <CheckoutAction location="agency_hero_checkout" variant="secondary" />
                <Link href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" className="wk-button wk-button-quiet min-h-12 px-4 text-base">Bekijk het fictieve voorbeeld</Link>
              </div>
              <p className="mt-5 text-sm font-semibold text-[var(--wk-ink-muted)]">Voor recruitment- en detacheringsbureaus die kandidaten voorstellen op concrete vacatures. Probeer het voorbeeld zonder account of salesgesprek.</p>
              <div className="mt-5 flex flex-wrap gap-3"><span className="wk-trust-pill">CV-bewijs zichtbaar</span><span className="wk-trust-pill">Menselijke goedkeuring</span><span className="wk-trust-pill">PDF + DOCX</span></div>
            </div>
            <AgencyEvidencePreview locale="nl" />
          </div>
        </section>

        <div className="wk-container py-5"><p className="text-sm leading-relaxed" data-review-scope>{getAgencyReviewScopeNotice("nl")}</p></div>
        <section id="voorbeeld" className="wk-section bg-[var(--wk-surface)]" aria-labelledby="example-title"><div className="wk-container"><div className="mb-8 flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="wk-eyebrow">Volledig fictief voorbeeld</p><h2 id="example-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Zie het verschil tussen bewijs, oordeel en bevestiging.</h2></div><Link href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" className="wk-button wk-button-secondary shrink-0">Open het volledige voorbeeld</Link></div><AgencySubmissionDemo /></div></section>

        <section id="hoe-het-werkt" className="wk-section bg-[var(--wk-surface-subtle)]" aria-labelledby="workflow-title"><div className="wk-container"><p className="wk-eyebrow">De MatchPack-workflow</p><h2 id="workflow-title" className="mt-4 max-w-3xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Van oorspronkelijk CV naar één goedgekeurde klantversie.</h2><ol className="mt-10 grid min-w-0 gap-5 sm:grid-cols-2 lg:grid-cols-4">{workflow.map((step) => <li key={step.number} className="wk-card min-w-0"><span className={`inline-flex rounded-[var(--wk-radius-sm)] border border-[var(--wk-border)] px-3 py-2 text-sm font-black ${step.tone}`}>{step.number}</span><h3 className="mt-5 text-lg font-semibold">{step.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{step.body}</p></li>)}</ol></div></section>

        <section className="wk-section bg-[var(--wk-surface)]" aria-labelledby="boundary-title"><div className="wk-container grid min-w-0 gap-5 lg:grid-cols-2"><div className="wk-card wk-card-success"><p className="wk-eyebrow">Wat MatchPack doet</p><h2 id="boundary-title" className="mt-4 text-3xl font-semibold">Het maakt reviewwerk herleidbaar.</h2><ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed">{["Verbindt vacature-eisen met concrete CV-passages.", "Houdt ontbrekende, tegenstrijdige en veranderlijke informatie zichtbaar.", "Bewaart correcties, versies en recruiterbeslissingen.", "Maakt PDF en DOCX vanuit dezelfde goedgekeurde versie."].map((item) => <li key={item} className="flex gap-3"><span className="font-black text-[var(--wk-success)]">✓</span>{item}</li>)}</ul></div><div className="wk-card wk-card-warning"><p className="wk-eyebrow">Wat MatchPack niet doet</p><h2 className="mt-4 text-3xl font-semibold">De recruiter blijft verantwoordelijk.</h2><ul className="mt-6 space-y-3 text-sm font-medium leading-relaxed">{["Het vervangt geen ATS, CRM, cliëntportaal of kandidaatbeoordeling.", "Het bewijst niet dat een kandidaat de waarheid spreekt.", "Het levert geen juridische AVG- of AI Act-garantie.", "Het verstuurt geen klantvoorstel automatisch."].map((item) => <li key={item} className="flex gap-3"><span className="font-black text-[var(--wk-warning)]">—</span>{item}</li>)}</ul></div></div></section>

        <div className="wk-container"><AgencyRoiCalculator path={route.path} /></div>

        <section id="plan" className="wk-section bg-[var(--wk-surface-subtle)]" aria-labelledby="plan-title"><div className="wk-container grid min-w-0 gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-start"><div><p className="wk-eyebrow">MatchPack voor je bureau</p><h2 id="plan-title" className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">Gedeelde CV-credits voor je bureau.</h2><p className="mt-4 max-w-2xl text-lg font-medium leading-relaxed text-[var(--wk-ink-muted)]">{monthlyPrice} · {AGENCY_MONTHLY_CREDIT_LIMIT} gedeelde CV-credits per betaalde periode.</p><ul className="mt-7 grid gap-3 text-sm font-medium sm:grid-cols-2">{["Evidence-review per functie-eis", "Bewerkbare introductie en klantmail", "Herbruikbare bureau-templates", "Teamrollen en versiegeschiedenis", "PDF én DOCX uit dezelfde versie", "CSV-uitwisseling naast je ATS"].map((item) => <li key={item} className="flex gap-3"><span className="font-black text-[var(--wk-success)]">✓</span>{item}</li>)}</ul><p className="mt-6 text-xs leading-relaxed text-[var(--wk-ink-muted)]">{getAgencyFullUseUnitPriceDisplay("nl")} Bewerken en opnieuw downloaden gebruiken geen extra credit. De recruiter controleert de inhoud vóór delen.</p></div><div className="wk-card wk-card-accent"><p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[var(--wk-primary)]">MatchPack-abonnement</p><p className="mt-4 text-5xl font-black tracking-[-0.04em]">€{(AGENCY_MONTHLY_PRICE_CENTS / 100).toFixed(0)}</p><p className="mt-2 text-sm font-bold text-[var(--wk-ink-muted)]">per maand · {AGENCY_MONTHLY_CREDIT_LIMIT} CV-credits</p><div className="mt-7"><CheckoutAction location="agency_plan_card" /></div><p className="mt-4 text-xs leading-relaxed text-[var(--wk-ink-muted)]">De prijs omvat de huidige MatchPack-workspace en één gedeelde creditbundel.</p></div></div></section>

        <section className="wk-section bg-[var(--wk-surface)]" aria-labelledby="faq-title"><div className="wk-container"><h2 id="faq-title" className="text-3xl font-semibold tracking-[-0.035em]">Veelgestelde vragen</h2><div className="mt-7 grid gap-3">{faqs.map((faq) => <details key={faq.question} className="wk-card p-5"><summary className="cursor-pointer font-semibold">{faq.question}</summary><p className="mt-3 max-w-3xl text-sm font-medium leading-relaxed text-[var(--wk-ink-muted)]">{faq.answer}</p></details>)}</div></div></section>

        <section className="wk-container pb-16"><div className="wk-card wk-card-dark flex min-w-0 flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8"><div><p className="wk-eyebrow text-[var(--wk-highlight)]">Volgende stap</p><h2 className="mt-3 max-w-2xl text-3xl font-semibold">Bekijk het bewijsproces en beslis daarna.</h2><p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/75">Je kunt de gratis checker gebruiken waar die is ingeschakeld, of eerst het fictieve voorbeeld lezen.</p></div><div className="flex shrink-0 flex-col gap-3"><Link href="/voor-bureaus/kennisbank/kandidaatvoorstel-voorbeeld" className="wk-button wk-button-secondary">Bekijk voorbeeld</Link><CheckoutAction location="agency_bottom_checkout" /></div></div><p className="mt-6 text-center text-xs font-medium text-[var(--wk-ink-muted)]"><Link href="/agency/privacy#subprocessors" className="text-[var(--wk-primary)] underline underline-offset-4">Privacy, retentie en DPA-informatie</Link></p></section>
      </main>
      <FAQJsonLd questions={faqs} />
      <JsonLd data={softwareJsonLd} />
      <OrganizationJsonLd />
    </div>
  );
}
